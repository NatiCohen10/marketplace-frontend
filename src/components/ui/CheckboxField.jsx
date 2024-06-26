// CheckboxField.js
import React from "react";
import { cn } from "../../utils/cn";

function CheckboxField({ id, label, name, checked, onChange, stockCheck }) {
  return (
    <div
      className={cn(
        " flex w-32 sm:w-40 justify-between items-center sm:mb-3",
        stockCheck && " justify-start"
      )}
    >
      <label className=" font-semibold pr-4" htmlFor={id}>
        {label}
      </label>
      <input
        className="border-2 border-black"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default CheckboxField;
