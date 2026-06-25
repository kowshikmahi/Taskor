import SectionHeading from "../ui/SectionHeading";
import React from "react";

const features = [
  {
    title: "Client Workspace",
    desc: "Keep every client, conversation, and delivery organized in one dedicated workspace.",
  },
  {
    title: "Project Tracking",
    desc: "Manage project timelines, milestones, and deliverables without scattered spreadsheets.",
  },
  {
    title: "Task Ownership",
    desc: "Assign tasks, set priorities, and track progress so work keeps moving clearly.",
  },
  {
    title: "Team Collaboration",
    desc: "Invite teammates and contributors into the same workflow with role-based access.",
  },
  {
    title: "Workflow Visibility",
    desc: "See what’s pending, in progress, blocked, or completed from a single dashboard.",
  },
  {
    title: "Invoice & Delivery Flow",
    desc: "Connect work progress to delivery and billing steps so nothing slips through.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        badge="Features"
        title="Everything you need to manage client work in one place"
        subtitle="Taskor is built to help you run projects, tasks, ownership, and client delivery from a single workflow-first workspace."
        center
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group rounded-[24px] border border-taskor-mist bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-hover"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-taskor-cloud text-lg font-bold text-taskor-purple">
              0{i + 1}
            </div>
            <h3 className="text-xl font-bold text-taskor-ink">{feature.title}</h3>
            <p className="mt-3 leading-7 text-taskor-slate">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}