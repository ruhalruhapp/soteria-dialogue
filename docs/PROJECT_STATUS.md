# Project status — Vercel preparation

## Completed in this branch
- Vercel-native Next.js output configuration.
- Auth.js database-backed email magic-link authentication wiring.
- Auth.js Resend provider configuration for authentication links.
- Server-side 18+ self-attestation signed with Auth.js secret and checked at sign-in.
- Auth.js Prisma adapter models.
- Pooled and direct PostgreSQL connection configuration.
- Database-aware health endpoint.
- Sign-out control.
- Removed simulated human presence and fabricated sample dialogue/workbook content.
- Disabled unvalidated predictive triage scoring.
- Replaced inaccurate claims about emergency calling and directive enforcement with clear limitations.
- Added launch checklist and setup documentation.

## Not completed / external prerequisites
- No Vercel project has been connected or deployed from this branch yet.
- No Neon database has been created or configured.
- No Resend domain/API key has been configured.
- No database schema has been applied to a live database.
- No build or integration tests have been run in this environment.
- Personal content features are held in page memory only and are not persisted to the authenticated user database.
- Rate limiting, moderation, safeguarding operations, privacy/legal review, and production security testing remain outstanding.

**Do not treat this branch as approved for public launch.**
