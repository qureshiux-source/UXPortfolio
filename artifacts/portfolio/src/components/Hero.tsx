import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle, Play } from "lucide-react";
import { motion } from "framer-motion";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const MARQUEE_SKILLS = [
  "User Research", "Wireframing", "Prototyping", "Design Systems",
  "WCAG 2.1 AAA", "Figma", "Information Architecture", "Journey Mapping",
  "Usability Testing", "Accessibility", "Hi-Fi Mockups", "Dev Handoff",
  "A/B Testing", "UX Audits", "Visual Hierarchy", "ProtoPie", "Interaction Design",
];

/* Mask-reveal ease — smooth exponential out */
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

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

  /* Palette */
  const bg        = isDark ? "#040404" : "#FAFAFA";
  const headingClr= isDark ? "#F2F2F2" : "#080808";
  const subClr    = isDark ? "#787878" : "#505050";
  const bodyClr   = isDark ? "#444" : "#888";
  const divClr    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const dotGreen  = isDark ? "#5EFF80" : "#1A7A32";
  const marqClr   = isDark ? "#2C2C2C" : "#C8C8C8";
  const marqSep   = isDark ? "#202020" : "#E0E0E0";

  /* Stat separator */
  const statSep   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  /* Name divider */
  const nameSep   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  /* Dock */
  const dockBg    = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const dockBdr   = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.09)";
  const dockSep   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const dockTxt   = isDark ? "#909090" : "#404040";
  const dockPrimBg= isDark ? "#F0F0F0" : "#0A0A0A";
  const dockPrimFg= isDark ? "#0A0A0A" : "#F0F0F0";

  /* ── STATS ── */
  const STATS = [
    { value: "2+",           label: "Years Exp." },
    { value: "10+",          label: "Certs"       },
    { value: "Design Lead",  label: "Wired Hub"   },
  ];

  return (
    <section style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: bg, position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "background 0.4s",
    }}>
      <style>{`
        @keyframes hq-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>

      {/* Noise overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: isDark ? 0.045 : 0.075,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
        zIndex: 1,
      }} />

      {/* Subtle radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: isDark
          ? "radial-gradient(ellipse 80% 55% at 50% 42%, rgba(255,255,255,0.013) 0%, transparent 70%)"
          : "radial-gradient(ellipse 80% 55% at 50% 42%, rgba(0,0,0,0.008) 0%, transparent 70%)",
      }} />

      {/* ── CENTRE STACK ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 clamp(24px, 5vw, 64px)",
        position: "relative", zIndex: 2,
        gap: "clamp(14px, 2.4vh, 22px)",
        textAlign: "center",
        paddingBottom: "clamp(80px, 12vh, 110px)", /* clear space for dock */
      }}>

        {/* 1 ── Status pill — tiny, above the name */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: REVEAL_EASE, delay: 0.05 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "4px 12px 4px 9px",
            borderRadius: 100,
            border: `1px solid ${divClr}`,
            background: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: dotGreen, flexShrink: 0 }}
          />
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.625rem",       /* 10px */
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: dotGreen,
          }}>Available for Projects</span>
        </motion.div>

        {/* 2 ── Name — mask reveal — Haseeb [divider] Qureshi. on one line */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2.2vw, 28px)" }}>

          {/* Haseeb — masked */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: REVEAL_EASE, delay: 0.12 }}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(3rem, 6.8vw, 5.8rem)",
                fontWeight: 800, lineHeight: 1,
                letterSpacing: "-0.04em",
                color: headingClr, margin: 0,
              }}
            >Haseeb</motion.h1>
          </div>

          {/* Vertical divider — 1px × 40px */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.5, ease: REVEAL_EASE, delay: 0.48 }}
            style={{
              width: 1, height: 40, flexShrink: 0,
              background: nameSep,
              transformOrigin: "center",
            }}
          />

          {/* Qureshi. — masked, slight stagger */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: REVEAL_EASE, delay: 0.22 }}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(3rem, 6.8vw, 5.8rem)",
                fontWeight: 800, lineHeight: 1,
                letterSpacing: "-0.04em",
                color: headingClr, margin: 0,
                opacity: 0.92,
              }}
            >Qureshi.</motion.h1>
          </div>
        </div>

        {/* 3 ── Role subtitle — mask reveal */}
        <div style={{ overflow: "hidden" }}>
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, ease: REVEAL_EASE, delay: 0.34 }}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.75rem, 1.3vw, 0.95rem)",
              fontWeight: 600, letterSpacing: "0.06em",
              color: subClr, margin: 0,
            }}
          >
            UI/UX Design Lead&nbsp;&nbsp;·&nbsp;&nbsp;Accessibility Specialist
          </motion.p>
        </div>

        {/* Thin rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: REVEAL_EASE, delay: 0.46 }}
          style={{ width: 28, height: 1, background: divClr }}
        />

        {/* 4 ── Stat row — no backgrounds, Poppins Medium for numbers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: REVEAL_EASE, delay: 0.55 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          {STATS.map((s, i, arr) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 2, padding: "0 clamp(14px, 2.8vw, 30px)",
              }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,                   /* Medium — monospace-adjacent precision */
                  fontVariantNumeric: "tabular-nums",
                  fontSize: s.value.length > 3
                    ? "clamp(0.7rem, 1.1vw, 0.85rem)"
                    : "clamp(1.5rem, 2.8vw, 2.2rem)",
                  letterSpacing: s.value.length > 3 ? "0" : "-0.04em",
                  lineHeight: 1, color: headingClr,
                }}>{s.value}</span>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.52rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: bodyClr,
                }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 1, height: 28, background: statSep, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* 5 ── One-line tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: REVEAL_EASE, delay: 0.65 }}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.76rem, 1vw, 0.86rem)",
            lineHeight: 1.7, fontWeight: 500,
            color: bodyClr, margin: 0, maxWidth: 440,
          }}
        >
          Turning complex systems into clean, usable interfaces — from lo-fi to pixel-perfect,
          WCAG-compliant products that ship.
        </motion.p>

      </div>

      {/* ── CTA DOCK — floating, backdrop-blurred pill ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: REVEAL_EASE, delay: 0.72 }}
        style={{
          position: "absolute",
          bottom: "clamp(48px, 9vh, 72px)",
          left: "50%", transform: "translateX(-50%)",
          zIndex: 10,

          display: "inline-flex", alignItems: "stretch",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          background: dockBg,
          border: `1px solid ${dockBdr}`,
          borderRadius: 100,
          padding: "5px",
          gap: 0,
        }}
      >
        {/* Work Process — solid primary */}
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            all: "unset", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "10px 20px",
            borderRadius: 100,
            background: dockPrimBg, color: dockPrimFg,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Work Process <MoveRight size={12} />
        </motion.button>

        {/* Separator */}
        <div style={{ width: 1, background: dockSep, margin: "6px 0" }} />

        {/* Talk — ghost */}
        <motion.a
          href="mailto:qureshi.ux@gmail.com"
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "10px 20px", borderRadius: 100,
            textDecoration: "none",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.75rem", fontWeight: 600,
            letterSpacing: "0.01em",
            color: dockTxt,
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          <MessageCircle size={13} /> Talk
        </motion.a>

        {/* Separator */}
        <div style={{ width: 1, background: dockSep, margin: "6px 0" }} />

        {/* Tour — ghost + pulsing ring */}
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 1 }}
            style={{
              position: "absolute", inset: 0, borderRadius: 100,
              border: `1px solid ${dockBdr}`, pointerEvents: "none",
            }}
          />
          <motion.button
            onClick={onStartTour}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              all: "unset", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "10px 20px", borderRadius: 100,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.75rem", fontWeight: 600,
              letterSpacing: "0.01em",
              color: dockTxt,
              whiteSpace: "nowrap",
            }}
          >
            <Play size={11} style={{ fill: dockTxt }} /> Tour
          </motion.button>
        </div>
      </motion.div>

      {/* ── MARQUEE ── */}
      <div style={{
        flexShrink: 0,
        borderTop: `1px solid ${divClr}`,
        overflow: "hidden",
        position: "relative", zIndex: 2,
        padding: "9px 0",
      }}>
        <div style={{
          display: "flex",
          animation: "hq-ticker 40s linear infinite",
          width: "max-content",
        }}>
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
            <span key={i} style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.55rem", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: marqClr, whiteSpace: "nowrap",
              padding: "0 clamp(14px, 2vw, 20px)",
            }}>
              {s}<span style={{ color: marqSep, marginLeft: "clamp(14px, 2vw, 20px)" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
