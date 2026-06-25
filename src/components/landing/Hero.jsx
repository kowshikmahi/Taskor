import React from "react";
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.15),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.12),_transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        {/* Left */}
        <div>
          <div className="mb-5 inline-flex items-center rounded-full border border-taskor-mist bg-taskor-cloud px-4 py-2 text-sm font-medium text-taskor-slate">
            Workflow-first platform for client work
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-taskor-ink sm:text-5xl lg:text-6xl">
            Run client work <span className="bg-taskor-gradient bg-clip-text text-transparent">without the chaos</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-taskor-slate">
            Taskor brings clients, projects, tasks, and team collaboration into one workflow-first workspace
            so you can plan, track, and deliver work faster.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-btn bg-taskor-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:scale-[1.02]">
              Start Free
            </button>
            <button className="rounded-btn border border-taskor-mist bg-white px-6 py-3.5 text-sm font-semibold text-taskor-ink transition hover:bg-taskor-cloud">
              See How It Works
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-taskor-slate">
            <div>✔ Clients & Projects</div>
            <div>✔ Tasks & Ownership</div>
            <div>✔ Team Collaboration</div>
          </div>
        </div>

        {/* Right - Dashboard mock */}
        <div className="relative">
          <div className="rounded-[28px] border border-taskor-mist bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-taskor-slate">Workspace Overview</p>
                <h3 className="mt-1 text-xl font-bold text-taskor-ink">Taskor Dashboard</h3>
              </div>
              <div className="rounded-full bg-taskor-cloud px-3 py-1 text-xs font-medium text-taskor-slate">
                Live workflow
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-taskor-cloud p-4">
                <p className="text-sm text-taskor-slate">Active Clients</p>
                <h4 className="mt-2 text-3xl font-bold text-taskor-ink">18</h4>
              </div>
              <div className="rounded-2xl bg-taskor-cloud p-4">
                <p className="text-sm text-taskor-slate">Open Projects</p>
                <h4 className="mt-2 text-3xl font-bold text-taskor-ink">26</h4>
              </div>
              <div className="rounded-2xl bg-taskor-cloud p-4">
                <p className="text-sm text-taskor-slate">Tasks Due</p>
                <h4 className="mt-2 text-3xl font-bold text-taskor-ink">43</h4>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-taskor-mist p-4">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-taskor-ink">Today’s Workflow</h4>
                <span className="text-xs text-taskor-slate">Updated just now</span>
              </div>

              <div className="space-y-3">
                {[
                  ["Landing page revision", "In Progress", "bg-blue-50 text-blue-600"],
                  ["Client feedback review", "Review", "bg-purple-50 text-purple-600"],
                  ["Invoice follow-up", "Done", "bg-green-50 text-green-600"],
                ].map(([task, status, color]) => (
                  <div key={task} className="flex items-center justify-between rounded-xl bg-taskor-cloud p-3">
                    <div>
                      <p className="font-medium text-taskor-ink">{task}</p>
                      <p className="text-sm text-taskor-slate">Assigned inside Taskor workflow</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-200/40 blur-2xl" />
          <div className="absolute -bottom-8 left-0 h-24 w-24 rounded-full bg-blue-200/40 blur-2xl" />
        </div>
      </div>
    </section>
  );
}