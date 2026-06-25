import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TaskorLogo from "../brand/TaskorLogo";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Overview", to: "/app" },
  { name: "Clients", to: "/app/clients" },
  { name: "Projects", to: "/app/projects" },
  { name: "Tasks", to: "/app/tasks" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-taskor-mist bg-white px-5 py-6">
      <div className="mb-8">
        <TaskorLogo variant="full" className="h-9 w-auto" />
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === "/app"}
            className={({ isActive }) =>
              `flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-taskor-gradient text-white shadow-card"
                  : "text-taskor-slate hover:bg-taskor-cloud"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl border border-taskor-mist bg-taskor-cloud p-4">
        <p className="text-sm font-semibold text-taskor-ink">{user?.name || "Taskor User"}</p>
        <p className="mt-1 text-xs text-taskor-slate">{user?.email}</p>

        <button
          onClick={handleLogout}
          className="mt-4 w-full rounded-btn border border-taskor-mist px-4 py-2.5 text-sm font-semibold text-taskor-slate transition hover:bg-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}