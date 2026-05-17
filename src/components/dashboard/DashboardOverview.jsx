// =========================================
// DashboardOverview.jsx
// Main Dashboard Overview Component
// =========================================

import { useMemo } from "react";

import { Link } from "react-router-dom";

import { usePantry } from "../../context/PantryContext";

// =========================================
// Icons
// =========================================

import {
  Package,
  HeartPulse,
  Sparkles,
  Trash2,
  Brain,
  ChefHat,
  ArrowRight,
  Salad,
  ShieldCheck,
  Flame,
  Apple,
} from "lucide-react";

// =========================================
// Dashboard Overview
// =========================================

export default function DashboardOverview() {
  const { pantryFoods, recommendations, nutrition, waste, meals } = usePantry();

  // =======================================
  // Stats
  // =======================================

  const stats = useMemo(() => {
    const pantryCount = pantryFoods?.length || 0;

    const recommendationsCount = recommendations?.length || 0;

    const mealCount = meals?.length || 0;

    const healthScore = nutrition?.pantry_health_score || 0;

    const wasteScore = waste?.overall_waste_score || 0;

    const freshPercent = nutrition?.fresh_percent || 0;

    return {
      pantryCount,
      recommendationsCount,
      mealCount,
      healthScore,
      wasteScore,
      freshPercent,
    };
  }, [pantryFoods, recommendations, nutrition, waste, meals]);

  // =======================================
  // Expiring Foods
  // =======================================

  const urgentFoods = useMemo(() => {
    return pantryFoods?.filter((food) => food.expiry_score >= 8)?.slice(0, 5);
  }, [pantryFoods]);

  // =======================================
  // Top Recommendations
  // =======================================

  const topRecommendations = recommendations?.slice(0, 3) || [];

  // =======================================
  // Render
  // =======================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* Hero Section */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 sm:p-10 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
          {/* ============================= */}
          {/* Left */}
          {/* ============================= */}

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md mb-6">
              <Sparkles size={16} />
              AI-Powered Smart Pantry System
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Smart Food Intelligence
              <br />
              for Health & Sustainability
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-emerald-50 leading-relaxed">
              Monitor nutrition, reduce food waste, generate healthy meals, and
              receive personalized AI food recommendations.
            </p>
          </div>

          {/* ============================= */}
          {/* Right */}
          {/* ============================= */}

          <div className="grid grid-cols-2 gap-4 min-w-[280px]">
            <div className="rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-5">
              <div className="text-sm text-emerald-50">Pantry Foods</div>

              <div className="text-4xl font-bold mt-2">{stats.pantryCount}</div>
            </div>

            <div className="rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-5">
              <div className="text-sm text-emerald-50">Health Score</div>

              <div className="text-4xl font-bold mt-2">{stats.healthScore}</div>
            </div>

            <div className="rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-5">
              <div className="text-sm text-emerald-50">AI Meals</div>

              <div className="text-4xl font-bold mt-2">{stats.mealCount}</div>
            </div>

            <div className="rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-5">
              <div className="text-sm text-emerald-50">Fresh Foods</div>

              <div className="text-4xl font-bold mt-2">
                {stats.freshPercent}%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Quick Navigation */}
      {/* ================================= */}

      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Dashboard Modules</h2>

            <p className="text-slate-500 mt-1">
              Navigate through AI-powered pantry tools.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* ============================= */}
          {/* Pantry */}
          {/* ============================= */}

          <Link
            to="/pantry"
            className="group rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <Package size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">Pantry Dashboard</h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Manage pantry foods, freshness, quantities, and inventory
              tracking.
            </p>

            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              Open Dashboard
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* ============================= */}
          {/* Nutrition */}
          {/* ============================= */}

          <Link
            to="/nutrition"
            className="group rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-3xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
              <HeartPulse size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">Nutrition Analytics</h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Analyze nutrition quality, processing levels, and pantry health.
            </p>

            <div className="flex items-center gap-2 text-green-600 font-semibold">
              View Analytics
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* ============================= */}
          {/* Waste */}
          {/* ============================= */}

          <Link
            to="/waste"
            className="group rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
              <Trash2 size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">Waste Forecast</h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Predict food waste risk and reduce pantry spoilage with AI
              insights.
            </p>

            <div className="flex items-center gap-2 text-orange-600 font-semibold">
              View Forecast
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* ============================= */}
          {/* Meals */}
          {/* ============================= */}

          <Link
            to="/meals"
            className="group rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
              <ChefHat size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">Weekly Meals</h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Generate smart weekly meals using available pantry foods.
            </p>

            <div className="flex items-center gap-2 text-amber-600 font-semibold">
              Open Planner
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* ============================= */}
          {/* Recommendations */}
          {/* ============================= */}

          <Link
            to="/recommendations"
            className="group rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-3xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-6">
              <Apple size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">Food Recommendations</h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Discover healthier foods and nutrition improvements using AI.
            </p>

            <div className="flex items-center gap-2 text-cyan-600 font-semibold">
              Explore Foods
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* ============================= */}
          {/* AI Coach */}
          {/* ============================= */}

          <Link
            to="/coach"
            className="group rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-3xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6">
              <Brain size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">AI Health Coach</h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              Receive personalized healthy eating coaching and pantry guidance.
            </p>

            <div className="flex items-center gap-2 text-violet-600 font-semibold">
              Start Coaching
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* ================================= */}
      {/* Insights Grid */}
      {/* ================================= */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* ============================= */}
        {/* Urgent Foods */}
        {/* ============================= */}

        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Flame size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Expiring Foods</h2>

              <p className="text-slate-500">Foods needing attention soon</p>
            </div>
          </div>

          {urgentFoods?.length === 0 ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-emerald-700">
              Great work. No urgent foods detected.
            </div>
          ) : (
            <div className="space-y-4">
              {urgentFoods.map((food, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold capitalize">
                      {food.name}
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                      High Risk
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500">Category</div>

                      <div className="font-medium capitalize">
                        {food.category}
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-500">Expiry Score</div>

                      <div className="font-medium text-red-600">
                        {food.expiry_score}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============================= */}
        {/* Recommendations */}
        {/* ============================= */}

        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Top Recommendations</h2>

              <p className="text-slate-500">Personalized AI food suggestions</p>
            </div>
          </div>

          <div className="space-y-4">
            {topRecommendations.map((food, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold capitalize">
                      {food.name}
                    </h3>

                    <p className="text-sm text-slate-500 capitalize">
                      {food.category}
                    </p>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                    {food.priority_score}
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4">
                  {food.reason}
                </p>

                <div className="flex flex-wrap gap-2">
                  {food.nutrition_tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
