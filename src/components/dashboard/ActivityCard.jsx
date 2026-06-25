import React from "react";

const activity = [
  "BlueCart project moved to Review",
  "Invoice #102 sent to OptiCare",
  "New task added to SEO Portfolio Revamp",
  "Client feedback received for Landing Page",
];

export default function ActivityCard() {
  return (
    <div className="rounded-3xl border border-taskor-mist bg-white p-6 shadow-card">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-taskor-ink">Recent Activity</h2>
        <p className="mt-1 text-sm text-taskor-slate">
          Latest updates across your workspace.
        </p>
      </div>

      <div className="space-y-4">
        {activity.map((item, index) => (
          <div key={item} className="flex gap-3">
            <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-taskor-purple" />
            <div>
              <p className="text-sm font-medium text-taskor-ink">{item}</p>
              <p className="mt-1 text-xs text-taskor-slate">
                {index + 1}h ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}