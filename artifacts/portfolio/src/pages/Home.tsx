import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CaseStudiesSection, ProjectsSection } from "@/components/SelectedWork";
import { WorkExperience } from "@/components/WorkExperience";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { SiteTour } from "@/components/SiteTour";
import { TourHighlightContext } from "@/contexts/TourContext";
import type { TourHighlight } from "@/contexts/TourContext";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function Footer({ isDark }: { isDark: boolean }) {
  const bg      = isDark ? "#020202" : "#FFFFFF";
  const title   = isDark ? "#F5F5F5" : "#080808";
  const sub     = isDark ? "#707070" : "#606060";
  const ctaBg   = isDark ? "#F5F5F5" : "#0A0A0A";
  const ctaFg   = isDark ? "#0A0A0A" : "#F5F5F5";
  const linkClr = isDark ? "#505050" : "#909090";
  const divider = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const fine    = isDark ? "#404040" : "#C8C8C8";

  return (
    <section
      style={{
        scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh",
        background: bg,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "180px 180px",
        opacity: isDark ? 0.05 : 0.025, mixBlendMode: "overlay" as const,
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)"
          : "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.012) 0%, transparent 70%)",
      }} />

      <div style={{
        maxWidth: 500, width: "100%",
        padding: "0 clamp(24px, 5vw, 48px)",
        textAlign: "center",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 24,
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          border: `1px solid ${divider}`,
          borderRadius: 100, padding: "6px 16px",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: isDark ? "#5EFF80" : "#1A7A32" }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.62rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: sub,
          }}>Open to Opportunities</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 800, lineHeight: 1.06,
            letterSpacing: "-0.035em",
            color: title, margin: 0,
          }}>
            Let's Collaborate
          </h2>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.92rem", lineHeight: 1.7, fontWeight: 500,
            color: sub, margin: 0,
          }}>
            Building accessible, intentional, and delightful digital experiences.
          </p>
        </div>

        <a
          href="mailto:qureshi.ux@gmail.com"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.88rem", fontWeight: 700,
            letterSpacing: "0.01em",
            padding: "14px 36px", borderRadius: 100,
            background: ctaBg, color: ctaFg,
            textDecoration: "none",
            boxShadow: isDark ? "0 6px 24px rgba(0,0,0,0.5)" : "0 6px 24px rgba(0,0,0,0.15)",
          }}
        >
          qureshi.ux@gmail.com
        </a>

        <div style={{ height: 1, width: 32, background: divider }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: linkClr, textDecoration: "none",
              padding: "6px 12px", borderRadius: 6,
            }}
          >LinkedIn</a>
          <div style={{ width: 1, height: 12, background: divider }} />
          <a href="#"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: linkClr, textDecoration: "none",
              padding: "6px 12px", borderRadius: 6,
            }}
          >Download CV</a>
        </div>

        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.58rem", letterSpacing: "0.12em",
          color: fine, textTransform: "uppercase",
        }}>
          Haseeb Qureshi · UI/UX Design Lead · {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
}

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  /* ─── Site Tour ─────────────────────────────────────────────────────── */
  const [tourActive, setTourActive]       = useState(false);
  const [tourHighlight, setTourHighlight] = useState<TourHighlight>(null);
  const startTour = useCallback(() => setTourActive(true), []);

  /* ─── Performance: zero setState on scroll ─────────────────────────── */
  const scrollRef      = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const fabRef         = useRef<HTMLAnchorElement>(null);
  const rafRef         = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;
      const max = el.scrollHeight - el.clientHeight;
      const p   = max > 0 ? el.scrollTop / max : 0;

      /* progress bar — direct DOM, no React re-render */
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${p})`;
      }

      /* FAB visibility — direct DOM opacity/pointer-events toggle */
      const showFab = el.scrollTop > el.clientHeight * 0.4;
      if (fabRef.current) {
        fabRef.current.style.opacity        = showFab ? "1" : "0";
        fabRef.current.style.transform      = showFab ? "translateY(0) scale(1)" : "translateY(10px) scale(0.88)";
        fabRef.current.style.pointerEvents  = showFab ? "auto" : "none";
      }
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);
  /* ──────────────────────────────────────────────────────────────────── */

  const trackBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const fillBg  = isDark ? "#F0F0F0" : "#0A0A0A";
  const fabBg   = isDark ? "#F0F0F0" : "#0A0A0A";
  const fabFg   = isDark ? "#0A0A0A" : "#F0F0F0";

  return (
    <>
      <Navbar />

      {/* Site Tour overlay */}
      {tourActive && (
        <SiteTour
          scrollEl={scrollRef}
          isDark={isDark}
          onClose={() => { setTourActive(false); setTourHighlight(null); }}
          onHighlight={setTourHighlight}
        />
      )}

      {/* Scroll progress bar — DOM-only updates, never re-renders */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 2, zIndex: 9999, background: trackBg,
        pointerEvents: "none",
      }}>
        <div
          ref={progressFillRef}
          style={{
            height: "100%",
            background: fillBg,
            transformOrigin: "left",
            transform: "scaleX(0)",
            willChange: "transform",
          }}
        />
      </div>

      {/* Resume FAB — starts hidden, DOM-toggled on scroll */}
      <a
        ref={fabRef}
        href="#"
        style={{
          position: "fixed", bottom: 28, right: 28,
          zIndex: 9999,
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.03em",
          padding: "10px 20px", borderRadius: 100,
          background: fabBg, color: fabFg,
          textDecoration: "none",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.65)" : "0 8px 32px rgba(0,0,0,0.2)",
          opacity: "0",
          transform: "translateY(10px) scale(0.88)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          willChange: "opacity, transform",
          pointerEvents: "none",
        }}
      >
        <Download size={13} />
        Resume
      </a>

      {/* Scroll-snap container wrapped in highlight context */}
      <TourHighlightContext.Provider value={tourHighlight}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            height: "100vh", overflowY: "scroll",
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
            willChange: "scroll-position",
          }}
        >
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <Hero onStartTour={startTour} />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <WorkExperience />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <CaseStudiesSection />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <ProjectsSection />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <Skills />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <Credentials />
          </section>
          <Footer isDark={isDark} />
        </div>
      </TourHighlightContext.Provider>
    </>
  );
}
