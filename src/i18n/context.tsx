import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Language, type TranslationKey } from './translations'

interface I18nContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
  isRTL: boolean
  dir: 'rtl' | 'ltr'
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('bbq-lang')
    return (saved as Language) || 'he'
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('bbq-lang', newLang)
  }

  const isRTL = lang === 'he'
  const dir = isRTL ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const t = (key: TranslationKey, vars?: Record<string, string | number>): string => {
    const langTranslations = translations[lang] as Record<string, string>
    let str = langTranslations[key] ?? key
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v))
      })
    }
    return str
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRTL, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
