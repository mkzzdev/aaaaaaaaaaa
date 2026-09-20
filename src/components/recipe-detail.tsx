"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Recipe } from "@/lib/types";
import { cleanNote, formatMinutes, scaleQuantity } from "@/lib/format";
import DietaryCard from "./dietary-card";
import { useToast } from "./toast";
import {
  ArrowLeftIcon,
  CheckIcon,
  ChefHatIcon,
  ClockIcon,
  FlameIcon,
  HeartIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  SparklesIcon,
  UsersIcon,
} from "./icons";

function storageGet(key: string): number[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function storageSet(key: string, value: number[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function MetaTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-line bg-card px-3.5 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-terra-soft text-terra">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-ink capitalize">{value}</p>
      </div>
    </div>
  );
}

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const { toast } = useToast();
  const [ready, setReady] = useState(false);
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIng, setCheckedIng] = useState<number[]>([]);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [saved, setSaved] = useState(Boolean(recipe.savedAt));
  const [saving, setSaving] = useState(false);

  const ingKey = `pv:ing:${recipe.id}`;
  const stepsKey = `pv:steps:${recipe.id}`;

  useEffect(() => {
    setCheckedIng(storageGet(ingKey));
    setDoneSteps(storageGet(stepsKey));
    setReady(true);
  }, [ingKey, stepsKey]);

  // Sem arredondar o fator aqui: o arredondamento inteligente acontece
  // na formatação de cada quantidade (evita "199,98" em vez de "200").
  const factor = useMemo(() => {
    const base = Math.max(1, recipe.servings || 1);
    return Math.max(0.01, servings / base);
  }, [servings, recipe.servings]);

  const total = recipe.prepTime + recipe.cookTime;
  const donePct = recipe.steps.length
    ? Math.round((doneSteps.length / recipe.steps.length) * 100)
    : 0;

  const toggleIng = (i: number) => {
    setCheckedIng((prev) => {
      const next = prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i];
      storageSet(ingKey, next);
      return next;
    });
  };

  const toggleStep = (i: number) => {
    setDoneSteps((prev) => {
      const next = prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i];
      storageSet(stepsKey, next);
      return next;
    });
  };

  const toggleSave = async () => {
    if (saving) return;
    setSaving(true);
    const next = !saved;
    setSaved(next);
    try {
      const res = await fetch(`/api/recipes/${recipe.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saved: next }),
      });
      if (!res.ok) throw new Error();
      toast("success", next ? "Receita salva em Minhas receitas." : "Receita removida dos favoritos.");
    } catch {
      setSaved(!next);
      toast("error", "Não conseguimos salvar agora. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="no-print pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-terra"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar para o início
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-herb-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-herb-deep">
            {recipe.category}
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">
            {recipe.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            {recipe.description}
          </p>
        </div>

        <div className="no-print flex shrink-0 gap-2">
          <button
            type="button"
            onClick={toggleSave}
            disabled={saving}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 disabled:opacity-60 ${
              saved
                ? "border-terra bg-terra text-cream hover:bg-terra-deep"
                : "border-line bg-card text-ink hover:border-terra hover:text-terra"
            }`}
          >
            <HeartIcon className={`h-4.5 w-4.5 ${saved ? "anim-pop" : ""}`} filled={saved} />
            {saved ? "Salva" : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:border-terra hover:text-terra active:scale-95"
          >
            <PrinterIcon className="h-4.5 w-4.5" />
            Imprimir
          </button>
        </div>
      </div>

      {recipe.prompt && (
        <div
          className={`mt-5 flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm ${
            recipe.source === "gemini"
              ? "border-line bg-cream/60 text-ink-soft"
              : "border-honey/50 bg-honey-soft text-ink-soft"
          }`}
        >
          {recipe.source === "gemini" ? (
            <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0 text-terra" />
          ) : (
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-honey" />
          )}
          <p>
            {recipe.source === "gemini" ? (
              <>
                Receita gerada por IA a partir do pedido:{" "}
                <span className="font-medium text-ink">“{recipe.prompt}”</span>
              </>
            ) : (
              <>
                A IA está fora do ar neste momento, então servimos do acervo da casa
                para o pedido: <span className="font-medium text-ink">“{recipe.prompt}”</span>
              </>
            )}
          </p>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-line">
        <img
          src={recipe.image ?? undefined}
          alt={recipe.title}
          className="h-60 w-full object-cover sm:h-80"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <MetaTile icon={<ClockIcon className="h-4.5 w-4.5" />} label="Tempo total" value={formatMinutes(total)} />
        <MetaTile icon={<ChefHatIcon className="h-4.5 w-4.5" />} label="Preparo" value={formatMinutes(recipe.prepTime)} />
        <MetaTile icon={<FlameIcon className="h-4.5 w-4.5" />} label="Cozimento" value={formatMinutes(recipe.cookTime)} />
        <MetaTile icon={<FlameIcon className="h-4.5 w-4.5" />} label="Dificuldade" value={recipe.difficulty} />
        <MetaTile
          icon={<UsersIcon className="h-4.5 w-4.5" />}
          label="Calorias/porção"
          value={recipe.calories ? `${recipe.calories} kcal` : "—"}
        />
      </div>

      <DietaryCard dietary={recipe.dietary} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[370px_1fr]">
        <aside className="self-start lg:sticky lg:top-24">
          <div className="rounded-xl border border-line bg-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-xl font-semibold">Ingredientes</h2>
              <span className="text-xs font-semibold text-ink-soft">
                {checkedIng.length}/{recipe.ingredients.length} prontos
              </span>
            </div>

            <div className="no-print flex items-center justify-between border-b border-line bg-paper/60 px-5 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">
                Porções
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Diminuir porções"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  className="grid h-8 w-8 place-items-center rounded-md border border-line bg-card text-ink transition-all hover:border-terra hover:text-terra active:scale-90"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={servings}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (Number.isNaN(v)) {
                      setServings(1);
                    } else {
                      setServings(Math.max(1, Math.min(500, v)));
                    }
                  }}
                  className="h-8 w-14 rounded-md border border-line bg-card text-center text-sm font-bold tabular-nums text-ink focus:border-terra focus:outline-none focus:ring-1 focus:ring-terra"
                  aria-label="Número de porções"
                />
                <button
                  type="button"
                  aria-label="Aumentar porções"
                  onClick={() => setServings((s) => Math.min(500, s + 1))}
                  className="grid h-8 w-8 place-items-center rounded-md border border-line bg-card text-ink transition-all hover:border-terra hover:text-terra active:scale-90"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ul className="divide-y divide-line/70 px-5 py-2">
              {recipe.ingredients.map((ing, i) => {
                const checked = ready && checkedIng.includes(i);
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => toggleIng(i)}
                      className="group flex w-full items-start gap-3 py-2.5 text-left"
                    >
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border transition-all ${
                          checked
                            ? "border-herb bg-herb text-cream"
                            : "border-line bg-paper group-hover:border-herb"
                        }`}
                      >
                        {checked && <CheckIcon className="h-3.5 w-3.5" />}
                      </span>
                      <span className={`text-sm leading-relaxed transition-colors ${checked ? "text-ink-soft/60 line-through" : "text-ink"}`}>
                        <span className="font-semibold">
                          {scaleQuantity(ing.quantity, factor, ing.name)}
                        </span>
                        {"\u00A0"}
                        {ing.name}
                        {ing.note && (
                          <span className="block text-xs text-ink-soft">
                            ({cleanNote(ing.note)})
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="rounded-xl border border-line bg-card">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <h2 className="font-display text-xl font-semibold">Modo de preparo</h2>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-28 overflow-hidden rounded-full bg-cream">
                  <div
                    className="h-full rounded-full bg-herb transition-all duration-500"
                    style={{ width: `${donePct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-ink-soft">
                  {doneSteps.length}/{recipe.steps.length}
                </span>
              </div>
            </div>

            <ol className="px-5 py-3">
              {recipe.steps.map((step, i) => {
                const done = ready && doneSteps.includes(i);
                return (
                  <li key={i} className="relative">
                    {i < recipe.steps.length - 1 && (
                      <span className="absolute left-[15px] top-10 h-[calc(100%-2.5rem)] w-px bg-line" />
                    )}
                    <button
                      type="button"
                      onClick={() => toggleStep(i)}
                      className="group relative flex w-full gap-4 rounded-lg px-2 py-3.5 text-left transition-colors hover:bg-paper/70"
                    >
                      <span
                        className={`z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-bold transition-all ${
                          done
                            ? "border-herb bg-herb text-cream"
                            : "border-line bg-card text-ink group-hover:border-herb group-hover:text-herb"
                        }`}
                      >
                        {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-semibold transition-colors ${done ? "text-ink-soft/70 line-through" : "text-ink"}`}
                        >
                          {step.title}
                        </span>
                        <span
                          className={`mt-1 block text-sm leading-relaxed ${done ? "text-ink-soft/50" : "text-ink-soft"}`}
                        >
                          {step.instruction}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {recipe.tips.length > 0 && (
            <div className="rounded-xl border border-herb/25 bg-herb-soft/70">
              <div className="flex items-center gap-2.5 border-b border-herb/20 px-5 py-4">
                <ChefHatIcon className="h-5 w-5 text-herb-deep" />
                <h2 className="font-display text-xl font-semibold text-herb-deep">
                  Segredos do chef
                </h2>
              </div>
              <ul className="space-y-3 px-5 py-4">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-herb-deep">
                    <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-card px-3 py-1 text-xs font-medium text-ink-soft"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
