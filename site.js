/* 0x-shadow.log — shared engine. One file, every page, zero build.
   Safety first: all network strings escaped, README via sanitizer. */
"use strict";

/* ── data ── */
const CONFIG = {
  githubUsername: "0x-Shadow",
  perPage: 100,
  avatarUrl: "https://avatars.githubusercontent.com/u/148369845?v=4",
};
const FEATURED = new Set(["CineHub", "CrewTrack", "SnapTap", "ClipTap"]);
const DEMO_PROJECTS = [
  { name: "CineHub", description: "Movie discovery platform — React + TypeScript. Search, track, and share what you watch.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-28T10:00:00Z", html_url: "https://github.com/0x-Shadow/CineHub", homepage: "", topics: ["react", "typescript", "movies"], featured: true },
  { name: "instagram-clone", description: "Circles — private photo sharing for small groups. Expo SDK 57, React Native, on-device first.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-26T14:30:00Z", html_url: "https://github.com/0x-Shadow/instagram-clone", homepage: "", topics: ["expo", "react-native", "privacy"] },
  { name: "CrewTrack", description: "ESP32 RFID attendance terminal for my father's electrical crew. Offline, no cloud, no fees — ▲80 on r/esp32.", language: "C++", stargazers_count: 8, forks_count: 0, updated_at: "2026-09-01T07:20:44Z", html_url: "https://github.com/0x-Shadow/CrewTrack", homepage: "https://0x-shadow.github.io/CrewTrack/", topics: ["esp32", "rfid", "offline"], featured: true },
  { name: "SnapTap", description: "Snap, save & share — lightweight capture tool.", language: "JavaScript", stargazers_count: 3, forks_count: 0, updated_at: "2026-09-15T11:24:05Z", html_url: "https://github.com/0x-Shadow/SnapTap", homepage: "https://0x-shadow.github.io/SnapTap/", topics: ["tool"], featured: true },
  { name: "ClipTap", description: "Floating clipboard manager for Windows. Searchable, offline, open source.", language: "JavaScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-15T17:58:53Z", html_url: "https://github.com/0x-Shadow/ClipTap", homepage: "https://0x-shadow.github.io/ClipTap/", topics: ["windows", "offline"], featured: true },
  { name: "Code-Mate", description: "Online code playground — Monaco + Piston.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-12T11:27:18Z", html_url: "https://github.com/0x-Shadow/Code-Mate", homepage: "", topics: ["playground"] },
  { name: "receipt-market", description: "Snap your receipt → live community price map for Greece. On-device OCR, Supabase Realtime, 0€/month.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-20T09:00:00Z", html_url: "https://github.com/0x-Shadow/receipt-market", homepage: "", topics: ["expo", "ocr", "supabase"] },
  { name: "PassStrengthAnalyzer", description: "Password strength analyzer in Python.", language: "Python", stargazers_count: 1, forks_count: 0, updated_at: "2025-06-07T09:31:42Z", html_url: "https://github.com/0x-Shadow/PassStrengthAnalyzer", homepage: "", topics: ["python", "security"] },
  { name: "Intelligent-Film-Production-Search", description: "Intelligent search over film-production data.", language: "Python", stargazers_count: 1, forks_count: 0, updated_at: "2026-01-25T11:31:40Z", html_url: "https://github.com/0x-Shadow/Intelligent-Film-Production-Search", homepage: "", topics: ["python"] },
];
/* HOW TO POST (30 seconds, no build):
   1. Copy one { id, date, ... } block below. 2. New unique id (used in URL).
   3. Write 2-4 short paragraphs in body. 4. Push — done. Newest first. */
