import React, { useState } from "react";

export default function AddProjectModal({
  open,
  onClose,
  onSubmit,
  clientOptions = [],
}) {
  const [form, setForm] = useState({
    name: "",
    client: clientOptions[0] || "",
    status: "Planning",
    priority: "Medium",
    dueDate: "",
    budget: "",
  });

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.client || !form.dueDate || !form.budget) return;

    onSubmit(form);

    setForm({
      name: "",
      client: clientOptions[0] || "",
      status: "Planning",
      priority: "Medium",
      dueDate: "",
      budget: "",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-taskor-ink/50 px-4">
      <div className="w-full max-w-2xl rounded-[28px] bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-taskor-ink">Add New Project</h2>
            <p className="mt-2 text-sm text-taskor-slate">
              Create a project and link it to a client workspace.
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
              Project Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="BlueCart E-commerce Redesign"
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-taskor-ink">
              Client
            </label>
            <select
              name="client"
              value={form.client}
              onChange={handleChange}
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
            >
              {clientOptions.map((client) => (
                <option key={client} value={client}>
                  {client}
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
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
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
              Budget
            </label>
            <input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="₹20,000"
              className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10"
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
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}