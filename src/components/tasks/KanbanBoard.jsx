import React from "react";
import TaskColumn from "./TaskColumn";

const columns = ["Todo", "In Progress", "Review", "Done"];

export default function KanbanBoard({ tasks }) {
  return (
    <section className="overflow-x-auto">
      <div className="grid min-w-[1100px] grid-cols-4 gap-5">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column);

          return (
            <TaskColumn
              key={column}
              title={column}
              tasks={columnTasks}
            />
          );
        })}
      </div>
    </section>
  );
}