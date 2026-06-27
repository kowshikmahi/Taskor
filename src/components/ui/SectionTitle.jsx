import React from "react";
export default function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="mb-8">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-taskor-slate mt-2">
        {subtitle}
      </p>

    </div>
  );
}
