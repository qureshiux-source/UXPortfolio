import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const JOBS = [
  {
    id: "wired-hub",
    company: "Wired Hub",
    role: "Design Lead",
    period: "2023–Present",
    tag: "Current",
    checkpoints: [
      "Led design for 10+ Government & Real Estate products",
      "Enforced WCAG 2.1 AA across all digital touchpoints",
      "Built a multi-team component library from scratch",
      "Reduced design-to-dev handoff time by 40%",
    ],
    projects: [
      { title: "Gov Portal Redesign", tag: "Web App" },
      { title: "Real Estate Platform", tag: "Product" },
      { title: "Enterprise Design System", tag: "Design Ops" },
    ],
  },
  {
    id: "exclusive-digitals",
    company: "Exclusive Digitals",
    role: "Senior UI Designer",
    period: "2021–2023",
    tag: null,
    checkpoints: [
      "Managed design-to-dev handoff on 8 product releases",
      "Delivered QA across 4 major mobile and web launches",
      "Created a Figma token library adopted across 3 teams",
      "Cut revision cycles by 30% through design documentation",
    ],
    projects: [
      { title: "E-commerce UI Overhaul", tag: "Mobile" },
      { title: "Banking App Redesign", tag: "Finance" },
      { title: "Brand Design System", tag: "Design Ops" },
    ],
  },
  {
    id: "dcode-dynamics",
    company: "Dcode Dynamics",
    role: "UI/UX Designer",
    period: "2020–2021",
    tag: null,
    checkpoints: [
      "Built WCAG-aligned interfaces for 3 enterprise clients",
      "Conducted accessibility audits across 12 web properties",
      "Implemented full keyboard navigation across all products",
      "Completed screen reader testing and ARIA implementation",
    ],
    projects: [
      { title: "Accessibility Audit Tool", tag: "A11y" },
      { title: "Healthcare Web Portal", tag: "Healthcare" },
      { title: "Onboarding Flow Redesign", tag: "UX" },
    ],
  },
];

/* Chronological order for the timeline bar (oldest → newest) */
const TIMELINE = [
  { id: "dcode-dynamics",     label: "Dcode Dynamics",     from: "2020", to: "2021",    flex: 2 },
  { id: "exclusive-digitals", label: "Exclusive Digitals",  from: "2021", to: "2023",    flex: 4 },
  { id: "wired-hub",          label: "Wired Hub",           from: "2023", to: "Present", flex: 4 },
];

