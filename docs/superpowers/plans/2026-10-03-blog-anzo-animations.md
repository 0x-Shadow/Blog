# Blog Anzo Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port anzo-studio tilt, spin, and scroll-scrub feel into 0x-shadow.log Blog with vanilla CSS/JS, zero new dependencies.

**Architecture:** Append one `anzo-anim` CSS block to `styles.css`, extend `site.js` with `heroTilt()` + `scrubTitles()` reusing existing `reduceMotion` and coarse-pointer guards, add `tilt-hero` + `anzo-scrub` classes in HTML.

**Tech Stack:** Vanilla HTML, CSS, JS, no build, GitHub Pages safe.

**Spec:** `C:/Users/nikol/Documents/Blog/docs/superpowers/specs/2026-10-03-blog-anzo-animations-design.md`

## Global Constraints

- Zero-build: no npm, no CDN, no new files except spec/plan docs.
- Do not modify `feed.xml`, `post.html`, `project.html`, GitHub/README fetch logic in `site.js`.
- Respect `prefers-reduced-motion`: skip all new transforms when matched.
- Skip tilt on `pointer:coarse`.
- Do not `git push` or `git commit` unless user explicitly asks (user said dont push).
- Wrap new CSS in `@media screen`.

---

### Task 1: HTML hooks

**Files:**
- Modify: `C:/Users/nikol/Documents/Blog/index.html:67` (`hero-left reveal in`)
- Modify: `C:/Users/nikol/Documents/Blog/index.html:110,156` (sec-title TOP_3, LATEST)
- Modify: `C:/Users/nikol/Documents/Blog/blog.html:65` (sec-title BUILD_LOG)

**Interfaces:**
- Consumes: existing `.hero-left`, `.sec-title` classes.
- Produces: `.tilt-hero` hook for JS, `.anzo-scrub` hooks for JS/CSS.

- [ ] **Step 1: Add tilt-hero to index hero**

Edit `C:/Users/nikol/Documents/Blog/index.html:67`:

Old:
```html
<div class="hero-left reveal in">
```

New:
```html
<div class="hero-left reveal in tilt-hero">
```

- [ ] **Step 2: Add anzo-scrub to index titles**

Edit 1 `C:/Users/nikol/Documents/Blog/index.html:110`:

Old:
```html
<h2 class="sec-title">TOP<span class="accent">_3</span></h2>
```

New:
```html
<h2 class="sec-title anzo-scrub">TOP<span class="accent">_3</span></h2>
```

Edit 2 `C:/Users/nikol/Documents/Blog/index.html:156`:

Old:
```html
<h2 class="sec-title">LATE<span class="accent">ST</span></h2>
```

New:
```html
<h2 class="sec-title anzo-scrub">LATE<span class="accent">ST</span></h2>
```

- [ ] **Step 3: Add anzo-scrub to blog title**

Edit `C:/Users/nikol/Documents/Blog/blog.html:65`:

Old:
```html
<h2 class="sec-title">BUILD<span class="accent">_LOG</span></h2>
```

New:
```html
<h2 class="sec-title anzo-scrub">BUILD<span class="accent">_LOG</span></h2>
```

- [ ] **Step 4: Verify hooks present**

Run:
```powershell
Select-String -LiteralPath "C:\Users\nikol\Documents\Blog\index.html" -Pattern "tilt-hero|anzo-scrub"; Select-String -LiteralPath "C:\Users\nikol\Documents\Blog\blog.html" -Pattern "anzo-scrub"
```
Expected: 3 hits in index.html (1 tilt-hero + 2 anzo-scrub), 1 hit in blog.html.

---

### Task 2: CSS anzo-anim block

**Files:**
- Modify: `C:/Users/nikol/Documents/Blog/styles.css:509` (append after final `}`)

**Interfaces:**
- Consumes: `.tilt-hero`, `.anzo-scrub`, `.spot-badge` classes from HTML.
- Produces: visual effects consumed by Task 3 JS transforms.

- [ ] **Step 1: Append CSS block**

Append to end of `C:/Users/nikol/Documents/Blog/styles.css`:

