import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function useDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  return mounted ? resolvedTheme === "dark" : system;
}

function NoiseLayer({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: NOISE, backgroundSize: "180px 180px",
      opacity: isDark ? 0.055 : 0.09,
      mixBlendMode: (isDark ? "overlay" : "multiply") as const,
    }} />
  );
}

export default function DubaiDunes() {
  const isDark = useDark();
  const [, navigate] = useLocation();

  const bg     = isDark ? "#030303" : "#FFFFFF";
  const bgAlt  = isDark ? "#060606" : "#FAFAFA";
  const head   = isDark ? "#F5F5F5" : "#080808";
  const body   = isDark ? "#808080" : "#505050";
  const eyebrow = isDark ? "#505050" : "#909090";
  const divider = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)";
  const cardBg  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)";
  const cardBdr = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";

  const secBase: React.CSSProperties = {
    scrollSnapAlign: "start", scrollSnapStop: "always",
    height: "100vh", paddingTop: 64, boxSizing: "border-box",
    display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center",
    position: "relative", overflow: "hidden",
    transition: "background 0.4s",
  };

  const inner: React.CSSProperties = {
    maxWidth: 900, width: "100%",
    padding: "0 clamp(24px, 5vw, 64px)",
    position: "relative", zIndex: 1,
  };

  const label = (n: string): React.CSSProperties => ({
    fontFamily: "'Raleway', sans-serif",
    fontSize: "0.58rem", fontWeight: 700,
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: eyebrow,
  });

  return (
    <div style={{ background: bg }}>
      <Navbar />
      <div style={{
        height: "100vh", overflowY: "scroll", overflowX: "hidden",
        scrollSnapType: "y mandatory", scrollBehavior: "smooth",
      }}>

        {/* ── S1: HERO ──────────────────────────────────── */}
        <section style={{ ...secBase, background: bg }}>
          <NoiseLayer isDark={isDark} />
          <div style={{ ...inner, textAlign: "center", position: "relative", zIndex: 1 }}>

            <button
              onClick={() => navigate("/")}
              style={{
                position: "absolute", top: -36,
                left: "clamp(24px, 5vw, 64px)",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: eyebrow, background: "none", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                padding: 0,
              }}
            >
              <ArrowLeft size={12} /><span>Back to Work</span>
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: eyebrow }} />
              <span style={{ ...label(""), marginBottom: 0 }}>Case Study · Real Estate UX · 2026</span>
              <div style={{ width: 28, height: 1, background: eyebrow }} />
            </div>

            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800, letterSpacing: "-0.03em",
              lineHeight: 1.05, color: head, margin: "0 0 20px",
            }}>
              Dubai Dunes:<br />Engineering Trust
            </h1>

            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              lineHeight: 1.7, color: body, fontWeight: 500,
              maxWidth: 520, margin: "0 auto 36px",
            }}>
              Transforming a visually underperforming real estate platform into a high-authority luxury interface — built to convert high-net-worth clients from the very first impression.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(20px, 4vw, 48px)", flexWrap: "wrap" }}>
              {[
                { label: "Role", value: "Lead UX Designer" },
                { label: "Year", value: "2026" },
                { label: "Type", value: "Solo Project" },
                { label: "Tool", value: "Figma" },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.56rem",
                    fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: eyebrow, marginBottom: 5,
                  }}>{m.label}</div>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.82rem", fontWeight: 600, color: head,
                  }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S2: THE FRICTION ──────────────────────────── */}
        <section style={{ ...secBase, background: bgAlt }}>
          <NoiseLayer isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ marginBottom: "clamp(22px, 3.5vh, 38px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={label("")}>01 — The Friction</span>
              </div>
              <h2 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 800, letterSpacing: "-0.025em",
                color: head, margin: "0 0 10px",
              }}>The Original Disconnect</h2>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
                lineHeight: 1.65, color: body, fontWeight: 500,
                maxWidth: 580, margin: 0,
              }}>
                A luxury brand selling multi-million-dirham properties — presented through a website that communicated neither luxury nor trust.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { n: "01", title: "Weak Visual Hierarchy", desc: "No clear reading flow. Every element competed for attention, leaving visitors with no visual anchor." },
                { n: "02", title: "Generic Layouts", desc: "Template-style designs that failed to differentiate Dubai Dunes from budget property portals." },
                { n: "03", title: "Trust Deficit", desc: "The founder's credibility — a critical conversion factor in HNI real estate — was completely invisible." },
                { n: "04", title: "No Visual Storytelling", desc: "Properties weren't presented aspirationally. Buyers couldn't visualise a lifestyle being sold." },
                { n: "05", title: "Absent CTAs", desc: "No clear next action. High-intent visitors had nowhere to convert or make contact easily." },
                { n: "06", title: "Zero Prestige Signal", desc: "Flat colours and dull imagery communicated the opposite of the exclusivity the brand commands." },
              ].map((item) => (
                <div key={item.n} style={{
                  background: cardBg, border: `1px solid ${cardBdr}`,
                  borderRadius: 10, padding: "clamp(14px, 1.8vh, 20px) clamp(14px, 1.8vw, 20px)",
                }}>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "0.58rem",
                    fontWeight: 700, letterSpacing: "0.1em", color: eyebrow, marginBottom: 7,
                  }}>{item.n}</div>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
                    fontWeight: 700, letterSpacing: "-0.01em",
                    color: head, marginBottom: 5,
                  }}>{item.title}</div>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.73rem", lineHeight: 1.6,
                    color: body, fontWeight: 500,
                  }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── S3: THE SIGNAL ────────────────────────────── */}
        <section style={{ ...secBase, background: bg }}>
          <NoiseLayer isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1.15fr",
              gap: "clamp(32px, 5vw, 72px)", alignItems: "center",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={label("")}>02 — The Signal</span>
                </div>
                <h2 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                  fontWeight: 800, letterSpacing: "-0.025em",
                  color: head, margin: "0 0 14px",
                }}>Global Luxury Benchmarking</h2>
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)",
                  lineHeight: 1.72, color: body, fontWeight: 500,
                  margin: "0 0 22px",
                }}>
                  I analysed luxury real estate brands across Dubai and international markets — studying how established names convert high-net-worth clients through design alone, using mood boards and direct competitor teardowns.
                </p>
                <div style={{
                  padding: "16px 20px",
                  borderLeft: `2px solid ${divider}`,
                  background: cardBg,
                }}>
                  <p style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.84rem", lineHeight: 1.65,
                    color: body, fontWeight: 500, margin: 0,
                    fontStyle: "italic",
                  }}>
                    "Luxury doesn't succeed through visual noise. It wins through{" "}
                    <strong style={{ color: head, fontWeight: 700, fontStyle: "normal" }}>
                      restraint and clarity
                    </strong>{" "}
                    — making the user feel the brand before they read a single word."
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Competitor Sites Analyzed", value: "12+" },
                  { label: "Core Insight", value: "Restraint = Prestige" },
                  { label: "Target Audience", value: "HNI Buyers & Investors" },
                  { label: "Markets Studied", value: "Dubai · London · Monaco" },
                  { label: "Pain Points Mapped", value: "4 Critical Gaps" },
                ].map((s) => (
                  <div key={s.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "13px 18px",
                    background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 10,
                  }}>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.76rem", fontWeight: 600, color: body,
                    }}>{s.label}</span>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.78rem", fontWeight: 700, color: head,
                    }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── S4: THE BLUEPRINT ─────────────────────────── */}
        <section style={{ ...secBase, background: bgAlt }}>
          <NoiseLayer isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{ marginBottom: "clamp(18px, 2.5vh, 28px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={label("")}>03 — The Blueprint</span>
              </div>
              <h2 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                fontWeight: 800, letterSpacing: "-0.025em",
                color: head, margin: 0,
              }}>High-Contrast Property UI</h2>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "1.6fr 1fr",
              gap: 12, height: "clamp(220px, 30vh, 300px)",
            }}>
              {/* Hero listing card */}
              <div style={{
                background: "#080808",
                border: "1px solid rgba(245,245,245,0.1)",
                borderRadius: 10,
                padding: "clamp(18px, 2.5vh, 26px)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.04,
                  backgroundImage: "repeating-linear-gradient(45deg, #F5F5F5 0px, transparent 1px, transparent 22px, #F5F5F5 23px)",
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: "0.55rem",
                    fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "rgba(245,245,245,0.4)", marginBottom: 10,
                  }}>FEATURED VILLA · DUBAI HILLS</div>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                    fontWeight: 800, letterSpacing: "-0.025em",
                    color: "#F5F5F5", lineHeight: 1.15,
                  }}>Skyline Estate<br />5BR · Private Pool</div>
                </div>
                <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{
                      fontFamily: "'Raleway', sans-serif", fontSize: "0.54rem",
                      fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "rgba(245,245,245,0.35)", marginBottom: 4,
                    }}>ASKING PRICE</div>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
                      fontWeight: 800, color: "#F5F5F5",
                    }}>AED 12.5M</div>
                  </div>
                  <div style={{
                    width: 34, height: 34, borderRadius: 0,
                    border: "1px solid rgba(245,245,245,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ArrowUpRight size={13} color="#F5F5F5" />
                  </div>
                </div>
              </div>

              {/* Two mini cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { type: "PREMIUM APT", name: "Palm Residences", spec: "3BR · Sea View", price: "AED 4.2M" },
                  { type: "PENTHOUSE", name: "Downtown Crown", spec: "4BR · Full Burj View", price: "AED 8.9M" },
                ].map((card) => (
                  <div key={card.name} style={{
                    flex: 1,
                    background: "#080808",
                    border: "1px solid rgba(245,245,245,0.09)",
                    borderRadius: 10,
                    padding: "clamp(12px, 1.8vh, 18px) clamp(14px, 1.6vw, 18px)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{
                        fontFamily: "'Raleway', sans-serif", fontSize: "0.5rem",
                        fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "rgba(245,245,245,0.35)", marginBottom: 4,
                      }}>{card.type}</div>
                      <div style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.78rem", fontWeight: 700,
                        color: "#F5F5F5", marginBottom: 2,
                      }}>{card.name}</div>
                      <div style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.63rem", color: "rgba(245,245,245,0.4)", fontWeight: 500,
                      }}>{card.spec}</div>
                    </div>
                    <div style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.8rem", fontWeight: 700, color: "#F5F5F5",
                    }}>{card.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.72rem", color: eyebrow, fontWeight: 500,
              marginTop: 14, textAlign: "center", letterSpacing: "0.02em",
            }}>
              Dark-first, high-contrast property UI — sharp corners, minimal distractions, maximum prestige
            </p>
          </div>
        </section>

        {/* ── S5: THE STRATEGY ──────────────────────────── */}
        <section style={{ ...secBase, background: bg }}>
          <NoiseLayer isDark={isDark} />
          <div style={{ ...inner, position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "clamp(24px, 3.5vh, 40px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
                <span style={label("")}>04 — The Strategy</span>
              </div>
              <h2 style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 800, letterSpacing: "-0.025em",
                color: head, margin: "0 0 12px",
              }}>Positioning Authority</h2>
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
                lineHeight: 1.7, color: body, fontWeight: 500,
                maxWidth: 500, margin: "0 auto",
              }}>
                In luxury real estate, the founder <em>is</em> the product. Buyers aren't just purchasing property — they're buying into expertise, authority, and trust.
              </p>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr auto 1fr",
              gap: 16, alignItems: "center", maxWidth: 680, margin: "0 auto",
            }}>
              <div style={{
                background: cardBg, border: `1px solid ${cardBdr}`,
                borderRadius: 10, padding: "18px 22px",
              }}>
                <div style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: "0.56rem",
                  fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: eyebrow, marginBottom: 12,
                }}>Before</div>
                {["Founder buried in footer", "No credibility signals", "Disconnected brand voice", "Anonymous experience"].map((t) => (
                  <div key={t} style={{
                    display: "flex", alignItems: "center", gap: 7,
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.75rem", color: body, fontWeight: 500, marginBottom: 7,
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: eyebrow, display: "inline-block", flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>

              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.3rem", fontWeight: 800, color: eyebrow,
              }}>→</div>

              <div style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
                borderRadius: 10, padding: "18px 22px",
              }}>
                <div style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: "0.56rem",
                  fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: isDark ? "#A0A0A0" : "#404040", marginBottom: 12,
                }}>After</div>
                {["Dedicated founder spotlight", "Experience & deals foregrounded", "Brand-led narrative", "Trust-first visual hierarchy"].map((t) => (
                  <div key={t} style={{
                    display: "flex", alignItems: "center", gap: 7,
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.75rem",
                    color: isDark ? "#C8C8C8" : "#282828",
                    fontWeight: 600, marginBottom: 7,
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: head, display: "inline-block", flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── S6: THE ARCHITECTURE ──────────────────────── */}
        <section style={{ ...secBase, background: bgAlt }}>
          <NoiseLayer isDark={isDark} />
          <div style={{ ...inner }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "clamp(32px, 5vw, 72px)", alignItems: "center",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={label("")}>05 — The Architecture</span>
                </div>
                <h2 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)",
                  fontWeight: 800, letterSpacing: "-0.025em",
                  color: head, margin: "0 0 14px",
                }}>Quality Over Quantity</h2>
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "clamp(0.78rem, 1.05vw, 0.88rem)",
                  lineHeight: 1.72, color: body, fontWeight: 500, margin: 0,
                }}>
                  Luxury buyers don't want to scroll through 300 listings. They want to be shown the right three. Each property card was engineered to communicate everything needed for a decision — in a single glance.
                </p>
              </div>

              <div>
                <div style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: "0.58rem",
                  fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: eyebrow, marginBottom: 12,
                }}>High-Signal Data Points Per Card</div>
                {[
                  ["Property Type", "Villa · Penthouse · Apartment"],
                  ["Location", "Community + district prominence"],
                  ["Price", "Always above-the-fold"],
                  ["Key Feature", "Defining amenity (pool, view, floors)"],
                  ["Bedroom Count", "Primary filter for HNI buyers"],
                  ["Status", "Off-plan · Ready · Negotiable"],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    paddingBottom: 10, marginBottom: 10,
                    borderBottom: `1px solid ${divider}`,
                  }}>
                    <span style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontSize: "0.75rem", color: body, fontWeight: 500,
                    }}>{lbl}</span>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.7rem", fontWeight: 600, color: head,
                      textAlign: "right", maxWidth: 200,
                    }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── S7: THE CLOSING ───────────────────────────── */}
        <section style={{ ...secBase, background: bg }}>
          <NoiseLayer isDark={isDark} />
          <div style={{ ...inner, textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ width: 28, height: 1, background: eyebrow }} />
              <span style={label("")}>Project Outcome</span>
              <div style={{ width: 28, height: 1, background: eyebrow }} />
            </div>

            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 800, letterSpacing: "-0.03em",
              color: head, margin: "0 0 16px",
            }}>
              100% Alignment with<br />Premium Positioning
            </h2>

            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
              lineHeight: 1.7, color: body, fontWeight: 500,
              maxWidth: 480, margin: "0 auto 44px",
            }}>
              The redesigned Dubai Dunes platform communicates luxury from the first pixel — a brand-led experience that earns trust before a single word is read.
            </p>

            <div style={{
              display: "flex", justifyContent: "center",
              gap: "clamp(24px, 5vw, 64px)", marginBottom: 52, flexWrap: "wrap",
            }}>
              {[
                { value: "100%", label: "Premium Alignment" },
                { value: "Solo", label: "End-to-end Ownership" },
                { value: "3 Weeks", label: "Research to Delivery" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)",
                    fontWeight: 800, letterSpacing: "-0.03em",
                    color: head, lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.62rem", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: eyebrow, marginTop: 7,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.01em",
                  padding: "11px 26px", borderRadius: 0,
                  background: head, color: isDark ? "#0A0A0A" : "#F5F5F5",
                  border: `1px solid ${head}`, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 7,
                  transition: "opacity 0.2s",
                }}
              >
                View More Work <ArrowUpRight size={13} />
              </button>
              <a
                href="mailto:qureshi.ux@gmail.com"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.01em",
                  padding: "11px 26px", borderRadius: 0,
                  background: "transparent", color: head,
                  border: `1px solid ${divider}`,
                  textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 7,
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
