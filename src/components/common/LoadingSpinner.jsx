// =========================================
// LoadingSpinner.jsx
// Reusable Loading / AI Thinking Component
// =========================================

import { useEffect, useState } from "react";

import { Sparkles, Brain, Leaf, ChefHat } from "lucide-react";

// =========================================
// AI Loading Messages
// =========================================

const messages = [
  "Analyzing pantry foods...",
  "Checking nutrition balance...",
  "Reducing food waste...",
  "Optimizing meal ideas...",
  "Preparing AI insights...",
  "Building smart recommendations...",
];

// =========================================
// Loading Spinner
// =========================================

export default function LoadingSpinner({
  title = "AI is thinking",
  showMessages = true,
}) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!showMessages) {
      return;
    }

    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1600);

    return () => clearInterval(timer);
  }, [showMessages]);

  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
      "
    >
      {/* ================================= */}
      {/* Spinner Area */}
      {/* ================================= */}

      <div
        className="
          relative
          mb-8
          h-28
          w-28
        "
      >
        {/* Outer Ring */}

        <div
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-emerald-100
          "
        />

        <div
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-transparent
            border-t-emerald-500
            border-r-green-500
            animate-spin
          "
        />

        {/* Middle Glow */}

        <div
          className="
            absolute
            inset-4
            rounded-full
            bg-gradient-to-br
            from-emerald-100
            to-green-100
            animate-pulse
          "
        />

        {/* Center Icon */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-gradient-to-br
              from-emerald-500
              to-green-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
            "
          >
            <Brain size={28} />
          </div>
        </div>

        {/* Floating Icons */}

        <div
          className="
            absolute
            -top-2
            -right-2
            h-9
            w-9
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-emerald-600
            animate-bounce
          "
        >
          <Sparkles size={18} />
        </div>

        <div
          className="
            absolute
            -bottom-2
            -left-2
            h-9
            w-9
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-green-600
          "
        >
          <Leaf size={18} />
        </div>

        <div
          className="
            absolute
            -bottom-3
            -right-3
            h-9
            w-9
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-orange-500
          "
        >
          <ChefHat size={18} />
        </div>
      </div>

      {/* ================================= */}
      {/* Text */}
      {/* ================================= */}

      <h2
        className="
          text-2xl
          font-black
          text-slate-800
          mb-3
        "
      >
        {title}
      </h2>

      {showMessages && (
        <p
          className="
            text-slate-500
            text-base
            max-w-md
            min-h-[28px]
            transition-all
          "
        >
          {messages[messageIndex]}
        </p>
      )}

      {/* ================================= */}
      {/* Loading Dots */}
      {/* ================================= */}

      <div
        className="
          mt-6
          flex
          items-center
          gap-2
        "
      >
        <span
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-emerald-500
            animate-bounce
          "
        />

        <span
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-green-500
            animate-bounce
            [animation-delay:150ms]
          "
        />

        <span
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-teal-500
            animate-bounce
            [animation-delay:300ms]
          "
        />
      </div>
    </div>
  );
}
