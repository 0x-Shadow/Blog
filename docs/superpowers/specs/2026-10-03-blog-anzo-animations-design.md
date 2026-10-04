# Blog Anzo Animations — Design (2026-10-03)

## Goal
Port anzo-studio UI feel into `0x-shadow.log` Blog (`C:\Users\nikol\Documents\Blog`) while keeping zero-build, ASCII mono + lime system, maintainability.

Source: `C:\Users\nikol\Documents\projects\anzo-studio` — Page1 tilt (`src/pages/Page1.jsx:12-35`), Header spin (`src/components/Header.jsx:5-12`), Page2 scrub (`src/pages/Page2.jsx:10-24`), Lenis (`src/App.jsx:10-26`).

Target: `index.html`, `blog.html`, `styles.css`, `site.js`. No new deps.

## Architecture
- Only append: `styles.css` += `/* ── anzo-anim ── */` ~80 lines at end.
- Extend `site.js`: upgrade existing `cardTilt()` + add `heroTilt()` + `scrubTitles()`, ~90 lines, reuse `reduceMotion`, `matchMedia(pointer:coarse)`.
- Tiny HTML hooks: add `tilt-hero` class to `.hero-left` in index.html only (blog.html has no hero, skip). No extra span — spin uses existing `.spot-badge` + CSS `::after` ring so zero HTML change for badge. Add `anzo-scrub` class to 3 existing `.sec-title` elements (index TOP_3, LATEST + blog BUILD_LOG).
- No change to `feed.xml`, `post.html`, `project.html`, `site.js` GitHub/README logic.

## Components
1. Hero tilt (index.html only): pointermove on `.hero` → `.tilt-hero` rotateY/X max 8deg scale 1.02 perspective 1000px, `.hero-bg` translate 10px parallax. Reset on pointerleave. Disabled on coarse pointers.
2. Spin badge: `@keyframes anzoSpin {to{transform:rotate(360deg)}}` on `.spot-badge::after` decorative dashed ring (badge text stays readable), 6s linear infinite, `animation-play-state:paused` on hover. Respects reduced-motion.
3. Giant scrub titles: `.sec-title.anzo-scrub` initial `rotateX(-20deg) scale(.94) opacity:.6`, driven to identity via rAF scroll progress (element center vs viewport). Applied to `BUILD_LOG` on blog.html, `TOP_3` + `LATEST` on index.html. Mono font + lime kept, no 42vw takeover (clamp existing).
4. Cards: keep `.card:hover translateY(-3px)`, add tilt already in `cardTilt()` (4deg). No change needed except ensure `.post` also gets same.

## Data flow
Pure UI, no network. IO existing `bindReveals` stays. New `scrubTitles` uses single rAF scroll listener passive, computes per `.anzo-scrub` bounding rect, sets `style.transform`. No state persisted.

## Error handling / safety
- `reduceMotion` → skip all, ensure `.reveal.in` visible, no transforms.
- `pointer:coarse` → skip tilt, keep reveal + scrub (scrub is scroll, ok on touch).
- Try/catch around querySelectors, transforms reset to '' on error.
- Light theme `[data-theme=light]` inherits, lime-dark outline preserved.
- Print: anim block inside `@media screen` or disabled in existing `@media print`.
- Mobile 390px: tilt off, scrub range shortened, no horizontal overflow (`overflow-x:hidden` already).

## Testing
Manual on `index.html` + `blog.html` via local server:
- Hero tilt moves, resets on leave.
- Badge spins, pauses on hover.
- Titles un-rotate/scale on scroll into view.
- Cards lift + tilt.
- Toggle dark/light, mobile 390px, reduced-motion emulate, no console errors.
- No regression: terminal, themeBtn, clock, search filter, RSS link.

## Files touched
- `Blog/styles.css` append (anzo-anim block, wrapped in `@media screen`)
- `Blog/site.js` extend (heroTilt + scrubTitles, reuse guards)
- `Blog/index.html` add `tilt-hero` + `anzo-scrub` classes (3 edits)
- `Blog/blog.html` add `anzo-scrub` class (1 edit)
