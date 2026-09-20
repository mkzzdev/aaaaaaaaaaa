import Link from "next/link";
import { PotIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-terra-soft text-terra">
        <PotIcon className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">
        Ops, esta receita queimou.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
        O prato que você procurou não existe (ou foi devorado). Que tal pedir
        uma nova receita para o chef?
      </p>
      <Link
        href="/#pedido"
        className="mt-6 rounded-full bg-terra px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-terra-deep active:scale-95"
      >
        Pedir uma receita nova
      </Link>
    </div>
  );
}
