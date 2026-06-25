import logo from "../../assets/brand/taskor-logo-full.svg";
import React from "react";
export default function Footer() {
  return (
    <footer className="border-t border-taskor-mist bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <img src={logo} alt="Taskor" className="h-9 w-auto" />
          <p className="mt-4 max-w-md leading-7 text-taskor-slate">
            Taskor is a workflow-first platform for managing client work, projects, tasks, and team collaboration in one place.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-taskor-ink">Product</h4>
          <ul className="mt-4 space-y-3 text-taskor-slate">
            <li><a href="#features">Features</a></li>
            <li><a href="#workflow">Workflow</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-taskor-ink">Company</h4>
          <ul className="mt-4 space-y-3 text-taskor-slate">
            <li><a href="/">About</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">Privacy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-taskor-mist">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-taskor-slate md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Taskor. All rights reserved.</p>
          <p>Built for freelancers, agencies, and client-service teams.</p>
        </div>
      </div>
    </footer>
  );
}