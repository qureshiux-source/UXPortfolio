import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
      mixBlendMode: (isDark ? "overlay" : "multiply") as const,
    }} />
  );
}

export default function DubaiDunes() {
  const isDark = useDark();
  const [, navigate] = useLocation();

  const bg      = isDark ? "#030303" : "#FFFFFF";
  const bgAlt   = isDark ? "#060606" : "#FAFAFA";
  const head    = isDark ? "#F5F5F5" : "#080808";
  const body    = isDark ? "#808080" : "#505050";
  const ey      = isDark ? "#505050" : "#909090";   // eyebrow
  const divider = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const cardBg  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const cardBdr = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
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

  const imgFrame = (extra?: React.CSSProperties): React.CSSProperties => ({
    border: `1px solid ${imgBdr}`,
    borderRadius: 8, overflow: "hidden",
    background: isDark ? "#0A0A0A" : "#F5F5F5",
    ...extra,
  });

  return (
    <div style={{ background: bg }}>
      <Navbar />
      <div style={{
        height: "100vh", overflowY: "scroll", overflowX: "hidden",
        scrollSnapType: "y mandatory", scrollBehavior: "smooth",
      }}>

        {/* ─── S1: HERO ─────────────────────────────────── */}
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

        {/* ─── S2: THE PROBLEM — BEFORE ─────────────────── */}
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

            <div style={{ ...imgFrame(), display: "flex", flexDirection: "column" }}>
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
              <img
                src={imgBefore}
                alt="Original Dubai Dunes website"
                style={{ width: "100%", height: "clamp(260px, 40vh, 360px)", objectFit: "cover", objectPosition: "top", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* ─── S3: RESEARCH — MOOD & MARKETS ───────────── */}
        <section style={{ ...sec, background: bg }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={eyeSt}>02 — Research</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(16px, 2.5vh, 26px)", flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ ...h2St, margin: 0 }}>Mood Boards & Competitor Analysis</h2>
              <span style={{ ...eyeSt, fontSize: "0.6rem" }}>12+ sites · Dubai · London · Monaco</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ ...imgFrame() }}>
                  <img
                    src={imgMoodboard}
                    alt="Design moodboard and research board"
                    style={{ width: "100%", height: "clamp(200px, 34vh, 300px)", objectFit: "cover", objectPosition: "top left", display: "block" }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head }}>Moodboard</span>
                  <span style={{ ...eyeSt, fontSize: "0.54rem" }}>Dark palettes · Gold accents · Luxury cues</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ ...imgFrame() }}>
                  <img
                    src={imgCompetitor}
                    alt="Competitor analysis: SG Capital, AW, EMAAR, Nakheel"
                    style={{ width: "100%", height: "clamp(200px, 34vh, 300px)", objectFit: "cover", objectPosition: "top left", display: "block" }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head }}>Competitor Analysis</span>
                  <span style={{ ...eyeSt, fontSize: "0.54rem" }}>SG Capital · AW · EMAAR · Nakheel</span>
                </div>
              </div>
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

        {/* ─── S4: WIREFRAMES ───────────────────────────── */}
        <section style={{ ...sec, background: bgAlt }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(16px, 2.5vh, 26px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={eyeSt}>03 — Wireframes</span>
                </div>
                <h2 style={{ ...h2St, margin: 0 }}>Low-Fidelity Foundation</h2>
              </div>
              <p style={{ ...bodySt, fontSize: "0.78rem", maxWidth: 320, textAlign: "right" }}>
                Layout structure locked in before any colour or styling decisions were made.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { img: imgWire1, label: "Wireframe 01", sub: "Property listings · Search · CTA flow" },
                { img: imgWire2, label: "Wireframe 02", sub: "Hero · Who are we · Why choose us" },
              ].map((w) => (
                <div key={w.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ ...imgFrame(), background: isDark ? "#0D0D0D" : "#EFEFEF" }}>
                    <img
                      src={w.img}
                      alt={w.label}
                      style={{ width: "100%", height: "clamp(220px, 38vh, 330px)", objectFit: "contain", display: "block" }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head }}>{w.label}</span>
                    <span style={{ ...eyeSt, fontSize: "0.52rem" }}>{w.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── S5: DESIGN ITERATIONS ────────────────────── */}
        <section style={{ ...sec, background: bg }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(14px, 2vh, 22px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={eyeSt}>04 — Iterations</span>
                </div>
                <h2 style={{ ...h2St, margin: 0 }}>The Design Journey</h2>
              </div>
              <p style={{ ...bodySt, fontSize: "0.78rem", maxWidth: 300, textAlign: "right" }}>
                Three rounds of refinement — each iteration sharpening the luxury language.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { img: imgIter1, label: "1st Iteration", sub: "Dark theme · Initial layout · Gold CTA" },
                { img: imgIter2, label: "2nd Iteration", sub: "Refined hierarchy · Better imagery" },
                { img: imgFinal, label: "Final Design",  sub: "Polished · Luxury-grade · Pixel-perfect" },
              ].map((it, i) => (
                <div key={it.label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <div style={{
                    ...imgFrame(),
                    position: "relative",
                  }}>
                    {i === 2 && (
                      <div style={{
                        position: "absolute", top: 8, right: 8, zIndex: 2,
                        background: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
                        color: isDark ? "#0A0A0A" : "#F5F5F5",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.5rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        padding: "3px 8px", borderRadius: 0,
                      }}>Final</div>
                    )}
                    <img
                      src={it.img}
                      alt={it.label}
                      style={{ width: "100%", height: "clamp(200px, 35vh, 310px)", objectFit: "cover", objectPosition: "top", display: "block" }}
                    />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: head, marginBottom: 2 }}>{it.label}</div>
                    <div style={{ ...eyeSt, fontSize: "0.52rem" }}>{it.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── S6: FINAL DESIGN — THE TRANSFORMATION ───── */}
        <section style={{ ...sec, background: bgAlt }}>
          <NoiseFx isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(14px, 2vh, 22px)", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={eyeSt}>05 — Final Design</span>
                </div>
                <h2 style={{ ...h2St, margin: 0 }}>The Transformation</h2>
              </div>
              <p style={{ ...bodySt, fontSize: "0.78rem", maxWidth: 320, textAlign: "right" }}>
                Dark-first, high-authority interface — repositioning Dubai Dunes as a premium brand.
              </p>
            </div>

            <div style={{ ...imgFrame(), position: "relative" }}>
              <img
                src={imgFinalMulti}
                alt="Dubai Dunes final redesign — multi-screen view"
                style={{ width: "100%", height: "clamp(260px, 44vh, 390px)", objectFit: "cover", objectPosition: "top", display: "block" }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                padding: "24px 20px 14px",
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              }}>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#F5F5F5" }}>Dubai Dunes Properties</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.68rem", color: "rgba(245,245,245,0.6)", fontWeight: 500 }}>Complete website redesign · Figma · 2026</div>
                </div>
                <div style={{
                  display: "flex", gap: 6,
                }}>
                  {["Dark/Gold", "Sharp Corners", "Founder-First"].map((tag) => (
                    <span key={tag} style={{
                      fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem", fontWeight: 700,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "3px 8px", borderRadius: 0,
                      background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── S7: CLOSING — OUTCOME ────────────────────── */}
        <section style={{ ...sec, background: bg, justifyContent: "flex-start", paddingTop: 64 }}>
          <NoiseFx isDark={isDark} />

          {/* Full-width thumbnail strip */}
          <div style={{ width: "100%", position: "relative", zIndex: 1, overflow: "hidden", height: "clamp(140px, 22vh, 200px)", flexShrink: 0 }}>
            <img
              src={imgThumb}
              alt="Dubai Dunes — final design presentation"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: isDark
                ? "linear-gradient(to bottom, rgba(3,3,3,0) 0%, rgba(3,3,3,0.85) 100%)"
                : "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)",
            }} />
          </div>

          {/* Outcome content */}
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
                    display: "flex", alignItems: "center", gap: 7, transition: "opacity 0.2s",
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
