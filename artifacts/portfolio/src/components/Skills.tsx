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
    skills: [
      "User Interviews", "Persona Creation", "Information Architecture",
      "Wireframing (Lo & Hi-Fi)", "Journey Mapping", "Usability Testing",
      "Heuristic Evaluation", "Competitive Analysis",
    ],
  },
  {
    title: "UI & Design Systems",
    skills: [
      "Scalable Design Systems", "UI Kits & Components", "Dark/Light Mode Systems",
      "Visual Hierarchy", "Interaction & Motion UI", "Responsive Web & Mobile",
      "Pixel-Perfect Handoff", "Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    title: "Workflow & Strategy",
    skills: [
      "Design Thinking", "Agile Development", "Sprint Planning",
      "UX Audits", "A/B Testing", "Performance Tracking",
      "KPI & OKR Alignment", "Roadmap Planning",
      "Design-to-Dev Handoff", "Stakeholder Communication",
      "UX Writing", "Data-Driven Design",
    ],
  },
];

const TOOL_GROUPS = [
  {
    label: "Design",
    tools: [
      { name: "Figma",       level: "Pro",          years: "4+ yrs" },
      { name: "FigJam",      level: "Pro",          years: "2 yrs"  },
      { name: "ProtoPie",    level: "Advanced",     years: "2 yrs"  },
      { name: "Illustrator", level: "Pro",          years: "3 yrs"  },
      { name: "Adobe XD",    level: "Pro",          years: "2 yrs"  },
    ],
  },
  {
    label: "Collab & PM",
    tools: [
      { name: "Trello",  level: "Pro",          years: "3 yrs" },
      { name: "Notion",  level: "Advanced",     years: "3 yrs" },
      { name: "Jira",    level: "Advanced",     years: "2 yrs" },
      { name: "Stitch",  level: "Intermediate", years: "1 yr"  },
    ],
  },
  {
    label: "AI & Code",
    tools: [
      { name: "GPT",    level: "Advanced",     years: "2 yrs" },
      { name: "Gemini", level: "Pro",          years: "1 yr"  },
      { name: "Replit", level: "Intermediate", years: "1 yr"  },
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

function ToolChip({ tool, isDark }: { tool: { name: string; level: string; years: string }; isDark: boolean }) {
  const [hov, setHov] = useState(false);

  const levelStyles = {
    Pro: {
      bg: isDark ? "#F2F2F2" : "#0A0A0A",
      text: isDark ? "#0A0A0A" : "#F2F2F2",
      pillBg: isDark ? "#F2F2F2" : "#0A0A0A",
      pillText: isDark ? "#0A0A0A" : "#F2F2F2",
    },
    Advanced: {
      bg: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)",
      text: isDark ? "#D0D0D0" : "#181818",
      pillBg: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.13)",
      pillText: isDark ? "#E0E0E0" : "#101010",
    },
    Intermediate: {
      bg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
      text: isDark ? "#888" : "#707070",
      pillBg: isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.06)",
      pillText: isDark ? "#909090" : "#606060",
    },
  };

  const s = levelStyles[tool.level as keyof typeof levelStyles] || levelStyles.Intermediate;
  const bdr = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{ y: hov ? -1 : 0 }}
      transition={{ duration: 0.15 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 10px 6px 10px",
        borderRadius: 8,
        background: hov ? s.bg : (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.028)"),
        border: `1px solid ${bdr}`,
        cursor: "default",
        transition: "background 0.2s",
      }}
    >
      <span style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "0.72rem", fontWeight: 700,
        letterSpacing: "-0.01em",
        color: hov ? s.text : (isDark ? "#A0A0A0" : "#303030"),
        transition: "color 0.2s",
      }}>{tool.name}</span>

      <motion.div
        animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -4 }}
        transition={{ duration: 0.15 }}
        style={{ display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }}
      >
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.5rem", fontWeight: 800,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "2px 6px", borderRadius: 100,
          background: s.pillBg, color: s.pillText,
          whiteSpace: "nowrap",
        }}>{tool.level}</span>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.5rem", fontWeight: 600,
          color: isDark ? "#505050" : "#A0A0A0",
          whiteSpace: "nowrap",
        }}>{tool.years}</span>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const isDark = useDark();

  const highlight      = useTourHighlight();
  const tourSkill      = !!(highlight && CAT_HIGHLIGHT[highlight] !== undefined);
  const highlightedCat = highlight ? (CAT_HIGHLIGHT[highlight] ?? -1) : -1;

  const bg      = isDark ? "#060606" : "#FAFAFA";
  const eyebrow = isDark ? "#606060" : "#707070";
  const titleClr = isDark ? "#F5F5F5" : "#080808";
  const catTitle = isDark ? "#C8C8C8" : "#181818";
  const tagBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const tagTxt  = isDark ? "#808080" : "#505050";
  const divider = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const grpLbl  = isDark ? "#444" : "#C0C0C0";

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
        maxWidth: 900, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(20px, 3vh, 32px)",
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
          }}>Skills &amp; Tools</h2>
        </div>

        {/* Skill categories */}
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
                  padding: "clamp(12px, 1.8vh, 18px) clamp(14px, 1.8vw, 22px)",
                  borderLeft: ci > 0 ? `1px solid ${divider}` : "none",
                  display: "flex", flexDirection: "column", gap: 10,
                  transition: "opacity 0.28s ease",
                  borderRadius: isTourHl ? 10 : 0,
                  outline: isTourHl
                    ? `1.5px solid ${isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"}`
                    : "none",
                }}
              >
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "-0.01em", color: catTitle,
                }}>{cat.title}</span>
                <div style={{ height: 1, background: divider }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 5px" }}>
                  {cat.skills.map((skill) => (
                    <span key={skill} style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.62rem", fontWeight: 700,
                      letterSpacing: "0.02em",
                      padding: "3px 9px", borderRadius: 100,
                      background: tagBg, color: tagTxt,
                    }}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools — grouped chips */}
        <div style={{ height: 1, background: divider }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TOOL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.2 + gi * 0.07 }}
              style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}
            >
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.5rem", fontWeight: 800,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: grpLbl, flexShrink: 0, width: 72,
              }}>{group.label}</span>
              <div style={{ width: 1, height: 16, background: divider, flexShrink: 0 }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 6px" }}>
                {group.tools.map(tool => (
                  <ToolChip key={tool.name} tool={tool} isDark={isDark} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.56rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: grpLbl, textAlign: "right", margin: 0,
        }}>Hover any tool to reveal proficiency</p>
      </div>
    </div>
  );
}
