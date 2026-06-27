import React from "react";
import clsx from "clsx";

export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="font-medium text-sm">
          {label}
        </label>
      )}

      <input
        className={clsx(
          "input",
          error &&
            "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}
