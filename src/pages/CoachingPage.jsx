// =========================================
// CoachingPage.jsx
// AI Health Coaching Page
// Calls backend POST /ai/coaching on button click
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

  const isGeneratingCoaching = loadingFeature === "coaching";

  const pantryCount = pantryFoods?.length || 0;

  const stats = useMemo(() => {
    return {
      pantryHealthScore: nutrition?.pantry_health_score || 0,

      averageNutritionScore: nutrition?.average_nutrition_score || 0,

      freshPercent: nutrition?.fresh_percent || 0,

      pantryFoodsCount: pantryFoods?.length || 0,
    };
  }, [nutrition, pantryFoods]);

  async function handleGenerateCoaching() {
    if (pantryCount === 0) {
      return;
    }

    await generateCoaching();
  }

  if (loading && !coaching && isGeneratingCoaching) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner title="Generating AI coaching" />
      </div>
    );
  }

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

  return (
    <div className="space-y-8">
      {/* Header */}

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
              Personalized healthy eating and pantry coaching powered by AI.
            </p>
          </div>
        </div>

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

      {/* No Pantry Warning */}

      {pantryCount === 0 && (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="mt-0.5 flex-shrink-0" />

            <div>
              <h2 className="font-bold mb-1">Add pantry foods first</h2>

              <p>
                Go to the Pantry tab, add foods, then return here to generate AI
                coaching.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* AI Banner */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} />

            <h2 className="text-2xl font-semibold">Human-Like AI Coaching</h2>
          </div>

          <p className="max-w-4xl text-lg leading-relaxed text-violet-50">
            Click <span className="font-semibold">Generate AI Coaching</span> to
            call the backend{" "}
            <span className="font-semibold">POST /ai/coaching</span> endpoint.
            The result will be saved in your browser localStorage.
          </p>
        </div>
      </section>

      {/* Stats */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Salad size={24} />
            </div>

            <span className="text-sm text-slate-400">Fresh</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.freshPercent}%</h2>

          <p className="text-slate-500 mt-2">Whole Foods</p>
        </div>

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

      {/* Coaching Benefits */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
            <Salad size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Healthy Eating</h2>

          <p className="text-slate-600 leading-relaxed">
            AI recommends healthier pantry choices, nutrient-dense foods, and
            balanced eating habits.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
            <Dumbbell size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Daily Energy</h2>

          <p className="text-slate-600 leading-relaxed">
            AI helps optimize meal quality for energy, productivity, and
            sustainable nutrition.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="w-14 h-14 rounded-3xl bg-violet-100 text-violet-600 flex items-center justify-center mb-5">
            <Activity size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-3">Long-Term Wellness</h2>

          <p className="text-slate-600 leading-relaxed">
            Smart pantry coaching encourages healthier routines and improved
            food awareness.
          </p>
        </div>
      </section>

      {/* Coaching Dashboard */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Personalized AI Coaching</h2>

          <p className="text-slate-500 mt-1">
            AI-generated personalized health and nutrition guidance.
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

      {/* Bottom Message */}

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
              Consistent healthy food choices, better pantry awareness, and
              reduced ultra-processed foods can improve long-term wellness,
              energy, and healthy eating habits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
