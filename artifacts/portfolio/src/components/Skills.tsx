import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTourHighlight } from "@/contexts/TourContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CAT_HIGHLIGHT: Record<string, number> = {
  "skill-ux":       0,
  "skill-frontend": 1,
  "skill-strategy": 2,
};

const CATEGORIES = [
  {
    title: "Core UX Research",
    skills: [
      "User Interviews", "Persona Creation", "Information Architecture",
      "User Flows", "Task Analysis", "Card Sorting",
      "Journey Mapping", "Usability Testing",
      "Heuristic Evaluation", "Competitive Analysis",
    ],
  },
  {
    title: "UI & Design Systems",
    skills: [
      "Scalable Design Systems", "UI Kits & Components",
      "Design Tokens", "Color Theory", "Typography Systems",
      "Dark/Light Mode Systems", "Visual Hierarchy",
      "Interaction & Motion UI", "Responsive Web & Mobile",
      "Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    title: "Workflow & Strategy",
    skills: [
      "Design Thinking", "Agile Development", "Sprint Planning",
      "UX Audits", "A/B Testing", "Performance Tracking",
      "KPI & OKR Alignment", "Data-Driven Design",
      "Design-to-Dev Handoff", "Stakeholder Communication",
    ],
  },
];

/* ── Tool Groups ─────────────────────────────────────────────────────────── */
export const TOOL_GROUPS = [
  {
    label: "Design",
    tools: [
      { name: "Figma",         level: "Pro",          years: "4+ yrs" },
      { name: "FigJam",        level: "Pro",          years: "2 yrs"  },
      { name: "ProtoPie",      level: "Advanced",     years: "2 yrs"  },
      { name: "Adobe XD",      level: "Pro",          years: "2 yrs"  },
      { name: "Illustrator",   level: "Pro",          years: "3 yrs"  },
      { name: "Canva",         level: "Pro",          years: "3 yrs"  },
      { name: "Adobe Animate", level: "Intermediate", years: "1 yr"   },
      { name: "Miro",          level: "Advanced",     years: "2 yrs"  },
    ],
  },
  {
    label: "AI Design",
    tools: [
      { name: "Replit",  level: "Intermediate", years: "1 yr"  },
      { name: "Cursor",  level: "Intermediate", years: "1 yr"  },
      { name: "Stitch",  level: "Intermediate", years: "1 yr"  },
      { name: "V0",      level: "Intermediate", years: "1 yr"  },
      { name: "Framer",  level: "Advanced",     years: "1 yr"  },
      { name: "Uizard",  level: "Intermediate", years: "1 yr"  },
    ],
  },
  {
    label: "Collaboration",
    tools: [
      { name: "Trello",   level: "Pro",          years: "3 yrs" },
      { name: "Slack",    level: "Pro",          years: "3 yrs" },
      { name: "Discord",  level: "Pro",          years: "3 yrs" },
      { name: "ClickUp",  level: "Advanced",     years: "2 yrs" },
      { name: "Jira",     level: "Advanced",     years: "2 yrs" },
      { name: "Notion",   level: "Advanced",     years: "3 yrs" },
    ],
  },
  {
    label: "General AI",
    tools: [
      { name: "ChatGPT", level: "Advanced", years: "2 yrs" },
      { name: "Gemini",  level: "Pro",      years: "1 yr"  },
      { name: "Claude",  level: "Advanced", years: "1 yr"  },
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

function ToolChip({
  tool, isDark,
}: {
  tool: { name: string; level: string; years: string };
  isDark: boolean;
}) {
  const [hov, setHov] = useState(false);
  const isMobile = useBreakpoint(640);

  const styles = {
    Pro: {
      hoverBg: isDark ? "#F2F2F2" : "#0A0A0A",
      hoverText: isDark ? "#0A0A0A" : "#F2F2F2",
      badge: isDark ? "#F2F2F2" : "#0A0A0A",
      badgeText: isDark ? "#0A0A0A" : "#F2F2F2",
    },
    Advanced: {
      hoverBg: isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)",
      hoverText: isDark ? "#E0E0E0" : "#101010",
      badge: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
      badgeText: isDark ? "#E0E0E0" : "#101010",
    },
    Intermediate: {
      hoverBg: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
      hoverText: isDark ? "#A0A0A0" : "#505050",
      badge: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)",
      badgeText: isDark ? "#909090" : "#606060",
    },
  };
  const s = styles[tool.level as keyof typeof styles] || styles.Intermediate;
  const bdr = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  return (
    <motion.div
      onMouseEnter={() => !isMobile && setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{ y: hov ? -1 : 0 }}
      transition={{ duration: 0.14 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 11px",
        borderRadius: 8,
        background: hov ? s.hoverBg : (isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF"),
        border: `1px solid ${bdr}`,
        cursor: "default",
        transition: "background 0.18s",
      }}
    >
      <span style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "0.72rem", fontWeight: 700,
        letterSpacing: "-0.01em",
        color: hov ? s.hoverText : (isDark ? "#A0A0A0" : "#303030"),
        transition: "color 0.18s",
      }}>{tool.name}</span>

      <motion.div
        animate={{ opacity: hov ? 1 : 0, width: hov ? "auto" : 0 }}
        transition={{ duration: 0.14 }}
        style={{ display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }}
      >
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.48rem", fontWeight: 800,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "2px 6px", borderRadius: 100,
          background: s.badge, color: s.badgeText,
          whiteSpace: "nowrap",
        }}>{tool.level}</span>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.48rem", fontWeight: 600,
          color: isDark ? "#505050" : "#A0A0A0", whiteSpace: "nowrap",
        }}>{tool.years}</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Skills Section ─────────────────────────────────────────────────────── */
