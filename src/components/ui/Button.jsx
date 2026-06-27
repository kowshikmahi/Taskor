import clsx from "clsx";
import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-taskor-gradient text-white hover:scale-[1.02] hover:shadow-hover",

    secondary:
      "bg-white border border-gray-200 text-taskor-ink hover:bg-gray-50",

    outline:
      "border border-taskor-purple text-taskor-purple hover:bg-taskor-purple hover:text-white",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",

    md: "px-5 py-3",

    lg: "px-7 py-4 text-lg",
  };

  return (
    <button
      {...props}
      className={clsx(
        "rounded-2xl font-semibold transition duration-300 flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}