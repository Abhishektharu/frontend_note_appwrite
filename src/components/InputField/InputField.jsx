// src/components/InputField/InputField.jsx

import React from "react";

const Input = React.forwardRef(
  ({ label, type = "text", name, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          {...rest}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    );
  }
);

export default Input;
