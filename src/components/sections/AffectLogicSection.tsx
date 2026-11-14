"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Primitive 2: The Affect-Logic Engine.
 *
 * Per Ciompi, affective tension is the primary state variable — NOT symptoms,
 * NOT diagnosis, NOT risk score. The platform's core computational model tracks
 * affective tension and ADJUSTS THE ENVIRONMENT in response.
 *
 * The user sees what the system sees — no surveillance.
 * High tension → UI dims, notifications silence, the Open Window widens.
 * Low tension → workbook unlocks, network circle offered.
 *
 * All inputs are self-reported (user-owned) or behavioral (timing-only, never content).
 * The user can correct any sample.
 */
export function AffectLogicSection() {
  const { currentTension, setCurrentTension } = useAppStore();
  const [history, setHistory] = useState<Array<{ ts: number; tension: number; response: string }>>([]);

  // This preview does not automatically change the environment.
  const getEnvironmentResponse = (): string => {
    return "No automatic environment changes are active in this preview.";
  };

  const logCheckIn = (tension: number) => {
    setCurrentTension(tension);
    const response = getEnvironmentResponse();
    setHistory((prev) => [
      ...prev,
      { ts: Date.now(), tension, response },
    ].slice(-10));
  };

  const tensionColor = (t: number) => {
    if (t <= 3) return "var(--tension-low)";
    if (t <= 6) return "var(--tension-mid)";
    return "var(--tension-high)";
  };

  const tensionLabel = (t: number) => {
    if (t <= 2) return "Calm";
    if (t <= 4) return "Settled";
    if (t <= 6) return "Activated";
    if (t <= 8) return "Elevated";
    return "Overwhelmed";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-light text-foreground/90">Affect-Logic</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg leading-relaxed">
          You can record a self-reported check-in in this page. In this preview, check-ins remain in memory for this visit only; they do not change the interface, trigger actions, or go to a database.
        </p>
      </div>

      {/* Current tension — large, visible, color-coded */}
      <div
        className="rounded-xl border p-6 transition-all duration-1000"
        style={{
          backgroundColor: `color-mix(in oklch, ${tensionColor(currentTension)} 8%, var(--card))`,
          borderColor: `color-mix(in oklch, ${tensionColor(currentTension)} 30%, var(--border))`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Current tension
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: tensionColor(currentTension) }}
          >
            {tensionLabel(currentTension)}
          </span>
        </div>

        <div className="flex items-baseline gap-3 mb-6">
          <span
            className="text-5xl font-light tabular-nums"
            style={{ color: tensionColor(currentTension) }}
          >
            {currentTension}
          </span>
          <span className="text-sm text-muted-foreground">/ 10</span>
        </div>

        {/* The tension bar — smooth, not jarring */}
        <div className="h-2 rounded-full bg-muted/30 overflow-hidden mb-4">
          <div
            className="h-full rounded-full tension-bar"
            style={{
              width: `${currentTension * 10}%`,
              backgroundColor: tensionColor(currentTension),
            }}
          />
        </div>

        {/* What the environment is doing */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Environment response
          </span>
          <div className="text-sm text-foreground/80">
            {getEnvironmentResponse() === "none" ? (
              <span className="text-muted-foreground italic">No automatic changes are made</span>
            ) : (
              <span className="font-mono text-xs">{getEnvironmentResponse(currentTension)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Check-in — 1-tap, not a form */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">How are you right now?</p>
        <div className="flex gap-1.5 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              onClick={() => logCheckIn(n)}
              className="size-10 rounded-lg text-sm transition-all hover:scale-105"
              style={{
                backgroundColor: currentTension === n
                  ? tensionColor(n)
                  : `color-mix(in oklch, ${tensionColor(n)} 15%, var(--muted))`,
                color: currentTension === n ? "var(--background)" : "var(--foreground)",
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground/50">
          <span>calm</span>
          <span>overwhelmed</span>
        </div>
      </div>

      {/* History — user can see AND correct any sample */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Recent check-ins (this visit only)
          </span>
          <span className="text-[10px] text-muted-foreground/50">
            Cleared when you leave this page
          </span>
        </div>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {history.length === 0 && <p className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">No check-ins recorded in this visit.</p>}
          {history.slice().reverse().map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              <div
                className="size-2 rounded-full shrink-0"
                style={{ backgroundColor: tensionColor(h.tension) }}
              />
              <span className="text-sm font-mono tabular-nums">{h.tension}</span>
              <span className="text-xs text-muted-foreground flex-1 truncate">
                {h.response === "none" ? "baseline" : h.response}
              </span>
              <span className="text-[10px] text-muted-foreground/50">
                {new Date(h.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Transparency note */}
      <div className="text-xs text-muted-foreground/60 border-t pt-4 leading-relaxed">
        This is an exploratory self-report control only. Check-ins are held in page memory, not saved to your account. The preview does not monitor behavior, analyze content, calculate risk, or change your environment based on check-ins.
      </div>
    </div>
  );
}
