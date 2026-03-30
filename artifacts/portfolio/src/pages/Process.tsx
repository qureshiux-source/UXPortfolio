import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { ContactModal } from "@/components/ContactModal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const PHASES = [
  {
    num: "01",
    emoji: "🔍",
    title: "Discovery & Technical Alignment",
    concept: "Gathering constraints and understanding the problem.",
    details:
      "Analyzing client briefs, reference sites, and pain points. Conducting exploratory calls to understand project goals and the developer's tech stack (React, Flutter, etc.) early on — preventing downstream engineering friction before a single pixel is designed.",
    techniques: ["Competitive Analysis", "Stakeholder Interviews"],
    color: { dark: "#8BA4FF", light: "#2040CC" },
  },
  {
    num: "02",
    emoji: "⚡",
    title: "Concept Validation",
    concept: "Secure rapid feedback through tangible visuals.",
    details:
      "Clients often struggle to visualise design systems from abstract wireframes. I provide a Minimum Section Page — header, footer, and core mid-sections for web, or 1–2 core mobile screens — built roughly to secure real, gut-reaction feedback before mapping complex states.",
    techniques: ["Rapid Prototyping", "Gut-Reaction Testing"],
    color: { dark: "#FFD166", light: "#B08000" },
  },
  {
    num: "03",
    emoji: "🧠",
    title: "Deep Research & Architecture",
    concept: "Mapping out the human element.",
    details:
      "Building data-driven user personas and behaviours. Conducting card sorting, user interviews, and field research to ensure the product solves real problems at scale — not assumptions made in a vacuum.",
    techniques: ["Heuristic Evaluation", "IA Mapping", "Card Sorting", "User Interviews"],
    color: { dark: "#58C8FF", light: "#006DAD" },
  },
  {
    num: "04",
    emoji: "🎨",
    title: "Design System Foundation",
    concept: "Setting the rules of the system.",
    details:
      "Once colours, typography, and layouts are locked via Concept Validation, I build a component-driven, scalable Design System tailored to the project's long-term growth needs — ensuring every future screen inherits the same logic.",
    techniques: ["Token Architecture", "Component Libraries", "Figma Variables"],
    color: { dark: "#5EFF80", light: "#1A7A32" },
  },
  {
    num: "05",
    emoji: "🔄",
    title: "Low-Fidelity Refinement & Friction Removal",
    concept: "Smoothing the user journey.",
    details:
      "Creating user flows and mapping journeys. Building low-fidelity prototypes to test and optimise navigation. We remove visual noise and refine layouts to ensure absolute clarity — zero friction between the user and their goal.",
    techniques: ["WCAG 2.1 AA/AAA Checks", "Usability A/B Testing", "Flow Mapping"],
    color: { dark: "#FF8FA3", light: "#C0184D" },
  },
  {
    num: "06",
    emoji: "✨",
    title: "High-Fidelity Engineering & Motion",
    concept: "Final product polishing.",
    details:
      "Moving to high-fidelity prototyping, applying consistent interactions, and introducing micro-animations. Ensuring the end product is smooth, logical, and ready for development handoff — with annotated specs, interaction notes, and a component inventory.",
    techniques: ["Micro-interactions", "Dev Handoff Specs", "Motion Guidelines"],
    color: { dark: "#C8A840", light: "#896400" },
  },
];

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : system;
}

