"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, x: "-50%", scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 8, x: "-50%", scale: 0.95 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className={`fixed bottom-6 left-1/2 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-soft ${
            toast.type === "error" ? "bg-red-600 text-white" : "bg-brand-navy text-white"
          }`}
        >
          {toast.type === "error" ? <FaCircleExclamation /> : <FaCircleCheck />}
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}