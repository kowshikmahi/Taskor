import React from "react";
import clsx from "clsx";

export default function Select({
  label,
  options = [],
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

      <select
        className={clsx(
          "input",
          className
        )}
        {...props}
      >
        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>

    </div>
  );
}
