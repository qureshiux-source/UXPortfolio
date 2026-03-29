import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle, Play } from "lucide-react";
import { motion } from "framer-motion";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const EASE = [0.16, 1, 0.3, 1] as const;

interface HeroProps { onStartTour?: () => void; }

export function Hero({ onStartTour }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeDoc, setActiveDock] = useState(0); /* 0=Work Process, 1=Talk, 2=Tour */

  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  /* ── Tokens ── */
  const bg        = isDark ? "#030303" : "#FFFFFF";
  const headClr   = isDark ? "#EFEFEF" : "#060606";
  const subClr    = isDark ? "#3C3C3C" : "#5E5E5E";
  const statNumClr= isDark ? "#D8D8D8" : "#0A0A0A";
  const statLblClr= isDark ? "#303030" : "#909090";
  /* Line: 0.5px, opacity-20 white */
  const lineClr   = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const pillBdr   = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
  const pillBg    = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const green     = "#5EFF80";
  const greenLt   = "#1A7A32";
  const accent    = isDark ? green : greenLt;

  /* Dock tokens */
  const dockBdr   = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
  const dockDivClr= isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const dockTxt   = isDark ? "#585858" : "#888888";
  /* Active pill: pure white bg / black text */
  const actBg     = "#FFFFFF";
  const actFg     = "#000000";

  const DOCK_ITEMS = [
    { label: "Work Process", icon: <MoveRight size={12} />, onClick: undefined },
    { label: "Talk",         icon: <MessageCircle size={12} />, onClick: "mailto:qureshi.ux@gmail.com" },
    { label: "Tour",         icon: <Play size={11} />,          onClick: undefined },
  ];

  return (
    <section style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: bg, position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "background 0.4s",
    }}>

      {/* ── Noise — 7% ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: 0.07,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      {/* ── Axis glow — diffuse along the horizontal center ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: isDark
          ? "radial-gradient(ellipse 70% 22% at 50% 50%, rgba(94,255,128,0.045) 0%, transparent 70%)"
          : "radial-gradient(ellipse 70% 22% at 50% 50%, rgba(26,122,50,0.03) 0%, transparent 70%)",
      }} />

      {/* ══ CENTRE CONTENT ══ */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 2,
        /* bottom padding so content avoids the dock */
        paddingBottom: "clamp(72px, 12vh, 96px)",
      }}>

        {/* 1 ── Positioning statement ABOVE the axis */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.48rem, 0.7vw, 0.58rem)",
            fontWeight: 700, letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: subClr, margin: 0,
            marginBottom: "clamp(22px, 4vh, 36px)",
            textAlign: "center",
          }}
        >
          Turning Complex Systems into Clean, Usable Interfaces
        </motion.p>

        {/* 2 ── AXIS ROW — full-width flex: [left-line] [name] [right-line] */}
        <div style={{
          display: "flex", alignItems: "center",
          width: "100%", position: "relative",
        }}>

          {/* LEFT line segment — draws from name edge → left screen edge */}
          <div style={{ flex: 1, height: 1, position: "relative", overflow: "hidden" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
              style={{
                position: "absolute", right: 0, top: 0,
                height: "0.5px", background: lineClr,
              }}
            />
            {/* Designation pill — sits ON the line, to the left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
              style={{
                position: "absolute",
                left: "clamp(32px, 6vw, 72px)",
                top: "50%", transform: "translateY(-50%)",
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "5px 12px",
                borderRadius: 100,
                border: `1px solid ${pillBdr}`,
                background: pillBg,
                whiteSpace: "nowrap",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.25, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0 }}
              />
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.5rem", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
              }}>UI/UX Design Lead</span>
            </motion.div>
          </div>

          {/* NAME — the centerpiece */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.52 }}
            style={{
              padding: "0 clamp(20px, 3.5vw, 52px)",
              flexShrink: 0, textAlign: "center",
            }}
          >
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.8rem, 6.2vw, 5.4rem)",
              fontWeight: 800, lineHeight: 1,
              letterSpacing: "-0.04em",
              color: headClr, margin: 0,
              whiteSpace: "nowrap",
            }}>
              Haseeb
              <span style={{
                color: accent,
                margin: "0 clamp(10px, 1.6vw, 20px)",
                fontWeight: 300, opacity: 0.7,
              }}>/</span>
              Qureshi.
            </h1>
          </motion.div>

          {/* RIGHT line segment — draws from name edge → right screen edge */}
          <div style={{ flex: 1, height: 1, position: "relative", overflow: "hidden" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
              style={{
                position: "absolute", left: 0, top: 0,
                height: "0.5px", background: lineClr,
              }}
            />
          </div>
        </div>

        {/* 3 ── Stats — single line, green dot separators */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.78 }}
          style={{
            display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 18px)",
            marginTop: "clamp(18px, 3vh, 28px)",
          }}
        >
          {[
            { num: "2+",          lbl: "Years Exp."     },
            { num: "10+",         lbl: "Certs"          },
            { num: "Wired Hub",   lbl: ""               },
          ].map((s, i, arr) => (
            <div key={s.num} style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 18px)" }}>
              <span style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 600,
                  fontSize: i < 2 ? "clamp(0.85rem, 1.4vw, 1.1rem)" : "clamp(0.72rem, 1.1vw, 0.86rem)",
                  letterSpacing: i < 2 ? "-0.03em" : "0",
                  color: statNumClr,
                }}>{s.num}</span>
                {s.lbl && (
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.5rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: statLblClr,
                  }}>{s.lbl}</span>
                )}
              </span>
              {/* Green dot separator */}
              {i < arr.length - 1 && (
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent, flexShrink: 0, opacity: 0.75 }} />
              )}
            </div>
          ))}
        </motion.div>

      </div>

      {/* ══ CONTROL DOCK — hardware toggle bar ══ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.95 }}
        style={{
          position: "absolute",
          bottom: "clamp(36px, 7vh, 56px)",
          left: "50%", transform: "translateX(-50%)",
          zIndex: 10,
          width: 600, maxWidth: "calc(100vw - 48px)",
          display: "flex",
          border: `1px solid ${dockBdr}`,
          borderRadius: 6,
          overflow: "hidden",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {DOCK_ITEMS.map((item, i) => {
          const isActive = activeDoc === i;
          return (
            <div key={item.label} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
              {/* Divider between sections */}
              {i > 0 && (
                <div style={{ width: 1, background: dockDivClr, flexShrink: 0 }} />
              )}
              {item.onClick
                ? (
                  <motion.a
                    href={item.onClick as string}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveDock(i)}
                    style={{
                      flex: 1, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: 7, padding: "13px 0",
                      textDecoration: "none",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.72rem", fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.01em",
                      background: isActive ? actBg : "transparent",
                      color: isActive ? actFg : dockTxt,
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {item.label} {item.icon}
                  </motion.a>
                )
                : (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveDock(i);
                      if (item.label === "Tour") onStartTour?.();
                    }}
                    style={{
                      all: "unset", flex: 1, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      gap: 7, padding: "13px 0",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.72rem", fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.01em",
                      background: isActive ? actBg : "transparent",
                      color: isActive ? actFg : dockTxt,
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {item.label} {item.icon}
                  </motion.button>
                )
              }
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
