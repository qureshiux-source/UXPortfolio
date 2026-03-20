import { useState } from "react";
import { ArrowUpRight, Briefcase } from "lucide-react";

const BLUE = "#3D7BFF";

const EXPERIENCES = [
  {
    id: "wired-hub",
    company: "Wired Hub",
    role: "UI/UX Design Lead",
    period: "April 2025 – Present",
    tag: "Current",
    description: "Leading product design across a Government & Real Estate platform. Overseeing design systems, stakeholder alignment, and end-to-end delivery.",
    highlights: ["Design System", "Gov Platform", "Real Estate"],
    size: "large",
    accent: BLUE,
  },
  {
    id: "exclusive",
    company: "Exclusive Digitals",
    role: "Senior UI/UX Designer",
    period: "2023 – April 2025",
    tag: "Design Systems",
    description: "Built and maintained a shared Figma component library used across 8+ client products.",
    highlights: ["Figma Library", "10+ Projects", "Client-facing"],
    size: "medium",
    accent: "rgba(255,255,255,0.7)",
  },
  {
    id: "dcode",
    company: "Dcode Dynamics",
    role: "UI/UX Designer",
    period: "2022 – 2023",
    tag: "Product",
    description: "Shipped mobile-first product experiences for SaaS clients.",
    size: "small",
    accent: "rgba(255,255,255,0.5)",
  },
  {
    id: "ubiox",
    company: "UBIOX",
    role: "UI/UX Designer",
    period: "2021 – 2022",
    tag: "Contract",
    description: "Prototyped biotech dashboard interfaces with strong data-density focus.",
    size: "small",
    accent: "rgba(255,255,255,0.5)",
  },
];

function WireframeMockup() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "rgba(255,255,255,0.03)",
      borderRadius: 10, overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)",
      display: "grid",
      gridTemplateColumns: "48px 1fr",
    }}>
      {/* Sidebar */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 8px",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: `${BLUE}40`, margin: "0 auto 8px" }} />
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: 24, height: 24, borderRadius: 5,
            background: i === 1 ? `${BLUE}30` : "rgba(255,255,255,0.06)",
            margin: "0 auto",
          }} />
        ))}
      </div>
      {/* Main */}
      <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 7 }}>
        {/* Header */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
          <div style={{ flex: 1, height: 7, borderRadius: 4, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ width: 40, height: 7, borderRadius: 4, background: `${BLUE}50` }} />
        </div>
        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
          {[0.12, 0.08, 0.06].map((op, i) => (
            <div key={i} style={{
              height: 30, borderRadius: 5,
              background: `rgba(255,255,255,${op})`,
              border: "1px solid rgba(255,255,255,0.06)",
            }} />
          ))}
        </div>
        {/* Table rows */}
        {[1,2,3].map(i => (
          <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: "rgba(255,255,255,0.06)" }} />
            <div style={{ flex: 2, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.05)" }} />
            <div style={{ width: 28, height: 14, borderRadius: 3, background: i === 1 ? `${BLUE}40` : "rgba(255,255,255,0.06)", flexShrink: 0 }} />
          </div>
        ))}
        {/* Chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28, marginTop: 2 }}>
          {[40,70,50,90,60,80,55,75].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0",
              background: i === 3 ? `${BLUE}70` : "rgba(255,255,255,0.1)",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FigmaComponentMockup() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "rgba(255,255,255,0.02)",
      borderRadius: 8, overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.05)",
      padding: 10,
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 2 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE }} />
        <div style={{ height: 5, width: 50, borderRadius: 3, background: "rgba(255,255,255,0.15)" }} />
      </div>
      {/* Component rows */}
      {["Button", "Input", "Card", "Badge"].map((name, i) => (
        <div key={name} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 6px", borderRadius: 4,
          background: i === 0 ? `${BLUE}18` : "rgba(255,255,255,0.03)",
          border: `1px solid ${i === 0 ? BLUE + "40" : "rgba(255,255,255,0.05)"}`,
        }}>
          <div style={{
            width: i === 0 ? 28 : 16, height: 8, borderRadius: 2,
            background: i === 0 ? `${BLUE}60` : "rgba(255,255,255,0.12)",
          }} />
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.48rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em",
          }}>
            {name}
          </span>
          <div style={{
            marginLeft: "auto", width: 20, height: 8, borderRadius: 2,
            background: "rgba(255,255,255,0.06)",
          }} />
        </div>
      ))}
    </div>
  );
}

