import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowUpRight, X, ZoomIn } from "lucide-react";
import { Navbar } from "@/components/Navbar";

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

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : system;
}

function NoiseFx({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: NOISE, backgroundSize: "180px 180px",
      opacity: isDark ? 0.055 : 0.09,
      mixBlendMode: (isDark ? "overlay" : "multiply") as "overlay" | "multiply",
    }} />
  );
}

/* ─── Lightbox ───────────────────────────────────────────── */
function Lightbox({
  src, alt, onClose,
}: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.93)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "64px 24px 24px",
        overflowY: "auto",
        cursor: "zoom-out",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 18, right: 18, zIndex: 10000,
          width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.18s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
        aria-label="Close"
      >
        <X size={16} />
      </button>

      <img
        src={src}
        alt={alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: "min(92vw, 1200px)",
          width: "100%",
          height: "auto",
          display: "block",
          cursor: "default",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
        }}
      />
    </div>
  );
}

/* ─── Zoomable image wrapper ─────────────────────────────── */
function ZImg({
  src, alt, height, fit = "cover", position = "top", border, badge, onOpen,
}: {
  src: string;
  alt: string;
  height: string;
  fit?: "cover" | "contain";
  position?: string;
  border: string;
  badge?: string;
  onOpen: (src: string, alt: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onOpen(src, alt)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", cursor: "zoom-in",
        border: `1px solid ${border}`, borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {badge && (
        <div style={{
          position: "absolute", top: 8, right: 8, zIndex: 3,
          background: "rgba(255,255,255,0.92)",
          color: "#0A0A0A",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.5rem", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "3px 8px",
        }}>{badge}</div>
      )}

      <img
        src={src}
        alt={alt}
        style={{
          width: "100%", height, objectFit: fit,
          objectPosition: position, display: "block",
          transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.25s",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          filter: hovered ? "brightness(0.72)" : "brightness(1)",
        }}
      />

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 8,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.22s ease",
        pointerEvents: "none",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.85)",
          background: "rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ZoomIn size={15} color="rgba(255,255,255,0.9)" />
        </div>
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.62rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
        }}>View Full Image</span>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function DubaiDunes() {
  const isDark = useDark();
  const [, navigate] = useLocation();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  const bg      = isDark ? "#030303" : "#FFFFFF";
  const bgAlt   = isDark ? "#060606" : "#FAFAFA";
  const head    = isDark ? "#F5F5F5" : "#080808";
  const body    = isDark ? "#808080" : "#505050";
  const ey      = isDark ? "#505050" : "#909090";
  const divider = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const cardBg  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const imgBdr  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  const sec: React.CSSProperties = {
    scrollSnapAlign: "start", scrollSnapStop: "always",
    height: "100vh", paddingTop: 64, boxSizing: "border-box",
    display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center",
    position: "relative", overflow: "hidden",
    transition: "background 0.4s",
  };

  const inner: React.CSSProperties = {
    maxWidth: 920, width: "100%",
    padding: "0 clamp(24px, 5vw, 64px)",
    position: "relative", zIndex: 1,
  };

  const eyeSt: React.CSSProperties = {
    fontFamily: "'Raleway', sans-serif",
    fontSize: "0.58rem", fontWeight: 700,
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: ey,
  };

  const h2St: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
    fontWeight: 800, letterSpacing: "-0.025em",
    color: head, margin: "0 0 12px",
  };

  const bodySt: React.CSSProperties = {
    fontFamily: "'Raleway', sans-serif",
    fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)",
    lineHeight: 1.7, color: body, fontWeight: 500, margin: 0,
  };

  return (
    <div style={{ background: bg }}>
      <Navbar />

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
      )}

      <div style={{
        height: "100vh", overflowY: "scroll", overflowX: "hidden",
        scrollSnapType: "y mandatory", scrollBehavior: "smooth",
      }}>

        {/* ─── S1: HERO ──────────────────────────────────── */}
        <section style={{ ...sec, background: bg }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner, textAlign: "center", position: "relative", zIndex: 1 }}>

            <button onClick={() => navigate("/")} style={{
              position: "absolute", top: -36, left: "clamp(24px, 5vw, 64px)",
              fontFamily: "'Raleway', sans-serif", fontSize: "0.7rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: ey, background: "none", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0,
            }}>
              <ArrowLeft size={12} /><span>Back to Work</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 26 }}>
              <div style={{ width: 28, height: 1, background: ey }} />
              <span style={eyeSt}>Case Study · Real Estate UX · 2026</span>
              <div style={{ width: 28, height: 1, background: ey }} />
            </div>

            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800, letterSpacing: "-0.03em",
              lineHeight: 1.05, color: head, margin: "0 0 18px",
            }}>
              Dubai Dunes:<br />Engineering Trust
            </h1>

            <p style={{ ...bodySt, maxWidth: 520, margin: "0 auto 34px" }}>
              Transforming a visually underperforming real estate platform into a high-authority luxury interface — built to convert high-net-worth clients from the very first impression.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(20px, 4vw, 52px)", flexWrap: "wrap" }}>
              {[
                { label: "Role", value: "Lead UX Designer" },
                { label: "Year", value: "2026" },
                { label: "Type", value: "Solo Project" },
                { label: "Tool", value: "Figma" },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <div style={{ ...eyeSt, fontSize: "0.54rem", marginBottom: 5 }}>{m.label}</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.82rem", fontWeight: 600, color: head }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── S2: THE PROBLEM — BEFORE ──────────────────── */}
        <section style={{ ...sec, background: bgAlt }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(28px, 4vw, 56px)", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={eyeSt}>01 — The Problem</span>
              </div>
              <h2 style={h2St}>Their Existing Site</h2>
              <p style={{ ...bodySt, marginBottom: 20 }}>
                The original Dubai Dunes website failed to reflect the exclusivity and trust required in luxury real estate — dull colours, weak hierarchy, and no visual storytelling.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Flat, generic layout with no luxury signal",
                  "Founder credibility buried and invisible",
                  "No aspirational property presentation",
                  "Absent CTAs — high-intent visitors had nowhere to go",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: ey, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ ...bodySt, fontSize: "0.78rem" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image with browser chrome */}
            <div style={{ border: `1px solid ${imgBdr}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{
                background: isDark ? "#0F0F0F" : "#E8E8E8",
                padding: "8px 12px",
                display: "flex", alignItems: "center", gap: 6,
                borderBottom: `1px solid ${imgBdr}`,
              }}>
                {["#FF5F57", "#FFBD2E", "#28CA41"].map((c) => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                ))}
                <div style={{
                  flex: 1, height: 18, borderRadius: 4,
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)",
                  marginLeft: 6,
                }} />
              </div>
              <ZImg
                src={imgBefore}
                alt="Original Dubai Dunes website"
                height="clamp(260px, 40vh, 360px)"
                fit="cover"
                position="top"
                border="transparent"
                onOpen={openLightbox}
              />
            </div>
          </div>
        </section>

        {/* ─── S3: RESEARCH ──────────────────────────────── */}
        <section style={{ ...sec, background: bg }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(16px, 2.5vh, 22px)", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={eyeSt}>02 — Research</span>
                </div>
                <h2 style={{ ...h2St, margin: 0 }}>Mood Boards & Competitor Analysis</h2>
              </div>
              <span style={{ ...eyeSt, fontSize: "0.6rem" }}>12+ sites · Dubai · London · Monaco</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { img: imgMoodboard, label: "Moodboard", sub: "Dark palettes · Gold accents · Luxury cues" },
                { img: imgCompetitor, label: "Competitor Analysis", sub: "SG Capital · AW · EMAAR · Nakheel" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <ZImg
                    src={item.img}
                    alt={item.label}
                    height="clamp(200px, 34vh, 300px)"
                    fit="cover"
                    position="top left"
                    border={imgBdr}
                    onOpen={openLightbox}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head }}>{item.label}</span>
                    <span style={{ ...eyeSt, fontSize: "0.54rem" }}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 14, padding: "12px 18px",
              borderLeft: `2px solid ${divider}`, background: cardBg,
            }}>
              <p style={{ ...bodySt, fontSize: "0.82rem", fontStyle: "italic", margin: 0 }}>
                Key insight: "Luxury succeeds through{" "}
                <strong style={{ color: head, fontWeight: 700, fontStyle: "normal" }}>restraint and clarity</strong>{" "}
                — not visual noise."
              </p>
            </div>
          </div>
        </section>

        {/* ─── S4: WIREFRAMES ────────────────────────────── */}
        <section style={{ ...sec, background: bgAlt }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(16px, 2.5vh, 22px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={eyeSt}>03 — Wireframes</span>
                </div>
                <h2 style={{ ...h2St, margin: 0 }}>Low-Fidelity Foundation</h2>
              </div>
              <p style={{ ...bodySt, fontSize: "0.78rem", maxWidth: 300, textAlign: "right" }}>
                Layout structure locked before any colour or styling decisions.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { img: imgWire1, label: "Wireframe 01", sub: "Property listings · Search · CTA flow" },
                { img: imgWire2, label: "Wireframe 02", sub: "Hero · Who are we · Why choose us" },
              ].map((w) => (
                <div key={w.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <ZImg
                    src={w.img}
                    alt={w.label}
                    height="clamp(220px, 38vh, 330px)"
                    fit="contain"
                    position="top"
                    border={imgBdr}
                    onOpen={openLightbox}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head }}>{w.label}</span>
                    <span style={{ ...eyeSt, fontSize: "0.52rem" }}>{w.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── S5: ITERATIONS ────────────────────────────── */}
        <section style={{ ...sec, background: bg }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(14px, 2vh, 20px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={eyeSt}>04 — Iterations</span>
                </div>
                <h2 style={{ ...h2St, margin: 0 }}>The Design Journey</h2>
              </div>
              <p style={{ ...bodySt, fontSize: "0.78rem", maxWidth: 280, textAlign: "right" }}>
                Three rounds of refinement — each sharpening the luxury language.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { img: imgIter1, label: "1st Iteration", sub: "Dark theme · Initial layout · Gold CTA" },
                { img: imgIter2, label: "2nd Iteration", sub: "Refined hierarchy · Better imagery" },
                { img: imgFinal, label: "Final Design",  sub: "Polished · Luxury-grade · Pixel-perfect", badge: "Final" },
              ].map((it) => (
                <div key={it.label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <ZImg
                    src={it.img}
                    alt={it.label}
                    height="clamp(200px, 35vh, 310px)"
                    fit="cover"
                    position="top"
                    border={imgBdr}
                    badge={it.badge}
                    onOpen={openLightbox}
                  />
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head, marginBottom: 2 }}>{it.label}</div>
                    <div style={{ ...eyeSt, fontSize: "0.52rem" }}>{it.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── S6: BEFORE VS AFTER ───────────────────────── */}
        <section style={{ ...sec, background: bgAlt }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(14px, 2vh, 20px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={eyeSt}>05 — Before vs After</span>
                </div>
                <h2 style={{ ...h2St, margin: 0 }}>The Transformation</h2>
              </div>
              <p style={{ ...bodySt, fontSize: "0.78rem", maxWidth: 280, textAlign: "right" }}>
                Same brand. Entirely different authority signal.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

              {/* ── BEFORE ── */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "7px 12px",
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  border: `1px solid ${imgBdr}`, borderBottom: "none",
                  borderRadius: "8px 8px 0 0",
                }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "0.62rem", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: isDark ? "#555" : "#AAA",
                  }}>Before</span>
                  <span style={{ ...eyeSt, fontSize: "0.52rem" }}>Original site · 2024</span>
                </div>

                <div style={{ borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
                  <ZImg
                    src={imgBefore}
                    alt="Original Dubai Dunes website — before redesign"
                    height="clamp(220px, 37vh, 330px)"
                    fit="cover"
                    position="top"
                    border={imgBdr}
                    onOpen={openLightbox}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 10 }}>
                  {[
                    "Flat brown palette — no luxury signal",
                    "Founder credibility buried and invisible",
                    "Weak CTAs — high-intent visitors had nowhere to go",
                  ].map((p) => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                      <span style={{ color: isDark ? "#444" : "#CCC", fontSize: "0.8rem", lineHeight: 1.4, marginTop: 1 }}>—</span>
                      <span style={{ ...bodySt, fontSize: "0.72rem" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── AFTER ── */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "7px 12px",
                  background: head,
                  border: `1px solid ${head}`, borderBottom: "none",
                  borderRadius: "8px 8px 0 0",
                }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "0.62rem", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: isDark ? "#0A0A0A" : "#F5F5F5",
                  }}>After</span>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.52rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)",
                  }}>Redesign · 2026</span>
                </div>

                <div style={{ borderRadius: "0 0 8px 8px", overflow: "hidden" }}>
                  <ZImg
                    src={imgFinal}
                    alt="Dubai Dunes final redesign — landing page"
                    height="clamp(220px, 37vh, 330px)"
                    fit="cover"
                    position="top"
                    border={imgBdr}
                    onOpen={openLightbox}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 10 }}>
                  {[
                    "Dark/gold palette — instant luxury authority",
                    "Founder front and centre as the trust signal",
                    "Bold CTAs driving high-intent property action",
                  ].map((p) => (
                    <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                      <span style={{ color: head, fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.4, marginTop: 1 }}>+</span>
                      <span style={{ ...bodySt, fontSize: "0.72rem", color: head, fontWeight: 600 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── S7: CLOSING ───────────────────────────────── */}
        <section style={{ ...sec, background: bg, justifyContent: "flex-start", paddingTop: 64 }}>
          <NoiseFx isDark={isDark} />

          <div
            onClick={() => openLightbox(imgThumb, "Dubai Dunes — final design presentation")}
            style={{
              width: "100%", position: "relative", zIndex: 1,
              overflow: "hidden", height: "clamp(140px, 22vh, 200px)", flexShrink: 0,
              cursor: "zoom-in",
            }}
            onMouseEnter={e => {
              const ov = e.currentTarget.querySelector<HTMLElement>(".thumb-ov");
              if (ov) ov.style.opacity = "1";
              const img = e.currentTarget.querySelector<HTMLElement>("img");
              if (img) { img.style.transform = "scale(1.02)"; img.style.filter = "brightness(0.7)"; }
            }}
            onMouseLeave={e => {
              const ov = e.currentTarget.querySelector<HTMLElement>(".thumb-ov");
              if (ov) ov.style.opacity = "0";
              const img = e.currentTarget.querySelector<HTMLElement>("img");
              if (img) { img.style.transform = "scale(1)"; img.style.filter = "brightness(1)"; }
            }}
          >
            <img
              src={imgThumb}
              alt="Dubai Dunes final design presentation"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                objectPosition: "center", display: "block",
                transition: "transform 0.35s, filter 0.25s",
              }}
            />
            {/* Hover overlay */}
            <div className="thumb-ov" style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 8,
              opacity: 0, transition: "opacity 0.22s",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.85)",
                background: "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <ZoomIn size={15} color="rgba(255,255,255,0.9)" />
              </div>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.62rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
              }}>View Full Image</span>
            </div>

            <div style={{
              position: "absolute", inset: 0,
              background: isDark
                ? "linear-gradient(to bottom, rgba(3,3,3,0) 30%, rgba(3,3,3,0.8) 100%)"
                : "linear-gradient(to bottom, rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 100%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Outcome */}
          <div style={{ ...inner, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1, paddingTop: "clamp(16px, 2.5vh, 28px)", paddingBottom: "clamp(16px, 2.5vh, 28px)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 1, background: ey }} />
                <span style={eyeSt}>Project Outcome</span>
                <div style={{ width: 28, height: 1, background: ey }} />
              </div>

              <h2 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.7rem, 3.5vw, 2.8rem)",
                fontWeight: 800, letterSpacing: "-0.03em",
                color: head, margin: "0 0 12px",
              }}>
                100% Alignment with<br />Premium Positioning
              </h2>

              <p style={{ ...bodySt, maxWidth: 460, margin: "0 auto 28px" }}>
                A brand-led luxury experience that earns trust before a single word is read — from flat and generic to confident and premium.
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px, 5vw, 60px)", marginBottom: 30, flexWrap: "wrap" }}>
                {[
                  { value: "100%", label: "Premium Alignment" },
                  { value: "Solo", label: "End-to-end Ownership" },
                  { value: "3 Wks", label: "Research to Delivery" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", color: head, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ ...eyeSt, fontSize: "0.6rem", marginTop: 5 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate("/")}
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.01em",
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
                    fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.01em",
                    padding: "10px 24px", borderRadius: 0,
                    background: "transparent", color: head,
                    border: `1px solid ${divider}`,
                    textDecoration: "none", display: "flex", alignItems: "center", gap: 7,
                  }}
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
