import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  FolderKanban,
  CheckSquare,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Workspace",
    description:
      "Set up your personal workspace in seconds.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Add Clients",
    description:
      "Manage all your clients from one place.",
    icon: Users,
  },
  {
    number: "03",
    title: "Create Projects",
    description:
      "Organize every project with milestones and progress.",
    icon: FolderKanban,
  },
  {
    number: "04",
    title: "Track Tasks",
    description:
      "Monitor daily work with a clean task board.",
    icon: CheckSquare,
  },
];

export default function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10 bg-white/72 dark:bg-slate-950/25" />
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >

          <span className="text-taskor-purple uppercase tracking-[4px] font-semibold">

            Workflow

          </span>

          <h2 className="mt-5 text-3xl font-bold text-taskor-ink sm:text-4xl lg:text-5xl">

            From idea to completion
            <br />
            in four simple steps

          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">

            Taskor keeps your entire workflow simple,
            organized and efficient.

          </p>

        </motion.div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16 lg:mt-20">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div key={step.number}>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.12,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                  }}
                  className="glass-panel relative overflow-hidden rounded-[24px] p-5 transition-all hover:shadow-hover sm:p-7 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:rounded-[28px] lg:p-8"
                >

                  {/* Left */}

                  <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-taskor-gradient shadow-lg sm:h-20 sm:w-20 sm:rounded-3xl">

                      <Icon
                        size={34}
                        className="text-white"
                      />

                    </div>

                    <div className="min-w-0">

                      <p className="text-taskor-purple font-semibold">

                        STEP {step.number}

                      </p>

                      <h3 className="mt-2 text-xl font-bold text-taskor-ink sm:text-2xl">

                        {step.title}

                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">

                        {step.description}

                      </p>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="pointer-events-none absolute right-5 top-4 text-6xl font-extrabold text-taskor-purple/10 sm:text-7xl lg:static lg:text-taskor-purple/15">

                    {step.number}

                  </div>

                </motion.div>

                {index !== steps.length - 1 && (

                  <div className="flex justify-center py-6">

                    <ArrowDown
                      className="text-taskor-purple"
                      size={28}
                    />

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
}
