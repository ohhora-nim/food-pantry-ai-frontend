// =========================================
// WeeklyPlanner.jsx
// AI Weekly Meal Planner Component
// Supports both:
// 1) flat meals: [{ day, meal, name, ingredients, steps, health_reason, waste_reason }]
// 2) grouped meals: [{ day, meals: { breakfast, lunch, dinner } }]
// =========================================

import { useMemo, useState } from "react";

import {
  ChefHat,
  Clock3,
  Flame,
  Leaf,
  Salad,
  Sparkles,
  Utensils,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// =========================================
// Helpers
// =========================================

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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
    label: mealType,
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

function normalizeMeals(inputMeals = []) {
  if (!Array.isArray(inputMeals)) {
    return [];
  }

  const normalized = [];

  inputMeals.forEach((dayItem) => {
    // ======================================
    // Case 1:
    // flat format from latest generate_meals()
    //
    // {
    //   day: "Monday",
    //   meal: "Dinner",
    //   name: "...",
    //   ingredients: [...]
    // }
    // ======================================

    if (dayItem.name && dayItem.day) {
      normalized.push({
        day: dayItem.day,
        mealType: dayItem.meal || "Meal",
        meal: {
          name: dayItem.name,
          ingredients: normalizeIngredients(dayItem.ingredients || []),
          steps: dayItem.steps || [],
          health_reason: dayItem.health_reason || "",
          waste_reason: dayItem.waste_reason || "",
          reason: dayItem.reason || "",
          score: dayItem.score || 80,
        },
      });

      return;
    }

    // ======================================
    // Case 2:
    // grouped object format
    //
    // {
    //   day: "Monday",
    //   meals: {
    //     breakfast: {...},
    //     lunch: {...},
    //     dinner: {...}
    //   }
    // }
    // ======================================

    if (
      dayItem.day &&
      dayItem.meals &&
      typeof dayItem.meals === "object" &&
      !Array.isArray(dayItem.meals)
    ) {
      Object.entries(dayItem.meals).forEach(([mealType, meal]) => {
        if (!meal) return;

        normalized.push({
          day: dayItem.day,
          mealType,
          meal: {
            name: meal.name || "AI Meal",
            ingredients: normalizeIngredients(meal.ingredients || []),
            steps: meal.steps || [],
            health_reason: meal.health_reason || "",
            waste_reason: meal.waste_reason || "",
            reason: meal.reason || "",
            score: meal.score || 80,
          },
        });
      });

      return;
    }

    // ======================================
    // Case 3:
    // grouped array wrapper format
    //
    // {
    //   day: "Monday",
    //   meals: [
    //     { breakfast: {...} },
    //     { lunch: {...} }
    //   ]
    // }
    // ======================================

    if (dayItem.day && Array.isArray(dayItem.meals)) {
      dayItem.meals.forEach((wrapper) => {
        Object.entries(wrapper).forEach(([mealType, meal]) => {
          if (!meal) return;

          normalized.push({
            day: dayItem.day,
            mealType,
            meal: {
              name: meal.name || "AI Meal",
              ingredients: normalizeIngredients(meal.ingredients || []),
              steps: meal.steps || [],
              health_reason: meal.health_reason || "",
              waste_reason: meal.waste_reason || "",
              reason: meal.reason || "",
              score: meal.score || 80,
            },
          });
        });
      });
    }
  });

  return normalized;
}

function groupMealsByDay(meals) {
  const grouped = {};

  DAY_ORDER.forEach((day) => {
    grouped[day] = [];
  });

  meals.forEach((item) => {
    const day = item.day || "Other";

    if (!grouped[day]) {
      grouped[day] = [];
    }

    grouped[day].push(item);
  });

  return Object.entries(grouped)
    .filter(([_, meals]) => meals.length > 0)
    .map(([day, meals]) => ({
      day,
      meals,
    }));
}

// =========================================
// Empty State
// =========================================

function EmptyState() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-14
        text-center
        shadow-sm
      "
    >
      <div className="text-7xl mb-6">🍽️</div>

      <h2 className="text-3xl font-black text-slate-800 mb-4">
        No AI Meals Generated Yet
      </h2>

      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Add pantry foods and generate an AI meal plan to receive healthy,
        practical, waste-reducing meal suggestions.
      </p>
    </div>
  );
}

// =========================================
// Meal Card
// =========================================

