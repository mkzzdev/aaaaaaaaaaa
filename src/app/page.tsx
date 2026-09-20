import { getAcervoRecipes } from "@/lib/queries";
import { IMG } from "@/lib/images";
import PromptBar from "@/components/prompt-bar";
import RecipeCard from "@/components/recipe-card";
import { ChefHatIcon, PotIcon, SparklesIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

function CollageFigure({
  src,
  caption,
  className,
  rotate,
}: {
  src: string;
  caption: string;
  className: string;
  rotate: string;
}) {
  return (
    <figure
      className={`absolute rounded-lg border border-line bg-card p-2 shadow-lg shadow-ink/10 ${rotate} ${className}`}
    >
      <img
        src={src}
        alt={caption}
        className="aspect-[4/3] w-full rounded-md object-cover"
      />
      <figcaption className="px-1 pb-0.5 pt-2 font-display text-sm italic text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

export default async function HomePage() {
  const acervo = await getAcervoRecipes(8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft">
              <SparklesIcon className="h-3.5 w-3.5 text-terra" />
              Receitas sob medida, geradas por IA Gemini
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.35rem]">
              Me conta o que você quer comer,{" "}
              <em className="text-terra">eu monto a receita.</em>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Descreva os ingredientes que tem em casa, restrições ou a fome do
              momento. A IA escreve a receita completa — lista de ingredientes,
              passo a passo e segredos do chef — em segundos.
            </p>

            <div className="mt-7">
              <PromptBar />
            </div>
          </div>

          <div className="relative hidden h-[440px] select-none lg:block">
            <div className="dot-grid absolute -right-6 top-6 h-56 w-64 rounded-3xl" />
            <div className="absolute -left-4 bottom-2 h-40 w-40 rounded-full bg-herb-soft" />
            <CollageFigure
              src={IMG.moqueca}
              caption="Moqueca baiana"
              rotate="rotate-2"
              className="right-4 top-0 w-[56%]"
            />
            <CollageFigure
              src={IMG.paoDeQueijo}
              caption="Pão de queijo mineiro"
              rotate="-rotate-3"
              className="bottom-10 left-0 w-[46%]"
            />
            <CollageFigure
              src={IMG.brigadeiro}
              caption="Brigadeiro clássico"
              rotate="rotate-6"
              className="bottom-0 right-0 w-[42%]"
            />
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <div className="border-y border-line bg-cream/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 md:gap-10">
          {[
            {
              n: "01",
              icon: <SparklesIcon className="h-4.5 w-4.5" />,
              t: "Descreva o pedido",
              d: "“Quem sou eu hoje com frango, arroz e pouco tempo?” — é só escrever.",
            },
            {
              n: "02",
              icon: <ChefHatIcon className="h-4.5 w-4.5" />,
              t: "A IA cozinha",
              d: "O Gemini monta a receita completa, ajustando porções e o seu jeito de comer.",
            },
            {
              n: "03",
              icon: <PotIcon className="h-4.5 w-4.5" />,
              t: "Cozinhe e guarde",
              d: "Marque ingredientes e passos, imprima ou salve em Minhas receitas.",
            },
          ].map((s) => (
            <div key={s.n} className="flex gap-4">
              <span className="font-display text-3xl font-semibold text-terra/80">{s.n}</span>
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  <span className="text-terra">{s.icon}</span>
                  {s.t}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACERVO */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Do acervo da casa
            </h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              Clássicos brasileiros testados e aprovados — para quando a inspiração
              (ou a internet) falta.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {acervo.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
