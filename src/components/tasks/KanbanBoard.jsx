import React from "react";
import TaskColumn from "./TaskColumn";

const board = {
  todo: [
    {
      id: 1,
      title: "Design Landing Page",
      description: "Finish Hero section",
      priority: "High",
      assignee: "KM",
    },
    {
      id: 2,
      title: "Authentication",
      description: "JWT Login",
      priority: "Medium",
      assignee: "KM",
    },
  ],

  progress: [
    {
      id: 3,
      title: "Dashboard",
      description: "Charts & Stats",
      priority: "High",
      assignee: "KM",
    },
  ],

  review: [
    {
      id: 4,
      title: "Backend API",
      description: "Testing Routes",
      priority: "Medium",
      assignee: "KM",
    },
  ],

  done: [
    {
      id: 5,
      title: "Database Setup",
      description: "MongoDB Connected",
      priority: "Completed",
      assignee: "KM",
    },
  ],
};

export default function KanbanBoard() {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-6">

      <TaskColumn
        title="To Do"
        tasks={board.todo}
      />

      <TaskColumn
        title="In Progress"
        tasks={board.progress}
      />

      <TaskColumn
        title="Review"
        tasks={board.review}
      />

      <TaskColumn
        title="Done"
        tasks={board.done}
      />

    </div>
  );
}
