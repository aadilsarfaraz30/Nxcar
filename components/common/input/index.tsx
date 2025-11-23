"use client";

import React, { useState } from "react";

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inputClassName?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  inputClassName = "",
}) => {
  const [focused, setFocused] = useState(false);

  const isFloated = focused || value.length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Floating Label */}
      <label
        className={`
          absolute left-3 
          pointer-events-none 
          text-gray-500 dark:text-gray-400
          transition-all duration-200 ease-in-out

          ${isFloated 
            ? "text-xs -top-2 bg-white px-1" 
            : "top-1/2 -translate-y-1/2 text-sm"
          }
        `}
      >
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full px-3 py-3
          bg-transparent
          border border-gray-300 dark:border-gray-700 
          rounded-md 
          text-gray-800 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${inputClassName}
        `}
      />
    </div>
  );
};

export default FloatingInput;
