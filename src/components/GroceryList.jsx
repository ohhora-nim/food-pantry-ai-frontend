import React from "react";

import {
  ShoppingCart,
  DollarSign,
  Refrigerator,
  Sparkles,
  Leaf,
  Star,
  CheckCircle2,
} from "lucide-react";

// ========================================
// Empty State
// ========================================

function EmptyState() {
  return (
    <div
      className="
        bg-white

        rounded-3xl

        p-14

        text-center

        shadow-sm
      "
    >
      <div
        className="
          text-7xl
          mb-6
        "
      >
        🛒
      </div>

      <h2
        className="
          text-3xl
          font-black
          text-gray-800
          mb-4
        "
      >
        Smart Grocery Optimization
      </h2>

      <p
        className="
          text-gray-500
          max-w-2xl
          mx-auto
          leading-relaxed
        "
      >
        Generate an AI meal plan to receive intelligent grocery shopping
        recommendations optimized for nutrition, sustainability, pantry
        efficiency, and budget savings.
      </p>
    </div>
  );
}

// ========================================
// Priority Styles
// ========================================

function getPriorityStyles(priority) {
  switch (priority?.toLowerCase()) {
    case "high":
      return {
        card: `
          border-red-200
          bg-red-50
        `,

        badge: `
          bg-red-100
          text-red-700
        `,

        score: `
          text-red-600
        `,
      };

    case "medium":
      return {
        card: `
          border-yellow-200
          bg-yellow-50
        `,

        badge: `
          bg-yellow-100
          text-yellow-700
        `,

        score: `
          text-yellow-600
        `,
      };

    default:
      return {
        card: `
          border-green-200
          bg-green-50
        `,

        badge: `
          bg-green-100
          text-green-700
        `,

        score: `
          text-green-600
        `,
      };
  }
}

// ========================================
// Grocery List
// ========================================

