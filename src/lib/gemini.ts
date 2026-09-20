import type {
  DietaryInfo,
  DietaryTagId,
  Difficulty,
  RecipeIngredient,
  RecipeStep,
} from "./types";
import { CATEGORY_OPTIONS } from "./images";

export type GeminiRecipe = {
  title: string;
  description: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  calories: number | null;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: string[];
  tags: string[];
  dietary: DietaryInfo;
};

// Cadeia de fallback: tentamos do mais capaz ao mais leve até conseguir resposta.
const MODELS = [
  "gemini-3.6-flash",
  "gemini-flash-latest",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.7-flash",
];

const SYSTEM = `Você é o chef do ReceitasComIA, um site brasileiro de receitas.
Crie UMA receita completa, original e prática, em português do Brasil, seguindo EXATAMENTE o pedido do usuário: respeite restrições alimentares, ingredientes disponíveis, número de pessoas, ocasião e nível de dificuldade.
Regras:
- Títulos apetitosos e específicos (ex.: "Risoto de abóbora com castanhas", nunca apenas "Risoto").
- Descrição em 2 a 3 frases convidativas, sem mencionar IA ou o fato de ter sido gerada.
- Quantidades no formato brasileiro: xícaras, colheres (sopa/chá), dentes de alho, g, ml, unidades.
- Entre 8 e 16 ingredientes, em ordem de uso, com observação curta quando ajudar.
- Entre 5 e 12 passos: cada um com um título curto de ação e uma instrução detalhada o suficiente para um iniciante.
- Dentre 2 e 4 dicas de chef genuínas (pontos, substituições, armazenamento).
- Escolha a categoria entre as opções dadas no schema.
- Em "dietary", analise a receita inteira e descreva de forma HONESTA e útil as restrições alimentares:
  * Em "tags" liste SOMENTE as restrições que a receita REALMENTE atende (ex.: uma receita com carne NÃO pode ter "vegetarian").
  * Em "allergens" liste os ingredientes que costumam causar alergia presentes na receita (ex.: "Amendoim", "Glúten", "Leite", "Ovos", "Frutos do mar"). Pode ser vazio.
  * Em "note" escreva 1 a 2 frases em português, úteis para alguém com restrições, alertando sobre o que é importante.
Responda SOMENTE com o JSON pedido, sem comentários.`;

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    title: { type: "STRING" },
    description: { type: "STRING" },
    category: { type: "STRING", enum: CATEGORY_OPTIONS },
    prepTime: { type: "INTEGER" },
    cookTime: { type: "INTEGER" },
    servings: { type: "INTEGER" },
    difficulty: { type: "STRING", enum: ["fácil", "médio", "difícil"] },
    calories: { type: "INTEGER" },
    ingredients: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          quantity: { type: "STRING" },
          note: { type: "STRING" },
        },
        required: ["name", "quantity"],
      },
    },
    steps: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          instruction: { type: "STRING" },
        },
        required: ["title", "instruction"],
      },
    },
    tips: { type: "ARRAY", items: { type: "STRING" } },
    tags: { type: "ARRAY", items: { type: "STRING" } },
    dietary: {
      type: "OBJECT",
      properties: {
        tags: {
          type: "ARRAY",
          items: {
            type: "STRING",
            enum: [
              "vegetarian",
              "vegan",
              "gluten-free",
              "lactose-free",
              "low-carb",
              "high-protein",
              "low-sodium",
              "sugar-free",
              "nut-free",
              "egg-free",
              "shellfish-free",
              "soy-free",
            ],
          },
        },
        allergens: { type: "ARRAY", items: { type: "STRING" } },
        note: { type: "STRING" },
      },
      required: ["tags", "allergens", "note"],
    },
  },
  required: [
    "title",
    "description",
    "category",
    "prepTime",
    "cookTime",
    "servings",
    "difficulty",
    "calories",
    "ingredients",
    "steps",
    "tips",
    "tags",
    "dietary",
  ],
};

const DIETARY_TAGS: DietaryTagId[] = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "lactose-free",
  "low-carb",
  "high-protein",
  "low-sodium",
  "sugar-free",
  "nut-free",
  "egg-free",
  "shellfish-free",
  "soy-free",
];

