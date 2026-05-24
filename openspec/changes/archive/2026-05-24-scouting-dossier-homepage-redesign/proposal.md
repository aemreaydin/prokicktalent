## Why

The current homepage presents ProKickTalent with a competent but generic dark sports-agency layout. The redesign should make the site immediately feel like a FIFA-licensed football agent evaluating and guiding serious U17-U23 players, with the homepage reading more like a premium scouting dossier than a template landing page.

## What Changes

- Redesign the homepage around a "Scouting Dossier" concept: match-film imagery, pitch-grid structure, pathway stages, evaluation notes, service modules, and verified agent credentials.
- Replace generic card sections with football-specific report surfaces that communicate scouting, GPS analysis, representation, and career planning.
- Position the target audience as U17-U23 players only, excluding U13-U16 from homepage messaging.
- Add a first-screen scroll animation concept where a player/action moment or ball trajectory resolves into scouting overlays, pitch lines, and pathway information.
- Update primary homepage calls to action toward evaluation-oriented language such as "Start a Player Evaluation" while keeping consultation intent clear.
- Preserve static-site performance, accessibility, and graceful reduced-motion behavior.

## Capabilities

### New Capabilities
- `homepage-scouting-dossier`: Defines the homepage experience as a football-specific scouting dossier for U17-U23 players, including motion, section content, visual language, and conversion behavior.

### Modified Capabilities

## Impact

- Affected pages/components: `src/pages/index.astro`, shared layout/nav/footer styling as needed, and potentially new homepage-only components.
- Affected content: `src/content/homepage.json` if copy becomes content-managed.
- Affected styles: `src/styles/global.css`, `tailwind.config.mjs`, and homepage-specific utility classes or CSS.
- Possible dependency impact: may add an animation library such as GSAP for scroll-linked hero motion if CSS/IntersectionObserver is insufficient.
- No backend/API changes expected.
