/* 0x-shadow.log — shared engine. One file, every page, zero build.
   Safety first: all network strings escaped, README via sanitizer. */
"use strict";

/* ── data ── */
const CONFIG = {
  githubUsername: "0x-Shadow",
  perPage: 100,
  avatarUrl: "https://avatars.githubusercontent.com/u/148369845?v=4",
};
const FEATURED = new Set(["CrewTrack", "SnapTap", "ClipTap"]);
const DEMO_PROJECTS = [
  { name: "CrewTrack", description: "ESP32 RFID attendance terminal for my father's electrical crew. Offline, no cloud, no fees — ▲80 on r/esp32.", language: "C++", stargazers_count: 8, forks_count: 0, updated_at: "2026-09-01T07:20:44Z", html_url: "https://github.com/0x-Shadow/CrewTrack", homepage: "https://0x-shadow.github.io/CrewTrack/", topics: ["esp32", "rfid", "offline"], featured: true },
  { name: "SnapTap", description: "Snap, save & share — lightweight capture tool.", language: "JavaScript", stargazers_count: 3, forks_count: 0, updated_at: "2026-09-15T11:24:05Z", html_url: "https://github.com/0x-Shadow/SnapTap", homepage: "https://0x-shadow.github.io/SnapTap/", topics: ["tool"], featured: true },
  { name: "ClipTap", description: "Floating clipboard manager for Windows. Searchable, offline, open source.", language: "JavaScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-15T17:58:53Z", html_url: "https://github.com/0x-Shadow/ClipTap", homepage: "https://0x-shadow.github.io/ClipTap/", topics: ["windows", "offline"], featured: true },
  { name: "Code-Mate", description: "Online code playground — Monaco + Piston.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-12T11:27:18Z", html_url: "https://github.com/0x-Shadow/Code-Mate", homepage: "", topics: ["playground"] },
  { name: "Blog", description: "This blog — ASCII aesthetic + live GitHub index.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-09-23T20:32:11Z", html_url: "https://github.com/0x-Shadow/Blog", homepage: "", topics: ["blog"] },
  { name: "Intelligent-Film-Production-Search", description: "Intelligent search over film-production data.", language: "Python", stargazers_count: 1, forks_count: 0, updated_at: "2026-01-25T11:31:40Z", html_url: "https://github.com/0x-Shadow/Intelligent-Film-Production-Search", homepage: "", topics: ["python"] },
];
/* HOW TO POST (30 seconds, no build):
   1. Copy one { id, date, ... } block below. 2. New unique id (used in URL).
   3. Write 2-4 short paragraphs in body. 4. Push — done. Newest first. */
