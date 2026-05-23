import { useI18n } from '../i18n/context'
import type { Language } from '../i18n/translations'

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: 'he', flag: '🇮🇱', label: 'עב' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
]

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LANGUAGES.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={t(`lang${code.charAt(0).toUpperCase() + code.slice(1)}` as Parameters<typeof t>[0])}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all font-rubik ${
            lang === code
              ? 'bg-ember text-white shadow-lg shadow-ember/30'
              : 'text-cream/60 hover:text-cream hover:bg-card-border'
          }`}
        >
          <span>{flag}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
