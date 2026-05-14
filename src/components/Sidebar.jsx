import React from "react";

import {
  Home,
  Refrigerator,
  CalendarDays,
  ShoppingCart,
  BarChart3,
  Wallet,
  Trash2,
  HeartPulse,
  Sparkles,
  X,
} from "lucide-react";

// ========================================
// Sidebar Items
// ========================================

const menuItems = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },

  {
    label: "Pantry",
    icon: Refrigerator,
    path: "/pantry",
  },

  {
    label: "Meal Planner",
    icon: CalendarDays,
    path: "/meal-planner",
  },

  {
    label: "Grocery",
    icon: ShoppingCart,
    path: "/grocery",
  },

  {
    label: "Nutrition",
    icon: BarChart3,
    path: "/nutrition",
  },

  {
    label: "Budget",
    icon: Wallet,
    path: "/budget",
  },

  {
    label: "Waste Forecast",
    icon: Trash2,
    path: "/waste",
  },

  {
    label: "AI Coach",
    icon: HeartPulse,
    path: "/coach",
  },

  {
    label: "Recommendations",
    icon: Sparkles,
    path: "/recommendations",
  },
];

// ========================================
// Sidebar Component
// ========================================

function Sidebar({
  currentTab,

  navigate,

  sidebarOpen,

  setSidebarOpen,
}) {
  // ======================================
  // Navigation
  // ======================================

  function handleNavigate(path) {
    navigate(path);

    setSidebarOpen(false);
  }

  // ======================================
  // UI
  // ======================================

  return (
    <>
      {/* ================================= */}
      {/* Desktop Sidebar */}
      {/* ================================= */}

      <aside
        className="
          hidden
          lg:flex

          fixed
          left-0
          top-0

          h-screen
          w-72

          bg-white

          border-r
          border-gray-200

          flex-col

          z-40
        "
      >
        {/* ================================= */}
        {/* Logo */}
        {/* ================================= */}

        <div
          className="
            px-8
            py-8

            border-b
            border-gray-100
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-gradient-to-br
                from-green-500
                to-emerald-600

                flex
                items-center
                justify-center

                text-white
                text-2xl

                shadow-lg
              "
            >
              🥗
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-black
                  text-gray-800
                "
              >
                Food Pantry AI
              </h1>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Smart Food Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Navigation */}
        {/* ================================= */}

        <nav
          className="
            flex-1

            px-4
            py-6

            overflow-y-auto
          "
        >
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const isActive = currentTab === item.path.replace("/", "");

              return (
                <button
                  key={index}
                  onClick={() => handleNavigate(item.path)}
                  className={`
                      w-full

                      flex
                      items-center
                      gap-4

                      px-5
                      py-3

                      rounded-2xl

                      transition-all
                      duration-300

                      group

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-green-500
                            to-emerald-600

                            text-white

                            shadow-lg
                          `
                          : `
                            text-gray-600

                            hover:bg-gray-100
                            hover:text-gray-900
                          `
                      }
                    `}
                >
                  <Icon size={22} />

                  <span
                    className="
                        font-semibold
                        text-base
                      "
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ================================= */}
        {/* Bottom */}
        {/* ================================= */}

        <div
          className="
            p-5

            border-t
            border-gray-100
          "
        >
          <div
            className="
              bg-gradient-to-br
              from-green-500
              to-emerald-600

              rounded-3xl

              p-5

              text-white
            "
          >
            <h3
              className="
                font-black
                text-lg
                mb-2
              "
            >
              AI Sustainability
            </h3>

            <p
              className="
                text-sm
                text-green-100
                leading-relaxed
              "
            >
              Reduce food waste, save money, and build a smarter, healthier
              kitchen.
            </p>
          </div>
        </div>
      </aside>

      {/* ================================= */}
      {/* Mobile Sidebar */}
      {/* ================================= */}

      <aside
        className={`
          fixed
          top-0
          left-0

          h-screen
          w-72

          bg-white

          z-50

          flex
          flex-col

          transition-transform
          duration-300

          lg:hidden

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ================================= */}
        {/* Mobile Header */}
        {/* ================================= */}

        <div
          className="
            flex
            items-center
            justify-between

            px-6
            py-6

            border-b
            border-gray-100
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                w-12
                h-12

                rounded-2xl

                bg-gradient-to-br
                from-green-500
                to-emerald-600

                flex
                items-center
                justify-center

                text-white
                text-xl
              "
            >
              🥗
            </div>

            <div>
              <h1
                className="
                  text-xl
                  font-black
                  text-gray-800
                "
              >
                Food Pantry AI
              </h1>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Smart Kitchen
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="
              p-2

              rounded-xl

              hover:bg-gray-100
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* ================================= */}
        {/* Mobile Navigation */}
        {/* ================================= */}

        <nav
          className="
            flex-1

            overflow-y-auto

            p-4
          "
        >
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const isActive = currentTab === item.path.replace("/", "");

              return (
                <button
                  key={index}
                  onClick={() => handleNavigate(item.path)}
                  className={`
                      w-full

                      flex
                      items-center
                      gap-4

                      px-5
                      py-3

                      rounded-2xl

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            bg-gradient-to-r
                            from-green-500
                            to-emerald-600

                            text-white

                            shadow-lg
                          `
                          : `
                            text-gray-600

                            hover:bg-gray-100
                            hover:text-gray-900
                          `
                      }
                    `}
                >
                  <Icon size={22} />

                  <span
                    className="
                        font-semibold
                      "
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
