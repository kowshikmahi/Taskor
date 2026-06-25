import React from "react";

const projects = [
  {
    name: "Taskor Landing Page",
    client: "Internal",
    status: "In Progress",
    due: "28 Jun",
  },
  {
    name: "E-commerce Redesign",
    client: "BlueCart",
    status: "Review",
    due: "30 Jun",
  },
  {
    name: "Clinic Dashboard",
    client: "OptiCare",
    status: "Planning",
    due: "04 Jul",
  },
  {
    name: "SEO Portfolio Revamp",
    client: "Personal Brand",
    status: "Done",
    due: "18 Jun",
  },
];

function badgeStyles(status) {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-700";
    case "Review":
      return "bg-amber-100 text-amber-700";
    case "Planning":
      return "bg-sky-100 text-sky-700";
    default:
      return "bg-violet-100 text-violet-700";
  }
}

export default function ProjectTable() {
  return (
    <div className="rounded-3xl border border-taskor-mist bg-white p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-taskor-ink">Active Projects</h2>
          <p className="mt-1 text-sm text-taskor-slate">
            Track project status, deadlines, and delivery stage.
          </p>
        </div>
        <button className="text-sm font-semibold text-taskor-purple hover:underline">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-taskor-slate">
              <th className="pb-2 font-semibold">Project</th>
              <th className="pb-2 font-semibold">Client</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 font-semibold">Due</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.name}>
                <td className="rounded-l-2xl bg-taskor-cloud px-4 py-4 font-semibold text-taskor-ink">
                  {project.name}
                </td>
                <td className="bg-taskor-cloud px-4 py-4 text-taskor-slate">
                  {project.client}
                </td>
                <td className="bg-taskor-cloud px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="rounded-r-2xl bg-taskor-cloud px-4 py-4 text-taskor-slate">
                  {project.due}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}