const POSTS = [
  {
    id: "tutorial-rfid-attendance-terminal", date: "2026.10.04", read: "6 min", tag: "tutorial",
    title: "Tutorial: build the €15 RFID attendance terminal",
    excerpt: "Parts, wiring, firmware shape, and the offline-first rule — everything CrewTrack taught me, step by step.",
    img: "shots/crewtrack.jpg",
    body: [
      "You need: an ESP32 DevKit (€4–6), an RC522 RFID reader (€2), a 2-inch ST7789 TFT (€5), a microSD module (€2), an active buzzer (€1), and a printed enclosure. Total: €12–18. That is the whole shopping list — no subscriptions, no cloud accounts.",
      "Wire the RC522 to the ESP32 over SPI, the ST7789 display on SPI as well, the microSD module for storage, and the buzzer to any free GPIO for tap confirmation. Keep the wiring short and power everything from a single stable 5V supply — brownouts corrupt SD writes, and that is the most common failure in this kind of build.",
      "The firmware loop is small on purpose. On card tap: read the UID, append one CSV row (timestamp, UID) to the SD card, print the name on the TFT, beep once. Then host a WiFi access point with a tiny dashboard page so a phone can browse the log — no router and no internet required on site.",
      "The rule that makes it work in real life is offline-first or nothing. Construction yards have no reliable internet, CSV is human-readable when something looks wrong, and data staying on-site means zero privacy arguments. Test it with a real crew for a week before you print the final enclosure — the taps will teach you what the bench never does.",
    ],
  },
  {
    id: "tutorial-expo-private-feed-ui", date: "2026.10.04", read: "5 min", tag: "tutorial",
    title: "Tutorial: a private-feed UI in Expo (Circles)",
    excerpt: "Glass tab bar, spring circle switcher, audited dark mode — and screenshot loops that verify it all.",
    img: "shots/circles-feed.png",
    body: [
      "Start with the tab structure: feed, search, reels, messages, profile — five tabs, one floating glass bar with real backdrop blur. The bar floats above content instead of docking to the edge, which is what makes the whole app feel designed rather than assembled.",
      "The signature piece is the circle switcher: a spring-animated control in the middle of the feed that swaps between private groups (family, friends, photo walks). Animate it with a spring, not a tween — springs forgive interrupted gestures, tweens fight them.",
      "Reels go full-screen with a glass action rail on the side; DMs get unread badges plus filters; notes support attachable songs. Then audit dark mode color by color — in my pass 24 stray labels were invisible until every screen was checked in both themes.",
      "Verify with screenshots, not vibes: web export plus headless Chrome shooting every tab in light and dark, twice, fixing what the pixels show each loop. When the loop comes back clean and tsc is green, the UI is done — not before.",
    ],
  },
  {
    id: "tutorial-strict-types-movie-app", date: "2026.10.04", read: "4 min", tag: "tutorial",
    title: "Tutorial: strict types that catch missing posters",
    excerpt: "Model the API response once, in one place — the CineHub approach to killing undefined-poster bugs.",
    img: "https://raw.githubusercontent.com/0x-Shadow/CineHub/main/docs/screenshots/home.png",
    body: [
      "Every movie API returns almost-what-you-expect: poster paths that are sometimes null, dates in three formats, missing overviews. Model the response as one strict type the moment it crosses into your app — nullable poster, fallback title, normalized date — and never let raw JSON past that boundary.",
      "Render from the model, not the payload. The poster component takes a guaranteed string or renders a designed placeholder; it never sees null. This single rule killed a whole class of blank-card bugs in CineHub before they shipped.",
      "Then cut ruthlessly: search quality and speed are the product, everything else is decoration. Build search first, make it instant, and only then earn the right to add tracking lists and sharing.",
    ],
  },
  {
    id: "crewtrack-teardown-15-euro-box", date: "2026.10.04", read: "7 min", tag: "build-log",
    title: "Teardown: the €15 box that beat SaaS attendance",
    excerpt: "Full BOM, wiring, firmware lessons, and what 55K views on r/esp32 taught me about building for real crews.",
    body: [
      "CrewTrack started as a favor: my father's electrical crew lost hours every month to attendance arguments. Who was on site, and when? The answer lived in memory and chat messages. After one look at per-seat SaaS pricing for five electricians, I built the €15 box instead.",
      "The bill of materials: ESP32 DevKit (€4–6), RC522 RFID reader (€2), 2-inch ST7789 TFT (€5), microSD module (€2), active buzzer (€1), plus a printed enclosure from the Ender 3. Total: €12–18 depending on sourcing. No cloud, no subscription, no monthly fee — ever.",
      "The firmware rule was offline-first or nothing. Construction sites have no reliable internet, so the terminal keeps CSV records on the SD card and hosts its own WiFi network with a local dashboard. A phone connects directly — no router, no internet, works in basements and open yards.",
      "Posting it on r/esp32 (▲80, 55K views) rewrote the roadmap better than I could: a fire register showing who is on site right now, BLE passive detection instead of taps, and graduating from SD to MQTT or LoRa for multi-site crews. The users designed v1.1 for me.",
      "The lesson I keep reusing: small crews don't need enterprise software. They need a cheap box that just works, data that stays on-site, and zero new monthly bills. Price the solution against the SaaS it replaces — €15 once versus €50 a month forever is not a contest.",
    ],
  },
  {
    id: "receipt-market-price-map", date: "2026.10.03", read: "4 min", tag: "build-log",
    title: "Snap a receipt, map Greece's prices",
    excerpt: "On-device OCR, Supabase Realtime, 0€/month. How receipt-market stays free.",
    body: [
      "Grocery prices in Greece move fast and nobody publishes them in one place. receipt-market turns every shopper into a sensor: snap your receipt, OCR reads it on-device, and the prices land on a live community map.",
      "The architecture keeps the monthly bill at zero. OCR runs on the phone — nothing to transcribe server-side — and Supabase covers auth, storage and realtime on its free tier. Expo ships it to both app stores from one codebase.",
      "The hard part isn't code, it's trust: receipt data is only useful if it's fresh and honest. Community voting on prices and reliable store matching is the next problem to solve before this earns its backend.",
    ],
  },
  {
    id: "cinehub-movie-discovery", date: "2026.10.02", read: "3 min", tag: "build-log",
    title: "CineHub: search, track, share what you watch",
    excerpt: "A movie discovery platform in React + TypeScript. What I built and what I'd cut.",
    body: [
      "CineHub is a movie discovery platform: search titles, track what you've watched, share lists. React + TypeScript on the frontend, a public movie API behind it, zero backend of its own.",
      "It taught me the type-safety lesson I now apply everywhere: modeling API responses as strict types caught a whole class of missing-poster bugs before they shipped. On a small app the types are the documentation.",
      "If I rebuilt it today I'd cut half the pages. Discovery lives or dies on search quality and speed — everything else is decoration around those two.",
    ],
  },
  {
    id: "circles-private-photo-sharing", date: "2026.09.26", read: "4 min", tag: "build-log",
    title: "Circles: an Instagram rebuild with a reason to exist",
    excerpt: "Feed, stories, reels, DMs — pivoted to private circles. Glass nav, dark mode that works, screenshots to prove it.",
    body: [
      "The repo started as another Instagram clone: feed, stories, reels, DMs, search — all local, no backend, no reason to exist. Cloning Instagram feature-for-feature is a dead end, so I pivoted it into Circles: small-group photo sharing for family, friends and photo walks. No algorithm, on-device first.",
      "The UI got the full treatment: floating glass tab bar with real blur, a spring-animated circle switcher in the middle of the feed, full-screen reels with a glass action rail, notes with attachable songs, DMs with unread badges and filters, and a dark mode where every letter actually shows — audited color by color, all 24 stray labels fixed.",
      "Verification was screenshots, not vibes: web export plus headless Chrome shot every tab in light and dark, twice, and each loop fixed what the pixels showed. tsc clean, 15/15 checks green, fresh screenshots committed next to the code.",
      "Next, only if it earns it: the persistence layer already abstracts storage, so Supabase auth, buckets and realtime can slot in behind the same interface. Until then it stays fast, offline and honest.",
    ],
  },
  {
    id: "snaptap-capture-tool", date: "2026.09.24", read: "3 min", tag: "build-log",
    title: "SnapTap: snap, save, share",
    excerpt: "A lightweight capture tool with a live demo. Small, fast, MIT.",
    body: [
      "SnapTap is a small capture tool with one job: snap something on your screen, save it, share it. No install, no account — there's a live demo on GitHub Pages, so you try it before reading a line of code.",
      "I built it small on purpose. Capture tools bloat fast: editors, clouds, workspaces. SnapTap keeps the 30-second path and cuts everything else.",
      "It's MIT licensed JavaScript. Steal the parts you like — that's what it's there for.",
    ],
  },
  {
    id: "cliptap-clipboard-that-stays-open", date: "2026.09.22", read: "4 min", tag: "build-log",
    title: "ClipTap: a clipboard manager that stays open",
    excerpt: "Floating, searchable, offline. Why another clipboard tool — and why this one stuck.",
    body: [
      "Every clipboard manager I tried wanted to be a lifestyle: accounts, sync, subscriptions. I just wanted history, pins and image support in a window that floats out of the way on Windows. So I built ClipTap.",
      "It keeps everything local and offline — searchable history for text, code and images, pins for the snippets you paste fifty times a day, all in a lightweight floating panel. Free and open source, MIT licensed.",
      "The design rule was simple: if it needs more than one click, it doesn't belong. That constraint killed three features and made the remaining ones obvious.",
    ],
  },
  {
    id: "crewtrack-esp32-terminal", date: "2026.09.20", read: "5 min", tag: "build-log",
    title: "An ESP32 terminal for my dad's crew",
    excerpt: "RFID taps, SD logs, local WiFi dashboard. What ▲80 on r/esp32 taught me.",
    body: [
      "Every month ended the same way in my father's electrical business: who worked where, and when? The answer lived in memory, chat messages and old notes. So I built CrewTrack — a small offline attendance terminal.",
      "Worker arrives, taps an RFID card, the device records it. No cloud. No subscription. No monthly fees. The terminal runs standalone on an ESP32 DevKit with an RC522 reader, a 2-inch ST7789 TFT for feedback, a buzzer for confirmation and a microSD card holding CSV records. It even hosts its own WiFi network with a local dashboard, so a phone can manage it with no internet at all. One unit costs about €12–18.",
      "I posted it on r/esp32 and it hit 80 upvotes with 55K views. The best feedback pushed the idea further than attendance: a fire register showing who is currently on site, BLE instead of manual taps, and moving from SD storage to MQTT or LoRa for bigger sites.",
      "Next up: enclosure design, a better dashboard UI, cleaner firmware structure, and real reports. Small crews — electricians, plumbers, builders — don't need enterprise software. They need a €15 box that just works.",
    ],
  },
  {
    id: "photo-to-ascii", date: "2026.09.05", read: "4 min", tag: "code",
    title: "Any photo → ASCII text",
    excerpt: "How the IMAGE→ASCII tab turns pixels into characters.",
    body: [
      "The IMAGE→ASCII tab on the homepage does one thing: it reads the brightness of every pixel and swaps it for a character from the ramp .:-=+*#%@. Dark pixels become dense characters like @, bright ones become air.",
      "Under the hood it is a tiny canvas pipeline. Your image is downscaled to a text grid (the detail slider sets the column count), each cell's luminance is sampled, and the matching character is stamped back onto a second canvas in monochrome. Nothing leaves your browser.",
      "Drag in any photo, or hit MY_AVATAR to convert my GitHub avatar. DOWNLOAD .TXT keeps the raw text — paste it into a README, a comment, anywhere monospace lives.",
    ],
  },
  {
    id: "codemate-no-backend", date: "2026.08.22", read: "4 min", tag: "notes",
    title: "Monaco + Piston, no backend",
    excerpt: "Code-Mate architecture on static hosting.",
    body: [
      "Code-Mate is an online code playground with zero backend of its own. The editor is Monaco — the same engine VS Code uses — running entirely in the page.",
      "Execution is handled by the public Piston API: code goes out, results come back, and the page stays a static site deployable on GitHub Pages. No servers to maintain, no bills.",
      "The lesson generalizes: a static frontend plus one sharp API can replace a whole backend for side projects. Ship the page, borrow the compute.",
    ],
  },
];
const STACK = ["JavaScript", "TypeScript", "Python", "C++", "ESP32", "HTML", "Linux", "Git"];
const LOG = [
  ["2026.09.24", "<b>lab page</b> + build log + DNA cards go live"],
  ["2026.09.24", "hero goes <b>full-bleed ASCII sky</b>, terminal proven"],
  ["2026.09.24", "reader <b>pro pass</b>: copy-code, zoom, history"],
  ["2026.09.24", "portfolio curated: <b>starred first</b>, weak entries out"],
  ["2026.09.24", "new note: <b>SnapTap</b> capture tool"],
  ["2026.09.24", "rescued <b>screenshots</b> → project banners + OG"],
  ["2026.09.24", "readme pages <b>v2</b>: TOC, tables, hire strip"],
  ["2026.09.24", "site goes <b>multi-page</b>: home / projects / readme / notes / about"],
  ["2026.09.24", "CrewTrack story wired: <b>ESP32 + ▲80</b> on r/esp32"],
  ["2026.09.24", "<b>IMAGE→ASCII</b> lab shipped"],
  ["2026.09.15", "<b>ClipTap + SnapTap</b> live"],
];
const LANG_COLORS = { JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", CSS: "#a074c4", HTML: "#e34c26", Shell: "#89e051", "C++": "#f34b7d" };

/* ── state ── */
let allRepos = DEMO_PROJECTS.map(r => ({ ...r }));
let currentOwner = CONFIG.githubUsername;
const readmeCache = new Map();
const $ = (id) => document.getElementById(id);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const params = new URLSearchParams(location.search);
const CACHE_TTL = 30 * 60 * 1000;

function cacheGet(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const j = JSON.parse(raw);
      if (j && Date.now() - j.t < CACHE_TTL && Array.isArray(j.d) && j.d.length) return j.d;
    }
  } catch {}
  return null;
}
function cacheSet(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), d: data })); } catch {}
}

