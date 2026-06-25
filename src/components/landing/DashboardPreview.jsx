import SectionHeading from "../ui/SectionHeading";
import React from "react";

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        badge="Dashboard"
        title="See projects, priorities, and progress at a glance"
        subtitle="Taskor gives you one operational view of your work so you always know what needs attention next."
        center
      />

      <div className="mt-14 rounded-[28px] border border-taskor-mist bg-white p-6 shadow-card lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[24px] border border-taskor-mist p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-taskor-slate">Overview</p>
                <h3 className="text-xl font-bold text-taskor-ink">Project Performance</h3>
              </div>
              <div className="rounded-full bg-taskor-cloud px-3 py-1 text-xs font-medium text-taskor-slate">
                This week
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-taskor-cloud p-4">
                <p className="text-sm text-taskor-slate">Completed</p>
                <h4 className="mt-2 text-2xl font-bold text-taskor-ink">124</h4>
              </div>
              <div className="rounded-2xl bg-taskor-cloud p-4">
                <p className="text-sm text-taskor-slate">In Progress</p>
                <h4 className="mt-2 text-2xl font-bold text-taskor-ink">31</h4>
              </div>
              <div className="rounded-2xl bg-taskor-cloud p-4">
                <p className="text-sm text-taskor-slate">Overdue</p>
                <h4 className="mt-2 text-2xl font-bold text-taskor-ink">7</h4>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Brand redesign sprint", 82],
                ["SEO landing page launch", 63],
                ["Client onboarding setup", 47],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-taskor-ink">{label}</span>
                    <span className="text-taskor-slate">{value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-taskor-cloud">
                    <div
                      className="h-3 rounded-full bg-taskor-gradient"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-taskor-mist p-5">
            <h3 className="text-xl font-bold text-taskor-ink">Upcoming Tasks</h3>
            <div className="mt-5 space-y-3">
              {[
                ["Client review call", "Tomorrow", "bg-purple-50 text-purple-600"],
                ["Homepage revisions", "Today", "bg-blue-50 text-blue-600"],
                ["Send invoice batch", "Friday", "bg-green-50 text-green-600"],
                ["Project handoff notes", "Monday", "bg-orange-50 text-orange-600"],
              ].map(([task, due, color]) => (
                <div key={task} className="rounded-2xl bg-taskor-cloud p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-taskor-ink">{task}</p>
                      <p className="mt-1 text-sm text-taskor-slate">Managed in Taskor workflow</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
                      {due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}