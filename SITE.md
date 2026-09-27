# 0x-shadow.log

Static dev blog + project index for **@0x-Shadow**.
Live: `https://0x-shadow.github.io/Blog/` · Stack: HTML + CSS + one `site.js`, no frameworks, no build step.
Principles: mobile-first, safe-by-default rendering, minimal text, one accent.

## Pages (8)

### 1. `index.html` — Home
- Status bar + nav (shared): terminal dots, `0x-shadow@dev`, live clock, theme toggle, mobile menu, bottom tabbar on phones.
- Hero: full-bleed live ASCII sky (78×48 chars desktop) behind the headline; reacts to cursor; fades + drifts on scroll.
- Marquee ticker strip.
- Terminal playground: `help`, `projects`, `log`, `whoami`, `ascii`, `hire`, `rss`, `stats`, `theme`, `sudo`, `clear` with ArrowUp/Down history.
- CrewTrack spotlight: featured build card (▲80 · r/esp32, spec chips, SOURCE link).
- TOP_3 project preview + CrewTrack roadmap strip + latest build-log preview.
- Hire section: 3 service cards + availability pulse + GitHub CTA.

### 2. `projects.html` — Project index
- Breadcrumb, live profile strip (avatar, bio, repo/fan/star counts from GitHub API).
- Controls: instant text filter, sort (recent / top ★ / A–Z), language dropdown, collapsible loader for any GitHub user (`?u=`).
- Skeleton shimmer while loading; cards link to per-project pages. Forks, profile repo, Blog and Assasina_KatGR filtered out; starred builds get ★ TOP badges.

### 3. `project.html?owner=&repo=` — Per-project README page
- Reading progress bar, breadcrumbs, hero card (title, description, lang/stars/forks/age/license, topics).
- DNA strip: LANG / PLATFORM / STATUS / UPDATED / LICENSE.
- Build overview (verified stories): PROBLEM → IDEA → BUILD → RESULT.
- Technical decisions section: why I built it this way, trade-offs I accepted.
- Actions: SOURCE ↗, LIVE →, BUILD_LOG ✎, COPY_LINK ⧉.
- Screenshot banner for CrewTrack / ClipTap / SnapTap (click = full size).
- README rendered as safe text with sticky TOC + scrollspy, code copy buttons, click-to-zoom images, GFM tables, task lists.
- Hire strip, prev/next pager, 3 more-build cards.

### 4. `blog.html` — Build log index
- Search filter + RSS button, numbered cards linking to full posts.

### 5. `post.html?id=` — Full build-log entry
- Progress bar, breadcrumbs, title/meta, body, prev/next pager, "open an issue" link, native SHARE button.
- 5 notes ship with the site: SnapTap, ClipTap, CrewTrack, photo→ASCII, Code-Mate.

### 6. `about.html` — Whoami
- Bio (Greece, ESP32/IoT, homelab), GitHub + Reddit links, stack chips, live repo stats, changelog, sysbox.

### 7. `lab.html` — The lab
- Hardware bench (verified parts only), homelab card, open questions from r/esp32 threads.

### 8. `404.html` — Not found
- ASCII-art 404 with HOME / PROJECTS escape buttons.

## Systems (`site.js`)
- Safe markdown renderer: escapes everything, allows strict subset — headings, bold/italic, code, GFM tables, task lists, autolinks, sanitized raw HTML with validated attributes.
- GitHub layer: repo allow-listing, FEATURED/HIDDEN sets, localStorage caching (30min TTL), profile + README fetching with correct default-branch resolution.
- Motion: scroll reveals, page-enter transitions, marquee, glow buttons — all disabled under `prefers-reduced-motion`.
- Content system: POSTS, RELATED_POST, PROJECT_SHOTS, RELATED_STORY, TECH_DECISIONS, PROJECT_STATUS.

## Design (`styles.css`)
- Tokens: near-black `#0a0a0b` / paper `#ececea`, one lime accent, JetBrains Mono + Space Grotesk, ASCII borders.
- Dark + paper-light themes (persisted), breakpoints 1024/860/560, 44px touch targets, bottom tabbar on phones, print stylesheet.
- Skip-to-content link, canonical URLs, OG/Twitter meta on every page.

## Root files
- `feed.xml` (RSS, 5 items) · `sitemap.xml` · `robots.txt` · `README.md` · `LICENSE` (MIT) · `shots/` (4 screenshots) · JSON-LD + OG/Twitter on every page.

## Workflow
- `main` = live site (GitHub Pages). Tags per release (`v3.x.x`).
- New project: ship repo → 1-line GitHub description + topics → note block → `RELATED_POST` line → push.