/* ── SAFETY ── */
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function safeUrl(u) {
  const s = String(u || "").trim();
  if (!s || s === "#") return "#";
  if (/^(javascript|data|vbscript|file):/i.test(s)) return "#";
  if (/^https:\/\//i.test(s)) return s;
  if (/^(\.\/|\.\.\/|#)/.test(s)) return s;
  if (/^[\w.\-+/%#?&=]+$/.test(s) && !s.includes(":")) return s;
  return "#";
}
function branchOf(b) {
  return typeof b === "string" && /^[\w.\-/]{1,80}$/.test(b) ? b : "main";
}
/* Relative README targets need a real branch: images → raw file, docs → blob page. */
function resolveReadmeUrl(src, owner, repo, branch, kind) {
  const s = String(src || "");
  if (/^https?:\/\//i.test(s)) return safeUrl(s);
  if (/^#/.test(s)) return "#";
  const clean = s.replace(/^\.\//, "").replace(/^\/+/, "").split("#")[0];
  if (!clean || !/^[\w.\-/]{1,200}$/.test(clean)) return "#";
  const br = branchOf(branch);
  const o = encodeURIComponent(owner), r = encodeURIComponent(repo), b = encodeURIComponent(br);
  if (kind === "raw") return `https://raw.githubusercontent.com/${o}/${r}/${b}/${clean}`;
  return `https://github.com/${o}/${r}/blob/${b}/${clean}`;
}
/* Inline formatting shared by paragraphs + table cells. */
function fmtInline(s, owner, repo, branch) {
  s = s.replace(/!\[([^\]\n]*)\]\(([^)\s]+)\)/g, (_, alt, src) => {
    const u = resolveReadmeUrl(src, owner, repo, branch, "raw");
    return u === "#" ? alt : `<img src="${esc(u)}" alt="${alt}" loading="lazy" referrerpolicy="no-referrer">`;
  });
  s = s.replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
    let u = /^(https?:|\.\/|\.\.\/|#)/i.test(href) ? href : safeUrl(href);
    if (/^\.\.\//.test(u) || /^\.\//.test(u)) u = resolveReadmeUrl(u, owner, repo, branch, "blob");
    if (u === "#") return text;
    return `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
  s = s.replace(/\*\*([^*][^*]*?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return s.replace(/(^|[^\w])_([^_\n]+)_([^\w]|$)/g, "$1<em>$2</em>$3");
}
/* GitHub-style raw HTML: escape first, then re-allow a strict subset.
   Tags + attributes outside this list stay escaped (visible, harmless). */
const ALLOWED_HTML = {
  p: ["align"], h1: ["align"], h2: ["align"], h3: ["align"],
  div: ["align"], center: [], span: [], sub: [], sup: [],
  b: [], strong: [], i: [], em: [], code: [], pre: [],
  ul: [], ol: [], li: [], table: [], thead: [], tbody: [],
  tr: [], th: [], td: [], blockquote: [], details: [], summary: [],
  br: [], hr: [], img: ["src", "alt", "width", "height", "align"],
  a: ["href", "title"],
};
function unescapeAllowedHtml(t, owner, repo, branch) {
  return t.replace(/&lt;(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z-]+=&quot;.*?&quot;)*)\s*(\/?)&gt;/g,
    (m, close, tag, attrs, self) => {
      tag = tag.toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(ALLOWED_HTML, tag)) return m;
      if (close) return attrs.trim() ? m : `</${tag}>`;
      const out = [];
      const pairs = attrs.match(/[a-zA-Z-]+=&quot;.*?&quot;/g) || [];
      for (const p of pairs) {
        const am = p.match(/^([a-zA-Z-]+)=&quot;(.*?)&quot;$/);
        if (!am) continue;
        const k = am[1].toLowerCase();
        let v = am[2].replace(/&quot;/g, "");
        if (!ALLOWED_HTML[tag].includes(k)) continue;
        if (k === "align") { if (!/^(left|center|right)$/.test(v)) continue; }
        else if (k === "width" || k === "height") { if (!/^\d{1,4}(%?)$/.test(v)) continue; }
        else if (k === "src") { v = resolveReadmeUrl(v.replace(/&amp;/g, "&"), owner, repo, branch, "raw"); if (v === "#") continue; }
        else if (k === "href") {
          let u = v.replace(/&amp;/g, "&");
          u = /^(https?:|\.\/|\.\.\/|#)/i.test(u) ? u : safeUrl(u);
          if (/^\.\.\//.test(u) || /^\.\//.test(u)) u = resolveReadmeUrl(u, owner, repo, branch, "blob");
          if (u === "#") continue;
          v = u;
        }
        out.push(`${k}="${esc(v)}"`);
      }
      if (tag === "img" || tag === "br" || tag === "hr") return `<${tag}${out.length ? " " + out.join(" ") : ""}>`;
      return `<${tag}${out.length ? " " + out.join(" ") : ""}>`;
    });
}
function safeMarkdown(md, owner, repo, branch) {
  let t = String(md || "").replace(/\r\n/g, "\n");
  if (t.length > 120000) t = t.slice(0, 120000);
  t = esc(t);
  const vault = [];
  const stash = (html) => { vault.push(html); return ` V${vault.length - 1} `; };
  t = t.replace(/```(\w*)\n([\s\S]*?)(```|$)/g, (_, lang, code) => {
    const l = String(lang || "").replace(/[^a-z0-9+-]/gi, "").slice(0, 12);
    return stash(`<pre><code${l ? ` data-lang="${l}"` : ""}>${code.replace(/^\n+|\n+$/g, "")}</code></pre>`);
  });
  t = t.replace(/`([^`\n]+)`/g, (_, code) => stash(`<code>${code}</code>`));
  /* re-allow strict-safe raw HTML (badges, banners, align) — rest stays escaped */
  t = unescapeAllowedHtml(t, owner, repo, branch);
  /* bare URLs → links (skip ones already inside [text](url) or <tags>) */
  t = t.split(/(<[^>\n]*>)/g).map(seg => {
    if (seg.startsWith("<")) return seg;
    return seg.replace(/(\]\()?https:\/\/[^\s<)\]]+/g, (m, pre) => {
      if (pre) return m;
      const mm = m.match(/^(.*?)([.,;:!?)]+)$/);
      const url = mm ? mm[1] : m, trail = mm ? mm[2] : "";
      return `[${url}](${url})${trail}`;
    });
  }).join("");
  /* GFM tables → stash (cells get inline formatting) */
  const lines = t.split("\n"), gated = [];
  for (let i = 0; i < lines.length; i++) {
    const head = lines[i].match(/^\|(.+)\|\s*$/);
    const sep = head && i + 1 < lines.length ? lines[i + 1].match(/^\|?[\s:|-]+\|?\s*$/) : null;
    if (head && sep && sep[0].includes("-")) {
      const cells = head[1].split("|").map(c => c.trim());
      const aligns = sep[0].replace(/^\||\|$/g, "").split("|").map(c => {
        c = c.trim();
        return c.startsWith(":") && c.endsWith(":") && c.length > 2 ? "center" : c.endsWith(":") ? "right" : "left";
      });
      let html = `<table><thead><tr>${cells.map((c, k) =>
        `<th style="text-align:${aligns[k] || "left"}">${fmtInline(c, owner, repo, branch) || ""}</th>`).join("")}</tr></thead><tbody>`;
      i += 2;
      while (i < lines.length && /^\|(.+)\|\s*$/.test(lines[i])) {
        const row = lines[i].match(/^\|(.+)\|\s*$/)[1].split("|").map(c => c.trim());
        html += `<tr>${cells.map((_, k) =>
          `<td style="text-align:${aligns[k] || "left"}">${fmtInline(row[k] || "", owner, repo, branch)}</td>`).join("")}</tr>`;
        i++;
      }
      i--;
      gated.push(stash(html + "</tbody></table>"));
    } else gated.push(lines[i]);
  }
  t = gated.join("\n");
  t = fmtInline(t, owner, repo, branch);
  t = t.replace(/^&gt; ?(.*)$/gm, "<blockquote>$1</blockquote>");
  t = t.replace(/^### ([^\n]+)$/gm, "<h3>$1</h3>").replace(/^## ([^\n]+)$/gm, "<h2>$1</h2>").replace(/^# ([^\n]+)$/gm, "<h1>$1</h1>");
  t = t.replace(/^(?:-{3,}|\*{3,}|_{3,})\s*$/gm, "<hr>");
  const out = [];
  let listTag = "";
  for (const line of t.split("\n")) {
    const task = line.match(/^\s*[-*] \[( |x|X)\] (.+)$/);
    const item = line.match(/^\s*[-*] (.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    const kind = task || item ? "ul" : ordered ? "ol" : "";
    const text = task ? null : item ? item[1] : ordered ? ordered[1] : "";
    if (kind) {
      if (listTag !== kind) { if (listTag) out.push(`</${listTag}>`); out.push(`<${kind}>`); listTag = kind; }
      out.push(task
        ? `<li class="task"><input type="checkbox" disabled${task[1].toLowerCase() === "x" ? " checked" : ""}> ${task[2]}</li>`
        : `<li>${text}</li>`);
    } else { if (listTag) { out.push(`</${listTag}>`); listTag = ""; } out.push(line); }
  }
  if (listTag) out.push(`</${listTag}>`);
  return out.join("\n").split(/\n{2,}/).map(b => {
    const s = b.trim();
    if (!s) return "";
    const vm = s.match(/^V(\d+)$/);
    if (vm) return vault[+vm[1]] || "";
    if (/^<\/?(h1|h2|h3|ul|ol|li|pre|blockquote|img|table|thead|tbody|tr|th|td|p|div|details|summary|center|hr|figure)/.test(s)) return s;
    return `<p>${s.replace(/\n/g, "<br>")}</p>`;
  }).join("\n").replace(/ V(\d+) /g, (_, i) => vault[+i] || "");
}

/* ── chrome ── */
function toast(msg) {
  const t = $("toast"); if (!t) return;
  t.textContent = String(msg).slice(0, 140);
  t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200);
}
const animated = new Set();
const io = new IntersectionObserver((es) => {
  for (const e of es) {
    if (e.isIntersecting && !animated.has(e.target)) {
      animated.add(e.target);
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.05, rootMargin: "0px 0px -2% 0px" });
function bindReveals(scope) {
  (scope || document).querySelectorAll(".reveal:not(.in)").forEach(el => {
    if (!animated.has(el)) io.observe(el);
  });
}
try {
  const saved = localStorage.getItem("shadow-theme");
  if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
} catch {}
function syncThemeLabel() {
  const el = $("sysTheme");
  if (el) el.textContent = document.documentElement.dataset.theme === "dark" ? "DARK" : "LIGHT";
}
if ($("themeBtn")) $("themeBtn").addEventListener("click", () => {
  const h = document.documentElement;
  h.dataset.theme = h.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("shadow-theme", h.dataset.theme); } catch {}
  syncThemeLabel(); toast("theme: " + h.dataset.theme);
});
  syncThemeLabel();
  if ($("menuBtn")) $("menuBtn").addEventListener("click", () => {
  const m = $("mobileMenu"), open = m.classList.toggle("open");
  $("menuBtn").setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("#mobileMenu a").forEach(a => a.addEventListener("click", () => {
  $("mobileMenu").classList.remove("open");
  if ($("menuBtn")) $("menuBtn").setAttribute("aria-expanded", "false");
}));
if ($("clock")) setInterval(() => { $("clock").textContent = new Date().toTimeString().slice(0, 8); }, 1000);
if ($("year")) $("year").textContent = new Date().getFullYear();
/* reading progress (project + post pages) */
const prog = $("progress");
if (prog) addEventListener("scroll", () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  prog.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
}, { passive: true });

/* ── GitHub ── */
function cleanTopics(topics) {
  return (Array.isArray(topics) ? topics : []).filter(t => typeof t === "string" && /^[a-z0-9][a-z0-9-]{0,29}$/i.test(t)).slice(0, 3);
}
/* repos hidden from the portfolio (weak/duplicate entries) */
const HIDDEN = new Set(["blog", "assasina_katgr"]);
function sanitizeRepo(r, username) {
  if (!r || typeof r.name !== "string" || !/^[\w.\-+]{1,100}$/.test(r.name)) return null;
  if (r.fork || r.name.toLowerCase() === String(username).toLowerCase()) return null;
  if (HIDDEN.has(r.name.toLowerCase())) return null;
  return {
    name: r.name,
    description: typeof r.description === "string" ? r.description.slice(0, 220) : "",
    language: typeof r.language === "string" ? r.language.slice(0, 20) : "",
    stargazers_count: Number(r.stargazers_count) || 0,
    forks_count: Number(r.forks_count) || 0,
    updated_at: typeof r.updated_at === "string" ? r.updated_at : "",
    html_url: safeUrl(r.html_url),
    homepage: safeUrl(r.homepage),
    topics: cleanTopics(r.topics),
    featured: FEATURED.has(r.name),
    license: r.license && typeof r.license.spdx_id === "string" ? r.license.spdx_id.slice(0, 20) : "",
    default_branch: typeof r.default_branch === "string" ? r.default_branch.slice(0, 80) : "main",
  };
}
async function getRepos(owner) {
  const key = "repos:v3:" + String(owner).toLowerCase();
  const cached = cacheGet(key);
  if (cached) return cached;
  const d = await fetchRepos(owner);
  cacheSet(key, d);
  return d;
}
async function fetchRepos(owner) {
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=${CONFIG.perPage}&sort=updated`);
  if (res.status === 404) throw new Error("user not found");
  if (res.status === 403) throw new Error("rate limited — try soon");
  if (!res.ok) throw new Error(`github ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("bad response");
  const clean = data.map(r => sanitizeRepo(r, owner)).filter(Boolean);
  if (!clean.length) throw new Error("no repos to show");
  return clean;
}
async function fetchReadme(owner, repo, branch) {
  const key = `${owner}/${repo}`.toLowerCase();
  if (readmeCache.has(key)) return readmeCache.get(key);
  const res = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (res.status === 404) throw new Error("empty");
  if (!res.ok) throw new Error(`github ${res.status}`);
  const j = await res.json();
  const b64 = String(j.content || "").replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/=]*$/.test(b64) || !b64) throw new Error("bad payload");
  const bin = atob(b64), bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const html = `<div class="md">${safeMarkdown(new TextDecoder("utf-8", { fatal: false }).decode(bytes), owner, repo, branch)}</div>`;
  readmeCache.set(key, html);
  return html;
}
function langDot(lang) {
  const ok = typeof lang === "string" && /^[A-Za-z0-9+#-]+$/.test(lang);
  return `<span class="lang-dot" style="background:${esc(LANG_COLORS[lang] || "#9a9aa3")}"></span>${ok ? esc(lang) : "—"}`;
}
function timeAgo(iso) {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return "—";
  const d = Math.floor((Date.now() - ms) / 864e5);
  if (d < 1) return "today"; if (d === 1) return "1d";
  if (d < 30) return `${d}d`; if (d < 365) return `${(d / 30) | 0}mo`;
  return `${(d / 365) | 0}y`;
}
function cardHref(owner, name) {
  return `project.html?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(name)}`;
}
function projectCard(r, i, owner) {
  const topics = cleanTopics(r.topics);
  return `
  <a class="card reveal${r.featured ? " featured" : ""}" href="${esc(cardHref(owner, r.name))}" style="transition-delay:${(i % 6) * 45}ms">
    <div class="card-top"><span class="idx">${String(i + 1).padStart(2, "0")}</span><span>~/repos/${esc(r.name)}</span>${r.featured ? '<span class="badge-featured">★ TOP</span>' : ""}</div>
    <h3>${esc(r.name)}</h3>
    <p>${esc(r.description || "tap to read the README")}</p>
    ${topics.length ? `<div class="topics">${topics.map(t => `<span class="topic">#${esc(t)}</span>`).join("")}</div>` : ""}
    <div class="card-meta"><span>${langDot(r.language)}</span><span>★ ${r.stargazers_count}</span><span>↻ ${esc(timeAgo(r.updated_at))}</span></div>
    <div class="card-foot"><span class="mini-btn primary">README →</span></div>
  </a>`;
}

/* ── HOME ── */
/* 21st.dev "Robot + Human" ASCII art is a <video>. Under reduced-motion we
   pause it on the poster frame so nothing moves. */
(function asciiHero() {
  const v = document.querySelector(".hero-bg");
  if (!v || v.tagName !== "VIDEO") return;

  /* touch / small screens / reduced motion: static poster — skip download + decode */
  if (reduceMotion || matchMedia("(pointer: coarse)").matches || innerWidth < 720) {
    v.removeAttribute("src");
    const src = v.querySelector("source");
    if (src) src.remove();
    try { v.load(); } catch {}
  } else {
    v.muted = true;
    v.playsInline = true;
    v.playbackRate = 0.5;
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };

    /* try immediately */
    tryPlay();
    /* retry when enough data loaded */
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);
    /* retry on first user interaction (for strict autoplay policies) */
    const unlock = () => { tryPlay(); document.removeEventListener("click", unlock); document.removeEventListener("touchstart", unlock); };
    document.addEventListener("click", unlock);
    document.addEventListener("touchstart", unlock);
    document.addEventListener("keydown", unlock);
    /* pause when tab hidden, resume when visible */
    document.addEventListener("visibilitychange", () => { document.hidden ? v.pause() : tryPlay(); });
  }

  /* scroll cue fades out as user scrolls past hero */
  const cue = document.querySelector(".scroll-cue");
  const hero = document.querySelector(".hero");
  if (!cue || !hero) return;
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const h = hero.offsetHeight || 600;
      const y = Math.min(Math.max(scrollY || 0, 0), h);
      cue.style.opacity = Math.max(0, 1 - y / (h * 0.5)).toFixed(3);
    });
  }, { passive: true });
})();
(function typewriter() {
  const el = $("typewriter"); if (!el) return;
  const caret = document.querySelector(".caret");
  const line = "ESP32 · web · tools · builds";
  if (reduceMotion) { el.textContent = line; if (caret) caret.style.display = "none"; return; }
  let ci = 0;
  (function tick() {
    ci++;
    el.textContent = line.slice(0, ci);
    if (ci < line.length) {
      setTimeout(tick, 130);
    } else {
      /* typing done — blink a few more times then hide */
      setTimeout(() => { if (caret) caret.style.display = "none"; }, 2400);
    }
  })();
})();
(function cursorGlow() {
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;
  const glow = document.createElement("div");
  glow.style.cssText = "position:fixed;width:300px;height:300px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(215,255,62,.07) 0%,transparent 70%);transform:translate(-50%,-50%);transition:opacity .3s";
  document.body.appendChild(glow);
  let tx = -500, ty = -500, cx = -500, cy = -500;
  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  (function anim() {
    if (!document.hidden) {
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      glow.style.left = cx + "px"; glow.style.top = cy + "px";
    }
    requestAnimationFrame(anim);
  })();
})();
(function cardTilt() {
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll(".card, .post").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-3px) perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    }, { passive: true });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
})();
/* ── motion engine v6: one rAF loop, scrub-driven reveals ──
   Continuous progress mapping (like GSAP scrub) — no class-toggle snapping.
   Native scroll everywhere (Lenis off); scrub follows the rAF loop. */
const MOTION = { jobs: [], raf: 0, lenis: null };
(function motionBoot() {
  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    return;
  }
  const loop = () => {
    MOTION.raf = requestAnimationFrame(loop);
    if (document.hidden) return;
    const vh = innerHeight || 600;
    for (const j of MOTION.jobs) j(vh);
  };
  loop();
})();
function onFrame(job) { MOTION.jobs.push(job); }
/* word-split every sec-title for slide reveal */
(function slideSplit() {
  document.querySelectorAll(".sec-title").forEach(h => {
    if (h.querySelector(".slide-w")) return;
    let i = 0;
    const wrap = node => {
      const w = document.createElement("span");
      w.className = "slide-w";
      const inner = document.createElement("span");
      inner.style.setProperty("--i", i++);
      inner.textContent = node.textContent;
      inner.className = node.className || "";
      w.appendChild(inner);
      node.replaceWith(w);
    };
    [...h.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { h.insertBefore(document.createTextNode(" "), n); return; }
          const s = document.createElement("span"); s.textContent = part;
          h.insertBefore(s, n); wrap(s);
        });
        n.remove();
      } else if (n.nodeType === 1 && !n.classList.contains("slide-w")) {
        wrap(n); i++;
      }
    });
  });
})();
/* scrub: word slides track scroll position continuously (anzo Page2 feel) */
(function scrubWords() {
  if (reduceMotion) return;
  const titles = [...document.querySelectorAll(".sec-title")];
  if (!titles.length) return;
  const ease = t => 1 - Math.pow(1 - t, 3);
  onFrame(vh => {
    for (const h of titles) {
      const r = h.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) continue;
      const p = Math.max(0, Math.min(1, (vh * 0.92 - r.top) / (vh * 0.62)));
      const words = h.querySelectorAll(".slide-w > span");
      words.forEach((w, i) => {
        const wp = ease(Math.max(0, Math.min(1, p * 1.6 - i * 0.12)));
        const dir = getComputedStyle(w).getPropertyValue("--sx").includes("-") ? -1 : 1;
        w.style.transform = `perspective(900px) translateX(${(1 - wp) * dir * 110}%) skewX(${(1 - wp) * -7}deg)`;
        w.style.opacity = wp.toFixed(3);
      });
    }
  });
})();
/* giant statement slider — continuous scrub, skew follows velocity */
(function giantSlide() {
  if (reduceMotion) return;
  const lines = [...document.querySelectorAll(".giant-line > span")];
  if (!lines.length) return;
  onFrame(vh => {
    for (const el of lines) {
      const line = el.parentElement;
      const r = line.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      const dir = Number(line.dataset.dir || 1);
      const x = Math.max(-1, Math.min(1, p)) * dir * -26;
      el.style.transform = `translateX(${x}vw) perspective(900px) rotateY(${x * .25}deg) skewX(${x * -.12}deg)`;
    }
  });
})();
/* hero tilt + parallax — lerped so it glides instead of jumping */
(function heroTilt() {
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;
  const hero = document.querySelector(".hero");
  const tilt = document.querySelector(".tilt-hero");
  /* parallax the cheap gradient layer, never the video (repainting video lags) */
  const bg = document.querySelector(".hero-aura") || document.querySelector(".hero-bg");
  if (!hero || !tilt) return;
  hero.style.perspective = "1000px";
  let tx = 0, ty = 0, cx = 0, cy = 0;
  hero.addEventListener("pointermove", e => {
    const r = tilt.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - .5;
    ty = (e.clientY - r.top) / r.height - .5;
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; });
  onFrame(() => {
    cx += (tx - cx) * .07; cy += (ty - cy) * .07;
    if (Math.abs(cx) < .001 && Math.abs(cy) < .001 && !tx && !ty) return;
    tilt.style.transform = `perspective(1000px) rotateY(${cx * 9}deg) rotateX(${-cy * 9}deg) scale(1.03)`;
    if (bg) bg.style.transform = `translate(${cx * 22}px, ${cy * 22}px) scale(1.06)`;
  });
})();
/* marquee under hero — home only */
(function marquee() {
  if (reduceMotion) return;
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const m = document.createElement("div");
  m.className = "marquee";
  m.setAttribute("aria-hidden", "true");
  m.innerHTML = `<div class="marquee-track"><span>BUILD ▓ AUTOMATE ▓ HOST ▓ </span><span class="outline">ESP32 · WEB · TOOLS · HOMELAB · </span><span>BUILD ▓ AUTOMATE ▓ HOST ▓ </span><span class="outline">ESP32 · WEB · TOOLS · HOMELAB · </span></div>`;
  hero.after(m);
})();
/* Lenis inertia scroll — OFF: native scroll restored (Lenis queued input on heavy
   pages → lag-then-fling). Anchors still glide via html{scroll-behavior:smooth}. */
