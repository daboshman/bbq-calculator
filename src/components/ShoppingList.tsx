import { useState } from 'react'
import { useI18n } from '../i18n/context'
import type { ShoppingItem, AllergyGuest } from '../types'
import type { TranslationKey } from '../i18n/translations'
import ListItem from './ListItem'
import AllergySection from './AllergySection'

type Category = 'meat' | 'sides' | 'veggie' | 'drinks' | 'equipment'

const CATEGORIES: { id: Category; labelKey: TranslationKey }[] = [
  { id: 'meat', labelKey: 'catMeat' },
  { id: 'sides', labelKey: 'catSides' },
  { id: 'veggie', labelKey: 'catVeggie' },
  { id: 'drinks', labelKey: 'catDrinks' },
  { id: 'equipment', labelKey: 'catEquipment' },
]

interface Props {
  items: ShoppingItem[]
  allergyGuests: AllergyGuest[]
  onUpdateQty: (id: string, delta: number) => void
  onResetItem: (id: string) => void
  onTogglePurchased: (id: string) => void
  onSave: () => void
  onShare: () => void
  shareUrl?: string | null
  shareLoading?: boolean
  readOnly?: boolean
  sharedByName?: string
}

export default function ShoppingList({
  items,
  allergyGuests,
  onUpdateQty,
  onResetItem,
  onTogglePurchased,
  onSave,
  onShare,
  shareUrl,
  shareLoading = false,
  readOnly = false,
  sharedByName,
}: Props) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const groupedItems = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = items.filter((item) => item.category === cat.id)
      return acc
    },
    {} as Record<Category, ShoppingItem[]>
  )

  const handleCopy = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const purchasedCount = items.filter((i) => i.purchased).length

  return (
    <section className="bg-card-bg border border-card-border rounded-3xl p-6 animate-fade-in">
      {/* Header row */}
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-ember font-rubik">{t('shoppingListTitle')}</h2>
          {purchasedCount > 0 && (
            <p className="text-cream/40 text-xs font-rubik mt-0.5">
              {purchasedCount} / {items.length}
            </p>
          )}
        </div>

        {!readOnly && (
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => window.print()}
              className="px-3 py-2 bg-charcoal hover:bg-card-border text-cream/60 hover:text-cream rounded-xl text-sm font-rubik transition-colors"
            >
              {t('print')}
            </button>
            <button
              onClick={onSave}
              disabled={shareLoading}
              className="px-3 py-2 bg-ember/15 hover:bg-ember/25 text-ember rounded-xl text-sm font-rubik transition-colors disabled:opacity-50"
            >
              {t('save')}
            </button>
            <button
              onClick={onShare}
              disabled={shareLoading}
              className="px-3 py-2 bg-ember hover:bg-ember/90 text-white rounded-xl text-sm font-rubik transition-colors shadow-md shadow-ember/20 disabled:opacity-50"
            >
              {shareLoading ? '...' : t('share')}
            </button>
          </div>
        )}
      </div>

      {/* Read-only badge */}
      {readOnly && sharedByName && (
        <div className="bg-charcoal rounded-xl px-4 py-2 mb-5 flex items-center gap-2">
          <span className="text-cream/40 text-xs font-rubik">
            {t('sharedBy')}: <span className="text-cream/70">{sharedByName}</span>
          </span>
          <span className="ms-auto text-xs bg-card-border text-cream/40 px-2 py-0.5 rounded-full font-rubik">
            {t('shareReadOnly')}
          </span>
        </div>
      )}

      {/* Share URL */}
      {shareUrl && !readOnly && (
        <div className="bg-green-950/50 border border-green-700/40 rounded-2xl px-4 py-3 mb-5 animate-slide-up">
          <p className="text-green-400 text-xs font-rubik mb-2">{t('shareSuccess')}</p>
          <div className="flex items-center gap-2">
            <span className="text-green-300/80 text-xs font-rubik flex-1 break-all leading-relaxed">
              {shareUrl}
            </span>
            <button
              onClick={handleCopy}
              className="text-green-400 hover:text-green-300 text-xs font-rubik whitespace-nowrap transition-colors px-2 py-1 rounded-lg hover:bg-green-900/30"
            >
              {copied ? t('linkCopied') : t('copyLink')}
            </button>
          </div>
        </div>
      )}

      {/* Allergy section */}
      {allergyGuests.length > 0 && <AllergySection allergyGuests={allergyGuests} />}

      {/* Item categories */}
      {CATEGORIES.map((cat) => {
        const catItems = groupedItems[cat.id]
        if (!catItems || catItems.length === 0) return null

        return (
          <div key={cat.id} className="mb-5 last:mb-0">
            <h3 className="text-sm font-bold text-cream/80 font-rubik mb-2 pb-2 border-b border-card-border">
              {t(cat.labelKey)}
            </h3>
            <div className="space-y-1.5">
              {catItems.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onUpdateQty={onUpdateQty}
                  onReset={onResetItem}
                  onTogglePurchased={onTogglePurchased}
                  readOnly={readOnly}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
