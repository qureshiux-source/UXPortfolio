import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CATEGORIES = [
  {
    title: "Core UX Logic",
    skills: ["User Research", "Information Architecture", "Wireframing", "Usability Testing", "Journey Mapping", "HMW Framing"],
  },
  {
    title: "Frontend Engineering",
    skills: ["HTML5 & CSS3", "React Handoff", "Storybook", "Design Tokens", "Responsive Design", "CSS Animations"],
  },
  {
    title: "Product Strategy",
    skills: ["UX Strategy", "Stakeholder Comms", "Roadmap Planning", "A/B Testing", "Analytics Insights", "OKR Alignment"],
  },
];

const TOOLS = [
  { name: "Figma",       level: "Expert",       years: "4 Years" },
  { name: "Adobe XD",   level: "Advanced",     years: "3 Years" },
  { name: "ProtoPie",   level: "Intermediate", years: "2 Years" },
  { name: "Storybook",  level: "Advanced",     years: "2 Years" },
  { name: "WCAG Tools", level: "Expert",       years: "4 Years" },
  { name: "Framer",     level: "Intermediate", years: "1 Year"  },
];

function FlipTile({ tool, isDark }: { tool: typeof TOOLS[0]; isDark: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const frontTxt = isDark ? "#C0C0C0" : "#2A2A2A";
  const backBg   = isDark ? "#FFFFFF" : "#0A0A0A";
  const backFg   = isDark ? "#0A0A0A" : "#FFFFFF";

  return (
    <div
      style={{ perspective: 700, cursor: "pointer", height: "clamp(58px, 8.5vh, 78px)" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          borderRadius: 10,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.68rem, 0.95vw, 0.8rem)",
            fontWeight: 700, letterSpacing: "-0.01em",
            color: frontTxt,
          }}>{tool.name}</span>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: backBg, borderRadius: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 3,
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.62rem, 0.85vw, 0.74rem)",
            fontWeight: 800, color: backFg, letterSpacing: "-0.01em",
          }}>{tool.level}</span>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.56rem", fontWeight: 700,
            color: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)",
          }}>{tool.years}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function Skills() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const bg       = isDark ? "#0D0D0D" : "#F6F6F6";
  const eyebrow  = isDark ? "#6A6A6A" : "#606060";
  const titleClr = isDark ? "#F0F0F0" : "#0A0A0A";
  const catTitle = isDark ? "#CCCCCC" : "#1A1A1A";
  const tagBg    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.055)";
  const tagTxt   = isDark ? "#8A8A8A" : "#525252";
  const divider  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        height: "100vh", background: bg,
        display: "flex", flexDirection: "column",
        justifyContent: "center", overflow: "hidden",
        position: "relative", transition: "background 0.4s",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.05 : 0.022,
        mixBlendMode: "overlay" as const,
      }} />

      <div style={{
        maxWidth: 880, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(22px, 3.5vh, 36px)",
      }}>
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.59rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrow,
            }}>Technical Specification</span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: titleClr, margin: 0,
          }}>Skills & Tools</h2>
        </div>

        {/* Category blocks — less boxy: just a left-border accent */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(0px, 0vw, 0px)",
        }}>
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: ci * 0.08 }}
              style={{
                padding: "clamp(14px, 2vh, 20px) clamp(16px, 2vw, 24px)",
                borderLeft: ci > 0 ? `1px solid ${divider}` : "none",
                display: "flex", flexDirection: "column", gap: 12,
              }}
            >
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.82rem", fontWeight: 700,
                letterSpacing: "-0.01em", color: catTitle,
              }}>{cat.title}</span>
              <div style={{ height: 1, background: divider }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 6px" }}>
                {cat.skills.map((skill) => (
                  <span key={skill} style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.02em",
                    padding: "4px 10px", borderRadius: 100,
                    background: tagBg, color: tagTxt,
                  }}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1, height: 1, background: divider }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.55rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: eyebrow,
          }}>hover to reveal proficiency</span>
          <div style={{ flex: 1, height: 1, background: divider }} />
        </div>

        {/* Tool orbit flip tiles */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "clamp(8px, 1.2vw, 14px)",
        }}>
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, delay: 0.16 + i * 0.05 }}
            >
              <FlipTile tool={tool} isDark={isDark} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
