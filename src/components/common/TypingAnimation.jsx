// =========================================
// TypingAnimation.jsx
// Reusable AI Typing Animation Component
// =========================================

import { useEffect, useState } from "react";

import { Sparkles, Brain, Leaf, ChefHat } from "lucide-react";

// =========================================
// Default Messages
// =========================================

const defaultMessages = [
  "Analyzing pantry foods...",
  "Checking nutrition balance...",
  "Reducing food waste...",
  "Optimizing meal ideas...",
  "Preparing AI insights...",
  "Building smart recommendations...",
];

// =========================================
// Typing Animation
// =========================================

export default function TypingAnimation({
  messages = defaultMessages,
  typingSpeed = 35,
  deletingSpeed = 20,
  pauseTime = 1200,
  showIcon = true,
  className = "",
}) {
  // =======================================
  // State
  // =======================================

  const [messageIndex, setMessageIndex] = useState(0);

  const [displayText, setDisplayText] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  // =======================================
  // Current Message
  // =======================================

  const currentMessage = messages[messageIndex] || "";

  // =======================================
  // Typing Effect
  // =======================================

  useEffect(() => {
    if (!messages || messages.length === 0) {
      return;
    }

    let timer;

    // ===============================
    // Deleting Text
    // ===============================

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));

        if (displayText.length <= 1) {
          setIsDeleting(false);

          setMessageIndex((prev) => (prev + 1) % messages.length);
        }
      }, deletingSpeed);
    }

    // ===============================
    // Typing Text
    // ===============================
    else {
      timer = setTimeout(() => {
        setDisplayText(currentMessage.slice(0, displayText.length + 1));

        if (displayText.length === currentMessage.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    currentMessage,
    messages,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  // =======================================
  // Render
  // =======================================

  return (
    <div
      className={`
        flex
        items-center
        gap-3
        ${className}
      `}
    >
      {/* ================================= */}
      {/* Icon */}
      {/* ================================= */}

      {showIcon && (
        <div
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-500
            to-green-600
            text-white
            shadow-lg
            flex-shrink-0
          "
        >
          <Brain size={22} />

          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-white
              text-emerald-600
              shadow-sm
            "
          >
            <Sparkles size={12} />
          </span>
        </div>
      )}

      {/* ================================= */}
      {/* Text */}
      {/* ================================= */}

      <div
        className="
          min-w-0
        "
      >
        <p
          className="
            text-sm
            font-semibold
            text-slate-500
            mb-1
          "
        >
          AI Assistant
        </p>

        <div
          className="
            flex
            items-center
            text-base
            sm:text-lg
            font-bold
            text-slate-800
            min-h-[28px]
          "
        >
          <span>{displayText}</span>

          {/* Cursor */}
          <span
            className="
              ml-1
              inline-block
              h-5
              w-[2px]
              bg-emerald-500
              animate-pulse
            "
          />
        </div>
      </div>
    </div>
  );
}

// =========================================
// Compact Typing Animation
// =========================================

export function CompactTypingAnimation({ messages = defaultMessages }) {
  return (
    <TypingAnimation
      messages={messages}
      showIcon={false}
      typingSpeed={30}
      deletingSpeed={18}
      pauseTime={1000}
      className="
        rounded-2xl
        border
        border-emerald-100
        bg-emerald-50
        px-4
        py-3
      "
    />
  );
}

// =========================================
// Full AI Thinking Card
// =========================================

export function AIThinkingCard({
  messages = defaultMessages,
  title = "AI is working",
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          text-center
          gap-6
        "
      >
        {/* =============================== */}
        {/* Animated Icon Cluster */}
        {/* =============================== */}

        <div
          className="
            relative
            h-28
            w-28
          "
        >
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
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-emerald-500
                to-green-600
                text-white
                shadow-lg
              "
            >
              <Brain size={28} />
            </div>
          </div>

          <div
            className="
              absolute
              -top-2
              -right-2
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-emerald-600
              shadow-md
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
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-green-600
              shadow-md
            "
          >
            <Leaf size={18} />
          </div>

          <div
            className="
              absolute
              -bottom-3
              -right-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-orange-500
              shadow-md
            "
          >
            <ChefHat size={18} />
          </div>
        </div>

        {/* =============================== */}
        {/* Title */}
        {/* =============================== */}

        <div>
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

          <TypingAnimation messages={messages} showIcon={false} />
        </div>

        {/* =============================== */}
        {/* Dots */}
        {/* =============================== */}

        <div
          className="
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
    </div>
  );
}
