# cms-editorial-content Specification

## Purpose
TBD - created by archiving change cms-editorial-content. Update Purpose after archive.
## Requirements
### Requirement: Player Roster Is Editor-Managed via a Collection

The player roster SHALL be stored as a Keystatic collection (one entry per
player) and rendered on `/players` from that collection, so a non-technical
editor can add, edit, reorder, and re-status players without code changes.

#### Scenario: Editor changes a player's status
- **WHEN** an editor opens a roster entry in the dashboard and changes its
  status from one fixed option to another (e.g. Trialing → Signed)
- **THEN** the status is chosen from a fixed dropdown, not free text
- **THEN** after publish, the `/players` card reflects the new status and the
  status filter counts update accordingly

#### Scenario: Editor adds a new player
- **WHEN** an editor creates a new roster entry with the structured fields
- **THEN** the card appears on `/players` in the position set by its `order`
  field, with no manual formatting required

### Requirement: Real Player Identities Are Gated by Consent

The roster SHALL default to anonymized entries, and SHALL expose real name and
photo fields only behind an explicit consent gate in the schema.

#### Scenario: Entry is anonymized by default
- **WHEN** an editor creates a roster entry
- **THEN** the entry defaults to anonymized mode and renders as an anonymized
  card (age group + descriptor + position/year/region, silhouette image)
- **THEN** no real name or photo field is available to fill

#### Scenario: Editor publishes a real identity
- **WHEN** an editor switches an entry to "Real" mode
- **THEN** real name and photo fields become available only after a
  "consent on file" confirmation is set
- **THEN** the card renders the real identity only when both the real mode and
  the consent confirmation are present

### Requirement: Media Gallery and Press Are Editor-Managed Collections

The media gallery and press mentions SHALL each be Keystatic collections
rendered on `/media`, so the editor can add photos and coverage over time.

#### Scenario: Editor adds a gallery photo
- **WHEN** an editor uploads an image and sets its caption, date, and layout
  size
- **THEN** the photo appears in the masonry grid, occupying the layout slot
  chosen from a fixed size dropdown (not arbitrary dimensions)

#### Scenario: Editor adds a press item
- **WHEN** an editor adds a press entry (source, date, title, subtitle,
  optional link)
- **THEN** it appears in the press row in `order`, within the layout's length
  tolerances

### Requirement: The Editor Never Formats Display Strings

Editor-facing fields SHALL be discrete and structured; the rendered display
strings SHALL be assembled in code, not entered as formatted text.

#### Scenario: Roster card line is composed in code
- **WHEN** a roster entry stores position, birth year, and region as separate
  fields
- **THEN** the rendered "position · year · region" line and the
  "age-group descriptor" name are assembled by the page, so separators and
  formatting cannot drift regardless of editor input

### Requirement: Constrained Values Use Fixed Inputs and Guardrails

Fields with a known set of valid values SHALL use fixed-option selects, and
free-text fields SHALL carry length limits and plain-language help-text, so a
non-technical editor cannot enter off-design or layout-breaking values.

#### Scenario: Editor encounters a constrained field
- **WHEN** an editor edits status, position, age group, or gallery size
- **THEN** the field is a dropdown of valid options with no free-text entry

#### Scenario: Editor exceeds a text length
- **WHEN** an editor types into a capped text field
- **THEN** the field communicates its limit (help-text) and validates against
  the maximum that the layout tolerates

### Requirement: Services Content Is Editor-Managed

The four services SHALL be stored in the reshaped `services` collection and
render on `/services` (both the hub list and the detail sections) from it. The
illustrative sample visual for each service SHALL be selected by a fixed
`vizType` option, and its EXAMPLE data SHALL remain in code, not editor-entered.

#### Scenario: Editor edits a service description
- **WHEN** an editor edits a service's body, bullets, or hub blurb
- **THEN** the change appears in both the services hub list and the
  corresponding detail section after publish

#### Scenario: Editor selects a service's visual
- **WHEN** an editor sets a service's `vizType`
- **THEN** the matching sample visual renders, carrying its EXAMPLE label
- **THEN** the editor cannot enter the sample visual's numbers, preventing any
  unverified "real player" data from appearing

### Requirement: Content Is Read at Build and Stays Static

Pages SHALL read collection content at build time and SHALL remain compatible
with static Cloudflare Pages deployment.

#### Scenario: Production build with editor content
- **WHEN** the production build runs
- **THEN** `/players` and `/media` render from the Keystatic collections with
  no backend or per-request data dependency
- **THEN** the rendered design and layout are unchanged from before the content
  was externalized (content seeded to match)

### Requirement: Editor Changes Reach Production Through an Automated Publish Loop

A change saved by a non-technical editor in the dashboard SHALL reach the live
site without developer involvement, via a version-controlled CI workflow.

#### Scenario: Editor saves a change
- **WHEN** an editor saves an edit in the Keystatic dashboard
- **THEN** the change is committed to the `master` branch of the repository
- **THEN** a GitHub Actions workflow builds the site and deploys it to
  Cloudflare, publishing the updated content with no developer involvement

#### Scenario: Deploy automation is version-controlled
- **WHEN** the repository is inspected
- **THEN** the deploy workflow exists as a committed file under
  `.github/workflows/`, not solely as external dashboard configuration

