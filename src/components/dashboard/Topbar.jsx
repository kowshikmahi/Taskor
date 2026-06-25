import React from "react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-taskor-mist bg-taskor-cloud/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-medium text-taskor-slate">Workspace</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-taskor-ink">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-btn border border-taskor-mist bg-white px-4 py-2 text-sm font-medium text-taskor-slate hover:bg-taskor-cloud">
            Search
          </button>
          <button className="rounded-btn bg-taskor-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card">
            + New Project
          </button>
        </div>
      </div>
    </header>
  );
}