import { useRef } from "react";
import { Send, MapPin, Terminal, Hexagon } from "lucide-react";
import { SEOHead } from "./SEOHead";
import { motion, useScroll, useTransform } from "motion/react";
import { Navbar } from "./Navbar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";

export function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <>
    <SEOHead title="Contact" description="Get in touch with ASPARK — questions, collaborations, and partnerships." path="/contact" />
    <div className="relative bg-[#050505] min-h-screen text-white font-sans selection:bg-[#EF4444]/30 overflow-hidden" ref={containerRef}>
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMGNvbW11bmljYXRpb24lMjBuZXR3b3JrJTIwbWFwfGVufDF8fHx8MTc3NjU0NzU1NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Cyber Map"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/80 to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-6">
              <Hexagon size={48} className="text-[#EF4444] animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            </div>
            <h1 
              className="text-5xl md:text-7xl lg:text-[9rem] font-black tracking-tighter uppercase leading-none mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              ESTABLISH
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F59E0B]">
                CONNECTION
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto tracking-widest uppercase" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Secure channels are open. Transmit your message.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terminal Form Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold uppercase tracking-wider mb-8" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Comm <span className="text-[#EF4444]">Link</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-12 text-lg">
              Whether you're looking to collaborate on a project, request a tech seminar, or join our forces, the terminal is ready to receive your packets.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#EF4444] group-hover:bg-[#EF4444]/10 transition-colors">
                  <Terminal className="text-[#EF4444]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Direct Address</h4>
                  <p className="text-xl font-bold tracking-wider font-mono">hello@aspark.club</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#F59E0B] group-hover:bg-[#F59E0B]/10 transition-colors">
                  <MapPin className="text-[#F59E0B]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Base of Operations</h4>
                  <p className="text-xl font-bold tracking-wider font-mono">Sector 7, Tech Campus</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side - Cyberpunk Terminal Style */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-xl p-8 relative overflow-hidden"
            style={{ boxShadow: "0 0 50px -15px rgba(239, 68, 68, 0.2)" }}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs font-mono text-white/40 uppercase tracking-widest">ASPARK_UPLINK.exe</span>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EF4444] transition-colors font-mono"
                  placeholder="> ENTER_NAME_"
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EF4444] transition-colors font-mono"
                  placeholder="> ENTER_EMAIL_"
                />
              </div>
              <div className="relative group">
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EF4444] transition-colors font-mono resize-none"
                  placeholder="> TRANSMIT_MESSAGE_"
                />
              </div>
              
              <button 
                type="button"
                className="w-full py-4 mt-4 bg-white/5 border border-white/10 hover:border-[#EF4444] hover:bg-[#EF4444]/20 text-[#EF4444] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300"
              >
                <Send size={18} /> Send Data Packet
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
}
