"use client";

export function OpenWindowSection() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-7 text-center">
      <div className="space-y-3 max-w-md"><h2 className="text-xl font-light text-foreground/90">The Open Window</h2><p className="text-sm leading-relaxed text-muted-foreground">A quiet space intended for human co-presence. A real companion connection is not yet available in this preview.</p></div>
      <div className="size-32 rounded-full border border-border/50 bg-muted/20 flex items-center justify-center"><div className="size-20 rounded-full bg-muted/40" /></div>
      <div className="max-w-sm rounded-lg border border-border/50 p-4"><p className="text-sm font-medium">No companion is connected.</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">The timer-based demonstration has been removed so the interface will not imply that a real person is present. No session is active and no one is monitoring this screen.</p></div>
    </div>
  );
}
