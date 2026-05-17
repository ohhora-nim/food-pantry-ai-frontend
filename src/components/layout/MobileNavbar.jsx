// =========================================
// MobileNavbar.jsx
// Mobile Bottom Navigation
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
} from "lucide-react";

// =========================================
// Navigation Items
// =========================================

const navItems = [
  {
    label: "Home",
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
    label: "Coach",
    path: "/coach",
    icon: Brain,
  },
  {
    label: "Recommend",
    path: "/recommendations",
    icon: Sparkles,
  },
];

// =========================================
// Mobile Navbar
// =========================================

export default function MobileNavbar() {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50

        border-t
        border-slate-200

        bg-white/95
        backdrop-blur-xl

        px-2
        py-2

        shadow-[0_-8px_30px_rgba(15,23,42,0.08)]

        lg:hidden
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-1
          overflow-x-auto
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                min-w-[72px]

                flex
                flex-col
                items-center
                justify-center
                gap-1

                rounded-2xl

                px-2
                py-2

                text-xs
                font-semibold

                transition-all
                duration-300

                ${
                  isActive
                    ? `
                      bg-gradient-to-br
                      from-emerald-500
                      to-green-600
                      text-white
                      shadow-lg
                      shadow-emerald-500/20
                    `
                    : `
                      text-slate-500
                      hover:bg-slate-100
                      hover:text-slate-900
                    `
                }
              `}
            >
              <Icon
                size={20}
                className="
                  flex-shrink-0
                "
              />

              <span
                className="
                  leading-none
                  whitespace-nowrap
                "
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
