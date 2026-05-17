// =========================================
// PantryContext.jsx
// Frontend-owned pantry state using localStorage
// Backend is stateless
//
// Raw pantry foods:
// - saved in browser localStorage
// - only name, quantity, expiry_date
//
// Enriched pantry foods:
// - returned from backend
// - category, processing_level, nutrition_tags,
//   nutrition_score, expiry_score, priority_score, waste_risk
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
  enrichedPantryFoods: "ai_pantry_enriched_foods",
  recommendations: "ai_pantry_recommendations",
  nutrition: "ai_pantry_nutrition",
  waste: "ai_pantry_waste",
  meals: "ai_pantry_meals",
  coaching: "ai_pantry_coaching",
  summary: "ai_pantry_summary",
  lastUpdated: "ai_pantry_last_updated",
};

// =========================================
// Local Storage Helpers
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

// =========================================
// Food Helpers
// =========================================

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
  return `${food?.name || ""}-${food?.expiry_date || ""}`.trim().toLowerCase();
}

function getRecommendationKey(food) {
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
  // Raw Pantry Foods
  // =======================================

  const [pantryFoods, setPantryFoods] = useState(() =>
    loadFromStorage(STORAGE_KEYS.pantryFoods, []),
  );

  // =======================================
  // Enriched Pantry Foods
  // =======================================

  const [enrichedPantryFoods, setEnrichedPantryFoods] = useState(() =>
    loadFromStorage(STORAGE_KEYS.enrichedPantryFoods, []),
  );

  // =======================================
  // Intelligence / AI Data
  // =======================================

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
  // Error helper
  // =======================================

  function clearError() {
    setError("");
  }

  // =======================================
  // Persist raw pantry foods automatically
  // =======================================

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.pantryFoods, pantryFoods);
  }, [pantryFoods]);

  // =======================================
  // Merge raw foods with backend-enriched foods
  // Keeps frontend id for delete actions
  // =======================================

  function mergeRawAndEnrichedFoods(rawFoods = [], enrichedFoods = []) {
    const enrichedMap = new Map(
      enrichedFoods.map((food) => [getFoodKey(food), food]),
    );

    return rawFoods.map((rawFood) => {
      const enriched = enrichedMap.get(getFoodKey(rawFood));

      if (!enriched) {
        return rawFood;
      }

      return {
        ...rawFood,
        ...enriched,
        id: rawFood.id,
      };
    });
  }

  // =======================================
  // Merge recommendations while preserving
  // expensive AI explanations
  // =======================================

  function mergeRecommendationsWithExisting(newRecommendations = []) {
    const existingMap = new Map(
      recommendations.map((item) => [getRecommendationKey(item), item]),
    );

    return newRecommendations.map((item) => {
      const key = getRecommendationKey(item);

      const existing = existingMap.get(key);

      return {
        ...item,

        explanation: existing?.explanation || item.explanation || "",

        benefits: item.benefits || existing?.benefits || [],

        reason: item.reason || existing?.reason || "",
      };
    });
  }

  // =======================================
  // Save fast dashboard results
  // No Gemma data generated here
  // =======================================

  function saveDashboardResults(data, sourceFoods = pantryFoods) {
    const updatedAt = new Date().toISOString();

    const enrichedFoods = mergeRawAndEnrichedFoods(
      sourceFoods,
      data.pantry_foods || [],
    );

    const mergedRecommendations = mergeRecommendationsWithExisting(
      data.recommendations || [],
    );

    const newNutrition = data.nutrition || null;

    const newWaste = data.waste || null;

    setEnrichedPantryFoods(enrichedFoods);

    setRecommendations(mergedRecommendations);

    setNutrition(newNutrition);

    setWaste(newWaste);

    setLastUpdated(updatedAt);

    saveToStorage(STORAGE_KEYS.enrichedPantryFoods, enrichedFoods);

    saveToStorage(STORAGE_KEYS.recommendations, mergedRecommendations);

    saveToStorage(STORAGE_KEYS.nutrition, newNutrition);

    saveToStorage(STORAGE_KEYS.waste, newWaste);

    saveToStorage(STORAGE_KEYS.lastUpdated, updatedAt);
  }

  // =======================================
  // Add pantry food locally, then refresh
  // fast backend intelligence
  // =======================================

  async function addPantryFood(foodData) {
    const newFood = normalizeFoodForStorage(foodData);

    const nextFoods = [...pantryFoods, newFood];

    setPantryFoods(nextFoods);

    saveToStorage(STORAGE_KEYS.pantryFoods, nextFoods);

    await fetchDashboard(nextFoods);
  }

  // =======================================
  // Delete pantry food locally, then refresh
  // fast backend intelligence
  // =======================================

  async function deletePantryFood(food) {
    const nextFoods = pantryFoods.filter((item) => {
      if (food.id) {
        return item.id !== food.id;
      }

      return getFoodKey(item) !== getFoodKey(food);
    });

    setPantryFoods(nextFoods);

    saveToStorage(STORAGE_KEYS.pantryFoods, nextFoods);

    if (nextFoods.length === 0) {
      setEnrichedPantryFoods([]);
      setRecommendations([]);
      setNutrition(null);
      setWaste(null);
      setMeals([]);
      setCoaching("");
      setSummary("");

      saveToStorage(STORAGE_KEYS.enrichedPantryFoods, []);

      saveToStorage(STORAGE_KEYS.recommendations, []);

      saveToStorage(STORAGE_KEYS.nutrition, null);

      saveToStorage(STORAGE_KEYS.waste, null);

      saveToStorage(STORAGE_KEYS.meals, []);

      saveToStorage(STORAGE_KEYS.coaching, "");

      saveToStorage(STORAGE_KEYS.summary, "");

      return;
    }

    await fetchDashboard(nextFoods);
  }

  const removeFood = deletePantryFood;

  // =======================================
  // Clear all local app data
  // =======================================

  function clearPantry() {
    setPantryFoods([]);
    setEnrichedPantryFoods([]);
    setRecommendations([]);
    setNutrition(null);
    setWaste(null);
    setMeals([]);
    setCoaching("");
    setSummary("");
    setLastUpdated(null);
    setError("");
    setLoadingFeature("");

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

        saveDashboardResults(data, foods);
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
  // Preserves existing explanations
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
  // =======================================

  async function generateExplanations() {
    try {
      setLoadingFeature("explanations");
      setError("");

      const data = await pantryApi.generateExplanations(pantryFoods);

      const explained = data.recommendations || [];

      const explainedMap = new Map(
        explained.map((item) => [getRecommendationKey(item), item]),
      );

      const mergedRecommendations = recommendations.map((item) => {
        const key = getRecommendationKey(item);

        const match = explainedMap.get(key);

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

      const finalValue =
        mergedRecommendations.length > 0 ? mergedRecommendations : explained;

      setRecommendations(finalValue);

      saveToStorage(STORAGE_KEYS.recommendations, finalValue);
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
  // =======================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =======================================
  // Context Value
  // =======================================

  const value = {
    // Raw pantry data
    pantryFoods,

    // Backend enriched pantry data
    enrichedPantryFoods,

    // Intelligence / AI data
    recommendations,
    nutrition,
    waste,
    meals,
    coaching,
    summary,

    // UI state
    loading,
    loadingFeature,
    error,
    lastUpdated,

    // Helpers
    clearError,

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

    // Debug
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
