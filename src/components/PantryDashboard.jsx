import React from "react";

import {
  Trash2,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Package,
} from "lucide-react";

// ========================================
// Calculate Days Left
// ========================================

function calculateDaysLeft(expiryDate) {
  if (!expiryDate) {
    return 0;
  }

  const today = new Date();

  const expiry = new Date(expiryDate);

  const diffTime = expiry - today;

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// ========================================
// Expiry Styling
// ========================================

function getExpiryStyles(daysLeft) {
  if (daysLeft <= 2) {
    return {
      card: `
        border-red-200
        bg-red-50
      `,

      badge: `
        bg-red-100
        text-red-700
      `,

      text: `
        text-red-600
      `,

      icon: <AlertTriangle size={28} />,

      label: "Expiring Soon",
    };
  }

  if (daysLeft <= 5) {
    return {
      card: `
        border-yellow-200
        bg-yellow-50
      `,

      badge: `
        bg-yellow-100
        text-yellow-700
      `,

      text: `
        text-yellow-600
      `,

      icon: <Clock3 size={28} />,

      label: "Medium Priority",
    };
  }

  return {
    card: `
      border-green-200
      bg-green-50
    `,

    badge: `
      bg-green-100
      text-green-700
    `,

    text: `
      text-green-600
    `,

    icon: <CheckCircle2 size={28} />,

    label: "Fresh",
  };
}

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
        🥬
      </div>

      <h2
        className="
          text-3xl
          font-black
          text-gray-800
          mb-4
        "
      >
        Pantry Intelligence Dashboard
      </h2>

      <p
        className="
          text-gray-500
          max-w-2xl
          mx-auto
          leading-relaxed
        "
      >
        Add pantry foods to unlock AI meal planning, nutrition analytics,
        sustainability forecasting, grocery optimization, and personalized
        health coaching.
      </p>
    </div>
  );
}

// ========================================
// Pantry Dashboard
// ========================================

