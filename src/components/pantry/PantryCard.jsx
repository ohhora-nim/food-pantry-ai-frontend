// =========================================
// PantryCard.jsx
// Reusable Pantry Food Card
// =========================================

import {
  Trash2,
  Package,
  CalendarDays,
  ShieldCheck,
  Clock3,
  Salad,
  Leaf,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

// =========================================
// Helpers
// =========================================

function getExpiryStatus(expiryScore = 0) {
  if (expiryScore >= 8) {
    return {
      label: "Urgent",
      icon: AlertTriangle,
      card: "border-red-200 bg-red-50",
      badge: "bg-red-100 text-red-700 border-red-200",
      iconBox: "bg-red-100 text-red-600",
      text: "text-red-600",
    };
  }

  if (expiryScore >= 5) {
    return {
      label: "Use Soon",
      icon: Clock3,
      card: "border-amber-200 bg-amber-50",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      iconBox: "bg-amber-100 text-amber-600",
      text: "text-amber-600",
    };
  }

  return {
    label: "Fresh",
    icon: CheckCircle2,
    card: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    iconBox: "bg-emerald-100 text-emerald-600",
    text: "text-emerald-600",
  };
}

function getProcessingColor(processingLevel = "fresh") {
  if (processingLevel === "ultra_processed") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (processingLevel === "processed") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

function formatProcessingLevel(level = "fresh") {
  return level.replace("_", " ");
}

// =========================================
// Pantry Card
// =========================================

export default function PantryCard({ food, onDelete }) {
  if (!food) {
    return null;
  }

  const expiry = getExpiryStatus(food.expiry_score || 0);

  const ExpiryIcon = expiry.icon;

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
        ${expiry.card}
      `}
    >
      {/* =============================== */}
      {/* Header */}
      {/* =============================== */}

      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div
            className={`
              w-13
              h-13
              min-w-[52px]
              rounded-2xl
              flex
              items-center
              justify-center
              ${expiry.iconBox}
            `}
          >
            <ExpiryIcon size={24} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-800 capitalize leading-tight">
              {food.name}
            </h3>

            <p className="text-sm text-slate-500 capitalize mt-1">
              {food.category || "other"}
            </p>
          </div>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(food)}
            className="
              w-11
              h-11
              rounded-2xl
              bg-white/80
              text-red-500
              flex
              items-center
              justify-center
              shadow-sm
              transition-all
              hover:bg-red-500
              hover:text-white
            "
            aria-label={`Delete ${food.name}`}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* =============================== */}
      {/* Status Badges */}
      {/* =============================== */}

      <div className="flex flex-wrap gap-2 mb-6">
        <span
          className={`
            inline-flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-full
            border
            text-xs
            font-semibold
            ${expiry.badge}
          `}
        >
          {expiry.label}
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
            ${getProcessingColor(food.processing_level)}
          `}
        >
          {formatProcessingLevel(food.processing_level)}
        </span>
      </div>

      {/* =============================== */}
      {/* Main Stats */}
      {/* =============================== */}

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
            <ShieldCheck size={15} />
            Priority
          </div>

          <div className="text-2xl font-bold text-blue-600">
            {food.priority_score || 0}
          </div>
        </div>
      </div>

      {/* =============================== */}
      {/* Expiry */}
      {/* =============================== */}

      <div className="rounded-2xl bg-white/80 border border-white/60 p-4 mb-5">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
          <CalendarDays size={16} />
          Expiry Date
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="font-bold text-slate-800">{food.expiry_date}</div>

          <div className={`font-bold ${expiry.text}`}>
            Score {food.expiry_score || 0}
          </div>
        </div>
      </div>

      {/* =============================== */}
      {/* Nutrition Scores */}
      {/* =============================== */}

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-2xl bg-white/80 border border-white/60 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Salad size={15} />
            Nutrition
          </div>

          <div className="text-3xl font-black text-emerald-600">
            {food.nutrition_score || 0}
          </div>
        </div>

        <div className="rounded-2xl bg-white/80 border border-white/60 p-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Leaf size={15} />
            Waste Risk
          </div>

          <div className="text-3xl font-black text-orange-600">
            {food.waste_risk || 0}
          </div>
        </div>
      </div>

      {/* =============================== */}
      {/* Nutrition Tags */}
      {/* =============================== */}

      <div className="rounded-2xl bg-white/80 border border-white/60 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Salad size={16} className="text-emerald-600" />

          <span className="font-semibold text-slate-700">Nutrition Tags</span>
        </div>

        {food.nutrition_tags?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {food.nutrition_tags.map((tag, index) => (
              <span
                key={index}
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-slate-100
                  text-slate-700
                  text-xs
                  font-semibold
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
    </article>
  );
}
