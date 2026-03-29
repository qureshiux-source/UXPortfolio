import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const sys = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : sys;
}

type FilterKey = "all" | "case-study" | "project";

interface Work {
  id: string;
  type: "case-study" | "project";
  tag: string;
  year: string;
  title: string;
  description: string;
  skills?: string[];
  award?: string;
  nda?: boolean;
  link?: string;
  featured?: boolean;
}

const WORK: Work[] = [
  {
    id: "dubai-dunes",
    type: "case-study",
    tag: "Real Estate UX",
    year: "2026",
    title: "Dubai Dunes: Engineering Trust",
    description: "Redesigned a visually underperforming real estate platform into a high-authority luxury interface — repositioning the founder as the central trust signal for high-net-worth buyers.",
    skills: ["Research", "Visual Direction", "Design System", "Hi-Fi Mockups", "Figma"],
    link: "/case-study/dubai-dunes",
    featured: true,
  },
  {
    id: "exclusive-streaming",
    type: "case-study",
    tag: "Product Design",
    year: "2025",
    title: "Exclusive Streaming Platform",
    description: "Sole product designer for a complete streaming ecosystem — designed all screens end-to-end including homepage, dashboard, and full user flows with a scalable design system.",
    skills: ["Product Design", "Design System", "Dev Handoff", "Figma"],
    nda: true,
    featured: true,
  },
  {
    id: "nsw-mobile",
    type: "project",
    tag: "Mobile",
    year: "2024",
    title: "NSW Mobile App Redesign",
    description: "Rebuilt from scratch with a scalable design system, smooth flows, and a full working prototype delivered for development handoff.",
    skills: ["Mobile UX", "Prototype", "Design System"],
    nda: true,
  },
  {
    id: "verified-tenants",
    type: "project",
    tag: "Web App",
    year: "2024",
    title: "Verified by Tenants",
    description: "Improved information architecture, readability, and WCAG accessibility across the platform while preserving brand identity.",
    skills: ["IA", "Accessibility", "UI Redesign"],
    nda: true,
  },
  {
    id: "codex",
    type: "project",
    tag: "Game Design",
    year: "2023",
    title: "Codex — Winter Game Jam",
    description: "Designed and co-developed a complete game from concept to launch in 48 hours. Led all UI/UX, concept, and game design decisions.",
    skills: ["Game UX", "Concept Design", "Rapid Prototype"],
    award: "Best Project · SIBAU 2023",
  },
  {
    id: "ai-saas",
    type: "project",
    tag: "AI / SaaS",
    year: "2024",
    title: "AI SaaS Platform UX",
    description: "End-to-end UX design for an AI-powered SaaS dashboard — complex data visualisation, onboarding flows, and a component library built for scale.",
    skills: ["SaaS UX", "Data Viz", "Component Library"],
    nda: true,
  },
  {
    id: "aml",
    type: "project",
    tag: "Gov · FinTech",
    year: "2023",
    title: "AML Government System",
    description: "UX redesign of an anti-money laundering compliance tool for a government-adjacent client — complex workflows simplified into a clear, auditable interface.",
    skills: ["Compliance UX", "Workflow Design", "Enterprise"],
    nda: true,
  },
  {
    id: "ubiox",
    type: "project",
    tag: "Branding",
    year: "2023",
    title: "UBIOX Brand & Landing Page",
    description: "Full brand identity from scratch — logo, design language, and a launch-ready landing page that drove initial investor interest.",
    skills: ["Brand Identity", "Landing Page", "Visual Design"],
  },
];

