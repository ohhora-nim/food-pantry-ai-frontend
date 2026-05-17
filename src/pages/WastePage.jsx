// =========================================
// WastePage.jsx
// AI Food Waste Intelligence Page
// =========================================

import { useMemo } from "react";

import { usePantry } from "../context/PantryContext";

// =========================================
// Components
// =========================================

import FoodWasteForecast from "../components/waste/FoodWasteForecast";
import LoadingSpinner from "../components/common/LoadingSpinner";

// =========================================
// Icons
// =========================================

import {
  Trash2,
  AlertTriangle,
  Clock3,
  Sparkles,
  Leaf,
  ShieldAlert,
} from "lucide-react";

// =========================================
// Waste Page
// =========================================

export default function WastePage() {
  const { waste, pantryFoods, loading, error } = usePantry();

  // =======================================
  // Derived Stats
  // =======================================

  const stats = useMemo(() => {
    if (!waste) {
      return {
        wasteScore: 0,
        urgentItems: 0,
        mediumRiskItems: 0,
        lowRiskItems: 0,
      };
    }

    return {
      wasteScore: waste.overall_waste_score || 0,

      urgentItems: waste.urgent_items || 0,

      mediumRiskItems: waste.medium_risk_items || 0,

      lowRiskItems: waste.low_risk_items || 0,
    };
  }, [waste]);

  // =======================================
  // Pantry Count
  // =======================================

  const pantryCount = pantryFoods?.length || 0;

  // =======================================
  // High Risk Foods
  // =======================================

  const highRiskFoods = useMemo(() => {
    return pantryFoods.filter((food) => food.expiry_score >= 8);
  }, [pantryFoods]);

  // =======================================
  // Loading
  // =======================================

  if (loading && !waste) {
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
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg">
            <Trash2 size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Food Waste Intelligence
            </h1>

            <p className="text-slate-500 mt-1">
              AI-powered food waste forecasting and pantry freshness monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* AI Banner */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} />

            <h2 className="text-2xl font-semibold">
              AI Waste Reduction System
            </h2>
          </div>

          <p className="max-w-4xl text-lg leading-relaxed text-orange-50">
            AI predicts pantry food waste risk using expiry timing, freshness,
            nutrition quality, and consumption patterns to help reduce food
            waste and save money.
          </p>
        </div>
      </section>

      {/* ================================= */}
      {/* Stats Grid */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* =============================== */}
        {/* Waste Score */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Trash2 size={24} />
            </div>

            <span className="text-sm text-slate-400">Waste</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.wasteScore}</h2>

          <p className="text-slate-500 mt-2">Waste Risk Score</p>
        </div>

        {/* =============================== */}
        {/* Urgent */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>

            <span className="text-sm text-slate-400">Urgent</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.urgentItems}</h2>

          <p className="text-slate-500 mt-2">High Risk Foods</p>
        </div>

        {/* =============================== */}
        {/* Medium Risk */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock3 size={24} />
            </div>

            <span className="text-sm text-slate-400">Medium</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.mediumRiskItems}</h2>

          <p className="text-slate-500 mt-2">Medium Risk Foods</p>
        </div>

        {/* =============================== */}
        {/* Sustainability */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Leaf size={24} />
            </div>

            <span className="text-sm text-slate-400">Impact</span>
          </div>

          <h2 className="text-4xl font-bold">{pantryCount}</h2>

          <p className="text-slate-500 mt-2">Pantry Foods Tracked</p>
        </div>
      </section>

      {/* ================================= */}
      {/* Pantry Waste Insight */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Pantry Waste Monitoring</h2>

            <p className="text-slate-500 mt-2 max-w-3xl leading-relaxed">
              AI continuously analyzes pantry freshness, expiry timing, and
              consumption priority to help reduce unnecessary food waste.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-orange-50 border border-orange-100 px-6 py-5">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
              <ShieldAlert size={24} />
            </div>

            <div>
              <div className="text-sm text-slate-500">Urgent Foods</div>

              <div className="text-3xl font-bold text-orange-700">
                {stats.urgentItems}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* High Risk Foods */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Foods Requiring Attention</h2>

          <p className="text-slate-500 mt-1">
            Pantry foods with high expiry risk.
          </p>
        </div>

        {highRiskFoods.length === 0 ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
            Excellent work. No urgent pantry foods detected.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {highRiskFoods.map((food, index) => (
              <div
                key={index}
                className="rounded-2xl border border-red-200 bg-red-50 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold capitalize">
                    {food.name}
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                    Urgent
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span>Category</span>

                    <span className="font-medium capitalize">
                      {food.category}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Quantity</span>

                    <span className="font-medium">{food.quantity}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Expiry Score</span>

                    <span className="font-medium text-red-600">
                      {food.expiry_score}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Priority</span>

                    <span className="font-medium">{food.priority_score}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {food.nutrition_tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-full bg-white border border-red-200 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================================= */}
      {/* Waste Dashboard */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Food Waste Forecast Dashboard</h2>

          <p className="text-slate-500 mt-1">
            Detailed AI food waste forecasting and sustainability insights.
          </p>
        </div>

        <FoodWasteForecast />
      </section>

      {/* ================================= */}
      {/* Sustainability Message */}
      {/* ================================= */}

      <section className="rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-8 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Leaf size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Reduce Food Waste, Save Money, Help the Planet
            </h2>

            <p className="max-w-4xl text-emerald-50 leading-relaxed text-lg">
              Smart pantry management can reduce household food waste, improve
              healthy eating habits, lower grocery expenses, and contribute to
              environmental sustainability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
