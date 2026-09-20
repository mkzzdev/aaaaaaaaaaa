import { NextResponse } from "next/server";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { generateRecipeWithGemini } from "@/lib/gemini";
import { pickFallback } from "@/lib/acervo";
import { imageForRecipe } from "@/lib/images";
import { inferDietary } from "@/lib/dietary";
import type { GeminiRecipe } from "@/lib/gemini";
import type { RecipeSource } from "@/lib/types";

export const dynamic = "force-dynamic";
// Tempo máximo da rota: a IA é lenta, mas o plano gratuito da Vercel
// (Hobby) permite no máximo 60s por função. A geração típica leva 10-30s.
export const maxDuration = 60;

const lastCall = new Map<string, number>();

type Generation = {
  data: GeminiRecipe;
  source: RecipeSource;
  image: string | null;
  offline: boolean;
};

async function generate(prompt: string): Promise<Generation> {
  const apiKey = process.env.GEMINI_API_KEY ?? "";

  if (apiKey) {
    try {
      const data = await generateRecipeWithGemini(prompt, apiKey);
      return {
        data,
        source: "gemini",
        // Escolhe a foto pelo conteúdo da receita (título/ingredientes/tags),
        // não apenas pela categoria — evita imagens genéricas repetidas.
        image: imageForRecipe(data),
        offline: false,
      };
    } catch (err) {
      // Degradação suave: em vez de quebrar a experiência, servimos o acervo.
      console.error("Gemini falhou, servindo receita do acervo:", err);
    }
  }

  // Sem chave configurada (ou IA indisponível): receita mais parecida do acervo.
  const fb = pickFallback(prompt);
  return {
    data: {
      ...fb,
      dietary: inferDietary({
        title: fb.title,
        tags: fb.tags,
        ingredients: fb.ingredients as { name: string }[],
      }),
    },
    source: "acervo",
    image: fb.image,
    offline: true,
  };
}

export async function POST(req: Request) {
  let body: { prompt?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (prompt.length < 3) {
    return NextResponse.json(
      { error: "Conte um pouco mais o que você quer comer (mínimo de 3 letras)." },
      { status: 400 }
    );
  }
  if (prompt.length > 400) {
    return NextResponse.json(
      { error: "Pedido longo demais — resuma para menos de 400 caracteres." },
      { status: 400 }
    );
  }

  const clientKey = req.headers.get("x-forwarded-for") ?? "local";
  const now = Date.now();
  const last = lastCall.get(clientKey) ?? 0;
  if (now - last < 6_000) {
    return NextResponse.json(
      { error: "Calma, chef! Espere alguns segundos entre um pedido e outro." },
      { status: 429 }
    );
  }
  lastCall.set(clientKey, now);

  const { data, source, image, offline } = await generate(prompt);
  const id = crypto.randomUUID();

  const values = {
    slug: null,
    title: data.title,
    description: data.description,
    category: data.category,
    prepTime: data.prepTime,
    cookTime: data.cookTime,
    servings: data.servings,
    difficulty: data.difficulty,
    calories: data.calories,
    ingredients: data.ingredients,
    steps: data.steps,
    tips: data.tips,
    tags: data.tags,
    dietary: data.dietary,
    prompt,
    image: image ?? imageForRecipe(data),
    source,
    savedAt: null,
    createdAt: new Date(),
  };

  let persistedId: string | null = null;
  for (let attempt = 0; attempt < 2 && !persistedId; attempt++) {
    const candidateId = attempt === 0 ? id : crypto.randomUUID();
    try {
      await db.insert(recipes).values({ id: candidateId, ...values });
      persistedId = candidateId;
    } catch (err) {
      console.error(`Erro ao salvar receita (tentativa ${attempt + 1}):`, err);
    }
  }

  if (!persistedId) {
    return NextResponse.json(
      { error: "A receita ficou pronta, mas não conseguimos guardá-la. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    recipe: {
      id: persistedId,
      title: data.title,
      source,
      createdAt: new Date().toISOString(),
    },
    offline,
  });
}
