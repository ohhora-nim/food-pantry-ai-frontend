// =========================================
// FoodWasteForecast.jsx
// AI Food Waste Forecast Dashboard Component
// =========================================

import { useMemo } from "react";

import { usePantry } from "../../context/PantryContext";

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Leaf,
  Package,
  Recycle,
  Sparkles,
  Trash2,
  ShieldAlert,
  Refrigerator,
  BarChart3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// =========================================
// Colors
// =========================================

const RISK_COLORS = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

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
      <div className="text-7xl mb-6">♻️</div>

      <h2 className="text-3xl font-black text-slate-800 mb-4">
        No Food Waste Forecast Yet
      </h2>

      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Add pantry foods to generate AI-powered food waste forecasting, expiry
        risk analysis, storage advice, and sustainability insights.
      </p>
    </div>
  );
}

// =========================================
// Stat Card
// =========================================

function StatCard({ icon: Icon, label, value, subtitle, color = "emerald" }) {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    violet: "bg-violet-100 text-violet-600",
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

        <span className="text-sm text-slate-400">{label}</span>
      </div>

      <h3 className="text-4xl font-black text-slate-800">{value}</h3>

      <p className="text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
}

// =========================================
// Risk Helpers
// =========================================

function getRiskStyle(level = "low") {
  const normalized = level.toLowerCase();

  if (normalized === "high") {
    return {
      icon: AlertTriangle,
      title: "High Risk",
      card: "border-red-200 bg-red-50",
      badge: "bg-red-100 text-red-700 border-red-200",
      iconBox: "bg-red-100 text-red-600",
      score: "text-red-600",
    };
  }

  if (normalized === "medium") {
    return {
      icon: Clock3,
      title: "Medium Risk",
      card: "border-amber-200 bg-amber-50",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      iconBox: "bg-amber-100 text-amber-600",
      score: "text-amber-600",
    };
  }

  return {
    icon: CheckCircle2,
    title: "Low Risk",
    card: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    iconBox: "bg-emerald-100 text-emerald-600",
    score: "text-emerald-600",
  };
}

