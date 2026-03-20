import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function useTheme2() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";
  return {
    isDark,
    bg:          isDark ? "linear-gradient(135deg, #111111 0%, #090909 100%)" : "linear-gradient(135deg, #F7F7F7 0%, #EEEEEE 100%)",
    eyebrow:     isDark ? "#848484" : "#595959",
    title:       isDark ? "#FAFAFA" : "#0A0A0A",
    tileA:       isDark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.8)",
    tileB:       isDark ? "rgba(255,255,255,0.038)" : "rgba(255,255,255,0.65)",
    tileBorder:  isDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.09)",
    tileTitle:   isDark ? "#F0F0F0" : "#0A0A0A",
    tileSub:     isDark ? "#9A9A9A" : "#4D4D4D",
    tileBody:    isDark ? "#9A9A9A" : "#4D4D4D",
    tagBg:       isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)",
    tagColor:    isDark ? "#9A9A9A" : "#4D4D4D",
    mockLine:    isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
    mockBlock:   isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
    mockAccent:  isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)",
    noiseOp:     isDark ? 0.06 : 0.025,
  };
}

function LaptopMockup({ c }: { c: ReturnType<typeof useTheme2> }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 18px" }}>
      <div style={{
        width: "100%", maxWidth: 320,
        border: `1.5px solid ${c.tileBorder}`,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: c.isDark ? "0 8px 36px rgba(0,0,0,0.6)" : "0 8px 36px rgba(0,0,0,0.1)",
      }}>
        <div style={{
          background: c.mockBlock,
          padding: "7px 10px",
          display: "flex", alignItems: "center", gap: 5,
          borderBottom: `1px solid ${c.tileBorder}`,
        }}>
          {[0.22, 0.14, 0.08].map((op, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c.isDark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op + 0.04})` }} />
          ))}
          <div style={{ flex: 1, marginLeft: 6, height: 5, borderRadius: 4, background: c.mockBlock }} />
        </div>
        <div style={{ background: c.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.012)", padding: 10, display: "flex", gap: 8 }}>
          <div style={{ width: 40, display: "flex", flexDirection: "column", gap: 5 }}>
            {[70, 55, 65, 48, 60].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 5, borderRadius: 3, background: i === 0 ? c.mockAccent : c.mockBlock }} />
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ height: 36, borderRadius: 6, background: c.mockBlock }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ height: 24, borderRadius: 5, background: i === 1 ? c.mockAccent : c.mockBlock }} />
              ))}
            </div>
            <div style={{ height: 5, width: "80%", borderRadius: 3, background: c.mockLine }} />
            <div style={{ height: 5, width: "60%", borderRadius: 3, background: c.mockBlock }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FigmaMockup({ c }: { c: ReturnType<typeof useTheme2> }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "14px" }}>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
          {[0.2, 0.12, 0.16, 0.09, 0.18, 0.11].map((op, i) => (
            <div key={i} style={{
              height: 28, borderRadius: 7,
              background: c.isDark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op})`,
              border: `1px solid ${c.tileBorder}`,
            }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[44, 36, 52].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 7, borderRadius: 4, background: i === 0 ? c.mockAccent : c.mockBlock }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
          {["0.9", "0.7", "0.5", "0.28", "0.16", "0.1", "0.06", "0.03"].map((op, i) => (
            <div key={i} style={{
              height: 18, borderRadius: 5,
              background: c.isDark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op})`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function A11yMockup({ c }: { c: ReturnType<typeof useTheme2> }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, width: "100%", alignItems: "center" }}>
        <div style={{
          padding: "6px 14px", borderRadius: 8,
          border: `1.5px solid ${c.mockAccent}`,
          display: "flex", alignItems: "center", gap: 7,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.mockAccent }} />
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.58rem", fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: c.isDark ? "#9A9A9A" : "#4D4D4D",
          }}>
            WCAG 2.1 AA
          </span>
        </div>
        {["Colour Contrast", "Keyboard Nav", "ARIA Labels", "Screen Reader"].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
            <div style={{
              width: 14, height: 14, borderRadius: 4,
              border: `1.5px solid ${c.mockAccent}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: c.mockAccent }} />
            </div>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.65rem", fontWeight: 600,
              color: c.tileBody,
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkExperience() {
  const c = useTheme2();

  return (
    <div
      className="transition-colors duration-500"
      style={{
        height: "100vh",
        background: c.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: NOISE_SVG,
        backgroundSize: "160px 160px",
        opacity: c.noiseOp,
        mixBlendMode: "overlay",
      }} />
      {/* Corner radial accent */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: c.isDark
          ? "radial-gradient(ellipse 55% 55% at 20% 80%, rgba(255,255,255,0.014) 0%, transparent 65%)"
          : "radial-gradient(ellipse 55% 55% at 20% 80%, rgba(0,0,0,0.018) 0%, transparent 65%)",
      }} />

      <div style={{
        maxWidth: 900,
        width: "100%",
        margin: "0 auto",
        padding: "0 clamp(20px, 4vw, 60px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(18px, 3vh, 28px)",
        height: "calc(100vh - 128px)",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 28, height: 1, background: c.eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: c.eyebrow,
            }}>
              Experience
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: c.title, margin: 0,
          }}>
            Where I've Led
          </h2>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "clamp(10px, 1.5vw, 16px)",
          flex: 1,
          maxHeight: "calc(100vh - 260px)",
        }}>
          {/* Tile A — Wired Hub */}
          <div style={{
            gridRow: "1 / 3",
            background: c.tileA,
            border: `1px solid ${c.tileBorder}`,
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            backdropFilter: c.isDark ? "none" : "blur(2px)",
            boxShadow: c.isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <div style={{ flex: 1, minHeight: 0 }}><LaptopMockup c={c} /></div>
            <div style={{ padding: "16px 22px 20px", borderTop: `1px solid ${c.tileBorder}` }}>
              <div style={{ marginBottom: 6 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.58rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "3px 9px", borderRadius: 100,
                  background: c.tagBg, color: c.tagColor,
                }}>
                  Current · 2023–Present
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                fontWeight: 700, letterSpacing: "-0.015em",
                color: c.tileTitle, margin: "0 0 5px",
              }}>
                Wired Hub
              </h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.78rem", lineHeight: 1.58,
                color: c.tileBody, margin: 0, fontWeight: 500,
              }}>
                Leading end-to-end design & scalable systems across Government & Real Estate platforms.
              </p>
            </div>
          </div>

          {/* Tile B — Exclusive Digitals */}
          <div style={{
            background: c.tileB,
            border: `1px solid ${c.tileBorder}`,
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: c.isDark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.05)",
          }}>
            <div style={{ flex: 1, minHeight: 0 }}><FigmaMockup c={c} /></div>
            <div style={{ padding: "12px 18px 16px", borderTop: `1px solid ${c.tileBorder}` }}>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.55rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "2px 8px", borderRadius: 100,
                background: c.tagBg, color: c.tagColor,
              }}>
                2021–2023
              </span>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.92rem", fontWeight: 700,
                letterSpacing: "-0.01em",
                color: c.tileTitle, margin: "5px 0 3px",
              }}>
                Exclusive Digitals
              </h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.72rem", lineHeight: 1.5,
                color: c.tileBody, margin: 0, fontWeight: 500,
              }}>
                Design-to-Dev handoff & QA.
              </p>
            </div>
          </div>

          {/* Tile C — Dcode Dynamics */}
          <div style={{
            background: c.tileB,
            border: `1px solid ${c.tileBorder}`,
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: c.isDark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.05)",
          }}>
            <div style={{ flex: 1, minHeight: 0 }}><A11yMockup c={c} /></div>
            <div style={{ padding: "12px 18px 16px", borderTop: `1px solid ${c.tileBorder}` }}>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.55rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "2px 8px", borderRadius: 100,
                background: c.tagBg, color: c.tagColor,
              }}>
                2020–2021
              </span>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.92rem", fontWeight: 700,
                letterSpacing: "-0.01em",
                color: c.tileTitle, margin: "5px 0 3px",
              }}>
                Dcode Dynamics
              </h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.72rem", lineHeight: 1.5,
                color: c.tileBody, margin: 0, fontWeight: 500,
              }}>
                WCAG-aligned interfaces & accessibility auditing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
