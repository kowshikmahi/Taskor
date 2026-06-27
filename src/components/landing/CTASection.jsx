import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-taskor-gradient opacity-[0.04]" />

      <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-taskor-purple/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-taskor-purple/10 blur-[160px]" />

      <div className="container-custom relative">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="glass rounded-[28px] p-5 text-center shadow-hover sm:p-10 lg:rounded-[36px] lg:p-14"
        >

          <span className="uppercase tracking-[4px] text-taskor-purple font-semibold">

            Get Started

          </span>

          <h2 className="mt-6 text-3xl font-bold text-taskor-ink sm:text-4xl lg:text-6xl">

            Organize your work.
            <br />

            Deliver projects faster.

          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-600 leading-8">

            Manage clients, projects and tasks inside one clean,
            modern workspace designed for freelancers,
            startups and growing teams.

          </p>

          {/* Benefits */}

          <div className="mt-8 grid gap-4 text-left sm:mt-10 sm:grid-cols-3 sm:text-center lg:flex lg:flex-wrap lg:justify-center lg:gap-8">

            <Benefit text="Unlimited Clients" />

            <Benefit text="Project Tracking" />

            <Benefit text="Task Management" />

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-col justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4 lg:mt-14">

            <Link to="/signup" className="w-full sm:w-auto">

              <Button className="w-full sm:w-auto">

                Get Started

                <ArrowRight size={18} />

              </Button>

            </Link>

            <Link to="/login" className="w-full sm:w-auto">

              <Button variant="secondary" className="w-full sm:w-auto">

                Login

              </Button>

            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={18}
        className="text-taskor-purple"
      />

      <span className="font-medium text-slate-700">

        {text}

      </span>

    </div>
  );
}
