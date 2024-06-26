// CheckboxField.js
import React from "react";

function CheckboxField({ id, label, name, checked, onChange }) {
  return (
    <div className="">
      <label htmlFor={id}>{label}</label>
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
