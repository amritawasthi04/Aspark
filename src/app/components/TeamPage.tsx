import { Github, Twitter, Linkedin, Mail, ChevronDown } from "lucide-react";
import { SEOHead } from "./SEOHead";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Full Hierarchical Data Structure
const teamHierarchy = [
  {
    id: "command",
    tierName: "Command Protocol",
    description: "The core visionary leaders steering the direction of ASPARK.",
    gridClass: "grid-cols-1 md:grid-cols-2",
    cardStyle: "aspect-[3/4] md:aspect-square",
    titleSize: "text-3xl md:text-4xl",
    color: "#00E5FF",
    members: [
      {
        name: "Alex Vance",
        role: "President & Founder",
        image: "https://images.unsplash.com/photo-1541294054180-6c46ae51bbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjBtYW58ZW58MXx8fHwxNzc2NTQ3OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#00E5FF",
        domain: "Command"
      },
      {
        name: "Sarah Chen",
        role: "Vice President",
        image: "https://images.unsplash.com/photo-1519097186222-b26cc78c3077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3NzY1NDc5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#A855F7",
        domain: "Strategy"
      }
    ]
  },
  {
    id: "exec",
    tierName: "Executive Board",
    description: "Strategic directors managing operations, events, and resources.",
    gridClass: "grid-cols-1 md:grid-cols-3",
    cardStyle: "aspect-[4/5]",
    titleSize: "text-2xl",
    color: "#EF4444",
    members: [
      {
        name: "Marcus Wright",
        role: "Operations Director",
        image: "https://images.unsplash.com/photo-1585900463818-bab83844be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrZXIlMjBkYXJrJTIwaG9vZHxlbnwxfHx8fDE3NzY1NDc5NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#EF4444",
        domain: "Logistics"
      },
      {
        name: "Elena Rostova",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1596373911533-0568815ce3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZ2xhc3NlcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NjU0Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#EC4899",
        domain: "Design & Media"
      },
      {
        name: "David Kim",
        role: "Technical Director",
        image: "https://images.unsplash.com/photo-1560699980-9dee78d1e874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcG9ydHJhaXQlMjBibHVlfGVufDF8fHx8MTc3NjU0Nzk0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#10B981",
        domain: "Engineering"
      }
    ]
  },
  {
    id: "leads",
    tierName: "Domain Leads",
    description: "Specialized unit captains leading our technological advancement.",
    gridClass: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    cardStyle: "aspect-[3/4]",
    titleSize: "text-xl",
    color: "#F59E0B",
    members: [
      {
        name: "Priya Patel",
        role: "Frontend Lead",
        image: "https://images.unsplash.com/photo-1650211572341-b89032c8c691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjBwcm9ncmFtbWVyfGVufDF8fHx8MTc3NjU0NzU0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#F59E0B",
        domain: "Web Dev"
      },
      {
        name: "Zane Nova",
        role: "AI/ML Lead",
        image: "https://images.unsplash.com/photo-1645976531514-33221ad57007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBmYWNlfGVufDF8fHx8MTc3NjU0Nzk0MXww&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#00E5FF",
        domain: "AI & VR"
      },
      {
        name: "Jax Kael",
        role: "Security Lead",
        image: "https://images.unsplash.com/photo-1771061863061-8ffdddb28098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrZXIlMjBwb3J0cmFpdCUyMGhvb2RpZSUyMGRhcmt8ZW58MXx8fHwxNzc2NTQ3NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#EF4444",
        domain: "Cybersecurity"
      },
      {
        name: "Rin Shi",
        role: "Hardware Lead",
        image: "https://images.unsplash.com/photo-1742119897876-67e9935ac375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbGVhZGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2NTQ3NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        color: "#10B981",
        domain: "Robotics"
      }
    ]
  }
];

