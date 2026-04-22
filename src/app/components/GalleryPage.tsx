import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { SEOHead } from "./SEOHead";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Gallery Data with comprehensive coverage
const galleryItems = [
  {
    id: 1,
    title: "SYNTAX ERROR 2025",
    category: "Hackathon",
    image: "https://images.unsplash.com/photo-1555432783-9aed44ab60a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBoYWNrYXRob24lMjBkYXJrfGVufDF8fHx8MTc3NjU0NTU3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#00E5FF",
  },
  {
    id: 2,
    title: "NEXUS SUMMIT",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1761223976145-a85ffe11fc57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMGNpbmVtYXRpY3xlbnwxfHx8fDE3NzY1NDU1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#A855F7",
  },
  {
    id: 3,
    title: "VALORANT SHOWDOWN",
    category: "E-Sports",
    image: "https://images.unsplash.com/photo-1767455471543-055dbc6c6700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdG91cm5hbWVudCUyMHN0YWdlfGVufDF8fHx8MTc3NjQ1ODc2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#EF4444",
  },
  {
    id: 4,
    title: "CYBERNETICS EXPO",
    category: "Hardware & Robotics",
    image: "https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMG5lb258ZW58MXx8fHwxNzc2NTQ1NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#F59E0B",
  },
  {
    id: 5,
    title: "OMNIVERSE VR",
    category: "AI & VR",
    image: "https://images.unsplash.com/photo-1612066518884-2eda70eb3100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMG5lb258ZW58MXx8fHwxNzc2NTQ1NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#10B981",
  },
  {
    id: 6,
    title: "SYSTEM OVERRIDE",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1674631631051-8a3ec6355187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwaGFja2VyJTIwc2V0dXB8ZW58MXx8fHwxNzc2NTQ1NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#EF4444",
  },
  {
    id: 7,
    title: "BATTLESTATION ZERO",
    category: "E-Sports",
    image: "https://images.unsplash.com/photo-1616093700899-dddbfc0fe7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY29tcHV0ZXIlMjBzZXR1cCUyMGdhbWluZ3xlbnwxfHx8fDE3NzY1NDY2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#3B82F6",
  },
  {
    id: 8,
    title: "DRONE WARS",
    category: "Hardware & Robotics",
    image: "https://images.unsplash.com/photo-1768571845597-38f066307f1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2glMjBuaWdodHxlbnwxfHx8fDE3NzY1NDU1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#EC4899",
  },
  {
    id: 9,
    title: "NEURAL NETWORKS",
    category: "AI & VR",
    image: "https://images.unsplash.com/photo-1770233621425-5d9ee7a0a700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYnJhaW4lMjBkaWdpdGFsfGVufDF8fHx8MTc3NjU0NjYwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#00E5FF",
  },
  {
    id: 10,
    title: "QUANTUM CIRCUITS",
    category: "Hardware & Robotics",
    image: "https://images.unsplash.com/photo-1675602488453-c3897a475af5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwYm9hcmQlMjBtYWNybyUyMGJsdWV8ZW58MXx8fHwxNzc2NTQ2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#3B82F6",
  },
  {
    id: 11,
    title: "GAME DEV MARATHON",
    category: "Hackathon",
    image: "https://images.unsplash.com/photo-1682617367184-ffc870089cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcGVyJTIwbXVsdGlwbGUlMjBzY3JlZW5zfGVufDF8fHx8MTc3NjU0NjYwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#A855F7",
  },
  {
    id: 12,
    title: "MIDNIGHT CODING",
    category: "Hackathon",
    image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBoYWNrZXIlMjBjb2RpbmclMjBkYXJrfGVufDF8fHx8MTc3NjU0NjYwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#EF4444",
  },
  {
    id: 13,
    title: "CHAMPIONSHIP FINALS",
    category: "E-Sports",
    image: "https://images.unsplash.com/photo-1759701547353-7ecd687a72c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwdGVhbSUyMHdpbm5pbmd8ZW58MXx8fHwxNzc2NTQ2NjA3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#F59E0B",
  },
  {
    id: 14,
    title: "AUGMENTED HORIZONS",
    category: "AI & VR",
    image: "https://images.unsplash.com/photo-1758598497889-05bf628874a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwZ2xhc3Nlc3xlbnwxfHx8fDE3NzY1NDY2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#10B981",
  },
  {
    id: 15,
    title: "DATACENTER ALPHA",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1749581134865-6b8255950548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlciUyMGJsdWV8ZW58MXx8fHwxNzc2NTQ2NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#00E5FF",
  },
  {
    id: 16,
    title: "MAKERSPACE 3D",
    category: "Hardware & Robotics",
    image: "https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50aW5nJTIwdGVjaHxlbnwxfHx8fDE3NzY1NDY2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#EC4899",
  },
];

