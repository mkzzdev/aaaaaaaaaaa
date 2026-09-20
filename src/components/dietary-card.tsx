import { LeafIcon, InfoIcon } from "./icons";
import {
  DIETARY_LABEL,
  type DietaryInfo,
  type DietaryTagId,
} from "@/lib/types";

const TONE_STYLES = {
  herb: {
    bg: "bg-herb-soft",
    text: "text-herb-deep",
    border: "border-herb/40",
  },
  honey: {
    bg: "bg-honey-soft",
    text: "text-ink",
    border: "border-honey/50",
  },
  terra: {
    bg: "bg-terra-soft",
    text: "text-terra-deep",
    border: "border-terra/40",
  },
} as const;

const ALLERGEN_ICONS: Record<string, string> = {
  "Glúten": "🌾",
  "Leite": "🥛",
  "Ovos": "🥚",
  "Amendoim": "🥜",
  "Castanhas/Nozes": "🌰",
  "Frutos do mar": "🦐",
  "Peixe": "🐟",
  "Soja": "🫘",
  "Açúcar": "🍬",
};

function Badge({ id }: { id: DietaryTagId }) {
  const cfg = DIETARY_LABEL[id];
  const tone = TONE_STYLES[cfg.tone];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold ${tone.bg} ${tone.text} ${tone.border}`}
    >
      <LeafIcon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

export default function DietaryCard({ dietary }: { dietary: DietaryInfo | null | undefined }) {
  if (!dietary) {
    return (
      <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-line bg-card/70 px-4 py-3 text-sm text-ink-soft">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft" />
        <p>
          Sem análise de restrições alimentares para esta receita. Confira
          sempre os rótulos dos ingredientes.
        </p>
      </div>
    );
  }

  const hasTags = dietary.tags.length > 0;
  const hasAllergens = dietary.allergens.length > 0;

  return (
    <div className="mt-5 rounded-xl border border-line bg-card/70">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
        <span className="grid h-7 w-7 place-items-center rounded-md bg-herb-soft text-herb-deep">
          <LeafIcon className="h-4 w-4" />
        </span>
        <div>
          <p className="font-display text-base font-semibold leading-tight text-ink">
            Restrições alimentares
          </p>
          <p className="text-[11px] uppercase tracking-[0.1em] text-ink-soft">
            Análise feita pela IA
          </p>
        </div>
      </div>

      {hasTags && (
        <div className="border-b border-line/70 px-4 py-3">
          <div className="flex flex-wrap gap-1.5">
            {dietary.tags.map((tag) => (
              <Badge key={tag} id={tag} />
            ))}
          </div>
        </div>
      )}

      {hasAllergens && (
        <div className="px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft">
            Atenção a alérgenos
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {dietary.allergens.map((a) => (
              <li
                key={a}
                className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-2.5 py-1 text-[11.5px] font-medium text-ink-soft"
              >
                <span aria-hidden>{ALLERGEN_ICONS[a] ?? "•"}</span>
                Contém {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hasTags && !hasAllergens && (
        <p className="px-4 py-3 text-sm text-ink-soft">
          Nenhuma restrição relevante identificada pela análise automática.
        </p>
      )}
    </div>
  );
}
