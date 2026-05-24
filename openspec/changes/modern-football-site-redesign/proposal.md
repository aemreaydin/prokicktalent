## Why

The previous `scouting-dossier-homepage-redesign` change established a strong
positioning concept (the homepage as a scouting dossier) but its execution
still reads as a competent dark template, and the inner pages (About, Players,
Services, Media, Contact) were never updated to match. The brief is to bring
the full site up to the visual quality of contemporary SaaS marketing sites
(Linear, Vercel, 21st.dev, Stripe, Resend) while making it visibly
football-passionate — a modern component system skinned in football, anchored
by a scroll-driven hero that reads instantly as the sport.

The work is split into two execution phases. **Phase A produces UI design
artifacts** — standalone HTML preview pages the user reviews and selects from.
**Phase B implements** those selections into the live site. This protects
against shipping an aesthetic the user hasn't seen rendered.

The deep design exploration lives at
`docs/plans/2026-05-23-modern-redesign.md` and is the canonical visual
reference for this change.

## What Changes

### Design system
- Extend the Tailwind palette: cooler `background`, new `electric` (#6EE7FF)
  and `mute` (#8A8F98) tokens, formal `surface-1`/`surface-2`/`surface-glass`
  tiers, explicit `hairline` color.
- Add JetBrains Mono for numeric / stat readouts; refine the Bebas + Inter
  type scale; introduce a 4-easing motion vocabulary.
- Introduce a universal grain layer and a three-tier surface system
  (flat / frosted / lit-glass).

### Brand identity
- Add a small stylized pitch-arc icon-mark in gold next to the wordmark, and
  a matching favicon set (see design doc § 7.1).

### Component library (`src/components/ui/`)
- `GlassNav`, `StatBlock`, `GpsReadout`, `TacticBoard`, `Marquee`, `Bento`,
  `CommandBar`, `PathwayTabs`, `PlayerCard`, `CTAPanel`.
- All Astro-first; React islands only where state demands it.

### Homepage
- Replace the current dot-on-photo hero animation with the "strike,
  deconstructed" concept: a single AI-generated still + scroll-driven pitch
  grid, contact circle, trajectory arc, and three scout-overlay cards.
- Three-beat headline copy that crossfades with scroll: "See the player." →
  "Read the evidence." → "Make the move." Body + CTA fade in at beat 3.
- Rebuild the five homepage sections (proof marquee, approach bento, pathway
  tabs, services, agent feature, CTA) using the new component library.

### Inner pages
- About: rebuilt around a vertical timeline + credentials bento.
- Players: anonymized roster grid + recruitment CTA (real players added later
  with consent).
- Services: hub + anchored deep sections, each with a service-specific visual.
- Media: masonry bento + press row.
- Contact: glass form + "What to expect" column.

### Content authenticity
- All live numeric / activity claims removed; sample data clearly labelled as
  illustrative.
- Marquee uses only honestly-citable federation/league marks; if a mark
  cannot be cited, it is omitted rather than placeholdered.
- AI-generated imagery excludes recognizable faces; silhouettes / back-of-head
  shots only.

### Execution phases
- **Phase A — UI Design Artifacts:** build self-contained HTML preview pages
  under `docs/previews/` (style tile, component kitchen-sink, command-bar
  states, hero animation prototype, per-page mockups). User reviews and
  selects which patterns proceed to Phase B.
- **Phase B — Implementation:** integrate selected designs into the live
  Astro site. Replace styles, palette, nav, layout, every page. Update
  Keystatic content schema as needed.

## Capabilities

### New Capabilities

- `marketing-site-experience`: defines the full ProKickTalent marketing-site
  experience — visual system, component library, full-site page structures,
  hero motion, brand identity, and content-authenticity rules.

### Modified Capabilities

- `homepage-scouting-dossier`: superseded by `marketing-site-experience` when
  Phase B completes for `/`. The new capability incorporates the dossier-era
  requirements (U17-U23 positioning, scroll-driven hero, evidence-oriented
  CTA) while broadening to the full site and a modern visual system.

## Impact

- **Pages:** `src/pages/index.astro`, `about.astro`, `players.astro`,
  `services.astro`, `media.astro`, `contact.astro`.
- **Shared:** `src/components/Nav.astro` → `GlassNav`,
  `src/layouts/Layout.astro` (adds grain + global wrapper),
  `src/components/Footer.astro` (tonal pass).
- **New:** `src/components/ui/` directory with ~10 components.
- **Styles:** full rewrite of `src/styles/global.css`, palette extension in
  `tailwind.config.mjs`.
- **Content:** additions to `keystatic.config.ts` and JSON content files for
  any new editable copy (hero three-beat strings, marquee items, roster
  cards, "what to expect" list).
- **Assets:** 1 hero still + 1 icon-mark + favicon set + 4 service icons +
  4-6 roster silhouettes + 1 grain PNG.
- **Preview-only:** `docs/previews/*.html` files during Phase A; optionally a
  `/_dev/components` route gated to non-production builds.
- **No backend changes.** Deployment target remains Cloudflare Pages.
- **Dependencies:** none required to ship Phase A. Phase B may add `gsap`
  (homepage only) if the hero scroll choreography outgrows the current
  vanilla handler; optional `class-variance-authority` (~2KB) for component
  variant ergonomics. Both are evaluated during implementation, not assumed.
