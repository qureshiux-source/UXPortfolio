import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle, Play } from "lucide-react";
import { motion } from "framer-motion";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

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

  /* Hero follows the theme — dark mode = dark bg, light mode = light bg */
  const bg         = isDark
    ? "linear-gradient(145deg, #0A0A0A 0%, #050505 55%, #020202 100%)"
    : "linear-gradient(145deg, #FFFFFF 0%, #FDFDFD 60%, #FAFAFA 100%)";
  const headingClr = isDark ? "#F5F5F5" : "#080808";
  const subClr     = isDark ? "#888888" : "#505050";
  const eyebrowClr = isDark ? "#888888" : "#505050";
  const dotClr     = isDark ? "#555555" : "#AAAAAA";
  const dividerClr = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const metricVal  = isDark ? "#F5F5F5" : "#080808";
  const metricLbl  = isDark ? "#707070" : "#606060";
  const metricBg   = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const metricBdr  = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.08)";
  const scrollClr  = isDark ? "#555555" : "#AAAAAA";
  const scrollLine = isDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)";
  const primaryBtn = { bg: isDark ? "#F5F5F5" : "#0A0A0A", fg: isDark ? "#0A0A0A" : "#F5F5F5" };
  const ghostBdr   = isDark ? "rgba(255,255,255,0.2)"  : "rgba(0,0,0,0.18)";
  const ghostClr   = isDark ? "#C8C8C8" : "#1A1A1A";

  const METRICS = [
    { value: "4+",          label: "Years Experience" },
    { value: "10+",         label: "Certifications" },
    { value: "Design Lead", label: "@ Wired Hub" },
  ];

  return (
    <section
      style={{
        height: "100vh", paddingTop: 64, boxSizing: "border-box",
        background: bg,
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        transition: "background 0.4s",
      }}
    >
      {/* Radial focal glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(255,255,255,0.025) 0%, transparent 70%)"
          : "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(0,0,0,0.02) 0%, transparent 70%)",
      }} />

      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: isDark ? 0.055 : 0.09,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      {/* Edge vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: isDark
          ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0,0,0,0.5) 100%)"
          : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0,0,0,0.04) 100%)",
      }} />

      <div style={{
        maxWidth: "48rem", width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 48px)",
        position: "relative", zIndex: 10,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotClr, flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrowClr,
            }}>Portfolio · UI/UX Design</span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotClr, flexShrink: 0 }} />
          </div>

          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
              fontWeight: 800, lineHeight: 1.03,
              letterSpacing: "-0.035em",
              color: headingClr, margin: 0,
            }}>Haseeb Qureshi</h1>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              fontWeight: 600, letterSpacing: "0.01em",
              color: subClr, margin: 0,
            }}>UI/UX Design Lead&nbsp;&nbsp;·&nbsp;&nbsp;Accessibility Specialist</p>
          </div>

          {/* Divider */}
          <div style={{ width: 40, height: 1, background: dividerClr }} />

          {/* Metric Bar */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12, width: "100%", maxWidth: 560,
          }}>
            {METRICS.map((m) => (
              <div key={m.label} style={{
                background: metricBg,
                border: `1px solid ${metricBdr}`,
                borderRadius: 14,
                padding: "20px 12px",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 7,
              }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: m.value.length > 4 ? "clamp(0.85rem, 1.5vw, 1.05rem)" : "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 800, letterSpacing: "-0.02em",
                  lineHeight: 1, color: metricVal,
                }}>{m.value}</span>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.58rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: metricLbl,
                }}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.82rem", fontWeight: 700,
              letterSpacing: "0.03em", padding: "12px 28px",
              borderRadius: 100, border: "none", cursor: "pointer",
              background: primaryBtn.bg, color: primaryBtn.fg,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              View My Work <MoveRight size={14} />
            </button>
            <a
              href="mailto:qureshi.ux@gmail.com"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.82rem", fontWeight: 600,
                letterSpacing: "0.02em", padding: "11px 28px",
                borderRadius: 100, cursor: "pointer",
                border: `1.5px solid ${ghostBdr}`,
                color: ghostClr, background: "transparent",
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              <MessageCircle size={14} /> Let's Talk
            </a>
          </div>

          {/* Quick Tour trigger */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: "100%", height: "100%",
                borderRadius: 100,
                border: `1.5px solid ${ghostBdr}`,
                pointerEvents: "none",
              }}
            />
            <motion.button
              onClick={onStartTour}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.06em",
                padding: "9px 22px",
                borderRadius: 100,
                border: `1.5px solid ${ghostBdr}`,
                color: ghostClr, background: "transparent",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
              }}
            >
              <Play size={11} style={{ fill: ghostClr }} />
              Quick Tour
            </motion.button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        pointerEvents: "none", zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.52rem", letterSpacing: "0.22em",
          textTransform: "uppercase", color: scrollClr, fontWeight: 700,
        }}>Scroll</span>
        <div style={{ width: 1, height: 28, background: scrollLine }} />
      </div>
    </section>
  );
}
