import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CaseStudiesSection, ProjectsSection } from "@/components/SelectedWork";
import { WorkExperience } from "@/components/WorkExperience";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function Footer({ isDark }: { isDark: boolean }) {
  const bg        = isDark
    ? "linear-gradient(145deg, #0A0A0A 0%, #0E0E0E 50%, #080808 100%)"
    : "linear-gradient(145deg, #EBEBEB 0%, #F2F2F2 55%, #E8E8E8 100%)";
  const title     = isDark ? "#FAFAFA" : "#0A0A0A";
  const sub       = isDark ? "#9A9A9A" : "#4D4D4D";
  const ctaBg     = isDark ? "#FAFAFA" : "#0A0A0A";
  const ctaColor  = isDark ? "#0A0A0A" : "#FAFAFA";
  const linkClr   = isDark ? "#848484" : "#595959";
  const linkHovBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const divider   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const fine      = isDark ? "#6E6E6E" : "#737373";

  return (
    <section
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        height: "100vh",
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.5s",
      }}
    >
      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG,
        backgroundSize: "160px 160px",
        opacity: isDark ? 0.06 : 0.028,
        mixBlendMode: "overlay" as const,
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,255,255,0.018) 0%, transparent 70%)"
          : "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(0,0,0,0.018) 0%, transparent 70%)",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.5) 100%)"
          : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.04) 100%)",
      }} />

      <div style={{
        maxWidth: 520, width: "100%",
        padding: "0 clamp(24px, 5vw, 48px)",
        textAlign: "center",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 28,
        position: "relative", zIndex: 1,
      }}>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.62rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: sub,
        }}>
          Open to Opportunities
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.9rem, 4vw, 3rem)",
            fontWeight: 800, lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: title, margin: 0,
          }}>
            Let's Collaborate
          </h2>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.9rem", lineHeight: 1.65, fontWeight: 500,
            color: sub, margin: 0,
          }}>
            Building products that are accessible, intentional,<br />and genuinely delightful to use.
          </p>
        </div>

        <a
          href="mailto:qureshi.ux@gmail.com"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.85rem", fontWeight: 700,
            letterSpacing: "0.02em",
            padding: "13px 32px",
            borderRadius: 100,
            background: ctaBg,
            color: ctaColor,
            textDecoration: "none",
            boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.15)",
            transition: "opacity 0.2s",
          }}
        >
          qureshi.ux@gmail.com
        </a>

        <div style={{ width: 40, height: 1, background: divider }} />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: linkClr, textDecoration: "none",
              padding: "7px 14px", borderRadius: 8,
              background: "transparent",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = linkHovBg; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
          >
            LinkedIn
          </a>
          <div style={{ width: 1, height: 14, background: divider }} />
          <a
            href="#"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: linkClr, textDecoration: "none",
              padding: "7px 14px", borderRadius: 8,
              background: "transparent",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = linkHovBg; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "transparent"; }}
          >
            Download CV
          </a>
        </div>

        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.58rem", letterSpacing: "0.1em",
          color: fine, textTransform: "uppercase",
          marginTop: 8,
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
  const isDark = mounted && resolvedTheme === "dark";

  const [progress, setProgress] = useState(0);
  const [fabVisible, setFabVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? el.scrollTop / max : 0;
    setProgress(p);
    setFabVisible(el.scrollTop > el.clientHeight * 0.5);
  }, []);

  const progressBg = isDark ? "#FAFAFA" : "#0A0A0A";
  const fabBg      = isDark ? "#FAFAFA" : "#0A0A0A";
  const fabFg      = isDark ? "#0A0A0A" : "#FAFAFA";

  return (
    <>
      <Navbar />

      {/* Scroll Progress Bar */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 2,
        zIndex: 9999,
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      }}>
        <motion.div
          style={{
            height: "100%",
            background: progressBg,
            transformOrigin: "left",
          }}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Jump to Resume FAB */}
      <AnimatePresence>
        {fabVisible && (
          <motion.a
            href="#"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              bottom: 28, right: 28,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.03em",
              padding: "10px 18px",
              borderRadius: 100,
              background: fabBg,
              color: fabFg,
              textDecoration: "none",
              boxShadow: isDark
                ? "0 8px 28px rgba(0,0,0,0.6)"
                : "0 8px 28px rgba(0,0,0,0.18)",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={13} />
            Resume
          </motion.a>
        )}
      </AnimatePresence>

      {/* Scroll-snap container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {/* 1 — Hero */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <Hero />
        </section>

        {/* 2 — Interactive Work Dashboard */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <WorkExperience />
        </section>

        {/* 3 — Case Studies */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <CaseStudiesSection />
        </section>

        {/* 4 — Projects */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <ProjectsSection />
        </section>

        {/* 5 — Technical Spec Skills */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <Skills />
        </section>

        {/* 6 — Certification Gallery */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <Credentials />
        </section>

        {/* 7 — Footer & Contact */}
        <Footer isDark={isDark} />
      </div>
    </>
  );
}
