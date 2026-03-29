import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";
import { useTourHighlight } from "@/contexts/TourContext";

/* ─── Noise ─── */
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const sys = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : sys;
}

/* ─── Unified design tokens ─── */
function tok(isDark: boolean) {
  return {
    /* Section bgs */
    bg:         isDark ? "#030303" : "#FFFFFF",
    bgAlt:      isDark ? "#060606" : "#F5F4F2",
    /* Typography */
    eyebrow:    isDark ? "#484848" : "#8A8A8A",
    heading:    isDark ? "#F0F0F0" : "#080808",
    cardTitle:  isDark ? "#D8D8D8" : "#0E0E0E",
    cardBody:   isDark ? "#545454" : "#525252",
    yearClr:    isDark ? "#303030" : "#B8B8B8",
    /* Unified card tokens */
    cardBgRest: isDark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.03)",
    cardBgHov:  isDark ? "rgba(255,255,255,0.046)" : "rgba(0,0,0,0.055)",
    cardBdrRst: isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.1)",
    cardBdrHov: isDark ? "rgba(255,255,255,0.13)"  : "rgba(0,0,0,0.18)",
    /* Tag/chip */
    chipBgRst:  isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.07)",
    chipBgHov:  isDark ? "rgba(255,255,255,0.085)" : "rgba(0,0,0,0.11)",
    chipTxtRst: isDark ? "#4A4A4A" : "#6A6A6A",
    chipTxtHov: isDark ? "#888888" : "#2A2A2A",
    /* Action link (accent — only interactive element gets green) */
    linkRst:    isDark ? "#3A3A3A" : "#AAAAAA",
    linkHov:    isDark ? "#5EFF80" : "#1A7A32",
    /* Divider */
    divider:    isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)",
    /* Noise */
    noiseOp:    isDark ? 0.06  : 0.08,
    noiseBlend: (isDark ? "overlay" : "multiply") as React.CSSProperties["mixBlendMode"],
    /* Tour ring */
    tourRing:   isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
  };
}

/* ─── Data ─── */
const CASE_STUDIES = [
  {
    id: 1, tag: "Real Estate UX", year: "2026",
    title: "Dubai Dunes: Engineering Trust",
    description: "Redesigned a visually underperforming real estate platform into a high-authority luxury interface — repositioning the founder as the central trust signal for high-net-worth buyers.",
    skills: ["Research", "Visual Direction", "Design System", "Hi-Fi Mockups"],
    link: "/case-study/dubai-dunes",
  },
  {
    id: 2, tag: "Product Design", year: "2025",
    title: "Exclusive Streaming Platform",
    description: "Sole product designer for a complete streaming ecosystem — designed all screens end-to-end including homepage, dashboard, and full user flows with a scalable design system.",
    skills: ["Product Design", "Design System", "Dev Handoff", "Figma"],
    link: null,
  },
];

interface BentoProject {
  id: number; tag: string; year: string;
  title: string; description: string;
  award?: string; colSpan?: number; link?: string;
}

const BENTO_PROJECTS: BentoProject[] = [
  {
    id: 1, tag: "Real Estate", year: "2026",
    title: "Dubai Dunes Redesign",
    description: "Full luxury real estate redesign — high-authority dark interface repositioning the brand for high-net-worth buyers.",
    colSpan: 2, link: "/case-study/dubai-dunes",
  },
  {
    id: 2, tag: "Streaming", year: "2025",
    title: "Exclusive Streaming Platform",
    description: "End-to-end product design for a complete streaming ecosystem — all screens, flows, and a full design system.",
  },
  {
    id: 3, tag: "Mobile", year: "2024",
    title: "NSW Mobile App Redesign",
    description: "Rebuilt from scratch with a scalable design system, smooth flows, and a full working prototype.",
  },
  {
    id: 4, tag: "Web", year: "2024",
    title: "Verified by Tenants",
    description: "Improved IA, readability, and accessibility while preserving brand identity.",
  },
  {
    id: 5, tag: "Game Design", year: "2023",
    title: "Codex — Winter Game Jam",
    description: "Designed and co-developed a complete game from concept to launch. Led all UI/UX, concept, and game design.",
    award: "Best Project · SIBAU 2023",
  },
];

