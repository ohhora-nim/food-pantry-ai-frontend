// =========================================
// Sidebar.jsx
// Desktop Sidebar Navigation
// =========================================

import { NavLink } from "react-router-dom";

import {
  Home,
  Package,
  ChefHat,
  HeartPulse,
  Trash2,
  Brain,
  Sparkles,
  Leaf,
} from "lucide-react";

// =========================================
// Navigation Items
// =========================================

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    label: "Pantry",
    path: "/pantry",
    icon: Package,
  },
  {
    label: "Meals",
    path: "/meals",
    icon: ChefHat,
  },
  {
    label: "Nutrition",
    path: "/nutrition",
    icon: HeartPulse,
  },
  {
    label: "Waste",
    path: "/waste",
    icon: Trash2,
  },
  {
    label: "AI Coach",
    path: "/coach",
    icon: Brain,
  },
  {
    label: "Recommendations",
    path: "/recommendations",
    icon: Sparkles,
  },
];

// =========================================
// Sidebar
// =========================================

export default function Sidebar() {
  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        hidden
        h-screen
        w-72
        border-r
        border-slate-200
        bg-white/90
        backdrop-blur-xl
        lg:flex
        lg:flex-col
      "
    >
      {/* ================================= */}
      {/* Logo */}
      {/* ================================= */}

      <div
        className="
          border-b
          border-slate-100
          px-6
          py-6
        "
      >
        <NavLink
          to="/dashboard"
          className="
            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-br
              from-emerald-500
              to-green-600
              text-white
              shadow-lg
            "
          >
            <Leaf size={28} />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-black
                tracking-tight
                text-slate-800
              "
            >
              Pantry AI
            </h1>

            <p
              className="
                text-sm
                font-medium
                text-slate-500
              "
            >
              Smart Food OS
            </p>
          </div>
        </NavLink>
      </div>

      {/* ================================= */}
      {/* Navigation */}
      {/* ================================= */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-4
          py-6
        "
      >
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  text-sm
                  font-bold
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-emerald-500
                        to-green-600
                        text-white
                        shadow-lg
                        shadow-emerald-500/20
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                      `
                  }
                `}
              >
                <Icon
                  size={22}
                  className="
                    flex-shrink-0
                  "
                />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ================================= */}
      {/* Bottom Info Card */}
      {/* ================================= */}

      <div
        className="
          border-t
          border-slate-100
          p-5
        "
      >
        <div
          className="
            rounded-3xl
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            p-5
            text-white
            shadow-xl
          "
        >
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/10
            "
          >
            <Sparkles size={24} />
          </div>

          <h3
            className="
              mb-2
              text-lg
              font-black
            "
          >
            AI Food Intelligence
          </h3>

          <p
            className="
              text-sm
              leading-relaxed
              text-slate-300
            "
          >
            Reduce food waste, improve nutrition, and save money with smart
            pantry planning.
          </p>
        </div>
      </div>
    </aside>
  );
}
