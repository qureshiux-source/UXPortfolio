import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, ArrowUpRight, GraduationCap, Trophy, Gamepad2, ChevronDown } from "lucide-react";
import { useTourHighlight } from "@/contexts/TourContext";

type EntryType = "degree" | "award" | "participation" | "group" | "cert";

interface SubCert {
  title: string; url: string;
}

interface Entry {
  id: number; type: EntryType;
  title: string; issuer: string; date: string;
  description: string; url: string;
  subs?: SubCert[];
}

const ENTRIES: Entry[] = [
  {
    id: 0, type: "degree",
    title: "Bachelor of Computer Science",
    issuer: "Sukkur IBA University",
    date: "2021 – 2025",
    description: "4-year Bachelor's degree at Sukkur IBA University, graduating Spring 2025. Core focus on Human-Computer Interaction, interface engineering, and accessible product development.",
    url: "https://sibau.edu.pk",
  },
  {
    id: 1, type: "award",
    title: "Best Project — Software Category",
    issuer: "Sukkur IBA University",
    date: "2023",
    description: "Awarded Best Project in the Software Category at SIBAU for Codex — a game designed and delivered as lead designer in collaboration with a colleague during Winter Game Jam 2023.",
    url: "#",
  },
  {
    id: 2, type: "participation",
    title: "Winter Game Jam 2023 — Participation",
    issuer: "Winter Game Jam",
    date: "2023",
    description: "Participated in Winter Game Jam 2023, designing and co-developing Codex from concept to launch. Led full UI/UX, concept design, game features, and overall design direction.",
    url: "#",
  },
  {
    id: 3, type: "group",
    title: "Microsoft UX Design Specialization",
    issuer: "Microsoft",
    date: "2025",
    description: "4-course Coursera specialization by Microsoft covering UX fundamentals, visual design, prototyping, accessibility, and real-world UX collaboration.",
    url: "https://www.coursera.org/specializations/microsoft-ux-design",
    subs: [
      { title: "Fundamentals of UI/UX Design", url: "https://www.coursera.org/learn/fundamentals-of-ux-design" },
      { title: "Designing for User Experience", url: "https://www.coursera.org/learn/designing-for-user-experience" },
      { title: "User Interface Design & Prototyping", url: "https://www.coursera.org/learn/ui-ux-design-prototyping" },
      { title: "UX Design in Practice: Accessibility & Collaboration", url: "https://www.coursera.org/learn/ux-design-accessibility-collaboration" },
    ],
  },
  {
    id: 4, type: "cert",
    title: "Accessibility-First Design",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Building accessible digital experiences with full WCAG 2.1 AA compliance across responsive web and mobile platforms.",
    url: "https://www.linkedin.com/learning/accessibility-first-design",
  },
  {
    id: 5, type: "cert",
    title: "Design Psychology: Master the Art & Science of UX",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Cognitive load theory, Gestalt principles, and persuasive design patterns for enhanced user engagement and retention.",
    url: "https://www.linkedin.com/learning/design-psychology-master-the-art-and-science-of-ux-design",
  },
  {
    id: 6, type: "cert",
    title: "Design Thinking: Customer Experience",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Applying design thinking methodologies to map, analyse, and optimise end-to-end customer journeys.",
    url: "https://www.linkedin.com/learning/design-thinking-customer-experience",
  },
  {
    id: 7, type: "cert",
    title: "Performing User Experience Audits",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Systematic UX audits, heuristic evaluations, and translating findings into prioritised, actionable design recommendations.",
    url: "https://www.linkedin.com/learning/performing-user-experience-audits",
  },
];

const TYPE_ICON: Record<EntryType, React.ReactNode> = {
  degree:        <GraduationCap size={14} />,
  cert:          <Award size={14} />,
  award:         <Trophy size={14} />,
  participation: <Gamepad2 size={14} />,
  group:         <Award size={14} />,
};

/* Icon accent color — icon only, no colored tags */
const TYPE_ACCENT: Record<EntryType, { dark: string; light: string }> = {
  degree:        { dark: "#8BA4FF", light: "#2040CC" },
  award:         { dark: "#FFD166", light: "#B08000" },
  participation: { dark: "#5EFF80", light: "#1A7A32" },
  group:         { dark: "#58C8FF", light: "#006DAD" },
  cert:          { dark: "#909090", light: "#707070" },
};

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : system;
}

