'use client'

import { useState, useMemo, type FormEvent } from "react"
import { ScreenshotGallery, type Shot } from "@/components/diskmize/screenshot-gallery"
import { useI18n } from "@/hooks/use-i18n"
import { LANGS, type Lang } from "@/lib/translations"

/* ----------------------------------------------------------------
   DiskMize - Year-2000s WinRAR-style landing page
   Single-page client component with i18n (ES/EN/FR/DE).
   ---------------------------------------------------------------- */

export default function Home() {
  const { t, lang, setLang, interpolate } = useI18n()
  const [searchOpen, setSearchOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [query, setQuery] = useState("")

  const hitCounter = useMemo(() => "00017428", [])

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchOpen(false)
    if (query.trim()) {
      window.alert(interpolate(t.search.alert, { q: query }))
    }
    setQuery("")
  }

  // Build shots array from i18n translations
  const shots: Shot[] = useMemo(
    () => t.screenshots.shots.map((s) => ({ src: "", caption: s.caption, alt: s.alt })),
    [t]
  )
  // Override with actual image paths (paths don't change, only text does)
  const SHOT_PATHS = [
    "/diskmize/screenshot-main.png",
    "/diskmize/screenshot-about.png",
    "/diskmize/screenshot-help.png",
    "/diskmize/screenshot-options.png",
  ]
  const shotsWithPaths: Shot[] = shots.map((s, i) => ({ ...s, src: SHOT_PATHS[i] }))

  const onLangSelect = (l: Lang) => {
    setLang(l)
    setLangOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f4f4ec", color: "#0b0b0b" }}>


      {/* ===== Top utility bar ===== */}
      <div style={{ background: "linear-gradient(180deg, #0b0b0b 0%, #1a1a1a 100%)", color: "#c8c8c8", borderBottom: "1px solid #0d2a45" }}>
        <div className="max-w-[1100px] mx-auto px-3 flex items-center justify-between gap-3 py-1" style={{ fontSize: "10px" }}>
          <div className="flex items-center gap-3">
            <span style={{ color: "#5a9dd0" }}>●</span>
            <span className="hidden sm:inline">{t.topbar.siteLabel}</span>
            <span className="sm:hidden">diskmize.com</span>
          </div>
          <div className="flex items-center gap-2 relative">
            {/* Language selector */}
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="dm-link"
              style={{ color: "#5a9dd0", background: "transparent", textDecoration: "underline", cursor: "pointer" }}
              aria-label={t.topbar.langButton}
              aria-expanded={langOpen}
            >
              {LANGS.find((l) => l.code === lang)?.flag} {lang.toUpperCase()} ▾
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-1 z-50 dm-window"
                style={{ minWidth: "120px" }}
              >
                <div className="dm-titlebar" style={{ fontSize: "10px", padding: "2px 6px" }}>
                  <span>{t.topbar.langButton}</span>
                </div>
                <div style={{ background: "#c8c8c8" }}>
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => onLangSelect(l.code)}
                      className="block w-full text-left px-3 py-1 hover:bg-[#5a9dd0] hover:text-white"
                      style={{
                        fontSize: "11px",
                        color: l.code === lang ? "#0d2a45" : "#0b0b0b",
                        fontWeight: l.code === lang ? "bold" : "normal",
                        background: l.code === lang ? "#e3f0ff" : "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "Verdana, sans-serif",
                      }}
                    >
                      {l.flag} {l.native}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <span style={{ color: "#6e6e6e" }}>|</span>
            <a href="#soporte" className="dm-link" style={{ color: "#c8c8c8" }}>{t.topbar.support}</a>
            <span style={{ color: "#6e6e6e" }}>|</span>
            <a href="#contacto" className="dm-link" style={{ color: "#c8c8c8" }}>{t.topbar.contact}</a>
            <span style={{ color: "#6e6e6e" }}>|</span>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="dm-link"
              style={{ color: "#c8c8c8", background: "transparent", textDecoration: "underline", cursor: "pointer" }}
              aria-label={t.topbar.search}
            >
              {t.topbar.search}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Logo header ===== */}
      <header style={{ background: "linear-gradient(180deg, #ffffff 0%, #f4f4ec 100%)", borderBottom: "2px solid #0d2a45" }}>
        <div className="max-w-[1100px] mx-auto px-3 py-3 flex items-center justify-between gap-4 flex-wrap">
          <a href="/" className="flex items-center gap-3" aria-label="DiskMize - Inicio">
            <img
              src="/diskmize/logo.png"
              alt="DiskMize logo"
              width={96}
              height={96}
              className="w-14 h-14 sm:w-16 sm:h-16"
              style={{ imageRendering: "auto" }}
            />
            <div className="flex flex-col">
              <span style={{ fontFamily: "'Trebuchet MS', Tahoma, sans-serif", fontWeight: "bold", fontSize: "26px", color: "#0b0b0b", lineHeight: 1 }}>
                Disk<span style={{ color: "#1a4a73" }}>Mize</span>
              </span>
              <span style={{ fontSize: "11px", color: "#2a2a2a" }}>
                {t.header.tagline}
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-3" style={{ fontSize: "11px" }}>
            <div className="dm-bevel-out px-3 py-1 text-center">
              <div style={{ color: "#0b0b0b", fontWeight: "bold" }}>v0.1.0</div>
              <div style={{ color: "#6e6e6e", fontSize: "10px" }}>{t.header.versionStable}</div>
            </div>
            <a href="#descargas" className="dm-btn dm-btn-primary">{t.header.downloadNow}</a>
          </div>
        </div>
      </header>

      {/* ===== Tab nav (year 2000s web tabs) ===== */}
      <nav style={{ background: "linear-gradient(180deg, #2a2a2a 0%, #0b0b0b 100%)", borderBottom: "2px solid #0d2a45" }} aria-label={t.nav.ariaLabel}>
        <div className="max-w-[1100px] mx-auto px-3 pt-2">
          <ul className="flex flex-wrap items-end gap-0">
            <li><a href="#inicio" className="dm-tab dm-tab-active">{t.nav.home}</a></li>
            <li><a href="#caracteristicas" className="dm-tab">{t.nav.features}</a></li>
            <li><a href="#descargas" className="dm-tab">{t.nav.downloads}</a></li>
            <li><a href="#capturas" className="dm-tab">{t.nav.screenshots}</a></li>
            <li><a href="#uso" className="dm-tab">{t.nav.usage}</a></li>
            <li><a href="#noticias" className="dm-tab">{t.nav.news}</a></li>
            <li><a href="#articulos" className="dm-tab">{t.nav.articles}</a></li>
            <li><a href="#soporte" className="dm-tab">{t.nav.support}</a></li>
            <li><a href="#faq" className="dm-tab">{t.nav.faq}</a></li>
          </ul>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section
        id="inicio"
        className="dm-grid-bg relative overflow-hidden"
        style={{ borderBottom: "2px solid #0d2a45" }}
      >
        {/* hero image overlay */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "url('/diskmize/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,11,11,0.95) 0%, rgba(13, 42, 69,0.6) 70%, rgba(11,11,11,0.85) 100%)" }} aria-hidden="true" />

        <div className="relative max-w-[1100px] mx-auto px-3 py-10 sm:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block dm-chip mb-4" style={{ background: "#0d2a45", color: "#5a9dd0", borderColor: "#5a9dd0" }}>
              <span className="dm-blink">★</span> {t.hero.badge}
            </div>
            <h1 className="dm-green-glow" style={{ fontFamily: "'Trebuchet MS', Tahoma, sans-serif", fontWeight: "bold", fontSize: "30px", lineHeight: 1.1, color: "#ffffff", marginBottom: "12px" }}
                dangerouslySetInnerHTML={{ __html: interpolate(t.hero.headline, { a: '<span style="color:#5a9dd0">', c: "</span>" }) }} />
            <p style={{ color: "#c8c8c8", fontSize: "13px", maxWidth: "540px", margin: "0 auto 16px md:0 0 16px" }}>
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <a href="#descargas" className="dm-btn dm-btn-primary" style={{ fontSize: "13px", padding: "8px 18px" }}>
                {t.hero.downloadBtn}
              </a>
              <a href="https://github.com/marrionesa/diskmize" target="_blank" rel="noopener noreferrer" className="dm-btn" style={{ fontSize: "13px", padding: "8px 18px" }}>
                {t.hero.githubBtn}
              </a>
            </div>
            <p style={{ marginTop: "10px", fontSize: "10px", color: "#6e6e6e" }}>
              {t.hero.meta}
            </p>
          </div>

          <div className="text-center">
            <div className="inline-block dm-window" style={{ padding: "0", maxWidth: "440px", width: "100%" }}>
              <div className="dm-titlebar">
                <span>{t.hero.windowTitle}</span>
                <span style={{ fontSize: "10px" }}>?</span>
              </div>
              <div style={{ background: "#0b0b0b", padding: "6px" }}>
                <img
                  src="/diskmize/banner.jpg"
                  alt="Captura de la interfaz de DiskMize, analizador de espacio en disco para Linux"
                  width={1376}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                  style={{ border: "1px solid #2a2a2a" }}
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2" style={{ background: "#1a1a1a", borderTop: "1px solid #2a2a2a" }}>
                <span style={{ color: "#5a9dd0", fontFamily: "'Courier New', monospace", fontSize: "10px" }}>
                  {t.hero.windowVersion}
                </span>
                <a
                  href="https://github.com/marrionesa/diskmize"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dm-link"
                  style={{ color: "#5a9dd0", fontSize: "10px" }}
                >
                  {t.hero.windowGithub}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Marquee strip ===== */}
      <div style={{ background: "#0d2a45", borderBottom: "1px solid #5a9dd0", borderTop: "1px solid #0b0b0b", overflow: "hidden" }}>
        <div className="dm-marquee" style={{ color: "#5a9dd0", fontFamily: "'Courier New', monospace", fontSize: "11px", padding: "3px 0" }}>
          {t.marquee}
        </div>
      </div>

      {/* ===== What is DiskMize / Overview ===== */}
      <section className="max-w-[1100px] mx-auto w-full px-3 py-8">
        <div className="dm-section-title">{t.overview.title}</div>
        <div className="dm-window mt-0">
          <div className="p-4 sm:p-6" style={{ background: "#ffffff" }}>
            <p style={{ marginBottom: "10px", color: "#1a1a1a" }}
               dangerouslySetInnerHTML={{ __html: t.overview.body }} />
            <div className="dm-bevel-in p-3" style={{ background: "#fff8d6", borderColor: "#c0a02a" }}>
              <strong style={{ color: "#7a5400" }}>{t.overview.warningTitle}</strong>
              <p style={{ marginTop: "4px", color: "#3a2c00", fontSize: "11px" }}
                 dangerouslySetInnerHTML={{ __html: t.overview.warning }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features grid ===== */}
      <section id="caracteristicas" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <h2 className="dm-section-title">{t.features.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {t.features.items.map((f) => (
            <div key={f.icon} className="dm-bevel-out" style={{ background: "#ffffff" }}>
              <div style={{ background: "linear-gradient(180deg, #2a2a2a 0%, #0b0b0b 100%)", color: "#5a9dd0", padding: "4px 8px", fontFamily: "'Courier New', monospace", fontSize: "10px", borderBottom: "1px solid #0d2a45", display: "flex", justifyContent: "space-between" }}>
                <span>{f.icon}</span>
                <span className="dm-blink" style={{ color: "#f7d046" }}>●</span>
              </div>
              <div className="p-3">
                <h3 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", fontSize: "13px", color: "#0d2a45", marginBottom: "6px", borderBottom: "1px dotted #1a4a73", paddingBottom: "4px" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "11px", color: "#1a1a1a", lineHeight: 1.45 }}>
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Download section ===== */}
      <section id="descargas" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <div className="dm-section-title">{t.download.title}</div>
        <div className="dm-window mt-0">
          <div className="grid md:grid-cols-[200px_1fr] gap-4 p-4 sm:p-6" style={{ background: "#ffffff" }}>

            {/* Left: box art */}
            <div className="text-center">
              <img
                src="/diskmize/box.png"
                alt={t.download.boxAlt}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="w-40 h-40 mx-auto"
                style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.45))" }}
              />
              <div className="dm-hit-counter mt-3">v0.1.0</div>
            </div>

            {/* Right: info */}
            <div>
              <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "18px", color: "#0b0b0b", marginBottom: "4px" }}
                  dangerouslySetInnerHTML={{ __html: interpolate(t.download.heading, { a: '<span style="color:#1a4a73">', c: "</span>" }) }} />
              <p style={{ fontSize: "11px", color: "#2a2a2a", marginBottom: "12px" }}>
                {t.download.subtitle}
              </p>

              <table className="dm-table" style={{ marginBottom: "12px" }}>
                <tbody>
                  <tr>
                    <th style={{ width: "30%" }}>{t.download.table.version}</th>
                    <td>{t.download.table.versionVal}</td>
                  </tr>
                  <tr>
                    <th>{t.download.table.platform}</th>
                    <td>{t.download.table.platformVal}</td>
                  </tr>
                  <tr>
                    <th>{t.download.table.license}</th>
                    <td>{t.download.table.licenseVal}</td>
                  </tr>
                  <tr>
                    <th>{t.download.table.languages}</th>
                    <td>{t.download.table.languagesVal}</td>
                  </tr>
                  <tr>
                    <th>{t.download.table.requirements}</th>
                    <td>{t.download.table.requirementsVal}</td>
                  </tr>
                  <tr>
                    <th>{t.download.table.developer}</th>
                    <td>{t.download.table.developerVal}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-wrap gap-2 items-center">
                <a
                  href="https://github.com/marrionesa/diskmize/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dm-btn dm-btn-primary"
                >
                  {t.download.downloadBtn}
                </a>
                <a
                  href="https://github.com/marrionesa/diskmize/archive/refs/heads/main.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dm-btn"
                >
                  {t.download.zipBtn}
                </a>
                <a href="https://github.com/marrionesa/diskmize" target="_blank" rel="noopener noreferrer" className="dm-btn">
                  {t.download.repoBtn}
                </a>
              </div>

              <p style={{ marginTop: "10px", fontSize: "10px", color: "#6e6e6e" }}
                 dangerouslySetInnerHTML={{ __html: t.download.note }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Installation code block ===== */}
      <section className="max-w-[1100px] mx-auto w-full px-3 py-4">
        <div className="dm-section-title">{t.install.title}</div>
        <div className="dm-window mt-0">
          <div className="dm-titlebar">
            <span>{t.install.windowTitle}</span>
            <span style={{ fontSize: "10px" }}>- □ X</span>
          </div>
          <pre className="dm-code" style={{ margin: 0 }}>
