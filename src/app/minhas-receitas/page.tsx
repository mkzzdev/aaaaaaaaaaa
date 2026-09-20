import { getSavedRecipes } from "@/lib/queries";
import RecipeCard from "@/components/recipe-card";
import { BookmarkIcon, HeartIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function MinhasReceitasPage() {
  const saved = await getSavedRecipes(24);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-terra-soft px-3 py-1.5 text-xs font-semibold text-terra-deep">
        <HeartIcon className="h-3.5 w-3.5" filled />
        {saved.length} {saved.length === 1 ? "receita salva" : "receitas salvas"}
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        Minhas receitas
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
        Suas favoritas, do acervo ou pedidas à IA. Abra qualquer receita e toque em
        <span className="font-semibold text-ink"> Salvar </span>
        (ou volte a tocar) para gerenciar esta lista.
      </p>

      {saved.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-card/60 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-terra-soft text-terra">
            <BookmarkIcon className="h-7 w-7" />
          </span>
          <p className="font-display text-xl font-semibold">
            Sua lista de favoritos está vazia.
          </p>
          <p className="max-w-sm text-sm text-ink-soft">
            Peça uma receita à IA (ou escolha uma do acervo) e toque em{" "}
            <span className="font-semibold text-ink">Salvar</span> para guardá-la
            aqui.
          </p>
          <a
            href="/#pedido"
            className="mt-2 rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-terra-deep active:scale-95"
          >
            Pedir uma receita
          </a>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
