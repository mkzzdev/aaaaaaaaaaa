export type RecipeIngredient = {
  name: string;
  quantity: string;
  note?: string;
};

export type RecipeStep = {
  title: string;
  instruction: string;
};

export type Difficulty = "fácil" | "médio" | "difícil";

export type RecipeSource = "gemini" | "acervo";

/**
 * Restrições alimentares relevantes para a receita.
 * Cada rótulo possui um label amigável em pt-BR e uma cor (cor temática).
 */
export type DietaryTagId =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "lactose-free"
  | "low-carb"
  | "high-protein"
  | "low-sodium"
  | "sugar-free"
  | "nut-free"
  | "egg-free"
  | "shellfish-free"
  | "soy-free";

export type DietaryInfo = {
  /** Lista de restrições que a receita atende (ativas). */
  tags: DietaryTagId[];
  /** Alérgenos ou ingredientes presentes que merecem atenção. */
  allergens: string[];
  /** Texto curto e humano (1 a 2 frases) resumindo se vale para restrições comuns. */
  note: string;
};

export const DIETARY_LABEL: Record<DietaryTagId, { label: string; tone: "herb" | "honey" | "terra" }> = {
  vegetarian: { label: "Vegetariana", tone: "herb" },
  vegan: { label: "Vegana", tone: "herb" },
  "gluten-free": { label: "Sem glúten", tone: "honey" },
  "lactose-free": { label: "Sem lactose", tone: "honey" },
  "low-carb": { label: "Low carb", tone: "honey" },
  "high-protein": { label: "Rica em proteína", tone: "herb" },
  "low-sodium": { label: "Baixo sódio", tone: "honey" },
  "sugar-free": { label: "Sem açúcar", tone: "honey" },
  "nut-free": { label: "Sem castanhas/nozes", tone: "honey" },
  "egg-free": { label: "Sem ovos", tone: "honey" },
  "shellfish-free": { label: "Sem frutos do mar", tone: "honey" },
  "soy-free": { label: "Sem soja", tone: "honey" },
};

export type Recipe = {
  id: string;
  slug?: string | null;
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
  /** Restrições alimentares e alérgenos (gerado pela IA, opcional). */
  dietary?: DietaryInfo | null;
  prompt?: string | null;
  image?: string | null;
  source: RecipeSource;
  savedAt: string | null;
  createdAt: string;
};

export type AcervoEntry = Omit<Recipe, "id" | "savedAt" | "createdAt"> & {
  slug: string;
  image: string;
};
