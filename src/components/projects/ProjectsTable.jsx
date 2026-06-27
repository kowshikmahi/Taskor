import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Taskor Website",
    client: "Internal",
    progress: 92,
    due: "28 Jun",
    status: "Completed",
  },
  {
    id: 2,
    name: "CRM Dashboard",
    client: "Acme",
    progress: 74,
    due: "4 Jul",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Inventory App",
    client: "TechNova",
    progress: 36,
    due: "18 Jul",
    status: "Planning",
  },
];

const badge = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-purple-100 text-taskor-purple",
  Planning: "bg-yellow-100 text-yellow-700",
};

export default function ProjectTable() {
  return (
    <div className="glass rounded-[30px] overflow-hidden shadow-card">

      <table className="w-full">

        <thead className="bg-taskor-cloud">

          <tr>

            <th className="px-8 py-5 text-left">Project</th>
            <th>Client</th>
            <th>Progress</th>
            <th>Due Date</th>
            <th>Status</th>
            <th></th>

          </tr>

        </thead>

        <tbody>

          {projects.map(project => (

            <tr
              key={project.id}
              className="border-t border-slate-100 hover:bg-taskor-cloud transition"
            >

              <td className="px-8 py-6">

                <div>

                  <h3 className="font-semibold">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    #{project.id}
                  </p>

                </div>

              </td>

              <td>{project.client}</td>

              <td className="w-60">

                <div>

                  <div className="flex justify-between mb-2">

                    <span>{project.progress}%</span>

                  </div>

                  <div className="h-2 bg-slate-200 rounded-full">

                    <div
                      className="h-2 rounded-full bg-taskor-gradient"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                </div>

              </td>

              <td>{project.due}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${badge[project.status]}`}
                >
                  {project.status}
                </span>

              </td>

              <td>

                <div className="flex gap-3 justify-center">

                  <button>

                    <Eye
                      size={18}
                      className="text-slate-500 hover:text-taskor-purple"
                    />

                  </button>

                  <button>

                    <Pencil
                      size={18}
                      className="text-slate-500 hover:text-taskor-purple"
                    />

                  </button>

                  <button>

                    <Trash2
                      size={18}
                      className="text-red-500"
                    />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