function PantryDashboard({
  foods,

  onDeleteFood,
}) {
  // ======================================
  // Empty
  // ======================================

  if (!foods || foods.length === 0) {
    return <EmptyState />;
  }

  // ======================================
  // Auto Sorting
  // ======================================

  const sortedFoods = [...foods].sort((a, b) => {
    const aDays = calculateDaysLeft(a.expiry_date);

    const bDays = calculateDaysLeft(b.expiry_date);

    return aDays - bDays;
  });

  // ======================================
  // Stats
  // ======================================

  const expiringSoon = sortedFoods.filter(
    (food) => calculateDaysLeft(food.expiry_date) <= 2,
  ).length;

  const averageNutrition =
    sortedFoods.length > 0
      ? (
          sortedFoods.reduce(
            (sum, food) => sum + (food.nutrition_score || 0),

            0,
          ) / sortedFoods.length
        ).toFixed(1)
      : 0;

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
          from-green-500
          to-emerald-600

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
            <h1
              className="
                text-4xl
                font-black
                mb-4
              "
            >
              Pantry Intelligence Dashboard
            </h1>

            <p
              className="
                text-green-100
                max-w-3xl
                leading-relaxed
              "
            >
              AI-powered pantry intelligence for food tracking, expiration
              monitoring, sustainability optimization, and nutrition-aware meal
              planning.
            </p>
          </div>

          {/* Right */}

          <div
            className="
              bg-white/15

              backdrop-blur-lg

              rounded-3xl

              px-8
              py-6

              text-center

              min-w-[240px]
            "
          >
            <p
              className="
                text-sm
                uppercase
                tracking-widest
                text-green-100
                mb-3
              "
            >
              Pantry Foods
            </p>

            <h2
              className="
                text-6xl
                font-black
              "
            >
              {sortedFoods.length}
            </h2>
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
        {/* Total Foods */}

        <div
          className="
            bg-white

            rounded-3xl

            p-7

            shadow-sm
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-wide
              text-gray-500
              mb-3
            "
          >
            Total Pantry Foods
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-green-600
            "
          >
            {sortedFoods.length}
          </h2>
        </div>

        {/* Expiring Soon */}

        <div
          className="
            bg-white

            rounded-3xl

            p-7

            shadow-sm
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-wide
              text-gray-500
              mb-3
            "
          >
            Expiring Soon
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-red-600
            "
          >
            {expiringSoon}
          </h2>
        </div>

        {/* Nutrition */}

        <div
          className="
            bg-white

            rounded-3xl

            p-7

            shadow-sm
          "
        >
          <p
            className="
              text-sm
              uppercase
              tracking-wide
              text-gray-500
              mb-3
            "
          >
            Average Nutrition
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-violet-600
            "
          >
            {averageNutrition}
          </h2>
        </div>
      </div>

      {/* ================================= */}
      {/* Pantry Cards */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
        "
      >
        {sortedFoods.map((food, index) => {
          const daysLeft = calculateDaysLeft(food.expiry_date);

          const styles = getExpiryStyles(daysLeft);

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

                    gap-4

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
                    <div
                      className={`
                          ${styles.text}
                        `}
                    >
                      {styles.icon}
                    </div>

                    <span
                      className={`
                          px-4
                          py-2

                          rounded-full

                          text-sm
                          font-bold

                          ${styles.badge}
                        `}
                    >
                      {styles.label}
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
                    {food.name}
                  </h2>

                  <div
                    className="
                        flex
                        items-center
                        gap-2

                        text-gray-600
                      "
                  >
                    <Package size={18} />

                    <span
                      className="
                          font-medium
                        "
                    >
                      Qty: {food.quantity}
                    </span>
                  </div>
                </div>

                {/* Delete */}

                <button
                  onClick={() => onDeleteFood(index)}
                  className="
                      w-12
                      h-12

                      rounded-2xl

                      bg-white

                      flex
                      items-center
                      justify-center

                      text-red-500

                      hover:bg-red-500
                      hover:text-white

                      transition-all
                      duration-300
                    "
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* ===================== */}
              {/* Details */}
              {/* ===================== */}

              <div className="space-y-4">
                {/* Expiry */}

                <div
                  className="
                      bg-white/80

                      rounded-2xl

                      p-4
                    "
                >
                  <p
                    className="
                        text-sm
                        text-gray-500
                        mb-2
                      "
                  >
                    Expiry Date
                  </p>

                  <h3
                    className="
                        text-xl
                        font-black
                        text-gray-800
                      "
                  >
                    {food.expiry_date}
                  </h3>

                  <p
                    className={`
                        mt-2
                        font-semibold

                        ${styles.text}
                      `}
                  >
                    {daysLeft} days left
                  </p>
                </div>

                {/* Category + Processing */}

                <div
                  className="
                      grid
                      grid-cols-2
                      gap-4
                    "
                >
                  <div
                    className="
                        bg-white/80

                        rounded-2xl

                        p-4
                      "
                  >
                    <p
                      className="
                          text-sm
                          text-gray-500
                          mb-2
                        "
                    >
                      Category
                    </p>

                    <h3
                      className="
                          font-black
                          text-gray-800
                          capitalize
                        "
                    >
                      {food.category}
                    </h3>
                  </div>

                  <div
                    className="
                        bg-white/80

                        rounded-2xl

                        p-4
                      "
                  >
                    <p
                      className="
                          text-sm
                          text-gray-500
                          mb-2
                        "
                    >
                      Processing
                    </p>

                    <h3
                      className="
                          font-black
                          text-gray-800
                          capitalize
                        "
                    >
                      {food.processing_level}
                    </h3>
                  </div>
                </div>

                {/* Scores */}

                <div
                  className="
                      grid
                      grid-cols-2
                      gap-4
                    "
                >
                  <div
                    className="
                        bg-white/80

                        rounded-2xl

                        p-4
                      "
                  >
                    <p
                      className="
                          text-sm
                          text-gray-500
                          mb-2
                        "
                    >
                      Nutrition Score
                    </p>

                    <h3
                      className="
                          text-3xl
                          font-black
                          text-violet-600
                        "
                    >
                      {food.nutrition_score}
                    </h3>
                  </div>

                  <div
                    className="
                        bg-white/80

                        rounded-2xl

                        p-4
                      "
                  >
                    <p
                      className="
                          text-sm
                          text-gray-500
                          mb-2
                        "
                    >
                      Priority Score
                    </p>

                    <h3
                      className="
                          text-3xl
                          font-black
                          text-orange-600
                        "
                    >
                      {Math.round(food.priority_score)}
                    </h3>
                  </div>
                </div>

                {/* Nutrition Tags */}

                <div
                  className="
                      bg-white/80

                      rounded-2xl

                      p-4
                    "
                >
                  <p
                    className="
                        text-sm
                        text-gray-500
                        mb-3
                      "
                  >
                    Nutrition Tags
                  </p>

                  <div
                    className="
                        flex
                        flex-wrap
                        gap-2
                      "
                  >
                    {food.nutrition_tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="
                              bg-violet-100
                              text-violet-700

                              px-3
                              py-2

                              rounded-full

                              text-sm
                              font-semibold
                            "
                      >
                        #{tag}
                      </span>
                    ))}
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
          AI Pantry Intelligence Insight
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          Pantry intelligence helps users reduce food waste, improve food
          rotation, optimize nutrition quality, and make smarter cooking and
          grocery decisions using AI-powered pantry tracking.
        </p>
      </div>
    </div>
  );
}

export default PantryDashboard;
