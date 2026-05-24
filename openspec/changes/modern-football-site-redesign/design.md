## Context

The site is an Astro 5 + Tailwind 3 + Keystatic static marketing site for
FIFA-licensed football agent Burak Can Piroglu, deployed to Cloudflare Pages.
A recent `scouting-dossier-homepage-redesign` change established the homepage
as a "scouting dossier" with a dark palette, gold accreditation accent, green
pitch-signal accent, and a scroll-driven ball trajectory in the hero.

The dossier concept is sound, but executionally:
- The hero animation reads as a dot on a chart, not as football.
- Surfaces are uniformly flat; no rhythm between emotional and analytical
  content.
- Inner pages (About, Players, Services, Media, Contact) still run on the
  pre-dossier template.

This change broadens the redesign to the entire site, layers in a modern
component system, and replaces the hero with a scroll-driven "strike,
deconstructed" sequence built around a single AI-generated still and pitch /
scout overlays.

**The deep visual exploration — palette deltas, surface tiers, component
sketches, page mockups, hero animation walk-through, asset brief — lives at
`docs/plans/2026-05-23-modern-redesign.md`** and is the canonical visual
reference for implementers. This file captures the structural decisions and
trade-offs.

## Goals / Non-Goals

**Goals:**
- Full marketing site speaks one design language: modern SaaS components
  (bento, glass, marquee, micro-interactions) skinned in football (pitch
  lines, GPS readouts, tactic boards, scout overlays).
- Hero animation reads instantly as football, runs on scroll-linked motion,
  has a strong static fallback.
- All live numeric or activity claims removed; only honestly-citable
  third-party marks appear.
- Anonymized roster on `/players` at launch; component supports real players
  later under explicit consent.
- A small icon-mark + favicon establish a recognizable brand shape.
- Static, fast, Cloudflare-Pages-compatible. No backend, no per-request data.

**Non-Goals:**
- No real scouting database, player portal, GPS ingestion, or account system.
- No CMS migration. Keystatic stays. Additions only where new editable fields
  are genuinely needed.
- No third-party motion library at the start. GSAP is evaluated only if the
  hero scroll choreography outgrows vanilla JS + CSS variables.
- No multilingual support in this change.
- No paid stock photography. AI-generated assets per the design doc's
  brand-safety rules.

## Decisions

### Two-Phase Execution: Design Artifacts → Implementation

Phase A produces standalone HTML preview pages under `docs/previews/`:
a style tile, the component kitchen-sink, the command bar in all states,
the hero animation prototype, and a mockup per page. The user reviews these
in a browser and selects which patterns proceed to Phase B.

Phase B integrates those selections into the live site.

**Alternatives considered:**
- Skip previews, go straight from design doc to implementation. Faster but
  bets on the user accepting unseen design choices — exactly the failure
  mode of the previous dossier redesign.
- Use Figma / external tool for previews. Slower to iterate, requires an
  account, and the HTML output is what we ship anyway — better to design in
  the medium.

**Rationale:** the previous redesign was approved on a written spec and
shipped a result the user later called "not very good UI wise." Visual
review *before* implementation closes that loop.

### Single AI-Generated Still, Not a Frame Sequence

The hero animation uses one carefully-chosen AI-generated still photo of a
player connecting with a ball. All motion comes from CSS/JS overlays (pitch
grid, contact circle, trajectory arc, scout cards) animated by scroll
position.

**Alternatives considered:**
- 24-60 frame sequence stepped by scroll. Cinematic but AI-generated frame
  sequences struggle to keep jersey, body, and ball consistent — the artifact
  rate is real.
- Video scrub (Apple-AirPods style). Strongest emotional payoff, biggest
  payload (3-8MB), mobile-data concern.
- SVG silhouette + GSAP arc. No asset dependency, but reads as illustration
  rather than the sport.

**Rationale:** one still is achievable, controllable, and the overlay-driven
motion is what makes it football. Decision can revisit during Phase A if the
prototype proves the case for video.

### Component System Over Page-Level Markup

All recurring patterns become Astro components in `src/components/ui/`.
Pages compose from them; pages never reimplement a pattern locally.

**Alternatives considered:**
- Page-local utility classes only. Simpler to start, but six pages with
  shared patterns drift out of alignment fast — the current site is already
  evidence of this.

**Rationale:** the brief is full-site coherence. Components enforce it.

### Astro-First, React Islands Only Where State Demands It

The bento, stat blocks, marquee, GPS readout, tactic board, and hero
animation are pure HTML/CSS/tiny vanilla JS. Astro islands (React) are used
only for CommandBar, PathwayTabs, the Players page filter, and the Media
lightbox.

**Alternatives considered:**
- React-everywhere (since `@astrojs/react` is installed). Larger JS payload,
  hydration cost, slower TTI.

**Rationale:** Astro ships zero JS by default. Keep it that way until
interactivity earns the hydration cost.

### Anonymized Roster First, Real Players Later

