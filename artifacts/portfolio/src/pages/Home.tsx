import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkExperience } from "@/components/WorkExperience";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <WorkExperience />

      {/* Footer */}
      <footer className="border-t border-border/60 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-[0.833rem] text-muted-foreground"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Designed & built with care — Riya Sharma, 2024
          </span>
          <span
            className="text-[0.694rem] text-muted-foreground/60 uppercase tracking-widest"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            UX Designer · Product Thinker
          </span>
        </div>
      </footer>
    </div>
  );
}