export function ExperienceBento() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      id="experience"
      style={{
        height: "100vh",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle blue glow top-right */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 400, height: 400,
        background: `radial-gradient(circle, ${BLUE}12 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 900, width: "100%", margin: "0 auto", padding: "0 clamp(20px, 4vw, 60px)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "clamp(20px, 3vh, 36px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 28, height: 1, background: BLUE }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: BLUE,
            }}>
              Career Path
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 800, letterSpacing: "-0.025em",
            color: "#FFFFFF", margin: 0, lineHeight: 1.1,
          }}>
            Where I've Made an Impact
          </h2>
        </div>

        {/* Bento Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto auto",
          gap: "clamp(8px, 1.2vw, 14px)",
        }}>

          {/* Large Card — Wired Hub */}
          <div
            onMouseEnter={() => setHovered("wired-hub")}
            onMouseLeave={() => setHovered(null)}
            style={{
              gridColumn: "span 2",
              gridRow: "span 1",
              background: hovered === "wired-hub" ? "rgba(61,123,255,0.1)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered === "wired-hub" ? BLUE + "50" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 16,
              padding: "clamp(16px, 2.5vh, 24px) clamp(16px, 2.5vw, 24px)",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              minHeight: "clamp(160px, 22vh, 220px)",
            }}
          >
            {/* Left: Info */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "3px 10px", borderRadius: 100,
                    background: `${BLUE}25`, color: BLUE,
                    border: `1px solid ${BLUE}40`,
                  }}>
                    Current
                  </span>
                  <Briefcase size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                </div>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  fontWeight: 800, color: "#FFFFFF",
                  margin: "0 0 4px", letterSpacing: "-0.02em",
                }}>
                  Wired Hub
                </h3>
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.78rem", color: BLUE, fontWeight: 600, margin: "0 0 10px",
                }}>
                  UI/UX Design Lead
                </p>
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.72rem, 1vw, 0.8rem)",
                  lineHeight: 1.6, color: "rgba(255,255,255,0.45)", margin: 0,
                }}>
                  Leading design across Government & Real Estate platforms — systems thinking, stakeholder alignment, delivery.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
                {["Design System", "Gov Platform", "Real Estate"].map(t => (
                  <span key={t} style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.07em", textTransform: "uppercase",
                    padding: "3px 8px", borderRadius: 100,
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.4)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* Right: Mockup */}
            <div style={{ minHeight: 120 }}>
              <WireframeMockup />
            </div>
          </div>

          {/* Medium Card — Exclusive Digitals */}
          <div
            onMouseEnter={() => setHovered("exclusive")}
            onMouseLeave={() => setHovered(null)}
            style={{
              gridColumn: "span 1",
              background: hovered === "exclusive" ? "rgba(255,255,255,0.065)" : "rgba(255,255,255,0.04)",
              border: `1px solid rgba(255,255,255,${hovered === "exclusive" ? 0.14 : 0.08})`,
              borderRadius: 16,
              padding: "clamp(14px, 2vh, 20px) clamp(14px, 2vw, 20px)",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.58rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "3px 8px", borderRadius: 100,
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.4)",
                display: "inline-block", marginBottom: 8,
              }}>
                Design Systems
              </span>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                fontWeight: 700, color: "#FFFFFF",
                margin: "0 0 3px", letterSpacing: "-0.015em",
              }}>
                Exclusive Digitals
              </h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", margin: "0 0 8px",
              }}>
                Senior UI/UX Designer · 2023–2025
              </p>
              <div style={{ height: 60 }}>
                <FigmaComponentMockup />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
                Figma · 10+ Projects
              </span>
              <ArrowUpRight size={14} style={{ color: "rgba(255,255,255,0.25)" }} />
            </div>
          </div>

          {/* Small Card — Dcode Dynamics */}
          <div
            onMouseEnter={() => setHovered("dcode")}
            onMouseLeave={() => setHovered(null)}
            style={{
              gridColumn: "span 1",
              background: hovered === "dcode" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              border: `1px solid rgba(255,255,255,${hovered === "dcode" ? 0.12 : 0.07})`,
              borderRadius: 14,
              padding: "clamp(12px, 2vh, 18px) clamp(12px, 2vw, 18px)",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.7rem", fontWeight: 800, color: "rgba(255,255,255,0.5)" }}>
                DD
              </span>
            </div>
            <div>
              <h4 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.88rem", fontWeight: 700,
                color: "rgba(255,255,255,0.85)", margin: "0 0 2px",
              }}>
                Dcode Dynamics
              </h4>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", margin: 0,
              }}>
                UI/UX Designer · 2022–2023
              </p>
            </div>
            {hovered === "dcode" && (
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.68rem", color: "rgba(255,255,255,0.45)",
                lineHeight: 1.5, margin: 0,
              }}>
                Shipped mobile-first SaaS experiences.
              </p>
            )}
          </div>

          {/* Small Card — UBIOX */}
          <div
            onMouseEnter={() => setHovered("ubiox")}
            onMouseLeave={() => setHovered(null)}
            style={{
              gridColumn: "span 1",
              background: hovered === "ubiox" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              border: `1px solid rgba(255,255,255,${hovered === "ubiox" ? 0.12 : 0.07})`,
              borderRadius: 14,
              padding: "clamp(12px, 2vh, 18px) clamp(12px, 2vw, 18px)",
              cursor: "pointer",
              transition: "all 0.25s ease",
              display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.7rem", fontWeight: 800, color: "rgba(255,255,255,0.5)" }}>
                UB
              </span>
            </div>
            <div>
              <h4 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.88rem", fontWeight: 700,
                color: "rgba(255,255,255,0.85)", margin: "0 0 2px",
              }}>
                UBIOX
              </h4>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", margin: 0,
              }}>
                UI/UX Designer · 2021–2022
              </p>
            </div>
            {hovered === "ubiox" && (
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.68rem", color: "rgba(255,255,255,0.45)",
                lineHeight: 1.5, margin: 0,
              }}>
                Biotech dashboard interfaces — data-dense, high-clarity.
              </p>
            )}
          </div>

          {/* Summary card */}
          <div style={{
            gridColumn: "span 1",
            background: `${BLUE}12`,
            border: `1px solid ${BLUE}30`,
            borderRadius: 14,
            padding: "clamp(12px, 2vh, 18px) clamp(12px, 2vw, 18px)",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 6,
          }}>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
              fontWeight: 800, color: BLUE, letterSpacing: "-0.02em",
            }}>
              6+
            </span>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.7rem", fontWeight: 700,
              color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Years of Design Experience
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
