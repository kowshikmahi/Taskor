import React from "react";
import clsx from "clsx";

export default function Textarea({
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

      <textarea
        rows={5}
        className={clsx(
          "input resize-none",
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
