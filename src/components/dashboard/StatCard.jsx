import React from "react";
import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: .25,
      }}
      className="glass rounded-[28px] p-7 shadow-card hover:shadow-hover transition-all"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">

            {title}

          </p>

          <h2 className="mt-4 text-4xl font-bold text-taskor-ink">

            {value}

          </h2>

          <p className="mt-3 text-sm font-medium text-green-600">

            {change}

          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-taskor-gradient shadow-lg">

          <Icon
            size={28}
            className="text-white"
          />

        </div>

      </div>

    </motion.div>
  );
}
