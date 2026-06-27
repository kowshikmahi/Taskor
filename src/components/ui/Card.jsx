import React from "react";
import clsx from "clsx";

export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover",
        className
      )}
    >
      {children}
    </div>
  );
}
