# ProKickTalent — Modern Football Site Redesign

**Date:** 2026-05-23
**Status:** Design exploration (not yet a change proposal)
**Scope:** Full site — Home, About, Players, Services, Media, Contact
**Stack constraints:** Astro 5 · Tailwind 3 · Keystatic CMS · Cloudflare Pages (static)

---

## 1. Why this doc exists

The site was recently rebuilt around a "Scouting Dossier" concept (see
`openspec/changes/scouting-dossier-homepage-redesign/`). The structural idea is
strong, but executionally the page still reads as a competent dark template:

- The hero animation is a CSS dot sliding across a stadium photo. It's
  technically scroll-linked, but it doesn't read as football — it reads as a chart.
- Surfaces (cards, panels) are flat dark rectangles. Nothing in the chrome
  signals craft.
- Information density is uniform across the page — no "wow moment", no
  rhythm change between emotional and analytical content.
- Other pages (About, Players, Services, Media, Contact) were never updated to
  match the dossier system — they're still on the older template.

The brief is: **make it feel professional AND visibly football-passionate,
borrowing the component vocabulary of modern SaaS marketing sites (Linear,
Vercel, 21st.dev, Stripe, Resend) but skinned in football.**

---

## 2. North star

> **"A scouting room that breathes."**
>
> The site should feel like walking into a high-end performance department —
> screens with live readouts, tactic boards on the wall, a film loop of a
> player connecting cleanly with a ball, and one focused person explaining
> what it all means. Quiet, expensive, alive.

If a section doesn't earn the word **alive** or **expensive**, it's wrong.

---

## 3. Design system 2.0

### 3.1 Palette evolution

Keep the existing palette as the bone of the system, but add depth and an
"alive" accent. The current `signal` green doubles as the on-pitch signal,
gold remains accreditation, and a new **electric** layer adds the
modern-SaaS energy.

```
TOKEN          CURRENT     NEW                ROLE
─────────────────────────────────────────────────────────────────────
background     #0A0A0A     #07090B            Page floor (slightly cooler)
surface-1      #111827     #0E1216            Card base
surface-2      #0E1412     #11181C            Elevated card / nested
surface-glass  —           rgba(255,255,255,  Frosted overlays
                            0.04) + blur(20)
bone           #E9E5D8     #E9E5D8            Body text on dark
mute           —           #8A8F98            Secondary text (NEW)
hairline       —           rgba(255,255,255,  Borders / dividers
                            0.08)
signal (pitch) #64D98A     #64D98A            Pitch / data accent
gold (cred)    #D4AF37     #D4AF37            Accreditation only
electric       —           #6EE7FF            Live / interactive accent (NEW)
warn           —           #F5B14C            "Trial window" / urgency (NEW)
```

`electric` is the small jewel — used sparingly on live indicators, cursor
states, command-bar focus rings. Think Linear's purple or Vercel's cyan.

### 3.2 Surface system

The current dossier uses flat panels. The new system has three surface
tiers, with the rule: **only one tier per section**.

```
TIER 1 — FLAT MATTE              TIER 2 — FROSTED GLASS           TIER 3 — LIT GLASS
┌─────────────────────┐          ┌─────────────────────┐          ┌──────────────────────┐
│                     │          │                     │          │  ╱        glow       │
│   surface-1         │          │   surface-glass     │          │ ╱   electric tint    │
│   hairline border   │          │   blur(20) + 1px    │          │ inner gradient stop  │
│                     │          │   white outline     │          │ + radial highlight   │
└─────────────────────┘          └─────────────────────┘          └──────────────────────┘
quiet content                    sectional cards                  hero / "wow" moments
(footer, contact form)           (services, pathway)              (current player feature)
```

Plus a universal **grain layer** (1px noise PNG @ 4-6% opacity) over the
whole page. This is what makes dark SaaS sites look "real" instead of
plasticky — it's why Linear / Resend / Cal feel different from a Bootstrap
template.

### 3.3 Typography

Keep Bebas Neue + Inter — they earn their place. Add a numeric monospaced
face for stat readouts (signals "data" without screaming it):

```
heading   Bebas Neue        H1: 96-128px / 0.95   H2: 56-72px / 0.95
body      Inter             16-18px / 1.65        weight 400
ui        Inter             12-14px / 1.4         weight 500-600, tracking 0.16em
mono      JetBrains Mono    13-16px / 1.4         for GPS readouts, code-like UI
quote     Inter             24-32px / 1.35        weight 500, italic option
```

