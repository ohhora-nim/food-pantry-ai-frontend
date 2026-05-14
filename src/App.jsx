import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import DashboardOverview from "./components/DashboardOverview";

import FoodForm from "./components/FoodForm";

import PantryDashboard from "./components/PantryDashboard";

import WeeklyPlanner from "./components/WeeklyPlanner";

import GroceryList from "./components/GroceryList";

import NutritionDashboard from "./components/NutritionDashboard";

import BudgetDashboard from "./components/BudgetDashboard";

import FoodWasteForecast from "./components/FoodWasteForecast";

import HealthCoach from "./components/HealthCoach";

import RecommendedFoods from "./components/RecommendedFoods";

import API_BASE_URL from "./config/api";

// ========================================
// Main Layout
// ========================================

function AppLayout() {
  const navigate = useNavigate();

  const location = useLocation();

  // ======================================
  // Active Tab from URL
  // ======================================

  const currentTab = location.pathname.replace("/", "") || "dashboard";

  // ======================================
  // Pantry Foods
  // ======================================

  const [foods, setFoods] = useState([]);

  // ======================================
  // AI Outputs
  // ======================================

  const [weeklyPlan, setWeeklyPlan] = useState([]);

  const [groceryList, setGroceryList] = useState([]);

  const [analytics, setAnalytics] = useState(null);

  const [wasteForecast, setWasteForecast] = useState([]);

  const [budgetAnalysis, setBudgetAnalysis] = useState(null);

  const [healthCoaching, setHealthCoaching] = useState(null);

  const [recommendedFoods, setRecommendedFoods] = useState([]);

  // ======================================
  // Loading
  // ======================================

  const [loading, setLoading] = useState(false);

  // ======================================
  // Mobile Sidebar
  // ======================================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ======================================
  // Load Local Storage
  // ======================================

  useEffect(() => {
    const savedFoods = localStorage.getItem("foods");

    const savedWeeklyPlan = localStorage.getItem("weeklyPlan");

    const savedGroceryList = localStorage.getItem("groceryList");

    const savedAnalytics = localStorage.getItem("analytics");

    const savedWasteForecast = localStorage.getItem("wasteForecast");

    const savedBudgetAnalysis = localStorage.getItem("budgetAnalysis");

    const savedHealthCoaching = localStorage.getItem("healthCoaching");

    const savedRecommendedFoods = localStorage.getItem("recommendedFoods");

    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    }

    if (savedWeeklyPlan) {
      setWeeklyPlan(JSON.parse(savedWeeklyPlan));
    }

    if (savedGroceryList) {
      setGroceryList(JSON.parse(savedGroceryList));
    }

    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }

    if (savedWasteForecast) {
      setWasteForecast(JSON.parse(savedWasteForecast));
    }

    if (savedBudgetAnalysis) {
      setBudgetAnalysis(JSON.parse(savedBudgetAnalysis));
    }

    if (savedHealthCoaching) {
      setHealthCoaching(JSON.parse(savedHealthCoaching));
    }

    if (savedRecommendedFoods) {
      setRecommendedFoods(JSON.parse(savedRecommendedFoods));
    }
  }, []);

  // ======================================
  // Save Local Storage
  // ======================================

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem("weeklyPlan", JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }, [groceryList]);

  useEffect(() => {
    localStorage.setItem("analytics", JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem("wasteForecast", JSON.stringify(wasteForecast));
  }, [wasteForecast]);

  useEffect(() => {
    localStorage.setItem("budgetAnalysis", JSON.stringify(budgetAnalysis));
  }, [budgetAnalysis]);

  useEffect(() => {
    localStorage.setItem("healthCoaching", JSON.stringify(healthCoaching));
  }, [healthCoaching]);

  useEffect(() => {
    localStorage.setItem("recommendedFoods", JSON.stringify(recommendedFoods));
  }, [recommendedFoods]);

  // ======================================
  // Add Food
  // ======================================

  function handleAddFood(food) {
    setFoods((prev) => [...prev, food]);
  }

  // ======================================
  // Delete Food
  // ======================================

  function handleDeleteFood(index) {
    setFoods((prev) => prev.filter((_, i) => i !== index));
  }

  // ======================================
  // Generate AI Plan
  // ======================================

  async function handleGeneratePlan() {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/meal-plan`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          foods: foods,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setWeeklyPlan(data.weekly_plan || []);

        setGroceryList(data.grocery_list || []);

        setAnalytics(data.analytics || null);

        setWasteForecast(data.waste_forecast || []);

        setBudgetAnalysis(data.budget_analysis || null);

        setHealthCoaching(data.health_coaching || null);

        setRecommendedFoods(data.recommended_foods || []);

        navigate("/dashboard");
      }

    } catch (error) {
      console.error("AI Plan Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // ======================================
  // Recommend Foods
  // ======================================

  async function handleRecommendFoods() {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/recommend-foods`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.status === "success") {
        setRecommendedFoods(data.recommended_foods || []);
        navigate("/recommendations");
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ======================================
  // Dashboard Stats
  // ======================================

  const stats = {
    pantryCount: foods.length,

    averageNutrition: analytics?.average_nutrition_score || 0,

    wasteRisk: wasteForecast.filter((item) => item.risk_level === "High")
      .length,

    budgetSavings: budgetAnalysis?.estimated_savings || 0,
  };

  // ======================================
  // Dynamic Button
  // ======================================

  const hasFoods = foods.length > 0;

  const buttonText = loading
    ? "Thinking..."
    : hasFoods
      ? "Generate AI Plan"
      : "Recommend Foods";

  // ======================================
  // Layout
  // ======================================

  return (
    <div
      className="
        min-h-screen

        bg-gray-100

        flex
      "
    >
      {/* ================================= */}
      {/* Mobile Overlay */}
      {/* ================================= */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0

            bg-black/40

            z-40

            lg:hidden
          "
        />
      )}

      {/* ================================= */}
      {/* Sidebar */}
      {/* ================================= */}

      <Sidebar
        currentTab={currentTab}
        navigate={navigate}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ================================= */}
      {/* Main Content */}
      {/* ================================= */}

      <main
        className="
          flex-1

          min-w-0

          lg:ml-72

          p-4
          sm:p-6
          lg:p-10
        "
      >
        {/* ================================= */}
        {/* Mobile Header */}
        {/* ================================= */}

        <div
          className="
            flex
            items-center
            justify-between

            mb-6

            lg:hidden
          "
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              bg-white

              rounded-2xl

              px-4
              py-3

              shadow-sm

              font-semibold
            "
          >
            ☰ Menu
          </button>

          <h1
            className="
              text-xl
              font-black
              text-gray-800
            "
          >
            Food Pantry AI
          </h1>
        </div>

        {/* ================================= */}
        {/* Top Action */}
        {/* ================================= */}

        <div
          className="
            flex
            justify-end

            mb-8
          "
        >
          <button
            onClick={() => {
              if (hasFoods) {
                handleGeneratePlan();
              } else {
                handleRecommendFoods();
              }
            }}
            disabled={loading}
            className="
              w-full
              sm:w-auto

              bg-gradient-to-r
              from-green-500
              to-emerald-600

              hover:from-green-600
              hover:to-emerald-700

              disabled:opacity-60

              text-white
              font-bold

              px-8
              py-4

              rounded-2xl

              shadow-lg

              transition-all
              duration-300
            "
          >
            {buttonText}
          </button>
        </div>

        {/* ================================= */}
        {/* Routes */}
        {/* ================================= */}

        <Routes>
          <Route
            path="/dashboard"
            element={
              <DashboardOverview
                stats={stats}
                foods={foods}
                analytics={analytics}
                budgetAnalysis={budgetAnalysis}
                wasteForecast={wasteForecast}
                recommendations={recommendedFoods}
              />
            }
          />

          <Route
            path="/pantry"
            element={
              <div
                className="
                  space-y-8
                "
              >
                <FoodForm onAddFood={handleAddFood} />

                <PantryDashboard
                  foods={foods}
                  onDeleteFood={handleDeleteFood}
                />
              </div>
            }
          />

          <Route
            path="/meal-planner"
            element={<WeeklyPlanner weeklyPlan={weeklyPlan} />}
          />

          <Route
            path="/grocery"
            element={<GroceryList groceryList={groceryList} />}
          />

          <Route
            path="/nutrition"
            element={<NutritionDashboard analytics={analytics} />}
          />

          <Route
            path="/budget"
            element={<BudgetDashboard budgetAnalysis={budgetAnalysis} />}
          />

          <Route
            path="/waste"
            element={<FoodWasteForecast wasteForecast={wasteForecast} />}
          />

          <Route
            path="/coach"
            element={<HealthCoach coaching={healthCoaching} />}
          />

          <Route
            path="/recommendations"
            element={<RecommendedFoods foods={recommendedFoods} />}
          />

          {/* Default */}

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

// ========================================
// Root App
// ========================================

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
