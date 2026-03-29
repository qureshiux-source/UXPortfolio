import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { useTourHighlight } from "@/contexts/TourContext";
import { useLocation } from "wouter";

const HIGHLIGHT_TO_JOB: Record<string, string> = {
  "work-wired-hub": "wired-hub",
  "work-exclusive": "exclusive-digitals",
  "work-dcode":     "freelance",
};

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const JOBS = [
  {
    id: "wired-hub",
    company: "Wired Hub",
    companyColor: "#00B4D8",
    role: "UI/UX Design Lead",
    period: "Apr 2025 – Present",
    tag: "Current",
    checkpoints: [
      "Led UX & UI for real estate platforms, a major AI SaaS, and UAE government AML systems",
      "Produced moodboards, lo-fi wireframes, hi-fi prototypes, and detailed user journeys",
      "Built scalable design systems with components, tokens, variants, and documentation",
      "Applied WCAG accessibility standards — improving contrast, readability, and interaction feedback",
    ],
    projects: [
      { title: "Dubai Dunes Redesign",  tag: "Real Estate",    link: "/case-study/dubai-dunes" },
      { title: "AI SaaS Platform UX",   tag: "AI Product",     link: null },
      { title: "AML Government System", tag: "Gov / Compliance", link: null },
    ],
  },
  {
    id: "exclusive-digitals",
    company: "Exclusive Digitals",
    companyColor: "#9B5DE5",
    role: "Product Designer (UI/UX)",
    period: "Sep 2024 – Apr 2025",
    tag: null,
    checkpoints: [
      "Sole product designer for a complete streaming platform ecosystem, end-to-end",
      "Built a scalable design system ensuring UI consistency across the full product",
      "Collaborated closely with developers for smooth handoff and pixel-accurate implementation",
      "Performed competitor research and iterated designs based on client feedback and testing",
    ],
    projects: [
      { title: "Streaming Platform",      tag: "Product",    link: null },
      { title: "Platform Design System",  tag: "Design Ops", link: null },
      { title: "User Onboarding Flow",    tag: "UX",         link: null },
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    companyColor: null,
    role: "UI/UX Designer",
    period: "2024",
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
  const [, navigate] = useLocation();
  const activeJob = JOBS.find(j => j.id === active)!;

  const highlight = useTourHighlight();
  const tourWork  = !!(highlight && HIGHLIGHT_TO_JOB[highlight]);
  useEffect(() => {
    if (highlight && HIGHLIGHT_TO_JOB[highlight]) setActive(HIGHLIGHT_TO_JOB[highlight]);
  }, [highlight]);

  const bg        = isDark ? "#030303" : "#FFFFFF";
  const eyebrow   = isDark ? "#606060" : "#707070";
  const titleClr  = isDark ? "#F5F5F5" : "#080808";
  const divider   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const dotActive  = isDark ? "#FFFFFF" : "#050505";
  const dotBorder  = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const lineClr    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const activeTxt  = isDark ? "#F5F5F5" : "#080808";
  const inactTxt   = isDark ? "#484848" : "#B0B0B0";
  const inactSub   = isDark ? "#353535" : "#C8C8C8";
  const tagBg      = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const tagTxt     = isDark ? "#686868" : "#686868";
  const checkTxt  = isDark ? "#C0C0C0" : "#181818";
  const checkIcon = isDark ? "#F0F0F0" : "#080808";
  const projTitle = isDark ? "#E8E8E8" : "#080808";
  const projSep   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const linkHover = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";

  return (
    <div style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: bg,
      display: "flex", flexDirection: "column",
      justifyContent: "center", overflow: "hidden",
      position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.09,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />
      <div style={{
        maxWidth: 960, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 64px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(16px, 2.5vh, 26px)",
        position: "relative", zIndex: 1,
      }}>

        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.59rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow,
            }}>Experience</span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
            fontWeight: 800, letterSpacing: "-0.025em",
            color: titleClr, margin: 0, lineHeight: 1.1,
          }}>Where I've Led</h2>
        </div>

        {/* Two-column */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "clamp(160px, 22%, 220px) 1fr",
          gap: "clamp(24px, 4vw, 56px)",
          alignItems: "start", paddingTop: 8,
        }}>

          {/* LEFT */}
          <div style={{ position: "relative", paddingTop: 4 }}>
            <div style={{ position: "absolute", left: 5, top: 10, bottom: 10, width: 1, background: lineClr }} />
            {JOBS.map((job, idx) => {
              const isActive = job.id === active;
              const isTourHighlighted = tourWork && isActive;
              const isTourDimmed      = tourWork && !isActive;
              return (
                <button key={job.id} onClick={() => setActive(job.id)} style={{
                  all: "unset", cursor: "pointer",
                  display: "flex", alignItems: "flex-start", gap: 16, width: "100%",
                  paddingBottom: idx < JOBS.length - 1 ? "clamp(22px, 3.5vh, 38px)" : 0,
                  position: "relative",
                  opacity: isTourDimmed ? 0.28 : 1,
                  transition: "opacity 0.3s ease",
                }}>
                  <div style={{
                    width: isActive ? 12 : 8, height: isActive ? 12 : 8,
                    borderRadius: "50%", flexShrink: 0,
                    marginTop: isActive ? 3 : 5, marginLeft: isActive ? 0 : 2,
                    background: isActive ? dotActive : "transparent",
                    border: isActive ? "none" : `1.5px solid ${dotBorder}`,
                    boxShadow: isActive
                      ? (isDark ? "0 0 0 3px rgba(255,255,255,0.08)" : "0 0 0 3px rgba(0,0,0,0.06)")
                      : "none",
                    transition: "all 0.22s ease",
                    position: "relative", zIndex: 1,
                  }}>
                    {isTourHighlighted && (
                      <motion.div
                        style={{ position: "absolute", inset: -6, borderRadius: "50%", border: `1.5px solid ${dotActive}`, pointerEvents: "none" }}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {job.tag && (
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.5rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: isDark ? "#5EFF80" : "#1A7A32", marginBottom: 1,
                      }}>{job.tag}</span>
                    )}
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(0.78rem, 1.05vw, 0.9rem)",
                      fontWeight: isActive ? 700 : 400,
                      letterSpacing: "-0.01em",
                      color: isActive
                        ? (job.companyColor || activeTxt)
                        : inactTxt,
                      lineHeight: 1.2, transition: "color 0.2s",
                    }}>{job.company}</span>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.6rem", fontWeight: 600,
                      color: isActive ? eyebrow : inactSub,
                      transition: "color 0.2s",
                    }}>{job.period}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT */}
          <div style={{ borderLeft: `1px solid ${divider}`, paddingLeft: "clamp(20px, 3vw, 36px)", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2.2vh, 20px)" }}
              >
                <div>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 800, letterSpacing: "-0.022em",
                    color: titleClr, margin: "0 0 4px", lineHeight: 1.1,
                  }}>{activeJob.role}</h3>
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: eyebrow }}>
                    <span style={{ color: activeJob.companyColor || eyebrow }}>{activeJob.company}</span>
                    {" · "}{activeJob.period}
                  </span>
                </div>

                <div style={{ height: 1, background: divider }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase", color: eyebrow,
                    marginBottom: 10, display: "block",
                  }}>Impact Checkpoints</span>
                  {activeJob.checkpoints.map((cp, i) => (
                    <motion.div
                      key={cp}
                      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.055 }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 10,
                        padding: "clamp(6px, 1vh, 9px) 0",
                        borderBottom: i < activeJob.checkpoints.length - 1 ? `1px solid ${projSep}` : "none",
                      }}
                    >
                      <div style={{
                        width: 15, height: 15, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                        background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Check size={8} style={{ color: checkIcon }} strokeWidth={3} />
                      </div>
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "clamp(0.72rem, 1vw, 0.8rem)",
                        fontWeight: 600, lineHeight: 1.55, color: checkTxt,
                      }}>{cp}</span>
                    </motion.div>
                  ))}
                </div>

                <div style={{ height: 1, background: divider }} />

                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase", color: eyebrow,
                    marginBottom: 10, display: "block",
                  }}>Projects</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {activeJob.projects.map((proj, i) => {
                      const hasLink = !!proj.link;
                      return (
                        <motion.div
                          key={proj.title}
                          initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.15 + i * 0.06 }}
                          onClick={() => hasLink && navigate(proj.link!)}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "clamp(7px, 1.1vh, 10px) 8px",
                            borderRadius: 6,
                            borderBottom: i < activeJob.projects.length - 1 ? `1px solid ${projSep}` : "none",
                            cursor: hasLink ? "pointer" : "default",
                            transition: "background 0.18s",
                            background: "transparent",
                          }}
                          whileHover={hasLink ? { backgroundColor: linkHover } : {}}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{
                              fontFamily: "'Raleway', sans-serif", fontSize: "0.52rem", fontWeight: 700,
                              letterSpacing: "0.1em", textTransform: "uppercase",
                              padding: "2px 7px", borderRadius: 100,
                              background: tagBg, color: tagTxt, flexShrink: 0,
                            }}>{proj.tag}</span>
                            <span style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                              fontWeight: 600, letterSpacing: "-0.01em", color: projTitle,
                            }}>{proj.title}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, opacity: hasLink ? 1 : 0.3 }}>
                            <span style={{
                              fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", fontWeight: 700,
                              letterSpacing: "0.06em", textTransform: "uppercase", color: eyebrow,
                            }}>{hasLink ? "Case Study" : "NDA"}</span>
                            <ArrowUpRight size={10} style={{ color: eyebrow }} />
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
