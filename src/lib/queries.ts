import { db } from "@/db";
import { recipes } from "@/db/schema";
import { desc, eq, isNotNull, or } from "drizzle-orm";
import { ensureAcervoSeeded } from "./seed";
import { rowToRecipe } from "./serialize";
import { ACERVO } from "./acervo";
import { inferDietary } from "./dietary";
import type { Recipe } from "./types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Executa uma função de banco com algumas tentativas.
 * Útil logo após o boot, quando o Postgres pode ainda não estar pronto
 * (a primeira conexão às vezes falha e depois estabiliza).
 */
async function withRetry<T>(fn: () => Promise<T>, tries = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < tries - 1) await sleep(300 * (i + 1));
    }
  }
  throw lastErr;
}

/** Versão do acervo em memória (fallback quando o banco está indisponível). */
function acervoFromMemory(limit = 8): Recipe[] {
  const now = new Date().toISOString();
  return ACERVO.slice(0, limit).map((entry) => ({
    id: `acervo-${entry.slug}`,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    prepTime: entry.prepTime,
    cookTime: entry.cookTime,
    servings: entry.servings,
    difficulty: entry.difficulty,
    calories: entry.calories,
    ingredients: entry.ingredients,
    steps: entry.steps,
    tips: entry.tips,
    tags: entry.tags,
    dietary: inferDietary({
      title: entry.title,
      tags: entry.tags,
      ingredients: entry.ingredients,
    }),
    prompt: null,
    image: entry.image,
    source: "acervo",
    savedAt: null,
    createdAt: now,
  }));
}

/**
 * Receitas do acervo da casa para a home.
 * Se o banco falhar por qualquer motivo, cai no acervo em memória,
 * evitando quebrar a página inteira.
 */
export async function getAcervoRecipes(limit = 8): Promise<Recipe[]> {
  try {
    await ensureAcervoSeeded();
    const rows = await withRetry(() =>
      db
        .select()
        .from(recipes)
        .where(eq(recipes.source, "acervo"))
        .orderBy(desc(recipes.createdAt), recipes.title)
        .limit(limit)
    );
    if (rows.length === 0) return acervoFromMemory(limit);
    return rows.map(rowToRecipe);
  } catch (err) {
    console.error("Falha ao buscar acervo, usando memória:", err);
    return acervoFromMemory(limit);
  }
}

/** Histórico: receitas nascidas de um pedido (têm prompt). */
export async function getHistoryRecipes(limit = 48): Promise<Recipe[]> {
  try {
    await ensureAcervoSeeded();
    const rows = await withRetry(() =>
      db
        .select()
        .from(recipes)
        .where(isNotNull(recipes.prompt))
        .orderBy(desc(recipes.createdAt))
        .limit(limit)
    );
    return rows.map(rowToRecipe);
  } catch (err) {
    console.error("Falha ao buscar histórico:", err);
    return [];
  }
}

/** Busca uma receita por id ou slug. Retorna null se não achar ou falhar. */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    await ensureAcervoSeeded();
    const rows = await withRetry(() =>
      db
        .select()
        .from(recipes)
        .where(or(eq(recipes.id, id), eq(recipes.slug, id)))
        .limit(1)
    );
    return rows[0] ? rowToRecipe(rows[0]) : null;
  } catch (err) {
    console.error("Falha ao buscar receita:", err);
    // Último recurso: procura no acervo em memória por slug.
    const entry = ACERVO.find((e) => `acervo-${e.slug}` === id || e.slug === id);
    return entry ? acervoFromMemory(ACERVO.length).find((r) => r.id === `acervo-${entry.slug}`) ?? null : null;
  }
}

/** Favoritas: receitas com savedAt preenchido. */
export async function getSavedRecipes(limit = 24): Promise<Recipe[]> {
  try {
    await ensureAcervoSeeded();
    const rows = await withRetry(() =>
      db
        .select()
        .from(recipes)
        .where(isNotNull(recipes.savedAt))
        .orderBy(desc(recipes.savedAt))
        .limit(limit)
    );
    return rows.map(rowToRecipe);
  } catch (err) {
    console.error("Falha ao buscar favoritas:", err);
    return [];
  }
}
