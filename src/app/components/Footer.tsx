import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";

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
          <div>
            <h3
              className="mb-4 tracking-[0.2em]"
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
            <p className="text-[#EAFBFF]/40 mb-4" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14, lineHeight: 1.7 }}>
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
            <motion.button
              onClick={() => navigate("/admin")}
              className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "Orbitron, sans-serif",
                fontSize: 9,
                letterSpacing: "0.15em",
                color: "rgba(234,251,255,0.25)",
              }}
              whileHover={{
                borderColor: "rgba(0, 229, 255, 0.3)",
                color: "rgba(0, 229, 255, 0.6)",
              }}
            >
              <ShieldCheck size={12} />
              ADMIN PANEL
            </motion.button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-[#EAFBFF]/60 tracking-[0.15em]" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11 }}>
              QUICK LINKS
            </h4>
            {["About", "Domains", "Events", "Team", "Achievements", "Join Us"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                className="block py-1 text-[#EAFBFF]/30 hover:text-[#00E5FF] transition-colors"
                style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[#EAFBFF]/60 tracking-[0.15em]" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11 }}>
              CONTACT
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#EAFBFF]/30" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}>
                <Mail size={14} className="text-[#00E5FF]/60" /> aspark@university.edu
              </div>
              <div className="flex items-center gap-2 text-[#EAFBFF]/30" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}>
                <MapPin size={14} className="text-[#00E5FF]/60" /> Innovation Hub, Block C, University Campus
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-[#EAFBFF]/20" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
            &copy; 2026 ASPARK — Innovation & Technology Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
