// =========================================
// Topbar.jsx
// Responsive Top Navigation Bar
// =========================================

import { useLocation } from "react-router-dom";

import {
  Bell,
  RefreshCw,
  Search,
  Sparkles,
  Clock3,
  Wifi,
  WifiOff,
} from "lucide-react";

import { usePantry } from "../../context/PantryContext";

// =========================================
// Page Titles
// =========================================

const pageMeta = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "AI-powered food intelligence overview",
  },
  "/pantry": {
    title: "Pantry",
    subtitle: "Manage pantry foods and freshness",
  },
  "/meals": {
    title: "Meals",
    subtitle: "AI-generated meal planning",
  },
  "/nutrition": {
    title: "Nutrition",
    subtitle: "Pantry nutrition analytics",
  },
  "/waste": {
    title: "Waste Forecast",
    subtitle: "Food waste risk intelligence",
  },
  "/coach": {
    title: "AI Coach",
    subtitle: "Personalized healthy eating guidance",
  },
  "/recommendations": {
    title: "Recommendations",
    subtitle: "Smart food recommendations",
  },
};

// =========================================
// Format Date
// =========================================

function formatDate(value) {
  if (!value) {
    return "Not updated yet";
  }

  try {
    return new Date(value).toLocaleString();
  } catch {
    return "Not updated yet";
  }
}

// =========================================
// Topbar
// =========================================

export default function Topbar() {
  const location = useLocation();

  const { loading, error, lastUpdated, fetchDashboard } = usePantry();

  const meta = pageMeta[location.pathname] || pageMeta["/dashboard"];

  const online = typeof navigator !== "undefined" ? navigator.onLine : true;

  return (
    <header
      className="
        sticky
        top-0
        z-30

        border-b
        border-slate-200

        bg-white/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4

          px-4
          py-4

          sm:px-6
          lg:px-8
        "
      >
        {/* ================================= */}
        {/* Left: Page Info */}
        {/* ================================= */}

        <div className="min-w-0">
          <div
            className="
              flex
              items-center
              gap-3
              mb-1
            "
          >
            <div
              className="
                hidden
                sm:flex

                h-10
                w-10

                items-center
                justify-center

                rounded-2xl

                bg-gradient-to-br
                from-emerald-500
                to-green-600

                text-white

                shadow-lg
              "
            >
              <Sparkles size={20} />
            </div>

            <div>
              <h1
                className="
                  text-xl
                  sm:text-2xl
                  font-black
                  text-slate-800
                  truncate
                "
              >
                {meta.title}
              </h1>

              <p
                className="
                  hidden
                  sm:block
                  text-sm
                  text-slate-500
                  truncate
                "
              >
                {meta.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Center: Search */}
        {/* ================================= */}

        <div
          className="
            hidden
            xl:block
            flex-1
            max-w-md
          "
        >
          <div className="relative">
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
              placeholder="Search pantry, meals, insights..."
              className="
                w-full

                rounded-2xl

                border
                border-slate-200

                bg-slate-50

                py-3
                pl-11
                pr-4

                text-sm

                outline-none

                transition-all

                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500
              "
            />
          </div>
        </div>

        {/* ================================= */}
        {/* Right: Status + Actions */}
        {/* ================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* ============================= */}
          {/* Online Status */}
          {/* ============================= */}

          <div
            className={`
              hidden
              md:flex
              items-center
              gap-2

              rounded-2xl

              px-4
              py-2

              text-sm
              font-semibold

              ${
                online
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }
            `}
          >
            {online ? <Wifi size={16} /> : <WifiOff size={16} />}

            {online ? "Online" : "Offline"}
          </div>

          {/* ============================= */}
          {/* Last Updated */}
          {/* ============================= */}

          <div
            className="
              hidden
              2xl:flex
              items-center
              gap-2

              rounded-2xl

              bg-slate-50

              px-4
              py-2

              text-sm
              text-slate-600
            "
          >
            <Clock3 size={16} />

            <span>{formatDate(lastUpdated)}</span>
          </div>

          {/* ============================= */}
          {/* Error Indicator */}
          {/* ============================= */}

          {error && (
            <div
              className="
                hidden
                lg:flex

                rounded-2xl

                bg-red-50

                px-4
                py-2

                text-sm
                font-semibold
                text-red-700
              "
            >
              Error
            </div>
          )}

          {/* ============================= */}
          {/* Refresh */}
          {/* ============================= */}

          <button
            type="button"
            onClick={fetchDashboard}
            disabled={loading}
            className="
              inline-flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              border
              border-slate-200

              bg-white

              text-slate-600

              shadow-sm

              transition-all

              hover:bg-slate-50
              hover:text-slate-900

              disabled:opacity-60
              disabled:cursor-not-allowed
            "
            aria-label="Refresh dashboard"
          >
            <RefreshCw size={19} className={loading ? "animate-spin" : ""} />
          </button>

          {/* ============================= */}
          {/* Notifications */}
          {/* ============================= */}

          <button
            type="button"
            className="
              relative

              inline-flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              border
              border-slate-200

              bg-white

              text-slate-600

              shadow-sm

              transition-all

              hover:bg-slate-50
              hover:text-slate-900
            "
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span
              className="
                absolute
                right-2.5
                top-2.5

                h-2.5
                w-2.5

                rounded-full

                bg-emerald-500

                ring-2
                ring-white
              "
            />
          </button>

          {/* ============================= */}
          {/* User Avatar */}
          {/* ============================= */}

          <div
            className="
              hidden
              sm:flex

              h-11
              w-11

              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-slate-800
              to-slate-700

              text-sm
              font-black
              text-white

              shadow-sm
            "
          >
            AI
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Mobile Subtitle */}
      {/* ================================= */}

      <div
        className="
          px-4
          pb-4
          sm:hidden
        "
      >
        <p
          className="
            text-sm
            text-slate-500
          "
        >
          {meta.subtitle}
        </p>
      </div>
    </header>
  );
}
