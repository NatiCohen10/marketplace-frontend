// InputField.js
import React from "react";

function InputField({ id, label, type, name, value, onChange, ref }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id || ""}
        className="border-2 border-black"
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        ref={ref}
      />
    </div>
  );
}

export default InputField;
