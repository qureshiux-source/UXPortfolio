import { Briefcase } from "lucide-react";
import { useRef } from "react";

const EXPERIENCES = [
  {
    id: 1,
    role: "Lead Product Designer",
    company: "TechCorp",
    period: "2023 — Present",
    accentClass: "bg-primary",
    accentText: "text-primary",
    accentBg: "bg-primary/10",
    points: [
      "Led end-to-end design for 3 major product launches",
      "Built and maintained design system used by 15 engineers",
    ],
    tags: ["Figma", "Design System", "Research"],
  },
  {
    id: 2,
    role: "Senior UX Designer",
    company: "StartupLabs",
    period: "2021 — 2023",
    accentClass: "bg-secondary",
    accentText: "text-secondary",
    accentBg: "bg-secondary/10",
    points: [
      "Redesigned core onboarding flow, improving activation by 42%",
      "Conducted 50+ user interviews across 3 product lines",
    ],
    tags: ["User Research", "Prototyping", "A/B Testing"],
  },
  {
    id: 3,
    role: "Product Designer",
    company: "DigitalStudio",
    period: "2019 — 2021",
    accentClass: "bg-[#7A7A8C]",
    accentText: "text-[#7A7A8C]",
    accentBg: "bg-[#7A7A8C]/10",
    points: [
      "Designed mobile app used by 500K+ users",
      "Collaborated with PM and engineering in 2-week sprint cycles",
    ],
    tags: ["Mobile Design", "iOS", "Android"],
  },
  {
    id: 4,
    role: "UX Intern",
    company: "InnovateCo",
    period: "2018 — 2019",
    accentClass: "bg-[#FF6B47]",
    accentText: "text-[#FF6B47]",
    accentBg: "bg-[#FF6B47]/10",
    points: [
      "Created wireframes and flows for B2B SaaS product",
      "Assisted in usability testing sessions",
    ],
    tags: ["Wireframing", "Usability Testing"],
  },
];

export function WorkExperience() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <span
            className="text-[0.694rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Career Journey
          </span>
        </div>
        <h2
          className="text-[2.074rem] md:text-[2.488rem] font-bold text-foreground mb-2"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          My Journey
        </h2>
        <p
          className="text-[1rem] text-muted-foreground"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          A timeline of meaningful work and growth
        </p>
      </div>

      {/* Horizontal scrollable timeline */}
      <div
        ref={scrollRef}
        className="relative w-full overflow-x-auto timeline-scroll pb-6"
      >
        <div className="relative px-6 md:px-10" style={{ minWidth: "fit-content" }}>
          {/* Horizontal center line */}
          <div
            className="absolute left-6 right-6 bg-gradient-to-r from-transparent via-border to-transparent hidden md:block"
            style={{ top: "50%", height: "1px", transform: "translateY(-50%)" }}
          />

          {/* Cards row */}
          <div className="flex gap-6 md:gap-8 items-center h-auto md:h-[560px]">
            {EXPERIENCES.map((exp, idx) => {
              const isTop = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className="relative flex-shrink-0 w-[300px]"
                >
                  {/* Timeline connector dot (desktop) */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20"
                    style={{ top: "50%", transform: "translate(-50%, -50%)" }}
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-md shadow-primary/30">
                      <div className="w-full h-full rounded-full bg-card" />
                    </div>
                  </div>

                  {/* Vertical connector line (desktop) */}
                  <div
                    className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-px bg-border z-10 ${isTop ? "bottom-[50%] top-auto" : "top-[50%] bottom-auto"}`}
                    style={{
                      height: "36px",
                    }}
                  />

                  {/* Card positioned above or below line */}
                  <div
                    className={`md:absolute md:left-0 md:right-0 ${isTop ? "md:bottom-[calc(50%+42px)]" : "md:top-[calc(50%+42px)]"}`}
                  >
                    <div
                      className="card-elevated p-6 flex flex-col"
                      style={{ height: "220px" }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${exp.accentClass} shadow-sm shrink-0`}
                        >
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full ${exp.accentBg} ${exp.accentText} text-[0.579rem] font-bold uppercase tracking-wide`}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Role & company */}
                      <h3
                        className="text-[1.1rem] font-semibold text-foreground leading-snug mb-0.5"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-[0.833rem] text-muted-foreground font-semibold mb-3"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {exp.company}
                      </p>

                      {/* Bullet points */}
                      <ul
                        className="text-[0.694rem] text-muted-foreground space-y-1.5 flex-1 mb-3"
                        style={{ fontFamily: "'Raleway', sans-serif" }}
                      >
                        {exp.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/60 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {exp.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[0.579rem] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold uppercase tracking-wide border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll hint on mobile */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-muted-foreground">
        <span className="text-[0.694rem]">Scroll to explore</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
          ))}
        </div>
      </div>
    </section>
  );
}
