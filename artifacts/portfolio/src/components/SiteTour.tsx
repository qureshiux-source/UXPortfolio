import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

const STEP_DURATION = 3600; // ms visible per step (after scroll settles)
const SCROLL_SETTLE  = 700; // ms to wait after triggering scroll

const STEPS = [
  {
    section: 0,
    eyebrow: "01 / 07  ·  INTRO",
    title: "Design Lead & Accessibility Specialist",
    body: "4+ years shaping accessible, intentional digital products — from government portals to fintech flows. Every pixel is deliberate.",
  },
  {
    section: 1,
    eyebrow: "02 / 07  ·  EXPERIENCE",
    title: "Currently Leading Design at Wired Hub",
    body: "UI/UX Design Lead across 10+ Government & Real Estate products. Enforcing WCAG 2.1 AA, building a shared component library, and cutting handoff time by 40%.",
  },
  {
    section: 2,
    eyebrow: "03 / 07  ·  CASE STUDIES",
    title: "Deep-Dive Explorations",
    body: "A fintech onboarding redesign that cut drop-off 42%. A scalable design system adopted by 4 product teams. Research → wireframe → test → ship.",
  },
  {
    section: 3,
    eyebrow: "04 / 07  ·  PROJECTS",
    title: "Focused, High-Impact Executions",
    body: "Banking App Redesign · E-commerce Checkout (+18% conversion) · Analytics Dashboard for 200K+ users. Clarity at every touchpoint.",
  },
  {
    section: 4,
    eyebrow: "05 / 07  ·  SKILLS",
    title: "Figma Expert · WCAG Specialist",
    body: "Full design-to-dev fluency: Figma, ProtoPie, Storybook, Design Tokens, and 4 years with WCAG accessibility tools. Hover the tiles to see proficiency.",
  },
  {
    section: 5,
    eyebrow: "06 / 07  ·  CREDENTIALS",
    title: "10+ Certifications & BCS in HCI",
    body: "Google UX Professional Certificate · Microsoft UX Specialisation · IxDF UX Research & Strategy · BCS in Human-Computer Interaction — Sukkur IBA University.",
  },
  {
    section: 6,
    eyebrow: "07 / 07  ·  CONTACT",
    title: "Open to Opportunities",
    body: "Building accessible, intentional, delightful digital products. Let's collaborate on something meaningful.",
  },
];

interface Props {
  scrollEl: React.RefObject<HTMLDivElement | null>;
  isDark: boolean;
  onClose: () => void;
}

