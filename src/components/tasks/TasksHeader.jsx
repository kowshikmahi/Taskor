import React from "react";

function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white">
      <p className="text-xs uppercase tracking-[0.16em] text-white/75">{label}</p>
      <h3 className="mt-1 text-2xl font-bold">{value}</h3>
    </div>
  );
}

export default function TasksHeader({ stats, onAddTask }) {
  return (
    <section className="rounded-[32px] bg-taskor-gradient p-6 text-white shadow-card sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-white/80">Task Workflow</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Move work from idea to done inside one Kanban workflow.
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
            Organize tasks by project, track deadlines, assign ownership, and keep
            your client work flowing through a structured delivery pipeline.
          </p>
        </div>

        <button
          onClick={onAddTask}
          className="rounded-btn bg-white px-5 py-3 text-sm font-semibold text-taskor-ink shadow-card transition hover:scale-[1.02]"
        >
          + Add Task
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatPill label="Total" value={stats.total} />
        <StatPill label="Todo" value={stats.todo} />
        <StatPill label="In Progress" value={stats.inProgress} />
        <StatPill label="Review" value={stats.review} />
        <StatPill label="Done" value={stats.done} />
      </div>
    </section>
  );
}