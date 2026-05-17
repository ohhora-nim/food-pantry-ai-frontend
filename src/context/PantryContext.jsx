// =========================================
// PantryContext.jsx
// Frontend-owned pantry state using localStorage
// Backend is stateless
// =========================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import pantryApi from "../api/pantryApi";

// =========================================
// Local Storage Keys
// =========================================

const STORAGE_KEYS = {
  pantryFoods: "ai_pantry_foods",
  recommendations: "ai_pantry_recommendations",
  nutrition: "ai_pantry_nutrition",
  waste: "ai_pantry_waste",
  meals: "ai_pantry_meals",
  coaching: "ai_pantry_coaching",
  summary: "ai_pantry_summary",
  lastUpdated: "ai_pantry_last_updated",
};

// =========================================
// Helpers
// =========================================

function loadFromStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error("localStorage load error:", error);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("localStorage save error:", error);
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("localStorage remove error:", error);
  }
}

function createFoodId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeFoodForStorage(foodData) {
  return {
    id: foodData.id || createFoodId(),
    name: String(foodData.name || "")
      .trim()
      .toLowerCase(),
    quantity: Number(foodData.quantity || 1),
    expiry_date: foodData.expiry_date,
  };
}

function getFoodKey(food) {
  return String(food?.name || "")
    .trim()
    .toLowerCase();
}

// =========================================
// Context
// =========================================

const PantryContext = createContext(null);

// =========================================
// Provider
// =========================================