<span className="dm-code-comment">{t.install.commentClone}</span>{"\n"}
<span className="dm-code-prompt">$</span> {t.install.cmdClone}{"\n"}
<span className="dm-code-prompt">$</span> {t.install.cmdCd}{"\n\n"}
<span className="dm-code-comment">{t.install.commentVenv}</span>{"\n"}
<span className="dm-code-prompt">$</span> {t.install.cmdVenv}{"\n"}
<span className="dm-code-prompt">$</span> {t.install.cmdActivate}{"\n\n"}
<span className="dm-code-comment">{t.install.commentInstall}</span>{"\n"}
<span className="dm-code-prompt">$</span> {t.install.cmdPip}{"\n"}
<span className="dm-code-prompt">$</span> {t.install.cmdInstall}{"\n\n"}
<span className="dm-code-comment">{t.install.commentRun}</span>{"\n"}
<span className="dm-code-prompt">$</span> {t.install.cmdRun}
          </pre>
        </div>
      </section>

      {/* ===== Screenshots ===== */}
      <section id="capturas" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <h2 className="dm-section-title">{t.screenshots.title}</h2>
        <p style={{ marginTop: "6px", fontSize: "11px", color: "#2a2a2a", marginBottom: "12px" }}>
          {t.screenshots.description}
        </p>
        <ScreenshotGallery shots={shotsWithPaths} />
      </section>

      {/* ===== How to use ===== */}
      <section id="uso" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <h2 className="dm-section-title">{t.usage.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-3">
          {t.usage.steps.map((s, i) => (
            <div key={i} className="dm-bevel-out" style={{ background: "#ffffff" }}>
              <div style={{ background: "linear-gradient(180deg, #5a9dd0 0%, #1a4a73 100%)", color: "#ffffff", padding: "6px 8px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", fontSize: "12px", borderBottom: "1px solid #0d2a45", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ display: "inline-flex", width: "20px", height: "20px", alignItems: "center", justifyContent: "center", background: "#0b0b0b", color: "#5a9dd0", border: "1px solid #ffffff", fontFamily: "'Courier New', monospace" }}>{i + 1}</span>
                <span>{s.t}</span>
              </div>
              <p style={{ padding: "8px", fontSize: "11px", color: "#1a1a1a", lineHeight: 1.45 }}>
                {s.d}
              </p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "8px", fontSize: "10px", color: "#6e6e6e" }}>
          {t.usage.note}
        </p>
      </section>

      {/* ===== System requirements ===== */}
      <section className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <div className="dm-section-title">{t.requirements.title}</div>
        <div className="dm-window mt-0">
          <div className="p-3" style={{ background: "#ffffff" }}>
            <table className="dm-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>{t.requirements.colComponent}</th>
                  <th>{t.requirements.colDetail}</th>
                </tr>
              </thead>
              <tbody>
                {t.requirements.rows.map((r, i) => (
                  <tr key={i}>
                    <td><strong>{r.c}</strong></td>
                    <td>{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== Latest news ===== */}
      <section id="noticias" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <h2 className="dm-section-title">{t.news.title}</h2>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          {t.news.items.map((n, i) => (
            <article key={i} className="dm-bevel-out" style={{ background: "#ffffff" }}>
              <div style={{ background: "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)", color: "#c8c8c8", padding: "4px 8px", fontSize: "10px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #0d2a45" }}>
                <span style={{ color: "#5a9dd0", fontWeight: "bold" }}>■ {n.tag}</span>
                <span>{n.date}</span>
              </div>
              <div className="p-3">
                <h3 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", fontSize: "13px", color: "#0b0b0b", marginBottom: "4px" }}>
                  <a href="#noticias" className="dm-link" style={{ textDecoration: "none" }}>{n.title}</a>
                </h3>
                <p style={{ fontSize: "11px", color: "#1a1a1a", lineHeight: 1.45 }}>{n.excerpt}</p>
                <a href="#noticias" className="dm-link" style={{ fontSize: "11px", marginTop: "6px", display: "inline-block" }}>{t.news.readMore}</a>
              </div>
            </article>
          ))}
        </div>
        <div className="text-right mt-3">
          <a href="#noticias" className="dm-link" style={{ fontSize: "11px" }}>{t.news.more}</a>
        </div>
      </section>

      {/* ===== Featured articles ===== */}
      <section id="articulos" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <h2 className="dm-section-title">{t.articles.title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {t.articles.items.map((a, i) => (
            <a
              key={i}
              href="#articulos"
              className="dm-bevel-out block no-underline"
              style={{ background: "#ffffff", color: "#0b0b0b" }}
            >
              <div style={{ background: "linear-gradient(180deg, #0d2a45 0%, #1a4a73 100%)", color: "#ffffff", padding: "6px 8px", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", fontSize: "11px", borderBottom: "1px solid #0d2a45", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#f7d046" }}>¶</span>
                <span>{t.articles.label}</span>
              </div>
              <div className="p-3">
                <h3 style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", fontSize: "12px", color: "#1a4a73", marginBottom: "4px", lineHeight: 1.25 }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: "11px", color: "#1a1a1a", lineHeight: 1.4 }}>{a.hook}</p>
                <span className="dm-link" style={{ fontSize: "10px", marginTop: "6px", display: "inline-block" }}>{t.articles.readArticle}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="text-right mt-3">
          <a href="#articulos" className="dm-link" style={{ fontSize: "11px" }}>{t.articles.more}</a>
        </div>
      </section>

      {/* ===== Support / Contact ===== */}
      <section id="soporte" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <h2 className="dm-section-title">{t.support.title}</h2>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          {t.support.cards.map((c, i) => (
            <div key={i} className="dm-bevel-out" style={{ background: "#ffffff" }}>
              <div style={{ background: "#0b0b0b", color: "#5a9dd0", padding: "6px 8px", fontFamily: "'Courier New', monospace", fontSize: "11px", borderBottom: "1px solid #0d2a45" }}>
                {c.header}
              </div>
              <div className="p-3">
                <p style={{ fontSize: "11px", color: "#1a1a1a", marginBottom: "8px" }}>
                  {c.body}
                </p>
                {i === 1 ? (
                  <a href="mailto:diskmize@marioramos.me" className="dm-link" style={{ fontSize: "11px" }}>
                    diskmize@marioramos.me
                  </a>
                ) : i === 0 ? (
                  <a href="https://github.com/marrionesa/diskmize/issues" target="_blank" rel="noopener noreferrer" className="dm-btn dm-btn-primary" style={{ fontSize: "11px" }}>
                    {c.btn}
                  </a>
                ) : (
                  <a href="https://github.com/marrionesa/diskmize#documentation" target="_blank" rel="noopener noreferrer" className="dm-btn" style={{ fontSize: "11px" }}>
                    {c.btn}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="max-w-[1100px] mx-auto w-full px-3 py-6">
        <h2 className="dm-section-title">{t.faq.title}</h2>
        <p style={{ fontSize: "11px", color: "#2a2a2a", marginBottom: "12px" }}>{t.faq.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-3">
          {t.faq.items.map((item, i) => (
            <details key={i} className="dm-bevel-out" style={{ background: "#ffffff" }} open={i < 2}>
              <summary
                style={{
                  background: "#0d2a45",
                  color: "#ffffff",
                  padding: "7px 10px",
                  fontFamily: "'Trebuchet MS', sans-serif",
                  fontWeight: "bold",
                  fontSize: "12px",
                  cursor: "pointer",
                  listStylePosition: "inside",
                }}
              >
                {item.q}
              </summary>
              <div className="p-3" style={{ fontSize: "12px", color: "#1a1a1a", lineHeight: 1.5 }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
        <div style={{ marginTop: "12px", textAlign: "center" }}>
          <a
            href="https://github.com/marrionesa/diskmize/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="dm-btn dm-btn-primary"
          >
            GitHub Issues »
          </a>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="mt-auto" style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #0b0b0b 100%)", color: "#c8c8c8", borderTop: "2px solid #0d2a45" }}>
         <div className="max-w-[1100px] mx-auto px-3 py-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/diskmize/logo.png" alt="" className="w-10 h-10" aria-hidden="true" />
                <div>
                  <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: "bold", fontSize: "16px", color: "#ffffff" }}>
                    Disk<span style={{ color: "#5a9dd0" }}>Mize</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#6e6e6e" }}>v0.1.0 · GPL-3.0-or-later</div>
                </div>
              </div>
              <p style={{ fontSize: "11px", color: "#a0a0a0", lineHeight: 1.5 }}>
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h4 style={{ color: "#5a9dd0", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "12px", marginBottom: "6px", borderBottom: "1px solid #2a2a2a", paddingBottom: "3px" }}>
                {t.footer.product}
              </h4>
              <ul style={{ fontSize: "11px", listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9 }}>
                <li><a href="#caracteristicas" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.features}</a></li>
                <li><a href="#descargas" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.downloads}</a></li>
                <li><a href="#capturas" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.screenshots}</a></li>
                <li><a href="#uso" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.usage}</a></li>
                <li><a href="#noticias" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.news}</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: "#5a9dd0", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "12px", marginBottom: "6px", borderBottom: "1px solid #2a2a2a", paddingBottom: "3px" }}>
                {t.footer.community}
              </h4>
              <ul style={{ fontSize: "11px", listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9 }}>
                <li><a href="https://github.com/marrionesa/diskmize" target="_blank" rel="noopener noreferrer" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.repo}</a></li>
                <li><a href="https://github.com/marrionesa/diskmize/issues" target="_blank" rel="noopener noreferrer" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.issues}</a></li>
                <li><a href="https://github.com/marrionesa/diskmize/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.contribute}</a></li>
                <li><a href="https://github.com/marrionesa/diskmize/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.license}</a></li>
                <li><a href="#soporte" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.support}</a></li>
                <li><a href="#faq" className="dm-link" style={{ color: "#c8c8c8" }}>{t.nav.faq}</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: "#5a9dd0", fontFamily: "'Trebuchet MS', sans-serif", fontSize: "12px", marginBottom: "6px", borderBottom: "1px solid #2a2a2a", paddingBottom: "3px" }}>
                {t.footer.legal}
              </h4>
              <ul style={{ fontSize: "11px", listStyle: "none", padding: 0, margin: 0, lineHeight: 1.9 }}>
                <li><a href="#" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.legal}</a></li>
                <li><a href="#" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.privacy}</a></li>
                <li><a href="#" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.cookies}</a></li>
                <li><a href="https://github.com/marrionesa/diskmize/blob/main/THIRD_PARTY_NOTICES" target="_blank" rel="noopener noreferrer" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.thirdparty}</a></li>
                <li id="contacto"><a href="mailto:diskmize@marioramos.me" className="dm-link" style={{ color: "#c8c8c8" }}>{t.footer.links.contact}</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4" style={{ borderTop: "1px solid #2a2a2a" }}>
            <div className="flex flex-wrap items-center justify-between gap-3" style={{ fontSize: "10px", color: "#6e6e6e" }}>
              <div>
                {t.footer.copyright}
              </div>
              <div className="flex items-center gap-3">
                <span>{t.footer.visitors}</span>
                <span className="dm-hit-counter">{hitCounter}</span>
                <a href="https://github.com/marrionesa/diskmize" target="_blank" rel="noopener noreferrer" title="RSS" className="dm-link" style={{ color: "#5a9dd0" }}>
                  {t.footer.rss}
                </a>
              </div>
            </div>
            <div className="mt-2" style={{ fontSize: "10px", color: "#6e6e6e" }}>
              {t.footer.design}
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Search dialog (year 2000s style) ===== */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.search.ariaLabel}
        >
          <div className="dm-window w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="dm-titlebar">
              <span>{t.search.title}</span>
              <button type="button" onClick={() => setSearchOpen(false)} className="dm-btn" style={{ padding: "1px 8px", fontSize: "10px" }} aria-label={t.search.close}>{t.lightbox.closeX}</button>
            </div>
            <form onSubmit={onSearch} className="p-3" style={{ background: "#c8c8c8" }}>
              <label htmlFor="dm-search-input" style={{ display: "block", fontSize: "11px", marginBottom: "6px", color: "#0b0b0b" }}>
                {t.search.label}
              </label>
              <input
                id="dm-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder={t.search.placeholder}
                style={{
                  width: "100%",
                  padding: "4px 6px",
                  border: "1px solid #000",
                  background: "#ffffff",
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "12px",
                  color: "#0b0b0b",
                  boxShadow: "inset 1px 1px 0 #6f6f6f, inset -1px -1px 0 #ffffff",
                  marginBottom: "10px",
                }}
              />
              <div className="flex justify-end gap-2">
                <button type="button" className="dm-btn" onClick={() => setSearchOpen(false)}>{t.search.cancel}</button>
                <button type="submit" className="dm-btn dm-btn-primary">{t.search.submit}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
