import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(14,165,233,0.08),rgba(20,184,166,0.06))]" />

      <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          {/* Badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-taskor-purple/10 px-4 py-2 text-sm font-medium text-taskor-purple sm:mb-8">

            Smart Productivity Platform

          </div>

          {/* Heading */}

          <h1 className="text-4xl font-extrabold leading-tight text-taskor-ink sm:text-5xl lg:text-6xl xl:text-7xl">

            Manage Clients.

            <br />

            Projects.

            <br />

            <span className="text-gradient">

              Tasks.

            </span>

          </h1>

          {/* Description */}

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:mt-8 sm:text-lg">

            Taskor helps freelancers, agencies and growing teams manage
            clients, projects and tasks inside one clean workspace.

          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">

            <Link to="/signup" className="w-full sm:w-auto">

              <Button className="w-full sm:w-auto">

                Get Started

                <ArrowRight size={18} />

              </Button>

            </Link>

            <Link to="/login" className="w-full sm:w-auto">

              <Button variant="secondary" className="w-full sm:w-auto">

                <LayoutDashboard size={18} />

                Dashboard

              </Button>

            </Link>

          </div>

          {/* Bottom Features */}

          <div className="mt-10 grid gap-4 text-sm text-slate-600 sm:mt-12 sm:grid-cols-3 sm:gap-5">

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={18}
                className="text-taskor-purple"
              />

              Client Management

            </div>

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={18}
                className="text-taskor-purple"
              />

              Project Tracking

            </div>

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={18}
                className="text-taskor-purple"
              />

              Secure Workspace

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <DashboardPreview />

        </motion.div>

      </div>

    </section>
  );
}