New rule: **headlines never use Bebas below 32px**. Below that, Inter takes
over. The current site has Bebas at 20-24px in places where it looks like
generic display type — Inter at that size with tighter tracking reads more
expensive.

### 3.4 Motion principles

1. **Scroll-linked motion drives the hero only.** Everywhere else: enter-on-view,
   then settle.
2. **No motion is the default state.** Every animation must have a useful
   static fallback. `prefers-reduced-motion` collapses everything to fades.
3. **Easings come from one set:**
   - `ease-out-expo` for entrances
   - `ease-in-out-quint` for state transitions
   - `linear` for marquees only
4. **Durations:** 250ms (micro), 480ms (entrance), 1200ms+ (cinematic / hero).
   Never 300ms — it's the "default" feel.
5. **Hover micro-interactions:** every interactive surface shifts by ≤2px,
   gains a 1px electric border, and lights its underlying gradient. That's it.
   No bounces, no rotations.

---

## 4. The component library

These are the LEGO blocks. The full site is built from ~10 of them. Each
gets a single component file (`.astro`) and is reused across pages.

### 4.1 `StatBlock` — the workhorse

Big number, tiny label, optional sparkline. Replaces the "metric strip"
in the current hero.

```
┌─────────────────────────────────────────┐
│  ┌─ SIGNAL                              │
│  │                                      │
│  │     U17-U23                          │
│  │     ────────                         │
│  │     AGE BAND                         │
│  │                                      │
│  │     ▁▂▄▃▅▆▇  ← optional micro-chart  │
│  └─                                      │
└─────────────────────────────────────────┘
   Bebas 56-72px  ·  Inter 11px tracking 0.22em
```

### 4.2 `GpsReadout` — the live-data card

A small frosted card that looks like a wearables app. Anchors the
"GPS Analysis" service and appears as a hero detail.

```
┌──────────────── live ●─┐
│ DISTANCE              │
│ 11.4 km   ▔▔▔▔▔▔▔     │
│           ─── avg 9.8 │
│ TOP SPRINT            │
│ 32.6 km/h             │
│ HIGH-INT BURSTS  ◯ ◯ ◯│
│ 24                 +3 │
└───────────────────────┘
```

Mono numerals · electric "live" dot · hairline borders. Pure CSS — no chart
library needed, sparklines are SVG paths.

### 4.3 `TacticBoard` — the pitch diagram

A reusable 2D pitch SVG with positional dots and arrows. Animates on scroll
into view (dots slide to position, then arrows draw). Used to illustrate
"role fit" in pathway sections, and as a hero element.

```
┌────────────────────────────────────────────┐
│  ╔════════════════════════════════════════╗│
│  ║         ⊙        ┄┄┄┄┄┄→ ⊙             ║│
│  ║   ⊙        ⊙              ⊙             ║│
│  ║                                        ║│
│  ║   ⊙         ◉ ←──── focus              ║│
│  ║        ⊙        ⊙                      ║│
│  ║   ⊙                  ⊙                 ║│
│  ╚════════════════════════════════════════╝│
│   ───── role: #8 / box-to-box ─────        │
└────────────────────────────────────────────┘
```

### 4.4 `Marquee` — the "trusted by" strip

Horizontal infinite-scroll of club crests, federation badges, league logos.
Pure CSS keyframe, masks the edges.

```
   ─→  CPL · LEAGUE1 ONT · ONTARIO SOCCER · CSA · MLS NEXT · USL · ...  →
```

Doubles as a "where our players have trialled / signed" strip when we have
the data.

### 4.5 `Bento` — the asymmetric grid

The signature SaaS pattern, football-skinned. Sized to a 4-row, 6-col
grid; cells span 2-4 cols.

```
┌────────────────┬───────────────┬──────────────┐
│                │               │              │
│   FEATURE      │   STAT        │   GPS        │
│   (2x2)        │   (1x2)       │   READOUT    │
│                │               │   (1x2)      │
├────────────────┴───┬───────────┴──────────────┤
│                    │                          │
│   TACTIC BOARD     │   QUOTE + AVATAR         │
│   (3x2)            │   (3x2)                  │
│                    │                          │
└────────────────────┴──────────────────────────┘
```

