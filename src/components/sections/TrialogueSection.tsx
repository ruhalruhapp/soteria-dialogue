"use client";

import { useState } from "react";

interface Perspective {
  id: string;
  statement: string;
  ts: number;
}

export function TrialogueSection() {
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [newStatement, setNewStatement] = useState("");

  const addPerspective = () => {
    if (!newStatement.trim()) return;
    setPerspectives((current) => [
      ...current,
      { id: crypto.randomUUID(), statement: newStatement.trim(), ts: Date.now() },
    ]);
    setNewStatement("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-light text-foreground/90">Trialogue</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg leading-relaxed">
          A dialogue format designed to preserve different perspectives without
          forcing them into one account. Group invitations, participant verification,
          and live sessions are not available in this preview.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        Only you can add a personal reflection here. Entries remain in page memory
        for this visit and are not saved to your account.
      </p>

      <div className="space-y-3">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Your reflections
        </div>
        {perspectives.length === 0 && (
          <p className="rounded-lg border border-dashed p-4 text-xs text-muted-foreground">
            No reflections have been added in this visit.
          </p>
        )}
        {perspectives.map((perspective) => (
          <div key={perspective.id} className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">You</span>
              <span className="text-[10px] text-muted-foreground/50">
                {new Date(perspective.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{perspective.statement}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-lg border border-dashed p-4">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Add your reflection
        </div>
        <textarea
          placeholder="What would you like to put into words?"
          value={newStatement}
          onChange={(event) => setNewStatement(event.target.value)}
          rows={3}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none"
        />
        <button
          onClick={addPerspective}
          disabled={!newStatement.trim()}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm disabled:opacity-40"
        >
          Add reflection for this visit
        </button>
      </div>
    </div>
  );
}
