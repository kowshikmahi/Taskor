import SectionHeading from "../ui/SectionHeading";
import React from "react";
const steps = [
  {
    title: "Create client workspace",
    desc: "Start with a dedicated workspace for each client or account so everything stays grouped.",
  },
  {
    title: "Plan projects and deliverables",
    desc: "Break work into projects, milestones, deadlines, and ownership without losing visibility.",
  },
  {
    title: "Track tasks through completion",
    desc: "Move work through your workflow with statuses, assignees, priorities, and progress updates.",
  },
  {
    title: "Deliver faster with one source of truth",
    desc: "Keep the team aligned and the client work moving from kickoff to delivery.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-taskor-cloud/50 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            badge="Workflow"
            title="A workflow that keeps client work moving"
            subtitle="Taskor is designed around the actual flow of client work — from planning and ownership to delivery and follow-up."
          />
        </div>

        <div className="space-y-5">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-4 rounded-[24px] border border-taskor-mist bg-white p-5 shadow-card"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-taskor-gradient text-sm font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold text-taskor-ink">{step.title}</h3>
                <p className="mt-2 leading-7 text-taskor-slate">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}