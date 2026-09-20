import { NextResponse } from "next/server";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { rowToRecipe } from "@/lib/serialize";

export const dynamic = "force-dynamic";

async function findRecipe(id: string) {
  return db
    .select()
    .from(recipes)
    .where(or(eq(recipes.id, id), eq(recipes.slug, id)))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const row = await findRecipe(id);
    if (!row) return NextResponse.json({ error: "Receita não encontrada." }, { status: 404 });
    return NextResponse.json({ recipe: rowToRecipe(row) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao buscar a receita." }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: { saved?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const saved = body.saved === true;
  try {
    const [updated] = await db
      .update(recipes)
      .set({ savedAt: saved ? new Date() : null })
      .where(or(eq(recipes.id, id), eq(recipes.slug, id)))
      .returning();

    if (!updated) return NextResponse.json({ error: "Receita não encontrada." }, { status: 404 });
    return NextResponse.json({ recipe: rowToRecipe(updated) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Não foi possível atualizar." }, { status: 500 });
  }
}
