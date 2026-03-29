import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle, Play } from "lucide-react";
import { motion } from "framer-motion";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const MARQUEE_SKILLS = [
  "User Research","Wireframing","Prototyping","Design Systems","WCAG 2.1 AAA",
  "Figma","Information Architecture","Journey Mapping","Usability Testing",
  "Accessibility","Hi-Fi Mockups","Dev Handoff","A/B Testing","UX Audits",
  "Visual Hierarchy","ProtoPie","Interaction Design",
];

const REVEAL = [0.16, 1, 0.3, 1] as const;

interface HeroProps { onStartTour?: () => void; }

export function Hero({ onStartTour }: HeroProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hov1, setHov1] = useState(false);
  const [hov2, setHov2] = useState(false);
  const [hov3, setHov3] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  /* ── Tokens ── */
  const bg        = isDark ? "#030303" : "#F8F8F8";
  const line      = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const corner    = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.14)";
  const green     = "#5EFF80";
  const greenLt   = "#1A7A32";
  const dotGreen  = isDark ? green : greenLt;
  const headClr   = isDark ? "#EEEEEE" : "#0A0A0A";
  const subClr    = isDark ? "#505050" : "#707070";
  const bodyClr   = isDark ? "#383838" : "#808080";
  const linkClr   = isDark ? "#5A5A5A" : "#505050";
  const linkUl    = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const linkUlHov = isDark ? green : greenLt;
  const marqClr   = isDark ? "#242424" : "#CECECE";
  const marqSep   = isDark ? "#181818" : "#E4E4E4";
  const divClr    = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";

  const statLbl   = isDark ? "#303030" : "#B0B0B0";

  const STATS = [
    { num: "2+",  lbl: "Years Exp."     },
    { num: "10+", lbl: "Certifications" },
    { num: "—",   lbl: "Wired Hub"      },
  ];

  const CTAS = [
    { label: "Work Process", icon: <MoveRight size={11} />, action: undefined,                        hov: hov1, set: setHov1 },
    { label: "Let's Talk",   icon: <MessageCircle size={11} />, action: "mailto:qureshi.ux@gmail.com", hov: hov2, set: setHov2 },
    { label: "Quick Tour",   icon: <Play size={10} />,          action: undefined,                    hov: hov3, set: setHov3 },
  ];

  /* Corner bracket dimensions */
  const CORNER = 18;
  const CBW    = 1.5;

  return (
    <section style={{
      height: "100vh", paddingTop: 64, boxSizing: "border-box",
      background: bg, position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      transition: "background 0.4s",
    }}>
      <style>{`@keyframes hq-ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>

      {/* Noise grain */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: NOISE_SVG, backgroundSize: "160px 160px",
        opacity: isDark ? 0.05 : 0.07,
        mixBlendMode: (isDark ? "overlay" : "multiply") as const,
      }} />

      {/* ── MAIN AREA ── */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 2,
      }}>

        {/* ══ HUD CONTAINER: 700 × 500 ══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: REVEAL }}
          style={{
            width: 700, height: 500,
            position: "relative",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
            borderRadius: 2,
            flexShrink: 0,
          }}
        >

          {/* ── Atmosphere: green glow projected from crosshair center ── */}
          {isDark && (
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
              borderRadius: 2, overflow: "hidden",
              background: "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(94,255,128,0.055) 0%, rgba(94,255,128,0.01) 40%, transparent 70%)",
            }} />
          )}
          {!isDark && (
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
              borderRadius: 2, overflow: "hidden",
              background: "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(26,122,50,0.04) 0%, transparent 65%)",
            }} />
          )}

          {/* ── Corner brackets ── */}
          {[
            { top: -1, left: -1, bt: "top", bl: "left" },
            { top: -1, right: -1, bt: "top", bl: "right" },
            { bottom: -1, left: -1, bt: "bottom", bl: "left" },
            { bottom: -1, right: -1, bt: "bottom", bl: "right" },
          ].map((c, i) => (
            <div key={i} style={{
              position: "absolute",
              ...(c.top    !== undefined ? { top:    c.top    } : {}),
              ...(c.bottom !== undefined ? { bottom: c.bottom } : {}),
              ...(c.left   !== undefined ? { left:   c.left   } : {}),
              ...(c.right  !== undefined ? { right:  c.right  } : {}),
              width: CORNER, height: CORNER, pointerEvents: "none", zIndex: 4,
              borderTop:    c.bt === "top"    ? `${CBW}px solid ${corner}` : "none",
              borderBottom: c.bt === "bottom" ? `${CBW}px solid ${corner}` : "none",
              borderLeft:   c.bl === "left"   ? `${CBW}px solid ${corner}` : "none",
              borderRight:  c.bl === "right"  ? `${CBW}px solid ${corner}` : "none",
            }} />
          ))}

          {/* ── Crosshair — horizontal ── */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: 1, background: line, zIndex: 1,
            transform: "translateY(-0.5px)",
          }} />

          {/* ── Crosshair — vertical ── */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 1, background: line, zIndex: 1,
            transform: "translateX(-0.5px)",
          }} />

          {/* ── Center pulsing dot ── */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Outer ring pulse */}
            <motion.div
              animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              style={{
                position: "absolute", width: 10, height: 10, borderRadius: "50%",
                background: dotGreen, opacity: 0.35,
              }}
            />
            {/* Middle ring */}
            <motion.div
              animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
              style={{
                position: "absolute", width: 7, height: 7, borderRadius: "50%",
                background: dotGreen,
              }}
            />
            {/* Core dot */}
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: dotGreen }} />
          </div>

          {/* ── 2 × 2 GRID of quadrant content ── */}
          <div style={{
            position: "absolute", inset: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            zIndex: 2,
          }}>

            {/* ▸ TL — Name + Designation */}
            <motion.div
              initial={{ opacity: 0, x: -8, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: REVEAL, delay: 0.18 }}
              style={{
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", alignItems: "flex-end",
                padding: "0 32px 28px 0",
                textAlign: "right",
              }}
            >
              <h1 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                fontWeight: 800, letterSpacing: "-0.03em",
                lineHeight: 1.1, color: headClr, margin: 0,
              }}>Haseeb Qureshi.</h1>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.58rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: subClr, margin: "8px 0 0",
              }}>UI/UX Design Lead</p>
            </motion.div>

            {/* ▸ TR — Stats */}
            <motion.div
              initial={{ opacity: 0, x: 8, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: REVEAL, delay: 0.26 }}
              style={{
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", alignItems: "flex-start",
                padding: "0 0 28px 32px",
                gap: 10,
              }}
            >
              {STATS.map((s) => (
                <div key={s.lbl} style={{
                  display: "flex", alignItems: "baseline", gap: 10,
                }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    fontSize: s.num === "—" ? "0.7rem" : "clamp(1rem, 1.8vw, 1.3rem)",
                    letterSpacing: "-0.03em",
                    color: s.num === "—" ? statLbl : headClr,
                    lineHeight: 1, minWidth: 36,
                  }}>{s.num}</span>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.55rem", fontWeight: 700,
                    letterSpacing: "0.16em", textTransform: "uppercase",
                    color: statLbl,
                  }}>{s.lbl}</span>
                </div>
              ))}
            </motion.div>

            {/* ▸ BL — Paragraph */}
            <motion.div
              initial={{ opacity: 0, x: -8, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: REVEAL, delay: 0.34 }}
              style={{
                display: "flex",
                justifyContent: "flex-end", alignItems: "flex-start",
                padding: "28px 32px 0 0",
              }}
            >
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.72rem, 0.95vw, 0.8rem)",
                fontWeight: 500, lineHeight: 2.1,
                color: bodyClr, margin: 0,
                maxWidth: 300,
                textAlign: "right",
              }}>
                Turning complex systems into clean, usable interfaces — from lo-fi to
                pixel-perfect, WCAG-compliant products that ship.
              </p>
            </motion.div>

            {/* ▸ BR — CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 8, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, ease: REVEAL, delay: 0.42 }}
              style={{
                display: "flex", flexDirection: "column",
                justifyContent: "flex-start", alignItems: "flex-start",
                padding: "28px 0 0 32px",
                gap: 14,
              }}
            >
              {CTAS.map(({ label, icon, action, hov, set }) => {
                const isHov = hov;
                const el = action
                  ? (
                    <motion.a
                      key={label}
                      href={action}
                      onMouseEnter={() => set(true)}
                      onMouseLeave={() => set(false)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.74rem", fontWeight: 600,
                        letterSpacing: "0.01em",
                        color: isHov ? dotGreen : linkClr,
                        textDecoration: "none", cursor: "pointer",
                        borderBottom: `1px solid ${isHov ? linkUlHov : linkUl}`,
                        paddingBottom: 2,
                        transition: "color 0.18s, border-color 0.18s",
                      }}
                    >
                      {label} {icon}
                    </motion.a>
                  )
                  : (
                    <motion.button
                      key={label}
                      onMouseEnter={() => set(true)}
                      onMouseLeave={() => set(false)}
                      onClick={label === "Quick Tour" ? onStartTour : undefined}
                      style={{
                        all: "unset", cursor: "pointer",
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.74rem", fontWeight: 600,
                        letterSpacing: "0.01em",
                        color: isHov ? dotGreen : linkClr,
                        borderBottom: `1px solid ${isHov ? linkUlHov : linkUl}`,
                        paddingBottom: 2,
                        transition: "color 0.18s, border-color 0.18s",
                      }}
                    >
                      {label} {icon}
                    </motion.button>
                  );
                return el;
              })}
            </motion.div>

          </div>{/* end grid */}

        </motion.div>{/* end HUD container */}
      </div>

      {/* ── MARQUEE ── */}
      <div style={{
        flexShrink: 0, borderTop: `1px solid ${divClr}`,
        overflow: "hidden", position: "relative", zIndex: 2, padding: "9px 0",
      }}>
        <div style={{ display: "flex", animation: "hq-ticker 42s linear infinite", width: "max-content" }}>
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
            <span key={i} style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.5rem", fontWeight: 700,
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
