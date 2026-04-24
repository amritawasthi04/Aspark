import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate, Link } from "react-router";
import axisLogo from "../../imports/axis_png.png";

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer
      id="contact"
      className="relative py-16 overflow-hidden"
      style={{ background: "#050505", borderTop: "1px solid rgba(0, 229, 255, 0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <h3
                className="tracking-[0.2em] m-0"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 22,
                  background: "linear-gradient(135deg, #00E5FF, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ASPARK
              </h3>
              {/* College Logo Space */}
              <div className="w-24 h-24 ml-4 flex items-center justify-center pointer-events-none" title="Axis Colleges">
                <img 
                  src={axisLogo} 
                  alt="Axis Colleges" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback styling if image is not yet saved to public directory
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] text-white/40 text-center font-mono">Axis<br/>Logo</span>';
                  }}
                />
              </div>
            </div>
            
            <p className="text-[#EAFBFF]/40 mb-6" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14, lineHeight: 1.7 }}>
              Innovation & Technology Society. Empowering the next generation of tech leaders.
            </p>
            <div className="flex gap-3">
              {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center min-w-[44px] min-h-[44px]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  whileHover={{ borderColor: "rgba(0, 229, 255, 0.4)", y: -2 }}
                  aria-label={["GitHub", "LinkedIn", "Twitter", "Instagram"][i]}
                >
                  <Icon size={15} className="text-[#EAFBFF]/40" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-[#EAFBFF]/60 tracking-[0.15em]" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11 }}>
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex flex-col space-y-2">
                {[
                  { label: "About", path: "/about" },
                  { label: "Domains", path: "/domains" },
                  { label: "Events", path: "/events" }
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="block py-1 text-[#EAFBFF]/30 hover:text-[#00E5FF] transition-colors"
                    style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col space-y-2">
                {[
                  { label: "Team", path: "/team" },
                  { label: "Achievements", path: "/achievements" },
                  { label: "Join Us", path: "/join" }
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="block py-1 text-[#EAFBFF]/30 hover:text-[#00E5FF] transition-colors"
                    style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[#EAFBFF]/60 tracking-[0.15em]" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11 }}>
              CONTACT
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#EAFBFF]/30" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}>
                <Mail size={16} className="text-[#00E5FF]/60" /> aspark@university.edu
              </div>
              <div className="flex items-start gap-3 text-[#EAFBFF]/30" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}>
                <MapPin size={16} className="text-[#00E5FF]/60 mt-1" /> 
                <span>
                  Innovation Hub, Block C,<br />
                  University Campus
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#EAFBFF]/20 order-3 md:order-1 text-center md:text-left" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
            &copy; 2026 ASPARK — Innovation & Technology Society. All rights reserved.
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-6 order-1 md:order-2">
            {/* Kalesh Logos */}
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity" title="Kalesh">
              <img 
                src="/kalesh-logo.png" 
                alt="Kalesh Logo" 
                className="h-8 w-8 object-contain rounded-md drop-shadow-[0_0_8px_rgba(255,50,0,0.4)]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <img 
                src="/kalesh-text.png" 
                alt="Kalesh Text" 
                className="h-6 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,100,0,0.4)]"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

            <motion.button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: "Orbitron, sans-serif",
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "rgba(234,251,255,0.35)",
            }}
            whileHover={{
              borderColor: "rgba(0, 229, 255, 0.4)",
              color: "rgba(0, 229, 255, 0.8)",
              background: "rgba(0, 229, 255, 0.05)",
            }}
          >
            <ShieldCheck size={14} />
            ADMIN PANEL
          </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