function MealCard({ item }) {
  const [openSteps, setOpenSteps] = useState(false);

  const { mealType, meal } = item;

  const style = getMealTypeStyle(mealType);

  const score = Math.round(meal.score || 80);

  const ingredients = meal.ingredients || [];

  const visibleSteps = openSteps
    ? meal.steps || []
    : (meal.steps || []).slice(0, 2);

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
      {/* Header */}

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
              {meal.name}
            </h3>
          </div>
        </div>

        <div className="text-right min-w-[70px]">
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

      {/* Score Badge */}

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

      {/* Ingredients */}

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
                key={index}
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

                {ingredient.nutrition_tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ingredient.nutrition_tags
                      .slice(0, 3)
                      .map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
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

      {/* Cooking Steps */}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ChefHat size={18} className="text-orange-600" />

          <h4 className="font-bold text-slate-800">Cooking Steps</h4>
        </div>

        {meal.steps?.length > 0 ? (
          <div className="space-y-3">
            {visibleSteps.map((step, index) => (
              <div
                key={index}
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

            {meal.steps.length > 2 && (
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

      {/* AI Reasons */}

      <div className="grid grid-cols-1 gap-4">
        {(meal.health_reason || meal.reason) && (
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
              {meal.health_reason || meal.reason}
            </p>
          </div>
        )}

        {meal.waste_reason && (
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
              {meal.waste_reason}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

// =========================================
// Weekly Planner
// =========================================

export default function WeeklyPlanner({ meals = [] }) {
  const normalizedMeals = useMemo(() => normalizeMeals(meals), [meals]);

  const groupedMeals = useMemo(
    () => groupMealsByDay(normalizedMeals),
    [normalizedMeals],
  );

  const stats = useMemo(() => {
    const totalMeals = normalizedMeals.length;

    const avgScore =
      totalMeals > 0
        ? Math.round(
            normalizedMeals.reduce(
              (sum, item) => sum + (item.meal.score || 0),
              0,
            ) / totalMeals,
          )
        : 0;

    const uniqueIngredients = new Set();

    normalizedMeals.forEach((item) => {
      item.meal.ingredients?.forEach((ingredient) => {
        uniqueIngredients.add(ingredient.name?.toLowerCase());
      });
    });

    return {
      totalMeals,
      avgScore,
      days: groupedMeals.length,
      ingredients: uniqueIngredients.size,
    };
  }, [normalizedMeals, groupedMeals]);

  if (!meals || meals.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-orange-500
          via-amber-500
          to-yellow-500
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/20
                px-4
                py-2
                text-sm
                font-semibold
                backdrop-blur-md
                mb-5
              "
            >
              <Sparkles size={16} />
              AI Meal Generation
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              Weekly Meal Planner
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-orange-50 leading-relaxed">
              AI-generated meals designed to use pantry foods, reduce waste,
              support healthy eating, and simplify cooking decisions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 min-w-[280px]">
            <div className="rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md p-5">
              <p className="text-sm text-orange-50">Meals</p>
              <p className="text-4xl font-black mt-2">{stats.totalMeals}</p>
            </div>

            <div className="rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md p-5">
              <p className="text-sm text-orange-50">Days</p>
              <p className="text-4xl font-black mt-2">{stats.days}</p>
            </div>

            <div className="rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md p-5">
              <p className="text-sm text-orange-50">Avg Score</p>
              <p className="text-4xl font-black mt-2">{stats.avgScore}</p>
            </div>

            <div className="rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md p-5">
              <p className="text-sm text-orange-50">Ingredients</p>
              <p className="text-4xl font-black mt-2">{stats.ingredients}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Days */}

      <div className="space-y-10">
        {groupedMeals.map((dayGroup) => (
          <section key={dayGroup.day} className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-3xl font-black text-slate-800">
                  {dayGroup.day}
                </h2>

                <p className="text-slate-500 mt-1">
                  AI-optimized meals for nutrition and waste reduction.
                </p>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-orange-50
                  border
                  border-orange-100
                  px-4
                  py-3
                  text-orange-700
                  font-semibold
                  w-fit
                "
              >
                <Utensils size={18} />
                {dayGroup.meals.length} meals
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {dayGroup.meals.map((item, index) => (
                <MealCard
                  key={`${dayGroup.day}-${item.mealType}-${index}`}
                  item={item}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom Insight */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-br
          from-slate-900
          to-slate-800
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-start gap-5">
          <div
            className="
              w-16
              h-16
              rounded-3xl
              bg-white/10
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <ChefHat size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">
              AI Meal Planning Insight
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
              Smart meal planning helps reduce food waste, simplify daily
              cooking decisions, improve nutrition quality, and make better use
              of foods already available in your pantry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
