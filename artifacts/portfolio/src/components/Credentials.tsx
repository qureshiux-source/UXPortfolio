import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, ArrowUpRight } from "lucide-react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CERTS = [
  { id: 1, title: "UX Design Professional Certificate",  issuer: "Google",                        date: "2023", description: "End-to-end UX design process — research, wireframing, prototyping, and usability testing across real-world projects.", url: "#" },
  { id: 2, title: "UX Design Specialization",            issuer: "Microsoft",                     date: "2022", description: "Inclusive design, accessibility standards, and enterprise-scale UX workflows for global product teams.", url: "#" },
  { id: 3, title: "UX Research & Strategy",              issuer: "Interaction Design Foundation", date: "2022", description: "Mixed-methods research, user strategy frameworks, and evidence-based design decision making.", url: "#" },
  { id: 4, title: "Design Psychology",                   issuer: "LinkedIn Learning",              date: "2021", description: "Cognitive load theory, Gestalt principles, and persuasive design systems for scalable UX.", url: "#" },
  { id: 5, title: "BCS in Human-Computer Interaction",  issuer: "Sukkur IBA University",         date: "2020", description: "Academic foundation in HCI, interaction design, computing theory, and research methodology.", url: "#" },
];

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

  return (
    <div style={{
      height: "100vh", background: bg,
      display: "flex", flexDirection: "column",
      justifyContent: "center", overflow: "hidden",
      position: "relative", transition: "background 0.4s",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "180px 180px",
        opacity: isDark ? 0.055 : 0.022, mixBlendMode: "overlay" as const,
      }} />

      <div style={{
        maxWidth: 880, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column",
        gap: "clamp(24px, 3.5vh, 40px)",
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
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.025em", color: titleClr, margin: 0,
            }}>10+ Certifications</h2>
          </div>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.68rem", fontWeight: 600,
            color: rowSub, letterSpacing: "0.01em",
            flexShrink: 0, paddingBottom: 4,
          }}>Click any row to verify</span>
        </div>

        <div style={{ height: 1, background: divider }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {CERTS.map((cert, i) => {
            const isHovered = hoveredId === cert.id;
            return (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: i * 0.065 }}
                onClick={() => setSelected(cert)}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  all: "unset", cursor: "pointer",
                  display: "flex", alignItems: "center",
                  gap: "clamp(12px, 2vw, 20px)",
                  padding: "clamp(12px, 1.8vh, 18px) clamp(10px, 1.2vw, 16px)",
                  borderBottom: i < CERTS.length - 1 ? `1px solid ${divider}` : "none",
                  background: isHovered ? hoverBg : "transparent",
                  borderRadius: 8,
                  transition: "background 0.18s", width: "100%",
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Award size={13} style={{ color: iconClr }} />
                </div>

                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.55rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "3px 8px", borderRadius: 100,
                  background: tagBg, color: tagTxt, flexShrink: 0,
                }}>{cert.issuer}</span>

                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(0.78rem, 1.05vw, 0.9rem)",
                  fontWeight: 600, letterSpacing: "-0.01em",
                  color: rowTitle, flex: 1, textAlign: "left", lineHeight: 1.3,
                }}>{cert.title}</span>

                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.65rem", fontWeight: 700,
                  color: rowDate, flexShrink: 0,
                }}>{cert.date}</span>

                <motion.div
                  animate={{ x: isHovered ? 2 : 0, opacity: isHovered ? 1 : 0.3 }}
                  transition={{ duration: 0.16 }}
                  style={{ flexShrink: 0 }}
                >
                  <ArrowUpRight size={14} style={{ color: eyebrow }} />
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        <div style={{ height: 1, background: divider }} />
      </div>

      {/* Lightbox */}
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
              }}>
                <Award size={20} style={{ color: isDark ? "#F5F5F5" : "#0A0A0A" }} />
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