function sanitizeDietary(raw: unknown): DietaryInfo {
  const obj = (raw ?? {}) as Record<string, unknown>;
  const arr = (v: unknown) => (Array.isArray(v) ? v : []);
  const tags = arr(obj.tags)
    .map((t) => String(t).trim())
    .filter((t): t is DietaryTagId => DIETARY_TAGS.includes(t as DietaryTagId));
  const allergens = arr(obj.allergens)
    .map((a) => String(a).trim())
    .filter(Boolean)
    .slice(0, 12);
  const note = typeof obj.note === "string" ? obj.note.trim() : "";
  return { tags: Array.from(new Set(tags)), allergens, note };
}

function stripFences(text: string): string {
  const t = text.trim();
  if (t.startsWith("```")) {
    return t.replace(/^```[a-zA-Z]*\s*/, "").replace(/```$/, "").trim();
  }
  return t;
}

const clampInt = (v: unknown, min: number, max: number, fallback: number) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
};

const cleanStr = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export function sanitizeRecipe(raw: unknown): GeminiRecipe {
  const r = (raw ?? {}) as Record<string, unknown>;
  const arr = (v: unknown) => (Array.isArray(v) ? v : []);

  const ingredients: RecipeIngredient[] = arr(r.ingredients)
    .map((i: Record<string, unknown>) => ({
      name: cleanStr(i?.name),
      quantity: cleanStr(i?.quantity),
      note: cleanStr(i?.note) || undefined,
    }))
    .filter((i) => i.name && i.quantity)
    .slice(0, 30);

  const steps: RecipeStep[] = arr(r.steps)
    .map((s: Record<string, unknown>) => {
      const instruction = cleanStr(s?.instruction) || cleanStr(s?.title);
      return { title: cleanStr(s?.title) || instruction, instruction };
    })
    .filter((s) => s.instruction)
    .slice(0, 20);

  const difficulty = (["fácil", "médio", "difícil"].includes(cleanStr(r.difficulty))
    ? cleanStr(r.difficulty)
    : "fácil") as Difficulty;

  const category = CATEGORY_OPTIONS.includes(cleanStr(r.category))
    ? cleanStr(r.category)
    : "Pratos Principais";

  const cal = Number(r.calories);
  const calories = Number.isFinite(cal) && cal > 0 && cal < 3000 ? Math.round(cal) : null;

  return {
    title: cleanStr(r.title) || "Receita do ReceitasComIA",
    description: cleanStr(r.description),
    category,
    prepTime: clampInt(r.prepTime, 1, 240, 15),
    cookTime: clampInt(r.cookTime, 0, 480, 30),
    servings: clampInt(r.servings, 1, 500, 4),
    difficulty,
    calories,
    ingredients,
    steps,
    tips: arr(r.tips)
      .map((t) => cleanStr(t))
      .filter(Boolean)
      .slice(0, 5),
    tags: arr(r.tags)
      .map((t) => cleanStr(t).toLowerCase())
      .filter(Boolean)
      .slice(0, 6),
    dietary: sanitizeDietary(r.dietary),
  };
}

/**
 * Gera a receita chamando a API do Gemini, com cadeia de fallback de modelos.
 * Lança erro se todos os modelos falharem.
 */
export async function generateRecipeWithGemini(
  prompt: string,
  apiKey: string
): Promise<GeminiRecipe> {
  let lastError: unknown = new Error("Sem resposta do Gemini");

  for (const model of MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 8192,
              responseMimeType: "application/json",
              responseSchema: RESPONSE_SCHEMA,
            },
          }),
          signal: AbortSignal.timeout(30_000),
        }
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        lastError = new Error(`Gemini ${model} HTTP ${res.status}: ${body.slice(0, 300)}`);
        continue;
      }

      const data = await res.json();
      const text: string | undefined =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        lastError = new Error(`Gemini ${model} retornou resposta vazia`);
        continue;
      }

      return sanitizeRecipe(JSON.parse(stripFences(text)));
    } catch (err) {
      lastError = err;
      continue;
    }
  }

  console.error("Falha na geração com Gemini:", lastError);
  throw lastError instanceof Error ? lastError : new Error("Falha ao chamar o Gemini");
}
