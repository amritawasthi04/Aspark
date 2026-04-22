import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Github, Linkedin, Twitter } from "lucide-react";

const team = [
  { name: "Arjun Mehta", role: "President", color: "#00E5FF" },
  { name: "Priya Sharma", role: "Vice President", color: "#A855F7" },
  { name: "Rohan Das", role: "Tech Lead", color: "#00E5FF" },
  { name: "Sneha Kapoor", role: "AI/ML Lead", color: "#A855F7" },
  { name: "Vikram Singh", role: "Design Lead", color: "#00E5FF" },
  { name: "Ananya Gupta", role: "Events Head", color: "#A855F7" },
  { name: "Karan Patel", role: "Research Lead", color: "#00E5FF" },
  { name: "Diya Nair", role: "Marketing Lead", color: "#A855F7" },
];

export function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #0A0F1C 50%, #050505 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] text-[#00E5FF]/60 mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
            THE SPARKS BEHIND ASPARK
          </p>
          <h2
            className="tracking-[0.1em]"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              background: "linear-gradient(135deg, #EAFBFF, #00E5FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OUR TEAM
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="group relative p-5 rounded-xl text-center overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${member.color}10`,
                backdropFilter: "blur(10px)",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              whileHover={{ y: -5, borderColor: `${member.color}40` }}
            >
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${member.color}20, ${member.color}05)`,
                  border: `1px solid ${member.color}20`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: 22,
                    color: member.color,
                  }}
                >
                  {member.name[0]}
                </span>
              </div>
              <h3 className="text-[#EAFBFF] mb-1" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 12 }}>
                {member.name}
              </h3>
              <p className="text-[#EAFBFF]/40 mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                {member.role}
              </p>

              {/* Social icons - visible on hover */}
              <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Github size={14} className="text-[#EAFBFF]/30 hover:text-[#00E5FF] cursor-pointer transition-colors" />
                <Linkedin size={14} className="text-[#EAFBFF]/30 hover:text-[#00E5FF] cursor-pointer transition-colors" />
                <Twitter size={14} className="text-[#EAFBFF]/30 hover:text-[#00E5FF] cursor-pointer transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
