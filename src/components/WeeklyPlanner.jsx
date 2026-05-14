import React from "react";

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
        🍽️
      </div>

      <h2
        className="
          text-3xl
          font-black
          text-gray-800
          mb-4
        "
      >
        AI Weekly Meal Planner
      </h2>

      <p
        className="
          text-gray-500
          max-w-2xl
          mx-auto
          leading-relaxed
        "
      >
        Add pantry foods and generate an AI meal plan to receive personalized
        weekly meals, smart cooking guidance, nutrition optimization, and food
        waste reduction.
      </p>
    </div>
  );
}

// ========================================
// Meal Type Badge
// ========================================

function getMealBadge(type) {
  switch (type) {
    case "breakfast":
      return `
        bg-yellow-100
        text-yellow-700
      `;

    case "lunch":
      return `
        bg-green-100
        text-green-700
      `;

    case "dinner":
      return `
        bg-violet-100
        text-violet-700
      `;

    default:
      return `
        bg-gray-100
        text-gray-700
      `;
  }
}

// ========================================
// Score Color
// ========================================

function getScoreColor(score) {
  if (score >= 85) {
    return `
      text-green-600
    `;
  }

  if (score >= 70) {
    return `
      text-yellow-600
    `;
  }

  return `
    text-red-600
  `;
}

// ========================================
// Meal Card
// ========================================

function MealCard({
  mealType,

  meal,
}) {
  if (!meal) {
    return null;
  }

  return (
    <div
      className="
        bg-white

        rounded-3xl

        p-7

        shadow-sm

        hover:shadow-xl

        transition-all
        duration-300
      "
    >
      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div
        className="
          flex
          items-start
          justify-between

          gap-5

          mb-6
        "
      >
        <div>
          <span
            className={`
              inline-flex

              px-4
              py-2

              rounded-full

              text-sm
              font-bold

              mb-4

              ${getMealBadge(mealType)}
            `}
          >
            {mealType}
          </span>

          <h3
            className="
              text-2xl
              font-black
              text-gray-800
              leading-tight
            "
          >
            {meal.name}
          </h3>
        </div>

        {/* Score */}

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
            AI Score
          </p>

          <h2
            className={`
              text-4xl
              font-black

              ${getScoreColor(meal.score)}
            `}
          >
            {Math.round(meal.score)}
          </h2>
        </div>
      </div>

      {/* ================================= */}
      {/* Ingredients */}
      {/* ================================= */}

      <div className="mb-7">
        <h4
          className="
            text-lg
            font-black
            text-gray-800
            mb-4
          "
        >
          Ingredients
        </h4>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          {meal.ingredients?.map((ingredient, index) => (
            <div
              key={index}
              className="
                  bg-gray-100

                  rounded-2xl

                  px-4
                  py-3
                "
            >
              <p
                className="
                    font-semibold
                    text-gray-800
                    mb-2
                  "
              >
                {ingredient.name}
              </p>

              <span
                className="
                inline-flex
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                bg-orange-100
                text-gray-700
              "
              >
                {ingredient.category}
              </span>

              <span
                className="
                inline-flex
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                bg-emerald-100
                text-emerald-700
              "
              >
                {ingredient.processing_level}
              </span>

              <div
                className="
                    flex
                    flex-wrap
                    gap-2
                  "
              >
                {ingredient.nutrition_tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="
                            bg-violet-100
                            text-violet-700

                            px-2
                            py-1

                            rounded-full

                            text-xs
                            font-semibold
                          "
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================= */}
      {/* Steps */}
      {/* ================================= */}

      <div className="mb-7">
        <h4
          className="
            text-lg
            font-black
            text-gray-800
            mb-4
          "
        >
          Cooking Steps
        </h4>

        <div className="space-y-3">
          {meal.steps?.map((step, index) => (
            <div
              key={index}
              className="
                  flex
                  items-start
                  gap-4

                  bg-gray-50

                  rounded-2xl

                  p-4
                "
            >
              <div
                className="
                    min-w-[36px]
                    h-9

                    rounded-full

                    bg-violet-600

                    text-white

                    flex
                    items-center
                    justify-center

                    font-black
                  "
              >
                {index + 1}
              </div>

              <p
                className="
                    text-gray-700
                    leading-relaxed
                  "
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================= */}
      {/* AI Reason */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-violet-50
          to-purple-50

          border
          border-violet-100

          rounded-2xl

          p-5
        "
      >
        <h4
          className="
            text-lg
            font-black
            text-violet-800
            mb-3
          "
        >
          AI Meal Insight
        </h4>

        <p
          className="
            text-gray-700
            leading-relaxed
          "
        >
          {meal.reason}
        </p>
      </div>
    </div>
  );
}

// ========================================
// Weekly Planner
// ========================================

function WeeklyPlanner({ weeklyPlan }) {
  // ======================================
  // Empty
  // ======================================

  if (!weeklyPlan || weeklyPlan.length === 0) {
    return <EmptyState />;
  }

  // ======================================
  // UI
  // ======================================

  return (
    <div className="space-y-10">
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
              AI Weekly Meal Planner
            </h1>

            <p
              className="
                text-green-100
                max-w-3xl
                leading-relaxed
              "
            >
              AI-generated weekly meal intelligence optimized for nutrition,
              sustainability, food waste reduction, budget efficiency, and
              healthier eating habits.
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
              Weekly Meal Days
            </p>

            <h2
              className="
                text-6xl
                font-black
              "
            >
              {weeklyPlan.length}
            </h2>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Days */}
      {/* ================================= */}

      {weeklyPlan.map((day, index) => {
        const meals = day.meals || {};

        return (
          <div
            key={index}
            className="
                space-y-8
              "
          >
            {/* ========================= */}
            {/* Day Header */}
            {/* ========================= */}

            <div
              className="
                  flex
                  items-center
                  justify-between

                  gap-4
                "
            >
              <div>
                <h2
                  className="
                      text-4xl
                      font-black
                      text-gray-800
                    "
                >
                  {day.day}
                </h2>

                <p
                  className="
                      text-gray-500
                      mt-2
                    "
                >
                  AI meal optimization for sustainable eating.
                </p>
              </div>

              <div
                className="
                    hidden
                    md:flex

                    w-16
                    h-16

                    rounded-2xl

                    bg-gradient-to-br
                    from-green-500
                    to-emerald-600

                    text-white
                    text-3xl

                    items-center
                    justify-center

                    shadow-lg
                  "
              >
                🍽️
              </div>
            </div>

            {/* ========================= */}
            {/* Meals Grid */}
            {/* ========================= */}

            <div
              className="
                  grid
                  grid-cols-1
                  xl:grid-cols-3
                  gap-8
                "
            >
              {/* Breakfast */}

              <MealCard mealType="breakfast" meal={meals.breakfast} />

              {/* Lunch */}

              <MealCard mealType="lunch" meal={meals.lunch} />

              {/* Dinner */}

              <MealCard mealType="dinner" meal={meals.dinner} />
            </div>
          </div>
        );
      })}

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
          AI Meal Planning Insight
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          AI meal planning helps users balance nutrition, reduce food waste,
          improve grocery efficiency, simplify cooking decisions, and maintain
          healthier eating habits while optimizing pantry usage.
        </p>
      </div>
    </div>
  );
}

export default WeeklyPlanner;
