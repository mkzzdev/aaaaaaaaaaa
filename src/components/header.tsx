"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, PotIcon, SparklesIcon, XIcon } from "./icons";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/historico", label: "Histórico" },
  { href: "/minhas-receitas", label: "Minhas receitas" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-terra text-cream transition-transform group-hover:-rotate-6">
            <PotIcon className="h-5.5 w-5.5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-tight">
              ReceitasCom<span className="text-terra">IA</span>
            </span>
            <span className="mt-0.5 hidden text-[11px] font-medium tracking-wide text-ink-soft sm:block">
              Receitas geradas apartir de IA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-cream text-ink"
                    : "text-ink-soft hover:bg-cream/60 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/#pedido"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-terra px-4 py-2 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-terra-deep active:scale-95"
          >
            <SparklesIcon className="h-4 w-4" />
            Nova receita
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-card text-ink md:hidden"
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-4 pb-4 pt-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-cream"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#pedido"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-terra px-3 py-2.5 text-sm font-semibold text-cream"
          >
            <SparklesIcon className="h-4 w-4" />
            Nova receita
          </Link>
        </div>
      )}
    </header>
  );
}
