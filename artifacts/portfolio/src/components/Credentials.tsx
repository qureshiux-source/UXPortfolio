import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, ArrowUpRight, GraduationCap, Trophy, Gamepad2 } from "lucide-react";
import { useTourHighlight } from "@/contexts/TourContext";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type CredType = "degree" | "cert" | "award" | "participation";

const CERTS: {
  id: number; title: string; issuer: string; date: string;
  description: string; url: string; type: CredType;
}[] = [
  {
    id:  0, type: "degree",
    title: "Bachelor of Computer Science — HCI & Front-End Specialization",
    issuer: "Sukkur IBA University",
    date: "2021 – 2025",
    description: "4-year Bachelor's degree with specialisation in Human-Computer Interaction and Front-End Development. Graduated Spring 2025. Core focus on usability-first design, interface engineering, and accessible product development.",
    url: "https://sibau.edu.pk",
  },
  {
    id:  1, type: "cert",
    title: "Microsoft UX Design Specialization",
    issuer: "Microsoft",
    date: "2025",
    description: "4-course specialization covering UX fundamentals, design for user experience, prototyping, and accessibility-first practice.",
    url: "https://www.coursera.org/specializations/microsoft-ux-design",
  },
  {
    id:  2, type: "cert",
    title: "Fundamentals of UI/UX Design",
    issuer: "Microsoft",
    date: "2025",
    description: "Core principles of user-centered design, visual design language, and UX research fundamentals aligned with industry standards.",
    url: "https://www.coursera.org/learn/fundamentals-of-ux-design",
  },
  {
    id:  3, type: "cert",
    title: "UX Design in Practice: Accessibility & Collaboration",
    issuer: "Microsoft",
    date: "2025",
    description: "Real-world WCAG implementation, inclusive design practices, and cross-functional UX collaboration at scale.",
    url: "https://www.coursera.org/learn/ux-design-accessibility-collaboration",
  },
  {
    id:  4, type: "cert",
    title: "User Interface Design & Prototyping",
    issuer: "Microsoft",
    date: "2025",
    description: "High-fidelity prototyping, interactive design systems, and producing pixel-accurate, developer-ready UI specifications.",
    url: "https://www.coursera.org/learn/ui-ux-design-prototyping",
  },
  {
    id:  5, type: "cert",
    title: "Accessibility-First Design",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Building accessible digital experiences with full WCAG 2.1 AA compliance across responsive web and mobile platforms.",
    url: "https://www.linkedin.com/learning/accessibility-first-design",
  },
  {
    id:  6, type: "cert",
    title: "Design Psychology: Master the Art and Science of UX Design",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Cognitive load theory, Gestalt principles, and persuasive design patterns for enhanced user engagement and retention.",
    url: "https://www.linkedin.com/learning/design-psychology-master-the-art-and-science-of-ux-design",
  },
  {
    id:  7, type: "cert",
    title: "Design Thinking: Customer Experience",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Applying design thinking methodologies to map, analyse, and optimise end-to-end customer journeys.",
    url: "https://www.linkedin.com/learning/design-thinking-customer-experience",
  },
  {
    id:  8, type: "cert",
    title: "Performing User Experience Audits",
    issuer: "LinkedIn Learning",
    date: "2025",
    description: "Systematic UX audits, heuristic evaluations, and translating findings into prioritised, actionable design recommendations.",
    url: "https://www.linkedin.com/learning/performing-user-experience-audits",
  },
  {
    id:  9, type: "participation",
    title: "Winter Game Jam 2023 — Participation",
    issuer: "Winter Game Jam",
    date: "2023",
    description: "Participated in Winter Game Jam 2023, designing and co-developing a complete game from concept to launch. Responsible for the full UI/UX, concept design, game features, and overall design direction for Codex, built alongside a colleague.",
    url: "#",
  },
  {
    id: 10, type: "award",
    title: "Best Project — Software Category",
    issuer: "Sukkur IBA University",
    date: "2023",
    description: "Awarded Best Project in the Software Category at Sukkur IBA University for the game Codex, designed and delivered as the lead designer in collaboration with a colleague during Winter Game Jam 2023.",
    url: "#",
  },
];

