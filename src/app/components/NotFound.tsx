import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { SEOHead } from "./SEOHead";

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  color: i % 2 === 0 ? "#00E5FF" : "#A855F7",
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 2,
}));

export function NotFound() {
  const navigate = useNavigate();

  return (
    <>
    <SEOHead title="404 Not Found" path="/404" />
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#050505" }}>
      {/* Particles — PERF: memoized, reduced count */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: p.left,
            top: p.top,
          }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -40] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* Glitch 404 */}
      <motion.h1
        className="relative mb-4"
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "clamp(80px, 20vw, 200px)",
          background: "linear-gradient(135deg, #00E5FF, #A855F7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 40px rgba(0, 229, 255, 0.3))",
        }}
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
      >
        404
      </motion.h1>

      <p className="text-[#EAFBFF]/60 mb-2 tracking-[0.1em]" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 16 }}>
        Oops. This page lost its spark.
      </p>
      <p className="text-[#EAFBFF]/30 mb-8" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* CTA Buttons — A11Y: 44px touch targets */}
      <div className="flex gap-4">
        <motion.button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg cursor-pointer min-h-[44px]"
          style={{
            background: "linear-gradient(135deg, #00E5FF, #A855F7)",
            fontFamily: "Orbitron, sans-serif",
            fontSize: 12,
            color: "#050505",
            letterSpacing: "0.15em",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          RETURN HOME
        </motion.button>
        <motion.button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg cursor-pointer min-h-[44px]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            fontFamily: "Orbitron, sans-serif",
            fontSize: 12,
            color: "#EAFBFF",
            letterSpacing: "0.15em",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          EXPLORE SOCIETY
        </motion.button>
      </div>
    </div>
    </>
  );
}