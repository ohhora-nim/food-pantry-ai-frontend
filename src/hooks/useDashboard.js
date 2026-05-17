// =========================================
// useDashboard.js
// Custom hook for AI Pantry Dashboard data
// =========================================

import { useMemo } from "react";

import { usePantry } from "../context/PantryContext";

// =========================================
// Safe Number
// =========================================

function safeNumber(value, fallback = 0) {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return fallback;
  }

  return num;
}

// =========================================
// Format Percent
// =========================================

function formatPercent(value) {
  return `${safeNumber(value)}%`;
}

// =========================================
// Main Hook
// =========================================

export default function useDashboard() {
  const {
    pantryFoods,
    recommendations,
    nutrition,
    waste,
    meals,
    coaching,
    summary,
    loading,
    error,
    lastUpdated,
    fetchDashboard,
    refreshMeals,
    refreshRecommendations,
    refreshCoaching,
    refreshWaste,
    refreshNutrition,
  } = usePantry();

  // =======================================
  // Dashboard Stats
  // =======================================

  const stats = useMemo(() => {
    const pantryCount = pantryFoods?.length || 0;

    const recommendationCount = recommendations?.length || 0;

    const mealCount = meals?.length || 0;

    const healthScore = nutrition?.pantry_health_score || 0;

    const nutritionScore = nutrition?.average_nutrition_score || 0;

    const priorityScore = nutrition?.average_priority_score || 0;

    const freshPercent = nutrition?.fresh_percent || 0;

    const processedPercent = nutrition?.processed_percent || 0;

    const ultraProcessedPercent = nutrition?.ultra_processed_percent || 0;

    const wasteScore = waste?.overall_waste_score || 0;

    const urgentItems = waste?.urgent_items || 0;

    const highRiskCount = waste?.high_risk_count || 0;

    const mediumRiskCount = waste?.medium_risk_count || 0;

    const lowRiskCount = waste?.low_risk_count || 0;

    return {
      pantryCount,
      recommendationCount,
      mealCount,

      healthScore,
      nutritionScore,
      priorityScore,

      freshPercent,
      processedPercent,
      ultraProcessedPercent,

      wasteScore,
      urgentItems,
      highRiskCount,
      mediumRiskCount,
      lowRiskCount,
    };
  }, [pantryFoods, recommendations, nutrition, waste, meals]);

  // =======================================
  // Pantry Summary
  // =======================================

  const pantrySummary = useMemo(() => {
    const total = pantryFoods?.length || 0;

    const freshFoods =
      pantryFoods?.filter((food) => food.processing_level === "fresh").length ||
      0;

    const processedFoods =
      pantryFoods?.filter((food) => food.processing_level === "processed")
        .length || 0;

    const ultraProcessedFoods =
      pantryFoods?.filter((food) => food.processing_level === "ultra_processed")
        .length || 0;

    const urgentFoods =
      pantryFoods?.filter((food) => food.expiry_score >= 8) || [];

    const highPriorityFoods =
      pantryFoods?.filter((food) => food.priority_score >= 80) || [];

    const averageNutrition =
      total > 0
        ? Math.round(
            pantryFoods.reduce(
              (sum, food) => sum + safeNumber(food.nutrition_score),
              0,
            ) / total,
          )
        : 0;

    const averagePriority =
      total > 0
        ? Math.round(
            pantryFoods.reduce(
              (sum, food) => sum + safeNumber(food.priority_score),
              0,
            ) / total,
          )
        : 0;

    return {
      total,
      freshFoods,
      processedFoods,
      ultraProcessedFoods,
      urgentFoods,
      urgentCount: urgentFoods.length,
      highPriorityFoods,
      highPriorityCount: highPriorityFoods.length,
      averageNutrition,
      averagePriority,
    };
  }, [pantryFoods]);

  // =======================================
  // Nutrition Summary
  // =======================================

  const nutritionSummary = useMemo(() => {
    if (!nutrition) {
      return {
        available: false,
        healthScore: 0,
        averageNutritionScore: 0,
        averagePriorityScore: 0,
        freshPercent: 0,
        processedPercent: 0,
        ultraProcessedPercent: 0,
        topTags: [],
        insights: [],
        processingInsight: "",
      };
    }

    return {
      available: true,

      healthScore: nutrition.pantry_health_score || 0,

      averageNutritionScore: nutrition.average_nutrition_score || 0,

      averagePriorityScore: nutrition.average_priority_score || 0,

      freshPercent: nutrition.fresh_percent || 0,

      processedPercent: nutrition.processed_percent || 0,

      ultraProcessedPercent: nutrition.ultra_processed_percent || 0,

      topTags: nutrition.top_tags || [],

      insights: nutrition.insights || [],

      processingInsight: nutrition.processing_insight || "",

      categoryDistribution: nutrition.category_distribution || [],

      nutritionBalance: nutrition.nutrition_balance || {},

      dailyBreakdown: nutrition.daily_breakdown || [],
    };
  }, [nutrition]);

  // =======================================
  // Waste Summary
  // =======================================

  const wasteSummary = useMemo(() => {
    if (!waste) {
      return {
        available: false,
        overallWasteScore: 0,
        urgentItems: 0,
        highRiskCount: 0,
        mediumRiskCount: 0,
        lowRiskCount: 0,
        highRiskFoods: [],
        mediumRiskFoods: [],
        lowRiskFoods: [],
        insights: [],
        sustainabilityImpact: "",
      };
    }

    return {
      available: true,

      overallWasteScore: waste.overall_waste_score || 0,

      urgentItems: waste.urgent_items || 0,

      highRiskCount: waste.high_risk_count || 0,

      mediumRiskCount: waste.medium_risk_count || 0,

      lowRiskCount: waste.low_risk_count || 0,

      highRiskFoods: waste.high_risk_foods || [],

      mediumRiskFoods: waste.medium_risk_foods || [],

      lowRiskFoods: waste.low_risk_foods || [],

      insights: waste.insights || [],

      sustainabilityImpact: waste.sustainability_impact || "",
    };
  }, [waste]);

  // =======================================
  // Meal Summary
  // =======================================

  const mealSummary = useMemo(() => {
    if (!meals || meals.length === 0) {
      return {
        available: false,
        totalMeals: 0,
        totalDays: 0,
        averageScore: 0,
        topMeals: [],
      };
    }

    let flatMeals = [];

    meals.forEach((item) => {
      // Flat format
      if (item.name && item.day) {
        flatMeals.push(item);
        return;
      }

      // Grouped object format
      if (
        item.day &&
        item.meals &&
        typeof item.meals === "object" &&
        !Array.isArray(item.meals)
      ) {
        Object.entries(item.meals).forEach(([mealType, meal]) => {
          if (!meal) return;

          flatMeals.push({
            ...meal,
            day: item.day,
            meal: mealType,
          });
        });
      }

      // Grouped array wrapper format
      if (item.day && Array.isArray(item.meals)) {
        item.meals.forEach((wrapper) => {
          Object.entries(wrapper).forEach(([mealType, meal]) => {
            if (!meal) return;

            flatMeals.push({
              ...meal,
              day: item.day,
              meal: mealType,
            });
          });
        });
      }
    });

    const totalScore = flatMeals.reduce(
      (sum, meal) => sum + safeNumber(meal.score),
      0,
    );

    const averageScore =
      flatMeals.length > 0 ? Math.round(totalScore / flatMeals.length) : 0;

    const topMeals = [...flatMeals]
      .sort((a, b) => safeNumber(b.score) - safeNumber(a.score))
      .slice(0, 5);

    const uniqueDays = new Set(flatMeals.map((meal) => meal.day));

    return {
      available: true,
      totalMeals: flatMeals.length,
      totalDays: uniqueDays.size,
      averageScore,
      topMeals,
      flatMeals,
    };
  }, [meals]);

  // =======================================
  // Recommendations Summary
  // =======================================

  const recommendationSummary = useMemo(() => {
    if (!recommendations || recommendations.length === 0) {
      return {
        available: false,
        total: 0,
        averageNutrition: 0,
        averagePriority: 0,
        freshCount: 0,
        highPriorityCount: 0,
        topRecommendations: [],
      };
    }

    const total = recommendations.length;

    const averageNutrition = Math.round(
      recommendations.reduce(
        (sum, food) => sum + safeNumber(food.nutrition_score),
        0,
      ) / total,
    );

    const averagePriority = Math.round(
      recommendations.reduce(
        (sum, food) => sum + safeNumber(food.priority_score),
        0,
      ) / total,
    );

    const freshCount = recommendations.filter(
      (food) => food.processing_level === "fresh",
    ).length;

    const highPriorityCount = recommendations.filter(
      (food) => safeNumber(food.priority_score) >= 80,
    ).length;

    const topRecommendations = [...recommendations]
      .sort(
        (a, b) => safeNumber(b.priority_score) - safeNumber(a.priority_score),
      )
      .slice(0, 5);

    return {
      available: true,
      total,
      averageNutrition,
      averagePriority,
      freshCount,
      highPriorityCount,
      topRecommendations,
    };
  }, [recommendations]);

  // =======================================
  // Coaching Summary
  // =======================================

  const coachingSummary = useMemo(() => {
    if (!coaching) {
      return {
        available: false,
        text: "",
        isObject: false,
        healthScore: 0,
        strengths: [],
        risks: [],
        recommendations: [],
      };
    }

    if (typeof coaching === "string") {
      return {
        available: true,
        text: coaching,
        isObject: false,
        healthScore: nutrition?.pantry_health_score || 0,
        strengths: [],
        risks: [],
        recommendations: [coaching],
      };
    }

    return {
      available: true,
      isObject: true,
      text: coaching.summary || "",
      healthScore: coaching.health_score || nutrition?.pantry_health_score || 0,
      strengths: coaching.strengths || [],
      risks: coaching.risks || [],
      recommendations: coaching.recommendations || [],
      nutritionFocus: coaching.nutrition_focus || "",
      fitnessTip: coaching.fitness_tip || "",
      longevityTip: coaching.longevity_tip || "",
      hydrationTip: coaching.hydration_tip || "",
      mealBalanceFeedback: coaching.meal_balance_feedback || "",
    };
  }, [coaching, nutrition]);

  // =======================================
  // Overall Status
  // =======================================

  const status = useMemo(() => {
    const healthScore = nutritionSummary.healthScore || 0;

    const wasteScore = wasteSummary.overallWasteScore || 0;

    const urgentItems = wasteSummary.urgentItems || 0;

    let healthLabel = "No Data";

    if (healthScore >= 85) {
      healthLabel = "Excellent";
    } else if (healthScore >= 70) {
      healthLabel = "Good";
    } else if (healthScore >= 50) {
      healthLabel = "Improving";
    } else if (healthScore > 0) {
      healthLabel = "Needs Focus";
    }

    let wasteLabel = "No Data";

    if (wasteScore >= 70 || urgentItems >= 3) {
      wasteLabel = "High Risk";
    } else if (wasteScore >= 40 || urgentItems >= 1) {
      wasteLabel = "Monitor";
    } else if (wasteScore > 0) {
      wasteLabel = "Controlled";
    }

    return {
      healthLabel,
      wasteLabel,
      hasPantryFoods: pantrySummary.total > 0,
      hasRecommendations: recommendationSummary.available,
      hasMeals: mealSummary.available,
      hasNutrition: nutritionSummary.available,
      hasWaste: wasteSummary.available,
      hasCoaching: coachingSummary.available,
    };
  }, [
    nutritionSummary,
    wasteSummary,
    pantrySummary,
    recommendationSummary,
    mealSummary,
    coachingSummary,
  ]);

  // =======================================
  // Return Hook Data
  // =======================================

  return {
    // Raw data
    pantryFoods,
    recommendations,
    nutrition,
    waste,
    meals,
    coaching,
    summary,

    // UI state
    loading,
    error,
    lastUpdated,

    // Derived
    stats,
    pantrySummary,
    nutritionSummary,
    wasteSummary,
    mealSummary,
    recommendationSummary,
    coachingSummary,
    status,

    // Formatting helpers
    formatPercent,

    // Actions
    fetchDashboard,
    refreshMeals,
    refreshRecommendations,
    refreshCoaching,
    refreshWaste,
    refreshNutrition,
  };
}
