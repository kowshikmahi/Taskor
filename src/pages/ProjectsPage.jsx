import React, { useEffect, useState } from "react";
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
      setProjects(projectsData);
      setClients(clientsData);
    } catch (err) {
      setError(err.message || "Failed to load projects");
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
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
          className="rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card"
        >
          + Add Project
        </button>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
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
          <div className="grid gap-5 xl:grid-cols-2">
            {projects.map((project) => (
              <div key={project._id} className="rounded-3xl border border-taskor-cloud p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-taskor-ink">{project.name}</h3>
                    <p className="mt-1 text-sm text-taskor-slate">
                      {project.client?.name
                        ? `Client: ${project.client.name}`
                        : "No client linked"}
                    </p>
                  </div>

                  <span className="rounded-full bg-taskor-cloud px-3 py-1 text-xs font-semibold text-taskor-ink">
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

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm text-taskor-slate">
                    Due:{" "}
                    <span className="font-semibold text-taskor-ink">
                      {project.dueDate
                        ? new Date(project.dueDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="rounded-btn border border-taskor-mist px-3 py-2 text-sm font-medium text-taskor-ink"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="rounded-btn border border-red-200 px-3 py-2 text-sm font-medium text-red-600"
                    >
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-taskor-ink/40 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-taskor-ink">
                  {editingProject ? "Edit Project" : "Add Project"}
                </h2>
                <p className="mt-1 text-sm text-taskor-slate">
                  Keep your project delivery workflow organized.
                </p>
              </div>
              <button onClick={closeModal} className="text-2xl leading-none text-taskor-slate">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">
                    Project Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Client</label>
                  <select
                    name="client"
                    value={form.client}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  >
                    <option value="">No client</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="progress"
                    value={form.progress}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-btn border border-taskor-mist px-4 py-3 text-sm font-medium text-taskor-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white"
                >
                  {saving ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}