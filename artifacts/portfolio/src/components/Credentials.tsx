import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, ArrowUpRight, GraduationCap, Trophy, Gamepad2, ChevronDown } from "lucide-react";
import { useTourHighlight } from "@/contexts/TourContext";

/* Brand colors for issuers */
const ISSUER_COLOR: Record<string, string> = {
  "Microsoft":             "#00A4EF",
  "LinkedIn Learning":     "#0A66C2",
  "Sukkur IBA University": "#1E5799",
  "Winter Game Jam":       "#5EFF80",
};

type EntryType = "degree" | "award" | "participation" | "group" | "cert";

interface SubCert {
  title: string; url: string; description: string;
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
    description: "4-course Coursera specialization by Microsoft covering UX fundamentals, visual design, prototyping, accessibility, and real-world collaboration.",
    url: "https://www.coursera.org/specializations/microsoft-ux-design",
    subs: [
      { title: "Fundamentals of UI/UX Design", url: "https://www.coursera.org/learn/fundamentals-of-ux-design", description: "Core principles of user-centered design, visual design language, and UX research fundamentals." },
      { title: "Designing for User Experience", url: "https://www.coursera.org/learn/designing-for-user-experience", description: "Applying UX design methods and research strategies to real-world design problems." },
      { title: "User Interface Design & Prototyping", url: "https://www.coursera.org/learn/ui-ux-design-prototyping", description: "High-fidelity prototyping, interactive design systems, and developer-ready UI specifications." },
      { title: "UX Design in Practice: Accessibility & Collaboration", url: "https://www.coursera.org/learn/ux-design-accessibility-collaboration", description: "Real-world WCAG implementation, inclusive design practices, and cross-functional UX collaboration." },
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
  degree:        <GraduationCap size={13} />,
  cert:          <Award size={13} />,
  award:         <Trophy size={13} />,
  participation: <Gamepad2 size={13} />,
  group:         <Award size={13} />,
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
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const highlight  = useTourHighlight();
  const tourCred   = !!(highlight?.startsWith("cred-"));
  const ringColor  = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

  const bg        = isDark ? "#030303" : "#FFFFFF";
  const eyebrow   = isDark ? "#606060" : "#707070";
  const titleClr  = isDark ? "#F5F5F5" : "#080808";
  const rowTitle  = isDark ? "#E8E8E8" : "#080808";
  const rowSub    = isDark ? "#505050" : "#A0A0A0";
  const rowDate   = isDark ? "#404040" : "#C0C0C0";
  const divider   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const tagBg     = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const hoverBg   = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.022)";
  const overlayBg = isDark ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.65)";
  const modalBg   = isDark ? "#0A0A0A" : "#FFFFFF";
  const modalBdr  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const bodyTxt   = isDark ? "#808080" : "#505050";
  const ctaBg     = isDark ? "#F5F5F5" : "#0A0A0A";
  const ctaFg     = isDark ? "#0A0A0A" : "#F5F5F5";
  const closeBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const subBg     = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.018)";
  const subBdr    = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  const typeAccent: Record<EntryType, string> = {
    degree:        isDark ? "#6E8EFF" : "#2040CC",
    cert:          isDark ? "#555" : "#AAA",
    group:         "#00A4EF",
    award:         isDark ? "#FFD166" : "#B08000",
    participation: isDark ? "#5EFF80" : "#1A7A32",
  };

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 64, paddingBottom: 64, boxSizing: "border-box",
      background: bg,
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      position: "relative", transition: "background 0.4s",
    }}>

      <div style={{
        maxWidth: 880, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(16px, 2.5vh, 26px)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 22, height: 1, background: eyebrow }} />
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.59rem", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow,
              }}>Credentials</span>
            </div>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.025em", color: titleClr, margin: 0,
            }}>Qualifications &amp; Certifications</h2>
          </div>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.62rem", fontWeight: 600,
            color: rowSub, letterSpacing: "0.01em",
            flexShrink: 0, paddingBottom: 4,
          }}>Hover to verify · Click for details</span>
        </div>

        <div style={{ height: 1, background: divider }} />

        {/* Entries */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ENTRIES.map((entry, i) => {
            const isHovered   = hoveredId === entry.id;
            const isExpanded  = expandedId === entry.id;
            const isTourHl    = highlight === `cred-${entry.id}`;
            const isDimmed    = tourCred && !isTourHl;
            const accent      = typeAccent[entry.type];
            const hasLink     = entry.url && entry.url !== "#";
            const issuerColor = ISSUER_COLOR[entry.issuer];
            const isGroup     = entry.type === "group";

            return (
              <div key={entry.id}>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isDimmed ? 0.25 : 1, y: 0 }}
                  transition={{ duration: 0.24, delay: i * 0.045 }}
                  onClick={() => {
                    if (isGroup) setExpandedId(isExpanded ? null : entry.id);
                    else setSelected(entry);
                  }}
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "flex", alignItems: "center",
                    gap: "clamp(10px, 1.6vw, 18px)",
                    padding: "clamp(10px, 1.4vh, 15px) clamp(10px, 1.2vw, 16px)",
                    borderBottom: (!isExpanded && i < ENTRIES.length - 1) ? `1px solid ${divider}` : "none",
                    background: isTourHl
                      ? (isDark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.035)")
                      : isHovered ? hoverBg : "transparent",
                    borderRadius: 8,
                    outline: isTourHl ? `1.5px solid ${ringColor}` : "none",
                    transition: "background 0.22s, opacity 0.28s", width: "100%",
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: accent,
                  }}>
                    {TYPE_ICON[entry.type]}
                  </div>

                  {/* Title */}
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(0.74rem, 1vw, 0.88rem)",
                    fontWeight: entry.type === "degree" || entry.type === "award" ? 700 : 600,
                    letterSpacing: "-0.01em",
                    color: entry.type === "award" ? typeAccent.award : rowTitle,
                    flex: 1, textAlign: "left", lineHeight: 1.3,
                  }}>{entry.title}</span>

                  {/* Sub-count badge for groups */}
                  {isGroup && (
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.52rem", fontWeight: 800,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "3px 8px", borderRadius: 100,
                      background: "rgba(0,164,239,0.12)", color: "#00A4EF",
                      flexShrink: 0,
                    }}>4 Certs</span>
                  )}

                  {/* Issuer tag — colored */}
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "3px 8px", borderRadius: 100,
                    background: issuerColor
                      ? `${issuerColor}18`
                      : tagBg,
                    color: issuerColor || rowDate,
                    flexShrink: 0, whiteSpace: "nowrap",
                  }}>{entry.issuer}</span>

                  {/* Date */}
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.65rem", fontWeight: 700,
                    color: rowDate, flexShrink: 0, whiteSpace: "nowrap",
                  }}>{entry.date}</span>

                  {/* CTA — hover reveal */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 6 }}
                    transition={{ duration: 0.15 }}
                    style={{ flexShrink: 0 }}
                  >
                    {isGroup ? (
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={14} style={{ color: "#00A4EF" }} />
                      </motion.div>
                    ) : hasLink ? (
                      <a
                        href={entry.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.58rem", fontWeight: 700,
                          letterSpacing: "0.08em", textTransform: "uppercase",
                          padding: "4px 10px", borderRadius: 100,
                          background: ctaBg, color: ctaFg,
                          textDecoration: "none", whiteSpace: "nowrap",
                        }}
                      >
                        Verify <ExternalLink size={9} />
                      </a>
                    ) : (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.58rem", fontWeight: 700,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        padding: "4px 10px", borderRadius: 100,
                        background: tagBg, color: rowDate,
                        whiteSpace: "nowrap",
                      }}>
                        Details <ArrowUpRight size={9} />
                      </span>
                    )}
                  </motion.div>
                </motion.button>

                {/* Expanded sub-certs for Microsoft group */}
                <AnimatePresence>
                  {isGroup && isExpanded && entry.subs && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{
                        marginLeft: 48, marginBottom: 6,
                        background: subBg,
                        border: `1px solid ${subBdr}`,
                        borderRadius: 10, overflow: "hidden",
                      }}>
                        {entry.subs.map((sub, si) => (
                          <div key={sub.title} style={{
                            display: "flex", alignItems: "center",
                            gap: 12, padding: "10px 16px",
                            borderBottom: si < entry.subs!.length - 1 ? `1px solid ${subBdr}` : "none",
                          }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A4EF", flexShrink: 0 }} />
                            <span style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: "0.76rem", fontWeight: 600,
                              letterSpacing: "-0.01em", color: rowTitle, flex: 1,
                            }}>{sub.title}</span>
                            <a
                              href={sub.url} target="_blank" rel="noopener noreferrer"
                              style={{
                                display: "inline-flex", alignItems: "center", gap: 4,
                                fontFamily: "'Raleway', sans-serif",
                                fontSize: "0.55rem", fontWeight: 700,
                                letterSpacing: "0.08em", textTransform: "uppercase",
                                color: "#00A4EF", textDecoration: "none",
                              }}
                            >
                              View <ExternalLink size={9} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Divider after expanded group */}
                {isGroup && isExpanded && i < ENTRIES.length - 1 && (
                  <div style={{ height: 1, background: divider, margin: "0 0 0 0" }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ height: 1, background: divider }} />
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", inset: 0, background: overlayBg,
                zIndex: 1000, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 10 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "fixed", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1001, background: modalBg,
                border: `1px solid ${modalBdr}`,
                borderRadius: 20, padding: "clamp(28px, 4vw, 44px)",
                width: "min(500px, 90vw)",
                boxShadow: isDark ? "0 32px 80px rgba(0,0,0,0.9)" : "0 32px 80px rgba(0,0,0,0.15)",
              }}
            >
              <button onClick={() => setSelected(null)} style={{
                position: "absolute", top: 16, right: 16,
                width: 30, height: 30, borderRadius: "50%",
                background: closeBg, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <X size={13} style={{ color: rowSub }} />
              </button>

              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                border: `1px solid ${modalBdr}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 18, color: typeAccent[selected.type],
              }}>
                {TYPE_ICON[selected.type]}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: ISSUER_COLOR[selected.issuer] || rowSub,
                }}>{selected.issuer}</span>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: rowDate }} />
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", color: rowDate,
                }}>{selected.date}</span>
              </div>

              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
                fontWeight: 800, letterSpacing: "-0.02em",
                color: titleClr, margin: "0 0 14px", lineHeight: 1.2,
              }}>{selected.title}</h3>

              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.88rem", lineHeight: 1.65,
                color: bodyTxt, margin: "0 0 26px", fontWeight: 500,
              }}>{selected.description}</p>

              {selected.url && selected.url !== "#" ? (
                <a href={selected.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "0.02em", padding: "11px 22px", borderRadius: 100,
                  background: ctaBg, color: ctaFg, textDecoration: "none",
                }}>
                  <ExternalLink size={13} /> Verify Credential
                </a>
              ) : (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "0.02em", padding: "11px 22px", borderRadius: 100,
                  background: tagBg, color: rowDate,
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
