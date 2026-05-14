import React from "react";

function HealthCoach({ coaching }) {
  // ====================================
  // Empty State
  // ====================================

  if (!coaching) {
    return (
      <div
        className="
          bg-white

          rounded-3xl

          p-12

          text-center

          shadow-sm
        "
      >
        <h2
          className="
            text-3xl
            font-black
            text-gray-800
            mb-3
          "
        >
          AI Health Coach
        </h2>

        <p
          className="
            text-gray-500
          "
        >
          Generate an AI meal plan to receive personalized health coaching
          insights.
        </p>
      </div>
    );
  }

  // ====================================
  // Risk Color
  // ====================================

  function getHealthColor(score) {
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

  // ====================================
  // UI
  // ====================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-emerald-500
          to-green-600

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
            lg:flex-row

            lg:items-center
            lg:justify-between

            gap-6
          "
        >
          {/* Left */}

          <div>
            <h1
              className="
                text-4xl
                font-black
                mb-3
              "
            >
              AI Health Coach
            </h1>

            <p
              className="
                text-green-100
                max-w-2xl
              "
            >
              Personalized AI-powered nutrition, wellness, and longevity
              insights based on your pantry foods and meal plan.
            </p>
          </div>

          {/* Health Score */}

          <div
            className="
              bg-white/15

              backdrop-blur-lg

              rounded-3xl

              px-8
              py-6

              text-center

              min-w-[220px]
            "
          >
            <p
              className="
                text-sm
                uppercase
                tracking-widest
                text-green-100
                mb-2
              "
            >
              Health Score
            </p>

            <h2
              className={`
                text-6xl
                font-black

                ${getHealthColor(coaching.health_score)}
              `}
            >
              {coaching.health_score}
            </h2>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Grid */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        "
      >
        {/* ================================= */}
        {/* Strengths */}
        {/* ================================= */}

        <div
          className="
            bg-white

            rounded-3xl

            p-8

            shadow-sm
          "
        >
          <h2
            className="
              text-2xl
              font-black
              text-gray-800
              mb-6
            "
          >
            Health Strengths
          </h2>

          <div className="space-y-4">
            {coaching.strengths?.length > 0 ? (
              coaching.strengths.map((item, index) => (
                <div
                  key={index}
                  className="
                      bg-green-50

                      border
                      border-green-200

                      rounded-2xl

                      p-4

                      flex
                      items-start
                      gap-3
                    "
                >
                  <div
                    className="
                        text-green-600
                        text-xl
                      "
                  >
                    ✓
                  </div>

                  <p
                    className="
                        text-gray-700
                        leading-relaxed
                      "
                  >
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <p
                className="
                  text-gray-500
                "
              >
                No strengths detected.
              </p>
            )}
          </div>
        </div>

        {/* ================================= */}
        {/* Risks */}
        {/* ================================= */}

        <div
          className="
            bg-white

            rounded-3xl

            p-8

            shadow-sm
          "
        >
          <h2
            className="
              text-2xl
              font-black
              text-gray-800
              mb-6
            "
          >
            Health Risks
          </h2>

          <div className="space-y-4">
            {coaching.risks?.length > 0 ? (
              coaching.risks.map((item, index) => (
                <div
                  key={index}
                  className="
                      bg-red-50

                      border
                      border-red-200

                      rounded-2xl

                      p-4

                      flex
                      items-start
                      gap-3
                    "
                >
                  <div
                    className="
                        text-red-600
                        text-xl
                      "
                  >
                    ⚠
                  </div>

                  <p
                    className="
                        text-gray-700
                        leading-relaxed
                      "
                  >
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <p
                className="
                  text-gray-500
                "
              >
                No major risks detected.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Recommendations */}
      {/* ================================= */}

      <div
        className="
          bg-white

          rounded-3xl

          p-8

          shadow-sm
        "
      >
        <h2
          className="
            text-3xl
            font-black
            text-gray-800
            mb-8
          "
        >
          AI Recommendations
        </h2>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
          "
        >
          {coaching.recommendations?.map((item, index) => (
            <div
              key={index}
              className="
                    bg-gray-50

                    border
                    border-gray-200

                    rounded-2xl

                    p-5

                    flex
                    items-start
                    gap-4
                  "
            >
              <div
                className="
                      w-10
                      h-10

                      rounded-full

                      bg-emerald-100

                      flex
                      items-center
                      justify-center

                      text-emerald-600
                      font-bold

                      flex-shrink-0
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
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================= */}
      {/* Insights Grid */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        {/* Nutrition Focus */}

        <div
          className="
            bg-white

            rounded-3xl

            p-6

            shadow-sm
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
            Nutrition Focus
          </h3>

          <p
            className="
              text-gray-600
              leading-relaxed
            "
          >
            {coaching.nutrition_focus}
          </p>
        </div>

        {/* Fitness */}

        <div
          className="
            bg-white

            rounded-3xl

            p-6

            shadow-sm
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
            Fitness Tip
          </h3>

          <p
            className="
              text-gray-600
              leading-relaxed
            "
          >
            {coaching.fitness_tip}
          </p>
        </div>

        {/* Longevity */}

        <div
          className="
            bg-white

            rounded-3xl

            p-6

            shadow-sm
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
            Longevity
          </h3>

          <p
            className="
              text-gray-600
              leading-relaxed
            "
          >
            {coaching.longevity_tip}
          </p>
        </div>

        {/* Hydration */}

        <div
          className="
            bg-white

            rounded-3xl

            p-6

            shadow-sm
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
            Hydration
          </h3>

          <p
            className="
              text-gray-600
              leading-relaxed
            "
          >
            {coaching.hydration_tip}
          </p>
        </div>
      </div>

      {/* ================================= */}
      {/* Meal Balance */}
      {/* ================================= */}

      <div
        className="
          bg-white

          rounded-3xl

          p-8

          shadow-sm
        "
      >
        <h2
          className="
            text-2xl
            font-black
            text-gray-800
            mb-5
          "
        >
          Meal Balance Feedback
        </h2>

        <p
          className="
            text-gray-700
            leading-relaxed
            text-lg
          "
        >
          {coaching.meal_balance_feedback}
        </p>
      </div>

      {/* ================================= */}
      {/* Summary */}
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
          AI Health Summary
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          {coaching.summary}
        </p>
      </div>
    </div>
  );
}

export default HealthCoach;
