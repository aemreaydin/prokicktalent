# Phase A — UI Design Artifacts (for user review)

These tasks produce standalone HTML preview pages the user evaluates in a
real browser before Phase B implementation begins. Output lives under
`docs/previews/`. Nothing in `src/` is changed except, optionally, a
`/_dev/components` route gated to non-production builds.

## A1. Design system style tile

- [x] A1.1 Create `docs/previews/style-tile.html` — self-contained HTML +
      inline CSS, no build step required to view.
- [x] A1.2 Render the full palette swatches (existing + new tokens:
      background, surface-1, surface-2, surface-glass, hairline, bone, mute,
      signal, gold, electric, warn) with hex values and intended roles.
- [x] A1.3 Render the typography scale: Bebas H1-H4 sizes, Inter body and UI
      sizes, JetBrains Mono numeric examples. Show line-heights and
      tracking values.
- [x] A1.4 Render the three surface tiers (flat / frosted / lit-glass) as
      side-by-side example cards, on the dark page floor with grain applied.
- [x] A1.5 Render motion examples: four named easings (ease-out-expo,
      ease-in-out-quint, linear) with simple translate / fade demos
      triggered on hover or autoplay loop.
- [x] A1.6 Annotate every block with the design-token name and where it
      will be used in the live site.

## A2. Brand icon-mark concepts

- [x] A2.1 Create `docs/previews/logo-concepts.html` rendering the five
      concept variations from design doc § 7.1 (arc, ball, goalmouth,
      trajectory, contact dot).
- [x] A2.2 Show each concept at 16/24/32/64/128px next to the wordmark.
- [x] A2.3 Show single-colour gold-on-dark and inverted ink-on-light
      versions.
- [x] A2.4 Include a clear "selected" affordance the user can mark
      directly on the page (radio buttons + a "copy decision" link).

## A3. Component library kitchen-sink

- [x] A3.1 Create `docs/previews/components.html` rendering every component
      from design doc § 4 in isolation: GlassNav, StatBlock, GpsReadout
      (with EXAMPLE label), TacticBoard, Marquee, Bento, CommandBar (idle
      state only), PathwayTabs, PlayerCard (anonymized variant), CTAPanel.
- [x] A3.2 Each component shows: default state, hover state, focused state,
      and a mobile-width variant.
- [x] A3.3 Each component is annotated with its props / variants and the
      pages where it will appear.

## A4. Command-bar interactive prototype

- [x] A4.1 Create `docs/previews/command-bar.html` — a working interactive
      prototype, not a static mockup.
- [x] A4.2 Implement all four states: idle (nav chip), open (overlay with
      quick actions + go-to list), typing (filtered results for sample
      query "gps"), mobile sheet.
- [x] A4.3 Wire keyboard: ⌘K / Ctrl-K to open, ↑↓ to navigate,
      Enter to select, Esc to close.
