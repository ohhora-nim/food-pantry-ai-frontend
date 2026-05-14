import React from "react";

// ========================================
// Risk Styling
// ========================================

function getRiskStyles(risk) {
  switch (risk) {
    case "High":
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

        icon: "🚨",
      };

    case "Medium":
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

        icon: "⚠️",
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

        text: `
          text-green-600
        `,

        icon: "✅",
      };
  }
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
        ♻️
      </div>

      <h2
        className="
          text-3xl
          font-black
          text-gray-800
          mb-4
        "
      >
        AI Food Waste Forecast
      </h2>

      <p
        className="
          text-gray-500
          max-w-2xl
          mx-auto
          leading-relaxed
        "
      >
        Generate an AI meal plan to receive intelligent food waste reduction
        forecasting and sustainability insights.
      </p>
    </div>
  );
}

// ========================================
// Waste Forecast
// ========================================

function FoodWasteForecast({ wasteForecast }) {
  // ======================================
  // Empty
  // ======================================

  if (!wasteForecast || wasteForecast.length === 0) {
    return <EmptyState />;
  }

  // ======================================
  // Stats
  // ======================================

  const highRisk = wasteForecast.filter(
    (item) => item.risk_level === "High",
  ).length;

  const mediumRisk = wasteForecast.filter(
    (item) => item.risk_level === "Medium",
  ).length;

  const lowRisk = wasteForecast.filter(
    (item) => item.risk_level === "Low",
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
          from-orange-500
          to-red-500

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
              AI Food Waste Forecast
            </h1>

            <p
              className="
                text-orange-100
                max-w-3xl
                leading-relaxed
              "
            >
              AI-powered food waste prediction and sustainability intelligence
              designed to help users reduce waste, save money, improve pantry
              rotation, and build environmentally sustainable habits.
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
                text-orange-100
                mb-3
              "
            >
              Forecast Items
            </p>

            <h2
              className="
                text-6xl
                font-black
              "
            >
              {wasteForecast.length}
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
        {/* High */}

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
            High Risk Foods
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-red-600
            "
          >
            {highRisk}
          </h2>
        </div>

        {/* Medium */}

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
            Medium Risk Foods
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-yellow-600
            "
          >
            {mediumRisk}
          </h2>
        </div>

        {/* Low */}

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
            Low Risk Foods
          </p>

          <h2
            className="
              text-5xl
              font-black
              text-green-600
            "
          >
            {lowRisk}
          </h2>
        </div>
      </div>

      {/* ================================= */}
      {/* Forecast Cards */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
        "
      >
        {wasteForecast.map((item, index) => {
          const styles = getRiskStyles(item.risk_level);

          return (
            <div
              key={index}
              className={`
                  border

                  rounded-3xl

                  p-7

                  shadow-sm

                  transition-all
                  duration-300

                  hover:shadow-lg

                  ${styles.card}
                `}
            >
              {/* ===================== */}
              {/* Top */}
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
                  <h2
                    className="
                        text-3xl
                        font-black
                        text-gray-800
                        mb-4
                      "
                  >
                    {item.name}
                  </h2>

                  <div
                    className="
                        flex
                        flex-wrap
                        gap-3
                      "
                  >
                    {/* Risk */}

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
                      {item.risk_level} Risk
                    </span>

                    {/* Days */}

                    <span
                      className="
                          bg-white

                          px-4
                          py-2

                          rounded-full

                          text-sm
                          font-semibold

                          text-gray-700
                        "
                    >
                      {item.days_left} Days Left
                    </span>
                  </div>
                </div>

                {/* Icon */}

                <div
                  className="
                      text-5xl
                    "
                >
                  {styles.icon}
                </div>
              </div>

              {/* ===================== */}
              {/* Recommendation */}
              {/* ===================== */}

              <div
                className="
                    bg-white/80

                    rounded-2xl

                    p-5
                  "
              >
                <h3
                  className={`
                      text-lg
                      font-black
                      mb-3

                      ${styles.text}
                    `}
                >
                  AI Sustainability Recommendation
                </h3>

                <p
                  className="
                      text-gray-700
                      leading-relaxed
                    "
                >
                  {item.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================= */}
      {/* Bottom Sustainability */}
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
          AI Sustainability Insight
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          Reducing food waste helps users save money, improve pantry efficiency,
          reduce environmental impact, lower carbon emissions, and create a more
          sustainable global food ecosystem. AI forecasting enables smarter food
          usage before expiration.
        </p>
      </div>
    </div>
  );
}

export default FoodWasteForecast;
