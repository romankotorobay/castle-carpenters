"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-6 left-6 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white px-4 py-3 rounded-full shadow-2xl transition-colors duration-300 font-sans text-xs tracking-wider uppercase font-semibold border border-white/10"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-4 h-4 fill-white" />
      <span className="hidden sm:inline-block">Consult via WhatsApp</span>
    </motion.a>
  );
}