Used on the homepage "Approach" section and as the Services overview.

### 4.6 `CommandBar` — the global search/nav

**Status: pending browser preview before commit.** User wants to evaluate
the design in-browser before deciding whether to ship it. See § 10
open questions and § 11 next steps.

Floating frosted bar (cmd-K style) that opens a search overlay with
pre-built shortcuts: "Request evaluation", "Read about Burak",
"See services", "Latest media".

```
   ┌─ ⌘K ────────────────────────────────────────┐
   │  ⌕  Search the dossier...           ⏎       │
   ├─────────────────────────────────────────────┤
   │  ★  Start a Player Evaluation               │
   │  →  Services / Representation                │
   │  →  Services / GPS Analysis                  │
   │  ↪  About the agent                          │
   └─────────────────────────────────────────────┘
```

Pure marketing flourish — it costs almost nothing and instantly says
"the people who built this site know what they're doing." Genuinely useful
on a content-rich site, too.

### 4.7 `PathwayTabs` — the U17-U19 / U20-U23 toggle

Replaces the side-by-side panels with a tabbed bento. Selecting a stage
animates the content underneath.

```
   ┌─ U17-U19 ─┬────────── U20-U23 ──────────┐
   ├───────────┴─────────────────────────────┤
   │                                         │
   │  Headline for selected stage            │
   │  ┌─────────┬─────────┬─────────┐        │
   │  │ EVAL    │ FAMILY  │ NEXT    │        │
   │  └─────────┴─────────┴─────────┘        │
   │                                         │
   └─────────────────────────────────────────┘
```

### 4.8 `PlayerCard` — for the Players page

A vertical card with a player image, name, position, age band, and
"watched / signed / placed" status pill. Hover lights the electric border
and reveals a one-line note.

```
┌───────────────────┐
│                   │
│      PHOTO        │
│                   │
│                   │
├───────────────────┤
│ ● WATCHED         │
│ FIRSTNAME LAST    │
│ #8 · U20 · 2007   │
│ ─────────────     │
│ note on hover →   │
└───────────────────┘
```

### 4.9 `GlassNav` — the new nav

Current nav is `bg-background/90 + backdrop-blur-sm`. Upgrade to a true
glass bar that gains a hairline border + shadow only after scroll > 16px.
Active route gets an electric underline (not a color change), and the
right side gets a permanent **"⌘K"** affordance.

The wordmark is preceded by a **24px icon-mark** (DECIDED) — a stylized
pitch arc in gold, designed to read at 16px favicon size. See § 7.1 for
the mark's design brief.

```
┌─────────────────────────────────────────────────────────────────┐
│  ◗  PROKICKTALENT        Home  About  Players  Services …  ⌘K  │
└─────────────────────────────────────────────────────────────────┘
   ↑
   icon-mark, 24px gold pitch-arc, matches favicon
```

### 4.10 `CTAPanel` — the closing block

Big section, single ask. The current gold block is fine in shape but feels
crayon-flat. Upgrade with a radial-gradient pitch glow, grain, and a
"file number" stamp in the corner (PKT-001 / 2026).

---

## 5. The hero animation

This is the showpiece. Decisions:

- **Asset plan is "we can AI-generate"** — this unlocks the strongest option.
- **Aesthetic is SaaS-flavored** — meaning the animation lives inside the
  page's grid, not in its own cinematic break (no full-bleed video moment).
- **Brief is "professional + football passion"** — not necessarily a volley.

### 5.1 Concept — "the strike, deconstructed"

Three layers move on scroll, on a shared timeline (`--progress: 0 → 1`),
inside the hero block. The animation runs over ~120vh of scroll, then
the page continues normally.

```
LAYER ORDER (back → front):

  [1]  HERO PHOTO — full-bleed AI-generated still of a player connecting
       cleanly with a ball. Single image, no sequence. Slight scale (1 → 1.06)
       and brightness curve as we scroll.

  [2]  PITCH GRID OVERLAY — same green grid you have today, but with
       a moving "tactical analysis" highlight: a circle expanding from
       the contact point, plus a faint trajectory arc projected forward.

  [3]  SCOUT OVERLAYS — three glass cards drift in at 33%, 66%, 100% of
       the scroll. Each pins a piece of analysis to a coordinate on the
       photo (contact point, expected ball-flight, defender position).

  [4]  TEXT COLUMN — the headline / sub / CTAs sit pinned on the left,
       crossfading their copy at each timeline beat (DECIDED — three-beat):

         beat 1 (0-33%):   "See the player."
         beat 2 (33-66%):  "Read the evidence."
         beat 3 (66-100%): "Make the move."

       Body subtitle + CTA fade in only at beat 3, so the opening
       reads as a statement, not a pitch. Reduced-motion fallback:
       all three lines stacked, body + CTA visible from frame one.
```

