import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";
import {
  Code, Brain, Palette, BarChart3, FlaskConical,
  ArrowLeft, ArrowRight, Users, BookOpen, Rocket,
  CheckCircle, Star, ExternalLink, ChevronRight,
  Layers, Database, Globe, Cpu, PenTool, TrendingUp,
  FileText, Lightbulb, Zap, Target, Award
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SEOHead } from "./SEOHead";

const domainsData = [
  {
    slug: "tech-development",
    icon: Code,
    title: "Tech & Development",
    tagline: "BUILD THE FUTURE, ONE LINE AT A TIME",
    color: "#00E5FF",
    colorAlt: "#0EA5E9",
    image: "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGUlMjBwcm9ncmFtbWluZ3xlbnwxfHx8fDE3NzYxNjA0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The Tech & Development domain is the backbone of ASPARK. We build real-world applications, contribute to open-source, and stay on the cutting edge of software engineering. From frontend wizardry to backend architecture, cloud deployments to DevOps pipelines — our developers ship production-grade code.",
    longDescription: "Our members work on full-stack web and mobile applications using modern frameworks and tools. We believe in learning by building — every member ships a real project within their first semester. We host weekly code reviews, pair programming sessions, and architecture deep-dives to ensure continuous growth.",
    techStack: [
      { name: "React / Next.js", icon: Globe },
      { name: "Node.js / Express", icon: Layers },
      { name: "Python / Django", icon: Code },
      { name: "PostgreSQL / MongoDB", icon: Database },
      { name: "Docker / K8s", icon: Cpu },
      { name: "AWS / GCP", icon: Globe },
    ],
    projects: [
      { name: "Campus Connect", desc: "A university-wide social platform connecting 10,000+ students with events, clubs, and resources.", status: "Live", tech: "React, Node.js, PostgreSQL" },
      { name: "CodeArena", desc: "Competitive programming platform with real-time multiplayer coding battles and AI-powered hints.", status: "Beta", tech: "Next.js, WebSocket, Redis" },
      { name: "SmartAttend", desc: "QR-based attendance system with facial recognition and analytics dashboard for faculty.", status: "Live", tech: "Flutter, Python, TensorFlow" },
    ],
    learningPath: [
      { phase: "Phase 1", title: "Foundations", items: ["HTML, CSS, JavaScript", "Git & Version Control", "Basic Data Structures", "REST API concepts"] },
      { phase: "Phase 2", title: "Frameworks & Tools", items: ["React / Vue.js", "Node.js & Express", "Databases (SQL + NoSQL)", "Authentication & Security"] },
      { phase: "Phase 3", title: "Advanced & Production", items: ["System Design", "CI/CD & DevOps", "Cloud Deployment", "Performance Optimization"] },
    ],
    leads: [
      { name: "Rohan Das", role: "Domain Lead", initial: "R" },
      { name: "Aarav Joshi", role: "Backend Lead", initial: "A" },
      { name: "Meera Iyer", role: "Frontend Lead", initial: "M" },
    ],
    stats: [
      { label: "Active Members", value: "120+" },
      { label: "Projects Shipped", value: "45+" },
      { label: "Contributions", value: "2.5K+" },
      { label: "Workshops", value: "30+" },
    ],
    achievements: [
      "1st Place — National Hackathon, TechFest 2025",
      "Google Summer of Code — 5 accepted contributors",
      "Campus Connect: 10,000+ active monthly users",
      "Open-source project with 500+ GitHub stars",
    ],
  },
  {
    slug: "ai-ml",
    icon: Brain,
    title: "AI / ML",
    tagline: "TEACHING MACHINES TO THINK, LEARN, AND EVOLVE",
    color: "#A855F7",
    colorAlt: "#7C3AED",
    image: "https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhJTIwc2NpZW5jZSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzc2MTYwNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The AI/ML domain dives deep into the world of artificial intelligence — from classical machine learning to cutting-edge deep learning, NLP, and computer vision. We don't just study theory; we build intelligent systems that solve real problems.",
    longDescription: "Our team works on research papers, Kaggle competitions, and real-world AI applications. We explore everything from transformer architectures to reinforcement learning, and we regularly collaborate with faculty on publishable research. Members gain hands-on experience with industry-standard tools and frameworks.",
    techStack: [
      { name: "Python / PyTorch", icon: Code },
      { name: "TensorFlow / Keras", icon: Brain },
      { name: "Scikit-learn", icon: Database },
      { name: "OpenCV", icon: Cpu },
      { name: "Hugging Face", icon: Globe },
      { name: "LangChain / LLMs", icon: Layers },
    ],
    projects: [
      { name: "MedScan AI", desc: "Deep learning model for detecting lung diseases from X-ray images with 96% accuracy.", status: "Published", tech: "PyTorch, ResNet, Flask" },
      { name: "CampusBot", desc: "LLM-powered conversational AI chatbot for answering university queries 24/7.", status: "Live", tech: "LangChain, GPT-4, React" },
      { name: "TrafficFlow", desc: "Computer vision system for real-time traffic density estimation and signal optimization.", status: "Research", tech: "YOLOv8, OpenCV, MQTT" },
    ],
    learningPath: [
      { phase: "Phase 1", title: "Math & Fundamentals", items: ["Linear Algebra & Calculus", "Probability & Statistics", "Python for Data Science", "Numpy, Pandas, Matplotlib"] },
      { phase: "Phase 2", title: "Core ML & Deep Learning", items: ["Supervised & Unsupervised Learning", "Neural Networks", "CNNs & RNNs", "Model Evaluation & Tuning"] },
      { phase: "Phase 3", title: "Specialization", items: ["NLP & Transformers", "Computer Vision", "Reinforcement Learning", "MLOps & Deployment"] },
    ],
    leads: [
      { name: "Sneha Kapoor", role: "Domain Lead", initial: "S" },
      { name: "Aditya Rao", role: "Research Lead", initial: "A" },
      { name: "Nisha Verma", role: "Projects Lead", initial: "N" },
    ],
    stats: [
      { label: "Active Members", value: "85+" },
      { label: "Papers Published", value: "12+" },
      { label: "Kaggle Medals", value: "8" },
      { label: "Models Deployed", value: "15+" },
    ],
    achievements: [
      "IEEE Paper — AI-based disease detection system",
      "Kaggle Competition — Top 5% in NLP challenge",
      "Smart India Hackathon — Winner, Healthcare Track",
      "MedScan AI — Featured in university research journal",
    ],
  },
  {
    slug: "design-media",
    icon: Palette,
    title: "Design & Media",
    tagline: "WHERE PIXELS MEET PURPOSE",
    color: "#F43F5E",
    colorAlt: "#EC4899",
    image: "https://images.unsplash.com/photo-1768729797971-472ce92e7a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmUlMjBzdHVkaW8lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc2MTYwNDgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The Design & Media domain brings ideas to life through stunning visuals, intuitive interfaces, and compelling multimedia content. We are the creative engine of ASPARK — crafting everything from brand identities to motion graphics.",
    longDescription: "Our designers work at the intersection of aesthetics and usability. We handle UI/UX design for all ASPARK projects, produce social media content, create event branding, and explore emerging fields like 3D design and augmented reality. Every pixel has a purpose.",
    techStack: [
      { name: "Figma / Adobe XD", icon: PenTool },
      { name: "After Effects", icon: Layers },
      { name: "Blender / Cinema 4D", icon: Cpu },
      { name: "Photoshop / Illustrator", icon: Palette },
      { name: "Framer / Webflow", icon: Globe },
      { name: "Canva / Premiere Pro", icon: Globe },
    ],
    projects: [
      { name: "ASPARK Brand System", desc: "Complete visual identity system including logo, typography, colors, and brand guidelines.", status: "Live", tech: "Figma, Illustrator" },
      { name: "HackSpark Visual Pack", desc: "Full event branding package — posters, social media, merch, and motion graphics.", status: "Delivered", tech: "After Effects, Photoshop" },
      { name: "3D Campus Tour", desc: "Interactive 3D walkthrough of the innovation hub using Blender and web technologies.", status: "In Progress", tech: "Blender, Three.js, React" },
    ],
    learningPath: [
      { phase: "Phase 1", title: "Design Foundations", items: ["Color Theory & Typography", "Layout & Composition", "Figma Basics", "Design Thinking Process"] },
      { phase: "Phase 2", title: "UI/UX & Motion", items: ["User Research & Personas", "Wireframing & Prototyping", "Interaction Design", "Motion Graphics Basics"] },
      { phase: "Phase 3", title: "Advanced Creative", items: ["3D Modeling & Animation", "Video Production", "AR/VR Experiences", "Design Systems"] },
    ],
    leads: [
      { name: "Vikram Singh", role: "Domain Lead", initial: "V" },
      { name: "Riya Menon", role: "UI/UX Lead", initial: "R" },
      { name: "Karthik Dev", role: "Motion Design Lead", initial: "K" },
    ],
    stats: [
      { label: "Active Members", value: "60+" },
      { label: "Designs Created", value: "500+" },
      { label: "Brand Projects", value: "20+" },
      { label: "Videos Produced", value: "35+" },
    ],
    achievements: [
      "Adobe Design Challenge — Regional Finalist",
      "ASPARK branding — Adopted university-wide",
      "HackSpark promo video — 50K+ views on YouTube",
      "3D Campus Tour — Featured at Innovation Day",
    ],
  },
  {
    slug: "management",
    icon: BarChart3,
    title: "Management",
    tagline: "ORCHESTRATING INNOVATION AT SCALE",
    color: "#F59E0B",
    colorAlt: "#EAB308",
    image: "https://images.unsplash.com/photo-1758876202522-df2c0dbd0d52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwbWFuYWdlbWVudCUyMHBsYW5uaW5nfGVufDF8fHx8MTc3NjE2MDQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The Management domain is the operational backbone of ASPARK. We plan and execute large-scale events, manage sponsorships, drive marketing campaigns, and build the strategic framework that keeps the society thriving.",
    longDescription: "Our managers are leaders, strategists, and communicators. They coordinate across all domains, handle budgets, manage external partnerships, and ensure every ASPARK initiative runs smoothly from ideation to execution. This domain builds real-world leadership and organizational skills.",
    techStack: [
      { name: "Notion / Trello", icon: Layers },
      { name: "Google Workspace", icon: Globe },
      { name: "Slack / Discord", icon: Globe },
      { name: "Canva / Figma", icon: PenTool },
      { name: "Analytics Tools", icon: TrendingUp },
      { name: "Sponsorship CRM", icon: Database },
    ],
    projects: [
      { name: "HackSpark 2026", desc: "500-participant national hackathon — end-to-end planning, logistics, sponsors, and execution.", status: "Upcoming", tech: "Event Management" },
      { name: "ASPARK Newsletter", desc: "Weekly newsletter reaching 2,000+ subscribers with tech news, project updates, and opportunities.", status: "Live", tech: "Mailchimp, Notion" },
      { name: "Sponsorship Program", desc: "Built partnerships with 15+ companies for funding, mentorship, and recruitment pipeline.", status: "Ongoing", tech: "CRM, Outreach" },
    ],
    learningPath: [
      { phase: "Phase 1", title: "Foundations", items: ["Communication Skills", "Project Management Basics", "Team Collaboration Tools", "Content Writing"] },
      { phase: "Phase 2", title: "Strategy & Execution", items: ["Event Planning & Logistics", "Marketing & Social Media", "Sponsorship Outreach", "Budget Management"] },
      { phase: "Phase 3", title: "Leadership", items: ["Strategic Planning", "Public Speaking", "Crisis Management", "Cross-domain Coordination"] },
    ],
    leads: [
      { name: "Ananya Gupta", role: "Domain Lead", initial: "A" },
      { name: "Rahul Nair", role: "Events Head", initial: "R" },
      { name: "Diya Nair", role: "Marketing Lead", initial: "D" },
    ],
    stats: [
      { label: "Active Members", value: "70+" },
      { label: "Events Managed", value: "50+" },
      { label: "Sponsors Secured", value: "15+" },
      { label: "Newsletter Subs", value: "2K+" },
    ],
    achievements: [
      "HackSpark — Largest college hackathon in the state",
      "₹5L+ sponsorship secured for 2025-26",
      "Social media reach — 100K+ monthly impressions",
      "Best Organized Event — University Awards 2025",
    ],
  },
  {
    slug: "research-innovation",
    icon: FlaskConical,
    title: "Research & Innovation",
    tagline: "EXPLORING THE EDGE OF WHAT'S POSSIBLE",
    color: "#10B981",
    colorAlt: "#059669",
    image: "https://images.unsplash.com/photo-1766297247072-93fd815afef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpZmljJTIwcmVzZWFyY2glMjBpbm5vdmF0aW9uJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NzYxNjA0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The Research & Innovation domain pushes the boundaries of technology through academic research, experimental prototypes, and exploration of emerging fields. We turn curiosity into published papers and patents.",
    longDescription: "Our researchers explore IoT, blockchain, quantum computing, AR/VR, and other emerging technologies. We collaborate with faculty mentors, participate in research conferences, and file patents for novel inventions. This domain is for those who want to advance the state of the art.",
    techStack: [
      { name: "LaTeX / Overleaf", icon: FileText },
      { name: "Arduino / Raspberry Pi", icon: Cpu },
      { name: "Solidity / Web3.js", icon: Layers },
      { name: "Unity / Unreal", icon: Globe },
      { name: "MATLAB / R", icon: Database },
      { name: "Qiskit (Quantum)", icon: Lightbulb },
    ],
    projects: [
      { name: "SmartCampus IoT", desc: "Network of 50+ IoT sensors monitoring energy, air quality, and occupancy across campus.", status: "Live", tech: "Arduino, MQTT, React" },
      { name: "BlockCert", desc: "Blockchain-based certificate verification system to eliminate document fraud.", status: "Prototype", tech: "Solidity, IPFS, React" },
      { name: "AR Lab Navigator", desc: "Augmented reality app for navigating labs and viewing equipment info through phone camera.", status: "Research", tech: "Unity, ARCore, Firebase" },
    ],
    learningPath: [
      { phase: "Phase 1", title: "Research Fundamentals", items: ["Scientific Method", "Literature Review", "Research Paper Writing", "LaTeX & Overleaf"] },
      { phase: "Phase 2", title: "Emerging Technologies", items: ["IoT & Embedded Systems", "Blockchain Fundamentals", "AR/VR Development", "Quantum Computing Basics"] },
      { phase: "Phase 3", title: "Publication & Patents", items: ["Conference Submissions", "Patent Filing Process", "Peer Review", "Research Collaboration"] },
    ],
    leads: [
      { name: "Karan Patel", role: "Domain Lead", initial: "K" },
      { name: "Shruti Menon", role: "IoT Lead", initial: "S" },
      { name: "Dev Agarwal", role: "Blockchain Lead", initial: "D" },
    ],
    stats: [
      { label: "Active Members", value: "55+" },
      { label: "Papers Published", value: "15+" },
      { label: "Patents Filed", value: "3" },
      { label: "Prototypes Built", value: "20+" },
    ],
    achievements: [
      "IEEE Publication — SmartCampus IoT paper",
      "Springer Journal — Blockchain in education",
      "Patent Filed — AI-powered attendance system",
      "Innovation Day — Best Research Project Award",
    ],
  },
];

