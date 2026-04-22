import { Trophy, Medal, Star, ShieldAlert } from "lucide-react";
import { SEOHead } from "./SEOHead";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const stats = [
  { label: "Hackathons Won", value: "50+", icon: <Trophy className="text-[#F59E0B]" size={32} /> },
  { label: "Active Members", value: "200+", icon: <Star className="text-[#00E5FF]" size={32} /> },
  { label: "Projects Shipped", value: "120+", icon: <Medal className="text-[#A855F7]" size={32} /> },
  { label: "Global Ranking", value: "Top 5%", icon: <ShieldAlert className="text-[#EF4444]" size={32} /> },
];

const timelineData = [
  {
    year: "2025",
    title: "SYNTAX ERROR CHAMPIONS",
    description: "Secured first place out of 500+ teams in the ultimate global hackathon.",
    image: "https://images.unsplash.com/photo-1756273421509-054de38d1016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5uaW5nJTIwaGFja2F0aG9uJTIwc3RhZ2V8ZW58MXx8fHwxNzc2NTQ3MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#00E5FF"
  },
  {
    year: "2024",
    title: "E-SPORTS DOMINANCE",
    description: "Undefeated run in the Nexus Regional Valorant Showdown.",
    image: "https://images.unsplash.com/photo-1698502744438-aac93bd50eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwd2lubmluZyUyMHRlYW0lMjBzdGFnZXxlbnwxfHx8fDE3NzY1NDcxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#EF4444"
  },
  {
    year: "2023",
    title: "BEST INNOVATION AWARD",
    description: "Awarded by the tech council for our open-source AI infrastructure tool.",
    image: "https://images.unsplash.com/photo-1598968429739-b1bb16b888b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBnbG93aW5nJTIwbmVvbnxlbnwxfHx8fDE3NzY1NDcxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#F59E0B"
  }
];

export function AchievementsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
    <SEOHead title="Achievements" description="ASPARK's hall of fame — hackathon wins, research publications, and industry recognition." path="/achievements" />
    <div className="relative bg-[#050505] min-h-screen text-white font-sans selection:bg-[#F59E0B]/30 overflow-hidden" ref={containerRef}>
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1762278804923-37f066f5e834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhdGElMjBuZW9ufGVufDF8fHx8MTc3NjU0MDA3NHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Abstract Neon Data"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />
        </motion.div>

        {/* Ambient Glowing Orbs */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 60%)", filter: "blur(100px)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-6">
              <Trophy size={48} className="text-[#F59E0B] drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            </div>
            <h1 
              className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6"
              style={{ fontFamily: "Orbitron, sans-serif", textShadow: "0 10px 40px rgba(245,158,11,0.3)" }}
            >
              HALL OF
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F59E0B] to-[#EF4444]">
                FAME
              </span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-white/60 max-w-2xl mx-auto tracking-[0.2em] uppercase font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              A Legacy Forged in Excellence
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#F59E0B]/50 to-transparent" />
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 relative z-10 bg-[#050505]">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {stat.value}
                </h3>
                <p className="text-white/50 text-xs md:text-sm tracking-widest uppercase font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline of Glory */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto relative">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Timeline of <span className="text-[#F59E0B]">Glory</span>
          </h2>
          <p className="text-white/50 uppercase tracking-widest text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            Milestones that defined us
          </p>
        </div>

        <div className="relative border-l-2 border-white/10 md:mx-auto md:border-none">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          {timelineData.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <TimelineItem 
                key={item.year}
                item={item}
                isEven={isEven}
                idx={idx}
              />
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/10 to-[#050505]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Ready to make <span className="text-[#F59E0B]">History?</span>
          </h2>
          <button className="px-8 py-4 bg-[#F59E0B] text-black font-bold tracking-widest uppercase rounded-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
            Join the Ranks
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
    </>
  );
}

// Sub-component for Timeline Item to handle its own intersection observer elegantly
function TimelineItem({ item, isEven, idx }: { item: any, isEven: boolean, idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex flex-col md:flex-row items-center w-full mb-24 last:mb-0">
      
      {/* Center Dot (Desktop) */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-[#050505] z-10 shadow-[0_0_20px_rgba(245,158,11,0.6)]"
        style={{ backgroundColor: item.color }}
      />
      
      {/* Content - alternating left/right on desktop */}
      <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'} pl-8 md:pl-0`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl md:text-5xl font-black opacity-20 tracking-tighter" style={{ fontFamily: "Orbitron, sans-serif" }}>
              {item.year}
            </span>
            <div className="h-[2px] w-16" style={{ backgroundColor: item.color }} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-4" style={{ fontFamily: "Orbitron, sans-serif", color: item.color }}>
            {item.title}
          </h3>
          
          <p className="text-white/60 mb-6 leading-relaxed">
            {item.description}
          </p>

          <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <ImageWithFallback 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent z-10 opacity-60" />
          </div>
        </motion.div>
      </div>

      {/* Empty space for the other half on desktop */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}