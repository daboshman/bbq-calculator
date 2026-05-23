import { useI18n } from '../i18n/context'
import type { SavedList } from '../types'

interface Props {
  lists: SavedList[]
  onLoad: (list: SavedList) => void
  onDelete: (listId: string) => void
  onClose: () => void
}

function formatDate(date: Date, lang: string): string {
  try {
    return new Intl.DateTimeFormat(lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  } catch {
    return date.toLocaleDateString()
  }
}

export default function SavedListsModal({ lists, onLoad, onDelete, onClose }: Props) {
  const { t, lang } = useI18n()

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card-bg border border-card-border rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl animate-slide-up">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-card-border">
          <h2 className="text-lg font-bold text-ember font-rubik">{t('savedListsTitle')}</h2>
          <button
            onClick={onClose}
            className="text-cream/40 hover:text-cream text-2xl leading-none transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-card-border"
          >
            ×
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {lists.length === 0 ? (
            <div className="text-center text-cream/40 font-rubik py-8">{t('noSavedLists')}</div>
          ) : (
            lists.map((list) => (
              <div
                key={list.id}
                className="bg-charcoal rounded-2xl p-4 flex items-center gap-3 hover:bg-card-border/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-cream font-semibold font-rubik text-sm truncate">
                    {list.name}
                  </p>
                  <p className="text-cream/40 text-xs font-rubik mt-0.5">
                    {t('createdAt')}: {formatDate(list.updatedAt ?? list.createdAt, lang)}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      onLoad(list)
                      onClose()
                    }}
                    className="text-ember hover:text-ember/80 text-sm font-rubik font-semibold transition-colors px-3 py-1.5 rounded-xl hover:bg-ember/10"
                  >
                    {t('loadList')}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(t('confirmDelete'))) {
                        onDelete(list.id)
                      }
                    }}
                    className="text-red-400/50 hover:text-red-400 text-sm font-rubik transition-colors px-3 py-1.5 rounded-xl hover:bg-red-900/20"
                  >
                    {t('deleteList')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-card-border">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-charcoal hover:bg-card-border text-cream/60 hover:text-cream rounded-2xl text-sm font-rubik transition-colors"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  )
}
