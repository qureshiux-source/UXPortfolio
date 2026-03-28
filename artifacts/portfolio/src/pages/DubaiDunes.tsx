import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowUpRight, X, ZoomIn } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { motion, useInView } from "framer-motion";

import imgBefore      from "@assets/Frame_1000002330_1774729080682.png";
import imgFinalMulti  from "@assets/Frame_1000002327_1774729151461.png";
import imgMoodboard   from "@assets/image_1_(2)_1774729177151.png";
import imgCompetitor  from "@assets/image_2_1774729201693.png";
import imgWire1       from "@assets/MacBook_Pro_16__-_1_1_1774729238420.png";
import imgWire2       from "@assets/MacBook_Pro_16__-_1_2_1774729243352.png";
import imgIter1       from "@assets/Landing_Page_(4)_1_1774729268639.png";
import imgIter2       from "@assets/Landing_Page_(3)_1_1774729283065.png";
import imgFinal       from "@assets/Dubai_Dunes_landing_Page_(1)_5_1774729296266.png";
import imgThumb       from "@assets/Thumbnail2_1_1774729315703.png";

/* ─── Constants ──────────────────────────────────────────── */
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const ITEM = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const CONTAINER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11 } },
};

/* ─── Hooks ──────────────────────────────────────────────── */
function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : system;
}

/* ─── Overlay layers ─────────────────────────────────────── */
function NoiseFx({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: NOISE, backgroundSize: "180px 180px",
      opacity: isDark ? 0.055 : 0.09,
      mixBlendMode: (isDark ? "overlay" : "multiply") as const,
    }} />
  );
}

