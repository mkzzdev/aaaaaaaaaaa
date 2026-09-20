import type { RecipeRow } from "@/db/schema";
import type { Recipe } from "./types";

export function rowToRecipe(row: RecipeRow): Recipe {
  return {
    id: row.id,
    slug: row.slug ?? null,
    title: row.title,
    description: row.description,
    category: row.category,
    prepTime: row.prepTime,
    cookTime: row.cookTime,
    servings: row.servings,
    difficulty: row.difficulty as Recipe["difficulty"],
    calories: row.calories,
    ingredients: row.ingredients ?? [],
    steps: row.steps ?? [],
    tips: row.tips ?? [],
    tags: row.tags ?? [],
    dietary: row.dietary ?? null,
    prompt: row.prompt ?? null,
    image: row.image ?? null,
    source: row.source as Recipe["source"],
    savedAt: row.savedAt ? new Date(row.savedAt).toISOString() : null,
    createdAt: new Date(row.createdAt).toISOString(),
  };
}