const USE_SMOOTH_SCROLL = false;
(function smoothScroll() {
  if (!USE_SMOOTH_SCROLL) return;
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;
  let tries = 0;
  const boot = () => {
    if (!window.Lenis) {
      if (++tries < 30) setTimeout(boot, 100);
      return;
    }
    try {
      const lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
      MOTION.lenis = lenis;
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
          const id = a.getAttribute("href");
          if (id.length < 2) return;
          const el = document.querySelector(id);
          if (!el) return;
          e.preventDefault();
          lenis.scrollTo(el, { offset: -90 });
        });
      });
    } catch {}
  };
  if (document.readyState === "complete") boot();
  else addEventListener("load", boot);
})();
if ($("tryTerm")) $("tryTerm").addEventListener("click", () => {
  const pg = $("playground");
  if (pg) pg.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
});

/* ── TERMINAL playground (home only; static strings only — no network data) ── */
(function terminal() {
  const log = $("termLog"), form = $("termForm"), input = $("termInput");
  if (!log || !form || !input) return;
  const print = (html, cls) => {
    const d = document.createElement("div");
    if (cls) d.className = cls;
    d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
  };
  const CMDS = {
    help: () => `try: <b>projects</b> · <b>log</b> · <b>whoami</b> · <b>ascii</b> · <b>hire</b> · <b>rss</b> · <b>stats</b> · <b>theme</b> · <b>clear</b>`,
    projects: () => `${allRepos.length} builds indexed. hottest: <a href="project.html?owner=0x-Shadow&repo=CrewTrack">CrewTrack</a> (ESP32, ▲80). <a href="projects.html">see all →</a>`,
    notes: () => `${POSTS.length} build logs. latest: <a href="post.html?id=${esc(POSTS[0].id)}">${esc(POSTS[0].title)}</a>. <a href="blog.html">read all →</a>`,
    log: () => `${POSTS.length} build logs. latest: <a href="post.html?id=${esc(POSTS[0].id)}">${esc(POSTS[0].title)}</a>. <a href="blog.html">read all →</a>`,
    whoami: () => `0x-Shadow — student builder, Greece. ESP32 · web · homelab. <a href="about.html">full story →</a>`,
    rss: () => `fresh notes, no algorithm: <a href="feed.xml">feed.xml ⌁</a>`,
    ascii: () => {
      scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return `look up — the whole sky is live ASCII. move your cursor through it.`;
    },
    hire: () => `open for projects: ESP32 · websites · tools. <a href="https://github.com/0x-Shadow" target="_blank" rel="noopener">start on GitHub ↗</a>`,
    theme: () => { const b = $("themeBtn"); if (b) b.click(); return `theme toggled.`; },
    sudo: () => `nice try. no sudo here — only curiosity.`,
    stats: () => {
      const stars = allRepos.reduce((s, r) => s + r.stargazers_count, 0);
      const langs = new Set(allRepos.map(r => r.language).filter(Boolean)).size;
      return `${allRepos.length} repos · ★${stars} · ${langs} langs · ${POSTS.length} notes.`;
    },
    clear: () => { log.innerHTML = ""; return null; },
  };
  print(`0x-shadow.log — type <b>help</b> to play.`, "dim");
  const hist = [];
  let hi = -1;
  input.addEventListener("keydown", e => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    if (e.key === "ArrowUp" && hi < hist.length - 1) hi++;
    if (e.key === "ArrowDown" && hi > 0) hi--;
    if (e.key === "ArrowDown" && hi <= 0) { hi = -1; input.value = ""; return; }
    if (hist[hi] != null) input.value = hist[hi];
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const raw = input.value.trim().slice(0, 60);
    if (!raw) return;
    hist.unshift(raw);
    if (hist.length > 20) hist.pop();
    hi = -1;
    print(`<span class="prompt">&gt;_</span> ${esc(raw)}`);
    const fn = CMDS[raw.toLowerCase()];
    const out = fn ? fn() : `unknown: ${esc(raw)} — try <b>help</b>`;
    if (out) print(out);
    input.value = "";
  });
})();

