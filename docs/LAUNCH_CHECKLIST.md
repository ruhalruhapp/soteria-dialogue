# Deployment and public-launch checklist

## Infrastructure
- [ ] Connect this GitHub repository to the intended Vercel account.
- [ ] Create a Neon PostgreSQL project.
- [ ] Add the pooled Neon URL as `DATABASE_URL` and the direct URL as `DIRECT_URL`.
- [ ] Add a unique `AUTH_SECRET` (32+ random characters).
- [ ] Set `AUTH_TRUST_HOST=true`.
- [ ] Verify a sender domain in Resend; set `AUTH_RESEND_KEY` and `EMAIL_FROM`.
- [ ] Apply the Prisma schema and verify `/api/health` reports database connectivity.
- [ ] Configure Preview and Production environment variables separately.

## Authentication and age
- [ ] Test magic-link delivery, expiry, single use, sign-out, and session expiry.
- [ ] Verify that the app cannot be accessed without an authenticated session.
- [ ] Verify that sign-in is blocked unless a fresh signed 18+ attestation cookie is present.
- [ ] Treat the current checkbox as self-attestation only. Obtain legal review and implement proportionate, privacy-preserving age assurance if required by launch jurisdictions.
- [ ] Add rate limiting and abuse protection to age attestation and email sign-in before public launch.

## Data and privacy — blocking gates
- [ ] Implement authenticated, server-side database persistence for every feature that collects personal content.
- [ ] Enforce user ownership in every database query and mutation.
- [ ] Add input validation, authorization tests, CSRF/rate-limit review, audit logging, and secure deletion.
- [ ] Define retention, export, account deletion, backup, and incident-response processes.
- [ ] Publish reviewed Privacy Notice, Terms, safeguarding information, and clear explanation of platform limitations.
- [ ] Never email dialogue, workbook entries, affect notes, directives, or other sensitive content.
- [ ] Review analytics and third-party scripts for sensitive-data leakage.

## Product and safeguarding — blocking gates
- [ ] Do not represent Open Window as live until real, trained human companions and safeguarding operations exist.
- [ ] Keep predictive triage disabled until independent validation, clinical governance, and legal review are complete.
- [ ] Localize crisis-resource wording to each launch jurisdiction; never imply monitoring or emergency dispatch.
- [ ] Establish moderation, abuse reporting, safeguarding escalation, and human support coverage before opening community features.
- [ ] Complete security review and independent penetration testing appropriate to the data handled.

## Release
- [ ] Build and test the preview deployment.
- [ ] Test mobile, keyboard, screen reader, and reduced-motion accessibility.
- [ ] Test backup and recovery procedures.
- [ ] Obtain product, safeguarding, legal, and security sign-off.
- [ ] Only then promote the reviewed deployment to Production and open registration.
