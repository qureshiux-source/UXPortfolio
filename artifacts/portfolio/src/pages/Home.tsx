import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CaseStudiesSection, ProjectsSection } from "@/components/SelectedWork";
import { WorkExperience } from "@/components/WorkExperience";
import { Skills, ToolsSection } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { SiteTour } from "@/components/SiteTour";
import { ContactModal } from "@/components/ContactModal";
import { TourHighlightContext } from "@/contexts/TourContext";
import type { TourHighlight } from "@/contexts/TourContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const LINKEDIN_URL = "https://www.linkedin.com/in/haseeb-qureshi-5b8aa1351";

function LinkedInCard({ isDark }: { isDark: boolean }) {
  const [hov, setHov] = useState(false);
  const cardBg  = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)";
  const cardBdr  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const cardHov  = isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.05)";
  const nameClr  = isDark ? "#E8E8E8" : "#0A0A0A";
  const metaClr  = isDark ? "#505050" : "#787878";
  const liBlue   = "#0A66C2";

  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px", borderRadius: 14,
        background: hov ? cardHov : cardBg,
        border: `1px solid ${hov ? (isDark ? "rgba(10,102,194,0.3)" : "rgba(10,102,194,0.25)") : cardBdr}`,
        textDecoration: "none",
        transition: "background 0.25s, border-color 0.25s",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* LinkedIn blue top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: liBlue, opacity: hov ? 0.8 : 0.35,
        transition: "opacity 0.25s",
      }} />

      {/* Avatar */}
      <div style={{
        width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
        background: `linear-gradient(135deg, ${liBlue}, #0D76D8)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#FFFFFF",
        fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", fontWeight: 700,
      }}>
        HQ
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem", fontWeight: 700, color: nameClr, lineHeight: 1.2 }}>
          Haseeb Qureshi
        </div>
        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.64rem", fontWeight: 500, color: metaClr, marginTop: 3, lineHeight: 1.4 }}>
          UI/UX Design Lead &amp; Accessibility Specialist
        </div>
        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.56rem", fontWeight: 600, color: liBlue, marginTop: 4, letterSpacing: "0.02em" }}>
          linkedin.com/in/haseeb-qureshi-5b8aa1351
        </div>
      </div>

      {/* LinkedIn icon + arrow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={liBlue} style={{ opacity: hov ? 1 : 0.65, transition: "opacity 0.25s" }}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <ArrowUpRight size={11} style={{ color: metaClr, opacity: hov ? 1 : 0, transition: "opacity 0.2s" }} />
      </div>
    </a>
  );
}

function Footer({ isDark, onOpenContact, isMobile }: { isDark: boolean; onOpenContact: () => void; isMobile: boolean }) {
  const bg      = isDark ? "#020202" : "#F5F4F2";
  const green   = isDark ? "#5EFF80" : "#1A7A32";
  const greenBg = isDark ? "rgba(94,255,128,0.06)"  : "rgba(26,122,50,0.06)";
  const greenBdr= isDark ? "rgba(94,255,128,0.18)"  : "rgba(26,122,50,0.2)";
  const title   = isDark ? "#F0F0F0" : "#080808";
  const muted   = isDark ? "#7A7A7A" : "#525252";
  const dim     = isDark ? "#3A3A3A" : "#AAAAAA";
  const divider = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)";
  const linkRst = isDark ? "#3C3C3C" : "#9A9A9A";
  const linkHov = isDark ? "#909090" : "#282828";

  const footerLink = (href: string, label: string, icon?: React.ReactNode, external = true) => (
    <a
      key={label}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: linkRst, textDecoration: "none",
        display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = linkHov; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = linkRst; }}
    >
      {icon}{label}
    </a>
  );

  return (
    <section style={{
      scrollSnapAlign: "start", scrollSnapStop: "always",
      minHeight: "100vh",
      background: bg, display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative",
      overflow: isMobile ? "visible" : "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.09,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 90% 70% at 20% 50%, rgba(255,255,255,0.012) 0%, transparent 65%)"
          : "radial-gradient(ellipse 90% 70% at 20% 50%, rgba(0,0,0,0.008) 0%, transparent 65%)",
      }} />

      <div style={{
        maxWidth: 680, width: "100%", margin: "0 auto",
        padding: "0 clamp(28px, 6vw, 64px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(24px, 3.6vh, 36px)",
        position: "relative", zIndex: 1,
      }}>

        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
          background: greenBg, border: `1px solid ${greenBdr}`,
          borderRadius: 100, padding: "5px 14px",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: green, flexShrink: 0,
            boxShadow: `0 0 6px ${isDark ? "rgba(94,255,128,0.6)" : "rgba(26,122,50,0.5)"}`,
          }} />
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.56rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: green }}>
            Available for new work
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: isMobile ? "clamp(2rem, 9vw, 3rem)" : "clamp(2.4rem, 5.8vw, 4.2rem)",
            fontWeight: 800, lineHeight: 1.04,
            letterSpacing: "-0.04em", color: title, margin: 0,
          }}>
            Let's build<br />
            something{" "}
            <span style={{ color: green }}>intentional.</span>
          </h2>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.82rem, 1.15vw, 0.92rem)",
            lineHeight: 1.72, fontWeight: 500, color: muted, margin: 0, maxWidth: 460,
          }}>
            UI/UX Design Lead based in Ontario, Canada — open for full-time roles,
            freelance projects, and design collaborations worldwide.
          </p>
        </div>

        {/* Contact row */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Primary CTAs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={onOpenContact}
              style={{
                all: "unset", cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.86rem", fontWeight: 700, letterSpacing: "0.01em",
                padding: "13px 28px", borderRadius: 100,
                background: isDark ? "#ECECEC" : "#0A0A0A",
                color: isDark ? "#0A0A0A" : "#F0F0F0",
                display: "inline-flex", alignItems: "center", gap: 8,
                boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.12)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.84"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Get in Touch
              <ArrowUpRight size={14} />
            </button>

            <a
              href="/resume.pdf"
              download="Haseeb_Qureshi_Resume.pdf"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.86rem", fontWeight: 700, letterSpacing: "0.01em",
                padding: "13px 28px", borderRadius: 100,
                background: "transparent",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                color: isDark ? "#B0B0B0" : "#2A2A2A",
                display: "inline-flex", alignItems: "center", gap: 8,
                textDecoration: "none",
                transition: "border-color 0.22s, color 0.22s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"; el.style.color = isDark ? "#E0E0E0" : "#080808"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"; el.style.color = isDark ? "#B0B0B0" : "#2A2A2A"; }}
            >
              <Download size={14} /> Resume
            </a>
          </div>

          {/* LinkedIn preview card — hidden on mobile */}
          {!isMobile && <LinkedInCard isDark={isDark} />}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "clamp(14px, 2vh, 20px)",
          borderTop: `1px solid ${divider}`,
          flexWrap: "wrap", gap: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {footerLink(
              LINKEDIN_URL, "LinkedIn",
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: "block" }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>,
            )}
            <span style={{ width: 1, height: 10, background: divider }} />
            <a
              href="/resume.pdf"
              download="Haseeb_Qureshi_Resume.pdf"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: linkRst, textDecoration: "none", display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = linkHov; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = linkRst; }}
            >
              <Download size={11} /> Download CV
            </a>
          </div>

          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.54rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: dim }}>
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
  const isMobile = useBreakpoint(640);

  /* On mobile, sections that can overflow get minHeight; fixed sections keep 100vh */
  const fixedSection  = isMobile ? { minHeight: "100vh" } : { height: "100vh" };

  const [tourActive, setTourActive]       = useState(false);
  const [tourHighlight, setTourHighlight] = useState<TourHighlight>(null);
  const [contactOpen, setContactOpen]     = useState(false);
  const startTour = useCallback(() => setTourActive(true), []);

  const scrollRef       = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const fabRef          = useRef<HTMLButtonElement>(null);
  const rafRef          = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;
      const max = el.scrollHeight - el.clientHeight;
      const p   = max > 0 ? el.scrollTop / max : 0;
      if (progressFillRef.current) progressFillRef.current.style.transform = `scaleX(${p})`;
      const showFab = el.scrollTop > el.clientHeight * 0.4;
      if (fabRef.current) {
        fabRef.current.style.opacity       = showFab ? "1" : "0";
        fabRef.current.style.transform     = showFab ? "translateY(0) scale(1)" : "translateY(10px) scale(0.88)";
        fabRef.current.style.pointerEvents = showFab ? "auto" : "none";
      }
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const trackBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const fillBg  = isDark ? "#F0F0F0" : "#0A0A0A";
  const fabBg   = isDark ? "#F0F0F0" : "#0A0A0A";
  const fabFg   = isDark ? "#0A0A0A" : "#F0F0F0";

  return (
    <>
      <Navbar />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {tourActive && (
        <SiteTour
          scrollEl={scrollRef}
          isDark={isDark}
          onClose={() => { setTourActive(false); setTourHighlight(null); }}
          onHighlight={setTourHighlight}
        />
      )}

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9999, background: trackBg, pointerEvents: "none" }}>
        <div ref={progressFillRef} style={{ height: "100%", background: fillBg, transformOrigin: "left", transform: "scaleX(0)", willChange: "transform" }} />
      </div>

      {/* Contact FAB */}
      <button
        ref={fabRef}
        onClick={() => setContactOpen(true)}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 9999,
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.03em", padding: "10px 20px", borderRadius: 100,
          background: fabBg, color: fabFg, border: "none", cursor: "pointer",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.65)" : "0 8px 32px rgba(0,0,0,0.2)",
          opacity: "0", transform: "translateY(10px) scale(0.88)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          willChange: "opacity, transform", pointerEvents: "none",
        }}
      >
        <Download size={13} />
        Contact
      </button>

      <TourHighlightContext.Provider value={tourHighlight}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            height: "100vh", overflowY: "scroll",
            scrollSnapType: "y mandatory", scrollBehavior: "smooth",
            willChange: "scroll-position",
          }}
        >
          <section id="tour-0" style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
            <Hero onStartTour={startTour} />
          </section>
          <section id="tour-1" style={{ scrollSnapAlign: "start", scrollSnapStop: "always", ...fixedSection }}>
            <WorkExperience />
          </section>
          <section id="tour-2" style={{ scrollSnapAlign: "start", scrollSnapStop: "always", ...fixedSection }}>
            <CaseStudiesSection />
          </section>
          <section id="tour-3" style={{ scrollSnapAlign: "start" }}>
            <ProjectsSection />
          </section>
          <section id="tour-4" style={{ scrollSnapAlign: "start", scrollSnapStop: "always", ...fixedSection }}>
            <Skills />
          </section>
          <section id="tour-5" style={{ scrollSnapAlign: "start", scrollSnapStop: "always", ...fixedSection }}>
            <ToolsSection />
          </section>
          <section id="tour-6" style={{ scrollSnapAlign: "start" }}>
            <Credentials />
          </section>
          <Footer isDark={isDark} onOpenContact={() => setContactOpen(true)} isMobile={isMobile} />
        </div>
      </TourHighlightContext.Provider>
    </>
  );
}
