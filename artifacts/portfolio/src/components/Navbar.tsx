import { Linkedin, Instagram, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  const navBg  = isDark ? "rgba(3,3,3,0.88)"    : "rgba(255,255,255,0.88)";
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const txt    = isDark ? "#E8E8E8" : "#101010";
  const sep    = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
  const dot    = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)";
  const btnBdr = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.16)";
  const btnHvBg = isDark ? "#F5F5F5" : "#0A0A0A";
  const btnHvFg = isDark ? "#0A0A0A" : "#F5F5F5";

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
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
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
                {i > 0 && <span style={{ width: 1, height: 14, background: sep, display: "inline-block", marginRight: 20 }} />}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.833rem", fontWeight: 500,
                    color: txt, textDecoration: "none",
                    opacity: 0.55,
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.55"; }}
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
