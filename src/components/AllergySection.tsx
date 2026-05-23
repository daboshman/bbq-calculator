import { useI18n } from '../i18n/context'
import type { AllergyGuest } from '../types'

interface Props {
  allergyGuests: AllergyGuest[]
}

export default function AllergySection({ allergyGuests }: Props) {
  const { t } = useI18n()

  if (allergyGuests.length === 0) return null

  return (
    <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 mb-6 animate-fade-in">
      <h3 className="text-amber-400 font-bold font-rubik mb-3 flex items-center gap-2 text-base">
        <span>⚠️</span>
        <span>{t('allergyTitle')}</span>
      </h3>

      <div className="space-y-2 mb-3">
        {allergyGuests.map((guest, i) => (
          <div key={guest.id} className="flex items-start gap-2">
            <span className="text-amber-300 font-semibold text-sm font-rubik whitespace-nowrap pt-0.5">
              {t('allergyGuest')} {i + 1}:
            </span>
            <span className="text-cream/80 text-sm font-rubik leading-relaxed">
              {guest.note.trim() || '—'}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-amber-500/30 pt-3 flex items-start gap-2">
        <span className="text-amber-400 flex-shrink-0">⚠️</span>
        <p className="text-amber-300/90 text-sm font-rubik">{t('allergyReminder')}</p>
      </div>
    </div>
  )
}