Visualization at three scroll positions:

```
SCROLL 0%
┌────────────────────────────────┬──────────────────────────────────┐
│                                │                                  │
│   See the                      │      [photo: setup, ball at      │
│   player.                      │       feet, player loading]      │
│                                │                                  │
│                                │      ┌── pitch grid faint        │
│                                │                                  │
│                                │                                  │
│                                │                                  │
└────────────────────────────────┴──────────────────────────────────┘

SCROLL 50%
┌────────────────────────────────┬──────────────────────────────────┐
│                                │                                  │
│   Read the                     │      [photo: contact moment,     │
│   evidence.                    │       pitch grid bright]         │
│                                │                                  │
│                                │      ┌─ Scout card drifts in →   │
│                                │      │ Contact: clean            │
│                                │      └─                           │
│                                │           ⊙ ← contact circle      │
│                                │                                  │
└────────────────────────────────┴──────────────────────────────────┘

SCROLL 100%
┌────────────────────────────────┬──────────────────────────────────┐
│                                │                                  │
│   Make the                     │      [photo: follow-through,     │
│   move.                        │       trajectory drawn fwd]      │
│                                │                                  │
│   FIFA-licensed representation │      ┌── 3 cards now visible     │
│   for U17-U23 Canadian         │      │ Contact: clean            │
│   footballers.                 │      │ Trajectory: cleared       │
│                                │      │ Verdict: trial-ready      │
│   [Start an Evaluation →]      │      └──                          │
└────────────────────────────────┴──────────────────────────────────┘
```

### 5.2 Why this works

- **One still image, not a sequence.** AI-generated football action is hit-
  or-miss at scale — getting one great still is far more achievable than a
  coherent 48-frame sequence where Midjourney/Sora keeps the same jersey,
  same body, same ball.
- **The motion comes from overlays, not the photo.** The photo barely moves
  (parallax-style scale). The pitch grid, contact circle, trajectory arc,
  and scout cards do the work. That's a SaaS-marketing-page motion budget,
  not a film budget.
- **Reads instantly as football.** Pitch grid + ball trajectory + contact
  circle = scouting visualization. No one will mistake it for a generic
  hero.
- **Fallback is honest.** With reduced motion: photo at scroll-end state,
  all three cards visible immediately, no scrub. Still a strong frame.
- **Implementable today.** Pure CSS variables + a small scroll listener
  (you already have one — extend it). No GSAP yet. Add it only if we
  decide overlay choreography needs a real timeline.

### 5.3 Asset brief for the AI-generated hero still

Prompt direction (to refine when generating):

> Cinematic photograph, 35mm, shallow depth of field. A male footballer
> mid-strike on an empty practice pitch, late golden hour, low side
> lighting from camera-left. Boot just connecting with the ball, ball
> slightly compressed at contact. Pitch lines visible but understated.
> Background is soft-blurred empty stadium. Player kit is unbranded dark
> navy with a single white stripe. Mood: focused, professional, not
> celebratory. Aspect 16:9. No spectators. No text. No team logos.

Brand-safety notes: unbranded kit (no copyright issues), no recognizable
faces (avoids licensing problems if AI generates someone real-looking),
empty stadium (we're an agent, not a club), golden hour (matches the
gold accent in the palette).

Generate 30-50 candidates, pick 1 with the cleanest contact frame and
best left/right negative space for the text column and overlay cards.

---

## 6. Page-by-page sketches

### 6.1 Home (`/`)

Sections (top to bottom):

