import React from "react";
import { cn } from "../../utils/cn";

const InputField = React.forwardRef(
  (
    { id, label, type, name, value, onChange, required, login, placeholder },
    ref
  ) => {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          id={id || ""}
          className={cn(
            "border border-black rounded-md p-1 px-2 ml-3",
            login &&
              " py-2 rounded-md pl-3 border-none sm:w-8/12 ml-0 lg:w-10/12 "
          )}
          type={type}
          name={name}
          value={value ? value : ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required || false}
        />
      </>
    );
  }
);

export default InputField;
