# Peer-site research — premium sports agents, editorial football, luxury references

**Date:** 2026-05-23
**Purpose:** Inform the typography + visual direction for the
`modern-football-site-redesign` OpenSpec change. Captured here because the
research scope (13 sites across three categories) is substantial enough to
deserve its own reference, separate from the design doc.

---

## Audit table

| Site | Typography | Color & Restraint | Layout Density | Hero | Distinctive |
|------|-----------|-------------------|----------------|------|-------------|
| **wassermanmedia.com** → the.team ("THE·TEAM") | **Gotham** family self-hosted — Light, Book, Medium, Bold, Ultra | Dark theme. Image-led; minimal beyond neutrals; ≤1 chromatic accent. | ~5–6 sections. Moderate, image-anchored. | Full-width banner with centered editorial statement: *"We believe in the unifying power of Sports, Music and Entertainment"* — italics inside upright roman. | Brand mark uses interpunct ("THE·TEAM"). Italics-as-emphasis creates editorial cadence, not marketing. |
| **caasports.com** | Couldn't determine — site is the templated **Sidearm Sports** CMS (college-athletics platform). Body inherits system stack. | Navy + white. Multi-color partner logo strip. ~2–3 accents. | Busy — schedule + news + standings + 5+ partner logos on one homepage. | Schedule/scores-first template hero. No editorial photography, no manifesto. | The "agency" page runs on the **NCAA conference template** — inherits the live-scores conventions rather than running bespoke design. |
| **klutchsports.com** | Couldn't load — connection times out (multiple attempts). | — | — | — | — |
| **rocnationsports.com** → rocnation.com/sports | `font-family:"Roboto Condensed", sans-serif` is the sole declared web font. Condensed grotesque only. | Heavily neutral, brand black/white. Social-icon accent colors only. | Long single-column scroll dominated by embedded social feeds (YouTube/Threads/Snapchat repeat). Busy lower fold. | Brand mark + tagline over imagery → dives into social embeds. | Folded into parent Roc Nation site as a section — no standalone domain. Identity carried by **Roboto Condensed alone**, no pairing. |
| **excelsm.com** | Adobe Typekit kit `uvn3dfh.css` + Google Fonts kitchen sink (Poppins, Droid Serif, Dosis, Playfair Display, Oswald, Roboto). WordPress/Elementor build. | Dark hero, white type. Two-color; photography supplies all color. | Moderate. ~4 nav verticals (Talent / Brands / Properties / About) with mega-menu. | Revolution Slider with split tri-pane imagery. Centered all-caps display: **"CHANNELING THE POWER OF SPORT"**. | The hero is a **three-pane split-screen** — Talent/Brands/Properties simultaneously navigation and hero imagery. |
| **stellargroup.com** | Self-hosted **Avenir Next** family (Regular through Heavy + italics). | Single warm accent (orange-yellow) over neutrals. One-color-and-neutrals. | Moderate–spacious. ~7–8 sections. | H1 + subhead + 3 CTAs + background video (autoplay muted loop). | **Caveat:** this is Stellar Entertainment (inflight content), NOT the football agency. Numeric stat band ("30M+ passengers") is the dominant trust device. |
| **gestifute.com** | Google Fonts: **Source Sans Pro** + **Maven Pro**. Two humanist sans, no serif. | White ground, dark navy text. Single accent. ~2 accents total. | Moderate. ~5–6 sections. Spacious typography. | Full-bleed background image + Portuguese-language statement overlay. | **Founder-as-page**: Jorge Mendes is the structural anchor, not the roster. Three-office address block replaces a services section. |
| **theplayerstribune.com** | **Publico Headline** (serif) + **Publico Text** (serif body) + **Graphik** (sans UI). Self-hosted via Minute Media CDN. Classic **Commercial Type** editorial pairing. | White ground, black text, 2–3 grey UI tones. Photography supplies all color. | Busy. ~8–10 sections. Multi-card grids per section. | No single hero — grid of athlete-bylined feature cards with 16:9 photography. Titles like *"Your Dad, the Magician"*, *"Dear Villa"* establish voice immediately. | **Athlete-as-byline** is the structural conceit. Identity carried by Publico (serif) over Graphik (sans). |
| **mundialmag.com** | Self-hosted **Public Sans** (variable body) + **Sant'Elia Sans** (condensed display with sport-jersey character). | White/off-white, black text. Accent only via product photography. Otherwise monochrome. | Spacious. ~6 sections, generous gutters, Shopify product cards. | First viewport is a collection promo (*"OUTKAST STANKONIA F.C."*) — typographic + product imagery, no video. Straight into commerce. | **Magazine + merch hybrid**: editorial issue and Shopify grid coexist as equal blocks. Print identity drives commerce, not vice versa. |
| **copa90.com** | Typekit + self-hosted **Cargo Diatype Plus Variable** (Dinamo grotesque, Roman + Italic) + **Oswald** for some headings. | Couldn't fully assess — Cargo CMS renders client-side. | Couldn't assess — JS-loaded content. | Couldn't assess — JS-loaded. | Built on **Cargo.site** (designer/portfolio CMS), not bespoke — unusual for a media brand. Diatype + Oswald is the typographic signature. |
| **formula1.com** | Custom proprietary: **Formula1** (Regular/Bold/Black/Italic) + **Formula1 Wide** (display) + **Formula1 Digits** (timing tables). Secondary: **Titillium Web**. | White/light ground. F1 red dominant accent. Team color swatches in driver cards. ~3–4 accents. | Busy. ~8–10 sections, 20+ partner logos, schedule carousel, standings, etc. | Full-bleed race photo + dark overlay + news headline. News-first, not marketing-first. | **Three custom typefaces** as a family: Regular for everything, Wide for hero display moments, Digits exclusively for tabular timing data. |
| **moncler.com** | Couldn't load — site returned a maintenance page. | — | — | — | — |
| **loropiana.com** | Couldn't load — Akamai edge returns HTTP 403 to non-browser clients. | — | — | — | — |

