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
import Stats from "@/components/Stats";
import ProcessTimeline from "@/components/ProcessTimeline";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectCard, { Project } from "@/components/ProjectCard";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

// Projects Data
const projects: Project[] = [
  {
    title: "Luxury Villa",
    image: "/images/project-villa.jpg",
    location: "Beverly Hills, CA",
    area: "5,400 SQ FT",
    year: "2025",
  },
  {
    title: "Modern Apartment",
    image: "/images/project-apartment.jpg",
    location: "Stockholm, SE",
    area: "1,800 SQ FT",
    year: "2024",
  },
  {
    title: "Corporate Office",
    image: "/images/project-office.jpg",
    location: "London, UK",
    area: "12,500 SQ FT",
    year: "2024",
  },
  {
    title: "Hotel Lobby",
    image: "/images/project-lobby.jpg",
    location: "Milan, IT",
    area: "8,200 SQ FT",
    year: "2025",
  },
  {
    title: "Cafe Interior",
    image: "/images/project-cafe.jpg",
    location: "Copenhagen, DK",
    area: "1,200 SQ FT",
    year: "2023",
  },
  {
    title: "Restaurant Design",
    image: "/images/project-restaurant.jpg",
    location: "Paris, FR",
    area: "3,500 SQ FT",
    year: "2024",
  },
];

// Services Data
const services = [
  {
    icon: Compass,
    title: "Interior Design",
    description: "Bespoke residential & commercial planning tailored to custom spatial aesthetics."
  },
  {
    icon: Layers,
    title: "Architecture",
    description: "Structural design from conceptual blueprint drafts to full execution supervision."
  },
  {
    icon: Maximize,
    title: "Space Planning",
    description: "Optimizing flow, function, and comfort to elevate your everyday environment."
  },
  {
    icon: Sparkles,
    title: "Furniture Design",
    description: "Custom-curated material sourcing and design of tailored furniture units."
  },
  {
    icon: Hammer,
    title: "Renovation",
    description: "Transformative retrofits honoring historic frameworks with modern conveniences."
  },
  {
    icon: Award,
    title: "Landscape Design",
    description: "Fluid indoor-outdoor landscaping blueprints that sync natural surroundings."
  },
  {
    icon: Eye,
    title: "3D Visualization",
    description: "Immersive photorealistic renders providing high-fidelity digital walkthroughs."
  },
  {
    icon: CheckCircle2,
    title: "Turnkey Projects",
    description: "Full end-to-end design, construction coordination, and final staging handover."
  }
];

// Why Choose Us Data
const advantages = [
  {
    title: "Award Winning Studio",
    description: "Global recognition in multiple design forums for aesthetic merit and creative planning."
  },
  {
    title: "Experienced Team",
    description: "Dedicated crew of registered architects, master structural detailers, and project managers."
  },
  {
    title: "Premium Raw Materials",
    description: "Exclusive partnerships with European stone quarries, timber mills, and textile houses."
  },
  {
    title: "Transparent Pricing",
    description: "Detailed, cost-itemized budgeting with no hidden overheads or surprise commissions."
  },
  {
    title: "Custom Tailored Designs",
    description: "Zero templates. Every outline, profile, and finish is sketched uniquely for you."
  },
  {
    title: "Timely Delivery Guarantee",
    description: "Rigorous milestone scheduling and agile coordination ensuring prompt completions."
  }
];

// Team Data
const team = [
  {
    name: "Eleanor Vance",
    role: "Lead Interior Designer",
    experience: "12 Years Experience",
    specialization: "Residential Estates",
    awards: "AD100 Designer, Best Residential Space 2024",
    image: "/images/designer-1.jpg"
  },
  {
    name: "Marcus Thorne",
    role: "Principal Architect",
    experience: "15 Years Experience",
    specialization: "Sustainable Structures",
    awards: "Pritzker Nominee, Green Design Award 2023",
    image: "/images/designer-2.jpg"
  },
  {
    name: "Sophia Lin",
    role: "Senior Furniture Designer",
    experience: "8 Years Experience",
    specialization: "Custom Joinery & Seating",
    awards: "Red Dot Design Winner, IF Design Award",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
  }
];

