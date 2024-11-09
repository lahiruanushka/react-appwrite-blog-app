import React from "react";
import { LuFileText } from "react-icons/lu";

// eslint-disable-next-line react/display-name
const Input = React.forwardRef(
  ({ label, type = "text", error, icon: Icon = LuFileText, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={ref}
            type={type}
            className={`
            block w-full pl-10 pr-3 py-2.5 border rounded-lg
            bg-gray-50 dark:bg-gray-700 
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
            focus:border-transparent
            placeholder-gray-400 dark:placeholder-gray-500
            transition-colors duration-200
            ${error ? "border-red-500 focus:ring-red-500" : ""}
          `}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Input;