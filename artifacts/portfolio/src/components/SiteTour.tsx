import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Play } from "lucide-react";

const STEP_DURATION = 2800;
const SCROLL_SETTLE  = 680;

export const STEPS = [
  { section: 0, highlight: null,             label: "UI/UX Design Lead & Accessibility Specialist" },
  { section: 1, highlight: "work-wired-hub", label: "Wired Hub — UI/UX Design Lead (Current)" },
  { section: 1, highlight: "work-exclusive", label: "Exclusive Digitals — Product Designer" },
  { section: 1, highlight: "work-dcode",     label: "Freelance — UI/UX Designer" },
  { section: 2, highlight: "case-1",         label: "Case Study: Dubai Dunes Real Estate UX" },
  { section: 2, highlight: "case-2",         label: "Case Study: Exclusive Streaming Platform" },
  { section: 3, highlight: "proj-1",         label: "Project: Verified by Tenants Redesign" },
  { section: 3, highlight: "proj-2",         label: "Project: NSW Mobile App Redesign" },
  { section: 3, highlight: "proj-3",         label: "Project: UBIOX Brand & Landing Page" },
  { section: 4, highlight: "skill-ux",       label: "Skills: Core UX Skills" },
  { section: 4, highlight: "skill-frontend", label: "Skills: UI & Design Systems" },
  { section: 4, highlight: "skill-strategy", label: "Skills: Workflow & Strategy" },
  { section: 6, highlight: "cred-3",         label: "Microsoft UX Design Specialization" },
  { section: 6, highlight: "cred-4",         label: "Accessibility-First Design — LinkedIn Learning" },
  { section: 6, highlight: "cred-5",         label: "Design Psychology (UX) — LinkedIn Learning" },
  { section: 6, highlight: "cred-0",         label: "BSc Computer Science — Sukkur IBA University" },
  { section: 6, highlight: null,             label: "Open to Opportunities · Let's Collaborate" },
];

interface Props {
  scrollEl: React.RefObject<HTMLDivElement | null>;
  isDark: boolean;
  onClose: () => void;
  onHighlight: (h: string | null) => void;
}