export function PantryProvider({ children }) {
  // =======================================
  // Core Data
  // =======================================

  const [pantryFoods, setPantryFoods] = useState(() =>
    loadFromStorage(STORAGE_KEYS.pantryFoods, []),
  );

  const [recommendations, setRecommendations] = useState(() =>
    loadFromStorage(STORAGE_KEYS.recommendations, []),
  );

  const [nutrition, setNutrition] = useState(() =>
    loadFromStorage(STORAGE_KEYS.nutrition, null),
  );

  const [waste, setWaste] = useState(() =>
    loadFromStorage(STORAGE_KEYS.waste, null),
  );

  const [meals, setMeals] = useState(() =>
    loadFromStorage(STORAGE_KEYS.meals, []),
  );

  const [coaching, setCoaching] = useState(() =>
    loadFromStorage(STORAGE_KEYS.coaching, ""),
  );

  const [summary, setSummary] = useState(() =>
    loadFromStorage(STORAGE_KEYS.summary, ""),
  );

  const [lastUpdated, setLastUpdated] = useState(() =>
    loadFromStorage(STORAGE_KEYS.lastUpdated, null),
  );

  // =======================================
  // UI State
  // =======================================

  const [loading, setLoading] = useState(false);

  const [loadingFeature, setLoadingFeature] = useState("");

  const [error, setError] = useState("");

  // =======================================
  // Persist pantry foods automatically
  // =======================================

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.pantryFoods, pantryFoods);
  }, [pantryFoods]);

  // =======================================
  // Merge recommendations while preserving AI explanations
  // =======================================

  function mergeRecommendationsWithExisting(newRecommendations = []) {
    const existingMap = new Map(
      recommendations.map((item) => [getFoodKey(item), item]),
    );

    return newRecommendations.map((item) => {
      const key = getFoodKey(item);

      const existing = existingMap.get(key);

      return {
        ...item,

        // Preserve expensive AI-generated explanation
        explanation: existing?.explanation || item.explanation || "",

        // Preserve other rich generated fields if needed
        benefits: item.benefits || existing?.benefits || [],

        reason: item.reason || existing?.reason || "",
      };
    });
  }

  // =======================================
  // Save dashboard fast results
  // IMPORTANT:
  // Do not overwrite saved AI explanations.
  // =======================================

  function saveDashboardResults(data) {
    const updatedAt = new Date().toISOString();

    const mergedRecommendations = mergeRecommendationsWithExisting(
      data.recommendations || [],
    );

    const newNutrition = data.nutrition || null;

    const newWaste = data.waste || null;

    setRecommendations(mergedRecommendations);

    setNutrition(newNutrition);

    setWaste(newWaste);

    setLastUpdated(updatedAt);

    saveToStorage(STORAGE_KEYS.recommendations, mergedRecommendations);

    saveToStorage(STORAGE_KEYS.nutrition, newNutrition);

    saveToStorage(STORAGE_KEYS.waste, newWaste);

    saveToStorage(STORAGE_KEYS.lastUpdated, updatedAt);
  }

  // =======================================
  // Add pantry food locally
  // =======================================

  async function addPantryFood(foodData) {
    const newFood = normalizeFoodForStorage(foodData);

    const nextFoods = [...pantryFoods, newFood];

    setPantryFoods(nextFoods);

    saveToStorage(STORAGE_KEYS.pantryFoods, nextFoods);

    // Refresh fast dashboard intelligence only.
    // This does NOT call Gemma.
    await fetchDashboard(nextFoods);
  }

  // =======================================
  // Delete pantry food locally
  // =======================================

  async function deletePantryFood(food) {
    const nextFoods = pantryFoods.filter((item) => {
      if (food.id) {
        return item.id !== food.id;
      }

      return item.name !== food.name;
    });

    setPantryFoods(nextFoods);

    saveToStorage(STORAGE_KEYS.pantryFoods, nextFoods);

    await fetchDashboard(nextFoods);
  }

  // Alias for older components
  const removeFood = deletePantryFood;

  // =======================================
  // Clear pantry and all saved AI outputs
  // =======================================

  function clearPantry() {
    setPantryFoods([]);
    setRecommendations([]);
    setNutrition(null);
    setWaste(null);
    setMeals([]);
    setCoaching("");
    setSummary("");
    setLastUpdated(null);

    Object.values(STORAGE_KEYS).forEach((key) => {
      removeFromStorage(key);
    });
  }

  // =======================================
  // Fast dashboard fetch
  // No Gemma here
  // =======================================

  const fetchDashboard = useCallback(
    async (foodsOverride = null) => {
      const foods = foodsOverride || pantryFoods;

      try {
        setLoading(true);
        setLoadingFeature("dashboard");
        setError("");

        const data = await pantryApi.getDashboard(foods);

        saveDashboardResults(data);
      } catch (err) {
        console.error(err);

        setError(err.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
        setLoadingFeature("");
      }
    },
    [pantryFoods, recommendations],
  );

  // =======================================
  // Refresh Recommendations
  // Fast rule-based, no Gemma
  // Preserve existing explanations.
  // =======================================

  async function refreshRecommendations() {
    try {
      setLoadingFeature("recommendations");
      setError("");

      const data = await pantryApi.getRecommendations(pantryFoods);

      const merged = mergeRecommendationsWithExisting(
        data.recommendations || [],
      );

      setRecommendations(merged);

      saveToStorage(STORAGE_KEYS.recommendations, merged);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to refresh recommendations.");
    } finally {
      setLoadingFeature("");
    }
  }

  // =======================================
  // Refresh Nutrition
  // Fast Python engine, no Gemma
  // =======================================

  async function refreshNutrition() {
    try {
      setLoadingFeature("nutrition");
      setError("");

      const data = await pantryApi.getNutrition(pantryFoods);

      setNutrition(data);

      saveToStorage(STORAGE_KEYS.nutrition, data);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to refresh nutrition.");
    } finally {
      setLoadingFeature("");
    }
  }

  // =======================================
  // Refresh Waste
  // Fast Python engine, no Gemma
  // =======================================

  async function refreshWaste() {
    try {
      setLoadingFeature("waste");
      setError("");

      const data = await pantryApi.getWasteForecast(pantryFoods);

      setWaste(data);

      saveToStorage(STORAGE_KEYS.waste, data);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to refresh waste forecast.");
    } finally {
      setLoadingFeature("");
    }
  }

  // =======================================
  // Generate AI Meals
  // Gemma on demand
  // Saves result to localStorage
  // =======================================

  async function generateMeals() {
    try {
      setLoadingFeature("meals");
      setError("");

      const data = await pantryApi.generateMeals(pantryFoods);

      const value = data.meals || [];

      setMeals(value);

      saveToStorage(STORAGE_KEYS.meals, value);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to generate meals.");
    } finally {
      setLoadingFeature("");
    }
  }

  const refreshMeals = generateMeals;

  // =======================================
  // Generate AI Coaching
  // Gemma on demand
  // Saves result to localStorage
  // =======================================

  async function generateCoaching() {
    try {
      setLoadingFeature("coaching");
      setError("");

      const data = await pantryApi.generateCoaching(pantryFoods);

      const value = data.coaching || "";

      setCoaching(value);

      saveToStorage(STORAGE_KEYS.coaching, value);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to generate coaching.");
    } finally {
      setLoadingFeature("");
    }
  }

  const refreshCoaching = generateCoaching;

  // =======================================
  // Generate AI Summary
  // Gemma on demand
  // Saves result to localStorage
  // =======================================

  async function generateSummary() {
    try {
      setLoadingFeature("summary");
      setError("");

      const data = await pantryApi.generateSummary(pantryFoods);

      const value = data.summary || "";

      setSummary(value);

      saveToStorage(STORAGE_KEYS.summary, value);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to generate summary.");
    } finally {
      setLoadingFeature("");
    }
  }

  // =======================================
  // Generate AI Explanations
  // Gemma on demand
  // Saves explained recommendations to localStorage
  // =======================================

  async function generateExplanations() {
    try {
      setLoadingFeature("explanations");
      setError("");

      const data = await pantryApi.generateExplanations(pantryFoods);

      const explained = data.recommendations || [];

      const explainedMap = new Map(
        explained.map((item) => [getFoodKey(item), item]),
      );

      // Merge AI explanations into existing recommendations
      const mergedRecommendations = recommendations.map((item) => {
        const match = explainedMap.get(getFoodKey(item));

        if (!match) {
          return item;
        }

        return {
          ...item,
          ...match,
          explanation:
            match.explanation || item.explanation || item.reason || "",
        };
      });

      // If existing recommendations were empty,
      // use backend explained results directly.
      const finalValue =
        mergedRecommendations.length > 0 ? mergedRecommendations : explained;

      setRecommendations(finalValue);

      saveToStorage(STORAGE_KEYS.recommendations, finalValue);

      console.log("Saved explanations to localStorage:", finalValue);

      console.log(
        "LocalStorage ai_pantry_recommendations:",
        JSON.parse(localStorage.getItem(STORAGE_KEYS.recommendations)),
      );
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to generate explanations.");
    } finally {
      setLoadingFeature("");
    }
  }

  // =======================================
  // Generate all AI
  // Slow, optional
  // Saves all AI outputs to localStorage
  // =======================================

  async function generateAllAI() {
    try {
      setLoadingFeature("all");
      setError("");

      const data = await pantryApi.generateAllAI(pantryFoods);

      const newMeals = data.meals || [];

      const newCoaching = data.coaching || "";

      const newSummary = data.summary || "";

      const newRecommendations = mergeRecommendationsWithExisting(
        data.recommendations || [],
      );

      setMeals(newMeals);
      setCoaching(newCoaching);
      setSummary(newSummary);
      setRecommendations(newRecommendations);

      saveToStorage(STORAGE_KEYS.meals, newMeals);

      saveToStorage(STORAGE_KEYS.coaching, newCoaching);

      saveToStorage(STORAGE_KEYS.summary, newSummary);

      saveToStorage(STORAGE_KEYS.recommendations, newRecommendations);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to generate AI results.");
    } finally {
      setLoadingFeature("");
    }
  }

  // =======================================
  // Initial fast dashboard load
  // Uses pantry foods from localStorage
  // =======================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =======================================
  // Context Value
  // =======================================

  const value = {
    // Data
    pantryFoods,
    recommendations,
    nutrition,
    waste,
    meals,
    coaching,
    summary,

    // UI
    loading,
    loadingFeature,
    error,
    lastUpdated,

    // Pantry actions
    addPantryFood,
    deletePantryFood,
    removeFood,
    clearPantry,

    // Fast refresh actions
    fetchDashboard,
    refreshRecommendations,
    refreshNutrition,
    refreshWaste,

    // AI on-demand actions
    generateMeals,
    refreshMeals,
    generateCoaching,
    refreshCoaching,
    generateSummary,
    generateExplanations,
    generateAllAI,

    // Storage keys exposed for debugging
    STORAGE_KEYS,
  };

  return (
    <PantryContext.Provider value={value}>{children}</PantryContext.Provider>
  );
}

// =========================================
// Hook
// =========================================

export function usePantry() {
  const context = useContext(PantryContext);

  if (!context) {
    throw new Error("usePantry must be used inside PantryProvider");
  }

  return context;
}
