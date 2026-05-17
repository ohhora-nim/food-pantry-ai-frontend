// =========================================
// PantryPage.jsx
// Smart Pantry Management Page
// One Add Pantry Food section only
// =========================================

import { useMemo } from "react";

import { usePantry } from "../context/PantryContext";

// =========================================
// Components
// =========================================

import FoodForm from "../components/pantry/FoodForm";
import PantryDashboard from "../components/pantry/PantryDashboard";
import LoadingSpinner from "../components/common/LoadingSpinner";

// =========================================
// Icons
// =========================================

import {
  Package,
  Salad,
  AlertTriangle,
  Sparkles,
  Plus,
  Leaf,
} from "lucide-react";

// =========================================
// Pantry Page
// =========================================

export default function PantryPage() {
  const { pantryFoods, loading, loadingFeature, error } = usePantry();

  // =======================================
  // Loading
  // =======================================

  const isLoadingDashboard = loadingFeature === "dashboard";

  // =======================================
  // Stats
  // =======================================

  const stats = useMemo(() => {
    const totalFoods = pantryFoods?.length || 0;

    const freshFoods =
      pantryFoods?.filter((food) => food.processing_level === "fresh").length ||
      0;

    const urgentFoods =
      pantryFoods?.filter((food) => Number(food.expiry_score || 0) >= 8)
        .length || 0;

    const highPriorityFoods =
      pantryFoods?.filter((food) => Number(food.priority_score || 0) >= 80)
        .length || 0;

    return {
      totalFoods,
      freshFoods,
      urgentFoods,
      highPriorityFoods,
    };
  }, [pantryFoods]);

  // =======================================
  // Loading State
  // =======================================

  if (loading && pantryFoods.length === 0 && isLoadingDashboard) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner title="Loading pantry intelligence" />
      </div>
    );
  }

  // =======================================
  // Error State
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
            <Package size={28} />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Pantry Management
            </h1>

            <p className="text-slate-500 mt-1">
              Add foods, track expiry, reduce waste, and improve nutrition
              quality.
            </p>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Hero Banner */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-8 text-white shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md mb-5">
              <Sparkles size={16} />
              Smart Pantry Intelligence
            </div>

            <h2 className="text-4xl sm:text-5xl font-black leading-tight">
              Build Your AI Pantry
            </h2>

            <p className="mt-5 max-w-3xl text-lg text-emerald-50 leading-relaxed">
              Add pantry foods once. Your browser stores them locally, and the
              backend analyzes them for nutrition, freshness, waste risk, and AI
              planning.
            </p>
          </div>

          <div className="rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md p-8 text-center min-w-[240px]">
            <p className="text-sm uppercase tracking-wide text-emerald-50 mb-3">
              Pantry Foods
            </p>

            <h2 className="text-6xl font-black">{stats.totalFoods}</h2>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Quick Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Package size={24} />
            </div>

            <span className="text-sm text-slate-400">Pantry</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.totalFoods}</h2>

          <p className="text-slate-500 mt-2">Total Foods</p>
        </div>

        {/* Fresh Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <Salad size={24} />
            </div>

            <span className="text-sm text-slate-400">Fresh</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.freshFoods}</h2>

          <p className="text-slate-500 mt-2">Fresh Whole Foods</p>
        </div>

        {/* Urgent Foods */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>

            <span className="text-sm text-slate-400">Expiry</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.urgentFoods}</h2>

          <p className="text-slate-500 mt-2">Use Soon</p>
        </div>

        {/* High Priority */}

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Leaf size={24} />
            </div>

            <span className="text-sm text-slate-400">Priority</span>
          </div>

          <h2 className="text-4xl font-bold">{stats.highPriorityFoods}</h2>

          <p className="text-slate-500 mt-2">High Priority Foods</p>
        </div>
      </section>

      {/* ================================= */}
      {/* Add Food Section */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Plus size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Add Pantry Food</h2>

            <p className="text-slate-500 mt-1">
              Enter only name, quantity, and expiry date. The backend
              automatically enriches the food with category, processing level,
              nutrition tags, and scores.
            </p>
          </div>
        </div>

        <FoodForm />
      </section>

      {/* ================================= */}
      {/* Pantry Inventory */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Pantry Inventory</h2>

          <p className="text-slate-500 mt-1">
            Search, filter, review, and remove pantry foods.
          </p>
        </div>

        <PantryDashboard />
      </section>

      {/* ================================= */}
      {/* Bottom Insight */}
      {/* ================================= */}

      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Leaf size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">
              AI Pantry Intelligence Insight
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
              A well-tracked pantry helps reduce food waste, save money, improve
              nutrition quality, and make smarter meal planning decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
