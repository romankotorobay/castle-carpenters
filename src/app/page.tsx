"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  Award, 
  Layers, 
  Compass, 
  Maximize, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Send, 
  ChevronLeft,
  ChevronRight,
  Eye,
  Hammer
} from "lucide-react";

import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import ProjectCard, { Project } from "@/components/ProjectCard";
import BackToTop from "@/components/BackToTop";

// Projects Data
const projects: Project[] = [
  {
    image: "/images/filler.jpeg"
  },
  {
    image: "/images/filler.jpeg"
  },
  {
    image: "/images/filler.jpeg",
  },
  {
    image: "/images/filler.jpeg",
  },
  {
    image: "/images/filler.jpeg",
  },
  {
    image: "/images/filler.jpeg",
  },
];

// Services Data
const services = [
  {
    icon: Sparkles,
    title: "Remodeling",
    description: "Enhancing your home with up-to-date asthetics and craftsmanship."
  },
  {
    icon: Hammer,
    title: "Renovation",
    description: "Ensuring your home is structurally safe & sound with expert knowledge."
  },
  {
    icon: Layers,
    title: "Finish Work",
    description: "Increasing the livability of your home via basement finishes and deck building."
  },
  {
    icon: Sparkles,
    title: "Small Repairs",
    description: "Providing handyman services for smaller scaled jobs."
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "John Doe",
    quote: "quote"
  },
  {
    name: "Jane Doe",
    quote: "quote"
  },
  {
    name: "Billy Kid",
    quote: "quote"
  }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Parallax Hero Effect
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.2]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(data?.error || "We could not send your message. Please try again.");
      }

      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <LoadingScreen />
      <Navbar />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden bg-brand-dark flex items-center justify-center"
      >
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-brand-dark/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/40 z-10" />
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/filler.jpeg" 
              alt="NovaNest Luxury Living Room" 
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left text-brand-bg flex flex-col justify-center h-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-[11px] sm:text-xs tracking-[0.4em] uppercase text-brand-secondary font-semibold mb-6"
            >
              High-Quality Carpentry & Remodeling Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-[1.1] mb-8"
            >
              {/*change this */}
              Design Spaces That Inspire Everyday Living
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-primary text-brand-bg px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-secondary hover:text-brand-dark transition-all duration-300 rounded-sm"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-brand-bg/40 text-brand-bg px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-bg hover:text-brand-dark hover:border-brand-bg transition-all duration-300 rounded-sm"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-brand-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Story & Philosophy */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold">
                  About Castle Carpenters
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-brand-dark">
                  Carpentry & Remodeling Services - Fortify Your Home
                </h2>
              </div>

              <div className="space-y-6 text-brand-accent font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                <p>
                  Your home is your kingdom, don't let it fall into ruin. Small problems can quickly add up to expensive repairs if they aren't addressed. 
                  Allow us to service your home to save you from those costly repairs down the line. We offer top to bottom service and maintenance...
                </p>
                <p>
                  Serving the Western Massachusetts area, Castle Carpenters takes pride in providing high quality results.
                </p>
              </div>

              {/* commitment statement */}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 pt-4">
                <div className="space-y-2 border-l border-brand-secondary/40 pl-6">
                  <h4 className="font-serif text-lg text-brand-dark">Our Commitment to You</h4>
                  <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed">
                    At Castle Carpenters, we take the utmost pride in our work. We ensure that each job is completed to your specifications while
                    maintaining clear communication throughout the project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
            <div className="space-y-4">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold">
                Portfolio
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-brand-dark">
                Featured Projects
              </h2>
            </div>
            <p className="font-sans text-sm text-brand-accent max-w-md leading-relaxed">
              Explore our portfolio and see how we can transform the most important areas of your home.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold mb-3">
              Expertise
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-brand-dark">
              Our Core Services
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-brand-bg/40 hover:bg-white border border-brand-secondary/10 hover:border-brand-secondary/20 p-8 rounded-sm shadow-sm transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-brand-secondary/15 text-brand-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-light text-brand-dark mb-3">
                    {service.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold mb-3">
              Why Choose Us
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-brand-dark">
              Precision In Execution
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-accent mt-4 leading-relaxed">
              We operate under meticulous standards, making sure every corner represents premium craft and accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="flex justify-center mb-8">
            <Quote className="w-10 h-10 text-brand-secondary/40" />
          </div>

          <div className="relative h-[250px] md:h-[180px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-6"
              >
                <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-brand-dark max-w-4xl mx-auto">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-sans text-xs tracking-widest uppercase font-semibold text-brand-primary">
                    {testimonials[activeTestimonial].name}
                  </h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-brand-bg text-brand-dark border border-brand-secondary/25 hover:bg-brand-primary hover:text-white transition-colors duration-300 rounded-full"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? "w-4 bg-brand-primary" : "bg-brand-secondary"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-3 bg-brand-bg text-brand-dark border border-brand-secondary/25 hover:bg-brand-primary hover:text-white transition-colors duration-300 rounded-full"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Service Areas */}
      <section id="contact" className="py-20 md:py-32 bg-white border-b border-brand-secondary/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold">
                  Locations
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">
                  Area of Service
                </h2>
                <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed max-w-sm">
                  Serving the Western Massachusetts area.
                </p>
              </div>

              <div className="space-y-8 font-sans text-xs sm:text-sm text-brand-dark">
                
                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-brand-secondary/15 text-brand-primary h-fit rounded-sm shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-brand-accent mt-1 leading-relaxed">
                      Springfield, MA<br />
                      West Springfield, MA<br />
                      Chicopee, MA<br />
                      Westfield, MA<br />
                      Holyoke, MA<br />
                      Agawam, MA<br />
                      Ludlow, MA<br />
                      And more<br />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service area map */}
            <div className="lg:col-span-7 w-full aspect-[4/3] relative rounded-md overflow-hidden bg-brand-secondary/10 shadow-lg border border-brand-secondary/20">
              <iframe
                title="Hampden County, Massachusetts service area"
                src="https://maps.google.com/maps?q=Hampden%20County%2C%20MA&hl=en&z=10&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-20 md:py-32 bg-brand-bg text-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Context Left */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark leading-tight">
                Contact Us
              </h2>
              <p className="font-sans text-sm text-brand-bg/75 text-brand-primary">
                Schedule an appointment for a free estimate
              </p>
              
              <div className="space-y-4 pt-4 border-t text-brand-primary font-sans text-xs sm:text-sm">
                <p className="flex items-center gap-3">
                  <span><em>We typically respond within 1-2 business days</em></span>
                </p>
              </div>
            </div>

            {/* Form Right */}
            <div className="lg:col-span-7 bg-white text-brand-dark p-8 md:p-12 border border-white/10 rounded-sm shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleFormChange}
                          placeholder="e.g. John Doe"
                          className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans placeholder:text-brand-accent/40"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleFormChange}
                          placeholder="e.g. john@example.com"
                          className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans placeholder:text-brand-accent/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="phone" className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleFormChange}
                          placeholder="e.g. +1 (413) 555-1234"
                          className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans placeholder:text-brand-accent/40"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="message" className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleFormChange}
                        placeholder="Briefly describe the scope of your project..."
                        className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans placeholder:text-brand-accent/40 resize-none"
                      />
                    </div>

                    {submitError ? (
                      <p role="alert" className="font-sans text-sm text-brand-primary">
                        {submitError}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center gap-3 bg-brand-primary hover:bg-brand-dark text-white py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm disabled:bg-brand-accent"
                    >
                      {isSubmitting ? "Submitting Request..." : "Submit"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 bg-brand-secondary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-3xl font-light text-brand-dark">Thank You</h3>
                      <p className="font-sans text-sm text-brand-accent leading-relaxed max-w-sm mx-auto">
                        Your contact card has been submitted. We will contact you within 1-2 business days.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-2 border border-brand-secondary/40 px-6 py-2.5 text-xs font-semibold tracking-wider text-brand-primary uppercase hover:bg-brand-primary hover:text-white transition-all duration-300"
                    >
                      Back to Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Buttons & Indicators */}
      <BackToTop />
    </>
  );
}