```
┌─ 1. HERO + STRIKE ANIMATION ─────────────────────────────────────┐
│   (Section 5 above. Pinned for ~120vh of scroll.)                │
└──────────────────────────────────────────────────────────────────┘

┌─ 2. PROOF MARQUEE ───────────────────────────────────────────────┐
│   FIFA · CANADA SOCCER · LEAGUE1 ONT · CPL · MLS NEXT · USL ...  │
│   (Slow horizontal scroll, monochrome, mask edges.)              │
│                                                                  │
│   DECIDED: real federation / league marks ONLY where the         │
│   relationship is honestly citable. FIFA-licensed agent = OK.    │
│   Any "trusted by" implication needs a verified relationship.    │
│   If a mark can't be cited at launch, omit it; do not stand it   │
│   up as a placeholder. See §10 for the launch-set audit task.    │
└──────────────────────────────────────────────────────────────────┘

┌─ 3. APPROACH BENTO ──────────────────────────────────────────────┐
│   ┌────────────────┬───────────────┬──────────────┐              │
│   │ Heading +      │ GPS Readout   │ Credentials  │              │
│   │ Body (2x2)     │ component     │ stack:       │              │
│   │                │ (sample data, │ FIFA license │              │
│   │                │ clearly so)   │ Region · etc │              │
│   ├────────────────┴───┬───────────┴──────────────┤              │
│   │  Tactic Board      │  Pull quote from Burak   │              │
│   │  (3x2)             │  + avatar (3x2)          │              │
│   └────────────────────┴──────────────────────────┘              │
│                                                                  │
│   NOTE: GPS readout uses sample values labelled "EXAMPLE" so it  │
│   illustrates the deliverable without making a live claim.       │
└──────────────────────────────────────────────────────────────────┘

┌─ 4. PATHWAY TABS ────────────────────────────────────────────────┐
│   U17-U19  │  U20-U23                                            │
│   ━━━━━━━━                                                       │
│   Selected stage expands to a three-column                       │
│   (Evaluate / Family / Next Move) bento.                         │
└──────────────────────────────────────────────────────────────────┘

┌─ 5. SERVICES — 4 LIT-GLASS CARDS ────────────────────────────────┐
│   ┌─────────┬─────────┬─────────┬─────────┐                      │
│   │ 01 REP  │ 02 GPS  │ 03 SCT  │ 04 CAR  │                      │
│   │         │         │         │         │                      │
│   │  glass  │  glass  │  glass  │  glass  │                      │
│   └─────────┴─────────┴─────────┴─────────┘                      │
│   Each card has a 32px decorative ICON drawn from a              │
│   football-tactics-glyph set (whistle, GPS waypoint,             │
│   binoculars, compass).                                          │
└──────────────────────────────────────────────────────────────────┘

┌─ 6. AGENT FEATURE ───────────────────────────────────────────────┐
│   Asymmetric: 5/12 portrait card on left, 7/12 quote + credential│
│   grid on right. Single "Meet Burak →" link.                     │
└──────────────────────────────────────────────────────────────────┘

┌─ 7. CTA PANEL ───────────────────────────────────────────────────┐
│   Gold panel, but with: radial pitch glow, grain, file-number    │
│   stamp ("PKT / 2026 / EVAL REQUEST"), and a frosted secondary   │
│   CTA next to the primary.                                       │
└──────────────────────────────────────────────────────────────────┘
```

### 6.2 About (`/about`)

The current page is a generic mission + founder split. Rebuild as a
**timeline + portfolio** narrative:

```
┌─ HERO: "About ProKickTalent" — short, glassy, no animation ──────┐

┌─ MISSION BLOCK — single column, larger type, pull-quote in middle┐

┌─ TIMELINE: BURAK'S PATH ─────────────────────────────────────────┐
│   Vertical timeline with year nodes. Each node is a glass card.  │
│                                                                  │
│   2018 ●─── Began player advisory work                           │
│   2021 ●─── First FIFA-aligned representation                    │
│   2024 ●─── Founded ProKickTalent Sports Group                   │
│   2026 ●─── GPS analytics integrated into evaluations            │
└──────────────────────────────────────────────────────────────────┘

┌─ CREDENTIALS BENTO ──────────────────────────────────────────────┐
│   FIFA license card / Region card / Networks card / Approach card│
└──────────────────────────────────────────────────────────────────┘

┌─ "WHO WE WORK WITH" — small grid of partner / federation marks ──┐

┌─ CTA PANEL (shared) ─────────────────────────────────────────────┐
```

### 6.3 Players (`/players`)

Currently a "What we look for" + "Are you next" recruitment page. The
biggest upgrade: a **real player roster grid** using `PlayerCard`,
with filter tabs and a recruitment block at the end.

