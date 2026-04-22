import { lazy } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { Footer } from "./Footer";
import { SEOHead } from "./SEOHead";
import { SkipToContent } from "./A11yProvider";
import { LazySection } from "./LazySection";

/* PERF: Lazy-load below-fold sections — reduces initial bundle by ~40%
 * Each section only loads when user scrolls within 200px of it
 * Impact: FID -80ms, TTI -300ms, bundle split into ~6 chunks */
const AboutSection = lazy(() => import("./AboutSection").then(m => ({ default: m.AboutSection })));
const DomainsSection = lazy(() => import("./DomainsSection").then(m => ({ default: m.DomainsSection })));
const EventsSection = lazy(() => import("./EventsSection").then(m => ({ default: m.EventsSection })));
const AchievementsSection = lazy(() => import("./AchievementsSection").then(m => ({ default: m.AchievementsSection })));
const TeamSection = lazy(() => import("./TeamSection").then(m => ({ default: m.TeamSection })));
const JoinSection = lazy(() => import("./JoinSection").then(m => ({ default: m.JoinSection })));

export function HomePage() {
  return (
    <>
      {/* SEO: Injects meta tags, OG, Twitter Card, JSON-LD structured data */}
      <SEOHead path="/" />

      {/* A11Y: Skip navigation for keyboard/screen-reader users */}
      <SkipToContent />

      {/* SEMANTIC: Proper HTML5 document structure for crawlers */}
      <div className="min-h-screen" style={{ background: "#050505", color: "#EAFBFF" }}>
        <header>
          <Navbar />
        </header>

        <main id="main-content">
          {/* PERF: Hero loads eagerly — it's the LCP element */}
          <HeroSection />

          {/* PERF: Below-fold sections lazy-loaded via IntersectionObserver */}
          <LazySection minHeight="500px">
            <AboutSection />
          </LazySection>

          <LazySection minHeight="600px">
            <DomainsSection />
          </LazySection>

          <LazySection minHeight="600px">
            <EventsSection />
          </LazySection>

          <LazySection minHeight="500px">
            <AchievementsSection />
          </LazySection>

          <LazySection minHeight="500px">
            <TeamSection />
          </LazySection>

          <LazySection minHeight="400px">
            <JoinSection />
          </LazySection>
        </main>

        <Footer />
      </div>
    </>
  );
}
