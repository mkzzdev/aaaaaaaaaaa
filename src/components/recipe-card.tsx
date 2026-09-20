import Link from "next/link";
import type { Recipe } from "@/lib/types";
import { formatMinutes } from "@/lib/format";
import { ClockIcon, FlameIcon, SparklesIcon, UsersIcon } from "./icons";

export default function RecipeCard({
  recipe,
  index = 0,
}: {
  recipe: Recipe;
  index?: number;
}) {
  const total = recipe.prepTime + recipe.cookTime;

  return (
    <Link
      href={`/receita/${recipe.id}`}
      className="group anim-fade-up block"
      style={{ animationDelay: `${Math.min(index * 70, 350)}ms` }}
    >
      <div className="relative overflow-hidden rounded-xl border border-line bg-cream">
        <img
          src={recipe.image ?? undefined}
          alt={recipe.title}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink">
          {recipe.category}
        </span>
        {recipe.source === "gemini" && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-terra px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-cream">
            <SparklesIcon className="h-3 w-3" />
            IA
          </span>
        )}
      </div>
      <div className="pt-4">
        <h3 className="font-display text-xl font-semibold leading-snug transition-colors group-hover:text-terra">
          {recipe.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {recipe.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5 text-terra" />
            {formatMinutes(total)}
          </span>
          <span className="inline-flex items-center gap-1.5 capitalize">
            <FlameIcon className="h-3.5 w-3.5 text-terra" />
            {recipe.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon className="h-3.5 w-3.5 text-terra" />
            {recipe.servings} {recipe.servings === 1 ? "porção" : "porções"}
          </span>
        </div>
      </div>
    </Link>
  );
}
