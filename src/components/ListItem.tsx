import { useI18n } from '../i18n/context'
import type { ShoppingItem } from '../types'
import type { TranslationKey } from '../i18n/translations'

interface Props {
  item: ShoppingItem
  onUpdateQty: (id: string, delta: number) => void
  onReset: (id: string) => void
  onTogglePurchased: (id: string) => void
  readOnly?: boolean
}

function formatQty(qty: number): string {
  if (qty % 1 === 0) return qty.toString()
  return qty.toFixed(1)
}

export default function ListItem({
  item,
  onUpdateQty,
  onReset,
  onTogglePurchased,
  readOnly = false,
}: Props) {
  const { t } = useI18n()
  const isModified = item.currentQty !== item.calculatedQty

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        item.purchased ? 'opacity-50 bg-charcoal/30' : 'bg-charcoal hover:bg-card-border/40'
      }`}
    >
      {/* Checkbox */}
      {!readOnly && (
        <button
          onClick={() => onTogglePurchased(item.id)}
          aria-label={t('markPurchased')}
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            item.purchased
              ? 'bg-green-600 border-green-600 text-white'
              : 'border-card-border hover:border-ember'
          }`}
        >
          {item.purchased && (
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1,6 4,9 11,2" />
            </svg>
          )}
        </button>
      )}

      {/* Item name */}
      <span
        className={`flex-1 font-rubik text-sm leading-tight ${
          item.purchased ? 'line-through text-cream/40' : 'text-cream'
        }`}
      >
        {t(item.nameKey as TranslationKey)}
      </span>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {!readOnly && (
          <button
            onClick={() => onUpdateQty(item.id, -1)}
            disabled={item.currentQty <= 0}
            className="w-7 h-7 rounded-lg bg-card-border hover:bg-ember/30 text-cream disabled:opacity-30 transition-colors flex items-center justify-center font-bold text-base leading-none"
          >
            −
          </button>
        )}

        <span
          className={`text-center font-bold font-rubik text-sm min-w-[72px] ${
            isModified ? 'text-amber-400' : 'text-cream'
          }`}
        >
          {formatQty(item.currentQty)}{' '}
          <span className="font-normal text-xs opacity-70">
            {t(item.unitKey as TranslationKey)}
          </span>
        </span>

        {!readOnly && (
          <button
            onClick={() => onUpdateQty(item.id, 1)}
            className="w-7 h-7 rounded-lg bg-card-border hover:bg-ember/30 text-cream transition-colors flex items-center justify-center font-bold text-base leading-none"
          >
            +
          </button>
        )}
      </div>

      {/* Reset button */}
      {!readOnly && isModified && (
        <button
          onClick={() => onReset(item.id)}
          title={t('resetItem')}
          className="text-cream/40 hover:text-amber-400 text-lg leading-none transition-colors flex-shrink-0"
        >
          ↺
        </button>
      )}
    </div>
  )
}