/* ─── Case Studies Section ─── */
export function CaseStudiesSection() {
  const isDark = useDark();
  const t = tok(isDark);
  const [hovered, setHovered] = useState<number | null>(null);
  const [, navigate] = useLocation();
  const highlight = useTourHighlight();
  const tourCase  = !!(highlight?.startsWith("case-"));

  return (
    <div style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: t.bg, display: "flex", flexDirection: "column",
      justifyContent: "center", overflow: "hidden",
      position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "160px 160px",
        opacity: t.noiseOp, mixBlendMode: t.noiseBlend,
      }} />

      <div style={{
        maxWidth: 840, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(22px, 3.2vh, 36px)",
      }}>
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: "0.5px", background: t.eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: t.eyebrow }}>Selected Work</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.heading, margin: 0 }}>Case Studies</h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 600, color: t.eyebrow, letterSpacing: "0.04em" }}>Deep-dive explorations</span>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.6vh, 16px)" }}>
          {CASE_STUDIES.map((cs) => {
            const isHov = hovered === cs.id;
            const isTourHl = highlight === `case-${cs.id}`;
            const isDimmed = tourCase && !isTourHl;

            return (
              <motion.div
                key={cs.id}
                onMouseEnter={() => setHovered(cs.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => cs.link && navigate(cs.link)}
                animate={{ y: isHov ? -2 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{
                  background: isHov ? t.cardBgHov : t.cardBgRst,
                  border: `1px solid ${isTourHl ? t.tourRing : (isHov ? t.cardBdrHov : t.cardBdrRst)}`,
                  borderRadius: 10,
                  padding: "clamp(20px, 2.8vh, 28px) clamp(20px, 2.8vw, 30px)",
                  cursor: cs.link ? "pointer" : "default",
                  transition: "background 0.35s ease, border-color 0.35s ease",
                  opacity: isDimmed ? 0.28 : 1,
                  transform: isTourHl ? "scale(1.012)" : "scale(1)",
                }}
              >
                {/* Meta row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.52rem", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    padding: "2px 8px", borderRadius: 4,
                    background: isHov ? t.chipBgHov : t.chipBgRst,
                    color: isHov ? t.chipTxtHov : t.chipTxtRst,
                    transition: "background 0.3s, color 0.3s",
                  }}>{cs.tag}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.58rem", fontWeight: 600, color: t.yearClr }}>{cs.year}</span>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.96rem, 1.5vw, 1.18rem)", fontWeight: 700, letterSpacing: "-0.015em", color: t.cardTitle, margin: "0 0 9px", lineHeight: 1.25 }}>{cs.title}</h3>

                {/* Description */}
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(0.76rem, 1.05vw, 0.84rem)", lineHeight: 1.68, color: t.cardBody, margin: "0 0 14px", fontWeight: 500 }}>{cs.description}</p>

                {/* Skills + action */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {cs.skills.map(s => (
                      <span key={s} style={{
                        fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem", fontWeight: 700,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        padding: "2px 8px", borderRadius: 3,
                        background: t.chipBgRst,
                        color: t.chipTxtRst,
                      }}>{s}</span>
                    ))}
                  </div>
                  {/* Action link — only element with green accent */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 4,
                    opacity: cs.link ? 1 : 0.35,
                  }}>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: isHov && cs.link ? t.linkHov : t.linkRst,
                      transition: "color 0.3s",
                    }}>{cs.link ? "Case Study" : "NDA"}</span>
                    <ArrowUpRight size={10} style={{ color: isHov && cs.link ? t.linkHov : t.linkRst, transition: "color 0.3s" }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Projects / Bento Section ─── */
export function ProjectsSection() {
  const isDark = useDark();
  const t = tok(isDark);
  const [hovered, setHovered] = useState<number | null>(null);
  const [, navigate] = useLocation();

  const accent = isDark ? "#5EFF80" : "#1A7A32";

  /* Gold badge tokens for Codex */
  const goldBg   = isDark ? "rgba(255,213,79,0.09)"  : "rgba(180,130,0,0.08)";
  const goldBdr  = isDark ? "rgba(255,213,79,0.22)"  : "rgba(180,130,0,0.2)";
  const goldClr  = isDark ? "#C8A840"                : "#896400";

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64, paddingBottom: 64,
      boxSizing: "border-box",
      background: t.bgAlt, display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative",
      transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "160px 160px",
        opacity: t.noiseOp, mixBlendMode: t.noiseBlend,
      }} />

      <div style={{
        maxWidth: 920, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 64px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(22px, 3.2vh, 36px)",
      }}>
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 20, height: "0.5px", background: t.eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.54rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: t.eyebrow }}>Selected Work</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: t.heading, margin: 0 }}>Projects</h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 600, color: t.eyebrow, letterSpacing: "0.04em" }}>Focused executions</span>
          </div>
        </div>

        {/* Bento grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(10px, 1.4vw, 14px)",
        }}>
          {BENTO_PROJECTS.map((proj) => {
            const isHov = hovered === proj.id;
            const hasLink = !!proj.link;

            return (
              <motion.div
                key={proj.id}
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => hasLink && navigate(proj.link!)}
                animate={{ y: isHov ? -2 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{
                  gridColumn: proj.colSpan ? `span ${proj.colSpan}` : "span 1",
                  position: "relative",
                  background: isHov ? t.cardBgHov : t.cardBgRst,
                  border: `1px solid ${isHov ? t.cardBdrHov : t.cardBdrRst}`,
                  borderRadius: 10,
                  padding: "clamp(16px, 2.2vh, 22px) clamp(14px, 1.8vw, 20px)",
                  cursor: hasLink ? "pointer" : "default",
                  display: "flex", flexDirection: "column", gap: 8,
                  transition: "background 0.35s ease, border-color 0.35s ease",
                }}
              >
                {/* Codex award badge */}
                {proj.award && (
                  <div style={{
                    position: "absolute", top: 12, right: 14,
                    background: goldBg, border: `1px solid ${goldBdr}`,
                    color: goldClr,
                    padding: "2px 7px", borderRadius: 3,
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.4rem", fontWeight: 800,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>{proj.award}</div>
                )}

                {/* Tag + year */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.44rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: isHov ? t.chipTxtHov : t.chipTxtRst,
                    transition: "color 0.3s",
                  }}>{proj.tag}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.5rem", fontWeight: 600, color: t.yearClr }}>{proj.year}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.82rem, 1.1vw, 0.94rem)",
                  fontWeight: 700, letterSpacing: "-0.012em",
                  color: t.cardTitle, margin: 0, lineHeight: 1.25, flex: "0 0 auto",
                }}>{proj.title}</h3>

                {/* Description */}
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.64rem, 0.86vw, 0.72rem)",
                  lineHeight: 1.65, color: t.cardBody,
                  margin: 0, flex: 1, fontWeight: 500,
                }}>{proj.description}</p>

                {/* Footer */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  borderTop: `0.5px solid ${t.divider}`,
                }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.44rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: isHov && hasLink ? t.linkHov : t.linkRst,
                    transition: "color 0.3s",
                  }}>{hasLink ? "Case Study" : "NDA"}</span>
                  <ArrowUpRight
                    size={10}
                    style={{
                      color: isHov && hasLink ? t.linkHov : t.linkRst,
                      transition: "color 0.3s",
                      opacity: hasLink ? 1 : 0.3,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            onMouseEnter={() => setHovered(99)}
            onMouseLeave={() => setHovered(null)}
            animate={{ y: hovered === 99 ? -2 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              gridColumn: "span 3",
              position: "relative",
              background: hovered === 99 ? t.cardBgHov : t.cardBgRst,
              border: `1px solid ${hovered === 99 ? t.cardBdrHov : t.cardBdrRst}`,
              borderRadius: 10,
              padding: "clamp(14px, 2vh, 20px) clamp(16px, 2vw, 22px)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              transition: "background 0.35s ease, border-color 0.35s ease",
            }}
          >
            <div>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.82rem, 1.1vw, 0.96rem)",
                fontWeight: 700, color: t.cardTitle,
                margin: 0, letterSpacing: "-0.01em",
              }}>There's more — visit the full archive</p>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.66rem", fontWeight: 500,
                color: t.cardBody, margin: "4px 0 0", lineHeight: 1.5,
              }}>AI SaaS Platform UX · AML Government System · UBIOX Brand Design · and more.</p>
            </div>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
              style={{ flexShrink: 0, marginLeft: 20 }}
            >
              <ArrowUpRight
                size={18}
                style={{
                  color: hovered === 99 ? accent : t.linkRst,
                  transition: "color 0.3s",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
