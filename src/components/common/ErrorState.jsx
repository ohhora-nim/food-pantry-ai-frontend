// =========================================
// ErrorState.jsx
// Reusable Error State Component
// =========================================

import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

import { Link } from "react-router-dom";

// =========================================
// Error State
// =========================================

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  details = "",
  onRetry = null,
  showHomeButton = true,
  variant = "default",
}) {
  // =======================================
  // Variant Styles
  // =======================================

  const variants = {
    default: {
      wrapper: "bg-red-50 border-red-200",
      iconBox: "bg-red-100 text-red-600",
      title: "text-red-900",
      message: "text-red-700",
      details: "bg-white/70 border-red-100 text-red-800",
      retry: "from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
    },

    warning: {
      wrapper: "bg-amber-50 border-amber-200",
      iconBox: "bg-amber-100 text-amber-600",
      title: "text-amber-900",
      message: "text-amber-700",
      details: "bg-white/70 border-amber-100 text-amber-800",
      retry:
        "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
    },

    offline: {
      wrapper: "bg-slate-50 border-slate-200",
      iconBox: "bg-slate-100 text-slate-600",
      title: "text-slate-900",
      message: "text-slate-600",
      details: "bg-white/70 border-slate-100 text-slate-700",
      retry: "from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black",
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
        p-8
        sm:p-12
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
        {/* Header */}
        <div
          className="
            flex
            flex-col
            items-start
            gap-5
            sm:flex-row
          "
        >
          <div
            className={`
              flex
              h-16
              w-16
              flex-shrink-0
              items-center
              justify-center
              rounded-3xl
              shadow-sm
              ${style.iconBox}
            `}
          >
            <AlertTriangle size={32} />
          </div>

          <div className="min-w-0">
            <div
              className="
                mb-3
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
              <Bug size={16} />
              Error detected
            </div>

            <h2
              className={`
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
                ${style.title}
              `}
            >
              {title}
            </h2>

            <p
              className={`
                mt-4
                max-w-3xl
                text-base
                leading-relaxed
                sm:text-lg
                ${style.message}
              `}
            >
              {message}
            </p>
          </div>
        </div>

        {/* Details */}
        {details && (
          <div
            className={`
              mt-8
              rounded-2xl
              border
              p-5
              text-sm
              leading-relaxed
              ${style.details}
            `}
          >
            <p
              className="
                mb-2
                font-bold
              "
            >
              Details
            </p>

            <pre
              className="
                whitespace-pre-wrap
                break-words
                font-mono
                text-xs
              "
            >
              {String(details)}
            </pre>
          </div>
        )}

        {/* Actions */}
        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
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
                ${style.retry}
              `}
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          )}

          {showHomeButton && (
            <Link
              to="/dashboard"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-6
                py-3.5
                font-bold
                text-slate-700
                shadow-sm
                transition-all
                hover:bg-slate-50
                hover:shadow-md
              "
            >
              <Home size={18} />
              Back to Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
