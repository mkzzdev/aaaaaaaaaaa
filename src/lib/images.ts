const px = (id: number, ext: "jpeg" | "png" = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

export const IMG = {
  // Acervo / clássicos brasileiros
  moqueca: px(34520964),
  feijoada: px(34442361),
  paoDeQueijo: px(34520946),
  brigadeiro: px(38441749),
  escondidinho: px(34985106),
  boloCenoura: px(17653570),
  strogonoff: px(11256675),
  caipirinha: px(11009211),

  // Genéricas por categoria
  pasta: px(36430172),
  arroz: px(31317038),
  sopa: px(6956982),
  cafe: px(10806985),
  bebida: px(37662776),
  carne: px(18852565),
  prato: px(34520961),
  especiarias: px(4871144),

  // Biblioteca ampliada por prato/ingrediente
  risoto: px(30302196),
  frangoAssado: px(35468827),
  salada: px(5966438),
  pizza: px(19260728),
  hamburguer: px(1552641),
  boloChocolate: px(3740193),
  camarao: px(29060110),
  panqueca: px(30911414),
  churrasco: px(31617236),
  taco: px(25391591),
  biscoito: px(37108654),
  smoothie: px(16096610),
  sobremesaGelada: px(28869113),
  salmao: px(12017478),
  pao: px(19987202),
  wrap: px(14979836),
};

export const CATEGORY_IMAGES: Record<string, string> = {
  Massas: IMG.pasta,
  "Arroz & Guarnições": IMG.arroz,
  "Sopas & Caldos": IMG.sopa,
  Sobremesas: IMG.boloChocolate,
  "Café da Manhã": IMG.cafe,
  Bebidas: IMG.bebida,
  "Carnes & Grelhados": IMG.carne,
  "Pães & Lanches": IMG.pao,
  "Pratos Principais": IMG.prato,
};

export const CATEGORY_OPTIONS = Object.keys(CATEGORY_IMAGES);

/**
 * Regras de correspondência por palavras-chave.
 * A ordem importa: regras mais específicas devem vir antes das genéricas.
 * Cada termo é comparado sem acento e em minúsculas.
 */
type ImageRule = { image: string; terms: string[] };

const IMAGE_RULES: ImageRule[] = [
  // === NÍVEL 1: pratos muito específicos (nome exato do prato) ===
  // Clássicos brasileiros
  { image: IMG.moqueca, terms: ["moqueca"] },
  { image: IMG.feijoada, terms: ["feijoada", "feijao preto", "tutu"] },
  { image: IMG.paoDeQueijo, terms: ["pao de queijo", "chipa"] },
  { image: IMG.brigadeiro, terms: ["brigadeiro", "beijinho", "negrinho"] },
  { image: IMG.escondidinho, terms: ["escondidinho", "carne seca", "carne-seca", "carne de sol"] },
  { image: IMG.strogonoff, terms: ["strogonoff", "estrogonofe", "stroganoff"] },

  // Massas com nome próprio
  { image: IMG.pizza, terms: ["pizza", "calzone"] },
  { image: IMG.risoto, terms: ["risoto", "risotto"] },

  // Sobremesas com nome próprio (antes das regras genéricas de "chocolate"/"bolo")
  { image: IMG.biscoito, terms: ["biscoito", "cookie", "bolacha", "sequilho", "amanteigado"] },
  { image: IMG.boloCenoura, terms: ["bolo de cenoura", "bolo de fuba", "bolo de milho", "cuca"] },
  { image: IMG.boloChocolate, terms: ["bolo de chocolate", "brownie", "torta de chocolate", "cupcake", "muffin"] },
  { image: IMG.sobremesaGelada, terms: ["sorvete", "picole", "gelado", "gelada", "cheesecake", "pave", "pavê", "gelatina", "pudim", "manjar", "mousse", "torta de limao", "torta gelada", "torta de morango"] },

  // Pratos que combinam ingrediente forte — precisam vir antes de "frango"/"carne"
  { image: IMG.salada, terms: ["salada", "salpicao", "caesar", "caprese"] },
  { image: IMG.sopa, terms: ["sopa", "caldo verde", "canja", "creme de", "caldinho", "minestrone", "gazpacho", "sopao"] },
  { image: IMG.hamburguer, terms: ["hamburguer", "hamburger", "burger", "cheeseburger", "smash"] },
  { image: IMG.wrap, terms: ["wrap", "burrito", "taco", "quesadilla", "tortilha"] },
  { image: IMG.panqueca, terms: ["panqueca", "pancake", "waffle", "crepe", "tapioca"] },
  { image: IMG.frangoAssado, terms: ["frango assado", "frango ao forno", "frango inteiro", "galinha assada"] },

  // === NÍVEL 2: massas e categorias amplas ===
  { image: IMG.pasta, terms: ["macarrao", "espaguete", "spaghetti", "penne", "talharim", "massa", "lasanha", "nhoque", "gnocchi", "carbonara", "bolonhesa", "fettuccine", "ravioli", "canelone"] },

  // Peixes e frutos do mar
  { image: IMG.salmao, terms: ["salmao", "salmão", "atum", "bacalhau"] },
  { image: IMG.camarao, terms: ["camarao", "camarão", "frutos do mar", "lula", "polvo", "vieira", "bobó"] },

  // Aves e carnes (ingrediente principal)
  { image: IMG.churrasco, terms: ["churrasco", "picanha", "costela", "costelinha", "linguica", "espetinho", "bife", "file mignon", "ancho", "cupim", "carne bovina", "carne assada"] },
  { image: IMG.frangoAssado, terms: ["frango", "galinha", "coxa", "sobrecoxa", "peito de frango", "aves"] },
  { image: IMG.carne, terms: ["carne moida", "almondega", "bolo de carne", "carne de porco", "lombo", "pernil", "costela suina", "carne"] },

  // Peixe genérico
  { image: IMG.prato, terms: ["peixe", "tilapia", "robalo", "pescada", "sardinha"] },

  // Café da manhã / pães
  { image: IMG.cafe, terms: ["cafe da manha", "café da manhã", "ovos mexidos", "ovo frito", "omelete", "brunch"] },
  { image: IMG.pao, terms: ["pao", "pães", "bisnaga", "focaccia", "brioche", "sanduiche", "sanduíche", "torrada", "bruschetta"] },

  // Vegetais / gratinados
  { image: IMG.escondidinho, terms: ["mandioca", "aipim", "gratinado", "gratin", "escondidinho"] },
  { image: IMG.salada, terms: ["folhas", "rucula", "alface", "legumes crus"] },

  // Arroz e grãos
  { image: IMG.arroz, terms: ["arroz", "baiao", "baião", "virado", "polenta", "cuscuz", "quinoa", "risoto"] },

  // Bebidas
  { image: IMG.caipirinha, terms: ["caipirinha", "caipiroska", "batida", "drink", "coquetel", "cocktail", "mojito"] },
  { image: IMG.smoothie, terms: ["smoothie", "vitamina", "shake", "suco", "iogurte"] },
  { image: IMG.bebida, terms: ["bebida", "cha", "chá", "limonada", "refresco"] },

  // === NÍVEL 3: doces genéricos (por último para não roubar de cookie/cenoura) ===
  { image: IMG.boloChocolate, terms: ["chocolate", "cacau"] },
  { image: IMG.boloChocolate, terms: ["bolo", "torta", "sobremesa", "doce"] },
  { image: IMG.sobremesaGelada, terms: ["morango", "creme", "frutas vermelhas"] },
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function imageForCategory(category?: string | null): string {
  if (category && CATEGORY_IMAGES[category]) return CATEGORY_IMAGES[category];
  return IMG.prato;
}

/**
 * Escolhe a imagem que melhor representa a receita, olhando primeiro
 * para o título e as tags (mais específicos), depois os ingredientes,
 * e por último caindo na imagem da categoria.
 */
export function imageForRecipe(input: {
  title?: string | null;
  category?: string | null;
  tags?: string[] | null;
  ingredients?: { name: string }[] | null;
}): string {
  const title = normalize(input.title ?? "");
  const tagText = normalize((input.tags ?? []).join(" "));
  const ingText = normalize(
    (input.ingredients ?? []).map((i) => i.name).join(" ")
  );

  // 1) Casar por título/tags (peso maior — é o que descreve o prato).
  for (const rule of IMAGE_RULES) {
    if (rule.terms.some((t) => title.includes(normalize(t)) || tagText.includes(normalize(t)))) {
      return rule.image;
    }
  }

  // 2) Casar pelos ingredientes principais.
  for (const rule of IMAGE_RULES) {
    if (rule.terms.some((t) => ingText.includes(normalize(t)))) {
      return rule.image;
    }
  }

  // 3) Fallback pela categoria.
  return imageForCategory(input.category);
}
