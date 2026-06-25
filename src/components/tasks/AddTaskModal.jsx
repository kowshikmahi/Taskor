import React, { useState } from "react";

export default function AddTaskModal({
  open,
  onClose,
  onSubmit,
  projectOptions = [],
}) {
  const [form, setForm] = useState({
    title: "",
    project: projectOptions[0]?.name || "",
    client: projectOptions[0]?.client || "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
    assignee: "Kowshik",
    description: "",
  });

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "project") {
      const selectedProject = projectOptions.find((p) => p.name === value);
      setForm((prev) => ({
        ...prev,
        project: value,
        client: selectedProject?.client || "",
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.project || !form.dueDate) return;

    onSubmit(form);

    setForm({
      title: "",
      project: projectOptions[0]?.name || "",
      client: projectOptions[0]?.client || "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
      assignee: "Kowshik",
      description: "",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-taskor-ink/50 px-4">
      <div className="w-full max-w-2xl rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-taskor-ink">Add New Task</h2>
            <p className="mt-2 text-sm text-taskor-slate">
              Create a task and connect it to a project workflow.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-taskor-slate hover:bg-taskor-cloud"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Task Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Build pricing section UI"
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Project
            </label>
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            >
              {projectOptions.map((project) => (
                <option key={project.name} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the task scope, expected output, or delivery notes..."
              className="w-full rounded-2xl border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-btn border border-taskor-mist px-5 py-3 text-sm font-semibold text-taskor-slate hover:bg-taskor-cloud"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}