/* ── page: HOME preview ── */
(function homePreview() {
  const grid = $("homeGrid"); if (!grid) return;
  const top3 = (repos) => [...repos].sort((a, b) =>
    ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)) || b.stargazers_count - a.stargazers_count).slice(0, 3);
  const paint = (repos) => {
    grid.innerHTML = top3(repos).map((r, i) => projectCard(r, i, currentOwner)).join("");
    bindReveals(grid);
    if ($("statRepos")) $("statRepos").textContent = repos.length;
    if ($("statStars")) $("statStars").textContent = repos.reduce((s, r) => s + r.stargazers_count, 0);
    if ($("statLangs")) $("statLangs").textContent = new Set(repos.map(r => r.language).filter(Boolean)).size;
  };
  grid.innerHTML = `<div class="skel"></div><div class="skel"></div><div class="skel"></div>`;
  getRepos(currentOwner).then(repos => {
    allRepos = repos;
    paint(repos);
  }).catch(() => {
    paint(allRepos);
  });
  const hp = $("homePosts");
  if (hp) hp.innerHTML = POSTS.slice(0, 2).map(postCard).join("");
  bindReveals(hp);
})();
function postNo(p) {
  return String(POSTS.length - POSTS.indexOf(p)).padStart(2, "0");
}
function postCard(p) {
  return `
  <a class="post reveal" href="post.html?id=${esc(p.id)}">
    <span class="post-date">#${postNo(p)} · ${esc(p.date)}</span>
    <div class="post-main"><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></div>
    <div class="post-foot"><span>◷ ${esc(p.read)}</span><span>READ →</span></div>
  </a>`;
}