export function SiteTour({ scrollEl, isDark, onClose }: Props) {
  const [step, setStep]           = useState(0);
  const [visible, setVisible]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const closedRef  = useRef(false);

  /* ── Colors — no new hues, pure existing palette ─────────────────── */
  const ringColor  = isDark ? "rgba(255,255,255,0.9)"  : "rgba(0,0,0,0.85)";
  const tipBg      = isDark ? "#F5F5F5" : "#0A0A0A";
  const tipFg      = isDark ? "#0A0A0A" : "#F5F5F5";
  const tipMuted   = isDark ? "rgba(0,0,0,0.45)"       : "rgba(255,255,255,0.5)";
  const tipBorder  = isDark ? "rgba(0,0,0,0.1)"        : "rgba(255,255,255,0.12)";
  const skipBg     = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.55)";
  const skipFg     = isDark ? "#0A0A0A" : "#F5F5F5";
  const progTrack  = isDark ? "rgba(0,0,0,0.15)"       : "rgba(255,255,255,0.15)";
  const progFill   = isDark ? "rgba(0,0,0,0.6)"        : "rgba(255,255,255,0.85)";
  const btnBdr     = isDark ? "rgba(0,0,0,0.2)"        : "rgba(255,255,255,0.2)";
  const scrimEnd   = isDark ? "rgba(0,0,0,0.82)"       : "rgba(0,0,0,0.78)";
  /* ─────────────────────────────────────────────────────────────────── */

  const clearTimers = useCallback(() => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  const goToStep = useCallback((idx: number) => {
    if (closedRef.current) return;
    clearTimers();
    setVisible(false);
    setProgress(0);

    /* Scroll scroll-snap container to target section */
    if (scrollEl.current) {
      scrollEl.current.scrollTo({
        top: STEPS[idx].section * window.innerHeight,
        behavior: "smooth",
      });
    }

    /* Wait for scroll to settle, then show tooltip and start timer */
    timerRef.current = setTimeout(() => {
      if (closedRef.current) return;
      setStep(idx);
      setVisible(true);

      /* Progress bar */
      const tick = 50;
      let elapsed = 0;
      progressRef.current = setInterval(() => {
        elapsed += tick;
        setProgress(Math.min(elapsed / STEP_DURATION, 1));
        if (elapsed >= STEP_DURATION) {
          clearInterval(progressRef.current!);
          /* Auto-advance */
          if (idx < STEPS.length - 1) {
            goToStep(idx + 1);
          } else {
            /* Tour finished */
            timerRef.current = setTimeout(() => {
              if (!closedRef.current) close();
            }, 600);
          }
        }
      }, tick);
    }, SCROLL_SETTLE);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTimers, scrollEl]);

  const close = useCallback(() => {
    closedRef.current = true;
    clearTimers();
    setVisible(false);
    onClose();
  }, [clearTimers, onClose]);

  /* Start on mount */
  useEffect(() => {
    closedRef.current = false;
    goToStep(0);
    return () => { closedRef.current = true; clearTimers(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keyboard: Escape = close, → = next, ← = prev */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); }
      if (e.key === "ArrowRight" && step < STEPS.length - 1) { goToStep(step + 1); }
      if (e.key === "ArrowLeft"  && step > 0)                { goToStep(step - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, goToStep, step]);

  const currentStep = STEPS[step];

  return (
    <>
      {/* Focus ring — viewport border, pointer-events: none */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0, zIndex: 9990,
          border: `2.5px solid ${ringColor}`,
          pointerEvents: "none",
          boxSizing: "border-box",
        }}
      />

      {/* Bottom scrim — gradient so tooltip stays readable regardless of section bg */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 220,
        background: `linear-gradient(to bottom, transparent 0%, ${scrimEnd} 100%)`,
        pointerEvents: "none", zIndex: 9991,
      }} />

      {/* Skip button — top right */}
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={close}
        aria-label="Close tour"
        style={{
          position: "fixed", top: 72, right: 18, zIndex: 9999,
          display: "flex", alignItems: "center", gap: 6,
          fontFamily: "'Raleway', sans-serif",
          fontSize: "0.62rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "7px 14px", borderRadius: 100,
          background: skipBg,
          color: skipFg,
          border: "none", cursor: "pointer",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <X size={11} />
        Skip Tour
      </motion.button>

      {/* Step counter dots — bottom left */}
      <div style={{
        position: "fixed", bottom: 160, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: 6, zIndex: 9992,
        pointerEvents: "none",
      }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 16 : 5,
            height: 5, borderRadius: 100,
            background: i === step
              ? (isDark ? "rgba(245,245,245,0.9)" : "rgba(245,245,245,0.9)")
              : "rgba(245,245,245,0.3)",
            transition: "width 0.3s ease, background 0.3s ease",
          }} />
        ))}
      </div>

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed",
              bottom: "clamp(18px, 4vh, 36px)",
              left: "50%", transform: "translateX(-50%)",
              zIndex: 9999,
              width: "min(520px, calc(100vw - 32px))",
              background: tipBg,
              borderRadius: 18,
              padding: "clamp(18px, 3vw, 26px) clamp(20px, 3vw, 28px)",
              border: `1px solid ${tipBorder}`,
              boxShadow: isDark
                ? "0 24px 64px rgba(0,0,0,0.8)"
                : "0 24px 64px rgba(0,0,0,0.55)",
            }}
          >
            {/* Progress bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: progTrack, borderRadius: "18px 18px 0 0", overflow: "hidden",
            }}>
              <motion.div
                style={{
                  height: "100%", background: progFill,
                  transformOrigin: "left", scaleX: progress,
                }}
              />
            </div>

            {/* Eyebrow */}
            <div style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.55rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: tipMuted, marginBottom: 8,
            }}>
              {currentStep.eyebrow}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              fontWeight: 800, letterSpacing: "-0.02em",
              lineHeight: 1.2, color: tipFg,
              margin: "0 0 8px",
            }}>
              {currentStep.title}
            </h3>

            {/* Body */}
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(0.75rem, 1.2vw, 0.84rem)",
              lineHeight: 1.65, fontWeight: 500,
              color: tipFg, opacity: 0.72, margin: 0,
            }}>
              {currentStep.body}
            </p>

            {/* Manual nav */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16, paddingTop: 14,
              borderTop: `1px solid ${tipBorder}`,
            }}>
              <button
                onClick={() => { if (step > 0) goToStep(step - 1); }}
                disabled={step === 0}
                style={{
                  all: "unset", cursor: step === 0 ? "default" : "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "0.62rem", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: step === 0 ? tipMuted : tipFg,
                  opacity: step === 0 ? 0.35 : 1,
                  transition: "opacity 0.18s",
                }}
              >
                <ChevronLeft size={13} /> Prev
              </button>

              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.55rem", fontWeight: 700,
                letterSpacing: "0.1em", color: tipMuted,
              }}>
                {step + 1} / {STEPS.length}
              </span>

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => goToStep(step + 1)}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.62rem", fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "6px 14px", borderRadius: 100,
                    border: `1px solid ${btnBdr}`,
                    color: tipFg, background: "transparent",
                    transition: "background 0.18s",
                  }}
                >
                  Next <ChevronRight size={13} />
                </button>
              ) : (
                <button
                  onClick={close}
                  style={{
                    all: "unset", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 5,
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.62rem", fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "6px 16px", borderRadius: 100,
                    background: progFill, color: tipBg,
                  }}
                >
                  Finish <ChevronRight size={13} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
