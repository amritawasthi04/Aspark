import { useRef, useState } from "react";
import { Terminal, Crosshair, ChevronRight, Fingerprint, UploadCloud, CheckCircle2 } from "lucide-react";
import { SEOHead } from "./SEOHead";
import { motion, useScroll, useTransform } from "motion/react";
import { Navbar } from "./Navbar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";

export function JoinUsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const roles = [
    { title: "Frontend Engineer", domain: "Tech & Dev", status: "OPEN" },
    { title: "Machine Learning Researcher", domain: "AI & VR", status: "OPEN" },
    { title: "UI/UX Cyber Designer", domain: "Design & Media", status: "CLOSING SOON" },
    { title: "Event Operator", domain: "Management", status: "OPEN" }
  ];

  return (
    <>
    <SEOHead title="Join Us" description="Apply to join ASPARK — India's premier student-run innovation and technology society." path="/join" />
    <div className="relative bg-[#050505] min-h-screen text-white font-sans selection:bg-[#10B981]/30 overflow-hidden" ref={containerRef}>
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1601589689479-1c82bd048e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2luJTIwdXMlMjBuZW9uJTIwc2lnbnxlbnwxfHx8fDE3NzY1NDc1NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Neon Sign"
            className="w-full h-full object-cover opacity-20 filter hue-rotate-[130deg]" // Shifts neon toward green/cyan
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/80 to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-6">
              <Fingerprint size={56} className="text-[#10B981] drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>
            <h1 
              className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-none mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              INITIATE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#00E5FF]">
                PROTOCOL
              </span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-[#10B981]/60 max-w-2xl mx-auto tracking-[0.3em] uppercase font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Your future starts at the terminal.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-[#10B981] text-xs uppercase tracking-widest mb-2 font-mono">Scroll to Authenticate</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#10B981] to-transparent" />
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-32 px-4 md:px-8 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Active <span className="text-[#10B981]">Directives</span>
          </h2>
          <p className="text-white/50 uppercase tracking-widest text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            Select your class. Join the resistance.
          </p>
        </div>

        <div className="space-y-4">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white/5 border border-white/10 p-6 md:p-8 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/10 hover:border-[#10B981]/50 transition-all cursor-pointer overflow-hidden"
            >
              {/* Background Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-center gap-6">
                <Crosshair className="text-[#10B981] hidden md:block opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
                    {role.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm tracking-widest text-white/50 font-mono">{role.domain}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border tracking-widest ${role.status === 'OPEN' ? 'border-[#10B981] text-[#10B981] bg-[#10B981]/10' : 'border-yellow-500 text-yellow-500 bg-yellow-500/10'}`}>
                      {role.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 group-hover:bg-[#10B981] group-hover:text-black group-hover:border-transparent transition-all">
                <ChevronRight />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-32 relative bg-[#0A0A0A] overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wider uppercase mb-16" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Recruitment <span className="text-[#10B981]">Phases</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent -translate-y-1/2" />

            {["Submit Dossier", "Technical Uplink", "Final Integration"].map((step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative z-10 bg-[#050505] p-8 border border-[#10B981]/20 rounded-lg shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-[#10B981]/10 border border-[#10B981] flex items-center justify-center font-bold font-mono text-[#10B981] mb-6">
                  0{idx + 1}
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider mb-2 text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>{step}</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  Phase {idx + 1} involves evaluating your compatibility with our core systems.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Call to Action & Form */}
      <section className="py-32 px-4 max-w-4xl mx-auto" id="application-form">
        {!isFormOpen ? (
          <div className="bg-white/5 border border-white/10 p-12 rounded-xl backdrop-blur-sm shadow-[0_0_40px_rgba(16,185,129,0.1)] text-center">
            <Terminal size={48} className="mx-auto text-[#10B981] mb-6" />
            <h2 className="text-3xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
              System Ready
            </h2>
            <p className="text-white/60 mb-8 font-mono">
              {">"} Ready to execute authentication sequence?<br/>
              {">"} Awaiting user input...
            </p>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 border-2 border-[#10B981] bg-[#10B981] text-black font-bold tracking-widest uppercase rounded hover:bg-transparent hover:text-[#10B981] transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Begin Application
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-[#10B981]/30 p-8 md:p-12 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent" />
            
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
              <Terminal className="text-[#10B981]" size={32} />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  Candidate Dossier
                </h2>
                <p className="text-[#10B981]/70 font-mono text-sm mt-1">{">"} ENCRYPTED SUBMISSION CHANNEL</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Application Submitted!'); setIsFormOpen(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Full Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono placeholder:text-white/20" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Email Address</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono placeholder:text-white/20" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-mono">University / College</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono placeholder:text-white/20" placeholder="Your Institution" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Year of Study</label>
                  <select required defaultValue="" className="w-full bg-[#050505] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono appearance-none">
                    <option value="" disabled>Select Year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year / Final</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Primary Domain</label>
                  <select required defaultValue="" className="w-full bg-[#050505] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono appearance-none">
                    <option value="" disabled>Select Domain</option>
                    <option value="frontend">Frontend Engineering</option>
                    <option value="ml">Machine Learning / AI</option>
                    <option value="design">UI/UX Design</option>
                    <option value="management">Management & Operations</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Portfolio / Github URL</label>
                  <input type="url" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono placeholder:text-white/20" placeholder="https://github.com/..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Why ASPARK? (Brief)</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono placeholder:text-white/20 resize-none" placeholder="State your intent..."></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/50 font-mono">Upload Resume (PDF)</label>
                <div className="border-2 border-dashed border-white/10 hover:border-[#10B981]/50 rounded-lg p-8 text-center transition-colors cursor-pointer group bg-white/5 relative">
                  <UploadCloud className="mx-auto text-white/30 group-hover:text-[#10B981] mb-3 transition-colors" size={32} />
                  <p className="text-sm text-white/50 font-mono group-hover:text-white transition-colors">Click to browse or drag and drop</p>
                  <p className="text-xs text-white/30 mt-1">Max file size: 5MB</p>
                  <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button type="button" onClick={() => setIsFormOpen(false)} className="text-white/50 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors cursor-pointer">
                  Cancel / Exit
                </button>
                <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-[#10B981] text-black font-bold tracking-widest uppercase rounded hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={18} />
                  Transmit Data
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
    </>
  );
}
