# Soteria Dialogue — Being With

Soteria Dialogue is an early-stage, adult-only digital platform concept inspired by Soteria and Open Dialogue principles.

## Current status

This repository contains a **private preview foundation**, not a production-ready mental-health or crisis service.

Implemented on `vercel-production-setup`:
- Next.js application configured for Vercel native deployment output.
- Auth.js email magic-link authentication using Resend.
- Server-checked, short-lived signed attestation that the person is at least 18.
- Prisma schema additions for Auth.js and pooled/direct PostgreSQL URLs.
- Health endpoint that checks database connectivity.
- Removal of simulated companion presence, fabricated dialogue/workbook examples, and unvalidated predictive triage scoring.
- Clear notices where user content is not yet persisted in the account database.

## Important limitations

- The 18+ check is self-attestation, not independent identity or age verification. Legal review and proportionate age assurance may be required before public launch.
- Dialogue, workbook, affect, and directive features are not yet connected to account-backed database persistence.
- Open Window does not connect to a real peer companion.
- Triage predictions are disabled.
- This is not an emergency response service, medical service, or clinical decision-support system.
- Do not enter sensitive or identifying information into the preview until data persistence, access controls, retention, deletion, incident response, and privacy review are complete.

## Stack

- Next.js App Router, React, TypeScript
- Prisma ORM with PostgreSQL
- Auth.js email magic links
- Resend for sign-in email
- Vercel hosting
- Neon PostgreSQL (recommended)

## Local development

Use Node.js 22 or later and npm:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in required environment variables before testing authentication or database access.

## Required environment variables

- `DATABASE_URL`: Neon pooled PostgreSQL connection string (host contains `-pooler`; include `sslmode=require&pgbouncer=true`).
- `DIRECT_URL`: Neon direct PostgreSQL connection string for Prisma schema operations.
- `AUTH_SECRET`: unique random secret of at least 32 characters.
- `AUTH_TRUST_HOST=true`
- `AUTH_RESEND_KEY`: Resend API key.
- `EMAIL_FROM`: sender address on a domain verified in Resend.

Never place real credentials in GitHub or in chat.

## Database setup

After creating the Neon database and adding both connection strings to your environment, run:

```bash
npx prisma db push
```

For production, review schema changes and establish a versioned migration workflow before opening public registration. Do not use `db push --accept-data-loss` in production.

## Vercel deployment

1. Connect this GitHub repository to Vercel.
2. Select `vercel-production-setup` for the initial preview.
3. Add required environment variables to Vercel Preview and Production environments.
4. Confirm the Neon schema is applied.
5. Deploy a preview and test authentication, age attestation, database health, sign-out, and error handling.
6. Keep public registration closed until `docs/LAUNCH_CHECKLIST.md` is complete.

Vercel automatically creates deployments from connected Git branches. Promote to Production only after the preview passes review.

## Safety and privacy

See `docs/LAUNCH_CHECKLIST.md` before any public launch. The platform must remain transparent about what is and is not operational. Sensitive dialogue and personal notes must never be sent through email.
