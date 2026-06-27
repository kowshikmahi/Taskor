import { motion } from "framer-motion";
import React from "react";
import {
  Users,
  FolderKanban,
  CheckSquare,
  CalendarDays,
  BarChart3,
  Bell,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Client Management",
    description:
      "Store client information, contacts and communication in one secure place.",
  },
  {
    icon: FolderKanban,
    title: "Project Tracking",
    description:
      "Organize projects with progress tracking and milestone management.",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "Create, assign and monitor tasks with a clean workflow.",
  },
  {
    icon: CalendarDays,
    title: "Deadlines",
    description:
      "Track due dates and never miss important project milestones.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Visualize project progress and workspace productivity.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Stay updated with reminders and important workspace events.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Workspace",
    description:
      "Authentication and protected routes keep your data safe.",
  },
  {
    icon: Clock3,
    title: "Fast Workflow",
    description:
      "Designed to reduce clicks and increase productivity.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="container-custom">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
        >

          <span className="text-taskor-purple font-semibold uppercase tracking-[4px]">

            Features

          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-taskor-ink sm:text-4xl lg:text-5xl">

            Everything you need
            <br />
            to manage your work.

          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">

            Taskor combines client management,
            project planning,
            task tracking and analytics into one beautiful workspace.

          </p>

        </motion.div>

        {/* Highlight Card */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mt-12 rounded-[24px] p-5 sm:p-8 lg:mt-16 lg:rounded-[32px] lg:p-10"
        >

          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

            <div>

              <span className="inline-flex rounded-full bg-taskor-purple/10 px-4 py-2 text-sm font-medium text-taskor-purple">

                Productivity Dashboard

              </span>

              <h3 className="mt-6 text-3xl font-bold text-taskor-ink sm:text-4xl">

                One workspace.
                <br />
                Complete control.

              </h3>

              <p className="mt-6 text-slate-600 leading-8">

                Easily manage every client, project and task from a single dashboard.
                Monitor progress, deadlines and productivity without switching
                between multiple tools.

              </p>

              <ul className="mt-8 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-2 lg:mt-10 lg:grid-cols-1">

                <li>• Centralized workspace</li>

                <li>• Real-time project tracking</li>

                <li>• Better productivity</li>

                <li>• Beautiful user experience</li>

              </ul>

            </div>

            {/* Mock Dashboard */}

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-card sm:p-8">

              <div className="grid grid-cols-2 gap-3 sm:gap-5">

                <MiniCard title="Clients" value="28" />

                <MiniCard title="Projects" value="15" />

                <MiniCard title="Tasks" value="82" />

                <MiniCard title="Completed" value="91%" />

              </div>

              <div className="mt-8">

                <Progress
                  title="Workspace Progress"
                  value={84}
                />

              </div>

            </div>

          </div>

        </motion.div>

        {/* Feature Cards */}

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6 xl:mt-20 xl:grid-cols-4">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * .05,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="glass rounded-3xl p-6 transition-all hover:shadow-hover sm:p-8"
              >

                <div className="w-16 h-16 rounded-2xl bg-taskor-gradient flex items-center justify-center">

                  <Icon
                    size={28}
                    className="text-white"
                  />

                </div>

                <h3 className="mt-7 text-xl font-semibold">

                  {feature.title}

                </h3>

                <p className="mt-4 leading-7 text-slate-600">

                  {feature.description}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}

function MiniCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 sm:p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
        {value}
      </h3>

    </div>
  );
}

function Progress({ title, value }) {
  return (
    <div>

      <div className="flex justify-between mb-3">

        <span>{title}</span>

        <span>{value}%</span>

      </div>

      <div className="h-3 rounded-full bg-gray-200">

        <div
          className="h-3 rounded-full bg-taskor-gradient"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}
