import type { DietaryInfo, DietaryTagId, RecipeIngredient } from "./types";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const ALLERGEN_TERMS: { term: string; label: string }[] = [
  { term: "amendoim", label: "Amendoim" },
  { term: "castanha", label: "Castanhas/Nozes" },
  { term: "nozes", label: "Castanhas/Nozes" },
  { term: "amendoas", label: "Castanhas/Nozes" },
  { term: "amêndoas", label: "Castanhas/Nozes" },
  { term: "leite", label: "Leite" },
  { term: "creme de leite", label: "Leite" },
  { term: "manteiga", label: "Leite" },
  { term: "queijo", label: "Leite" },
  { term: "mussarela", label: "Leite" },
  { term: "muçarela", label: "Leite" },
  { term: "parmesao", label: "Leite" },
  { term: "parmesão", label: "Leite" },
  { term: "ricota", label: "Leite" },
  { term: "catupiry", label: "Leite" },
  { term: "requeijao", label: "Leite" },
  { term: "requeijão", label: "Leite" },
  { term: "ovos", label: "Ovos" },
  { term: "ovo", label: "Ovos" },
  { term: "trigo", label: "Glúten" },
  { term: "farinha", label: "Glúten" },
  { term: "macarrao", label: "Glúten" },
  { term: "macarrão", label: "Glúten" },
  { term: "lasanha", label: "Glúten" },
  { term: "penne", label: "Glúten" },
  { term: "espaguete", label: "Glúten" },
  { term: "spaghetti", label: "Glúten" },
  { term: "massa", label: "Glúten" },
  { term: "pao", label: "Glúten" },
  { term: "pão", label: "Glúten" },
  { term: "frango", label: "Não aplicável" },
  { term: "carne", label: "Não aplicável" },
  { term: "bacon", label: "Não aplicável" },
  { term: "calabresa", label: "Não aplicável" },
  { term: "linguica", label: "Não aplicável" },
  { term: "linguiça", label: "Não aplicável" },
  { term: "costelinha", label: "Não aplicável" },
  { term: "charque", label: "Não aplicável" },
  { term: "peixe", label: "Peixe" },
  { term: "tilapia", label: "Peixe" },
  { term: "robalo", label: "Peixe" },
  { term: "salmao", label: "Peixe" },
  { term: "salmão", label: "Peixe" },
  { term: "atum", label: "Peixe" },
  { term: "bacalhau", label: "Peixe" },
  { term: "camarao", label: "Frutos do mar" },
  { term: "camarão", label: "Frutos do mar" },
  { term: "lula", label: "Frutos do mar" },
  { term: "polvo", label: "Frutos do mar" },
  { term: "soja", label: "Soja" },
  { term: "shoyu", label: "Soja" },
  { term: "acucar", label: "Açúcar" },
  { term: "açúcar", label: "Açúcar" },
];

type InferInput = {
  title?: string | null;
  tags?: string[] | null;
  ingredients?: { name: string }[] | null;
};

