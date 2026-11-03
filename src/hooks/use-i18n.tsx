'use client'

import { useState, useEffect, useCallback, useMemo, createContext, useContext } from "react"
import { translations, DEFAULT_LANG, type Lang } from "@/lib/translations"

/* ------------------------------------------------------------------
   useI18n - client-side i18n for DiskMize
   - 4 languages: es, en, fr, de
   - Persists choice in localStorage (key: "diskmize.lang")
   - Detects browser language on first visit (navigator.language)
   - Provides t() for simple string interpolation:
       t("hero.headline", { a: "<b>", c: "</b>" })
       t("lightbox.title", { n: 2, total: 4 })
   - Provides raw dict access for arrays/objects: t.features.items, etc.
   ------------------------------------------------------------------ */

const STORAGE_KEY = "diskmize.lang"

function detectLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && stored in translations) return stored as Lang
  } catch { /* localStorage may be blocked */ }
  const nav = navigator.language?.toLowerCase() ?? ""
  if (nav.startsWith("es")) return "es"
  if (nav.startsWith("fr")) return "fr"
  if (nav.startsWith("de")) return "de"
  if (nav.startsWith("en")) return "en"
  return DEFAULT_LANG
}

type I18nContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations.es
  interpolate: (template: string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Start with DEFAULT_LANG on both server and client first render to avoid
  // hydration mismatch, then detect the browser/stored language after mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(detectLang())
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { window.localStorage.setItem(STORAGE_KEY, l) } catch { /* ignore */ }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])

  const interpolate = useCallback(
    (template: string, vars?: Record<string, string | number>) => {
      if (!vars) return template
      return template.replace(/\{(\w+)\}/g, (_, k) =>
        k in vars ? String(vars[k]) : `{${k}}`
      )
    },
    []
  )

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t: translations[lang], interpolate }),
    [lang, setLang, interpolate]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return ctx
}
