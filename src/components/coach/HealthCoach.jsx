// =========================================
// HealthCoach.jsx
// AI Health Coach Component
// Supports structured coaching object from backend
// =========================================

import { useMemo } from "react";

import { usePantry } from "../../context/PantryContext";

import {
  Brain,
  Sparkles,
  HeartPulse,
  Salad,
  ShieldCheck,
  Dumbbell,
  Droplets,
  Apple,
  Leaf,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

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
      <div className="text-7xl mb-6">🧠</div>

      <h2 className="text-3xl font-black text-slate-800 mb-4">
        No AI Health Coaching Yet
      </h2>

      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Add pantry foods, then generate AI coaching to receive personalized
        nutrition, fitness, hydration, and meal balance guidance.
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

        <span className="text-sm text-slate-400">{label}</span>
      </div>

      <h3 className="text-4xl font-black text-slate-800">{value}</h3>

      <p className="text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
}

// =========================================
// List Card
// =========================================

function ListCard({ icon: Icon, title, items = [], type = "positive" }) {
  const styles = {
    positive: {
      card: "border-emerald-100 bg-emerald-50",
      icon: "bg-emerald-100 text-emerald-600",
      text: "text-emerald-800",
      bullet: "text-emerald-600",
      fallback: "No strengths detected yet.",
    },

    warning: {
      card: "border-amber-100 bg-amber-50",
      icon: "bg-amber-100 text-amber-600",
      text: "text-amber-800",
      bullet: "text-amber-600",
      fallback: "No major risks detected.",
    },

    recommendation: {
      card: "border-violet-100 bg-violet-50",
      icon: "bg-violet-100 text-violet-600",
      text: "text-violet-800",
      bullet: "text-violet-600",
      fallback: "No recommendations yet.",
    },
  };

  const style = styles[type] || styles.positive;

  return (
    <section
      className={`
        rounded-3xl
        border
        p-6
        shadow-sm
        ${style.card}
      `}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`
            w-12
            h-12
            rounded-2xl
            flex
            items-center
            justify-center
            ${style.icon}
          `}
        >
          <Icon size={24} />
        </div>

        <h2
          className={`
            text-2xl
            font-black
            ${style.text}
          `}
        >
          {title}
        </h2>
      </div>

      {items?.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                bg-white/80
                border
                border-white/70
                p-4
                flex
                items-start
                gap-3
              "
            >
              <CheckCircle2
                size={18}
                className={`
                  mt-0.5
                  flex-shrink-0
                  ${style.bullet}
                `}
              />

              <p className="text-slate-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-600">{style.fallback}</p>
      )}
    </section>
  );
}

// =========================================
// Insight Card
// =========================================

function InsightCard({ icon: Icon, title, text, color = "emerald" }) {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-600 border-emerald-100",
    green: "bg-green-100 text-green-600 border-green-100",
    blue: "bg-blue-100 text-blue-600 border-blue-100",
    amber: "bg-amber-100 text-amber-600 border-amber-100",
    violet: "bg-violet-100 text-violet-600 border-violet-100",
    cyan: "bg-cyan-100 text-cyan-600 border-cyan-100",
    rose: "bg-rose-100 text-rose-600 border-rose-100",
  };

  const iconStyle = colors[color] || colors.emerald;

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        hover:shadow-lg
        transition-all
      "
    >
      <div
        className={`
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          mb-5
          ${iconStyle}
        `}
      >
        <Icon size={26} />
      </div>

      <h3 className="text-xl font-black text-slate-800 mb-3">{title}</h3>

      <p className="text-slate-600 leading-relaxed">
        {text || "No insight available yet."}
      </p>
    </div>
  );
}

// =========================================
// Health Coach
// =========================================

