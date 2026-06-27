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
      className="relative mx-auto w-full max-w-[620px]"
    >
      {/* Glow */}

      <div className="absolute -inset-4 rounded-full bg-taskor-purple/10 blur-3xl" />

      {/* Main Card */}

      <div className="relative overflow-hidden rounded-[24px] border border-white/50 bg-white shadow-2xl sm:rounded-[30px]">

        {/* Header */}

        <div className="flex h-[430px] sm:h-[500px] lg:h-[540px]">

          {/* Sidebar */}

          <aside className="flex w-16 flex-col items-center gap-5 border-r border-gray-100 bg-[#FAFBFD] py-5 sm:w-20 sm:gap-7 lg:w-24 lg:py-7">

            <Logo />

            <SideIcon icon={LayoutDashboard} active />
            <SideIcon icon={FolderKanban} />
            <SideIcon icon={Users} />
            <SideIcon icon={CheckSquare} />
            <SideIcon icon={BarChart3} />

          </aside>

          {/* Content */}

          <div className="flex-1">

            {/* Top */}

            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">

              <div>

                <p className="text-sm text-slate-500">
                  Welcome back
                </p>

                <h2 className="text-xl font-bold text-taskor-ink sm:text-2xl">
                  Dashboard
                </h2>

              </div>

              <div className="flex items-center gap-2 sm:gap-4">

                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 sm:h-10 sm:w-10">

                  <Bell size={18} />

                </button>

                <div className="grid h-9 w-9 place-items-center rounded-full bg-taskor-gradient text-xs font-bold text-white sm:h-10 sm:w-10">
                  K
                </div>

              </div>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-3 p-4 sm:gap-5 sm:p-6 lg:p-8">

              <StatCard
                title="Clients"
                value="28"
              />

              <StatCard
                title="Projects"
                value="14"
              />

              <StatCard
                title="Tasks"
                value="82"
              />

              <StatCard
                title="Completed"
                value="91%"
              />

            </div>

            {/* Bottom */}

            <div className="grid gap-4 px-4 pb-4 sm:px-6 sm:pb-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pb-8">

              {/* Projects */}

              <div className="rounded-2xl border border-gray-100 p-4 sm:rounded-3xl sm:p-5 lg:p-6">

                <h3 className="font-semibold text-lg mb-6">
                  Active Projects
                </h3>

                <ProgressItem
                  name="Taskor"
                  value={82}
                />

                <ProgressItem
                  name="Portfolio"
                  value={63}
                />

                <ProgressItem
                  name="CRM"
                  value={48}
                />

              </div>

              {/* Tasks */}

              <div className="hidden rounded-2xl border border-gray-100 p-4 sm:block sm:rounded-3xl sm:p-5 lg:p-6">

                <h3 className="font-semibold text-lg mb-6">
                  Today's Tasks
                </h3>

                <Task title="Finish Dashboard UI" />

                <Task title="Client Meeting" />

                <Task title="Deploy Backend" />

                <Task title="Review Projects" />

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
      className={`flex h-10 w-10 items-center justify-center rounded-2xl transition sm:h-12 sm:w-12

      ${
        active
          ? "bg-taskor-gradient text-white shadow-lg"
          : "text-slate-500 hover:bg-gray-100"
      }`}
    >
      <Icon size={20} />
    </button>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-4 transition hover:shadow-lg sm:rounded-3xl sm:p-5 lg:p-6">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl lg:text-4xl">
        {value}
      </h2>

    </div>
  );
}

function ProgressItem({ name, value }) {
  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <span>{name}</span>

        <span>{value}%</span>

      </div>

      <div className="h-2 bg-gray-200 rounded-full">

        <div
          className="h-2 rounded-full bg-taskor-gradient"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}

function Task({ title }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100">

      <div className="w-3 h-3 rounded-full bg-taskor-purple"></div>

      <span className="text-slate-700">
        {title}
      </span>

    </div>
  );
}
