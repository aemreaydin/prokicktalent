## Context

After `modern-football-site-redesign`, the live Astro site renders entirely
hardcoded content — no page calls `createReader`. The Keystatic config still
defines v1-era singletons (`homepage`, `about`, `players`) and collections
(`services`, `gallery`) whose fields describe the old dossier design and which
nothing reads. The CMS is disconnected.

This change reconnects the CMS for the three highest-churn content types
(roster, gallery, press), modelled for a **non-technical editor**. The driving
constraint is not "expose text" — it's "expose structured choices the editor
cannot get wrong, and let code own all formatting and layout."

Decisions below were reached in an explore session (Fork 1 = "balanced",
asterisk convention for emphasis deferred, high-churn first, guardrails on,
non-technical editor).

## Goals / Non-Goals

**Goals:**
- The player roster, media gallery, and press mentions are editable from the
  Keystatic dashboard by a non-technical editor without developer help.
- Edits cannot break the editorial layout: constrained values are selects,
  text has length caps + help-text, counts/structure stay code-owned.
- The anonymized-launch + consent rules are enforced *by the schema*, not by
  policy memory.
- The site stays static and Cloudflare-deployable; content reads at build.

**Non-Goals:**
- Editorial prose + asterisk emphasis (next change).
- Services content modeling (schema reshape deferred).
- Medium-churn in-page arrays (timeline, pathway, credentials, clauses).
- Any layout/design change — pixels are identical before and after.
- A live preview environment or draft/publish workflow beyond Keystatic's own.

## Decisions

### Structured fields → code assembles display strings

The editor never types a formatted string. Roster fields are discrete
(`position`, `birthYear`, `region`); the page frontmatter composes
`"RW · 2007 · Ontario"` and `"U19 winger"`.

**Alternatives considered:**
- One free-text `meta` field per card — fastest schema, but invites typos,
  separator drift ("·" vs "-"), and broken formatting from a non-technical
  editor.

**Rationale:** formatting is a design concern, not an editor concern. Owning
it in code is the core guardrail.

### Consent enforced by `fields.conditional`

Roster default `mode` is "Anonymized". Real name + photo fields exist only
inside a conditional branch shown when `mode = "Real"`, gated further by a
`consentOnFile` checkbox.

**Alternatives considered:**
- Always-present realName/photo fields with a written policy "don't fill
  unless consented" — relies on memory; one slip publishes a minor's identity.

**Rationale:** the strongest place to enforce a consent rule is where the data
is entered. Make the unsafe state unreachable from the dashboard.

### Collections, not singleton arrays, for these three

Roster, gallery, and press are each one-file-per-entry collections.

**Alternatives considered:**
- Array fields inside a singleton — fine for small fixed in-page lists, but
  these grow unbounded and benefit from per-entry files (cleaner diffs,
  reordering, independent edits).

**Rationale:** they are genuinely list-like and grow over time — the textbook
case for collections.

### Guardrails: selects + length caps + help-text

`status`, `position`, `ageGroup`, gallery `size` are `fields.select` with
fixed options. Text fields use `validation.length.max` and a `description`
that states the limit in plain language.

**Rationale:** a non-technical editor should fall into the pit of success —
dropdowns over free text wherever the value set is known.

### Asterisk emphasis is deferred

The gold-italic convention applies to editorial prose (hero, manifesto, CTA),
which is low-churn and out of scope here. Captured so it isn't lost; it is the
headline feature of the *next* change.

### Build the publish loop with GitHub Actions (Option B)

The repo has no CI today (no `.github/workflows`), so "save in dashboard →
live" almost certainly does not happen automatically. Rather than depend on an
invisible Cloudflare dashboard setting, this change **builds the loop
in-repo**: a `.github/workflows/deploy.yml` that, on push to `master`, runs
`npm ci && npm run build` and deploys via `cloudflare/wrangler-action`.

**Alternatives considered:**
- Option A (Cloudflare native Git integration) — least code, but the config
  lives invisibly in the CF dashboard; not reviewable, easy to forget.
