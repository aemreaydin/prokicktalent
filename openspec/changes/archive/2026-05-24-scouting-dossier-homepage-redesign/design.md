## Context

ProKickTalent is an Astro/Tailwind static marketing site for FIFA-licensed football agent Burak Can Piroglu. The current homepage uses a dark gradient hero, condensed display type, gold accents, and repeated card layouts. It communicates professionalism, but it does not yet feel specific to football evaluation, scouting, GPS data, or player pathway planning.

The redesign should focus on the homepage and reposition it around a "Scouting Dossier" experience for U17-U23 players and their families. The site already has relevant football imagery and an agent portrait in `public/images/`, and the content is partly managed through Keystatic JSON.

## Goals / Non-Goals

**Goals:**
- Make the homepage feel like a premium football scouting report rather than a generic agency landing page.
- Make U17-U23 the only represented age range on the homepage.
- Use football-specific visual structures: match-film frames, pitch grids, trajectory lines, evaluation notes, metric blocks, credential stamps, and pathway modules.
- Add a scroll-driven opening experience where a football action moment resolves into scouting overlays and pathway context.
- Keep the site static, fast, accessible, and compatible with Cloudflare Pages.
- Preserve the existing information architecture and main navigation.

**Non-Goals:**
- No backend, portal, real player database, or interactive account system.
- No full-site redesign beyond shared styling needed to make the homepage coherent.
- No real scouting report generation or GPS data ingestion.
- No U13-U16 marketing or service positioning.
- No animation that blocks reading, traps scrolling, or becomes required to understand the page.

## Decisions

### Keep the Redesign Homepage-First

The implementation should primarily change `src/pages/index.astro` and introduce homepage-only components if the markup becomes hard to maintain.

Alternatives considered:
- Full site redesign: better consistency, but too broad for this change.
- Homepage-only inline markup: fastest, but risks a large, hard-to-scan Astro file.

Rationale: the homepage carries the first impression and conversion path. Shared nav/footer changes should be minimal unless the new visual system exposes a clear mismatch.

### Use a Dossier System Instead of Standard Cards

The visual language should use report-like modules: section labels, file IDs, pitch coordinates, evaluation rows, clipped image frames, metadata strips, and restrained stamps. Gold should signal accreditation and verification; green should signal pitch/data context.

Alternatives considered:
- Keep dark/gold cards and add imagery: easier but still generic.
- Cinematic sports poster style: more dramatic but less aligned with an agent's trust and advisory role.

Rationale: parents, players, and clubs should immediately understand that ProKickTalent evaluates, guides, and represents serious players.

### Use a Scroll-Linked Hero Timeline With Reduced-Motion Fallback

The hero should include a first-screen scroll sequence: match/action frame, ball or trajectory movement, scouting overlay reveal, and pathway summary. Use GSAP ScrollTrigger if a scrubbed pinned timeline is needed; otherwise use lightweight IntersectionObserver/CSS for simpler reveal states.

Alternatives considered:
- CSS-only animation: best for performance, but weak for scrubbed scroll timing.
- Lottie/Rive-only animation: good for custom motion, but requires creating or sourcing a separate animation asset.
- Spline/3D: visually distinctive, but too heavy and less credible for this professional service site.

Rationale: GSAP gives reliable pin/scrub behavior when needed, while the fallback requirement protects accessibility and mobile usability.

### Treat Content as Structured Homepage Data Where Practical

Copy that is likely to change, such as headline, CTA labels, pathway descriptions, and service summaries, should remain in Keystatic-backed JSON if the implementation can do so cleanly. Purely presentational labels and decorative dossier metadata can remain in code.

Alternatives considered:
- Hardcode all new copy: faster but harder to maintain.
- Model every visual label in content: flexible but noisy for editors.

Rationale: the current site already uses `src/content/homepage.json`; the redesign should not make routine copy edits harder.

### Verify Responsive and Motion Behavior

The homepage should be checked on desktop and mobile. Mobile should not rely on a complex pinned animation if it harms scroll ergonomics; it can use a simplified static or step-based version of the same dossier concept.

Alternatives considered:
- Same pinned timeline everywhere: consistent but risky on mobile.
- Disable all motion on mobile: safe but loses the opening concept.

Rationale: the motion should support the message, not become the product.

## Risks / Trade-offs

- Scroll animation may feel gimmicky or slow → Keep it tied to scouting overlays and provide a readable static state.
- New animation dependency may increase bundle size → Use GSAP only for the homepage and avoid shipping it globally.
- Dossier visuals may become visually busy → Use clear hierarchy, limited accents, and real whitespace.
- Existing content fields may not map cleanly to the new structure → Add only the content fields needed for editable business copy.
- Real images may not perfectly match the intended scouting/action moment → Use current assets as credible placeholders and structure the design so better photography can drop in later.
- Dark UI can hurt readability → Keep body copy sizes comfortable and ensure contrast for labels, notes, and CTA states.

## Migration Plan

1. Build the new homepage behind the existing route by replacing the current homepage sections in place.
2. Update homepage content fields as needed for U17-U23 pathway and evaluation-oriented CTA copy.
3. Add animation behavior progressively after the static dossier layout is complete.
4. Verify build, desktop/mobile rendering, reduced-motion behavior, and all homepage links.
5. Roll back by reverting the homepage/component/style changes if the redesign introduces deployment or usability issues.

## Open Questions

- Should the primary CTA label be exactly "Start a Player Evaluation" or a softer variant like "Request a Player Evaluation"?
- Should the hero use current stadium/agent imagery first, or should new football action imagery be sourced before implementation?
- Should GPS-style metric values be real examples, clearly illustrative labels, or avoided until real reporting data is available?
