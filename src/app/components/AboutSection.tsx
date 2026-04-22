import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Users, Lightbulb, Rocket } from "lucide-react";

const stats = [
  { icon: Users, label: "Members", value: "500+" },
  { icon: Lightbulb, label: "Projects", value: "120+" },
  { icon: Rocket, label: "Events", value: "50+" },
  { icon: Zap, label: "Awards", value: "30+" },
];

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050505 0%, #0A0F1C 50%, #050505 100%)" }}
    >
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24" style={{ background: "linear-gradient(180deg, transparent, #00E5FF, transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] text-[#00E5FF]/60 mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
            WHO WE ARE
          </p>
          <h2
            className="mb-6 tracking-[0.1em]"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              background: "linear-gradient(135deg, #EAFBFF, #00E5FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ABOUT ASPARK
          </h2>
          <p className="max-w-2xl mx-auto text-[#EAFBFF]/50" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 17, lineHeight: 1.8 }}>
            ASPARK is a premier innovation and technology society that empowers students to explore,
            create, and lead in the world of technology. We bridge the gap between academic knowledge
            and real-world application through hands-on projects, workshops, hackathons, and collaborative research.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0, 229, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ borderColor: "rgba(0, 229, 255, 0.4)", y: -5 }}
            >
              <stat.icon className="mx-auto mb-3 text-[#00E5FF]" size={28} />
              <p
                className="mb-1"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 28,
                  background: "linear-gradient(135deg, #00E5FF, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </p>
              <p className="text-[#EAFBFF]/40 tracking-[0.1em]" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
