"use client";

export function TriageSection() {
  return (
    <div className="max-w-lg space-y-5">
      <div><h2 className="text-xl font-light text-foreground/90">Triage</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">This section is not active in the preview.</p></div>
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 space-y-2">
        <p className="text-sm font-medium text-foreground/90">Predictive scoring has been disabled.</p>
        <p className="text-sm leading-relaxed text-muted-foreground">The previous prototype calculated a score using approximate weights and displayed an accuracy claim. That calculation has not been independently validated for this platform or its users. It must not be used to estimate an individual’s response, diagnose, or recommend a care pathway.</p>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground/70">A future version may provide an evidence-reviewed, clinically governed, and independently validated decision-support resource. Until then, this platform does not generate risk or responder predictions.</p>
    </div>
  );
}
