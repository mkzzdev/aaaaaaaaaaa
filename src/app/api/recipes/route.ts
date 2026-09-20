import { NextResponse } from "next/server";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { desc, isNotNull } from "drizzle-orm";
import { rowToRecipe } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const scope = url.searchParams.get("scope") ?? "recent"; // recent | saved
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 12) || 12, 30);

  try {
    let rows;
    if (scope === "saved") {
      rows = await db
        .select()
        .from(recipes)
        .where(isNotNull(recipes.savedAt))
        .orderBy(desc(recipes.savedAt))
        .limit(limit);
    } else {
      rows = await db
        .select()
        .from(recipes)
        .where(isNotNull(recipes.prompt))
        .orderBy(desc(recipes.createdAt))
        .limit(limit);
    }
    return NextResponse.json({ recipes: rows.map(rowToRecipe) });
  } catch (err) {
    console.error("Erro ao listar receitas:", err);
    return NextResponse.json({ error: "Não foi possível listar as receitas." }, { status: 500 });
  }
}
