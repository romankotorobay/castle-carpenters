"use client";

import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-secondary/15 py-4 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex flex-col select-none">
            <span className="font-serif text-2xl tracking-[0.15em] uppercase text-brand-dark font-medium">
              NovaNest
            </span>
            <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-brand-accent mt-0.5">
              Interiors & Architecture
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-brand-dark/70 hover:text-brand-primary transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#consultation"
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 text-[10px] font-semibold tracking-widest uppercase hover:bg-brand-primary transition-all duration-300 rounded-sm"
            >
              Book Consultation
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-brand-dark hover:text-brand-primary p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-brand-bg border-b border-brand-secondary/20 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans text-xs tracking-[0.2em] uppercase text-brand-dark font-medium hover:text-brand-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#consultation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex justify-center items-center gap-2 bg-brand-dark text-white py-3 text-[10px] font-semibold tracking-widest uppercase hover:bg-brand-primary transition-colors"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
