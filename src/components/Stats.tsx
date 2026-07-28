"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const statsData: StatItem[] = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 240, suffix: "+", label: "Projects Completed" },
  { value: 18, suffix: "", label: "Design Awards" },
  { value: 99, suffix: "%", label: "Satisfied Clients" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1.5; // seconds
    const totalFrames = 60;
    const frameDuration = (duration * 1000) / totalFrames;
    const increment = Math.ceil(end / totalFrames);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-brand-primary tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="w-full bg-white py-16 md:py-24 border-y border-brand-secondary/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-brand-accent font-medium mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
