// =========================================
// DashboardPage.jsx
// AI Pantry Executive Dashboard
// Fast dashboard + on-demand AI Summary
// =========================================

import { useMemo } from "react";

import { usePantry } from "../context/PantryContext";

import DashboardOverview from "../components/dashboard/DashboardOverview";
import LoadingSpinner from "../components/common/LoadingSpinner";

import {
  Sparkles,
  AlertTriangle,
  HeartPulse,
  Salad,
  Clock3,
  ChefHat,
  WandSparkles,
  AlertCircle,
} from "lucide-react";

// =========================================
// Dashboard Page
// =========================================

export default function DashboardPage() {
  const {
    pantryFoods,
    recommendations,
    nutrition,
    waste,
    meals,
    coaching,
    summary,
    loading,
    loadingFeature,
    error,
    generateSummary,
  } = usePantry();

  // =======================================
  // Loading States
  // =======================================

  const isGeneratingSummary = loadingFeature === "summary";

  // =======================================
  // Quick Stats
  // =======================================

  const stats = useMemo(() => {
    const healthScore = nutrition?.pantry_health_score || 0;

    const wasteScore = waste?.overall_waste_score || 0;

    const urgentItems = waste?.urgent_items || 0;

    const freshPercent = nutrition?.fresh_percent || 0;

    const pantryCount = pantryFoods?.length || 0;

    const recommendationCount = recommendations?.length || 0;

    const mealCount = meals?.length || 0;

    return {
      healthScore,
      wasteScore,
      urgentItems,
      freshPercent,
      pantryCount,
      recommendationCount,
      mealCount,
    };
  }, [pantryFoods, recommendations, nutrition, waste, meals]);

  // =======================================
  // Generate Summary
  // =======================================

  async function handleGenerateSummary() {
    if (!pantryFoods || pantryFoods.length === 0) {
      return;
    }

    await generateSummary();
  }

  // =======================================
  // Loading
  // =======================================

  if (loading && !nutrition) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    );
  }

  // =======================================
  // Error
  // =======================================

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">
        <div className="flex items-start gap-3">
          <AlertCircle size={22} className="mt-0.5 flex-shrink-0" />

          <div>
            <h2 className="font-bold mb-1">Could not load dashboard</h2>

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
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg">
            <Sparkles size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              AI Pantry Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Smart nutrition, food waste reduction, and AI meal intelligence.
            </p>
          </div>
        </div>

        {/* Generate AI Summary Button */}

        <button
          type="button"
          onClick={handleGenerateSummary}
          disabled={isGeneratingSummary || stats.pantryCount === 0}
          className="
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            px-6
            py-4
            font-bold
            text-white
            shadow-lg
            transition-all
            hover:from-emerald-600
            hover:to-green-700
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isGeneratingSummary ? (
            <>
              <WandSparkles size={20} className="animate-pulse" />
              Generating summary...
            </>
          ) : (
            <>
              <WandSparkles size={20} />
              Generate AI Summary
            </>
          )}
        </button>
      </div>

      {/* ================================= */}
      {/* No Pantry Warning */}
      {/* ================================= */}

      {stats.pantryCount === 0 && (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="mt-0.5 flex-shrink-0" />

            <div>
              <h2 className="font-bold mb-1">Add pantry foods first</h2>

              <p>
                Go to the Pantry tab, add foods, then return here to generate
                your AI summary.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* AI Summary */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={22} />

                <h2 className="text-2xl font-semibold">AI Pantry Summary</h2>
              </div>

              {isGeneratingSummary ? (
                <div className="py-4">
                  <p className="text-lg leading-relaxed text-emerald-50 animate-pulse">
                    AI is reviewing your pantry, nutrition balance, food waste
                    risk, and recommendations...
                  </p>
                </div>
              ) : summary ? (
                <p className="text-lg leading-relaxed text-emerald-50">
                  {summary}
                </p>
              ) : (
                <p className="text-lg leading-relaxed text-emerald-50">
                  Generate an AI summary to get a clear overview of your pantry
                  health, food waste risks, and smart next steps.
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md p-6 min-w-[220px] text-center">
              <p className="text-sm uppercase tracking-wide text-emerald-50 mb-3">
                Pantry Foods
              </p>

              <h3 className="text-5xl font-black">{stats.pantryCount}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Stats Grid */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Health Score */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <HeartPulse size={24} />
            </div>

            <span className="text-sm text-slate-400">Health</span>
          </div>

          <h3 className="text-4xl font-bold">{stats.healthScore}</h3>

          <p className="text-slate-500 mt-2">Pantry Health Score</p>
        </div>

        {/* Waste */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>

            <span className="text-sm text-slate-400">Waste</span>
          </div>

          <h3 className="text-4xl font-bold">{stats.wasteScore}</h3>

          <p className="text-slate-500 mt-2">Waste Risk Score</p>
        </div>

        {/* Fresh Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <Salad size={24} />
            </div>

            <span className="text-sm text-slate-400">Fresh</span>
          </div>

          <h3 className="text-4xl font-bold">{stats.freshPercent}%</h3>

          <p className="text-slate-500 mt-2">Fresh Whole Foods</p>
        </div>

        {/* Urgent Items */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Clock3 size={24} />
            </div>

            <span className="text-sm text-slate-400">Expiry</span>
          </div>

          <h3 className="text-4xl font-bold">{stats.urgentItems}</h3>

          <p className="text-slate-500 mt-2">Urgent Pantry Items</p>
        </div>
      </section>

      {/* ================================= */}
      {/* Dashboard Overview */}
      {/* ================================= */}

      <DashboardOverview />

      {/* ================================= */}
      {/* AI Coaching Preview */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
            <ChefHat size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">AI Health Coach Preview</h2>

            <p className="text-slate-500">
              Generate detailed coaching in the AI Coach tab.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-slate-700 leading-relaxed">
          {coaching ||
            "No coaching generated yet. Open the AI Coach tab and click Generate AI Coaching."}
        </div>
      </section>

      {/* ================================= */}
      {/* Meals Preview */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">AI Meal Suggestions Preview</h2>

            <p className="text-slate-500 mt-1">
              Generate full meals in the Meals tab.
            </p>
          </div>
        </div>

        {meals?.length === 0 ? (
          <div className="text-slate-500">
            No meals generated yet. Open the Meals tab and click Generate AI
            Meals.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {meals.slice(0, 4).map((meal, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                    {meal.day}
                  </span>

                  <span className="text-sm text-slate-500">{meal.meal}</span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{meal.name}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {meal.ingredients?.map((ingredient, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm text-slate-700"
                    >
                      {typeof ingredient === "string"
                        ? ingredient
                        : ingredient.name}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {meal.health_reason || meal.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================================= */}
      {/* Recommendations Preview */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Recommended Foods Preview</h2>

          <p className="text-slate-500 mt-1">
            Rule-based recommendations load quickly. AI explanations can be
            generated in the Recommendations tab.
          </p>
        </div>

        {recommendations?.length === 0 ? (
          <div className="text-slate-500">No recommendations available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendations.slice(0, 6).map((food, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold capitalize">
                    {food.name}
                  </h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    {food.processing_level}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {food.nutrition_tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {food.explanation || food.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
