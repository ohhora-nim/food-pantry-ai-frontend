// =========================================
// PantryDashboard.jsx
// Smart Pantry Food Inventory Display
// =========================================

import { useMemo, useState } from "react";

import { usePantry } from "../../context/PantryContext";

import PantryCard from "./PantryCard";

import { Package, Search, Filter } from "lucide-react";

// =========================================
// Pantry Dashboard
// =========================================

export default function PantryDashboard() {
  const { pantryFoods, deletePantryFood } = usePantry();

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  // =======================================
  // Categories
  // =======================================

  const categories = useMemo(() => {
    const unique = new Set(
      pantryFoods.map((food) => food.category).filter(Boolean),
    );

    return ["all", ...Array.from(unique)];
  }, [pantryFoods]);

  // =======================================
  // Filtered Foods
  // =======================================

  const filteredFoods = useMemo(() => {
    return pantryFoods.filter((food) => {
      const matchesSearch = food.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || food.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [pantryFoods, searchTerm, selectedCategory]);

  // =======================================
  // Empty State
  // =======================================

  if (!pantryFoods || pantryFoods.length === 0) {
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
      {/* Search + Filter */}

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
          {/* Search */}

          <div className="relative w-full lg:max-w-md">
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
        </div>
      </section>

      {/* Header */}

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
          <h2
            className="
              text-3xl
              font-black
              text-slate-800
            "
          >
            Pantry Inventory
          </h2>

          <p className="text-slate-500 mt-1">
            Smart pantry tracking with nutrition and expiry intelligence.
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

      {/* Food Cards */}

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
              key={food.id || food.name}
              food={food}
              onDelete={deletePantryFood}
            />
          ))}
        </div>
      )}
    </div>
  );
}
