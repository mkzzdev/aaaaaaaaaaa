import Link from "next/link";
import { PotIcon, SparklesIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="no-print mt-20 border-t border-line bg-cream/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-terra text-cream">
              <PotIcon className="h-5.5 w-5.5" />
            </span>
            <span className="font-display text-lg font-semibold">
              ReceitasCom<span className="text-terra">IA</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            Você pede, a IA cozinha: receitas completas e sob medida, em português
            e com sabor de casa.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Explorar
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-ink hover:text-terra">
                Início
              </Link>
            </li>
            <li>
              <Link href="/#pedido" className="text-ink hover:text-terra">
                Pedir uma receita
              </Link>
            </li>
            <li>
              <Link href="/historico" className="text-ink hover:text-terra">
                Histórico
              </Link>
            </li>
            <li>
              <Link href="/minhas-receitas" className="text-ink hover:text-terra">
                Minhas receitas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Sobre a IA
          </h3>
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-ink-soft">
            <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0 text-terra" />
            As receitas são geradas pelo Google Gemini a partir do seu pedido.
            Confira sempre quantidades, alérgenos e o ponto da comida antes de
            servir.
          </p>
        </div>
      </div>
      <div className="border-t border-line py-4">
        <p className="mx-auto max-w-6xl px-4 text-xs text-ink-soft sm:px-6">
          ReceitasComIA — feito com panela de barro, JavaScript e IA. Fotos: Pexels.
        </p>
      </div>
    </footer>
  );
}
