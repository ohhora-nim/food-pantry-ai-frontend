// =========================================
// NutritionDashboard.jsx
// AI Nutrition Analytics Dashboard Component
// =========================================

import { useMemo } from "react";

import { usePantry } from "../../context/PantryContext";

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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import {
  HeartPulse,
  Salad,
  ShieldCheck,
  Activity,
  Sparkles,
  Leaf,
  Apple,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

// =========================================
// Colors
// =========================================

const PROCESSING_COLORS = [
  "#10b981", // fresh
  "#f59e0b", // processed
  "#ef4444", // ultra processed
];

const CATEGORY_COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
];

// =========================================
// Empty State
// =========================================

function EmptyState() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-14
        text-center
        shadow-sm
      "
    >
      <div className="text-7xl mb-6">📊</div>

      <h2 className="text-3xl font-black text-slate-800 mb-4">
        No Nutrition Analytics Yet
      </h2>

      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Add pantry foods to generate AI-powered nutrition analytics, food
        processing insights, pantry health scores, and nutrition balance.
      </p>
    </div>
  );
}

// =========================================
// Stat Card
// =========================================

function StatCard({ icon: Icon, title, value, subtitle, color = "emerald" }) {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    rose: "bg-rose-100 text-rose-600",
    violet: "bg-violet-100 text-violet-600",
    cyan: "bg-cyan-100 text-cyan-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between mb-5">
        <div
          className={`
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            ${colors[color] || colors.emerald}
          `}
        >
          <Icon size={24} />
        </div>

        <span className="text-sm text-slate-400">{title}</span>
      </div>

      <h3 className="text-4xl font-black text-slate-800">{value}</h3>

      <p className="text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
}

// =========================================
// Progress Row
// =========================================