- Option C (manual `wrangler deploy`) — defeats the non-technical-editor goal.

**Rationale:** version-controlled, reviewable, and explicit. The one part that
can't be committed — the `CLOUDFLARE_API_TOKEN` (and account ID) GitHub
secret — is a documented one-time user action. If CF native integration is
already on, it must be disabled to avoid double-deploys.

### Reshape `services`; `vizType` keeps EXAMPLE data in code

The existing `services` collection (v1 fields) is reshaped to match the new
page: `number`, `title`, `phase`, `hubBlurb`, `body`, `bullets` (array), and a
`vizType` select (contract / gps / tactic / pathway). The per-service sample
visual (GPS numbers, contract clauses, pathway bars) is illustrative EXAMPLE
data that stays in code — the editor only chooses *which* viz renders, never
its numbers.

**Alternatives considered:**
- Make the viz data editable too — but it's labelled EXAMPLE precisely because
  it's illustrative; letting an editor type numbers invites accidental
  "real player" claims, violating the content-authenticity rule.

**Rationale:** services copy is medium-churn but cheap to include now that we
have the modeling pattern; gating the viz behind a select keeps the
authenticity guardrail intact. `bullets` as an array is the one place editors
add/remove items — bounded and layout-safe (the 2-col grid tolerates 4–8).

## Risks / Trade-offs

- **The auto-deploy hook may not be configured** → a save commits but never
  rebuilds; the editor sees no change and loses trust. Highest risk. Verify
  before/early, not at the end.
- **Cloud image uploads** must commit to `public/images/gallery/` and be read
  at build — confirm Keystatic cloud image handling round-trips on a static
  Cloudflare build.
- **Reordering** — relying on an `order` integer the editor sets by hand is
  simple but fiddly; acceptable for ~12 roster + small gallery/press.
- **Over-guarding** — too-tight length caps frustrate the editor. Tune caps to
  the actual layout tolerance, not arbitrarily.
- **Naming** — keep the existing unused `players` singleton as-is (future prose
  phase); add a distinct `roster` collection to avoid collision.
- **Double-deploy** — if Cloudflare native Git integration is already on AND we
  add the Actions workflow, both fire on push. Must disable one (keep Actions).
- **Secret management** — the workflow is inert until `CLOUDFLARE_API_TOKEN` is
  set in GitHub; a missing/expired token fails the deploy silently from the
  editor's view. Document clearly and test once.
- **Services viz drift** — `vizType` decouples the chosen visual from its
  EXAMPLE data; if a new service needs a viz that doesn't exist, it falls back
  to none rather than breaking. Adding a viz type stays a code task.

## Migration Plan

1. Verify the Keystatic Cloud → GitHub → Cloudflare auto-rebuild loop (or flag
   it as a prerequisite to wire).
2. Add `roster` + `press` collections and extend `gallery` in
   `keystatic.config.ts`, with selects, validation, help-text, and the consent
   conditional.
3. Seed content files from the current hardcoded data (12 roster entries, the
   press items, gallery entries) so nothing visibly changes on first build.
4. Wire `players.astro` and `media.astro` to read via `createReader`; assemble
   display strings in frontmatter; keep hero/prose hardcoded.
5. Verify build, dashboard editing, and a real end-to-end save → deploy.
6. Roll back by reverting the page wiring (content files are harmless if unread).

## Resolved Questions

1. **Auto-deploy configured?** No / unknown — repo has no CI. **Resolved:**
   build it in-repo with GitHub Actions (Option B). See decision above.
2. **Manual ordering?** **Resolved:** yes — hand-set `order` integer on each
   entry. Simple and fine at this scale.
3. **Gallery date format?** **Resolved:** free-text ("2026 · March") to keep
   the season-style label.
4. **Include services?** **Resolved:** yes — reshape the existing collection
   and wire the services page. See decision above.

## Open Questions

- None blocking. The only external dependency is the one-time GitHub secret +
  disabling CF native auto-deploy if present (both user actions, documented in
  tasks).