export default function HealthCoach() {
  const { coaching, nutrition, pantryFoods, waste } = usePantry();

  // =======================================
  // Normalize Coaching
  // =======================================

  const normalizedCoaching = useMemo(() => {
    if (!coaching) {
      return null;
    }

    // =====================================
    // If backend returns old plain string
    // =====================================

    if (typeof coaching === "string") {
      return {
        health_score: nutrition?.pantry_health_score || 0,

        summary: coaching,

        strengths: [],

        risks: [],

        recommendations: [],

        nutrition_focus: nutrition?.processing_insight || "",

        fitness_tip: "Add a short walk after meals when possible.",

        hydration_tip: "Drink water regularly throughout the day.",

        meal_balance_feedback:
          "Aim for meals with protein, vegetables, and fiber.",
      };
    }

    // =====================================
    // Structured backend response
    // =====================================

    return {
      health_score:
        coaching.health_score || nutrition?.pantry_health_score || 0,

      summary: coaching.summary || "",

      strengths: coaching.strengths || [],

      risks: coaching.risks || [],

      recommendations: coaching.recommendations || [],

      nutrition_focus: coaching.nutrition_focus || "",

      fitness_tip: coaching.fitness_tip || "",

      hydration_tip: coaching.hydration_tip || "",

      meal_balance_feedback: coaching.meal_balance_feedback || "",
    };
  }, [coaching, nutrition]);

  // =======================================
  // Empty
  // =======================================

  if (!normalizedCoaching) {
    return <EmptyState />;
  }

  // =======================================
  // Stats
  // =======================================

  const healthScore = Math.round(normalizedCoaching.health_score || 0);

  const freshPercent = nutrition?.fresh_percent || 0;

  const ultraProcessed = nutrition?.ultra_processed_percent || 0;

  const urgentItems = waste?.urgent_items || 0;

  const pantryCount = pantryFoods?.length || 0;

  // =======================================
  // Score Label
  // =======================================

  const scoreLabel =
    healthScore >= 85
      ? "Excellent"
      : healthScore >= 70
        ? "Good"
        : healthScore >= 50
          ? "Improving"
          : "Needs Focus";

  const scoreColor =
    healthScore >= 85
      ? "text-emerald-300"
      : healthScore >= 70
        ? "text-green-300"
        : healthScore >= 50
          ? "text-amber-300"
          : "text-rose-300";

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
          from-violet-500
          via-purple-500
          to-fuchsia-500
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
              AI Human-Like Health Coaching
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              AI Health Coach
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-violet-50 leading-relaxed">
              Personalized coaching to improve nutrition, reduce food waste,
              support healthy habits, and build a smarter pantry lifestyle.
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
            <p className="text-sm uppercase tracking-wide text-violet-50 mb-3">
              Health Score
            </p>

            <h2
              className={`
                text-6xl
                font-black
                ${scoreColor}
              `}
            >
              {healthScore}
            </h2>

            <p className="mt-2 text-violet-100 font-semibold">{scoreLabel}</p>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Stats */}
      {/* ================================= */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={HeartPulse}
          label="Health"
          value={healthScore}
          subtitle="AI Health Score"
          color="violet"
        />

        <StatCard
          icon={Salad}
          label="Fresh"
          value={`${freshPercent}%`}
          subtitle="Fresh Whole Foods"
          color="emerald"
        />

        <StatCard
          icon={AlertTriangle}
          label="Processed"
          value={`${ultraProcessed}%`}
          subtitle="Ultra-Processed Foods"
          color="rose"
        />

        <StatCard
          icon={Apple}
          label="Pantry"
          value={pantryCount}
          subtitle="Foods Analyzed"
          color="green"
        />
      </section>

      {/* ================================= */}
      {/* Summary */}
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
        <div className="flex items-start gap-5">
          <div
            className="
              w-16
              h-16
              rounded-3xl
              bg-violet-100
              text-violet-600
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <Brain size={32} />
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">
              AI Coaching Summary
            </h2>

            <p className="text-slate-700 leading-relaxed text-lg max-w-4xl">
              {normalizedCoaching.summary ||
                "Your AI health coaching summary will appear here."}
            </p>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* Strengths + Risks */}
      {/* ================================= */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ListCard
          icon={CheckCircle2}
          title="Health Strengths"
          items={normalizedCoaching.strengths}
          type="positive"
        />

        <ListCard
          icon={AlertTriangle}
          title="Health Risks"
          items={normalizedCoaching.risks}
          type="warning"
        />
      </section>

      {/* ================================= */}
      {/* Recommendations */}
      {/* ================================= */}

      {normalizedCoaching.recommendations?.length > 0 && (
        <ListCard
          icon={Sparkles}
          title="AI Recommendations"
          items={normalizedCoaching.recommendations}
          type="recommendation"
        />
      )}

      {/* ================================= */}
      {/* Coaching Insight Cards */}
      {/* ================================= */}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <InsightCard
          icon={Apple}
          title="Nutrition Focus"
          text={normalizedCoaching.nutrition_focus}
          color="emerald"
        />

        <InsightCard
          icon={Dumbbell}
          title="Fitness Tip"
          text={normalizedCoaching.fitness_tip}
          color="amber"
        />

        <InsightCard
          icon={Droplets}
          title="Hydration Tip"
          text={normalizedCoaching.hydration_tip}
          color="cyan"
        />

        <InsightCard
          icon={ShieldCheck}
          title="Meal Balance"
          text={normalizedCoaching.meal_balance_feedback}
          color="violet"
        />
      </section>

      {/* ================================= */}
      {/* Waste / Urgency Note */}
      {/* ================================= */}

      {urgentItems > 0 && (
        <section
          className="
            rounded-3xl
            border
            border-amber-200
            bg-amber-50
            p-6
          "
        >
          <div className="flex items-start gap-4">
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
                flex-shrink-0
              "
            >
              <AlertTriangle size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-amber-900 mb-2">
                Food Waste Attention
              </h2>

              <p className="text-slate-700 leading-relaxed">
                You have {urgentItems} urgent item(s). Consider planning meals
                around those foods first to reduce waste and save money.
              </p>
            </div>
          </div>
        </section>
      )}

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
            <Leaf size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">
              AI Health Coaching Insight
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
              Small improvements in pantry quality, fresh food intake,
              hydration, movement, and food waste reduction can support better
              health, save money, and build long-term sustainable eating habits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
