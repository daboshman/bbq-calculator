import { useState } from 'react'
import { useI18n } from '../i18n/context'
import type { GuestCounts, AllergyGuest, MeatPortions, DrinkPortions } from '../types'
import { defaultMeatPortions, defaultDrinkPortions } from '../types'
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

      {/* rtl:flex-row-reverse reverses the RTL flex axis back to LTR for the stepper controls */}
      <div className="flex rtl:flex-row-reverse items-center justify-between gap-2">
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

// ── Compact portion row ────────────────────────────────────────────────────────
interface PortionRowProps {
  label: string
  value: number
  unit: string
  step: number
  min: number
  onChange: (v: number) => void
}

function PortionRow({ label, value, unit, step, min, onChange }: PortionRowProps) {
  const display = Number.isInteger(value) ? value : parseFloat(value.toFixed(2))
  return (
    <div className="flex items-center justify-between gap-2 py-2 border-b border-card-border/40 last:border-0">
      <span className="text-cream/70 text-xs font-rubik flex-1">{label}</span>
      <div className="flex rtl:flex-row-reverse items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, parseFloat((value - step).toFixed(2))))}
          disabled={value <= min}
          className="w-7 h-7 rounded-lg bg-card-border hover:bg-ember/30 text-cream disabled:opacity-25 transition-all flex items-center justify-center font-bold text-sm leading-none"
        >
          −
        </button>
        <span className="w-16 text-center text-cream font-bold text-sm font-rubik">
          {display} <span className="text-cream/40 font-normal">{unit}</span>
        </span>
        <button
          onClick={() => onChange(parseFloat((value + step).toFixed(2)))}
          className="w-7 h-7 rounded-lg bg-card-border hover:bg-ember/30 text-cream transition-all flex items-center justify-center font-bold text-sm leading-none"
        >
          +
        </button>
      </div>
    </div>
  )
}

