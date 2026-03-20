import { Briefcase } from "lucide-react";

const EXPERIENCES = [
  {
    id: 1,
    role: "Lead Product Designer",
    company: "TechCorp",
    period: "2023 — Present",
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
      style={{ background: "#F5F5F5" }}
    >
      {/* Subtle fabric fold overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(0,0,0,0.015) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 55% at 80% 75%, rgba(0,0,0,0.01) 0%, transparent 65%)",
        }}
      />

      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12 md:mb-16 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full" style={{ background: "#1A1A1A" }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.694rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase", color: "#AAAAAA",
          }}>
            Career Journey
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
          fontWeight: 800, letterSpacing: "-0.02em",
          color: "#0D0D0D", margin: "0 0 6px",
        }}>
          My Journey
        </h2>
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: "1rem", color: "#999999", margin: 0,
        }}>
          A timeline of meaningful work and growth
        </p>
      </div>

      {/* Horizontal scrollable card row */}
      <div className="relative w-full overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
        <div
          className="flex items-stretch gap-5 px-6 md:px-10"
          style={{ minWidth: "max-content" }}
        >
          {EXPERIENCES.map((exp, idx) => {
            const isDarkCard = idx === 0;
            return (
              <div
                key={exp.id}
                className="flex flex-col flex-shrink-0 transition-all duration-300"
                style={{
                  width: 280,
                  background: isDarkCard ? "#0D0D0D" : "#FFFFFF",
                  border: isDarkCard
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 20,
                  padding: "24px",
                  boxShadow: isDarkCard
                    ? "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)"
                    : "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = isDarkCard
                    ? "0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)"
                    : "0 16px 48px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = isDarkCard
                    ? "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)"
                    : "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)";
                }}
              >
                {/* Card top: icon + period */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div
                    style={{
                      width: 38, height: 38, borderRadius: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isDarkCard ? "rgba(255,255,255,0.08)" : "#F0F0F0",
                      flexShrink: 0,
                    }}
                  >
                    <Briefcase
                      className="w-4 h-4"
                      style={{ color: isDarkCard ? "rgba(255,255,255,0.7)" : "#555555" }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.58rem", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      padding: "4px 10px", borderRadius: 100,
                      background: isDarkCard ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
                      color: isDarkCard ? "rgba(255,255,255,0.45)" : "#888888",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Role + Company */}
                <h3
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1rem", fontWeight: 700,
                    lineHeight: 1.25, marginBottom: 4,
                    color: isDarkCard ? "#F5F5F5" : "#0D0D0D",
                  }}
                >
                  {exp.role}
                </h3>
                <p
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.82rem", fontWeight: 600,
                    color: isDarkCard ? "rgba(255,255,255,0.35)" : "#AAAAAA",
                    marginBottom: 16,
                  }}
                >
                  {exp.company}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: 1, marginBottom: 16,
                    background: isDarkCard ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                  }}
                />

                {/* Bullet points */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.points.map((pt, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 8,
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.78rem", lineHeight: 1.55,
                        color: isDarkCard ? "rgba(255,255,255,0.55)" : "#666666",
                      }}
                    >
                      <span
                        style={{
                          width: 4, height: 4, borderRadius: "50%",
                          marginTop: 6, flexShrink: 0,
                          background: isDarkCard ? "rgba(255,255,255,0.2)" : "#CCCCCC",
                        }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Tags — always at bottom */}
                <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.6rem", fontWeight: 700,
                        letterSpacing: "0.07em", textTransform: "uppercase",
                        padding: "4px 10px", borderRadius: 100,
                        background: isDarkCard ? "rgba(255,255,255,0.08)" : "#F0F0F0",
                        border: isDarkCard
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "1px solid rgba(0,0,0,0.07)",
                        color: isDarkCard ? "rgba(255,255,255,0.5)" : "#666666",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
