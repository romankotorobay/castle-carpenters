"use client";

import { motion } from "framer-motion";
import { MessageSquare, Compass, Palette, HardHat, CheckCircle } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    description: "An initial deep-dive discussion to capture your aesthetic preferences, functional needs, timeline, and budget.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Planning & Architecture",
    description: "Detailed space planning, floor layouts, and architectural drafting to establish structural integrity.",
    icon: Compass,
  },
  {
    number: "03",
    title: "Concept Design",
    description: "Bespoke mood boards, 3D visualizations, and custom material selections to bring the design concept to life.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Construction & Execution",
    description: "Sourcing premium materials, coordinating master artisans, and supervising on-site construction.",
    icon: HardHat,
  },
  {
    number: "05",
    title: "Final Staging & Delivery",
    description: "Bespoke styling, placement of custom furniture, and final walk-through delivery of your tailored space.",
    icon: CheckCircle,
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.3em] uppercase text-brand-accent font-semibold mb-3"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-light text-brand-dark"
          >
            Our Design Journey
          </motion.h2>
        </div>

        {/* Timeline Desktop */}
        <div className="relative hidden md:block">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-brand-secondary/35 -translate-x-1/2" />

          <div className="space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <div key={step.number} className="flex items-center justify-between w-full">
                  {/* Left Side */}
                  <div className={`w-[45%] ${isEven ? "text-right" : "order-last text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="space-y-3"
                    >
                      <span className="font-serif text-stroke text-5xl font-bold tracking-wider opacity-60">
                        {step.number}
                      </span>
                      <h3 className="font-serif text-2xl font-light text-brand-dark">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm text-brand-accent leading-relaxed max-w-md inline-block">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Badge (Center) */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="z-10 flex items-center justify-center w-12 h-12 bg-brand-bg border border-brand-primary rounded-full shadow-lg"
                  >
                    <Icon className="w-5 h-5 text-brand-primary" />
                  </motion.div>

                  {/* Empty Right Side for balance */}
                  <div className="w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Mobile */}
        <div className="relative md:hidden space-y-16 pl-8 border-l border-brand-secondary/30 ml-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative space-y-2"
              >
                {/* Timeline icon placement */}
                <div className="absolute -left-[45px] top-1 flex items-center justify-center w-8 h-8 bg-brand-bg border border-brand-primary rounded-full">
                  <Icon className="w-4 h-4 text-brand-primary" />
                </div>

                <span className="font-serif text-stroke text-4xl font-bold tracking-wider opacity-60 block">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl font-light text-brand-dark">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
