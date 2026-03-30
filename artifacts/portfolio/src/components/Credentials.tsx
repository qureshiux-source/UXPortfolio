import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, ArrowUpRight, GraduationCap, Trophy, Gamepad2, ChevronDown, Shield } from "lucide-react";
import { useTourHighlight } from "@/contexts/TourContext";

type EntryType = "degree" | "award" | "participation" | "group" | "cert";

interface SubCert {
  title: string;
  url: string;
  verifyCode?: string;
  date?: string;
  pdfUrl?: string;
}

interface Entry {
  id: number; type: EntryType;
  title: string; issuer: string; date: string;
  description: string; url: string;
  certId?: string;
  certPdfUrl?: string;
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
    issuer: "Microsoft / Coursera",
    date: "Aug 2025",
    description: "4-course professional certificate by Microsoft covering UX fundamentals, visual design, prototyping, accessibility, and real-world UX collaboration. Issued Aug 4, 2025.",
    url: "https://www.coursera.org/account/accomplishments/specialization/GMJV0LOKUXWC",
    certId: "GMJV0LOKUXWC",
    certPdfUrl: "/certs/coursera-specialization.pdf",
    subs: [
      {
        title: "Fundamentals of UI/UX Design",
        url: "https://coursera.org/verify/EHPJBD979F5E",
        verifyCode: "EHPJBD979F5E", date: "Jul 4, 2025",
        pdfUrl: "/certs/coursera-fundamentals.pdf",
      },
      {
        title: "Designing for User Experience",
        url: "https://coursera.org/verify/V35067TZQ0RC",
        verifyCode: "V35067TZQ0RC", date: "Jul 31, 2025",
        pdfUrl: "/certs/designing-for-ux.pdf",
      },
      {
        title: "User Interface Design & Prototyping",
        url: "https://coursera.org/verify/BU8R4KLD4LS0",
        verifyCode: "BU8R4KLD4LS0", date: "Aug 4, 2025",
        pdfUrl: "/certs/ui-design-prototyping.pdf",
      },
      {
        title: "UX Design in Practice: Accessibility & Collaboration",
        url: "https://coursera.org/verify/CXR34KTAIAVQ",
        verifyCode: "CXR34KTAIAVQ", date: "Aug 4, 2025",
        pdfUrl: "/certs/ux-practice-accessibility.pdf",
      },
    ],
  },
  {
    id: 4, type: "cert",
    title: "Accessibility-First Design",
    issuer: "LinkedIn Learning",
    date: "Aug 2025",
    description: "Building accessible digital interfaces with full WCAG 2.1 compliance. Covers IT accessibility, user experience design, and inclusive design patterns. Completed Aug 21, 2025 · 1 hr 24 min.",
    url: "https://www.linkedin.com/learning/accessibility-first-design",
    certId: "a0a891ef5f133d9d56da00f0f72dfcfdee01d0f476e9973b213ae5afe5de6397",
    certPdfUrl: "/certs/accessibility-first.pdf",
  },
  {
    id: 5, type: "cert",
    title: "Design Psychology: Master the Art & Science of UX",
    issuer: "LinkedIn Learning",
    date: "Aug 2025",
    description: "Cognitive load theory, Gestalt principles, and persuasive design patterns for enhanced user engagement and retention. Completed Aug 5, 2025 · 1 hr 22 min.",
    url: "https://www.linkedin.com/learning/certificates/8e50f5fb96d3791489ab096022e567067533bfa28c34c0ac6222143cd02d6e21",
    certId: "8e50f5fb96d3791489ab096022e567067533bfa28c34c0ac6222143cd02d6e21",
    certPdfUrl: "/certs/design-psychology.pdf",
  },
  {
    id: 6, type: "cert",
    title: "Design Thinking: Customer Experience",
    issuer: "LinkedIn Learning",
    date: "Aug 2025",
    description: "Applying design thinking methodologies to map, analyse, and optimise end-to-end customer journeys. Completed Aug 22, 2025 · 34 min.",
    url: "https://www.linkedin.com/learning/certificates/62772a1b24acecda7be20bb36e90b967d5e6d3c8c3414c71fe3333255de6b9fa",
    certId: "62772a1b24acecda7be20bb36e90b967d5e6d3c8c3414c71fe3333255de6b9fa",
    certPdfUrl: "/certs/design-thinking.pdf",
  },
  {
    id: 7, type: "cert",
    title: "Performing User Experience Audits",
    issuer: "LinkedIn Learning",
    date: "Aug 2025",
    description: "Systematic UX audits, heuristic evaluations, and translating findings into prioritised, actionable design recommendations. Completed Aug 15, 2025 · 1 hr 3 min.",
    url: "https://www.linkedin.com/learning/certificates/1ec09252e8ee6c51b4bfaaef80aa4de1ab82f4706defc153a1c1cd5f7ed3f3f4",
    certId: "1ec09252e8ee6c51b4bfaaef80aa4de1ab82f4706defc153a1c1cd5f7ed3f3f4",
    certPdfUrl: "/certs/ux-audits.pdf",
  },
];

