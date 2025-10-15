"use client";
import { motion } from "framer-motion";

export default function BgGradient() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-fuchsia-200 opacity-80" />
      <motion.div
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-fuchsia-300 blur-3xl opacity-30"
      />
      <motion.div
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-purple-400 blur-3xl opacity-30"
      />
    </div>
  );
}