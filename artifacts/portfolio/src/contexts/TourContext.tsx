import { createContext, useContext } from "react";

/** Highlight token emitted by SiteTour for the current sub-step.
 *  Null when no tour is running or the current step targets no specific element.
 *
 *  Format examples:
 *    "work-wired-hub"      → WorkExperience, Wired Hub job
 *    "case-1"              → CaseStudies, card 1
 *    "proj-2"              → Projects, card 2
 *    "skill-ux"            → Skills, Core UX Logic column
 *    "cred-3"              → Credentials, cert id 3
 */
export type TourHighlight = string | null;

export const TourHighlightContext = createContext<TourHighlight>(null);
export const useTourHighlight = () => useContext(TourHighlightContext);