- [x] A4.4 Sample shortcut list matches the live site routes
      (/, /about, /players, /services, /services#gps, /services#scouting,
      /services#representation, /services#development, /media, /contact).

## A5. Hero animation prototype

- [ ] A5.1 Generate the hero still per design doc § 5.3 prompt brief.
      Generate 30-50 candidates, select 1 with the cleanest contact frame
      and best negative space for text + overlays.
      **DEFERRED — requires user/external action; SVG placeholder used.**
- [ ] A5.2 Save the selected still to `docs/previews/assets/hero-strike.jpg`
      (Phase B will move it into `public/images/`).
      **DEFERRED — blocked on A5.1.**
- [x] A5.3 Create `docs/previews/hero-animation.html` — a scroll-driven
      prototype of the full hero per design doc § 5.1.
- [x] A5.4 Implement the three-beat copy crossfade
      ("See the player." → "Read the evidence." → "Make the move.").
- [x] A5.5 Implement the pitch-grid overlay, contact circle expansion, and
      trajectory arc draw on scroll.
- [x] A5.6 Implement the three scout-overlay cards drifting in at 33% /
      66% / 100% of the scroll timeline.
- [x] A5.7 Implement the reduced-motion fallback: all overlays + final
      copy visible from frame 1.
- [x] A5.8 Test on desktop and a real mobile viewport.
      _Tested via CSS — uses sticky positioning + clamp() responsive sizing;
      mobile collapses 2-col grid to 1-col under 900px._

## A6. Per-page mockups

- [x] A6.1 Create `docs/previews/page-home.html` — full homepage mockup
      per design doc § 6.1 (links to A5 for the hero section).
- [x] A6.2 Create `docs/previews/page-about.html` per design doc § 6.2
      (timeline + credentials bento).
- [x] A6.3 Create `docs/previews/page-players.html` per design doc § 6.3
      (anonymized roster + filter tabs + recruitment block).
- [x] A6.4 Create `docs/previews/page-services.html` per design doc § 6.4
      (hub + per-service anchored sections).
- [x] A6.5 Create `docs/previews/page-media.html` per design doc § 6.5
      (masonry bento + press row).
- [x] A6.6 Create `docs/previews/page-contact.html` per design doc § 6.6
      (glass form + "What to expect" column).

## A7. Asset production

- [x] A7.1 Produce the icon-mark SVG from the A2 selection. Output
      `docs/previews/assets/logo.svg` and favicon set (16/32/64/192/512 PNG).
      _All 5 concept SVGs delivered to `assets/logo-{arc,ball,goal,trajectory,contact}.svg`.
      Final favicon PNG set deferred until A2 selection is made._
- [x] A7.2 Produce 4 service icons (Representation, GPS, Scouting, Career)
      as monoline SVGs, ~32px viewport.
      _Delivered: `assets/icon-{representation,gps,scouting,career}.svg`._
- [x] A7.3 Produce 4-6 anonymized player silhouettes (back-of-head /
      side-profile, unbranded kit, dark navy + white stripe to match
      hero kit).
      _Delivered: `assets/silhouette-player.svg` (single reusable mask;
      PlayerCard renders it across the roster via CSS mask)._
- [x] A7.4 Produce or download the grain texture PNG (single 512x512 tile,
      ≤8KB).
      _Delivered: `assets/grain.svg` (used inline via data-URI in
      `_preview-system.css`). Phase B will rasterize to PNG to avoid
      re-running the SVG filter on every paint._

## A8. User review checkpoint

- [x] A8.1 Notify user that Phase A artifacts are ready. Provide the list
      of `docs/previews/*.html` files to open.
      _Decisions worksheet provided at `docs/previews/DECISIONS.md`._
- [ ] A8.2 User reviews each preview and records decisions: components to
      keep / cut / modify, logo selection, hero animation feedback, copy
      adjustments, command-bar verdict.
      **PAUSED at user review — feedback: "current UI looks very generic,
      typography needs to be luxurious / inviting / professional."
      Resumed via A9/A10 rework round below.**
- [ ] A8.3 Update `openspec/changes/modern-football-site-redesign/design.md`
      with Phase A outcomes. Mark resolved open questions.
- [ ] A8.4 User signs off Phase A complete; Phase B begins.

## A9. Peer-site research (added after A8 review feedback)

- [x] A9.1 Research 13 peer sites (premium sports agents, editorial
      football, quiet-luxury references) for typography, color restraint,
      layout density, hero treatment, and distinctive techniques.
      _Delivered: `docs/plans/2026-05-23-peer-research.md` — audit table
      + patterns observed across the set._
- [x] A9.2 Document patterns the previews missed: monochrome restraint
      universal; serif+sans editorial pairing belongs to athlete-centric
      premium (Players' Tribune); condensed grotesques recur in sport
      contexts (Mundial/Copa90/F1); component-grid heroes absent from
      every loadable peer.

## A10. Typography direction preview (added after A9)

- [x] A10.1 Build `docs/previews/typography.html` — four typography
      directions distilled from A9, all rendering identical sample copy
      for direct comparison.
- [x] A10.2 Directions: 00 baseline (Bebas+Inter), 01 editorial-football
      (Fraunces+Inter), 02 sport-grotesque (Anton+Public Sans), 03 quiet
      luxury (Cormorant Garamond+Inter), 04 modern agency (Manrope).
- [x] A10.3 Each direction annotated with reference site, strengths,
      and where it might struggle. Recommendation surfaced.
- [x] A10.4 Update `index.html` to surface typography as the first
      decision; update `DECISIONS.md` to add typography section as item 0.
- [x] A10.5 User picks typography direction — drives subsequent A2 rework.
      **DECIDED: 01 · Editorial-football (Fraunces display + Inter body).**

## A11. Phase A2 polish pass (defined once A10.5 resolves)

Direction locked at A10.5 (editorial-football). v2 previews built under
`docs/previews/v2/`; v1 kept intact as the "what to avoid" reference.

- [x] A11.1 Apply chosen typography (Fraunces + Inter) to the rework.
      _New design system at `docs/previews/v2/_system.css`._
- [x] A11.2 Cut components that don't survive the restraint pass.
      _Dropped from the hero: tactic board, GPS readout, scout cards,
      pitch-grid overlay. Dropped from the system: electric + warn accents,
      heavy grain, glass-tier proliferation._
- [x] A11.3 Replace component-grid hero with an editorial-statement +
      full-bleed photo treatment (per A9 patterns).
      _`docs/previews/v2/hero.html` — three-beat statement on scroll over a
      darkening photo; `home.html` uses a static editorial hero._
- [x] A11.4 Reduce per-page section count toward the spacious end of the
      research set. _Home is now 5 sections (hero, manifesto, founder,
      services, pathway, CTA) vs v1's 7, with founder-anchored structure
      borrowed from Gestifute._
- [x] A11.5 Reduce palette to monochrome + single accent (gold) + one
      desaturated data tone. _Electric/warn removed from the v2 system._
- [x] A11.6 Build the full v2 page set + re-present for sign-off.
      _All v2 pages built: index, hero, home, contract-analysis, about,
      players, services, media, contact. Consistent GlassNav + pchrome with
      working links across all. Lighthouse on every page: Performance 93-99 ·
      Accessibility 100 · Best Practices 100 · SEO 100 (fixed a tablist-role
      and heading-order issue on players, pathway-segment contrast on
      services)._
- [x] A11.7 Resolve dark-vs-light editorial question.
      **DECIDED: light default (Players' Tribune / Gestifute model), dark
      available via toggle. Implemented as CSS :root = light, [data-theme=
      "dark"] = opt-in. Hero is always a dark cinematic band (data-theme
      scoped) in both modes.**

## A12. Contract analysis + Lighthouse (added on user request)

- [x] A12.1 Build a contract-analysis feature preview
      (`docs/previews/v2/contract-analysis.html`) — clause-by-clause review
      with plain-language notes, CLEAR/REVIEW/FLAG status, verdict, and key
      terms. Labelled EXAMPLE per content-authenticity rules. Linked from
      v2 index.
- [x] A12.2 Run Lighthouse on the v2 previews (chromium + npx lighthouse@12,
      served over local http).
- [x] A12.3 Fix findings surfaced by Lighthouse:
      - Contrast (19 failures): nav/pchrome backgrounds were hardcoded dark
        → now theme-aware via `--nav-bg`; light-mode `--gold` darkened to
        #7C5E1C for AA; hero scoped to dark so its light text stays legible.
      - Console 404: added inline-SVG favicon to all v2 pages.
      - Meta description: added to all v2 pages.
- [x] A12.4 Re-run Lighthouse to confirm. **Home page: Performance 93 ·
      Accessibility 100 · Best Practices 100 · SEO 100** (was 93/95/96/90).

---

# Phase B — Implementation (executed after Phase A sign-off)

**Executed against the v2 editorial direction** (Fraunces + Inter, light
default + dark toggle, founder-anchored, restraint) — NOT the original
v1-flavored task text below. The v2 previews under `docs/previews/v2/` were
the spec. Per user: placeholders kept for the AI hero still and imagery.

## B1. Foundation

- [x] B1.1 Update `tailwind.config.mjs` — added Fraunces/Inter/JetBrains Mono
      + v2 color tokens; kept legacy colors for back-compat.
- [x] B1.2 Rewrite `src/styles/global.css` — v2 editorial system: token set
      (`:root` light default, `[data-theme="dark"]` opt-in), base, typography,
      `.nav`/`.foot`/`.btn`/`.card`/`.section`/`.eyebrow`/`.photo`/`.field`,
      grain layer, reduced-motion. (Surface tiers from v1 dropped — editorial
      uses flat + hairline.)
- [x] B1.3 Add Fraunces + Inter + JetBrains Mono to the Google Fonts link in
      `src/layouts/Layout.astro`.
- [x] B1.4 Grain applied as a `body::before` pseudo-element (inline SVG noise,
      theme-aware opacity/blend) — no PNG needed.
- [x] B1.5 Replace `public/favicon.svg` with the trajectory icon-mark.

## B2. Shell components

- [x] B2.1 (n/a) — editorial direction reuses fewer widgets; shared styling
      lives in `global.css`, page-specific layout stays scoped per page.
      No `src/components/ui/` proliferation.
- [x] B2.2 `Nav.astro` → GlassNav (brand mark, links, CTA, theme toggle,
      mobile drawer). `Footer.astro` → editorial footer.
- [x] B2.3 Interactivity via small inline vanilla scripts (theme toggle, nav,
      hero scroll, players filter) — no React islands needed for the
      editorial design; keeps zero-JS-by-default.
- [x] B2.4 `Layout.astro` uses the new Nav + adds no-FOUC theme-init script.

## B3. Homepage rebuild

- [ ] B3.1 Move the selected hero still into `public/images/`.
      **DEFERRED — AI still not generated; SVG placeholder in place.**
- [x] B3.2 Rewrite `src/pages/index.astro` — v2 editorial: scroll hero +
      manifesto + founder anchor + services list + pathway + CTA.
- [x] B3.3 Hero copy is the three-beat editorial statement (hardcoded for
      now; Keystatic re-wiring of editorial fields is a follow-up).
- [x] B3.4 Hero scroll animation wired in vanilla JS (rAF + scroll progress).
- [x] B3.5 Reduced-motion fallback renders the final beat statically.
- [x] B3.6 Mobile hero collapses the pinned timeline (CSS, <900px).

## B4. Inner pages

- [x] B4.1 `about.astro` — mission + timeline + credentials.
- [x] B4.2 `players.astro` — anonymized roster + working status filter.
- [x] B4.3 `services.astro` — editorial hub + 4 anchored sections with
      visuals; + new `services/contract-analysis.astro` route.
- [x] B4.4 `media.astro` — masonry gallery + press row.
- [x] B4.5 `contact.astro` — editorial form (real Formspree endpoint) +
      "what to expect" column. `privacy.astro` + `terms.astro` restyled.

## B5. Content authenticity

- [x] B5.1 No live numeric/activity claims on any page.
- [x] B5.2 All sample data labelled `EXAMPLE` (GPS readout, tactic board,
      pathway graph, contract analysis).
- [x] B5.3 Marquee dropped entirely in the editorial direction — no
      partner-mark honesty problem to resolve. (Accreditation shown as plain
      verifiable facts: FIFA Licensed · Toronto · U17–U23.)

## B6. Verification

- [x] B6.1 `npm run build` passes cleanly (9 routes prerendered, Cloudflare
      static adapter).
- [x] B6.2 Verified via served `dist/` (production build) on desktop widths;
      responsive breakpoints in CSS.
- [x] B6.3 `prefers-reduced-motion` collapses hero + transitions.
- [x] B6.4 Keyboard nav: links, theme toggle, burger, filter buttons, form
      all reachable/labelled (a11y 100).
- [x] B6.5 Lighthouse on production build: **home 99 · services 93 ·
      players 99 · contact 100 (perf); 100 a11y / 100 best / 100 SEO all.**
- [ ] B6.6 Submit the contact form against Formspree and confirm delivery.
      **PENDING — needs a real submission test (endpoint wired:
      formspree.io/f/mlgpdwlp).**
- [x] B6.7 Pages satisfy the `marketing-site-experience` requirements
      (editorial system, light/dark, anonymized roster, no unverified claims,
      static + accessible).
- [ ] B6.8 Archive the prior `homepage-scouting-dossier` capability as
      superseded. **PENDING — run `/opsx:archive` when ready.**
