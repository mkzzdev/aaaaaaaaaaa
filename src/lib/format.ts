export function formatMinutes(min?: number | null): string {
  const n = Math.max(0, Math.round(min ?? 0));
  if (n === 0) return "0 min";
  if (n < 60) return `${n} min`;
  const h = Math.floor(n / 60);
  const m = n % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

function parseNum(raw: string): number {
  const mixed = raw.match(/^(\d+)\s*(?:e\s*)?(\d+)\s*\/\s*(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = raw.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  const plain = raw.replace(",", ".").match(/^(\d+(?:\.\d+)?)$/);
  if (plain) return Number(plain[1]);
  return NaN;
}

const NUM_RE = String.raw`\d+\s*(?:e\s*)?\d+\s*\/\s*\d+|\d+\s*\/\s*\d+|\d+(?:[.,]\d+)?`;

/** Unidades contáveis: nunca fazem sentido com decimal ("2,5 ovos"). */
const COUNTABLE = [
  "unidade",
  "unidades",
  "un",
  "ovo",
  "ovos",
  "dente",
  "dentes",
  "fatia",
  "fatias",
  "pao",
  "pão",
  "paes",
  "pães",
  "biscoito",
  "biscoitos",
  "lata",
  "latas",
  "caixa",
  "caixas",
  "caixinha",
  "caixinhas",
  "pacote",
  "pacotes",
  "tablete",
  "tabletes",
  "envelope",
  "envelopes",
  "sache",
  "sachê",
  "saches",
  "sachês",
  "gomo",
  "gomos",
  "folha",
  "folhas",
  "file",
  "files",
  "filé",
  "filés",
  "posta",
  "postas",
  "coxa",
  "coxas",
  "sobrecoxa",
  "sobrecoxas",
];

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isCountable(unit: string, name?: string): boolean {
  const hay = norm(`${unit} ${name ?? ""}`);
  return COUNTABLE.some((u) => new RegExp(`(^|\\W)${norm(u)}(\\W|$)`).test(hay));
}

/** Formata número em pt-BR (vírgula decimal), com precisão adaptativa. */
function fmtNum(n: number, countable: boolean): string {
  if (!Number.isFinite(n) || n < 0) n = 0;
  if (countable) return String(Math.max(n > 0 && n < 0.5 ? 1 : 0, Math.round(n)));

  // Remove ruído de ponto flutuante: 199.98 vira 200, 2.9999 vira 3.
  const rounded = Math.round(n);
  if (Math.abs(n - rounded) < 0.045) return String(rounded);

  const decimals = n >= 100 ? 0 : n >= 20 ? 1 : 2;
  const fixed = n.toFixed(decimals);
  const trimmed = fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : fixed;
  return trimmed.replace(".", ",");
}

/** Ajusta singular/plural da unidade conforme a quantidade. */
function pluralizeUnit(unit: string, n: number): string {
  const singular = Math.abs(n - 1) < 0.001;
  const pairs: [RegExp, string, string][] = [
    [/^unidades\b/i, "unidade", "unidades"],
    [/^ovos\b/i, "ovo", "ovos"],
    [/^dentes\b/i, "dente", "dentes"],
    [/^fatias\b/i, "fatia", "fatias"],
    [/^colheres\b/i, "colher", "colheres"],
    [/^xícaras\b/i, "xícara", "xícaras"],
    [/^xicaras\b/i, "xicara", "xicaras"],
    [/^copos\b/i, "copo", "copos"],
    [/^latas\b/i, "lata", "latas"],
    [/^caixinhas\b/i, "caixinha", "caixinhas"],
    [/^caixas\b/i, "caixa", "caixas"],
    [/^pacotes\b/i, "pacote", "pacotes"],
    [/^pães\b/i, "pão", "pães"],
    [/^folhas\b/i, "folha", "folhas"],
    [/^gomos\b/i, "gomo", "gomos"],
    [/^dentes\b/i, "dente", "dentes"],
  ];
  // Também singular -> plural
  const toPlural: [RegExp, string][] = [
    [/^unidade\b/i, "unidades"],
    [/^ovo\b/i, "ovos"],
    [/^dente\b/i, "dentes"],
    [/^fatia\b/i, "fatias"],
    [/^colher\b/i, "colheres"],
    [/^xícara\b/i, "xícaras"],
    [/^copo\b/i, "copos"],
    [/^lata\b/i, "latas"],
    [/^pão\b/i, "pães"],
    [/^folha\b/i, "folhas"],
    [/^gomo\b/i, "gomos"],
  ];
  let out = unit;
  if (singular) {
    for (const [re, sing] of pairs) {
      if (re.test(out)) {
        out = out.replace(re, sing);
        break;
      }
    }
  } else {
    for (const [re, plural] of toPlural) {
      if (re.test(out)) {
        out = out.replace(re, plural);
        break;
      }
    }
  }
  return out;
}

function cleanUnit(unit: string): string {
  return unit.trim().replace(/\s+/g, " ");
}

/** Normaliza observações vindas da IA ("do dia,levemente" -> "do dia, levemente"). */
export function cleanNote(note: string): string {
  return note
    .trim()
    .replace(/\s+/g, " ")
    .replace(/,(\S)/g, ", $1")
    .replace(/;(\S)/g, "; $1")
    .replace(/:(\S)/g, ": $1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")");
}

/**
 * Escala a quantidade de um ingrediente para outra porção.
 * - Quantidades sem número inicial (ex.: "a gosto") são devolvidas como estão.
 * - Unidades contáveis (ovos, dentes, unidades...) sempre viram números inteiros.
 * - Intervalos ("2 a 3 xícaras") têm os dois lados escalados.
 */
export function scaleQuantity(qty: string, factor: number, name?: string): string {
  if (!qty || !Number.isFinite(factor) || factor <= 0) return qty;
  // Fator ~1: devolve como está (evita "2" virar "2,0").
  if (Math.abs(factor - 1) < 0.001) return qty.trim().replace(/\s+/g, " ");

  const s = qty.trim().replace(/\s+/g, " ");

  // Intervalo: "2 a 3 xícaras", "1-2 colheres", "1 ou 2 unidades"
  const range = s.match(
    new RegExp(`^(${NUM_RE})\\s*(a|-|–|—|ou)\\s*(${NUM_RE})\\s*(.*)$`, "i")
  );
  if (range) {
    const a = parseNum(range[1]);
    const b = parseNum(range[3]);
    const unit = cleanUnit(range[4] ?? "");
    if (Number.isNaN(a) || Number.isNaN(b)) return qty;
    const countable = isCountable(unit, name);
    const na = a * factor;
    const nb = b * factor;
    const fa = fmtNum(na, countable);
    const fb = fmtNum(nb, countable);
    const sep = range[2].toLowerCase() === "ou" ? " ou " : range[2] === "a" || range[2] === "A" ? " a " : "-";
    const displayNb = countable ? Math.max(0, Math.round(nb)) : nb;
    const shownUnit = pluralizeUnit(unit, displayNb);
    // Intervalo colapsou no arredondamento ("1 a 1") -> mostra valor único.
    if (fa === fb) return `${fa}${shownUnit ? ` ${shownUnit}` : ""}`;
    return `${fa}${sep}${fb}${shownUnit ? ` ${shownUnit}` : ""}`;
  }

  const m = s.match(new RegExp(`^(${NUM_RE})\\s*(.*)$`));
  if (!m) return qty;
  const num = parseNum(m[1]);
  if (Number.isNaN(num)) return qty;
  const unit = cleanUnit(m[2] ?? "");
  // Número puro sem unidade ("2" + nome "ovos") é contável.
  const countable = unit === "" ? true : isCountable(unit, name);
  const scaled = num * factor;
  // Pluraliza pelo número exibido (já arredondado), não pelo valor bruto.
  const displayN = countable ? Math.max(0, Math.round(scaled)) : scaled;
  const shownUnit = pluralizeUnit(unit, displayN);
  return `${fmtNum(scaled, countable)}${shownUnit ? ` ${shownUnit}` : ""}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
