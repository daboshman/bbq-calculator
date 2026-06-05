import { useState, useEffect } from 'react'
import { useI18n } from '../i18n/context'
import { getPublicShare } from '../hooks/useFirestore'
import ShoppingList from './ShoppingList'
import LanguageSwitcher from './LanguageSwitcher'
import type { PublicShare } from '../types'

interface Props {
  shareId: string
}

export default function SharedListView({ shareId }: Props) {
  const { t } = useI18n()
  const [shareData, setShareData] = useState<PublicShare | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getPublicShare(shareId).then((data) => {
      if (data) {
        setShareData(data)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    })
  }, [shareId])

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-ember text-5xl animate-flicker select-none">🔥</div>
      </div>
    )
  }

  if (notFound || !shareData) {
    return (
      <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center gap-4 p-4">
        <div className="text-5xl select-none">🔥</div>
        <p className="text-cream/60 font-rubik text-center">{t('errorGeneric')}</p>
        <a
          href="/"
          className="text-ember hover:text-ember/80 font-rubik text-sm transition-colors"
        >
          {t('appName')}
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Mini header */}
      <header className="bg-card-bg border-b border-card-border print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-flicker inline-block select-none">🔥</span>
            <h1 className="text-lg font-bold text-ember font-rubik">{t('appName')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="/"
              className="text-cream/50 hover:text-cream text-sm font-rubik transition-colors"
            >
              {t('appName')}
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <ShoppingList
          items={shareData.items}
          allergyGuests={shareData.guestCounts?.allergyGuests ?? []}
          onUpdateQty={() => {}}
          onResetItem={() => {}}
          onTogglePurchased={() => {}}
          onRemove={() => {}}
          onAddItem={() => {}}
          onSave={() => {}}
          onShare={() => {}}
          readOnly
          sharedByName={shareData.sharedByName}
        />
      </main>
    </div>
  )
}
