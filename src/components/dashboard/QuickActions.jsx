import React from "react";
import { Link } from "react-router-dom";
import {
  FolderPlus,
  UserPlus,
  CheckSquare,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "New Project",
    desc: "Create a new project",
    icon: FolderPlus,
    to: "/app/projects",
  },
  {
    title: "New Client",
    desc: "Add a client",
    icon: UserPlus,
    to: "/app/clients",
  },
  {
    title: "New Task",
    desc: "Create a task",
    icon: CheckSquare,
    to: "/app/tasks",
  },
  {
    title: "Analytics",
    desc: "View reports",
    icon: BarChart3,
    to: "/app",
  },
  {
    title: "Settings",
    desc: "Workspace settings",
    icon: Settings,
    to: "/app",
  },
];

export default function QuickActions() {
  return (
    <div className="glass rounded-[28px] p-5 shadow-card sm:p-7">

      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-xl font-semibold text-taskor-ink">
            Quick Actions
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Frequently used shortcuts
          </p>

        </div>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <Link
              key={action.title}
              to={action.to}
              className="group rounded-2xl border border-white/50 bg-white/55 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-taskor-purple hover:shadow-hover dark:bg-white/10 sm:p-5"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-taskor-gradient text-white sm:h-12 sm:w-12">

                  <Icon size={22} />

                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-400 transition group-hover:text-taskor-purple"
                />

              </div>

              <h3 className="mt-5 font-semibold text-taskor-ink">
                {action.title}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                {action.desc}
              </p>

            </Link>

          );

        })}

      </div>

    </div>
  );
}

