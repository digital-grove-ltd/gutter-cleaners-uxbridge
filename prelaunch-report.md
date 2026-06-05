# Prelaunch Audit Report — Gutter Cleaners Uxbridge
**Date:** 2026-06-05
**Site:** https://www.guttercleanersuxbridge.co.uk
**Project:** /Users/stevewyman/Desktop/GUTTER CLEANERS UXBRIDGE

---

## CHECK 1 — NAP Consistency ✓ GREEN

- **Phone:** `null` in site-config.json (form-only by design) — intentionally GREEN
- **Header.astro:** "Gutter Cleaners Uxbridge" confirmed present
- **Footer.astro:** "Gutter Cleaners Uxbridge" confirmed present
- **Layout.astro:** `SITE_NAME = "Gutter Cleaners Uxbridge"` confirmed
- **llms.txt:** Business name confirmed in heading and body
- **schema.ts:** LocalBusiness schema confirmed present
- **wrangler.toml name:** `gutter-cleaners-uxbridge` — matches business

---

## CHECK 2 — Placeholder Leak Audit ✗ RED (2 issues)

### Issue 2a — Fake phone number `01895 000 000` in live UI (RED)
Despite `phone: null` in site-config.json, a hardcoded placeholder phone number appears in **visible UI components**:

| File | Context |
|------|---------|
| `src/components/Header.astro:18` | Top bar: "Call Us Today: 01895 000 000" |
| `src/components/Footer.astro:107` | Footer tel link: `href="tel:+441895000000"` |
| `src/components/Footer.astro:25` | Schema itemprop telephone |
| `src/components/QuoteForm.tsx` | Error toast fallback message |
| `src/pages/services/fascia-soffit-cleaning.astro` | Two CTA buttons |

**Action:** Remove all hardcoded phone references from Header, Footer, QuoteForm, and service pages. Replace with form-only CTA copy or omit the phone element entirely since `contactMethod` is `form-only`.

### Issue 2b — `example.com` URLs in BreadcrumbList JSON-LD (RED)
4 location sub-pages contain `"item": "https://example.com"` in BreadcrumbList structured data:

- `src/pages/locations/uxbridge/gutter-cleaning.astro`
- `src/pages/locations/uxbridge/gutter-replacement.astro`
- `src/pages/locations/uxbridge/gutter-repairs.astro`
- `src/pages/locations/uxbridge/fascia-soffit-cleaning.astro`

**Action:** Replace all `https://example.com` breadcrumb item URLs with `https://www.guttercleanersuxbridge.co.uk` (with appropriate path suffixes).

### Issue 2c — `hakuto:page-info` postMessage in Layout.astro ⚠ ORANGE
`src/layouts/Layout.astro:91` contains a `window.parent.postMessage({ type: 'hakuto:page-info' ... })` call — internal builder tooling that should not be in production output.

**Action:** Remove or guard this postMessage call behind a dev/preview environment check before deploy.

### Issue 2d — `john@example.com` placeholder in QuoteForm ⚠ ORANGE
`src/components/QuoteForm.tsx` uses `placeholder="john@example.com"` for the email input.

**Action:** Replace with a neutral placeholder such as `your@email.com` or `Email address`.

---

## CHECK 3 — Trailing Slash Hygiene ✗ RED

Astro config sets `trailingSlash: "always"` but **68 out of ~318 internal `href` links are missing trailing slashes**, causing unnecessary 308 redirects on every visit to those pages.

Examples of missing trailing slashes:
- `href="/contact"` → should be `href="/contact/"`
- `href="/services/gutter-cleaning"` → should be `href="/services/gutter-cleaning/"`
- `href="/locations/uxbridge/gutter-repairs"` → should be `href="/locations/uxbridge/gutter-repairs/"`
- `href="/blog"` → should be `href="/blog/"`

**Action:** Do a global find-and-replace: `href="/([^"#][^"]*[^/"])"` → `href="/$1/"` across all `.astro` files (excluding anchor/hash links and root `/`). Or set `trailingSlash: "ignore"` in astro.config.mjs if you prefer Cloudflare to handle it.

---

## CHECK 4 — Schema Presence ✓ GREEN

`LocalBusiness`, `FAQPage`, and/or `BreadcrumbList` JSON-LD confirmed on:
- `src/pages/index.astro`
- `src/pages/services/gutter-cleaning.astro`

---

## CHECK 5 — Asset Path Audit ✓ GREEN

No `src/assets` paths found in the built `dist/` output.

---

