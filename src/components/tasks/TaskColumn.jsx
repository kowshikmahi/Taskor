import React from "react";
import TaskCard from "./TaskCard";

function getColumnStyles(title) {
  switch (title) {
    case "Todo":
      return {
        dot: "bg-slate-400",
        badge: "bg-slate-100 text-slate-700",
      };
    case "In Progress":
      return {
        dot: "bg-violet-500",
        badge: "bg-violet-100 text-violet-700",
      };
    case "Review":
      return {
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-700",
      };
    case "Done":
      return {
        dot: "bg-green-500",
        badge: "bg-green-100 text-green-700",
      };
    default:
      return {
        dot: "bg-slate-400",
        badge: "bg-slate-100 text-slate-700",
      };
  }
}

export default function TaskColumn({ title, tasks }) {
  const styles = getColumnStyles(title);

  return (
    <div className="rounded-3xl border border-taskor-mist bg-white p-4 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
          <h3 className="text-sm font-bold text-taskor-ink">{title}</h3>
        </div>

        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-taskor-mist bg-taskor-cloud px-4 py-8 text-center text-sm text-taskor-slate">
            No tasks here
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}