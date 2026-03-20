import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PenTool, Palette, Cpu, Users, Layout, CheckCircle, Code, Layers, Package } from "lucide-react";

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

  const bg         = isDark ? "#111111" : "#F8F8F8";
  const eyebrow    = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)";
  const titleClr   = isDark ? "#F5F5F5" : "#0D0D0D";
  const clusterBg  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const clusterBdr = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const groupLbl   = isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)";
  const iconClr    = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  const skillLbl   = isDark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.68)";
  const skillBg    = isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.045)";
  const skillBdr   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.065)";
  const divider    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

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
      }}
    >
      <div style={{
        maxWidth: 860,
        width: "100%",
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 72px)",
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
                  borderRadius: 18,
                  padding: "clamp(20px, 2.5vh, 30px) clamp(18px, 2vw, 26px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {/* Cluster header */}
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: 9,
                    background: skillBg,
                    border: `1px solid ${skillBdr}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <GroupIcon size={15} style={{ color: iconClr }} />
                  </div>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.78rem", fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: groupLbl,
                  }}>
                    {cluster.group}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: divider }} />

                {/* Skills list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cluster.skills.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        borderRadius: 10,
                        background: skillBg,
                        border: `1px solid ${skillBdr}`,
                      }}
                    >
                      <Icon size={14} style={{ color: iconClr, flexShrink: 0 }} />
                      <span style={{
                        fontFamily: "'Raleway', sans-serif",
                        fontSize: "0.82rem", fontWeight: 700,
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