function ProgressRow({ label, value, color = "bg-emerald-500" }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>

        <span className="text-sm text-slate-500">{safeValue}%</span>
      </div>

      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-500
            ${color}
          `}
          style={{
            width: `${safeValue}%`,
          }}
        />
      </div>
    </div>
  );
}

// =========================================
// Nutrition Dashboard
// =========================================

export default function NutritionDashboard() {
  const { nutrition } = usePantry();

  // =======================================
  // Empty
  // =======================================

  if (!nutrition) {
    return <EmptyState />;
  }

  // =======================================
  // Safe Data
  // =======================================

  const processingData = useMemo(() => {
    return [
      {
        name: "Fresh",
        value: nutrition.fresh_percent || 0,
      },
      {
        name: "Processed",
        value: nutrition.processed_percent || 0,
      },
      {
        name: "Ultra Processed",
        value: nutrition.ultra_processed_percent || 0,
      },
    ];
  }, [nutrition]);

  const categoryData = useMemo(() => {
    return nutrition.category_distribution || [];
  }, [nutrition]);

  const dailyData = useMemo(() => {
    return nutrition.daily_breakdown || [];
  }, [nutrition]);

  const balanceData = useMemo(() => {
    const balance = nutrition.nutrition_balance || {};

    return Object.entries(balance).map(([key, value]) => ({
      nutrient: key,
      score: value || 0,
    }));
  }, [nutrition]);

  const topTags = nutrition.top_tags || [];

  const insights = nutrition.insights || [];

  // =======================================
  // UI
  // =======================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* Hero */}
      {/* ================================= */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          from-emerald-500
          via-green-500
          to-teal-500
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/20
                px-4
                py-2
                text-sm
                font-semibold
                backdrop-blur-md
                mb-5
              "
            >
              <Sparkles size={16} />
              AI Nutrition Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              Nutrition Analytics Dashboard
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-emerald-50 leading-relaxed">
              AI-powered pantry nutrition analysis for food quality, processing
              levels, nutrient balance, and healthier eating habits.
            </p>
          </div>

          <div
            className="
              rounded-3xl
              bg-white/15
              border
              border-white/20
              backdrop-blur-md
              p-8
              text-center
              min-w-[260px]
            "
          >
            <p className="text-sm uppercase tracking-wide text-emerald-50 mb-3">
              Pantry Health Score
            </p>

            <h2 className="text-6xl font-black">
              {Math.round(nutrition.pantry_health_score || 0)}
            </h2>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={HeartPulse}
          title="Health"
          value={nutrition.pantry_health_score || 0}
          subtitle="Pantry Health Score"
          color="emerald"
        />

        <StatCard
          icon={Apple}
          title="Nutrition"
          value={nutrition.average_nutrition_score || 0}
          subtitle="Average Nutrition Score"
          color="green"
        />

        <StatCard
          icon={Activity}
          title="Priority"
          value={nutrition.average_priority_score || 0}
          subtitle="Average Priority Score"
          color="blue"
        />

        <StatCard
          icon={Salad}
          title="Foods"
          value={nutrition.total_foods || 0}
          subtitle="Foods Analyzed"
          color="violet"
        />
      </section>

      {/* ================================= */}
      {/* Processing Overview */}
      {/* ================================= */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Processing Pie */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-emerald-100
                text-emerald-600
                flex
                items-center
                justify-center
              "
            >
              <ShieldCheck size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Food Processing Distribution
              </h2>

              <p className="text-slate-500">Fresh vs processed food balance</p>
            </div>
          </div>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processingData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={115}
                  innerRadius={65}
                  paddingAngle={4}
                  label
                >
                  {processingData.map((_, index) => (
                    <Cell
                      key={index}
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

        {/* Processing Bars */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-teal-100
                text-teal-600
                flex
                items-center
                justify-center
              "
            >
              <Leaf size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Processing Quality
              </h2>

              <p className="text-slate-500">AI pantry food quality analysis</p>
            </div>
          </div>

          <div className="space-y-6">
            <ProgressRow
              label="Fresh Foods"
              value={nutrition.fresh_percent || 0}
              color="bg-emerald-500"
            />

            <ProgressRow
              label="Processed Foods"
              value={nutrition.processed_percent || 0}
              color="bg-amber-500"
            />

            <ProgressRow
              label="Ultra Processed Foods"
              value={nutrition.ultra_processed_percent || 0}
              color="bg-rose-500"
            />
          </div>

          <div
            className="
              mt-8
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50
              p-5
            "
          >
            <h3 className="font-bold text-emerald-800 mb-2">
              AI Processing Insight
            </h3>

            <p className="text-slate-700 leading-relaxed">
              {nutrition.processing_insight}
            </p>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Nutrition Balance + Categories */}
      {/* ================================= */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Radar */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-violet-100
                text-violet-600
                flex
                items-center
                justify-center
              "
            >
              <BarChart3 size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Nutrition Balance
              </h2>

              <p className="text-slate-500">Nutrient tag balance score</p>
            </div>
          </div>

          {balanceData.length === 0 ? (
            <p className="text-slate-500">
              No nutrition balance data available.
            </p>
          ) : (
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={balanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="nutrient" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.35}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Category Distribution */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              "
            >
              <Salad size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Category Distribution
              </h2>

              <p className="text-slate-500">Pantry food categories</p>
            </div>
          </div>

          {categoryData.length === 0 ? (
            <p className="text-slate-500">No category data available.</p>
          ) : (
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {categoryData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </section>

      {/* ================================= */}
      {/* Daily Nutrition Trend */}
      {/* ================================= */}

      <section
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-cyan-100
              text-cyan-600
              flex
              items-center
              justify-center
            "
          >
            <Activity size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Weekly Nutrition Trend
            </h2>

            <p className="text-slate-500">
              Simulated pantry nutrition score by day
            </p>
          </div>
        </div>

        {dailyData.length === 0 ? (
          <p className="text-slate-500">No daily nutrition data available.</p>
        ) : (
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* ================================= */}
      {/* Top Tags + Insights */}
      {/* ================================= */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top Tags */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-green-100
                text-green-600
                flex
                items-center
                justify-center
              "
            >
              <Apple size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Top Nutrition Tags
              </h2>

              <p className="text-slate-500">Most common nutrition strengths</p>
            </div>
          </div>

          {topTags.length === 0 ? (
            <p className="text-slate-500">No nutrition tags available.</p>
          ) : (
            <div className="space-y-4">
              {topTags.map((item, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    bg-slate-50
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800">
                      #{item.tag}
                    </span>

                    <span className="text-sm text-slate-500">
                      {item.count} foods
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (item.count /
                            Math.max(1, nutrition.total_foods || 1)) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Insights */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-amber-100
                text-amber-600
                flex
                items-center
                justify-center
              "
            >
              <AlertTriangle size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                AI Nutrition Insights
              </h2>

              <p className="text-slate-500">
                Personalized pantry nutrition observations
              </p>
            </div>
          </div>

          {insights.length === 0 ? (
            <p className="text-slate-500">No nutrition insights available.</p>
          ) : (
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-emerald-50
                    p-5
                    text-slate-700
                    leading-relaxed
                  "
                >
                  <span className="font-bold text-emerald-700">
                    Insight {index + 1}:{" "}
                  </span>
                  {insight}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================= */}
      {/* Bottom Message */}
      {/* ================================= */}

      <section
        className="
          rounded-3xl
          bg-gradient-to-br
          from-slate-900
          to-slate-800
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-start gap-5">
          <div
            className="
              w-16
              h-16
              rounded-3xl
              bg-white/10
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <HeartPulse size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">
              AI Nutrition Intelligence Insight
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
              Nutrition intelligence helps users understand food quality, reduce
              ultra-processed foods, improve nutrient diversity, and build
              healthier pantry habits over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
