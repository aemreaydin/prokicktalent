# Tasks

## 1. Build the publish loop — GitHub Actions (do first — it gates the value)

- [x] 1.1 Add `.github/workflows/deploy.yml`: trigger on push to `master`,
      `npm ci && npm run build`, deploy via `cloudflare/wrangler-action@v3`
      using `${{ secrets.CLOUDFLARE_API_TOKEN }}` (+ account id).
- [ ] 1.2 **(user action)** Add `CLOUDFLARE_API_TOKEN` (and account ID) as
      GitHub repo secrets — cannot be committed.
- [ ] 1.3 **(user action)** If Cloudflare native Git integration is enabled,
      disable it so push doesn't double-deploy.
- [ ] 1.4 Confirm Keystatic Cloud is connected to the repo and the editor has
      dashboard access; image uploads commit to `public/images/gallery/`.

## 2. Schema — Keystatic config

- [x] 2.1 Add `roster` collection to `keystatic.config.ts`:
      `mode` (select: Anonymized/Real, default Anonymized), `ageGroup`
      (select U17–U23), `descriptor` (text, max ~24, help-text), `position`
      (select GK/RB/CB/LB/DM/CM/AM/RW/LW/ST), `birthYear` (select 2003–2009),
      `region` (text, max ~32), `status` (select Watched/Trialing/Signed/
      Placed), `order` (integer).
- [x] 2.2 Add the consent conditional to `roster`: a `fields.conditional` on
      `mode` that exposes `realName` (text), `photo` (image), and
      `consentOnFile` (checkbox) ONLY when `mode = "Real"`.
- [x] 2.3 Extend the existing `gallery` collection: add `date` (text),
      `size` (select: Regular/Wide/Tall/Feature), `order` (integer). Keep
      `caption` + `image`.
- [x] 2.4 Add `press` collection: `source` (text), `date` (text),
      `title` (text, max ~70, help-text), `subtitle` (text, max ~60),
      `url` (url, optional), `order` (integer).
- [x] 2.5 Reshape the `services` collection: `order` (integer), `number`
      (text "01"), `title` (text), `phase` (text), `hubBlurb` (text, max ~110),
      `body` (text, multiline), `bullets` (array of text, each ≤~28),
      `vizType` (select: contract / gps / tactic / pathway).
- [x] 2.6 Add plain-language `description` help-text to every field a
      non-technical editor touches (state length limits and intent).

## 3. Seed content (so first build is visually identical)

- [x] 3.1 Create `src/content/roster/*.json` — the current 12 hardcoded
      players, all `mode: Anonymized`, with `order` preserving current order.
- [x] 3.2 Create `src/content/press/*.json` — the current 4 press items.
- [x] 3.3 Add `date`/`size`/`order` to existing gallery entries; add the
      remaining gallery entries to match the current 10 tiles (or fewer real
      ones — see media page note).
- [x] 3.4 Reshape `src/content/services/*.json` (representation, gps, scouting,
      development) to the new fields, seeded from the current hardcoded
      services copy + bullets; set each `vizType`.

## 4. Page wiring (data source only — no layout change)

- [x] 4.1 `players.astro`: read `roster` via `createReader`, sort by `order`,
      assemble `name = "{ageGroup} {descriptor}"` and
      `meta = "{position} · {birthYear} · {region}"` in frontmatter; render
      the existing card markup. Status filter reads from the data.
- [x] 4.2 `players.astro`: when `mode = "Real"` and `consentOnFile`, render
      `realName` + `photo`; otherwise the anonymized silhouette + descriptor.
- [x] 4.3 `media.astro`: read `gallery` (tiles, mapping `size` → masonry span
      class) and `press` (press row) via `createReader`, sorted by `order`.
- [x] 4.4 `services.astro`: read the `services` collection for the hub list
      (number/title/hubBlurb) and the four detail sections (phase/body/bullets);
      map `vizType` → the matching hardcoded EXAMPLE viz; sort by `order`.
- [x] 4.5 Keep all hero/editorial prose + the contract-analysis sample
      hardcoded (out of scope).

## 5. Guardrail verification

- [x] 5.1 Confirm constrained fields render as dropdowns in the dashboard
      (no free text for status/position/ageGroup/size).
- [x] 5.2 Confirm real-name/photo fields are hidden until `mode = Real` +
      `consentOnFile` is ticked.
- [x] 5.3 Confirm length caps + help-text appear and are tuned to the actual
      layout tolerance (not arbitrary).

## 6. Verification

- [x] 6.1 `npm run build` passes; `/players`, `/media`, and `/services`
      render identically to pre-change (content seeded to match).
- [ ] 6.2 Confirm the Actions workflow runs on push and deploys (check the
      first run after secrets are set).
- [ ] 6.3 Edit a roster entry in the dashboard (flip a status), save, and
      confirm it reaches the live site through the full publish loop.
- [ ] 6.4 Add a gallery photo + a press item, and edit a service's bullets,
      via the dashboard end-to-end.
- [x] 6.5 Lighthouse unchanged on `/players`, `/media`, `/services` (no
      regression).
- [x] 6.6 Confirm every requirement in
      `specs/cms-editorial-content/spec.md` is satisfied.
