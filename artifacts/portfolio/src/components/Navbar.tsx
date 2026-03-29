import { Linkedin, Instagram, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { setMounted(true); }, []);

  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  /* Navbar is INVERTED relative to the page theme */
  /* Dark mode page → light/white navbar; Light mode page → dark/black navbar */
  const navBg  = isDark ? "rgba(248,248,248,0.94)"  : "rgba(8,8,8,0.92)";
  const border = isDark ? "rgba(0,0,0,0.08)"         : "rgba(255,255,255,0.08)";
  const txt    = isDark ? "#0A0A0A"                  : "#F0F0F0";
  const sep    = isDark ? "rgba(0,0,0,0.15)"         : "rgba(255,255,255,0.15)";
  const dot    = isDark ? "rgba(0,0,0,0.35)"         : "rgba(255,255,255,0.35)";
  const btnBdr = isDark ? "rgba(0,0,0,0.2)"          : "rgba(255,255,255,0.2)";
  const btnHvBg = isDark ? "#0A0A0A"                 : "#F5F5F5";
  const btnHvFg = isDark ? "#F5F5F5"                 : "#0A0A0A";

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, height: 64, zIndex: 50 }}>
      <div style={{
        height: "100%",
        background: navBg,
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        borderBottom: `1px solid ${border}`,
        transition: "background 0.35s",
      }}>
        <div style={{
          maxWidth: "72rem", margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px)",
          height: "100%",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 16,
        }}>

          {/* Name */}
          <div
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, cursor: "pointer" }}
          >
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem", fontWeight: 600,
              letterSpacing: "-0.01em", lineHeight: 1,
              color: txt,
            }}>Haseeb Qureshi</span>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: dot, flexShrink: 0,
            }} />
          </div>

          {/* Socials */}
          <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {[
              { href: "https://linkedin.com", icon: <Linkedin size={14} />, label: "LinkedIn" },
              { href: "https://instagram.com", icon: <Instagram size={14} />, label: "Instagram" },
            ].map((link, i) => (
              <span key={link.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {i > 0 && (
                  <span style={{
                    width: 1, height: 14, background: sep,
                    display: "inline-block", marginRight: 20,
                  }} />
                )}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.833rem", fontWeight: 500,
                    color: txt, textDecoration: "none",
                    opacity: 0.6,
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}
                >
                  {link.icon}<span>{link.label}</span>
                </a>
              </span>
            ))}
          </nav>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <ThemeToggle />
            <a
              href="#"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.8rem", fontWeight: 600,
                letterSpacing: "0.01em",
                padding: "7px 18px", borderRadius: 100,
                border: `1px solid ${btnBdr}`,
                color: txt, background: "transparent",
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: 6,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = btnHvBg;
                el.style.color = btnHvFg;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = txt;
              }}
            >
              <FileText size={13} /><span>Resume</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
