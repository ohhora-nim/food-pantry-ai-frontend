import React, { useState } from "react";

import Card from "./ui/Card";
import SectionTitle from "./ui/SectionTitle";

function FoodForm({ onAddFood }) {
  // ====================================
  // Form State
  // ====================================

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
    category: "vegetable",
    processing_level: "fresh",
    nutrition_tags: [],
  });

  // ====================================
  // Validation Errors
  // ====================================

  const [errors, setErrors] = useState({});

  // ====================================
  // Nutrition Tags
  // ====================================

  const TAG_OPTIONS = ["protein", "fiber", "carb", "fat", "vitamin", "sugar"];

  // ====================================
  // Handle Input
  // ====================================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: value,
    }));

    // Remove error when typing

    setErrors((prev) => ({
      ...prev,

      [name]: "",
    }));
  }

  // ====================================
  // Toggle Tag
  // ====================================

  function toggleTag(tag) {
    setForm((prev) => {
      const exists = prev.nutrition_tags.includes(tag);

      if (exists) {
        return {
          ...prev,

          nutrition_tags: prev.nutrition_tags.filter((t) => t !== tag),
        };
      }

      return {
        ...prev,

        nutrition_tags: [...prev.nutrition_tags, tag],
      };
    });
  }

  // ====================================
  // Validation
  // ====================================

  function validateForm() {
    const newErrors = {};

    // ================================
    // Name
    // ================================

    if (!form.name.trim()) {
      newErrors.name = "Food name is required.";
    }

    // ================================
    // Quantity
    // ================================

    if (form.quantity === "" || isNaN(form.quantity)) {
      newErrors.quantity = "Quantity must be a number.";
    } else if (Number(form.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
    }

    // ================================
    // Expiry
    // ================================

    if (!form.expiry_date) {
      newErrors.expiry_date = "Expiry date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // ====================================
  // Submit
  // ====================================

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // ==================================
    // AI Scores
    // ==================================

    const nutritionScore = form.nutrition_tags.length * 2;

    const priorityScore = Math.min(
      100,

      nutritionScore * 10,
    );

    // ==================================
    // Create Food
    // ==================================

    const food = {
      ...form,

      quantity: Number(form.quantity),

      nutrition_score: nutritionScore,

      priority_score: priorityScore,

      expiry_score: 7,
    };

    onAddFood(food);

    // ==================================
    // Reset
    // ==================================

    setForm({
      name: "",

      quantity: 1,

      category: "vegetable",

      processing_level: "fresh",

      nutrition_tags: [],

      expiry_date: "",
    });

    setErrors({});
  }

  // ====================================
  // UI
  // ====================================

  return (
    <Card>
      {/* ============================= */}
      {/* Title */}
      {/* ============================= */}

      <SectionTitle
        icon="🥬"
        title="
          Add Pantry Foods
        "
      />

      {/* ============================= */}
      {/* Form */}
      {/* ============================= */}

      <form
        onSubmit={handleSubmit}
        className="
          space-y-6
        "
      >
        {/* ========================= */}
        {/* Row */}
        {/* ========================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >
          {/* ===================== */}
          {/* Food Name */}
          {/* ===================== */}

          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Food Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="
                Example:
                Chicken Breast
              "
              className="
                w-full

                bg-gray-50

                border
                border-gray-200

                rounded-2xl

                px-4
                py-3

                outline-none

                focus:ring-2
                focus:ring-green-400

                transition-all
              "
            />

            {errors.name && (
              <p
                className="
                  text-red-500
                  text-sm
                  mt-2
                "
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* ===================== */}
          {/* Quantity */}
          {/* ===================== */}

          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              className="
                w-full

                bg-gray-50

                border
                border-gray-200

                rounded-2xl

                px-4
                py-3

                outline-none

                focus:ring-2
                focus:ring-green-400

                transition-all
              "
            />

            {errors.quantity && (
              <p
                className="
                  text-red-500
                  text-sm
                  mt-2
                "
              >
                {errors.quantity}
              </p>
            )}
          </div>

          {/* ===================== */}
          {/* Expiry Date */}
          {/* ===================== */}

          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Expiry Date
            </label>

            <input
              type="date"
              name="expiry_date"
              value={form.expiry_date}
              onChange={handleChange}
              className="
                w-full

                bg-gray-50

                border
                border-gray-200

                rounded-2xl

                px-4
                py-3

                outline-none

                focus:ring-2
                focus:ring-green-400

                transition-all
              "
            />

            {errors.expiry_date && (
              <p
                className="
                  text-red-500
                  text-sm
                  mt-2
                "
              >
                {errors.expiry_date}
              </p>
            )}
          </div>
        </div>

        {/* ========================= */}
        {/* Second Row */}
        {/* ========================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          {/* ===================== */}
          {/* Category */}
          {/* ===================== */}

          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="
                w-full

                bg-gray-50

                border
                border-gray-200

                rounded-2xl

                px-4
                py-3

                outline-none

                focus:ring-2
                focus:ring-green-400

                transition-all
              "
            >
              <option value="vegetable">Vegetable</option>

              <option value="fruit">Fruit</option>

              <option value="meat">Meat</option>

              <option value="grain">Grain</option>

              <option value="dairy">Dairy</option>

              <option value="seafood">Seafood</option>
            </select>
          </div>

          {/* ===================== */}
          {/* Processing */}
          {/* ===================== */}

          <div>
            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Processing Level
            </label>

            <select
              name="
                processing_level
              "
              value={form.processing_level}
              onChange={handleChange}
              className="
                w-full

                bg-gray-50

                border
                border-gray-200

                rounded-2xl

                px-4
                py-3

                outline-none

                focus:ring-2
                focus:ring-green-400

                transition-all
              "
            >
              <option value="fresh">Fresh</option>

              <option value="processed">Processed</option>

              <option value="ultra_processed">Ultra Processed</option>
            </select>
          </div>
        </div>

        {/* ========================= */}
        {/* Nutrition Tags */}
        {/* ========================= */}

        <div>
          <label
            className="
              block
              text-sm
              font-semibold
              text-gray-700
              mb-3
            "
          >
            Nutrition Tags
          </label>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {TAG_OPTIONS.map((tag) => {
              const active = form.nutrition_tags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`
                      px-4
                      py-2

                      rounded-full

                      text-sm
                      font-semibold

                      transition-all
                      duration-300

                      ${
                        active
                          ? `
                          bg-green-500
                          text-white
                          shadow-lg
                        `
                          : `
                          bg-gray-100
                          text-gray-700

                          hover:bg-gray-200
                        `
                      }
                    `}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================= */}
        {/* Submit */}
        {/* ========================= */}

        <button
          type="submit"
          className="
            w-full
            md:w-auto

            bg-gradient-to-r
            from-green-500
            to-emerald-600

            hover:from-green-600
            hover:to-emerald-700

            text-white
            font-bold

            px-8
            py-4

            rounded-2xl

            shadow-lg

            transition-all
            duration-300

            hover:scale-[1.02]
          "
        >
          Add Food
        </button>
      </form>
    </Card>
  );
}

export default FoodForm;
