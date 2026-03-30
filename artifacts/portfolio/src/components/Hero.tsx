import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle, Play } from "lucide-react";
import { motion } from "framer-motion";
import { ContactModal } from "./ContactModal";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const EASE = [0.16, 1, 0.3, 1] as const;

interface HeroProps { onStartTour?: () => void; }

export function Hero({ onStartTour }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeDoc, setActiveDock] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const isMobile = useBreakpoint(640);

  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  const bg        = isDark ? "#030303" : "#FFFFFF";
  const headClr   = isDark ? "#EFEFEF" : "#060606";
  const subClr    = isDark ? "#3C3C3C" : "#5E5E5E";
  const statNumClr= isDark ? "#D8D8D8" : "#0A0A0A";
  const statLblClr= isDark ? "#303030" : "#909090";
  const lineClr   = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
  const pillBdr   = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
  const pillBg    = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const green     = "#5EFF80";
  const greenLt   = "#1A7A32";
  const accent    = isDark ? green : greenLt;

  const dockBdr   = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
  const dockDivClr= isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const dockTxt   = isDark ? "#585858" : "#888888";
  const actBg     = "#FFFFFF";
  const actFg     = "#000000";

  const DOCK_ITEMS = [
    { label: "Work Process", icon: <MoveRight size={12} />, action: "process" },
    { label: "Talk",         icon: <MessageCircle size={12} />, action: "contact" },
    { label: "Tour",         icon: <Play size={11} />,          action: "tour" },
  ];

  return (
    <>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      <section style={{
        height: "100vh", paddingTop: 64, boxSizing: "border-box",
        background: bg, position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "background 0.4s",
      }}>

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
          opacity: 0.07,
          mixBlendMode: (isDark ? "overlay" : "multiply") as "overlay" | "multiply",
        }} />

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: isDark
            ? "radial-gradient(ellipse 70% 22% at 50% 50%, rgba(94,255,128,0.045) 0%, transparent 70%)"
            : "radial-gradient(ellipse 70% 22% at 50% 50%, rgba(26,122,50,0.03) 0%, transparent 70%)",
        }} />

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 2,
          paddingBottom: "clamp(72px, 12vh, 96px)",
        }}>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: isMobile ? "0.44rem" : "clamp(0.48rem, 0.7vw, 0.58rem)",
              fontWeight: 700, letterSpacing: isMobile ? "0.18em" : "0.26em",
              textTransform: "uppercase",
              color: subClr, margin: 0,
              marginBottom: "clamp(16px, 3vh, 36px)",
              textAlign: "center",
              padding: isMobile ? "0 16px" : 0,
            }}
          >
            Turning Complex Systems into Clean, Usable Interfaces
          </motion.p>

          {/* ── Name row with decorative lines ── */}
          <div style={{ display: "flex", alignItems: "center", width: "100%", position: "relative" }}>
            {/* Left line */}
            <div style={{ flex: 1, height: 1, position: "relative", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }} animate={{ width: "100%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
                style={{ position: "absolute", right: 0, top: 0, height: "0.5px", background: lineClr }}
              />
              {/* Pill — hidden on mobile */}
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
                  style={{
                    position: "absolute",
                    left: "clamp(32px, 6vw, 72px)",
                    top: "50%", transform: "translateY(-50%)",
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "5px 12px", borderRadius: 100,
                    border: `1px solid ${pillBdr}`, background: pillBg,
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
              )}
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.52 }}
              style={{ padding: `0 ${isMobile ? "clamp(12px, 3vw, 24px)" : "clamp(20px, 3.5vw, 52px)"}`, flexShrink: 0, textAlign: "center" }}
            >
              <h1 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.7rem, 8vw, 5.4rem)",
                fontWeight: 800, lineHeight: 1,
                letterSpacing: "-0.04em",
                color: headClr, margin: 0, whiteSpace: "nowrap",
              }}>
                Haseeb
                <span style={{ color: accent, margin: `0 ${isMobile ? "clamp(6px, 1.8vw, 14px)" : "clamp(10px, 1.6vw, 20px)"}`, fontWeight: 300, opacity: 0.7 }}>/</span>
                Qureshi.
              </h1>
            </motion.div>

            {/* Right line */}
            <div style={{ flex: 1, height: 1, position: "relative", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }} animate={{ width: "100%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
                style={{ position: "absolute", left: 0, top: 0, height: "0.5px", background: lineClr }}
              />
            </div>
          </div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.78 }}
            style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 18px)", marginTop: "clamp(14px, 2.5vh, 28px)" }}
          >
            {[
              { num: "2+",        lbl: "Years Exp." },
              { num: "10+",       lbl: "Certs"      },
              { num: "Wired Hub", lbl: ""            },
            ].map((s, i, arr) => (
              <div key={s.num} style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 18px)" }}>
                <span style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontVariantNumeric: "tabular-nums", fontWeight: 600,
                    fontSize: i < 2
                      ? (isMobile ? "0.85rem" : "clamp(0.85rem, 1.4vw, 1.1rem)")
                      : (isMobile ? "0.72rem" : "clamp(0.72rem, 1.1vw, 0.86rem)"),
                    letterSpacing: i < 2 ? "-0.03em" : "0", color: statNumClr,
                  }}>{s.num}</span>
                  {s.lbl && (
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: isMobile ? "0.44rem" : "0.5rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em", textTransform: "uppercase", color: statLblClr,
                    }}>{s.lbl}</span>
                  )}
                </span>
                {i < arr.length - 1 && (
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: accent, flexShrink: 0, opacity: 0.75 }} />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══ DOCK ══ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.95 }}
          style={{
            position: "absolute",
            bottom: isMobile ? "clamp(24px, 5vh, 40px)" : "clamp(36px, 7vh, 56px)",
            left: "50%", transform: "translateX(-50%)",
            zIndex: 10,
            width: isMobile ? "calc(100vw - 32px)" : 600,
            maxWidth: "calc(100vw - 32px)",
            display: "flex",
            border: `1px solid ${dockBdr}`, borderRadius: 6, overflow: "hidden",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {DOCK_ITEMS.map((item, i) => {
            const isActive = activeDoc === i;
            return (
              <div key={item.label} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                {i > 0 && <div style={{ width: 1, background: dockDivClr, flexShrink: 0 }} />}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveDock(i);
                    if (item.action === "contact") setContactOpen(true);
                    if (item.action === "tour") onStartTour?.();
                    if (item.action === "process") {
                      window.location.href = (import.meta.env.BASE_URL || "/") + "process";
                    }
                  }}
                  style={{
                    all: "unset", flex: 1, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 7,
                    padding: isMobile ? "11px 0" : "13px 0",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: isMobile ? "0.66rem" : "0.72rem",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.01em",
                    background: isActive ? actBg : "transparent",
                    color: isActive ? actFg : dockTxt,
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {item.label} {item.icon}
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
}
