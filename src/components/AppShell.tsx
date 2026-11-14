import { useAppStore } from "@/lib/store";
import { signOut } from "next-auth/react";
import { Nav } from "@/components/shell/Nav";
import { ArrivalSection } from "@/components/sections/ArrivalSection";
import { OpenWindowSection } from "@/components/sections/OpenWindowSection";
import { AffectLogicSection } from "@/components/sections/AffectLogicSection";
import { TrialogueSection } from "@/components/sections/TrialogueSection";
import { TriageSection } from "@/components/sections/TriageSection";
import { ContinuitySection } from "@/components/sections/ContinuitySection";
import { DirectiveSection } from "@/components/sections/DirectiveSection";
import { WorkbookSection } from "@/components/sections/WorkbookSection";

export function AppShell({ userEmail }: { userEmail: string }) {
  const section = useAppStore((s) => s.section);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="mx-auto mt-4 w-full max-w-3xl rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-xs leading-relaxed text-amber-100/80">Private preview: dialogue, workbook notes, and preferences are not yet saved to your account database. Please do not enter sensitive or identifying information.</div>
      <div className="mx-auto flex w-full max-w-3xl items-center justify-end px-6 text-[11px] text-muted-foreground">{userEmail}<button onClick={() => signOut({ callbackUrl: "/" })} className="ml-3 underline">Sign out</button></div>
      <main className="flex-1 container max-w-3xl mx-auto p-6 sm:p-8 lg:p-12 soft-fade" key={section}>
        {section === "arrival" && <ArrivalSection />}
        {section === "window" && <OpenWindowSection />}
        {section === "affect" && <AffectLogicSection />}
        {section === "trialogue" && <TrialogueSection />}
        {section === "triage" && <TriageSection />}
        {section === "continuity" && <ContinuitySection />}
        {section === "directive" && <DirectiveSection />}
        {section === "workbook" && <WorkbookSection />}
      </main>
      <footer className="border-t border-border/20 py-3 px-4">
        <div className="container max-w-3xl mx-auto flex items-center justify-between text-[10px] text-muted-foreground/40">
          <span>Soteria Dialogue — Being With</span>
          <span>This is not an emergency service. If you are in immediate danger, contact local emergency services or a trusted local crisis resource.</span>
        </div>
      </footer>
    </div>
  );
}