export default function Projects() {
  const isDark = useDark();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [, navigate] = useLocation();

  const bg      = isDark ? "#030303" : "#FAFAFA";
  const bgCard  = isDark ? "#060606" : "#FFFFFF";
  const heading = isDark ? "#F0F0F0" : "#080808";
  const body    = isDark ? "#555555" : "#707070";
  const muted   = isDark ? "#404040" : "#999999";
  const eyebrow = isDark ? "#484848" : "#888888";
  const green   = isDark ? "#5EFF80" : "#1A7A32";
  const greenBg = isDark ? "rgba(94,255,128,0.07)"  : "rgba(26,122,50,0.06)";
  const greenBdr= isDark ? "rgba(94,255,128,0.2)"   : "rgba(26,122,50,0.18)";
  const divider = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  const cardBgRest = isDark ? "rgba(255,255,255,0.022)" : "rgba(0,0,0,0.018)";
  const cardBgHov  = isDark ? "rgba(255,255,255,0.048)" : "rgba(0,0,0,0.034)";
  const cardBdrRst = isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.065)";
  const cardBdrHov = isDark ? "rgba(255,255,255,0.14)"  : "rgba(0,0,0,0.11)";

  const chipBg  = isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.042)";
  const chipTxt = isDark ? "#555555" : "#888888";
  const linkRst = isDark ? "#383838" : "#B8B8B8";

  const goldBg  = isDark ? "rgba(255,213,79,0.09)"  : "rgba(180,130,0,0.08)";
  const goldBdr = isDark ? "rgba(255,213,79,0.22)"  : "rgba(180,130,0,0.2)";
  const goldClr = isDark ? "#C8A840"                : "#896400";

  const filtered = filter === "all"
    ? WORK
    : WORK.filter(w => w.type === filter);

  const caseStudies  = filtered.filter(w => w.type === "case-study");
  const projects     = filtered.filter(w => w.type === "project");

  const FILTERS: { key: FilterKey; label: string; count: number }[] = [
    { key: "all",        label: "All Work",    count: WORK.length },
    { key: "case-study", label: "Case Studies", count: WORK.filter(w => w.type === "case-study").length },
    { key: "project",    label: "Projects",     count: WORK.filter(w => w.type === "project").length },
  ];

  return (
    <div style={{ minHeight: "100vh", background: bg, transition: "background 0.4s" }}>
      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: NOISE, backgroundSize: "180px 180px",
        opacity: isDark ? 0.05 : 0.08,
        mixBlendMode: (isDark ? "overlay" : "multiply") as React.CSSProperties["mixBlendMode"],
      }} />

      <Navbar />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Page Hero ── */}
        <div style={{
          maxWidth: 1040, margin: "0 auto",
          padding: "clamp(88px, 14vh, 120px) clamp(28px, 5vw, 64px) 0",
        }}>
          {/* Back link */}
          <button
            onClick={() => navigate("/")}
            style={{
              all: "unset", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: muted,
              marginBottom: "clamp(28px, 4vh, 44px)",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = heading; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = muted; }}
          >
            <ArrowLeft size={12} />
            Back to Home
          </button>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: "0.5px", background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.54rem", fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: eyebrow,
            }}>Selected Work</span>
          </div>

          {/* Title + stats */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: "clamp(32px, 5vh, 52px)" }}>
            <div>
              <h1 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
                fontWeight: 800, lineHeight: 1,
                letterSpacing: "-0.045em",
                color: heading, margin: "0 0 12px",
              }}>
                Work &{" "}
                <span style={{ color: green }}>Projects</span>
              </h1>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
                lineHeight: 1.7, fontWeight: 500,
                color: body, margin: 0, maxWidth: 480,
              }}>
                A curated collection of UI/UX work — from deep-dive case studies
                to focused product executions across SaaS, mobile, brand, and beyond.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 28, flexShrink: 0 }}>
              {[
                { n: WORK.filter(w => w.type === "case-study").length, label: "Case Studies" },
                { n: WORK.filter(w => w.type === "project").length,    label: "Projects" },
                { n: new Date().getFullYear() - 2021,                  label: "Yrs Exp." },
              ].map(({ n, label }) => (
                <div key={label} style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                    fontWeight: 800, letterSpacing: "-0.04em",
                    color: heading, lineHeight: 1,
                  }}>{n}+</div>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.52rem", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: muted, marginTop: 4,
                  }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Filter tabs ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            marginBottom: "clamp(32px, 5vh, 52px)",
            borderBottom: `1px solid ${divider}`,
            paddingBottom: 0,
          }}>
            {FILTERS.map(({ key, label, count }) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    all: "unset", cursor: "pointer",
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.7rem", fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: active ? heading : muted,
                    padding: "10px 16px",
                    position: "relative",
                    transition: "color 0.22s",
                    display: "flex", alignItems: "center", gap: 7,
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = body; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = muted; }}
                >
                  {label}
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.48rem", fontWeight: 700,
                    color: active ? green : muted,
                    transition: "color 0.22s",
                  }}>{count}</span>
                  {active && (
                    <motion.div
                      layoutId="filter-underline"
                      style={{
                        position: "absolute", bottom: -1, left: 0, right: 0,
                        height: 2, background: green, borderRadius: 2,
                      }}
                      transition={{ duration: 0.28, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{
          maxWidth: 1040, margin: "0 auto",
          padding: "0 clamp(28px, 5vw, 64px) clamp(80px, 12vh, 120px)",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
            >

              {/* ── Case Studies ── */}
              {caseStudies.length > 0 && (
                <div style={{ marginBottom: projects.length > 0 ? "clamp(48px, 7vh, 72px)" : 0 }}>
                  {filter === "all" && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.52rem", fontWeight: 700,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: eyebrow,
                      }}>Case Studies</span>
                      <div style={{ flex: 1, height: "0.5px", background: divider }} />
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.8vh, 18px)" }}>
                    {caseStudies.map((item, i) => (
                      <CaseStudyCard
                        key={item.id}
                        item={item}
                        isDark={isDark}
                        index={i}
                        tokens={{ cardBgRest, cardBgHov, cardBdrRst, cardBdrHov, chipBg, chipTxt, linkRst, green, heading: heading, body: body, divider, goldBg, goldBdr, goldClr }}
                        onNavigate={navigate}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Projects bento grid ── */}
              {projects.length > 0 && (
                <div>
                  {filter === "all" && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.52rem", fontWeight: 700,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: eyebrow,
                      }}>Projects</span>
                      <div style={{ flex: 1, height: "0.5px", background: divider }} />
                    </div>
                  )}

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "clamp(10px, 1.4vw, 14px)",
                  }}>
                    {projects.map((item, i) => (
                      <ProjectCard
                        key={item.id}
                        item={item}
                        isDark={isDark}
                        index={i}
                        tokens={{ cardBgRest, cardBgHov, cardBdrRst, cardBdrHov, chipBg, chipTxt, linkRst, green, heading: heading, body: body, divider, goldBg, goldBdr, goldClr, greenBg, greenBdr }}
                        onNavigate={navigate}
                        colSpan={item.id === "ubiox" ? 3 : undefined}
                      />
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{
          borderTop: `1px solid ${divider}`,
          padding: "clamp(40px, 6vh, 60px) clamp(28px, 5vw, 64px)",
        }}>
          <div style={{
            maxWidth: 1040, margin: "0 auto",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 20,
          }}>
            <div>
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(0.96rem, 1.6vw, 1.18rem)",
                fontWeight: 700, color: heading,
                margin: "0 0 6px", letterSpacing: "-0.01em",
              }}>Want to work together?</p>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.76rem", fontWeight: 500,
                color: body, margin: 0,
              }}>Open for full-time roles, freelance, and collaborations.</p>
            </div>
            <a
              href="mailto:qureshi.ux@gmail.com"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.8rem", fontWeight: 700,
                letterSpacing: "0.01em",
                padding: "12px 24px",
                borderRadius: 100,
                background: greenBg,
                border: `1px solid ${greenBdr}`,
                color: green,
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: 7,
                transition: "background 0.25s, border-color 0.25s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(94,255,128,0.14)" : "rgba(26,122,50,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = greenBg;
              }}
            >
              qureshi.ux@gmail.com
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Case Study Card ── */
interface Tokens {
  cardBgRest: string; cardBgHov: string;
  cardBdrRst: string; cardBdrHov: string;
  chipBg: string; chipTxt: string;
  linkRst: string; green: string;
  heading: string; body: string;
  divider: string;
  goldBg: string; goldBdr: string; goldClr: string;
  greenBg?: string; greenBdr?: string;
}

