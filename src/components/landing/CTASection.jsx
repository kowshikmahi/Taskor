import React from "react";

export default function CTASection() {
  return (
    <section className="px-6 pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-taskor-gradient px-8 py-14 text-white shadow-card lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
              Start using Taskor
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Bring your clients, projects, and workflow into one system
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Replace scattered tools with one workspace that helps you plan, track, and deliver work with clarity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button className="rounded-btn bg-white px-6 py-3 text-sm font-semibold text-taskor-ink transition hover:scale-[1.02]">
              Start Free
            </button>
            <button className="rounded-btn border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}