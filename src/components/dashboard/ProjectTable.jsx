import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Taskor Landing Page",
    client: "Internal",
    progress: 92,
    due: "28 Jun",
    status: "Completed",
  },
  {
    name: "Mobile Dashboard",
    client: "Acme Inc.",
    progress: 74,
    due: "03 Jul",
    status: "In Progress",
  },
  {
    name: "CRM Integration",
    client: "TechNova",
    progress: 48,
    due: "12 Jul",
    status: "Planning",
  },
];

export default function ProjectTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-[28px] p-8 shadow-card"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-taskor-ink">
            Recent Projects
          </h2>

          <p className="text-slate-500 mt-1">
            Latest project progress
          </p>
        </div>

        <button className="text-taskor-purple font-semibold">
          View All
        </button>
      </div>

      <div className="space-y-8">

        {projects.map((project) => (

          <div key={project.name}>

            <div className="flex justify-between mb-3">

              <div>

                <h3 className="font-semibold">

                  {project.name}

                </h3>

                <p className="text-sm text-slate-500">

                  {project.client}

                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold">

                  {project.progress}%

                </p>

                <p className="text-xs text-slate-400">

                  {project.due}

                </p>

              </div>

            </div>

            <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${project.progress}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full bg-taskor-gradient rounded-full"
              />

            </div>

          </div>

        ))}

      </div>

    </motion.div>
  );
}
