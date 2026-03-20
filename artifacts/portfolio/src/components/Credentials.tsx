import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const CREDS = [
  { label: "Sukkur IBA University",              sub: "BCS in Human-Computer Interaction" },
  { label: "Microsoft",                           sub: "UX Design Specialization" },
  { label: "LinkedIn Learning",                   sub: "Design Psychology" },
  { label: "Google UX Design",                    sub: "Professional Certificate" },
  { label: "Interaction Design Foundation",       sub: "UX Research & Strategy" },
];

export function Credentials() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const bg        = isDark ? "#0D0D0D" : "#F2F2F2";
  const eyebrow   = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const titleClr  = isDark ? "#F5F5F5" : "#0D0D0D";
  const marqueeEl = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const marqueeBd = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const labelClr  = isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.7)";
  const subClr    = isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)";
  const dotClr    = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";

  const doubled = [...CREDS, ...CREDS, ...CREDS];

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
        gap: "clamp(28px, 5vh, 56px)",
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track { animation: marquee-scroll 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Header */}
      <div style={{
        maxWidth: 860, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 1, background: eyebrow }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.62rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: eyebrow,
          }}>
            Credentials
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
          fontWeight: 800, lineHeight: 1.1,
          letterSpacing: "-0.025em",
          color: titleClr, margin: 0,
        }}>
          10+ Certifications
        </h2>
      </div>

      {/* Marquee strip */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "clamp(12px, 2vw, 20px)",
            width: "max-content",
          }}
        >
          {doubled.map((cred, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                background: marqueeEl,
                border: `1px solid ${marqueeBd}`,
                borderRadius: 14,
                padding: "18px clamp(18px, 2vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                minWidth: "clamp(200px, 22vw, 280px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: dotClr, flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.82rem", fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: labelClr,
                }}>
                  {cred.label}
                </span>
              </div>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.68rem", fontWeight: 600,
                color: subClr,
                paddingLeft: 15,
              }}>
                {cred.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
