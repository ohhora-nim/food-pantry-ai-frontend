// =========================================
// App.jsx
// AI Pantry Intelligence Platform
// =========================================

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense } from "react";

import { PantryProvider } from "./context/PantryContext";

// =========================================
// Layout
// =========================================

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import MobileNavbar from "./components/layout/MobileNavbar";

// =========================================
// Common
// =========================================

import LoadingSpinner from "./components/common/LoadingSpinner";

// =========================================
// Lazy Pages
// =========================================

const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const PantryPage = lazy(() => import("./pages/PantryPage"));

const MealsPage = lazy(() => import("./pages/MealsPage"));

const NutritionPage = lazy(() => import("./pages/NutritionPage"));

const WastePage = lazy(() => import("./pages/WastePage"));

const CoachingPage = lazy(() => import("./pages/CoachingPage"));

const RecommendationsPage = lazy(() => import("./pages/RecommendationsPage"));

// =========================================
// Main App Layout
// =========================================

function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
      {/* ================================= */}
      {/* Desktop Sidebar */}
      {/* ================================= */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* ================================= */}
      {/* Main Content */}
      {/* ================================= */}

      <div className="lg:ml-72 min-h-screen flex flex-col">
        {/* =============================== */}
        {/* Topbar */}
        {/* =============================== */}

        <Topbar />

        {/* =============================== */}
        {/* Page Container */}
        {/* =============================== */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-24">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>
              {/* =========================== */}
              {/* Dashboard */}
              {/* =========================== */}

              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={<DashboardPage />} />

              {/* =========================== */}
              {/* Pantry */}
              {/* =========================== */}

              <Route path="/pantry" element={<PantryPage />} />

              {/* =========================== */}
              {/* Meals */}
              {/* =========================== */}

              <Route path="/meals" element={<MealsPage />} />

              {/* =========================== */}
              {/* Nutrition */}
              {/* =========================== */}

              <Route path="/nutrition" element={<NutritionPage />} />

              {/* =========================== */}
              {/* Waste */}
              {/* =========================== */}

              <Route path="/waste" element={<WastePage />} />

              {/* =========================== */}
              {/* Coaching */}
              {/* =========================== */}

              <Route path="/coach" element={<CoachingPage />} />

              {/* =========================== */}
              {/* Recommendations */}
              {/* =========================== */}

              <Route
                path="/recommendations"
                element={<RecommendationsPage />}
              />

              {/* =========================== */}
              {/* 404 */}
              {/* =========================== */}

              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center py-24">
                    <h1 className="text-4xl font-bold mb-4">404</h1>

                    <p className="text-slate-500">Page not found.</p>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>

      {/* ================================= */}
      {/* Mobile Navigation */}
      {/* ================================= */}

      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}

// =========================================
// App
// =========================================

export default function App() {
  return (
    <BrowserRouter>
      <PantryProvider>
        <AppLayout />
      </PantryProvider>
    </BrowserRouter>
  );
}
