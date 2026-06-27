import { motion } from "framer-motion";
import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="relative mx-auto w-full max-w-[620px] overflow-visible px-0 sm:px-2"
    >
      <div className="absolute -inset-3 rounded-[32px] bg-taskor-purple/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[22px] border border-white/50 bg-white/88 shadow-2xl backdrop-blur-xl dark:bg-slate-950/75 sm:rounded-[30px]">
        <div className="flex min-h-[430px] sm:min-h-[500px] lg:min-h-[540px]">
          <aside className="hidden w-[74px] flex-shrink-0 flex-col items-center gap-5 border-r border-gray-100 bg-[#FAFBFD] py-5 sm:flex lg:w-24 lg:gap-7 lg:py-7">
            <Logo />
            <SideIcon icon={LayoutDashboard} active />
            <SideIcon icon={FolderKanban} />
            <SideIcon icon={Users} />
            <SideIcon icon={CheckSquare} />
            <SideIcon icon={BarChart3} />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-sm">Welcome back</p>
                <h2 className="truncate text-xl font-bold text-taskor-ink sm:text-2xl">Dashboard</h2>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white/60 sm:h-10 sm:w-10" aria-label="Notifications">
                  <Bell size={18} />
                </button>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-taskor-gradient text-xs font-bold text-white sm:h-10 sm:w-10">K</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 sm:gap-5 sm:p-6 lg:p-8">
              <StatCard title="Clients" value="28" />
              <StatCard title="Projects" value="14" />
              <StatCard title="Tasks" value="82" />
              <StatCard title="Completed" value="91%" />
            </div>

            <div className="grid flex-1 gap-4 px-4 pb-4 sm:px-6 sm:pb-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pb-8">
              <div className="rounded-2xl border border-gray-100 bg-white/45 p-4 sm:rounded-3xl sm:p-5 lg:p-6">
                <h3 className="mb-5 text-base font-semibold text-taskor-ink sm:text-lg">Active Projects</h3>
                <ProgressItem name="Taskor" value={82} />
                <ProgressItem name="Portfolio" value={63} />
                <ProgressItem name="CRM" value={48} />
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white/45 p-4 sm:rounded-3xl sm:p-5 lg:p-6">
                <h3 className="mb-4 text-base font-semibold text-taskor-ink sm:text-lg">Today's Tasks</h3>
                <Task title="Finish dashboard UI" />
                <Task title="Client meeting" />
                <Task title="Deploy backend" />
                <Task title="Review projects" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Logo() {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-taskor-gradient text-white sm:h-12 sm:w-12">
      <LayoutDashboard size={20} />
    </div>
  );
}

function SideIcon({ icon: Icon, active }) {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-2xl transition sm:h-12 sm:w-12 ${
        active ? "bg-taskor-gradient text-white shadow-lg" : "text-slate-500 hover:bg-gray-100"
      }`}
      aria-label="Dashboard preview navigation item"
    >
      <Icon size={20} />
    </button>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-gray-100 bg-white/45 p-4 transition hover:shadow-lg sm:rounded-3xl sm:p-5 lg:p-6">
      <p className="truncate text-sm text-slate-500">{title}</p>
      <h2 className="mt-2 text-2xl font-bold text-taskor-ink sm:mt-3 sm:text-3xl lg:text-4xl">{value}</h2>
    </div>
  );
}

function ProgressItem({ name, value }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="truncate text-taskor-ink">{name}</span>
        <span className="font-semibold text-taskor-slate">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200">
        <div className="h-2 rounded-full bg-taskor-gradient" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Task({ title }) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-gray-100 py-3 last:border-b-0">
      <div className="h-3 w-3 flex-shrink-0 rounded-full bg-taskor-purple" />
      <span className="truncate text-sm text-slate-700 sm:text-base">{title}</span>
    </div>
  );
}
