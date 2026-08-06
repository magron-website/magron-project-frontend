import { useTranslation } from 'react-i18next'
import { useInstallPrompt } from '@/pwa/useInstallPrompt'
import '@/assets/design/install-prompt.css'

/**
 * Invites the visitor to install the site to their home screen.
 *
 * Renders nothing until the browser says an install is actually possible (or the
 * visitor is on iOS, which offers no API and needs the Share-sheet steps
 * spelled out), so it stays out of the way on desktop and for anyone who has
 * already installed it.
 */
export default function InstallPrompt() {
  const { t } = useTranslation('pwa')
  const { mode, install, dismiss } = useInstallPrompt()

  if (!mode) return null

  return (
    <div className="install-prompt" role="dialog" aria-label={t('title')}>
      <img
        className="install-prompt__icon"
        src={`${import.meta.env.BASE_URL}icons/icon-192.png`}
        alt=""
      />

      <div className="install-prompt__body">
        <p className="install-prompt__title">{t('title')}</p>
        <p className="install-prompt__text">
          {mode === 'ios' ? t('iosDescription') : t('description')}
        </p>
      </div>

      <div className="install-prompt__actions">
        {mode === 'prompt' ? (
          <button type="button" className="install-prompt__install" onClick={install}>
            {t('install')}
          </button>
        ) : null}
        <button
          type="button"
          className="install-prompt__close"
          aria-label={t('close')}
          onClick={dismiss}
        >
          ×
        </button>
      </div>
    </div>
  )
}
