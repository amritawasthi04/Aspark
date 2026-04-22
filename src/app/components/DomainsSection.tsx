import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Code, Brain, Palette, BarChart3, FlaskConical, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const domains = [
  {
    slug: "tech-development",
    icon: Code,
    title: "Tech & Development",
    desc: "Full-stack development, mobile apps, cloud computing, and DevOps pipelines.",
    color: "#00E5FF",
  },
  {
    slug: "ai-ml",
    icon: Brain,
    title: "AI / ML",
    desc: "Machine learning, deep learning, NLP, computer vision, and data science.",
    color: "#A855F7",
  },
  {
    slug: "design-media",
    icon: Palette,
    title: "Design & Media",
    desc: "UI/UX design, motion graphics, 3D modeling, and creative media production.",
    color: "#00E5FF",
  },
  {
    slug: "management",
    icon: BarChart3,
    title: "Management",
    desc: "Project management, event planning, marketing, and strategic operations.",
    color: "#A855F7",
  },
  {
    slug: "research-innovation",
    icon: FlaskConical,
    title: "Research & Innovation",
    desc: "Research papers, patent filings, IoT, blockchain, and emerging technologies.",
    color: "#00E5FF",
  },
];

export function DomainsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section
      id="domains"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] text-[#A855F7]/60 mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
            WHAT WE DO
          </p>
          <h2
            className="tracking-[0.1em]"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              background: "linear-gradient(135deg, #EAFBFF, #A855F7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OUR DOMAINS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.title}
              className="relative p-6 rounded-xl cursor-pointer group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${domain.color}15`,
                backdropFilter: "blur(10px)",
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{
                y: -8,
                borderColor: `${domain.color}40`,
                boxShadow: `0 20px 40px ${domain.color}10`,
              }}
              onClick={() => navigate(`/domains/${domain.slug}`)}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top, ${domain.color}08 0%, transparent 60%)`,
                }}
              />
              <domain.icon className="mb-4 relative z-10" size={32} style={{ color: domain.color }} />
              <h3
                className="mb-2 relative z-10 tracking-[0.05em]"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: 15, color: "#EAFBFF" }}
              >
                {domain.title}
              </h3>
              <p className="text-[#EAFBFF]/40 relative z-10 mb-4" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14, lineHeight: 1.6 }}>
                {domain.desc}
              </p>
              <div className="flex items-center gap-1 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: domain.color, fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                Explore Domain <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate("/domains")}
            className="px-8 py-3 rounded-lg cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              fontFamily: "Orbitron, sans-serif",
              fontSize: 12,
              color: "#EAFBFF",
              letterSpacing: "0.15em",
            }}
            whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW ALL DOMAINS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