export default function Process() {
  const isDark = useDark();
  const [, navigate] = useLocation();
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const bg       = isDark ? "#030303" : "#F5F4F2";
  const green    = isDark ? "#5EFF80" : "#1A7A32";
  const title    = isDark ? "#F0F0F0" : "#080808";
  const body     = isDark ? "#6A6A6A" : "#606060";
  const concept  = isDark ? "#909090" : "#505050";
  const divider  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  const tagBg    = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const tagClr   = isDark ? "#505050" : "#808080";
  const dotDim   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)";
  const lineClr  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
  const eyebrow  = isDark ? "#505050" : "#808080";
  const ctaBg    = isDark ? "#EFEFEF" : "#0A0A0A";
  const ctaFg    = isDark ? "#0A0A0A" : "#F0F0F0";
  const numDim   = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
  const cardBg   = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.025)";
  const cardBdr  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ minHeight: "100vh", background: bg, transition: "background 0.35s", position: "relative" }}>
      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.05 : 0.07,
        mixBlendMode: (isDark ? "overlay" : "multiply") as React.CSSProperties["mixBlendMode"],
      }} />

      <Navbar />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <div style={{
        maxWidth: 820, margin: "0 auto",
        padding: "clamp(96px, 14vh, 120px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 120px)",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: "clamp(52px, 8vh, 80px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow }}>Work Process</span>
          </div>

          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.04em", color: title, margin: "0 0 18px" }}>
            My Work<br />
            <span style={{ color: green }}>Process.</span>
          </h1>

          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)", lineHeight: 1.72, fontWeight: 500, color: concept, maxWidth: 520, margin: "0 0 28px" }}>
            A logic-first framework to bridge the gap between business goals, user needs,
            and development constraints — applied consistently across every project.
          </p>

          {/* Phase progress pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {PHASES.map((p, i) => {
              const isActive = hoveredPhase === p.num || activePhase === p.num;
              const accent = isDark ? p.color.dark : p.color.light;
              return (
                <motion.button
                  key={p.num}
                  onClick={() => {
                    setActivePhase(activePhase === p.num ? null : p.num);
                    document.getElementById(`phase-${p.num}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  whileTap={{ scale: 0.94 }}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 100,
                    background: isActive ? `${accent}18` : tagBg,
                    border: `1px solid ${isActive ? accent : "transparent"}`,
                    transition: "background 0.22s, border-color 0.22s",
                  }}
                >
                  <span style={{ fontSize: "0.7rem" }}>{p.emoji}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.56rem", fontWeight: 700, color: isActive ? accent : tagClr, letterSpacing: "0.06em", transition: "color 0.22s" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 8, bottom: 0, left: 31, width: 1, background: lineClr, pointerEvents: "none" }} />

          {PHASES.map((phase, i) => {
            const isHov   = hoveredPhase === phase.num;
            const isActive = activePhase === phase.num;
            const highlight = isHov || isActive;
            const isLast  = i === PHASES.length - 1;
            const accent  = isDark ? phase.color.dark : phase.color.light;

            return (
              <motion.div
                id={`phase-${phase.num}`}
                key={phase.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.07 }}
                onMouseEnter={() => setHoveredPhase(phase.num)}
                onMouseLeave={() => setHoveredPhase(null)}
                onClick={() => setActivePhase(activePhase === phase.num ? null : phase.num)}
                style={{
                  display: "flex", gap: "clamp(20px, 3vw, 36px)",
                  paddingBottom: isLast ? 0 : "clamp(32px, 5vh, 48px)",
                  cursor: "pointer",
                }}
              >
                {/* Left: number + dot */}
                <div style={{ width: 64, flexShrink: 0, position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 6, right: 0,
                    width: 9, height: 9, borderRadius: "50%",
                    background: highlight ? accent : dotDim,
                    transition: "background 0.3s, box-shadow 0.3s",
                    zIndex: 1,
                    boxShadow: highlight ? `0 0 12px ${accent}60` : "none",
                  }} />
                  <span style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "0.65rem", fontWeight: 800,
                    letterSpacing: "0.1em", color: highlight ? accent : numDim,
                    transition: "color 0.3s", display: "block", textAlign: "right",
                    paddingRight: 20, lineHeight: "21px",
                  }}>{phase.num}</span>
                </div>

                {/* Right: content */}
                <div style={{ flex: 1 }}>
                  {/* Phase card */}
                  <motion.div
                    animate={{
                      background: highlight ? (isDark ? `${accent}0D` : `${accent}0A`) : cardBg,
                      borderColor: highlight ? `${accent}40` : cardBdr,
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      padding: "16px 20px",
                      borderRadius: 12,
                      border: `1px solid ${cardBdr}`,
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      {/* Emoji icon */}
                      <div style={{
                        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                        background: highlight ? `${accent}18` : (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"),
                        border: `1px solid ${highlight ? `${accent}30` : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)")}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1rem", transition: "background 0.25s, border-color 0.25s",
                        userSelect: "none",
                      }}>
                        {phase.emoji}
                      </div>

                      <div style={{ flex: 1 }}>
                        <h2 style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "clamp(0.92rem, 1.5vw, 1.1rem)",
                          fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2,
                          color: highlight ? accent : title,
                          margin: "0 0 4px", transition: "color 0.3s",
                        }}>
                          {phase.title}
                        </h2>
                        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.01em", color: concept, margin: 0, fontStyle: "italic" }}>
                          {phase.concept}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {(isHov || isActive) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "clamp(0.8rem, 1.1vw, 0.87rem)",
                          lineHeight: 1.75, fontWeight: 500,
                          color: body, margin: "0 0 12px",
                        }}>
                          {phase.details}
                        </p>

                        {phase.techniques.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                            {phase.techniques.map(t => (
                              <span key={t} style={{
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: "0.57rem", fontWeight: 700,
                                letterSpacing: "0.09em", textTransform: "uppercase",
                                color: isDark ? accent : accent,
                                background: `${accent}12`,
                                padding: "3px 10px", borderRadius: 100,
                                border: `1px solid ${accent}28`,
                              }}>{t}</span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isLast && (
                    <div style={{ height: 1, background: divider, marginTop: "clamp(14px, 2vh, 24px)" }} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.65 }}
          style={{
            marginTop: "clamp(60px, 10vh, 96px)",
            paddingTop: "clamp(36px, 5vh, 52px)",
            borderTop: `1px solid ${divider}`,
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 800, letterSpacing: "-0.025em", color: title }}>
              Ready to build something{" "}
              <span style={{ color: green }}>intentional?</span>
            </span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 500, color: body }}>
              Let's apply this process to your next product.
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => navigate("/")}
              style={{
                all: "unset", cursor: "pointer",
                fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: body, display: "flex", alignItems: "center", gap: 6,
                transition: "color 0.25s", padding: "10px 0",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = title; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = body; }}
            >
              <ArrowLeft size={13} /> Back to Home
            </button>

            <button
              onClick={() => setContactOpen(true)}
              style={{
                all: "unset", cursor: "pointer",
                fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 700,
                letterSpacing: "0.01em", padding: "11px 24px", borderRadius: 100,
                background: ctaBg, color: ctaFg,
                display: "flex", alignItems: "center", gap: 7,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <MessageCircle size={13} /> Let's Talk
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
