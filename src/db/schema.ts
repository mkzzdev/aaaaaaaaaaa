import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import type { DietaryInfo, RecipeIngredient, RecipeStep } from "@/lib/types";

export const recipes = pgTable("recipes", {
  id: text("id").primaryKey(),
  slug: text("slug").unique(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  category: text("category").notNull().default("Pratos Principais"),
  prepTime: integer("prep_time").notNull().default(15),
  cookTime: integer("cook_time").notNull().default(30),
  servings: integer("servings").notNull().default(4),
  difficulty: text("difficulty").notNull().default("fácil"),
  calories: integer("calories"),
  ingredients: jsonb("ingredients")
    .$type<RecipeIngredient[]>()
    .notNull()
    .default([]),
  steps: jsonb("steps")
    .$type<RecipeStep[]>()
    .notNull()
    .default([]),
  tips: jsonb("tips").$type<string[]>().notNull().default([]),
  tags: text("tags").array().notNull().default([]),
  dietary: jsonb("dietary").$type<DietaryInfo | null>(),
  prompt: text("prompt"),
  image: text("image"),
  source: text("source").notNull().default("gemini"),
  savedAt: timestamp("saved_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type RecipeRow = typeof recipes.$inferSelect;
