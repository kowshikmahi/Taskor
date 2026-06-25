import React from "react";

function statusStyles(status) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Lead":
      return "bg-amber-100 text-amber-700";
    case "Inactive":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-violet-100 text-violet-700";
  }
}

export default function ClientsTable({ clients }) {
  return (
    <section className="rounded-3xl border border-taskor-mist bg-white p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-taskor-ink">Client Directory</h2>
          <p className="mt-1 text-sm text-taskor-slate">
            View client information, status, projects, and billing summary.
          </p>
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-taskor-mist bg-taskor-cloud px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-taskor-ink">No clients found</h3>
          <p className="mt-2 text-sm text-taskor-slate">
            Try changing the search or filter settings.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-taskor-slate">
                <th className="pb-2 font-semibold">Client</th>
                <th className="pb-2 font-semibold">Contact</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 font-semibold">Projects</th>
                <th className="pb-2 font-semibold">Billed</th>
                <th className="pb-2 font-semibold">Last Activity</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="rounded-l-2xl bg-taskor-cloud px-4 py-4">
                    <div>
                      <p className="font-semibold text-taskor-ink">{client.name}</p>
                      <p className="mt-1 text-sm text-taskor-slate">{client.company}</p>
                    </div>
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4">
                    <p className="font-medium text-taskor-ink">{client.contactPerson}</p>
                    <p className="mt-1 text-sm text-taskor-slate">{client.email}</p>
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(
                        client.status
                      )}`}
                    >
                      {client.status}
                    </span>
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4 text-taskor-slate">
                    {client.projects}
                  </td>

                  <td className="bg-taskor-cloud px-4 py-4 text-taskor-slate">
                    {client.totalBilled}
                  </td>

                  <td className="rounded-r-2xl bg-taskor-cloud px-4 py-4 text-taskor-slate">
                    {client.lastActivity}
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