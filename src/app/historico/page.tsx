import { getHistoryRecipes } from "@/lib/queries";
import RecipeCard from "@/components/recipe-card";
import { HistoryIcon, PotIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function HistoricoPage() {
  const history = await getHistoryRecipes(48);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-honey-soft px-3 py-1.5 text-xs font-semibold text-ink">
        <HistoryIcon className="h-3.5 w-3.5" />
        {history.length}{" "}
        {history.length === 1 ? "receita pedida" : "receitas pedidas"}
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        Histórico de pedidos
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
        Tudo o que a IA cozinhou para você, das mais recentes às antigas. Abra
        qualquer uma para ver a receita completa ou salvá-la em Minhas receitas.
      </p>

      {history.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-card/60 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-terra-soft text-terra">
            <PotIcon className="h-7 w-7" />
          </span>
          <p className="font-display text-xl font-semibold">
            A panela ainda está fria.
          </p>
          <p className="max-w-sm text-sm text-ink-soft">
            Faça seu primeiro pedido na página inicial e ele aparece aqui, sempre
            que você quiser repetir.
          </p>
          <a
            href="/#pedido"
            className="mt-2 rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-terra-deep active:scale-95"
          >
            Pedir a primeira receita
          </a>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {history.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
