import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

const faqs = [
  {
    question: "What is Taskor?",
    answer:
      "Taskor is a modern productivity platform that helps you manage clients, projects and tasks from one beautiful workspace.",
  },
  {
    question: "Who is Taskor built for?",
    answer:
      "Taskor is designed for freelancers, startups, agencies and growing teams looking for a simple project management solution.",
  },
  {
    question: "Can I manage multiple clients?",
    answer:
      "Yes. Create unlimited clients, assign projects, and organize every task separately.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Taskor uses authentication, protected routes and secure backend APIs to keep your workspace safe.",
  },
  {
    question: "Does Taskor support project tracking?",
    answer:
      "Yes. You can monitor project progress, deadlines and task completion from a centralized dashboard.",
  },
  {
    question: "Will more features be added?",
    answer:
      "Yes. Upcoming releases include file management, team collaboration, notifications and calendar integration.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="py-28 bg-white"
    >
      <div className="container-custom max-w-5xl">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="uppercase tracking-[4px] text-taskor-purple font-semibold">

            FAQ

          </span>

          <h2 className="mt-5 text-5xl font-bold text-taskor-ink">

            Frequently Asked Questions

          </h2>

          <p className="mt-6 text-lg text-slate-600">

            Everything you need to know before using Taskor.

          </p>
        </motion.div>

        <div className="mt-16 space-y-5">

          {faqs.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-3xl overflow-hidden"
            >

              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="w-full px-8 py-7 flex justify-between items-center"
              >

                <h3 className="text-left text-lg font-semibold">

                  {item.question}

                </h3>

                <motion.div
                  animate={{
                    rotate: open === index ? 180 : 0,
                  }}
                >
                  <ChevronDown />
                </motion.div>

              </button>

              <AnimatePresence>

                {open === index && (

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: .3,
                    }}
                  >

                    <p className="px-8 pb-8 text-slate-600 leading-8">

                      {item.answer}

                    </p>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}
