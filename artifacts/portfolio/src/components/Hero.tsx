import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

const BLUE = "#3D7BFF";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 64,
      }}
    >
      {/* Animated gradient blobs */}
      <div
        className="blob-1"
        style={{
          position: "absolute",
          width: "clamp(300px, 45vw, 600px)",
          height: "clamp(300px, 45vw, 600px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BLUE}28 0%, transparent 70%)`,
          top: "-10%", left: "-5%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="blob-2"
        style={{
          position: "absolute",
          width: "clamp(250px, 35vw, 480px)",
          height: "clamp(250px, 35vw, 480px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, #7B3DFF22 0%, transparent 70%)`,
          bottom: "5%", right: "-5%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="blob-3"
        style={{
          position: "absolute",
          width: "clamp(200px, 28vw, 380px)",
          height: "clamp(200px, 28vw, 380px)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BLUE}14 0%, transparent 70%)`,
          top: "55%", left: "40%",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid lines */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            `linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative", zIndex: 1,
          maxWidth: 760, width: "100%",
          padding: "0 clamp(24px, 5vw, 48px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center", gap: 28,
        }}
      >
        {/* Eyebrow badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 100,
          background: `${BLUE}18`,
          border: `1px solid ${BLUE}40`,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, boxShadow: `0 0 8px ${BLUE}` }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: BLUE,
          }}>
            Available for Opportunities
          </span>
        </div>

        {/* Name */}
        <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            margin: 0,
          }}>
            Haseeb{" "}
            <span style={{ color: BLUE, textShadow: `0 0 40px ${BLUE}60` }}>
              Qureshi
            </span>
          </h1>
        </div>

        {/* Role */}
        <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }}>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.5)",
            margin: 0,
          }}>
            UI/UX Design Lead
            <span style={{ color: `${BLUE}80`, margin: "0 10px" }}>|</span>
            CS Background
          </p>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.38)",
          maxWidth: 520, margin: 0,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.7s ease 0.4s",
        }}>
          Designing at the intersection of product thinking, design systems, and
          human behaviour — from research to pixel-perfect delivery.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center",
          opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.5s",
        }}>
          <button
            className="group"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.85rem", fontWeight: 700,
              letterSpacing: "0.02em",
              padding: "12px 28px", borderRadius: 100,
              background: BLUE, color: "#FFFFFF", border: "none",
              cursor: "pointer",
              boxShadow: `0 6px 24px ${BLUE}50`,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#5591FF";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 30px ${BLUE}70`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = BLUE;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 24px ${BLUE}50`;
            }}
          >
            View My Work
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <a
            href="#"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.85rem", fontWeight: 600,
              letterSpacing: "0.02em",
              padding: "11px 28px", borderRadius: 100,
              background: "transparent",
              color: "rgba(255,255,255,0.75)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)";
            }}
          >
            <Download size={14} />
            Download CV
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 0,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 24, width: "100%", justifyContent: "center",
          opacity: mounted ? 1 : 0, transition: "opacity 0.7s ease 0.6s",
        }}>
          {[
            { value: "6+", label: "Years" },
            { value: "12+", label: "Products" },
            { value: "50+", label: "User Interviews" },
            { value: "4", label: "Companies" },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "0 clamp(16px, 3vw, 36px)" }}>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  fontWeight: 800, lineHeight: 1,
                  color: "#FFFFFF", letterSpacing: "-0.02em",
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}>
                  {stat.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 1, background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          opacity: mounted ? 0.4 : 0, transition: "opacity 0.7s ease 0.8s",
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.5rem", letterSpacing: "0.22em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
        }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 28,
          background: "linear-gradient(to bottom, rgba(61,123,255,0.6), transparent)",
        }} />
      </div>
    </section>
  );
}
