import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LINKEDIN_URL = "https://www.linkedin.com/in/haseeb-qureshi-5b8aa1351";

export function ContactModal({ isOpen, onClose }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const sys = typeof document !== "undefined"
    ? document.documentElement.classList.contains("dark") : false;
  const isDark = mounted ? resolvedTheme === "dark" : sys;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const overlayBg = isDark ? "rgba(0,0,0,0.9)"           : "rgba(0,0,0,0.58)";
  const modalBg   = isDark ? "#0C0C0C"                   : "#FFFFFF";
  const modalBdr  = isDark ? "rgba(255,255,255,0.09)"    : "rgba(0,0,0,0.1)";
  const titleClr  = isDark ? "#F0F0F0"                   : "#080808";
  const body      = isDark ? "#686868"                   : "#525252";
  const green     = isDark ? "#5EFF80"                   : "#1A7A32";
  const greenBg   = isDark ? "rgba(94,255,128,0.07)"     : "rgba(26,122,50,0.06)";
  const greenBdr  = isDark ? "rgba(94,255,128,0.2)"      : "rgba(26,122,50,0.2)";
  const divider   = isDark ? "rgba(255,255,255,0.07)"    : "rgba(0,0,0,0.08)";
  const closeBg   = isDark ? "rgba(255,255,255,0.07)"    : "rgba(0,0,0,0.06)";
  const liBlue    = "#0A66C2";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, background: overlayBg, zIndex: 40000,
              backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
            }}
          />
          <div style={{
            position: "fixed", inset: 0, zIndex: 40001,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px 16px", pointerEvents: "none",
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{
                pointerEvents: "auto", width: "100%", maxWidth: 390,
                background: modalBg, border: `1px solid ${modalBdr}`,
                borderRadius: 22, padding: "30px 28px",
                boxShadow: isDark
                  ? "0 36px 90px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.04)"
                  : "0 36px 90px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
                position: "relative",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute", top: 16, right: 16,
                  width: 30, height: 30, borderRadius: "50%",
                  background: closeBg,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  color: body, transition: "background 0.18s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = closeBg; }}
              >
                <X size={13} />
              </button>

              {/* Available pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: greenBg, border: `1px solid ${greenBdr}`,
                borderRadius: 100, padding: "5px 13px", marginBottom: 20,
              }}>
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "block", width: 5, height: 5, borderRadius: "50%", background: green }}
                />
                <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: green }}>
                  Available for work
                </span>
              </div>

              {/* Headline */}
              <h2 style={{
                fontFamily: "'Poppins', sans-serif", fontSize: "1.32rem", fontWeight: 800,
                letterSpacing: "-0.03em", lineHeight: 1.14, color: titleClr, margin: "0 0 8px",
              }}>
                Let's build something<br />
                <span style={{ color: green }}>intentional.</span>
              </h2>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.76rem", fontWeight: 500, lineHeight: 1.6, color: body, margin: "0 0 22px" }}>
                UI/UX Design Lead · Ontario, Canada
              </p>

              <div style={{ height: 1, background: divider, marginBottom: 14 }} />

              {/* Email */}
              <a
                href="mailto:qureshi.ux@gmail.com"
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 18px", borderRadius: 13,
                  background: isDark ? "#EFEFEF" : "#0A0A0A",
                  color: isDark ? "#0A0A0A" : "#F5F5F5",
                  textDecoration: "none", marginBottom: 8,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.82"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: isDark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail size={15} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.3 }}>Send Email</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 500, opacity: 0.55, marginTop: 1 }}>qureshi.ux@gmail.com</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/923318921216"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 18px", borderRadius: 13,
                  background: "rgba(37,211,102,0.09)", border: "1px solid rgba(37,211,102,0.22)",
                  color: "#25D366", textDecoration: "none", marginBottom: 8,
                  transition: "background 0.22s, border-color 0.22s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,211,102,0.16)"; el.style.borderColor = "rgba(37,211,102,0.38)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(37,211,102,0.09)"; el.style.borderColor = "rgba(37,211,102,0.22)"; }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: "rgba(37,211,102,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.3 }}>WhatsApp</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 500, opacity: 0.75, marginTop: 1 }}>+92 331 892 1216</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={LINKEDIN_URL}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 18px", borderRadius: 13,
                  background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.2)",
                  color: liBlue, textDecoration: "none", marginBottom: 8,
                  transition: "background 0.22s, border-color 0.22s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(10,102,194,0.14)"; el.style.borderColor = "rgba(10,102,194,0.36)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(10,102,194,0.08)"; el.style.borderColor = "rgba(10,102,194,0.2)"; }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: "rgba(10,102,194,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.3 }}>LinkedIn</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 500, opacity: 0.75, marginTop: 1 }}>View Profile</div>
                </div>
              </a>

              {/* Download Resume */}
              <a
                href="/resume.pdf"
                download="Haseeb_Qureshi_Resume.pdf"
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "13px 18px", borderRadius: 13,
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                  color: isDark ? "#C0C0C0" : "#2A2A2A",
                  textDecoration: "none",
                  transition: "background 0.22s, border-color 0.22s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"; el.style.borderColor = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"; el.style.borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"; }}
              >
                <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Download size={15} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.3 }}>Download Resume</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 500, opacity: 0.55, marginTop: 1 }}>PDF · UI/UX Portfolio</div>
                </div>
              </a>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