const TYPE_ICON: Record<EntryType, React.ReactNode> = {
  degree:        <GraduationCap size={14} />,
  cert:          <Award size={14} />,
  award:         <Trophy size={14} />,
  participation: <Gamepad2 size={14} />,
  group:         <Award size={14} />,
};

const TYPE_ACCENT: Record<EntryType, { dark: string; light: string }> = {
  degree:        { dark: "#8BA4FF", light: "#2040CC" },
  award:         { dark: "#FFD166", light: "#B08000" },
  participation: { dark: "#5EFF80", light: "#1A7A32" },
  group:         { dark: "#58C8FF", light: "#006DAD" },
  cert:          { dark: "#A0A0A0", light: "#606060" },
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
  const [pdfError, setPdfError] = useState(false);

  const highlight = useTourHighlight();
  const tourCred  = !!(highlight?.startsWith("cred-"));

  const bg        = isDark ? "#030303" : "#F5F4F2";
  const eyebrow   = isDark ? "#606060" : "#8A8A8A";
  const titleClr  = isDark ? "#F5F5F5" : "#080808";
  const rowTitle  = isDark ? "#E0E0E0" : "#101010";
  const rowSub    = isDark ? "#505050" : "#6A6A6A";
  const rowDate   = isDark ? "#404040" : "#9A9A9A";
  const divider   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const hoverBg   = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)";
  const ringColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";
  const overlayBg = isDark ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0.6)";
  const modalBg   = isDark ? "#0A0A0A" : "#FFFFFF";
  const modalBdr  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const bodyTxt   = isDark ? "#7A7A7A" : "#525252";
  const ctaBg     = isDark ? "#F5F5F5" : "#0A0A0A";
  const ctaFg     = isDark ? "#0A0A0A" : "#F5F5F5";
  const closeBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const subBg     = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.04)";
  const subBdr    = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)";
  const pdfBg     = isDark ? "#111111" : "#F0F0F0";

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

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 22, height: 1, background: eyebrow }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.59rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow }}>Credentials</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em", color: titleClr, margin: 0 }}>
              Qualifications &amp; Certifications
            </h2>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: rowSub, flexShrink: 0, paddingBottom: 4 }}>Click to preview</span>
          </div>
        </div>

        <div style={{ height: 1, background: divider }} />

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
                  onClick={() => isGroup ? setExpandedId(isExpanded ? null : entry.id) : (setPdfError(false), setSelected(entry))}
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "flex", alignItems: "center",
                    gap: "clamp(10px, 1.6vw, 16px)",
                    padding: "clamp(11px, 1.6vh, 16px) clamp(10px, 1vw, 14px)",
                    borderBottom: (!isExpanded && i < ENTRIES.length - 1) ? `1px solid ${divider}` : "none",
                    background: isTourHl ? (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)") : isHov ? hoverBg : "transparent",
                    borderRadius: 8,
                    outline: isTourHl ? `1.5px solid ${ringColor}` : "none",
                    transition: "background 0.2s", width: "100%",
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: accent,
                  }}>
                    {TYPE_ICON[entry.type]}
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, textAlign: "left" }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.75rem, 1vw, 0.88rem)", fontWeight: entry.type === "degree" || entry.type === "award" ? 700 : 600, letterSpacing: "-0.01em", color: rowTitle, lineHeight: 1.3 }}>
                      {entry.title}
                    </span>
                    {isGroup && (
                      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 600, color: isDark ? "#3A3A3A" : "#C0C0C0" }}>
                        4 Certificates included
                      </span>
                    )}
                  </div>

                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.6rem", fontWeight: 700, color: rowSub, flexShrink: 0, whiteSpace: "nowrap" }}>
                    {entry.issuer}
                  </span>

                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: rowDate, flexShrink: 0, whiteSpace: "nowrap", minWidth: 40, textAlign: "right" }}>
                    {entry.date}
                  </span>

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
                            fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700,
                            letterSpacing: "0.07em", textTransform: "uppercase",
                            padding: "4px 10px", borderRadius: 100,
                            background: ctaBg, color: ctaFg, textDecoration: "none", whiteSpace: "nowrap",
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
                      <div style={{ marginLeft: 48, marginBottom: 8, background: subBg, border: `1px solid ${subBdr}`, borderRadius: 10, overflow: "hidden" }}>
                        {entry.subs.map((sub, si) => (
                          <div key={sub.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: si < entry.subs!.length - 1 ? `1px solid ${subBdr}` : "none" }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: isDark ? "#58C8FF" : "#006DAD", flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.76rem", fontWeight: 600, letterSpacing: "-0.01em", color: rowTitle }}>
                                {sub.title}
                              </div>
                              {sub.date && (
                                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.54rem", fontWeight: 500, color: rowDate, marginTop: 2 }}>
                                  {sub.date} {sub.verifyCode && `· ID: ${sub.verifyCode}`}
                                </div>
                              )}
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                              {sub.pdfUrl && (
                                <button
                                  onClick={() => { setPdfError(false); setSelected({ ...entry, certPdfUrl: sub.pdfUrl, title: sub.title, certId: sub.verifyCode, url: sub.url, date: sub.date || entry.date }); }}
                                  style={{
                                    all: "unset", cursor: "pointer",
                                    display: "inline-flex", alignItems: "center", gap: 4,
                                    fontFamily: "'Raleway', sans-serif", fontSize: "0.52rem", fontWeight: 700,
                                    letterSpacing: "0.07em", textTransform: "uppercase",
                                    color: isDark ? "#808080" : "#606060", textDecoration: "none",
                                    padding: "3px 8px", borderRadius: 4,
                                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                                    transition: "border-color 0.18s",
                                  }}
                                >
                                  Preview
                                </button>
                              )}
                              <a href={sub.url} target="_blank" rel="noopener noreferrer" style={{
                                display: "inline-flex", alignItems: "center", gap: 4,
                                fontFamily: "'Raleway', sans-serif", fontSize: "0.52rem", fontWeight: 700,
                                letterSpacing: "0.07em", textTransform: "uppercase",
                                color: isDark ? "#909090" : "#707070", textDecoration: "none",
                                padding: "3px 8px", borderRadius: 4,
                                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                              }}>
                                Verify <ExternalLink size={9} />
                              </a>
                            </div>
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

      {/* Detail / PDF preview modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelected(null)}
              style={{ position: "fixed", inset: 0, background: overlayBg, zIndex: 20000, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
            />

            <div style={{ position: "fixed", inset: 0, zIndex: 20001, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", pointerEvents: "none" }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  pointerEvents: "auto", width: "100%", maxWidth: 520,
                  maxHeight: "90vh", overflowY: "auto",
                  background: modalBg, border: `1px solid ${modalBdr}`,
                  borderRadius: 18, padding: "24px",
                  boxShadow: isDark ? "0 24px 64px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.04)" : "0 24px 64px rgba(0,0,0,0.16)",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setSelected(null)}
                  style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: "50%", background: closeBg, border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.18s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = closeBg; }}
                >
                  <X size={13} style={{ color: rowSub }} />
                </button>

                {/* Header info */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid ${modalBdr}`, display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? TYPE_ACCENT[selected.type].dark : TYPE_ACCENT[selected.type].light, flexShrink: 0 }}>
                    {TYPE_ICON[selected.type]}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: rowSub }}>{selected.issuer}</span>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: rowDate, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem", fontWeight: 700, color: rowDate }}>{selected.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(0.88rem, 1.5vw, 1.02rem)", fontWeight: 800, letterSpacing: "-0.018em", lineHeight: 1.22, color: titleClr, margin: 0 }}>
                      {selected.title}
                    </h3>
                  </div>
                </div>

                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.78rem", lineHeight: 1.65, fontWeight: 500, color: bodyTxt, margin: "0 0 16px" }}>
                  {selected.description}
                </p>

                {/* PDF Preview */}
                {selected.certPdfUrl && !pdfError && (
                  <div style={{ marginBottom: 16, borderRadius: 10, overflow: "hidden", border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`, background: pdfBg }}>
                    <embed
                      src={selected.certPdfUrl}
                      type="application/pdf"
                      style={{ width: "100%", height: 300, display: "block" }}
                      onError={() => setPdfError(true)}
                    />
                  </div>
                )}

                {/* PDF not available fallback */}
                {selected.certPdfUrl && pdfError && (
                  <div style={{ marginBottom: 16, padding: "14px 16px", borderRadius: 10, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`, display: "flex", alignItems: "center", gap: 10 }}>
                    <Shield size={14} style={{ color: rowDate, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", color: rowDate }}>PDF preview unavailable in this browser. Use the verify link below.</span>
                  </div>
                )}

                {selected.certId && (
                  <div style={{ marginBottom: 16, padding: "8px 12px", borderRadius: 8, background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Shield size={10} style={{ color: rowDate, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.04em", color: rowDate, wordBreak: "break-all" }}>
                      ID: {selected.certId.length > 24 ? selected.certId.slice(0, 24) + "…" : selected.certId}
                    </span>
                  </div>
                )}

                <div style={{ height: 1, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", marginBottom: 14 }} />

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {selected.url && selected.url !== "#" ? (
                    <a href={selected.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.02em", padding: "9px 18px", borderRadius: 100, background: ctaBg, color: ctaFg, textDecoration: "none", transition: "opacity 0.18s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    >
                      <ExternalLink size={11} /> Verify Credential
                    </a>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.02em", padding: "9px 18px", borderRadius: 100, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: rowDate }}>
                      Institutional Award
                    </span>
                  )}
                  {selected.certPdfUrl && (
                    <a href={selected.certPdfUrl} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.02em", padding: "9px 18px", borderRadius: 100, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", color: isDark ? "#C0C0C0" : "#2A2A2A", textDecoration: "none", transition: "background 0.18s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"; }}
                    >
                      Open PDF
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
