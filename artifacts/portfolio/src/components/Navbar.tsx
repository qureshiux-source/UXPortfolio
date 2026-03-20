import { Linkedin, Instagram, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50">
      <div
        className="h-full transition-colors duration-300"
        style={{
          background: isDark
            ? "rgba(13,13,13,0.82)"
            : "rgba(250,250,250,0.82)",
          backdropFilter: "blur(18px) saturate(1.2)",
          WebkitBackdropFilter: "blur(18px) saturate(1.2)",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: isDark
            ? "0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.4)"
            : "0 1px 0 rgba(255,255,255,0.9), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-4 relative">

          {/* LEFT — Name */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="font-semibold text-[1.05rem] tracking-tight leading-none"
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: isDark ? "#F5F5F5" : "#0D0D0D",
              }}
            >
              Haseeb Qureshi
            </span>
            <span
              className="block mt-0.5 shrink-0 rounded-full"
              style={{
                width: 6, height: 6,
                background: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
              }}
            />
          </div>

          {/* CENTER — Socials */}
          <nav className="hidden md:flex items-center gap-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-100 opacity-60"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.833rem",
                fontWeight: 500,
                color: isDark ? "#F5F5F5" : "#0D0D0D",
                textDecoration: "none",
              }}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span
              className="w-px"
              style={{
                height: 14,
                background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
              }}
            />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-100 opacity-60"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.833rem",
                fontWeight: 500,
                color: isDark ? "#F5F5F5" : "#0D0D0D",
                textDecoration: "none",
              }}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </nav>

          {/* RIGHT — Theme + Resume */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <a
              href="#"
              className="flex items-center gap-1.5 transition-all duration-300"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.833rem",
                fontWeight: 600,
                letterSpacing: "0.01em",
                padding: "7px 18px",
                borderRadius: "100px",
                border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.18)",
                color: isDark ? "#F5F5F5" : "#0D0D0D",
                background: "transparent",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = isDark ? "#F5F5F5" : "#0D0D0D";
                el.style.color = isDark ? "#0D0D0D" : "#F5F5F5";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = isDark ? "#F5F5F5" : "#0D0D0D";
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
