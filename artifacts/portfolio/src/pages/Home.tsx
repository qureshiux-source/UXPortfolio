import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkExperience } from "@/components/WorkExperience";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground/10">
      <Navbar />
      <Hero />
      <WorkExperience />

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{
          borderColor: "rgba(0,0,0,0.07)",
          background: "#F5F5F5",
        }}
      >
        <div
          className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <span
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.833rem",
              color: "#888888",
            }}
          >
            Designed & built with care — Riya Sharma, 2024
          </span>
          <span
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.579rem",
              color: "#BBBBBB",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            UX Designer · Product Thinker
          </span>
        </div>
      </footer>
    </div>
  );
}
