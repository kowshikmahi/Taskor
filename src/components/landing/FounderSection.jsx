import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Globe,
  CheckCircle,
  Code2,
  Lightbulb,
  Target,
} from "lucide-react";
import React from "react";
import FounderImage from "../../assets/brand/founder.jpeg";

export default function FounderSection() {
  const founderPoints = [
    {
      icon: Code2,
      title: "Full-stack builder",
      text: "Builds practical web products across frontend, backend, APIs and deployment.",
    },
    {
      icon: Lightbulb,
      title: "Product-first mindset",
      text: "Focuses on simple workflows, clean interfaces and tools that save real time.",
    },
    {
      icon: Target,
      title: "Driven by execution",
      text: "Created Taskor to help freelancers and small teams keep delivery organized.",
    },
  ];

  return (
    <section
      id="about"
      className="overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="container-custom">

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 xl:gap-20">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <span className="uppercase tracking-[4px] font-semibold text-taskor-purple">
              About Taskor
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-taskor-ink sm:text-4xl lg:text-5xl">
              Built by a Developer
              <br />
              for Modern Teams.
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              Taskor was created to simplify how freelancers,
              agencies and startups manage their daily work.
              Instead of juggling multiple tools,
              Taskor brings clients,
              projects and tasks together
              into one beautiful workspace.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Feature text="Manage unlimited clients" />
              <Feature text="Track project progress visually" />
              <Feature text="Organize tasks effortlessly" />
              <Feature text="Modern glassmorphism interface" />
              <Feature text="Designed for productivity" />
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {founderPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.title} className="glass rounded-2xl p-5">
                    <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-taskor-purple/10 text-taskor-purple">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-taskor-ink">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {point.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mission */}

            <div className="glass mt-10 rounded-3xl p-5 sm:p-8 lg:mt-12">
              <h3 className="text-2xl font-bold">My Mission</h3>
              <p className="mt-5 leading-8 text-slate-600">
                Most productivity tools are either too
                complicated or overloaded with unnecessary
                features. Taskor is built with simplicity,
                speed and a clean user experience in mind,
                helping professionals stay organized
                without distractions.
              </p>
            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[320px]"
          >

            {/* Glow */}
            <div className="absolute inset-x-6 inset-y-8 rounded-full bg-taskor-purple/10 blur-[64px]"></div>

            <div className="relative glass overflow-hidden rounded-[24px] shadow-hover">

              <img
                src={FounderImage}
                alt="Kowshik Mahi"
                className="h-72 w-full bg-white/55 object-contain object-center p-2 transition duration-500 hover:scale-[1.02] sm:h-[340px]"
              />

              <div className="p-4 sm:p-5">

                <h3 className="text-xl font-bold text-taskor-ink sm:text-2xl">Kowshik Mahi</h3>

                <p className="mt-2 text-taskor-purple font-medium">
                  Founder & Full Stack Developer
                </p>

                <div className="mt-5 flex gap-3">

                  <a
                    href="https://github.com/kowshikmahi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-taskor-purple hover:text-white"
                    title="GitHub"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/kowshik-mahi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-taskor-purple hover:text-white"
                    title="LinkedIn"
                  >
                    <ExternalLink size={20} />
                  </a>

                  <a
                    href="https://engineeredbyk-xkq9.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-taskor-purple hover:text-white"
                    title="Portfolio"
                  >
                    <Globe size={20} />
                  </a>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-4">
      <CheckCircle size={20} className="text-taskor-purple" />
      <span className="text-slate-700">{text}</span>
    </div>
  );
}




