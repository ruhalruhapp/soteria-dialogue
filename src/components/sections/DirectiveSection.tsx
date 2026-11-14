"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

/**
 * Primitive 6: Non-Coercion as Architecture — the Advance Directive.
 *
 * Per user's choice (B): The platform CAN trigger involuntary intervention,
 * but ONLY if the user has EXPLICITLY pre-authorized it for specific situations.
 *
 * The platform is architecturally incapable of coercion outside these
 * pre-authorized situations. No "duty to warn" override. No silent escalation.
 *
 * The user writes their own rules — in their own words.
 */

interface Directive {
  anyInterventionAuthorized: boolean;
  authorizeCrisisLine: boolean;
  authorizeEmergencyServices: boolean;
  authorizeNotificationOfNetwork: boolean;
  authorizePhysicalTransition: boolean;
  preferences: string;
}

const DEFAULT_DIRECTIVE: Directive = {
  anyInterventionAuthorized: false,
  authorizeCrisisLine: false,
  authorizeEmergencyServices: false,
  authorizeNotificationOfNetwork: false,
  authorizePhysicalTransition: false,
  preferences: "",
};

export function DirectiveSection() {
  const { directiveCompleted, setDirectiveCompleted } = useAppStore();
  const [directive, setDirective] = useState<Directive>(DEFAULT_DIRECTIVE);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setDirectiveCompleted(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key: keyof Directive, value: boolean | string) => {
    setDirective((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-light text-foreground/90">Advance Directive</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg leading-relaxed">
          This prototype lets you record preferences. These selections are held only in page memory for this visit and are not enforced by the server or connected to an emergency response service.
        </p>
      </div>

      {/* The core question */}
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => {
              const val = !directive.anyInterventionAuthorized;
              setDirective({
                ...directive,
                anyInterventionAuthorized: val,
                authorizeCrisisLine: val ? directive.authorizeCrisisLine : false,
                authorizeEmergencyServices: val ? directive.authorizeEmergencyServices : false,
                authorizeNotificationOfNetwork: val ? directive.authorizeNotificationOfNetwork : false,
                authorizePhysicalTransition: val ? directive.authorizePhysicalTransition : false,
              });
            }}
            className={`mt-0.5 size-5 rounded border-2 transition-all shrink-0 ${
              directive.anyInterventionAuthorized
                ? "bg-primary border-primary"
                : "border-muted-foreground/40"
            }`}
            aria-label="Authorize any involuntary intervention"
          >
            {directive.anyInterventionAuthorized && (
              <svg className="w-full h-full text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div>
            <p className="text-sm font-medium">
              I authorize the platform to take involuntary action in specific situations I define below.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              If unchecked, the platform will NEVER trigger any intervention without your explicit in-the-moment request.
            </p>
          </div>
        </div>
      </div>

      {/* Specific authorizations — only visible if anyIntervention is checked */}
      {directive.anyInterventionAuthorized && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            Specific situations I authorize
          </div>
          {[
            { key: "authorizeCrisisLine" as const, label: "Show a crisis support resource", desc: "A future version may display locally appropriate support resources." },
            { key: "authorizeEmergencyServices" as const, label: "Contact local emergency services", desc: "This is not implemented. The prototype cannot place emergency calls." },
            { key: "authorizeNotificationOfNetwork" as const, label: "Notify my social network", desc: "This is not implemented. The prototype cannot contact your network." },
            { key: "authorizePhysicalTransition" as const, label: "Recommend physical micro-house", desc: "This is not implemented. The prototype cannot arrange a physical transition." },
          ].map((item) => (
            <div key={item.key} className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-muted/20">
              <button
                onClick={() => update(item.key, !directive[item.key])}
                className={`mt-0.5 size-4 rounded border-2 transition-all shrink-0 ${
                  directive[item.key] ? "bg-primary border-primary" : "border-muted-foreground/40"
                }`}
              >
                {directive[item.key] && (
                  <svg className="w-full h-full text-primary-foreground" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.364 3.636a1 1 0 010 1.414l-6.364 6.364a1 1 0 01-1.414 0L2.636 8.464a1 1 0 011.414-1.414l2.575 2.575 5.657-5.657a1 1 0 011.414 0z" />
                  </svg>
                )}
              </button>
              <div>
                <p className="text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* User's own words — their preferences in their language */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Your words (optional)
        </div>
        <p className="text-xs text-muted-foreground/70">
          What helps you? What doesn&apos;t? What should the platform know about
          your preferences? Write in your own words.
        </p>
        <textarea
          value={directive.preferences}
          onChange={(e) => update("preferences", e.target.value)}
          placeholder="e.g., 'Don't call my mom — call my partner instead. I need quiet, not advice. When I'm overwhelmed, just be there.'"
          rows={5}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none"
        />
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Keep for this visit
        </button>
        {directiveCompleted && (
          <span className="text-xs text-muted-foreground">
            Kept in page memory only
          </span>
        )}
        {saved && (
          <span className="text-xs text-primary">
            Directive updated
          </span>
        )}
      </div>

      {/* The architectural guarantee */}
      <div className="rounded-lg border border-dashed p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">
          Important limitation
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          These preferences are not a legally binding advance directive and do not control emergency services, clinicians, or other people. No intervention, notification, or emergency call is currently implemented by this prototype.
        </p>
        <p className="text-xs text-muted-foreground/60 leading-relaxed">
          Do not rely on this screen as a safety plan. If you need urgent help, contact local emergency services or a trusted local crisis resource.
        </p>
      </div>
    </div>
  );
}
