# ProKickTalent Sports Group — Website Design Document
**Date:** 2026-03-07
**Project:** Static website migration from WordPress to self-hosted Astro site
**Deployed via:** Cloudflare Pages

---

## Overview

A professional static marketing website for ProKickTalent Sports Group, run by FIFA-licensed agent Burak Can Piroglu. The site targets youth players (U13–U23), their families, and clubs in Ontario and Canada. It replaces an existing WordPress site with a faster, self-hosted, zero-maintenance static site.

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Astro | Industry-standard SSG for content sites, zero JS by default, Cloudflare-native |
| Styling | Tailwind CSS | Utility-first, consistent design tokens, rapid development |
| Forms | Formspree | No-backend contact forms for static sites |
| Deployment | Cloudflare Pages | Auto-deploy on git push, free tier, custom domain support |
| Fonts | Google Fonts | Bebas Neue (headings), Inter (body) |

---

## Visual Identity

### Color Palette
- Background: `#0A0A0A` (near-black)
- Surface/Cards: `#111827` (dark charcoal)
- Accent Primary: `#D4AF37` (gold — professional, FIFA-associated)
- Accent Secondary: `#22C55E` (green — pitch, energy, youth)
- Text Primary: `#F9FAFB` (off-white)
- Text Headings: `#FFFFFF` (pure white)

### Typography
- Headings: **Bebas Neue** — bold, condensed, sports-industry standard
- Body: **Inter** — clean, readable, modern

### Design Tone
- Dark mode throughout — premium sports agency aesthetic
- Bold uppercase section labels
- Gold CTAs and key highlights
- Green for energy/youth indicators
- Full-width hero sections with dark overlays

---

## Project Structure

```
prokicktalent/
├── src/
│   ├── layouts/
│   │   └── Layout.astro        # Shared nav + footer wrapper
│   ├── components/
│   │   ├── Nav.astro           # Sticky top nav, hamburger mobile
│   │   ├── Footer.astro        # Logo, links, social, legal
│   │   ├── Hero.astro          # Reusable full-viewport hero
│   │   └── ServiceCard.astro   # Service card component
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── about.astro         # About Us
│   │   ├── players.astro       # Players (recruitment-focused)
│   │   ├── services.astro      # Services detail page
│   │   ├── media.astro         # Media gallery (placeholder)
│   │   └── contact.astro       # Contact form (Formspree)
│   └── styles/
│       └── global.css          # Tailwind directives + base styles
├── public/
│   └── images/                 # Static images (added later)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Pages

### Home (`/`)
1. **Hero** — Full-viewport, dark overlay image, headline: "Guiding Young Players to Professional Soccer Careers", subheadline with agent name, "Schedule Free Consultation" CTA button
2. **Who We Serve** — 3 cards: Youth (U13–U16), Academy (U17–U19), College/Semi-Pro (U20–U23)
3. **Our Approach** — Left-aligned text block with pull quote, "Contact Us" CTA
4. **Services Overview** — 4 cards: Player Representation, GPS Analysis, Scouting, Career Development (each with "Learn More" linking to `/services`)
5. **Final CTA Banner** — "Ready to plan your pathway? Schedule Free Consultation"

### About Us (`/about`)
1. **Page Hero** — "About ProKickTalent" with tagline
2. **Agency Mission** — polished version of provided org copy
3. **Founder Story** — Personal message from Burak, split layout with credentials panel
4. **Contact CTA**

### Players (`/players`)
1. **Recruitment Hero** — "Are You Next?" bold headline
2. **What We Look For** — 3 criteria cards (skill, drive, coachability)
3. **How It Works** — 3-step process (Get Found → Get Evaluated → Get Represented)
4. **CTA** — Links to contact page

### Services (`/services`)
1. **Page Hero** — Services overview intro paragraph
2. **4 Service Sections** — Full-width alternating layout (icon + title + full description)
   - Player Representation & Contract Negotiation
   - GPS Performance Analysis & Reports
   - Scouting & Talent Identification
   - Career Development & Guidance
3. **Bottom CTA**

### Media (`/media`)
1. **Page Hero** — "Media & Gallery"
2. **Gallery Grid** — Masonry placeholder grid, "Photos & videos coming soon" message
3. **Instagram CTA** — Link to Instagram profile

### Contact (`/contact`)
1. **Page Hero** — "Get In Touch"
2. **Form** — Name, Email, Message, Interest (dropdown: Representation / GPS Analysis / Scouting / Career Guidance / General), Submit via Formspree
3. **Contact Info** — Email, Instagram link

---

## Navigation

- **Top Nav:** Logo (left) | Home · About Us · Players · Services · Media · Contact Us (right)
- **Sticky** on scroll
- **Mobile:** Hamburger menu with slide-down drawer
- **Footer:** Logo, tagline "Global Football Agency", nav links (About, Privacy, Terms, Contact), Instagram link

---

## Deployment Workflow

1. Initialize git repo in project directory
2. `npm create astro@latest` scaffold
3. Push to GitHub
4. Connect GitHub repo to Cloudflare Pages (one-time setup in Cloudflare dashboard)
   - Build command: `npm run build`
   - Output directory: `dist`
5. Every `git push` to main triggers auto-deploy
6. Add images later: drop into `public/images/`, push, auto-deploys

---

## Out of Scope (Phase 1)

- CMS integration (content managed via code)
- Player portal / login
- Blog
- Payment processing
- Analytics (can add Cloudflare Web Analytics later — free, privacy-friendly)
