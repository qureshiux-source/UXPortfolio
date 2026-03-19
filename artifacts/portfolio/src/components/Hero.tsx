import { useEffect, useRef } from "react";
import { MoveRight, MessageCircle } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
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
        const depth = (index + 1) * 10;
        const rot = (index + 1) * 1.2;
        card.style.transform = `
          translate(${xPos * depth}px, ${yPos * depth}px)
          rotateX(${yPos * -rot}deg)
          rotateY(${xPos * rot}deg)
        `;
      });

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;
        const depth = (index + 1) * 5;
        dot.style.transform = `translate(${xPos * depth}px, ${yPos * depth}px)`;
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
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* ── SPLIT BACKGROUND: left matte white / right matte black ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left panel — matte white in light / dark in dark */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: "58%",
            background: "linear-gradient(135deg, #FAFAFA 0%, #F2F2F2 100%)",
          }}
        />
        {/* Right panel — near-black in light, deeper black in dark */}
        <div
          className="absolute top-0 right-0 h-full"
          style={{
            width: "42%",
            background: "linear-gradient(225deg, #1A1A1A 0%, #0D0D0D 100%)",
          }}
        />
        {/* Diagonal divider blur */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: "calc(58% - 60px)",
            width: "120px",
            background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)",
            filter: "blur(20px)",
          }}
        />
        {/* Fabric fold wave on left — soft shadow */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width: "58%",
            background:
              "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(0,0,0,0.025) 0%, transparent 70%)," +
              "radial-gradient(ellipse 40% 60% at 70% 80%, rgba(0,0,0,0.018) 0%, transparent 65%)",
          }}
        />
        {/* Fabric fold wave on right — soft silk highlight */}
        <div
          className="absolute inset-y-0 right-0 pointer-events-none"
          style={{
            width: "42%",
            background:
              "radial-gradient(ellipse 50% 40% at 70% 25%, rgba(255,255,255,0.04) 0%, transparent 70%)," +
              "radial-gradient(ellipse 40% 55% at 30% 75%, rgba(255,255,255,0.025) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-28 md:py-32 relative z-10">

        {/* LEFT — Text content (on white panel) */}
        <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-7">

          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-foreground/40 shrink-0" />
            <span
              className="text-[0.694rem] uppercase tracking-[0.2em] text-muted-foreground font-semibold"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              UX Designer & Product Thinker
            </span>
          </div>

          {/* H1 — Poppins, bold, large */}
          <h1
            className="text-[2.488rem] md:text-[2.986rem] font-bold leading-[1.12] tracking-tight"
            style={{ fontFamily: "'Poppins', sans-serif", color: "#0D0D0D" }}
          >
            Designing{" "}
            <span className="text-gradient">Experiences</span>
            {" "}That Actually{" "}
            <span className="relative inline-block">
              Matter
              <span
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{ background: "rgba(0,0,0,0.15)" }}
              />
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-[1rem] leading-[1.8] max-w-[520px]"
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: "#3A3A3A",
            }}
          >
            I craft human-centered digital products with thoughtful interactions and clear visual hierarchies. From research to high-fidelity pixels — I make complex simple.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap mt-2">
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-full text-[0.833rem] font-bold tracking-wide transition-all duration-300 hover:scale-105 group"
              style={{
                background: "#0D0D0D",
                color: "#FAFAFA",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              View My Work
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-full text-[0.833rem] font-bold tracking-wide border transition-all duration-300 group"
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                color: "#1A1A1A",
                background: "rgba(255,255,255,0.5)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Let's Talk
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 pt-5 mt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            {[
              { value: "12+", label: "Products" },
              { value: "6 yrs", label: "Experience" },
              { value: "50+", label: "Interviews" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span
                  className="text-[1.44rem] font-bold leading-none tracking-tight"
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#0D0D0D" }}
                >
                  {value}
                </span>
                <span
                  className="text-[0.579rem] uppercase tracking-widest font-semibold"
                  style={{ color: "#888888" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Interactive 3D floating cards (on dark panel) */}
        <div
          className="lg:col-span-5 hidden lg:block relative h-[480px]"
          style={{ perspective: "1000px" }}
        >
          {/* Decorative floating dots — white on dark side */}
          {[
            { top: "10%", left: "12%", size: 8 },
            { top: "78%", left: "82%", size: 5 },
            { top: "55%", left: "4%", size: 6 },
            { top: "88%", left: "40%", size: 7 },
          ].map((dot, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className="absolute rounded-full transition-transform duration-[100ms] ease-out"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                background: "rgba(255,255,255,0.25)",
              }}
            />
          ))}

          {/* Card 3 — Color swatch, back layer */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="absolute top-[14%] right-[4%] w-[195px] h-[145px] transition-transform duration-[120ms] ease-out z-10"
            style={{
              transformStyle: "preserve-3d",
              background: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "18px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-[0.579rem] uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Poppins', sans-serif" }}
            >
              Palette
            </p>
            <div className="grid grid-cols-4 gap-2 h-[72px]">
              {[
                "#FAFAFA", "#F0F0F0", "#D0D0D0", "#A0A0A0",
                "#707070", "#404040", "#1A1A1A", "#0D0D0D",
              ].map((c) => (
                <div key={c} className="rounded-lg" style={{ background: c, border: c === "#0D0D0D" ? "1px solid rgba(255,255,255,0.1)" : "none" }} />
              ))}
            </div>
          </div>

          {/* Card 2 — Stats, middle layer */}
          <div
            ref={el => cardsRef.current[1] = el}
            className="absolute top-[40%] right-[33%] w-[225px] h-[185px] transition-transform duration-[100ms] ease-out z-20 flex flex-col justify-between"
            style={{
              transformStyle: "preserve-3d",
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div>
              <p
                className="text-[0.579rem] uppercase tracking-widest mb-1"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Poppins', sans-serif" }}
              >
                Impact
              </p>
              <h3
                className="text-[1.3rem] font-bold leading-tight"
                style={{ color: "#F5F5F5", fontFamily: "'Poppins', sans-serif" }}
              >
                12 Products<br />Designed
              </h3>
            </div>
            {/* Mini grayscale bar chart */}
            <div className="flex gap-1.5 items-end h-12">
              {[40, 70, 30, 85, 55, 95, 65, 50].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: i === 5
                      ? "rgba(255,255,255,0.7)"
                      : `rgba(255,255,255,${0.15 + (h / 100) * 0.25})`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Card 1 — Wireframe mockup, front layer */}
          <div
            ref={el => cardsRef.current[2] = el}
            className="absolute top-[6%] right-[44%] w-[245px] h-[260px] transition-transform duration-[80ms] ease-out z-30"
            style={{
              transformStyle: "preserve-3d",
              background: "#FAFAFA",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.04)",
            }}
          >
            {/* Mac dots */}
            <div className="flex items-center gap-1.5 mb-5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#D0D0D0" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#E0E0E0" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EBEBEB" }} />
            </div>
            {/* Wireframe skeleton */}
            <div className="space-y-3">
              <div
                className="w-full h-[90px] rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #F0F0F0, #E8E8E8)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.08)" }}
                >
                  <div className="w-4 h-4 rounded-sm" style={{ background: "rgba(0,0,0,0.2)" }} />
                </div>
              </div>
              <div className="w-4/5 h-2 rounded-full" style={{ background: "#E8E8E8" }} />
              <div className="w-3/5 h-2 rounded-full" style={{ background: "#EEEEEE" }} />
              <div className="flex gap-2 mt-4">
                <div
                  className="flex-1 h-7 rounded-full"
                  style={{ background: "#1A1A1A" }}
                />
                <div
                  className="flex-1 h-7 rounded-full"
                  style={{ background: "#EDEDED", border: "1px solid rgba(0,0,0,0.08)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[0.579rem] uppercase tracking-[0.2em]"
          style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'Raleway', sans-serif" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)" }}
        />
      </div>
    </section>
  );
}
