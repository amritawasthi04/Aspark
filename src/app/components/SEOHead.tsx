import { useEffect } from "react";

/*
 * SEOHead — Sets document <title>, meta description, Open Graph, Twitter Card,
 * and injects JSON-LD structured data into <head>.
 * Impact: SEO ★★★★★ | Performance ★☆☆☆☆
 */

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

const DEFAULTS = {
  siteName: "ASPARK — Innovation & Technology Society",
  description:
    "ASPARK is a premier innovation and technology society empowering the next generation of tech leaders through hackathons, workshops, AI/ML, design, and collaborative research.",
  baseUrl: "https://aspark.tech",
  image: "https://aspark.tech/og-image.png",
};

export function SEOHead({
  title,
  description = DEFAULTS.description,
  path = "/",
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${DEFAULTS.siteName}`
    : DEFAULTS.siteName;
  const canonicalUrl = `${DEFAULTS.baseUrl}${path}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    setMeta("name", "theme-color", "#050505");
    setMeta("name", "robots", "index, follow");

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", DEFAULTS.siteName);
    setMeta("property", "og:image", DEFAULTS.image);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", DEFAULTS.image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // JSON-LD Structured Data (Organization schema)
    const ldId = "aspark-jsonld";
    let ldScript = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = ldId;
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ASPARK",
      url: DEFAULTS.baseUrl,
      logo: DEFAULTS.image,
      description: DEFAULTS.description,
      sameAs: [
        "https://github.com/aspark-society",
        "https://linkedin.com/company/aspark-society",
        "https://twitter.com/aspark_tech",
        "https://instagram.com/aspark_society",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "aspark@university.edu",
        contactType: "General Inquiry",
      },
    });
  }, [fullTitle, description, canonicalUrl]);

  return null; // Renders nothing — side-effect only
}