export function inferDietary(input: InferInput): DietaryInfo {
  const titleN = normalize(input.title ?? "");
  const tagText = normalize((input.tags ?? []).join(" "));
  const ingText = normalize(
    (input.ingredients ?? []).map((i) => i.name).join(" ")
  );
  const haystack = `${titleN} | ${tagText} | ${ingText}`;

  const tags = new Set<DietaryTagId>();

  // Heurística por ingredientes
  const hasMeat = /\b(carne|frango|boi|bovina|suina|porco|lombo|pernil|costela|bacon|calabresa|linguica|charque|picanha|file|bife|hamburguer|strogonoff|churrasco)\b/.test(
    haystack
  );
  const hasFishOrSeafood = /\b(peixe|camarao|lula|polvo|salmao|tilapia|bacalhau|atum|robalo)\b/.test(
    haystack
  );
  const hasEgg = /\b(ovo|ovos)\b/.test(haystack);
  // Detecta laticínios com cautela: "leite de coco", "leite de amêndoas", "leite de soja" não são laticínios
  // Detecta laticínios. "Leite de coco/amêndoas/soja" NÃO contam.
  const isPlantMilkContext = /\bleite de (coco|amendoas|amêndoas|soja|aveia|castanha|arroz|amendoim)\b/.test(
    haystack
  );
  const hasDairy =
    /\b(creme de leite|manteiga|queijo|mussarela|muçarela|parmesao|parmesão|ricota|catupiry|requeijao|requeijão|iogurte|ninho|leite condensado)\b/.test(
      haystack
    ) || (/\bleite\b/.test(haystack) && !isPlantMilkContext);
  const hasGluten = /\b(trigo|farinha|macarrao|espaguete|spaghetti|penne|lasanha|pao|massa)\b/.test(
    haystack
  );
  const hasSugar = /\b(acucar|leite condensado|chocolate|brigadeiro|calda|gelado|mel|panqueca|doce|sobremesa)\b/.test(
    haystack
  );
  const hasNuts = /\b(amendoim|castanha|nozes|amendoas|avelã|avela)\b/.test(haystack);
  const hasShellfish = /\b(camarao|lula|polvo|vieira|frutos do mar|marisco)\b/.test(
    haystack
  );
  const hasSoy = /\b(soja|shoyu|tofu)\b/.test(haystack);

  const isDessert = hasSugar || /brigadeiro|doce|sobremesa|bolo|gelado|sorvete|mousse/.test(haystack);
  const isDrink = /\b(caipirinha|suco|drink|coquetel|shake|smoothie|vodka|gin)\b/.test(
    haystack
  );

  const isVeg = !hasMeat && !hasFishOrSeafood;
  const isVegan = isVeg && !hasEgg && !hasDairy;

  if (isVegan) tags.add("vegan");
  else if (isVeg) tags.add("vegetarian");

  if (!hasGluten) tags.add("gluten-free");
  if (!hasDairy) tags.add("lactose-free");
  if (!hasShellfish) tags.add("shellfish-free");
  if (!hasNuts) tags.add("nut-free");
  if (!hasEgg) tags.add("egg-free");
  if (!hasSoy) tags.add("soy-free");

  // Low-carb: receita salgada sem massa/arroz/bolo e com proteína/carboidratos de baixo IG
  const isSavory =
    !isDessert && !isDrink && (hasMeat || hasFishOrSeafood || hasEgg || /(legume|vegetal|verdura|frango|carne)/.test(haystack));
  const hasHighCarb =
    /\b(macarrao|lasanha|arroz|massa|farinha|trigo|pao|bolo|batata doce|pao de queijo|brigadeiro|panqueca|cuscuz|polenta|quinoa)\b/.test(
      haystack
    );
  if (isSavory && !hasHighCarb) tags.add("low-carb");
  if (isSavory && (hasMeat || hasFishOrSeafood || hasEgg)) tags.add("high-protein");

  // Detecção específica do acervo
  if (/sem gluten/.test(tagText)) tags.add("gluten-free");
  if (/sem lactose/.test(tagText)) tags.add("lactose-free");
  if (/vegano/.test(tagText)) tags.add("vegan");
  if (/vegetariano/.test(tagText)) tags.add("vegetarian");
  if (/low carb|keto/.test(tagText)) tags.add("low-carb");
  if (/fitness|proteina/.test(tagText)) tags.add("high-protein");

  // Alérgenos: só os principais (não inclui categorias inteiras como "frango").
  // Usa word-boundary para evitar "leite de coco" virar alérgeno de leite.
  const allergensSet = new Set<string>();
  const wordHit = (term: string) => new RegExp(`(?:^|\\W)${term}(?:$|\\W)`).test(haystack);
  for (const a of ALLERGEN_TERMS) {
    // Se for alérgeno de leite e o "leite" só aparecer como leite vegetal, ignora.
    if (a.label === "Leite" && isPlantMilkContext && !/\b(creme de leite|manteiga|queijo|requeijao|requeijão|iogurte|leite condensado)\b/.test(haystack)) {
      continue;
    }
    if (wordHit(a.term) && !["Não aplicável", "Peixe"].includes(a.label)) {
      allergensSet.add(a.label);
    }
  }
  const allergens = Array.from(allergensSet);

  // Nota humana curta
  const positives: string[] = [];
  if (tags.has("vegetarian")) positives.push("vegetariana");
  if (tags.has("vegan")) positives.push("vegana");
  if (tags.has("gluten-free")) positives.push("sem glúten");
  if (tags.has("lactose-free")) positives.push("sem lactose");
  if (tags.has("low-carb")) positives.push("low carb");

  const warnings: string[] = [];
  if (allergens.includes("Glúten")) warnings.push("contém glúten");
  if (allergens.includes("Leite")) warnings.push("contém leite/laticínios");
  if (allergens.includes("Ovos")) warnings.push("contém ovos");
  if (allergens.includes("Amendoim")) warnings.push("contém amendoim");
  if (allergens.includes("Castanhas/Nozes")) warnings.push("contém castanhas/nozes");
  if (allergens.includes("Frutos do mar")) warnings.push("contém frutos do mar");
  if (allergens.includes("Soja")) warnings.push("contém soja");
  if (allergens.includes("Açúcar")) warnings.push("tem açúcar");

  let note = "";
  if (positives.length > 0) {
    note += "Esta receita é " + positives.slice(0, 3).join(", ") + ".";
  }
  if (warnings.length > 0) {
    if (note) note += " ";
    note += "Atenção: " + warnings.slice(0, 4).join(", ") + ".";
  }
  if (!note) note = "Confira sempre os rótulos dos ingredientes para garantir.";

  return { tags: Array.from(tags), allergens, note };
}