function DomainHero({ domain }: { domain: typeof domainsData[0] }) {
  const Icon = domain.icon;
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <ImageWithFallback src={domain.image} alt={domain.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${domain.color}10 0%, #050505 85%)` }} />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Glow effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: `radial-gradient(circle, ${domain.color}15 0%, transparent 70%)`, filter: "blur(80px)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: domain.color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -40] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-16 w-full">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${domain.color}15`, border: `1px solid ${domain.color}30` }}
            >
              <Icon size={24} style={{ color: domain.color }} />
            </div>
            <span className="tracking-[0.3em]" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}80` }}>
              DOMAIN
            </span>
          </div>

          <h1
            className="mb-3 tracking-[0.05em] bg-clip-text text-transparent w-fit"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(28px, 5vw, 52px)",
              backgroundImage: `linear-gradient(135deg, #EAFBFF, ${domain.color})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {domain.title}
          </h1>

          <p className="tracking-[0.2em] mb-6" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "clamp(12px, 2vw, 16px)", color: `${domain.color}90` }}>
            {domain.tagline}
          </p>

          <p className="max-w-2xl text-[#EAFBFF]/50" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16, lineHeight: 1.8 }}>
            {domain.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar({ domain }: { domain: typeof domainsData[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-12" style={{ background: `linear-gradient(180deg, #050505, ${domain.color}05, #050505)` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {domain.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${domain.color}15` }}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: 28,
                backgroundImage: `linear-gradient(135deg, ${domain.color}, ${domain.colorAlt})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}>
                {stat.value}
              </p>
              <p className="text-[#EAFBFF]/40 tracking-[0.1em]" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                {stat.label.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutDomain({ domain }: { domain: typeof domainsData[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20" style={{ background: "#050505" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="tracking-[0.3em] mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}60` }}>
              ABOUT THIS DOMAIN
            </p>
            <h2 className="mb-6 tracking-[0.05em]" style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(20px, 3vw, 32px)",
              color: "#EAFBFF",
            }}>
              What We Do
            </h2>
            <p className="text-[#EAFBFF]/45 mb-6" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16, lineHeight: 1.8 }}>
              {domain.longDescription}
            </p>
            <motion.button
              className="px-6 py-3 rounded-lg cursor-pointer flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${domain.color}, ${domain.colorAlt})`,
                fontFamily: "Orbitron, sans-serif",
                fontSize: 11,
                color: "#050505",
                letterSpacing: "0.15em",
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${domain.color}40` }}
              whileTap={{ scale: 0.98 }}
            >
              JOIN THIS DOMAIN <ChevronRight size={14} />
            </motion.button>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="tracking-[0.3em] mb-4" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}60` }}>
              TECH STACK / TOOLS
            </p>
            <div className="grid grid-cols-2 gap-3">
              {domain.techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${domain.color}10`,
                  }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                  whileHover={{ borderColor: `${domain.color}30` }}
                >
                  <tech.icon size={16} style={{ color: domain.color }} />
                  <span className="text-[#EAFBFF]/60" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ domain }: { domain: typeof domainsData[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const statusColor: Record<string, string> = {
    Live: "#10B981",
    Beta: "#F59E0B",
    Published: "#00E5FF",
    Research: "#A855F7",
    "In Progress": "#F59E0B",
    Delivered: "#10B981",
    Prototype: "#F59E0B",
    Upcoming: "#00E5FF",
    Ongoing: "#10B981",
  };

  return (
    <section ref={ref} className="py-20" style={{ background: `linear-gradient(180deg, #050505, #0A0F1C, #050505)` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}60` }}>
            WHAT WE'VE BUILT
          </p>
          <h2 className="tracking-[0.05em] bg-clip-text text-transparent w-fit mx-auto" style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(20px, 3vw, 32px)",
            backgroundImage: `linear-gradient(135deg, #EAFBFF, ${domain.color})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}>
            FEATURED PROJECTS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {domain.projects.map((project, i) => (
            <motion.div
              key={project.name}
              className="p-6 rounded-xl group cursor-pointer relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${domain.color}10`,
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, borderColor: `${domain.color}30`, boxShadow: `0 15px 35px ${domain.color}08` }}
            >
              {/* Top glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top, ${domain.color}06 0%, transparent 50%)` }}
              />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <Rocket size={20} style={{ color: domain.color }} />
                <span
                  className="px-2.5 py-0.5 rounded-full"
                  style={{
                    fontSize: 10,
                    fontFamily: "Orbitron, sans-serif",
                    background: `${statusColor[project.status] || domain.color}15`,
                    color: statusColor[project.status] || domain.color,
                    border: `1px solid ${statusColor[project.status] || domain.color}25`,
                  }}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="text-[#EAFBFF] mb-2 relative z-10" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 14 }}>
                {project.name}
              </h3>
              <p className="text-[#EAFBFF]/40 mb-4 relative z-10" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13, lineHeight: 1.6 }}>
                {project.desc}
              </p>
              <p className="text-[#EAFBFF]/25 relative z-10" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 11 }}>
                <span style={{ color: `${domain.color}50` }}>Stack:</span> {project.tech}
              </p>

              <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" style={{ color: domain.color, fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
                View Project <ExternalLink size={11} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningPathSection({ domain }: { domain: typeof domainsData[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20" style={{ background: "#050505" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}60` }}>
            YOUR JOURNEY
          </p>
          <h2 className="tracking-[0.05em] bg-clip-text text-transparent w-fit mx-auto" style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(20px, 3vw, 32px)",
            backgroundImage: `linear-gradient(135deg, #EAFBFF, ${domain.color})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}>
            LEARNING PATH
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent, ${domain.color}20, transparent)` }}
          />

          {domain.learningPath.map((phase, i) => (
            <motion.div
              key={phase.phase}
              className="p-6 rounded-xl relative"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${domain.color}10`,
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              {/* Phase badge */}
              <div
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{
                  background: `${domain.color}10`,
                  border: `1px solid ${domain.color}20`,
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: 10,
                  color: domain.color,
                  letterSpacing: "0.15em",
                }}
              >
                {phase.phase}
              </div>

              <h3 className="text-[#EAFBFF] mb-4" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 15 }}>
                {phase.title}
              </h3>

              <div className="space-y-2.5">
                {phase.items.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle size={13} style={{ color: `${domain.color}60` }} />
                    <span className="text-[#EAFBFF]/45" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Arrow to next */}
              {i < 2 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={16} style={{ color: `${domain.color}30` }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamLeads({ domain }: { domain: typeof domainsData[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20" style={{ background: `linear-gradient(180deg, #050505, #0A0F1C, #050505)` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}60` }}>
            LEADERSHIP
          </p>
          <h2 className="tracking-[0.05em] bg-clip-text text-transparent w-fit mx-auto" style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(20px, 3vw, 32px)",
            backgroundImage: `linear-gradient(135deg, #EAFBFF, ${domain.color})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}>
            DOMAIN LEADS
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {domain.leads.map((lead, i) => (
            <motion.div
              key={lead.name}
              className="w-56 p-6 rounded-xl text-center group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${domain.color}10`,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, borderColor: `${domain.color}30` }}
            >
              <div
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${domain.color}20, ${domain.color}05)`,
                  border: `1px solid ${domain.color}20`,
                }}
              >
                <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 28, color: domain.color }}>
                  {lead.initial}
                </span>
              </div>
              <h3 className="text-[#EAFBFF] mb-1" style={{ fontFamily: "Orbitron, sans-serif", fontSize: 13 }}>
                {lead.name}
              </h3>
              <p style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}70` }}>
                {lead.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsList({ domain }: { domain: typeof domainsData[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20" style={{ background: "#050505" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}60` }}>
            MILESTONES
          </p>
          <h2 className="tracking-[0.05em] bg-clip-text text-transparent w-fit mx-auto" style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(20px, 3vw, 32px)",
            backgroundImage: `linear-gradient(135deg, #EAFBFF, ${domain.color})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}>
            KEY ACHIEVEMENTS
          </h2>
        </motion.div>

        <div className="space-y-4">
          {domain.achievements.map((ach, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${domain.color}08`,
              }}
              initial={{ x: -20, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ borderColor: `${domain.color}25`, x: 5 }}
            >
              <Award size={18} style={{ color: domain.color, flexShrink: 0 }} />
              <p className="text-[#EAFBFF]/55" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}>
                {ach}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainCTA({ domain }: { domain: typeof domainsData[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24" style={{ background: "#050505" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          className="p-12 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${domain.color}08, ${domain.colorAlt}05)`,
            border: `1px solid ${domain.color}15`,
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Glow */}
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${domain.color}08 0%, transparent 60%)` }} />

          <Zap size={32} style={{ color: domain.color }} className="mx-auto mb-4 relative z-10" />
          <h2 className="mb-3 tracking-[0.05em] relative z-10" style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(18px, 3vw, 28px)",
            color: "#EAFBFF",
          }}>
            Ready to Spark Your Journey?
          </h2>
          <p className="text-[#EAFBFF]/40 mb-8 max-w-md mx-auto relative z-10" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}>
            Join the {domain.title} domain and start building, learning, and leading with ASPARK.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <motion.button
              className="px-8 py-3 rounded-lg cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${domain.color}, ${domain.colorAlt})`,
                fontFamily: "Orbitron, sans-serif",
                fontSize: 12,
                color: "#050505",
                letterSpacing: "0.15em",
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${domain.color}40` }}
              whileTap={{ scale: 0.98 }}
            >
              APPLY NOW
            </motion.button>
            <motion.button
              onClick={() => navigate("/domains")}
              className="px-8 py-3 rounded-lg cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${domain.color}30`,
                fontFamily: "Orbitron, sans-serif",
                fontSize: 12,
                color: "#EAFBFF",
                letterSpacing: "0.15em",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              ALL DOMAINS
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ========== DOMAINS LISTING PAGE ==========
export function DomainsListingPage() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen" style={{ background: "#050505", color: "#EAFBFF" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-16">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #A855F7, transparent 70%)", filter: "blur(100px)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              background: i % 2 === 0 ? "#00E5FF" : "#A855F7",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 0.6, 0], y: [0, -30] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}

        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="tracking-[0.3em] text-[#A855F7]/60 mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 13 }}>
            EXPLORE OUR EXPERTISE
          </p>
          <h1
            className="mb-4 tracking-[0.1em]"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "clamp(28px, 5vw, 52px)",
              background: "linear-gradient(135deg, #EAFBFF, #A855F7, #00E5FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OUR DOMAINS
          </h1>
          <p className="text-[#EAFBFF]/40 max-w-lg mx-auto" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16 }}>
            Five specialized verticals driving innovation across technology, creativity, and leadership.
          </p>
        </motion.div>
      </section>

      {/* Domain Cards */}
      <section ref={ref} className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          {domainsData.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.slug}
                className="group cursor-pointer rounded-2xl overflow-hidden relative"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${domain.color}10`,
                }}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: `${domain.color}30`, boxShadow: `0 10px 40px ${domain.color}08` }}
                onClick={() => navigate(`/domains/${domain.slug}`)}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={domain.image}
                      alt={domain.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 50%, #050505 100%)` }} />
                    <div className="absolute inset-0 md:hidden" style={{ background: `linear-gradient(180deg, transparent 50%, #050505 100%)` }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${domain.color}12`, border: `1px solid ${domain.color}20` }}
                      >
                        <Icon size={20} style={{ color: domain.color }} />
                      </div>
                      <span className="tracking-[0.2em]" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 11, color: `${domain.color}70` }}>
                        DOMAIN
                      </span>
                    </div>

                    <h2 className="mb-2 tracking-[0.05em]" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(18px, 3vw, 24px)", color: "#EAFBFF" }}>
                      {domain.title}
                    </h2>
                    <p className="tracking-[0.1em] mb-3" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12, color: `${domain.color}70` }}>
                      {domain.tagline}
                    </p>
                    <p className="text-[#EAFBFF]/40 mb-4 max-w-xl" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 14, lineHeight: 1.7 }}>
                      {domain.description}
                    </p>

                    {/* Stats inline */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      {domain.stats.slice(0, 3).map((stat) => (
                        <div key={stat.label} className="flex items-center gap-1.5">
                          <span style={{ fontFamily: "Orbitron, sans-serif", fontSize: 14, color: domain.color }}>{stat.value}</span>
                          <span className="text-[#EAFBFF]/25" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 11 }}>{stat.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: domain.color, fontFamily: "Orbitron, sans-serif", fontSize: 11, letterSpacing: "0.15em" }}>
                      EXPLORE DOMAIN <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 20% 50%, ${domain.color}05 0%, transparent 50%)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            className="p-10 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0, 229, 255, 0.1)",
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Target size={28} className="mx-auto mb-4 text-[#00E5FF]" />
            <h2 className="mb-3" style={{ fontFamily: "Orbitron, sans-serif", fontSize: "clamp(16px, 3vw, 24px)", color: "#EAFBFF" }}>
              Can't Decide?
            </h2>
            <p className="text-[#EAFBFF]/40 mb-6" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}>
              Join ASPARK first. Explore all domains during our orientation week and find your perfect fit.
            </p>
            <motion.button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-lg cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #00E5FF, #A855F7)",
                fontFamily: "Orbitron, sans-serif",
                fontSize: 12,
                color: "#050505",
                letterSpacing: "0.15em",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 229, 255, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              JOIN ASPARK
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ========== SINGLE DOMAIN PAGE ==========
export function DomainDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const domain = domainsData.find((d) => d.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!domain) {
    navigate("/domains");
    return null;
  }

  // Prev / next navigation
  const idx = domainsData.indexOf(domain);
  const prevDomain = idx > 0 ? domainsData[idx - 1] : null;
  const nextDomain = idx < domainsData.length - 1 ? domainsData[idx + 1] : null;

  return (
    <div className="min-h-screen" style={{ background: "#050505", color: "#EAFBFF" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20">
        <div className="flex items-center gap-2 text-[#EAFBFF]/30" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 12 }}>
          <button onClick={() => navigate("/")} className="hover:text-[#00E5FF] transition-colors cursor-pointer">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => navigate("/domains")} className="hover:text-[#00E5FF] transition-colors cursor-pointer">Domains</button>
          <ChevronRight size={12} />
          <span style={{ color: domain.color }}>{domain.title}</span>
        </div>
      </div>

      <DomainHero domain={domain} />
      <StatsBar domain={domain} />
      <AboutDomain domain={domain} />
      <ProjectsSection domain={domain} />
      <LearningPathSection domain={domain} />
      <TeamLeads domain={domain} />
      <AchievementsList domain={domain} />

      {/* Prev/Next nav */}
      <section className="py-12" style={{ background: "#050505" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {prevDomain ? (
              <motion.button
                onClick={() => navigate(`/domains/${prevDomain.slug}`)}
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${prevDomain.color}10` }}
                whileHover={{ borderColor: `${prevDomain.color}30`, x: -3 }}
              >
                <ArrowLeft size={16} style={{ color: prevDomain.color }} />
                <div className="text-left">
                  <p className="text-[#EAFBFF]/30" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 10 }}>PREVIOUS</p>
                  <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 12, color: "#EAFBFF" }}>{prevDomain.title}</p>
                </div>
              </motion.button>
            ) : <div />}
            {nextDomain ? (
              <motion.button
                onClick={() => navigate(`/domains/${nextDomain.slug}`)}
                className="flex items-center gap-3 p-4 rounded-xl cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${nextDomain.color}10` }}
                whileHover={{ borderColor: `${nextDomain.color}30`, x: 3 }}
              >
                <div className="text-right">
                  <p className="text-[#EAFBFF]/30" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 10 }}>NEXT</p>
                  <p style={{ fontFamily: "Orbitron, sans-serif", fontSize: 12, color: "#EAFBFF" }}>{nextDomain.title}</p>
                </div>
                <ArrowRight size={16} style={{ color: nextDomain.color }} />
              </motion.button>
            ) : <div />}
          </div>
        </div>
      </section>

      <DomainCTA domain={domain} />
      <Footer />
    </div>
  );
}
