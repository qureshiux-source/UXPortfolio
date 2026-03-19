import { Linkedin, Instagram, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50">
      <div
        className="h-full border-b border-black/[0.06] dark:border-white/[0.06] transition-colors"
        style={{
          background: "rgba(250,250,250,0.82)",
          backdropFilter: "blur(18px) saturate(1.2)",
          WebkitBackdropFilter: "blur(18px) saturate(1.2)",
        }}
      >
        {/* Silk sheen on navbar */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* Dark mode navbar sheen */}
        <div
          className="absolute inset-0 pointer-events-none dark:block hidden"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-4 relative">

          {/* LEFT — Name */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="font-semibold text-[1.05rem] text-foreground tracking-tight leading-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Riya Sharma
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-foreground block mt-0.5 shrink-0 opacity-80" />
          </div>

          {/* CENTER — Socials */}
          <nav className="hidden md:flex items-center gap-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[0.833rem] font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
            >
              <Linkedin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
              <span>LinkedIn</span>
            </a>
            <span className="w-px h-3.5 bg-border" />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[0.833rem] font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
            >
              <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
              <span>Instagram</span>
            </a>
          </nav>

          {/* RIGHT — Theme + Resume */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <a
              href="#"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-foreground/20 text-foreground text-[0.833rem] font-semibold hover:bg-foreground hover:text-background transition-all duration-300 group"
              style={{ letterSpacing: "0.01em" }}
            >
              <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
              <span>Resume</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
