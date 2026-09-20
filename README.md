# 🍳 ReceitasComIA

Site de receitas em português com **Inteligência Artificial (Google Gemini)**: você descreve o que quer comer e a IA monta a receita completa — ingredientes, modo de preparo, restrições alimentares e segredos do chef.

Feito com **Next.js (App Router)**, **PostgreSQL** + **Drizzle ORM** e **Tailwind CSS**.

---

## 🚀 Como publicar com um link permanente (100% grátis)

Os links de demonstração temporários expiram. Para ter um endereço fixo que **nunca expira** (ex.: `receitas-com-ia.vercel.app`), publique você mesmo em ~15 minutos seguindo os passos abaixo. Tudo com plano gratuito.

### Passo 1 — Colocar o código no GitHub

1. Crie uma conta em [github.com](https://github.com) (grátis).
2. Clique em **New repository**, dê um nome (ex.: `receitas-com-ia`) e crie o repositório **sem** marcar nenhuma caixinha extra.
3. Na pasta do projeto, no terminal, rode (troque a URL pela do seu repositório):

```bash
git init
git add .
git commit -m "ReceitasComIA"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/receitas-com-ia.git
git push -u origin main
```

> O arquivo `.env` (com suas senhas) **não** será enviado — ele já está protegido pelo `.gitignore`.

### Passo 2 — Criar o banco de dados grátis (Neon)

1. Crie uma conta em [neon.tech](https://neon.tech) (grátis, pode entrar com o GitHub).
2. Clique em **New Project**, escolha um nome e a região mais próxima (ex.: US East).
3. Ao abrir o projeto, clique em **Connect** e ative a opção **Pooling** (ela é feita para hospedagem como a Vercel — a string terá `-pooler` no endereço). Copie a **Connection String** (começa com `postgresql://...`). Guarde — ela é a sua `DATABASE_URL`.
4. Ainda no painel do Neon, abra o **SQL Editor** e cole o comando abaixo para criar a tabela (depois clique em **Run**):

```sql
CREATE TABLE IF NOT EXISTS "recipes" (
  "id" text PRIMARY KEY NOT NULL,
  "slug" text,
  "title" text NOT NULL,
  "description" text DEFAULT '' NOT NULL,
  "category" text DEFAULT 'Pratos Principais' NOT NULL,
  "prep_time" integer DEFAULT 15 NOT NULL,
  "cook_time" integer DEFAULT 30 NOT NULL,
  "servings" integer DEFAULT 4 NOT NULL,
  "difficulty" text DEFAULT 'fácil' NOT NULL,
  "calories" integer,
  "ingredients" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "steps" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "tips" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "tags" text[] DEFAULT '{}' NOT NULL,
  "dietary" jsonb,
  "prompt" text,
  "image" text,
  "source" text DEFAULT 'gemini' NOT NULL,
  "saved_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "recipes_slug_unique" UNIQUE("slug")
);
```

### Passo 3 — Hospedar o site grátis (Vercel)

1. Crie uma conta em [vercel.com](https://vercel.com) (grátis, entre com o GitHub).
2. Clique em **Add New → Project** e escolha **Import** no seu repositório `receitas-com-ia`.
3. Na tela de configuração, abra **Environment Variables** e adicione estas 2 variáveis:
   - `DATABASE_URL` → cole a Connection String do Neon (do Passo 2).
   - `GEMINI_API_KEY` → sua chave do Gemini (gere grátis em [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)).
4. Clique em **Deploy** e aguarde ~2 minutos. ✅

Pronto! Você recebe um link permanente como `https://receitas-com-ia.vercel.app`.

> 💡 **Atualizações automáticas:** toda vez que você enviar mudanças para o GitHub (`git push`), a Vercel publica a nova versão sozinha, no mesmo link.

---

## 💻 Rodar localmente (no seu computador)

Pré-requisitos: [Node.js 20+](https://nodejs.org) e um PostgreSQL rodando (ou use a string do Neon).

```bash
npm install
cp .env.example .env   # depois edite o .env com seus valores
npx drizzle-kit push   # cria as tabelas no banco
npm run dev            # abre em http://localhost:3000
```

| Comando         | Para que serve                    |
| --------------- | --------------------------------- |
| `npm run dev`   | Rodar em modo desenvolvimento     |
| `npm run build` | Gerar a versão de produção        |
| `npm start`     | Rodar a versão de produção        |
| `npm run lint`  | Verificar problemas no código     |

## 🔑 Variáveis de ambiente

| Variável         | Onde conseguir                                          | Obrigatória? |
| ---------------- | ------------------------------------------------------- | ------------ |
| `DATABASE_URL`   | Connection String do PostgreSQL (Neon)                  | Sim          |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) | Não*         |

\*Sem a chave do Gemini, o site funciona com o acervo de receitas da casa (modo offline).

## 📁 Estrutura do projeto

```
src/
├── app/                  # Páginas e rotas da API (Next.js App Router)
│   ├── api/recipe/       # Geração de receitas via Gemini
│   ├── receita/[id]/     # Página de detalhes da receita
│   ├── historico/        # Histórico de pedidos
│   └── minhas-receitas/  # Receitas salvas (favoritas)
├── components/           # Componentes React (barra de pedido, cards, etc.)
├── db/                   # Conexão e schema do banco (Drizzle)
└── lib/                  # IA Gemini, imagens, restrições alimentares, etc.
```
