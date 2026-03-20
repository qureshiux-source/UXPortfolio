import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const EXPERIENCES = [
  {
    id: 1,
    role: "UX Team Lead",
    company: "Wired Hub",
    period: "2023 — Present",
    type: "Full-time",
    points: [
      "Leading a cross-functional design team, shaping design culture and systems across the organisation.",
      "Partnering with product and engineering to ship human-centered solutions at scale.",
    ],
  },
  {
    id: 2,
    role: "UI/UX Designer",
    company: "Exclusive Digitals",
    period: "2021 — 2023",
    type: "Full-time",
    points: [
      "Crafted end-to-end digital experiences across web and mobile — from discovery through delivery.",
      "Delivered pixel-perfect handoffs and high-fidelity prototypes across 10+ client projects.",
    ],
  },
];

export function WorkExperience() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const bg          = isDark ? "#0F0F0F" : "#F8F8F8";
  const eyebrowClr  = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const lineClr     = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const dotFill     = isDark ? "#F5F5F5" : "#0D0D0D";
  const dotInner    = isDark ? "#0F0F0F" : "#F8F8F8";
  const companyClr  = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const periodClr   = isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)";
  const roleClr     = isDark ? "#F5F5F5" : "#0D0D0D";
  const badgeBg     = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const badgeClr    = isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
  const bulletClr   = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const bulletDot   = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
  const dividerClr  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const titleClr    = isDark ? "#FFFFFF" : "#0D0D0D";

  return (
    <div
      className="transition-colors duration-500"
      style={{
        height: "100vh",
        background: bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fabric fold texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark
          ? "radial-gradient(ellipse 55% 45% at 80% 15%, rgba(255,255,255,0.012) 0%, transparent 70%)"
          : "radial-gradient(ellipse 55% 45% at 80% 15%, rgba(0,0,0,0.012) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: 820, width: "100%", margin: "0 auto", padding: "0 clamp(24px, 5vw, 72px)", position: "relative", zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: "clamp(28px, 4.5vh, 56px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1, background: eyebrowClr }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrowClr,
            }}>
              Career Path
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: titleClr, margin: 0,
          }}>
            Where I've{" "}
            <span style={{ color: titleClr }}>
              made an impact.
            </span>
          </h2>
        </div>

        {/* ── TIMELINE ENTRIES ── */}
        <div style={{ position: "relative" }}>

          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: 8,
            top: 8,
            bottom: 8,
            width: 1,
            background: lineClr,
          }} />

          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id}>
              <div style={{ display: "flex", gap: "clamp(20px, 3vw, 40px)", paddingLeft: 0 }}>

                {/* Dot */}
                <div style={{ flexShrink: 0, paddingTop: 3, position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 17, height: 17,
                    borderRadius: "50%",
                    background: dotFill,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: isDark
                      ? "0 0 0 3px #0F0F0F, 0 0 0 5px rgba(255,255,255,0.12)"
                      : "0 0 0 3px #F8F8F8, 0 0 0 5px rgba(0,0,0,0.1)",
                  }}>
                    <div style={{
                      width: 7, height: 7,
                      borderRadius: "50%",
                      background: dotInner,
                    }} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: idx < EXPERIENCES.length - 1 ? "clamp(28px, 4vh, 48px)" : 0 }}>

                  {/* Row 1: Company + Period */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: companyClr }} />
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.78rem", fontWeight: 700,
                        color: companyClr, letterSpacing: "0.02em",
                      }}>
                        {exp.company}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.72rem", fontWeight: 500,
                      color: periodClr, letterSpacing: "0.02em",
                    }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Row 2: Role + Badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <h3 style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      fontWeight: 800, letterSpacing: "-0.02em",
                      color: roleClr, margin: 0, lineHeight: 1.1,
                    }}>
                      {exp.role}
                    </h3>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.62rem", fontWeight: 700,
                      letterSpacing: "0.06em",
                      padding: "4px 11px", borderRadius: 100,
                      background: badgeBg, color: badgeClr,
                      whiteSpace: "nowrap",
                    }}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.points.map((pt, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{
                          flexShrink: 0, marginTop: 7,
                          width: 5, height: 5, borderRadius: "50%",
                          background: bulletDot,
                        }} />
                        <span style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                          lineHeight: 1.65,
                          color: bulletClr,
                        }}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider between entries */}
              {idx < EXPERIENCES.length - 1 && (
                <div style={{
                  height: 1,
                  background: dividerClr,
                  marginLeft: 37,
                  marginBottom: "clamp(28px, 4vh, 48px)",
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
