import { useEffect, useRef } from "react";
import { MoveRight, MessageCircle, Layers, Users, Zap } from "lucide-react";

export function Hero() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    const animate = () => {
      const xPos = (mouseRef.current.x - 0.5) * 2;
      const yPos = (mouseRef.current.y - 0.5) * 2;
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const depth = (index + 1) * 8;
        const rot = (index + 1) * 1.0;
        card.style.transform = `translate(${xPos * depth}px, ${yPos * depth}px) rotateX(${yPos * -rot}deg) rotateY(${xPos * rot}deg)`;
      });
      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;
        dot.style.transform = `translate(${xPos * (index + 1) * 4}px, ${yPos * (index + 1) * 4}px)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        marginTop: 64,
        minHeight: "calc(100vh - 64px)",
        perspective: "1200px",
        background: "#F8F8F8",
      }}
    >
      {/* Subtle fabric fold texture — full background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 20%, rgba(0,0,0,0.016) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 60% at 85% 80%, rgba(0,0,0,0.012) 0%, transparent 65%)," +
            "radial-gradient(ellipse 40% 40% at 60% 40%, rgba(0,0,0,0.008) 0%, transparent 60%)",
        }}
      />

      {/* Content grid */}
      <div
        className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 relative z-10"
        style={{ padding: "48px 40px", gap: 32, alignItems: "center" }}
      >

        {/* LEFT: Text */}
        <div className="md:col-span-7 flex flex-col gap-5">

          <div className="flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.28)", flexShrink: 0 }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.66rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: "#999999",
            }}>
              UX Designer & Product Thinker
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.02em", color: "#0D0D0D", margin: 0,
          }}>
            Designing{" "}
            <span style={{
              background: "linear-gradient(135deg, #111111 0%, #666666 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Experiences
            </span>
            <br />
            That Actually{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Matter
              <span style={{
                position: "absolute", bottom: -2, left: 0, right: 0,
                height: 2, borderRadius: 2, background: "rgba(0,0,0,0.1)",
              }} />
            </span>
          </h1>

          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.97rem", lineHeight: 1.75,
            color: "#555555", maxWidth: 490, margin: 0,
          }}>
            I craft human-centered digital products with thoughtful interactions and clear visual hierarchies. From research to high-fidelity pixels — I make complex simple.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 group transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.82rem", fontWeight: 700,
                letterSpacing: "0.03em", padding: "11px 26px",
                borderRadius: 100, border: "none", cursor: "pointer",
                background: "#0D0D0D", color: "#FAFAFA",
                boxShadow: "0 4px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              View My Work
              <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              className="flex items-center gap-2 transition-all duration-200 hover:bg-black/[0.04]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.82rem", fontWeight: 600,
                letterSpacing: "0.02em", padding: "10px 26px",
                borderRadius: 100, cursor: "pointer",
                border: "1.5px solid rgba(0,0,0,0.16)",
                color: "#1A1A1A", background: "rgba(255,255,255,0.7)",
              }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Let's Talk
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Figma", "User Research", "Prototyping", "Design Systems", "Accessibility", "UX Writing"].map(tag => (
              <span key={tag} style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "5px 12px", borderRadius: 100,
                background: "#EFEFEF",
                border: "1px solid rgba(0,0,0,0.07)",
                color: "#555555",
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 16 }}>
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
                    lineHeight: 1, letterSpacing: "-0.02em", color: "#0D0D0D",
                  }}>
                    {value}
                  </span>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.58rem", fontWeight: 700,
                    letterSpacing: "0.13em", textTransform: "uppercase", color: "#BBBBBB",
                  }}>
                    {label}
                  </span>
                </div>
              ))}
              <div style={{ width: 1, height: 36, background: "rgba(0,0,0,0.08)" }} />
              <div className="flex items-center gap-3">
                {[
                  { icon: Layers, label: "Systems" },
                  { icon: Users, label: "Research" },
                  { icon: Zap, label: "Delivery" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3" style={{ color: "#999999" }} />
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.65rem", fontWeight: 600, color: "#888888",
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Parallax cards on a unified background */}
        <div
          className="md:col-span-5 hidden md:block relative"
          style={{ height: "min(400px, calc(100vh - 280px))", perspective: "1000px" }}
        >
          {/* Subtle dark card zone hint — soft ellipse shadow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 60% 50%, rgba(0,0,0,0.04) 0%, transparent 80%)",
            }}
          />

          {/* Floating dots */}
          {[
            { top: "6%", left: "8%", size: 6, opacity: 0.18 },
            { top: "82%", left: "80%", size: 4, opacity: 0.14 },
            { top: "55%", left: "2%", size: 5, opacity: 0.16 },
            { top: "92%", left: "42%", size: 5, opacity: 0.12 },
          ].map((dot, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className="absolute rounded-full transition-transform duration-100 ease-out"
              style={{
                top: dot.top, left: dot.left,
                width: dot.size, height: dot.size,
                background: `rgba(0,0,0,${dot.opacity})`,
              }}
            />
          ))}

          {/* Card 3 — Palette swatch (back, top-right) */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="absolute transition-transform duration-[120ms] ease-out"
            style={{
              top: "8%", right: "10%",
              width: 172, height: 132,
              transformStyle: "preserve-3d",
              background: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 13,
              padding: "14px 16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
              zIndex: 10,
            }}
          >
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.52rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)", marginBottom: 8,
            }}>
              Palette
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5, height: 60 }}>
              {["#F5F5F5", "#D5D5D5", "#A5A5A5", "#757575", "#484848", "#2E2E2E", "#1A1A1A", "#0D0D0D"].map(c => (
                <div key={c} style={{
                  background: c, borderRadius: 7,
                  border: c === "#0D0D0D" ? "1px solid rgba(255,255,255,0.12)" : "none",
                }} />
              ))}
            </div>
          </div>

          {/* Card 2 — Stats (middle) */}
          <div
            ref={el => cardsRef.current[1] = el}
            className="absolute transition-transform duration-[100ms] ease-out"
            style={{
              top: "44%", right: "30%",
              width: 210, height: 175,
              transformStyle: "preserve-3d",
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "18px 20px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              zIndex: 20,
            }}
          >
            <div>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.52rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", marginBottom: 4,
              }}>
                Impact
              </p>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.2rem", fontWeight: 800, lineHeight: 1.2,
                color: "#F5F5F5", margin: 0,
              }}>
                12 Products<br />Designed
              </h3>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 42 }}>
              {[38, 68, 28, 88, 52, 100, 62, 48].map((h, i) => (
                <div key={i} style={{
                  flex: 1, borderRadius: "3px 3px 0 0",
                  height: `${h}%`,
                  background: i === 5
                    ? "rgba(255,255,255,0.78)"
                    : `rgba(255,255,255,${0.1 + (h / 100) * 0.22})`,
                }} />
              ))}
            </div>
          </div>

          {/* Card 1 — Wireframe (front) */}
          <div
            ref={el => cardsRef.current[2] = el}
            className="absolute transition-transform duration-[80ms] ease-out"
            style={{
              top: "2%", right: "44%",
              width: 225, height: 245,
              transformStyle: "preserve-3d",
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: 16,
              padding: "16px 18px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.95)",
              zIndex: 30,
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {["#D8D8D8", "#E4E4E4", "#EBEBEB"].map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{
                width: "100%", height: 82, borderRadius: 11,
                background: "linear-gradient(135deg, #F0F0F0, #E8E8E8)",
                border: "1px solid rgba(0,0,0,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(0,0,0,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(0,0,0,0.2)" }} />
                </div>
              </div>
              <div style={{ width: "76%", height: 7, borderRadius: 4, background: "#E8E8E8" }} />
              <div style={{ width: "56%", height: 7, borderRadius: 4, background: "#EEEEEE" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <div style={{ flex: 1, height: 28, borderRadius: 100, background: "#1A1A1A" }} />
                <div style={{ flex: 1, height: 28, borderRadius: 100, background: "#EDEDED", border: "1px solid rgba(0,0,0,0.08)" }} />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
                {[60, 40, 55].map((w, i) => (
                  <div key={i} style={{ width: `${w}%`, height: 5, borderRadius: 4, background: i === 0 ? "#D0D0D0" : "#EBEBEB" }} />
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
          textTransform: "uppercase", color: "rgba(0,0,0,0.2)",
        }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 26, background: "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)" }} />
      </div>
    </section>
  );
}
