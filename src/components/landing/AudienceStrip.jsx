import { motion } from "framer-motion";
import React from "react";
import {
  Briefcase,
  Building2,
  Rocket,
  Users,
  Laptop,
} from "lucide-react";

const audiences = [
  {
    icon: Briefcase,
    title: "Freelancers",
    desc: "Manage multiple clients effortlessly.",
  },
  {
    icon: Building2,
    title: "Agencies",
    desc: "Track projects and deliver faster.",
  },
  {
    icon: Rocket,
    title: "Startups",
    desc: "Organize work from day one.",
  },
  {
    icon: Users,
    title: "Teams",
    desc: "Collaborate from one workspace.",
  },
  {
    icon: Laptop,
    title: "Developers",
    desc: "Stay focused on shipping products.",
  },
];

export default function AudienceStrip() {
  return (
    <section className="py-24 bg-white">

      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >

          <p className="text-center text-taskor-purple font-semibold uppercase tracking-[4px]">

            Built For Everyone

          </p>

          <h2 className="mt-4 text-center text-4xl font-bold text-taskor-ink">

            One Platform.
            <br />
            Every Workflow.

          </h2>

        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 mt-16">

          {audiences.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * .08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="glass rounded-3xl p-8 text-center hover:shadow-hover transition"
              >

                <div className="mx-auto w-16 h-16 rounded-2xl bg-taskor-gradient flex items-center justify-center">

                  <Icon
                    size={28}
                    className="text-white"
                  />

                </div>

                <h3 className="mt-6 text-xl font-semibold">

                  {item.title}

                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">

                  {item.desc}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}
