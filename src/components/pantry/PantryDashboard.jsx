// =========================================
// PantryDashboard.jsx
// Smart Pantry Food Inventory Display
// Uses enrichedPantryFoods from backend
// =========================================

import { useMemo, useState } from "react";

import { usePantry } from "../../context/PantryContext";

import PantryCard from "./PantryCard";

import { Package, Search, Filter, RefreshCw } from "lucide-react";

// =========================================
// Pantry Dashboard
// =========================================

export default function PantryDashboard() {
  const {
    enrichedPantryFoods,
    pantryFoods,
    deletePantryFood,
    fetchDashboard,
    loadingFeature,
  } = usePantry();

  // =======================================
  // Local UI State
  // =======================================

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [sortBy, setSortBy] = useState("priority");

  // =======================================
  // Source of Truth for Display
  // =======================================

  const foods =
    enrichedPantryFoods?.length > 0 ? enrichedPantryFoods : pantryFoods || [];

  const isRefreshing = loadingFeature === "dashboard";

  // =======================================
  // Categories
  // =======================================

  const categories = useMemo(() => {
    const unique = new Set(foods.map((food) => food.category).filter(Boolean));

    return ["all", ...Array.from(unique)];
  }, [foods]);

  // =======================================
  // Filter + Sort
  // =======================================

  const filteredFoods = useMemo(() => {
    let result = foods.filter((food) => {
      const name = food.name?.toLowerCase() || "";

      const matchesSearch = name.includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || food.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "priority") {
        return Number(b.priority_score || 0) - Number(a.priority_score || 0);
      }

      if (sortBy === "nutrition") {
        return Number(b.nutrition_score || 0) - Number(a.nutrition_score || 0);
      }

      if (sortBy === "expiry") {
        return Number(b.expiry_score || 0) - Number(a.expiry_score || 0);
      }

      if (sortBy === "waste") {
        return Number(b.waste_risk || 0) - Number(a.waste_risk || 0);
      }

      return 0;
    });

    return result;
  }, [foods, searchTerm, selectedCategory, sortBy]);

  // =======================================
  // Stats
  // =======================================

  const stats = useMemo(() => {
    const total = foods.length;

    const enrichedCount = foods.filter(
      (food) => food.category && food.processing_level && food.nutrition_tags,
    ).length;

    const urgentCount = foods.filter(
      (food) => Number(food.expiry_score || 0) >= 8,
    ).length;

    const highPriorityCount = foods.filter(
      (food) => Number(food.priority_score || 0) >= 80,
    ).length;

    return {
      total,
      enrichedCount,
      urgentCount,
      highPriorityCount,
    };
  }, [foods]);

  // =======================================
  // Refresh Enriched Data
  // =======================================

  async function handleRefresh() {
    await fetchDashboard();
  }

  // =======================================
  // Empty State
  // =======================================

  if (!foods || foods.length === 0) {
    return (
      <div
        className="
          rounded-3xl
          border-2
          border-dashed
          border-slate-200
          bg-white
          p-14
          text-center
        "
      >
        <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-slate-100
          "
        >
          <Package size={40} className="text-slate-400" />
        </div>

        <h2
          className="
            mb-3
            text-2xl
            font-bold
            text-slate-800
          "
        >
          No Pantry Items
        </h2>

        <p
          className="
            mx-auto
            max-w-md
            text-slate-500
            leading-relaxed
          "
        >
          Add foods using the form above to start AI-powered pantry tracking,
          meal planning, nutrition analytics, and waste forecasting.
        </p>
      </div>
    );
  }

  // =======================================
  // Render
  // =======================================

  return (
    <div className="space-y-6">
      {/* ================================= */}
      {/* Data Quality / Refresh Bar */}
      {/* ================================= */}

      <section
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
              "
            >
              Pantry Inventory
            </h2>

            <p className="text-slate-500 mt-1">
              Showing backend-enriched pantry data: category, processing level,
              nutrition tags, nutrition score, expiry score, priority score, and
              waste risk.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-5
              py-3
              font-semibold
              text-slate-700
              transition-all
              hover:bg-white
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw
              size={18}
              className={isRefreshing ? "animate-spin" : ""}
            />

            {isRefreshing ? "Refreshing..." : "Refresh Intelligence"}
          </button>
        </div>

        {/* Stats */}

        <div
          className="
            mt-6
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Total Foods</p>

            <h3 className="text-3xl font-black text-slate-800 mt-1">
              {stats.total}
            </h3>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Enriched Foods</p>

            <h3 className="text-3xl font-black text-emerald-700 mt-1">
              {stats.enrichedCount}
            </h3>
          </div>

          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-sm text-amber-700">Urgent Foods</p>

            <h3 className="text-3xl font-black text-amber-700 mt-1">
              {stats.urgentCount}
            </h3>
          </div>

          <div className="rounded-2xl bg-violet-50 p-4">
            <p className="text-sm text-violet-700">High Priority</p>

            <h3 className="text-3xl font-black text-violet-700 mt-1">
              {stats.highPriorityCount}
            </h3>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Search + Filter + Sort */}
      {/* ================================= */}

      <section
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >
          {/* Search */}

          <div className="relative w-full xl:max-w-md">
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Search pantry foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-11
                pr-4
                outline-none
                transition-all
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500
              "
            />
          </div>

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
            "
          >
            {/* Category Filter */}

            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-slate-500
                "
              >
                <Filter size={18} />

                <span className="text-sm">Category</span>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  capitalize
                  outline-none
                  focus:ring-2
                  focus:ring-emerald-500
                "
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Sort</span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-emerald-500
                "
              >
                <option value="priority">Priority Score</option>

                <option value="expiry">Expiry Score</option>

                <option value="nutrition">Nutrition Score</option>

                <option value="waste">Waste Risk</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Food Count Header */}
      {/* ================================= */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h3
            className="
              text-3xl
              font-black
              text-slate-800
            "
          >
            Foods
          </h3>

          <p className="text-slate-500 mt-1">
            Review enriched pantry data from the backend intelligence engine.
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-emerald-50
            border
            border-emerald-100
            px-5
            py-3
            font-semibold
            text-emerald-700
          "
        >
          {filteredFoods.length} foods
        </div>
      </div>

      {/* ================================= */}
      {/* Food Cards */}
      {/* ================================= */}

      {filteredFoods.length === 0 ? (
        <div
          className="
            rounded-3xl
            border-2
            border-dashed
            border-slate-200
            bg-white
            p-12
            text-center
            text-slate-500
          "
        >
          No foods match your search or filter.
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {filteredFoods.map((food) => (
            <PantryCard
              key={food.id || `${food.name}-${food.expiry_date}`}
              food={food}
              onDelete={deletePantryFood}
            />
          ))}
        </div>
      )}
    </div>
  );
}
