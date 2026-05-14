import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// ========================================
// Colors
// ========================================

const PROCESSING_COLORS = ["#10B981", "#F59E0B", "#EF4444"];

// ========================================
// Empty State
// ========================================

function EmptyState() {
  return (
    <div
      className="
        bg-white

        rounded-3xl

        p-14

        text-center

        shadow-sm
      "
    >
      <div
        className="
          text-7xl
          mb-6
        "
      >
        📊
      </div>

      <h2
        className="
          text-3xl
          font-black
          text-gray-800
          mb-4
        "
      >
        Nutrition Analytics Dashboard
      </h2>

      <p
        className="
          text-gray-500
          max-w-2xl
          mx-auto
          leading-relaxed
        "
      >
        Generate an AI meal plan to receive intelligent nutrition analysis,
        processing insights, macro tracking, and health optimization.
      </p>
    </div>
  );
}

// ========================================
// Stat Card
// ========================================

function StatCard({
  title,

  value,

  unit,

  gradient,
}) {
  return (
    <div
      className={`
        rounded-3xl

        p-7

        text-white

        shadow-lg

        ${gradient}
      `}
    >
      <p
        className="
          text-sm
          uppercase
          tracking-wide

          text-white/80

          mb-4
        "
      >
        {title}
      </p>

      <div
        className="
          flex
          items-end
          gap-2
        "
      >
        <h2
          className="
            text-5xl
            font-black
          "
        >
          {Math.round(value)}
        </h2>

        <span
          className="
            text-xl
            font-semibold

            mb-1
          "
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

// ========================================
// Nutrition Dashboard
// ========================================

function NutritionDashboard({ analytics }) {
  // ======================================
  // Empty
  // ======================================

  if (!analytics) {
    return <EmptyState />;
  }

  // ======================================
  // Processing Data
  // ======================================

  const processingData = [
    {
      name: "Fresh",

      value: analytics.fresh_percent,
    },

    {
      name: "Processed",

      value: analytics.processed_percent,
    },

    {
      name: "Ultra Processed",

      value: analytics.ultra_processed_percent,
    },
  ];

  // ======================================
  // Daily Breakdown
  // ======================================

  const dailyData = analytics.daily_breakdown || [];

  // ======================================
  // UI
  // ======================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* Hero */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-indigo-500
          to-purple-600

          rounded-3xl

          p-8

          text-white

          shadow-xl
        "
      >
        <div
          className="
            flex
            flex-col
            xl:flex-row

            xl:items-center
            xl:justify-between

            gap-8
          "
        >
          {/* Left */}

          <div>
            <h1
              className="
                text-4xl
                font-black
                mb-4
              "
            >
              Nutrition Analytics Dashboard
            </h1>

            <p
              className="
                text-indigo-100
                max-w-3xl
                leading-relaxed
              "
            >
              AI-powered nutrition intelligence for tracking calories,
              macronutrients, food processing quality, and long-term healthy
              eating habits.
            </p>
          </div>

          {/* Right */}

          <div
            className="
              bg-white/15

              backdrop-blur-lg

              rounded-3xl

              px-8
              py-6

              text-center

              min-w-[240px]
            "
          >
            <p
              className="
                text-sm
                uppercase
                tracking-widest
                text-indigo-100
                mb-3
              "
            >
              Average Nutrition Score
            </p>

            <h2
              className="
                text-6xl
                font-black
              "
            >
              {Math.round(analytics.average_nutrition_score)}
            </h2>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Macro Stats */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <StatCard
          title="Calories"
          value={analytics.total_calories}
          unit="kcal"
          gradient="
            bg-gradient-to-r
            from-orange-500
            to-red-500
          "
        />

        <StatCard
          title="Protein"
          value={analytics.total_protein}
          unit="g"
          gradient="
            bg-gradient-to-r
            from-green-500
            to-emerald-600
          "
        />

        <StatCard
          title="Carbs"
          value={analytics.total_carbs}
          unit="g"
          gradient="
            bg-gradient-to-r
            from-yellow-500
            to-orange-500
          "
        />

        <StatCard
          title="Fat"
          value={analytics.total_fat}
          unit="g"
          gradient="
            bg-gradient-to-r
            from-pink-500
            to-rose-500
          "
        />
      </div>

      {/* ================================= */}
      {/* Secondary Stats */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        <StatCard
          title="Fiber"
          value={analytics.total_fiber}
          unit="g"
          gradient="
            bg-gradient-to-r
            from-teal-500
            to-cyan-600
          "
        />

        <StatCard
          title="Sugar"
          value={analytics.total_sugar}
          unit="g"
          gradient="
            bg-gradient-to-r
            from-pink-500
            to-fuchsia-600
          "
        />

        <StatCard
          title="Sodium"
          value={analytics.total_sodium}
          unit="mg"
          gradient="
            bg-gradient-to-r
            from-slate-500
            to-gray-700
          "
        />
      </div>

      {/* ================================= */}
      {/* Charts */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        "
      >
        {/* =============================== */}
        {/* Processing Chart */}
        {/* =============================== */}

        <div
          className="
            bg-white

            rounded-3xl

            p-8

            shadow-sm
          "
        >
          <h2
            className="
              text-2xl
              font-black
              text-gray-800
              mb-8
            "
          >
            Food Processing Distribution
          </h2>

          <div
            className="
              h-[350px]
            "
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processingData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {processingData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PROCESSING_COLORS[index % PROCESSING_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* =============================== */}
        {/* Daily Breakdown */}
        {/* =============================== */}

        <div
          className="
            bg-white

            rounded-3xl

            p-8

            shadow-sm
          "
        >
          <h2
            className="
              text-2xl
              font-black
              text-gray-800
              mb-8
            "
          >
            Daily Nutrition Breakdown
          </h2>

          <div
            className="
              h-[350px]
            "
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="calories" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Processing Insight */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-indigo-50
          to-purple-50

          border
          border-indigo-100

          rounded-3xl

          p-8
        "
      >
        <h2
          className="
            text-2xl
            font-black
            text-indigo-800
            mb-5
          "
        >
          AI Processing Insight
        </h2>

        <p
          className="
            text-gray-700
            leading-relaxed
            text-lg
          "
        >
          {analytics.processing_insight}
        </p>
      </div>

      {/* ================================= */}
      {/* Bottom Insight */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-gray-900
          to-gray-800

          rounded-3xl

          p-8

          shadow-xl
        "
      >
        <h2
          className="
            text-2xl
            font-black
            text-white
            mb-5
          "
        >
          AI Nutrition Insight
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          Nutrition analytics helps users improve food quality, reduce
          ultra-processed foods, optimize macronutrient balance, and build
          healthier long-term eating habits through intelligent AI insights.
        </p>
      </div>
    </div>
  );
}

export default NutritionDashboard;
