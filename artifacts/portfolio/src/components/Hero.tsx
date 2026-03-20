import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle } from "lucide-react";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const heroDark = !mounted || resolvedTheme !== "dark";

  const bg            = heroDark ? "#0D0D0D" : "#F8F8F8";
  const headingColor  = heroDark ? "#F5F5F5" : "#0D0D0D";
  const subColor      = heroDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  const eyebrowColor  = heroDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)";
  const dotColor      = heroDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)";
  const dividerColor  = heroDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const metricVal     = heroDark ? "#F5F5F5" : "#0D0D0D";
  const metricLbl     = heroDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)";
  const metricBg      = heroDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const metricBorder  = heroDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const scrollColor   = heroDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)";
  const scrollLine    = heroDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)";

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
      {/* Subtle texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: heroDark
          ? "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(255,255,255,0.012) 0%, transparent 70%)"
          : "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(0,0,0,0.014) 0%, transparent 70%)",
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
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: headingColor,
              margin: 0,
            }}>
              Haseeb Qureshi
            </h1>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
              fontWeight: 500, letterSpacing: "0.01em",
              color: subColor, margin: 0,
            }}>
              UI/UX Design Lead&nbsp;&nbsp;·&nbsp;&nbsp;Accessibility Specialist
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 48, height: 1, background: dividerColor }} />

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
                padding: "18px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: m.value.length > 4 ? "clamp(0.85rem, 1.5vw, 1.05rem)" : "clamp(1.4rem, 2.5vw, 1.9rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: metricVal,
                }}>
                  {m.value}
                </span>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.62rem", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
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
                letterSpacing: "0.03em", padding: "11px 26px",
                borderRadius: 100, border: "none", cursor: "pointer",
                background: heroDark ? "#F5F5F5" : "#0D0D0D",
                color: heroDark ? "#0D0D0D" : "#FAFAFA",
                boxShadow: heroDark
                  ? "0 4px 18px rgba(0,0,0,0.4)"
                  : "0 4px 18px rgba(0,0,0,0.18)",
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
                letterSpacing: "0.02em", padding: "10px 26px",
                borderRadius: 100, cursor: "pointer",
                border: heroDark ? "1.5px solid rgba(255,255,255,0.18)" : "1.5px solid rgba(0,0,0,0.16)",
                color: heroDark ? "rgba(255,255,255,0.8)" : "#1A1A1A",
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
          fontSize: "0.52rem", letterSpacing: "0.2em",
          textTransform: "uppercase", color: scrollColor,
        }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 26, background: scrollLine }} />
      </div>
    </section>
  );
}
