import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

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

  const tileBg    = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const tileBdr   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const frontTxt  = isDark ? "#D0D0D0" : "#1A1A1A";
  const backTxt   = isDark ? "#FAFAFA" : "#0A0A0A";
  const levelClr  = isDark ? "#848484" : "#595959";
  const backBg    = isDark ? "#FAFAFA" : "#0A0A0A";
  const backFg    = isDark ? "#0A0A0A" : "#FAFAFA";

  return (
    <div
      style={{ perspective: 700, cursor: "pointer", height: "clamp(60px, 9vh, 84px)" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          background: tileBg,
          border: `1px solid ${tileBdr}`,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          boxShadow: isDark
            ? "0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.72rem, 1vw, 0.85rem)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: frontTxt,
          }}>
            {tool.name}
          </span>
        </div>

        {/* Back */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: backBg,
          border: `1px solid ${tileBdr}`,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          padding: "10px 12px",
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
            fontWeight: 800,
            color: backFg,
            letterSpacing: "-0.01em",
          }}>
            {tool.level}
          </span>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.06em",
            color: isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.65)",
          }}>
            {tool.years}
          </span>
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

  const bg         = isDark
    ? "linear-gradient(160deg, #0D0D0D 0%, #131313 50%, #0A0A0A 100%)"
    : "linear-gradient(160deg, #FFFFFF 0%, #F8F8F8 50%, #F2F2F2 100%)";
  const eyebrow    = isDark ? "#848484" : "#595959";
  const titleClr   = isDark ? "#FAFAFA" : "#0A0A0A";
  const catBg      = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const catBdr     = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const catTitle   = isDark ? "#C8C8C8" : "#1A1A1A";
  const tagBg      = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.055)";
  const tagTxt     = isDark ? "#9A9A9A" : "#4D4D4D";
  const divider    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const noiseOp    = isDark ? 0.06 : 0.028;

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
          ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.3) 100%)"
          : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.03) 100%)",
      }} />

      <div style={{
        maxWidth: 880,
        width: "100%",
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "clamp(20px, 3vh, 32px)",
      }}>
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrow,
            }}>
              Technical Specification
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: titleClr, margin: 0,
          }}>
            Skills & Tools
          </h2>
        </div>

        {/* Category Spec Blocks */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(10px, 1.5vw, 16px)",
        }}>
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: ci * 0.07 }}
              style={{
                background: catBg,
                border: `1px solid ${catBdr}`,
                borderRadius: 16,
                padding: "clamp(14px, 2vh, 20px) clamp(14px, 1.8vw, 20px)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                boxShadow: isDark
                  ? "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)"
                  : "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "-0.01em",
                color: catTitle,
              }}>
                {cat.title}
              </span>
              <div style={{ height: 1, background: divider }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 6px" }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.65rem", fontWeight: 700,
                      letterSpacing: "0.03em",
                      padding: "4px 10px", borderRadius: 100,
                      background: tagBg, color: tagTxt,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: divider }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.58rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: eyebrow,
          }}>
            Tool Orbit — hover to reveal proficiency
          </span>
          <div style={{ flex: 1, height: 1, background: divider }} />
        </div>

        {/* Tool Orbit — flip tiles */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "clamp(8px, 1.2vw, 14px)",
        }}>
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.2 + i * 0.05 }}
            >
              <FlipTile tool={tool} isDark={isDark} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
