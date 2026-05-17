// =========================================
// RecommendationsPage.jsx
// AI Food Recommendations Page
// Fast recommendations + on-demand AI Explanations
// =========================================

import { useMemo } from "react";

import { usePantry } from "../context/PantryContext";

import RecommendedFoods from "../components/recommendations/RecommendedFoods";
import LoadingSpinner from "../components/common/LoadingSpinner";

import {
  Sparkles,
  Apple,
  Salad,
  ShieldCheck,
  HeartPulse,
  Star,
  Brain,
  Leaf,
  WandSparkles,
  AlertCircle,
} from "lucide-react";

// =========================================
// Recommendations Page
// =========================================

export default function RecommendationsPage() {
  const {
    recommendations,
    pantryFoods,
    nutrition,
    loading,
    loadingFeature,
    error,
    generateExplanations,
    refreshRecommendations,
  } = usePantry();

  // =======================================
  // Loading States
  // =======================================

  const isGeneratingExplanations = loadingFeature === "explanations";

  const isRefreshingRecommendations = loadingFeature === "recommendations";

  // =======================================
  // Stats
  // =======================================

  const stats = useMemo(() => {
    if (!recommendations) {
      return {
        totalRecommendations: 0,
        avgPriority: 0,
        avgNutrition: 0,
        freshFoods: 0,
        explainedFoods: 0,
      };
    }

    const total = recommendations.length || 0;

    const avgPriority =
      total > 0
        ? Math.round(
            recommendations.reduce(
              (sum, food) => sum + (food.priority_score || 0),
              0,
            ) / total,
          )
        : 0;

    const avgNutrition =
      total > 0
        ? Math.round(
            recommendations.reduce(
              (sum, food) => sum + (food.nutrition_score || 0),
              0,
            ) / total,
          )
        : 0;

    const freshFoods = recommendations.filter(
      (food) => food.processing_level === "fresh",
    ).length;

    const explainedFoods = recommendations.filter(
      (food) => food.explanation,
    ).length;

    return {
      totalRecommendations: total,
      avgPriority,
      avgNutrition,
      freshFoods,
      explainedFoods,
    };
  }, [recommendations]);

  // =======================================
  // Pantry Health
  // =======================================

  const pantryHealth = nutrition?.pantry_health_score || 0;

  // =======================================
  // Pantry Count
  // =======================================

  const pantryCount = pantryFoods?.length || 0;

  // =======================================
  // Handlers
  // =======================================

  async function handleGenerateExplanations() {
    await generateExplanations();
  }

  async function handleRefreshRecommendations() {
    await refreshRecommendations();
  }

  // =======================================
  // Loading
  // =======================================

  if (loading && recommendations.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner title="Loading recommendations" />
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
            <h2 className="font-bold mb-1">Could not load recommendations</h2>

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
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg">
            <Sparkles size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              AI Food Recommendations
            </h1>

            <p className="text-slate-500 mt-1">
              Fast food recommendations with optional AI explanations.
            </p>
          </div>
        </div>

        {/* Action Buttons */}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleRefreshRecommendations}
            disabled={isRefreshingRecommendations}
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-6
              py-4
              font-bold
              text-slate-700
              shadow-sm
              transition-all
              hover:bg-slate-50
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isRefreshingRecommendations ? (
              <>
                <WandSparkles size={20} className="animate-pulse" />
                Refreshing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Refresh Recommendations
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleGenerateExplanations}
            disabled={isGeneratingExplanations || recommendations.length === 0}
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-emerald-500
              to-teal-600
              px-6
              py-4
              font-bold
              text-white
              shadow-lg
              transition-all
              hover:from-emerald-600
              hover:to-teal-700
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isGeneratingExplanations ? (
              <>
                <WandSparkles size={20} className="animate-pulse" />
                Generating explanations...
              </>
            ) : (
              <>
                <WandSparkles size={20} />
                Generate AI Explanations
              </>
            )}
          </button>
        </div>
      </div>

      {/* ================================= */}
      {/* No Recommendations Warning */}
      {/* ================================= */}

      {recommendations.length === 0 && (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="mt-0.5 flex-shrink-0" />

            <div>
              <h2 className="font-bold mb-1">No recommendations yet</h2>

              <p>
                Add pantry foods or click Refresh Recommendations to generate
                food suggestions.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* AI Banner */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Brain size={24} />

            <h2 className="text-2xl font-semibold">
              Smart Recommendation Intelligence
            </h2>
          </div>

          <p className="max-w-4xl text-lg leading-relaxed text-emerald-50">
            Recommendations are generated quickly using your Smart Food
            Database. Click{" "}
            <span className="font-semibold">Generate AI Explanations</span> to
            call the backend{" "}
            <span className="font-semibold">POST /ai/explanations</span>{" "}
            endpoint and add richer human-like explanations.
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* AI Explanation Loading */}
      {/* ================================= */}

      {isGeneratingExplanations && (
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <LoadingSpinner title="Generating AI explanations" />
        </section>
      )}

      {/* ================================= */}
      {/* Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {/* Recommendations */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Sparkles size={24} />
            </div>

            <span className="text-sm text-slate-400">AI</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.totalRecommendations}</h2>

          <p className="text-slate-500 mt-2">Recommendations</p>
        </div>

        {/* Nutrition */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <Apple size={24} />
            </div>

            <span className="text-sm text-slate-400">Nutrition</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.avgNutrition}</h2>

          <p className="text-slate-500 mt-2">Avg Nutrition Score</p>
        </div>

        {/* Priority */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Star size={24} />
            </div>

            <span className="text-sm text-slate-400">Priority</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.avgPriority}</h2>

          <p className="text-slate-500 mt-2">Avg Priority Score</p>
        </div>

        {/* Fresh Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Salad size={24} />
            </div>

            <span className="text-sm text-slate-400">Fresh</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.freshFoods}</h2>

          <p className="text-slate-500 mt-2">Fresh Whole Foods</p>
        </div>

        {/* Explanations */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Brain size={24} />
            </div>

            <span className="text-sm text-slate-400">Explain</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.explainedFoods}</h2>

          <p className="text-slate-500 mt-2">AI Explanations</p>
        </div>
      </section>

      {/* ================================= */}
      {/* Pantry Health Insight */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">AI Recommendation Engine</h2>

            <p className="text-slate-500 mt-2 max-w-3xl leading-relaxed">
              The app first uses the fast Smart Food Database to recommend
              foods. AI explanations are optional and generated only when you
              request them.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 border border-emerald-100 px-6 py-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
              <HeartPulse size={24} />
            </div>

            <div>
              <div className="text-sm text-slate-500">Pantry Health</div>

              <div className="text-3xl font-bold text-emerald-700">
                {pantryHealth}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Recommendation Categories */}
      {/* ================================= */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Whole Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-green-100 text-green-600 flex items-center justify-center mb-5">
            <Salad size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Whole Foods</h2>

          <p className="text-slate-600 leading-relaxed">
            The engine prioritizes fresh nutrient-dense foods with strong health
            benefits.
          </p>
        </div>

        {/* Balanced Nutrition */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
            <Apple size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Balanced Nutrition</h2>

          <p className="text-slate-600 leading-relaxed">
            Smart recommendations help improve protein, fiber, vitamins, and
            nutrition balance.
          </p>
        </div>

        {/* Sustainability */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-teal-100 text-teal-600 flex items-center justify-center mb-5">
            <Leaf size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Sustainable Eating</h2>

          <p className="text-slate-600 leading-relaxed">
            The system encourages healthier long-term habits and reduced
            ultra-processed food intake.
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* Recommendations Dashboard */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Personalized Food Recommendations
          </h2>

          <p className="text-slate-500 mt-1">
            Fast recommendations are shown immediately. AI explanations appear
            after clicking Generate AI Explanations.
          </p>
        </div>

        <RecommendedFoods />
      </section>

      {/* ================================= */}
      {/* Motivation */}
      {/* ================================= */}

      <section className="rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles size={32} />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Better Food Choices Create Better Health
            </h2>

            <p className="max-w-4xl text-emerald-50 leading-relaxed text-lg">
              Small improvements in daily food choices can improve energy,
              wellness, healthy eating habits, and long-term nutrition quality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
