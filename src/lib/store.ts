import { create } from "zustand";

export type Section = "arrival" | "window" | "affect" | "trialogue" | "triage" | "workbook" | "directive" | "continuity";

export interface AppState {
  section: Section;
  setSection: (s: Section) => void;
  onboarded: boolean;
  ageVerified: boolean;
  setAgeVerified: (v: boolean) => void;
  completeOnboarding: () => void;
  currentTension: number;
  setCurrentTension: (t: number) => void;
  windowOpen: boolean;
  companionPresent: boolean;
  setWindowOpen: (v: boolean) => void;
  setCompanionPresent: (v: boolean) => void;
  directiveCompleted: boolean;
  setDirectiveCompleted: (v: boolean) => void;
}

// Deliberately in-memory only: this preview must not persist personal or affective data in browser storage.
export const useAppStore = create<AppState>()((set) => ({
  section: "arrival",
  setSection: (section) => set({ section }),
  onboarded: false,
  ageVerified: false,
  setAgeVerified: (ageVerified) => set({ ageVerified }),
  completeOnboarding: () => set({ onboarded: true }),
  currentTension: 5,
  setCurrentTension: (currentTension) => set({ currentTension }),
  windowOpen: false,
  companionPresent: false,
  setWindowOpen: (windowOpen) => set({ windowOpen }),
  setCompanionPresent: (companionPresent) => set({ companionPresent }),
  directiveCompleted: false,
  setDirectiveCompleted: (directiveCompleted) => set({ directiveCompleted }),
}));
