"use client";

import { useAppStore } from "@/lib/store";

/**
 * The Arrival page — the "front door" of the platform.
 *
 * Per Open Dialogue's "Immediate Help" principle: rapid response initiated
 * within 24 hours of first contact. The front door is instant — no waiting room,
 * no forms, no intake process. Just arrival.
 *
 * Low-stimulation, dark, calm. The first impression should feel like entering
 * a dim room with warm light, not a clinical intake.
 */
export function ArrivalSection() {
  const setSection = useAppStore((s) => s.setSection);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12 soft-fade">
      {/* The breathing circle — the visual identity of the platform */}
      <div className="flex flex-col items-center gap-6">
        <div className="size-32 rounded-full bg-primary/10 flex items-center justify-center window-glow">
          <div className="size-20 rounded-full bg-primary/20 breathe-anim" />
        </div>
        <div className="text-center space-y-2 max-w-md">
          <h1 className="text-2xl font-light text-foreground/90">
            You&apos;ve arrived.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a space for being with — not fixing, not diagnosing, not rushing. Human companion connections and invited group dialogue are not yet available in this preview.
          </p>
        </div>
      </div>

      {/* Entry points — the primary paths through the platform */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
        <button
          onClick={() => setSection("window")}
          className="rounded-xl border border-border/50 p-5 text-left hover:border-primary/40 hover:bg-primary/5 transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">◡</span>
            <span className="text-sm font-medium">Open the Window</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A quiet space designed for human co-presence. No companion is connected in this preview.
          </p>
        </button>

        <button
          onClick={() => setSection("trialogue")}
          className="rounded-xl border border-border/50 p-5 text-left hover:border-primary/40 hover:bg-primary/5 transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">△</span>
            <span className="text-sm font-medium">Start a Trialogue</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Explore the dialogue format. Invited participants and live group sessions are not yet connected.
          </p>
        </button>

        <button
          onClick={() => setSection("triage")}
          className="rounded-xl border border-border/50 p-5 text-left hover:border-primary/40 hover:bg-primary/5 transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">◈</span>
            <span className="text-sm font-medium">Triage</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This section is disabled. No predictive assessment or care recommendation is provided.
          </p>
        </button>

        <button
          onClick={() => setSection("directive")}
          className="rounded-xl border border-border/50 p-5 text-left hover:border-primary/40 hover:bg-primary/5 transition-all group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">◆</span>
            <span className="text-sm font-medium">Advance Directive</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Explore preference settings. They are not enforced by the platform in this preview.
          </p>
        </button>
      </div>

      {/* The lineage — the theoretical grounding */}
      <div className="max-w-lg text-center space-y-2 pt-8 border-t border-border/20">
        <p className="text-xs text-muted-foreground/60 leading-relaxed">
          A developing digital concept informed by Soteria, Affect-Logic, and Open Dialogue. This preview does not yet provide those human services.
        </p>
        <p className="text-[10px] text-muted-foreground/40">
          Prototype preview · no clinical outcomes or prediction claims
        </p>
      </div>
    </div>
  );
}
