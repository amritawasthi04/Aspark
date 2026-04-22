import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu";

const domainItems = [
  { label: "Tech & Development", slug: "tech-development" },
  { label: "AI/ML", slug: "ai-ml" },
  { label: "Design & Media", slug: "design-media" },
  { label: "Management", slug: "management" },
  { label: "Research & Innovation", slug: "research-innovation" },
];
const eventItems = ["Workshops", "Hackathons", "Competitions", "Seminars"];
const navItems = ["Home", "About", "Domains", "Events", "Gallery", "Team", "Achievements", "Join Us", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item based on current route
  const getActiveItem = () => {
    const routeMap: Record<string, string> = {
      domains: "/domains", events: "/events", gallery: "/gallery",
      about: "/about", achievements: "/achievements",
      team: "/team", "join us": "/join", contact: "/contact",
    };
    if (location.pathname === "/") return "Home";
    return navItems.find((item) => {
      const mappedRoute = routeMap[item.toLowerCase()];
      return mappedRoute && location.pathname.startsWith(mappedRoute);
    });
  };
  const activeItem = getActiveItem();
  const indicatorItem = hoveredItem || activeItem;

  useEffect(() => {
    /* PERF: Passive scroll listener + rAF throttle to prevent layout thrashing */
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    
    /* RESPONSIVE: Route map — cleaner than if-chain */
    const routeMap: Record<string, string> = {
      domains: "/domains", events: "/events", gallery: "/gallery",
      about: "/about", pillars: "/pillars", achievements: "/achievements",
      team: "/team", "join us": "/join", contact: "/contact",
    };
    const key = id.toLowerCase();
    if (routeMap[key]) { navigate(routeMap[key]); return; }

    // Check if we're not on the homepage
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id.toLowerCase().replace(/\s/g, "-"));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    
    const el = document.getElementById(id.toLowerCase().replace(/\s/g, "-"));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinkStyle = { fontFamily: "Rajdhani, sans-serif", fontSize: 15, letterSpacing: "0.05em" };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5, 5, 5, 0.85)" : "rgba(5, 5, 5, 0.3)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(0, 229, 255, 0.1)" : "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 cursor-pointer relative group">
          <motion.span
            className="tracking-[0.2em] relative z-10 transition-all duration-300"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: 20,
              background: "linear-gradient(to right, #00E5FF, #A855F7, #00E5FF)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{ 
              backgroundPosition: ["0% center", "200% center"],
              filter: [
                "drop-shadow(0 0 8px rgba(0,229,255,0.8)) drop-shadow(0 0 15px rgba(0,229,255,0.4))", 
                "drop-shadow(0 0 12px rgba(168,85,247,0.9)) drop-shadow(0 0 20px rgba(168,85,247,0.5))", 
                "drop-shadow(0 0 8px rgba(0,229,255,0.8)) drop-shadow(0 0 15px rgba(0,229,255,0.4))"
              ]
            }}
            transition={{
              backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
              filter: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.05, 
              letterSpacing: "0.3em",
              filter: "drop-shadow(0 0 12px rgba(0,229,255,1)) drop-shadow(0 0 25px rgba(168,85,247,0.8))"
            }}
          >
            ASPARK
          </motion.span>
          {/* Techy Glitch/Glow Underlay on Hover */}
          <span className="absolute -inset-2 bg-[#00E5FF]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
        </button>

        {/* Desktop Menu using shadcn NavigationMenu */}
        <div className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredItem(null)}>
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => {
                const hasDropdown = item === "Domains" || item === "Events";
                const isHovered = hoveredItem === item;
                const showIndicator = indicatorItem === item;
                
                return (
                  <NavigationMenuItem 
                    key={item} 
                    className="relative px-1"
                    onMouseEnter={() => setHoveredItem(item)}
                  >
                    {hasDropdown ? (
                      <>
                        <NavigationMenuTrigger
                          className={`bg-transparent border-none shadow-none cursor-pointer h-auto py-2 px-3 transition-colors duration-300 outline-none hover:bg-transparent focus:bg-transparent ${showIndicator ? "text-white font-bold" : "text-[#EAFBFF]/70 font-normal"}`}
                          style={navLinkStyle}
                          onClick={() => {
                            if (item === "Domains") navigate("/domains");
                            if (item === "Events") navigate("/events");
                          }}
                        >
                          {item}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent 
                          className="min-w-[200px] border border-[rgba(0,229,255,0.15)] rounded-lg overflow-hidden shadow-[0_4px_30px_rgba(0,229,255,0.1)] p-0 m-0"
                          style={{
                            background: "rgba(10, 15, 28, 0.95)",
                            backdropFilter: "blur(20px)",
                          }}
                        >
                          <ul className="flex flex-col w-full p-0">
                            {item === "Domains"
                              ? domainItems.map((sub) => (
                                  <li key={sub.slug}>
                                    <NavigationMenuLink
                                      asChild
                                    >
                                      <button
                                        onClick={() => navigate(`/domains/${sub.slug}`)}
                                        className="block w-full text-left px-4 py-3 text-[#EAFBFF] opacity-70 hover:opacity-100 hover:text-[#00E5FF] hover:bg-white/5 transition-all duration-300 cursor-pointer outline-none border-b border-[rgba(255,255,255,0.05)] last:border-none"
                                        style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}
                                      >
                                        {sub.label}
                                      </button>
                                    </NavigationMenuLink>
                                  </li>
                                ))
                              : eventItems.map((sub) => (
                                  <li key={sub}>
                                    <NavigationMenuLink
                                      asChild
                                    >
                                      <button
                                        onClick={() => navigate(`/events/${sub.toLowerCase().replace(/\s+/g, '-')}`)}
                                        className="block w-full text-left px-4 py-3 text-[#EAFBFF] opacity-70 hover:opacity-100 hover:text-[#00E5FF] hover:bg-white/5 transition-all duration-300 cursor-pointer outline-none border-b border-[rgba(255,255,255,0.05)] last:border-none"
                                        style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}
                                      >
                                        {sub}
                                      </button>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <button
                          onClick={() => scrollTo(item)}
                          className={`px-3 py-2 transition-colors duration-300 relative cursor-pointer bg-transparent focus:outline-none hover:bg-transparent ${showIndicator ? "text-white font-bold" : "text-[#EAFBFF]/70 font-normal"}`}
                          style={navLinkStyle}
                        >
                          {item}
                        </button>
                      </NavigationMenuLink>
                    )}
                    
                    {/* Electrifying Hover Underline Indicator */}
                    {showIndicator && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-[-6px] left-3 right-3 h-[2px] bg-[#00E5FF] shadow-[0_0_15px_3px_rgba(0,229,255,0.8),0_0_5px_1px_rgba(168,85,247,0.8)] rounded-full"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ 
                          opacity: [0.8, 1, 0.6, 1, 0.9, 1], 
                          scaleX: [0.8, 1.1, 0.9, 1.05, 1],
                          boxShadow: [
                            "0 0 10px 2px rgba(0,229,255,0.6), 0 0 4px 1px rgba(168,85,247,0.6)",
                            "0 0 20px 4px rgba(0,229,255,1), 0 0 8px 2px rgba(168,85,247,1)",
                            "0 0 12px 2px rgba(0,229,255,0.7), 0 0 5px 1px rgba(168,85,247,0.7)",
                            "0 0 18px 4px rgba(0,229,255,0.9), 0 0 7px 2px rgba(168,85,247,0.9)",
                            "0 0 15px 3px rgba(0,229,255,0.8), 0 0 5px 1px rgba(168,85,247,0.8)"
                          ]
                        }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          opacity: { repeat: Infinity, duration: 0.15, repeatType: "mirror" },
                          scaleX: { repeat: Infinity, duration: 0.2, repeatType: "mirror" },
                          boxShadow: { repeat: Infinity, duration: 0.15, repeatType: "mirror" },
                          layout: { type: "spring", stiffness: 350, damping: 25 }
                        }}
                      />
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile toggle — A11Y: 44px min touch target, aria-expanded */}
        <button
          className="lg:hidden text-[#EAFBFF] cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "rgba(5, 5, 5, 0.95)", backdropFilter: "blur(20px)" }}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="block w-full text-left px-6 py-3 text-[#EAFBFF]/70 hover:text-[#00E5FF] transition-colors cursor-pointer min-h-[44px]"
                style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 16, borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
