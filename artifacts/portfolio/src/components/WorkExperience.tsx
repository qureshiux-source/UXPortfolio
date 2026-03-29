import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useTourHighlight } from "@/contexts/TourContext";
import { useLocation } from "wouter";

const HIGHLIGHT_TO_JOB: Record<string, string> = {
  "work-wired-hub":  "wired-hub",
  "work-exclusive":  "exclusive-digitals",
  "work-dcode":      "freelance",
};

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1];

const JOBS = [
  {
    id: "wired-hub",
    company: "Wired Hub",
    isCurrent: true,
    role: "UI/UX Design Lead",
    period: "Apr 2025 – Present",
    location: "Remote · Ontario, Canada",
    tag: "Current",
    checkpoints: [
      "Led UX & UI for real estate platforms, a major AI SaaS, and UAE government AML systems",
      "Produced moodboards, lo-fi wireframes, hi-fi prototypes, and detailed user journeys",
      "Built scalable design systems with components, tokens, variants, and documentation",
      "Applied WCAG accessibility standards — improving contrast, readability, and interaction feedback",
    ],
    projects: [
      { title: "Dubai Dunes Redesign",  tag: "Real Estate",     link: "/case-study/dubai-dunes" },
      { title: "AI SaaS Platform UX",   tag: "AI Product",      link: null },
      { title: "AML Government System", tag: "Gov / Compliance", link: null },
    ],
  },
  {
    id: "exclusive-digitals",
    company: "Exclusive Digitals",
    isCurrent: false,
    role: "Product Designer (UI/UX)",
    period: "Sep 2024 – Apr 2025",
    location: "Remote",
    tag: null,
    checkpoints: [
      "Sole product designer for a complete streaming platform ecosystem, end-to-end",
      "Built a scalable design system ensuring UI consistency across the full product",
      "Collaborated closely with developers for smooth handoff and pixel-accurate implementation",
      "Performed competitor research and iterated designs based on client feedback and testing",
    ],
    projects: [
      { title: "Streaming Platform",     tag: "Product",    link: null },
      { title: "Platform Design System", tag: "Design Ops", link: null },
      { title: "User Onboarding Flow",   tag: "UX",         link: null },
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    isCurrent: false,
    role: "UI/UX Designer",
    period: "2024",
    location: "Remote",
    tag: null,
    checkpoints: [
      "Redesigned Verified by Tenants — improved IA, readability, and accessibility",
      "Designed UBIOX landing page integrating mission, services, and brand narrative",
      "Rebuilt the NSW mobile app from scratch with a full design system and prototype",
      "Delivered complete cycles: requirement gathering → design → prototype → iteration",
    ],
    projects: [
      { title: "Verified by Tenants", tag: "Web",    link: null },
      { title: "UBIOX Landing Page",  tag: "Web",    link: null },
      { title: "NSW Mobile App",      tag: "Mobile", link: null },
    ],
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

export function WorkExperience() {
  const isDark = useDark();
  const [active, setActive] = useState(JOBS[0].id);
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);
  const [, navigate] = useLocation();
  const activeJob = JOBS.find(j => j.id === active)!;

  const highlight = useTourHighlight();
  const tourWork  = !!(highlight && HIGHLIGHT_TO_JOB[highlight]);
  useEffect(() => {
    if (highlight && HIGHLIGHT_TO_JOB[highlight]) setActive(HIGHLIGHT_TO_JOB[highlight]);
  }, [highlight]);

  /* ── Tokens ── */
  const bg         = isDark ? "#030303" : "#F5F4F2";
  const eyebrow    = isDark ? "#444444" : "#8A8A8A";
  const titleClr   = isDark ? "#F0F0F0" : "#080808";
  const green      = isDark ? "#5EFF80" : "#1A7A32";
  const divider    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";

  /* Timeline */
  const timelineClr = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.12)";
  const inactDotBdr = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)";
  const activeNameClr   = isDark ? "#E8E8E8" : "#0A0A0A";
  const inactNameClr    = isDark ? "#2C2C2C" : "#8A8A8A";
  const inactPeriodClr  = isDark ? "#1E1E1E" : "#B0B0B0";
  const activePeriodClr = isDark ? "#383838" : "#6A6A6A";

  /* Right panel */
  const checkTxt   = isDark ? "#B0B0B0" : "#282828";
  const projTitle  = isDark ? "#E0E0E0" : "#0A0A0A";
  const projSep    = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)";
  const tagTxt     = isDark ? "#484848" : "#6A6A6A";
  const tagBdr     = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)";

  /* Row spacing between jobs in left nav */
  const ROW_GAP = "clamp(26px, 4.2vh, 44px)";

  return (
    <div style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: bg, display: "flex", flexDirection: "column",
      justifyContent: "center", overflow: "hidden",
      position: "relative", transition: "background 0.4s",
    }}>
      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.09,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
        zIndex: 0,
      }} />

      <div style={{
        maxWidth: 960, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 64px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(18px, 2.8vh, 26px)",
        position: "relative", zIndex: 1,
      }}>

        {/* Section header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
            <div style={{ width: 20, height: "0.5px", background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.54rem", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: eyebrow,
            }}>Experience</span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)",
            fontWeight: 800, letterSpacing: "-0.025em",
            color: titleClr, margin: 0, lineHeight: 1.1,
          }}>Where I've Led</h2>
        </div>

        {/* Two-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "clamp(140px, 19%, 190px) 1fr",
          gap: "clamp(32px, 5.5vw, 70px)",
          alignItems: "start",
        }}>

          {/* ── LEFT — Geometric timeline ── */}
          <div style={{ position: "relative" }}>

            {/* Vertical axis line — 0.5px, white/10 */}
            <div style={{
              position: "absolute",
              /* center it on the marker X */
              left: 0,
              top: 8, bottom: 8,
              width: "0.5px",
              background: timelineClr,
            }} />

            {JOBS.map((job, idx) => {
              const isActive = job.id === active;
              const isTourDim = tourWork && !isActive;

              const isHovJob = hoveredJob === job.id;
              return (
                <button
                  key={job.id}
                  onClick={() => setActive(job.id)}
                  onMouseEnter={() => setHoveredJob(job.id)}
                  onMouseLeave={() => setHoveredJob(null)}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "block",
                    width: "100%",
                    paddingLeft: 20,
                    paddingBottom: idx < JOBS.length - 1 ? ROW_GAP : 0,
                    position: "relative",
                    opacity: isTourDim ? 0.2 : 1,
                    transition: "opacity 0.3s",
                  }}
                >
                  {/* ── Marker: 12px solid green circle (active) / 8px hollow outline (inactive) ── */}
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: isActive ? 6 : 7,
                    transform: "translateX(-50%)",
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    borderRadius: "50%",
                    background: isActive ? green : "transparent",
                    border: isActive ? "none" : `1.5px solid ${inactDotBdr}`,
                    transition: "all 0.3s ease",
                    pointerEvents: "none",
                  }} />

                  {/* Company data */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {job.tag && (
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.44rem", fontWeight: 700,
                        letterSpacing: "0.12em", textTransform: "uppercase",
                        color: green, marginBottom: 1,
                      }}>{job.tag}</span>
                    )}
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(0.76rem, 1vw, 0.86rem)",
                      fontWeight: isActive ? 700 : 400,
                      letterSpacing: "-0.01em",
                      color: (isActive || isHovJob) ? green : inactNameClr,
                      lineHeight: 1.2,
                      transition: "color 0.3s ease",
                    }}>{job.company}</span>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.54rem", fontWeight: 600,
                      color: isActive ? activePeriodClr : inactPeriodClr,
                      transition: "color 0.3s ease",
                    }}>{job.period}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT — Open, no cards, thin line separators ── */}
          <div style={{
            borderLeft: `0.5px solid ${divider}`,
            paddingLeft: "clamp(22px, 3.5vw, 44px)",
            overflow: "hidden",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vh, 20px)" }}
              >
                {/* Role + Meta — floating, no card */}
                <div>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1rem, 1.7vw, 1.3rem)",
                    fontWeight: 800, letterSpacing: "-0.022em",
                    color: titleClr, margin: "0 0 5px", lineHeight: 1.1,
                  }}>{activeJob.role}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.68rem", fontWeight: 700,
                      color: activeJob.isCurrent ? green : eyebrow,
                    }}>{activeJob.company}</span>
                    <div style={{ width: "0.5px", height: 10, background: divider }} />
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.62rem", fontWeight: 600, color: eyebrow,
                    }}>{activeJob.period}</span>
                    <div style={{ width: "0.5px", height: 10, background: divider }} />
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.58rem", fontWeight: 500,
                      color: isDark ? "#2E2E2E" : "#C0C0C0",
                    }}>{activeJob.location}</span>
                  </div>
                </div>

                {/* Thin separator */}
                <div style={{ height: "0.5px", background: divider }} />

                {/* ── Impact Checkpoints — slide from left ── */}
                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.5rem", fontWeight: 700,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: isDark ? "#282828" : "#C8C8C8",
                    marginBottom: 10, display: "block",
                  }}>Impact Checkpoints</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {activeJob.checkpoints.map((cp, i) => (
                      <motion.div
                        key={cp}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: 12,
                          padding: "clamp(6px, 1vh, 9px) 0",
                          borderBottom: i < activeJob.checkpoints.length - 1
                            ? `0.5px solid ${divider}` : "none",
                        }}
                      >
                        {/* Axis-style marker instead of circle */}
                        <div style={{
                          display: "flex", alignItems: "center", justifyContent: "center",
                          width: 12, height: 12, flexShrink: 0, marginTop: 2,
                        }}>
                          <Plus
                            size={9}
                            strokeWidth={1.5}
                            style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.22)" }}
                          />
                        </div>
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "clamp(0.7rem, 0.98vw, 0.78rem)",
                          fontWeight: 600, lineHeight: 1.6, color: checkTxt,
                        }}>{cp}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Thin separator */}
                <div style={{ height: "0.5px", background: divider }} />

                {/* ── Projects — floating rows ── */}
                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.5rem", fontWeight: 700,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: isDark ? "#282828" : "#C8C8C8",
                    marginBottom: 8, display: "block",
                  }}>Projects</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {activeJob.projects.map((proj, i) => {
                      const hasLink = !!proj.link;
                      return (
                        <motion.div
                          key={proj.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.07 }}
                          onClick={() => hasLink && navigate(proj.link!)}
                          style={{
                            display: "flex", alignItems: "center",
                            justifyContent: "space-between",
                            padding: "clamp(6px, 1vh, 9px) 0",
                            borderBottom: i < activeJob.projects.length - 1
                              ? `0.5px solid ${projSep}` : "none",
                            cursor: hasLink ? "pointer" : "default",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {/* Tag — borderless, bare text */}
                            <span style={{
                              fontFamily: "'Raleway', sans-serif",
                              fontSize: "0.46rem", fontWeight: 700,
                              letterSpacing: "0.14em", textTransform: "uppercase",
                              color: tagTxt,
                              paddingRight: 8,
                              borderRight: `0.5px solid ${tagBdr}`,
                            }}>{proj.tag}</span>
                            <span style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: "clamp(0.7rem, 0.98vw, 0.8rem)",
                              fontWeight: 600, letterSpacing: "-0.01em",
                              color: projTitle,
                            }}>{proj.title}</span>
                          </div>
                          <div style={{
                            display: "flex", alignItems: "center", gap: 4,
                            flexShrink: 0, opacity: hasLink ? 1 : 0.25,
                          }}>
                            <span style={{
                              fontFamily: "'Raleway', sans-serif",
                              fontSize: "0.5rem", fontWeight: 700,
                              letterSpacing: "0.08em", textTransform: "uppercase",
                              color: hasLink ? green : eyebrow,
                            }}>{hasLink ? "Case Study" : "NDA"}</span>
                            <ArrowUpRight size={9} style={{ color: hasLink ? green : eyebrow }} />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