export function Credentials() {
  const isDark = useDark();
  const [selected, setSelected] = useState<Entry | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const highlight = useTourHighlight();
  const tourCred  = !!(highlight?.startsWith("cred-"));

  const bg        = isDark ? "#030303" : "#FFFFFF";
  const eyebrow   = isDark ? "#606060" : "#707070";
  const titleClr  = isDark ? "#F5F5F5" : "#080808";
  const rowTitle  = isDark ? "#E0E0E0" : "#101010";
  const rowSub    = isDark ? "#505050" : "#909090";
  const rowDate   = isDark ? "#404040" : "#B0B0B0";
  const divider   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const hoverBg   = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const ringColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";
  const overlayBg = isDark ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0.6)";
  const modalBg   = isDark ? "#0A0A0A" : "#FFFFFF";
  const modalBdr  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const bodyTxt   = isDark ? "#7A7A7A" : "#545454";
  const ctaBg     = isDark ? "#F5F5F5" : "#0A0A0A";
  const ctaFg     = isDark ? "#0A0A0A" : "#F5F5F5";
  const closeBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const subBg     = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)";
  const subBdr    = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64, paddingBottom: 72, boxSizing: "border-box",
      background: bg, display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        maxWidth: 820, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(18px, 2.8vh, 28px)",
      }}>

        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.59rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow }}>Credentials</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: titleClr, margin: 0 }}>
              Qualifications &amp; Certifications
            </h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: rowSub, flexShrink: 0, paddingBottom: 4 }}>Click for details</span>
          </div>
        </div>

        <div style={{ height: 1, background: divider }} />

        {/* Entries */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ENTRIES.map((entry, i) => {
            const isTourHl  = highlight === `cred-${entry.id}`;
            const isDimmed  = tourCred && !isTourHl;
            const isHov     = hoveredId === entry.id;
            const isExpanded = expandedId === entry.id;
            const isGroup   = entry.type === "group";
            const accent    = isDark ? TYPE_ACCENT[entry.type].dark : TYPE_ACCENT[entry.type].light;
            const hasUrl    = entry.url && entry.url !== "#";

            return (
              <div key={entry.id}>
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: isDimmed ? 0.22 : 1, y: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.04 }}
                  onClick={() => isGroup ? setExpandedId(isExpanded ? null : entry.id) : setSelected(entry)}
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "flex", alignItems: "center",
                    gap: "clamp(10px, 1.6vw, 16px)",
                    padding: "clamp(11px, 1.6vh, 16px) clamp(10px, 1vw, 14px)",
                    borderBottom: (!isExpanded && i < ENTRIES.length - 1) ? `1px solid ${divider}` : "none",
                    background: isTourHl
                      ? (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)")
                      : isHov ? hoverBg : "transparent",
                    borderRadius: 8,
                    outline: isTourHl ? `1.5px solid ${ringColor}` : "none",
                    transition: "background 0.2s", width: "100%",
                  }}
                >
                  {/* Icon — only element with accent color */}
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: accent,
                  }}>
                    {TYPE_ICON[entry.type]}
                  </div>

                  {/* Title */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, textAlign: "left" }}>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(0.75rem, 1vw, 0.88rem)",
                      fontWeight: entry.type === "degree" || entry.type === "award" ? 700 : 600,
                      letterSpacing: "-0.01em",
                      color: rowTitle, lineHeight: 1.3,
                    }}>{entry.title}</span>
                    {/* Microsoft group: "Contains 4 Certifications" subtitle */}
                    {isGroup && (
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.58rem", fontWeight: 600,
                        color: isDark ? "#3A3A3A" : "#C0C0C0",
                      }}>Contains 4 Certifications</span>
                    )}
                  </div>

                  {/* Issuer — plain, no color */}
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.6rem", fontWeight: 700,
                    color: rowSub, flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}>{entry.issuer}</span>

                  {/* Date */}
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.65rem", fontWeight: 700,
                    color: rowDate, flexShrink: 0, whiteSpace: "nowrap",
                    minWidth: 40, textAlign: "right",
                  }}>{entry.date}</span>

                  {/* Action — always visible for group; others show on hover */}
                  {isGroup ? (
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        flexShrink: 0, width: 26, height: 26, borderRadius: "50%",
                        background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                        border: `1px solid ${divider}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isDark ? "#909090" : "#707070",
                      }}
                    >
                      <ChevronDown size={13} />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ opacity: isHov ? 1 : 0, x: isHov ? 0 : 5 }}
                      transition={{ duration: 0.15 }}
                      style={{ flexShrink: 0 }}
                    >
                      {hasUrl ? (
                        <a href={entry.url} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: "0.58rem", fontWeight: 700,
                            letterSpacing: "0.07em", textTransform: "uppercase",
                            padding: "4px 10px", borderRadius: 100,
                            background: ctaBg, color: ctaFg, textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Verify <ExternalLink size={9} />
                        </a>
                      ) : (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                          letterSpacing: "0.07em", textTransform: "uppercase",
                          padding: "4px 10px", borderRadius: 100,
                          background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                          color: rowDate, whiteSpace: "nowrap",
                        }}>
                          Details <ArrowUpRight size={9} />
                        </span>
                      )}
                    </motion.div>
                  )}
                </motion.button>

                {/* Expanded sub-certs */}
                <AnimatePresence>
                  {isGroup && isExpanded && entry.subs && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        marginLeft: 48, marginBottom: 8, marginRight: 0,
                        background: subBg, border: `1px solid ${subBdr}`,
                        borderRadius: 10, overflow: "hidden",
                      }}>
                        {entry.subs.map((sub, si) => (
                          <div key={sub.title} style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "10px 16px",
                            borderBottom: si < entry.subs!.length - 1 ? `1px solid ${subBdr}` : "none",
                          }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }} />
                            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.76rem", fontWeight: 600, letterSpacing: "-0.01em", color: rowTitle, flex: 1 }}>
                              {sub.title}
                            </span>
                            <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem", fontWeight: 700,
                              letterSpacing: "0.07em", textTransform: "uppercase",
                              color: isDark ? "#909090" : "#707070", textDecoration: "none",
                            }}>
                              View <ExternalLink size={9} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isGroup && isExpanded && i < ENTRIES.length - 1 && (
                  <div style={{ height: 1, background: divider }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ height: 1, background: divider }} />
      </div>

      {/* Detail modal — z-index 20000/20001 sits above the Resume FAB (9999) */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", inset: 0,
                background: overlayBg,
                zIndex: 20000,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 20001,
                width: "min(480px, 92vw)",
                background: modalBg,
                border: `1px solid ${modalBdr}`,
                borderRadius: 20,
                padding: "32px",
                boxShadow: isDark
                  ? "0 40px 100px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.04)"
                  : "0 40px 100px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute", top: 16, right: 16,
                  width: 32, height: 32, borderRadius: "50%",
                  background: closeBg,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.18s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background =
                    isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = closeBg;
                }}
              >
                <X size={13} style={{ color: rowSub }} />
              </button>

              {/* Icon badge */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                marginBottom: 20,
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                border: `1px solid ${modalBdr}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: isDark
                  ? TYPE_ACCENT[selected.type].dark
                  : TYPE_ACCENT[selected.type].light,
              }}>
                {TYPE_ICON[selected.type]}
              </div>

              {/* Meta row */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: 10,
              }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: rowSub,
                }}>{selected.issuer}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: rowDate, flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: rowDate,
                }}>{selected.date}</span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                fontWeight: 800, letterSpacing: "-0.025em",
                lineHeight: 1.2,
                color: titleClr, margin: "0 0 14px",
              }}>
                {selected.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.86rem", lineHeight: 1.68, fontWeight: 500,
                color: bodyTxt, margin: "0 0 28px",
              }}>
                {selected.description}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", marginBottom: 20 }} />

              {/* CTA */}
              {selected.url && selected.url !== "#" ? (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.78rem", fontWeight: 700,
                    letterSpacing: "0.02em",
                    padding: "11px 24px", borderRadius: 100,
                    background: ctaBg, color: ctaFg,
                    textDecoration: "none",
                    transition: "opacity 0.18s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  <ExternalLink size={12} /> Verify Credential
                </a>
              ) : (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.78rem", fontWeight: 700,
                  letterSpacing: "0.02em",
                  padding: "11px 24px", borderRadius: 100,
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                  color: rowDate,
                }}>
                  Physical Credential
                </span>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
