// =========================================
// RecommendedFoods.jsx
// Recommendation Cards Only
// Page-level stats/actions live in RecommendationsPage.jsx
// =========================================

import { useMemo } from "react";

import { usePantry } from "../../context/PantryContext";

import {
  Sparkles,
  Apple,
  Salad,
  Star,
  Leaf,
  HeartPulse,
  TrendingUp,
  CheckCircle2,
  PackagePlus,
  Brain,
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
      <div className="text-7xl mb-6">✨</div>

      <h2 className="text-3xl font-black text-slate-800 mb-4">
        No Food Recommendations Yet
      </h2>

      <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Add pantry foods to receive fast recommendations from your Smart Food
        Database. Then generate AI explanations from the Recommendations page.
      </p>
    </div>
  );
}

// =========================================
// Helpers
// =========================================

function getCategoryStyle(category = "other") {
  const normalized = String(category).toLowerCase();

  const styles = {
    vegetable: "bg-emerald-100 text-emerald-700 border-emerald-200",
    fruit: "bg-pink-100 text-pink-700 border-pink-200",
    meat: "bg-orange-100 text-orange-700 border-orange-200",
    seafood: "bg-cyan-100 text-cyan-700 border-cyan-200",
    grain: "bg-amber-100 text-amber-700 border-amber-200",
    dairy: "bg-blue-100 text-blue-700 border-blue-200",
    protein: "bg-red-100 text-red-700 border-red-200",
    other: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return styles[normalized] || styles.other;
}

function getProcessingStyle(processingLevel = "fresh") {
  if (processingLevel === "ultra_processed") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (processingLevel === "processed") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

function formatProcessingLevel(level = "fresh") {
  return String(level).replaceAll("_", " ");
}

function getScoreColor(score = 0) {
  if (score >= 85) {
    return "text-emerald-600";
  }

  if (score >= 70) {
    return "text-amber-600";
  }

  return "text-rose-600";
}

function getPriorityBadge(score = 0) {
  if (score >= 85) {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (score >= 70) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-rose-100 text-rose-700 border-rose-200";
}

// =========================================
// Recommendation Card
// =========================================

function RecommendationCard({ food, onAddFood }) {
  if (!food) {
    return null;
  }

  const nutritionScore = Number(food.nutrition_score || 0);

  const priorityScore = Number(food.priority_score || 0);

  const hasAIExplanation = Boolean(food.explanation);

  const explanationText =
    food.explanation ||
    food.reason ||
    "Recommended for improving pantry nutrition quality.";

  return (
    <article
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800 capitalize leading-tight mb-3">
            {food.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            <span
              className={`
                inline-flex
                px-3
                py-1.5
                rounded-full
                border
                text-xs
                font-semibold
                capitalize
                ${getCategoryStyle(food.category)}
              `}
            >
              {food.category || "food"}
            </span>

            <span
              className={`
                inline-flex
                px-3
                py-1.5
                rounded-full
                border
                text-xs
                font-semibold
                capitalize
                ${getProcessingStyle(food.processing_level)}
              `}
            >
              {formatProcessingLevel(food.processing_level)}
            </span>
          </div>
        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            flex-shrink-0
            ${
              hasAIExplanation
                ? "bg-violet-100 text-violet-600"
                : "bg-emerald-100 text-emerald-600"
            }
          `}
        >
          {hasAIExplanation ? <Brain size={26} /> : <Sparkles size={26} />}
        </div>
      </div>

      {/* Scores */}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <HeartPulse size={15} />
            Nutrition
          </div>

          <div
            className={`
              text-3xl
              font-black
              ${getScoreColor(nutritionScore * 10)}
            `}
          >
            {nutritionScore}
          </div>

          <div className="h-2 rounded-full bg-slate-200 mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{
                width: `${Math.min(100, nutritionScore * 10)}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Star size={15} />
            Priority
          </div>

          <div
            className={`
              text-3xl
              font-black
              ${getScoreColor(priorityScore)}
            `}
          >
            {priorityScore}
          </div>

          <div className="h-2 rounded-full bg-slate-200 mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-violet-500"
              style={{
                width: `${Math.min(100, priorityScore)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Priority Badge */}

      <div className="mb-6">
        <span
          className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            text-sm
            font-semibold
            ${getPriorityBadge(priorityScore)}
          `}
        >
          <TrendingUp size={16} />
          AI Priority Score: {priorityScore}/100
        </span>
      </div>

      {/* Nutrition Tags */}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Salad size={18} className="text-emerald-600" />

          <h4 className="font-bold text-slate-800">Nutrition Tags</h4>
        </div>

        {food.nutrition_tags?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {food.nutrition_tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="
                  rounded-full
                  bg-slate-100
                  border
                  border-slate-200
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-slate-700
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No nutrition tags available.</p>
        )}
      </div>

      {/* Benefits */}

      {food.benefits?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} className="text-emerald-600" />

            <h4 className="font-bold text-slate-800">Benefits</h4>
          </div>

          <div className="space-y-2">
            {food.benefits.map((benefit, index) => (
              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  bg-emerald-50
                  border
                  border-emerald-100
                  p-3
                "
              >
                <CheckCircle2
                  size={16}
                  className="text-emerald-600 mt-0.5 flex-shrink-0"
                />

                <p className="text-sm text-slate-700 leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation / Reason */}

      <div
        className={`
          rounded-2xl
          border
          p-4
          mb-6
          ${
            hasAIExplanation
              ? "bg-violet-50 border-violet-100"
              : "bg-slate-50 border-slate-200"
          }
        `}
      >
        <div className="flex items-center gap-2 mb-2">
          {hasAIExplanation ? (
            <Brain size={16} className="text-violet-600" />
          ) : (
            <Sparkles size={16} className="text-slate-500" />
          )}

          <h4
            className={`
              font-bold
              ${hasAIExplanation ? "text-violet-800" : "text-slate-800"}
            `}
          >
            {hasAIExplanation ? "AI Explanation" : "Recommendation Reason"}
          </h4>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {explanationText}
        </p>
      </div>

      {/* Add Button */}

      {onAddFood && (
        <button
          type="button"
          onClick={() => onAddFood(food)}
          className="
            w-full
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            px-5
            py-4
            font-bold
            text-white
            shadow-lg
            transition-all
            hover:from-emerald-600
            hover:to-green-700
            hover:shadow-xl
          "
        >
          <PackagePlus size={20} />
          Add to Pantry
        </button>
      )}
    </article>
  );
}

// =========================================
// Recommended Foods
// =========================================

export default function RecommendedFoods() {
  const { recommendations, addPantryFood } = usePantry();

  if (!recommendations || recommendations.length === 0) {
    return <EmptyState />;
  }

  async function handleAddRecommendedFood(food) {
    const today = new Date();

    const defaultExpiry = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    await addPantryFood({
      name: food.name,
      quantity: 1,
      expiry_date: defaultExpiry,
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendations.map((food, index) => (
          <RecommendationCard
            key={`${food.name}-${index}`}
            food={food}
            onAddFood={handleAddRecommendedFood}
          />
        ))}
      </div>

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
            <Apple size={32} />
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">
              AI Food Recommendation Insight
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
              Smart recommendations help users discover healthier, more
              versatile, and more sustainable foods while reducing dependence on
              ultra-processed foods and improving pantry balance over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
