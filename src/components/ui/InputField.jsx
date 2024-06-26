// InputField.js
import React from "react";
import { cn } from "../../utils/cn";

function InputField({
  id,
  label,
  type,
  name,
  value,
  onChange,
  required,
  login,
  placeholder,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id || ""}
        className={cn(
          "border-2 border-black",
          login && "w-6/12 py-2 rounded-md pl-3 border-none"
        )}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required || false}
      />
    </>
  );
}

export default InputField;
