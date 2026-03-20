import { Download, Menu } from "lucide-react";
import { useState } from "react";

const BLUE = "#3D7BFF";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ height: 64 }}>
      <div
        style={{
          height: "100%",
          background: "rgba(10,10,10,0.88)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: `0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,123,255,0.04)`,
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-4"
        >
          {/* LEFT — Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: BLUE,
                boxShadow: `0 0 10px ${BLUE}80`,
              }}
            />
            <span
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700, fontSize: "1rem",
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
              }}
            >
              Haseeb Qureshi
            </span>
          </div>

          {/* CENTER — Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {["Work", "Experience", "Skills", "Contact"].map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.83rem", fontWeight: 600,
                  letterSpacing: "0.02em",
                  color: "rgba(255,255,255,0.55)",
                  background: "none", border: "none",
                  cursor: "pointer", padding: "4px 0",
                  transition: "color 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* RIGHT — Download CV */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="hidden md:flex items-center gap-2 transition-all duration-200"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.8rem", fontWeight: 700,
                letterSpacing: "0.02em",
                padding: "8px 20px",
                borderRadius: 100,
                background: BLUE,
                color: "#FFFFFF",
                textDecoration: "none",
                boxShadow: `0 4px 16px ${BLUE}50`,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#5591FF";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 22px ${BLUE}70`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = BLUE;
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 16px ${BLUE}50`;
              }}
            >
              <Download size={13} />
              Download CV
            </a>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer" }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: "#0A0A0A",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "16px 24px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {["Work", "Experience", "Skills", "Contact"].map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.9rem", fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  background: "none", border: "none",
                  cursor: "pointer", textAlign: "left", padding: "4px 0",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
