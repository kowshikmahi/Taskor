import React from "react";
import { Link } from "react-router-dom";
import TaskorLogo from "../brand/TaskorLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-taskor-mist/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center">
          <TaskorLogo variant="full" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-taskor-slate hover:text-taskor-ink"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="text-sm font-medium text-taskor-slate hover:text-taskor-ink"
          >
            Workflow
          </a>

          {/* THIS is the important fix */}
          <Link
            to="/app"
            className="text-sm font-medium text-taskor-slate hover:text-taskor-ink"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-btn px-4 py-2 text-sm font-medium text-taskor-slate hover:bg-taskor-cloud md:inline-flex"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-btn bg-taskor-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-card transition hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}