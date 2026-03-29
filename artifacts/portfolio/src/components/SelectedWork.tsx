import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowUpRight, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { useTourHighlight } from "@/contexts/TourContext";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CASE_STUDIES = [
  {
    id: 1, tag: "Real Estate UX", title: "Dubai Dunes: Engineering Trust",
    description: "Redesigned a visually underperforming real estate platform into a high-authority luxury interface — repositioning the founder as the central trust signal for high-net-worth buyers.",
    year: "2026", skills: ["Research", "Visual Direction", "Design System", "High-Fidelity Mockups"],
    link: "/case-study/dubai-dunes",
  },
  {
    id: 2, tag: "Product Design", title: "Exclusive Streaming Platform",
    description: "Sole product designer for a complete streaming ecosystem — designed all screens end-to-end including homepage, dashboard, and user flows, with a full scalable design system.",
    year: "2025", skills: ["Product Design", "Design System", "Dev Handoff", "Figma"],
    link: null,
  },
];

/* Bento grid: 3-col, explicit positions */
interface BentoProject {
  id: number; tag: string; title: string; year: string;
  description: string;
  award?: string;
  colSpan?: number;
}

const PROJECTS: BentoProject[] = [
  {
    id: 1, tag: "Real Estate", title: "Dubai Dunes Redesign", year: "2026",
    description: "Full luxury real estate redesign — high-authority dark interface repositioning the brand for HNW buyers.",
    colSpan: 2,
  },
  {
    id: 2, tag: "Streaming", title: "Exclusive Streaming Platform", year: "2025",
    description: "End-to-end product design for a complete streaming ecosystem including all screens and design system.",
  },
  {
    id: 3, tag: "AI Product", title: "AI SaaS Platform UX", year: "2025",
    description: "UX lead for a complex AI SaaS tool — built intuitive flows for a technically dense product.",
  },
  {
    id: 4, tag: "Mobile", title: "NSW Mobile App Redesign", year: "2024",
    description: "Rebuilt the NSW mobile app from scratch with a scalable design system, smooth flows, and a full working prototype.",
  },
  {
    id: 5, tag: "Web", title: "Verified by Tenants", year: "2024",
    description: "Redesigned a tenant verification platform — improved IA, readability, and accessibility while preserving brand identity.",
  },
  {
    id: 6, tag: "Landing Page", title: "UBIOX Brand & Design", year: "2024",
    description: "Designed a complete landing page integrating UBIOX's mission, services, and brand narrative into a high-converting experience.",
  },
  {
    id: 7, tag: "Gov / Compliance", title: "AML Government System", year: "2025",
    description: "UX design for a UAE government AML compliance platform — complex data flows simplified into clear, accessible interfaces.",
  },
  {
    id: 8, tag: "Game Design", title: "Codex — Winter Game Jam", year: "2023",
    description: "Designed and co-developed Codex from concept to launch at Winter Game Jam. Led UI, UX, concept, and game features.",
    award: "Best Project · SIBAU 2023",
    colSpan: 2,
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

function palette(isDark: boolean) {
  return {
    bg:         isDark ? "#030303" : "#FFFFFF",
    bgAlt:      isDark ? "#060606" : "#FAFAFA",
    eyebrow:    isDark ? "#606060" : "#707070",
    title:      isDark ? "#F5F5F5" : "#080808",
    cardBg:     isDark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.02)",
    cardBorder: isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",
    cardHover:  isDark ? "rgba(255,255,255,0.065)" : "rgba(0,0,0,0.042)",
    tagBg:      isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.055)",
    tagColor:   isDark ? "#808080" : "#505050",
    cardTitle:  isDark ? "#F0F0F0" : "#080808",
    cardBody:   isDark ? "#707070" : "#606060",
    year:       isDark ? "#454545" : "#A0A0A0",
    divider:    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
    arrow:      isDark ? "#707070" : "#606060",
    pillBg:     isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
    pillColor:  isDark ? "#808080" : "#505050",
    awardBg:    isDark ? "rgba(255,209,102,0.1)" : "rgba(176,128,0,0.08)",
    awardColor: isDark ? "#FFD166" : "#B08000",
    noiseOp:    isDark ? 0.055 : 0.09,
    noiseBlend: (isDark ? "overlay" : "multiply") as React.CSSProperties["mixBlendMode"],
  };
}