```css
/* ── anzo-anim: tilt + spin + scrub (vanilla port of anzo-studio) ── */
@media screen {
  .tilt-hero { transform-style: preserve-3d; will-change: transform; }
  .hero-bg { will-change: transform; }

  .spot-badge { position: relative; }
  .spot-badge::after {
    content: ""; position: absolute; inset: -6px;
    border: 1px dashed var(--accent); border-radius: 10px;
    opacity: .55; pointer-events: none;
    animation: anzoSpin 6s linear infinite;
  }
  .spot:hover .spot-badge::after { animation-play-state: paused; }
  @keyframes anzoSpin { to { transform: rotate(360deg); } }

  .anzo-scrub {
    transform: perspective(800px) rotateX(-20deg) scale(.94);
    opacity: .6; will-change: transform, opacity;
  }
  .anzo-scrub.scrub-in {
    transform: perspective(800px) rotateX(0deg) scale(1);
    opacity: 1;
    transition: transform .6s var(--ease), opacity .6s var(--ease);
  }
}
@media (prefers-reduced-motion: reduce) {
  .spot-badge::after { animation: none !important; }
  .anzo-scrub { transform: none !important; opacity: 1 !important; }
  .tilt-hero { transform: none !important; }
}
```

- [ ] **Step 2: Verify CSS appended**

Run:
```powershell
Select-String -LiteralPath "C:\Users\nikol\Documents\Blog\styles.css" -Pattern "anzo-anim|anzoSpin|anzo-scrub"
```
Expected: 3+ hits, no syntax error (file ends with `}`).

---

### Task 3: JS heroTilt + scrubTitles

**Files:**
- Modify: `C:/Users/nikol/Documents/Blog/site.js:508-519` (after existing `cardTilt` IIFE, before `tryTerm` handler)

**Interfaces:**
- Consumes: `reduceMotion` const from `site.js:111`, `.tilt-hero`, `.hero`, `.hero-bg`, `.anzo-scrub` DOM.
- Produces: interactive tilt + scroll-driven `scrub-in` class. No exports, no network.

- [ ] **Step 1: Insert heroTilt + scrubTitles**

Insert after `cardTilt` block in `C:/Users/nikol/Documents/Blog/site.js` (after line `})();` at 519, before `if ($("tryTerm"))`):

```js
(function heroTilt() {
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;
  const hero = document.querySelector(".hero");
  const tilt = document.querySelector(".tilt-hero");
  const bg = document.querySelector(".hero-bg");
  if (!hero || !tilt) return;
  hero.style.perspective = "1000px";
  hero.addEventListener("pointermove", e => {
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    tilt.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    if (bg) bg.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.03)`;
  }, { passive: true });
  hero.addEventListener("pointerleave", () => {
    tilt.style.transform = ""; if (bg) bg.style.transform = "";
  });
})();
(function scrubTitles() {
  if (reduceMotion) {
    document.querySelectorAll(".anzo-scrub").forEach(el => el.classList.add("scrub-in"));
    return;
  }
  const els = [...document.querySelectorAll(".anzo-scrub")];
  if (!els.length) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight || 600;
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      const visible = r.top < vh * .85 && r.bottom > vh * .15;
      el.classList.toggle("scrub-in", visible);
    });
  };
  addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
```

- [ ] **Step 2: Syntax check JS**

Run:
```powershell
node --check "C:\Users\nikol\Documents\Blog\site.js"
```
Expected: exit 0, no output. If node missing, open file in VS Code and confirm no red squiggles on inserted block.

- [ ] **Step 3: Verify guards present**

Run:
```powershell
Select-String -LiteralPath "C:\Users\nikol\Documents\Blog\site.js" -Pattern "heroTilt|scrubTitles|scrub-in"
```
Expected: hits for both function names + class toggle.

---

### Task 4: Manual verify (no commit/push)

**Files:**
- Verify: `C:/Users/nikol/Documents/Blog/index.html`, `blog.html`, `styles.css`, `site.js`

- [ ] **Step 1: Serve locally and open**

Run:
```powershell
Set-Location -LiteralPath "C:\Users\nikol\Documents\Blog"; python -m http.server 8000
```
Open `http://localhost:8000/index.html` and `http://localhost:8000/blog.html`. Confirm no 404 for `styles.css`, `site.js`.

- [ ] **Step 2: Checklist (pass/fail)**

- Hero tilt moves max ~8deg on desktop mousemove, resets on leave.
- Badge dashed ring spins, pauses on `.spot` hover.
- BUILD_LOG / TOP_3 / LATEST titles start tilted/faded, ease to straight when scrolled into 15-85% viewport.
- Cards lift on hover (existing behavior kept).
- Toggle themeBtn light/dark: ring + titles readable in both.
- DevTools 390px mobile: no horizontal scroll, tilt inactive on touch emulate.
- DevTools rendering → Emulate prefers-reduced-motion: all new anims off, content visible.
- Console: zero errors.

- [ ] **Step 3: Stop server, report**

Stop with Ctrl+C. Report pass/fail per checklist item. Do NOT git commit or push.