function GroceryList({ groceryList }) {
  // ======================================
  // Empty
  // ======================================

  if (!groceryList || groceryList.length === 0) {
    return <EmptyState />;
  }

  // ======================================
  // Stats
  // ======================================

  const totalItems = groceryList.length;

  const totalEstimatedCost = groceryList.reduce(
    (sum, item) => sum + (Number(item.estimated_price) || 0),

    0,
  );

  const highPriorityCount = groceryList.filter(
    (item) => item.priority?.toLowerCase() === "high",
  ).length;

  // ======================================
  // UI
  // ======================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* Hero */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-blue-500
          to-cyan-600

          rounded-3xl

          p-8

          text-white

          shadow-xl
        "
      >
        <div
          className="
            flex
            flex-col
            xl:flex-row

            xl:items-center
            xl:justify-between

            gap-8
          "
        >
          {/* Left */}

          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2

                bg-white/15

                px-4
                py-2

                rounded-full

                mb-6
              "
            >
              <Sparkles size={18} />

              <span
                className="
                  font-semibold
                "
              >
                AI Grocery Intelligence
              </span>
            </div>

            <h1
              className="
                text-5xl
                font-black
                leading-tight
                mb-5
              "
            >
              Smart Grocery Optimization
            </h1>

            <p
              className="
                text-cyan-100
                text-lg

                max-w-3xl

                leading-relaxed
              "
            >
              AI-powered grocery shopping recommendations optimized for
              nutrition, affordability, sustainability, pantry efficiency, and
              healthy eating.
            </p>
          </div>

          {/* Right */}

          <div
            className="
              bg-white/15

              backdrop-blur-lg

              rounded-3xl

              p-8

              min-w-[260px]

              text-center
            "
          >
            <div
              className="
                text-7xl
                mb-4
              "
            >
              🛍️
            </div>

            <h2
              className="
                text-6xl
                font-black
                mb-2
              "
            >
              {totalItems}
            </h2>

            <p
              className="
                text-cyan-100
              "
            >
              Smart Grocery Items
            </p>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Stats */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        {/* Items */}

        <div
          className="
            bg-white

            rounded-3xl

            p-7

            shadow-sm
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              mb-5
            "
          >
            <ShoppingCart
              className="
                text-blue-600
              "
              size={32}
            />
          </div>

          <p
            className="
              text-sm
              uppercase
              tracking-wide
              text-gray-500
              mb-3
            "
          >
            Grocery Items
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-blue-600
            "
          >
            {totalItems}
          </h2>
        </div>

        {/* Budget */}

        <div
          className="
            bg-white

            rounded-3xl

            p-7

            shadow-sm
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              mb-5
            "
          >
            <DollarSign
              className="
                text-green-600
              "
              size={32}
            />
          </div>

          <p
            className="
              text-sm
              uppercase
              tracking-wide
              text-gray-500
              mb-3
            "
          >
            Estimated Cost
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-green-600
            "
          >
            ${Math.round(totalEstimatedCost)}
          </h2>
        </div>

        {/* Priority */}

        <div
          className="
            bg-white

            rounded-3xl

            p-7

            shadow-sm
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              mb-5
            "
          >
            <Star
              className="
                text-red-500
              "
              size={32}
            />
          </div>

          <p
            className="
              text-sm
              uppercase
              tracking-wide
              text-gray-500
              mb-3
            "
          >
            High Priority
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-red-600
            "
          >
            {highPriorityCount}
          </h2>
        </div>
      </div>

      {/* ================================= */}
      {/* Grocery Cards */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
        "
      >
        {groceryList.map((item, index) => {
          const styles = getPriorityStyles(item.priority);

          return (
            <div
              key={index}
              className={`
                  border

                  rounded-3xl

                  p-7

                  shadow-sm

                  hover:shadow-xl

                  transition-all
                  duration-300

                  ${styles.card}
                `}
            >
              {/* ===================== */}
              {/* Header */}
              {/* ===================== */}

              <div
                className="
                    flex
                    items-start
                    justify-between

                    gap-5

                    mb-6
                  "
              >
                {/* Left */}

                <div>
                  <div
                    className="
                        flex
                        items-center
                        gap-3

                        mb-4
                      "
                  >
                    <span
                      className={`
                          px-4
                          py-2

                          rounded-full

                          text-sm
                          font-bold

                          capitalize

                          ${styles.badge}
                        `}
                    >
                      {item.priority} Priority
                    </span>

                    <span
                      className="
                          bg-white

                          px-4
                          py-2

                          rounded-full

                          text-sm
                          font-semibold

                          text-gray-700

                          capitalize
                        "
                    >
                      {item.category}
                    </span>
                  </div>

                  <h2
                    className="
                        text-3xl
                        font-black
                        text-gray-800
                        mb-3
                      "
                  >
                    {item.name}
                  </h2>

                  <div
                    className="
                        flex
                        items-center
                        gap-3

                        text-gray-600
                      "
                  >
                    <span
                      className="
                          font-semibold
                        "
                    >
                      Qty:
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                </div>

                {/* Nutrition Score */}

                <div
                  className="
                      text-center

                      min-w-[90px]
                    "
                >
                  <p
                    className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-gray-500
                        mb-2
                      "
                  >
                    Score
                  </p>

                  <h2
                    className={`
                        text-5xl
                        font-black

                        ${styles.score}
                      `}
                  >
                    {item.nutrition_score}
                  </h2>
                </div>
              </div>

              {/* ===================== */}
              {/* Nutrition Tags */}
              {/* ===================== */}

              <div className="mb-6">
                <div
                  className="
                      flex
                      flex-wrap
                      gap-2
                    "
                >
                  {item.nutrition_tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="
                            bg-white

                            px-3
                            py-2

                            rounded-full

                            text-sm
                            font-semibold

                            text-cyan-700
                          "
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ===================== */}
              {/* Meal Support */}
              {/* ===================== */}

              <div
                className="
                    bg-white/80

                    rounded-2xl

                    p-5

                    mb-5
                  "
              >
                <h3
                  className="
                      text-lg
                      font-black
                      text-gray-800
                      mb-4
                    "
                >
                  Meal Support
                </h3>

                <div
                  className="
                      flex
                      flex-wrap
                      gap-3
                    "
                >
                  {item.meal_support?.map((meal, idx) => (
                    <div
                      key={idx}
                      className="
                            bg-cyan-100
                            text-cyan-700

                            px-4
                            py-2

                            rounded-full

                            text-sm
                            font-semibold
                          "
                    >
                      {meal}
                    </div>
                  ))}
                </div>
              </div>

              {/* ===================== */}
              {/* Storage */}
              {/* ===================== */}

              <div
                className="
                    bg-white/80

                    rounded-2xl

                    p-5

                    mb-5
                  "
              >
                <div
                  className="
                      flex
                      items-start
                      gap-4
                    "
                >
                  <Refrigerator
                    className="
                        text-blue-600
                        mt-1
                      "
                    size={24}
                  />

                  <div>
                    <h3
                      className="
                          text-lg
                          font-black
                          text-gray-800
                          mb-2
                        "
                    >
                      Storage Tip
                    </h3>

                    <p
                      className="
                          text-gray-700
                          leading-relaxed
                        "
                    >
                      {item.storage_tip}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===================== */}
              {/* Reason */}
              {/* ===================== */}

              <div
                className="
                    bg-gradient-to-r
                    from-blue-50
                    to-cyan-50

                    border
                    border-blue-100

                    rounded-2xl

                    p-5
                  "
              >
                <div
                  className="
                      flex
                      items-start
                      gap-4
                    "
                >
                  <Leaf
                    className="
                        text-green-600
                        mt-1
                      "
                    size={24}
                  />

                  <div>
                    <h3
                      className="
                          text-lg
                          font-black
                          text-blue-800
                          mb-3
                        "
                    >
                      AI Shopping Insight
                    </h3>

                    <p
                      className="
                          text-gray-700
                          leading-relaxed
                        "
                    >
                      {item.reason}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================= */}
      {/* Bottom Insight */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-gray-900
          to-gray-800

          rounded-3xl

          p-8

          shadow-xl
        "
      >
        <h2
          className="
            text-2xl
            font-black
            text-white
            mb-5
          "
        >
          AI Grocery Intelligence Insight
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          Smart grocery optimization helps users reduce unnecessary purchases,
          improve nutrition quality, minimize food waste, support sustainable
          shopping, and save money through intelligent AI-powered grocery
          planning.
        </p>
      </div>
    </div>
  );
}

export default GroceryList;
