import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Play, Volume2, VolumeX } from "lucide-react";

const STEP_DURATION = 3200;
const SCROLL_SETTLE  = 700;

export const STEPS = [
  { sectionId: "tour-0", highlight: null,             label: "UI/UX Design Lead & Accessibility Specialist" },
  { sectionId: "tour-1", highlight: "work-wired-hub", label: "Wired Hub — UI/UX Design Lead (Current)" },
  { sectionId: "tour-1", highlight: "work-exclusive", label: "Exclusive Digitals — Product Designer" },
  { sectionId: "tour-1", highlight: "work-dcode",     label: "Freelance — UI/UX Designer" },
  { sectionId: "tour-2", highlight: "case-1",         label: "Case Study: Dubai Dunes Real Estate UX" },
  { sectionId: "tour-2", highlight: "case-2",         label: "Case Study: Exclusive Streaming Platform" },
  { sectionId: "tour-3", highlight: "proj-1",         label: "Project: Verified by Tenants Redesign" },
  { sectionId: "tour-3", highlight: "proj-2",         label: "Project: NSW Mobile App Redesign" },
  { sectionId: "tour-3", highlight: "proj-3",         label: "Project: UBIOX Brand & Landing Page" },
  { sectionId: "tour-4", highlight: "skill-ux",       label: "Skills: Core UX Skills" },
  { sectionId: "tour-4", highlight: "skill-frontend", label: "Skills: UI & Design Systems" },
  { sectionId: "tour-4", highlight: "skill-strategy", label: "Skills: Workflow & Strategy" },
  { sectionId: "tour-6", highlight: "cred-3",         label: "Microsoft UX Design Specialization" },
  { sectionId: "tour-6", highlight: "cred-4",         label: "Accessibility-First Design — LinkedIn Learning" },
  { sectionId: "tour-6", highlight: "cred-5",         label: "Design Psychology (UX) — LinkedIn Learning" },
  { sectionId: "tour-6", highlight: "cred-0",         label: "BSc Computer Science — Sukkur IBA University" },
  { sectionId: "tour-6", highlight: null,             label: "Open to Opportunities · Let's Collaborate" },
];

/* ── Ambient pad via Web Audio API ────────────────────────────── */
function createAmbientPad() {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let running = false;
  const oscs: OscillatorNode[] = [];

  const start = () => {
    if (running) return;
    running = true;
    try {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 4);

      /* Reverb via noise convolver */
      const conv = ctx.createConvolver();
      const rate = ctx.sampleRate;
      const len  = Math.floor(rate * 3.5);
      const buf  = ctx.createBuffer(2, len, rate);
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.exp(-3.5 * i / len);
        }
      }
      conv.buffer = buf;

      /* Warm low-pass */
      const lpf = ctx.createBiquadFilter();
      lpf.type = "lowpass";
      lpf.frequency.value = 900;
      lpf.Q.value = 0.4;

      const revGain = ctx.createGain();
      revGain.gain.value = 0.45;

      master.connect(lpf);
      lpf.connect(ctx.destination);
      lpf.connect(conv);
      conv.connect(revGain);
      revGain.connect(ctx.destination);

      /* A-minor drone: A1 E2 A2 C3 E3 A3 */
      const notes = [55, 82.41, 110, 130.81, 164.81, 220];
      const gains = [0.06, 0.04, 0.03, 0.025, 0.02, 0.015];
      notes.forEach((freq, i) => {
        const osc  = ctx!.createOscillator();
        const gn   = ctx!.createGain();
        const lfo  = ctx!.createOscillator();
        const lfog = ctx!.createGain();

        osc.type = i < 3 ? "sine" : "triangle";
        osc.frequency.value = freq;

        lfo.frequency.value = 0.06 + i * 0.018;
        lfog.gain.value = freq * 0.002;
        lfo.connect(lfog);
        lfog.connect(osc.frequency);
        lfo.start();

        gn.gain.value = gains[i];
        osc.connect(gn);
        gn.connect(master!);
        osc.start();
        oscs.push(osc, lfo);
      });
    } catch {
      running = false;
    }
  };

  const stop = () => {
    if (!running || !ctx || !master) return;
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    setTimeout(() => { try { ctx?.close(); } catch {} running = false; }, 2200);
  };

  const setMuted = (muted: boolean) => {
    if (!master || !ctx) return;
    master.gain.linearRampToValueAtTime(muted ? 0 : 0.07, ctx.currentTime + 0.6);
  };

  return { start, stop, setMuted };
}

