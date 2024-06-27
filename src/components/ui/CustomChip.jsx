import React from "react";
import { cn } from "../../utils/cn";

function CustomChip({ children, isActive, toggleActive, productChip }) {
  return (
    <button
      type="button"
      onClick={toggleActive}
      className={cn(
        "bg-white max-w-32 hover:bg-amber-300 p-2 my-4 rounded-3xl sm:max-w-44 lg:max-w-60 xl:max-w-80",
        isActive && "bg-secondary text-white hover:bg-amber-700",
        productChip &&
          "bg-secondary text-white hover:bg-secondary sm:max-w-32 my-0"
      )}
    >
      {children}
    </button>
  );
}

export default CustomChip;
