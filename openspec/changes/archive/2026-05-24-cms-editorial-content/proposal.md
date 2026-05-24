## Why

The `modern-football-site-redesign` change shipped the editorial site, but to
move fast it **hardcoded all copy and stopped reading Keystatic entirely**.
Today every page renders zero CMS data, and the dashboard's fields still
describe the old v1 dossier (heroLine1/2/3, dossier paragraphs) — disconnected
from what actually renders. The CMS is effectively dead.

The highest-value, highest-churn content — the **player roster, the media
gallery, and press mentions** — changes often and is exactly what the agent
(a non-technical editor) needs to manage without a developer. A player's
status flips from Trialing to Signed; a new gallery photo lands; a podcast
mention appears. None of that should require a code change.

This change reconnects the CMS for that high-churn content, modelled for a
**non-technical editor with guardrails** so edits can't break the carefully
tuned editorial layout.

## What Changes

### New / extended Keystatic collections

- **`roster`** (new collection) — one file per player. Structured fields only
  (no free-text formatting): `mode`, `ageGroup`, `descriptor`, `position`,
  `birthYear`, `region`, `status`, `order`. Display strings ("U19 winger",
  "RW · 2007 · Ontario") are assembled in code, never typed by the editor.
- **`gallery`** (extend existing collection) — add `date`, `size` (layout slot
  select), and `order` to the existing `caption` + `image`.
- **`press`** (new collection) — `source`, `date`, `title`, `subtitle`, `url`,
  `order`.
- **`services`** (reshape the existing collection) — replace the v1 fields with
  ones that match the new page: `order`, `number`, `title`, `phase`,
  `hubBlurb`, `body`, `bullets` (array of "what you get" items), and
  `vizType` (select: contract / gps / tactic / pathway). The sample visual's
  EXAMPLE data stays in code; the editor only picks which viz renders.

### Guardrails for a non-technical editor

- Constrained values are `fields.select` (status, position, ageGroup, gallery
  size) — impossible to typo or enter an off-design value.
- Text fields carry `validation.length.max` + `description` help-text so copy
  stays within the layout's tolerances.
- **Consent guardrail via `fields.conditional`:** real name and photo fields
  are hidden unless the editor flips `mode` to "Real" AND ticks a
  "consent on file" checkbox. The anonymized-launch rule and consent rule
  become impossible to violate from the dashboard.

### Page wiring

- `src/pages/players.astro` reads the `roster` collection (replaces the
  hardcoded array); the status filter keeps working off the collection data.
- `src/pages/media.astro` reads `gallery` (masonry tiles) and `press` (press row).
- `src/pages/services.astro` reads the reshaped `services` collection for both
  the hub list and the four detail sections; `vizType` selects which EXAMPLE
  visual renders.
- Pages keep their current hero/editorial prose hardcoded — that's a later
  change (see Non-Goals).

### Build the publish loop (GitHub Actions)

- Add `.github/workflows/deploy.yml` (Option B): on push to `master`, build the
  Astro site and deploy to Cloudflare via `wrangler` so a non-technical
  editor's Keystatic save → commit → **auto-build → live** with no developer
  involvement. The repo has no CI today, so this loop must be built, not just
  verified.
- Requires a `CLOUDFLARE_API_TOKEN` (and account ID) GitHub secret — added by
  the user, since secrets can't be committed. If Cloudflare's native Git
  integration is already on, disable it to avoid double-deploys.

## Capabilities

### New Capabilities

- `cms-editorial-content`: defines which site content is editor-managed via
  Keystatic, how it is modelled for a non-technical editor with guardrails,
  the consent gate for real player identities, and the build/publish loop.

### Modified Capabilities

- None. (`marketing-site-experience` is unaffected — this changes the content
  source, not the rendered design.)

## Impact

- **Keystatic:** `keystatic.config.ts` — add `roster` + `press` collections,
  extend `gallery`, reshape `services`.
- **Content:** new `src/content/roster/*.json` (seeded from the current
  hardcoded 12 players), `src/content/press/*.json`, extended
  `src/content/gallery/*`, and reshaped `src/content/services/*.json`.
- **Pages:** `players.astro`, `media.astro`, and `services.astro` read from
  Keystatic via `createReader`; display strings assembled in their frontmatter.
- **CI/deploy:** new `.github/workflows/deploy.yml` building + deploying to
  Cloudflare on push to `master`. One-time user action: add the
  `CLOUDFLARE_API_TOKEN` GitHub secret (and disable native CF Git auto-deploy
  if enabled).
- **Images:** gallery uploads land in `public/images/gallery/` (existing
  Keystatic image dir).
- **No design/layout change** — pixels stay identical; only the data source moves.
- **No backend** — still static, Cloudflare Pages.

## Non-Goals (explicit — future changes)

- Editorial **prose** (hero three-beat, manifesto, CTA headlines, about
  mission/timeline, contact "what to expect") stays hardcoded this pass. That,
  plus the **asterisk-emphasis convention** for the gold italic, is the next
  change.
- The **contract-analysis** sample (clauses, verdict, steps) stays hardcoded —
  it's an illustrative EXAMPLE, not data that changes.
- Other medium-churn in-page arrays (about timeline, pathway, credentials) —
  deferred.
