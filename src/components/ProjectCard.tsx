"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface Project {
  title: string;
  image: string;
  location: string;
  area: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="group flex flex-col space-y-4"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-secondary/10 rounded-sm shadow-sm">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Dark Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-500 flex items-center justify-center">
          <div className="w-10 h-10 bg-brand-bg/95 border border-brand-secondary/30 rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-md">
            <ArrowUpRight className="w-4 h-4 text-brand-primary" />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-baseline">
          <h3 className="font-serif text-xl sm:text-2xl font-light text-brand-dark group-hover:text-brand-primary transition-colors duration-300">
            {project.title}
          </h3>
          <span className="font-sans text-[10px] tracking-widest text-brand-accent uppercase">
            {project.year}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 border-t border-brand-secondary/15 pt-2 text-[11px] sm:text-xs tracking-wider text-brand-accent font-medium uppercase font-sans">
          <span>{project.location}</span>
          <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full" />
          <span>{project.area}</span>
        </div>
      </div>
    </motion.div>
  );
}
