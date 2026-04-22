import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const decodingStrings = [
  "INITIALIZING ASPARK PROTOCOLS...",
  "ESTABLISHING SECURE UPLINK...",
  "DECRYPTING NEURAL PATHWAYS...",
  "LOADING QUANTUM VORTEX...",
  "SYSTEM ONLINE",
];

const LOADING_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 1,
  color: i % 2 === 0 ? "#00E5FF" : "#A855F7",
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 2,
  xDrift: (Math.random() - 0.5) * 40,
}));

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Decoding text interval
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1 < decodingStrings.length ? prev + 1 : prev));
    }, 600);

    // Progress bar interval
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 4;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setIsLoaded(true);
          setTimeout(onComplete, 1200); // Wait for exit animation (shockwave) to finish
          return 100;
        }
        return next;
      });
    }, 40);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050505" }}
        >
          {/* Electrifying background overlay */}
          <motion.div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{ 
              background: [
                "radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)",
                "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 80%)",
                "radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)"
              ] 
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Floating Neon Particles — PERF: memoized, reduced from 15 to 10 */}
          {LOADING_PARTICLES.map((p) => (
            <motion.div
              key={`particle-${p.id}`}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                left: p.left,
                top: p.top,
                filter: "drop-shadow(0 0 2px white)",
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -40, -80],
                x: [0, p.xDrift]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}

          {/* Glitch Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA0MEw0MCA0ME00MCAwTDQwIDQwIiBzdHJva2U9IiMwMEU1RkYiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(transparent,black,transparent)] pointer-events-none" />

          {/* Central Animated Element */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            {/* Pulsing shockwave rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute inset-0 rounded-full border border-[#00E5FF]/20"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0, 229, 255, 0.3))"
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1.5, 2.5],
                  opacity: [0, 0.5, 0],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "linear"
                }}
              />
            ))}

            {/* Inner rotating high-tech shapes */}
            <motion.div 
              className="absolute w-48 h-48 border border-[#A855F7]/30"
              style={{ clipPath: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute w-40 h-40 border-2 border-[#00E5FF]/40 border-dashed"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Core A Logo drawing */}
            <svg viewBox="0 0 100 100" className="w-24 h-24 absolute z-10 drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
              <defs>
                <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              {/* Outer A */}
              <motion.path
                d="M50 10 L10 80 L30 80 L40 60 L60 60 L70 80 L90 80 Z"
                fill="none"
                stroke="url(#neon)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
              />
              {/* Inner Triangle core */}
              <motion.path
                d="M50 35 L43 50 L57 50 Z"
                fill="url(#neon)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.4, 1], scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
              />
            </svg>
            
            {/* Random Lightning / Electric bolts */}
            <svg viewBox="0 0 376 376" className="absolute inset-[-60px] w-[calc(100%+120px)] h-[calc(100%+120px)] pointer-events-none z-20 overflow-visible">
              <motion.path
                d="M 40 40 L 90 90 L 80 130 L 140 180"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 8px #00E5FF)" }}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: [0, 1, 0, 0, 1, 0],
                  pathLength: [0, 1, 1, 0, 1, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.path
                d="M 320 220 L 260 190 L 270 150 L 210 110"
                fill="none"
                stroke="#A855F7"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 8px #A855F7)" }}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: [0, 0, 1, 0, 1, 0],
                  pathLength: [0, 0, 1, 1, 0, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.2 }}
              />
            </svg>
          </div>

          {/* Decoding text */}
          <div className="mt-16 h-8 overflow-hidden relative w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="absolute tracking-[0.3em] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: 13 }}
              >
                {decodingStrings[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Loading bar container */}
          <div className="mt-8 relative w-72 md:w-96 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#00E5FF] via-[#A855F7] to-[#00E5FF] w-full origin-left"
              style={{ 
                x: `-${100 - progress}%`,
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              {/* Hot leading edge tip */}
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-white blur-[2px] opacity-100" />
            </motion.div>
          </div>

          {/* Progress number */}
          <div className="mt-4 flex items-center justify-between w-72 md:w-96 px-1">
            <motion.span 
              className="text-[#EAFBFF]/50 text-[10px] tracking-widest"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ASPARK_OS_V2.6
            </motion.span>
            <span 
              className="text-[#EAFBFF] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
              style={{ fontFamily: "Orbitron, sans-serif", fontSize: 16 }}
            >
              {Math.floor(progress)}%
            </span>
          </div>

        </motion.div>
      )}

      {/* Exit Shockwave Flash */}
      {isLoaded && (
        <motion.div
          key="shockwave"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: [0, 1, 0], scale: [0.1, 2, 5] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center mix-blend-screen"
        >
          <div 
            className="w-[100vh] h-[100vh] rounded-full" 
            style={{ 
              background: "radial-gradient(circle, rgba(0,229,255,1) 0%, rgba(168,85,247,0.8) 20%, transparent 60%)",
              filter: "blur(20px)"
            }} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
