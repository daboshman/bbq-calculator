import { useState } from 'react'
import { useI18n } from '../i18n/context'
import type { GuestCounts, AllergyGuest } from '../types'
import type { TranslationKey } from '../i18n/translations'

interface Props {
  onCalculate: (guests: GuestCounts) => void
  initialGuests?: GuestCounts
}

const defaultGuests: GuestCounts = {
  adults: 0,
  kids: 0,
  vegetarians: 0,
  vegans: 0,
  allergyGuests: [],
}

// ── Numeric stepper input ──────────────────────────────────────────────────────
interface StepperProps {
  emoji: string
  labelKey: TranslationKey
  descKey: TranslationKey
  value: number
  onChange: (v: number) => void
  max?: number
  badge?: string
}

function GuestStepper({ emoji, labelKey, descKey, value, onChange, max, badge }: StepperProps) {
  const { t } = useI18n()

  const decrement = () => onChange(Math.max(0, value - 1))
  const increment = () => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)

  return (
    <div className="bg-charcoal rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <span className="text-2xl leading-none">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-cream font-semibold text-sm font-rubik">{t(labelKey)}</span>
            {badge && (
              <span className="text-xs bg-ember/20 text-ember px-2 py-0.5 rounded-full font-rubik">
                {badge}
              </span>
            )}
          </div>
          <span className="text-cream/40 text-xs font-rubik">{t(descKey)}</span>
        </div>
      </div>

      {/* dir="ltr" keeps − on left and + on right in both RTL and LTR layouts */}
      <div className="flex items-center justify-between gap-2" dir="ltr">
        <button
          onClick={decrement}
          disabled={value === 0}
          className="w-9 h-9 rounded-xl bg-card-border hover:bg-ember/30 text-cream disabled:opacity-25 transition-all duration-150 flex items-center justify-center font-bold text-lg leading-none"
          aria-label="-"
        >
          −
        </button>

        <input
          type="number"
          value={value}
          min={0}
          max={max}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10)
            if (!isNaN(v)) onChange(Math.max(0, max !== undefined ? Math.min(max, v) : v))
          }}
          className="flex-1 bg-transparent text-center text-cream font-bold text-xl font-rubik focus:outline-none"
        />

        <button
          onClick={increment}
          disabled={max !== undefined && value >= max}
          className="w-9 h-9 rounded-xl bg-card-border hover:bg-ember/30 text-cream disabled:opacity-25 transition-all duration-150 flex items-center justify-center font-bold text-lg leading-none"
          aria-label="+"
        >
          +
        </button>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function GuestForm({ onCalculate, initialGuests }: Props) {
  const { t } = useI18n()
  const [guests, setGuests] = useState<GuestCounts>(initialGuests ?? defaultGuests)
  const [errors, setErrors] = useState<TranslationKey[]>([])

  const total = guests.adults + guests.kids

  function update<K extends keyof Omit<GuestCounts, 'allergyGuests'>>(field: K, value: number) {
    setGuests((prev) => ({ ...prev, [field]: Math.max(0, value) }))
    setErrors([])
  }

  function addAllergyGuest() {
    const newGuest: AllergyGuest = { id: crypto.randomUUID(), note: '' }
    setGuests((prev) => ({ ...prev, allergyGuests: [...prev.allergyGuests, newGuest] }))
  }

  function removeAllergyGuest(id: string) {
    setGuests((prev) => ({
      ...prev,
      allergyGuests: prev.allergyGuests.filter((g) => g.id !== id),
    }))
  }

  function updateAllergyNote(id: string, note: string) {
    setGuests((prev) => ({
      ...prev,
      allergyGuests: prev.allergyGuests.map((g) => (g.id === id ? { ...g, note } : g)),
    }))
  }

  function validate(): boolean {
    const errs: TranslationKey[] = []
    const grandTotal = total + guests.allergyGuests.length
    if (grandTotal === 0) errs.push('errorMinGuests')
    if (grandTotal > 200) errs.push('errorMaxGuests')
    if (guests.vegetarians + guests.vegans > total) errs.push('errorVegExceedTotal')
    setErrors(errs)
    return errs.length === 0
  }

  function handleSubmit() {
    if (validate()) onCalculate(guests)
  }

  const hasGuests = total + guests.allergyGuests.length > 0

  return (
    <section className="bg-card-bg border border-card-border rounded-3xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-ember mb-5 font-rubik">{t('guestFormTitle')}</h2>

      {/* Guest type grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <GuestStepper
          emoji="👨"
          labelKey="adults"
          descKey="adultsDesc"
          value={guests.adults}
          onChange={(v) => update('adults', v)}
        />
        <GuestStepper
          emoji="👧"
          labelKey="kids"
          descKey="kidsDesc"
          value={guests.kids}
          onChange={(v) => update('kids', v)}
        />
        <GuestStepper
          emoji="🥗"
          labelKey="vegetarians"
          descKey="vegetariansDesc"
          value={guests.vegetarians}
          onChange={(v) => update('vegetarians', v)}
          max={total}
        />
        <GuestStepper
          emoji="🌱"
          labelKey="vegans"
          descKey="vegansDesc"
          value={guests.vegans}
          onChange={(v) => update('vegans', v)}
          max={Math.max(0, total - guests.vegetarians)}
        />
      </div>

      {/* Allergy guests */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="font-semibold text-cream text-sm font-rubik">{t('allergies')}</span>
            <span className="text-cream/40 text-xs font-rubik">({t('allergiesDesc')})</span>
          </div>
          <button
            onClick={addAllergyGuest}
            className="text-ember hover:text-ember/80 text-sm font-rubik transition-colors flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-ember/10"
          >
            <span className="text-lg leading-none">+</span>
            <span className="hidden sm:inline">{t('addAllergyGuest')}</span>
          </button>
        </div>

        {guests.allergyGuests.length > 0 && (
          <div className="space-y-2">
            {guests.allergyGuests.map((guest, i) => (
              <div key={guest.id} className="flex items-center gap-2 animate-slide-up">
                <span className="text-amber-400 text-xs font-rubik font-semibold whitespace-nowrap w-16 text-end">
                  {t('allergyGuest')} {i + 1}:
                </span>
                <input
                  type="text"
                  value={guest.note}
                  onChange={(e) => updateAllergyNote(guest.id, e.target.value)}
                  placeholder={t('allergyNote')}
                  className="flex-1 bg-charcoal border border-card-border rounded-xl px-3 py-2 text-cream text-sm font-rubik focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  onClick={() => removeAllergyGuest(guest.id)}
                  className="text-red-400/60 hover:text-red-400 text-sm font-rubik transition-colors px-1"
                >
                  {t('removeGuest')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live summary */}
      {hasGuests && (
        <div className="bg-charcoal rounded-xl px-4 py-3 mb-4 text-cream/60 text-xs font-rubik leading-relaxed animate-fade-in">
          {t('guestSummary', {
            adults: guests.adults,
            kids: guests.kids,
            vegetarians: guests.vegetarians,
            vegans: guests.vegans,
            allergy: guests.allergyGuests.length,
          })}
        </div>
      )}

      {/* Validation errors */}
      {errors.map((err) => (
        <div
          key={err}
          className="bg-red-900/30 border border-red-700/50 text-red-300 rounded-xl px-4 py-3 mb-3 text-sm font-rubik animate-slide-up"
        >
          {t(err)}
        </div>
      ))}

      {/* Calculate button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-ember hover:bg-ember/90 active:bg-ember/80 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 font-rubik text-base shadow-lg shadow-ember/20 hover:shadow-ember/40"
      >
        {t('calculate')}
      </button>
    </section>
  )
}
