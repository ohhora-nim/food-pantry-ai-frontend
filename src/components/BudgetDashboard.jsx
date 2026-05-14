import React from "react";

function BudgetDashboard({ budgetAnalysis }) {
  // ====================================
  // Empty State
  // ====================================

  if (!budgetAnalysis) {
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
          AI Budget Optimization
        </h2>

        <p
          className="
            text-gray-500
          "
        >
          Generate an AI meal plan to receive personalized budget intelligence.
        </p>
      </div>
    );
  }

  // ====================================
  // Score Color
  // ====================================

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

  // ====================================
  // UI
  // ====================================

  return (
    <div className="space-y-8">
      {/* ================================= */}
      {/* Hero */}
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
              AI Budget Optimization
            </h1>

            <p
              className="
                text-green-100
                max-w-3xl
                leading-relaxed
              "
            >
              AI-powered grocery, pantry, and meal optimization insights
              designed to reduce waste, improve nutrition value, and maximize
              savings.
            </p>
          </div>

          {/* Budget Score */}

          <div
            className="
              bg-white/15

              backdrop-blur-lg

              rounded-3xl

              px-10
              py-8

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
              Budget Score
            </p>

            <h2
              className={`
                text-6xl
                font-black

                ${getScoreColor(budgetAnalysis.budget_score)}
              `}
            >
              {budgetAnalysis.budget_score}
            </h2>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Top Metrics */}
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
        {/* Weekly Savings */}

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
            Weekly Savings
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-green-600
            "
          >
            ${budgetAnalysis.estimated_savings}
          </h2>
        </div>

        {/* Monthly Projection */}

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
            Monthly Projection
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-blue-600
            "
          >
            ${budgetAnalysis.monthly_projection}
          </h2>
        </div>

        {/* Waste Reduction */}

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
            Waste Reduction
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-purple-600
            "
          >
            {budgetAnalysis.waste_reduction_percent}%
          </h2>
        </div>

        {/* Budget Efficiency */}

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
            Efficiency
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-orange-600
            "
          >
            {budgetAnalysis.budget_score}
          </h2>
        </div>
      </div>

      {/* ================================= */}
      {/* High Value Foods + Waste Risks */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        "
      >
        {/* High Value Foods */}

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
            High Value Foods
          </h2>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {budgetAnalysis.high_value_foods?.map((food, index) => (
              <div
                key={index}
                className="
                      bg-green-100
                      text-green-700

                      px-4
                      py-2

                      rounded-full

                      font-semibold
                    "
              >
                {food}
              </div>
            ))}
          </div>
        </div>

        {/* Waste Risk Foods */}

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
            Waste Risk Foods
          </h2>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {budgetAnalysis.waste_risk_foods?.map((food, index) => (
              <div
                key={index}
                className="
                      bg-red-100
                      text-red-700

                      px-4
                      py-2

                      rounded-full

                      font-semibold
                    "
              >
                {food}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Optimization Tips */}
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
          AI Optimization Tips
        </h2>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
          "
        >
          {budgetAnalysis.optimization_tips?.map((tip, index) => (
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

                      bg-green-100

                      flex
                      items-center
                      justify-center

                      text-green-700
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
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================= */}
      {/* Shopping Strategy */}
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
          Smart Shopping Strategy
        </h2>

        <p
          className="
            text-gray-700
            leading-relaxed
            text-lg
          "
        >
          {budgetAnalysis.shopping_strategy}
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
          AI Budget Summary
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          {budgetAnalysis.summary}
        </p>
      </div>
    </div>
  );
}

export default BudgetDashboard;
