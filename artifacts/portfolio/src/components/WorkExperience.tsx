import { Briefcase } from "lucide-react";

const EXPERIENCES = [
  {
    id: 1,
    role: "Lead Product Designer",
    company: "TechCorp",
    period: "2023 — Present",
    shade: { bg: "#0D0D0D", text: "#F5F5F5", badge: "rgba(0,0,0,0.06)", badgeText: "#1A1A1A" },
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
    shade: { bg: "#1A1A1A", text: "#F5F5F5", badge: "rgba(0,0,0,0.08)", badgeText: "#2A2A2A" },
    points: [
      "Redesigned onboarding flow, improving activation by 42%",
      "Conducted 50+ user interviews across 3 product lines",
    ],
    tags: ["User Research", "Prototyping", "A/B Testing"],
  },
  {
    id: 3,
    role: "Product Designer",
    company: "DigitalStudio",
    period: "2019 — 2021",
    shade: { bg: "#3A3A3A", text: "#F5F5F5", badge: "rgba(0,0,0,0.06)", badgeText: "#1A1A1A" },
    points: [
      "Designed mobile app used by 500K+ users",
      "Collaborated with PM & engineering in 2-week sprint cycles",
    ],
    tags: ["Mobile Design", "iOS", "Android"],
  },
  {
    id: 4,
    role: "UX Intern",
    company: "InnovateCo",
    period: "2018 — 2019",
    shade: { bg: "#5A5A5A", text: "#F5F5F5", badge: "rgba(0,0,0,0.05)", badgeText: "#1A1A1A" },
    points: [
      "Created wireframes and flows for B2B SaaS product",
      "Assisted in usability testing sessions",
    ],
    tags: ["Wireframing", "Usability Testing"],
  },
];

export function WorkExperience() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#FAFAFA" }}
    >
      {/* Fabric fold background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 20% 30%, rgba(0,0,0,0.018) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 60% at 80% 70%, rgba(0,0,0,0.012) 0%, transparent 65%)",
        }}
      />

      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12 md:mb-16 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#1A1A1A" }} />
          <span
            className="text-[0.694rem] uppercase tracking-[0.2em] font-semibold"
            style={{ color: "#888888", fontFamily: "'Raleway', sans-serif" }}
          >
            Career Journey
          </span>
        </div>
        <h2
          className="text-[2.074rem] md:text-[2.488rem] font-bold tracking-tight mb-2"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0D0D0D" }}
        >
          My Journey
        </h2>
        <p
          className="text-[1rem]"
          style={{ color: "#888888", fontFamily: "'Raleway', sans-serif" }}
        >
          A timeline of meaningful work and growth
        </p>
      </div>

      {/* Horizontal scrollable timeline */}
      <div className="relative w-full overflow-x-auto timeline-scroll pb-8">
        <div className="relative px-6 md:px-10" style={{ minWidth: "fit-content" }}>

          {/* Center horizontal line */}
          <div
            className="absolute left-10 right-10 hidden md:block"
            style={{
              top: "50%",
              height: "1px",
              transform: "translateY(-50%)",
              background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.12) 15%, rgba(0,0,0,0.12) 85%, transparent)",
            }}
          />

          {/* Cards row */}
          <div className="flex gap-6 md:gap-10 items-center h-auto md:h-[540px]">
            {EXPERIENCES.map((exp, idx) => {
              const isTop = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className="relative flex-shrink-0 w-[300px]"
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:flex absolute left-1/2 z-20 items-center justify-center"
                    style={{
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: "#0D0D0D",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: "#FAFAFA" }} />
                    </div>
                  </div>

                  {/* Connector */}
                  <div
                    className="hidden md:block absolute left-1/2 w-px z-10"
                    style={{
                      ...(isTop
                        ? { bottom: "50%", top: "auto", height: "38px" }
                        : { top: "50%", bottom: "auto", height: "38px" }),
                      transform: "translateX(-50%)",
                      background: "rgba(0,0,0,0.1)",
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`md:absolute md:left-0 md:right-0 ${isTop ? "md:bottom-[calc(50%+44px)]" : "md:top-[calc(50%+44px)]"}`}
                  >
                    <div
                      className="flex flex-col transition-all duration-300 group"
                      style={{
                        height: "220px",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0,0,0,0.06)",
                        borderRadius: "16px",
                        padding: "22px",
                        boxShadow:
                          "0 4px 16px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
                        cursor: "default",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 12px 40px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 4px 16px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)";
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: exp.shade.bg,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                          }}
                        >
                          <Briefcase className="w-4 h-4" style={{ color: exp.shade.text }} />
                        </div>
                        <span
                          className="text-[0.579rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(0,0,0,0.05)",
                            color: "#555555",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Role */}
                      <h3
                        className="font-semibold leading-snug mb-0.5"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: "1.05rem",
                          color: "#0D0D0D",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="font-semibold mb-3"
                        style={{
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: "0.833rem",
                          color: "#888888",
                        }}
                      >
                        {exp.company}
                      </p>

                      {/* Points */}
                      <ul className="flex-1 mb-3 space-y-1.5">
                        {exp.points.map((pt, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5"
                            style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.694rem", color: "#666666" }}
                          >
                            <span
                              className="rounded-full shrink-0 mt-1.5"
                              style={{ width: 4, height: 4, background: "#CCCCCC" }}
                            />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {exp.tags.map(tag => (
                          <span
                            key={tag}
                            className="font-semibold uppercase"
                            style={{
                              fontFamily: "'Raleway', sans-serif",
                              fontSize: "0.579rem",
                              letterSpacing: "0.08em",
                              padding: "3px 10px",
                              borderRadius: "100px",
                              background: "#F2F2F2",
                              border: "1px solid rgba(0,0,0,0.07)",
                              color: "#555555",
                            }}
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
    </section>
  );
}
