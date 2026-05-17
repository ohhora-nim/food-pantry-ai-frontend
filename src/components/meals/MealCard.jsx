// =========================================
// MealCard.jsx
// Reusable AI Meal Card Component
// =========================================

import { useState } from "react";

import {
  ChefHat,
  Clock3,
  Flame,
  Leaf,
  Salad,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// =========================================
// Helpers
// =========================================

function normalizeMealType(type) {
  if (!type) {
    return "Meal";
  }

  return String(type).replace("_", " ").toLowerCase();
}

function getMealTypeStyle(mealType) {
  const type = normalizeMealType(mealType);

  if (type.includes("breakfast")) {
    return {
      label: "Breakfast",
      icon: "🌅",
      badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
      iconBox: "bg-yellow-100 text-yellow-600",
    };
  }

  if (type.includes("lunch")) {
    return {
      label: "Lunch",
      icon: "🥗",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      iconBox: "bg-emerald-100 text-emerald-600",
    };
  }

  if (type.includes("dinner")) {
    return {
      label: "Dinner",
      icon: "🍽️",
      badge: "bg-violet-100 text-violet-700 border-violet-200",
      iconBox: "bg-violet-100 text-violet-600",
    };
  }

  return {
    label: mealType || "Meal",
    icon: "🍴",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    iconBox: "bg-slate-100 text-slate-600",
  };
}

function getScoreStyle(score = 0) {
  if (score >= 85) {
    return "text-emerald-600";
  }

  if (score >= 70) {
    return "text-amber-600";
  }

  return "text-rose-600";
}

function getScoreBadge(score = 0) {
  if (score >= 85) {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (score >= 70) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-rose-100 text-rose-700 border-rose-200";
}

function normalizeIngredients(ingredients = []) {
  if (!Array.isArray(ingredients)) {
    return [];
  }

  return ingredients.map((item) => {
    if (typeof item === "string") {
      return {
        name: item,
        category: "",
        processing_level: "",
        nutrition_tags: [],
      };
    }

    return {
      name: item.name || "ingredient",
      category: item.category || "",
      processing_level: item.processing_level || "",
      nutrition_tags: item.nutrition_tags || [],
    };
  });
}

// =========================================
// Meal Card
// =========================================

export default function MealCard({ mealType = "Meal", meal }) {
  const [openSteps, setOpenSteps] = useState(false);

  if (!meal) {
    return null;
  }

  const style = getMealTypeStyle(mealType);

  const score = Math.round(meal.score || 80);

  const ingredients = normalizeIngredients(meal.ingredients || []);

  const steps = Array.isArray(meal.steps) ? meal.steps : [];

  const visibleSteps = openSteps ? steps : steps.slice(0, 2);

  const healthReason = meal.health_reason || meal.reason || "";

  const wasteReason = meal.waste_reason || "";

  return (
    <article
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
      "
    >
      {/* =============================== */}
      {/* Header */}
      {/* =============================== */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div
            className={`
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
              ${style.iconBox}
            `}
          >
            {style.icon}
          </div>

          <div>
            <span
              className={`
                inline-flex
                px-3
                py-1
                rounded-full
                border
                text-xs
                font-semibold
                mb-3
                capitalize
                ${style.badge}
              `}
            >
              {style.label}
            </span>

            <h3 className="text-2xl font-black text-slate-800 leading-tight">
              {meal.name || "AI Meal"}
            </h3>
          </div>
        </div>

        {/* Score */}

        <div className="text-right min-w-[72px]">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Score
          </p>

          <div
            className={`
              text-4xl
              font-black
              ${getScoreStyle(score)}
            `}
          >
            {score}
          </div>
        </div>
      </div>

      {/* =============================== */}
      {/* Score Badge */}
      {/* =============================== */}

      <div className="mb-5">
        <span
          className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            text-sm
            font-semibold
            ${getScoreBadge(score)}
          `}
        >
          <Flame size={16} />
          AI Meal Quality: {score}/100
        </span>
      </div>

      {/* =============================== */}
      {/* Ingredients */}
      {/* =============================== */}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Salad size={18} className="text-emerald-600" />

          <h4 className="font-bold text-slate-800">Ingredients</h4>
        </div>

        {ingredients.length === 0 ? (
          <p className="text-sm text-slate-500">No ingredients listed.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <div
                key={`${ingredient.name}-${index}`}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                "
              >
                <div className="font-semibold text-slate-800 capitalize">
                  {ingredient.name}
                </div>

                {ingredient.category && (
                  <div className="text-xs text-slate-500 capitalize mt-1">
                    {ingredient.category}
                  </div>
                )}

                {ingredient.nutrition_tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ingredient.nutrition_tags
                      .slice(0, 3)
                      .map((tag, tagIndex) => (
                        <span
                          key={`${tag}-${tagIndex}`}
                          className="
                            rounded-full
                            bg-white
                            border
                            border-slate-200
                            px-2
                            py-0.5
                            text-xs
                            text-slate-600
                          "
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =============================== */}
      {/* Cooking Steps */}
      {/* =============================== */}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ChefHat size={18} className="text-orange-600" />

          <h4 className="font-bold text-slate-800">Cooking Steps</h4>
        </div>

        {steps.length > 0 ? (
          <div className="space-y-3">
            {visibleSteps.map((step, index) => (
              <div
                key={`${step}-${index}`}
                className="
                  flex
                  gap-3
                  rounded-2xl
                  bg-slate-50
                  border
                  border-slate-200
                  p-4
                "
              >
                <div
                  className="
                    w-8
                    h-8
                    rounded-full
                    bg-orange-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                    flex-shrink-0
                  "
                >
                  {index + 1}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
              </div>
            ))}

            {steps.length > 2 && (
              <button
                type="button"
                onClick={() => setOpenSteps((prev) => !prev)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-orange-600
                  hover:text-orange-700
                "
              >
                {openSteps ? (
                  <>
                    Show fewer steps
                    <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Show all steps
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No cooking steps available.</p>
        )}
      </div>

      {/* =============================== */}
      {/* AI Reasons */}
      {/* =============================== */}

      <div className="grid grid-cols-1 gap-4">
        {healthReason && (
          <div
            className="
              rounded-2xl
              bg-emerald-50
              border
              border-emerald-100
              p-4
            "
          >
            <div className="flex items-center gap-2 mb-2">
              <Leaf size={16} className="text-emerald-600" />

              <h4 className="font-bold text-emerald-800">Health Insight</h4>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {healthReason}
            </p>
          </div>
        )}

        {wasteReason && (
          <div
            className="
              rounded-2xl
              bg-amber-50
              border
              border-amber-100
              p-4
            "
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock3 size={16} className="text-amber-600" />

              <h4 className="font-bold text-amber-800">Waste Reduction</h4>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {wasteReason}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
