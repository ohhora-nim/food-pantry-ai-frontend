// =========================================
// EmptyState.jsx
// Reusable Empty State Component
// =========================================

import { Sparkles, ArrowRight } from "lucide-react";

// =========================================
// Empty State
// =========================================

export default function EmptyState({
  icon = "✨",
  title = "Nothing here yet",
  description = "Add data or generate AI insights to see results here.",
  actionLabel = "",
  onAction = null,
  variant = "default",
}) {
  // =======================================
  // Variant Styles
  // =======================================

  const variants = {
    default: {
      wrapper: "bg-white border-slate-200",
      iconBox: "bg-slate-100 text-slate-600",
      title: "text-slate-800",
      description: "text-slate-500",
      button:
        "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
    },

    pantry: {
      wrapper: "bg-emerald-50 border-emerald-100",
      iconBox: "bg-emerald-100 text-emerald-600",
      title: "text-emerald-900",
      description: "text-emerald-700",
      button:
        "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
    },

    meals: {
      wrapper: "bg-orange-50 border-orange-100",
      iconBox: "bg-orange-100 text-orange-600",
      title: "text-orange-900",
      description: "text-orange-700",
      button:
        "from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
    },

    nutrition: {
      wrapper: "bg-violet-50 border-violet-100",
      iconBox: "bg-violet-100 text-violet-600",
      title: "text-violet-900",
      description: "text-violet-700",
      button:
        "from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700",
    },

    waste: {
      wrapper: "bg-amber-50 border-amber-100",
      iconBox: "bg-amber-100 text-amber-600",
      title: "text-amber-900",
      description: "text-amber-700",
      button:
        "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
    },

    coach: {
      wrapper: "bg-purple-50 border-purple-100",
      iconBox: "bg-purple-100 text-purple-600",
      title: "text-purple-900",
      description: "text-purple-700",
      button:
        "from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700",
    },
  };

  const style = variants[variant] || variants.default;

  // =======================================
  // Render
  // =======================================

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        p-10
        sm:p-14
        text-center
        shadow-sm
        ${style.wrapper}
      `}
    >
      {/* Decorative background */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-white/40
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-64
          w-64
          rounded-full
          bg-white/30
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`
            mx-auto
            mb-6
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-3xl
            text-5xl
            shadow-sm
            ${style.iconBox}
          `}
        >
          {typeof icon === "string" ? <span>{icon}</span> : icon}
        </div>

        {/* Small label */}
        <div
          className="
            mb-4
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white/70
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-600
            shadow-sm
          "
        >
          <Sparkles size={16} />
          AI-ready space
        </div>

        {/* Title */}
        <h2
          className={`
            mb-4
            text-3xl
            font-black
            tracking-tight
            sm:text-4xl
            ${style.title}
          `}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className={`
            mx-auto
            max-w-2xl
            text-base
            leading-relaxed
            sm:text-lg
            ${style.description}
          `}
        >
          {description}
        </p>

        {/* Optional Action */}
        {actionLabel && onAction && (
          <div className="mt-8">
            <button
              type="button"
              onClick={onAction}
              className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                px-6
                py-3.5
                font-bold
                text-white
                shadow-lg
                transition-all
                hover:scale-[1.02]
                hover:shadow-xl
                ${style.button}
              `}
            >
              {actionLabel}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
