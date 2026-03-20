import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkExperience } from "@/components/WorkExperience";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Scroll-snap container — each section = one full viewport */}
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {/* Section 1: Hero */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <Hero />
        </section>

        {/* Section 2: Work Experience */}
        <section style={{ scrollSnapAlign: "start", scrollSnapStop: "always", height: "100vh" }}>
          <WorkExperience />
        </section>

        {/* Section 3: Footer snap target */}
        <section
          style={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#F5F5F5",
            gap: 8,
          }}
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
              color: "#CCCCCC",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            UX Designer · Product Thinker
          </span>
        </section>
      </div>
    </>
  );
}
