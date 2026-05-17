// =========================================
// FoodForm.jsx
// Add Pantry Food Form
// =========================================

import { useState } from "react";

import { usePantry } from "../../context/PantryContext";

import {
  Plus,
  Apple,
  Package,
  CalendarDays,
  Loader2,
  AlertCircle,
} from "lucide-react";

// =========================================
// Food Form
// =========================================

export default function FoodForm() {
  const { addPantryFood, loadingFeature } = usePantry();

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    expiry_date: "",
  });

  const [errors, setErrors] = useState({});

  const isAdding = loadingFeature === "dashboard";

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Food name is required.";
    }

    if (form.quantity === "" || Number.isNaN(Number(form.quantity))) {
      newErrors.quantity = "Quantity must be a number.";
    } else if (Number(form.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
    }

    if (!form.expiry_date) {
      newErrors.expiry_date = "Expiry date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await addPantryFood({
      name: form.name.trim().toLowerCase(),
      quantity: Number(form.quantity),
      expiry_date: form.expiry_date,
    });

    setForm({
      name: "",
      quantity: 1,
      expiry_date: "",
    });

    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Food Name */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Food Name
          </label>

          <div className="relative">
            <Apple
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. spinach, egg, chicken breast"
              className={`
                w-full
                rounded-2xl
                border
                bg-slate-50
                py-4
                pl-12
                pr-4
                outline-none
                transition-all
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500
                ${errors.name ? "border-red-300" : "border-slate-200"}
              `}
            />
          </div>

          {errors.name && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle size={14} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Quantity */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Quantity
          </label>

          <div className="relative">
            <Package
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              step="1"
              className={`
                w-full
                rounded-2xl
                border
                bg-slate-50
                py-4
                pl-12
                pr-4
                outline-none
                transition-all
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500
                ${errors.quantity ? "border-red-300" : "border-slate-200"}
              `}
            />
          </div>

          {errors.quantity && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle size={14} />
              {errors.quantity}
            </p>
          )}
        </div>

        {/* Expiry Date */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Expiry Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              name="expiry_date"
              value={form.expiry_date}
              onChange={handleChange}
              className={`
                w-full
                rounded-2xl
                border
                bg-slate-50
                py-4
                pl-12
                pr-4
                outline-none
                transition-all
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500
                ${errors.expiry_date ? "border-red-300" : "border-slate-200"}
              `}
            />
          </div>

          {errors.expiry_date && (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle size={14} />
              {errors.expiry_date}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
        <p className="text-sm text-emerald-800 leading-relaxed">
          Pantry foods are saved in your browser localStorage. The backend only
          analyzes the foods you send from the browser.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={isAdding}
          className="
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            px-7
            py-4
            font-bold
            text-white
            shadow-lg
            transition-all
            hover:from-emerald-600
            hover:to-green-700
            hover:shadow-xl
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {isAdding ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus size={20} />
              Add Food
            </>
          )}
        </button>

        <p className="text-sm text-slate-500">
          Example: <span className="font-medium">spinach</span>,{" "}
          <span className="font-medium">2</span>,{" "}
          <span className="font-medium">2026-05-20</span>
        </p>
      </div>
    </form>
  );
}
