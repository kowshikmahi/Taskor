import React from "react";
import { motion } from "framer-motion";

const tasks = [
  {
    title: "Design Dashboard",
    project: "Taskor",
    status: "In Progress",
  },
  {
    title: "Fix Authentication",
    project: "Backend",
    status: "Completed",
  },
  {
    title: "Client Meeting",
    project: "TechNova",
    status: "Pending",
  },
  {
    title: "Deploy API",
    project: "Production",
    status: "Review",
  },
];

const badge = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Review: "bg-orange-100 text-orange-700",
  "In Progress": "bg-purple-100 text-taskor-purple",
};

export default function TaskListCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-[28px] p-8 shadow-card"
    >
      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">

            Recent Tasks

          </h2>

          <p className="text-slate-500">

            Latest activity

          </p>

        </div>

      </div>

      <div className="space-y-6">

        {tasks.map((task) => (

          <div
            key={task.title}
            className="flex justify-between items-center border-b border-slate-100 pb-4"
          >

            <div>

              <h3 className="font-semibold">

                {task.title}

              </h3>

              <p className="text-sm text-slate-500">

                {task.project}

              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${badge[task.status]}`}
            >
              {task.status}
            </span>

          </div>

        ))}

      </div>

    </motion.div>
  );
}