export function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const scrollToHierarchy = () => {
    document.getElementById("hierarchy-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <SEOHead title="Team" description="Meet the passionate minds behind ASPARK — leaders, developers, designers, and innovators." path="/team" />
    <div className="relative bg-[#050505] min-h-screen text-white font-sans selection:bg-[#00E5FF]/30 overflow-hidden" ref={containerRef}>
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/5 via-[#050505]/80 to-[#050505] z-10" />
          <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,#00E5FF_0%,transparent_50%)] opacity-20 blur-[100px]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#00E5FF]" />
              <span className="text-[#00E5FF] tracking-[0.4em] uppercase text-sm font-bold">Classified Roster</span>
              <div className="h-[1px] w-12 bg-[#00E5FF]" />
            </div>
            <h1 
              className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6"
              style={{ fontFamily: "Orbitron, sans-serif", textShadow: "0 10px 40px rgba(0,229,255,0.2)" }}
            >
              THE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">
                ARCHITECTS
              </span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white/60 max-w-2xl mx-auto tracking-[0.2em] uppercase font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Meet the minds driving our systems forward.
            </p>

            <motion.button 
              onClick={scrollToHierarchy}
              className="mt-16 mx-auto w-16 h-16 rounded-full border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} />
            </motion.button>
          </motion.div>
        </div>

        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA0MEw0MCA0ME00MCAwTDQwIDQwIiBzdHJva2U9IiNmZmZmZmYxMSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none opacity-30" />
      </section>

      {/* Hierarchical Roster Section */}
      <section id="hierarchy-start" className="py-20 relative z-10">
        
        {/* Core Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00E5FF]/50 via-[#A855F7]/30 to-transparent -translate-x-1/2 hidden lg:block pointer-events-none opacity-50" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          {teamHierarchy.map((tier, tierIndex) => (
            <div key={tier.id} className="mb-40 relative">
              
              {/* Tier Header */}
              <div className="text-center mb-16 relative z-10 bg-[#050505] py-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  <div 
                    className="px-6 py-2 border-t-2 border-b-2 mb-4 mx-auto w-max backdrop-blur-md"
                    style={{ borderColor: tier.color, backgroundColor: `${tier.color}05` }}
                  >
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider" style={{ fontFamily: "Orbitron, sans-serif", color: tier.color, textShadow: `0 0 20px ${tier.color}80` }}>
                      {tier.tierName}
                    </h2>
                  </div>
                  <p className="text-white/50 tracking-widest text-sm uppercase max-w-xl mx-auto" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {tier.description}
                  </p>
                </motion.div>
              </div>

              {/* Tier Grid */}
              <div className={`grid ${tier.gridClass} gap-8 relative z-10`}>
                {tier.members.map((member, idx) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="group relative"
                  >
                    {/* Glowing border effect */}
                    <div 
                      className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-500"
                      style={{ background: `linear-gradient(to bottom right, ${member.color}, transparent, ${member.color})` }}
                    />
                    
                    <div className="relative bg-[#0A0A0A] border border-white/10 rounded-lg overflow-hidden h-full flex flex-col">
                      <div className={`relative w-full overflow-hidden bg-[#050505] ${tier.cardStyle}`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10" />
                        <ImageWithFallback
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 filter grayscale-[60%] group-hover:grayscale-0"
                        />
                        
                        {/* Cyber Accents */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l opacity-50 z-20 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" style={{ borderColor: member.color }} />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r opacity-50 z-20 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" style={{ borderColor: member.color }} />
                        
                        {/* Floating Domain Label */}
                        <div 
                          className="absolute top-6 right-6 z-20 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded backdrop-blur-md border"
                          style={{ color: member.color, borderColor: `${member.color}40`, backgroundColor: `${member.color}10` }}
                        >
                          {member.domain}
                        </div>
                      </div>

                      <div className="p-6 relative z-20 flex-grow flex flex-col justify-end transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className={`${tier.titleSize} font-black uppercase tracking-wider mb-1 transition-colors duration-300`} style={{ fontFamily: "Orbitron, sans-serif" }}>
                          {member.name}
                        </h3>
                        <p className="text-white/60 tracking-widest text-sm md:text-base uppercase mb-4" style={{ fontFamily: "Rajdhani, sans-serif", color: member.color }}>
                          {member.role}
                        </p>
                        
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-4 border-t border-white/5">
                          <a href="#" className="text-white/40 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><Github size={18} /></a>
                          <a href="#" className="text-white/40 hover:text-[#00E5FF] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"><Twitter size={18} /></a>
                          <a href="#" className="text-white/40 hover:text-[#A855F7] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"><Linkedin size={18} /></a>
                          <a href="#" className="text-white/40 hover:text-[#EF4444] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"><Mail size={18} /></a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
