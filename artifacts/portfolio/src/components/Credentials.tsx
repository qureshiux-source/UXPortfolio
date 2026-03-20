import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CREDS = [
  { label: "Sukkur IBA University",         sub: "BCS in Human-Computer Interaction" },
  { label: "Microsoft",                      sub: "UX Design Specialization" },
  { label: "LinkedIn Learning",              sub: "Design Psychology" },
  { label: "Google UX Design",              sub: "Professional Certificate" },
  { label: "Interaction Design Foundation", sub: "UX Research & Strategy" },
];

export function Credentials() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const bg        = isDark
    ? "linear-gradient(150deg, #101010 0%, #0A0A0A 55%, #0D0D0D 100%)"
    : "linear-gradient(150deg, #F5F5F5 0%, #FAFAFA 55%, #F0F0F0 100%)";
  const eyebrow   = isDark ? "#848484" : "#595959";
  const titleClr  = isDark ? "#FAFAFA" : "#0A0A0A";
  const marqueeEl = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.85)";
  const marqueeBd = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const labelClr  = isDark ? "#C8C8C8" : "#1A1A1A";
  const subClr    = isDark ? "#848484" : "#595959";
  const dotClr    = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const noiseOp   = isDark ? 0.06 : 0.028;

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
        position: "relative",
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track { animation: marquee-scroll 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: NOISE_SVG,
        backgroundSize: "160px 160px",
        opacity: noiseOp,
        mixBlendMode: "overlay",
      }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark
          ? "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)"
          : "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.03) 100%)",
      }} />

      {/* Header */}
      <div style={{
        maxWidth: 860, width: "100%", margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
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
      <div style={{ overflow: "hidden", width: "100%", position: "relative", zIndex: 1 }}>
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "clamp(12px, 2vw, 20px)",
            width: "max-content",
            paddingLeft: "clamp(24px, 5vw, 72px)",
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
                gap: 6,
                minWidth: "clamp(200px, 22vw, 280px)",
                boxShadow: isDark
                  ? "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
                  : "0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
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
                fontSize: "0.7rem", fontWeight: 600,
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
