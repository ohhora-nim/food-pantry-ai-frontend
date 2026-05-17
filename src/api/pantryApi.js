// =========================================
// pantryApi.js
// Stateless API client for AI Pantry Backend
// Frontend localStorage owns pantry foods
// =========================================

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// =========================================
// Helper: handle response
// =========================================

async function handleResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.detail || data?.message || `API error: ${response.status}`;

    throw new Error(message);
  }

  return data;
}

// =========================================
// Helper: request wrapper
// =========================================

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method: options.method || "GET",

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },

    ...options,
  };

  const response = await fetch(url, config);

  return handleResponse(response);
}

// =========================================
// Helper: pantry payload
// Backend expects:
// {
//   pantry_foods: [
//     {
//       name: "spinach",
//       quantity: 2,
//       expiry_date: "2026-05-20"
//     }
//   ]
// }
// =========================================

function buildPantryPayload(pantryFoods = []) {
  return {
    pantry_foods: pantryFoods.map((food) => ({
      name: food.name,
      quantity: Number(food.quantity || 1),
      expiry_date: food.expiry_date,
    })),
  };
}

// =========================================
// API Client
// =========================================

const pantryApi = {
  // =======================================
  // Health Check
  // GET /health
  // =======================================

  async healthCheck() {
    return request("/health", {
      method: "GET",
    });
  },

  // =======================================
  // Root
  // GET /
  // =======================================

  async getRoot() {
    return request("/", {
      method: "GET",
    });
  },

  // =======================================
  // Fast Dashboard
  // POST /dashboard
  // No Gemma call
  // =======================================

  async getDashboard(pantryFoods = []) {
    return request("/dashboard", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // Enrich Pantry
  // POST /pantry/enrich
  // No Gemma call
  // =======================================

  async enrichPantry(pantryFoods = []) {
    return request("/pantry/enrich", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // Recommendations
  // POST /recommendations
  // No Gemma call
  // =======================================

  async getRecommendations(pantryFoods = []) {
    return request("/recommendations", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // Nutrition Analytics
  // POST /nutrition
  // No Gemma call
  // =======================================

  async getNutrition(pantryFoods = []) {
    return request("/nutrition", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // Waste Forecast
  // POST /waste
  // No Gemma call
  // =======================================

  async getWasteForecast(pantryFoods = []) {
    return request("/waste", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // AI Meals
  // POST /ai/meals
  // Gemma on demand
  // =======================================

  async generateMeals(pantryFoods = []) {
    return request("/ai/meals", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // AI Coaching
  // POST /ai/coaching
  // Gemma on demand
  // =======================================

  async generateCoaching(pantryFoods = []) {
    return request("/ai/coaching", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // AI Summary
  // POST /ai/summary
  // Gemma on demand
  // =======================================

  async generateSummary(pantryFoods = []) {
    return request("/ai/summary", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // AI Explanations
  // POST /ai/explanations
  // Gemma on demand
  // Expected response:
  // {
  //   recommendations: [
  //     {
  //       name: "...",
  //       explanation: "..."
  //     }
  //   ]
  // }
  // =======================================

  async generateExplanations(pantryFoods = []) {
    return request("/ai/explanations", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },

  // =======================================
  // Generate All AI
  // POST /ai/all
  // Slow, optional
  // =======================================

  async generateAllAI(pantryFoods = []) {
    return request("/ai/all", {
      method: "POST",
      body: JSON.stringify(buildPantryPayload(pantryFoods)),
    });
  },
};

// =========================================
// Named Exports
// =========================================

export async function healthCheck() {
  return pantryApi.healthCheck();
}

export async function getRoot() {
  return pantryApi.getRoot();
}

export async function getDashboard(pantryFoods = []) {
  return pantryApi.getDashboard(pantryFoods);
}

export async function enrichPantry(pantryFoods = []) {
  return pantryApi.enrichPantry(pantryFoods);
}

export async function getRecommendations(pantryFoods = []) {
  return pantryApi.getRecommendations(pantryFoods);
}

export async function getNutrition(pantryFoods = []) {
  return pantryApi.getNutrition(pantryFoods);
}

export async function getWasteForecast(pantryFoods = []) {
  return pantryApi.getWasteForecast(pantryFoods);
}

export async function generateMeals(pantryFoods = []) {
  return pantryApi.generateMeals(pantryFoods);
}

export async function generateCoaching(pantryFoods = []) {
  return pantryApi.generateCoaching(pantryFoods);
}

export async function generateSummary(pantryFoods = []) {
  return pantryApi.generateSummary(pantryFoods);
}

export async function generateExplanations(pantryFoods = []) {
  return pantryApi.generateExplanations(pantryFoods);
}

export async function generateAllAI(pantryFoods = []) {
  return pantryApi.generateAllAI(pantryFoods);
}

// =========================================
// Default Export
// =========================================

export default pantryApi;
