import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

export default function MobileSidebar({
  open,
  onClose,
}) {
  return (
    <AnimatePresence>

      {open && (
        <>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: .25 }}
            className="fixed left-0 top-0 z-50 h-dvh w-72 max-w-[86vw] lg:hidden"
          >

            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-xl bg-white/70 text-[var(--text)] shadow-sm backdrop-blur dark:bg-slate-900/80"
            >
              <X />
            </button>

            <Sidebar />

          </motion.div>

        </>
      )}

    </AnimatePresence>
  );
}
