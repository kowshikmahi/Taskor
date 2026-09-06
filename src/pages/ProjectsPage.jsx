import React, { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { getClients } from "../services/clientsService";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../services/projectsService";

const emptyForm = {
  name: "",
  description: "",
  client: "",
  status: "Planning",
  progress: 0,
  dueDate: "",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      const [projectsData, clientsData] = await Promise.all([getProjects(), getClients()]);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setClients(Array.isArray(clientsData) ? clientsData : []);
    } catch (err) {
      setError(err.message || "Failed to load projects");
      setProjects([]);
      setClients([]);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingProject(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  }

  function openEditModal(project) {
    setEditingProject(project);
    setForm({
      name: project.name || "",
      description: project.description || "",
      client: project.client?._id || "",
      status: project.status || "Planning",
      progress: project.progress ?? 0,
      dueDate: project.dueDate ? project.dueDate.slice(0, 10) : "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingProject(null);
    setForm(emptyForm);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        client: form.client || null,
        dueDate: form.dueDate || null,
      };

      if (editingProject) {
        const updated = await updateProject(editingProject._id, payload);
        setProjects((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      } else {
        const created = await createProject(payload);
        setProjects((prev) => [created, ...prev]);
      }

      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete project");
    }
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 glass rounded-3xl p-5 shadow-card sm:p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-taskor-purple">
            Project delivery
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-taskor-ink">Projects</h1>
          <p className="mt-2 text-sm text-taskor-slate">
            Track client projects, progress, deadlines, and delivery status.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card sm:w-auto"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="glass rounded-3xl p-5 shadow-card sm:p-6">
        {loading ? (
          <p className="text-sm text-taskor-slate">Loading projects...</p>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-taskor-mist p-8 text-center">
            <h3 className="text-lg font-semibold text-taskor-ink">No projects yet</h3>
            <p className="mt-2 text-sm text-taskor-slate">
              Create your first project and connect it to a client if needed.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {projects.map((project) => (
              <div key={project._id} className="rounded-3xl border border-white/55 bg-white/45 p-5 backdrop-blur dark:bg-white/10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-bold text-taskor-ink">{project.name}</h3>
                    <p className="mt-1 text-sm text-taskor-slate">
                      {project.client?.name
                        ? `Client: ${project.client.name}`
                        : "No client linked"}
                    </p>
                  </div>

                  <span className="w-fit flex-shrink-0 rounded-full bg-taskor-cloud px-3 py-1 text-xs font-semibold text-taskor-ink">
                    {project.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-taskor-slate">
                  {project.description || "No description added yet."}
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-taskor-slate">Progress</span>
                    <span className="font-semibold text-taskor-ink">{project.progress || 0}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-taskor-cloud">
                    <div
                      className="h-full rounded-full bg-taskor-gradient"
                      style={{ width: `${project.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/40 pt-4">
                  <span className="text-xs text-taskor-slate">
                    Due: {project.dueDate ? project.dueDate.slice(0, 10) : "No deadline"}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-taskor-mist px-3 py-1.5 text-xs font-semibold text-taskor-ink transition hover:border-taskor-purple hover:text-taskor-purple"
                      aria-label={`Edit ${project.name}`}
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                      aria-label={`Delete ${project.name}`}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/90 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-taskor-ink">
                {editingProject ? "Edit Project" : "Add Project"}
              </h2>
              <button onClick={closeModal} className="rounded-xl p-2 text-taskor-slate hover:bg-white/60">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Website Redesign"
                  className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                  Client
                </label>
                <select
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                >
                  <option value="">No Client (Internal)</option>
                  {clients.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name} {c.company ? `(${c.company})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                  Progress ({form.progress}%)
                </label>
                <input
                  type="range"
                  name="progress"
                  min="0"
                  max="100"
                  value={form.progress}
                  onChange={handleChange}
                  className="w-full accent-taskor-purple"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Project scope and details..."
                  className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-taskor-mist px-5 py-2.5 text-sm font-semibold text-taskor-ink hover:bg-white/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-2xl bg-taskor-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card disabled:opacity-70"
                >
                  {saving ? "Saving..." : editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
