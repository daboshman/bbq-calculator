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

const UNIT_OPTIONS: TranslationKey[] = [
  'unitPieces',
  'unitGrams',
  'unitKg',
  'unitLiters',
  'unitBottles',
]

interface Props {
  items: ShoppingItem[]
  allergyGuests: AllergyGuest[]
  onUpdateQty: (id: string, delta: number) => void
  onResetItem: (id: string) => void
  onTogglePurchased: (id: string) => void
  onRemove: (id: string) => void
  onAddItem: (category: Category, name: string, qty: number, unit: string) => void
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
  onRemove,
  onAddItem,
  onSave,
  onShare,
  shareUrl,
  shareLoading = false,
  readOnly = false,
  sharedByName,
}: Props) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const [addingTo, setAddingTo] = useState<Category | null>(null)
  const [newName, setNewName] = useState('')
  const [newQty, setNewQty] = useState(1)
  const [newUnitKey, setNewUnitKey] = useState<TranslationKey>('unitPieces')

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

  function openAddForm(cat: Category) {
    setAddingTo(cat)
    setNewName('')
    setNewQty(1)
    setNewUnitKey('unitPieces')
  }

  function submitAdd() {
    if (!addingTo || !newName.trim()) return
    onAddItem(addingTo, newName.trim(), newQty, t(newUnitKey))
    setAddingTo(null)
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

      {/* Share options */}
      {shareUrl && !readOnly && (
        <div className="bg-green-950/50 border border-green-700/40 rounded-2xl px-4 py-3 mb-5 animate-slide-up">
          <p className="text-green-400 text-xs font-rubik mb-3">{t('shareSuccess')}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(t('shareMessageText') + '\n' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] rounded-xl text-xs font-rubik transition-colors"
            >
              <span>📱</span>
              <span>{t('shareViaWhatsApp')}</span>
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(t('shareMessageText'))}&body=${encodeURIComponent(t('shareMessageText') + '\n' + shareUrl)}`}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 rounded-xl text-xs font-rubik transition-colors"
            >
              <span>📧</span>
              <span>{t('shareViaEmail')}</span>
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 bg-green-900/30 hover:bg-green-900/50 text-green-300 rounded-xl text-xs font-rubik transition-colors"
            >
              <span>{copied ? '✓' : '🔗'}</span>
              <span>{copied ? t('linkCopied') : t('copyLink')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Allergy section */}
      {allergyGuests.length > 0 && <AllergySection allergyGuests={allergyGuests} />}

      {/* Item categories */}
      {CATEGORIES.map((cat) => {
        const catItems = groupedItems[cat.id]
        const hasItems = catItems && catItems.length > 0
        const isAdding = addingTo === cat.id

        if (!hasItems && readOnly) return null

        return (
          <div key={cat.id} className="mb-5 last:mb-0">
            <h3 className="text-sm font-bold text-cream/80 font-rubik mb-2 pb-2 border-b border-card-border">
              {t(cat.labelKey)}
            </h3>

            {hasItems && (
              <div className="space-y-1.5 mb-2">
                {catItems.map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    onUpdateQty={onUpdateQty}
                    onReset={onResetItem}
                    onTogglePurchased={onTogglePurchased}
                    onRemove={onRemove}
                    readOnly={readOnly}
                  />
                ))}
              </div>
            )}

            {/* Add item form */}
            {!readOnly && (
              isAdding ? (
                <div className="flex items-center gap-2 mt-2 animate-fade-in" dir="ltr">
                  <input
                    autoFocus
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitAdd(); if (e.key === 'Escape') setAddingTo(null) }}
                    placeholder={t('addItemName')}
                    className="flex-1 bg-charcoal border border-card-border rounded-xl px-3 py-2 text-cream text-sm font-rubik focus:outline-none focus:border-ember transition-colors"
                  />
                  <input
                    type="number"
                    value={newQty}
                    min={1}
                    onChange={(e) => setNewQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 bg-charcoal border border-card-border rounded-xl px-2 py-2 text-cream text-sm font-rubik text-center focus:outline-none focus:border-ember transition-colors"
                  />
                  <select
                    value={newUnitKey}
                    onChange={(e) => setNewUnitKey(e.target.value as TranslationKey)}
                    className="bg-charcoal border border-card-border rounded-xl px-2 py-2 text-cream text-sm font-rubik focus:outline-none focus:border-ember transition-colors"
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <option key={u} value={u}>{t(u)}</option>
                    ))}
                  </select>
                  <button
                    onClick={submitAdd}
                    disabled={!newName.trim()}
                    className="w-8 h-8 rounded-xl bg-ember disabled:opacity-40 text-white flex items-center justify-center text-lg font-bold leading-none transition-colors hover:bg-ember/80"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setAddingTo(null)}
                    className="w-8 h-8 rounded-xl bg-charcoal border border-card-border text-cream/50 hover:text-cream flex items-center justify-center text-lg leading-none transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openAddForm(cat.id)}
                  className="flex items-center gap-1.5 text-cream/30 hover:text-cream/70 text-xs font-rubik transition-colors mt-1 py-1"
                >
                  <span className="text-base leading-none">+</span>
                  <span>{t('addItem')}</span>
                </button>
              )
            )}
          </div>
        )
      })}
    </section>
  )
}
