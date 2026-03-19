import { Linkedin, Instagram, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 transition-colors">
      <div
        className="h-full backdrop-blur-[14px] bg-white/75 dark:bg-[#0e0e0f]/80 border-b border-black/[0.07] dark:border-white/[0.07]"
        style={{ WebkitBackdropFilter: "blur(14px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-4">

          {/* LEFT — Name */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className="font-semibold text-[1.05rem] text-foreground tracking-tight leading-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Riya Sharma
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary block mt-0.5 shrink-0" />
          </div>

          {/* CENTER — Socials */}
          <nav className="hidden md:flex items-center gap-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[0.833rem] font-medium text-muted-foreground hover:text-primary transition-all duration-200 group"
            >
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>LinkedIn</span>
            </a>
            <span className="w-px h-4 bg-border" />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[0.833rem] font-medium text-muted-foreground hover:text-secondary transition-all duration-200 group"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Instagram</span>
            </a>
          </nav>

          {/* RIGHT — Theme toggle + Resume */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <a
              href="#"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary text-primary text-[0.833rem] font-semibold hover:bg-primary hover:text-white transition-all duration-300 group"
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
