import React from "react";
import { NavLink } from "react-router-dom";
import TaskorLogo from "../brand/TaskorLogo";

const navItems = [
  { name: "Overview", to: "/app" },
  { name: "Clients", to: "/app/clients" },
  { name: "Projects", to: "/app/projects" },
  { name: "Tasks", to: "/app/tasks" },
  { name: "Invoices", to: "/app/invoices" },
  { name: "Calendar", to: "/app/calendar" },
  { name: "Settings", to: "/app/settings" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-taskor-mist bg-white lg:flex lg:flex-col">
      <div className="border-b border-taskor-mist px-6 py-5">
        <TaskorLogo variant="full" className="h-9 w-auto" />
      </div>

      <div className="flex-1 px-4 py-5">
        <div className="mb-6 rounded-3xl bg-taskor-gradient p-5 text-white shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Workspace
          </p>
          <h3 className="mt-2 text-xl font-bold">Taskor Studio</h3>
          <p className="mt-2 text-sm leading-6 text-white/85">
            Manage clients, projects, tasks, and delivery from one dashboard.
          </p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === "/app"}
              className={({ isActive }) =>
                `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-taskor-ink text-white shadow-card"
                    : "text-taskor-slate hover:bg-taskor-cloud hover:text-taskor-ink"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-taskor-mist p-4">
        <div className="rounded-2xl bg-taskor-cloud p-4">
          <p className="text-sm font-semibold text-taskor-ink">Kowshik</p>
          <p className="mt-1 text-xs text-taskor-slate">
            Founder workspace
          </p>
        </div>
      </div>
    </aside>
  );
}