```
┌─ HERO: split — left big headline, right one featured PlayerCard ─┐

┌─ FILTER TABS: All · Watched · Trialing · Signed · Placed ────────┐
│                                                                  │
│   ┌──────┬──────┬──────┬──────┐                                  │
│   │  P1  │  P2  │  P3  │  P4  │   ← PlayerCard component         │
│   ├──────┼──────┼──────┼──────┤                                  │
│   │  P5  │  P6  │  P7  │  P8  │                                  │
│   └──────┴──────┴──────┴──────┘                                  │
└──────────────────────────────────────────────────────────────────┘

┌─ "WHAT WE LOOK FOR" — 3 bento blocks, glass tier 2 ──────────────┐

┌─ RECRUITMENT CTA — "Are you next?" full-bleed with a single ─────┐
│   form-launching button. No long form on the page — opens a modal│
│   with the contact form.                                         │
└──────────────────────────────────────────────────────────────────┘
```

**DECIDED:** launch with 4-6 **anonymized "watched player" cards** —
e.g. "U19 winger / Ontario / 2007", silhouette image, no name, no face.
Real players (with consent) come later once relationships and clearances
are in place. The `PlayerCard` component supports both modes via a
`mode: "anonymized" | "real"` prop so we can mix as the roster matures.

### 6.4 Services (`/services`)

Currently alternating left-right blocks per service. Rebuild as four
**deep service pages anchored from a hub**:

```
HUB PAGE
┌─ HERO: "What we do" + filter chips for each service ─────────────┐

┌─ SERVICE HUB GRID — 4 large lit-glass cards ─────────────────────┐
│   Each card: icon · title · 1-line outcome · "Open dossier →"    │
│   Hover: card lifts, electric border, "outcome" line expands.    │
└──────────────────────────────────────────────────────────────────┘

PER-SERVICE SECTION (anchored, not separate page)
┌─ Service header: number + name + tagline ────────────────────────┐
┌─ "What you get" — 3-column list ─────────────────────────────────┐
┌─ Service-specific visual:                                        │
│   · Representation → Contract clauses diagram                    │
│   · GPS → Full-size GpsReadout                                   │
│   · Scouting → TacticBoard with annotated zones                  │
│   · Career → Pathway timeline graph                              │
└──────────────────────────────────────────────────────────────────┘
┌─ Service-specific CTA + back-to-hub link ────────────────────────┐
```

### 6.5 Media (`/media`)

Currently a 3-col aspect-square grid. Upgrade to a **masonry / mixed-
aspect bento** with hover-lift, plus a press section.

```
┌─ HERO: "Media" — small, with an Instagram follow CTA top-right ──┐

┌─ MASONRY GRID — 4 cols desktop, varied aspect ratios ────────────┐
│                                                                  │
│   ┌────┬────────┬────┐                                           │
│   │ A  │   B    │ C  │                                           │
│   │    ├────────┤    │   On click → lightbox overlay             │
│   ├────┤   D    │    │   On hover → caption fades in             │
│   │ E  ├────────┼────┤   from bottom on a frosted gradient       │
│   │    │   F    │ G  │                                           │
│   └────┴────────┴────┘                                           │
└──────────────────────────────────────────────────────────────────┘

┌─ PRESS / LINKS — horizontal scroll row of article cards ─────────┐
│   "PKT featured in League1 Ontario newsletter — June 2026"       │
└──────────────────────────────────────────────────────────────────┘
```

### 6.6 Contact (`/contact`)

The form is fine functionally. Upgrade the chrome: glass form panel,
field focus states with electric ring, and a **"What to expect"** column
beside the form (response time, what info to bring, how the first call
goes). This converts higher than "Send a message → ?".

