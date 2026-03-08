# ProKickTalent Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 6-page professional static website for ProKickTalent Sports Group using Astro + Tailwind CSS, deployable to Cloudflare Pages.

**Architecture:** Astro static site with a shared Layout component wrapping all pages. Tailwind CSS handles all styling via utility classes and a custom design token config. No JavaScript framework — Astro islands only where needed (mobile nav toggle).

**Tech Stack:** Astro 4.x, Tailwind CSS 3.x, Formspree (contact form), Google Fonts (Bebas Neue + Inter), Cloudflare Pages

---

## Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `src/styles/global.css`

**Step 1: Initialize Astro project**

Run in `C:\Users\emreaydn\Documents\Projects\website`:
```bash
npm create astro@latest . -- --template minimal --no-install --typescript strictest
```
Answer prompts: use current directory, no git (we'll init manually), TypeScript strict.

**Step 2: Install dependencies**
```bash
npm install
npm install @astrojs/tailwind tailwindcss
```

**Step 3: Add Tailwind integration to `astro.config.mjs`**
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});
```

**Step 4: Configure `tailwind.config.mjs`**
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111827',
        gold: '#D4AF37',
        green: '#22C55E',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

**Step 5: Create `src/styles/global.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-background text-gray-100 font-body;
  }
  h1, h2, h3, h4 {
    @apply font-heading tracking-wide;
  }
}
```

**Step 6: Verify dev server starts**
```bash
npm run dev
```
Expected: Server running at `http://localhost:4321`

**Step 7: Commit**
```bash
git init
git add .
git commit -m "feat: scaffold Astro + Tailwind project"
```

---

## Task 2: Layout Component (Nav + Footer)

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`

**Step 1: Create `src/components/Nav.astro`**
```astro
---
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/players', label: 'Players' },
  { href: '/services', label: 'Services' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact Us' },
];
const currentPath = Astro.url.pathname;
---

