# Amaburland — Supabase → plain Postgres cutover

**Shape:** A — shimmed `@supabase/supabase-js` → app `/rest/v1`, `/auth/v1`, `/storage/v1` + `DATABASE_URL`  
**Branch:** `staging/plain-postgres`  
**Coolify staging:** `amaburland-staging` (`jfxnjmh0sfd0j78y7py6b7ks`)  
**Staging URL:** https://amaburland-staging.169-58-8-203.sslip.io

See also: store hardening playbook in the big-vps workspace (`STORE_HARDENING_PLAYBOOK.md`).

## Env cutover trio (already on staging Coolify — set together)

| Variable | Notes |
|----------|--------|
| `DATABASE_URL` | `postgresql://…@fleet-postgres:5432/store_amaburland` (or project DB name) |
| `NEXT_PUBLIC_USE_PLAIN_PG` | `true` |
| `NEXT_PUBLIC_SUPABASE_URL` | Staging app origin (sslip.io), **not** `*.supabase.co` |

Also usually required: JWT secrets, `NEXT_PUBLIC_APP_URL`, `STORAGE_ROOT` / `STORAGE_PUBLIC_URL`, Resend + payment keys.

## Hardening notes (Jul 2026)

- [x] Phase A: `public/service-worker.js` `sw-v2.5-amaburland`, `lib/format-money.ts`, `app/error.tsx`, `app/admin/error.tsx`
- [x] Phase B: `images.unoptimized: true`; drop `*.supabase.co` / `via.placeholder.com` remotePatterns
- [x] Money sweep in `app/` + `components/` storefront/admin UI
- [x] Cron payment reminders → `supabaseAdmin`
- [x] Order history: Track (with email), Reorder, Invoice page, Help query params

## Verify (staging)

```bash
BASE=https://amaburland-staging.169-58-8-203.sslip.io
curl -s -o /dev/null -w "%{http_code}\n" "$BASE/"
curl -s -o /dev/null -w "%{http_code}\n" "$BASE/shop"
curl -s -o /dev/null -w "%{http_code}\n" "$BASE/api/storefront/categories"
curl -s "$BASE/service-worker.js" | head -n 3
```

Expected: HTTP 200 on routes above; service worker line 2 contains `sw-v2.5-amaburland`.
