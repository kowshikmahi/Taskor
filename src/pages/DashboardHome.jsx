import React from "react";
import StatCard from "../components/dashboard/StatCard";
import ProjectTable from "../components/dashboard/ProjectTable";
import TaskListCard from "../components/dashboard/TaskListCard";
import ActivityCard from "../components/dashboard/ActivityCard";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome / Summary */}
      <section className="rounded-[32px] bg-taskor-gradient p-6 text-white shadow-card sm:p-8">
        <p className="text-sm font-medium text-white/80">Good evening, Kowshik 👋</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your workspace is moving well.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
          You have 4 active projects, 7 pending tasks, and 2 reviews waiting this week.
          Focus on high-priority delivery and client follow-ups today.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Clients" value="12" subtext="+2 this month" />
        <StatCard title="Open Projects" value="8" subtext="3 nearing review" />
        <StatCard title="Pending Tasks" value="17" subtext="5 due today" />
        <StatCard title="Revenue Tracked" value="₹48k" subtext="This month so far" />
      </section>

      {/* Main dashboard content */}
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <ProjectTable />

        <div className="space-y-6">
          <TaskListCard />
          <ActivityCard />
        </div>
      </section>
    </div>
  );
}