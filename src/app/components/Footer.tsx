import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import { useNavigate, Link } from "react-router";
import axisLogo from "../../imports/axis_png.png";

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer
      id="contact"
      className="relative pt-20 pb-10 overflow-hidden"
      style={{ 
        background: "radial-gradient(ellipse at bottom, rgba(20,20,35,0.6) 0%, rgba(5,5,5,1) 100%)", 
        borderTop: "1px solid rgba(0, 229, 255, 0.15)",
        boxShadow: "0 -20px 50px rgba(0, 229, 255, 0.03)"
      }}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand - Span 5 */}
          <div className="md:col-span-5 flex flex-col">
            <div className="flex items-center gap-5 mb-6">
              <h3
                className="tracking-[0.25em] m-0"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 28,
                  background: "linear-gradient(135deg, #00E5FF, #A855F7, #FF0055)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px rgba(0, 229, 255, 0.3)"
                }}
              >
                ASPARK
              </h3>
              <div className="w-px h-10 bg-white/10" />
              <div className="w-20 h-20 flex items-center justify-center pointer-events-none relative group" title="Axis Colleges">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={axisLogo} 
                  alt="Axis Colleges" 
                  className="w-full h-full object-contain relative z-10 drop-shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] text-white/40 text-center font-mono">Axis<br/>Logo</span>';
                  }}
                />
              </div>
            </div>
            
            <p className="text-[#EAFBFF]/50 mb-8 max-w-sm" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16, lineHeight: 1.8 }}>
              Innovation & Technology Society. Empowering the next generation of tech leaders to build the future, today.
            </p>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  aria-label={["GitHub", "LinkedIn", "Twitter", "Instagram"][i]}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/20 to-[#A855F7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon size={18} className="text-[#EAFBFF]/60 group-hover:text-white relative z-10 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - Span 4 */}
          <div className="md:col-span-4">
            <h4 className="mb-6 text-[#EAFBFF]/80 tracking-[0.2em] font-semibold flex items-center gap-2" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 13 }}>
              <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { label: "About", path: "/about" },
                { label: "Domains", path: "/domains" },
                { label: "Events", path: "/events" },
                { label: "Team", path: "/team" },
                { label: "Achievements", path: "/achievements" },
                { label: "Join Us", path: "/join" }
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="group flex items-center text-[#EAFBFF]/40 hover:text-[#00E5FF] transition-all duration-300 py-1"
                  style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16 }}
                >
                  <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#00E5FF]" />
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact - Span 3 */}
          <div className="md:col-span-3">
            <h4 className="mb-6 text-[#EAFBFF]/80 tracking-[0.2em] font-semibold flex items-center gap-2" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 13 }}>
              <div className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
              CONTACT
            </h4>
            <div className="space-y-4">
              <motion.a 
                href="mailto:aspark@university.edu"
                className="flex items-center gap-4 text-[#EAFBFF]/50 hover:text-white transition-colors group p-3 -ml-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10" 
                style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#00E5FF]/10 flex items-center justify-center group-hover:bg-[#00E5FF]/20 transition-colors shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                  <Mail size={18} className="text-[#00E5FF]" />
                </div>
                <span className="truncate">aspark@university.edu</span>
              </motion.a>
              
              <motion.div 
                className="flex items-start gap-4 text-[#EAFBFF]/50 hover:text-white transition-colors group p-3 -ml-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10" 
                style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#A855F7]/10 flex items-center justify-center shrink-0 group-hover:bg-[#A855F7]/20 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                  <MapPin size={18} className="text-[#A855F7]" />
                </div>
                <span className="pt-1">
                  Innovation Hub, Block C,<br />
                  University Campus
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-8 relative">
          
          <p className="text-[#EAFBFF]/30 order-3 md:order-1 text-center md:text-left flex-1" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}>
            &copy; 2026 ASPARK — Innovation & Technology Society.<br className="hidden md:block lg:hidden" /> All rights reserved.
          </p>
          
          <div className="order-2 flex justify-center flex-1">
            <motion.button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl cursor-pointer relative overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "Orbitron, sans-serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(234,251,255,0.6)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                backdropFilter: "blur(10px)"
              }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0, 229, 255, 0.4)", color: "#fff", background: "rgba(0, 229, 255, 0.05)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ShieldCheck size={16} className="group-hover:text-[#00E5FF] transition-colors" />
              <span>ADMIN PANEL</span>
            </motion.button>
          </div>

          {/* Powered by Kalesh (Bottom Right Corner) */}
          <div className="flex flex-col items-center md:items-end order-1 md:order-3 flex-1">
            <h4 className="mb-2 text-[#EAFBFF]/40 tracking-[0.25em] text-[10px] uppercase font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Powered By
            </h4>
            <motion.div 
              className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer" 
              title="Kalesh"
              whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
            >
              <img 
                src="/kalesh-logo.png" 
                alt="Kalesh Logo" 
                className="h-10 w-10 object-contain rounded-lg drop-shadow-[0_0_15px_rgba(255,50,0,0.6)]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <img 
                src="/kalesh-text.png" 
                alt="Kalesh Text" 
                className="h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,100,0,0.6)]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </footer>
  );
}
