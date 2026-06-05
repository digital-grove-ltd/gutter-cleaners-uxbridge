# Trade to schema.org @type Map

Use this table when configuring the `@type` for a LocalBusiness schema in any trade website project.

| Trade | @type | Notes |
|---|---|---|
| Gutter Cleaning | `["LocalBusiness","HomeAndConstructionBusiness"]` | No specific GutterCleaner type in schema.org |
| Plumber | `["LocalBusiness","Plumber"]` | Direct schema.org type |
| Electrician | `["LocalBusiness","Electrician"]` | Direct schema.org type |
| Roofer | `["LocalBusiness","RoofingContractor"]` | |
| Painter | `["LocalBusiness","PaintingContractor"]` | |
| Builder | `["LocalBusiness","GeneralContractor"]` | |
| Landscaper | `["LocalBusiness","LandscapeService"]` | |
| Window Cleaner | `["LocalBusiness","HomeAndConstructionBusiness"]` | No specific type in schema.org |
| Locksmith | `["LocalBusiness","Locksmith"]` | Direct schema.org type |
| Pest Control | `["LocalBusiness","PestControl"]` | Direct schema.org type |

## Notes on multi-type arrays

Schema.org supports multiple `@type` values as an array. This is the recommended pattern when a business fits a broader category but no specific sub-type exists. Google accepts array `@type` values.

The `HomeAndConstructionBusiness` type is the correct parent for trades that involve work on residential buildings but do not have a more specific schema.org sub-type (e.g. gutter cleaning, window cleaning, damp proofing).

## Schema.org reference

- Full type hierarchy: https://schema.org/LocalBusiness
- HomeAndConstructionBusiness: https://schema.org/HomeAndConstructionBusiness
