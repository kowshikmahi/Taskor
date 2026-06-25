import React from "react";

export default function ClientFilters({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <section className="rounded-3xl border border-taskor-mist bg-white p-5 shadow-card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-xl">
          <label className="mb-2 block text-sm font-semibold text-taskor-ink">
            Search clients
          </label>
          <input
            type="text"
            placeholder="Search by client, contact person, or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-btn border border-taskor-mist bg-white px-4 py-3 text-taskor-ink outline-none transition focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
          />
        </div>

        <div className="w-full lg:max-w-xs">
          <label className="mb-2 block text-sm font-semibold text-taskor-ink">
            Filter by status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-btn border border-taskor-mist bg-white px-4 py-3 text-taskor-ink outline-none transition focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Lead">Lead</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </section>
  );
}