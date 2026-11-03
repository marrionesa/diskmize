<p align="center">
  <img src="public/diskmize/logo.png" alt="DiskMize logo" width="96" />
</p>

<h1 align="center">DiskMize - Official Website</h1>

<p align="center">
  <strong>The official website of DiskMize</strong>, the free and open-source desktop disk space analyzer.<br/>
  Built with Next.js 16, React 19 and Tailwind CSS 4 · <a href="https://diskmize.com">diskmize.com</a>
</p>

<p align="center">
  <a href="https://github.com/marrionesa/diskmize">« Back to the main DiskMize repository</a> ·
  <a href="https://diskmize.com">Website</a> ·
  <a href="https://github.com/marrionesa/diskmize/releases">Download</a> ·
  <a href="#-contributing">Contribute</a>
</p>

<p align="center">
  <a href="https://github.com/marrionesa/diskmize/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0--or--later-blue" alt="License: GPL-3.0-or-later"/></a>
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/React-19-087ea4" alt="React 19"/>
  <img src="https://img.shields.io/badge/i18n-ES%20%7C%20EN%20%7C%20FR%20%7C%20DE-green" alt="i18n: ES/EN/FR/DE"/>
</p>

---

**DiskMize** is a lightweight Linux disk space analyzer: scan directories or whole drives, find large files, and review storage usage through a simple graphical interface. This repository holds the landing website [diskmize.com](https://diskmize.com) available in **English, Spanish, French and German**.

## ✨ Website highlights

- **Single-page landing** with i18n (ES / EN / FR / DE) - no framework-i18n overhead
- **SEO-ready out of the box**: JSON-LD structured data (`SoftwareApplication`, `FAQPage`, `WebSite`), Open Graph + Twitter cards, canonical URLs, `sitemap.xml`, `robots.txt`, full favicon set
- **FAQ section** targeting real user queries (alternatives to ncdu/Baobab/Filelight, installation, safety…)
- **Download section** linking to the [latest GitHub release](https://github.com/marrionesa/diskmize/releases/latest) and source archive
- **Screenshots gallery** with lightbox, usage guide, news & articles sections
- **Zero-database, zero-backend**: fully static prerendered page served by the Next.js standalone server
- **Production setup included**: PM2 `ecosystem.config.cjs` (port 3102, localhost-only behind nginx/CloudPanel)

## 🚀 Quick start

```bash
# Node.js 20+ required (Node 24 LTS recommended)
npm install
npm run dev        # development server on http://localhost:3000
```

```bash
npm run build      # production build (standalone output)
npm start          # serve .next/standalone/server.js on port 3000
```

### Production deployment (PM2)

The site ships with a ready-to-use PM2 configuration listening on `127.0.0.1:3102`, intended to sit behind nginx:

```bash
npm run build
pm2 start ecosystem.config.cjs   # name: diskmize-web · PORT=3102 · HOSTNAME=127.0.0.1
pm2 save
```

## 📁 Project structure

```
diskmize-web/
├── src/
│   ├── app/                  # Next.js App Router (layout + single page)
│   ├── components/
│   │   ├── diskmize/         # screenshot-gallery component
│   │   └── ui/               # minimal shadcn/ui subset (11 used components)
│   ├── hooks/                # use-i18n (custom i18n), use-toast
│   └── lib/                  # translations.ts (4 languages), utils
├── public/
│   ├── diskmize/             # logo, banner, screenshots, box art
│   ├── robots.txt            # + sitemap.xml
│   └── icon-*.png            # favicon set (192/512/apple-touch)
├── ecosystem.config.cjs      # PM2 config (port 3102)
└── package.json
```

## 🌍 Translations

All user-facing strings live in [`src/lib/translations.ts`](src/lib/translations.ts) - the Spanish dictionary defines the canonical shape and every other language must match it (enforced by TypeScript).

| Code | Language | Anchor |
|------|----------|--------|
| `es` | Español  | `#es ` |
| `en` | English  | `#en`  |
| `fr` | Français | `#fr`  |
| `de` | Deutsch  | `#de`  |

**Translations are a great first contribution** → open a PR adding a new language or fixing an existing one.

## 🤝 Contributing

This website is part of the [DiskMize project](https://github.com/marrionesa/diskmize). Contributions are welcome - code, translations, design, docs and bug reports alike:

1. Read [CONTRIBUTING.md](https://github.com/marrionesa/diskmize/blob/main/CONTRIBUTING.md) in the main repository
2. Look for [`good first issue`](https://github.com/marrionesa/diskmize/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) labels
3. Fork → branch → PR

## 📝 License

The website code is released under the **GNU GPL v3.0 or later**, like the rest of the DiskMize project. See [LICENSE](https://github.com/marrionesa/diskmize/blob/main/LICENSE).

## 💬 Contact

- **Developer**: Mario Ramos - [github.com/marrionesa](https://github.com/marrionesa)
- **Email**: diskmize@marioramos.me
- **Issues**: [github.com/marrionesa/diskmize/issues](https://github.com/marrionesa/diskmize/issues)

---

<p align="center">
  DiskMize · Free disk space analyzer for Linux<br/>
  <sub>If you find it useful, ⭐ star the <a href="https://github.com/marrionesa/diskmize">main repository</a> - it helps others discover the project.</sub>
</p>