/* ── page: PROJECTS index ── */
(function projectsPage() {
  const grid = $("projectsGrid"); if (!grid) return;
  const owner = validOwner(params.get("u")) || CONFIG.githubUsername;
  currentOwner = owner;
  if ($("userInput")) $("userInput").value = owner;
  const render = () => {
    const q = $("searchInput").value.trim().toLowerCase();
    const sort = $("sortSel").value, langF = $("langSel").value;
    const showArchived = $("archiveToggle") ? $("archiveToggle").checked : false;
    let list = allRepos.filter(r => {
      const hay = `${r.name || ""} ${(r.description || "")} ${(r.topics || []).join(" ")}`.toLowerCase();
      const status = PROJECT_STATUS[r.name] || repoStatus(r.updated_at);
      if (!showArchived && status === "ARCHIVED") return false;
      return (!q || hay.includes(q)) && (!langF || r.language === langF);
    });
    list.sort((a, b) => {
      if (sort === "updated" && !!b.featured !== !!a.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sort === "stars") return b.stargazers_count - a.stargazers_count;
      if (sort === "name") return String(a.name).localeCompare(String(b.name));
      return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    });
    $("skeletons").classList.add("hidden");
    grid.classList.remove("hidden");
    grid.innerHTML = list.map((r, i) => projectCard(r, i, currentOwner)).join("");
    $("emptyState").classList.toggle("hidden", list.length > 0);
    const langs = [...new Set(allRepos.map(r => r.language).filter(l => typeof l === "string"))].sort();
    const cur = $("langSel").value;
    $("langSel").innerHTML = `<option value="">all langs</option>` + langs.map(l => `<option value="${esc(l)}"${l === cur ? " selected" : ""}>${esc(l)}</option>`).join("");
    bindReveals(grid);
  };
  ["searchInput", "sortSel", "langSel"].forEach(id => $(id).addEventListener("input", render));
  if ($("archiveToggle")) $("archiveToggle").addEventListener("change", render);
  const st = $("apiStatus");
  loadProfile(owner);
  getRepos(owner).then(repos => {
    allRepos = repos;
    st.textContent = `● LIVE @${owner}`; st.classList.add("live");
    $("profileStars").textContent = repos.reduce((s, r) => s + r.stargazers_count, 0);
    render();
  }).catch(e => {
    st.textContent = `● ${String(e.message).toUpperCase().slice(0, 40)}`; st.classList.add("err");
    render();
  });
  $("loadBtn").addEventListener("click", () => {
    const u = validOwner($("userInput").value) || CONFIG.githubUsername;
    location.href = `projects.html?u=${encodeURIComponent(u)}`;
  });
  $("userInput").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const u = validOwner($("userInput").value) || CONFIG.githubUsername;
      location.href = `projects.html?u=${encodeURIComponent(u)}`;
    }
  });
})();
function validOwner(u) {
  u = String(u || "").trim().replace(/^@/, "");
  return /^[A-Za-z0-9-]{1,39}$/.test(u) ? u : "";
}
async function loadProfile(username) {
  const av = $("profileAvatar"); if (!av) return;
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!res.ok) return;
    const u = await res.json();
    if (typeof u.avatar_url === "string" && u.avatar_url.startsWith("https://")) av.src = u.avatar_url;
    if (typeof u.login === "string") $("profileBadge").textContent = `● @${u.login}`;
    $("profileBio").textContent = typeof u.bio === "string" && u.bio ? u.bio : "shipping tools in public.";
    if (Number.isFinite(u.public_repos)) $("profileRepos").textContent = u.public_repos;
    if (Number.isFinite(u.followers)) $("profileFollowers").textContent = u.followers;
  } catch {}
}

/* repo → build-log post (powers the BUILD_LOG button on project pages) */
const RELATED_POST = {
  "instagram-clone": "circles-private-photo-sharing",
  CrewTrack: "crewtrack-esp32-terminal",
  ClipTap: "cliptap-clipboard-that-stays-open",
  SnapTap: "snaptap-capture-tool",
  "Code-Mate": "codemate-no-backend",
  "receipt-market": "receipt-market-price-map",
  CineHub: "cinehub-movie-discovery",
};
/* repo → rescued screenshot (powers the banner on project pages).
   Only real screenshots here — repos without one show no banner. */
const PROJECT_SHOTS = {
  CineHub: "https://raw.githubusercontent.com/0x-Shadow/CineHub/main/docs/screenshots/home.png",
  "instagram-clone": "shots/circles-feed.png",
  CrewTrack: "shots/crewtrack.jpg",
  ClipTap: "shots/cliptap-master.png",
  SnapTap: "shots/snaptap.png",
};
/* repo → platform (shown in the DNA strip; keep to verified facts) */
const PROJECT_META = {
  CineHub: { platform: "Web" },
  "instagram-clone": { platform: "Expo" },
  CrewTrack: { platform: "ESP32" },
  ClipTap: { platform: "Windows" },
  SnapTap: { platform: "Web" },
  "Code-Mate": { platform: "Web" },
  "receipt-market": { platform: "Expo" },
  "Intelligent-Film-Production-Search": { platform: "Python" },
  PassStrengthAnalyzer: { platform: "Python" },
};
/* repo → verified build story (PROBLEM → RESULT). Only what I can prove. */
const RELATED_STORY = {
  "instagram-clone": [
    ["PROBLEM", "A local-first Instagram rebuild with feed, stories, reels and DMs — and no reason to exist. Cloning Instagram is a dead end."],
    ["IDEA", "Pivot to private circles: small-group sharing for family, friends, photo walks. No algorithm, on-device first."],
    ["BUILD", "Expo SDK 57: floating glass tab bar, spring circle switcher, full-screen reels, notes with songs, badge-count DMs, audited dark mode. Verified with headless screenshot loops, light + dark."],
    ["RESULT", "tsc clean, 15/15 harness green, fresh screenshots in-repo. Small, fast, MIT."],
  ],
  CrewTrack: [
    ["PROBLEM", "Every month ended the same way in my father's electrical business: who worked where, and when? Memory, chat messages, old notes."],
    ["IDEA", "A €15 box in the van. Worker taps an RFID card each morning — attendance records itself."],
    ["BUILD", "ESP32 DevKit + RC522 reader + 2-inch ST7789 display + buzzer + microSD with CSV logs. Own WiFi network, local phone dashboard, no internet needed."],
    ["RESULT", "▲80 with 55K views on r/esp32. Offline, no cloud, no fees — and a roadmap written by its own users."],
  ],
  ClipTap: [
    ["PROBLEM", "Clipboard history tools all wanted accounts, sync, subscriptions. I needed a floating panel that stays out of the way."],
    ["IDEA", "A lightweight Windows app: searchable history for text, code, images. Pins for repeated snippets. Everything local."],
    ["BUILD", "Electron + React. SQLite for history storage. Global hotkey summon. Image paste support. No telemetry, no accounts."],
    ["RESULT", "MIT licensed. The one-click rule killed three features and made the rest obvious."],
  ],
  SnapTap: [
    ["PROBLEM", "Screenshot tools are heavy: editors, clouds, workspaces. Sometimes you just need to snap and share."],
    ["IDEA", "A single-purpose capture tool. Snap, auto-save, copy to clipboard. No install, no account."],
    ["BUILD", "Vanilla JS + Canvas API. Clipboard API for one-click copy. GitHub Pages deploy. MIT licensed."],
    ["RESULT", "Live demo on GitHub Pages. 30-second path from snap to share."],
  ],
};
/* repo → lifecycle status */
const PROJECT_STATUS = {
  CineHub: "ACTIVE",
  "instagram-clone": "ACTIVE",
  CrewTrack: "ACTIVE",
  ClipTap: "ACTIVE",
  SnapTap: "ACTIVE",
  "Code-Mate": "PROTOTYPE",
  "receipt-market": "ACTIVE",
  PassStrengthAnalyzer: "STABLE",
  "Intelligent-Film-Production-Search": "ARCHIVED",
};
/* repo → engineering decisions (what was actually built and why) */
const TECH_DECISIONS = {
  CrewTrack: [
    ["Why ESP32?", "Cheap (€4-6), WiFi + BLE built-in, Arduino ecosystem. Overkill alternatives (RPi) cost 10x and need OS maintenance."],
    ["Why offline-first?", "Construction sites have no reliable internet. A €15 box that needs no subscription beats a €50/month SaaS."],
    ["Why SD card over cloud DB?", "Zero ongoing cost. CSV is human-readable. Data stays on-site — no privacy concerns for workers."],
    ["Why own WiFi network?", "No router needed on site. Phone connects directly. Works in basements, outdoor yards, anywhere."],
    ["Trade-off: no real-time sync", "Accepted. Attendance is checked at end of day, not live. Multi-site sync is on the roadmap via MQTT."],
  ],
  ClipTap: [
    ["Why Electron?", "Cross-platform from one codebase. Native feel on Windows where it runs. Web tech I already know."],
    ["Why SQLite?", "Zero-config, file-based, fast enough for clipboard history. No server process to manage."],
    ["Why global hotkey?", "Clipboard tools live or die by summon speed. Ctrl+Shift+V anywhere beats alt-tabbing."],
    ["Trade-off: no cloud sync", "Accepted. Clipboard is local by nature. Sync would mean accounts, servers, privacy questions."],
  ],
  SnapTap: [
    ["Why vanilla JS?", "No build step, no dependencies, instant load. A capture tool should be lighter than what it captures."],
    ["Why Canvas API?", "Native browser API for pixel manipulation. No server round-trip, no upload, no privacy leak."],
    ["Why GitHub Pages?", "Free hosting, zero config, custom domain. A demo that deploys on push is a demo that stays current."],
  ],
  "Code-Mate": [
    ["Why Monaco?", "Same engine as VS Code. Familiar editing experience. Syntax highlighting for 50+ languages out of the box."],
    ["Why Piston API?", "Sandboxed code execution without running a server. Free tier covers demo usage. No backend to maintain."],
    ["Trade-off: no file system", "Accepted for a playground. Real projects need persistence; snippets don't."],
  ],
};
function repoStatus(updated_at) {
  const ms = Date.parse(updated_at);
  if (Number.isNaN(ms)) return "STABLE";
  return Date.now() - ms < 120 * 864e5 ? "ACTIVE" : "STABLE";
}
/* post images: local shots/ or raw repo files only — everything else stays text */
function postImage(u) {
  const s = String(u || "");
  if (/^shots\/[\w.\-/]{1,120}\.(png|jpe?g|gif|webp)$/.test(s)) return s;
  if (/^https:\/\/raw\.githubusercontent\.com\/0x-Shadow\/[\w.\-+]{1,100}\/(main|master)\/[\w.\-+/]{1,160}\.(png|jpe?g|gif|webp)$/.test(s)) return s;
  return "";
}
function slugify(s) {
  return String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "s";
}
function buildTOC() {
  const toc = $("toc"); if (!toc) return;
  const heads = [...$("readmeBody").querySelectorAll("h1,h2,h3")].slice(0, 14);
  const wrap = toc.closest(".toc-wrap");
  if (!heads.length) { if (wrap) wrap.style.display = "none"; return; }
  const used = new Set();
  toc.innerHTML = heads.map(h => {
    let id = slugify(h.textContent), n = 1;
    while (used.has(id)) id = `${slugify(h.textContent)}-${++n}`;
    used.add(id); h.id = id;
    return `<a class="toc-${h.tagName.toLowerCase()}" href="#${id}">${esc(h.textContent.trim()).slice(0, 60)}</a>`;
  }).join("");
  /* collapse on phones, highlight current section while reading */
  const box = toc.closest(".toc-box");
  if (box && matchMedia("(max-width: 860px)").matches) box.removeAttribute("open");
  const links = [...toc.querySelectorAll("a")];
  const spy = new IntersectionObserver(es => {
    for (const e of es) {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle("toc-active", a.getAttribute("href") === `#${e.target.id}`));
      }
    }
  }, { rootMargin: "-25% 0px -65% 0px" });
  heads.forEach(h => spy.observe(h));
}
/* native share (mobile sheet) with clipboard fallback — any [data-share] button */
async function sharePage() {
  if (navigator.share) {
    try { await navigator.share({ title: document.title, url: location.href }); } catch {}
    return;
  }
  try { await navigator.clipboard.writeText(location.href); toast("link copied"); }
  catch {
    const ta = document.createElement("textarea");
    ta.value = location.href; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("link copied"); }
    catch { toast("copy failed — long-press the URL"); }
    ta.remove();
  }
}
document.querySelectorAll("[data-share]").forEach(b => b.addEventListener("click", sharePage));
/* README upgrades: copy-code buttons + click-to-zoom images */
function enhanceReadme() {
  const body = $("readmeBody"); if (!body) return;
  body.querySelectorAll("pre").forEach(pre => {
    if (pre.querySelector(".copy-code")) return;
    const btn = document.createElement("button");
    btn.className = "copy-code"; btn.textContent = "COPY ⧉";
    btn.setAttribute("aria-label", "copy code block");
    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code") ? pre.querySelector("code").textContent : pre.textContent;
      try { await navigator.clipboard.writeText(code); toast("code copied"); }
      catch { toast("copy failed"); }
    });
    pre.appendChild(btn);
  });
  body.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
}
function openLightbox(src, alt) {
  closeLightbox();
  const ov = document.createElement("div");
  ov.className = "lightbox"; ov.id = "lightbox";
  const im = document.createElement("img");
  im.src = src; im.alt = alt || "image";
  const hint = document.createElement("span");
  hint.className = "lb-hint"; hint.textContent = "tap anywhere to close";
  ov.appendChild(im); ov.appendChild(hint);
  ov.addEventListener("click", closeLightbox);
  document.body.appendChild(ov);
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  const ov = document.getElementById("lightbox");
  if (ov) ov.remove();
  document.body.style.overflow = "";
}
addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