const POSTS = [
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
const io = new IntersectionObserver((es) => {
  for (const e of es) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
function bindReveals(scope) {
  (scope || document).querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
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
function sanitizeRepo(r, username) {
  if (!r || typeof r.name !== "string" || !/^[\w.\-+]{1,100}$/.test(r.name)) return null;
  if (r.fork || r.name.toLowerCase() === String(username).toLowerCase()) return null;
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
  const key = "repos:" + String(owner).toLowerCase();
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const j = JSON.parse(raw);
      if (j && Date.now() - j.t < 10 * 60 * 1000 && Array.isArray(j.d) && j.d.length) return j.d;
    }
  } catch {}
  const d = await fetchRepos(owner);
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch {}
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
if ($("typewriter")) {
  const LINES = ["fetching @0x-Shadow repos…", "CrewTrack: ▲80 on r/esp32", "tap a card → full README"];
  if (reduceMotion) $("typewriter").textContent = LINES[0];
  else (async function loop() {
    const el = $("typewriter"); let li = 0;
    while (el.isConnected) {
      const line = LINES[li++ % LINES.length];
      for (let i = 1; i <= line.length; i++) { el.textContent = line.slice(0, i); await new Promise(r => setTimeout(r, 34)); }
      await new Promise(r => setTimeout(r, 1500));
      for (let i = line.length; i >= 0; i--) { el.textContent = line.slice(0, i); await new Promise(r => setTimeout(r, 12)); }
    }
  })();
}
if ($("marquee")) $("marquee").textContent = " OPEN_SOURCE ✳ SHIP_IN_PUBLIC ✳ MONO_FOREVER ✳ .:-=+*#%@ ✳ TAP_A_CARD_FOR_README ✳".repeat(6);
if ($("tryAscii")) $("tryAscii").addEventListener("click", () => {
  document.querySelector('[data-mode="image"]').click();
  document.querySelector(".ascii-window").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
});

/* ASCII live field (home only, pauses offscreen) */
(function asciiField() {
  const cv = $("asciiCanvas"); if (!cv) return;
  const small = matchMedia("(max-width: 560px)").matches;
  const COLS = small ? 46 : 72, ROWS = small ? 38 : 44;
  const W = cv.width, H = cv.height, RAMP = " .:-=+*#%@";
  const cw = W / COLS, ch = H / ROWS;
  const ctx = cv.getContext("2d");
  const off = document.createElement("canvas"); off.width = W; off.height = H;
  const o = off.getContext("2d");
  let mx = -999, my = -999, t = 0, visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(cv);
  cv.addEventListener("pointermove", e => {
    const r = cv.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width * W; my = (e.clientY - r.top) / r.height * H;
  }, { passive: true });
  cv.addEventListener("pointerleave", () => { mx = my = -999; });
  function field(x, y) {
    const nx = x / W - 0.5, ny = y / H - 0.5;
    let v = Math.sin(nx * 9 + t * 1.4) * Math.cos(ny * 7 - t) * 0.5 + 0.5;
    v += Math.sin((nx + ny) * 14 + t * 2) * 0.12;
    if (x > W / 2) v = Math.floor(v * 5) / 5 + (((x / 18 | 0) + (y / 18 | 0)) % 2 ? -0.06 : 0.06);
    else { const d = Math.hypot(nx + 0.22, ny); v += Math.max(0, 0.35 - d) * 1.2; }
    const md = Math.hypot(x - mx, y - my);
    if (md < 130) v += (1 - md / 130) * 0.55 * Math.sin(t * 6);
    if (Math.abs(x - W / 2) < 2) v = 0.95;
    return Math.min(1, Math.max(0, v));
  }
  function frame() {
    t += 0.03;
    o.fillStyle = "#060607"; o.fillRect(0, 0, W, H);
    o.font = `${ch * 0.95}px "JetBrains Mono", monospace`; o.textBaseline = "top";
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const x = c * cw, y = r * ch, v = field(x + cw / 2, y + ch / 2);
      const chr = RAMP[Math.min(RAMP.length - 1, (v * RAMP.length) | 0)];
      if (chr === " ") continue;
      const split = Math.abs(x + cw / 2 - W / 2) < 3;
      o.fillStyle = split ? "#d7ff3e" : v > 0.86 ? "#fff" : `rgba(200,200,205,${0.35 + v * 0.6})`;
      o.fillText(chr, x + cw * 0.12, y);
    }
    o.fillStyle = "#d7ff3e"; o.font = '700 13px "JetBrains Mono", monospace';
    o.fillText("[ HUMAN", 14, 14); o.fillText("ROBOT ]", W - 84, 14);
    ctx.drawImage(off, 0, 0);
  }
  frame();
  if (!reduceMotion) (function loop() {
    if (visible && !document.hidden && cv.offsetParent !== null) frame();
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    const m = b.dataset.mode;
    $("asciiSource").classList.toggle("hidden", m !== "source");
    cv.style.display = m === "render" ? "block" : "none";
    $("imgPane").classList.toggle("hidden", m !== "image");
    $("winFootLeft").textContent = m === "image" ? "◉ IMAGE→ASCII — upload or drop a photo"
      : m === "source" ? "◉ SOURCE — raw text" : "◉ LIVE — touch the render";
  }));
})();

/* IMAGE → ASCII (home only) */
let lastAsciiText = "";
(function imageAscii() {
  const cv = $("imgCanvas"); if (!cv) return;
  const RAMP = " .:-=+*#%@";
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  const pane = $("imgPane");
  function renderImage(img) {
    const cols = Math.min(160, Math.max(40, parseInt($("detailRange").value, 10) || 110));
    const rows = Math.max(10, Math.round(cols * (img.height / img.width) * 0.55));
    const tmp = document.createElement("canvas"); tmp.width = cols; tmp.height = rows;
    const tc = tmp.getContext("2d", { willReadFrequently: true });
    tc.drawImage(img, 0, 0, cols, rows);
    let data;
    try { data = tc.getImageData(0, 0, cols, rows).data; }
    catch { toast("cannot read image — upload it instead"); return; }
    ctx.fillStyle = "#060607"; ctx.fillRect(0, 0, W, H);
    const cw = W / cols, chh = H / rows;
    ctx.font = `${Math.min(cw * 1.15, chh)}px "JetBrains Mono", monospace`;
    ctx.textBaseline = "top";
    let txt = "";
    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
        const chr = RAMP[Math.min(RAMP.length - 1, (lum * RAMP.length) | 0)];
        line += chr;
        if (chr === " ") continue;
        ctx.fillStyle = lum > 0.85 ? "#fff" : lum > 0.6 ? "#d7d7dc" : lum > 0.35 ? "#8e8e98" : "#4a4a53";
        ctx.fillText(chr, x * cw, y * chh);
      }
      txt += line + "\n";
    }
    lastAsciiText = txt;
    toast(`rendered ${cols}×${rows}`);
  }
  function loadFile(f) {
    if (!f) return;
    if (!String(f.type || "").startsWith("image/")) { toast("that is not an image"); return; }
    if (f.size > 8 * 1024 * 1024) { toast("image too big (max 8MB)"); return; }
    const url = URL.createObjectURL(f), img = new Image();
    img.onload = () => { renderImage(img); URL.revokeObjectURL(url); };
    img.onerror = () => toast("could not read that file");
    img.src = url;
  }
  $("imgInput").addEventListener("change", e => loadFile(e.target.files[0]));
  $("avatarBtn").addEventListener("click", () => {
    document.querySelector('[data-mode="image"]').click();
    const img = new Image(); img.crossOrigin = "anonymous";
    img.onload = () => renderImage(img);
    img.onerror = () => toast("avatar blocked — upload a screenshot");
    img.src = CONFIG.avatarUrl;
  });
  $("downloadBtn").addEventListener("click", () => {
    if (!lastAsciiText) { toast("render an image first"); return; }
    const blob = new Blob([lastAsciiText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "ascii-art.txt";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast("saved ascii-art.txt");
  });
  ["dragover", "dragenter"].forEach(ev => pane.addEventListener(ev, e => { e.preventDefault(); pane.classList.add("dragover"); }));
  ["dragleave", "drop"].forEach(ev => pane.addEventListener(ev, e => { e.preventDefault(); pane.classList.remove("dragover"); }));
  pane.addEventListener("drop", e => loadFile(e.dataTransfer.files && e.dataTransfer.files[0]));
  const av = new Image(); av.crossOrigin = "anonymous";
  av.onload = () => { try { renderImage(av); } catch {} };
  av.src = CONFIG.avatarUrl;
})();

/* ── page: HOME preview ── */
(function homePreview() {
  const grid = $("homeGrid"); if (!grid) return;
  const top = [...allRepos].sort((a, b) =>
    ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)) || b.stargazers_count - a.stargazers_count).slice(0, 3);
  grid.innerHTML = top.map((r, i) => projectCard(r, i, currentOwner)).join("");
  bindReveals(grid);
  getRepos(currentOwner).then(repos => {
    allRepos = repos;
    const t = [...repos].sort((a, b) =>
      ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)) || b.stargazers_count - a.stargazers_count).slice(0, 3);
    grid.innerHTML = t.map((r, i) => projectCard(r, i, currentOwner)).join("");
    bindReveals(grid);
    if ($("statRepos")) $("statRepos").textContent = repos.length;
    if ($("statStars")) $("statStars").textContent = repos.reduce((s, r) => s + r.stargazers_count, 0);
    if ($("statLangs")) $("statLangs").textContent = new Set(repos.map(r => r.language).filter(Boolean)).size;
  }).catch(() => {
    if ($("statRepos")) $("statRepos").textContent = allRepos.length;
    if ($("statStars")) $("statStars").textContent = allRepos.reduce((s, r) => s + r.stargazers_count, 0);
    if ($("statLangs")) $("statLangs").textContent = new Set(allRepos.map(r => r.language).filter(Boolean)).size;
  });
  const hp = $("homePosts");
  if (hp) hp.innerHTML = POSTS.slice(0, 2).map(postCard).join("");
  bindReveals(hp);
})();
function postCard(p) {
  return `
  <a class="post reveal" href="post.html?id=${esc(p.id)}">
    <span class="post-date">${esc(p.date)} · ${esc(p.tag)}</span>
    <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>
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
    let list = allRepos.filter(r => {
      const hay = `${r.name || ""} ${(r.description || "")} ${(r.topics || []).join(" ")}`.toLowerCase();
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
  const st = $("apiStatus");
  loadProfile(owner);
  render();
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
  CrewTrack: "crewtrack-esp32-terminal",
  ClipTap: "cliptap-clipboard-that-stays-open",
  "Code-Mate": "codemate-no-backend",
};
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
if ($("btnCopy")) $("btnCopy").addEventListener("click", async () => {
  const url = location.href;
  try { await navigator.clipboard.writeText(url); toast("link copied"); }
  catch {
    const ta = document.createElement("textarea");
    ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("link copied"); }
    catch { toast("copy failed — long-press the URL"); }
    ta.remove();
  }
});
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
    if ($("projectDesc")) $("projectDesc").textContent = meta.description || "No description yet — the README below says more.";
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
    try {
      $("readmeBody").innerHTML = await fetchReadme(owner, meta.name, meta.default_branch);
      buildTOC();
    } catch {
      $("readmeBody").innerHTML = `<div class="md"><p>${esc(meta.description || "No README yet — the code speaks for itself.")}</p></div>`;
      const tw = document.querySelector(".toc-wrap");
      if (tw) tw.style.display = "none";
    }
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
  if (list) {
    list.innerHTML = POSTS.map(postCard).join("");
    bindReveals(list);
  }
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
  $("postMeta").textContent = `${p.date} · ${p.tag} · ${p.read}`;
  $("postBody").innerHTML = p.body.map(par => `<p>${esc(par)}</p>`).join("");
  const i = POSTS.indexOf(p);
  const prev = POSTS[(i - 1 + POSTS.length) % POSTS.length];
  const next = POSTS[(i + 1) % POSTS.length];
  $("postPager").innerHTML = `
    <a class="page-btn" href="post.html?id=${esc(prev.id)}">← ${esc(prev.title)}</a>
    <a class="page-btn" href="blog.html">ALL ≡</a>
    <a class="page-btn" href="post.html?id=${esc(next.id)}">${esc(next.title)} →</a>`;
})();

/* ── page: ABOUT ── */
(function aboutPage() {
  if ($("stackRow")) $("stackRow").innerHTML = STACK.map(s => `<span class="stack">#${esc(s)}</span>`).join("");
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

bindReveals(document);
