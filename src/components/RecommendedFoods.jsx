import React from "react";

// ========================================
// Category Color
// ========================================

function getCategoryColor(category) {
  switch (category) {
    case "vegetable":
      return `
        bg-green-100
        text-green-700
      `;

    case "fruit":
      return `
        bg-pink-100
        text-pink-700
      `;

    case "protein":
      return `
        bg-red-100
        text-red-700
      `;

    case "meat":
      return `
        bg-orange-100
        text-orange-700
      `;

    case "grain":
      return `
        bg-yellow-100
        text-yellow-700
      `;

    case "dairy":
      return `
        bg-blue-100
        text-blue-700
      `;

    default:
      return `
        bg-gray-100
        text-gray-700
      `;
  }
}

// ========================================
// Processing Level Color
// ========================================

function getProcessingColor(level) {
  switch (level) {
    case "fresh":
      return `
        bg-emerald-100
        text-emerald-700
      `;

    case "processed":
      return `
        bg-yellow-100
        text-yellow-700
      `;

    case "ultra_processed":
      return `
        bg-red-100
        text-red-700
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
        ✨
      </div>

      <h2
        className="
          text-3xl
          font-black
          text-gray-800
          mb-4
        "
      >
        AI Food Recommendations
      </h2>

      <p
        className="
          text-gray-500
          max-w-2xl
          mx-auto
          leading-relaxed
        "
      >
        Generate AI recommendations to discover healthier, smarter, and more
        sustainable foods tailored for your lifestyle.
      </p>
    </div>
  );
}

// ========================================
// Recommended Foods
// ========================================

function RecommendedFoods({ foods }) {
  // ======================================
  // Empty
  // ======================================

  if (!foods || foods.length === 0) {
    return <EmptyState />;
  }

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
          to-blue-600

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
          <div>
            <h1
              className="
                text-4xl
                font-black
                mb-4
              "
            >
              AI Food Recommendations
            </h1>

            <p
              className="
                text-purple-100
                max-w-3xl
                leading-relaxed
              "
            >
              Personalized AI-powered food intelligence designed to optimize
              nutrition, reduce food waste, improve health, and maximize budget
              efficiency.
            </p>
          </div>

          {/* Count */}

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
                text-violet-100
                mb-3
              "
            >
              Recommended Foods
            </p>

            <h2
              className="
                text-6xl
                font-black
              "
            >
              {foods.length}
            </h2>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Cards */}
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
        {foods.map((food, index) => (
          <div
            key={index}
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
            {/* ========================= */}
            {/* Header */}
            {/* ========================= */}

            <div
              className="
                  flex
                  items-start
                  justify-between

                  gap-4

                  mb-6
                "
            >
              <div>
                <h2
                  className="
                      text-2xl
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
                      flex-wrap
                      gap-2
                    "
                >
                  {/* Category */}

                  <span
                    className={`
                        inline-flex

                        px-4
                        py-2

                        rounded-full

                        text-sm
                        font-semibold

                        ${getCategoryColor(food.category)}
                      `}
                  >
                    {food.category}
                  </span>

                  {/* Processing */}

                  <span
                    className={`
                        inline-flex

                        px-4
                        py-2

                        rounded-full

                        text-sm
                        font-semibold

                        ${getProcessingColor(food.processing_level)}
                      `}
                  >
                    {food.processing_level}
                  </span>
                </div>
              </div>

              <div
                className="
                    text-4xl
                  "
              >
                ✨
              </div>
            </div>

            {/* ========================= */}
            {/* Scores */}
            {/* ========================= */}

            <div
              className="
                  grid
                  grid-cols-2
                  gap-4

                  mb-6
                "
            >
              {/* Nutrition Score */}

              <div
                className="
                    bg-gray-50

                    rounded-2xl

                    p-4

                    border
                    border-gray-100
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
                  Nutrition Score
                </p>

                <h3
                  className={`
                      text-3xl
                      font-black

                      ${getScoreColor(food.nutrition_score)}
                    `}
                >
                  {food.nutrition_score}
                </h3>
              </div>

              {/* Priority Score */}

              <div
                className="
                    bg-gray-50

                    rounded-2xl

                    p-4

                    border
                    border-gray-100
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
                  Priority Score
                </p>

                <h3
                  className={`
                      text-3xl
                      font-black

                      ${getScoreColor(food.priority_score)}
                    `}
                >
                  {food.priority_score}
                </h3>
              </div>
            </div>

            {/* ========================= */}
            {/* Nutrition Tags */}
            {/* ========================= */}

            <div className="mb-6">
              <h3
                className="
                    text-lg
                    font-black
                    text-gray-800
                    mb-4
                  "
              >
                Nutrition Tags
              </h3>

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

            {/* ========================= */}
            {/* Benefits */}
            {/* ========================= */}

            {food.benefits && food.benefits.length > 0 && (
              <div className="mb-6">
                <h3
                  className="
                      text-lg
                      font-black
                      text-gray-800
                      mb-4
                    "
                >
                  AI Benefits
                </h3>

                <div className="space-y-3">
                  {food.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="
                            flex
                            items-start
                            gap-3

                            bg-gray-50

                            border
                            border-gray-100

                            rounded-2xl

                            p-4
                          "
                    >
                      <div
                        className="
                              text-green-500
                              text-lg
                              mt-0.5
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
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================= */}
            {/* AI Reason */}
            {/* ========================= */}

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
              <h3
                className="
                    text-lg
                    font-black
                    text-green-800
                    mb-3
                  "
              >
                Reason
              </h3>

              <p
                className="
                    text-gray-700
                    leading-relaxed
                  "
              >
                {food.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ================================= */}
      {/* Bottom Insight */}
      {/* ================================= */}

      <div
        className="
          bg-gradient-to-r
          from-cyan-700
          to-cyan-600

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
          AI Nutrition Insight
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          AI-driven food intelligence helps users build healthier, more
          sustainable eating habits while reducing waste, improving nutrition
          quality, and optimizing grocery efficiency.
        </p>
      </div>
    </div>
  );
}

export default RecommendedFoods;