interface Props {
  scrollEl: React.RefObject<HTMLDivElement | null>;
  isDark: boolean;
  onClose: () => void;
  onHighlight: (h: string | null) => void;
}

export function SiteTour({ scrollEl, isDark, onClose, onHighlight }: Props) {
  const [step, setStep]         = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted]       = useState(false);

  const closedRef      = useRef(false);
  const stepRef        = useRef(0);
  const timerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const onHighlightRef = useRef(onHighlight);
  const onCloseRef     = useRef(onClose);
  const scrollElRef    = useRef(scrollEl);
  const audioRef       = useRef(createAmbientPad());
  const mutedRef       = useRef(false);

  onHighlightRef.current = onHighlight;
  onCloseRef.current     = onClose;
  scrollElRef.current    = scrollEl;

  /* Palette: inverted relative to page theme */
  const barBg  = isDark ? "rgba(245,245,245,0.95)" : "rgba(8,8,8,0.93)";
  const barBdr = isDark ? "rgba(0,0,0,0.1)"        : "rgba(255,255,255,0.1)";
  const txt    = isDark ? "#0A0A0A"                : "#F0F0F0";
  const muted_ = isDark ? "rgba(0,0,0,0.38)"       : "rgba(255,255,255,0.38)";
  const sep    = isDark ? "rgba(0,0,0,0.12)"       : "rgba(255,255,255,0.12)";
  const iconBg = isDark ? "rgba(0,0,0,0.07)"       : "rgba(255,255,255,0.08)";
  const progFl = isDark ? "rgba(0,0,0,0.7)"        : "rgba(255,255,255,0.8)";
  const ringCl = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)";

  const clearTimers = useCallback(() => {
    if (timerRef.current)    clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timerRef.current = null;
    intervalRef.current = null;
  }, []);

  const close = useCallback(() => {
    closedRef.current = true;
    clearTimers();
    onHighlightRef.current(null);
    audioRef.current.stop();
    onCloseRef.current();
  }, [clearTimers]);

  const scrollToSection = useCallback((sectionId: string, prevId: string | null) => {
    if (sectionId === prevId) return false; /* same section — no scroll needed */
    const container = scrollElRef.current?.current;
    const target    = document.getElementById(sectionId);
    if (container && target) {
      /* Use getBoundingClientRect for reliable position relative to scroll container */
      const containerTop = container.getBoundingClientRect().top;
      const targetTop    = target.getBoundingClientRect().top;
      const scrollTo     = container.scrollTop + (targetTop - containerTop);
      container.scrollTo({ top: scrollTo, behavior: "smooth" });
      return true;
    }
    return false;
  }, []);

  const goToStepRef = useRef<(idx: number) => void>(() => {});

  const goToStep = useCallback((idx: number) => {
    if (closedRef.current || idx >= STEPS.length) { if (idx >= STEPS.length) close(); return; }
    clearTimers();
    setProgress(0);

    const prevSectionId = idx > 0 ? STEPS[idx - 1].sectionId : null;
    const nextSectionId = STEPS[idx].sectionId;
    const needsScroll   = scrollToSection(nextSectionId, prevSectionId);
    const settle        = needsScroll ? SCROLL_SETTLE : 0;

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
          goToStepRef.current(idx + 1);
        }
      }, tick);
    }, settle);
  }, [clearTimers, close, scrollToSection]);

  goToStepRef.current = goToStep;

  /* Start on mount — launch audio + first step */
  useEffect(() => {
    closedRef.current = false;
    audioRef.current.start();
    goToStepRef.current(0);
    return () => {
      closedRef.current = true;
      clearTimers();
      onHighlightRef.current(null);
      audioRef.current.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     { close(); }
      if (e.key === "ArrowRight") { goToStepRef.current(stepRef.current + 1); }
      if (e.key === "ArrowLeft")  { if (stepRef.current > 0) goToStepRef.current(stepRef.current - 1); }
      if (e.key === "m" || e.key === "M") {
        mutedRef.current = !mutedRef.current;
        setMuted(mutedRef.current);
        audioRef.current.setMuted(mutedRef.current);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  const current = STEPS[step];

  const iconBtn = (
    onClick: () => void, children: React.ReactNode,
    label: string, disabled?: boolean,
  ) => (
    <button
      onClick={onClick} disabled={disabled} aria-label={label}
      style={{
        all: "unset", cursor: disabled ? "default" : "pointer",
        width: 28, height: 28, borderRadius: "50%",
        background: disabled ? "transparent" : iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: disabled ? 0.25 : 1,
        transition: "opacity 0.18s, background 0.18s", flexShrink: 0,
      }}
    >{children}</button>
  );

  return (
    <>
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 9990,
        border: `2px solid ${ringCl}`,
        pointerEvents: "none", boxSizing: "border-box", opacity: 0.28,
      }} />

      <motion.div
        role="region" aria-label="Site tour"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "fixed", bottom: 20, left: 20, zIndex: 9999,
          display: "flex", alignItems: "center", height: 44,
          background: barBg, border: `1px solid ${barBdr}`, borderRadius: 100,
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.18)" : "0 4px 24px rgba(0,0,0,0.5)",
          overflow: "hidden", maxWidth: "calc(100vw - 40px)",
        }}
      >
        {/* Progress bar — top edge */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: isDark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}>
          <motion.div style={{ height: "100%", background: progFl, transformOrigin: "left", scaleX: progress }} />
        </div>

        {/* Step dots */}
        <div style={{
          position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 3,
        }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 10 : 3,
                height: 3, borderRadius: 2,
                background: i === step ? txt : isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)",
                transition: "width 0.3s, background 0.3s",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px 0 14px", width: "100%" }}>
          <Play size={10} style={{ color: txt, opacity: 0.5, flexShrink: 0, fill: txt }} aria-hidden />

          <motion.span
            key={step}
            initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "'Raleway', sans-serif", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.01em", color: txt, whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
              maxWidth: "clamp(140px, 26vw, 280px)", flexShrink: 1,
            }}
          >{current.label}</motion.span>

          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.56rem", fontWeight: 700, color: muted_, flexShrink: 0, letterSpacing: "0.04em" }}>
            {step + 1}/{STEPS.length}
          </span>

          <div style={{ width: 1, height: 16, background: sep, flexShrink: 0 }} />

          {iconBtn(
            () => { if (stepRef.current > 0) goToStepRef.current(stepRef.current - 1); },
            <ChevronLeft size={13} style={{ color: txt }} />, "Previous step", step === 0,
          )}

          {step < STEPS.length - 1
            ? iconBtn(() => goToStepRef.current(stepRef.current + 1), <ChevronRight size={13} style={{ color: txt }} />, "Next step")
            : iconBtn(close, <ChevronRight size={13} style={{ color: txt }} />, "Finish tour")
          }

          <div style={{ width: 1, height: 16, background: sep, flexShrink: 0 }} />

          {/* Mute toggle */}
          {iconBtn(
            () => {
              mutedRef.current = !mutedRef.current;
              setMuted(mutedRef.current);
              audioRef.current.setMuted(mutedRef.current);
            },
            muted
              ? <VolumeX size={12} style={{ color: txt }} />
              : <Volume2 size={12} style={{ color: txt }} />,
            muted ? "Unmute ambient sound" : "Mute ambient sound",
          )}

          {iconBtn(close, <X size={12} style={{ color: txt }} />, "Close tour")}
        </div>
      </motion.div>
    </>
  );
}
