import React from "react";
const colors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
  Completed: "bg-taskor-purple/10 text-taskor-purple",
};

export default function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-hover cursor-pointer">

      <h3 className="font-semibold text-taskor-ink">

        {task.title}

      </h3>

      <p className="text-sm text-slate-500 mt-2">

        {task.description}

      </p>

      <div className="flex justify-between items-center mt-5">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[task.priority]}`}
        >
          {task.priority}
        </span>

        <div className="w-9 h-9 rounded-full bg-taskor-gradient flex items-center justify-center text-white text-sm font-semibold">

          {task.assignee}

        </div>

      </div>

    </div>
  );
}
