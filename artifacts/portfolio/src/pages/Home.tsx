import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CaseStudiesSection, ProjectsSection } from "@/components/SelectedWork";
import { WorkExperience } from "@/components/WorkExperience";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";

function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const bg       = isDark ? "#0A0A0A" : "#EFEFEF";
  const title    = isDark ? "#F5F5F5" : "#0D0D0D";
  const sub      = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const ctaBg    = isDark ? "#F5F5F5" : "#0D0D0D";
  const ctaColor = isDark ? "#0D0D0D" : "#F5F5F5";
  const linkClr  = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.42)";
  const linkHovBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const divider  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const fine     = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";

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
      {/* Subtle radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.012) 0%, transparent 70%)"
          : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.012) 0%, transparent 70%)",
      }} />

      <div style={{
        maxWidth: 520, width: "100%",
        padding: "0 clamp(24px, 5vw, 48px)",
        textAlign: "center",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 28,
        position: "relative", zIndex: 1,
      }}>
        {/* Eyebrow */}
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.62rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: sub,
        }}>
          Open to Opportunities
        </span>

        {/* Headline */}
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
            fontSize: "0.9rem", lineHeight: 1.65,
            color: sub, margin: 0,
          }}>
            Building products that are accessible, intentional,<br />and genuinely delightful to use.
          </p>
        </div>

        {/* Primary CTA */}
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

        {/* Divider */}
        <div style={{ width: 40, height: 1, background: divider }} />

        {/* Secondary links */}
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
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = linkHovBg;
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = "transparent";
            }}
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
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = linkHovBg;
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = "transparent";
            }}
          >
            Download CV
          </a>
        </div>

        {/* Fine print */}
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
  return (
    <>
      <Navbar />
      <div
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

        {/* 2 — Case Studies */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <CaseStudiesSection />
        </section>

        {/* 3 — Projects */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <ProjectsSection />
        </section>

        {/* 4 — Bento Experience Grid */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <WorkExperience />
        </section>

        {/* 5 — Skills & Technical Stack */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <Skills />
        </section>

        {/* 6 — Credentials Strip */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <Credentials />
        </section>

        {/* 7 — Footer & Contact */}
        <Footer />
      </div>
    </>
  );
}
