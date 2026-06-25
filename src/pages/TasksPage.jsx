import React, { useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/projectsService";
import { createTask, deleteTask, getTasks, updateTask } from "../services/tasksService";

const columns = ["Todo", "In Progress", "Review", "Done"];

const emptyForm = {
  title: "",
  description: "",
  projectName: "",
  status: "Todo",
  priority: "Medium",
  dueDate: "",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setError("");

      const [tasksData, projectsData] = await Promise.all([getTasks(), getProjects()]);
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal(defaultStatus = "Todo") {
    setEditingTask(null);
    setForm({ ...emptyForm, status: defaultStatus });
    setIsModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setForm({
      title: task.title || "",
      description: task.description || "",
      projectName: task.projectName || "",
      status: task.status || "Todo",
      priority: task.priority || "Medium",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
    setForm(emptyForm);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        dueDate: form.dueDate || null,
      };

      if (editingTask) {
        const updated = await updateTask(editingTask._id, payload);
        setTasks((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      } else {
        const created = await createTask(payload);
        setTasks((prev) => [created, ...prev]);
      }

      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save task");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  }

  async function moveTask(task, newStatus) {
    try {
      const updated = await updateTask(task._id, {
        title: task.title,
        description: task.description,
        projectName: task.projectName,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : null,
        status: newStatus,
      });

      setTasks((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
    } catch (err) {
      setError(err.message || "Failed to update task status");
    }
  }

  const groupedTasks = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column] = tasks.filter((task) => task.status === column);
      return acc;
    }, {});
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-taskor-purple">
            Task board
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-taskor-ink">Tasks</h1>
          <p className="mt-2 text-sm text-taskor-slate">
            Manage day-to-day work using a lightweight kanban workflow.
          </p>
        </div>

        <button
          onClick={() => openCreateModal("Todo")}
          className="rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card"
        >
          + Add Task
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <p className="text-sm text-taskor-slate">Loading tasks...</p>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-4">
          {columns.map((column) => (
            <div key={column} className="rounded-3xl bg-white p-5 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-taskor-ink">{column}</h2>
                  <p className="text-sm text-taskor-slate">{groupedTasks[column]?.length || 0} tasks</p>
                </div>
                <button
                  onClick={() => openCreateModal(column)}
                  className="rounded-btn border border-taskor-mist px-3 py-2 text-xs font-semibold text-taskor-ink"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-4">
                {groupedTasks[column]?.length ? (
                  groupedTasks[column].map((task) => (
                    <div key={task._id} className="rounded-3xl border border-taskor-cloud p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-taskor-ink">{task.title}</h3>
                          <p className="mt-1 text-xs font-medium text-taskor-purple">
                            {task.projectName || "No project"}
                          </p>
                        </div>
                        <span className="rounded-full bg-taskor-cloud px-3 py-1 text-[11px] font-semibold text-taskor-ink">
                          {task.priority}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-taskor-slate">
                        {task.description || "No description added."}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-xs text-taskor-slate">
                        <span>
                          Due:{" "}
                          <span className="font-semibold text-taskor-ink">
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString()
                              : "Not set"}
                          </span>
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {columns
                          .filter((status) => status !== task.status)
                          .map((status) => (
                            <button
                              key={status}
                              onClick={() => moveTask(task, status)}
                              className="rounded-btn border border-taskor-mist px-2.5 py-2 text-xs font-medium text-taskor-ink"
                            >
                              Move to {status}
                            </button>
                          ))}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => openEditModal(task)}
                          className="rounded-btn border border-taskor-mist px-3 py-2 text-xs font-medium text-taskor-ink"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="rounded-btn border border-red-200 px-3 py-2 text-xs font-medium text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-taskor-mist p-5 text-center">
                    <p className="text-sm text-taskor-slate">No tasks in {column}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-taskor-ink/40 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-taskor-ink">
                  {editingTask ? "Edit Task" : "Add Task"}
                </h2>
                <p className="mt-1 text-sm text-taskor-slate">
                  Keep your execution pipeline organized.
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
                    Task Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
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
                  <label className="mb-2 block text-sm font-semibold text-taskor-ink">
                    Project
                  </label>
                  <select
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  >
                    <option value="">No project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project.name}>
                        {project.name}
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
                    {columns.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
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
                    className="w-full rounded-btn border border-taskor-mist px-4 py-3 outline-none focus:border-taskor-purple"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
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
                  {saving ? "Saving..." : editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}