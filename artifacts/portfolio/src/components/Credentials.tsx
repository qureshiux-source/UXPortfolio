import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award } from "lucide-react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CERTS = [
  {
    id: 1,
    title: "UX Design Professional Certificate",
    issuer: "Google",
    date: "2023",
    description: "End-to-end UX design process — research, wireframing, prototyping, and usability testing across real-world projects.",
    url: "#",
  },
  {
    id: 2,
    title: "UX Design Specialization",
    issuer: "Microsoft",
    date: "2022",
    description: "Inclusive design, accessibility standards, and enterprise-scale UX workflows for global product teams.",
    url: "#",
  },
  {
    id: 3,
    title: "UX Research & Strategy",
    issuer: "Interaction Design Foundation",
    date: "2022",
    description: "Mixed-methods research, user strategy frameworks, and evidence-based design decision making.",
    url: "#",
  },
  {
    id: 4,
    title: "Design Psychology",
    issuer: "LinkedIn Learning",
    date: "2021",
    description: "Cognitive load theory, Gestalt principles, and persuasive design systems for scalable UX.",
    url: "#",
  },
  {
    id: 5,
    title: "BCS in Human-Computer Interaction",
    issuer: "Sukkur IBA University",
    date: "2020",
    description: "Academic foundation in HCI, interaction design, computing theory, and research methodology.",
    url: "#",
  },
];

export function Credentials() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const [selected, setSelected] = useState<typeof CERTS[0] | null>(null);

  const bg        = isDark
    ? "linear-gradient(150deg, #101010 0%, #0A0A0A 55%, #0D0D0D 100%)"
    : "linear-gradient(150deg, #F5F5F5 0%, #FAFAFA 55%, #F0F0F0 100%)";
  const eyebrow   = isDark ? "#848484" : "#595959";
  const titleClr  = isDark ? "#FAFAFA" : "#0A0A0A";
  const cardBg    = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)";
  const cardBdr   = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const cardTitle = isDark ? "#EFEFEF" : "#0A0A0A";
  const cardSub   = isDark ? "#9A9A9A" : "#4D4D4D";
  const cardDate  = isDark ? "#6E6E6E" : "#737373";
  const iconBg    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const iconClr   = isDark ? "#9A9A9A" : "#595959";
  const noiseOp   = isDark ? 0.06 : 0.028;
  const overlayBg = isDark ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.6)";
  const modalBg   = isDark ? "#111111" : "#FFFFFF";
  const modalBdr  = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const bodyTxt   = isDark ? "#9A9A9A" : "#4D4D4D";
  const ctaBg     = isDark ? "#FAFAFA" : "#0A0A0A";
  const ctaFg     = isDark ? "#0A0A0A" : "#FAFAFA";
  const closeBg   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";

  return (
    <div
      className="transition-colors duration-500"
      style={{
        height: "100vh",
        background: bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: NOISE_SVG,
        backgroundSize: "160px 160px",
        opacity: noiseOp,
        mixBlendMode: "overlay",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark
          ? "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)"
          : "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.03) 100%)",
      }} />

      <div style={{
        maxWidth: 880,
        width: "100%",
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "clamp(22px, 3.5vh, 40px)",
      }}>
        {/* Header */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrow,
            }}>
              Credentials
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: titleClr, margin: 0,
            }}>
              10+ Certifications
            </h2>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.72rem", fontWeight: 600,
              color: cardSub, letterSpacing: "0.02em",
            }}>
              Click any card to verify
            </span>
          </div>
        </div>

        {/* Certificate Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(10px, 1.5vw, 16px)",
        }}>
          {CERTS.slice(0, 3).map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              idx={i}
              isDark={isDark}
              cardBg={cardBg}
              cardBdr={cardBdr}
              cardTitle={cardTitle}
              cardSub={cardSub}
              cardDate={cardDate}
              iconBg={iconBg}
              iconClr={iconClr}
              onClick={() => setSelected(cert)}
            />
          ))}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(10px, 1.5vw, 16px)",
          maxWidth: "66%",
        }}>
          {CERTS.slice(3).map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              idx={i + 3}
              isDark={isDark}
              cardBg={cardBg}
              cardBdr={cardBdr}
              cardTitle={cardTitle}
              cardSub={cardSub}
              cardDate={cardDate}
              iconBg={iconBg}
              iconClr={iconClr}
              onClick={() => setSelected(cert)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", inset: 0,
                background: overlayBg,
                zIndex: 1000,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 10 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1001,
                background: modalBg,
                border: `1px solid ${modalBdr}`,
                borderRadius: 24,
                padding: "clamp(28px, 4vw, 48px)",
                width: "min(520px, 90vw)",
                boxShadow: isDark
                  ? "0 32px 80px rgba(0,0,0,0.8)"
                  : "0 32px 80px rgba(0,0,0,0.2)",
              }}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute", top: 18, right: 18,
                  width: 32, height: 32, borderRadius: "50%",
                  background: closeBg, border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <X size={14} style={{ color: cardSub }} />
              </button>

              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                border: `1px solid ${modalBdr}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <Award size={22} style={{ color: isDark ? "#FAFAFA" : "#0A0A0A" }} />
              </div>

              {/* Meta */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: cardSub,
                }}>
                  {selected.issuer}
                </span>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: cardDate }} />
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: cardDate,
                }}>
                  {selected.date}
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                fontWeight: 800, letterSpacing: "-0.02em",
                color: titleClr, margin: "0 0 14px",
                lineHeight: 1.2,
              }}>
                {selected.title}
              </h3>

              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.88rem", lineHeight: 1.65,
                color: bodyTxt, margin: "0 0 28px",
                fontWeight: 500,
              }}>
                {selected.description}
              </p>

              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.82rem", fontWeight: 700,
                  letterSpacing: "0.02em",
                  padding: "12px 24px",
                  borderRadius: 100,
                  background: ctaBg,
                  color: ctaFg,
                  textDecoration: "none",
                  boxShadow: isDark
                    ? "0 4px 18px rgba(0,0,0,0.5)"
                    : "0 4px 18px rgba(0,0,0,0.15)",
                }}
              >
                <ExternalLink size={14} />
                Verify Credential
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function CertCard({
  cert, idx, isDark,
  cardBg, cardBdr, cardTitle, cardSub, cardDate, iconBg, iconClr,
  onClick,
}: {
  cert: typeof CERTS[0];
  idx: number;
  isDark: boolean;
  cardBg: string; cardBdr: string; cardTitle: string;
  cardSub: string; cardDate: string; iconBg: string; iconClr: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: idx * 0.06 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg,
        border: `1px solid ${cardBdr}`,
        borderRadius: 16,
        padding: "clamp(14px, 2vh, 20px) clamp(14px, 1.8vw, 20px)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
        backdropFilter: isDark ? "none" : "blur(2px)",
        boxShadow: hovered
          ? isDark ? "0 8px 32px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.1)"
          : isDark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.22s ease, transform 0.22s ease",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      {/* Hover overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          position: "absolute", inset: 0,
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
          pointerEvents: "none",
        }}
      />

      {/* Icon + date */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Award size={15} style={{ color: iconClr }} />
        </div>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.62rem", fontWeight: 600,
          color: cardDate,
        }}>
          {cert.date}
        </span>
      </div>

      {/* Issuer */}
      <span style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: "0.6rem", fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: cardSub,
      }}>
        {cert.issuer}
      </span>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)",
        fontWeight: 700, letterSpacing: "-0.01em",
        color: cardTitle, margin: 0, lineHeight: 1.25,
      }}>
        {cert.title}
      </h3>
    </motion.div>
  );
}
