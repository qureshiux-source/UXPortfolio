import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { useTourHighlight } from "@/contexts/TourContext";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : system;
}

function pal(isDark: boolean) {
  return {
    bg:         isDark ? "#030303" : "#FFFFFF",
    bgAlt:      isDark ? "#060606" : "#F8F8F8",
    eyebrow:    isDark ? "#606060" : "#707070",
    title:      isDark ? "#F5F5F5" : "#080808",
    cardBg:     isDark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.022)",
    cardBorder: isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",
    cardHover:  isDark ? "rgba(255,255,255,0.065)" : "rgba(0,0,0,0.042)",
    greenBorder:isDark ? "rgba(94,255,128,0.35)"  : "rgba(26,122,50,0.35)",
    tagBg:      isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.055)",
    tagColor:   isDark ? "#808080" : "#505050",
    tagHover:   isDark ? "#5EFF80" : "#1A7A32",
    cardTitle:  isDark ? "#F0F0F0" : "#080808",
    cardBody:   isDark ? "#686868" : "#606060",
    year:       isDark ? "#404040" : "#ACACAC",
    divider:    isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)",
    arrow:      isDark ? "#686868" : "#606060",
    arrowHover: isDark ? "#5EFF80" : "#1A7A32",
    pillBg:     isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    pillColor:  isDark ? "#787878" : "#505050",
    awardBg:    isDark ? "rgba(255,209,102,0.09)" : "rgba(176,128,0,0.07)",
    awardColor: isDark ? "#FFD166" : "#B08000",
    ctaBg:      isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)",
    ctaBorder:  isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.09)",
    noiseOp:    isDark ? 0.055 : 0.09,
    noiseBlend: (isDark ? "overlay" : "multiply") as React.CSSProperties["mixBlendMode"],
  };
}

const CASE_STUDIES = [
  {
    id: 1, tag: "Real Estate UX", title: "Dubai Dunes: Engineering Trust",
    description: "Redesigned a visually underperforming real estate platform into a high-authority luxury interface — repositioning the founder as the central trust signal for high-net-worth buyers.",
    year: "2026", skills: ["Research", "Visual Direction", "Design System", "Hi-Fi Mockups"],
    link: "/case-study/dubai-dunes",
  },
  {
    id: 2, tag: "Product Design", title: "Exclusive Streaming Platform",
    description: "Sole product designer for a complete streaming ecosystem — designed all screens end-to-end including homepage, dashboard, and full user flows with a scalable design system.",
    year: "2025", skills: ["Product Design", "Design System", "Dev Handoff", "Figma"],
    link: null,
  },
];

/* 5 real projects + 1 CTA card in a strict 6-card bento (3 cols × 2 rows) */
interface BentoProject {
  id: number; tag: string; title: string; year: string;
  description: string; award?: string; colSpan?: number;
  link?: string;
}

const BENTO_PROJECTS: BentoProject[] = [
  {
    id: 1, tag: "Real Estate", title: "Dubai Dunes Redesign", year: "2026",
    description: "Full luxury real estate redesign — high-authority dark interface repositioning the brand for high-net-worth buyers.",
    colSpan: 2, link: "/case-study/dubai-dunes",
  },
  {
    id: 2, tag: "Streaming", title: "Exclusive Streaming Platform", year: "2025",
    description: "End-to-end product design for a complete streaming ecosystem — all screens, flows, and a full design system.",
  },
  {
    id: 3, tag: "Mobile", title: "NSW Mobile App Redesign", year: "2024",
    description: "Rebuilt from scratch with a scalable design system, smooth flows, and a full working prototype.",
  },
  {
    id: 4, tag: "Web", title: "Verified by Tenants", year: "2024",
    description: "Improved IA, readability, and accessibility while preserving brand identity.",
  },
  {
    id: 5, tag: "Game Design", title: "Codex — Winter Game Jam", year: "2023",
    description: "Designed and co-developed a complete game from concept to launch. Led all UI/UX, concept, and game design.",
    award: "Best Project · SIBAU 2023",
  },
];

