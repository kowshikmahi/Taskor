import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card>

        <div className="flex justify-between">

          <div>

            <p className="text-sm uppercase tracking-wide text-taskor-slate">
              {title}
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {value}
            </h2>

            <p className="mt-2 text-taskor-slate">
              {subtitle}
            </p>

          </div>

          <div className="w-16 h-16 rounded-2xl bg-taskor-purple/10 flex items-center justify-center">

            <Icon
              size={28}
              className="text-taskor-purple"
            />

          </div>

        </div>

      </Card>
    </motion.div>
  );
}
