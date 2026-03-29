import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PHASES = [
  {
    num: "01",
    title: "Discovery & Technical Alignment",
    concept: "Gathering constraints and understanding the problem.",
    details:
      "Analyzing client briefs, reference sites, and pain points. Conducting exploratory calls to understand project goals and the developer's tech stack (React, Flutter, etc.) early on — preventing downstream engineering friction before a single pixel is designed.",
    techniques: ["Competitive Analysis", "Stakeholder Interviews"],
  },
  {
    num: "02",
    title: "Concept Validation",
    concept: "Secure rapid feedback through tangible visuals.",
    details:
      "Clients often struggle to visualise design systems from abstract wireframes. I provide a Minimum Section Page — header, footer, and core mid-sections for web, or 1–2 core mobile screens — built roughly to secure real, gut-reaction feedback before mapping complex states.",
    techniques: ["Rapid Prototyping", "Gut-Reaction Testing"],
  },
  {
    num: "03",
    title: "Deep Research & Architecture",
    concept: "Mapping out the human element.",
    details:
      "Building data-driven user personas and behaviours. Conducting card sorting, user interviews, and field research to ensure the product solves real problems at scale — not assumptions made in a vacuum.",
    techniques: ["Heuristic Evaluation", "IA Mapping", "Card Sorting", "User Interviews"],
  },
  {
    num: "04",
    title: "Design System Foundation",
    concept: "Setting the rules of the system.",
    details:
      "Once colours, typography, and layouts are locked via Concept Validation, I build a component-driven, scalable Design System tailored to the project's long-term growth needs — ensuring every future screen inherits the same logic.",
    techniques: ["Token Architecture", "Component Libraries", "Figma Variables"],
  },
  {
    num: "05",
    title: "Low-Fidelity Refinement & Friction Removal",
    concept: "Smoothing the user journey.",
    details:
      "Creating user flows and mapping journeys. Building low-fidelity prototypes to test and optimise navigation. We remove visual noise and refine layouts to ensure absolute clarity — zero friction between the user and their goal.",
    techniques: ["WCAG 2.1 AA/AAA Checks", "Usability A/B Testing", "Flow Mapping"],
  },
  {
    num: "06",
    title: "High-Fidelity Engineering & Motion",
    concept: "Final product polishing.",
    details:
      "Moving to high-fidelity prototyping, applying consistent interactions, and introducing micro-animations. Ensuring the end product is smooth, logical, and ready for development handoff — with annotated specs, interaction notes, and a component inventory.",
    techniques: ["Micro-interactions", "Dev Handoff Specs", "Motion Guidelines"],
  },
];

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;
  return mounted ? resolvedTheme === "dark" : system;
}