const TYPE_ICON: Record<CredType, React.ReactNode> = {
  degree:        <GraduationCap size={13} />,
  cert:          <Award size={13} />,
  award:         <Trophy size={13} />,
  participation: <Gamepad2 size={13} />,
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
  const [selected, setSelected] = useState<typeof CERTS[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
  const tagTxt    = isDark ? "#686868" : "#686868";
  const hoverBg   = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)";
  const overlayBg = isDark ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.65)";
  const modalBg   = isDark ? "#0A0A0A" : "#FFFFFF";
  const modalBdr  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const bodyTxt   = isDark ? "#808080" : "#505050";
  const ctaBg     = isDark ? "#F5F5F5" : "#0A0A0A";
  const ctaFg     = isDark ? "#0A0A0A" : "#F5F5F5";
  const closeBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const iconClr   = isDark ? "#555555" : "#AAAAAA";

  const typeAccent: Record<CredType, string> = {
    degree:        isDark ? "#6E8EFF" : "#2040CC",
    cert:          iconClr,
    award:         isDark ? "#FFD166" : "#B08000",
    participation: isDark ? "#5EFF80" : "#1A7A32",
  };

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
        backgroundImage: NOISE_SVG, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.09, mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      <div style={{
        maxWidth: 880, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(16px, 2.5vh, 28px)",
      }}>
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
            fontSize: "0.68rem", fontWeight: 600,
            color: rowSub, letterSpacing: "0.01em",
            flexShrink: 0, paddingBottom: 4,
          }}>Hover to verify · Click for details</span>
        </div>

        <div style={{ height: 1, background: divider }} />

        <div style={{ display: "flex", flexDirection: "column", overflow: "auto", maxHeight: "calc(100vh - 260px)" }}>
          {CERTS.map((cert, i) => {
            const isHovered   = hoveredId === cert.id;
            const isTourHl    = highlight === `cred-${cert.id}`;
            const isDimmed    = tourCred && !isTourHl;
            const accent      = typeAccent[cert.type];
            const hasLink     = cert.url && cert.url !== "#";
            return (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isDimmed ? 0.25 : 1, y: 0 }}
                transition={{ duration: 0.24, delay: i * 0.045 }}
                onClick={() => setSelected(cert)}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  all: "unset", cursor: "pointer",
                  display: "flex", alignItems: "center",
                  gap: "clamp(10px, 1.6vw, 18px)",
                  padding: "clamp(10px, 1.4vh, 15px) clamp(10px, 1.2vw, 16px)",
                  borderBottom: i < CERTS.length - 1 ? `1px solid ${divider}` : "none",
                  background: isTourHl
                    ? (isDark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.035)")
                    : isHovered ? hoverBg : "transparent",
                  borderRadius: 8,
                  outline: isTourHl ? `1.5px solid ${ringColor}` : "none",
                  transition: "background 0.22s, opacity 0.28s, outline 0.22s", width: "100%",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: accent,
                }}>
                  {TYPE_ICON[cert.type]}
                </div>

                {/* Title */}
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.74rem, 1vw, 0.88rem)",
                  fontWeight: cert.type === "degree" || cert.type === "award" ? 700 : 600,
                  letterSpacing: "-0.01em",
                  color: cert.type === "award" ? typeAccent.award : rowTitle,
                  flex: 1, textAlign: "left", lineHeight: 1.3,
                }}>{cert.title}</span>

                {/* Issuer tag */}
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.55rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "3px 8px", borderRadius: 100,
                  background: tagBg, color: tagTxt, flexShrink: 0,
                  whiteSpace: "nowrap",
                }}>{cert.issuer}</span>

                {/* Date */}
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.65rem", fontWeight: 700,
                  color: rowDate, flexShrink: 0, whiteSpace: "nowrap",
                }}>{cert.date}</span>

                {/* Hover CTA — slides in */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 6 }}
                  transition={{ duration: 0.16 }}
                  style={{
                    flexShrink: 0, display: "flex", alignItems: "center", gap: 4,
                    pointerEvents: isHovered ? "auto" : "none",
                  }}
                >
                  {hasLink ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.6rem", fontWeight: 700,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        padding: "4px 10px", borderRadius: 100,
                        background: ctaBg, color: ctaFg,
                        textDecoration: "none", whiteSpace: "nowrap",
                      }}
                    >
                      Verify <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.6rem", fontWeight: 700,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "4px 10px", borderRadius: 100,
                      background: tagBg, color: tagTxt,
                      whiteSpace: "nowrap",
                    }}>
                      Details <ArrowUpRight size={10} />
                    </span>
                  )}
                </motion.div>
              </motion.button>
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
                zIndex: 1000, backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
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
                borderRadius: 20,
                padding: "clamp(28px, 4vw, 44px)",
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
                marginBottom: 18,
                color: typeAccent[selected.type],
              }}>
                {TYPE_ICON[selected.type]}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase", color: rowSub,
                }}>{selected.issuer}</span>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: rowDate }} />
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.08em", color: rowDate,
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
                  letterSpacing: "0.02em",
                  padding: "11px 22px", borderRadius: 100,
                  background: ctaBg, color: ctaFg, textDecoration: "none",
                }}>
                  <ExternalLink size={13} /> Verify Credential
                </a>
              ) : (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "0.02em",
                  padding: "11px 22px", borderRadius: 100,
                  background: tagBg, color: tagTxt,
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
