import React from "react";

function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white">
      <p className="text-xs uppercase tracking-[0.16em] text-white/75">{label}</p>
      <h3 className="mt-1 text-2xl font-bold">{value}</h3>
    </div>
  );
}

export default function ClientsHeader({ stats, onAddClient }) {
  return (
    <section className="rounded-[32px] bg-taskor-gradient p-6 text-white shadow-card sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-white/80">Clients Workspace</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Manage all your client relationships in one place.
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
            Keep contact details, project relationships, billing history, and activity context together so your workflow stays organized.
          </p>
        </div>

        <button
          onClick={onAddClient}
          className="rounded-btn bg-white px-5 py-3 text-sm font-semibold text-taskor-ink shadow-card transition hover:scale-[1.02]"
        >
          + Add Client
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatPill label="Total Clients" value={stats.total} />
        <StatPill label="Active" value={stats.active} />
        <StatPill label="Leads" value={stats.leads} />
        <StatPill label="Inactive" value={stats.inactive} />
      </div>
    </section>
  );
}