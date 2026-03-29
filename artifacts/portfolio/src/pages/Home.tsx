import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { Download, ArrowUpRight, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CaseStudiesSection, ProjectsSection } from "@/components/SelectedWork";
import { WorkExperience } from "@/components/WorkExperience";
import { Skills, ToolsSection } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { SiteTour } from "@/components/SiteTour";
import { TourHighlightContext } from "@/contexts/TourContext";
import type { TourHighlight } from "@/contexts/TourContext";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function Footer({ isDark }: { isDark: boolean }) {
  const [hovEmail, setHovEmail] = useState(false);

  const bg      = isDark ? "#020202" : "#FAFAFA";
  const green   = isDark ? "#5EFF80" : "#1A7A32";
  const greenBg = isDark ? "rgba(94,255,128,0.06)"  : "rgba(26,122,50,0.05)";
  const greenBdr= isDark ? "rgba(94,255,128,0.18)"  : "rgba(26,122,50,0.18)";
  const title   = isDark ? "#F0F0F0" : "#080808";
  const muted   = isDark ? "#7A7A7A" : "#5A5A5A";
  const dim     = isDark ? "#3A3A3A" : "#C4C4C4";
  const divider = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const ctaBg   = isDark ? "#ECECEC" : "#0A0A0A";
  const ctaFg   = isDark ? "#0A0A0A" : "#F0F0F0";
  const ctaHBg  = isDark ? "#FFFFFF" : "#222222";
  const linkRst = isDark ? "#3C3C3C" : "#B8B8B8";
  const linkHov = isDark ? "#909090" : "#404040";

  const footerLink = (
    href: string,
    label: string,
    icon?: React.ReactNode,
    external = true,
  ) => (
    <a
      key={label}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: "0.62rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: linkRst, textDecoration: "none",
        display: "flex", alignItems: "center", gap: 5,
        transition: "color 0.2s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = linkHov; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = linkRst; }}
    >
      {icon}{label}
    </a>
  );

  return (
    <section style={{
      scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh",
      background: bg,
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.09,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />
      {/* Subtle radial vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 90% 70% at 20% 50%, rgba(255,255,255,0.012) 0%, transparent 65%)"
          : "radial-gradient(ellipse 90% 70% at 20% 50%, rgba(0,0,0,0.008) 0%, transparent 65%)",
      }} />

      <div style={{
        maxWidth: 680, width: "100%",
        margin: "0 auto",
        padding: "0 clamp(28px, 6vw, 64px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(28px, 4vh, 40px)",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Status pill ── */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          alignSelf: "flex-start",
          background: greenBg,
          border: `1px solid ${greenBdr}`,
          borderRadius: 100, padding: "5px 14px",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: green, flexShrink: 0,
            boxShadow: `0 0 6px ${isDark ? "rgba(94,255,128,0.6)" : "rgba(26,122,50,0.5)"}`,
          }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.56rem", fontWeight: 800,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: green,
          }}>Available for new work</span>
        </div>

        {/* ── Headline ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2.4rem, 5.8vw, 4.2rem)",
            fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: title, margin: 0,
          }}>
            Let's build<br />
            something{" "}
            <span style={{ color: green }}>intentional.</span>
          </h2>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.82rem, 1.15vw, 0.92rem)",
            lineHeight: 1.72, fontWeight: 500,
            color: muted, margin: 0,
            maxWidth: 460,
          }}>
            UI/UX Design Lead based in Ontario, Canada — open for full-time roles,
            freelance projects, and design collaborations worldwide.
          </p>
        </div>

        {/* ── Contact row: email CTA + phone ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <a
            href="mailto:qureshi.ux@gmail.com"
            onMouseEnter={() => setHovEmail(true)}
            onMouseLeave={() => setHovEmail(false)}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.86rem", fontWeight: 700,
              letterSpacing: "0.01em",
              padding: "13px 28px",
              borderRadius: 100,
              background: hovEmail ? ctaHBg : ctaBg,
              color: ctaFg,
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8,
              transition: "background 0.25s ease",
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.5)"
                : "0 4px 20px rgba(0,0,0,0.12)",
            }}
          >
            qureshi.ux@gmail.com
            <ArrowUpRight size={14} />
          </a>

          <a
            href="tel:+16470000000"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.75rem", fontWeight: 700,
              color: muted, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 6,
              letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = title; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = muted; }}
          >
            <Phone size={12} />
            +1 (647) 000-0000
          </a>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "clamp(16px, 2.5vh, 24px)",
          borderTop: `1px solid ${divider}`,
          flexWrap: "wrap", gap: 14,
        }}>
          {/* Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* LinkedIn — filled rounded-square icon */}
            {footerLink(
              "https://linkedin.com/in/haseeb-qureshi-design",
              "LinkedIn",
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0, display: "block" }}
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>,
            )}
            <span style={{ width: 1, height: 10, background: divider }} />
            {footerLink("#", "Download CV", <Download size={11} />, false)}
          </div>

          {/* Copyright */}
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.54rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: dim,
          }}>
            Haseeb Qureshi · {new Date().getFullYear()}
          </span>
        </div>
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
          <section id="process" style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <WorkExperience />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <CaseStudiesSection />
          </section>
          <section id="projects" style={{ scrollSnapAlign: "start" }}>
            <ProjectsSection />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <Skills />
          </section>
          <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <ToolsSection />
          </section>
          <section style={{ scrollSnapAlign: "start" }}>
            <Credentials />
          </section>
          <Footer isDark={isDark} />
        </div>
      </TourHighlightContext.Provider>
    </>
  );
}
