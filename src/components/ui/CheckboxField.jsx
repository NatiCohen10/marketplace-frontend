// CheckboxField.js
import React from "react";

function CheckboxField({ id, label, name, checked, onChange }) {
  return (
    <div className="">
      <label>
        <input
          className="border-2 border-black"
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
}

export default CheckboxField;
