import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronRight, Target, Zap, Shield, Cpu, Users } from "lucide-react";
import { SEOHead } from "./SEOHead";

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const pillars = [
    { icon: <Zap size={32} />, title: "Innovation", desc: "Pushing the boundaries of modern technology with cutting-edge stack exploration.", color: "#00E5FF" },
    { icon: <Users size={32} />, title: "Community", desc: "Fostering a network of passionate developers, designers, and tech enthusiasts.", color: "#A855F7" },
    { icon: <Shield size={32} />, title: "Excellence", desc: "Upholding the highest standards in code quality, security, and design.", color: "#EF4444" },
    { icon: <Cpu size={32} />, title: "Hardware", desc: "Bridging the gap between software and physical systems through robotics.", color: "#10B981" },
  ];

  return (
    <>
    <SEOHead title="About" description="Learn about ASPARK — a premier innovation and technology society empowering students through hands-on projects, workshops, and collaborative research." path="/about" />
    <div className="relative bg-[#050505] min-h-screen text-white font-sans selection:bg-[#00E5FF]/30 overflow-hidden" ref={containerRef}>
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NjU0NzEyNXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team Collaboration"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/80 to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#00E5FF]" />
              <span className="text-[#00E5FF] tracking-[0.4em] uppercase text-sm font-bold">Protocol 01</span>
              <div className="h-[1px] w-12 bg-[#00E5FF]" />
            </div>
            <h1 
              className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              WE ARE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">
                ASPARK
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#EAFBFF]/60 max-w-2xl mx-auto tracking-widest uppercase" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Forging the future of technology, one line of code at a time.
            </p>
          </motion.div>
        </div>

        {/* Cyberpunk Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA0MEw0MCA0ME00MCAwTDQwIDQwIiBzdHJva2U9IiNmZmZmZmYxMSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none opacity-50" />
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00E5FF]/20 to-transparent blur-2xl rounded-full" />
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1669379212120-b6ee2d51648a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBsYWJvcmF0b3J5JTIwY29kZXxlbnwxfHx8fDE3NzY1NDcxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Cyberpunk Lab"
              className="relative w-full aspect-square md:aspect-[4/3] object-cover rounded-xl border border-white/10"
              style={{ boxShadow: "0 20px 50px -10px rgba(0, 229, 255, 0.2)" }}
            />
            {/* HUD Elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#00E5FF]/50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#00E5FF]/50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase mb-8" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Our <span className="text-[#00E5FF]">Directive</span>
            </h2>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-start gap-4 relative z-10">
                  <Target className="text-[#00E5FF] shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>The Mission</h3>
                    <p className="text-white/60 leading-relaxed">
                      To cultivate an elite ecosystem of tech enthusiasts who build, break, and innovate. We empower our members to bridge the gap between theoretical knowledge and real-world engineering.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-md relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-start gap-4 relative z-10">
                  <Zap className="text-[#A855F7] shrink-0 mt-1" size={28} />
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>The Vision</h3>
                    <p className="text-white/60 leading-relaxed">
                      To become the premier hub for technological advancement, setting global standards in student-led innovation, hackathons, and research development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-32 relative bg-[#0A0A0A]">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#EC4899]">Pillars</span>
            </h2>
            <p className="text-white/50 uppercase tracking-widest text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              The foundation of our operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-[#050505] border border-white/5 p-8 rounded-xl relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 opacity-50" style={{ backgroundColor: pillar.color }} />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${pillar.color}, transparent 70%)` }}
                />
                
                <div className="mb-6 text-white/50 group-hover:text-white transition-colors duration-300" style={{ color: pillar.color }}>
                  {pillar.icon}
                </div>
                
                <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                  {pillar.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0" style={{ color: pillar.color }}>
                  Explore <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
