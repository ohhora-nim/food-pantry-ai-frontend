// =========================================
// MealsPage.jsx
// AI Weekly Meal Planner Page
// Improved UX: Day selector + compact meal grid
// =========================================

import { useMemo, useState } from "react";

import { usePantry } from "../context/PantryContext";

import MealCard from "../components/meals/MealCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

import {
  ChefHat,
  Sparkles,
  Salad,
  Clock3,
  Flame,
  UtensilsCrossed,
  WandSparkles,
  AlertCircle,
  CalendarDays,
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

function normalizeMeals(inputMeals = []) {
  if (!Array.isArray(inputMeals)) {
    return [];
  }

  const normalized = [];

  inputMeals.forEach((dayItem) => {
    // Format 1:
    // { day, meal, name, ingredients, steps }
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

    // Format 2:
    // { day, meals: { breakfast, lunch, dinner } }
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

    // Format 3:
    // { day, meals: [ { breakfast }, { lunch } ] }
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

function groupMealsByDay(normalizedMeals = []) {
  const grouped = {};

  DAY_ORDER.forEach((day) => {
    grouped[day] = [];
  });

  normalizedMeals.forEach((item) => {
    const day = item.day || "Other";

    if (!grouped[day]) {
      grouped[day] = [];
    }

    grouped[day].push(item);
  });

  return DAY_ORDER.filter((day) => grouped[day]?.length > 0).map((day) => ({
    day,
    meals: grouped[day],
  }));
}

function getDayShortName(day) {
  return day.slice(0, 3);
}

function getMealEmoji(mealType = "") {
  const type = mealType.toLowerCase();

  if (type.includes("breakfast")) {
    return "🌅";
  }

  if (type.includes("lunch")) {
    return "🥗";
  }

  if (type.includes("dinner")) {
    return "🍽️";
  }

  return "🍴";
}

// =========================================
// Meals Page
// =========================================

export default function MealsPage() {
  const { meals, pantryFoods, loading, loadingFeature, error, generateMeals } =
    usePantry();

  const isGeneratingMeals = loadingFeature === "meals";

  const pantryCount = pantryFoods?.length || 0;

  // =======================================
  // Normalize + group meals
  // =======================================

  const normalizedMeals = useMemo(() => normalizeMeals(meals || []), [meals]);

  const groupedMeals = useMemo(
    () => groupMealsByDay(normalizedMeals),
    [normalizedMeals],
  );

  const [selectedDay, setSelectedDay] = useState("");

  const activeDay = selectedDay || groupedMeals[0]?.day || "";

  const activeDayMeals =
    groupedMeals.find((item) => item.day === activeDay)?.meals || [];

  // =======================================
  // Stats
  // =======================================

  const stats = useMemo(() => {
    if (!normalizedMeals || normalizedMeals.length === 0) {
      return {
        totalMeals: 0,
        breakfastCount: 0,
        lunchCount: 0,
        dinnerCount: 0,
        avgScore: 0,
        daysCount: 0,
      };
    }

    let breakfastCount = 0;
    let lunchCount = 0;
    let dinnerCount = 0;
    let totalScore = 0;

    normalizedMeals.forEach((item) => {
      totalScore += item.meal.score || 0;

      const type = item.mealType?.toLowerCase() || "";

      if (type.includes("breakfast")) {
        breakfastCount += 1;
      } else if (type.includes("lunch")) {
        lunchCount += 1;
      } else if (type.includes("dinner")) {
        dinnerCount += 1;
      }
    });

    return {
      totalMeals: normalizedMeals.length,
      breakfastCount,
      lunchCount,
      dinnerCount,
      avgScore:
        normalizedMeals.length > 0
          ? Math.round(totalScore / normalizedMeals.length)
          : 0,
      daysCount: groupedMeals.length,
    };
  }, [normalizedMeals, groupedMeals]);

  // =======================================
  // Generate Button Handler
  // =======================================

  async function handleGenerateMeals() {
    if (pantryCount === 0) {
      return;
    }

    setSelectedDay("");

    await generateMeals();
  }

  // =======================================
  // Error State
  // =======================================

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">
        <div className="flex items-start gap-3">
          <AlertCircle size={22} className="mt-0.5 flex-shrink-0" />

          <div>
            <h2 className="font-bold mb-1">Could not load meal planner</h2>

            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // =======================================
  // Render
  // =======================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg">
            <ChefHat size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              AI Weekly Meal Planner
            </h1>

            <p className="text-slate-500 mt-1">
              Generate healthy meals using your pantry foods.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerateMeals}
          disabled={isGeneratingMeals || pantryCount === 0}
          className="
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-amber-500
            px-6
            py-4
            font-bold
            text-white
            shadow-lg
            transition-all
            hover:from-orange-600
            hover:to-amber-600
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isGeneratingMeals ? (
            <>
              <WandSparkles size={20} className="animate-pulse" />
              Generating meals...
            </>
          ) : (
            <>
              <WandSparkles size={20} />
              Generate AI Meals
            </>
          )}
        </button>
      </div>

      {/* ================================= */}
      {/* No Pantry Warning */}
      {/* ================================= */}

      {pantryCount === 0 && (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="mt-0.5 flex-shrink-0" />

            <div>
              <h2 className="font-bold mb-1">Add pantry foods first</h2>

              <p>
                Go to the Pantry tab, add foods, then return here to generate AI
                meals.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* AI Banner */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} />

            <h2 className="text-2xl font-semibold">AI Meal Intelligence</h2>
          </div>

          <p className="max-w-4xl text-lg leading-relaxed text-orange-50">
            Generate a 7-day meal plan, then jump between days using the compact
            planner below.
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <UtensilsCrossed size={24} />
            </div>

            <span className="text-sm text-slate-400">Meals</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.totalMeals}</h2>

          <p className="text-slate-500 mt-2">Generated Meals</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <CalendarDays size={24} />
            </div>

            <span className="text-sm text-slate-400">Days</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.daysCount}</h2>

          <p className="text-slate-500 mt-2">Planned Days</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <Salad size={24} />
            </div>

            <span className="text-sm text-slate-400">Breakfast</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.breakfastCount}</h2>

          <p className="text-slate-500 mt-2">Morning Meals</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Clock3 size={24} />
            </div>

            <span className="text-sm text-slate-400">Lunch</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.lunchCount}</h2>

          <p className="text-slate-500 mt-2">Midday Meals</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <ChefHat size={24} />
            </div>

            <span className="text-sm text-slate-400">Dinner</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.dinnerCount}</h2>

          <p className="text-slate-500 mt-2">Evening Meals</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Flame size={24} />
            </div>

            <span className="text-sm text-slate-400">Quality</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.avgScore}</h2>

          <p className="text-slate-500 mt-2">Avg Score</p>
        </div>
      </section>

      {/* ================================= */}
      {/* Meal Planner */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">7-Day Meal Plan</h2>

            <p className="text-slate-500 mt-1">
              Select a day to view breakfast, lunch, and dinner without endless
              scrolling.
            </p>
          </div>

          {activeDay && (
            <div className="rounded-2xl bg-orange-50 border border-orange-100 px-5 py-3 text-orange-700 font-semibold">
              Viewing: {activeDay}
            </div>
          )}
        </div>

        {isGeneratingMeals ? (
          <div className="py-12">
            <LoadingSpinner title="Generating AI meals" />
          </div>
        ) : groupedMeals.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
            <div className="text-6xl mb-5">🍽️</div>

            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              No meals generated yet
            </h3>

            <p className="text-slate-500 max-w-xl mx-auto">
              Click “Generate AI Meals” to create your weekly meal plan.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Day Selector */}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {groupedMeals.map((dayGroup) => {
                const selected = dayGroup.day === activeDay;

                const avgDayScore =
                  dayGroup.meals.length > 0
                    ? Math.round(
                        dayGroup.meals.reduce(
                          (sum, item) => sum + (item.meal.score || 0),
                          0,
                        ) / dayGroup.meals.length,
                      )
                    : 0;

                return (
                  <button
                    key={dayGroup.day}
                    type="button"
                    onClick={() => setSelectedDay(dayGroup.day)}
                    className={`
                      rounded-3xl
                      border
                      p-4
                      text-left
                      transition-all
                      hover:shadow-lg
                      ${
                        selected
                          ? "border-orange-300 bg-orange-50 shadow-md"
                          : "border-slate-200 bg-slate-50 hover:bg-white"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`
                          text-lg
                          font-black
                          ${selected ? "text-orange-700" : "text-slate-800"}
                        `}
                      >
                        {getDayShortName(dayGroup.day)}
                      </span>

                      <span className="text-xl">🍽️</span>
                    </div>

                    <div className="text-sm text-slate-500">
                      {dayGroup.meals.length} meals
                    </div>

                    <div className="mt-2 text-sm font-semibold text-slate-700">
                      Score {avgDayScore}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Day Meals */}

            <div>
              <div className="mb-5">
                <h3 className="text-3xl font-black text-slate-800">
                  {activeDay}
                </h3>

                <p className="text-slate-500 mt-1">
                  AI-optimized meals for this day.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {activeDayMeals.map((item, index) => (
                  <div key={`${activeDay}-${item.mealType}-${index}`}>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 capitalize">
                      <span>{getMealEmoji(item.mealType)}</span>

                      {item.mealType}
                    </div>

                    <MealCard mealType={item.mealType} meal={item.meal} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
