# Phase A asset placeholders

These SVGs are the Phase A versions of the brand assets. Phase B will:

- Move chosen logo (after A2 selection) into `public/favicon.svg` + a favicon PNG set.
- Move service icons into `src/components/ui/icons/`.
- Move the silhouette into the `PlayerCard.astro` component.
- Convert `grain.svg` to a static PNG tile at `public/images/textures/grain.png`
  to avoid re-rasterizing the SVG noise on every paint.

## Inventory

| File                         | Purpose                              | Phase B destination                     |
|------------------------------|--------------------------------------|-----------------------------------------|
| `logo-arc.svg`               | A2 concept 01                        | `public/favicon.svg` (if chosen)        |
| `logo-ball.svg`              | A2 concept 02                        | `public/favicon.svg` (if chosen)        |
| `logo-goal.svg`              | A2 concept 03                        | `public/favicon.svg` (if chosen)        |
| `logo-trajectory.svg`        | A2 concept 04 — preview default      | `public/favicon.svg` (if chosen)        |
| `logo-contact.svg`           | A2 concept 05                        | `public/favicon.svg` (if chosen)        |
| `icon-representation.svg`    | Services / Representation card icon  | `src/components/ui/icons/Representation.astro` |
| `icon-gps.svg`               | Services / GPS card icon             | `src/components/ui/icons/Gps.astro`     |
| `icon-scouting.svg`          | Services / Scouting card icon        | `src/components/ui/icons/Scouting.astro` |
| `icon-career.svg`            | Services / Career card icon          | `src/components/ui/icons/Career.astro`  |
| `silhouette-player.svg`      | Anonymized PlayerCard photo mask     | `src/components/ui/PlayerCard.astro`    |
| `grain.svg`                  | Universal body grain texture         | `public/images/textures/grain.png` (rasterize before Phase B) |

## Deferred (require external action)

- **AI-generated hero still** (`hero-strike.jpg`) — generate per design doc § 5.3
  prompt brief; pick 1 from 30-50 candidates. Drops in to replace the SVG
  scene placeholder in `hero-animation.html` and `page-home.html`.
- **Favicon PNG set** (16/32/64/192/512px) — generate from the chosen logo SVG.
- **Real federation/league marks** — only after Burak audits citable relationships.

## Brand-safety rules (from design doc § 7)

- Zero AI-generated photos of recognizable people.
- Back-of-head shots, silhouettes, or composite figures only.
- Unbranded kit only (dark navy + single white stripe is the established palette).
- No spectators, no team logos visible in any generated imagery.
