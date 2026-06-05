# Schema Validation Checklist — Gutter Cleaners Uxbridge

Use this checklist after each deployment to verify structured data is valid and eligible for rich results in Google Search.

## Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Google Search Console**: https://search.google.com/search-console (Enhancements > Rich results)

---

## Pages to Test

### Homepage
- URL: `https://www.guttercleanersuxbridge.co.uk/`
- Expected schema types: `LocalBusiness` (multi-type with `HomeAndConstructionBusiness`), `FAQPage`
- Rich Results Test URL: https://search.google.com/test/rich-results?url=https://www.guttercleanersuxbridge.co.uk/
- [ ] LocalBusiness detected
- [ ] FAQPage detected — eligible for FAQ rich result
- [ ] No errors in Rich Results Test
- [ ] `@id` present: `https://www.guttercleanersuxbridge.co.uk/#business`

### Blog Posts (sample)
- URL: `https://www.guttercleanersuxbridge.co.uk/blog/[slug]/`
- Expected schema types: `BlogPosting`
- [ ] `headline`, `datePublished`, `author`, `publisher` all present
- [ ] `image` present (required for rich result eligibility)
- [ ] No errors

### Location Service Pages (sample)

#### Uxbridge — Gutter Cleaning
- URL: `https://www.guttercleanersuxbridge.co.uk/locations/uxbridge/gutter-cleaning/`
- Expected schema types: `Service`, `FAQPage`, `BreadcrumbList`
- Rich Results Test URL: https://search.google.com/test/rich-results?url=https://www.guttercleanersuxbridge.co.uk/locations/uxbridge/gutter-cleaning/
- [ ] Service detected with `provider` linking to `#business` `@id`
- [ ] FAQPage detected
- [ ] BreadcrumbList detected — 4 items, correct URLs
- [ ] No errors

#### Harrow — Gutter Cleaning
- URL: `https://www.guttercleanersuxbridge.co.uk/locations/harrow/gutter-cleaning/`
- Expected schema types: `Service`, `FAQPage`, `BreadcrumbList`
- Rich Results Test URL: https://search.google.com/test/rich-results?url=https://www.guttercleanersuxbridge.co.uk/locations/harrow/gutter-cleaning/
- [ ] Service detected
- [ ] FAQPage detected
- [ ] BreadcrumbList detected
- [ ] No errors

---

## Common Issues to Watch For

| Issue | Fix |
|---|---|
| `@type` array not recognised | Ensure it is a JSON array, not a string |
| FAQPage not showing in Rich Results | Each `Question` must have `acceptedAnswer` with `Answer` type |
| BreadcrumbList items missing `item` property | `item` (not `url`) is the required property on `ListItem` |
| BlogPosting missing image | Add `image` property — required for article rich results |
| LocalBusiness `sameAs` empty array warning | Empty array is valid; populate with Google Business Profile URL when available |

---

## Notes

- The sitewide `@id` (`https://www.guttercleanersuxbridge.co.uk/#business`) is referenced by `provider` on all `Service` schemas. This creates a Knowledge Graph entity connection.
- When a Google Business Profile is created, add its URL to the `sameAs` array in `sitewideLocalBusiness()` in `src/lib/schema.ts`.
- Phone number is currently `null` in `site-config.json`. Add it to the LocalBusiness schema once available to unlock call-button rich results.
