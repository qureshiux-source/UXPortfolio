import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle } from "lucide-react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const heroDark = !mounted || resolvedTheme !== "dark";

  const bg = heroDark
    ? "linear-gradient(145deg, #141414 0%, #0A0A0A 50%, #060606 100%)"
    : "linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 60%, #F5F5F5 100%)";

  const headingColor = heroDark ? "#FAFAFA" : "#0A0A0A";
  const subColor     = heroDark ? "#9A9A9A" : "#4D4D4D";
  const eyebrowColor = heroDark ? "#9A9A9A" : "#4D4D4D";
  const dotColor     = heroDark ? "#6E6E6E" : "#595959";
  const dividerColor = heroDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const metricVal    = heroDark ? "#FAFAFA" : "#0A0A0A";
  const metricLbl    = heroDark ? "#848484" : "#595959";
  const metricBg     = heroDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.035)";
  const metricBorder = heroDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.09)";
  const scrollColor  = heroDark ? "#6E6E6E" : "#737373";
  const scrollLine   = heroDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)";

  const METRICS = [
    { value: "4+",          label: "Years Experience" },
    { value: "10+",         label: "Certifications" },
    { value: "Design Lead", label: "@ Wired Hub" },
  ];

  return (
    <section
      className="relative overflow-hidden flex items-center transition-colors duration-500"
      style={{ height: "100vh", paddingTop: 64, background: bg }}
    >
      {/* Radial focal glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: heroDark
          ? "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(255,255,255,0.03) 0%, transparent 70%)"
          : "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(0,0,0,0.025) 0%, transparent 70%)",
      }} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: NOISE_SVG,
        backgroundSize: "160px 160px",
        opacity: heroDark ? 0.055 : 0.03,
        mixBlendMode: "overlay",
      }} />

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: heroDark
          ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0,0,0,0.35) 100%)"
          : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(0,0,0,0.04) 100%)",
      }} />

      <div
        className="max-w-3xl mx-auto w-full relative z-10"
        style={{ padding: "0 clamp(24px, 5vw, 48px)" }}
      >
        <div className="flex flex-col gap-6" style={{ alignItems: "center", textAlign: "center" }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrowColor,
            }}>
              Portfolio · UI/UX Design
            </span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
          </div>

          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
              fontWeight: 800, lineHeight: 1.03,
              letterSpacing: "-0.035em",
              color: headingColor,
              margin: 0,
            }}>
              Haseeb Qureshi
            </h1>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
              fontWeight: 600, letterSpacing: "0.01em",
              color: subColor, margin: 0,
            }}>
              UI/UX Design Lead&nbsp;&nbsp;·&nbsp;&nbsp;Accessibility Specialist
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 40, height: 1, background: dividerColor }} />

          {/* Metric Bar */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            width: "100%",
            maxWidth: 560,
          }}>
            {METRICS.map((m) => (
              <div key={m.label} style={{
                background: metricBg,
                border: `1px solid ${metricBorder}`,
                borderRadius: 14,
                padding: "20px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
                boxShadow: heroDark
                  ? "0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.3)"
                  : "0 1px 0 rgba(255,255,255,0.9), 0 4px 16px rgba(0,0,0,0.05)",
              }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: m.value.length > 4 ? "clamp(0.85rem, 1.5vw, 1.05rem)" : "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: metricVal,
                }}>
                  {m.value}
                </span>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.58rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: metricLbl,
                }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap" style={{ justifyContent: "center" }}>
            <button
              className="flex items-center gap-2 group transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.82rem", fontWeight: 700,
                letterSpacing: "0.03em", padding: "12px 28px",
                borderRadius: 100, border: "none", cursor: "pointer",
                background: heroDark ? "#FAFAFA" : "#0A0A0A",
                color: heroDark ? "#0A0A0A" : "#FAFAFA",
                boxShadow: heroDark
                  ? "0 4px 20px rgba(0,0,0,0.5)"
                  : "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              View My Work
              <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <a
              href="mailto:qureshi.ux@gmail.com"
              className="flex items-center gap-2 transition-all duration-200"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.82rem", fontWeight: 600,
                letterSpacing: "0.02em", padding: "11px 28px",
                borderRadius: 100, cursor: "pointer",
                border: heroDark ? "1.5px solid rgba(255,255,255,0.22)" : "1.5px solid rgba(0,0,0,0.2)",
                color: heroDark ? "#D4D4D4" : "#1A1A1A",
                background: "transparent",
                textDecoration: "none",
              }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.52rem", letterSpacing: "0.22em",
          textTransform: "uppercase", color: scrollColor, fontWeight: 700,
        }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 28, background: scrollLine }} />
      </div>
    </section>
  );
}
