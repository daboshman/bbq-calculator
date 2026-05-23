import type { User } from 'firebase/auth'
import { useI18n } from '../i18n/context'
import LanguageSwitcher from './LanguageSwitcher'

interface Props {
  user: User
  onLogout: () => void
  onShowSavedLists: () => void
  onNewList: () => void
}

export default function Header({ user, onLogout, onShowSavedLists, onNewList }: Props) {
  const { t } = useI18n()

  return (
    <header className="bg-card-bg border-b border-card-border sticky top-0 z-50 shadow-lg shadow-black/30 print:hidden">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo + title */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-2xl animate-flicker inline-block select-none"
            role="img"
            aria-label="BBQ flame"
          >
            🔥
          </span>
          <h1 className="text-lg font-bold text-ember font-rubik tracking-wide leading-none">
            {t('appName')}
          </h1>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <button
            onClick={onNewList}
            className="hidden sm:block text-cream/60 hover:text-cream text-sm font-rubik transition-colors px-2 py-1 rounded-lg hover:bg-card-border"
          >
            {t('newList')}
          </button>

          <button
            onClick={onShowSavedLists}
            className="hidden sm:block text-cream/60 hover:text-cream text-sm font-rubik transition-colors px-2 py-1 rounded-lg hover:bg-card-border"
          >
            {t('savedLists')}
          </button>

          {/* User info */}
          <div className="flex items-center gap-2 ms-1">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName ?? ''}
                className="w-8 h-8 rounded-full ring-2 ring-card-border"
                referrerPolicy="no-referrer"
              />
            )}
            <span className="text-cream/60 text-sm font-rubik hidden md:block max-w-[120px] truncate">
              {user.displayName}
            </span>
            <button
              onClick={onLogout}
              className="text-cream/40 hover:text-red-400 text-sm font-rubik transition-colors px-2 py-1 rounded-lg hover:bg-red-900/20"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