---

## Patterns observed across the set

1. **Custom or licensed proprietary type is the norm at the top end.** F1 (custom Formula1), Wasserman/THE·TEAM (Gotham), Stellar Entertainment (Avenir Next), Players' Tribune (Publico + Graphik), Mundial (Public Sans + Sant'Elia) all self-host commercial or bespoke families. Only Gestifute relies wholly on free Google Fonts.

2. **Serif + sans pairing is rarer than expected in agencies.** Among the seven agent sites, none confirmed a true serif display + sans body pairing. The editorial pairing belongs to the editorial-football side — Players' Tribune (Publico over Graphik) is the cleanest example.

3. **Condensed grotesques recur in sport contexts:** Roc Nation Sports (Roboto Condensed), Mundial (Sant'Elia Sans), Copa90 (Oswald), F1 (Formula1 Wide). Condensed sans reads "sport/jersey" without going slab.

4. **High chromatic restraint is universal.** 5 of the loadable sites run as monochrome / two-color systems where photography supplies all hue. Only F1 and CAA introduce multiple chromatic accents.

5. **Hero archetypes split into two camps.** Either (a) **typographic editorial statement** with minimal/no image (Wasserman, Excel, Stellar, Mundial), or (b) **full-bleed photo/video with overlay headline** (Gestifute, F1, Players' Tribune grid). **Component-grid heroes (SaaS marketing pattern) are absent across all 11 loadable sites.**

6. **Several "premium" sites are templated builds.** CAA Sports = Sidearm CMS; Excel = WordPress/Elementor; Roc Nation Sports = WordPress section of parent; Wasserman = WordPress Twenty Twenty-One; Copa90 = Cargo.site. Bespoke front-end engineering is the exception. The bar is taste, not tech.

7. **Italics carry editorial weight.** Wasserman uses italics-as-emphasis inside roman statements; Players' Tribune uses italic Publico for editorial flourish; Copa90 uses Diatype italic variants. The italic is doing real work, not decoration.

---

## Implications for PKT redesign

These are **implications**, not decisions. Decisions happen in design.md once the user picks a typography + visual direction.

- **Drop the "all-Bebas-everywhere" approach.** Bebas Neue is a free condensed display sans — it can absolutely work (Mundial uses Sant'Elia, Copa90 uses Oswald) — but using it at every scale flattens hierarchy. The condensed-display fonts in the research are paired with a serious humanist body (Public Sans, Diatype, Titillium).
- **Two real typography directions emerge** from the peer set:
  - **Editorial-football** (Players' Tribune model): serif display + neutral sans body. Most distinctive in the agent category; closest to the user's "luxurious + inviting + professional" brief.
  - **Sport-grotesque** (Mundial / Copa90 / F1 model): condensed display sans + neutral body sans. More overtly sport-flavored; less editorial.
- **The four-accent palette (gold + signal + electric + warn) goes against the pattern.** 5 of 11 sites are essentially monochrome. The right move for PKT is probably one chromatic accent (gold for FIFA accreditation, as it already is) and let photography supply the rest.
- **Component-grid heroes are the wrong shape.** Replace with either a typographic editorial statement OR a full-bleed photo + overlay.
- **The hero animation overlays (tactic board, GPS readouts, scout cards) are a SaaS-marketing instinct that no peer site uses.** Reconsider whether they belong in the hero at all, or whether they should live in the body of the page as analytical surfaces.
- **The "premium" sites are mostly WordPress.** Astro is overkill technically, but the engineering choice doesn't drive the perception of premium — typography + restraint do.

---

## Three deferred questions

1. **Moncler / Loro Piana** couldn't be inspected this round. If the user wants the "quiet luxury" axis represented, manual inspection is needed.
2. **Klutch Sports** wouldn't load. The leading basketball-agent reference is missing from the set.
3. **Custom typefaces** are out of scope (cost + IP) but their *characteristics* aren't. The pairings we propose to the user should approximate the feel of Publico/Gotham/Sant'Elia using free or affordable alternatives (Fraunces, Manrope, Anton, Public Sans, etc.).
