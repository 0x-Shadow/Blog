# 0x-shadow.log

Static dev blog + project index. Plain HTML, CSS, one JS file. No build step, no frameworks, no dependencies.

Projects load live from the GitHub API. READMEs render as safe text. Notes are data in `site.js`.

## Run

```
npx serve .
```

Open `index.html` works too.

## Post a note

1. Copy a block in `POSTS` in `site.js`
2. Unique `id`, date, title, 2–4 paragraphs in `body`
3. Newest first. Add repo name to `RELATED_POST` to link project pages automatically.

## Deploy

Push to `main`. GitHub Pages serves it. Tags per release.

## License

MIT — see [LICENSE](LICENSE).
