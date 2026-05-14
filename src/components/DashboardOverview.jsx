import React from "react";

import {
  Package,
  Brain,
  AlertTriangle,
  Wallet,
  ArrowRight,
  Sparkles,
  Salad,
  TrendingUp,
} from "lucide-react";

// ========================================
// Empty Dashboard
// ========================================

function EmptyDashboard() {
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

          p-10

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
                AI Smart Kitchen Platform
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
              Pantry Intelligence Dashboard
            </h1>

            <p
              className="
                text-green-100
                text-lg

                max-w-3xl

                leading-relaxed
              "
            >
              Build a smarter kitchen with AI-powered meal planning, nutrition
              analytics, sustainability forecasting, grocery optimization, and
              intelligent food recommendations.
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
              🥗
            </div>

            <h2
              className="
                text-3xl
                font-black
                mb-2
              "
            >
              AI Food OS
            </h2>

            <p
              className="
                text-green-100
              "
            >
              Smart Nutrition Ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Features */}
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
        {/* Feature */}

        {[
          {
            icon: "🍽️",
            title: "AI Meal Planning",
            description:
              "Generate intelligent weekly meal plans optimized for nutrition and sustainability.",
          },

          {
            icon: "📊",
            title: "Nutrition Analytics",
            description:
              "Track calories, macros, food processing, and health metrics using AI.",
          },

          {
            icon: "♻️",
            title: "Waste Reduction",
            description:
              "Reduce food waste using AI forecasting and smart pantry rotation.",
          },

          {
            icon: "💰",
            title: "Budget Optimization",
            description:
              "Save money through AI-powered grocery intelligence and shopping efficiency.",
          },
        ].map((item, index) => (
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
            <div
              className="
                  text-5xl
                  mb-5
                "
            >
              {item.icon}
            </div>

            <h2
              className="
                  text-2xl
                  font-black
                  text-gray-800
                  mb-4
                "
            >
              {item.title}
            </h2>

            <p
              className="
                  text-gray-600
                  leading-relaxed
                "
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* ================================= */}
      {/* Getting Started */}
      {/* ================================= */}

      <div
        className="
          bg-white

          rounded-3xl

          p-10

          shadow-sm
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
            <h2
              className="
                text-4xl
                font-black
                text-gray-800
                mb-5
              "
            >
              Start Building Your Smart Kitchen
            </h2>

            <p
              className="
                text-gray-600
                text-lg

                max-w-3xl

                leading-relaxed
              "
            >
              Add pantry foods to unlock AI-generated meal plans, nutrition
              intelligence, sustainability forecasting, grocery optimization,
              and personalized health coaching.
            </p>
          </div>

          {/* Right */}

          <div
            className="
              flex
              items-center
              gap-3

              bg-green-50

              border
              border-green-100

              px-6
              py-4

              rounded-2xl
            "
          >
            <ArrowRight
              className="
                text-green-600
              "
            />

            <span
              className="
                font-bold
                text-green-700
              "
            >
              Open Pantry Tab
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Stat Card
// ========================================

function StatCard({
  icon: Icon,

  title,

  value,

  subtitle,

  gradient,
}) {
  return (
    <div
      className={`
        rounded-3xl

        p-7

        text-white

        shadow-lg

        ${gradient}
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between

          gap-4
        "
      >
        <div>
          <p
            className="
              text-sm
              uppercase
              tracking-wide

              text-white/80

              mb-4
            "
          >
            {title}
          </p>

          <h2
            className="
              text-5xl
              font-black
              mb-3
            "
          >
            {value}
          </h2>

          <p
            className="
              text-white/90
            "
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
            w-16
            h-16

            rounded-2xl

            bg-white/15

            flex
            items-center
            justify-center
          "
        >
          <Icon size={32} />
        </div>
      </div>
    </div>
  );
}

// ========================================
// Insight Card
// ========================================

function InsightCard({
  title,

  value,

  description,

  color,
}) {
  return (
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
        {title}
      </p>

      <h2
        className={`
          text-5xl
          font-black
          mb-4

          ${color}
        `}
      >
        {value}
      </h2>

      <p
        className="
          text-gray-600
          leading-relaxed
        "
      >
        {description}
      </p>
    </div>
  );
}

// ========================================
// Dashboard Overview
// ========================================

function DashboardOverview({
  stats,

  foods,

  analytics,

  budgetAnalysis,

  wasteForecast,

  recommendations,
}) {
  // ======================================
  // Empty Dashboard
  // ======================================

  if (!foods || foods.length === 0) {
    return <EmptyDashboard />;
  }

  // ======================================
  // High Risk Count
  // ======================================

  const highRiskFoods =
    wasteForecast?.filter((item) => item.risk_level === "High").length || 0;

  // ======================================
  // Top Recommendations
  // ======================================

  const topRecommendations = recommendations?.slice(0, 3) || [];

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
                AI Kitchen Intelligence Active
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
              Pantry Intelligence Dashboard
            </h1>

            <p
              className="
                text-green-100
                text-lg

                max-w-3xl

                leading-relaxed
              "
            >
              AI-powered nutrition, meal planning, sustainability, waste
              reduction, and grocery intelligence for a smarter healthier
              kitchen.
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
              🥗
            </div>

            <h2
              className="
                text-6xl
                font-black
                mb-2
              "
            >
              {foods.length}
            </h2>

            <p
              className="
                text-green-100
              "
            >
              Pantry Foods
            </p>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Main Stats */}
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
        <StatCard
          icon={Package}
          title="Pantry Foods"
          value={stats.pantryCount}
          subtitle="Tracked pantry items"
          gradient="
            bg-gradient-to-r
            from-blue-500
            to-cyan-600
          "
        />

        <StatCard
          icon={Brain}
          title="Nutrition Score"
          value={Math.round(stats.averageNutrition)}
          subtitle="AI nutrition quality"
          gradient="
            bg-gradient-to-r
            from-violet-500
            to-purple-600
          "
        />

        <StatCard
          icon={AlertTriangle}
          title="Waste Risks"
          value={highRiskFoods}
          subtitle="Foods nearing expiry"
          gradient="
            bg-gradient-to-r
            from-orange-500
            to-red-500
          "
        />

        <StatCard
          icon={Wallet}
          title="Estimated Savings"
          value={`$${Math.round(stats.budgetSavings)}`}
          subtitle="AI budget optimization"
          gradient="
            bg-gradient-to-r
            from-green-500
            to-emerald-600
          "
        />
      </div>

      {/* ================================= */}
      {/* Insights */}
      {/* ================================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* Nutrition */}

        <InsightCard
          title="Average Nutrition"
          value={`${Math.round(analytics?.average_nutrition_score || 0)}%`}
          color="text-violet-600"
          description="
            AI nutrition analysis tracks
            food quality,
            macro balance,
            and healthy eating patterns.
          "
        />

        {/* Sustainability */}

        <InsightCard
          title="Sustainability"
          value={`${highRiskFoods}`}
          color="text-orange-600"
          description="
            AI forecasting identifies foods
            at risk of waste to improve
            pantry rotation and sustainability.
          "
        />

        {/* Budget */}

        <InsightCard
          title="Monthly Savings"
          value={`$${Math.round(budgetAnalysis?.monthly_projection || 0)}`}
          color="text-green-600"
          description="
            AI grocery optimization reduces
            unnecessary purchases and improves
            shopping efficiency.
          "
        />
      </div>

      {/* ================================= */}
      {/* Top Recommendations */}
      {/* ================================= */}

      <div
        className="
          bg-white

          rounded-3xl

          p-8

          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            justify-between

            gap-4

            mb-8
          "
        >
          <div>
            <h2
              className="
                text-3xl
                font-black
                text-gray-800
                mb-3
              "
            >
              Top AI Recommendations
            </h2>

            <p
              className="
                text-gray-500
              "
            >
              Personalized food intelligence generated by AI.
            </p>
          </div>

          <div
            className="
              hidden
              md:flex

              w-16
              h-16

              rounded-2xl

              bg-violet-100

              items-center
              justify-center
            "
          >
            <Salad
              className="
                text-violet-600
              "
              size={32}
            />
          </div>
        </div>

        {/* Recommendations */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >
          {topRecommendations.map((item, index) => (
            <div
              key={index}
              className="
                  bg-gradient-to-br
                  from-violet-50
                  to-purple-50

                  border
                  border-violet-100

                  rounded-3xl

                  p-6
                "
            >
              <div
                className="
                    flex
                    items-center
                    justify-between

                    gap-4

                    mb-5
                  "
              >
                <h3
                  className="
                      text-2xl
                      font-black
                      text-gray-800
                    "
                >
                  {item.name}
                </h3>

                <TrendingUp
                  className="
                      text-violet-600
                    "
                />
              </div>

              <div
                className="
                    flex
                    flex-wrap
                    gap-2

                    mb-5
                  "
              >
                {item.nutrition_tags?.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="
                            bg-white

                            px-3
                            py-2

                            rounded-full

                            text-sm
                            font-semibold

                            text-violet-700
                          "
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p
                className="
                    text-gray-700
                    leading-relaxed
                  "
              >
                {item.reason}
              </p>
            </div>
          ))}
        </div>
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
          AI Kitchen Intelligence Insight
        </h2>

        <p
          className="
            text-gray-300
            leading-relaxed
            text-lg
          "
        >
          Pantry AI combines meal planning, nutrition analytics, sustainability
          forecasting, grocery optimization, and health coaching into a unified
          AI food intelligence platform designed to improve health, reduce food
          waste, and save money.
        </p>
      </div>
    </div>
  );
}

export default DashboardOverview;