/* ── page: PROJECT detail ── */
(function projectPage() {
  const root = $("projectRoot"); if (!root) return;
  const owner = validOwner(params.get("owner")) || CONFIG.githubUsername;
  const repoName = String(params.get("repo") || "").trim();
  if (!/^[\w.\-+]{1,100}$/.test(repoName)) {
    root.innerHTML = `<div class="empty">+-- missing repo --+<br>| <a href="projects.html">back to projects</a> |<br>+------------------+</div>`;
    return;
  }
  currentOwner = owner;
  $("crumbRepo").textContent = `${owner} / ${repoName}`;
  document.title = `${repoName} — 0x-shadow.log`;
  getRepos(owner).then(async repos => {
    allRepos = repos;
    const repo = repos.find(r => r.name.toLowerCase() === repoName.toLowerCase()) || null;
    const meta = repo || { name: repoName, description: "", language: "", stargazers_count: 0, forks_count: 0, updated_at: "", html_url: `https://github.com/${owner}/${repoName}`, homepage: "#", topics: [], license: "", default_branch: "main" };
    $("projectTitle").textContent = meta.name;
    if ($("projectDesc")) {
      const d = meta.description || "";
      if (!d) { $("projectDesc").style.display = ""; $("projectDesc").textContent = "No description yet — the README below says more."; }
      else if (d.toLowerCase() === meta.name.toLowerCase()) $("projectDesc").style.display = "none";
      else { $("projectDesc").style.display = ""; $("projectDesc").textContent = d; }
    }
    const md = document.querySelector('meta[name="description"]');
    if (md && meta.description) md.content = `${meta.name}: ${meta.description}`.slice(0, 160);
    const lic = meta.license ? `<span>◈ ${esc(meta.license)}</span>` : "";
    $("projectMeta").innerHTML = `<span>${langDot(meta.language)}</span><span>★ ${meta.stargazers_count}</span><span>⑂ ${meta.forks_count}</span><span>↻ ${esc(timeAgo(meta.updated_at))}</span>${lic}`;
    $("btnSource").href = safeUrl(meta.html_url);
    if ($("navSource")) $("navSource").href = safeUrl(meta.html_url);
    const live = safeUrl(meta.homepage);
    $("btnLive").style.display = live === "#" ? "none" : "";
    if (live !== "#") $("btnLive").href = live;
    const postId = RELATED_POST[meta.name];
    const logBtn = $("btnLog");
    if (logBtn) {
      if (postId && POSTS.some(p => p.id === postId)) { logBtn.style.display = ""; logBtn.href = `post.html?id=${postId}`; }
      else logBtn.style.display = "none";
    }
    const topics = cleanTopics(meta.topics);
    $("projectTopics").innerHTML = topics.map(t => `<span class="topic">#${esc(t)}</span>`).join("");
    const dna = $("dnaRow");
    if (dna) {
      const platform = (PROJECT_META[meta.name] || {}).platform || meta.language || "—";
      const cell = (k, v) => `<div><span>${k}</span><b>${v}</b></div>`;
      dna.innerHTML =
        cell("LANG", esc(meta.language || "—")) +
        cell("PLATFORM", esc(platform)) +
        cell("STATUS", esc(repoStatus(meta.updated_at))) +
        cell("UPDATED", esc(timeAgo(meta.updated_at))) +
        cell("LICENSE", esc(meta.license || "—"));
    }
    const story = RELATED_STORY[meta.name];
    const storyBox = $("storyBox");
    if (storyBox) {
      if (story) {
        storyBox.style.display = "";
        storyBox.innerHTML = `<div class="story-kicker">BUILD OVERVIEW — 20 seconds</div>` +
          story.map(([k, v]) => `<div class="story-row"><span>${esc(k)}</span><p>${esc(v)}</p></div>`).join("");
      } else storyBox.style.display = "none";
    }
    const decisions = TECH_DECISIONS[meta.name];
    const decisionsBox = $("decisionsBox");
    if (decisionsBox) {
      if (decisions) {
        decisionsBox.style.display = "";
        decisionsBox.innerHTML = `<div class="story-kicker">TECHNICAL DECISIONS — why I built it this way</div>` +
          decisions.map(([k, v]) => `<div class="story-row"><span>${esc(k)}</span><p>${esc(v)}</p></div>`).join("");
      } else decisionsBox.style.display = "none";
    }
    const status = PROJECT_STATUS[meta.name] || repoStatus(meta.updated_at);
    const statusEl = $("projectStatus");
    if (statusEl) {
      const statusClass = status === "ACTIVE" ? "live" : status === "ARCHIVED" ? "err" : "";
      statusEl.innerHTML = `<span class="api-status ${statusClass}">● ${esc(status)}</span>`;
    }
    const banner = $("projectBanner");
    const bannerLink = $("bannerLink");
    if (banner) {
      const shot = PROJECT_SHOTS[meta.name];
      if (shot) {
        banner.src = shot; banner.alt = `${meta.name} screenshot`;
        banner.style.display = "";
        if (bannerLink) { bannerLink.href = shot; bannerLink.style.display = ""; }
      } else {
        banner.style.display = "none";
        if (bannerLink) bannerLink.style.display = "none";
      }
    }
    try {
      $("readmeBody").innerHTML = await fetchReadme(owner, meta.name, meta.default_branch);
      buildTOC();
    } catch {
      $("readmeBody").innerHTML = `<div class="md"><p>${esc(meta.description || "No README yet — the code speaks for itself.")}</p></div>`;
      const tw = document.querySelector(".toc-wrap");
      if (tw) tw.style.display = "none";
    }
    enhanceReadme();
    /* prev / next + more */
    const idx = repos.findIndex(r => r.name === meta.name);
    const pager = $("pager");
    if (idx >= 0) {
      const prev = repos[(idx - 1 + repos.length) % repos.length];
      const next = repos[(idx + 1) % repos.length];
      pager.innerHTML = `
        <a class="page-btn" href="${esc(cardHref(owner, prev.name))}">← ${esc(prev.name)}</a>
        <a class="page-btn" href="projects.html">ALL ⌂</a>
        <a class="page-btn" href="${esc(cardHref(owner, next.name))}">${esc(next.name)} →</a>`;
      const more = repos.filter((_, i) => i !== idx).slice(0, 3);
      $("moreGrid").innerHTML = more.map((r, i) => projectCard(r, i, owner)).join("");
      bindReveals($("moreGrid"));
    } else pager.innerHTML = `<a class="page-btn" href="projects.html">← ALL PROJECTS</a>`;
  }).catch(() => {
    $("readmeBody").innerHTML = `<div class="empty">+-- offline --+<br>| showing cached data soon |<br>+--------------+</div>`;
  });
})();

