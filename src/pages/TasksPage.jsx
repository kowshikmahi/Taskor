import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Pencil, Plus, Trash2, X } from "lucide-react";
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
      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
      setTasks([]);
      setProjects([]);
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
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 glass rounded-3xl p-5 shadow-card sm:p-6 md:flex-row md:items-center md:justify-between">
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
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-btn bg-taskor-gradient px-5 py-3 text-sm font-semibold text-white shadow-card sm:w-auto"
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="glass rounded-3xl p-5 shadow-card sm:p-6">
          <p className="text-sm text-taskor-slate">Loading tasks...</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {columns.map((column) => (
            <div key={column} className="glass rounded-3xl p-4 shadow-card sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-taskor-ink">{column}</h2>
                  <p className="text-sm text-taskor-slate">{groupedTasks[column]?.length || 0} tasks</p>
                </div>
                <button
                  onClick={() => openCreateModal(column)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-btn border border-taskor-mist px-3 py-2 text-xs font-semibold text-taskor-ink transition hover:border-taskor-purple hover:text-taskor-purple"
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-4">
                {groupedTasks[column]?.length ? (
                  groupedTasks[column].map((task) => (
                    <div key={task._id} className="rounded-3xl border border-white/55 bg-white/45 p-4 backdrop-blur dark:bg-white/10">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="font-bold text-taskor-ink">{task.title}</h3>
                          <p className="mt-1 text-xs text-taskor-slate">{task.projectName || "General"}</p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "Medium"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {task.priority || "Medium"}
                        </span>
                      </div>

                      {task.description ? (
                        <p className="mt-3 text-xs leading-5 text-taskor-slate">{task.description}</p>
                      ) : null}

                      <div className="mt-4 flex items-center justify-between border-t border-white/40 pt-3 text-xs text-taskor-slate">
                        <span>Due: {task.dueDate ? task.dueDate.slice(0, 10) : "No due date"}</span>

                        <div className="flex items-center gap-1">
                          {column !== "Done" ? (
                            <button
                              onClick={() => {
                                const nextIndex = columns.indexOf(column) + 1;
                                if (nextIndex < columns.length) {
                                  moveTask(task, columns[nextIndex]);
                                }
                              }}
                              className="rounded-lg p-1.5 text-taskor-purple hover:bg-white/60"
                              title="Move to next status"
                              aria-label="Move task forward"
                            >
                              <ArrowRight size={14} />
                            </button>
                          ) : null}

                          <button
                            onClick={() => openEditModal(task)}
                            className="rounded-lg p-1.5 text-taskor-slate hover:bg-white/60 hover:text-taskor-purple"
                            aria-label={`Edit ${task.title}`}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                            aria-label={`Delete ${task.title}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-taskor-mist p-4 text-center text-xs text-taskor-slate">
                    No tasks in {column.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/90 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-taskor-ink">
                {editingTask ? "Edit Task" : "Add Task"}
              </h2>
              <button onClick={closeModal} className="rounded-xl p-2 text-taskor-slate hover:bg-white/60">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                  Task Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Design homepage hero"
                  className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                    Project Name
                  </label>
                  <select
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                  >
                    <option value="">General (No project)</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

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
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-taskor-slate">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-taskor-mist bg-white/70 px-4 py-3 text-sm outline-none focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
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
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Task details and instructions..."
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
                  {saving ? "Saving..." : editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
