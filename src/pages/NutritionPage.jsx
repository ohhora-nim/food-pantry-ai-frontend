// =========================================
// NutritionPage.jsx
// AI Nutrition Analytics Page
// =========================================

import { useMemo } from "react";

import { usePantry } from "../context/PantryContext";

// =========================================
// Components
// =========================================

import NutritionDashboard from "../components/nutrition/NutritionDashboard";
import LoadingSpinner from "../components/common/LoadingSpinner";

// =========================================
// Icons
// =========================================

import {
  HeartPulse,
  Salad,
  Sparkles,
  Activity,
  Apple,
  ShieldCheck,
} from "lucide-react";

// =========================================
// Nutrition Page
// =========================================

export default function NutritionPage() {
  const { nutrition, pantryFoods, loading, error } = usePantry();

  // =======================================
  // Derived Stats
  // =======================================

  const stats = useMemo(() => {
    if (!nutrition) {
      return {
        healthScore: 0,
        freshPercent: 0,
        processedPercent: 0,
        ultraProcessedPercent: 0,
        averageNutritionScore: 0,
      };
    }

    return {
      healthScore: nutrition.pantry_health_score || 0,

      freshPercent: nutrition.fresh_percent || 0,

      processedPercent: nutrition.processed_percent || 0,

      ultraProcessedPercent: nutrition.ultra_processed_percent || 0,

      averageNutritionScore: nutrition.average_nutrition_score || 0,
    };
  }, [nutrition]);

  // =======================================
  // Pantry Count
  // =======================================

  const pantryCount = pantryFoods?.length || 0;

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
        {error}
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
            <HeartPulse size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Nutrition Analytics
            </h1>

            <p className="text-slate-500 mt-1">
              AI-powered pantry nutrition intelligence and food quality
              insights.
            </p>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* AI Banner */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} />

            <h2 className="text-2xl font-semibold">
              AI Nutrition Intelligence
            </h2>
          </div>

          <p className="max-w-4xl text-lg leading-relaxed text-emerald-50">
            AI analyzes pantry foods, nutrition density, processing levels, and
            dietary balance to help improve long-term healthy eating habits.
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* Stats Grid */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {/* =============================== */}
        {/* Health Score */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <HeartPulse size={24} />
            </div>

            <span className="text-sm text-slate-400">Health</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.healthScore}</h2>

          <p className="text-slate-500 mt-2">Pantry Health Score</p>
        </div>

        {/* =============================== */}
        {/* Fresh Foods */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <Salad size={24} />
            </div>

            <span className="text-sm text-slate-400">Fresh</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.freshPercent}%</h2>

          <p className="text-slate-500 mt-2">Whole Foods</p>
        </div>

        {/* =============================== */}
        {/* Processed */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Activity size={24} />
            </div>

            <span className="text-sm text-slate-400">Processed</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.processedPercent}%</h2>

          <p className="text-slate-500 mt-2">Processed Foods</p>
        </div>

        {/* =============================== */}
        {/* Ultra Processed */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>

            <span className="text-sm text-slate-400">Ultra</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.ultraProcessedPercent}%</h2>

          <p className="text-slate-500 mt-2">Ultra Processed</p>
        </div>

        {/* =============================== */}
        {/* Average Nutrition */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Apple size={24} />
            </div>

            <span className="text-sm text-slate-400">Average</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.averageNutritionScore}</h2>

          <p className="text-slate-500 mt-2">Nutrition Quality</p>
        </div>
      </section>

      {/* ================================= */}
      {/* Pantry Insight */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Pantry Nutrition Overview</h2>

            <p className="text-slate-500 mt-2 max-w-3xl leading-relaxed">
              AI evaluates nutrition density, food freshness, processing levels,
              and dietary diversity to identify healthier pantry opportunities.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 border border-emerald-100 px-6 py-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
              <Salad size={24} />
            </div>

            <div>
              <div className="text-sm text-slate-500">Pantry Foods</div>

              <div className="text-3xl font-bold text-emerald-700">
                {pantryCount}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Nutrition Dashboard */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Nutrition Analytics Dashboard</h2>

          <p className="text-slate-500 mt-1">
            Detailed AI nutrition breakdown and food quality analysis.
          </p>
        </div>

        <NutritionDashboard />
      </section>

      {/* ================================= */}
      {/* Processing Insight */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
            <Sparkles size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">AI Processing Insight</h2>

            <p className="text-slate-500">
              Smart analysis of pantry food quality
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700 leading-relaxed">
          {nutrition?.processing_insight ||
            "AI nutrition insights will appear here."}
        </div>
      </section>
    </div>
  );
}
