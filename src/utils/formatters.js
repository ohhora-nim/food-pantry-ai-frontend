// =========================================
// formatters.js
// Utility formatting helpers for AI Pantry
// =========================================

// =========================================
// Safe Number
// =========================================

export function safeNumber(value, fallback = 0) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return fallback;
  }

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return number;
}

// =========================================
// Round Number
// =========================================

export function roundNumber(value, decimals = 0) {
  const number = safeNumber(value);

  const factor = Math.pow(10, decimals);

  return Math.round(number * factor) / factor;
}

// =========================================
// Format Percent
// =========================================

export function formatPercent(value, decimals = 0) {
  return `${roundNumber(value, decimals)}%`;
}

// =========================================
// Format Currency
// =========================================

export function formatCurrency(value, currency = "USD") {
  const number = safeNumber(value);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(number);
}

// =========================================
// Format Date
// =========================================

export function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "N/A";
  }
}

// =========================================
// Format Date Time
// =========================================

export function formatDateTime(value) {
  if (!value) {
    return "N/A";
  }

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "N/A";
  }
}

// =========================================
// Calculate Days Left
// =========================================

export function calculateDaysLeft(expiryDate) {
  if (!expiryDate) {
    return null;
  }

  try {
    const today = new Date();

    const expiry = new Date(expiryDate);

    if (Number.isNaN(expiry.getTime())) {
      return null;
    }

    today.setHours(0, 0, 0, 0);

    expiry.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();

    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return daysLeft;
  } catch {
    return null;
  }
}

// =========================================
// Format Days Left
// =========================================

export function formatDaysLeft(expiryDate) {
  const daysLeft = calculateDaysLeft(expiryDate);

  if (daysLeft === null) {
    return "No expiry date";
  }

  if (daysLeft < 0) {
    return `Expired ${Math.abs(daysLeft)} day${
      Math.abs(daysLeft) === 1 ? "" : "s"
    } ago`;
  }

  if (daysLeft === 0) {
    return "Expires today";
  }

  if (daysLeft === 1) {
    return "Expires tomorrow";
  }

  return `${daysLeft} days left`;
}

// =========================================
// Expiry Status
// =========================================

export function getExpiryStatus(expiryScore = 0) {
  const score = safeNumber(expiryScore);

  if (score >= 8) {
    return {
      label: "Urgent",
      level: "high",
      color: "red",
    };
  }

  if (score >= 5) {
    return {
      label: "Use Soon",
      level: "medium",
      color: "amber",
    };
  }

  return {
    label: "Fresh",
    level: "low",
    color: "emerald",
  };
}

// =========================================
// Waste Status
// =========================================

export function getWasteStatus(score = 0) {
  const value = safeNumber(score);

  if (value >= 70) {
    return {
      label: "High Risk",
      level: "high",
      color: "red",
    };
  }

  if (value >= 40) {
    return {
      label: "Medium Risk",
      level: "medium",
      color: "amber",
    };
  }

  return {
    label: "Low Risk",
    level: "low",
    color: "emerald",
  };
}

// =========================================
// Nutrition Status
// =========================================

export function getNutritionStatus(score = 0) {
  const value = safeNumber(score);

  if (value >= 85) {
    return {
      label: "Excellent",
      level: "excellent",
      color: "emerald",
    };
  }

  if (value >= 70) {
    return {
      label: "Good",
      level: "good",
      color: "green",
    };
  }

  if (value >= 50) {
    return {
      label: "Improving",
      level: "medium",
      color: "amber",
    };
  }

  return {
    label: "Needs Focus",
    level: "low",
    color: "red",
  };
}

// =========================================
// Priority Status
// =========================================

export function getPriorityStatus(score = 0) {
  const value = safeNumber(score);

  if (value >= 85) {
    return {
      label: "High Priority",
      level: "high",
      color: "emerald",
    };
  }

  if (value >= 70) {
    return {
      label: "Medium Priority",
      level: "medium",
      color: "amber",
    };
  }

  return {
    label: "Low Priority",
    level: "low",
    color: "slate",
  };
}

// =========================================
// Format Processing Level
// =========================================

