import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const CASE_STUDIES = [
  {
    id: 1,
    tag: "End-to-end UX",
    title: "Redesigning the Onboarding Experience",
    description:
      "Reduced drop-off by 42% by rethinking the first-run flow for a fintech product — from blank-slate anxiety to guided confidence.",
    year: "2023",
    skills: ["Research", "Wireframing", "Prototyping", "Usability Testing"],
  },
  {
    id: 2,
    tag: "Design Systems",
    title: "Building a Scalable Component Library",
    description:
      "Led the creation of a shared design system used across 4 product teams, cutting design-to-dev handoff time by half.",
    year: "2022",
    skills: ["Figma", "Tokens", "Documentation", "Accessibility"],
  },
];

const PROJECTS = [
  {
    id: 1,
    tag: "Mobile",
    title: "Banking App Redesign",
    year: "2023",
    description: "Simplified transaction flows and improved discoverability for 200K+ users.",
  },
  {
    id: 2,
    tag: "Web",
    title: "E-commerce Checkout",
    year: "2022",
    description: "Streamlined a 6-step checkout into a single-page flow, lifting conversion by 18%.",
  },
  {
    id: 3,
    tag: "Dashboard",
    title: "Analytics Platform UI",
    year: "2021",
    description: "Designed data-dense views that remained scannable and actionable for non-technical users.",
  },
];

function useThemeColors() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";
  return {
    isDark,
    bg:          isDark ? "#0F0F0F" : "#F8F8F8",
    bgAlt:       isDark ? "#111111" : "#F2F2F2",
    eyebrow:     isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
    title:       isDark ? "#F5F5F5" : "#0D0D0D",
    cardBg:      isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    cardBorder:  isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
    cardHover:   isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.055)",
    tagBg:       isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
    tagColor:    isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
    cardTitle:   isDark ? "#EFEFEF" : "#111111",
    cardBody:    isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
    year:        isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)",
    divider:     isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    arrow:       isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.22)",
    pillBg:      isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
    pillColor:   isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)",
    line:        isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
  };
}

export function CaseStudiesSection() {
  const c = useThemeColors();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="transition-colors duration-500"
      style={{
        height: "100vh",
        background: c.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 860, width: "100%", margin: "0 auto", padding: "0 clamp(24px, 5vw, 72px)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(28px, 4vh, 48px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: c.eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: c.eyebrow,
            }}>
              Selected Work
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: c.title, margin: 0,
            }}>
              Case Studies
            </h2>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.7rem", fontWeight: 600,
              color: c.tagColor, letterSpacing: "0.03em",
            }}>
              Deep-dive explorations
            </span>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vh, 22px)" }}>
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              onMouseEnter={() => setHovered(cs.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === cs.id ? c.cardHover : c.cardBg,
                border: `1px solid ${c.cardBorder}`,
                borderRadius: 14,
                padding: "clamp(20px, 2.5vh, 28px) clamp(20px, 2.5vw, 32px)",
                cursor: "pointer",
                transition: "background 0.2s ease, border-color 0.2s ease",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 16,
                alignItems: "start",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.6rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    padding: "3px 10px", borderRadius: 100,
                    background: c.tagBg, color: c.tagColor,
                  }}>
                    {cs.tag}
                  </span>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.65rem", color: c.year,
                  }}>
                    {cs.year}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1rem, 1.6vw, 1.25rem)",
                  fontWeight: 700, letterSpacing: "-0.015em",
                  color: c.cardTitle, margin: "0 0 10px",
                }}>
                  {cs.title}
                </h3>
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.8rem, 1.1vw, 0.88rem)",
                  lineHeight: 1.65, color: c.cardBody, margin: "0 0 14px",
                  maxWidth: 560,
                }}>
                  {cs.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cs.skills.map((s) => (
                    <span key={s} style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.58rem", fontWeight: 700,
                      letterSpacing: "0.07em", textTransform: "uppercase",
                      padding: "3px 9px", borderRadius: 100,
                      background: c.pillBg, color: c.pillColor,
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: `1px solid ${c.cardBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 4,
                transition: "border-color 0.2s ease",
                borderColor: hovered === cs.id ? c.arrow : c.cardBorder,
              }}>
                <ArrowUpRight
                  size={15}
                  style={{
                    color: c.arrow,
                    transform: hovered === cs.id ? "translate(1px, -1px)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const c = useThemeColors();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="transition-colors duration-500"
      style={{
        height: "100vh",
        background: c.bgAlt,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 860, width: "100%", margin: "0 auto", padding: "0 clamp(24px, 5vw, 72px)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(28px, 4vh, 48px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: c.eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: c.eyebrow,
            }}>
              Selected Work
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: c.title, margin: 0,
            }}>
              Projects
            </h2>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.7rem", fontWeight: 600,
              color: c.tagColor, letterSpacing: "0.03em",
            }}>
              Focused executions
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px, 1.5vw, 18px)",
        }}>
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === proj.id ? c.cardHover : c.cardBg,
                border: `1px solid ${c.cardBorder}`,
                borderRadius: 14,
                padding: "clamp(18px, 2.5vh, 26px) clamp(18px, 2vw, 24px)",
                cursor: "pointer",
                transition: "background 0.2s ease",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "3px 10px", borderRadius: 100,
                  background: c.tagBg, color: c.tagColor,
                }}>
                  {proj.tag}
                </span>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.62rem", color: c.year }}>
                  {proj.year}
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                fontWeight: 700, letterSpacing: "-0.015em",
                color: c.cardTitle, margin: 0, lineHeight: 1.2,
              }}>
                {proj.title}
              </h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.75rem, 1vw, 0.83rem)",
                lineHeight: 1.6, color: c.cardBody, margin: 0, flex: 1,
              }}>
                {proj.description}
              </p>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                borderTop: `1px solid ${c.divider}`, paddingTop: 12, marginTop: 4,
              }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.62rem", fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: c.arrow,
                }}>
                  View
                </span>
                <ArrowUpRight
                  size={12}
                  style={{
                    color: c.arrow,
                    transform: hovered === proj.id ? "translate(1px, -1px)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
