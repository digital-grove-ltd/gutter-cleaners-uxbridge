# Hero Image Manifest — Gutter Cleaners Uxbridge

All images below are currently **placeholders** (1920x1080 grey PNG).
To replace them, add `REPLICATE_API_TOKEN=<your token>` to `.env.local`
and re-run the image generation agent, or generate them manually using
the prompts below and save each file to the listed path.

## Page Hero Images (`/public/images/`)

| File | Prompt |
|------|--------|
| `homepage-hero.jpg` | Professional gutter cleaner on ladder cleaning house gutters in suburban West London street, bright sunny day, blue uniform, modern semi-detached house, photorealistic, wide angle |
| `services-hero.jpg` | Close-up of clean shiny gutters on British house, professional workmanship, blue sky background, photorealistic |
| `gutter-cleaning-hero.jpg` | Gutter cleaning professional using vacuum equipment on UK terraced house roof gutters, overcast British weather, photorealistic |
| `gutter-repairs-hero.jpg` | Close up of gutter repair work on British house, sealant being applied to leaking joint, hands in work gloves, photorealistic |
| `gutter-replacement-hero.jpg` | New white uPVC gutters being installed on traditional British suburban house, professional installer, photorealistic |
| `fascia-soffit-hero.jpg` | Clean white fascia boards and soffits on British house exterior, blue sky, well-maintained, photorealistic |
| `about-hero.jpg` | Professional friendly gutter cleaning team in blue uniforms standing in front of work van on UK residential street, smiling, photorealistic |
| `areas-hero.jpg` | Aerial view of West London suburban residential streets with houses, green gardens, photorealistic |
| `blog-hero.jpg` | Person reading home maintenance tips on tablet sitting in garden, modern British home background, warm light, photorealistic |

## Blog Post Images (`/public/images/blog/`)

| File | Prompt |
|------|--------|
| `gutter-cleaning-cost.jpg` | Money coins next to gutter cleaning equipment, UK £ symbol visible, clean gutters in background |
| `signs-gutters-need-cleaning.jpg` | Overgrown blocked gutters with leaves and debris on British house roof, before cleaning, photorealistic |
| `blocked-gutters-damp.jpg` | Water damage on interior wall showing damp patches, British home interior, concerned homeowner looking at wall |

## Generation Settings (Replicate flux-schnell)
- Model: `black-forest-labs/flux-schnell`
- Width: 1920
- Height: 1080
- num_outputs: 1
- API endpoint: `https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions`
