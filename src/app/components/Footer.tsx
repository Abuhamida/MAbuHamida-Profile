"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className=" py-4 relative bottom-0 flex flex-col justify-center items-center  text-center  border-t border-secondary/50  w-full   text-gray-400 dark:bg-[#171717] "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Mohamed AbuHamida. All Rights
        Reserved.
      </p>
    </motion.footer>
  );
}