export function formatProcessingLevel(level = "") {
  if (!level) {
    return "Unknown";
  }

  return String(level)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// =========================================
// Format Category
// =========================================

export function formatCategory(category = "") {
  if (!category) {
    return "Other";
  }

  return String(category)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// =========================================
// Format Food Name
// =========================================

export function formatFoodName(name = "") {
  if (!name) {
    return "Unknown Food";
  }

  return String(name)
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// =========================================
// Format Nutrition Tag
// =========================================

export function formatNutritionTag(tag = "") {
  if (!tag) {
    return "";
  }

  return String(tag)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// =========================================
// Truncate Text
// =========================================

export function truncateText(text = "", maxLength = 120) {
  if (!text) {
    return "";
  }

  const value = String(text);

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
}

// =========================================
// Pluralize
// =========================================

export function pluralize(count, singular, plural = null) {
  const value = safeNumber(count);

  if (value === 1) {
    return singular;
  }

  return plural || `${singular}s`;
}

// =========================================
// Format Count Label
// =========================================

export function formatCountLabel(count, singular, plural = null) {
  return `${safeNumber(count)} ${pluralize(count, singular, plural)}`;
}

// =========================================
// Clamp
// =========================================

export function clamp(value, min = 0, max = 100) {
  const number = safeNumber(value);

  return Math.max(min, Math.min(max, number));
}

// =========================================
// Score To Percent
// =========================================

export function scoreToPercent(score, maxScore = 100) {
  const value = safeNumber(score);

  const max = safeNumber(maxScore, 100);

  if (max <= 0) {
    return 0;
  }

  return clamp((value / max) * 100);
}

// =========================================
// Nutrition Score To Percent
// 1-10 scale -> 0-100
// =========================================

export function nutritionScoreToPercent(score) {
  return clamp(safeNumber(score) * 10);
}

// =========================================
// Get Color Classes
// =========================================

export function getColorClasses(color = "emerald") {
  const colors = {
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: "text-emerald-600",
      gradient: "from-emerald-500 to-green-600",
    },

    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      icon: "text-green-600",
      gradient: "from-green-500 to-emerald-600",
    },

    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: "text-blue-600",
      gradient: "from-blue-500 to-cyan-600",
    },

    cyan: {
      bg: "bg-cyan-100",
      text: "text-cyan-700",
      border: "border-cyan-200",
      icon: "text-cyan-600",
      gradient: "from-cyan-500 to-blue-600",
    },

    amber: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: "text-amber-600",
      gradient: "from-amber-500 to-orange-600",
    },

    orange: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      border: "border-orange-200",
      icon: "text-orange-600",
      gradient: "from-orange-500 to-red-500",
    },

    red: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
      icon: "text-red-600",
      gradient: "from-red-500 to-rose-600",
    },

    rose: {
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: "text-rose-600",
      gradient: "from-rose-500 to-pink-600",
    },

    violet: {
      bg: "bg-violet-100",
      text: "text-violet-700",
      border: "border-violet-200",
      icon: "text-violet-600",
      gradient: "from-violet-500 to-purple-600",
    },

    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-200",
      icon: "text-purple-600",
      gradient: "from-purple-500 to-fuchsia-600",
    },

    slate: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-200",
      icon: "text-slate-600",
      gradient: "from-slate-700 to-slate-900",
    },
  };

  return colors[color] || colors.emerald;
}

// =========================================
// Category Color
// =========================================

export function getCategoryColor(category = "other") {
  const normalized = String(category).toLowerCase();

  const map = {
    vegetable: "emerald",
    fruit: "rose",
    meat: "orange",
    seafood: "cyan",
    grain: "amber",
    dairy: "blue",
    protein: "red",
    other: "slate",
  };

  return map[normalized] || "slate";
}

// =========================================
// Processing Color
// =========================================

export function getProcessingColor(level = "fresh") {
  const normalized = String(level).toLowerCase();

  if (normalized === "ultra_processed") {
    return "red";
  }

  if (normalized === "processed") {
    return "amber";
  }

  return "emerald";
}

// =========================================
// Meal Type Label
// =========================================

export function formatMealType(type = "") {
  if (!type) {
    return "Meal";
  }

  return String(type)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// =========================================
// Meal Type Emoji
// =========================================

export function getMealTypeEmoji(type = "") {
  const normalized = String(type).toLowerCase();

  if (normalized.includes("breakfast")) {
    return "🌅";
  }

  if (normalized.includes("lunch")) {
    return "🥗";
  }

  if (normalized.includes("dinner")) {
    return "🍽️";
  }

  return "🍴";
}

// =========================================
// Sort Foods By Expiry
// =========================================

export function sortFoodsByExpiry(foods = []) {
  return [...foods].sort((a, b) => {
    const aDate = new Date(a.expiry_date);
    const bDate = new Date(b.expiry_date);

    return aDate.getTime() - bDate.getTime();
  });
}

// =========================================
// Sort Foods By Priority
// =========================================

export function sortFoodsByPriority(foods = []) {
  return [...foods].sort(
    (a, b) => safeNumber(b.priority_score) - safeNumber(a.priority_score),
  );
}

// =========================================
// Sort Foods By Nutrition
// =========================================

export function sortFoodsByNutrition(foods = []) {
  return [...foods].sort(
    (a, b) => safeNumber(b.nutrition_score) - safeNumber(a.nutrition_score),
  );
}

// =========================================
// Group By Field
// =========================================

export function groupBy(items = [], field = "category") {
  return items.reduce((groups, item) => {
    const key = item?.[field] || "other";

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {});
}

// =========================================
// Get Initials
// =========================================

export function getInitials(text = "") {
  if (!text) {
    return "AI";
  }

  const words = String(text).trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

// =========================================
// Format API Error
// =========================================

export function formatApiError(error) {
  if (!error) {
    return "Unknown error occurred.";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error.message) {
    return error.message;
  }

  if (error.detail) {
    return error.detail;
  }

  return "Something went wrong.";
}
