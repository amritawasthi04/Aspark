import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Send } from "lucide-react";

export function JoinSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section
      id="join-us"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #A855F7, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] text-[#A855F7]/60 mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
            BECOME A PART
          </p>
          <h2
            className="mb-4 tracking-[0.1em]"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              background: "linear-gradient(135deg, #EAFBFF, #A855F7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            JOIN ASPARK
          </h2>
          <p className="text-[#EAFBFF]/40" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16 }}>
            Ready to ignite your spark? Fill in your details and we'll get back to you.
          </p>
        </motion.div>

        <motion.form
          className="space-y-5 p-8 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(168, 85, 247, 0.15)",
            backdropFilter: "blur(20px)",
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { name: "name", label: "FULL NAME", type: "text", placeholder: "Enter your name" },
            { name: "email", label: "EMAIL", type: "email", placeholder: "Enter your email" },
            { name: "domain", label: "PREFERRED DOMAIN", type: "select", placeholder: "" },
          ].map((field) => (
            <div key={field.name}>
              <label
                className="block mb-2 tracking-[0.15em] text-[#EAFBFF]/40"
                style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10 }}
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  className="w-full px-4 py-3 rounded-lg text-[#EAFBFF] outline-none transition-all cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${focused === field.name ? "#A855F7" : "rgba(255,255,255,0.1)"}`,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 14,
                    boxShadow: focused === field.name ? "0 0 20px rgba(168, 85, 247, 0.15)" : "none",
                  }}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                >
                  <option value="" style={{ background: "#0A0F1C" }}>Select a domain</option>
                  <option value="tech" style={{ background: "#0A0F1C" }}>Tech & Development</option>
                  <option value="ai" style={{ background: "#0A0F1C" }}>AI / ML</option>
                  <option value="design" style={{ background: "#0A0F1C" }}>Design & Media</option>
                  <option value="management" style={{ background: "#0A0F1C" }}>Management</option>
                  <option value="research" style={{ background: "#0A0F1C" }}>Research & Innovation</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg text-[#EAFBFF] outline-none transition-all placeholder-white/20"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${focused === field.name ? "#A855F7" : "rgba(255,255,255,0.1)"}`,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 14,
                    boxShadow: focused === field.name ? "0 0 20px rgba(168, 85, 247, 0.15)" : "none",
                  }}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                />
              )}
            </div>
          ))}

          <div>
            <label
              className="block mb-2 tracking-[0.15em] text-[#EAFBFF]/40"
              style={{ fontFamily: "Orbitron, sans-serif", fontSize: 10 }}
            >
              WHY DO YOU WANT TO JOIN?
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 rounded-lg text-[#EAFBFF] outline-none transition-all resize-none placeholder-white/20"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${focused === "why" ? "#A855F7" : "rgba(255,255,255,0.1)"}`,
                fontFamily: "Rajdhani, sans-serif",
                fontSize: 14,
                boxShadow: focused === "why" ? "0 0 20px rgba(168, 85, 247, 0.15)" : "none",
              }}
              onFocus={() => setFocused("why")}
              onBlur={() => setFocused(null)}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #00E5FF, #A855F7)",
              fontFamily: "Orbitron, sans-serif",
              fontSize: 13,
              color: "#050505",
              letterSpacing: "0.15em",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 229, 255, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            SUBMIT APPLICATION <Send size={14} />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
