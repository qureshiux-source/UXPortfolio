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

export function WorkExperience() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const [active, setActive] = useState(JOBS[0].id);
  const activeJob = JOBS.find(j => j.id === active)!;

  /* ── Palette ────────────────────────────────────── */
  const bg          = isDark ? "#0D0D0D" : "#F6F6F6";
  const eyebrow     = isDark ? "#6A6A6A" : "#606060";
  const titleClr    = isDark ? "#F0F0F0" : "#0A0A0A";
  const divider     = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";

  /* Vertical dot-line timeline */
  const dotActive   = isDark ? "#FFFFFF" : "#0A0A0A";
  const dotBorder   = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)";
  const lineClr     = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const activeTxt   = isDark ? "#F0F0F0" : "#0A0A0A";
  const inactTxt    = isDark ? "#5A5A5A" : "#9A9A9A";
  const inactSub    = isDark ? "#444444" : "#BBBBBB";
  const tagBg       = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.055)";
  const tagTxt      = isDark ? "#7A7A7A" : "#606060";

  /* Right content */
  const checkTxt    = isDark ? "#C8C8C8" : "#1A1A1A";
  const checkIcon   = isDark ? "#FFFFFF" : "#0A0A0A";
  const projTitle   = isDark ? "#E8E8E8" : "#0A0A0A";
  const projSep     = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  /* ─────────────────────────────────────────────── */

  return (
    <div
      style={{
        height: "100vh", background: bg,
        display: "flex", flexDirection: "column",
        justifyContent: "center", overflow: "hidden",
        position: "relative", transition: "background 0.4s",
      }}
    >
      {/* Noise layer */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.05 : 0.022,
        mixBlendMode: "overlay" as const,
      }} />

      <div style={{
        maxWidth: 960, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 64px)",
        display: "flex", flexDirection: "column",
        gap: "clamp(16px, 2.5vh, 26px)",
        height: "calc(100vh - 80px)", justifyContent: "center",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Header ───────────────────────────────── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.59rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrow,
            }}>Experience</span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
            fontWeight: 800, letterSpacing: "-0.025em",
            color: titleClr, margin: 0, lineHeight: 1.1,
          }}>Where I've Led</h2>
        </div>

        {/* ── Two-column: Dot Timeline + Open Content ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "clamp(160px, 22%, 220px) 1fr",
          gap: "clamp(24px, 4vw, 56px)",
          flex: 1, minHeight: 0, alignItems: "start",
          paddingTop: 8,
        }}>

          {/* LEFT — Vertical dot+line timeline (no box) */}
          <div style={{ position: "relative", paddingTop: 4 }}>
            {/* Connecting line */}
            <div style={{
              position: "absolute",
              left: 5,
              top: 10,
              bottom: 10,
              width: 1,
              background: lineClr,
            }} />

            {JOBS.map((job, idx) => {
              const isActive = job.id === active;
              return (
                <button
                  key={job.id}
                  onClick={() => setActive(job.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    width: "100%",
                    paddingBottom: idx < JOBS.length - 1 ? "clamp(22px, 3.5vh, 38px)" : 0,
                    position: "relative",
                  }}
                >
                  {/* Dot */}
                  <div style={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginTop: isActive ? 3 : 5,
                    marginLeft: isActive ? 0 : 2,
                    background: isActive ? dotActive : "transparent",
                    border: isActive ? "none" : `1.5px solid ${dotBorder}`,
                    boxShadow: isActive
                      ? (isDark ? "0 0 0 3px rgba(255,255,255,0.1)" : "0 0 0 3px rgba(0,0,0,0.08)")
                      : "none",
                    transition: "all 0.22s ease",
                    position: "relative", zIndex: 1,
                  }} />

                  {/* Label */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {job.tag && (
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.5rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        color: isDark ? "#5EFF80" : "#1A7A32",
                        marginBottom: 1,
                      }}>{job.tag}</span>
                    )}
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(0.78rem, 1.05vw, 0.9rem)",
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: "-0.01em",
                      color: isActive ? activeTxt : inactTxt,
                      lineHeight: 1.2,
                      transition: "color 0.2s",
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

          {/* RIGHT — Open editorial content (no box) */}
          <div style={{
            borderLeft: `1px solid ${divider}`,
            paddingLeft: "clamp(20px, 3vw, 36px)",
            overflow: "hidden",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2.2vh, 20px)" }}
              >
                {/* Role + meta */}
                <div>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 800, letterSpacing: "-0.022em",
                    color: titleClr, margin: "0 0 4px",
                    lineHeight: 1.1,
                  }}>{activeJob.role}</h3>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.72rem", fontWeight: 600,
                    color: eyebrow,
                  }}>{activeJob.company} · {activeJob.period}</span>
                </div>

                {/* Separator */}
                <div style={{ height: 1, background: divider }} />

                {/* Impact Checkpoints — flat list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: eyebrow, marginBottom: 10, display: "block",
                  }}>Impact Checkpoints</span>
                  {activeJob.checkpoints.map((cp, i) => (
                    <motion.div
                      key={cp}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.055 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "clamp(6px, 1vh, 9px) 0",
                        borderBottom: i < activeJob.checkpoints.length - 1
                          ? `1px solid ${projSep}` : "none",
                      }}
                    >
                      <div style={{
                        width: 15, height: 15,
                        borderRadius: "50%",
                        background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.055)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 1,
                      }}>
                        <Check size={8} style={{ color: checkIcon }} strokeWidth={3} />
                      </div>
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "clamp(0.72rem, 1vw, 0.8rem)",
                        fontWeight: 600, lineHeight: 1.55,
                        color: checkTxt,
                      }}>{cp}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Separator */}
                <div style={{ height: 1, background: divider }} />

                {/* Projects — flat rows */}
                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: eyebrow, marginBottom: 10, display: "block",
                  }}>Projects</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {activeJob.projects.map((proj, i) => (
                      <motion.div
                        key={proj.title}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 + i * 0.06 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "clamp(7px, 1.1vh, 10px) 0",
                          borderBottom: i < activeJob.projects.length - 1
                            ? `1px solid ${projSep}` : "none",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: "0.52rem", fontWeight: 700,
                            letterSpacing: "0.1em", textTransform: "uppercase",
                            padding: "2px 7px", borderRadius: 100,
                            background: tagBg, color: tagTxt,
                            flexShrink: 0,
                          }}>{proj.tag}</span>
                          <span style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                            fontWeight: 600, letterSpacing: "-0.01em",
                            color: projTitle,
                          }}>{proj.title}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                          <span style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: "0.55rem", fontWeight: 700,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            color: eyebrow,
                          }}>Case Study</span>
                          <ArrowUpRight size={10} style={{ color: eyebrow }} />
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