export default function Process() {
  const isDark = useDark();
  const [, navigate] = useLocation();
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  const bg       = isDark ? "#030303" : "#F7F7F7";
  const green    = isDark ? "#5EFF80" : "#1A7A32";
  const title    = isDark ? "#F0F0F0" : "#080808";
  const body     = isDark ? "#6A6A6A" : "#606060";
  const concept  = isDark ? "#909090" : "#505050";
  const divider  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const tagBg    = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const tagClr   = isDark ? "#505050" : "#909090";
  const dotDim   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const lineClr  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const eyebrow  = isDark ? "#505050" : "#808080";
  const ctaBg    = isDark ? "#EFEFEF" : "#0A0A0A";
  const ctaFg    = isDark ? "#0A0A0A" : "#F0F0F0";
  const numDim   = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";

  return (
    <div style={{ minHeight: "100vh", background: bg, transition: "background 0.35s" }}>
      <Navbar />

      <div style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "clamp(96px, 14vh, 120px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 120px)",
      }}>

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: "clamp(52px, 8vh, 80px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.58rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrow,
            }}>Work Process</span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            fontWeight: 800, lineHeight: 1.06,
            letterSpacing: "-0.04em",
            color: title, margin: "0 0 18px",
          }}>
            My Work<br />
            <span style={{ color: green }}>Process.</span>
          </h1>

          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
            lineHeight: 1.72, fontWeight: 500,
            color: concept,
            maxWidth: 520, margin: 0,
          }}>
            A logic-first framework to bridge the gap between business goals, user needs,
            and development constraints — applied consistently across every project.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div style={{ position: "relative" }}>
          {/* Continuous vertical line */}
          <div style={{
            position: "absolute",
            top: 8, bottom: 0,
            left: 31,
            width: 1,
            background: lineClr,
            pointerEvents: "none",
          }} />

          {PHASES.map((phase, i) => {
            const isHov = hoveredPhase === phase.num;
            const isLast = i === PHASES.length - 1;

            return (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.07 }}
                onMouseEnter={() => setHoveredPhase(phase.num)}
                onMouseLeave={() => setHoveredPhase(null)}
                style={{
                  display: "flex",
                  gap: "clamp(20px, 3vw, 36px)",
                  paddingBottom: isLast ? 0 : "clamp(32px, 5vh, 48px)",
                  cursor: "default",
                }}
              >
                {/* Left: number + dot */}
                <div style={{ width: 64, flexShrink: 0, position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    top: 6, right: 0,
                    width: 9, height: 9,
                    borderRadius: "50%",
                    background: isHov ? green : dotDim,
                    transition: `background 0.3s`,
                    zIndex: 1,
                    boxShadow: isHov
                      ? `0 0 10px ${isDark ? "rgba(94,255,128,0.5)" : "rgba(26,122,50,0.4)"}`
                      : "none",
                  }} />
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.65rem", fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: isHov ? green : numDim,
                    transition: `color 0.3s`,
                    display: "block",
                    textAlign: "right",
                    paddingRight: 20,
                    lineHeight: "21px",
                  }}>{phase.num}</span>
                </div>

                {/* Right: content */}
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1rem, 1.6vw, 1.18rem)",
                    fontWeight: 700, letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    color: isHov ? green : title,
                    margin: "0 0 6px",
                    transition: `color 0.3s`,
                  }}>
                    {phase.title}
                  </h2>

                  <p style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.72rem", fontWeight: 700,
                    letterSpacing: "0.01em",
                    color: concept,
                    margin: "0 0 12px",
                    fontStyle: "italic",
                  }}>
                    {phase.concept}
                  </p>

                  <p style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "clamp(0.8rem, 1.1vw, 0.87rem)",
                    lineHeight: 1.72, fontWeight: 500,
                    color: body,
                    margin: "0 0 14px",
                  }}>
                    {phase.details}
                  </p>

                  {phase.techniques.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {phase.techniques.map(t => (
                        <span key={t} style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.57rem", fontWeight: 700,
                          letterSpacing: "0.09em", textTransform: "uppercase",
                          color: tagClr,
                          background: tagBg,
                          padding: "3px 10px", borderRadius: 100,
                          border: `1px solid ${divider}`,
                        }}>{t}</span>
                      ))}
                    </div>
                  )}

                  {!isLast && (
                    <div style={{
                      height: 1,
                      background: divider,
                      marginTop: "clamp(28px, 4vh, 40px)",
                    }} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.65 }}
          style={{
            marginTop: "clamp(60px, 10vh, 96px)",
            paddingTop: "clamp(36px, 5vh, 52px)",
            borderTop: `1px solid ${divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 800, letterSpacing: "-0.025em",
              color: title,
            }}>
              Ready to build something{" "}
              <span style={{ color: green }}>intentional?</span>
            </span>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.75rem", fontWeight: 500,
              color: body,
            }}>
              Let's apply this process to your next product.
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => navigate("/")}
              style={{
                all: "unset", cursor: "pointer",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: body,
                display: "flex", alignItems: "center", gap: 6,
                transition: `color 0.25s`,
                padding: "10px 0",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = title; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = body; }}
            >
              <ArrowLeft size={13} /> Back to Home
            </button>

            <a
              href="mailto:qureshi.ux@gmail.com"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.8rem", fontWeight: 700,
                letterSpacing: "0.01em",
                padding: "11px 24px", borderRadius: 100,
                background: ctaBg, color: ctaFg,
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: 7,
                transition: `opacity 0.2s`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <Home size={13} /> Let's Build
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
