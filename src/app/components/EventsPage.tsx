import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SEOHead } from "./SEOHead";
import { useNavigate, useParams, Link } from "react-router";
import {
  Calendar, MapPin, Clock, Users, ChevronRight,
  Code, PenTool, Award, Mic, ArrowLeft, Star,
  Zap, ExternalLink, Activity
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const galleryImages = [
  "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMGF1ZGllbmNlfGVufDF8fHx8MTc3NjA2NzcwNnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1640163561346-7778a2edf353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtfGVufDF8fHx8MTc3NjE2Mjk5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1641189574281-a53f6a79d704?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBjb21wZXRpdGlvbiUyMHdpbm5lcnxlbnwxfHx8fDE3NzYxNjI5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1558008322-9793c57cb73b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdG91cm5hbWVudCUyMGNyb3dkfGVufDF8fHx8MTc3NjE2Mjk5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGFwdG9wJTIwY29kaW5nfGVufDF8fHx8MTc3NjE2Mjk5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NjE2Mjk5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1728934911213-fb4fc7f98f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBldmVudCUyMG5pZ2h0fGVufDF8fHx8MTc3NjE2MzAwMHww&ixlib=rb-4.1.0&q=80&w=1080"
];

const eventCategories = [
  {
    slug: "workshops",
    title: "Workshops",
    icon: PenTool,
    tagline: "HANDS-ON LEARNING EXPERIENCES",
    color: "#00E5FF",
    colorAlt: "#0EA5E9",
    image: "https://images.unsplash.com/photo-1707872411334-a010576bc185?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwd29ya3Nob3AlMjB0ZWNofGVufDF8fHx8MTc3NjE2MjQyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Deep dive into new technologies with our hands-on workshops led by industry experts and senior members. From mastering React to understanding neural networks, our workshops provide practical, real-world skills.",
    pastCount: 45,
    upcoming: [
      { id: "w1", title: "Web3 & Smart Contracts", date: "May 5, 2026", location: "Virtual / Discord", difficulty: "Intermediate" },
      { id: "w2", title: "Advanced UI/UX Motion", date: "May 12, 2026", location: "Design Lab 3", difficulty: "Advanced" }
    ]
  },
  {
    slug: "hackathons",
    title: "Hackathons",
    icon: Code,
    tagline: "48 HOURS OF PURE INNOVATION",
    color: "#A855F7",
    colorAlt: "#7C3AED",
    image: "https://images.unsplash.com/photo-1772971919700-d75c91ca7efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBoYWNrYXRob24lMjBjb2Rpbmd8ZW58MXx8fHwxNzc2MTYyNDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Compete, collaborate, and create. Our hackathons are the ultimate test of endurance, creativity, and coding skills. Build working prototypes under pressure, pitch to industry judges, and win massive prizes.",
    pastCount: 12,
    upcoming: [
      { id: "h1", title: "CyberNova Hackathon 2026", date: "April 20-22, 2026", location: "Main Campus Hub", difficulty: "All Levels" }
    ]
  },
  {
    slug: "competitions",
    title: "Competitions",
    icon: Award,
    tagline: "TEST YOUR LIMITS",
    color: "#F59E0B",
    colorAlt: "#D97706",
    image: "https://images.unsplash.com/photo-1772587003187-65b32c91df91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc2MTYyNDI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "From algorithmic battles and competitive programming to UI/UX showdowns and CTFs (Capture The Flag), our competitions push you to be your absolute best in a competitive yet supportive environment.",
    pastCount: 30,
    upcoming: [
      { id: "c1", title: "AlgoStrike: Spring Edition", date: "June 10, 2026", location: "Lab Complex A", difficulty: "Hard" },
      { id: "c2", title: "Design Wars v4.0", date: "June 25, 2026", location: "Virtual", difficulty: "Intermediate" }
    ]
  },
  {
    slug: "seminars",
    title: "Seminars",
    icon: Mic,
    tagline: "LEARN FROM THE VISIONARIES",
    color: "#EC4899",
    colorAlt: "#DB2777",
    image: "https://images.unsplash.com/photo-1654455331552-ee7cf7f70393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHN0YWdlJTIwbmVvbnxlbnwxfHx8fDE3NzYxNjI0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Gain insights from industry leaders, alumni, and tech visionaries through our interactive seminar series. Learn about the future of tech, career pathways, and insider knowledge you won't find in textbooks.",
    pastCount: 85,
    upcoming: [
      { id: "s1", title: "The Future of AGI", date: "May 20, 2026", location: "Auditorium 1", difficulty: "Beginner Friendly" }
    ]
  }
];

export function EventsListingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #00E5FF 0%, transparent 70%)", filter: "blur(100px)" }}
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #EC4899 0%, transparent 70%)", filter: "blur(100px)" }}
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          {/* Cyberpunk Grid */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: `linear-gradient(rgba(0, 229, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <div className="inline-flex items-center justify-center p-1 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Zap size={12} /> Explore ASPARK
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-wider"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">Events</span>
          </h1>
          <p className="text-lg text-[#EAFBFF]/70 max-w-2xl mx-auto" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            Experience the thrill of technology. Participate in high-stakes hackathons, learn from expert-led workshops, and connect with the most driven minds on campus.
          </p>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventCategories.map((category, idx) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-500"
              onClick={() => navigate(`/events/${category.slug}`)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                <ImageWithFallback
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Glowing Overlay on Hover */}
                <div 
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-color-dodge"
                  style={{ background: `linear-gradient(45deg, ${category.color}40, transparent)` }}
                />
                
                {/* Category Icon Badge */}
                <div 
                  className="absolute top-4 left-4 z-20 p-3 rounded-xl backdrop-blur-md border border-white/10"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                >
                  <category.icon size={24} style={{ color: category.color }} />
                </div>
              </div>

              {/* Content Container */}
              <div className="relative p-6 z-20 flex-grow flex flex-col">
                <div 
                  className="text-xs font-bold tracking-widest mb-2 uppercase"
                  style={{ color: category.color, fontFamily: "Orbitron, sans-serif" }}
                >
                  {category.tagline}
                </div>
                <h2 
                  className="text-3xl font-bold mb-3 transition-colors duration-300"
                  style={{ 
                    fontFamily: "Orbitron, sans-serif",
                    color: "white" // Changed from transparent bg-clip-text
                  }}
                >
                  {category.title}
                </h2>
                <p className="text-[#EAFBFF]/70 mb-6 flex-grow" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16 }}>
                  {category.description}
                </p>
                
                {/* Stats Row */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Activity size={16} style={{ color: category.colorAlt }} />
                    <span className="text-sm font-semibold text-white">{category.upcoming.length} Upcoming</span>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-[#EAFBFF]/40" />
                    <span className="text-sm text-[#EAFBFF]/60">{category.pastCount} Past Events</span>
                  </div>
                  
                  <motion.div 
                    className="ml-auto p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight size={20} style={{ color: category.color }} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Memories / Gallery Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            ASPARK <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">Memories</span>
          </h2>
          <p className="text-lg text-[#EAFBFF]/70 max-w-2xl mx-auto" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            A glimpse into our previous hackathons, workshops, and epic moments.
          </p>
        </motion.div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="16px">
            {galleryImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="relative group rounded-xl overflow-hidden border border-white/5 cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#00E5FF]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <ImageWithFallback
                  src={image}
                  alt={`ASPARK Gallery ${i + 1}`}
                  className="w-full block transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Cyberpunk corner decorations on hover */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </section>

      <Footer />
    </div>
  );
}

export function EventDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const category = eventCategories.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-orbitron text-[#00E5FF]">Event Not Found</h1>
          <button onClick={() => navigate("/events")} className="text-[#A855F7] hover:underline flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} /> Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Detail Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-20 pointer-events-none"
             style={{ background: `radial-gradient(circle, ${category.color} 0%, transparent 60%)`, filter: "blur(120px)" }} />
        
        <button
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 text-[#EAFBFF]/60 hover:text-white transition-colors mb-8 relative z-10 w-fit group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          <span style={{ fontFamily: "Rajdhani, sans-serif" }} className="uppercase tracking-wider font-semibold">Back to Events</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <category.icon size={16} style={{ color: category.color }} />
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: category.color }}>{category.title}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight uppercase" style={{ fontFamily: "Orbitron, sans-serif" }}>
              {category.tagline}
            </h1>
            
            <p className="text-xl text-[#EAFBFF]/80 mb-8 leading-relaxed" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {category.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                className="px-8 py-4 rounded-lg font-bold tracking-wider uppercase transition-all hover:scale-105"
                style={{ 
                  background: `linear-gradient(45deg, ${category.color}, ${category.colorAlt})`,
                  boxShadow: `0 0 20px ${category.color}40`,
                  fontFamily: "Orbitron, sans-serif" 
                }}
              >
                Register Now
              </button>
              <button 
                className="px-8 py-4 rounded-lg font-bold tracking-wider uppercase transition-all bg-white/5 hover:bg-white/10 border border-white/10"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                View Guidelines
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-transparent to-transparent z-10" />
              <ImageWithFallback
                src={category.image}
                alt={category.title}
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Cyber borders */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 z-20" style={{ borderColor: category.color }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 z-20" style={{ borderColor: category.color }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold uppercase" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Upcoming <span style={{ color: category.color }}>{category.title}</span>
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <div className="flex flex-col gap-6">
          {category.upcoming.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden overflow-x-hidden"
            >
              {/* Hover background sweep */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }}
              />

              <div className="relative z-10 flex-grow mb-6 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold uppercase tracking-widest text-[#EAFBFF]/70">
                    {event.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                    Registration Open
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 transition-colors duration-300" style={{ fontFamily: "Orbitron, sans-serif", color: "white" }}>
                  {event.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 text-[#EAFBFF]/60 text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} style={{ color: category.color }} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} style={{ color: category.colorAlt }} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 shrink-0">
                <button 
                  className="w-full md:w-auto px-6 py-3 rounded border transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
                  style={{ borderColor: category.color, color: category.color, fontFamily: "Orbitron, sans-serif", fontSize: 14 }}
                >
                  <span className="uppercase tracking-widest font-bold">Details</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {category.upcoming.length === 0 && (
            <div className="text-center py-12 px-4 border border-white/5 rounded-xl bg-white/[0.01]">
              <Calendar size={48} className="mx-auto mb-4 text-white/20" />
              <p className="text-xl text-[#EAFBFF]/50 font-rajdhani">No upcoming {category.title.toLowerCase()} right now.</p>
              <p className="text-sm text-[#EAFBFF]/30 mt-2">Check back later or view our past events archive.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Event Gallery Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold uppercase" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Past <span style={{ color: category.colorAlt }}>Moments</span>
          </h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent" />
        </div>
        
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="16px">
            {galleryImages.map((image, i) => (
              <motion.div
                key={`past-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="relative group rounded-lg overflow-hidden border border-white/5 cursor-pointer"
              >
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-color-dodge"
                     style={{ background: `linear-gradient(45deg, ${category.color}40, transparent)` }} />
                <ImageWithFallback
                  src={image}
                  alt={`${category.title} Past Moment ${i + 1}`}
                  className="w-full block transform group-hover:scale-[1.03] transition-transform duration-500"
                  style={{ filter: "grayscale(20%) contrast(110%)" }}
                />
              </motion.div>
            )).slice(0, 5)} {/* Showing fewer items for the specific detail page */}
          </Masonry>
        </ResponsiveMasonry>
      </section>

      <Footer />
    </div>
  );
}