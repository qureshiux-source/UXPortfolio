import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
    award: "BEST PROJECT · SIBAU 2023",
  },
];

/* ── Corner cross-lines: each arm extends 10px past the card corner ── */
const ARM_OUT = 10;  /* extends outside card */
const ARM_IN  = 14;  /* extends inside card  */
const ARM_TOT = ARM_OUT + ARM_IN;

function CardCorners({ isHov, isDark }: { isHov: boolean; isDark: boolean }) {
  const restClr  = isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)";
  const hovClr   = "#5EFF80";
  const clr = isHov ? hovClr : restClr;

  const corners = [
    { key: "tl", outer: { top: -ARM_OUT, left: -ARM_OUT } },
    { key: "tr", outer: { top: -ARM_OUT, right: -ARM_OUT } },
    { key: "bl", outer: { bottom: -ARM_OUT, left: -ARM_OUT } },
    { key: "br", outer: { bottom: -ARM_OUT, right: -ARM_OUT } },
  ];

  return (
    <>
      {corners.map(({ key, outer }) => (
        <div
          key={key}
          style={{
            position: "absolute",
            width: ARM_TOT, height: ARM_TOT,
            pointerEvents: "none", zIndex: 3,
            ...outer,
          }}
        >
          {/* Horizontal arm */}
          <div style={{
            position: "absolute",
            top: ARM_OUT - 0.25,
            left: 0, right: 0,
            height: "0.5px",
            background: clr,
            transition: "background 0.22s ease",
          }} />
          {/* Vertical arm */}
          <div style={{
            position: "absolute",
            left: ARM_OUT - 0.25,
            top: 0, bottom: 0,
            width: "0.5px",
            background: clr,
            transition: "background 0.22s ease",
          }} />
        </div>
      ))}
    </>
  );
}

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
                  <ArrowUpRight size={16} style={{ color: isHov ? c.arrowHover : c.arrow, transition: "color 0.22s ease" }} />
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

  /* Token shortcuts for this section */
  const green     = "#5EFF80";
  const greenLt   = "#1A7A32";
  const accent    = isDark ? green : greenLt;
  /* bg-white/2 at rest — barely there */
  const cardRest  = isDark ? "rgba(255,255,255,0.02)"  : "rgba(0,0,0,0.014)";
  const cardHov   = isDark ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.035)";
  const tagTxt    = isDark ? "#484848" : "#A0A0A0";
  const tagTxtHov = isDark ? green : greenLt;
  const bodyTxt   = isDark ? "#545454" : "#787878";
  const yearTxt   = isDark ? "#303030" : "#C0C0C0";
  const titleTxt  = isDark ? "#E0E0E0" : "#080808";
  const linkTxt   = isDark ? "#484848" : "#ABABAB";
  const linkHov   = isDark ? green : greenLt;
  const divThin   = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  /* Eyebrow label style (shared) */
  const eyebrowLabel = (txt: string) => (
    <span style={{
      fontFamily: "'Raleway', sans-serif",
      fontSize: "0.5rem", fontWeight: 700,
      letterSpacing: "0.22em", textTransform: "uppercase",
      color: isDark ? "#282828" : "#C0C0C0",
    }}>{txt}</span>
  );

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64, paddingBottom: 72,
      boxSizing: "border-box",
      background: c.bgAlt, display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative",
      transition: "background 0.4s",
    }}>
      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: c.noiseOp, mixBlendMode: c.noiseBlend,
      }} />

      <div style={{
        maxWidth: 920, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 64px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(24px, 3.5vh, 40px)",
      }}>

        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 20, height: "0.5px", background: c.eyebrow }} />
            {eyebrowLabel("Selected Work")}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: c.title, margin: 0 }}>Projects</h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 600, color: c.eyebrow, letterSpacing: "0.06em" }}>Focused executions</span>
          </div>
        </div>

        {/* ── Blueprint bento grid ── */}
        {/* Extra padding so outermost card corners aren't clipped */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(20px, 2.4vw, 28px)",
          padding: `${ARM_OUT + 2}px`,
        }}>

          {BENTO_PROJECTS.map((proj) => {
            const isHov = hovered === proj.id;
            const hasLink = !!proj.link;
            const isAward = !!proj.award;

            return (
              <motion.div
                key={proj.id}
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => hasLink && navigate(proj.link!)}
                animate={{ y: isHov ? -4 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  gridColumn: proj.colSpan ? `span ${proj.colSpan}` : "span 1",
                  position: "relative",
                  background: isHov ? cardHov : cardRest,
                  border: `1px solid ${isHov
                    ? (isDark ? "rgba(94,255,128,0.25)" : "rgba(26,122,50,0.22)")
                    : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")}`,
                  borderRadius: 0,
                  padding: "clamp(18px, 2.5vh, 26px) clamp(16px, 2vw, 24px)",
                  cursor: hasLink ? "pointer" : "default",
                  display: "flex", flexDirection: "column", gap: 10,
                  overflow: "visible",
                  transition: "background 0.4s ease, border-color 0.4s ease",
                }}
              >
                {/* ── Corner cross-lines — the blueprint touch ── */}
                <CardCorners isHov={isHov} isDark={isDark} />

                {/* ── Codex: minimal gold badge (top-right corner) ── */}
                {isAward && (
                  <div style={{
                    position: "absolute",
                    top: -1, right: 14,
                    background: isDark ? "rgba(255,213,79,0.12)" : "rgba(176,128,0,0.1)",
                    border: `1px solid ${isDark ? "rgba(255,213,79,0.3)" : "rgba(176,128,0,0.28)"}`,
                    color: isDark ? "#FFD54F" : "#9A6E00",
                    padding: "2px 8px",
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.42rem", fontWeight: 800,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    zIndex: 4,
                    transition: "opacity 0.3s",
                    opacity: isHov ? 1 : 0.75,
                  }}>{proj.award}</div>
                )}

                {/* Tag + Year */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: isAward ? 10 : 0,
                }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.48rem", fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: isHov ? tagTxtHov : tagTxt,
                    transition: "color 0.22s",
                  }}>{proj.tag}</span>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.54rem", fontWeight: 600,
                    color: yearTxt, fontVariantNumeric: "tabular-nums",
                  }}>{proj.year}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.86rem, 1.2vw, 1rem)",
                  fontWeight: 700, letterSpacing: "-0.015em",
                  color: titleTxt, margin: 0, lineHeight: 1.25,
                  flex: "0 0 auto",
                }}>{proj.title}</h3>

                {/* Description */}
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.68rem, 0.92vw, 0.76rem)",
                  lineHeight: 1.68, color: bodyTxt,
                  margin: 0, flex: 1, fontWeight: 500,
                }}>{proj.description}</p>

                {/* Footer: Case Study / NDA / View */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: `0.5px solid ${isHov ? divThin : "rgba(0,0,0,0)"}`,
                  paddingTop: isHov ? 10 : 0,
                  marginTop: 2,
                  transition: "border-color 0.22s, padding-top 0.22s",
                }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.48rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: isHov ? linkHov : linkTxt,
                    textDecoration: "none",
                    borderBottom: `0.5px solid ${isHov ? (isDark ? "rgba(94,255,128,0.4)" : "rgba(26,122,50,0.35)") : "transparent"}`,
                    transition: "color 0.22s, border-color 0.22s",
                  }}>
                    {hasLink ? "Case Study" : "NDA"}
                  </span>
                  <ArrowUpRight
                    size={11}
                    style={{
                      color: isHov ? linkHov : linkTxt,
                      transition: "color 0.22s",
                      opacity: hasLink ? 1 : 0.3,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* ── CTA card — full width, blueprint corners ── */}
          <motion.div
            onMouseEnter={() => setHovered(99)}
            onMouseLeave={() => setHovered(null)}
            animate={{ y: hovered === 99 ? -4 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              gridColumn: "span 3",
              position: "relative",
              background: hovered === 99 ? cardHov : cardRest,
              border: `1px solid ${hovered === 99
                ? (isDark ? "rgba(94,255,128,0.25)" : "rgba(26,122,50,0.22)")
                : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")}`,
              borderRadius: 0,
              padding: "clamp(16px, 2.2vh, 22px) clamp(18px, 2.2vw, 26px)",
              cursor: "pointer",
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              overflow: "visible",
              transition: "background 0.22s ease",
            }}
          >
            <CardCorners isHov={hovered === 99} isDark={isDark} />

            <div>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.84rem, 1.2vw, 1rem)",
                fontWeight: 700,
                color: hovered === 99 ? accent : titleTxt,
                margin: 0, letterSpacing: "-0.01em",
                transition: "color 0.22s",
              }}>There's more — visit the full archive</p>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.68rem", fontWeight: 500,
                color: bodyTxt, margin: "4px 0 0", lineHeight: 1.55,
              }}>
                AI SaaS Platform UX · AML Government System · UBIOX Brand Design · and more.
              </p>
            </div>

            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
              style={{ flexShrink: 0, marginLeft: 16 }}
            >
              <ArrowUpRight
                size={20}
                style={{
                  color: hovered === 99 ? accent : linkTxt,
                  transition: "color 0.22s",
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
