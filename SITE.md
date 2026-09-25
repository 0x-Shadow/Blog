# 0x-shadow.log — complete site description

Static, zero-build dev blog + project index for **@0x-Shadow**.
Live: `https://0x-shadow.github.io/Blog/` · Stack: HTML + CSS + one `site.js`, no frameworks, no build step.
Principles: mobile-first, safe-by-default rendering, minimal text, one accent.

## Pages (8)

### 1. `index.html` — Home
- **Status bar + nav** (shared everywhere): terminal dots, `0x-shadow@dev`, live clock, theme toggle, mobile menu, bottom tabbar on phones.
- **Hero**: full-bleed live ASCII sky (robot/human luminance field, 78×48 chars desktop) behind the headline; reacts to the cursor; fades + drifts away on scroll with a `scroll ↓` cue. Typewriter line, one-sentence intro, 3 live stats (repos / stars / langs).
- **Marquee** ticker strip.
- **Terminal playground**: working command line (`help`, `projects`, `log`, `whoami`, `ascii`, `hire`, `rss`, `stats`, `theme`, `sudo`, `clear`) with ArrowUp/Down history.
- **CrewTrack spotlight**: featured build card (▲80 · r/esp32, spec chips, SOURCE link).
- **TOP_3** project preview + CrewTrack **roadmap strip** (NOW/NEXT/LATER from the README) + **LATEST** build-log preview.
- **Hire section**: 3 service cards + availability pulse + GitHub CTA.

### 2. `projects.html` — Project index
- Breadcrumb, live **profile strip** (avatar, bio, repo/fan/star counts from the GitHub API).
- Controls: instant text filter, sort (recent / top ★ / A–Z), language dropdown, collapsible loader for any other GitHub user (`?u=`).
- Skeleton shimmer while loading; project cards link to per-project pages. Forks, profile repo, Blog and Assasina_KatGR are filtered out; starred builds get ★ TOP badges.

### 3. `project.html?owner=&repo=` — Per-project README page
- Reading progress bar, breadcrumbs, hero card (title, description, lang/stars/forks/age/**license**, topics).
- **DNA strip**: LANG / PLATFORM / STATUS / UPDATED / LICENSE — scannable in seconds.
- **Build overview** (flagships only, verified stories): PROBLEM → IDEA → BUILD → RESULT in 20 seconds, before the README.
- Actions: SOURCE ↗, LIVE → (if the repo has a homepage), BUILD_LOG ✎ (if a note exists), COPY_LINK ⧉ (native share sheet on phones).
- Screenshot banner for CrewTrack / ClipTap / SnapTap (click = full size).
- README rendered as safe text with **sticky table of contents + scrollspy**, code copy buttons, click-to-zoom images, GFM tables, task lists.
- Hire strip, prev/next pager, 3 more-build cards.

### 4. `blog.html` — Build log index
- Search filter + RSS button, numbered cards (`#01` oldest) linking to full posts (date · tag · read time).

### 5. `post.html?id=` — Full build-log entry
- Progress bar, breadcrumbs, title/meta, body, prev/next pager, "open an issue" discussion link, native SHARE button.
- 5 notes ship with the site: SnapTap, ClipTap, CrewTrack, photo→ASCII, Code-Mate.

### 6. `about.html` — Whoami
- Bio (Greece, ESP32/IoT, homelab), GitHub + Reddit links, stack chips, **live** repo stats, changelog, sysbox (uptime/render/theme).

### 7. `lab.html` — The lab
- Hardware bench (verified parts only), homelab card, open questions from r/esp32 threads.

### 8. `404.html` — Not found
- ASCII-art 404 with HOME / PROJECTS escape buttons.

## Systems (`site.js`, single shared engine)
- **Safe markdown renderer**: escapes everything, then allows a strict subset — headings, bold/italic, code, GFM tables, task lists, autolinks, plus sanitized raw HTML (badges, `<p align>`, `<br>`) with validated attributes. `javascript:`/event-handler attacks stay dead text.
- **GitHub layer**: repo allow-listing, `FEATURED`/`HIDDEN` sets, `sessionStorage` caching, profile + README fetching with correct default-branch resolution for relative images/links.
- **Motion**: scroll reveals with stagger, page-enter transitions, marquee, glow buttons, card lifts — all disabled under `prefers-reduced-motion`, ASCII pauses offscreen.
- **Safety**: every network string escaped, URLs allow-listed, uploads once existed with type/size guards (image lab since removed), clipboard fallbacks.
- **Content system**: `POSTS` (numbered build log, newest first), `RELATED_POST` (repo→note links), `PROJECT_SHOTS` (repo→banner), `RELATED_STORY` (verified overviews only). HOW-TO-POST comment included: new note = 30 seconds.

## Design (`styles.css`)
- Tokens: near-black `#0a0a0b` / paper `#ececea`, one lime accent, JetBrains Mono + Space Grotesk, ASCII borders everywhere, no gradients-as-decoration.
- Dark + paper-light themes (persisted), breakpoints 1024/860/560, 44px touch targets, bottom tabbar on phones, print stylesheet.

## Root files
- `feed.xml` (RSS, 5 items) · `sitemap.xml` · `robots.txt` · `README.md` · `LICENSE` (MIT) · `shots/` (4 rescued screenshots) · JSON-LD person schema + OG/Twitter cards on every page.

## Workflow
- `main` = live site (GitHub Pages). Small branches + PRs for changes, tags per release (`v3.x.x`).
- New project ritual: ship repo → 1-line GitHub description + topics → note block → `RELATED_POST` line → push. New repos appear on the projects page automatically.