```
┌─ HERO: "Get in touch" — short ───────────────────────────────────┐

┌─ TWO-COLUMN BENTO ───────────────────────────────────────────────┐
│                                                                  │
│   ┌──── FORM (glass tier 2) ────┬── WHAT TO EXPECT (tier 1) ───┐ │
│   │  name                       │  ⊙ 24h response               │ │
│   │  email                       │  ⊙ 20-min intro call          │ │
│   │  interest [select]           │  ⊙ what to send beforehand    │ │
│   │  message                     │  ⊙ confidentiality            │ │
│   │  [submit]                    │  ───                          │ │
│   │                              │  alt contact:                 │ │
│   │                              │  email · IG · WhatsApp        │ │
│   └──────────────────────────────┴──────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Asset plan (AI-generated)

Total assets to commission/generate, with brand-safety guidance:

| Asset                        | Count | Notes                                     |
|------------------------------|-------|-------------------------------------------|
| Hero strike still            | 1     | See § 5.3 brief. Generate 30+, pick best. |
| Brand icon-mark              | 1     | See § 7.1 below.                          |
| Service icons                | 4     | Monoline, ~32px, stroked. Generate as SVG-friendly raster, re-trace. |
| Tactic-board background      | 1     | Top-down pitch outline. Better as hand-drawn SVG than AI. |
| Player roster placeholders   | 4-6   | Silhouettes from behind (no face), unbranded kit. For Players page anonymized roster. |
| Federation / league marks    | 0-N   | Only those honestly citable at launch. See § 6.1 marquee note. |
| Texture grain PNG            | 1     | Single 512x512 noise tile. Generate or download CC0. |

**Hard rule:** zero AI-generated photos of recognizable people. Faces blurred,
back-of-head shots only, or composite silhouettes. Two reasons: copyright
risk and the "this isn't a real person we represent" problem.

### 7.1 Brand icon-mark brief

**DECIDED:** add a small icon-mark beside the wordmark in `GlassNav` and as
the favicon. Direction: **stylized pitch arc** — the curve of a goal-line
or a centre-circle, rendered as a single gold stroke on dark.

```
Concept variations to sketch (pick one in design phase):

   ◗            ⟁            ◞◟           ⌒          ●─
  arc          ball         goalmouth   trajectory  contact
  (single)     (geometric)  (paired)    (curve)     (dot+line)
```

Constraints:
- Must read at 16px (favicon). Test before committing.
- Single colour: gold (`#D4AF37`) on dark, ink (`#07090B`) on light.
- Monoline, no shading, no gradients.
- Optical balance with the wordmark "PROKICKTALENT" — neither dominates.
- Square or 1:1.2 bounding box for clean OG image / social card use.

Deliverables: SVG master + 16/32/64/192/512 PNGs for favicon set,
single-colour and inverted variants.

---

## 8. Tech approach

What stays, what changes, what's added.

```
STAYS                                  CHANGES                              ADDS
──────────────────────────────────────────────────────────────────────────────────────────
Astro 5                                tailwind.config (palette extend)     None required to ship
Tailwind 3                             global.css (rebuilt utilities)
Keystatic CMS                          All page .astro files                Optional:
Cloudflare Pages deploy                Nav (becomes GlassNav)                 · GSAP (only if hero
React (already installed)              Layout (adds grain + global glass     timeline outgrows CSS)
                                        wrapper)                              · class-variance-
                                                                             authority (for
                                                                             component variants —
                                                                             pure JS, 2KB)
```

**Components architecture:** create `src/components/ui/` for the 10 reusable
blocks. Each block is a single `.astro` file with slot-based composition.
Pages import from `ui/` and never reimplement the same pattern.

**Why no React (mostly):** Keep components as Astro islands only when
interactivity needs state (CommandBar, PathwayTabs, Player filter, Media
lightbox). The bento, stat blocks, marquee, GPS readout, tactic board,
hero animation are pure HTML/CSS/tiny vanilla JS. This keeps the bundle
tiny — Astro ships zero JS by default.

**Why no animation library yet:** the current hero scroll handler (15 lines
of vanilla JS in `src/pages/index.astro`) is genuinely fine for what we
need. Defer GSAP / Framer to when we actually hit its wall.

---

## 9. Phased rollout

Three phases. Each is shippable on its own — no broken in-between states.

### Phase 1 — System foundation (~3-4 days of work)

- New `tailwind.config.mjs` palette + new tokens.
- New `global.css` — grain layer, surface tiers, motion easings.
- `GlassNav` replaces the current `Nav.astro`.
- Build the 10 components in `src/components/ui/`. Each gets a Storybook-
  style demo in a `/_dev/components` route gated by env var (for review).
- No page changes yet. Site looks identical to users.

### Phase 2 — Homepage (the showpiece, ~5-7 days)

- Generate the hero still (§ 5.3).
- Rebuild `src/pages/index.astro` using the components, in the 7-section
  structure from § 6.1.
