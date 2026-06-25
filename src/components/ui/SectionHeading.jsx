import React from "react";

export default function SectionHeading({ badge, title, subtitle, center = false }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {badge && (
        <div className="mb-4 inline-flex rounded-full border border-taskor-mist bg-taskor-cloud px-4 py-2 text-sm font-medium text-taskor-slate">
          {badge}
        </div>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-taskor-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-8 text-taskor-slate">
          {subtitle}
        </p>
      )}
    </div>
  );
}
