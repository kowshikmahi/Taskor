import React from "react";

export default function StatCard({ title, value, subtext }) {
  return (
    <div className="rounded-3xl border border-taskor-mist bg-white p-5 shadow-card">
      <p className="text-sm font-medium text-taskor-slate">{title}</p>
      <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-taskor-ink">
        {value}
      </h3>
      <p className="mt-2 text-sm text-taskor-slate">{subtext}</p>
    </div>
  );
}