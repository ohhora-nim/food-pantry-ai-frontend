import React from "react";

function Card({
  children,
  className = ""
}) {

  return (

    <div
      className={`
        bg-white/80
        backdrop-blur-lg

        border
        border-gray-200

        rounded-3xl
        shadow-lg

        p-6

        transition-all
        duration-300

        hover:shadow-2xl
        hover:scale-[1.01]

        ${className}
      `}
    >

      {children}

    </div>
  );
}

export default Card;
