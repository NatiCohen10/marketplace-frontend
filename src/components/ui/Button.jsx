import React from "react";
import { cn } from "../../utils/cn";

function CustomButton({ children, formButton, onClick, formExit, logout }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        " p-3 rounded-full hover:-translate-y-2 transition hover:bg-gray-300 flex justify-center items-center",
        formButton &&
          "self-center bg-blue-600 w-44 text-white h-11 mt-7 hover:bg-blue-700 lg:w-64",
        formExit && " absolute -left-14 -top-2 hover:-translate-y-0",
        logout &&
          "bg-red-500 text-white hover:bg-red-700 hover:translate-y-0 w-64"
      )}
    >
      {children}
    </button>
  );
}

export default CustomButton;