- Wire the strike animation (extend the existing scroll handler).
- Add the `homepage.json` Keystatic fields for any new editable copy.
- Ship.

### Phase 3 — Inner pages (~5-7 days)

- About, Players, Services, Media, Contact in that order.
- Each rebuilt page reuses Phase 1 components.
- Players page: decide on real-vs-anonymized roster before this phase.
- Services page: keep current per-service Keystatic content, restructure
  the layout only.
- Final QA: lighthouse, reduced-motion, mobile, dark/light meta theme,
  every form submission path, every internal link.

---

## 10. Risks & open questions

### Risks

- **AI hero still ends up looking "off"** — the boot, the ball compression,
  the lighting all have to be right. Mitigation: generate 30-50, be ready
  to skip Phase 2 by a few days if the still isn't there.
- **Glass / blur performance on low-end mobile** — backdrop-filter can chug.
  Mitigation: feature-detect `@supports (backdrop-filter)`, fall back to
  solid `surface-1` for older browsers.
- **Marquee + grain + glass can collectively feel "too much"** — modern SaaS
  sites that overdo all three look like AI-generated themselves. Mitigation:
  audit total motion density per section; one "alive" element per fold max.
- **PlayerCard / roster is a privacy and consent question, not a design
  question** — must not ship before clearance.
- **Doubling the asset count means doubling the maintenance** — keep
  imagery in Keystatic-managed fields wherever practical so editors can
  swap them without code changes.

### Decisions log (resolved)

| # | Question | Decision |
|---|----------|----------|
| 1 | Hero copy | **Three-beat copy** that crossfades with the scroll timeline: "See the player." → "Read the evidence." → "Make the move." Body subtitle + CTA fade in only at beat 3. See § 5.1. |
| 2 | Roster | **Anonymized placeholders** at launch ("U19 winger / Ontario / 2007", silhouette image). `PlayerCard` supports both anonymized and real modes for later. See § 6.3. |
| 3 | Live numeric claims | **Dropped.** No "● Evaluating 4 players this month" or similar. GPS readouts are explicitly labelled as illustrative sample data. See § 6.1 §3. |
| 5 | Logo | **Yes — stylized pitch-arc icon-mark in gold.** Brief in § 7.1. |
| 6 | Marquee | **Real federation / league marks only where the relationship is honestly citable.** Omit, do not placeholder. See § 6.1 §2. |

### Open questions (still need a call)

1. **Command bar (§ 4.6)** — keep, cut, or build-but-defer? User wants to
   see the design in a real browser before committing. Action item: build
   a standalone HTML preview file the user can open and react to. See § 11.
2. **Marquee launch set** — concrete audit of which federation / league
   marks PKT can cite at launch. "FIFA Licensed" is a given. Beyond that,
   needs Burak to enumerate verified relationships. If the answer is "none
   beyond FIFA", the section becomes a single accreditation block, not a
   marquee.
3. **Logo direction within § 7.1** — five concept variations sketched;
   one needs to be picked before icon production starts.
4. **Phase 1 dev preview route** — should `/_dev/components` be gated by
   a Cloudflare Pages preview environment, an env-var check, or simply
   not shipped to production builds? Trivial decision but needs a call
   before Phase 1 starts.

---

## 11. What I'd recommend next

In order:

1. **Build the CommandBar HTML preview** — user wants to evaluate the
   pattern in-browser before committing. A standalone, self-contained HTML
   file in `docs/previews/command-bar.html` that opens locally and shows
   idle / focused / open / results states. (Requires exiting explore mode.)
2. **Audit the marquee launch set** with Burak — list every federation,
   league, club, media outlet, or partner whose mark we can honestly use,
   and decide whether the marquee survives or becomes a single accreditation
   block.
3. **Generate the hero still** — this is the single biggest binary risk.
   Do this before any code is written. See § 5.3 prompt brief.
4. **Pick a logo concept** from § 7.1 and produce the icon-mark + favicon set.
5. **Build Phase 1 (foundation + components)** in a branch, behind a
   `/_dev/components` preview route.
6. **Convert OpenSpec change** — when Phase 1 is approved, formalize this
   doc as an OpenSpec proposal so the work tracks against specs.

This doc stays as the design north star. If decisions shift during
implementation (e.g. we drop the command bar, we change the palette),
update this file rather than letting it drift.
