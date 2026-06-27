import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({
  value = 0,
}) {
  return (
    <div className="w-full">

      <div className="flex justify-between mb-2">

        <span className="text-sm text-taskor-slate">
          Progress
        </span>

        <span className="font-semibold">
          {value}%
        </span>

      </div>

      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-taskor-gradient rounded-full"
        />

      </div>

    </div>
  );
}
