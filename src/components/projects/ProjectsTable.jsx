import React from "react";

function statusStyles(status) {
  switch (status) {
    case "Planning":
      return "bg-sky-100 text-sky-700";
    case "Active":
      return "bg-violet-100 text-violet-700";
    case "Review":
      return "bg-amber-100 text-amber-700";
    case "Completed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function priorityStyles(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function ProjectsTable({ projects }) {
  return (
    <section className="rounded-3xl border border-taskor-mist bg-white p-6 shadow-card">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-taskor-ink">Project Directory</h2>
        <p className="mt-1 text-sm text-taskor-slate">
          View client-linked projects, progress, priority, due dates, and budget.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-taskor-mist bg-taskor-cloud px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-taskor-ink">No projects found</h3>
          <p className="mt-2 text-sm text-taskor-slate">
            Try changing the search or filter settings.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-taskor-slate">
                <th className="pb-2 font-semibold">Project</th>
                <th className="pb-2 font-semibold">Client</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 font-semibold">Priority</th>
                <th className="pb-2 font-semibold">Due Date</th>
                <th className="pb-2 font-semibold">Budget</th>
                <th className="pb-2 font-semibold">Progress</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="rounded-l-2xl bg-taskor-cloud px-4 py-4">
                    <p className="font-semibold text-taskor-ink">{project.name}</p>
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4 text-taskor-slate">
                    {project.client}
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles(
                        project.priority
                      )}`}
                    >
                      {project.priority}
                    </span>
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4 text-taskor-slate">
                    {project.dueDate}
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4 text-taskor-slate">
                    {project.budget}
                  </td>

                  <td className="rounded-r-2xl bg-taskor-cloud px-4 py-4">
                    <div className="min-w-[140px]">
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-taskor-slate">
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-taskor-mist">
                        <div
                          className="h-2 rounded-full bg-taskor-gradient"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}