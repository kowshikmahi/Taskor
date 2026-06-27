import React from "react";
import TaskCard from "./TaskCard";

export default function TaskColumn({
  title,
  tasks,
}) {
  return (
    <div className="glass rounded-[28px] p-5 shadow-card">

      <div className="flex justify-between items-center mb-6">

        <h2 className="font-bold text-lg">

          {title}

        </h2>

        <span className="bg-taskor-cloud px-3 py-1 rounded-full text-sm">

          {tasks.length}

        </span>

      </div>

      <div className="space-y-5">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}

      </div>

    </div>
  );
}
