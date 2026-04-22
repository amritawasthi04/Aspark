import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Star, Award, Medal } from "lucide-react";

const achievements = [
  { year: "2026", title: "National Hackathon Champions", desc: "1st place at TechFest National Hackathon among 500+ teams.", icon: Trophy },
  { year: "2025", title: "Best Tech Society Award", desc: "Recognized as the best technology society in the university.", icon: Award },
  { year: "2025", title: "Smart India Hackathon Winners", desc: "Top team at SIH with an AI-powered healthcare solution.", icon: Medal },
  { year: "2024", title: "Research Paper Published", desc: "3 research papers published in IEEE and Springer journals.", icon: Star },
  { year: "2024", title: "Google Developer Challenge", desc: "Finalists in the Google Solution Challenge, global top 50.", icon: Trophy },
];

function Counter({ target, inView }: { target: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const num = parseInt(target);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = num / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, num]);

  return <>{count}{target.includes("+") ? "+" : ""}</>;
}

export function AchievementsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
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
            OUR MILESTONES
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
            ACHIEVEMENTS
          </h2>
        </motion.div>

        {/* Counter row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Hackathons Won", val: "25+" },
            { label: "Projects Built", val: "120+" },
            { label: "Papers Published", val: "15+" },
            { label: "Awards Received", val: "30+" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center p-5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(168, 85, 247, 0.1)" }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 32,
                  background: "linear-gradient(135deg, #00E5FF, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <Counter target={item.val} inView={inView} />
              </p>
              <p className="text-[#EAFBFF]/40 tracking-[0.1em]" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                {item.label.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(180deg, #00E5FF20, #A855F720, #00E5FF20)" }} />

          {achievements.map((item, i) => (
            <motion.div
              key={i}
              className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
              initial={{ x: i % 2 === 0 ? -30 : 30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
            >
              <div className="hidden md:block md:w-1/2" />
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10 mt-2" style={{ background: "linear-gradient(135deg, #00E5FF, #A855F7)", boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)" }} />

              <div
                className="ml-10 md:ml-0 md:w-1/2 p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0, 229, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <item.icon size={18} className="text-[#00E5FF]" />
                  <span className="text-[#00E5FF]/60" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 11 }}>
                    {item.year}
                  </span>
                </div>
                <h3 className="text-[#EAFBFF] mb-1" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 14 }}>
                  {item.title}
                </h3>
                <p className="text-[#EAFBFF]/40" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14 }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