// Testimonials Data
const testimonials = [
  {
    name: "Charlotte & Pierre V.",
    project: "Beverly Hills Villa",
    rating: 5,
    quote: "NovaNest turned our house into a work of art. The layout maximizes natural light, and the custom furniture pieces are breathtaking. Their design workflow was professional and impeccable."
  },
  {
    name: "Alexander Mercer",
    project: "Mercer Corporate Office",
    rating: 5,
    quote: "The biophilic layout of our London head office has transformed our daily work culture. Clients are constantly commenting on the sleek concrete and lush greenery balances. A masterclass in workplace architecture."
  },
  {
    name: "Celine Dumont",
    project: "Dumont Cafe & Lounge",
    rating: 5,
    quote: "An extraordinary Scandinavian cafe setup. The light oak joinery, natural flow, and cozy lighting create the exact warm aesthetic we wanted. They delivered ahead of schedule!"
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
    projectType: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.projectType) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        budget: "",
        message: ""
      });
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setNewsletterSubmitted(true);
      setNewsletterEmail("");
    }, 1200);
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
              src="/images/hero-bg.jpg" 
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
              Exquisite Interiors & Architecture
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-[1.1] mb-8"
            >
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
                View Portfolio
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-brand-bg/40 text-brand-bg px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-bg hover:text-brand-dark hover:border-brand-bg transition-all duration-300 rounded-sm"
              >
                Book Consultation
              </a>
            </motion.div>
          </div>
        </div>

        {/* Animated Floating Design Cards */}
        <div className="hidden lg:block absolute right-12 top-1/3 z-20 space-y-6 max-w-xs">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-sm shadow-xl text-brand-bg"
          >
            <span className="font-serif text-xs text-brand-secondary uppercase tracking-widest block mb-1">01 / Aesthetic</span>
            <h4 className="font-serif text-lg font-light">Luminous Textures</h4>
            <p className="font-sans text-[11px] text-brand-bg/70 leading-relaxed mt-2">Bespoke integrations of organic linen, boucle fabrics, and warm white plaster.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-sm shadow-xl text-brand-bg translate-x-6"
          >
            <span className="font-serif text-xs text-brand-secondary uppercase tracking-widest block mb-1">02 / Architecture</span>
            <h4 className="font-serif text-lg font-light">Minimalist Alignment</h4>
            <p className="font-sans text-[11px] text-brand-bg/70 leading-relaxed mt-2">Clean horizontal geometry, double height glazing, and fluid circulation paths.</p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-brand-bg/60 mb-2">Scroll Down</span>
          <div className="w-[1px] h-8 bg-brand-bg/30 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-brand-secondary"
            />
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
                  About NovaNest
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-brand-dark">
                  Designing Spaces That Echo Quiet Luxury
                </h2>
              </div>

              <div className="space-y-6 text-brand-accent font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                <p>
                  Founded on the principles of spatial harmony, magazine-grade layouts, and organic materials, NovaNest Interiors constructs high-end residential and commercial estates. We strike a fine equilibrium between the architectural raw forms of Scandinavian minimalism and the eclectic texture layering of modern luxury design.
                </p>
                <p>
                  Our mission is simple: to carve functional, highly personalized environments that inspire daily ritual. We focus on the tiny margins—the direction of ambient shadows, the joinery of customized cabinetry, and the tactility of European stones.
                </p>
              </div>

              {/* Mission / Philosophy Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2 border-l border-brand-secondary/40 pl-6">
                  <h4 className="font-serif text-lg text-brand-dark">Our Philosophy</h4>
                  <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed">
                    Spaces must serve the inhabitant, utilizing raw textures, natural light routes, and high-quality bespoke components.
                  </p>
                </div>
                <div className="space-y-2 border-l border-brand-secondary/40 pl-6">
                  <h4 className="font-serif text-lg text-brand-dark">Our Commitment</h4>
                  <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed">
                    Uncompromised execution, clear cost structures, and rigorous project schedules from draft to keys handover.
                  </p>
                </div>
              </div>
            </div>

            {/* Awards & Timeline */}
            <div className="lg:col-span-5 bg-white p-8 md:p-12 border border-brand-secondary/15 rounded-sm shadow-sm space-y-12">
              <div>
                <h3 className="font-serif text-2xl font-light text-brand-dark mb-6">Recognitions & Awards</h3>
                <ul className="space-y-4 font-sans text-xs tracking-wider text-brand-accent">
                  <li className="flex justify-between border-b border-brand-secondary/10 pb-2">
                    <span>ARCHDAILY DESIGN STUDIO NOMINEE</span>
                    <span className="text-brand-primary">2025</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-secondary/10 pb-2">
                    <span>AD100 DECOR AWARD</span>
                    <span className="text-brand-primary">2024</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-secondary/10 pb-2">
                    <span>RED DOT DESIGN CONCEPT WINNER</span>
                    <span className="text-brand-primary">2023</span>
                  </li>
                  <li className="flex justify-between border-b border-brand-secondary/10 pb-2">
                    <span>INTERNATIONAL PLANNERS CUP</span>
                    <span className="text-brand-primary">2022</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-light text-brand-dark mb-6">Our Milestones</h3>
                <div className="relative pl-6 border-l border-brand-secondary/35 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 bg-brand-primary rounded-full" />
                    <span className="font-serif text-sm font-semibold text-brand-primary">2012</span>
                    <h5 className="font-serif text-base text-brand-dark mt-0.5">Studio Inception</h5>
                    <p className="font-sans text-xs text-brand-accent mt-1">Founded in Stockholm, targeting boutique residential renovations.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 bg-brand-primary rounded-full" />
                    <span className="font-serif text-sm font-semibold text-brand-primary">2018</span>
                    <h5 className="font-serif text-base text-brand-dark mt-0.5">Architectural Expansion</h5>
                    <p className="font-sans text-xs text-brand-accent mt-1">Incorporated full architectural licensing and commercial planning.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 bg-brand-primary rounded-full" />
                    <span className="font-serif text-sm font-semibold text-brand-primary">2023</span>
                    <h5 className="font-serif text-base text-brand-dark mt-0.5">Global Presence</h5>
                    <p className="font-sans text-xs text-brand-accent mt-1">Opening studios in London and Los Angeles for international builds.</p>
                  </div>
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
              Explore our curation of award-winning interior and architectural projects. Each design represents a bespoke journey of form, layout, and materiality.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* Before / After Section */}
      <section className="py-20 md:py-32 bg-brand-bg border-y border-brand-secondary/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold mb-3">
              Spatial Transformations
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-brand-dark">
              Restoration & Renovation
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-accent mt-4 leading-relaxed">
              Drag the interactive slider to view the drastic change between our client&apos;s initial 1980s layout and the final tailored lounge design.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold mb-3">
              Expertise
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-brand-dark">
              Our Core Services
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-accent mt-4 leading-relaxed">
              NovaNest provides a complete spectrum of design offerings, from spatial planning to luxury turnkey handovers.
            </p>
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

      {/* Statistics Section */}
      <Stats />

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-brand-bg">
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
              We operate under meticulous standards, making sure every corner represents premium craft and absolute accountability.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-8 border border-brand-secondary/15 rounded-sm shadow-sm flex flex-col space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                  <h4 className="font-serif text-lg font-light text-brand-dark">
                    {item.title}
                  </h4>
                </div>
                <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Timeline Process Section */}
      <section id="process" className="bg-white">
        <ProcessTimeline />
      </section>

      {/* Designers / Team Section */}
      <section id="team" className="py-20 md:py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold mb-3">
              Creative Minds
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-brand-dark">
              Meet The Artisans
            </h2>
            <p className="font-sans text-xs sm:text-sm text-brand-accent mt-4 leading-relaxed">
              Meet the licensed architects, spatial designers, and coordinators behind our award-winning projects.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="bg-white border border-brand-secondary/15 rounded-sm overflow-hidden shadow-sm flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-brand-secondary/15">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Details */}
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div className="space-y-2">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-brand-primary font-semibold">
                      {member.role}
                    </p>
                    <h3 className="font-serif text-2xl font-light text-brand-dark">
                      {member.name}
                    </h3>
                    <p className="font-sans text-xs text-brand-accent mt-3 leading-relaxed">
                      {member.experience} &bull; {member.specialization}
                    </p>
                  </div>
                  <div className="border-t border-brand-secondary/15 mt-6 pt-4">
                    <p className="font-sans text-[10px] uppercase tracking-wider text-brand-accent font-medium leading-relaxed">
                      <strong>Awards:</strong> {member.awards}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
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
                  <span className="font-sans text-[10px] tracking-wider text-brand-accent uppercase mt-1 inline-block">
                    Client &bull; {testimonials[activeTestimonial].project}
                  </span>
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

      {/* Consultation Form Section */}
      <section id="consultation" className="py-20 md:py-32 bg-brand-dark text-brand-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Context Left */}
            <div className="lg:col-span-5 space-y-6">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-secondary font-semibold">
                Start Today
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-light leading-tight">
                Let&apos;s Curate Your Vision
              </h2>
              <p className="font-sans text-sm text-brand-bg/75 leading-relaxed">
                Whether a comprehensive structural blueprint or custom room restorations, our designers are ready to translate your lifestyle guidelines into functional luxury.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-white/10 font-sans text-xs sm:text-sm">
                <p className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-brand-secondary" />
                  <span>Interactive walkthrough consultation included</span>
                </p>
                <p className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-brand-secondary" />
                  <span>Itemized quotes and strict deadline delivery</span>
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
                          placeholder="e.g. +1 555 1234"
                          className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans placeholder:text-brand-accent/40"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="projectType" className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent">Project Type *</label>
                        <select
                          id="projectType"
                          name="projectType"
                          required
                          value={formState.projectType}
                          onChange={handleFormChange}
                          className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans text-brand-dark/80 bg-white"
                        >
                          <option value="">Select an option</option>
                          <option value="Residential Design">Residential Design</option>
                          <option value="Architectural Blueprinting">Architectural Blueprinting</option>
                          <option value="Bespoke Furniture Joinery">Bespoke Furniture Joinery</option>
                          <option value="Commercial Office Renovation">Commercial Office Renovation</option>
                          <option value="Landscape Consultation">Landscape Consultation</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label htmlFor="budget" className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent">Estimated Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formState.budget}
                        onChange={handleFormChange}
                        className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans text-brand-dark/80 bg-white"
                      >
                        <option value="">Select range</option>
                        <option value="$10,000 - $30,000">$10,000 - $30,000</option>
                        <option value="$30,000 - $80,000">$30,000 - $80,000</option>
                        <option value="$80,000 - $150,000">$80,000 - $150,000</option>
                        <option value="$150,000+">$150,000+</option>
                      </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label htmlFor="message" className="font-sans text-[10px] tracking-widest uppercase font-semibold text-brand-accent">Vision / Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleFormChange}
                        placeholder="Briefly describe your dream space requirements..."
                        className="border-b border-brand-secondary/35 focus:border-brand-primary outline-none py-2 text-sm font-sans placeholder:text-brand-accent/40 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center gap-3 bg-brand-primary hover:bg-brand-dark text-white py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm disabled:bg-brand-accent"
                    >
                      {isSubmitting ? "Submitting Request..." : "Request Call-Back"}
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
                        Your consultation ticket has been recorded. A senior project architect will contact you within 24 business hours.
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

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-brand-bg border-b border-brand-secondary/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Info */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-brand-primary font-semibold">
                  Location
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">
                  Visit Our Studio
                </h2>
                <p className="font-sans text-xs sm:text-sm text-brand-accent leading-relaxed max-w-sm">
                  We look forward to hosting you for a material library walkthrough and sketching session.
                </p>
              </div>

              <div className="space-y-8 font-sans text-xs sm:text-sm text-brand-dark">
                
                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-brand-secondary/15 text-brand-primary h-fit rounded-sm shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold uppercase tracking-wider text-brand-dark">Office Address</h4>
                    <p className="text-brand-accent mt-1 leading-relaxed">
                      1428 Nordic Avenue, Suite 400<br />
                      Stockholm, SE 111 22
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-brand-secondary/15 text-brand-primary h-fit rounded-sm shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold uppercase tracking-wider text-brand-dark">Phone Numbers</h4>
                    <p className="text-brand-accent mt-1">
                      Office: +46 (8) 123 4567<br />
                      Hotline: +46 (8) 765 4321
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-brand-secondary/15 text-brand-primary h-fit rounded-sm shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold uppercase tracking-wider text-brand-dark">Inquiries</h4>
                    <p className="text-brand-accent mt-1">
                      General: studio@novanest-interiors.com<br />
                      Careers: build@novanest-interiors.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-white border border-brand-secondary/15 text-brand-primary h-fit rounded-sm shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold uppercase tracking-wider text-brand-dark">Studio Hours</h4>
                    <p className="text-brand-accent mt-1">
                      Monday &ndash; Friday: 09:00 &ndash; 18:00<br />
                      Saturday: By Prior Appointment Only
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map Mockup */}
            <div className="lg:col-span-7 w-full aspect-[4/3] relative rounded-md overflow-hidden bg-brand-secondary/10 shadow-lg border border-brand-secondary/20">
              {/* Fallback to custom vector map overlay since standard iframe is slow and styling cannot be matched */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 text-brand-dark font-sans bg-brand-bg/40">
                <div className="space-y-1.5">
                  <span className="font-serif text-[10px] tracking-widest uppercase font-semibold text-brand-primary">Studio Location Map</span>
                  <h4 className="font-serif text-2xl font-light">Stockholm HQ</h4>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-[11px] text-brand-accent uppercase tracking-wider">
                    Latitude: 59.3293&deg; N &bull; Longitude: 18.0686&deg; E
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 text-[10px] font-semibold tracking-widest uppercase hover:bg-brand-primary transition-all duration-300 rounded-sm shadow-md"
                  >
                    Open Google Maps
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Grid Background simulating drafting board/blueprint */}
              <div 
                className="absolute inset-0 w-full h-full opacity-60" 
                style={{
                  backgroundImage: `
                    radial-gradient(circle, rgba(139, 94, 60, 0.1) 1px, transparent 1px),
                    linear-gradient(to right, rgba(139, 94, 60, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(139, 94, 60, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px, 12px 12px, 12px 12px"
                }}
              />
              {/* Stylized vector map graphics */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full text-brand-secondary/20 fill-none stroke-brand-secondary/35 stroke-[1.5]" viewBox="0 0 400 300">
                  {/* Roads / Paths */}
                  <path d="M 0 50 L 400 200 M 0 100 Q 150 150 400 50 M 100 0 L 100 300 M 280 0 L 280 300" />
                  {/* Island contour */}
                  <path d="M 50 120 C 120 80, 280 180, 350 120 C 370 190, 310 280, 180 250 C 100 220, 30 180, 50 120 Z" fill="rgba(214, 194, 168, 0.15)" stroke="rgba(214, 194, 168, 0.4)" />
                  {/* Pins */}
                  <g transform="translate(180, 200)">
                    <circle cx="0" cy="0" r="16" fill="rgba(139, 94, 60, 0.2)" />
                    <circle cx="0" cy="0" r="6" fill="#8B5E3C" />
                    <text x="12" y="4" className="font-serif text-[11px] font-bold fill-brand-dark stroke-none tracking-widest uppercase">NOVANEST HQ</text>
                  </g>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-brand-dark text-brand-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
            
            {/* Column 1 Logo */}
            <div className="lg:col-span-4 space-y-6">
              <a href="#" className="flex flex-col select-none">
                <span className="font-serif text-3xl tracking-[0.15em] uppercase text-white font-medium">
                  NovaNest
                </span>
                <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-brand-secondary mt-1">
                  Interiors & Architecture
                </span>
              </a>
              <p className="font-sans text-xs text-brand-bg/60 leading-relaxed max-w-sm">
                Creating luxury, quiet spaces that honor texture, scale, and function. A global studio serving residential and commercial projects.
              </p>
            </div>

            {/* Column 2 Services */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-white">Services</h4>
              <ul className="space-y-2.5 font-sans text-xs text-brand-bg/50">
                <li><a href="#services" className="hover:text-brand-secondary transition-colors duration-200">Interior Design</a></li>
                <li><a href="#services" className="hover:text-brand-secondary transition-colors duration-200">Architecture</a></li>
                <li><a href="#services" className="hover:text-brand-secondary transition-colors duration-200">Space Planning</a></li>
                <li><a href="#services" className="hover:text-brand-secondary transition-colors duration-200">Furniture Customization</a></li>
              </ul>
            </div>

            {/* Column 3 Projects */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-white">Projects</h4>
              <ul className="space-y-2.5 font-sans text-xs text-brand-bg/50">
                <li><a href="#projects" className="hover:text-brand-secondary transition-colors duration-200">Luxury Villa</a></li>
                <li><a href="#projects" className="hover:text-brand-secondary transition-colors duration-200">Stockholm Apartment</a></li>
                <li><a href="#projects" className="hover:text-brand-secondary transition-colors duration-200">Corporate Offices</a></li>
                <li><a href="#projects" className="hover:text-brand-secondary transition-colors duration-200">Milan Lobby</a></li>
              </ul>
            </div>

            {/* Column 4 Newsletter */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-white">Newsletter</h4>
              <p className="font-sans text-xs text-brand-bg/60 leading-relaxed">
                Subscribe to receive our seasonal journal covering design trends, material sourcing, and structural blueprints.
              </p>
              
              <AnimatePresence mode="wait">
                {!newsletterSubmitted ? (
                  <motion.form 
                    key="newsletter-form"
                    onSubmit={handleNewsletterSubmit}
                    className="flex border-b border-white/20 pb-1"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address"
                      className="bg-transparent border-none outline-none text-xs font-sans w-full py-2 placeholder:text-brand-bg/30 text-white"
                    />
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="text-brand-secondary hover:text-white px-2 py-2"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.p
                    key="newsletter-success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    className="font-sans text-xs text-brand-secondary"
                  >
                    Thank you! You have joined our journal list.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Socials & Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 mt-8 text-brand-bg/40 font-sans text-xs gap-4">
            <p>&copy; {new Date().getFullYear()} NovaNest Studio. All Rights Reserved.</p>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-secondary transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-secondary transition-colors">Pinterest</a>
              <a href="#" className="hover:text-brand-secondary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-brand-secondary transition-colors">Twitter</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Buttons & Indicators */}
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
