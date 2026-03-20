import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function useTheme2() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";
  return {
    isDark,
    bg:           isDark ? "#0F0F0F" : "#F4F4F4",
    eyebrow:      isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)",
    title:        isDark ? "#F5F5F5" : "#0D0D0D",
    tileA:        isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.04)",
    tileB:        isDark ? "rgba(255,255,255,0.038)" : "rgba(0,0,0,0.028)",
    tileBorder:   isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",
    tileTitle:    isDark ? "#EFEFEF" : "#111111",
    tileSub:      isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)",
    tileBody:     isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
    tagBg:        isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
    tagColor:     isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.38)",
    mockLine:     isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)",
    mockBlock:    isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    mockAccent:   isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)",
  };
}

function LaptopMockup({ c }: { c: ReturnType<typeof useTheme2> }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 16px" }}>
      <div style={{
        width: "100%", maxWidth: 320,
        border: `1.5px solid ${c.tileBorder}`,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: c.isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.1)",
      }}>
        {/* Browser chrome */}
        <div style={{
          background: c.mockBlock,
          padding: "7px 10px",
          display: "flex", alignItems: "center", gap: 5,
          borderBottom: `1px solid ${c.tileBorder}`,
        }}>
          {[0.2, 0.13, 0.08].map((op, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c.isDark ? `rgba(255,255,255,${op})` : `rgba(0,0,0,${op})` }} />
          ))}
          <div style={{ flex: 1, marginLeft: 6, height: 5, borderRadius: 4, background: c.mockBlock }} />
        </div>
        {/* Browser content */}
        <div style={{ background: c.isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)", padding: 10, display: "flex", gap: 8 }}>
          {/* Sidebar */}
          <div style={{ width: 40, display: "flex", flexDirection: "column", gap: 5 }}>
            {[70, 55, 65, 48, 60].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 5, borderRadius: 3, background: i === 0 ? c.mockAccent : c.mockBlock }} />
            ))}
          </div>
          {/* Main content */}
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
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
          {[0.18, 0.1, 0.14, 0.08, 0.16, 0.1].map((op, i) => (
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
          {["0.85", "0.65", "0.45", "0.25", "0.14", "0.08", "0.05", "0.02"].map((op, i) => (
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
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", alignItems: "center" }}>
        {/* WCAG badge */}
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
            color: c.isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          }}>
            WCAG 2.1 AA
          </span>
        </div>
        {/* Checklist */}
        {["Colour Contrast", "Keyboard Nav", "ARIA Labels", "Screen Reader"].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%",
          }}>
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

          {/* Tile A — Wired Hub (double height) */}
          <div style={{
            gridRow: "1 / 3",
            background: c.tileA,
            border: `1px solid ${c.tileBorder}`,
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <LaptopMockup c={c} />
            </div>
            <div style={{
              padding: "16px 22px 20px",
              borderTop: `1px solid ${c.tileBorder}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
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
                fontSize: "0.78rem", lineHeight: 1.55,
                color: c.tileBody, margin: 0,
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
          }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <FigmaMockup c={c} />
            </div>
            <div style={{
              padding: "12px 18px 16px",
              borderTop: `1px solid ${c.tileBorder}`,
            }}>
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
                fontSize: "0.92rem",
                fontWeight: 700, letterSpacing: "-0.01em",
                color: c.tileTitle, margin: "5px 0 3px",
              }}>
                Exclusive Digitals
              </h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.72rem", lineHeight: 1.5,
                color: c.tileBody, margin: 0,
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
          }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <A11yMockup c={c} />
            </div>
            <div style={{
              padding: "12px 18px 16px",
              borderTop: `1px solid ${c.tileBorder}`,
            }}>
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
                fontSize: "0.92rem",
                fontWeight: 700, letterSpacing: "-0.01em",
                color: c.tileTitle, margin: "5px 0 3px",
              }}>
                Dcode Dynamics
              </h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.72rem", lineHeight: 1.5,
                color: c.tileBody, margin: 0,
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
