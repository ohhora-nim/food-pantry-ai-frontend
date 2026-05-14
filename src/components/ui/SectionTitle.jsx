import React from "react";

function SectionTitle({
  icon,
  title
}) {

  return (

    <div className="mb-6">

      <h2
        className="
          text-3xl
          font-bold
          text-gray-800

          flex
          items-center
          gap-3
        "
      >

        <span>
          {icon}
        </span>

        {title}

      </h2>

    </div>
  );
}

export default SectionTitle;
