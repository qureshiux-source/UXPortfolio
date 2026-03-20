import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

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

  const bg          = isDark ? "linear-gradient(135deg, #111111 0%, #090909 100%)" : "linear-gradient(135deg, #F7F7F7 0%, #EEEEEE 100%)";
  const eyebrow     = isDark ? "#848484" : "#595959";
  const titleClr    = isDark ? "#FAFAFA" : "#0A0A0A";
  const stepperBg   = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const stepperBdr  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const activeBg    = isDark ? "#FAFAFA" : "#0A0A0A";
  const activeTxt   = isDark ? "#0A0A0A" : "#FAFAFA";
  const inactiveTxt = isDark ? "#848484" : "#595959";
  const inactiveSub = isDark ? "#6E6E6E" : "#737373";
  const connLine    = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const rightBg     = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)";
  const rightBdr    = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const checkBg     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const checkBdr    = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const checkTxt    = isDark ? "#D0D0D0" : "#1A1A1A";
  const iconClr     = isDark ? "#FAFAFA" : "#0A0A0A";
  const tagBg       = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const tagTxt      = isDark ? "#9A9A9A" : "#4D4D4D";
  const miniCardBg  = isDark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.025)";
  const miniCardBdr = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const miniTitle   = isDark ? "#EFEFEF" : "#0A0A0A";
  const divider     = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const noiseOp     = isDark ? 0.055 : 0.025;

  return (
    <div
      className="transition-colors duration-500"
      style={{
        height: "100vh",
        background: bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: NOISE_SVG,
        backgroundSize: "160px 160px",
        opacity: noiseOp,
        mixBlendMode: "overlay",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark
          ? "radial-gradient(ellipse 55% 55% at 20% 80%, rgba(255,255,255,0.014) 0%, transparent 65%)"
          : "radial-gradient(ellipse 55% 55% at 20% 80%, rgba(0,0,0,0.018) 0%, transparent 65%)",
      }} />

      <div style={{
        maxWidth: 940,
        width: "100%",
        margin: "0 auto",
        padding: "0 clamp(20px, 4vw, 60px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 2.5vh, 24px)",
        height: "calc(100vh - 112px)",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 28, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrow,
            }}>
              Experience
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: titleClr, margin: 0,
          }}>
            Where I've Led
          </h2>
        </div>

        {/* Dashboard */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "28% 1fr",
          gap: "clamp(14px, 2vw, 22px)",
          flex: 1,
          minHeight: 0,
        }}>
          {/* LEFT — Stepper */}
          <div style={{
            background: stepperBg,
            border: `1px solid ${stepperBdr}`,
            borderRadius: 18,
            padding: "clamp(14px, 2vh, 22px) clamp(12px, 1.5vw, 18px)",
            display: "flex",
            flexDirection: "column",
            gap: 0,
            overflow: "hidden",
          }}>
            {JOBS.map((job, idx) => {
              const isActive = job.id === active;
              return (
                <div key={job.id} style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    onClick={() => setActive(job.id)}
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      padding: "clamp(10px, 1.5vh, 16px) clamp(10px, 1.2vw, 14px)",
                      borderRadius: 12,
                      background: isActive ? activeBg : "transparent",
                      transition: "background 0.25s ease",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {job.tag && (
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.52rem", fontWeight: 700,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "2px 7px", borderRadius: 100,
                          background: isActive ? "rgba(255,255,255,0.15)" : tagBg,
                          color: isActive ? activeTxt : tagTxt,
                        }}>
                          {job.tag}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(0.78rem, 1.1vw, 0.92rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: isActive ? activeTxt : inactiveTxt,
                      lineHeight: 1.2,
                    }}>
                      {job.company}
                    </span>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      color: isActive ? (isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.6)") : inactiveSub,
                    }}>
                      {job.period}
                    </span>
                  </button>
                  {/* Connector line */}
                  {idx < JOBS.length - 1 && (
                    <div style={{ width: 1, height: "clamp(10px, 1.5vh, 16px)", background: connLine, margin: "0 auto" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT — Dynamic Content */}
          <div style={{
            background: rightBg,
            border: `1px solid ${rightBdr}`,
            borderRadius: 18,
            padding: "clamp(16px, 2.5vh, 26px) clamp(16px, 2.2vw, 28px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(14px, 2vh, 22px)",
            overflow: "hidden",
            backdropFilter: isDark ? "none" : "blur(2px)",
            boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vh, 22px)", height: "100%" }}
              >
                {/* Job title */}
                <div>
                  <h3 style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 800, letterSpacing: "-0.02em",
                    color: titleClr, margin: "0 0 3px",
                  }}>
                    {activeJob.role}
                  </h3>
                  <p style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.75rem", fontWeight: 600,
                    color: eyebrow, margin: 0,
                  }}>
                    {activeJob.company} · {activeJob.period}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: divider }} />

                {/* Impact Checkpoints — 2×2 grid */}
                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: eyebrow, display: "block", marginBottom: 10,
                  }}>
                    Impact Checkpoints
                  </span>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(8px, 1.2vw, 12px)",
                  }}>
                    {activeJob.checkpoints.map((cp, i) => (
                      <motion.div
                        key={cp}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.22, delay: i * 0.05 }}
                        style={{
                          background: checkBg,
                          border: `1px solid ${checkBdr}`,
                          borderRadius: 12,
                          padding: "clamp(10px, 1.5vh, 14px) clamp(10px, 1.2vw, 14px)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 9,
                        }}
                      >
                        <div style={{
                          width: 18, height: 18,
                          borderRadius: 6,
                          background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: 1,
                        }}>
                          <Check size={10} style={{ color: iconClr }} strokeWidth={3} />
                        </div>
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "clamp(0.7rem, 1vw, 0.78rem)",
                          fontWeight: 600, lineHeight: 1.5,
                          color: checkTxt,
                        }}>
                          {cp}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Project Mini-Grid */}
                <div>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: eyebrow, display: "block", marginBottom: 10,
                  }}>
                    Projects
                  </span>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "clamp(8px, 1vw, 12px)",
                  }}>
                    {activeJob.projects.map((proj, i) => (
                      <motion.div
                        key={proj.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: 0.15 + i * 0.06 }}
                        style={{
                          background: miniCardBg,
                          border: `1px solid ${miniCardBdr}`,
                          borderRadius: 12,
                          padding: "clamp(10px, 1.4vh, 14px) clamp(10px, 1.2vw, 14px)",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                          transition: "border-color 0.2s",
                        }}
                      >
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.55rem", fontWeight: 700,
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          padding: "2px 7px", borderRadius: 100,
                          background: tagBg, color: tagTxt,
                          width: "fit-content",
                        }}>
                          {proj.tag}
                        </span>
                        <span style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "clamp(0.72rem, 1vw, 0.82rem)",
                          fontWeight: 700, letterSpacing: "-0.01em",
                          color: miniTitle, lineHeight: 1.25,
                        }}>
                          {proj.title}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: "auto" }}>
                          <span style={{
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: "0.58rem", fontWeight: 700,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            color: eyebrow,
                          }}>
                            View Case Study
                          </span>
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
