import React from "react";
import { Link } from "react-router-dom";
import TaskorLogo from "../brand/TaskorLogo";

export default function AuthLayout({
  title,
  subtitle,
  children,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}) {
  return (
    <div className="min-h-screen bg-white text-taskor-ink">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="relative hidden overflow-hidden bg-taskor-gradient lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_30%)]" />
          
          <div className="relative flex w-full flex-col justify-between p-10 text-white xl:p-14">
            <div>
              <TaskorLogo variant="full" theme="dark" size="lg" className="max-w-[158px]" />
            </div>

            <div className="max-w-xl">
              <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                Workflow-first client operations
              </p>

              <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">
                Bring your clients, projects, and tasks into one clean workflow.
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/85">
                Taskor helps freelancers, agencies, and service teams manage work from kickoff to delivery with clarity.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm text-white/80">Clients</p>
                  <h3 className="mt-2 text-2xl font-bold">18</h3>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm text-white/80">Projects</p>
                  <h3 className="mt-2 text-2xl font-bold">26</h3>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm text-white/80">Tasks</p>
                  <h3 className="mt-2 text-2xl font-bold">43</h3>
                </div>
              </div>
            </div>

            <div className="text-sm text-white/75">
              © 2026 Taskor
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 inline-flex lg:hidden">
              <TaskorLogo variant="full" size="lg" className="max-w-[150px]" />
            </Link>

            <div className="rounded-[28px] border border-taskor-mist bg-white p-8 shadow-card sm:p-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-taskor-ink">
                {title}
              </h1>
              <p className="mt-3 text-taskor-slate">
                {subtitle}
              </p>

              <div className="mt-8">{children}</div>

              <div className="mt-8 text-center text-sm text-taskor-slate">
                {bottomText}{" "}
                <Link
                  to={bottomLinkTo}
                  className="font-semibold text-taskor-purple hover:underline"
                >
                  {bottomLinkText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
