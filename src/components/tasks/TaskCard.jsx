import React from "react";

function priorityStyles(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function TaskCard({ task }) {
  return (
    <article className="rounded-2xl border border-taskor-mist bg-taskor-cloud p-4 transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-bold leading-6 text-taskor-ink">{task.title}</h4>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${priorityStyles(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="mt-2 text-xs leading-6 text-taskor-slate">{task.description}</p>

      <div className="mt-4 rounded-2xl bg-white px-3 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-taskor-slate">
          Project
        </p>
        <p className="mt-1 text-sm font-semibold text-taskor-ink">{task.project}</p>
        <p className="mt-1 text-xs text-taskor-slate">{task.client}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-taskor-slate">
        <span>Due: {task.dueDate}</span>
        <span>{task.assignee}</span>
      </div>
    </article>
  );
}