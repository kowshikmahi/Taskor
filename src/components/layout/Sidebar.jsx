import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/app",
  },
  {
    name: "Clients",
    icon: Users,
    path: "/app/clients",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    path: "/app/projects",
  },
  {
    name: "Tasks",
    icon: CheckSquare,
    path: "/app/tasks",
  },
  {
    name: "Founder",
    icon: UserCircle,
    path: "/about",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen bg-white border-r border-gray-100 sticky top-0">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-gray-100">

        <div className="flex items-center gap-3">

          <img
            src="/logo.png"
            alt="Taskor"
            className="w-10 h-10 object-contain"
          />

          <div>

            <h1 className="text-xl font-bold text-taskor-ink">
              Taskor
            </h1>

            <p className="text-xs text-taskor-slate">
              Freelance Workspace
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <div className="flex-1 px-5 py-8 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                px-5 py-4
                rounded-2xl
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-taskor-gradient text-white shadow-card"
                    : "text-taskor-slate hover:bg-gray-50"
                }
              `
              }
            >

              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>

          );

        })}

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-100 p-5 space-y-2">

        <button className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl hover:bg-gray-50 transition">

          <Settings size={20} />

          Settings

        </button>

        <button className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}
