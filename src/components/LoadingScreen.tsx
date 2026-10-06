"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 2200);
    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg text-brand-dark"
        >
          <div className="flex flex-col items-center text-center px-4">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-4xl md:text-6xl tracking-[0.2em] uppercase mb-4"
            >
              Castle Carpenters
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-8"
            >
              Carpentry, Remodeling & Renovations
            </motion.p>

            <div className="w-48 h-[2px] bg-brand-secondary/20 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="absolute top-0 bottom-0 left-0 w-full bg-brand-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