function Grid({ isDark }: { isDark: boolean }) {
  const c = isDark ? "rgba(255,255,255,0.038)" : "rgba(0,0,0,0.038)";
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(${c} 1px,transparent 1px),linear-gradient(90deg,${c} 1px,transparent 1px)`,
      backgroundSize: "48px 48px",
    }} />
  );
}

/* ─── Lightbox ───────────────────────────────────────────── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.93)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "64px 24px 24px", overflowY: "auto", cursor: "zoom-out",
    }}>
      <button onClick={onClose} aria-label="Close" style={{
        position: "fixed", top: 18, right: 18, zIndex: 10000,
        width: 36, height: 36, borderRadius: "50%",
        background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><X size={16} /></button>
      <img src={src} alt={alt} onClick={e => e.stopPropagation()} style={{
        maxWidth: "min(94vw,1280px)", width: "100%", height: "auto", display: "block",
        cursor: "default", boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
      }} />
    </div>
  );
}

/* ─── Zoomable image ─────────────────────────────────────── */
function ZImg({
  src, alt, height, fit = "cover", pos = "top", bdr, badge, radius = 8, onOpen,
}: {
  src: string; alt: string; height: string;
  fit?: "cover" | "contain"; pos?: string;
  bdr: string; badge?: string; radius?: number;
  onOpen: (s: string, a: string) => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onOpen(src, alt)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "relative", cursor: "zoom-in", border: `1px solid ${bdr}`, borderRadius: radius, overflow: "hidden" }}
    >
      {badge && (
        <div style={{
          position: "absolute", top: 8, right: 8, zIndex: 3,
          background: "rgba(255,255,255,0.9)", color: "#080808",
          fontFamily: "'Poppins',sans-serif", fontSize: "0.46rem",
          fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "3px 8px",
        }}>{badge}</div>
      )}
      <img src={src} alt={alt} style={{
        width: "100%", height, objectFit: fit, objectPosition: pos, display: "block",
        transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.25s",
        transform: hov ? "scale(1.025)" : "scale(1)",
        filter: hov ? "brightness(0.65)" : "brightness(1)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: hov ? 1 : 0, transition: "opacity 0.22s", pointerEvents: "none",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><ZoomIn size={15} color="rgba(255,255,255,0.9)" /></div>
        <span style={{
          fontFamily: "'Raleway',sans-serif", fontSize: "0.6rem", fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)",
        }}>View Full Image</span>
      </div>
    </div>
  );
}

/* ─── Glassmorphism callout tag ──────────────────────────── */
function Callout({ label, top, left, right, isDark }: {
  label: string; top?: string; left?: string; right?: string; isDark: boolean;
}) {
  return (
    <div style={{
      position: "absolute", top, left, right, zIndex: 4,
      background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.55)",
      backdropFilter: "blur(10px) saturate(180%)",
      border: isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.25)",
      padding: "5px 10px",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: isDark ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.8)", flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Poppins',sans-serif", fontSize: "0.5rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: isDark ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.92)",
      }}>{label}</span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function DubaiDunes() {
  const isDark = useDark();
  const [, navigate] = useLocation();
  const [lb, setLb] = useState<{ src: string; alt: string } | null>(null);

  const open  = (src: string, alt: string) => setLb({ src, alt });
  const close = () => setLb(null);

  /* palette */
  const bg    = isDark ? "#030303" : "#FFFFFF";
  const bgAlt = isDark ? "#060606" : "#FAFAFA";
  const head  = isDark ? "#F5F5F5" : "#080808";
  const body  = isDark ? "#707070" : "#555555";
  const ey    = isDark ? "#484848" : "#999999";
  const div   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const bdr   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
  const glass = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const green = isDark ? "#5EFF80" : "#1A7A32";

  /* shared styles */
  const SEC: React.CSSProperties = {
    scrollSnapAlign: "start", scrollSnapStop: "always",
    height: "100vh", paddingTop: 64, boxSizing: "border-box",
    display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center",
    position: "relative", overflow: "hidden",
    transition: "background 0.4s",
  };
  const INNER: React.CSSProperties = {
    maxWidth: 920, width: "100%",
    padding: "0 clamp(24px,5vw,64px)",
    position: "relative", zIndex: 1,
  };
  const EY: React.CSSProperties = {
    fontFamily: "'Raleway',sans-serif", fontSize: "0.57rem",
    fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: ey,
  };
  const H2: React.CSSProperties = {
    fontFamily: "'Poppins',sans-serif",
    fontSize: "clamp(1.4rem,2.6vw,2rem)",
    fontWeight: 800, letterSpacing: "-0.025em", color: head, margin: 0,
  };
  const BODY: React.CSSProperties = {
    fontFamily: "'Raleway',sans-serif",
    fontSize: "clamp(0.76rem,1vw,0.85rem)",
    lineHeight: 1.75, color: body, fontWeight: 500, margin: 0,
  };

  /* ── Friction bento ref ── */
  const frRef  = useRef(null);
  const frView = useInView(frRef, { once: true, amount: 0.35 });
  const logRef  = useRef(null);
  const logView = useInView(logRef, { once: true, amount: 0.35 });
  const sysRef  = useRef(null);
  const sysView = useInView(sysRef, { once: true, amount: 0.25 });
  const discRef  = useRef(null);
  const discView = useInView(discRef, { once: true, amount: 0.3 });

  return (
    <div style={{ background: bg }}>
      <Navbar />
      {lb && <Lightbox src={lb.src} alt={lb.alt} onClose={close} />}

      <div style={{
        height: "100vh", overflowY: "scroll", overflowX: "hidden",
        scrollSnapType: "y mandatory", scrollBehavior: "smooth",
      }}>

        {/* ══════════════════════════════════════════════════
            S1 · THE IDENTITY (Hero)
        ══════════════════════════════════════════════════ */}
        <section style={{ ...SEC, background: bg }}>
          <Grid isDark={isDark} />
          <NoiseFx isDark={isDark} />

          <div style={{ ...INNER, display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(28px,4vw,52px)", alignItems: "center" }}>
            {/* Left: copy */}
            <div>
              <button onClick={() => navigate("/")} style={{
                fontFamily: "'Raleway',sans-serif", fontSize: "0.65rem", fontWeight: 600,
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: ey, background: "none", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                padding: 0, marginBottom: 32,
              }}>
                <ArrowLeft size={11} /> Back to Work
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={EY}>Case Study · Real Estate UX · 2026</span>
              </div>

              <h1 style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "clamp(1.7rem,3.4vw,2.8rem)",
                fontWeight: 800, letterSpacing: "-0.035em",
                lineHeight: 1.08, color: head, margin: "0 0 18px",
              }}>
                DUBAI DUNES:<br />THE LUXURY<br />SCHEMATIC.
              </h1>

              <p style={{ ...BODY, maxWidth: 380, marginBottom: 28 }}>
                Redefining high-net-worth digital trust through restraint and clarity.
              </p>

              <div style={{ display: "flex", gap: "clamp(18px,3.5vw,40px)", flexWrap: "wrap" }}>
                {[["Role", "Lead UX Designer"], ["Year", "2026"], ["Type", "Solo Project"], ["Tool", "Figma"]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ ...EY, fontSize: "0.5rem", marginBottom: 4 }}>{l}</div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: head }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: hero image */}
            <div style={{ position: "relative" }}>
              <ZImg src={imgThumb} alt="Dubai Dunes — final design presentation" height="clamp(260px,42vh,370px)" fit="cover" pos="center" bdr={bdr} radius={6} onOpen={open} />
              {/* Corner tag */}
              <div style={{
                position: "absolute", bottom: -1, left: -1,
                border: `1px solid ${bdr}`, background: glass,
                backdropFilter: "blur(8px)",
                padding: "6px 12px",
                fontFamily: "'Poppins',sans-serif", fontSize: "0.48rem",
                fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ey,
              }}>High-End Engineering · Luxury UX</div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            S2 · THE FRICTION (2×2 Bento Grid)
        ══════════════════════════════════════════════════ */}
        <section style={{ ...SEC, background: bgAlt }}>
          <Grid isDark={isDark} />
          <NoiseFx isDark={isDark} />

          <div style={{ ...INNER }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(14px,2vh,22px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ ...EY, marginBottom: 8 }}>02 — The Friction</div>
                <h2 style={H2}>What Was Broken</h2>
              </div>
              <span style={{ ...EY, fontSize: "0.52rem" }}>Original site · Analysis · Pain points</span>
            </div>

            {/* 2×2 Bento */}
            <motion.div
              ref={frRef}
              variants={CONTAINER}
              initial="hidden"
              animate={frView ? "show" : "hidden"}
              style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gridTemplateRows: "1fr 1fr", gap: 10, height: "clamp(280px,46vh,400px)" }}
            >
              {/* Cell A: before screenshot — spans both rows */}
              <motion.div variants={ITEM} style={{ gridRow: "1 / 3", border: `1px solid ${bdr}`, overflow: "hidden", borderRadius: 6 }}>
                {/* Fake browser chrome */}
                <div style={{ background: isDark ? "#0C0C0C" : "#E5E5E5", padding: "7px 10px", display: "flex", alignItems: "center", gap: 5, borderBottom: `1px solid ${bdr}` }}>
                  {["#FF5F57","#FFBD2E","#28CA41"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                  <div style={{ flex: 1, height: 15, borderRadius: 3, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)", marginLeft: 6 }} />
                </div>
                <div style={{ position: "relative", height: "calc(100% - 30px)", overflow: "hidden" }}>
                  <img src={imgBefore} alt="Original Dubai Dunes website" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: isDark ? "linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.6))" : "linear-gradient(to bottom,transparent 40%,rgba(255,255,255,0.7))",
                  }} />
                  <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", alignItems: "center", gap: 6, cursor: "zoom-in" }} onClick={() => open(imgBefore, "Original Dubai Dunes website")}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ZoomIn size={11} color="rgba(255,255,255,0.7)" />
                    </div>
                    <span style={{ ...EY, fontSize: "0.5rem", color: "rgba(255,255,255,0.6)" }}>Before</span>
                  </div>
                </div>
              </motion.div>

              {/* Cells B-D: friction points */}
              {[
                { title: "Spartanic Layout", body: "No hierarchy, no tension — visually flat and disengaged. Nothing signals exclusivity." },
                { title: "Weak Hierarchy", body: "Founder credibility buried. Property listings without editorial structure." },
                { title: "Generic Visuals", body: "Stock imagery and brown tones signal a mid-market agency, not a trusted advisor." },
              ].map((item) => (
                <motion.div key={item.title} variants={ITEM} style={{
                  border: `1px solid ${bdr}`, borderRadius: 6,
                  background: glass, padding: "clamp(12px,1.8vw,18px)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  backdropFilter: "blur(4px)",
                }}>
                  <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", fontWeight: 700, color: head, marginBottom: 5 }}>{item.title}</div>
                  <p style={{ ...BODY, fontSize: "0.72rem", lineHeight: 1.55 }}>{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            S3 · THE LOGIC (Research)
        ══════════════════════════════════════════════════ */}
        <section style={{ ...SEC, background: bg }}>
          <Grid isDark={isDark} />
          <NoiseFx isDark={isDark} />

          <div style={{ ...INNER }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(14px,2vh,20px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ ...EY, marginBottom: 8 }}>03 — The Logic</div>
                <h2 style={H2}>Global Benchmarking</h2>
              </div>
              <span style={{ ...EY, fontSize: "0.52rem" }}>12+ sites · Dubai · London · Monaco</span>
            </div>

            <motion.div
              ref={logRef}
              variants={CONTAINER}
              initial="hidden"
              animate={logView ? "show" : "hidden"}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
            >
              {[
                { img: imgMoodboard,  label: "Moodboard",           sub: "Dark palettes · Elevated typography · Restraint" },
                { img: imgCompetitor, label: "Competitor Analysis",  sub: "SG Capital · AW · EMAAR · Nakheel" },
              ].map(item => (
                <motion.div key={item.label} variants={ITEM} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <ZImg src={item.img} alt={item.label} height="clamp(195px,33vh,290px)" fit="cover" pos="top left" bdr={bdr} radius={6} onOpen={open} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head }}>{item.label}</span>
                    <span style={{ ...EY, fontSize: "0.52rem" }}>{item.sub}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div style={{ marginTop: 14, padding: "11px 16px", borderLeft: `2px solid ${div}`, background: glass }}>
              <p style={{ ...BODY, fontSize: "0.8rem", fontStyle: "italic", margin: 0 }}>
                Key shift: from <strong style={{ color: head, fontStyle: "normal" }}>Visual Noise</strong> to <strong style={{ color: head, fontStyle: "normal" }}>Strategic Storytelling</strong> — layout structure, colour usage, and content hierarchy as trust signals.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            S4 · THE AUTHORITY (Founder Module)
        ══════════════════════════════════════════════════ */}
        <section style={{ ...SEC, background: bgAlt }}>
          <Grid isDark={isDark} />
          <NoiseFx isDark={isDark} />

          <div style={{ ...INNER, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(24px,3.5vw,48px)", alignItems: "center" }}>
            {/* Left: context */}
            <div>
              <div style={{ ...EY, marginBottom: 8 }}>04 — The Authority</div>
              <h2 style={{ ...H2, marginBottom: 14 }}>Founder-First Strategy</h2>
              <p style={{ ...BODY, marginBottom: 20 }}>
                In Dubai's high-net-worth market, property purchases are built on personal trust. Positioning the founder front-and-centre converts a "disconnected" brokerage into a named, credible authority.
              </p>

              {/* Credential bento */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { value: "28+", label: "Years in Finance & Real Estate" },
                  { value: "166+", label: "Active Property Listings" },
                  { value: "$90M", label: "Record-Breaking Sale" },
                  { value: "HNWI", label: "Institutional Client Focus" },
                ].map(s => (
                  <div key={s.value} style={{ border: `1px solid ${bdr}`, background: glass, padding: "12px 14px", backdropFilter: "blur(4px)" }}>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1rem,1.8vw,1.4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: head, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ ...EY, fontSize: "0.5rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: final design showing founder section */}
            <div style={{ position: "relative" }}>
              <ZImg src={imgFinal} alt="Final design — founder section" height="clamp(280px,44vh,390px)" fit="cover" pos="top" bdr={bdr} radius={6} onOpen={open} />
              <Callout label="Founder Card · First Viewport" top="10px" left="10px" isDark={isDark} />
              <Callout label="Trust Hierarchy" top="10px" right="10px" isDark={isDark} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            S5 · THE SYSTEM (UI Components)
        ══════════════════════════════════════════════════ */}
        <section style={{ ...SEC, background: bg }}>
          <Grid isDark={isDark} />
          <NoiseFx isDark={isDark} />

          <div style={{ ...INNER }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(14px,2vh,20px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ ...EY, marginBottom: 8 }}>05 — The System</div>
                <h2 style={H2}>Precision UI · Three Iterations</h2>
              </div>
              <span style={{ ...EY, fontSize: "0.52rem" }}>Sharp corners · Controlled type · Gold accents</span>
            </div>

            <motion.div
              ref={sysRef}
              variants={CONTAINER}
              initial="hidden"
              animate={sysView ? "show" : "hidden"}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
            >
              {[
                { img: imgIter1, label: "Iteration 01", sub: "Dark field · Initial structure" },
                { img: imgIter2, label: "Iteration 02", sub: "Hierarchy refined" },
                { img: imgFinalMulti, label: "Final Design", sub: "All screens · Pixel-perfect", badge: "Final" },
              ].map(it => (
                <motion.div key={it.label} variants={ITEM} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <ZImg src={it.img} alt={it.label} height="clamp(195px,34vh,300px)" fit="cover" pos="top" bdr={bdr} radius={6} badge={it.badge} onOpen={open} />
                  <div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: head, marginBottom: 2 }}>{it.label}</div>
                    <div style={{ ...EY, fontSize: "0.5rem" }}>{it.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Callout strip */}
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {["Sharp Corner Styling", "Controlled Typography", "Refined Spacing", "Gold CTA System"].map(t => (
                <div key={t} style={{
                  border: `1px solid ${bdr}`, background: glass, backdropFilter: "blur(4px)",
                  padding: "5px 12px", display: "flex", alignItems: "center", gap: 6,
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: ey }} />
                  <span style={{ ...EY, fontSize: "0.5rem" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            S6 · THE DISCOVERY (Property Logic)
        ══════════════════════════════════════════════════ */}
        <section style={{ ...SEC, background: bgAlt }}>
          <Grid isDark={isDark} />
          <NoiseFx isDark={isDark} />

          <div style={{ ...INNER, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "clamp(24px,3.5vw,48px)", alignItems: "center" }}>
            {/* Left: wireframes */}
            <motion.div
              ref={discRef}
              variants={CONTAINER}
              initial="hidden"
              animate={discView ? "show" : "hidden"}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
            >
              {[
                { img: imgWire1, label: "Listing Grid" },
                { img: imgWire2, label: "Hero Search" },
              ].map(w => (
                <motion.div key={w.label} variants={ITEM} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <ZImg src={w.img} alt={w.label} height="clamp(200px,34vh,290px)" fit="contain" pos="top" bdr={bdr} radius={6} onOpen={open} />
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.65rem", fontWeight: 700, color: head }}>{w.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: strategy text */}
            <div>
              <div style={{ ...EY, marginBottom: 8 }}>06 — The Discovery</div>
              <h2 style={{ ...H2, marginBottom: 14 }}>Quality Over Quantity</h2>
              <p style={{ ...BODY, marginBottom: 20 }}>
                Instead of surfacing every listing, the redesign segments inventory into curated tiers — luxury villas and premium apartments — each with high-signal data points that speak to institutional investors.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Location Signal", "Area prestige and developer reputation foregrounded"],
                  ["Financial Context", "Price-per-sqft, ROI benchmarks, and payment plans visible upfront"],
                  ["Editorial Curation", "Record-breaking deal featured as social proof"],
                ].map(([t, d]) => (
                  <div key={t} style={{ borderLeft: `2px solid ${div}`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head, marginBottom: 3 }}>{t}</div>
                    <p style={{ ...BODY, fontSize: "0.72rem", lineHeight: 1.55 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            S7 · THE FINAL SIGNAL (Outcome)
        ══════════════════════════════════════════════════ */}
        <section style={{ ...SEC, background: bg, justifyContent: "flex-start", paddingTop: 64 }}>
          <Grid isDark={isDark} />
          <NoiseFx isDark={isDark} />

          {/* Full-width image strip */}
          <div
            style={{ width: "100%", position: "relative", zIndex: 1, overflow: "hidden", height: "clamp(130px,20vh,190px)", flexShrink: 0, cursor: "zoom-in" }}
            onClick={() => open(imgFinalMulti, "Dubai Dunes final — all screens")}
            onMouseEnter={e => {
              const img = e.currentTarget.querySelector<HTMLElement>("img");
              if (img) { img.style.filter = "brightness(0.65)"; img.style.transform = "scale(1.02)"; }
              const ov = e.currentTarget.querySelector<HTMLElement>(".ov");
              if (ov) ov.style.opacity = "1";
            }}
            onMouseLeave={e => {
              const img = e.currentTarget.querySelector<HTMLElement>("img");
              if (img) { img.style.filter = "brightness(1)"; img.style.transform = "scale(1)"; }
              const ov = e.currentTarget.querySelector<HTMLElement>(".ov");
              if (ov) ov.style.opacity = "0";
            }}
          >
            <img src={imgFinalMulti} alt="Dubai Dunes all screens" style={{
              width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
              display: "block", transition: "transform 0.35s, filter 0.25s",
            }} />
            <div className="ov" style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, opacity: 0, transition: "opacity 0.22s", background: "rgba(0,0,0,0.4)",
            }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ZoomIn size={14} color="rgba(255,255,255,0.85)" />
              </div>
              <span style={{ ...EY, fontSize: "0.58rem", color: "rgba(255,255,255,0.8)" }}>View Full Image</span>
            </div>
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: isDark
                ? "linear-gradient(to bottom,rgba(3,3,3,0) 30%,rgba(3,3,3,0.82) 100%)"
                : "linear-gradient(to bottom,rgba(255,255,255,0) 30%,rgba(255,255,255,0.88) 100%)",
            }} />
          </div>

          {/* Outcome content */}
          <div style={{ ...INNER, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1, paddingTop: "clamp(14px,2vh,22px)", paddingBottom: "clamp(14px,2vh,22px)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 24, height: 1, background: ey }} />
                <span style={EY}>07 — The Final Signal</span>
                <div style={{ width: 24, height: 1, background: ey }} />
              </div>

              <h2 style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: "clamp(1.7rem,3.5vw,2.9rem)",
                fontWeight: 800, letterSpacing: "-0.035em",
                color: head, margin: "0 0 10px",
              }}>
                Project Alignment: 100%.
              </h2>

              <p style={{ ...BODY, maxWidth: 440, margin: "0 auto 24px" }}>
                The redesign achieved exclusivity and confidence — transforming Dubai Dunes from flat and generic into a premium digital authority that earns trust before a single word is read.
              </p>

              {/* Stats */}
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(22px,5vw,58px)", marginBottom: 28, flexWrap: "wrap" }}>
                {[["100%", "Premium Alignment"], ["Solo", "Full Ownership"], ["3 Wks", "Research to Delivery"]].map(([v, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.3rem,2.6vw,2rem)", fontWeight: 800, letterSpacing: "-0.035em", color: head, lineHeight: 1 }}>{v}</div>
                    <div style={{ ...EY, fontSize: "0.56rem", marginTop: 5 }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", fontWeight: 700,
                    padding: "10px 24px", borderRadius: 0,
                    background: head, color: isDark ? "#0A0A0A" : "#F5F5F5",
                    border: `1px solid ${head}`, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 7,
                  }}
                >
                  View More Work <ArrowUpRight size={13} />
                </button>
                <a
                  href="mailto:qureshi.ux@gmail.com"
                  style={{
                    fontFamily: "'Poppins',sans-serif", fontSize: "0.78rem", fontWeight: 600,
                    padding: "10px 24px", borderRadius: 0,
                    background: "transparent", color: head,
                    border: `1px solid ${div}`,
                    textDecoration: "none", display: "flex", alignItems: "center", gap: 7,
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: green, flexShrink: 0 }} />
                  Let's Build
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
