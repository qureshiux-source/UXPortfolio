import { useEffect, useRef } from "react";
import { MoveRight, MessageCircle } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const { innerWidth, innerHeight } = window;
      const xPos = (mouseRef.current.x / innerWidth - 0.5) * 2;
      const yPos = (mouseRef.current.y / innerHeight - 0.5) * 2;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const depth = (index + 1) * 12;
        const rot = (index + 1) * 1.5;
        card.style.transform = `
          translate(${xPos * depth}px, ${yPos * depth}px)
          rotateX(${yPos * -rot}deg)
          rotateY(${xPos * rot}deg)
        `;
      });

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;
        const depth = (index + 1) * 6;
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
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background blobs */}
      <div className="absolute top-[-15%] right-[-8%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-16 relative z-10">

        {/* LEFT — Text content */}
        <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-7">

          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <span
              className="text-[0.694rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              UX Designer & Product Thinker
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-[2.488rem] md:text-[2.986rem] font-bold leading-[1.15] text-foreground"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Designing{" "}
            <span className="text-gradient">Experiences</span>
            {" "}That Actually{" "}
            <span className="relative inline-block">
              Matter
              <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-secondary/40 rounded-full" />
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-[1rem] text-muted-foreground leading-[1.75] max-w-[540px]"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            I craft human-centered digital products with thoughtful interactions and clear visual hierarchies. From research to high-fidelity pixels — I make complex simple.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap mt-2">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-[0.833rem] font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group">
              View My Work
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary text-[0.833rem] font-semibold hover:bg-primary/6 transition-all duration-300 group">
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Let's Talk
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 pt-4 mt-2 border-t border-border/60">
            {[
              { value: "12+", label: "Products Designed" },
              { value: "6 yrs", label: "Experience" },
              { value: "50+", label: "User Interviews" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span
                  className="text-[1.44rem] font-bold text-foreground leading-none"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {value}
                </span>
                <span className="text-[0.694rem] text-muted-foreground font-medium uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Interactive 3D cards */}
        <div
          className="lg:col-span-5 hidden lg:block relative h-[480px]"
          style={{ perspective: "1000px" }}
        >
          {/* Floating decorative dots */}
          {[
            { top: "8%", left: "15%", size: 10, color: "bg-secondary/60" },
            { top: "72%", left: "80%", size: 7, color: "bg-primary/60" },
            { top: "40%", left: "5%", size: 5, color: "bg-primary/40" },
            { top: "85%", left: "30%", size: 8, color: "bg-secondary/40" },
          ].map((dot, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className={`absolute rounded-full ${dot.color} transition-transform duration-[100ms] ease-out`}
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
              }}
            />
          ))}

          {/* Card 3 — Back: Color swatch */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="absolute top-[16%] right-[5%] w-[200px] h-[150px] card-elevated p-4 transition-transform duration-[120ms] ease-out z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <p className="text-[0.579rem] uppercase tracking-widest text-muted-foreground font-semibold mb-3">Color Palette</p>
            <div className="grid grid-cols-4 gap-2 h-[80px]">
              {[
                "bg-[#5B4FD6]",
                "bg-[#7C72E8]",
                "bg-[#FF6B47]",
                "bg-[#FFD6CC]",
                "bg-[#1A1A1E]",
                "bg-[#F8F7F4]",
                "bg-[#7A7A8C]",
                "bg-[#E8E6FF]",
              ].map((c, i) => (
                <div key={i} className={`${c} rounded-lg`} />
              ))}
            </div>
          </div>

          {/* Card 2 — Middle: Stats card */}
          <div
            ref={el => cardsRef.current[1] = el}
            className="absolute top-[38%] right-[34%] w-[230px] h-[190px] card-elevated p-5 transition-transform duration-[100ms] ease-out z-20 flex flex-col justify-between"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div>
              <p className="text-[0.579rem] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Impact</p>
              <h3
                className="text-[1.44rem] font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                12 Products<br />Designed
              </h3>
            </div>
            {/* Mini bar chart */}
            <div className="flex gap-1.5 items-end h-14">
              {[45, 65, 35, 80, 55, 90, 70, 60].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all ${i === 5 ? "bg-primary" : "bg-secondary/70"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Card 1 — Front: Wireframe mockup */}
          <div
            ref={el => cardsRef.current[2] = el}
            className="absolute top-[8%] right-[44%] w-[250px] h-[270px] card-elevated p-5 transition-transform duration-[80ms] ease-out z-30"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Mac-style dots */}
            <div className="flex items-center gap-1.5 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            {/* Wireframe content */}
            <div className="space-y-3">
              <div className="w-full h-[90px] rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/15 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-primary/60" />
                </div>
              </div>
              <div className="w-4/5 h-2.5 bg-muted rounded-full" />
              <div className="w-3/5 h-2.5 bg-muted rounded-full" />
              <div className="flex gap-2 mt-4">
                <div className="flex-1 h-7 bg-primary/20 rounded-full" />
                <div className="flex-1 h-7 bg-muted rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[0.579rem] uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
