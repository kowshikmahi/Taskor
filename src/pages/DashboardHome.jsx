import React, { useEffect, useMemo, useState } from "react";
import { getClients } from "../services/clientsService";
import { getProjects } from "../services/projectsService";
import { getTasks } from "../services/tasksService";
import { useAuth } from "../context/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      setError("");

      const [clientsData, projectsData, tasksData] = await Promise.all([
        getClients(),
        getProjects(),
        getTasks(),
      ]);

      setClients(clientsData);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const activeProjects = projects.filter((project) => project.status === "Active").length;
    const completedTasks = tasks.filter((task) => task.status === "Done").length;
    const todoTasks = tasks.filter((task) => task.status !== "Done").length;

    return {
      totalClients: clients.length,
      totalProjects: projects.length,
      activeProjects,
      totalTasks: tasks.length,
      completedTasks,
      todoTasks,
    };
  }, [clients, projects, tasks]);

  const recentProjects = useMemo(() => projects.slice(0, 4), [projects]);
  const urgentTasks = useMemo(() => tasks.filter((task) => task.status !== "Done").slice(0, 5), [tasks]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-taskor-gradient p-8 text-white shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
          Taskor Workspace
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
          Welcome back, {user?.name || "there"} 👋
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
          Here’s your live workspace snapshot — clients, project progress, and task execution all in one place.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Clients" value={loading ? "..." : stats.totalClients} subtitle="Total client accounts" />
        <StatCard title="Projects" value={loading ? "..." : stats.totalProjects} subtitle="Projects in workspace" />
        <StatCard title="Active Projects" value={loading ? "..." : stats.activeProjects} subtitle="Currently in progress" />
        <StatCard title="Tasks Done" value={loading ? "..." : stats.completedTasks} subtitle={`Remaining: ${loading ? "..." : stats.todoTasks}`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-taskor-purple">
                Recent projects
              </p>
              <h2 className="mt-2 text-2xl font-bold text-taskor-ink">Project pipeline</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-taskor-slate">Loading projects...</p>
            ) : recentProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-taskor-mist p-6 text-center">
                <p className="text-sm text-taskor-slate">No projects yet.</p>
              </div>
            ) : (
              recentProjects.map((project) => (
                <div key={project._id} className="rounded-3xl border border-taskor-cloud p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-taskor-ink">{project.name}</h3>
                      <p className="mt-1 text-sm text-taskor-slate">
                        {project.client?.name ? `Client: ${project.client.name}` : "No client linked"}
                      </p>
                    </div>
                    <span className="rounded-full bg-taskor-cloud px-3 py-1 text-xs font-semibold text-taskor-ink">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-taskor-slate">Progress</span>
                      <span className="font-semibold text-taskor-ink">{project.progress || 0}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-taskor-cloud">
                      <div
                        className="h-full rounded-full bg-taskor-gradient"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-taskor-purple">
            Open tasks
          </p>
          <h2 className="mt-2 text-2xl font-bold text-taskor-ink">Execution queue</h2>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-taskor-slate">Loading tasks...</p>
            ) : urgentTasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-taskor-mist p-6 text-center">
                <p className="text-sm text-taskor-slate">No open tasks right now.</p>
              </div>
            ) : (
              urgentTasks.map((task) => (
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

                  <div className="mt-3 flex items-center justify-between text-xs text-taskor-slate">
                    <span>{task.status}</span>
                    <span>
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <p className="text-sm font-medium text-taskor-slate">{title}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-taskor-ink">{value}</p>
      <p className="mt-2 text-sm text-taskor-slate">{subtitle}</p>
    </div>
  );
}