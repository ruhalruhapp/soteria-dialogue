"use client";

/**
 * Continuity is a design principle for a future staffed service.
 * No facilitator assignment or live continuity workflow is active in this preview.
 */
export function ContinuitySection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-light text-foreground/90">Continuity</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg leading-relaxed">
          Psychological continuity is a design goal for a future staffed service.
          Facilitator assignment and hand-off workflows are not active in this preview.
        </p>
      </div>

      <div className="rounded-xl border border-dashed p-4 space-y-2">
        <p className="text-sm font-medium">No facilitator is assigned.</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          This preview has no staffed companion or clinician service, no assigned
          facilitator pair, and no continuity history. Demonstration names and dates
          have been removed.
        </p>
      </div>

      <div className="rounded-lg border border-dashed p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          If a facilitator must change
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          A future staffed service should introduce any incoming facilitator,
          explain the change, and give the person a meaningful choice. No transfer
          workflow is implemented here.
        </p>
      </div>

      <div className="text-xs text-muted-foreground/60 border-t pt-4 leading-relaxed">
        Psychological continuity is a design principle, not a service currently
        delivered by this prototype.
      </div>
    </div>
  );
}