## CHECK 6 — robots.txt ✓ GREEN

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://www.guttercleanersuxbridge.co.uk/sitemap-index.xml
```

Correct domain, sitemap pointed at production URL, `/api/` blocked.

---

## CHECK 7 — llms.txt Customised ✓ GREEN

File opens with `# Gutter Cleaners Uxbridge` and contains accurate business description, services, and service area. Fully customised.

---

## CHECK 8 — Analytics ✗ RED

No Google Analytics (GA4), Google Tag Manager, Plausible, or any other analytics script was found in `src/`. The site will go live with zero traffic tracking.

**Action:** Add analytics before launch. Recommended options:
1. Plausible (privacy-friendly, recommended for UK/GDPR): add `<script defer data-domain="guttercleanersuxbridge.co.uk" src="https://plausible.io/js/script.js"></script>` to `Layout.astro`
2. GA4: add gtag snippet with your `G-XXXXXXXXXX` measurement ID

---

## CHECK 9 — Deploy Readiness ✓ GREEN (with notes)

| Item | Value | Status |
|------|-------|--------|
| wrangler.toml `name` | `gutter-cleaners-uxbridge` | GREEN |
| D1 `database_id` | `41cb394c-1cdb-43e8-b59d-6e97450878c9` | GREEN |
| astro.config.mjs `site` | `https://www.guttercleanersuxbridge.co.uk` | GREEN |
| GitHub Actions workflow | `build.yml` present | GREEN |

---

## CHECK 10 — Build Status ✓ GREEN

`dist/` directory exists with `dist/server/` and `dist/dist/` structure. Build output present. No `dist/dist/client/` directory indicates Cloudflare Workers SSR output structure (expected).

---

## CHECK 11 — Image Completeness ✓ GREEN

10 hero images present in `public/images/`:

| Image | Size |
|-------|------|
| about-hero.jpg | 179 KB |
| areas-hero.jpg | 429 KB |
| blog-hero.jpg | 163 KB |
| fascia-soffit-hero.jpg | 184 KB |
| gutter-cleaning-hero.jpg | 153 KB |
| gutter-repairs-hero.jpg | 82 KB |
| gutter-replacement-hero.jpg | 154 KB |
| homepage-hero.jpg | 170 KB |
| locations-hero.jpg | 429 KB |
| services-hero.jpg | 83 KB |

Note: `areas-hero.jpg` and `locations-hero.jpg` are 429 KB each — consider compressing to under 200 KB for Core Web Vitals.

---

## CHECK 12 — Privacy Policy & Terms Pages ✗ RED

Neither `src/pages/privacy-policy.astro` nor `src/pages/terms.astro` exist. However, Footer links to both `/privacy-policy` and `/terms` — these will return 404 on live site.

**Action:** Create both pages before launch. As a UK business, a Privacy Policy is legally required under UK GDPR. Minimum content: data collected, how it's used, contact details, cookie policy.

---

## Summary

| # | Check | Status |
|---|-------|--------|
| 1 | NAP Consistency | ✓ GREEN |
| 2a | Fake phone `01895 000 000` in UI | ✗ RED |
| 2b | `example.com` in BreadcrumbList JSON-LD | ✗ RED |
| 2c | `hakuto:page-info` postMessage in Layout | ⚠ ORANGE |
| 2d | `john@example.com` placeholder | ⚠ ORANGE |
| 3 | Trailing slash hygiene (68 violations) | ✗ RED |
| 4 | Schema on key pages | ✓ GREEN |
| 5 | No src/assets in dist | ✓ GREEN |
| 6 | robots.txt | ✓ GREEN |
| 7 | llms.txt customised | ✓ GREEN |
| 8 | Analytics | ✗ RED |
| 9 | Deploy readiness | ✓ GREEN |
| 10 | Build status | ✓ GREEN |
| 11 | Images (size warning) | ⚠ ORANGE |
| 12 | Privacy Policy & Terms pages | ✗ RED |

### RED — Must fix before launch (5 items)
1. **Fake phone number** — Remove `01895 000 000` from Header, Footer, QuoteForm, service pages
2. **example.com in JSON-LD** — Replace in 4 uxbridge location pages
3. **Trailing slashes** — Fix 68 href links missing trailing slash
4. **Analytics** — Add GA4 or Plausible before going live
5. **Privacy Policy & Terms** — Create both pages (legally required in UK)

### ORANGE — Fix before launch or shortly after (3 items)
1. **hakuto:page-info postMessage** — Remove builder-tooling code from Layout.astro
2. **Email placeholder** — Replace `john@example.com` in QuoteForm
3. **Large hero images** — Compress areas-hero.jpg and locations-hero.jpg from 429 KB
