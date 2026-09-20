import { db } from "@/db";
import { recipes } from "@/db/schema";
import { ACERVO } from "./acervo";
import { inferDietary } from "./dietary";

/**
 * Garante que o acervo da casa exista no banco (idempotente).
 */
export async function ensureAcervoSeeded(): Promise<void> {
  const rows = ACERVO.map((entry) => {
    const { slug, ...rest } = entry;
    return {
      id: `acervo-${slug}`,
      slug,
      title: rest.title,
      description: rest.description,
      category: rest.category,
      prepTime: rest.prepTime,
      cookTime: rest.cookTime,
      servings: rest.servings,
      difficulty: rest.difficulty,
      calories: rest.calories,
      ingredients: rest.ingredients,
      steps: rest.steps,
      tips: rest.tips,
      tags: rest.tags,
      dietary: inferDietary({
        title: rest.title,
        tags: rest.tags,
        ingredients: rest.ingredients,
      }),
      prompt: null,
      image: rest.image,
      source: "acervo",
      savedAt: null,
    };
  });

  try {
    await db.insert(recipes).values(rows).onConflictDoNothing({ target: recipes.slug });
  } catch (err) {
    console.warn("Não foi possível semear o acervo:", err);
  }
}