The `PlayerCard` component supports a `mode: "anonymized" | "real"` prop.
Launch ships 4-6 anonymized cards ("U19 winger / Ontario / 2007", silhouette
image, no name). Real players replace them only with explicit consent and
agreed-upon photography.

**Rationale:** privacy, consent, and authenticity all point the same way.
Anonymized cards still build trust by showing pipeline breadth without
overclaiming.

### Typography: Editorial-Football (Fraunces + Inter)

**DECIDED** (after peer research, see `docs/plans/2026-05-23-peer-research.md`
and `docs/previews/typography.html`): display type is **Fraunces** (variable
serif, italic for emphasis), body and UI are **Inter**, numerals stay
**JetBrains Mono**. This supersedes the Bebas Neue + Inter pairing from the
prior dossier redesign.

**Rationale:** the closest successful peer to an athlete-centric premium site
is The Players' Tribune (Publico serif + Graphik sans). Fraunces approximates
Publico's wedge-serif character as a free, variable face. The
italic-as-editorial-emphasis move (also used by Wasserman/THE·TEAM) gives the
brand an authored, advisory voice rather than a marketed one — directly
answering the "luxurious, inviting, professional" brief. Bebas-everywhere read
as generic because a single condensed display face at all scales flattens
hierarchy.

**Constraints:** serifs fall back to Inter below 16px; Fraunces optical-size
axis tuned up for hero display; italic reserved for emphasis, not body.

### Authenticity Over Performative Polish

Three explicit rules:
- No live numeric claims unless they are true and verifiable
  ("● Evaluating 4 players" is dropped).
- Sample data in marketing components (e.g. the GPS readout) is labelled
  `EXAMPLE` so no visitor reads it as a real player's report.
- Federation / league marks in the marquee appear only when the relationship
  can be cited honestly. "FIFA Licensed" is fine. Anything else needs a real
  relationship before it ships.

**Rationale:** the agent's credibility is the product. A single overclaim
on the homepage erodes the rest of the site.

## Risks / Trade-offs

- **AI hero still doesn't land** — boot, ball compression, and lighting all
  have to be right. Generate 30-50, accept a Phase A delay if the still
  isn't there.
- **Glass + grain + blur on low-end mobile** — `backdrop-filter` can chug.
  Feature-detect and fall back to solid `surface-1`.
- **Visual density** — marquee + grain + glass + animation can collectively
  feel "too much SaaS". Per-fold motion budget: one "alive" element max.
- **Component library scope creep** — easy to keep adding patterns. Lock
  the 10-component list before Phase A; new components need a written
  reason in this design doc.
- **Phase A becomes a deliverable in itself** — previews must stay scoped to
  decision support. Don't ship them publicly; don't link them from the live
  site.
- **Asset maintenance** — every new image is a thing to keep current. Pipe
  imagery through Keystatic wherever practical so editors can swap.

## Migration Plan

1. **Phase A — UI Design Artifacts.** Build standalone HTML preview pages
   in `docs/previews/`. No changes to `src/` other than potentially a
   `/_dev/components` route gated to non-production builds. User reviews
   in-browser, marks selections in a written response or directly on this
   change.
2. **Update this design doc** with Phase A outcomes — which components
   survived, which got cut, which patterns changed.
3. **Phase B Part 1 — Foundation.** New palette in `tailwind.config.mjs`,
   rewritten `global.css`, GlassNav, Layout grain wrapper, component
   library in `src/components/ui/`. Build still passes; site looks
   nearly-identical to users.
4. **Phase B Part 2 — Homepage.** Generate hero still. Rebuild
   `src/pages/index.astro`. Wire scroll animation. Update Keystatic
   `homepage.json` schema for three-beat copy.
5. **Phase B Part 3 — Inner pages.** About → Players (anonymized roster) →
   Services → Media → Contact.
6. **Phase B Part 4 — Verification.** Lighthouse, reduced-motion,
   keyboard nav, mobile breakpoints, every form path, every internal link,
   confirm no live numeric claims remain, confirm no unlicensed marks.
7. **Archive the `homepage-scouting-dossier` capability** once Phase B is
   verified — its requirements are absorbed into `marketing-site-experience`.
8. **Rollback** by reverting the Phase B PR; Phase A artifacts in `docs/`
   are non-deploy and can stay as a design record.

## Open Questions

1. **Command bar (§ 4.6 of design doc)** — keep, cut, or build-but-defer?
   Phase A produces a working preview; the call happens after the user sees
   it in-browser.
2. **Marquee launch set** — concrete audit of which federation / league
   marks PKT can cite at launch. Needs input from Burak before Phase B
   Part 2 (homepage). If the answer is "FIFA only", the marquee becomes a
   single accreditation block.
3. **Logo direction** — five concept variations sketched in design doc § 7.1;
   one needs to be picked before icon production starts in Phase A.
4. **Phase A preview gating** — `/_dev/components` route via env var,
   Cloudflare Pages preview branch, or simply not in production builds?
   Trivial but needs a call.
5. **GSAP adoption** — hero scroll choreography may or may not outgrow the
   current vanilla approach. Decided during Phase A prototyping.
