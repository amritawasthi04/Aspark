import { Shield, Zap, Cpu, Code2 } from "lucide-react";
import { SEOHead } from "./SEOHead";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const corePillars = [
  {
    id: "innovation",
    title: "Innovation Matrix",
    description: "Pushing the boundaries of what is possible. We engineer next-generation solutions and conceptualize the technologies of tomorrow.",
    icon: <Zap size={32} />,
    color: "#00E5FF", // Cyan
    bgImage: "https://images.unsplash.com/photo-1673813497649-9b1ff22e6185?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5lb24lMjAzZHxlbnwxfHx8fDE3NzY1NDg0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: [
      { label: "Research Papers", value: "24+" },
      { label: "Patents Pending", value: "3" }
    ]
  },
  {
    id: "architecture",
    title: "System Architecture",
    description: "Building robust, scalable, and flawless systems. From foundational hardware to sprawling cloud infrastructures.",
    icon: <Cpu size={32} />,
    color: "#A855F7", // Purple
    bgImage: "https://images.unsplash.com/photo-1680992046626-418f7e910589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc2VydmVyJTIwcm9vbXxlbnwxfHx8fDE3NzY1NDU1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: [
      { label: "Active Nodes", value: "1,024" },
      { label: "Uptime", value: "99.99%" }
    ]
  },
  {
    id: "cybernetics",
    title: "Cybernetic Integration",
    description: "Merging human creativity with machine precision. Our focus on UI/UX, generative AI, and immersive realities.",
    icon: <Code2 size={32} />,
    color: "#EC4899", // Pink
    bgImage: "https://images.unsplash.com/photo-1768330187224-5c2453cab6b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnZW9tZXRyeXxlbnwxfHx8fDE3NzY1NDg0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: [
      { label: "AI Models Trained", value: "50+" },
      { label: "VR Modules", value: "12" }
    ]
  },
  {
    id: "security",
    title: "Absolute Security",
    description: "Impenetrable defense protocols. We champion white-hat operations, cryptography, and securing the data flow.",
    icon: <Shield size={32} />,
    color: "#10B981", // Green
    bgImage: "https://images.unsplash.com/photo-1684675137226-8d7f5b5efca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG93aW5nJTIwY29yZSUyMG1hdHJpeHxlbnwxfHx8fDE3NzY1NDg0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: [
      { label: "Threats Neutralized", value: "10K+" },
      { label: "Encryption", value: "AES-256" }
    ]
  }
];

export function PillarsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for the overall page to animate the hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
    <SEOHead title="Core Pillars" description="The foundational pillars of ASPARK — Innovation, Community, Excellence, and Research." path="/pillars" />
    <div className="relative bg-[#050505] min-h-screen text-white font-sans selection:bg-[#00E5FF]/30" ref={containerRef}>
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/10 via-[#050505]/80 to-[#050505] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00E5FF_0%,transparent_40%)] opacity-10 blur-[100px] pointer-events-none" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#00E5FF]" />
              <span className="text-[#00E5FF] tracking-[0.4em] uppercase text-sm font-bold font-mono">System Architecture</span>
              <div className="h-[1px] w-12 bg-[#00E5FF]" />
            </div>
            <h1 
              className="text-5xl md:text-7xl lg:text-[9rem] font-black tracking-tighter uppercase leading-none mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              CORE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#EC4899]">
                PILLARS
              </span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white/60 max-w-3xl mx-auto tracking-[0.2em] uppercase font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              The four foundational directives driving ASPARK's technological superiority.
            </p>
          </motion.div>
        </div>

        {/* Ambient Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA0MEw0MCA0ME00MCAwTDQwIDQwIiBzdHJva2U9IiNmZmZmZmYxMSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none opacity-30" />
      </section>

      {/* Sticky Scrolling Pillars Section */}
      <section className="relative z-10 pb-32">
        {corePillars.map((pillar, index) => (
          <div key={pillar.id} className="h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden">
            
            {/* Absolute Background Image per Pillar */}
            <motion.div 
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 1.2 }}
            >
              <ImageWithFallback
                src={pillar.bgImage}
                alt={pillar.title}
                className="w-full h-full object-cover opacity-20 filter grayscale-[50%]"
              />
              {/* Gradient overlays to blend into background */}
              <div className="absolute inset-0 bg-[#050505]/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Glowing Number */}
                <div className="absolute -top-20 -left-10 text-[15rem] font-black opacity-5 pointer-events-none" style={{ color: pillar.color, fontFamily: "Orbitron, sans-serif" }}>
                  0{index + 1}
                </div>

                <div 
                  className="w-16 h-16 mb-8 rounded-2xl flex items-center justify-center border backdrop-blur-md"
                  style={{ borderColor: `${pillar.color}50`, backgroundColor: `${pillar.color}10`, color: pillar.color, boxShadow: `0 0 30px ${pillar.color}30` }}
                >
                  {pillar.icon}
                </div>

                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-6" style={{ fontFamily: "Orbitron, sans-serif", textShadow: `0 0 20px ${pillar.color}50` }}>
                  {pillar.title}
                </h2>
                
                <p className="text-xl text-white/70 leading-relaxed mb-10 border-l-2 pl-6" style={{ borderColor: pillar.color }}>
                  {pillar.description}
                </p>

                <div className="flex gap-8">
                  {pillar.stats.map(stat => (
                    <div key={stat.label}>
                      <div className="text-3xl font-bold font-mono tracking-wider" style={{ color: pillar.color }}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/40 uppercase tracking-widest mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Content - Abstract Tech Window */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block relative"
              >
                <div className="aspect-square rounded-full border-[1px] border-dashed animate-[spin_60s_linear_infinite] opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%]" style={{ borderColor: pillar.color }} />
                <div className="aspect-square rounded-full border-[2px] border-dotted animate-[spin_40s_linear_infinite_reverse] opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]" style={{ borderColor: pillar.color }} />
                
                <div className="relative aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden border backdrop-blur-sm" style={{ borderColor: `${pillar.color}30`, backgroundColor: `${pillar.color}05` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/60 z-10" />
                  <ImageWithFallback
                    src={pillar.bgImage}
                    alt={`${pillar.title} Visual`}
                    className="w-full h-full object-cover opacity-80 mix-blend-screen filter contrast-125"
                  />
                  
                  {/* Cyber Scanner UI Overlay */}
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: pillar.color }} />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: pillar.color }} />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: pillar.color }} />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: pillar.color }} />
                    
                    <div className="absolute top-1/2 left-0 w-full h-[1px] opacity-30" style={{ backgroundColor: pillar.color }} />
                    <div className="absolute left-1/2 top-0 h-full w-[1px] opacity-30" style={{ backgroundColor: pillar.color }} />
                    
                    <div className="absolute top-8 left-8 text-xs font-mono tracking-widest opacity-70" style={{ color: pillar.color }}>
                      SYS_STATUS: ONLINE<br/>
                      UPLINK: ACTIVE
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
    </>
  );
}