export function SiteTour({ scrollEl, isDark, onClose, onHighlight }: Props) {
  const [step, setStep]         = useState(0);
  const [progress, setProgress] = useState(0);

  /* Stable refs — never cause useCallback invalidation */
  const closedRef      = useRef(false);
  const stepRef        = useRef(0);
  const timerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const onHighlightRef = useRef(onHighlight);
  const onCloseRef     = useRef(onClose);
  const scrollElRef    = useRef(scrollEl);
  // Keep prop refs current every render
  onHighlightRef.current = onHighlight;
  onCloseRef.current     = onClose;
  scrollElRef.current    = scrollEl;

  /* ── Palette: matches inverted navbar ──────────────────────────────── */
  const barBg    = isDark ? "rgba(245,245,245,0.95)" : "rgba(8,8,8,0.93)";
  const barBdr   = isDark ? "rgba(0,0,0,0.1)"        : "rgba(255,255,255,0.1)";
  const txt      = isDark ? "#0A0A0A"                : "#F0F0F0";
  const muted    = isDark ? "rgba(0,0,0,0.38)"       : "rgba(255,255,255,0.38)";
  const sep      = isDark ? "rgba(0,0,0,0.12)"       : "rgba(255,255,255,0.12)";
  const iconBg   = isDark ? "rgba(0,0,0,0.07)"       : "rgba(255,255,255,0.08)";
  const progFill = isDark ? "rgba(0,0,0,0.7)"        : "rgba(255,255,255,0.8)";
  const ringClr  = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)";
  /* ─────────────────────────────────────────────────────────────────── */

  /* clearTimers — stable, no deps */
  const clearTimers = useCallback(() => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timerRef.current = null;
    intervalRef.current = null;
  }, []);

  /* close — stable, uses refs for callbacks */
  const close = useCallback(() => {
    closedRef.current = true;
    clearTimers();
    onHighlightRef.current(null);
    onCloseRef.current();
  }, [clearTimers]);

  /* goToStep — stable, calls itself via ref to avoid stale closure */
  const goToStepRef = useRef<(idx: number) => void>(() => {});

  const goToStep = useCallback((idx: number) => {
    if (closedRef.current || idx >= STEPS.length) return;
    clearTimers();
    setProgress(0);

    const prevSection = STEPS[stepRef.current]?.section ?? -1;
    const nextSection = STEPS[idx].section;
    const sameSection = idx > 0 && prevSection === nextSection;

    if (!sameSection) {
      const el = scrollElRef.current?.current;
      if (el) el.scrollTo({ top: nextSection * window.innerHeight, behavior: "smooth" });
    }

    const settle = sameSection ? 0 : SCROLL_SETTLE;

    timerRef.current = setTimeout(() => {
      if (closedRef.current) return;
      stepRef.current = idx;
      setStep(idx);
      onHighlightRef.current(STEPS[idx].highlight);

      const tick = 50;
      let elapsed = 0;
      intervalRef.current = setInterval(() => {
        if (closedRef.current) { clearInterval(intervalRef.current!); return; }
        elapsed += tick;
        setProgress(Math.min(elapsed / STEP_DURATION, 1));
        if (elapsed >= STEP_DURATION) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          if (idx < STEPS.length - 1) {
            goToStepRef.current(idx + 1);
          } else {
            close();
          }
        }
      }, tick);
    }, settle);
  }, [clearTimers, close]);

  /* Keep goToStep ref current so the interval always calls the latest */
  goToStepRef.current = goToStep;

  /* Start on mount */
  useEffect(() => {
    closedRef.current = false;
    goToStepRef.current(0);
    return () => {
      closedRef.current = true;
      clearTimers();
      onHighlightRef.current(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keyboard: Escape / ← → */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { close(); }
      if (e.key === "ArrowRight") { goToStepRef.current(stepRef.current + 1); }
      if (e.key === "ArrowLeft")  { if (stepRef.current > 0) goToStepRef.current(stepRef.current - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  const current = STEPS[step];

  const iconBtn = (
    onClick: () => void,
    children: React.ReactNode,
    label: string,
    disabled?: boolean,
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        all: "unset", cursor: disabled ? "default" : "pointer",
        width: 28, height: 28, borderRadius: "50%",
        background: disabled ? "transparent" : iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? 0.25 : 1,
        transition: "opacity 0.18s, background 0.18s",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );

  return (
    <>
      {/* Subtle viewport focus ring */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 9990,
          border: `2px solid ${ringClr}`,
          pointerEvents: "none", boxSizing: "border-box",
          opacity: 0.3,
        }}
      />

      {/* ── Compact single-row bar ── */}
      <motion.div
        role="region"
        aria-label="Site tour"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "fixed", bottom: 20, left: 20,
          zIndex: 9999,
          display: "flex", alignItems: "center",
          height: 42,
          background: barBg,
          border: `1px solid ${barBdr}`,
          borderRadius: 100,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isDark
            ? "0 4px 24px rgba(0,0,0,0.18)"
            : "0 4px 24px rgba(0,0,0,0.45)",
          overflow: "hidden",
          maxWidth: "calc(100vw - 40px)",
        }}
      >
        {/* Progress line — top edge */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: isDark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}>
          <motion.div
            style={{ height: "100%", background: progFill, transformOrigin: "left", scaleX: progress }}
          />
        </div>

        {/* Content row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "0 8px 0 14px", width: "100%",
        }}>
          <Play size={10} style={{ color: txt, opacity: 0.5, flexShrink: 0, fill: txt }} aria-hidden />

          <motion.span
            key={step}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.01em",
              color: txt,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "clamp(160px, 28vw, 300px)",
              flexShrink: 1,
            }}
          >
            {current.label}
          </motion.span>

          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: "0.58rem", fontWeight: 700,
            color: muted, flexShrink: 0,
            letterSpacing: "0.04em",
          }}>
            {step + 1}/{STEPS.length}
          </span>

          <div style={{ width: 1, height: 16, background: sep, flexShrink: 0 }} />

          {iconBtn(
            () => { if (stepRef.current > 0) goToStepRef.current(stepRef.current - 1); },
            <ChevronLeft size={13} style={{ color: txt }} />,
            "Previous step",
            step === 0,
          )}

          {step < STEPS.length - 1
            ? iconBtn(
                () => goToStepRef.current(stepRef.current + 1),
                <ChevronRight size={13} style={{ color: txt }} />,
                "Next step",
              )
            : iconBtn(close, <ChevronRight size={13} style={{ color: txt }} />, "Finish tour")
          }

          <div style={{ width: 1, height: 16, background: sep, flexShrink: 0 }} />

          {iconBtn(close, <X size={12} style={{ color: txt }} />, "Close tour")}
        </div>
      </motion.div>
    </>
  );
}
