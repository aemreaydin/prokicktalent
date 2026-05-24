## ADDED Requirements

### Requirement: Site Speaks One Modern Design Language

The marketing site SHALL present every public page using the shared
`marketing-site-experience` visual system — palette, typography, surface
tiers, motion vocabulary, and component library — so that any two pages are
visibly part of one product.

#### Scenario: Visitor moves between any two pages
- **WHEN** a visitor navigates from one public page to another
- **THEN** palette, typography, navigation chrome, surface treatments, and
  motion feel continuous, not template-switched
- **THEN** shared components (nav, footer, CTA panel, bento blocks) render
  identically across pages

### Requirement: UI Design Artifacts Precede Implementation

The change SHALL produce standalone in-browser UI design previews in
`docs/previews/` for user review and selection before any implementation
work touches the live site under `src/`.

#### Scenario: Phase A artifacts are produced
- **WHEN** Phase A tasks are executed
- **THEN** the user can open `docs/previews/*.html` files in a browser
  without a build step and review the design system, components, command
  bar, hero animation, and per-page mockups
- **THEN** no production page in `src/pages/` is modified during Phase A

#### Scenario: Phase B begins
- **WHEN** Phase B implementation work begins
- **THEN** every component, copy decision, animation behavior, and asset in
  the live site traces back to a Phase A artifact the user reviewed

### Requirement: Hero Renders a Scroll-Driven Football Strike Moment

The homepage hero SHALL present a scroll-driven sequence built around a
single football-action still with pitch grid, contact circle, trajectory
arc, and scout-overlay cards that resolve over scroll progress.

#### Scenario: Desktop visitor scrolls through the hero
- **WHEN** a desktop visitor scrolls through the opening hero area
- **THEN** the headline crossfades through three beats
  ("See the player." → "Read the evidence." → "Make the move.")
- **THEN** pitch grid, contact circle, trajectory arc, and scout cards
  reveal in sequence tied to scroll progress
- **THEN** the body subtitle and primary CTA appear at the final beat

#### Scenario: Visitor prefers reduced motion
- **WHEN** the visitor has `prefers-reduced-motion: reduce` enabled
- **THEN** the hero renders the final beat statically — all three copy
  lines visible, all overlays visible, no scroll-dependent animation

#### Scenario: Visitor on a small mobile viewport
- **WHEN** the visitor opens the homepage on a small mobile viewport
- **THEN** the hero presents a simplified non-pinned version that does not
  trap or fight normal scrolling

### Requirement: Brand Identity Includes an Icon-Mark

The site SHALL display a stylized pitch-arc icon-mark in gold beside the
PROKICKTALENT wordmark in navigation, and SHALL use a matching favicon
across browser tabs, bookmarks, and social previews.

#### Scenario: Visitor sees the global navigation
- **WHEN** a visitor sees the global navigation on any page
- **THEN** the wordmark is preceded by the icon-mark
- **THEN** the icon-mark renders legibly at the 16px favicon size

### Requirement: Players Page Launches With Anonymized Roster Cards

The players page SHALL display only anonymized player cards at launch —
age band, position, region, year — using silhouette imagery, no real names
or recognizable faces.

#### Scenario: Visitor views the players page
- **WHEN** a visitor opens `/players`
- **THEN** every card on the page identifies players only by anonymized
  attributes (e.g. "U19 winger / Ontario / 2007")
- **THEN** no card displays a real player's name, face, or club without
  written consent recorded in the project

#### Scenario: A real player joins the site later
- **WHEN** a real player with consent is added to the roster
- **THEN** the `PlayerCard` component renders that player in its "real"
  variant while remaining anonymized cards continue to render alongside

### Requirement: Site Makes No Unverified Numeric Claims

The site SHALL NOT display live activity counters, performance numbers, or
roster statistics as truthful claims unless the data is verifiable.

#### Scenario: Marketing component uses example data
- **WHEN** any marketing component (GPS readout, sample report) displays
  numeric values for illustration
- **THEN** the component is visibly labelled `EXAMPLE` or equivalent so no
  visitor can mistake the values for a real player's report

#### Scenario: Site presents activity or volume metrics
- **WHEN** the site presents activity or volume metrics
- **THEN** those metrics reflect verifiable, recorded reality
- **THEN** placeholder numbers (e.g. "Evaluating N players this month")
  do not appear in production

### Requirement: Marquee Cites Only Honestly-Verifiable Marks

The proof / trust marquee SHALL display only federation, league, club, or
media marks where the relationship can be cited honestly.

#### Scenario: A mark cannot be cited at launch
- **WHEN** a federation or league mark cannot be cited honestly at launch
- **THEN** the mark does not appear in the marquee
- **THEN** the marquee either omits the mark or, if too few marks remain,
  is replaced by a single accreditation block

### Requirement: Site Remains Static-Site Friendly and Accessible

The site SHALL remain compatible with Astro static rendering, deployable
to Cloudflare Pages, and accessible to keyboard and assistive-technology
users.

#### Scenario: Site builds for deployment
- **WHEN** the production build runs
- **THEN** every page builds without backend, runtime data, or per-request
  dependencies
- **THEN** the build artifact deploys unchanged to Cloudflare Pages

#### Scenario: Visitor uses keyboard or assistive technology
- **WHEN** a visitor navigates any page with keyboard or assistive
  technology
- **THEN** every interactive element is reachable, focusable, and labelled
- **THEN** focus order matches visual reading order
- **THEN** decorative animation and overlay elements do not obscure or
  intercept content

### Requirement: Component Library Backs the Whole Site

The site SHALL implement recurring marketing patterns as Astro components
in `src/components/ui/` and SHALL NOT reimplement those patterns inside
individual page files.

#### Scenario: A page uses a marketing pattern
- **WHEN** any page renders a stat block, GPS readout, tactic board,
  marquee, bento, command bar, pathway tab, player card, glass nav, or CTA
  panel
- **THEN** that pattern is imported from `src/components/ui/`
- **THEN** the page does not duplicate the markup, styling, or behavior of
  the component locally
