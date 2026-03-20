import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoveRight, MessageCircle, Layers, Users, Zap } from "lucide-react";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // When nav is light → hero is dark; when nav is dark → hero is light
  const heroDark = !mounted || resolvedTheme !== "dark";

  const bg = heroDark ? "#0D0D0D" : "#F8F8F8";
  const headingColor = heroDark ? "#F5F5F5" : "#0D0D0D";
  const bodyColor = heroDark ? "rgba(255,255,255,0.55)" : "#555555";
  const eyebrowColor = heroDark ? "rgba(255,255,255,0.35)" : "#999999";
  const dotColor = heroDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.28)";
  const dividerColor = heroDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const statValue = heroDark ? "#F5F5F5" : "#0D0D0D";
  const statLabel = heroDark ? "rgba(255,255,255,0.3)" : "#BBBBBB";
  const iconColor = heroDark ? "rgba(255,255,255,0.4)" : "#999999";
  const iconLabelColor = heroDark ? "rgba(255,255,255,0.45)" : "#888888";
  const tagBg = heroDark ? "rgba(255,255,255,0.07)" : "#EFEFEF";
  const tagBorder = heroDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
  const tagColor = heroDark ? "rgba(255,255,255,0.45)" : "#555555";
  const scrollColor = heroDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.2)";
  const scrollLine = heroDark
    ? "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)"
    : "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)";

  return (
    <section
      className="relative overflow-hidden flex items-center transition-colors duration-500"
      style={{
        height: "100vh",
        paddingTop: 64,
        perspective: "1200px",
        background: bg,
      }}
    >
      {/* Fabric fold texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: heroDark
            ? "radial-gradient(ellipse 70% 50% at 15% 20%, rgba(255,255,255,0.012) 0%, transparent 70%)," +
              "radial-gradient(ellipse 50% 60% at 85% 80%, rgba(255,255,255,0.008) 0%, transparent 65%)," +
              "radial-gradient(ellipse 40% 40% at 60% 40%, rgba(255,255,255,0.005) 0%, transparent 60%)"
            : "radial-gradient(ellipse 70% 50% at 15% 20%, rgba(0,0,0,0.016) 0%, transparent 70%)," +
              "radial-gradient(ellipse 50% 60% at 85% 80%, rgba(0,0,0,0.012) 0%, transparent 65%)," +
              "radial-gradient(ellipse 40% 40% at 60% 40%, rgba(0,0,0,0.008) 0%, transparent 60%)",
        }}
      />

      {/* Content grid */}
      <div
        className="max-w-3xl mx-auto w-full relative z-10"
        style={{ padding: "48px 40px" }}
      >
        {/* CENTER: Text */}
        <div className="flex flex-col gap-5" style={{ alignItems: "center", textAlign: "center" }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.66rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: eyebrowColor,
            }}>
              UX Designer & Product Thinker
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: headingColor,
            margin: 0,
          }}>
            Designing{" "}
            <span style={{ color: headingColor }}>
              Experiences
            </span>
            <br />
            That Actually{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Matter
              <span style={{
                position: "absolute", bottom: -2, left: 0, right: 0,
                height: 2, borderRadius: 2,
                background: heroDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
              }} />
            </span>
          </h1>

          {/* Body */}
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.97rem", lineHeight: 1.75,
            color: bodyColor,
            maxWidth: 560, margin: 0,
          }}>
            I craft human-centered digital products with thoughtful interactions and clear visual hierarchies. From research to high-fidelity pixels — I make complex simple.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
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
                  ? "0 4px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9)"
                  : "0 4px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              View My Work
              <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              className="flex items-center gap-2 transition-all duration-200"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.82rem", fontWeight: 600,
                letterSpacing: "0.02em", padding: "10px 26px",
                borderRadius: 100, cursor: "pointer",
                border: heroDark ? "1.5px solid rgba(255,255,255,0.18)" : "1.5px solid rgba(0,0,0,0.16)",
                color: heroDark ? "rgba(255,255,255,0.8)" : "#1A1A1A",
                background: "transparent",
              }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Let's Talk
            </button>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2">
            {["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility", "UX Writing"].map(tag => (
              <span key={tag} style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "5px 12px", borderRadius: 100,
                background: tagBg,
                border: `1px solid ${tagBorder}`,
                color: tagColor,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 16 }}>
            <div className="flex items-center gap-8 flex-wrap">
              {[
                { value: "12+", label: "Products" },
                { value: "6 yrs", label: "Experience" },
                { value: "50+", label: "Interviews" },
              ].map(({ value, label }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.4rem", fontWeight: 800,
                    lineHeight: 1, letterSpacing: "-0.02em",
                    color: statValue,
                  }}>
                    {value}
                  </span>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.13em", textTransform: "uppercase",
                    color: statLabel,
                  }}>
                    {label}
                  </span>
                </div>
              ))}
              <div style={{ width: 1, height: 36, background: dividerColor }} />
              <div className="flex items-center gap-3">
                {[
                  { icon: Layers, label: "Systems" },
                  { icon: Users, label: "Research" },
                  { icon: Zap, label: "Delivery" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3" style={{ color: iconColor }} />
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.65rem", fontWeight: 600,
                      color: iconLabelColor,
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
