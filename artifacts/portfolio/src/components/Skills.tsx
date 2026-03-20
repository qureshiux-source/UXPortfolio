import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PenTool, Palette, Cpu, Users, Layout, CheckCircle, Code, Layers, Package } from "lucide-react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CLUSTERS = [
  {
    group: "Design Tools",
    icon: PenTool,
    skills: [
      { icon: PenTool,   label: "Figma" },
      { icon: Palette,   label: "Adobe XD" },
      { icon: Cpu,       label: "ProtoPie" },
    ],
  },
  {
    group: "Process",
    icon: Users,
    skills: [
      { icon: Users,       label: "User Research" },
      { icon: Layout,      label: "Wireframing" },
      { icon: CheckCircle, label: "Usability Testing" },
    ],
  },
  {
    group: "Code & Handoff",
    icon: Code,
    skills: [
      { icon: Code,    label: "HTML5 & CSS3" },
      { icon: Layers,  label: "Storybook" },
      { icon: Package, label: "React Handoff" },
    ],
  },
];

export function Skills() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && resolvedTheme === "dark";

  const bg          = isDark
    ? "linear-gradient(160deg, #0D0D0D 0%, #131313 50%, #0A0A0A 100%)"
    : "linear-gradient(160deg, #FFFFFF 0%, #F8F8F8 50%, #F2F2F2 100%)";
  const eyebrow     = isDark ? "#848484" : "#595959";
  const titleClr    = isDark ? "#FAFAFA" : "#0A0A0A";
  const clusterBg   = isDark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.025)";
  const clusterBdr  = isDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.09)";
  const groupLbl    = isDark ? "#9A9A9A" : "#4D4D4D";
  const iconClr     = isDark ? "#848484" : "#595959";
  const iconBoxBg   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const iconBoxBdr  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const skillLbl    = isDark ? "#C8C8C8" : "#1A1A1A";
  const skillBg     = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const skillBdr    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const divider     = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const noiseOp     = isDark ? 0.06 : 0.028;

  return (
    <div
      className="transition-colors duration-500"
      style={{
        height: "100vh",
        background: bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: NOISE_SVG,
        backgroundSize: "160px 160px",
        opacity: noiseOp,
        mixBlendMode: "overlay",
      }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isDark
          ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.3) 100%)"
          : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.03) 100%)",
      }} />

      <div style={{
        maxWidth: 860,
        width: "100%",
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(28px, 4vh, 48px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 28, height: 1, background: eyebrow }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.62rem", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: eyebrow,
            }}>
              Technical Stack
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: titleClr, margin: 0,
          }}>
            Skills & Tools
          </h2>
        </div>

        {/* Skill clusters */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px, 2vw, 22px)",
        }}>
          {CLUSTERS.map((cluster) => {
            const GroupIcon = cluster.icon;
            return (
              <div
                key={cluster.group}
                style={{
                  background: clusterBg,
                  border: `1px solid ${clusterBdr}`,
                  borderRadius: 20,
                  padding: "clamp(20px, 2.5vh, 32px) clamp(18px, 2vw, 26px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
                    : "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                {/* Cluster header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 34, height: 34,
                    borderRadius: 10,
                    background: iconBoxBg,
                    border: `1px solid ${iconBoxBdr}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <GroupIcon size={15} style={{ color: iconClr }} />
                  </div>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.8rem", fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: groupLbl,
                  }}>
                    {cluster.group}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: divider }} />

                {/* Skills list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {cluster.skills.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        borderRadius: 11,
                        background: skillBg,
                        border: `1px solid ${skillBdr}`,
                      }}
                    >
                      <Icon size={14} style={{ color: iconClr, flexShrink: 0 }} />
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.83rem", fontWeight: 700,
                        color: skillLbl,
                      }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