function formatLevel(level = "low") {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

// =========================================
// Food Risk Card
// =========================================

function FoodRiskCard({ food }) {
  const style = getRiskStyle(food.waste_level);

  const RiskIcon = style.icon;

  return (
    <article
      className={`
        rounded-3xl
        border
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
        ${style.card}
      `}
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div
            className={`
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              ${style.iconBox}
            `}
          >
            <RiskIcon size={24} />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-800 capitalize leading-tight">
              {food.name}
            </h3>

            <p className="text-sm text-slate-500 capitalize mt-1">
              {food.category}
            </p>
          </div>
        </div>

        <div className="text-right min-w-[72px]">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Risk
          </p>

          <div
            className={`
              text-4xl
              font-black
              ${style.score}
            `}
          >
            {food.waste_risk_score}
          </div>
        </div>
      </div>

      {/* Badges */}

      <div className="flex flex-wrap gap-2 mb-5">
        <span
          className={`
            inline-flex
            px-3
            py-1.5
            rounded-full
            border
            text-xs
            font-semibold
            ${style.badge}
          `}
        >
          {style.title}
        </span>

        <span
          className="
            inline-flex
            px-3
            py-1.5
            rounded-full
            border
            border-slate-200
            bg-white/80
            text-slate-700
            text-xs
            font-semibold
            capitalize
          "
        >
          {food.processing_level}
        </span>
      </div>

      {/* Details */}

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-2xl bg-white/80 border border-white/60 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Package size={15} />
            Quantity
          </div>

          <div className="text-2xl font-bold text-slate-800">
            {food.quantity}
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 border border-white/60 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Clock3 size={15} />
            Days Left
          </div>

          <div className="text-2xl font-bold text-slate-800">
            {food.days_left ?? "N/A"}
          </div>
        </div>
      </div>

      {/* Recommendation */}

      <div className="rounded-2xl bg-white/80 border border-white/60 p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-violet-600" />

          <h4 className="font-bold text-slate-800">Waste Reduction Action</h4>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {food.recommendation}
        </p>
      </div>

      {/* Storage Advice */}

      <div className="rounded-2xl bg-white/80 border border-white/60 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Refrigerator size={16} className="text-blue-600" />

          <h4 className="font-bold text-slate-800">Storage Advice</h4>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {food.storage_advice}
        </p>
      </div>
    </article>
  );
}

// =========================================
// Food Waste Forecast
// =========================================

export default function FoodWasteForecast() {
  const { waste } = usePantry();

  // =======================================
  // Empty
  // =======================================

  if (!waste) {
    return <EmptyState />;
  }

  const highRiskFoods = waste.high_risk_foods || [];

  const mediumRiskFoods = waste.medium_risk_foods || [];

  const lowRiskFoods = waste.low_risk_foods || [];

  const allRiskFoods = [...highRiskFoods, ...mediumRiskFoods, ...lowRiskFoods];

  if (allRiskFoods.length === 0) {
    return <EmptyState />;
  }

  // =======================================
  // Chart Data
  // =======================================

  const riskDistribution = useMemo(() => {
    return [
      {
        name: "High",
        value: waste.high_risk_count || 0,
      },
      {
        name: "Medium",
        value: waste.medium_risk_count || 0,
      },
      {
        name: "Low",
        value: waste.low_risk_count || 0,
      },
    ];
  }, [waste]);

  const riskScoreData = useMemo(() => {
    return allRiskFoods.slice(0, 8).map((food) => ({
      name: food.name,
      score: food.waste_risk_score || 0,
    }));
  }, [allRiskFoods]);

  const insights = waste.insights || [];

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
          from-orange-500
          via-amber-500
          to-red-500
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
              AI Food Waste Intelligence
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              Food Waste Forecast
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-orange-50 leading-relaxed">
              AI-powered waste forecasting helps you use foods before expiry,
              improve pantry rotation, reduce grocery waste, and support a
              cleaner world.
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
            <p className="text-sm uppercase tracking-wide text-orange-50 mb-3">
              Overall Waste Score
            </p>

            <h2 className="text-6xl font-black">
              {Math.round(waste.overall_waste_score || 0)}
            </h2>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={Trash2}
          label="Waste"
          value={waste.overall_waste_score || 0}
          subtitle="Overall Waste Risk"
          color="orange"
        />

        <StatCard
          icon={ShieldAlert}
          label="Urgent"
          value={waste.urgent_items || 0}
          subtitle="Foods Needing Action"
          color="red"
        />

        <StatCard
          icon={AlertTriangle}
          label="High Risk"
          value={waste.high_risk_count || 0}
          subtitle="High Waste Risk Foods"
          color="red"
        />

        <StatCard
          icon={Leaf}
          label="Low Risk"
          value={waste.low_risk_count || 0}
          subtitle="Stable Pantry Foods"
          color="emerald"
        />
      </section>

      {/* ================================= */}
      {/* Charts */}
      {/* ================================= */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Risk Distribution */}

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
                bg-orange-100
                text-orange-600
                flex
                items-center
                justify-center
              "
            >
              <Recycle size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Waste Risk Distribution
              </h2>

              <p className="text-slate-500">Breakdown of pantry waste risk</p>
            </div>
          </div>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={115}
                  innerRadius={65}
                  paddingAngle={4}
                  label
                >
                  <Cell fill={RISK_COLORS.high} />
                  <Cell fill={RISK_COLORS.medium} />
                  <Cell fill={RISK_COLORS.low} />
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Scores */}

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
                bg-red-100
                text-red-600
                flex
                items-center
                justify-center
              "
            >
              <BarChart3 size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Top Waste Risk Scores
              </h2>

              <p className="text-slate-500">
                Highest-risk foods in your pantry
              </p>
            </div>
          </div>

          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskScoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="score" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Insights */}
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
              bg-amber-100
              text-amber-600
              flex
              items-center
              justify-center
            "
          >
            <Sparkles size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              AI Waste Insights
            </h2>

            <p className="text-slate-500">
              Practical observations to reduce food waste
            </p>
          </div>
        </div>

        {insights.length === 0 ? (
          <p className="text-slate-500">No waste insights available.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-orange-100
                  bg-orange-50
                  p-5
                  text-slate-700
                  leading-relaxed
                "
              >
                <span className="font-bold text-orange-700">
                  Insight {index + 1}:{" "}
                </span>
                {insight}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================================= */}
      {/* Risk Food Cards */}
      {/* ================================= */}

      {highRiskFoods.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              High Risk Foods
            </h2>

            <p className="text-slate-500 mt-1">
              Use these foods first to prevent waste.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {highRiskFoods.map((food, index) => (
              <FoodRiskCard key={`high-${food.name}-${index}`} food={food} />
            ))}
          </div>
        </section>
      )}

      {mediumRiskFoods.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              Medium Risk Foods
            </h2>

            <p className="text-slate-500 mt-1">
              Plan these into meals within the next few days.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mediumRiskFoods.map((food, index) => (
              <FoodRiskCard key={`medium-${food.name}-${index}`} food={food} />
            ))}
          </div>
        </section>
      )}

      {lowRiskFoods.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              Low Risk Foods
            </h2>

            <p className="text-slate-500 mt-1">
              These foods are currently stable.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {lowRiskFoods.map((food, index) => (
              <FoodRiskCard key={`low-${food.name}-${index}`} food={food} />
            ))}
          </div>
        </section>
      )}

      {/* ================================= */}
      {/* Sustainability Impact */}
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
            <Leaf size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">Sustainability Impact</h2>

            <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
              {waste.sustainability_impact ||
                "Reducing food waste helps save money, protect resources, and lower environmental impact."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
