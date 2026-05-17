// =========================================
// CoachingPage.jsx
// AI Health Coaching Page
// Calls backend POST /ai/coaching on button click
// Supports structured coaching object:
// summary, strengths, risks, recommendations,
// nutrition_focus, fitness_tip, hydration_tip,
// meal_balance_feedback
// =========================================

import { useMemo } from "react";

import { usePantry } from "../context/PantryContext";

import HealthCoach from "../components/coach/HealthCoach";
import LoadingSpinner from "../components/common/LoadingSpinner";

import {
  Brain,
  Sparkles,
  HeartPulse,
  Salad,
  Dumbbell,
  ShieldCheck,
  Apple,
  Activity,
  WandSparkles,
  AlertCircle,
} from "lucide-react";

// =========================================
// Coaching Page
// =========================================

export default function CoachingPage() {
  const {
    coaching,
    nutrition,
    pantryFoods,
    loading,
    loadingFeature,
    error,
    generateCoaching,
  } = usePantry();

  // =======================================
  // Loading State
  // =======================================

  const isGeneratingCoaching = loadingFeature === "coaching";

  // =======================================
  // Pantry Count
  // =======================================

  const pantryCount = pantryFoods?.length || 0;

  // =======================================
  // Stats
  // =======================================

  const stats = useMemo(() => {
    return {
      pantryHealthScore: nutrition?.pantry_health_score || 0,

      averageNutritionScore: nutrition?.average_nutrition_score || 0,

      freshPercent: nutrition?.fresh_percent || 0,

      ultraProcessedPercent: nutrition?.ultra_processed_percent || 0,

      pantryFoodsCount: pantryFoods?.length || 0,
    };
  }, [nutrition, pantryFoods]);

  // =======================================
  // Coaching Status
  // =======================================

  const hasCoaching = Boolean(coaching);

  const hasStructuredCoaching = coaching && typeof coaching === "object";

  const recommendationCount = hasStructuredCoaching
    ? coaching.recommendations?.length || 0
    : 0;

  const strengthsCount = hasStructuredCoaching
    ? coaching.strengths?.length || 0
    : 0;

  const risksCount = hasStructuredCoaching ? coaching.risks?.length || 0 : 0;

  // =======================================
  // Generate Coaching
  // =======================================

  async function handleGenerateCoaching() {
    if (pantryCount === 0) {
      return;
    }

    await generateCoaching();
  }

  // =======================================
  // Loading
  // =======================================

  if (loading && !coaching && isGeneratingCoaching) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner title="Generating AI coaching" />
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
            <h2 className="font-bold mb-1">Could not load AI coaching</h2>

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
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
            <Brain size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              AI Health Coach
            </h1>

            <p className="text-slate-500 mt-1">
              Personalized pantry, nutrition, hydration, fitness, and meal
              balance coaching.
            </p>
          </div>
        </div>

        {/* ================================= */}
        {/* Generate Button */}
        {/* ================================= */}

        <button
          type="button"
          onClick={handleGenerateCoaching}
          disabled={isGeneratingCoaching || pantryCount === 0}
          className="
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-violet-500
            to-purple-600
            px-6
            py-4
            font-bold
            text-white
            shadow-lg
            transition-all
            hover:from-violet-600
            hover:to-purple-700
            hover:shadow-xl
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isGeneratingCoaching ? (
            <>
              <WandSparkles size={20} className="animate-pulse" />
              Generating coaching...
            </>
          ) : (
            <>
              <WandSparkles size={20} />
              Generate AI Coaching
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
                Go to the Pantry tab, add foods, then return here to generate
                personalized AI coaching.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* AI Banner */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} />

            <h2 className="text-2xl font-semibold">Human-Like AI Coaching</h2>
          </div>

          <p className="max-w-4xl text-lg leading-relaxed text-violet-50">
            Generate personalized AI coaching based on your pantry foods,
            nutrition balance, and food waste risk. Your coaching insights will
            be saved so you can review them later.
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* Coaching Status */}
      {/* ================================= */}

      {!hasCoaching && pantryCount > 0 && (
        <section className="rounded-3xl border border-violet-200 bg-violet-50 p-6 text-violet-800">
          <div className="flex items-start gap-3">
            <Brain size={22} className="mt-0.5 flex-shrink-0" />

            <div>
              <h2 className="font-bold mb-1">No coaching generated yet</h2>

              <p>
                Click Generate AI Coaching to receive strengths, risks,
                recommendations, nutrition focus, fitness guidance, hydration
                tips, and meal balance feedback.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Health Score */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <HeartPulse size={24} />
            </div>

            <span className="text-sm text-slate-400">Health</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.pantryHealthScore}</h2>

          <p className="text-slate-500 mt-2">Pantry Health Score</p>
        </div>

        {/* Nutrition */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <Apple size={24} />
            </div>

            <span className="text-sm text-slate-400">Nutrition</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.averageNutritionScore}</h2>

          <p className="text-slate-500 mt-2">Avg Nutrition Score</p>
        </div>

        {/* Fresh Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Salad size={24} />
            </div>

            <span className="text-sm text-slate-400">Fresh</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.freshPercent}%</h2>

          <p className="text-slate-500 mt-2">Fresh Whole Foods</p>
        </div>

        {/* Pantry Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>

            <span className="text-sm text-slate-400">Pantry</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.pantryFoodsCount}</h2>

          <p className="text-slate-500 mt-2">Foods Analyzed</p>
        </div>
      </section>

      {/* ================================= */}
      {/* Structured Coaching Stats */}
      {/* ================================= */}

      {hasStructuredCoaching && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Strengths</p>

            <h2 className="text-4xl font-black text-emerald-600">
              {strengthsCount}
            </h2>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Risks</p>

            <h2 className="text-4xl font-black text-amber-600">{risksCount}</h2>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Recommendations</p>

            <h2 className="text-4xl font-black text-violet-600">
              {recommendationCount}
            </h2>
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* Coaching Benefits */}
      {/* ================================= */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Healthy Eating */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
            <Salad size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Healthy Eating</h2>

          <p className="text-slate-600 leading-relaxed">
            AI reviews your pantry and suggests practical ways to improve food
            quality and meal balance.
          </p>
        </div>

        {/* Fitness */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
            <Dumbbell size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Fitness Support</h2>

          <p className="text-slate-600 leading-relaxed">
            Coaching includes safe, realistic fitness suggestions that pair with
            better eating habits.
          </p>
        </div>

        {/* Wellness */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-violet-100 text-violet-600 flex items-center justify-center mb-5">
            <Activity size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Long-Term Wellness</h2>

          <p className="text-slate-600 leading-relaxed">
            Smart pantry coaching encourages sustainable routines and better
            everyday food decisions.
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* Coaching Dashboard */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Personalized AI Coaching</h2>

          <p className="text-slate-500 mt-1">
            AI-generated personalized health, nutrition, fitness, hydration, and
            meal balance guidance.
          </p>
        </div>

        {isGeneratingCoaching ? (
          <div className="py-12">
            <LoadingSpinner title="Generating AI coaching" />
          </div>
        ) : (
          <HealthCoach />
        )}
      </section>

      {/* ================================= */}
      {/* Bottom Message */}
      {/* ================================= */}

      <section className="rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-8 text-white shadow-xl">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Brain size={32} />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Small Pantry Improvements Create Big Health Changes
            </h2>

            <p className="max-w-4xl text-violet-50 leading-relaxed text-lg">
              Consistent healthy food choices, better hydration, realistic
              movement, and reduced food waste can improve long-term wellness,
              energy, and daily eating habits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