function CaseStudyCard({ item, isDark, index, tokens: t, onNavigate }: {
  item: Work; isDark: boolean; index: number;
  tokens: Tokens;
  onNavigate: (path: string) => void;
}) {
  const [hov, setHov] = useState(false);
  const canNav = !!item.link && !item.nda;

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => canNav && onNavigate(item.link!)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.06 }}
      style={{
        background: hov ? t.cardBgHov : t.cardBgRest,
        border: `1px solid ${hov ? t.cardBdrHov : t.cardBdrRst}`,
        borderRadius: 12,
        padding: "clamp(24px, 3.2vh, 36px) clamp(24px, 3.2vw, 38px)",
        cursor: canNav ? "pointer" : "default",
        transition: "background 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
        transform: hov ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Top row: tag + year + NDA badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.5rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: 4,
            background: t.chipBg, color: t.chipTxt,
          }}>{item.tag}</span>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.58rem", fontWeight: 600,
            color: isDark ? "#303030" : "#C4C4C4",
          }}>{item.year}</span>
        </div>
        {item.nda && (
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.44rem", fontWeight: 800,
            letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "2px 7px", borderRadius: 3,
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            color: isDark ? "#3A3A3A" : "#AAAAAA",
          }}>NDA</span>
        )}
      </div>

      {/* Title + description row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.18rem, 2vw, 1.6rem)",
            fontWeight: 800, letterSpacing: "-0.02em",
            color: t.heading, margin: "0 0 10px", lineHeight: 1.18,
          }}>{item.title}</h2>
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)",
            lineHeight: 1.7, fontWeight: 500,
            color: t.body, margin: 0,
            maxWidth: 580,
          }}>{item.description}</p>
        </div>

        {/* Action */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "flex-end", justifyContent: "flex-start",
          flexShrink: 0, gap: 4, paddingTop: 4,
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            opacity: canNav ? 1 : 0.35,
          }}>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.56rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: hov && canNav ? t.green : t.linkRst,
              transition: "color 0.3s",
            }}>{canNav ? "View Case Study" : "NDA · Restricted"}</span>
            <ArrowUpRight size={11} style={{ color: hov && canNav ? t.green : t.linkRst, transition: "color 0.3s" }} />
          </div>
        </div>
      </div>

      {/* Skills row */}
      {item.skills && (
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: 10,
          paddingTop: 14,
          borderTop: `0.5px solid ${t.divider}`,
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {item.skills.map(s => (
              <span key={s} style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.48rem", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "2px 8px", borderRadius: 3,
                background: t.chipBg, color: t.chipTxt,
              }}>{s}</span>
            ))}
          </div>
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.52rem", fontWeight: 600,
            color: isDark ? "#2C2C2C" : "#D0D0D0",
            letterSpacing: "0.04em",
          }}>Deep-dive exploration</span>
        </div>
      )}
    </motion.div>
  );
}

