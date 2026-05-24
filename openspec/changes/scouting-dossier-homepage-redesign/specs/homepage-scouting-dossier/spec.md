## ADDED Requirements

### Requirement: Homepage Uses Scouting Dossier Positioning
The homepage SHALL present ProKickTalent as a FIFA-licensed football representation and evaluation service using a scouting dossier visual and content model.

#### Scenario: Visitor lands on the homepage
- **WHEN** a visitor opens the homepage
- **THEN** the first viewport communicates a football-specific scouting dossier experience rather than a generic sports agency landing page

#### Scenario: Visitor scans page sections
- **WHEN** a visitor scrolls through homepage sections
- **THEN** the visual language includes football-specific report surfaces such as pitch grids, match-film frames, trajectory lines, evaluation notes, service modules, or credential metadata

### Requirement: Homepage Targets U17-U23 Players
The homepage SHALL position ProKickTalent for U17-U23 players and their families.

#### Scenario: Visitor reads target audience content
- **WHEN** a visitor reads homepage audience or pathway content
- **THEN** the page presents U17-U19 and U20-U23 stages
- **THEN** the page does not present U13-U16 as a served audience

### Requirement: Hero Provides Scroll-Driven Football Analysis Moment
The homepage hero SHALL include a scroll-driven opening sequence where football action imagery or a ball trajectory resolves into scouting overlays and player pathway context.

#### Scenario: Visitor scrolls from the hero on desktop
- **WHEN** a desktop visitor scrolls through the opening hero area
- **THEN** the hero reveals football analysis elements such as a trajectory, pitch line, film frame, scouting annotation, or pathway overlay in response to scroll progress

#### Scenario: Visitor prefers reduced motion
- **WHEN** the visitor has reduced motion enabled
- **THEN** the homepage presents a readable static or simplified hero state without requiring scroll animation to understand the page

### Requirement: Homepage Shows Player Pathway Matrix
The homepage SHALL replace generic age cards with a player pathway matrix for U17-U19 and U20-U23 stages.

#### Scenario: Visitor reviews pathway stages
- **WHEN** a visitor reaches the pathway section
- **THEN** the page shows distinct U17-U19 and U20-U23 pathway stages
- **THEN** each stage communicates what ProKickTalent evaluates, what the player or family needs to understand, and the likely next move

### Requirement: Homepage Presents Agent Credentials as Verified Evaluation Context
The homepage SHALL present Burak Can Piroglu's credentials in a report-like context that supports trust and football-specific expertise.

#### Scenario: Visitor reviews agent credentials
- **WHEN** a visitor reaches the agent credibility section
- **THEN** the page displays Burak Can Piroglu, FIFA-licensed agent status, Toronto/Canada context, and relevant expertise such as GPS or data-informed evaluation

### Requirement: Homepage Frames Services as Dossier Modules
The homepage SHALL present core services as parts of a player evaluation and career pathway dossier.

#### Scenario: Visitor reviews services
- **WHEN** a visitor reaches the services section
- **THEN** representation, GPS performance analysis, scouting, and career development are presented as football-specific report modules
- **THEN** each service module links or directs visitors toward the services or contact flow

### Requirement: Homepage Uses Evaluation-Oriented Conversion
The homepage SHALL use evaluation-oriented primary calls to action while preserving the ability to contact ProKickTalent.

#### Scenario: Visitor chooses primary CTA
- **WHEN** a visitor activates the homepage primary CTA
- **THEN** the visitor is directed to the contact flow
- **THEN** the CTA language frames the action as starting or requesting a player evaluation, consultation, or pathway review

### Requirement: Homepage Remains Static-Site Friendly and Accessible
The homepage SHALL remain compatible with Astro static rendering and accessible browsing.

#### Scenario: Site builds for deployment
- **WHEN** the production build runs
- **THEN** the homepage builds without backend requirements or runtime-only data dependencies

#### Scenario: Visitor uses keyboard or assistive technology
- **WHEN** a visitor navigates the homepage with keyboard or assistive technology
- **THEN** interactive elements remain reachable, labeled, and usable without relying on pointer-only interaction
