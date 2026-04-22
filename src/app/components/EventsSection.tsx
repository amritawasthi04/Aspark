import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const events = [
  {
    title: "HackSpark 2026",
    type: "Hackathon",
    slug: "hackathons",
    date: "May 15-16, 2026",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1637308755606-266e7f2371d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaGFja2F0aG9uJTIwY29kaW5nJTIwZXZlbnR8ZW58MXx8fHwxNzc2MTU5NjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#00E5FF",
  },
  {
    title: "AI Workshop Series",
    type: "Workshop",
    slug: "workshops",
    date: "June 1-3, 2026",
    location: "Tech Lab 201",
    image: "https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBuZXVyYWwlMjBuZXR3b3JrfGVufDF8fHx8MTc3NjE0ODgyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#A855F7",
  },
  {
    title: "Design Jam",
    type: "Competition",
    slug: "competitions",
    date: "June 20, 2026",
    location: "Innovation Hub",
    image: "https://images.unsplash.com/photo-1765539160785-e7953620488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMGRpZ2l0YWwlMjBtZWRpYXxlbnwxfHx8fDE3NzYxNTk2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#00E5FF",
  },
  {
    title: "Tech Talks: Future of Web",
    type: "Seminar",
    slug: "seminars",
    date: "July 5, 2026",
    location: "Seminar Hall",
    image: "https://images.unsplash.com/photo-1733222765056-b0790217baa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHNlbWluYXIlMjBwcmVzZW50YXRpb24lMjB0ZWNofGVufDF8fHx8MTc3NjE1OTYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#A855F7",
  },
];

export function EventsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section
      id="events"
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
            UPCOMING
          </p>
          <h2
            className="tracking-[0.1em] bg-clip-text text-transparent w-fit mx-auto"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(24px, 4vw, 42px)",
              backgroundImage: "linear-gradient(135deg, #EAFBFF, #00E5FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            EVENTS
          </h2>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              onClick={() => navigate(`/events/${event.slug}`)}
              className="flex-shrink-0 w-[280px] lg:w-auto snap-center rounded-xl overflow-hidden group cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${event.color}10`,
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, borderColor: `${event.color}30` }}
            >
              <div className="relative h-40 overflow-hidden">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, #050505 100%)" }} />
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full"
                  style={{
                    background: `${event.color}20`,
                    border: `1px solid ${event.color}30`,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 11,
                    color: event.color,
                    letterSpacing: "0.1em",
                  }}
                >
                  {event.type}
                </span>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-[#EAFBFF]" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 13 }}>
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mb-1 text-[#EAFBFF]/40" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                  <Calendar size={12} /> {event.date}
                </div>
                <div className="flex items-center gap-2 mb-3 text-[#EAFBFF]/40" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                  <MapPin size={12} /> {event.location}
                </div>
                <div className="flex items-center gap-1 text-[#00E5FF]/60 group-hover:text-[#00E5FF] transition-colors" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                  Learn More <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/events")}
            className="group relative px-8 py-3 rounded-full overflow-hidden bg-white/[0.02] border border-[#00E5FF]/30 hover:border-[#00E5FF] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/0 via-[#00E5FF]/10 to-[#00E5FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
            <div className="relative z-10 flex items-center gap-2 text-[#00E5FF] font-rajdhani tracking-widest text-sm font-semibold uppercase">
              View All Events
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