export function Skills() {
  const isDark = useDark();
  const isMobile = useBreakpoint(640);
  const highlight      = useTourHighlight();
  const tourSkill      = !!(highlight && CAT_HIGHLIGHT[highlight] !== undefined);
  const highlightedCat = highlight ? (CAT_HIGHLIGHT[highlight] ?? -1) : -1;

  const bg       = isDark ? "#060606" : "#FFFFFF";
  const eyebrow  = isDark ? "#606060" : "#8A8A8A";
  const titleClr = isDark ? "#F5F5F5" : "#080808";
  const catTitle = isDark ? "#C8C8C8" : "#181818";
  const tagBg    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const tagTxt   = isDark ? "#787878" : "#525252";
  const divider  = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)";

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64,
      paddingBottom: isMobile ? 40 : 0,
      boxSizing: "border-box",
      background: bg, display: "flex", flexDirection: "column",
      justifyContent: "center",
      overflow: isMobile ? "visible" : "hidden",
      position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.09,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      <div style={{
        maxWidth: 900, width: "100%", margin: "0 auto",
        padding: isMobile
          ? "clamp(28px, 4vh, 40px) clamp(20px, 5vw, 32px) 0"
          : "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: isMobile ? "clamp(16px, 2.5vh, 24px)" : "clamp(20px, 3vh, 32px)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.59rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow }}>Technical Specification</span>
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? "1.5rem" : "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: titleClr, margin: 0 }}>Skills</h2>
        </div>

        {/* On mobile: vertical stacked list; on desktop: 3-col grid */}
        <div style={isMobile ? {
          display: "flex", flexDirection: "column", gap: 0,
        } : {
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        }}>
          {CATEGORIES.map((cat, ci) => {
            const isTourHl = tourSkill && ci === highlightedCat;
            const isDimmed = tourSkill && !isTourHl;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: tourSkill ? (isDimmed ? 0.25 : 1) : 1, y: 0 }}
                transition={{ duration: 0.28, delay: ci * 0.08 }}
                style={isMobile ? {
                  padding: "clamp(14px, 2vh, 20px) 0",
                  borderBottom: ci < CATEGORIES.length - 1 ? `1px solid ${divider}` : "none",
                  display: "flex", flexDirection: "column", gap: 10,
                  transition: "opacity 0.28s ease",
                  borderRadius: isTourHl ? 10 : 0,
                  outline: isTourHl ? `1.5px solid ${isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"}` : "none",
                } : {
                  padding: "clamp(14px, 2vh, 20px) clamp(16px, 2vw, 24px)",
                  borderLeft: ci > 0 ? `1px solid ${divider}` : "none",
                  display: "flex", flexDirection: "column", gap: 12,
                  transition: "opacity 0.28s ease",
                  borderRadius: isTourHl ? 10 : 0,
                  outline: isTourHl ? `1.5px solid ${isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"}` : "none",
                }}
              >
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "-0.01em", color: catTitle }}>{cat.title}</span>
                <div style={{ height: 1, background: divider }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {cat.skills.map((skill) => (
                    <span key={skill} style={{
                      fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 700,
                      letterSpacing: "0.02em", padding: "3px 9px", borderRadius: 100,
                      background: tagBg, color: tagTxt,
                    }}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: divider }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: isDark ? "#383838" : "#C8C8C8" }}>Scroll for tools</span>
            <div style={{ flex: 1, height: 1, background: divider }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Tools Section ──────────────────────────────────────────────────────── */
export function ToolsSection() {
  const isDark = useDark();
  const isMobile = useBreakpoint(640);

  const bg       = isDark ? "#030303" : "#F5F4F2";
  const eyebrow  = isDark ? "#606060" : "#8A8A8A";
  const titleClr = isDark ? "#F5F5F5" : "#080808";
  const divider  = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)";
  const grpLbl   = isDark ? "#3A3A3A" : "#AAAAAA";

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64,
      paddingBottom: isMobile ? 40 : 0,
      boxSizing: "border-box",
      background: bg, display: "flex", flexDirection: "column",
      justifyContent: "center",
      overflow: isMobile ? "visible" : "hidden",
      position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.09,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      <div style={{
        maxWidth: 900, width: "100%", margin: "0 auto",
        padding: isMobile
          ? "clamp(28px, 4vh, 40px) clamp(20px, 5vw, 32px) 0"
          : "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: isMobile ? "clamp(20px, 3vh, 28px)" : "clamp(22px, 3.2vh, 34px)",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.59rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow }}>Technical Specification</span>
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: isMobile ? "1.5rem" : "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: titleClr, margin: 0 }}>Tools</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "clamp(16px, 2.5vh, 22px)" : "clamp(14px, 2vh, 20px)" }}>
          {TOOL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: gi * 0.07 }}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "flex-start",
                gap: isMobile ? 8 : 16,
              }}
            >
              <span style={{
                fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem", fontWeight: 800,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: grpLbl, flexShrink: 0,
                width: isMobile ? "auto" : 76,
                paddingTop: isMobile ? 0 : 8,
              }}>{group.label}</span>
              {!isMobile && (
                <div style={{ width: 1, height: 28, background: divider, flexShrink: 0, marginTop: 4 }} />
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 6px", flex: 1 }}>
                {group.tools.map(tool => (
                  <ToolChip key={tool.name} tool={tool} isDark={isDark} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <p style={{
          fontFamily: "'Raleway', sans-serif", fontSize: "0.56rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: grpLbl, textAlign: isMobile ? "left" : "right", margin: 0,
        }}>{isMobile ? "Tap any tool for details" : "Hover any tool to reveal proficiency"}</p>
      </div>
    </div>
  );
}
