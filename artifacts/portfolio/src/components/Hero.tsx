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

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

interface HeroProps { onStartTour?: () => void; }

export function Hero({ onStartTour }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [talkHov, setTalkHov] = useState(false);
  const [tourHov, setTourHov] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  /* ── Tokens ── */
  const bg         = isDark ? "#040404" : "#FAFAFA";
  const headingClr = isDark ? "#F0F0F0" : "#080808";
  const subClr     = isDark ? "#606060" : "#545454";
  const bodyClr    = isDark ? "#3A3A3A" : "#909090";
  const divClr     = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const dotGreen   = isDark ? "#5EFF80" : "#1A7A32";
  const marqClr    = isDark ? "#282828" : "#CACACA";
  const marqSep    = isDark ? "#1C1C1C" : "#E2E2E2";
  const statSep    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  /* Name divider — 0.5px, opacity-20 (more muted, hair-thin) */
  const nameSep    = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";

  /* Dock */
  const dockBg     = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const dockBdr    = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.09)";
  const dockSep    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  /* Work Process — solid pure white (dark) / pure black (light) */
  const primBg     = "#FFFFFF";
  const primFg     = "#000000";
  const primBgLt   = "#0A0A0A";
  const primFgLt   = "#FFFFFF";

  /* Ghost buttons — border invisible at rest, visible on hover */
  const ghostTxtD  = isDark ? "#7A7A7A" : "#505050";
  const ghostBdrVis= isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)";

  const STATS = [
    { value: "2+",          label: "Years Exp."  },
    { value: "10+",         label: "Certs"        },
    { value: "Design Lead", label: "Wired Hub"    },
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

      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: isDark ? 0.045 : 0.072,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      {/* Atmosphere — white base radial */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: isDark
          ? "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,255,255,0.011) 0%, transparent 65%)"
          : "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,0,0,0.007) 0%, transparent 65%)",
      }} />

      {/* Atmosphere — green glow behind name (dark only) */}
      {isDark && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(ellipse 55% 38% at 50% 42%, rgba(94,255,128,0.05) 0%, transparent 65%)",
        }} />
      )}

      {/* ── CENTRE STACK ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 clamp(32px, 6vw, 80px)",
        position: "relative", zIndex: 2,
        textAlign: "center",
        paddingBottom: "clamp(88px, 13vh, 120px)",
      }}>

        {/* ── NAME BLOCK — badge hugs name tightly above it ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>

          {/* Status badge — floats just above name, intimate proximity */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: REVEAL_EASE, delay: 0.06 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "3px 10px 3px 7px",
              borderRadius: 100,
              border: `1px solid ${divClr}`,
              background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: dotGreen, flexShrink: 0 }}
            />
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.5625rem",   /* 9px — truly a status tag */
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: dotGreen,
            }}>Available for Projects</span>
          </motion.div>

          {/* Haseeb [|] Qureshi. — one line, mask-revealed */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 2vw, 24px)" }}>
            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.88, ease: REVEAL_EASE, delay: 0.13 }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  /* ↓ reduced to breathe away from edges */
                  fontSize: "clamp(2.6rem, 5.8vw, 4.8rem)",
                  fontWeight: 800, lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: headingClr, margin: 0,
                }}
              >Haseeb</motion.h1>
            </div>

            {/* 0.5px divider, opacity-20 — hair-thin, barely-there */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.45, ease: REVEAL_EASE, delay: 0.5 }}
              style={{
                width: "0.5px", height: 40, flexShrink: 0,
                background: nameSep,
                transformOrigin: "center",
              }}
            />

            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.88, ease: REVEAL_EASE, delay: 0.22 }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(2.6rem, 5.8vw, 4.8rem)",
                  fontWeight: 800, lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: headingClr, margin: 0, opacity: 0.9,
                }}
              >Qureshi.</motion.h1>
            </div>
          </div>

          {/* Role — mask reveal */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.72, ease: REVEAL_EASE, delay: 0.34 }}
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.72rem, 1.2vw, 0.88rem)",
                fontWeight: 600, letterSpacing: "0.06em",
                color: subClr, margin: 0,
              }}
            >
              UI/UX Design Lead&nbsp;&nbsp;·&nbsp;&nbsp;Accessibility Specialist
            </motion.p>
          </div>
        </div>

        {/* ── Extra 2rem breathing space between name and stats ── */}
        <div style={{ height: "clamp(20px, 3.5vh, 36px)" }} />

        {/* Thin rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: REVEAL_EASE, delay: 0.44 }}
          style={{ width: 24, height: "0.5px", background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", marginBottom: "clamp(14px, 2.4vh, 20px)" }}
        />

        {/* Stat row — no backgrounds, numbers larger than labels */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: REVEAL_EASE, delay: 0.54 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          {STATS.map((s, i, arr) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 4, padding: "0 clamp(16px, 3vw, 32px)",
              }}>
                {/* Number — prominent */}
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                  fontSize: s.value.length > 3
                    ? "clamp(0.72rem, 1.1vw, 0.88rem)"
                    : "clamp(1.6rem, 3.2vw, 2.4rem)",
                  letterSpacing: s.value.length > 3 ? "0" : "-0.04em",
                  lineHeight: 1, color: headingClr,
                }}>{s.value}</span>
                {/* Label — very small, widely tracked */}
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.46rem", fontWeight: 700,
                  letterSpacing: "0.22em",   /* tracking-widest */
                  textTransform: "uppercase",
                  color: bodyClr,
                }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: "0.5px", height: 24, background: statSep, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Tagline — constrained, editorial line-height */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: REVEAL_EASE, delay: 0.64 }}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.74rem, 0.95vw, 0.84rem)",
            lineHeight: 2.05,            /* editorial — generous leading */
            fontWeight: 500,
            color: bodyClr, margin: "clamp(14px, 2.4vh, 20px) 0 0",
            maxWidth: "450px",           /* tight column */
          }}
        >
          Turning complex systems into clean, usable interfaces — from lo-fi to
          pixel-perfect, WCAG-compliant products that ship.
        </motion.p>

      </div>

      {/* ── CTA DOCK ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62, ease: REVEAL_EASE, delay: 0.7 }}
        style={{
          position: "absolute",
          bottom: "clamp(46px, 9vh, 70px)",
          left: "50%", transform: "translateX(-50%)",
          zIndex: 10,
          display: "inline-flex", alignItems: "stretch",
          backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
          background: dockBg,
          border: `1px solid ${dockBdr}`,
          borderRadius: 100,
          padding: "5px",
        }}
      >
        {/* Work Process — solid crisp white/black */}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          style={{
            all: "unset", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "10px 22px", borderRadius: 100,
            background: isDark ? primBg : primBgLt,
            color: isDark ? primFg : primFgLt,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.74rem", fontWeight: 700,
            letterSpacing: "0.01em", whiteSpace: "nowrap",
          }}
        >
          Work Process <MoveRight size={12} />
        </motion.button>

        {/* Sep */}
        <div style={{ width: "0.5px", background: dockSep, margin: "6px 0" }} />

        {/* Talk — ghost, border on hover only */}
        <motion.a
          href="mailto:qureshi.ux@gmail.com"
          onMouseEnter={() => setTalkHov(true)}
          onMouseLeave={() => setTalkHov(false)}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "9px 20px", borderRadius: 100,
            textDecoration: "none", cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.74rem", fontWeight: 600,
            letterSpacing: "0.01em", whiteSpace: "nowrap",
            color: talkHov
              ? (isDark ? "#E0E0E0" : "#101010")
              : ghostTxtD,
            border: `1px solid ${talkHov ? ghostBdrVis : "transparent"}`,
            transition: "color 0.18s, border-color 0.18s",
          }}
        >
          <MessageCircle size={13} /> Talk
        </motion.a>

        {/* Sep */}
        <div style={{ width: "0.5px", background: dockSep, margin: "6px 0" }} />

        {/* Tour — ghost, border on hover + pulsing ring */}
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
          <motion.div
            animate={{ scale: [1, 1.45, 1], opacity: [0.18, 0, 0.18] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            style={{
              position: "absolute", inset: 0, borderRadius: 100,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
              pointerEvents: "none",
            }}
          />
          <motion.button
            onClick={onStartTour}
            onMouseEnter={() => setTourHov(true)}
            onMouseLeave={() => setTourHov(false)}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            style={{
              all: "unset", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 20px", borderRadius: 100,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.74rem", fontWeight: 600,
              letterSpacing: "0.01em", whiteSpace: "nowrap",
              color: tourHov
                ? (isDark ? "#E0E0E0" : "#101010")
                : ghostTxtD,
              border: `1px solid ${tourHov ? ghostBdrVis : "transparent"}`,
              transition: "color 0.18s, border-color 0.18s",
            }}
          >
            <Play size={11} style={{ fill: tourHov
              ? (isDark ? "#E0E0E0" : "#101010")
              : ghostTxtD,
              transition: "fill 0.18s",
            }} /> Tour
          </motion.button>
        </div>
      </motion.div>

      {/* ── MARQUEE ── */}
      <div style={{
        flexShrink: 0, borderTop: `1px solid ${divClr}`,
        overflow: "hidden", position: "relative", zIndex: 2,
        padding: "9px 0",
      }}>
        <div style={{ display: "flex", animation: "hq-ticker 40s linear infinite", width: "max-content" }}>
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
            <span key={i} style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.52rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
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
