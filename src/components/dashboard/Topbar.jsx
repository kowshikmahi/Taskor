import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import TaskorLogo from "../brand/TaskorLogo";

export default function Topbar({ onMenuClick }) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 border-b border-white/45 bg-white/70 backdrop-blur-2xl dark:bg-slate-950/55">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/50 bg-white/55 text-[var(--text)] shadow-sm backdrop-blur lg:hidden dark:bg-white/10"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <Link to="/app" className="flex min-w-0 items-center lg:hidden" aria-label="Taskor dashboard">
            <TaskorLogo size="sm" className="max-w-[118px]" />
          </Link>

          <div className="relative hidden w-full max-w-md md:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />

            <input
              type="text"
              placeholder="Search clients, projects or tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-white/55 bg-white/65 pl-12 pr-4 text-[var(--text)] outline-none backdrop-blur placeholder:text-[var(--muted)] focus:border-taskor-purple focus:ring-4 focus:ring-taskor-purple/10 dark:bg-white/10"
            />
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-4">
          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/55 bg-white/65 text-[var(--text)] backdrop-blur transition hover:border-taskor-purple hover:text-taskor-purple dark:bg-white/10 sm:h-12 sm:w-12"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-taskor-purple" />
          </button>

          <button className="flex items-center gap-2 rounded-2xl border border-white/55 bg-white/65 px-2 py-2 text-[var(--text)] backdrop-blur transition hover:border-taskor-purple dark:bg-white/10 sm:gap-3 sm:px-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-taskor-gradient text-sm font-semibold text-white">
              K
            </div>

            <div className="hidden text-left md:block">
              <p className="font-semibold text-[var(--text)]">Kowshik</p>
              <p className="text-sm text-[var(--muted)]">Administrator</p>
            </div>

            <ChevronDown size={18} className="hidden text-[var(--muted)] sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
