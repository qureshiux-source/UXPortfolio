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

  const bg         = isDark ? "#040404" : "#FAFAFA";
  const headingClr = isDark ? "#F2F2F2" : "#080808";
  const subClr     = isDark ? "#888" : "#555";
  const bodyClr    = isDark ? "#545454" : "#787878";
  const divClr     = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const primaryBg  = isDark ? "#F2F2F2" : "#0A0A0A";
  const primaryFg  = isDark ? "#0A0A0A" : "#F2F2F2";
  const ghostBdr   = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";
  const ghostClr   = isDark ? "#B0B0B0" : "#282828";
  const dotGreen   = isDark ? "#5EFF80" : "#1A7A32";
  const marqClr    = isDark ? "#333" : "#C4C4C4";
  const marqSep    = isDark ? "#252525" : "#DCDCDC";
  const scrollLine = isDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)";
  const metDivClr  = isDark ? "#303030" : "#D8D8D8";

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

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,255,255,0.016) 0%, transparent 70%)"
          : "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.01) 0%, transparent 70%)",
      }} />

      {/* Centred content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 clamp(24px, 5vw, 64px)",
        position: "relative", zIndex: 2,
        gap: "clamp(18px, 2.8vh, 28px)",
        textAlign: "center",
      }}>

        {/* Status badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 13px 5px 9px", borderRadius: 100,
            border: `1px solid ${divClr}`,
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
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
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <MapPin size={10} style={{ color: bodyClr }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.6rem", fontWeight: 600, color: bodyClr,
            }}>Remote · Ontario, Canada</span>
          </div>
        </div>

        {/* Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(3.2rem, 7vw, 5.6rem)",
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: "-0.04em",
            color: headingClr, margin: 0,
          }}>
            Haseeb<br />
            <span style={{ opacity: 0.9 }}>Qureshi.</span>
          </h1>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.82rem, 1.4vw, 1rem)",
            fontWeight: 600, letterSpacing: "0.04em",
            color: subClr, margin: 0,
          }}>UI/UX Design Lead&nbsp;&nbsp;·&nbsp;&nbsp;Accessibility Specialist</p>
        </div>

        {/* Thin divider */}
        <div style={{ width: 36, height: 1, background: divClr }} />

        {/* Inline stat metrics — no boxes */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { value: "2+", label: "Years Experience" },
            { value: "10+", label: "Certifications" },
            { value: "UX Design Lead", label: "Wired Hub · Remote" },
          ].map((m, i, arr) => (
            <div key={m.label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 3, padding: "0 clamp(16px, 3vw, 32px)",
              }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: m.value.length > 3
                    ? "clamp(0.78rem, 1.2vw, 0.92rem)"
                    : "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 800, letterSpacing: "-0.03em",
                  lineHeight: 1, color: headingClr,
                }}>{m.value}</span>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.58rem", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: bodyClr,
                }}>{m.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 1, height: 32, background: metDivClr, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>

        {/* Brief positioning */}
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
          lineHeight: 1.7, fontWeight: 500,
          color: bodyClr, margin: 0, maxWidth: 480,
        }}>
          Turning complex systems into clean, usable interfaces — from lo-fi to pixel-perfect,
          WCAG-compliant products that ship.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.82rem", fontWeight: 700,
            letterSpacing: "0.02em", padding: "12px 26px",
            borderRadius: 100, border: "none", cursor: "pointer",
            background: primaryBg, color: primaryFg,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            My Work Process <MoveRight size={14} />
          </button>
          <a href="mailto:qureshi.ux@gmail.com" style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.82rem", fontWeight: 600,
            letterSpacing: "0.02em", padding: "11px 24px",
            borderRadius: 100, cursor: "pointer",
            border: `1.5px solid ${ghostBdr}`,
            color: ghostClr, background: "transparent",
            textDecoration: "none",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <MessageCircle size={14} /> Let's Talk
          </a>
          <div style={{ position: "relative", display: "inline-flex" }}>
            <motion.div
              animate={{ scale: [1, 1.55, 1], opacity: [0.28, 0, 0.28] }}
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
                letterSpacing: "0.06em", padding: "10px 20px",
                borderRadius: 100, border: `1.5px solid ${ghostBdr}`,
                color: ghostClr, background: "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              }}
            >
              <Play size={10} style={{ fill: ghostClr }} /> Quick Tour
            </motion.button>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        flexShrink: 0, borderTop: `1px solid ${divClr}`,
        overflow: "hidden", position: "relative", zIndex: 2,
        padding: "10px 0",
      }}>
        <div style={{ display: "flex", animation: "hq-ticker 38s linear infinite", width: "max-content" }}>
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
            <span key={i} style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.58rem", fontWeight: 700,
              letterSpacing: "0.13em", textTransform: "uppercase",
              color: marqClr, whiteSpace: "nowrap",
              padding: "0 clamp(14px, 2vw, 22px)",
            }}>
              {s}<span style={{ color: marqSep, marginLeft: "clamp(14px, 2vw, 22px)" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 52, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        pointerEvents: "none", zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: bodyClr, fontWeight: 700,
        }}>Scroll</span>
        <div style={{ width: 1, height: 24, background: scrollLine }} />
      </div>
    </section>
  );
}
