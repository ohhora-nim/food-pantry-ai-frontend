// =========================================
// DashboardSummary.jsx
// AI Dashboard Summary Component
// =========================================

import { useMemo } from "react";

import { usePantry } from "../../context/PantryContext";

// =========================================
// Icons
// =========================================

import {
  Sparkles,
  Brain,
  HeartPulse,
  Trash2,
  ChefHat,
  Apple,
  ShieldCheck,
  AlertTriangle,
  Leaf,
} from "lucide-react";

// =========================================
// Dashboard Summary
// =========================================

export default function DashboardSummary() {
  const { pantryFoods, recommendations, nutrition, waste, meals, coaching } =
    usePantry();

  // =======================================
  // AI Summary
  // =======================================

  const summary = useMemo(() => {
    const pantryCount = pantryFoods?.length || 0;

    const recommendationCount = recommendations?.length || 0;

    const healthScore = nutrition?.pantry_health_score || 0;

    const freshPercent = nutrition?.fresh_percent || 0;

    const wasteScore = waste?.overall_waste_score || 0;

    const urgentFoods = waste?.urgent_items || 0;

    const mealDays = meals?.length || 0;

    // ===================================
    // Health Status
    // ===================================

    let healthStatus = "Improving";

    if (healthScore >= 85) {
      healthStatus = "Excellent";
    } else if (healthScore >= 70) {
      healthStatus = "Healthy";
    } else if (healthScore >= 50) {
      healthStatus = "Balanced";
    }

    // ===================================
    // Waste Status
    // ===================================

    let wasteStatus = "Stable";

    if (urgentFoods >= 5) {
      wasteStatus = "High Risk";
    } else if (urgentFoods >= 2) {
      wasteStatus = "Needs Attention";
    }

    return {
      pantryCount,
      recommendationCount,
      healthScore,
      freshPercent,
      wasteScore,
      urgentFoods,
      mealDays,
      healthStatus,
      wasteStatus,
    };
  }, [pantryFoods, recommendations, nutrition, waste, meals]);

  // =======================================
  // Coaching Messages
  // =======================================

  const coachingMessages = useMemo(() => {
    const messages = [];

    // ===================================
    // Health
    // ===================================

    if (summary.healthScore >= 85) {
      messages.push({
        icon: HeartPulse,

        title: "Excellent Nutrition Quality",

        description:
          "Your pantry contains a strong balance of healthy foods and fresh ingredients.",

        color: "emerald",
      });
    } else if (summary.healthScore >= 65) {
      messages.push({
        icon: Apple,

        title: "Healthy Pantry Direction",

        description:
          "Your pantry is progressing well. More fresh foods can further improve nutrition quality.",

        color: "green",
      });
    } else {
      messages.push({
        icon: ShieldCheck,

        title: "Nutrition Improvement Opportunity",

        description:
          "Adding more whole foods and reducing ultra-processed foods may improve long-term wellness.",

        color: "amber",
      });
    }

    // ===================================
    // Waste
    // ===================================

    if (summary.urgentFoods >= 3) {
      messages.push({
        icon: AlertTriangle,

        title: "Food Waste Attention Needed",

        description:
          "Several pantry foods may expire soon. Prioritize these foods in upcoming meals.",

        color: "orange",
      });
    } else {
      messages.push({
        icon: Leaf,

        title: "Strong Waste Management",

        description:
          "Your pantry currently shows healthy food usage and reduced spoilage risk.",

        color: "teal",
      });
    }

    // ===================================
    // Meals
    // ===================================

    if (summary.mealDays >= 5) {
      messages.push({
        icon: ChefHat,

        title: "Meal Planning Success",

        description:
          "Your AI meal planning system is actively supporting healthier eating habits.",

        color: "violet",
      });
    }

    return messages;
  }, [summary]);

  // =======================================
  // Color Classes
  // =======================================

  const getColorClasses = (color) => {
    const colors = {
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",

      green: "bg-green-50 border-green-200 text-green-700",

      amber: "bg-amber-50 border-amber-200 text-amber-700",

      orange: "bg-orange-50 border-orange-200 text-orange-700",

      teal: "bg-teal-50 border-teal-200 text-teal-700",

      violet: "bg-violet-50 border-violet-200 text-violet-700",
    };

    return colors[color] || colors.emerald;
  };

  // =======================================
  // Render
  // =======================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* AI Summary Hero */}
      {/* ================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm backdrop-blur-md mb-6">
            <Sparkles size={16} />
            AI Pantry Intelligence Summary
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Smart Pantry Insights
              <br />
              Powered by AI
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              AI continuously analyzes nutrition quality, food freshness, pantry
              balance, waste risk, and healthy eating opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Summary Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* =============================== */}
        {/* Health */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <HeartPulse size={28} />
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
              {summary.healthStatus}
            </span>
          </div>

          <div className="text-5xl font-bold mb-2">{summary.healthScore}</div>

          <div className="text-slate-500">Pantry Health Score</div>
        </div>

        {/* =============================== */}
        {/* Waste */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Trash2 size={28} />
            </div>

            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
              {summary.wasteStatus}
            </span>
          </div>

          <div className="text-5xl font-bold mb-2">{summary.wasteScore}</div>

          <div className="text-slate-500">Waste Risk Score</div>
        </div>

        {/* =============================== */}
        {/* Fresh */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-3xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Leaf size={28} />
            </div>

            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
              Fresh Foods
            </span>
          </div>

          <div className="text-5xl font-bold mb-2">{summary.freshPercent}%</div>

          <div className="text-slate-500">Whole Food Ratio</div>
        </div>

        {/* =============================== */}
        {/* Recommendations */}
        {/* =============================== */}

        <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-3xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Brain size={28} />
            </div>

            <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
              AI Insights
            </span>
          </div>

          <div className="text-5xl font-bold mb-2">
            {summary.recommendationCount}
          </div>

          <div className="text-slate-500">Food Recommendations</div>
        </div>
      </section>

      {/* ================================= */}
      {/* AI Coaching Summary */}
      {/* ================================= */}

      <section className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-3xl bg-violet-100 text-violet-600 flex items-center justify-center">
            <Brain size={32} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">AI Coaching Summary</h2>

            <p className="text-slate-500 mt-1">
              Personalized healthy pantry intelligence
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {coachingMessages.map((message, index) => {
            const Icon = message.icon;

            return (
              <div
                key={index}
                className={`rounded-3xl border p-6 ${getColorClasses(message.color)}`}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <Icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-3">{message.title}</h3>

                    <p className="leading-relaxed text-base">
                      {message.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================= */}
      {/* AI Health Coach */}
      {/* ================================= */}

      {coaching?.summary && (
        <section className="rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-8 text-white shadow-xl">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles size={32} />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-5">
                AI Health Coaching Insight
              </h2>

              <p className="max-w-4xl text-violet-50 text-lg leading-relaxed">
                {coaching.summary}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
