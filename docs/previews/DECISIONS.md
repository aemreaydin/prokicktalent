# Phase A · Decisions worksheet

Fill this in as you review the previews. Anything you write here gets folded
into `openspec/changes/modern-football-site-redesign/design.md` before Phase B
starts.

**Open each preview by opening the HTML file directly in a browser**, or run a
simple local server from the project root:

```bash
cd /home/emreaydn/Projects/prokicktalent
python3 -m http.server 8000
# then visit http://localhost:8000/docs/previews/
```

---

## 0 · Typography direction (NEW — decide first)
**Preview:** `typography.html`
**Research:** `docs/plans/2026-05-23-peer-research.md`

Pick one — drives every other decision below.

- [ ] 00 — Baseline (Bebas + Inter) — keep current direction
- [x] **01 — Editorial-football (Fraunces + Inter)** ← DECIDED · Players' Tribune family
- [ ] 02 — Sport-grotesque (Anton + Public Sans) — Mundial / Copa90 / F1 family
- [ ] 03 — Quiet luxury (Cormorant Garamond + Inter) — Loro Piana / Moncler family
- [ ] 04 — Modern agency (Manrope) — Wasserman / Stellar family
- [ ] None of these — refine and re-present

Notes:

---

## 1 · Style tile (A1)
**Preview:** `style-tile.html`

⚠ Style tile palette / surface tiers will be reviewed AFTER typography is locked —
the palette restraint discussion changes shape depending on the chosen direction
(serif vs grotesque vs luxury serif).

- [ ] Palette approved as shown
- [ ] Wants changes: _which token + new value_ → ……
- [ ] Typography approved as shown _(see section 0 above)_
- [ ] Surface tiers approved as shown
- [ ] Motion approved as shown

Notes:

---

## 2 · Logo (A2)
**Preview:** `logo-concepts.html`

Pick **one**:

- [ ] 01 — Arc (pitch curve)
- [ ] 02 — Ball (geometric)
- [ ] 03 — Goalmouth (architectural)
- [ ] 04 — Trajectory (ball-in-flight) — _preview default_
- [ ] 05 — Contact (strike moment)
- [ ] None — refine and re-present

Notes:

---

## 3 · Components (A3)
**Preview:** `components.html`

For each component: **K** keep · **C** cut · **M** modify (explain how).

- [ ] GlassNav — K / C / M:
- [ ] StatBlock — K / C / M:
- [ ] GpsReadout — K / C / M:
- [ ] TacticBoard — K / C / M:
- [ ] Marquee — K / C / M:
- [ ] Bento — K / C / M:
- [ ] PathwayTabs — K / C / M:
- [ ] PlayerCard (anonymized) — K / C / M:
- [ ] CTAPanel — K / C / M:

---

## 4 · Command bar (A4)
**Preview:** `command-bar.html`  ·  try ⌘K / Ctrl-K

Pick one:

- [ ] Ship it — include in Phase B
- [ ] Cut it — drop from the build entirely
- [ ] Defer it — build later when site has more content depth

Notes:

---

## 5 · Hero animation (A5)
**Preview:** `hero-animation.html`  ·  scroll slowly to feel it

- [ ] Three-beat copy approved as shown ("See the player." → "Read the evidence." → "Make the move.")
- [ ] Wants different copy → ……
- [ ] Scout overlay cards approved
- [ ] Pitch grid + contact circle + trajectory approved
- [ ] Wants different visual treatment → ……
- [ ] Hero still — provide path to chosen AI image, or pick: I'll generate /
      I'll source / build commissions / use SVG silhouette permanently

Notes:

---

## 6 · Per-page mockups (A6)
**Previews:** `page-home.html` · `page-about.html` · `page-players.html` · `page-services.html` · `page-media.html` · `page-contact.html`

For each page: **A** approved · **R** revise (describe).

- [ ] Home — A / R:
- [ ] About — A / R:
- [ ] Players — A / R:
- [ ] Services — A / R:
- [ ] Media — A / R:
- [ ] Contact — A / R:

---

## 7 · Content authenticity (cross-cutting)

- [ ] Marquee launch set — list ONLY honestly-citable marks (FIFA is given):
  - FIFA Licensed ✓
  - …
  - …

- [ ] Live numeric claims confirmed dropped sitewide
- [ ] Anonymized roster confirmed for `/players` at launch
- [ ] Roster copy / status labels approved (Watched / Trialing / Signed / Placed)

---

## 8 · Open questions from design.md

1. **Command bar** — recorded in section 4 above
2. **Marquee launch set** — recorded in section 7 above
3. **Logo direction** — recorded in section 2 above
4. **`/_dev/components` gating** — pick: env var · preview-branch only · not in production
5. **GSAP adoption** — pick: not needed · add for hero only · add globally

---

## Sign-off

When all sections above are answered:

- [ ] Phase A approved — proceed to Phase B implementation
