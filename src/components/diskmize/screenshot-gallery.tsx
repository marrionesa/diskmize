'use client'

import { useEffect, useState, useCallback } from "react"
import { useI18n } from "@/hooks/use-i18n"

export type Shot = {
  src: string
  caption: string
  alt: string
}

/**
 * Year-2000s style screenshot lightbox.
 * Renders a gallery of "polaroid" thumbnails; clicking one opens a centered
 * modal window with classic Win9x window chrome (title bar, OK button).
 * Strings come from the i18n system (t.lightbox.*).
 */
export function ScreenshotGallery({ shots }: { shots: Shot[] }) {
  const { t } = useI18n()
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % shots.length))
  }, [shots.length])
  const prev = useCallback(() => {
    setActive((i) => (i === null ? null : (i - 1 + shots.length) % shots.length))
  }, [shots.length])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, close, next, prev])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(i)}
            className="dm-polaroid text-left cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] transition-none"
            aria-label={`${t.screenshots.description.split(".")[0]}: ${s.caption}`}
          >
            <img
              src={s.src}
              alt={s.alt}
              className="w-full h-auto block border border-[#6f6f6f]"
              loading="lazy"
            />
            <div className="dm-polaroid-caption">{s.caption}</div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={t.lightbox.title.replace("{n}", String(active + 1)).replace("{total}", String(shots.length))}
        >
          <div
            className="dm-window max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dm-titlebar">
              <span>{t.lightbox.title.replace("{n}", String(active + 1)).replace("{total}", String(shots.length))}</span>
              <button
                type="button"
                onClick={close}
                aria-label={t.lightbox.close}
                className="dm-btn"
                style={{ padding: "1px 8px", fontSize: "10px" }}
              >
                {t.lightbox.closeX}
              </button>
            </div>
            <div className="p-3 overflow-auto dm-scroll" style={{ background: "#0b0b0b" }}>
              <img
                src={shots[active].src}
                alt={shots[active].alt}
                className="w-full h-auto block"
                style={{ border: "1px solid #6f6f6f" }}
              />
              <div className="text-center mt-2" style={{ color: "#5a9dd0", fontFamily: "Verdana, sans-serif", fontSize: "11px" }}>
                {shots[active].caption}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 p-2" style={{ background: "#c8c8c8", borderTop: "1px solid #6f6f6f" }}>
              <button type="button" className="dm-btn" onClick={prev}>{t.lightbox.prev}</button>
              <span style={{ fontSize: "11px", color: "#0b0b0b" }}>
                {t.lightbox.keyboardHint}
              </span>
              <div className="flex gap-2">
                <button type="button" className="dm-btn" onClick={next}>{t.lightbox.next}</button>
                <button type="button" className="dm-btn dm-btn-primary" onClick={close}>{t.lightbox.close}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
