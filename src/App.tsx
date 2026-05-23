import { useState } from 'react'
import { I18nProvider, useI18n } from './i18n/context'
import { useAuth } from './hooks/useAuth'
import { useCalculator } from './hooks/useCalculator'
import { useFirestore } from './hooks/useFirestore'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import GuestForm from './components/GuestForm'
import ShoppingList from './components/ShoppingList'
import SavedListsModal from './components/SavedListsModal'
import SharedListView from './components/SharedListView'
import type { GuestCounts, SavedList } from './types'
import type { TranslationKey } from './i18n/translations'

// ── Detect share route ─────────────────────────────────────────────────────────
function getShareId(): string | null {
  const match = window.location.pathname.match(/^\/share\/([A-Za-z0-9]+)$/)
  return match ? match[1] : null
}

// ── Save / Share modal ─────────────────────────────────────────────────────────
interface SaveModalProps {
  onConfirm: (name: string) => void
  onCancel: () => void
}

function SaveModal({ onConfirm, onCancel }: SaveModalProps) {
  const { t } = useI18n()
  const [name, setName] = useState('')

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-card-bg border border-card-border rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-slide-up">
        <h2 className="text-lg font-bold text-ember font-rubik mb-4">{t('saveModalTitle')}</h2>

        <label className="block text-cream/70 text-sm font-rubik mb-1">{t('listName')}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('listNamePlaceholder')}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && name.trim() && onConfirm(name.trim())}
          className="w-full bg-charcoal border border-card-border rounded-xl px-4 py-3 text-cream font-rubik text-sm focus:outline-none focus:border-ember transition-colors mb-5"
        />

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-charcoal hover:bg-card-border text-cream/60 hover:text-cream rounded-2xl text-sm font-rubik transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={() => name.trim() && onConfirm(name.trim())}
            disabled={!name.trim()}
            className="flex-1 py-3 bg-ember hover:bg-ember/90 text-white rounded-2xl text-sm font-rubik font-bold transition-colors disabled:opacity-40 shadow-md shadow-ember/20"
          >
            {t('saveConfirm')}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Toast notification ─────────────────────────────────────────────────────────
function Toast({ messageKey }: { messageKey: TranslationKey }) {
  const { t } = useI18n()
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-800 border border-green-600 text-green-100 px-5 py-3 rounded-2xl shadow-xl font-rubik text-sm animate-slide-up print:hidden">
      {t(messageKey)}
    </div>
  )
}

// ── Loading spinner ────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center">
      <span className="text-6xl animate-flicker select-none" role="img" aria-label="loading">
        🔥
      </span>
    </div>
  )
}

// ── Main authenticated app ─────────────────────────────────────────────────────
function AuthenticatedApp() {
  const { user, logout } = useAuth()
  const { t } = useI18n()

  const { items, hasCalculated, calculate, updateItemQty, resetItemQty, togglePurchased, loadItems, resetAll } =
    useCalculator()

  const { savedLists, saveList, deleteList, toast } = useFirestore(user)

  const [guests, setGuests] = useState<GuestCounts | null>(null)
  const [showSavedLists, setShowSavedLists] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [shareLoading, setShareLoading] = useState(false)

  if (!user) return null

  const handleCalculate = (guestCounts: GuestCounts) => {
    setGuests(guestCounts)
    setShareUrl(null)
    calculate(guestCounts)
    // Scroll to list on mobile
    setTimeout(() => {
      document.getElementById('shopping-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleSave = () => setShowSaveModal(true)

  const handleSaveConfirm = async (name: string) => {
    if (!guests) return
    setShowSaveModal(false)
    setShareLoading(true)
    const shareId = await saveList(name, guests, items)
    if (shareId) {
      const url = `${window.location.origin}/share/${shareId}`
      setShareUrl(url)
    }
    setShareLoading(false)
  }

  const handleShare = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl).catch(() => {})
    } else {
      handleSave()
    }
  }

  const handleLoadList = (list: SavedList) => {
    setGuests(list.guestCounts)
    loadItems(list.items)
    if (list.shareId) {
      setShareUrl(`${window.location.origin}/share/${list.shareId}`)
    }
  }

  const handleNewList = () => {
    resetAll()
    setGuests(null)
    setShareUrl(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <Header
        user={user}
        onLogout={logout}
        onShowSavedLists={() => setShowSavedLists(true)}
        onNewList={handleNewList}
      />

      <main className="max-w-4xl mx-auto px-4 py-6 gap-6 flex flex-col lg:grid lg:grid-cols-2 lg:items-start">
        {/* Guest form */}
        <div className="lg:sticky lg:top-20">
          <GuestForm onCalculate={handleCalculate} initialGuests={guests ?? undefined} />

          {hasCalculated && (
            <div className="mt-3 text-center">
              <button
                onClick={handleNewList}
                className="text-cream/40 hover:text-cream text-sm font-rubik transition-colors"
              >
                {t('newList')}
              </button>
            </div>
          )}
        </div>

        {/* Shopping list */}
        {hasCalculated && (
          <div id="shopping-list">
            <ShoppingList
              items={items}
              allergyGuests={guests?.allergyGuests ?? []}
              onUpdateQty={updateItemQty}
              onResetItem={resetItemQty}
              onTogglePurchased={togglePurchased}
              onSave={handleSave}
              onShare={handleShare}
              shareUrl={shareUrl}
              shareLoading={shareLoading}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      {showSavedLists && (
        <SavedListsModal
          lists={savedLists}
          onLoad={handleLoadList}
          onDelete={deleteList}
          onClose={() => setShowSavedLists(false)}
        />
      )}

      {showSaveModal && (
        <SaveModal onConfirm={handleSaveConfirm} onCancel={() => setShowSaveModal(false)} />
      )}

      {/* Toast */}
      {toast && <Toast messageKey={toast as TranslationKey} />}
    </div>
  )
}

// ── App root ───────────────────────────────────────────────────────────────────
function AppContent() {
  const shareId = getShareId()
  const { user, loading, error, signInWithGoogle } = useAuth()

  // Public share view — no auth needed
  if (shareId) {
    return <SharedListView shareId={shareId} />
  }

  if (loading) return <LoadingScreen />

  if (!user) {
    return <LoginPage onSignIn={signInWithGoogle} error={error} />
  }

  return <AuthenticatedApp />
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}