<header class="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-white/10">
  <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
    <!-- Logo -->
    <a href="/" class="font-heading text-xl text-white tracking-widest hover:text-gold transition-colors">
      PROKICKTALENT
    </a>

    <!-- Desktop Links -->
    <ul class="hidden md:flex items-center gap-8">
      {navLinks.map(link => (
        <li>
          <a
            href={link.href}
            class={`text-sm font-body tracking-widest uppercase transition-colors hover:text-gold ${
              currentPath === link.href ? 'text-gold' : 'text-gray-300'
            }`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

    <!-- Mobile Hamburger -->
    <button
      id="menu-toggle"
      class="md:hidden text-white focus:outline-none"
      aria-label="Toggle menu"
    >
      <svg id="icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg id="icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </nav>

  <!-- Mobile Menu Drawer -->
  <div id="mobile-menu" class="hidden md:hidden bg-surface border-t border-white/10">
    <ul class="flex flex-col px-6 py-4 gap-4">
      {navLinks.map(link => (
        <li>
          <a
            href={link.href}
            class={`block text-sm tracking-widest uppercase transition-colors hover:text-gold ${
              currentPath === link.href ? 'text-gold' : 'text-gray-300'
            }`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</header>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  toggle?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
    iconOpen?.classList.toggle('hidden');
    iconClose?.classList.toggle('hidden');
  });
</script>
```

**Step 2: Create `src/components/Footer.astro`**
```astro
---
const year = new Date().getFullYear();
---

<footer class="bg-surface border-t border-white/10 mt-20">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex flex-col md:flex-row items-center justify-between gap-8">
      <!-- Brand -->
      <div class="text-center md:text-left">
        <p class="font-heading text-2xl text-white tracking-widest">PROKICKTALENT</p>
        <p class="text-sm text-gold tracking-widest uppercase mt-1">Sports Group</p>
        <p class="text-xs text-gray-500 mt-1 tracking-wider uppercase">Global Football Agency</p>
      </div>

      <!-- Nav Links -->
      <nav class="flex flex-wrap justify-center gap-6 text-xs text-gray-400 tracking-widest uppercase">
        <a href="/about" class="hover:text-gold transition-colors">About</a>
        <a href="/privacy" class="hover:text-gold transition-colors">Privacy</a>
        <a href="/terms" class="hover:text-gold transition-colors">Terms</a>
        <a href="/contact" class="hover:text-gold transition-colors">Contact</a>
      </nav>

      <!-- Social -->
      <div class="flex items-center gap-4">
        <a
          href="https://instagram.com/prokicktalent"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-gold transition-colors flex items-center gap-2 text-sm tracking-wider"
          aria-label="Instagram"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </a>
      </div>
    </div>

    <div class="border-t border-white/10 mt-8 pt-6 text-center text-xs text-gray-600 tracking-wider">
      &copy; {year} ProKickTalent Sports Group. All rights reserved.
    </div>
  </div>
</footer>
```

**Step 3: Create `src/layouts/Layout.astro`**
```astro
---
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const {
  title,
  description = 'ProKickTalent Sports Group — FIFA-licensed football agent guiding young Canadian players to professional careers.'
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | ProKickTalent Sports Group</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <Nav />
    <main class="pt-16">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Step 4: Verify nav + footer render**
```bash
npm run dev
```
Open `http://localhost:4321` — check sticky nav and footer appear.

**Step 5: Commit**
```bash
git add src/layouts src/components
git commit -m "feat: add Layout, Nav, and Footer components"
```

---

## Task 3: Home Page

**Files:**
- Create: `src/pages/index.astro`

**Step 1: Create `src/pages/index.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Home">

  <!-- HERO -->
  <section class="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
    <!-- Placeholder image background (replace with real image later) -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-background to-black"></div>
    <!-- Decorative pitch lines overlay -->
    <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 79px, #ffffff 79px, #ffffff 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, #ffffff 79px, #ffffff 80px);"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-6">
      <p class="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-body">Burak Can Piroglu &mdash; FIFA Licensed Agent</p>
      <h1 class="font-heading text-6xl md:text-8xl text-white leading-none mb-6">
        Guiding Young Players<br/>
        <span class="text-gold">to Professional</span><br/>
        Soccer Careers
      </h1>
      <p class="text-gray-300 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10">
        ProKickTalent Sports Group — where talent meets opportunity and careers are built, not chased.
      </p>
      <a
        href="/contact"
        class="inline-block bg-gold text-black font-body font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-yellow-400 transition-colors"
      >
        Schedule Free Consultation
      </a>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>

  <!-- WHO WE SERVE -->
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">Who We Serve</p>
    <h2 class="font-heading text-5xl md:text-6xl text-white mb-16">The Players We Develop</h2>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-surface border border-white/10 p-8 hover:border-gold/50 transition-colors group">
        <div class="text-green font-heading text-4xl mb-2">U13–U16</div>
        <h3 class="font-heading text-2xl text-white mb-3 tracking-wide">Youth Players</h3>
        <p class="text-gray-400 font-body text-sm leading-relaxed">
          Early pathway planning and development guidance to set the foundation for professional careers.
        </p>
      </div>
      <!-- Card 2 -->
      <div class="bg-surface border border-white/10 p-8 hover:border-gold/50 transition-colors group">
        <div class="text-green font-heading text-4xl mb-2">U17–U19</div>
        <h3 class="font-heading text-2xl text-white mb-3 tracking-wide">Academy Players</h3>
        <p class="text-gray-400 font-body text-sm leading-relaxed">
          Trial preparation, showcase opportunities, and strategic positioning for the next level.
        </p>
      </div>
      <!-- Card 3 -->
      <div class="bg-surface border border-white/10 p-8 hover:border-gold/50 transition-colors group">
        <div class="text-green font-heading text-4xl mb-2">U20–U23</div>
        <h3 class="font-heading text-2xl text-white mb-3 tracking-wide">College / Semi-Pro</h3>
        <p class="text-gray-400 font-body text-sm leading-relaxed">
          Transition support from college or semi-pro to professional contracts in competitive leagues.
        </p>
      </div>
    </div>
  </section>

  <!-- OUR APPROACH -->
  <section class="py-24 bg-surface">
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">Our Approach</p>
        <h2 class="font-heading text-5xl md:text-6xl text-white mb-8 leading-none">
          Most Agents Focus on Transactions.<br/>
          <span class="text-gold">We Focus on Careers.</span>
        </h2>
        <p class="text-gray-300 font-body text-base leading-relaxed mb-6">
          At ProKickTalent, we believe talented young players deserve more than just contract negotiations — they deserve genuine career guidance.
        </p>
        <p class="text-gray-400 font-body text-base leading-relaxed mb-6">
          Too many families enter the professional football world without understanding the pathways, the timelines, or the red flags. We provide education first, helping players and parents make informed decisions about MLS academies, CPL opportunities, European trials, and college programs.
        </p>
        <p class="text-gray-300 font-body text-base leading-relaxed mb-10 font-semibold">
          Your success is our success. We're here for the long term — building careers, not chasing quick commissions.
        </p>
        <a
          href="/contact"
          class="inline-block border border-gold text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase px-8 py-3 hover:bg-gold hover:text-black transition-colors"
        >
          Contact Us
        </a>
      </div>
      <!-- Agent credential panel -->
      <div class="border border-white/10 p-8 bg-background">
        <div class="w-24 h-24 bg-gold/20 border border-gold/30 mb-6 flex items-center justify-center">
          <!-- Placeholder for agent photo -->
          <svg class="w-12 h-12 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p class="font-heading text-3xl text-white tracking-wide mb-1">Burak Can Piroglu</p>
        <p class="text-gold text-sm tracking-widest uppercase font-body mb-4">FIFA&trade; Licensed Football Agent</p>
        <div class="space-y-2 text-sm text-gray-400 font-body">
          <p class="flex items-center gap-2">
            <span class="text-green">&#10003;</span> FIFA Licensed Agent (2024)
          </p>
          <p class="flex items-center gap-2">
            <span class="text-green">&#10003;</span> Geomatics &amp; Geospatial Science
          </p>
          <p class="flex items-center gap-2">
            <span class="text-green">&#10003;</span> Based in Toronto, Ontario
          </p>
          <p class="flex items-center gap-2">
            <span class="text-green">&#10003;</span> Serving players across Canada
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES OVERVIEW -->
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">What We Offer</p>
    <h2 class="font-heading text-5xl md:text-6xl text-white mb-16">Services Overview</h2>

    <div class="grid md:grid-cols-2 gap-6">
      {[
        {
          title: 'Player Representation & Contract Negotiation',
          desc: 'We advocate for your career with a FIFA-licensed agent who negotiates contracts and opportunities so you can stay focused on the game.',
        },
        {
          title: 'GPS Performance Analysis & Reports',
          desc: 'Using GPS tracking vest technology, we turn your on-field performance into data-driven reports that help you develop faster and get noticed by scouts.',
        },
        {
          title: 'Scouting & Talent Identification',
          desc: 'We actively scout emerging youth talent across Ontario — if you have the skill and the drive, we want to find you.',
        },
        {
          title: 'Career Development & Guidance',
          desc: 'From local leagues to professional clubs, we build a personalized roadmap to help players and families navigate the path to professional football.',
        },
      ].map((service) => (
        <div class="bg-surface border border-white/10 p-8 hover:border-gold/50 transition-colors group">
          <h3 class="font-heading text-2xl text-white mb-4 tracking-wide group-hover:text-gold transition-colors">
            {service.title}
          </h3>
          <p class="text-gray-400 font-body text-sm leading-relaxed mb-6">{service.desc}</p>
          <a href="/services" class="text-gold text-sm tracking-widest uppercase font-body hover:underline">
            Learn More &rarr;
          </a>
        </div>
      ))}
    </div>
  </section>

  <!-- FINAL CTA BANNER -->
  <section class="py-24 bg-gold">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 class="font-heading text-5xl md:text-6xl text-black mb-6">Ready to Plan Your Pathway?</h2>
      <p class="text-black/70 font-body text-lg mb-10">
        Take the first step toward your professional football career. A free consultation costs nothing but could change everything.
      </p>
      <a
        href="/contact"
        class="inline-block bg-black text-white font-body font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-gray-900 transition-colors"
      >
        Schedule Free Consultation
      </a>
    </div>
  </section>

</Layout>
```

**Step 2: Verify home page renders**
```bash
npm run dev
```
Check `http://localhost:4321` — all sections visible.

**Step 3: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat: build home page with all sections"
```

---

## Task 4: About Us Page

**Files:**
- Create: `src/pages/about.astro`

**Step 1: Create `src/pages/about.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="About Us"
  description="Learn about ProKickTalent Sports Group and our founder, FIFA-licensed agent Burak Can Piroglu."
>

  <!-- PAGE HERO -->
  <section class="relative py-32 flex items-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-background via-surface to-background"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">Our Story</p>
      <h1 class="font-heading text-6xl md:text-8xl text-white leading-none">
        About<br/><span class="text-gold">ProKickTalent</span>
      </h1>
    </div>
  </section>

  <!-- AGENCY MISSION -->
  <section class="py-20 px-6 max-w-7xl mx-auto">
    <div class="grid md:grid-cols-2 gap-16 items-start">
      <div>
        <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-4">Our Mission</p>
        <h2 class="font-heading text-4xl md:text-5xl text-white mb-8 leading-tight">
          Built for Canadian Youth Football
        </h2>
        <p class="text-gray-300 font-body text-base leading-relaxed mb-6">
          ProKickTalent was founded with one mission: to give Canadian youth footballers the professional support they deserve.
        </p>
        <p class="text-gray-400 font-body text-base leading-relaxed mb-6">
          Our founder, Burak Can Piroglu, is a FIFA-licensed football agent with a background in Geomatics and Geospatial Science — a rare combination that brings data precision to player development. We don't just watch games. We analyze them.
        </p>
        <p class="text-gray-400 font-body text-base leading-relaxed mb-10">
          We believe the next generation of Canadian football stars is already out there, training hard, dreaming big. We're here to find them, develop them, and represent them on the world stage.
        </p>
        <a
          href="/contact"
          class="inline-block bg-gold text-black font-body font-semibold text-sm tracking-[0.2em] uppercase px-8 py-3 hover:bg-yellow-400 transition-colors"
        >
          Get In Touch
        </a>
      </div>

      <!-- Stats / Credentials -->
      <div class="grid grid-cols-2 gap-4">
        {[
          { value: 'FIFA', label: 'Licensed Agent' },
          { value: 'Ontario', label: 'Based & Operating' },
          { value: 'U13–U23', label: 'Age Groups Served' },
          { value: 'Data-Driven', label: 'GPS Performance Analysis' },
        ].map(stat => (
          <div class="bg-surface border border-white/10 p-6 text-center">
            <p class="font-heading text-3xl text-gold mb-2">{stat.value}</p>
            <p class="text-gray-400 font-body text-xs tracking-wider uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- DIVIDER -->
  <div class="max-w-7xl mx-auto px-6">
    <div class="border-t border-white/10"></div>
  </div>

  <!-- FOUNDER STORY -->
  <section class="py-20 px-6 max-w-7xl mx-auto">
    <div class="grid md:grid-cols-3 gap-12 items-start">

      <!-- Photo placeholder -->
      <div class="md:col-span-1">
        <div class="bg-surface border border-white/10 aspect-[3/4] flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 text-gold/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p class="text-gray-600 font-body text-xs tracking-wider">Photo coming soon</p>
          </div>
        </div>
        <div class="mt-4 p-4 border border-gold/20 bg-surface/50">
          <p class="font-heading text-xl text-white tracking-wide">Burak Can Piroglu</p>
          <p class="text-gold text-xs tracking-widest uppercase font-body mt-1">FIFA&trade; Licensed Football Agent</p>
          <p class="text-gray-500 font-body text-xs mt-2">Toronto, Ontario &mdash; Canada</p>
        </div>
      </div>

      <!-- Story text -->
      <div class="md:col-span-2">
        <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-4">From the Founder</p>
        <h2 class="font-heading text-4xl md:text-5xl text-white mb-8 leading-tight">
          Built from the Ground Up.<br/>
          <span class="text-gold">No shortcuts.</span>
        </h2>

        <div class="space-y-5 font-body text-gray-300 text-base leading-relaxed">
          <p>
            I'm not coming from a big agency. I'm not coming from a wealthy football family. I'm a Geomatics Engineer from Toronto who fell in love with this game and never stopped believing it could be more than just a passion.
          </p>
          <p>
            In late 2024, I passed my FIFA Agent License exam. That piece of paper took sacrifice, study, and a level of belief in myself that honestly scared me some days. But I did it. And now I'm building something real.
          </p>
          <blockquote class="border-l-4 border-gold pl-6 py-2 my-8">
            <p class="text-white font-body text-lg italic">
              "I rep players the right way — with data, with honesty, and with everything I've got."
            </p>
          </blockquote>
          <p>
            This is where that journey gets documented. From day one. If you're a young player in Toronto, in Canada, anywhere — and you believe you have more to give this game than anyone's seen yet, I want to hear from you.
          </p>
          <p class="text-gold font-semibold">We're just getting started.</p>
        </div>

        <div class="mt-10">
          <a
            href="/contact"
            class="inline-block border border-gold text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase px-8 py-3 hover:bg-gold hover:text-black transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </div>
  </section>

</Layout>
```

**Step 2: Verify**
```bash
npm run dev
```
Check `http://localhost:4321/about`

**Step 3: Commit**
```bash
git add src/pages/about.astro
git commit -m "feat: build about us page"
```

---

## Task 5: Players Page

**Files:**
- Create: `src/pages/players.astro`

**Step 1: Create `src/pages/players.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="Players"
  description="ProKickTalent is looking for Ontario's next generation of professional footballers. Are you next?"
>

  <!-- RECRUITMENT HERO -->
  <section class="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-background via-gray-900 to-background"></div>
    <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 79px, #22C55E 79px, #22C55E 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, #22C55E 79px, #22C55E 80px);"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-6">
      <p class="text-green text-sm tracking-[0.3em] uppercase font-body mb-4">ProKickTalent Roster</p>
      <h1 class="font-heading text-7xl md:text-9xl text-white leading-none mb-6">
        Are You<br/><span class="text-green">Next?</span>
      </h1>
      <p class="text-gray-300 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10">
        We're building Ontario's next generation of professional footballers. Talented, driven, coachable players — we're looking for you.
      </p>
      <a
        href="/contact"
        class="inline-block bg-green text-black font-body font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-emerald-400 transition-colors"
      >
        I Want to Be Represented
      </a>
    </div>
  </section>

  <!-- WHAT WE LOOK FOR -->
  <section class="py-24 px-6 max-w-7xl mx-auto">
    <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">The Standard</p>
    <h2 class="font-heading text-5xl md:text-6xl text-white mb-16">What We Look For</h2>

    <div class="grid md:grid-cols-3 gap-6">
      {[
        {
          number: '01',
          title: 'Skill & Potential',
          desc: 'Raw ability on the ball, tactical awareness, and the physical tools to compete at the next level. We evaluate players across all positions.',
        },
        {
          number: '02',
          title: 'Drive & Dedication',
          desc: 'Natural talent is the starting point. What separates professionals is the commitment to improving every single day, on and off the pitch.',
        },
        {
          number: '03',
          title: 'Character & Coachability',
          desc: 'Professional clubs look at the whole player. We represent athletes with the mindset to accept feedback, grow, and lead by example.',
        },
      ].map(item => (
        <div class="bg-surface border border-white/10 p-8 hover:border-green/50 transition-colors">
          <p class="font-heading text-5xl text-green/30 mb-4">{item.number}</p>
          <h3 class="font-heading text-2xl text-white mb-4 tracking-wide">{item.title}</h3>
          <p class="text-gray-400 font-body text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="py-24 bg-surface">
    <div class="max-w-7xl mx-auto px-6">
      <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">The Process</p>
      <h2 class="font-heading text-5xl md:text-6xl text-white mb-16">How It Works</h2>

      <div class="grid md:grid-cols-3 gap-8">
        {[
          {
            step: '1',
            title: 'Get Found',
            desc: 'We scout live games and tournaments across Ontario. Reach out directly or get referred by a coach — every inquiry is reviewed.',
          },
          {
            step: '2',
            title: 'Get Evaluated',
            desc: 'We assess your current level, potential, and goals through a combination of live scouting and GPS performance data.',
          },
          {
            step: '3',
            title: 'Get Represented',
            desc: 'If we believe in your future, we build a personalized pathway — from your next club to your first professional contract.',
          },
        ].map(item => (
          <div class="flex gap-6">
            <div class="font-heading text-7xl text-gold/20 leading-none select-none">{item.step}</div>
            <div>
              <h3 class="font-heading text-2xl text-white mb-3 tracking-wide">{item.title}</h3>
              <p class="text-gray-400 font-body text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="py-24 px-6 max-w-4xl mx-auto text-center">
    <h2 class="font-heading text-5xl md:text-6xl text-white mb-6">
      Your Career Starts<br/><span class="text-gold">With One Message.</span>
    </h2>
    <p class="text-gray-400 font-body text-lg mb-10">
      Tell us about yourself. Your age, position, current club, and why you believe you have what it takes. We read every message.
    </p>
    <a
      href="/contact"
      class="inline-block bg-gold text-black font-body font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-yellow-400 transition-colors"
    >
      Contact Us Now
    </a>
  </section>

</Layout>
```

**Step 2: Verify**
Check `http://localhost:4321/players`

**Step 3: Commit**
```bash
git add src/pages/players.astro
git commit -m "feat: build players recruitment page"
```

---

## Task 6: Services Page

**Files:**
- Create: `src/pages/services.astro`

**Step 1: Create `src/pages/services.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';

const services = [
  {
    id: 'representation',
    number: '01',
    title: 'Player Representation & Contract Negotiation',
    tagline: 'Your Career. Your Terms.',
    body: [
      'We represent players with professionalism, integrity, and ambition. From club trials to contract signings, we advocate for your best interests every step of the way — so you can focus on what you do best: playing football.',
      'Having a FIFA-licensed agent means you have professional protection. We understand contract structures, transfer regulations, and league rules so that you never sign something that doesn\'t serve your future.',
    ],
    highlight: 'FIFA-Licensed Representation',
  },
  {
    id: 'gps',
    number: '02',
    title: 'GPS Performance Analysis & Reports',
    tagline: 'Where Sports Meet Science.',
    body: [
      'Using cutting-edge GPS tracking vest technology, we collect real match and training data to build personalized performance reports for each player. Speed, distance, intensity, positioning — we turn raw athletic data into actionable insights.',
      'These reports help players develop faster and impress scouts with objective evidence of their athletic output. This is ProKickTalent\'s signature offering — the edge that separates serious players from the rest.',
    ],
    highlight: 'ProKickTalent Signature Service',
  },
  {
    id: 'scouting',
    number: '03',
    title: 'Scouting & Talent Identification',
    tagline: 'We\'re Always Watching.',
    body: [
      'We actively scout youth and emerging talent across Ontario. Whether you\'re playing in a local league or a regional tournament, we\'re watching. If you have the drive and the skill, we want to find you.',
      'Our scouting network covers amateur leagues, school competitions, and regional tournaments throughout the province. Talent doesn\'t always come pre-packaged — we find it where it grows.',
    ],
    highlight: 'Ontario-Wide Scouting Network',
  },
  {
    id: 'development',
    number: '04',
    title: 'Career Development & Guidance',
    tagline: 'The Roadmap to Professional Football.',
    body: [
      'The road to professional football is more than just talent. We work with players and their families to build a roadmap — from youth academies to professional clubs — with mentorship, education planning, and career strategy built in.',
      'We help families understand the landscape: MLS academies, CPL pathways, European trials, and college programs. No more guessing, no more costly mistakes. Just a clear, informed plan built around your player\'s goals.',
    ],
    highlight: 'Family-Centered Approach',
  },
];
---

<Layout
  title="Services"
  description="ProKickTalent offers player representation, GPS performance analysis, scouting, and career development for youth footballers."
>

  <!-- PAGE HERO -->
  <section class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-background via-surface to-background"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">What We Do</p>
      <h1 class="font-heading text-6xl md:text-8xl text-white leading-none mb-6">Our Services</h1>
      <p class="text-gray-300 font-body text-lg max-w-2xl leading-relaxed">
        At ProKickTalent, we believe every talented young player deserves a real shot at the professional game. With a FIFA-licensed agent and a unique edge in data-driven performance analysis, we're here to guide Ontario's next generation of football stars.
      </p>
    </div>
  </section>

  <!-- SERVICE SECTIONS -->
  {services.map((service, i) => (
    <section
      id={service.id}
      class={`py-24 ${i % 2 === 1 ? 'bg-surface' : 'bg-background'}`}
    >
      <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div class={i % 2 === 1 ? 'md:order-2' : ''}>
          <p class="font-heading text-7xl text-gold/10 mb-2">{service.number}</p>
          <p class="text-green text-sm tracking-[0.3em] uppercase font-body mb-3">{service.highlight}</p>
          <h2 class="font-heading text-4xl md:text-5xl text-white mb-4 leading-tight">{service.title}</h2>
          <p class="text-gold font-body text-base italic mb-6">{service.tagline}</p>
          {service.body.map(para => (
            <p class="text-gray-400 font-body text-base leading-relaxed mb-4">{para}</p>
          ))}
          <a
            href="/contact"
            class="inline-block mt-4 border border-gold text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase px-8 py-3 hover:bg-gold hover:text-black transition-colors"
          >
            Enquire Now
          </a>
        </div>

        <!-- Visual placeholder (replace with real image later) -->
        <div class={`${i % 2 === 1 ? 'md:order-1' : ''} aspect-video bg-surface border border-white/10 flex items-center justify-center`}>
          <div class="text-center px-8">
            <p class="font-heading text-6xl text-gold/20 mb-2">{service.number}</p>
            <p class="text-gray-600 font-body text-xs tracking-wider uppercase">Image coming soon</p>
          </div>
        </div>
      </div>
    </section>
  ))}

  <!-- BOTTOM CTA -->
  <section class="py-24 bg-gold">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <h2 class="font-heading text-5xl md:text-6xl text-black mb-6">Not Sure Where to Start?</h2>
      <p class="text-black/70 font-body text-lg mb-10">
        Book a free consultation and we'll figure out together which services make the most sense for your stage of development.
      </p>
      <a
        href="/contact"
        class="inline-block bg-black text-white font-body font-semibold text-sm tracking-[0.2em] uppercase px-10 py-4 hover:bg-gray-900 transition-colors"
      >
        Schedule Free Consultation
      </a>
    </div>
  </section>

</Layout>
```

**Step 2: Verify**
Check `http://localhost:4321/services`

**Step 3: Commit**
```bash
git add src/pages/services.astro
git commit -m "feat: build services detail page"
```

---

## Task 7: Media Page

**Files:**
- Create: `src/pages/media.astro`

**Step 1: Create `src/pages/media.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';

// Placeholder grid items — replace with real images later
const placeholders = Array.from({ length: 9 }, (_, i) => i + 1);
---

<Layout
  title="Media"
  description="Photos, videos, and press coverage from ProKickTalent Sports Group."
>

  <!-- PAGE HERO -->
  <section class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-background via-surface to-background"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">Gallery</p>
      <h1 class="font-heading text-6xl md:text-8xl text-white leading-none">Media</h1>
    </div>
  </section>

  <!-- GALLERY GRID -->
  <section class="py-16 px-6 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-12">
      <h2 class="font-heading text-3xl text-white tracking-wide">Photo Gallery</h2>
      <a
        href="https://instagram.com/prokicktalent"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-gold text-sm tracking-widest uppercase font-body hover:underline"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        Follow on Instagram
      </a>
    </div>

    <!-- Gallery Grid (placeholder) -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      {placeholders.map(n => (
        <div class="aspect-square bg-surface border border-white/10 flex items-center justify-center hover:border-gold/30 transition-colors group">
          <div class="text-center">
            <svg class="w-8 h-8 text-gray-700 mx-auto mb-2 group-hover:text-gold/30 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-gray-700 font-body text-xs">Photo {n}</p>
          </div>
        </div>
      ))}
    </div>

    <div class="mt-12 text-center border border-white/10 bg-surface p-10">
      <p class="font-heading text-3xl text-white mb-3">Gallery Launching Soon</p>
      <p class="text-gray-400 font-body text-sm leading-relaxed max-w-md mx-auto mb-6">
        Photos and videos from games, scouting sessions, and player showcases will be posted here. Follow us on Instagram for live updates.
      </p>
      <a
        href="https://instagram.com/prokicktalent"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block border border-gold text-gold font-body font-semibold text-sm tracking-[0.2em] uppercase px-8 py-3 hover:bg-gold hover:text-black transition-colors"
      >
        Follow on Instagram
      </a>
    </div>
  </section>

</Layout>
```

**Step 2: Verify**
Check `http://localhost:4321/media`

**Step 3: Commit**
```bash
git add src/pages/media.astro
git commit -m "feat: build media gallery placeholder page"
```

---

## Task 8: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

**Important:** Before this step, sign up at formspree.io, create a new form, and copy your form endpoint (looks like `https://formspree.io/f/xxxxxxxx`). Replace `YOUR_FORMSPREE_ID` below.

**Step 1: Create `src/pages/contact.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="Contact Us"
  description="Get in touch with ProKickTalent Sports Group to schedule a free consultation."
>

  <!-- PAGE HERO -->
  <section class="relative py-32 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-background via-surface to-background"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <p class="text-gold text-sm tracking-[0.3em] uppercase font-body mb-3">Start the Conversation</p>
      <h1 class="font-heading text-6xl md:text-8xl text-white leading-none">
        Get In<br/><span class="text-gold">Touch</span>
      </h1>
    </div>
  </section>

  <!-- CONTACT CONTENT -->
  <section class="py-20 px-6 max-w-7xl mx-auto">
    <div class="grid md:grid-cols-2 gap-16 items-start">

      <!-- Form -->
      <div>
        <h2 class="font-heading text-3xl text-white mb-8 tracking-wide">Send Us a Message</h2>
        <form
          action="https://formspree.io/f/YOUR_FORMSPREE_ID"
          method="POST"
          class="space-y-6"
        >
          <div>
            <label for="name" class="block text-xs text-gray-400 tracking-widest uppercase font-body mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="Your full name"
              class="w-full bg-surface border border-white/20 text-white font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
            />
          </div>

          <div>
            <label for="email" class="block text-xs text-gray-400 tracking-widest uppercase font-body mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              class="w-full bg-surface border border-white/20 text-white font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
            />
          </div>

          <div>
            <label for="interest" class="block text-xs text-gray-400 tracking-widest uppercase font-body mb-2">I'm Interested In</label>
            <select
              id="interest"
              name="interest"
              class="w-full bg-surface border border-white/20 text-white font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            >
              <option value="representation">Player Representation</option>
              <option value="gps">GPS Performance Analysis</option>
              <option value="scouting">Scouting / Talent ID</option>
              <option value="development">Career Development</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-xs text-gray-400 tracking-widest uppercase font-body mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              placeholder="Tell us about the player, their age, position, current club, and what you're looking for..."
              class="w-full bg-surface border border-white/20 text-white font-body text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder-gray-600 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full bg-gold text-black font-body font-semibold text-sm tracking-[0.2em] uppercase py-4 hover:bg-yellow-400 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      <!-- Contact Info -->
      <div class="space-y-8">
        <div>
          <h2 class="font-heading text-3xl text-white mb-6 tracking-wide">Contact Info</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500 tracking-widest uppercase font-body mb-1">Location</p>
                <p class="text-gray-300 font-body text-sm">Toronto, Ontario, Canada</p>
                <p class="text-gray-500 font-body text-xs mt-1">Serving players across Canada</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg class="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500 tracking-widest uppercase font-body mb-1">Social</p>
                <a
                  href="https://instagram.com/prokicktalent"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gold font-body text-sm hover:underline"
                >
                  @prokicktalent
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- What to expect -->
        <div class="bg-surface border border-white/10 p-6">
          <h3 class="font-heading text-xl text-white mb-4 tracking-wide">What to Expect</h3>
          <ul class="space-y-3 font-body text-sm text-gray-400">
            <li class="flex items-start gap-2">
              <span class="text-green mt-0.5">&#10003;</span>
              Response within 48 hours
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green mt-0.5">&#10003;</span>
              Free 30-minute initial consultation
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green mt-0.5">&#10003;</span>
              No obligation, no pressure
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green mt-0.5">&#10003;</span>
              Honest assessment of your pathway options
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</Layout>
```

**Step 2: Verify**
Check `http://localhost:4321/contact`

**Step 3: Commit**
```bash
git add src/pages/contact.astro
git commit -m "feat: build contact page with Formspree form"
```

---

## Task 9: Privacy & Terms Stub Pages

**Files:**
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`

**Step 1: Create `src/pages/privacy.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Privacy Policy">
  <section class="py-32 px-6 max-w-3xl mx-auto">
    <h1 class="font-heading text-5xl text-white mb-10">Privacy Policy</h1>
    <div class="space-y-6 font-body text-gray-400 text-sm leading-relaxed">
      <p>Last updated: March 2026</p>
      <p>ProKickTalent Sports Group ("we", "us", "our") respects your privacy. This policy explains how we handle information submitted through this website.</p>
      <h2 class="font-heading text-2xl text-white mt-8">Information We Collect</h2>
      <p>We collect information you voluntarily submit through our contact form, including your name, email address, and message content. This information is used solely to respond to your inquiry.</p>
      <h2 class="font-heading text-2xl text-white mt-8">How We Use It</h2>
      <p>Your information is never sold, shared with third parties, or used for marketing without your consent. We use it only to communicate with you about your inquiry.</p>
      <h2 class="font-heading text-2xl text-white mt-8">Contact</h2>
      <p>Questions about this policy? <a href="/contact" class="text-gold hover:underline">Contact us</a>.</p>
    </div>
  </section>
</Layout>
```

**Step 2: Create `src/pages/terms.astro`**
```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Terms and Conditions">
  <section class="py-32 px-6 max-w-3xl mx-auto">
    <h1 class="font-heading text-5xl text-white mb-10">Terms and Conditions</h1>
    <div class="space-y-6 font-body text-gray-400 text-sm leading-relaxed">
      <p>Last updated: March 2026</p>
      <p>By accessing and using the ProKickTalent Sports Group website, you accept these terms and conditions in full.</p>
      <h2 class="font-heading text-2xl text-white mt-8">Use of Website</h2>
      <p>This website is for informational purposes only. Content is provided without warranty of any kind. ProKickTalent reserves the right to change or remove content at any time.</p>
      <h2 class="font-heading text-2xl text-white mt-8">Intellectual Property</h2>
      <p>All content on this site — text, images, logos, and branding — is the property of ProKickTalent Sports Group. Unauthorized reproduction is prohibited.</p>
      <h2 class="font-heading text-2xl text-white mt-8">Contact</h2>
      <p>Questions? <a href="/contact" class="text-gold hover:underline">Contact us</a>.</p>
    </div>
  </section>
</Layout>
```

**Step 3: Commit**
```bash
git add src/pages/privacy.astro src/pages/terms.astro
git commit -m "feat: add privacy and terms stub pages"
```

---

## Task 10: Favicon & Final Build Check

**Files:**
- Create: `public/favicon.svg`

**Step 1: Create a simple SVG favicon**
```bash
cat > public/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0A0A0A"/>
  <text x="16" y="22" font-family="sans-serif" font-size="18" font-weight="bold" fill="#D4AF37" text-anchor="middle">P</text>
</svg>
EOF
```

**Step 2: Run production build and verify no errors**
```bash
npm run build
```
Expected: Build completes with no errors, `dist/` directory created.

**Step 3: Preview production build**
```bash
npm run preview
```
Visit `http://localhost:4321`, navigate all 6 pages, check for broken links or layout issues.

**Step 4: Final commit**
```bash
git add public/favicon.svg
git commit -m "feat: add favicon and complete production build"
```

---

## Task 11: GitHub + Cloudflare Pages Deployment

**Step 1: Create GitHub repository**
- Go to github.com → New repository
- Name: `prokicktalent-website`
- Private repository
- Do NOT initialize with README (we already have commits)

**Step 2: Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/prokicktalent-website.git
git branch -M main
git push -u origin main
```

**Step 3: Connect to Cloudflare Pages**
1. Log in to Cloudflare Dashboard → Pages → Create a project
2. Connect to Git → Select your GitHub repo
3. Set build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Click "Save and Deploy"

**Step 4: Add custom domain**
In Cloudflare Pages project → Custom domains → Add your domain

**Step 5: Update Formspree form**
- Go to formspree.io, create account
- Create new form → copy the endpoint URL
- Edit `src/pages/contact.astro` line with `YOUR_FORMSPREE_ID`
- Replace with your actual Formspree endpoint
- Commit and push — Cloudflare auto-deploys

---

## Done

All 6 pages are live. When you receive images:
1. Drop them into `public/images/`
2. Update `src/pages/index.astro` hero background and `src/pages/about.astro` photo placeholder
3. `git add . && git commit -m "feat: add site images" && git push`
4. Cloudflare deploys automatically within ~30 seconds
