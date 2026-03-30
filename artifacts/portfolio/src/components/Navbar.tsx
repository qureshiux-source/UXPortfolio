import { Linkedin, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const LINKEDIN_URL = "https://www.linkedin.com/in/haseeb-qureshi-5b8aa1351";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const isMobile = useBreakpoint(768);

  useEffect(() => { setMounted(true); }, []);

  const system = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : system;

  const navBg   = isDark ? "rgba(248,248,248,0.96)" : "rgba(8,8,8,0.94)";
  const border  = isDark ? "rgba(0,0,0,0.08)"       : "rgba(255,255,255,0.08)";
  const txt     = isDark ? "#0A0A0A"                : "#F0F0F0";
  const sep     = isDark ? "rgba(0,0,0,0.14)"       : "rgba(255,255,255,0.14)";
  const dot     = isDark ? "rgba(0,0,0,0.3)"        : "rgba(255,255,255,0.3)";
  const btnBdr  = isDark ? "rgba(0,0,0,0.18)"       : "rgba(255,255,255,0.18)";
  const btnHvBg = isDark ? "#0A0A0A"                : "#F5F5F5";
  const btnHvFg = isDark ? "#F5F5F5"                : "#0A0A0A";
  const overlayBg = isDark ? "rgba(248,248,248,0.97)" : "rgba(8,8,8,0.97)";

  /* Close menu on route change */
  useEffect(() => { setMenuOpen(false); }, []);

  const navLink = (label: string, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      style={{
        all: "unset", cursor: "pointer",
        fontFamily: "'Raleway', sans-serif",
        fontSize: "0.78rem", fontWeight: 600,
        letterSpacing: "0.01em",
        color: txt, opacity: 0.55,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.55"; }}
    >{label}</button>
  );

  const divider = (
    <span style={{ width: 1, height: 12, background: sep, display: "inline-block", flexShrink: 0 }} />
  );

  return (
    <>
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
            justifyContent: "space-between", gap: 12,
          }}>

            {/* ── Left: Name ── */}
            <div
              onClick={() => { navigate("/"); setMenuOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, cursor: "pointer" }}
            >
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: isMobile ? "0.88rem" : "1rem",
                fontWeight: 600,
                letterSpacing: "-0.01em", lineHeight: 1,
                color: txt,
              }}>Haseeb Qureshi</span>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />
            </div>

            {isMobile ? (
              /* ── Mobile: theme + hamburger ── */
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ThemeToggle />
                <button
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  style={{
                    all: "unset", cursor: "pointer",
                    width: 36, height: 36, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: menuOpen
                      ? (isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)")
                      : "transparent",
                    border: `1px solid ${isDark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)"}`,
                    color: txt, transition: "background 0.18s",
                  }}
                >
                  {menuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
              </div>
            ) : (
              <>
                {/* ── Desktop center: nav links ── */}
                <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  {navLink("Process", () => navigate("/process"))}
                  {divider}
                  {navLink("Projects", () => navigate("/projects"))}
                </nav>

                {/* ── Desktop right: theme + LinkedIn ── */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <ThemeToggle />
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    <Linkedin size={13} /><span>LinkedIn</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile overlay menu ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed", top: 64, left: 0, right: 0,
              zIndex: 49,
              background: overlayBg,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: `1px solid ${border}`,
              padding: "8px 0 16px",
            }}
          >
            {[
              { label: "Process",  action: () => { navigate("/process"); setMenuOpen(false); } },
              { label: "Projects", action: () => { navigate("/projects"); setMenuOpen(false); } },
            ].map(item => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  all: "unset", cursor: "pointer", display: "block",
                  width: "100%", padding: "14px clamp(16px, 4vw, 40px)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.92rem", fontWeight: 600,
                  color: txt, opacity: 0.75,
                  transition: "opacity 0.15s",
                  boxSizing: "border-box",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
              >{item.label}</button>
            ))}

            <div style={{ height: 1, background: border, margin: "4px 0" }} />

            <a
              href={LINKEDIN_URL}
              target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px clamp(16px, 4vw, 40px)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.92rem", fontWeight: 600,
                color: txt, opacity: 0.75,
                textDecoration: "none", transition: "opacity 0.15s",
              }}
            >
              <Linkedin size={14} /> LinkedIn
            </a>

            <a
              href="/resume.pdf"
              download="Haseeb_Qureshi_Resume.pdf"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px clamp(16px, 4vw, 40px)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.92rem", fontWeight: 600,
                color: txt, opacity: 0.75,
                textDecoration: "none", transition: "opacity 0.15s",
              }}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
