import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTourHighlight } from "@/contexts/TourContext";

const CAT_HIGHLIGHT: Record<string, number> = {
  "skill-ux":       0,
  "skill-frontend": 1,
  "skill-strategy": 2,
};

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CATEGORIES = [
  {
    title: "Core UX Skills",
    skills: ["User Interviews", "Persona Creation", "Information Architecture", "Wireframing (Lo & Hi-Fi)", "Journey Mapping", "Usability Testing", "Heuristic Evaluation", "Competitive Analysis"],
  },
  {
    title: "UI & Design Systems",
    skills: ["Scalable Design Systems", "UI Kits & Components", "Dark/Light Mode Systems", "Visual Hierarchy", "Interaction & Motion UI", "Responsive Web & Mobile", "Pixel-Perfect Handoff", "Accessibility (WCAG 2.1 AA)"],
  },
  {
    title: "Workflow & Strategy",
    skills: ["A/B Testing", "UX Audits", "Figma Dev Mode", "Design-to-Dev Handoff", "Agile & Scrum", "UX Writing", "KPI-Driven UX", "Stakeholder Communication"],
  },
];

const TOOLS = [
  { name: "Figma",       level: "Pro",          years: "4+ Years" },
  { name: "FigJam",      level: "Pro",          years: "2 Years"  },
  { name: "ProtoPie",    level: "Advanced",     years: "2 Years"  },
  { name: "Illustrator", level: "Pro",          years: "3 Years"  },
  { name: "Trello",      level: "Pro",          years: "3 Years"  },
  { name: "Adobe XD",    level: "Pro",          years: "2 Years"  },
  { name: "Replit",      level: "Intermediate", years: "1 Year"   },
  { name: "Stitch",      level: "Intermediate", years: "1 Year"   },
  { name: "Jira",        level: "Advanced",     years: "2 Years"  },
  { name: "Notion",      level: "Advanced",     years: "3 Years"  },
  { name: "GPT",         level: "Advanced",     years: "2 Years"  },
  { name: "Gemini",      level: "Pro",          years: "1 Year"   },
];

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : system;
}

function FlipTile({ tool, isDark }: { tool: typeof TOOLS[0]; isDark: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const frontBg  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const frontBdr = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const frontTxt = isDark ? "#B0B0B0" : "#282828";
  const backBg   = isDark ? "#F5F5F5" : "#0A0A0A";
  const backFg   = isDark ? "#0A0A0A" : "#F5F5F5";
  const backSub  = isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)";

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
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          background: frontBg, borderRadius: 10,
          border: `1px solid ${frontBdr}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.68rem, 0.95vw, 0.8rem)",
            fontWeight: 700, letterSpacing: "-0.01em", color: frontTxt,
          }}>{tool.name}</span>
        </div>
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
            fontSize: "0.56rem", fontWeight: 700, color: backSub,
          }}>{tool.years}</span>
        </div>
      </motion.div>
    </div>
  );
}

export function Skills() {
  const isDark = useDark();

  const highlight    = useTourHighlight();
  const tourSkill    = !!(highlight && CAT_HIGHLIGHT[highlight] !== undefined);
  const highlightedCat = highlight ? (CAT_HIGHLIGHT[highlight] ?? -1) : -1;

  const bg      = isDark ? "#060606" : "#FAFAFA";
  const eyebrow = isDark ? "#606060" : "#707070";
  const titleClr = isDark ? "#F5F5F5" : "#080808";
  const catTitle = isDark ? "#C0C0C0" : "#181818";
  const tagBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const tagTxt  = isDark ? "#808080" : "#505050";
  const divider = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";

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
        opacity: isDark ? 0.055 : 0.09, mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      <div style={{
        maxWidth: 880, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(22px, 3.5vh, 36px)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.59rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow,
            }}>Technical Specification</span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.025em", color: titleClr, margin: 0,
          }}>Skills & Tools</h2>
        </div>

        {/* Category columns — no card borders */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {CATEGORIES.map((cat, ci) => {
            const isTourHl = tourSkill && ci === highlightedCat;
            const isDimmed = tourSkill && !isTourHl;
            return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: tourSkill ? (isDimmed ? 0.25 : 1) : 1, y: 0 }}
              transition={{ duration: 0.28, delay: ci * 0.08 }}
              style={{
                padding: "clamp(14px, 2vh, 20px) clamp(16px, 2vw, 24px)",
                borderLeft: ci > 0 ? `1px solid ${divider}` : "none",
                display: "flex", flexDirection: "column", gap: 12,
                transition: "opacity 0.28s ease",
                borderRadius: isTourHl ? 10 : 0,
                outline: isTourHl
                  ? `1.5px solid ${isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"}`
                  : "none",
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
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1, height: 1, background: divider }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.55rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase", color: eyebrow,
          }}>hover to reveal proficiency</span>
          <div style={{ flex: 1, height: 1, background: divider }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "clamp(8px, 1.2vw, 14px)" }}>
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
