import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/queries";
import RecipeDetail from "@/components/recipe-detail";

export const dynamic = "force-dynamic";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}
