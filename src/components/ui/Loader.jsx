import React from "react";
import { motion } from "framer-motion";

export default function Loader({
  text = "Loading..."
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-12 h-12 border-4 border-taskor-purple border-t-transparent rounded-full"
      />

      <p className="mt-5 text-taskor-slate">
        {text}
      </p>

    </div>
  );
}
