import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const EXPERIENCES = [
  {
    id: 1,
    role: "UI/UX Designer",
    company: "Exclusive Digitals",
    period: "2021 — 2023",
    description:
      "Crafted end-to-end digital experiences across web and mobile products. Led design from discovery through delivery — wireframes, prototypes, and pixel-perfect handoffs.",
    tags: ["Figma", "User Research", "Prototyping", "Mobile Design"],
    side: "left" as const,
  },
  {
    id: 2,
    role: "UX Team Lead",
    company: "Wired Hub",
    period: "2023 — Present",
    description:
      "Leading a cross-functional design team, shaping design culture and systems. Partnering with product and engineering to ship human-centered solutions at scale.",
    tags: ["Design Systems", "Team Leadership", "Strategy", "Accessibility"],
    side: "right" as const,
  },
];

export function WorkExperience() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const sectionBg   = isDark ? "#111111" : "#FAFAFA";
  const lineColor   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const dotBg       = isDark ? "#F5F5F5" : "#0D0D0D";
  const dotRing     = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const eyebrowClr  = isDark ? "rgba(255,255,255,0.3)" : "#AAAAAA";
  const titleClr    = isDark ? "#F5F5F5" : "#0D0D0D";
  const cardBg      = isDark ? "#1A1A1A" : "#FFFFFF";
  const cardBorder  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const cardShadow  = isDark
    ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
    : "0 8px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)";
  const roleClr     = isDark ? "#F5F5F5" : "#0D0D0D";
  const companyClr  = isDark ? "rgba(255,255,255,0.4)" : "#AAAAAA";
  const periodClr   = isDark ? "rgba(255,255,255,0.25)" : "#CCCCCC";
  const descClr     = isDark ? "rgba(255,255,255,0.5)" : "#666666";
  const tagBg       = isDark ? "rgba(255,255,255,0.06)" : "#F2F2F2";
  const tagBorder   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const tagClr      = isDark ? "rgba(255,255,255,0.4)" : "#777777";
  const dividerClr  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  return (
    <div
      className="relative transition-colors duration-500"
      style={{
        height: "100vh",
        background: sectionBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 clamp(20px, 5vw, 80px)",
      }}
    >
      {/* Silk fabric fold overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,255,255,0.018) 0%, transparent 70%)," +
              "radial-gradient(ellipse 50% 60% at 20% 80%, rgba(255,255,255,0.01) 0%, transparent 65%)"
            : "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(0,0,0,0.015) 0%, transparent 70%)," +
              "radial-gradient(ellipse 50% 60% at 20% 80%, rgba(0,0,0,0.01) 0%, transparent 65%)",
        }}
      />

      {/* ── HEADER ── */}
      <div style={{ marginBottom: "clamp(24px, 4vh, 48px)", position: "relative", zIndex: 1 }}>
        <div className="flex items-center gap-2 mb-3">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: dotBg, flexShrink: 0, opacity: 0.5 }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: eyebrowClr,
          }}>
            Career Journey
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          fontWeight: 800, letterSpacing: "-0.02em",
          color: titleClr, margin: 0,
        }}>
          My Journey
        </h2>
      </div>

      {/* ── VERTICAL TIMELINE ── */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>

        {/* Center vertical line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0, bottom: 0,
            width: 1,
            transform: "translateX(-50%)",
            background: `linear-gradient(to bottom, transparent 0%, ${lineColor} 15%, ${lineColor} 85%, transparent 100%)`,
          }}
        />

        {/* Checkpoints */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 4vh, 48px)" }}>
          {EXPERIENCES.map((exp) => {
            const isLeft = exp.side === "left";

            return (
              <div
                key={exp.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 60px 1fr",
                  alignItems: "center",
                  gap: 0,
                }}
              >
                {/* LEFT SIDE */}
                {isLeft ? (
                  /* Card on left */
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingRight: 28,
                    }}
                  >
                    <JourneyCard
                      exp={exp}
                      align="right"
                      cardBg={cardBg}
                      cardBorder={cardBorder}
                      cardShadow={cardShadow}
                      roleClr={roleClr}
                      companyClr={companyClr}
                      descClr={descClr}
                      tagBg={tagBg}
                      tagBorder={tagBorder}
                      tagClr={tagClr}
                      dividerClr={dividerClr}
                      isDark={isDark}
                    />
                  </div>
                ) : (
                  /* Period label on left */
                  <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 28 }}>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.7rem", fontWeight: 700,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: periodClr,
                    }}>
                      {exp.period}
                    </span>
                  </div>
                )}

                {/* CENTER: dot on line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  {/* Checkpoint dot */}
                  <div style={{
                    width: 14, height: 14,
                    borderRadius: "50%",
                    background: dotBg,
                    boxShadow: `0 0 0 4px ${isDark ? "#111111" : "#FAFAFA"}, 0 0 0 6px ${dotRing}`,
                    flexShrink: 0,
                  }} />
                  {/* Step label */}
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.52rem", fontWeight: 700,
                    color: eyebrowClr,
                    letterSpacing: "0.05em",
                    marginTop: 2,
                  }}>
                    0{exp.id}
                  </span>
                </div>

                {/* RIGHT SIDE */}
                {!isLeft ? (
                  /* Card on right */
                  <div style={{ paddingLeft: 28 }}>
                    <JourneyCard
                      exp={exp}
                      align="left"
                      cardBg={cardBg}
                      cardBorder={cardBorder}
                      cardShadow={cardShadow}
                      roleClr={roleClr}
                      companyClr={companyClr}
                      descClr={descClr}
                      tagBg={tagBg}
                      tagBorder={tagBorder}
                      tagClr={tagClr}
                      dividerClr={dividerClr}
                      isDark={isDark}
                    />
                  </div>
                ) : (
                  /* Period label on right */
                  <div style={{ paddingLeft: 28 }}>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.7rem", fontWeight: 700,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      color: periodClr,
                    }}>
                      {exp.period}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* End of journey dot */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
          }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.52rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: eyebrowClr,
          }}>
            Growing
          </span>
        </div>
      </div>
    </div>
  );
}

interface JourneyCardProps {
  exp: typeof EXPERIENCES[0];
  align: "left" | "right";
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  roleClr: string;
  companyClr: string;
  descClr: string;
  tagBg: string;
  tagBorder: string;
  tagClr: string;
  dividerClr: string;
  isDark: boolean;
}

function JourneyCard({ exp, align, cardBg, cardBorder, cardShadow, roleClr, companyClr, descClr, tagBg, tagBorder, tagClr, dividerClr }: JourneyCardProps) {
  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: 16,
        padding: "clamp(16px, 2vh, 24px) 22px",
        boxShadow: cardShadow,
        maxWidth: 380,
        width: "100%",
        textAlign: align === "right" ? "right" : "left",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Role */}
      <h3 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
        fontWeight: 700, lineHeight: 1.2,
        color: roleClr, margin: "0 0 4px",
      }}>
        {exp.role}
      </h3>

      {/* Company */}
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: "0.82rem", fontWeight: 700,
        color: companyClr, margin: "0 0 14px",
        letterSpacing: "0.02em",
      }}>
        {exp.company}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: dividerClr, marginBottom: 14 }} />

      {/* Description */}
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: "0.82rem", lineHeight: 1.65,
        color: descClr, margin: "0 0 14px",
      }}>
        {exp.description}
      </p>

      {/* Tags */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6,
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}>
        {exp.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.07em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 100,
            background: tagBg,
            border: `1px solid ${tagBorder}`,
            color: tagClr,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