export function CaseStudiesSection() {
  const isDark = useDark();
  const c = { isDark, ...palette(isDark) };
  const [hovered, setHovered] = useState<number | null>(null);
  const [, navigate] = useLocation();
  const highlight = useTourHighlight();
  const tourCase  = !!(highlight?.startsWith("case-"));
  const ringColor = isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)";

  return (
    <div style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: c.bg, display: "flex", flexDirection: "column",
      justifyContent: "center", overflow: "hidden",
      position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: c.noiseOp, mixBlendMode: c.noiseBlend,
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.4) 100%)"
          : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.025) 100%)",
      }} />

      <div style={{ maxWidth: 860, width: "100%", margin: "0 auto", padding: "0 clamp(24px, 5vw, 72px)", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "clamp(28px, 4vh, 48px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: c.eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: c.eyebrow }}>Selected Work</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: c.title, margin: 0 }}>Case Studies</h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: c.tagColor, letterSpacing: "0.03em" }}>Deep-dive explorations</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vh, 22px)" }}>
          {CASE_STUDIES.map((cs) => {
            const isTourHl = highlight === `case-${cs.id}`;
            const isDimmed = tourCase && !isTourHl;
            return (
              <div key={cs.id}
                onMouseEnter={() => setHovered(cs.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => cs.link && navigate(cs.link)}
                style={{
                  background: hovered === cs.id ? c.cardHover : c.cardBg,
                  border: isTourHl ? `1.5px solid ${ringColor}` : `1px solid ${c.cardBorder}`,
                  borderRadius: 14,
                  padding: "clamp(20px, 2.5vh, 28px) clamp(20px, 2.5vw, 32px)",
                  cursor: cs.link ? "pointer" : "default",
                  transition: "all 0.28s ease",
                  display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start",
                  opacity: isDimmed ? 0.3 : 1,
                  transform: isTourHl ? "scale(1.015)" : "scale(1)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 100, background: c.tagBg, color: c.tagColor }}>{cs.tag}</span>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.65rem", color: c.year, fontWeight: 600 }}>{cs.year}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontWeight: 700, letterSpacing: "-0.015em", color: c.cardTitle, margin: "0 0 10px" }}>{cs.title}</h3>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(0.8rem, 1.1vw, 0.88rem)", lineHeight: 1.65, color: c.cardBody, margin: "0 0 14px", maxWidth: 560, fontWeight: 500 }}>{cs.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {cs.skills.map(s => (
                      <span key={s} style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 100, background: c.pillBg, color: c.pillColor }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${hovered === cs.id ? c.arrow : c.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4, transition: "border-color 0.2s ease" }}>
                  <ArrowUpRight size={15} style={{ color: c.arrow, transform: hovered === cs.id ? "translate(1px, -1px)" : "none", transition: "transform 0.2s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const isDark = useDark();
  const c = { isDark, ...palette(isDark) };
  const [hovered, setHovered] = useState<number | null>(null);
  const highlight = useTourHighlight();
  const tourProj  = !!(highlight?.startsWith("proj-"));
  const ringColor = isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)";

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64, paddingBottom: 64, boxSizing: "border-box",
      background: c.bgAlt, display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: c.noiseOp, mixBlendMode: c.noiseBlend,
      }} />

      <div style={{ maxWidth: 900, width: "100%", margin: "0 auto", padding: "0 clamp(24px, 5vw, 72px)", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "clamp(24px, 3.5vh, 40px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: c.eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: c.eyebrow }}>Selected Work</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: c.title, margin: 0 }}>Projects</h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: c.tagColor, letterSpacing: "0.03em" }}>8 focused executions</span>
          </div>
        </div>

        {/* Bento grid — 3 cols, varying spans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(10px, 1.4vw, 16px)" }}>
          {PROJECTS.map((proj) => {
            const isTourHl = highlight === `proj-${proj.id}`;
            const isDimmed = tourProj && !isTourHl;
            const isHov = hovered === proj.id;
            return (
              <div
                key={proj.id}
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn: proj.colSpan ? `span ${proj.colSpan}` : "span 1",
                  background: isHov ? c.cardHover : c.cardBg,
                  border: isTourHl ? `1.5px solid ${ringColor}` : `1px solid ${c.cardBorder}`,
                  borderRadius: 14,
                  padding: "clamp(16px, 2.2vh, 22px) clamp(16px, 2vw, 22px)",
                  cursor: "pointer",
                  transition: "all 0.26s ease",
                  display: "flex", flexDirection: "column", gap: 10,
                  opacity: isDimmed ? 0.3 : 1,
                  transform: isTourHl ? "scale(1.02)" : "scale(1)",
                  position: "relative",
                }}
              >
                {/* Award badge */}
                {proj.award && (
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "4px 10px", borderRadius: 100,
                    background: c.awardBg, border: `1px solid ${c.awardColor}22`,
                  }}>
                    <Trophy size={10} style={{ color: c.awardColor }} />
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.5rem", fontWeight: 800,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: c.awardColor,
                    }}>{proj.award}</span>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "3px 9px", borderRadius: 100,
                    background: c.tagBg, color: c.tagColor,
                  }}>{proj.tag}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.6rem", color: c.year, fontWeight: 600 }}>{proj.year}</span>
                </div>

                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.08rem)",
                  fontWeight: 700, letterSpacing: "-0.015em",
                  color: c.cardTitle, margin: 0, lineHeight: 1.2,
                  paddingRight: proj.award ? 100 : 0,
                }}>{proj.title}</h3>

                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.72rem, 0.98vw, 0.8rem)",
                  lineHeight: 1.6, color: c.cardBody,
                  margin: 0, flex: 1, fontWeight: 500,
                }}>{proj.description}</p>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: `1px solid ${c.divider}`, paddingTop: 10, marginTop: 2,
                }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase", color: c.arrow,
                  }}>View</span>
                  <ArrowUpRight size={12} style={{
                    color: c.arrow,
                    transform: isHov ? "translate(1px, -1px)" : "none",
                    transition: "transform 0.2s ease",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
