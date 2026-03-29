import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle, Play, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const MARQUEE_SKILLS = [
  "User Research", "Wireframing", "Prototyping", "Design Systems",
  "WCAG 2.1 AAA", "Figma", "Information Architecture", "Journey Mapping",
  "Usability Testing", "Accessibility", "Hi-Fi Mockups", "Dev Handoff",
  "A/B Testing", "UX Audits", "Visual Hierarchy", "ProtoPie", "Interaction Design",
];

interface HeroProps {
  onStartTour?: () => void;
}

export function Hero({ onStartTour }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  const bg          = isDark ? "#040404" : "#FAFAFA";
  const headingClr  = isDark ? "#F2F2F2" : "#080808";
  const subClr      = isDark ? "#888" : "#505050";
  const bodyClr     = isDark ? "#606060" : "#707070";
  const divClr      = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const metricBg    = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const metricBdr   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
  const primaryBg   = isDark ? "#F2F2F2" : "#0A0A0A";
  const primaryFg   = isDark ? "#0A0A0A" : "#F2F2F2";
  const ghostBdr    = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";
  const ghostClr    = isDark ? "#C0C0C0" : "#282828";
  const dotGreen    = isDark ? "#5EFF80" : "#1A7A32";
  const marqClr     = isDark ? "#3A3A3A" : "#C8C8C8";
  const marqSepClr  = isDark ? "#282828" : "#D8D8D8";
  const scrollLine  = isDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.12), transparent)";

  const METRICS = [
    { value: "4+",          label: "Years Experience",    sub: "2021 – Present" },
    { value: "10+",         label: "Certifications",      sub: "Microsoft · LinkedIn" },
    { value: "Design Lead", label: "Current Role",        sub: "@ Wired Hub" },
  ];

  return (
    <section style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: bg, position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "background 0.4s",
    }}>
      <style>{`@keyframes hq-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>

      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: isDark ? 0.05 : 0.08,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      {/* Subtle radial center glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,255,255,0.018) 0%, transparent 70%)"
          : "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,0,0,0.012) 0%, transparent 70%)",
      }} />

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1, maxWidth: 1160, width: "100%", margin: "0 auto",
        padding: "0 clamp(28px, 5vw, 72px)",
        display: "grid",
        gridTemplateColumns: "1fr clamp(200px, 24%, 260px)",
        gap: "clamp(32px, 5vw, 72px)",
        alignItems: "center",
        position: "relative", zIndex: 2,
      }}>

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px, 2.8vh, 28px)" }}>

          {/* Available badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "5px 12px 5px 8px", borderRadius: 100,
              border: `1px solid ${divClr}`,
              background: metricBg,
            }}>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: dotGreen, flexShrink: 0 }}
              />
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: dotGreen,
              }}>Available for Projects</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: bodyClr }}>
              <MapPin size={11} />
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.6rem", fontWeight: 600, color: bodyClr,
              }}>UAE / Remote</span>
            </div>
          </div>

          {/* Name */}
          <div>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 800, lineHeight: 0.97,
              letterSpacing: "-0.04em",
              color: headingClr, margin: 0,
            }}>
              Haseeb<br />
              <span style={{ opacity: 0.92 }}>Qureshi.</span>
            </h1>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.82rem, 1.4vw, 1rem)",
              fontWeight: 600, letterSpacing: "0.03em",
              color: subClr, margin: "10px 0 0",
            }}>UI/UX Design Lead&nbsp;&nbsp;·&nbsp;&nbsp;Accessibility Specialist</p>
          </div>

          {/* Positioning statement */}
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.82rem, 1.15vw, 0.92rem)",
            lineHeight: 1.7, fontWeight: 500,
            color: bodyClr, margin: 0,
            maxWidth: 480,
          }}>
            I design interfaces that convert — from lo-fi sketches to pixel-perfect,
            WCAG-compliant systems that ship. Currently leading UX at Wired Hub.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <button style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.82rem", fontWeight: 700,
              letterSpacing: "0.02em", padding: "12px 28px",
              borderRadius: 100, border: "none", cursor: "pointer",
              background: primaryBg, color: primaryFg,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              View My Work <MoveRight size={14} />
            </button>
            <a href="mailto:qureshi.ux@gmail.com" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.82rem", fontWeight: 600,
              letterSpacing: "0.02em", padding: "11px 28px",
              borderRadius: 100, cursor: "pointer",
              border: `1.5px solid ${ghostBdr}`,
              color: ghostClr, background: "transparent",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <MessageCircle size={14} /> Let's Talk
            </a>
          </div>

          {/* Quick Tour */}
          <div style={{ position: "relative", display: "inline-flex" }}>
            <motion.div
              animate={{ scale: [1, 1.55, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute", inset: 0, borderRadius: 100,
                border: `1.5px solid ${ghostBdr}`, pointerEvents: "none",
              }}
            />
            <motion.button
              onClick={onStartTour}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.06em",
                padding: "8px 20px", borderRadius: 100,
                border: `1.5px solid ${ghostBdr}`,
                color: ghostClr, background: "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <Play size={10} style={{ fill: ghostClr }} /> Quick Tour
            </motion.button>
          </div>
        </div>

        {/* ── RIGHT — Stats ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.32, delay: 0.1 + i * 0.1 }}
              style={{
                background: metricBg,
                border: `1px solid ${metricBdr}`,
                borderRadius: 14,
                padding: "clamp(14px, 2vh, 20px) clamp(14px, 1.8vw, 20px)",
                display: "flex", flexDirection: "column", gap: 4,
              }}
            >
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: m.value.length > 4
                  ? "clamp(0.85rem, 1.4vw, 1rem)"
                  : "clamp(1.6rem, 2.6vw, 2.2rem)",
                fontWeight: 800, letterSpacing: "-0.03em",
                lineHeight: 1, color: headingClr,
              }}>{m.value}</span>
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "-0.01em", color: subClr,
              }}>{m.label}</span>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.56rem", fontWeight: 600,
                letterSpacing: "0.04em", color: bodyClr,
              }}>{m.sub}</span>
            </motion.div>
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: divClr, margin: "2px 0" }} />

          {/* Small detail */}
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.55rem", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: bodyClr, textAlign: "center",
          }}>qureshi.ux@gmail.com</span>
        </div>
      </div>

      {/* ── BOTTOM MARQUEE ── */}
      <div style={{
        flexShrink: 0,
        borderTop: `1px solid ${divClr}`,
        overflow: "hidden",
        position: "relative", zIndex: 2,
        padding: "10px 0",
      }}>
        <div style={{
          display: "flex",
          animation: "hq-ticker 36s linear infinite",
          width: "max-content",
        }}>
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
            <span key={i} style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: marqClr, whiteSpace: "nowrap",
              padding: "0 clamp(14px, 2vw, 24px)",
            }}>
              {s}
              <span style={{ color: marqSepClr, marginLeft: "clamp(14px, 2vw, 24px)" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 52, right: "clamp(28px, 5vw, 72px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        pointerEvents: "none", zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.5rem", letterSpacing: "0.22em",
          textTransform: "uppercase", color: bodyClr, fontWeight: 700,
        }}>Scroll</span>
        <div style={{ width: 1, height: 24, background: scrollLine }} />
      </div>
    </section>
  );
}
