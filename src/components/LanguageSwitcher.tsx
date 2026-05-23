import { useState, useRef, useEffect } from 'react'
import { useI18n } from '../i18n/context'
import type { Language } from '../i18n/translations'

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: 'he', flag: '🇮🇱', label: 'עברית' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = LANGUAGES.find((l) => l.code === lang)!

  return (
    <div ref={ref} className="relative" dir="ltr">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-cream/60 hover:text-cream hover:bg-card-border transition-all font-rubik text-sm"
        aria-label="Change language"
      >
        <span className="text-base">🌐</span>
        <span className="text-xs">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute top-full mt-1 end-0 bg-card-bg border border-card-border rounded-xl shadow-xl shadow-black/40 py-1 min-w-[130px] z-50 animate-fade-in">
          {LANGUAGES.map(({ code, flag, label }) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false) }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-rubik transition-colors text-start ${
                lang === code
                  ? 'text-ember bg-ember/10'
                  : 'text-cream/70 hover:text-cream hover:bg-card-border'
              }`}
            >
              <span>{flag}</span>
              <span>{label}</span>
              {lang === code && <span className="ms-auto text-ember text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