export function WorkExperience() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const [active, setActive] = useState(JOBS[0].id);
  const activeJob = JOBS.find(j => j.id === active)!;

  /* ── Refined palette ──────────────────────────────────────────── */
  const bg         = isDark ? "#0D0D0D" : "#F6F6F6";
  const eyebrow    = isDark ? "#767676" : "#5C5C5C";
  const titleClr   = isDark ? "#F0F0F0" : "#0A0A0A";

  /* Timeline bar */
  const tlActiveBg  = isDark ? "#FFFFFF" : "#0A0A0A";
  const tlActiveTxt = isDark ? "#000000" : "#FFFFFF";
  const tlGhostBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const tlGhostTxt  = isDark ? "#666666" : "#8A8A8A";
  const tlDot       = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";
  const tlMark      = isDark ? "#555555" : "#BBBBBB";

  /* Left stepper */
  const stepBg     = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)";
  const stepBdr    = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const activeBg   = isDark ? "#FFFFFF" : "#0A0A0A";
  const activeTxt  = isDark ? "#000000" : "#FFFFFF";
  const inactTxt   = isDark ? "#767676" : "#5C5C5C";
  const connLine   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  /* Right panel */
  const panelBg    = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)";
  const panelBdr   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const checkBg    = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.035)";
  const checkBdr   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)";
  const checkTxt   = isDark ? "#D8D8D8" : "#1A1A1A";
  const iconWrap   = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const tagBg      = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.055)";
  const tagTxt     = isDark ? "#8A8A8A" : "#525252";
  const miniCardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const miniCardBdr= isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
  const miniTitle  = isDark ? "#ECECEC" : "#0A0A0A";
  const divider    = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  /* ────────────────────────────────────────────────────────────── */

  return (
    <div
      style={{
        height: "100vh", background: bg,
        display: "flex", flexDirection: "column",
        justifyContent: "center", overflow: "hidden",
        position: "relative",
        transition: "background 0.4s",
      }}
    >
      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.05 : 0.022,
        mixBlendMode: "overlay" as const,
      }} />

      <div style={{
        maxWidth: 960, width: "100%", margin: "0 auto",
        padding: "0 clamp(20px, 4vw, 56px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(14px, 2vh, 22px)",
        height: "calc(100vh - 96px)", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 24, height: 1, background: eyebrow }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: eyebrow,
          }}>Experience</span>
        </div>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
          fontWeight: 800, letterSpacing: "-0.025em",
          color: titleClr, margin: 0, lineHeight: 1.1,
        }}>
          Where I've Led
        </h2>

        {/* ── Career Timeline Bar ─────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {/* Segments */}
          <div style={{ display: "flex", gap: 3, height: 36, borderRadius: 10, overflow: "hidden" }}>
            {TIMELINE.map((seg) => {
              const isActive = seg.id === active;
              return (
                <button
                  key={seg.id}
                  onClick={() => setActive(seg.id)}
                  style={{
                    all: "unset",
                    flex: seg.flex,
                    cursor: "pointer",
                    background: isActive ? tlActiveBg : tlGhostBg,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    padding: "4px 10px",
                    borderRadius: 8,
                    transition: "background 0.2s",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Checkpoint dot */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    display: "flex", justifyContent: "space-between",
                    padding: "0 1px",
                  }}>
                    <div style={{ width: 1, height: 4, background: isActive ? (isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)") : tlDot }} />
                    <div style={{ width: 1, height: 4, background: isActive ? (isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)") : tlDot }} />
                  </div>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(0.6rem, 0.85vw, 0.72rem)",
                    fontWeight: 700, letterSpacing: "-0.01em",
                    color: isActive ? tlActiveTxt : tlGhostTxt,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}>
                    {seg.label}
                  </span>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.55rem", fontWeight: 600,
                    color: isActive ? (isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)") : "transparent",
                    letterSpacing: "0.02em",
                  }}>
                    {seg.from} – {seg.to}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Milestone markers */}
          <div style={{ display: "flex", paddingLeft: 0 }}>
            {TIMELINE.map((seg, i) => (
              <div key={seg.id} style={{
                flex: seg.flex,
                display: "flex",
                justifyContent: i === TIMELINE.length - 1 ? "space-between" : "flex-start",
                gap: 0,
              }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.52rem", fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: tlMark,
                }}>
                  {seg.from}
                </span>
                {i === TIMELINE.length - 1 && (
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.52rem", fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: tlMark,
                  }}>{seg.to}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Dashboard 2-column ──────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "27% 1fr",
          gap: "clamp(12px, 1.8vw, 20px)",
          flex: 1, minHeight: 0,
        }}>
          {/* LEFT — compact stepper */}
          <div style={{
            background: stepBg, border: `1px solid ${stepBdr}`,
            borderRadius: 16,
            padding: "clamp(12px, 1.8vh, 18px) clamp(10px, 1.2vw, 16px)",
            display: "flex", flexDirection: "column", gap: 0,
            overflow: "hidden",
            boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.35)" : "0 4px 20px rgba(0,0,0,0.05)",
          }}>
            {JOBS.map((job, idx) => {
              const isActive = job.id === active;
              return (
                <div key={job.id} style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => setActive(job.id)}
                    style={{
                      all: "unset", cursor: "pointer",
                      padding: "clamp(8px, 1.4vh, 13px) clamp(8px, 1vw, 12px)",
                      borderRadius: 10,
                      background: isActive ? activeBg : "transparent",
                      transition: "background 0.2s",
                      display: "flex", flexDirection: "column", gap: 3,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {job.tag && (
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.5rem", fontWeight: 700,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "2px 6px", borderRadius: 100,
                          background: isActive ? "rgba(255,255,255,0.15)" : tagBg,
                          color: isActive ? tlActiveTxt : tagTxt,
                        }}>{job.tag}</span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(0.75rem, 1vw, 0.88rem)",
                      fontWeight: 700, letterSpacing: "-0.01em",
                      color: isActive ? activeTxt : inactTxt,
                      lineHeight: 1.2,
                    }}>{job.company}</span>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.62rem", fontWeight: 600,
                      color: isActive
                        ? (isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)")
                        : eyebrow,
                    }}>{job.period}</span>
                  </button>
                  {idx < JOBS.length - 1 && (
                    <div style={{ width: 1, height: "clamp(8px, 1.2vh, 14px)", background: connLine, margin: "0 auto" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT — animated content */}
          <div style={{
            background: panelBg, border: `1px solid ${panelBdr}`,
            borderRadius: 16,
            padding: "clamp(14px, 2.2vh, 24px) clamp(14px, 2vw, 24px)",
            display: "flex", flexDirection: "column",
            gap: "clamp(12px, 1.8vh, 18px)", overflow: "hidden",
            boxShadow: isDark ? "0 4px 28px rgba(0,0,0,0.4)" : "0 4px 28px rgba(0,0,0,0.07)",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.8vh, 18px)", height: "100%" }}
              >
                {/* Role header */}
                <div>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1rem, 1.7vw, 1.3rem)",
                    fontWeight: 800, letterSpacing: "-0.02em",
                    color: titleClr, margin: "0 0 2px",
                  }}>{activeJob.role}</h3>
                  <p style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.72rem", fontWeight: 600,
                    color: eyebrow, margin: 0,
                  }}>{activeJob.company} · {activeJob.period}</p>
                </div>

                <div style={{ height: 1, background: divider }} />

                {/* Impact Checkpoints — 2×2 */}
                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.56rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: eyebrow, display: "block", marginBottom: 8,
                  }}>Impact Checkpoints</span>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(6px, 1vw, 10px)",
                  }}>
                    {activeJob.checkpoints.map((cp, i) => (
                      <motion.div
                        key={cp}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        style={{
                          background: checkBg, border: `1px solid ${checkBdr}`,
                          borderRadius: 10,
                          padding: "clamp(8px, 1.3vh, 12px) clamp(8px, 1vw, 12px)",
                          display: "flex", alignItems: "flex-start", gap: 8,
                        }}
                      >
                        <div style={{
                          width: 16, height: 16, borderRadius: 5,
                          background: iconWrap,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: 1,
                        }}>
                          <Check size={9} style={{ color: isDark ? "#F0F0F0" : "#0A0A0A" }} strokeWidth={3} />
                        </div>
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "clamp(0.68rem, 0.95vw, 0.76rem)",
                          fontWeight: 600, lineHeight: 1.5,
                          color: checkTxt,
                        }}>{cp}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Project Mini-Grid */}
                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.56rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: eyebrow, display: "block", marginBottom: 8,
                  }}>Projects</span>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "clamp(6px, 1vw, 10px)",
                  }}>
                    {activeJob.projects.map((proj, i) => (
                      <motion.div
                        key={proj.title}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.12 + i * 0.06 }}
                        style={{
                          background: miniCardBg, border: `1px solid ${miniCardBdr}`,
                          borderRadius: 10,
                          padding: "clamp(8px, 1.3vh, 12px) clamp(8px, 1vw, 12px)",
                          display: "flex", flexDirection: "column", gap: 6,
                          cursor: "pointer",
                        }}
                      >
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.52rem", fontWeight: 700,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "2px 6px", borderRadius: 100,
                          background: tagBg, color: tagTxt, width: "fit-content",
                        }}>{proj.tag}</span>
                        <span style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "clamp(0.68rem, 0.95vw, 0.78rem)",
                          fontWeight: 700, letterSpacing: "-0.01em",
                          color: miniTitle, lineHeight: 1.25,
                        }}>{proj.title}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: "auto" }}>
                          <span style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: "0.55rem", fontWeight: 700,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            color: eyebrow,
                          }}>View Case Study</span>
                          <ArrowUpRight size={9} style={{ color: eyebrow }} />
                        </div>
                      </motion.div>
                    ))}
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
