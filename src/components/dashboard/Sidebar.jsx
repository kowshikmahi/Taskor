import React from "react";
import { LayoutDashboard, Users, FolderKanban, CheckSquare, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import TaskorLogo from "../brand/TaskorLogo";
import { useAuth } from "../../context/AuthContext";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/app",
    end: true,
  },
  {
    title: "Clients",
    icon: Users,
    path: "/app/clients",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/app/projects",
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    path: "/app/tasks",
  },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="glass-panel fixed left-0 top-0 z-40 flex h-dvh w-72 max-w-[86vw] flex-col border-r border-white/45">
      <div className="px-6 py-5 sm:px-8 sm:py-6">
        <TaskorLogo size="lg" className="max-w-[148px]" />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 sm:px-5">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `mb-2 flex min-h-12 items-center gap-4 rounded-2xl px-4 py-3 font-semibold transition-all sm:px-5 sm:py-4 ${
                  isActive
                    ? "bg-taskor-gradient text-white shadow-card"
                    : "text-[var(--muted)] hover:bg-white/45 hover:text-taskor-purple dark:hover:bg-white/10"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/40 p-4 sm:p-5">
        <div className="glass flex items-center gap-3 rounded-2xl p-3 sm:gap-4 sm:p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-taskor-gradient text-lg font-bold text-white">
            K
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-[var(--text)]">Kowshik</h3>
            <p className="truncate text-sm text-[var(--muted)]">Founder</p>
          </div>

          <button
            onClick={handleLogout}
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-[var(--muted)] transition hover:bg-white/60 hover:text-taskor-purple dark:hover:bg-white/10"
            aria-label="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
