import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import QuickActions from "../components/dashboard/QuickActions";
import {
  Users,
  FolderKanban,
  CheckSquare,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";

import { getClients } from "../services/clientsService";
import { getProjects } from "../services/projectsService";
import { getTasks } from "../services/tasksService";

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [clientsData, projectsData, tasksData] =
        await Promise.all([
          getClients(),
          getProjects(),
          getTasks(),
        ]);

      setClients(clientsData);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.status === "Done").length;
  }, [tasks]);

  const activeProjects = useMemo(() => {
    return projects.filter(
      (project) => project.status === "Active"
    ).length;
  }, [projects]);

  const completion = useMemo(() => {
    if (!tasks.length) return 0;

    return Math.round(
      (completedTasks / tasks.length) * 100
    );
  }, [completedTasks, tasks]);

  const stats = [
    {
      title: "Clients",
      value: clients.length,
      subtitle: "Registered",
      icon: Users,
      color: "bg-blue-100",
    },
    {
      title: "Projects",
      value: projects.length,
      subtitle: `${activeProjects} Active`,
      icon: FolderKanban,
      color: "bg-violet-100",
    },
    {
      title: "Tasks",
      value: tasks.length,
      subtitle: `${completedTasks} Completed`,
      icon: CheckSquare,
      color: "bg-green-100",
    },
    {
      title: "Progress",
      value: `${completion}%`,
      subtitle: "Workspace",
      icon: TrendingUp,
      color: "bg-orange-100",
    },
  ];

  if (loading) {
    return <Loader text="Loading workspace..." />;
  }

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Hero */}

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-3xl p-5 sm:p-8 lg:p-10"
      >
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-10">

          <div className="max-w-2xl min-w-0">

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-taskor-purple/10 text-taskor-purple font-medium">
              Taskor Workspace
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-taskor-ink dark:text-white sm:text-5xl">
              Manage Everything
              <br />
              From One Dashboard
            </h1>

            <p className="mt-5 text-lg leading-8 text-taskor-slate">
              Track clients, organize projects, monitor task progress
              and manage your complete workflow using one modern
              productivity platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">

              <Link to="/app/projects" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <Plus size={18} />
                  New Project
                </Button>
              </Link>

              <Link to="/app/tasks" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">
                  View Tasks
                </Button>
              </Link>

            </div>

          </div>

          {/* Workspace Summary */}

          <div className="glass w-full max-w-sm rounded-3xl p-5 sm:p-6 lg:p-7">

            <h3 className="text-xl font-semibold">
              Workspace Summary
            </h3>

            <div className="mt-8 space-y-6">

              <div className="flex justify-between">
                <span className="text-taskor-slate">Clients</span>
                <span className="font-semibold">{clients.length}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-taskor-slate">Projects</span>
                <span className="font-semibold">{projects.length}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-taskor-slate">Tasks</span>
                <span className="font-semibold">{tasks.length}</span>
              </div>

              <div className="border-t pt-6 flex justify-between">
                <span className="font-medium">Productivity</span>
                <span className="font-bold text-taskor-purple">{completion}%</span>
              </div>

            </div>

          </div>

        </div>

      </motion.section>

      {/* KPI Cards */}

      <section className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              whileHover={{ y: -5 }}
            >

              <Card>

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <p className="uppercase tracking-wide text-sm text-taskor-slate">
                      {item.title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                      {item.value}
                    </h2>

                    <p className="mt-2 text-sm text-taskor-slate">
                      {item.subtitle}
                    </p>

                  </div>

                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${item.color} sm:h-16 sm:w-16`}
                  >
                    <Icon size={28} className="text-taskor-purple" />
                  </div>

                </div>

              </Card>

            </motion.div>

          );

        })}

      </section>

      {/* Main Content */}

      <section className="grid gap-6 xl:grid-cols-3 xl:gap-8">

        {/* Recent Projects */}

        <div className="xl:col-span-2">

          <Card>

            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-2xl font-bold">Recent Projects</h2>
                <p className="text-taskor-slate mt-1">Latest project activity</p>
              </div>

              <Link
                to="/app/projects"
                className="text-taskor-purple flex items-center gap-2 font-medium hover:underline"
              >
                View All
                <ArrowRight size={16} />
              </Link>

            </div>

            <div className="space-y-5">

              {projects.length > 0 ? (

                projects.slice(0, 5).map((project) => (

                  <motion.div
                    key={project._id}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-5"
                  >

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div className="min-w-0">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-sm text-taskor-slate mt-1">
                          {project.client?.name || "No Client"}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "Active"
                            ? "bg-blue-100 text-blue-700"
                            : project.status === "Planning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {project.status}
                      </span>

                    </div>

                    <div className="mt-6">

                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-taskor-slate">Progress</span>
                        <span className="font-semibold text-taskor-purple">{project.progress}%</span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-taskor-gradient rounded-full"
                        />
                      </div>

                    </div>

                  </motion.div>

                ))

              ) : (

                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold">No Projects Yet</h3>
                  <p className="mt-2 text-taskor-slate">
                    Create your first project to start managing work.
                  </p>
                  <Link to="/app/projects">
                    <Button className="mt-6">
                      <Plus size={18} />
                      Create Project
                    </Button>
                  </Link>
                </div>

              )}

            </div>

          </Card>

        </div>

        {/* Upcoming Tasks */}

        <div>

          <Card>

            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Upcoming Tasks</h2>
                <p className="text-taskor-slate mt-1">Your recent work</p>
              </div>
            </div>

            <div className="space-y-4">

              {tasks.length > 0 ? (

                tasks.slice(0, 6).map((task) => (

                  <div
                    key={task._id}
                    className="glass rounded-2xl p-4 hover:shadow-hover transition"
                  >

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0">
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-taskor-slate mt-1">
                          {task.projectName || "General"}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-taskor-purple/10 text-taskor-purple text-xs font-medium">
                        {task.status}
                      </span>

                    </div>

                  </div>

                ))

              ) : (

                <div className="text-center py-10">
                  <p className="text-taskor-slate">No Tasks Available</p>
                </div>

              )}

            </div>

          </Card>

        </div>

      </section>

      {/* Quick Actions */}

      <section className="mt-8">
        <QuickActions />
      </section>

      {/* Productivity */}

      <Card>

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center lg:gap-8">

          <div>
            <h2 className="text-3xl font-bold">Workspace Progress</h2>
            <p className="text-taskor-slate mt-3 max-w-xl">
              Current completion rate across all active tasks inside your workspace.
            </p>
          </div>

          <div>
            <h1 className="text-5xl font-bold text-taskor-purple sm:text-6xl">{completion}%</h1>
          </div>

        </div>

        <div className="mt-10">
          <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completion}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-taskor-gradient rounded-full"
            />
          </div>
        </div>

      </Card>

    </div>
  );
}



