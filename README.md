# 0x-shadow.log — code as text

ASCII-style dev blog + project index. Zero build step: plain HTML, CSS and
one JS file. Projects load live from the GitHub API, READMEs render as
safe text, notes are written as data.

## Run it

Open `index.html` — or serve the folder:

```
npx serve .
```

## Post a note (30 seconds)

1. Open `site.js`, copy one block in `POSTS`.
2. Give it a unique `id`, date, title, 2–4 short paragraphs in `body`.
3. Newest first. If the note covers a repo, add the repo name to
   `RELATED_POST` — the project page links it automatically.

## Deploy

Push to `main` — GitHub Pages serves the site. One branch, tags per
release (`v3.0.0`, …).

## License

MIT — see [LICENSE](LICENSE).