/* ── Project Bento Card ── */
function ProjectCard({ item, isDark, index, tokens: t, onNavigate, colSpan }: {
  item: Work; isDark: boolean; index: number;
  tokens: Tokens;
  onNavigate: (path: string) => void;
  colSpan?: number;
}) {
  const [hov, setHov] = useState(false);
  const canNav = !!item.link && !item.nda;

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => canNav && onNavigate(item.link!)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE, delay: index * 0.055 }}
      style={{
        gridColumn: colSpan ? `span ${colSpan}` : "span 1",
        background: hov ? t.cardBgHov : t.cardBgRest,
        border: `1px solid ${hov ? t.cardBdrHov : t.cardBdrRst}`,
        borderRadius: 10,
        padding: "clamp(18px, 2.4vh, 26px) clamp(16px, 2vw, 22px)",
        cursor: canNav ? "pointer" : "default",
        display: "flex", flexDirection: colSpan ? "row" : "column",
        alignItems: colSpan ? "center" : undefined,
        gap: colSpan ? 32 : 10,
        transition: "background 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
        transform: hov ? "translateY(-2px)" : "none",
        position: "relative",
      }}
    >
      {/* Award badge */}
      {item.award && (
        <div style={{
          position: "absolute", top: 12, right: 14,
          background: t.goldBg, border: `1px solid ${t.goldBdr}`,
          color: t.goldClr,
          padding: "2px 8px", borderRadius: 3,
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.4rem", fontWeight: 800,
          letterSpacing: "0.14em", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>{item.award}</div>
      )}

      {colSpan ? (
        /* Wide layout (UBIOX) */
        <>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.44rem", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: t.chipTxt,
              }}>{item.tag}</span>
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.5rem", fontWeight: 600,
                color: isDark ? "#303030" : "#C4C4C4",
              }}>{item.year}</span>
            </div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              fontWeight: 700, letterSpacing: "-0.012em",
              color: t.heading, margin: "0 0 8px", lineHeight: 1.25,
            }}>{item.title}</h3>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.66rem, 0.9vw, 0.76rem)",
              lineHeight: 1.65, color: t.body, margin: 0, fontWeight: 500,
            }}>{item.description}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, flexShrink: 0, maxWidth: 200 }}>
            {item.skills?.map(s => (
              <span key={s} style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.44rem", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "2px 7px", borderRadius: 3,
                background: t.chipBg, color: t.chipTxt,
              }}>{s}</span>
            ))}
          </div>
          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.5rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: hov && canNav ? t.green : t.linkRst,
              transition: "color 0.3s",
              opacity: canNav ? 1 : 0.35,
            }}>{canNav ? "View Project" : "NDA"}</span>
            <ArrowUpRight size={10} style={{
              color: hov && canNav ? t.green : t.linkRst,
              transition: "color 0.3s", opacity: canNav ? 1 : 0.35,
            }} />
          </div>
        </>
      ) : (
        /* Standard card layout */
        <>
          {/* Tag + year */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.44rem", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: hov ? (isDark ? "#888888" : "#505050") : t.chipTxt,
              transition: "color 0.3s",
            }}>{item.tag}</span>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.5rem", fontWeight: 600,
              color: isDark ? "#303030" : "#C4C4C4",
            }}>{item.year}</span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.84rem, 1.14vw, 0.98rem)",
            fontWeight: 700, letterSpacing: "-0.012em",
            color: t.heading, margin: 0, lineHeight: 1.28, flex: "0 0 auto",
          }}>{item.title}</h3>

          {/* Description */}
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "clamp(0.64rem, 0.88vw, 0.72rem)",
            lineHeight: 1.65, color: t.body, margin: 0, flex: 1, fontWeight: 500,
          }}>{item.description}</p>

          {/* Skills */}
          {item.skills && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {item.skills.map(s => (
                <span key={s} style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.42rem", fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: "2px 6px", borderRadius: 3,
                  background: t.chipBg, color: t.chipTxt,
                }}>{s}</span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 8,
            borderTop: `0.5px solid ${t.divider}`,
            marginTop: 2,
          }}>
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.44rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: hov && canNav ? t.green : t.linkRst,
              transition: "color 0.3s",
              opacity: canNav ? 1 : 0.35,
            }}>{canNav ? "View Project" : "NDA"}</span>
            <ArrowUpRight size={10} style={{
              color: hov && canNav ? t.green : t.linkRst,
              transition: "color 0.3s", opacity: canNav ? 1 : 0.35,
            }} />
          </div>
        </>
      )}
    </motion.div>
  );
}