export function CaseStudiesSection() {
  const isDark = useDark();
  const c = pal(isDark);
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
        maxWidth: 860, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(24px, 3.5vh, 40px)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: c.eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: c.eyebrow }}>Selected Work</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: c.title, margin: 0 }}>Case Studies</h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: c.tagColor, letterSpacing: "0.03em" }}>Deep-dive explorations</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.8vh, 18px)" }}>
          {CASE_STUDIES.map((cs) => {
            const isHov = hovered === cs.id;
            const isTourHl = highlight === `case-${cs.id}`;
            const isDimmed = tourCase && !isTourHl;
            return (
              <div
                key={cs.id}
                onMouseEnter={() => setHovered(cs.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => cs.link && navigate(cs.link)}
                style={{
                  background: isHov ? c.cardHover : c.cardBg,
                  border: `1.5px solid ${isHov ? c.greenBorder : (isTourHl ? ringColor : c.cardBorder)}`,
                  borderRadius: 16,
                  padding: "clamp(20px, 2.8vh, 30px) clamp(20px, 2.8vw, 32px)",
                  cursor: cs.link ? "pointer" : "default",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                  display: "grid", gridTemplateColumns: "1fr auto",
                  gap: 20, alignItems: "center",
                  opacity: isDimmed ? 0.28 : 1,
                  transform: isTourHl ? "scale(1.015)" : "scale(1)",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      padding: "3px 10px", borderRadius: 100,
                      background: isHov ? (isDark ? "rgba(94,255,128,0.1)" : "rgba(26,122,50,0.08)") : c.tagBg,
                      color: isHov ? c.tagHover : c.tagColor,
                      transition: "all 0.22s ease",
                    }}>{cs.tag}</span>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: c.year }}>{cs.year}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1rem, 1.6vw, 1.25rem)", fontWeight: 700, letterSpacing: "-0.015em", color: c.cardTitle, margin: "0 0 10px" }}>{cs.title}</h3>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(0.8rem, 1.1vw, 0.88rem)", lineHeight: 1.65, color: c.cardBody, margin: "0 0 14px", maxWidth: 540, fontWeight: 500 }}>{cs.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {cs.skills.map(s => (
                      <span key={s} style={{
                        fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                        letterSpacing: "0.07em", textTransform: "uppercase",
                        padding: "3px 9px", borderRadius: 100,
                        background: isHov ? (isDark ? "rgba(94,255,128,0.08)" : "rgba(26,122,50,0.06)") : c.pillBg,
                        color: isHov ? c.tagHover : c.pillColor,
                        transition: "all 0.22s ease",
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow — bounces continuously to invite click */}
                <motion.div
                  style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                    border: `1.5px solid ${isHov ? c.arrowHover : c.cardBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.22s ease",
                    background: isHov ? (isDark ? "rgba(94,255,128,0.08)" : "rgba(26,122,50,0.06)") : "transparent",
                  }}
                  animate={cs.link ? { x: [0, 3, 0] } : {}}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
                >
                  <ArrowUpRight
                    size={16}
                    style={{
                      color: isHov ? c.arrowHover : c.arrow,
                      transition: "color 0.22s ease",
                    }}
                  />
                </motion.div>
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
  const c = pal(isDark);
  const [hovered, setHovered] = useState<number | null>(null);
  const [, navigate] = useLocation();
  const highlight = useTourHighlight();

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64, paddingBottom: 72, boxSizing: "border-box",
      background: c.bgAlt, display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: c.noiseOp, mixBlendMode: c.noiseBlend,
      }} />

      <div style={{
        maxWidth: 900, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(24px, 3.5vh, 40px)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: c.eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: c.eyebrow }}>Selected Work</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: c.title, margin: 0 }}>Projects</h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: c.tagColor, letterSpacing: "0.03em" }}>Focused executions</span>
          </div>
        </div>

        {/* 3-col bento — 2 full rows + 1 wide CTA row = 6 cards strictly */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto auto auto",
          gap: "clamp(10px, 1.4vw, 16px)",
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
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
                style={{
                  gridColumn: proj.colSpan ? `span ${proj.colSpan}` : "span 1",
                  background: isHov ? c.cardHover : c.cardBg,
                  border: `1.5px solid ${isHov ? c.greenBorder : c.cardBorder}`,
                  borderRadius: 14,
                  padding: "clamp(16px, 2.2vh, 22px) clamp(16px, 2vw, 22px)",
                  cursor: hasLink ? "pointer" : "default",
                  transition: "border-color 0.22s ease, background 0.22s ease",
                  display: "flex", flexDirection: "column", gap: 10,
                  position: "relative",
                }}
              >
                {proj.award && (
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "4px 10px", borderRadius: 100,
                    background: c.awardBg, border: `1px solid ${c.awardColor}22`,
                  }}>
                    <Trophy size={10} style={{ color: c.awardColor }} />
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: c.awardColor }}>{proj.award}</span>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "3px 9px", borderRadius: 100,
                    background: isHov ? (isDark ? "rgba(94,255,128,0.1)" : "rgba(26,122,50,0.07)") : c.tagBg,
                    color: isHov ? c.tagHover : c.tagColor,
                    transition: "all 0.22s ease",
                  }}>{proj.tag}</span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.6rem", color: c.year, fontWeight: 600 }}>{proj.year}</span>
                </div>

                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.08rem)",
                  fontWeight: 700, letterSpacing: "-0.015em",
                  color: c.cardTitle, margin: 0, lineHeight: 1.2,
                  paddingRight: proj.award ? 110 : 0,
                }}>{proj.title}</h3>

                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.72rem, 0.98vw, 0.8rem)",
                  lineHeight: 1.62, color: c.cardBody,
                  margin: 0, flex: 1, fontWeight: 500,
                }}>{proj.description}</p>

                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderTop: `1px solid ${c.divider}`, paddingTop: 10, marginTop: 2,
                }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    color: isHov ? c.arrowHover : c.arrow,
                    transition: "color 0.22s",
                  }}>{hasLink ? "Case Study" : "View"}</span>
                  <ArrowUpRight size={12} style={{
                    color: isHov ? c.arrowHover : c.arrow,
                    transition: "color 0.22s",
                  }} />
                </div>
              </motion.div>
            );
          })}

          {/* 6th card — CTA to view all */}
          <motion.div
            onMouseEnter={() => setHovered(99)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            style={{
              gridColumn: "span 3",
              background: hovered === 99 ? c.cardHover : c.ctaBg,
              border: `1.5px solid ${hovered === 99 ? c.greenBorder : c.ctaBorder}`,
              borderRadius: 14,
              padding: "clamp(18px, 2.5vh, 26px) clamp(20px, 2.5vw, 28px)",
              cursor: "pointer",
              transition: "all 0.22s ease",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.88rem, 1.3vw, 1.05rem)",
                fontWeight: 700, color: hovered === 99 ? (isDark ? "#5EFF80" : "#1A7A32") : c.cardTitle,
                margin: 0, letterSpacing: "-0.01em",
                transition: "color 0.22s",
              }}>There's more — visit the full archive</p>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.72rem", fontWeight: 500, color: c.cardBody,
                margin: "4px 0 0", lineHeight: 1.5,
              }}>Including AI SaaS Platform UX, AML Government System, UBIOX Brand Design, and more.</p>
            </div>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                border: `1.5px solid ${hovered === 99 ? c.arrowHover : c.ctaBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: hovered === 99 ? (isDark ? "rgba(94,255,128,0.09)" : "rgba(26,122,50,0.07)") : "transparent",
                transition: "all 0.22s ease",
              }}
            >
              <ArrowUpRight size={18} style={{ color: hovered === 99 ? c.arrowHover : c.arrow, transition: "color 0.22s" }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
