import { IMG } from "./images";
import type { AcervoEntry } from "./types";

export const ACERVO: AcervoEntry[] = [
  {
    slug: "moqueca-baiana-de-peixe",
    title: "Moqueca Baiana de Peixe",
    description:
      "Peixe macio cozido em caldo dourado de leite de coco e dendê, finalizado com coentro fresco. O sabor do litoral baiano direto na sua panela.",
    category: "Carnes & Grelhados",
    prepTime: 25,
    cookTime: 30,
    servings: 4,
    difficulty: "fácil",
    calories: 340,
    image: IMG.moqueca,
    source: "acervo",
    tags: ["baiana", "peixe", "dourado", "almoço", "mar"],
    ingredients: [
      { name: "filé de peixe branco (badejo, robalo ou tilápia)", quantity: "800 g", note: "cortado em 4 postas" },
      { name: "limões", quantity: "2", note: "para o suco" },
      { name: "dentes de alho", quantity: "2", note: "amassados" },
      { name: "sal marinho", quantity: "1 colher (chá)" },
      { name: "coentro picado", quantity: "1 maço", note: "com as hastes" },
      { name: "tomates", quantity: "2", note: "em rodelas grossas" },
      { name: "cebolas", quantity: "2", note: "em rodelas grossas" },
      { name: "pimentões amarelos", quantity: "1", note: "em rodelas, opcional" },
      { name: "leite de coco", quantity: "400 ml" },
      { name: "azeite de dendê", quantity: "3 colheres (sopa)" },
      { name: "pimenta-do-reino", quantity: "a gosto" },
      { name: "coentro para servir", quantity: "1 punhado" },
    ],
    steps: [
      { title: "Marine o peixe", instruction: "Coloque os filés em um prato largo, regue com o suco dos limões e o alho amassado, tempere com uma pitada de sal e deixe pegar sabor por 15 minutos." },
      { title: "Aproveite a marinada", instruction: "Retire o peixe, reserve o líquido (o famoso leite de tigre) e misture nele o coentro picado. Esse caldo é a alma da moqueca." },
      { title: "Arrume a cama de legumes", instruction: "Em uma panela de barro ou de fundo largo, disponha cebola, tomate e pimentão em rodelas alternadas cobrindo o fundo." },
      { title: "Doure no dendê", instruction: "Aqueça o azeite de dendê em fogo médio, adicione o peixe e doure por cerca de 2 minutos de cada lado, com delicadeza." },
      { title: "Cozinhe o caldo", instruction: "Despeje o leite de tigre com coentro e o leite de coco, tampe e cozinhe em fogo baixo por 15 minutos, regando o peixe de vez em quando." },
      { title: "Descanse e sirva", instruction: "Fora do fogo, deixe repousar 5 minutos. Sirva com o caldo por cima, acompanhado de arroz branco e farofa." },
    ],
    tips: [
      "Sem panela de barro? Uma panela esmaltada preta funciona, mas não mexa o peixe no caldo.",
      "O leite de tigre (marinada de limão) é o que dá o sabor: nunca jogue fora.",
      "Dendê fresco intensifica; o congelado deixa o sabor mais suave.",
    ],
  },
  {
    slug: "feijoada-completa",
    title: "Feijoada Completa",
    description:
      "O clássico dos clássicos: feijão-preto cozido lentamente com carnes e linguiças defumadas, servido com arroz, couve na manteiga, laranja e farofa.",
    category: "Pratos Principais",
    prepTime: 40,
    cookTime: 210,
    servings: 6,
    difficulty: "difícil",
    calories: 580,
    image: IMG.feijoada,
    source: "acervo",
    tags: ["clássico", "feijão", "sábado", "brasileira", "festa"],
    ingredients: [
      { name: "feijão-preto", quantity: "500 g", note: "de molho 12h antes" },
      { name: "costelinha de porco defumada", quantity: "300 g" },
      { name: "lombo seco (charque)", quantity: "200 g", note: "de molho na véspera" },
      { name: "linguiça calabresa defumada", quantity: "200 g", note: "em rodelas grossas" },
      { name: "pe de porco ou galinha", quantity: "1", note: "opcional, para o caldo encorpar" },
      { name: "folhas de louro", quantity: "2" },
      { name: "dentes de alho", quantity: "2", note: "picados" },
      { name: "cebola", quantity: "1", note: "picada" },
      { name: "tomates", quantity: "2", note: "em cubos pequenos" },
      { name: "vinho tinto seco", quantity: "1/2 xícara" },
      { name: "pimenta-do-reino e cominho", quantity: "a gosto" },
      { name: "couve", quantity: "500 g", note: "para a couve na manteiga" },
      { name: "manteiga", quantity: "4 colheres (sopa)" },
      { name: "arroz, farofa e laranja", quantity: "para servir" },
    ],
    steps: [
      { title: "Cozinhe o feijão", instruction: "Escorra o feijão de molho e cozinhe com a costelinha, o lombo e o pe de porco na panela de pressão por 25 minutos após a primeira fervura." },
      { title: "Doure as carnes", instruction: "Em uma panela larga, doure a calabresa e a linguiça na própria gordura e reserve." },
      { title: "Faça a base", instruction: "Na mesma panela, refogue a cebola e o alho, junte o tomate e cozinhe até murchar." },
      { title: "Une tudo", instruction: "Adicione o feijão com o caldo, o louro, as carnes douradas, a pimenta, o cominho e o vinho." },
      { title: "Apure lentamente", instruction: "Deixe apurar em fogo baixo por 1h30, adicionando água quente se o caldo apertar demais." },
      { title: "Faça a couve", instruction: "Lave a couve, pique fininha e salteie na manteiga com alho por 3 minutos até murchar." },
      { title: "Monte o prato", instruction: "Sirva a feijoada com arroz, couve, farofa crocante, rodelas de laranja e limão." },
    ],
    tips: [
      "Comece na véspera: o molho do feijão e do charque corta pela metade o tempo de fogo.",
      "Tempere no final — o vinho e o cominho apuram e intensificam durante a cocção.",
      "Feijoada no dia seguinte fica melhor: reaqueça em fogo baixo com um fio de água.",
    ],
  },
  {
    slug: "pao-de-queijo-mineiro",
    title: "Pão de Queijo Mineiro",
    description:
      "Casquinha crocante por fora, massa macia e puxenta por dentro. O lanche que combina com café coado em qualquer hora do dia.",
    category: "Pães & Lanches",
    prepTime: 30,
    cookTime: 25,
    servings: 40,
    difficulty: "fácil",
    calories: 85,
    image: IMG.paoDeQueijo,
    source: "acervo",
    tags: ["lanche", "café", "mineiro", "sem glúten", "freezer"],
    ingredients: [
      { name: "polvilho azedo", quantity: "500 g" },
      { name: "leite", quantity: "200 ml" },
      { name: "água", quantity: "100 ml" },
      { name: "óleo de girassol", quantity: "100 ml" },
      { name: "água de coco", quantity: "150 ml", note: "ou mais leite" },
      { name: "ovos", quantity: "2" },
      { name: "queijo minas meia-cura ralado", quantity: "300 g", note: "ou parmesão" },
      { name: "sal", quantity: "1 colher (chá)" },
      { name: "manteiga", quantity: "1 colher (sopa)" },
      { name: "noz-moscada ralada", quantity: "1 pitada", note: "opcional" },
    ],
    steps: [
      { title: "Aqueça os líquidos", instruction: "Ferva em uma panela o leite, a água, o óleo, a água de coco, o sal e a manteiga." },
      { title: "Cozinhe o polvilho", instruction: "Fora do fogo, junte o polvilho azedo de uma vez e misture até formar uma massa lisa e levemente granulada." },
      { title: "Incorpore os ovos", instruction: "Adicione um ovo por vez, misturando bem a cada incorporação." },
      { title: "Misture o queijo", instruction: "Junte o queijo ralado e a noz-moscada até a massa ficar homogênea." },
      { title: "Modele", instruction: "Com as mãos úmidas, faça bolas do tamanho de uma noz e disponha em assadeira untada com espaço entre elas." },
      { title: "Asse", instruction: "Em forno preaquecido a 180 °C, asse por 25 a 30 minutos, até dourar." },
      { title: "Sirva morno", instruction: "Deixe amornar 5 minutos e sirva com café passado na hora." },
    ],
    tips: [
      "Se a massa grudar muito, modele com as mãos e uma colher — não desanime.",
      "Congele até 2 meses já modelados e asse de congelado com 5 minutos a mais.",
      "O minas meia-cura dá a textura puxenta; só parmesão deixa mais duro.",
    ],
  },
  {
    slug: "brigadeiro-classico",
    title: "Brigadeiro Clássico",
    description:
      "O doce mais brasileiro que existe: brigadeiro de panela com chocolate intenso, ponto cremoso e granulado na medida. Perfeito para festas e fins de semana.",
    category: "Sobremesas",
    prepTime: 10,
    cookTime: 10,
    servings: 40,
    difficulty: "fácil",
    calories: 95,
    image: IMG.brigadeiro,
    source: "acervo",
    tags: ["doce", "festa", "chocolate", "rápido"],
    ingredients: [
      { name: "leite condensado", quantity: "1 lata (395 g)" },
      { name: "cacau em pó", quantity: "3 colheres (sopa)", note: "de boa qualidade" },
      { name: "manteiga sem sal", quantity: "2 colheres (sopa)" },
      { name: "chocolate meio amargo", quantity: "1 colher (sopa)" },
      { name: "sal", quantity: "1 pitada" },
      { name: "granulado de chocolate", quantity: "a gosto" },
      { name: "forminhas de papel", quantity: "40" },
    ],
    steps: [
      { title: "Misture fora do fogo", instruction: "Em uma panela antiaderente (fogo desligado), misture o leite condensado, o cacau, a manteiga, o chocolate e o sal." },
      { title: "Cozinhe até o ponto", instruction: "Leve ao fogo baixo, mexendo sem parar, até a massa soltar do fundo da panela (8 a 10 minutos)." },
      { title: "Descanse", instruction: "Despeje em um prato untado, cubra com filme tocando a superfície e deixe esfriar completamente." },
      { title: "Boleie", instruction: "Com as mãos untadas de manteiga, faça bolinhas pequenas e enrole no granulado." },
      { title: "Embuta e guarde", instruction: "Posicione cada brigadeiro nas forminhas. Mantenha em pote fechado por até 4 dias (ou congele por 2 meses)." },
    ],
    tips: [
      "Fogo baixo é tudo: no fogo alto o brigadeiro fica borrachudo.",
      "O ponto certo é quando uma gota endurece em uns 5 segundos em água gelada.",
      "Para um resultado mais intenso, troque 1 colher de leite condensado por 30 ml de leite.",
    ],
  },
  {
    slug: "escondidinho-de-carne-seca",
    title: "Escondidinho de Carne Seca",
    description:
      "Purê de mandioca aveludado cobrindo carne-seca desfiada e temperada, gratinado com queijos até dourar. Conforto em forma de refratário.",
    category: "Pratos Principais",
    prepTime: 35,
    cookTime: 40,
    servings: 6,
    difficulty: "médio",
    calories: 460,
    image: IMG.escondidinho,
    source: "acervo",
    tags: ["conforto", "carne-seca", "assado", "almoço"],
    ingredients: [
      { name: "mandioca (aipim)", quantity: "500 g", note: "descascada" },
      { name: "carne-seca desfiada", quantity: "300 g", note: "sem osso e sem gordura" },
      { name: "cebola", quantity: "1", note: "em rodelas" },
      { name: "dentes de alho", quantity: "3", note: "picados" },
      { name: "tomates", quantity: "2", note: "em cubos pequenos" },
      { name: "coentro fresco picado", quantity: "1/2 xícara" },
      { name: "manteiga", quantity: "2 colheres (sopa)" },
      { name: "leite", quantity: "1 xícara" },
      { name: "queijo minas ralado", quantity: "100 g", note: "ou muçarela" },
      { name: "parmesão ralado", quantity: "50 g" },
      { name: "gema de ovo", quantity: "1" },
      { name: "vinho branco seco", quantity: "1/2 xícara" },
      { name: "sal e pimenta-do-reino", quantity: "a gosto" },
      { name: "farofa crocante", quantity: "1 punhado", note: "para servir" },
    ],
    steps: [
      { title: "Prepare a carne-seca", instruction: "Cozinhe a carne-seca em água fervente por 20 minutos, escorra, desfie e retire o excesso de gordura." },
      { title: "Faça o refogado", instruction: "Em uma panela, refogue a cebola e o alho na manteiga, junte a carne-seca, o vinho, o tomate e o coentro. Cozinhe por 10 minutos." },
      { title: "Cozinhe a mandioca", instruction: "Cozinhe a mandioca descascada em água salgada até ficar macia ao garfo (25 a 30 minutos)." },
      { title: "Faça o purê", instruction: "Amasse a mandioca ainda quente com a manteiga, o leite e o sal até formar um purê liso e cremoso." },
      { title: "Monte o escondidinho", instruction: "Espalhe metade do purê em um refratário untado, cubra com a carne-seca e finalize com o restante do purê." },
      { title: "Gratine", instruction: "Cubra com o minas e o parmesão, risque a gema por cima e asse a 200 °C por 25 minutos, até dourar." },
      { title: "Sirva quente", instruction: "Sirva ainda quente, acompanhado da farofa crocante e de uma salada verde." },
    ],
    tips: [
      "Amasse a mandioca bem quente para o purê absorver a manteiga e o leite.",
      "Para um sabor ainda mais fundo, frite rodelas de bacon junto no refogado.",
      "Congele antes de gratinar e asse de congelado com 10 minutos a mais.",
    ],
  },
  {
    slug: "bolo-de-cenoura-com-chocolate",
    title: "Bolo de Cenoura com Chocolate",
    description:
      "Massa fofinha de cenoura com óleo — o truque das padarias — coberta por um brigadeiro espelhado. A sobremesa mais pedida das mesas brasileiras.",
    category: "Sobremesas",
    prepTime: 20,
    cookTime: 40,
    servings: 12,
    difficulty: "fácil",
    calories: 270,
    image: IMG.boloCenoura,
    source: "acervo",
    tags: ["bolo", "chocolate", "festa", "clássico"],
    ingredients: [
      { name: "cenouras", quantity: "3", note: "raladas" },
      { name: "ovos", quantity: "4" },
      { name: "óleo vegetal", quantity: "1 xícara" },
      { name: "farinha de trigo", quantity: "2 xícaras" },
      { name: "fermento em pó", quantity: "1 colher (chá)" },
      { name: "açúcar", quantity: "2 xícaras" },
      { name: "canela em pó", quantity: "1 colher (chá)", note: "opcional" },
      { name: "leite condensado (cobertura)", quantity: "1 lata (395 g)" },
      { name: "cacau em pó (cobertura)", quantity: "3 colheres (sopa)" },
      { name: "manteiga (cobertura)", quantity: "2 colheres (sopa)" },
      { name: "chocolate meio amargo (cobertura)", quantity: "1 colher (sopa)" },
    ],
    steps: [
      { title: "Bata o que é molhado", instruction: "No liquidificador, bata a cenoura ralada, os ovos e o óleo até ficar homogêneo." },
      { title: "Misture a massa", instruction: "Em uma tigela, misture a farinha, o fermento, o açúcar e a canela. Despeje o liquidificado e envolva delicadamente." },
      { title: "Asse", instruction: "Despeje em forma de buraco untada e enfarinhada e asse a 180 °C por 35 a 40 minutos, até o palito sair limpo." },
      { title: "Faça a cobertura", instruction: "Em panela, cozinhe o leite condensado, o cacau, a manteiga e o chocolate em fogo baixo até soltar do fundo." },
      { title: "Espalhe", instruction: "Morno, espalhe a cobertura sobre o bolo (morno também) para ela secar com efeito espelhado." },
      { title: "Deixe assentar", instruction: "Espere pelo menos 2 horas (ou leve à geladeira) antes de cortar." },
    ],
    tips: [
      "O óleo no lugar da manteiga é o segredo do bolo úmido que dura dias.",
      "Não pule o descanso de 2 horas: ele fixa a cobertura e assenta o sabor.",
      "Troque 1/3 do açúcar por demerara para uma massa mais aveludada.",
    ],
  },
  {
    slug: "strogonoff-de-frango",
    title: "Strogonoff de Frango",
    description:
      "Frango dourado em molho cremoso de champignon, ketchup e creme de leite — a receita de panela que resolve o jantar em menos de 40 minutos.",
    category: "Pratos Principais",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "fácil",
    calories: 410,
    image: IMG.strogonoff,
    source: "acervo",
    tags: ["rápido", "cremoso", "jantar", "família", "frango"],
    ingredients: [
      { name: "peito de frango sem osso", quantity: "500 g", note: "em cubos" },
      { name: "amido de milho", quantity: "1 colher (sopa)" },
      { name: "suco de limão", quantity: "1 colher (chá)" },
      { name: "dente de alho", quantity: "1", note: "picado" },
      { name: "cebola", quantity: "1/2", note: "em meias-luas" },
      { name: "champignons fatiados", quantity: "100 g" },
      { name: "ketchup", quantity: "2 colheres (sopa)" },
      { name: "mostarda amarela", quantity: "1 colher (sopa)" },
      { name: "molho de tomate", quantity: "1 colher (sopa)" },
      { name: "vinho branco seco", quantity: "1/2 xícara", note: "ou caldo de frango" },
      { name: "creme de leite", quantity: "200 ml" },
      { name: "manteiga", quantity: "2 colheres (sopa)" },
      { name: "batata palha", quantity: "300 g", note: "ou arroz branco" },
    ],
    steps: [
      { title: "Prepare o frango", instruction: "Misture os cubos de frango com o amido, o limão, o alho, sal e pimenta. Deixe por 10 minutos." },
      { title: "Doure em fogo alto", instruction: "Doure o frango em uma frigideira quente com 1 colher de manteiga, em levas, por 2 a 3 minutos por lado. Reserve." },
      { title: "Refogue", instruction: "Na mesma frigideira, refogue a cebola e os champignons na manteiga até dourarem." },
      { title: "Monte o molho", instruction: "Junte o ketchup, a mostarda e o molho de tomate, cozinhe 1 minuto e desglaceie com o vinho." },
      { title: "Cremeie", instruction: "Acrescente o creme de leite, deixe ferver, devolva o frango e cozinhe por 5 minutos em fogo baixo." },
      { title: "Sirva", instruction: "Sirva com batata palha (ou arroz branco) e um toque de salsa fresca." },
    ],
    tips: [
      "O amido é o segredo do molho aveludado das casas especializadas.",
      "Se o molho encorpar demais, solte com 2 colheres de sopa de água.",
      "Troque o vinho pelo caldo de frango para deixar a receita sem álcool.",
    ],
  },
  {
    slug: "caipirinha-de-limao",
    title: "Caipirinha de Limão",
    description:
      "Limão-taiti macerado na pedra, cachaça boa e açúcar na medida. O drink brasileiro mais famoso do mundo, pronto em 5 minutos.",
    category: "Bebidas",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "fácil",
    calories: 180,
    image: IMG.caipirinha,
    source: "acervo",
    tags: ["drink", "brasileiro", "verão", "5 minutos"],
    ingredients: [
      { name: "limões-taiti", quantity: "2", note: "grandes" },
      { name: "açúcar branco", quantity: "2 colheres (sopa)", note: "1 por copo" },
      { name: "cachaça envelhecida", quantity: "120 ml", note: "60 ml por copo" },
      { name: "gelo em cubos pequenos", quantity: "1 copo" },
      { name: "folhas de hortelã", quantity: "4", note: "opcional" },
      { name: "rodelas de limão", quantity: "2", note: "para decorar" },
    ],
    steps: [
      { title: "Prepare os limões", instruction: "Lave os limões, corte as pontas, fatie em 8 pedaços e retire a polpa branca, que amarga." },
      { title: "Macerie", instruction: "Em um copo baixo, coloque as fatias de limão e o açúcar. Macere com leveza para soltar o suco, sem esmagar a casca." },
      { title: "Complete com gelo", instruction: "Encha o copo com bastante gelo pequeno, deixando um dedo de espaço." },
      { title: "Adicione a cachaça", instruction: "Despeje a cachaça e mexa por 10 segundos para integrar." },
      { title: "Finalize", instruction: "Coroé com uma rodela de limão e hortelã. Sirva imediatamente." },
    ],
    tips: [
      "Retire sempre a parte branca da casca: é ela que amarga o drink.",
      "Macerar com força esmaga a casca e deixa o sabor amargo — toque leve.",
      "Para uma versão tropical, troque 30 ml da cachaça por polpa de maracujá.",
    ],
  },
];

/** Escolhe a receita do acervo que melhor casa com o pedido (modo sem IA). */
export function pickFallback(prompt: string): AcervoEntry {
  const p = prompt
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const words = new Set(
    p
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );

  let best = ACERVO[Math.floor(Math.random() * ACERVO.length)];
  let bestScore = 0;

  for (const entry of ACERVO) {
    const hay = `${entry.title} ${entry.tags.join(" ")} ${entry.category}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    let score = 0;
    for (const w of words) if (hay.includes(w)) score += 2;
    if (p.includes(entry.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) score += 5;
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best;
}
