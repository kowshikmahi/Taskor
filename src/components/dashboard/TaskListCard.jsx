import React from "react";

const tasks = [
  { title: "Finalize hero section copy", time: "10:00 AM", priority: "High" },
  { title: "Send client revision update", time: "12:30 PM", priority: "Medium" },
  { title: "Review signup page UX", time: "3:00 PM", priority: "High" },
  { title: "Plan API schema for clients module", time: "5:30 PM", priority: "Low" },
];

function priorityStyle(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function TaskListCard() {
  return (
    <div className="rounded-3xl border border-taskor-mist bg-white p-6 shadow-card">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-taskor-ink">Today’s Tasks</h2>
        <p className="mt-1 text-sm text-taskor-slate">
          Your upcoming action items and priorities.
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="rounded-2xl border border-taskor-mist bg-taskor-cloud p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-taskor-ink">{task.title}</h3>
                <p className="mt-1 text-sm text-taskor-slate">{task.time}</p>
              </div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}