const categories = ["All", "Hackathon", "E-Sports", "Hardware & Robotics", "AI & VR", "Infrastructure"];

export function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance smooth scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 15, restDelta: 0.001 });

  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtered items for the grid view
  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "ArrowRight") handleNext(e as any);
        if (e.key === "ArrowLeft") handlePrev(e as any);
      };
      
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = galleryItems.findIndex(i => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedImage(galleryItems[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = galleryItems.findIndex(i => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedImage(galleryItems[prevIndex]);
  };

  return (
    <>
    <SEOHead title="Gallery" description="Visual showcase of ASPARK events, workshops, hackathons, and community moments." path="/gallery" />
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#00E5FF]/30">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background ambient glow */}
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00E5FF 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 -bottom-64 -right-32"
          style={{
            background: "radial-gradient(circle, #A855F7 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 
              className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-none"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              VISUAL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#A855F7]">
                ARCHIVE
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-xl md:text-2xl text-[#EAFBFF]/60 max-w-2xl mx-auto tracking-widest uppercase"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Immersive Memories of Every Event
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Initiate Protocol</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA0MEw0MCA0ME00MCAwTDQwIDQwIiBzdHJva2U9IiNmZmZmZmYxMSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none" />
      </section>

      {/* 3D Smooth Scroll Track Section - Enhanced for 16 items */}
      <section ref={containerRef} className="relative h-[800vh] bg-[#050505]" style={{ position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          
          <div className="absolute top-20 left-10 md:left-20 z-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-white/10 uppercase" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Gallery
            </h2>
          </div>

          {/* Perspective Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1500px" }}
          >
            <motion.div 
              className="relative w-full max-w-7xl h-[60vh] md:h-[70vh] flex items-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {galleryItems.map((item, index) => {
                const itemSpread = 60; // vw spread between items
                const totalSpread = (galleryItems.length - 1) * itemSpread;
                
                // x position logic: center point of track is 50%
                const x = useTransform(smoothProgress,
                  [0, 1],
                  [`calc(-50% + ${index * itemSpread}vw)`, `calc(-50% + ${(index * itemSpread) - totalSpread}vw)`]
                );

                const itemOffset = index / Math.max(1, galleryItems.length - 1);

                const rotateY = useTransform(smoothProgress, 
                  [itemOffset - 0.1, itemOffset, itemOffset + 0.1], 
                  [45, 0, -45]
                );
                
                const z = useTransform(smoothProgress,
                  [itemOffset - 0.1, itemOffset, itemOffset + 0.1],
                  [-800, 100, -800]
                );

                const opacity = useTransform(smoothProgress,
                  [itemOffset - 0.15, itemOffset, itemOffset + 0.15],
                  [0, 1, 0]
                );

                return (
                  <motion.div
                    key={item.id}
                    className="absolute top-1/2 left-1/2 w-[80vw] md:w-[60vw] lg:w-[40vw] flex flex-col justify-center cursor-pointer group"
                    style={{
                      x,
                      y: "-50%",
                      rotateY,
                      z,
                      opacity,
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity"
                    }}
                    onClick={() => setSelectedImage(item)}
                  >
                    {/* Floating Meta Details behind the image */}
                    <motion.div 
                      className="absolute -top-10 -left-10 text-[6rem] md:text-[8rem] font-black opacity-5 pointer-events-none"
                      style={{ transform: "translateZ(-100px)", fontFamily: "Orbitron, sans-serif", color: item.color }}
                    >
                      {item.id < 10 ? `0${item.id}` : item.id}
                    </motion.div>

                    {/* Image Card */}
                    <motion.div 
                      layoutId={`gallery-card-${item.id}`}
                      className="relative w-full aspect-[4/3] md:aspect-video rounded-xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/10"
                      style={{
                        boxShadow: `0 30px 60px -15px rgba(0,0,0,0.8), 0 0 40px -10px ${item.color}40`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                      
                      <ImageWithFallback 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      />

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20" style={{ transform: "translateZ(50px)" }}>
                        <div 
                          className="inline-block px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 rounded border border-white/20 backdrop-blur-md"
                          style={{ color: item.color, background: "rgba(0,0,0,0.4)" }}
                        >
                          {item.category}
                        </div>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider uppercase leading-tight" style={{ fontFamily: "Orbitron, sans-serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                          {item.title}
                        </h3>
                      </div>

                      {/* Cyberpunk UI Accents */}
                      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 opacity-50 z-20" style={{ borderColor: item.color }} />
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 opacity-50 z-20" style={{ borderColor: item.color }} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Showcase with Filters */}
      <section className="py-32 px-4 md:px-8 max-w-[1600px] mx-auto relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider uppercase mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Complete <span className="text-[#00E5FF]">Showcase</span>
          </h2>
          <p className="text-white/50 uppercase tracking-widest text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            Explore operations by classification
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-colors group overflow-hidden"
              style={{
                color: activeCategory === cat ? "#050505" : "rgba(255,255,255,0.6)",
              }}
            >
              {/* Active Background Glow */}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 bg-[#00E5FF] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {/* Inactive Hover Effect */}
              {activeCategory !== cat && (
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full border border-white/10" />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Morphing Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-black/50 border border-white/5"
                onClick={() => setSelectedImage(item)}
              >
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-70 group-hover:opacity-100"
                  style={{ filter: "grayscale(30%) contrast(120%)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <motion.span 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" 
                    style={{ color: item.color }}
                  >
                    {item.category}
                  </motion.span>
                  <motion.h4 
                    className="text-xl md:text-2xl font-bold text-white uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" 
                    style={{ fontFamily: "Rajdhani, sans-serif" }}
                  >
                    {item.title}
                  </motion.h4>
                </div>
                {/* Decorative corner lines */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 m-4" style={{ borderColor: item.color }} />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l opacity-0 group-hover:opacity-100 transition-opacity duration-500 m-4" style={{ borderColor: item.color }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State Fallback */}
        {filteredItems.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-white/30 tracking-widest uppercase">No records found for this classification.</p>
          </div>
        )}
      </section>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(30px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12 bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
                <span className="text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase font-mono">
                  SECURE_VIEW // {selectedImage.id.toString().padStart(4, '0')}
                </span>
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/10"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Main Modal Image */}
            <motion.div
              layoutId={`gallery-card-${selectedImage.id}`}
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-7xl h-[70vh] md:h-[85vh] bg-[#050505] rounded-xl overflow-hidden border border-white/10 group"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 100px -20px ${selectedImage.color}40, 0 0 1px 1px ${selectedImage.color}20`
              }}
            >
              <ImageWithFallback
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain md:object-cover"
              />
              
              {/* Cinematic details overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-[#020202] via-[#020202]/90 to-transparent">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-4xl"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span 
                      className="px-3 py-1 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded border backdrop-blur-md"
                      style={{ color: selectedImage.color, borderColor: `${selectedImage.color}40`, backgroundColor: `${selectedImage.color}10` }}
                    >
                      {selectedImage.category}
                    </span>
                    <span className="text-white/30 text-xs font-mono tracking-widest">
                      FILE_REF: {Math.random().toString(36).substring(2, 8).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white leading-none" style={{ fontFamily: "Orbitron, sans-serif" }}>
                    {selectedImage.title}
                  </h2>
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-black/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <ChevronRight size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
    </>
  );
}