## 1. Content and Structure

- [x] 1.1 Audit current homepage sections, content fields, and image assets for reuse in the dossier redesign
- [x] 1.2 Define final homepage section order: dossier hero, pathway matrix, agent evaluation notes, service modules, and final CTA
- [x] 1.3 Update homepage copy to use U17-U23 positioning and evaluation-oriented CTA language
- [x] 1.4 Decide which new copy belongs in `src/content/homepage.json` versus homepage/component code

## 2. Static Dossier Layout

- [x] 2.1 Replace the current generic homepage hero with a static scouting dossier hero layout
- [x] 2.2 Replace age cards with a U17-U19 and U20-U23 player pathway matrix
- [x] 2.3 Rework the agent credibility section into a verified evaluation context using Burak's photo and credentials
- [x] 2.4 Rework service overview cards into football-specific dossier modules
- [x] 2.5 Update the final CTA section to align with player evaluation or pathway review language

## 3. Visual System

- [x] 3.1 Add or adjust design tokens for dossier surfaces, pitch-grid lines, report borders, metadata labels, and credential accents
- [x] 3.2 Add football-specific visual motifs such as match-film frames, pitch coordinates, trajectory lines, scouting notes, and stamped labels
- [x] 3.3 Ensure gold is used primarily for accreditation/CTA emphasis and green for pitch or data context
- [x] 3.4 Remove or reduce generic card styling where it conflicts with the dossier concept

## 4. Scroll Motion

- [x] 4.1 Implement a desktop hero scroll sequence that reveals scouting overlays or a ball trajectory in response to scroll progress
- [x] 4.2 Add GSAP ScrollTrigger only if the required pinned/scrubbed behavior cannot be implemented cleanly with CSS and lightweight JavaScript
- [x] 4.3 Add a reduced-motion fallback that presents a complete readable hero state without scroll-dependent animation
- [x] 4.4 Add a mobile-friendly simplified motion or step reveal that does not harm normal scrolling

## 5. Accessibility and Responsiveness

- [x] 5.1 Verify all CTA links, service links, and navigation remain keyboard-accessible and clearly labeled
- [x] 5.2 Verify text contrast, readable font sizes, and non-overlapping layouts across desktop and mobile breakpoints
- [x] 5.3 Ensure animation and decorative overlays do not obscure essential text or controls
- [x] 5.4 Ensure page content remains understandable when images fail to load

## 6. Verification

- [x] 6.1 Run `npm run build` with telemetry disabled if needed
- [x] 6.2 Run a local preview or dev server and inspect the homepage on desktop and mobile viewport sizes
- [x] 6.3 Check that no U13-U16 homepage messaging remains
- [x] 6.4 Verify the homepage satisfies every `homepage-scouting-dossier` requirement
