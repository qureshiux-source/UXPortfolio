import { useEffect, useState } from "react";

export function useBreakpoint(breakpoint = 640) {
  const [below, setBelow] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const handler = () => setBelow(window.innerWidth < breakpoint);
    handler();
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return below;
}
