"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./toast";
import {
  ChefHatIcon,
  DiceIcon,
  RefreshIcon,
  SparklesIcon,
  SpinnerIcon,
} from "./icons";

const SURPRISE = [
  "Marmita da semana com legumes da estação",
  "Jantar romântico para dois, sem glúten",
  "Lanche da tarde para os meninos",
  "Receita para esgotar a geladeira: ovo, batata e sobras de arroz",
  "Prato típico nordestino para impressionar",
  "Sobremesa que leva 15 minutos",
  "Almoço em família com peixe fresco",
  "Bolo de festa junina com milho",
];

const LOADING_MSGS = [
  "O chef leu o seu pedido…",
  "Puxando o espelho da panela…",
  "Pesando os ingredientes…",
  "Ajustando o fogo baixo…",
  "Escrevendo os passos…",
  "Polindo o granulado…",
];

function SkeletonCard() {
  return (
    <div className="anim-fade-up mt-4 overflow-hidden rounded-xl border border-line bg-card">
      <div className="skeleton h-44 w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-2/3 rounded" />
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-4/5 rounded" />
        <div className="flex gap-3 pt-1">
          <div className="skeleton h-3.5 w-16 rounded-full" />
          <div className="skeleton h-3.5 w-16 rounded-full" />
          <div className="skeleton h-3.5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function PromptBar() {
  const router = useRouter();
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState(0);
  const [lastPrompt, setLastPrompt] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      setLastPrompt(localStorage.getItem("pv:lastPrompt") ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!loading) return;
    setMsg(0);
    const t = window.setInterval(
      () => setMsg((m) => (m + 1) % LOADING_MSGS.length),
      2400
    );
    return () => window.clearInterval(t);
  }, [loading]);

  const submit = useCallback(
    async (raw?: string) => {
      const prompt = (raw ?? value).trim();
      if (loading) return;
      if (prompt.length < 3) {
        toast("error", "Conte um pouco mais: mínimo de 3 letras.");
        return;
      }
      if (prompt.length > 400) {
        toast("error", "Resuma o pedido para menos de 400 caracteres.");
        return;
      }

      setLoading(true);
      setError(null);
      setLastPrompt(prompt);
      try {
        localStorage.setItem("pv:lastPrompt", prompt);
      } catch {
        /* ignore */
      }

      try {
        const res = await fetch("/api/recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        // A resposta pode não ser JSON (erro de proxy, HTML do servidor, corpo vazio).
        const raw = await res.text().catch(() => "");
        let data: { recipe?: { id?: string }; offline?: boolean; error?: string } | null = null;
        try {
          data = raw ? JSON.parse(raw) : null;
        } catch {
          data = null;
        }

        const recipeId = data?.recipe?.id;
        if (!res.ok || !recipeId) {
          throw new Error(
            data?.error ??
              "A cozinha demorou demais para responder. Tente novamente em instantes."
          );
        }
        toast(
          "success",
          data?.offline
            ? "IA indisponível agora — servimos uma receita do acervo."
            : "Receita pronta! Boa degustação."
        );
        setValue("");
        router.push(`/receita/${recipeId}`);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Algo queimou por aqui. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    [value, loading, router, toast]
  );

  const surprise = useCallback(() => {
    const phrase = SURPRISE[Math.floor(Math.random() * SURPRISE.length)];
    setValue(phrase);
    void submit(phrase);
  }, [submit]);

  return (
    <div id="pedido" className="scroll-mt-24">
      <form
        className="rounded-xl border border-line bg-card p-2.5 shadow-sm shadow-ink/5"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submit();
              }
            }}
            rows={2}
            autoComplete="off"
            placeholder='Ex.: "risoto de camarão"'
            className="max-h-40 min-h-[62px] w-full resize-none bg-transparent px-3 py-2 text-[15px] leading-relaxed text-ink placeholder:text-ink-soft/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={surprise}
            disabled={loading}
            aria-label="Sugestão surpresa"
            title="Surpresa do chef"
            className="mb-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-paper text-ink-soft transition-all hover:border-terra hover:text-terra active:scale-95 disabled:opacity-50"
          >
            <DiceIcon className="h-5.5 w-5.5" />
          </button>
          <button
            type="submit"
            disabled={loading}
            className="mb-0.5 inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-terra px-4 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-terra-deep active:scale-95 disabled:opacity-60 sm:px-5"
          >
            {loading ? (
              <SpinnerIcon className="h-5 w-5" />
            ) : (
              <>
                <SparklesIcon className="h-4.5 w-4.5" />
                <span className="hidden sm:inline">Cozinhar</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-ink-soft">
          Pressione <kbd className="rounded border border-line bg-cream px-1.5 py-0.5 text-[11px] font-semibold">Enter</kbd> para cozinhar ou toque no{" "}
          <span className="inline-flex items-center gap-1 font-medium text-ink">
            <DiceIcon className="h-3.5 w-3.5" /> dado
          </span>{" "}
          para uma ideia aleatória.
        </p>
        {lastPrompt && !loading && (
          <button
            type="button"
            onClick={() => {
              setValue(lastPrompt);
              inputRef.current?.focus();
            }}
            className="inline-flex max-w-full items-center gap-1.5 text-xs font-medium text-ink-soft transition-colors hover:text-terra"
          >
            <RefreshIcon className="h-3.5 w-3.5" />
            <span className="truncate">Repetir último pedido</span>
          </button>
        )}
      </div>

      {loading && (
        <div className="mt-5">
          <div className="mb-4 flex items-center gap-3 rounded-lg border border-line bg-cream/60 px-4 py-3">
            <ChefHatIcon className="h-6 w-6 animate-bounce text-terra" />
            <div>
              <p className="text-sm font-semibold text-ink">{LOADING_MSGS[msg]}</p>
              <p className="text-xs text-ink-soft">
                Leva de 10 a 30 segundos — o chef está caprichando.
              </p>
            </div>
          </div>
          <SkeletonCard />
        </div>
      )}

      {error && !loading && (
        <div className="anim-fade-up mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-terra/30 bg-terra-soft px-4 py-3">
          <p className="text-sm font-medium text-terra-deep">{error}</p>
          <button
            type="button"
            onClick={() => void submit()}
            className="inline-flex items-center gap-1.5 rounded-full bg-terra px-3.5 py-1.5 text-xs font-semibold text-cream transition-all hover:bg-terra-deep active:scale-95"
          >
            <RefreshIcon className="h-3.5 w-3.5" />
            Tentar de novo
          </button>
        </div>
      )}
    </div>
  );
}