// ── Collapsible section toggle ─────────────────────────────────────────────────
function SectionToggle({ icon, label, open, onToggle }: { icon: string; label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 text-cream/50 hover:text-cream/80 text-xs font-rubik transition-colors w-full"
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
      <span className="ms-auto text-cream/30">{open ? '▲' : '▼'}</span>
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function GuestForm({ onCalculate, initialGuests }: Props) {
  const { t } = useI18n()
  const [guests, setGuests] = useState<GuestCounts>(initialGuests ?? defaultGuests)
  const [errors, setErrors] = useState<TranslationKey[]>([])
  const [isOutdoor, setIsOutdoor] = useState(initialGuests?.isOutdoor !== false)
  const [portions, setPortions] = useState<MeatPortions>(
    initialGuests?.portions ?? { ...defaultMeatPortions }
  )
  const [drinkPortions, setDrinkPortions] = useState<DrinkPortions>(
    initialGuests?.drinkPortions ?? { ...defaultDrinkPortions }
  )
  const [showMeatPortions, setShowMeatPortions] = useState(false)
  const [showDrinkPortions, setShowDrinkPortions] = useState(false)

  const total = guests.adults + guests.kids

  function update<K extends keyof Omit<GuestCounts, 'allergyGuests' | 'isOutdoor' | 'portions' | 'drinkPortions'>>(
    field: K,
    value: number
  ) {
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

  function updatePortion<K extends keyof MeatPortions>(field: K, value: number) {
    setPortions((prev) => ({ ...prev, [field]: value }))
  }

  function updateDrinkPortion<K extends keyof DrinkPortions>(field: K, value: number) {
    setDrinkPortions((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit() {
    if (validate()) onCalculate({ ...guests, isOutdoor, portions, drinkPortions })
  }

  const hasGuests = total + guests.allergyGuests.length > 0

  return (
    <section className="bg-card-bg border border-card-border rounded-3xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-ember mb-4 font-rubik">{t('guestFormTitle')}</h2>

      {/* Outdoor / Indoor toggle */}
      <div className="flex gap-2 mb-5" dir="ltr">
        <button
          onClick={() => setIsOutdoor(true)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-rubik font-semibold transition-all ${
            isOutdoor
              ? 'bg-ember text-white shadow-md shadow-ember/20'
              : 'bg-charcoal text-cream/50 hover:text-cream'
          }`}
        >
          {t('outdoor')}
        </button>
        <button
          onClick={() => setIsOutdoor(false)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-rubik font-semibold transition-all ${
            !isOutdoor
              ? 'bg-ember text-white shadow-md shadow-ember/20'
              : 'bg-charcoal text-cream/50 hover:text-cream'
          }`}
        >
          {t('indoor')}
        </button>
      </div>

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

      {/* Meat portion customization */}
      <div className="mb-3">
        <SectionToggle
          icon="🍖"
          label={showMeatPortions ? t('portionsHide') : t('portionsShow')}
          open={showMeatPortions}
          onToggle={() => setShowMeatPortions((v) => !v)}
        />
        {showMeatPortions && (
          <div className="mt-3 bg-charcoal rounded-2xl px-4 py-2 animate-fade-in">
            <p className="text-ember text-xs font-rubik font-semibold mb-2">{t('portionsTitle')}</p>
            <PortionRow label={t('chickenPerAdult')} value={portions.chickenPerAdult} unit={t('unitPieces')} step={1} min={1} onChange={(v) => updatePortion('chickenPerAdult', v)} />
            <PortionRow label={t('chickenPerKid')} value={portions.chickenPerKid} unit={t('unitPieces')} step={1} min={1} onChange={(v) => updatePortion('chickenPerKid', v)} />
            <PortionRow label={t('steakPerAdult')} value={portions.steakPerAdult} unit={t('unitGrams')} step={50} min={50} onChange={(v) => updatePortion('steakPerAdult', v)} />
            <PortionRow label={t('steakPerKid')} value={portions.steakPerKid} unit={t('unitGrams')} step={50} min={50} onChange={(v) => updatePortion('steakPerKid', v)} />
            <PortionRow label={t('hamburgersPerAdult')} value={portions.hamburgersPerAdult} unit={t('unitPieces')} step={1} min={0} onChange={(v) => updatePortion('hamburgersPerAdult', v)} />
            <PortionRow label={t('hamburgersPerKid')} value={portions.hamburgersPerKid} unit={t('unitPieces')} step={1} min={0} onChange={(v) => updatePortion('hamburgersPerKid', v)} />
            <PortionRow label={t('sausagesPerAdult')} value={portions.sausagesPerAdult} unit={t('unitPieces')} step={1} min={0} onChange={(v) => updatePortion('sausagesPerAdult', v)} />
            <PortionRow label={t('sausagesPerKid')} value={portions.sausagesPerKid} unit={t('unitPieces')} step={1} min={0} onChange={(v) => updatePortion('sausagesPerKid', v)} />
          </div>
        )}
      </div>

      {/* Drink portion customization */}
      <div className="mb-5">
        <SectionToggle
          icon="🍺"
          label={showDrinkPortions ? t('portionsHide') : t('drinkPortionsShow')}
          open={showDrinkPortions}
          onToggle={() => setShowDrinkPortions((v) => !v)}
        />
        {showDrinkPortions && (
          <div className="mt-3 bg-charcoal rounded-2xl px-4 py-2 animate-fade-in">
            <p className="text-ember text-xs font-rubik font-semibold mb-2">{t('drinkPortionsTitle')}</p>
            <PortionRow label={t('waterPerPerson')} value={drinkPortions.waterPerPerson} unit={t('unitLiters')} step={0.25} min={0.25} onChange={(v) => updateDrinkPortion('waterPerPerson', v)} />
            <PortionRow label={t('softDrinksPerPerson')} value={drinkPortions.softDrinksPerPerson} unit={t('unitLiters')} step={0.25} min={0} onChange={(v) => updateDrinkPortion('softDrinksPerPerson', v)} />
            <PortionRow label={t('beerPerAdult')} value={drinkPortions.beerPerAdult} unit={t('unitBottles')} step={1} min={0} onChange={(v) => updateDrinkPortion('beerPerAdult', v)} />
            <PortionRow label={t('winePerAdult')} value={drinkPortions.winePerAdult} unit={t('unitBottles')} step={0.25} min={0} onChange={(v) => updateDrinkPortion('winePerAdult', v)} />
            <PortionRow label={t('spiritsPerAdult')} value={drinkPortions.spiritsPerAdult} unit={t('unitBottles')} step={0.25} min={0} onChange={(v) => updateDrinkPortion('spiritsPerAdult', v)} />
          </div>
        )}
      </div>

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
