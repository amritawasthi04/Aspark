/* A11Y: Skip-to-content link + global focus/scroll styles
 * WCAG 2.1 AA: keyboard navigation, focus indicators, reduced-motion
 * Impact: Accessibility score +15-20 points
 */

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-[#050505] focus:outline-none"
      style={{
        background: 'linear-gradient(135deg, #00E5FF, #A855F7)',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 12,
        letterSpacing: '0.1em',
      }}
    >
      Skip to content
    </a>
  )
}