/* ── page: BLOG index + POST ── */
(function blogPages() {
  const list = $("postsList");
  let activeTag = "";
  const paintTags = () => {
    const row = $("tagRow"); if (!row) return;
    const tags = [...new Set(POSTS.map(p => p.tag))];
    row.innerHTML = [`<button class="tag-pill${activeTag ? "" : " active"}" data-tag="">all</button>`,
      ...tags.map(t => `<button class="tag-pill${t === activeTag ? " active" : ""}" data-tag="${esc(t)}">#${esc(t)}</button>`)].join("");
    row.querySelectorAll(".tag-pill").forEach(b => b.addEventListener("click", () => {
      activeTag = b.dataset.tag || "";
      paintTags(); drawPosts();
    }));
  };
  const drawPosts = () => {
    if (!list) return;
    const q = $("postSearch") ? $("postSearch").value.trim().toLowerCase() : "";
    const shown = POSTS.filter(p =>
      (!activeTag || p.tag === activeTag) &&
      (!q || `${p.title} ${p.excerpt} ${p.tag}`.toLowerCase().includes(q)));
    list.innerHTML = shown.length ? shown.map(postCard).join("")
      : `<div class="empty">+-- 0 notes match --+<br>| clear the filter |<br>+--------------------+</div>`;
    bindReveals(list);
  };
  paintTags();
  drawPosts();
  if ($("postSearch")) $("postSearch").addEventListener("input", drawPosts);
  const root = $("postRoot");
  if (!root) return;
  const p = POSTS.find(x => x.id === params.get("id"));
  if (!p) {
    root.innerHTML = `<div class="empty">+-- post not found --+<br>| <a href="blog.html">back to notes</a> |<br>+--------------------+</div>`;
    return;
  }
  document.title = `${p.title} — 0x-shadow.log`;
  const pmd = document.querySelector('meta[name="description"]');
  if (pmd) pmd.content = p.excerpt.slice(0, 160);
  $("postTitle").textContent = p.title;
  $("postMeta").textContent = `BUILD LOG #${postNo(p)} · ${p.date} · ${p.tag} · ${p.read}`;
  $("postBody").innerHTML = p.body.map(par => `<p>${esc(par)}</p>`).join("");
  const pimg = $("postImage");
  if (pimg) {
    const u = postImage(p.img);
    if (u) {
      pimg.src = u; pimg.alt = p.title; pimg.style.display = "";
      pimg.onclick = () => openLightbox(u, p.title);
    } else pimg.style.display = "none";
  }
  const i = POSTS.indexOf(p);
  const prev = POSTS[(i - 1 + POSTS.length) % POSTS.length];
  const next = POSTS[(i + 1) % POSTS.length];
  $("postPager").innerHTML = `
    <a class="page-btn" href="post.html?id=${esc(prev.id)}">← ${esc(prev.title)}</a>
    <a class="page-btn" href="blog.html">ALL ≡</a>
    <a class="page-btn" href="post.html?id=${esc(next.id)}">${esc(next.title)} →</a>`;
  const kr = $("keepReading");
  if (kr) {
    kr.innerHTML = POSTS.filter(x => x.id !== p.id).slice(0, 3).map(postCard).join("");
    bindReveals(kr);
  }
})();

/* ── page: ABOUT ── */
(function aboutPage() {
  if ($("stackRow")) $("stackRow").innerHTML = STACK.map(s => `<span class="stack">#${esc(s)}</span>`).join("");
  if ($("benchRow")) $("benchRow").innerHTML = ["ESP32 DevKit", "RC522 RFID", "ST7789 2in TFT", "microSD module", "Active buzzer 5V", "Raspberry Pi", "NUC", "Ender 3 V3 SE"].map(s => `<span class="stack">#${esc(s)}</span>`).join("");
  if ($("changelog")) {
    $("changelog").innerHTML = LOG.map(([d, m]) => {
      const safe = esc(m).replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/g, "<b>$1</b>");
      return `<div class="cl-row"><time>${esc(d)}</time><span>${safe}</span></div>`;
    }).join("");
    $("logCount").textContent = `${LOG.length} entries`;
  }
  if ($("aboutStats")) {
    getRepos(currentOwner).then(repos => {
      $("aboutStats").innerHTML =
        `<div><b>${repos.length}</b><span>repos</span></div>` +
        `<div><b>${repos.reduce((s, r) => s + r.stargazers_count, 0)}</b><span>stars</span></div>` +
        `<div><b>${new Set(repos.map(r => r.language).filter(Boolean)).size}</b><span>langs</span></div>`;
    }).catch(() => {
      $("aboutStats").innerHTML = `<div><b>${allRepos.length}</b><span>repos</span></div>`;
    });
  }
})();

/* ── optional hooks: fill the constants to switch on ── */
const ANALYTICS_URL = ""; // goatcounter counter url, e.g. "https://0x-shadow.goatcounter.com/count"
const STATUS_URL = ""; // public uptime-kuma status page url
(function analytics() {
  if (!ANALYTICS_URL) return;
  const s = document.createElement("script");
  s.setAttribute("data-goatcounter", ANALYTICS_URL);
  s.src = "//gc.zgo.at/count.js"; s.async = true;
  document.head.appendChild(s);
})();
(function statusHook() {
  if (!STATUS_URL) return;
  const a = document.getElementById("statusLink");
  if (a) { a.href = STATUS_URL; a.style.display = ""; }
})();
/* comments via utterances (github issues as comments — enable the app on the repo) */
(function comments() {
  const box = $("comments"); if (!box) return;
  const s = document.createElement("script");
  s.src = "https://utteranc.es/client.js";
  s.setAttribute("repo", "0x-Shadow/Blog");
  s.setAttribute("issue-term", "pathname");
  s.setAttribute("label", "comments");
  s.setAttribute("theme", document.documentElement.dataset.theme === "light" ? "github-light" : "github-dark");
  s.setAttribute("crossorigin", "anonymous");
  s.async = true;
  box.appendChild(s);
})();

bindReveals(document);

/* ── ambient layer v8: aurora orbs + particle field + cursor dot ──
   Pure decoration, injected so every page gets it with zero HTML edits.
   Theme-aware (follows data-theme), pauses when hidden, reduced-motion safe. */
(function ambient() {
  /* orbs + dot grid + scanlines — cheap CSS, fine on touch too */
  if (!reduceMotion) {
    const wrap = document.createElement("div");
    wrap.className = "ambient";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<span class="orb orb-a"></span><span class="orb orb-b"></span><span class="orb orb-c"></span><span class="gridlayer"></span><span class="scan"></span>';
    document.body.appendChild(wrap);
  }
  if (reduceMotion || matchMedia("(pointer: coarse)").matches) return;

  /* particle constellation */
  const cv = document.createElement("canvas");
  cv.id = "field";
  cv.setAttribute("aria-hidden", "true");
  document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, pts = [];
  let rgb = "215, 255, 62";
  const readTheme = () => { rgb = document.documentElement.dataset.theme === "light" ? "74, 94, 20" : "215, 255, 62"; };
  readTheme();
  try {
    new MutationObserver(readTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  } catch {}

  function sizeField() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr;
    H = cv.height = innerHeight * dpr;
    const n = Math.min(52, Math.floor(innerWidth / 26));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: (Math.random() * 1.2 + 0.4) * dpr,
      s: Math.random() * 0.14 + 0.03,
      p: Math.random() * Math.PI * 2,
      d: Math.random() * 0.6 + 0.4,
    }));
  }
  sizeField();
  addEventListener("resize", sizeField);
  /* freeze heavy background work while the page moves — scroll stays instant */
  let scrolling = false, scrollT = 0;
  addEventListener("scroll", () => {
    if (!scrolling) { scrolling = true; document.body.classList.add("is-scrolling"); }
    clearTimeout(scrollT);
    scrollT = setTimeout(() => { scrolling = false; document.body.classList.remove("is-scrolling"); }, 160);
  }, { passive: true });
  const m = { x: 0.5, y: 0.5 };
  addEventListener("pointermove", e => { m.x = e.clientX / innerWidth; m.y = e.clientY / innerHeight; }, { passive: true });

  (function drawField(t) {
    requestAnimationFrame(drawField);
    if (document.hidden || scrolling) return;
    ctx.clearRect(0, 0, W, H);
    const ox = (m.x - 0.5) * 20 * dpr, oy = (m.y - 0.5) * 20 * dpr;
    for (const p of pts) {
      p.y -= p.s * dpr;
      if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
      const tw = 0.4 + 0.6 * Math.sin(t * 0.0011 + p.p);
      ctx.beginPath();
      ctx.arc(p.x + ox * p.d, p.y + oy * p.d, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + rgb + "," + (0.5 * tw).toFixed(3) + ")";
      ctx.fill();
    }
    const max = 100 * dpr, max2 = max * max;
    ctx.lineWidth = dpr * 0.5;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < max2) {
          const alpha = 0.1 * (1 - Math.sqrt(d2) / max);
          ctx.strokeStyle = "rgba(" + rgb + "," + alpha.toFixed(3) + ")";
          ctx.beginPath();
          ctx.moveTo(a.x + ox * a.d, a.y + oy * a.d);
          ctx.lineTo(b.x + ox * b.d, b.y + oy * b.d);
          ctx.stroke();
        }
      }
    }
  })(0);

  /* cursor dot + ring — complements the existing lime glow orb */
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  dot.setAttribute("aria-hidden", "true");
  ring.setAttribute("aria-hidden", "true");
  document.body.append(dot, ring);
  let mx = -100, my = -100, rx = -100, ry = -100;
  addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function moveCursor() {
    requestAnimationFrame(moveCursor);
    if (document.hidden) return;
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)";
  })();
  const HOVER_SEL = "a,button,input,select,summary,.card,.post,.tilt";
  document.addEventListener("mouseover", e => { if (e.target.closest(HOVER_SEL)) ring.classList.add("hovering"); });
  document.addEventListener("mouseout", e => { if (e.target.closest(HOVER_SEL)) ring.classList.remove("hovering"); });
})();
