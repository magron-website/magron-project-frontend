import { useCallback, useEffect, useState } from 'react'

/**
 * Chromium's install event. Not in lib.dom, so it is declared here.
 * Calling `prompt()` opens the browser's own "홈 화면에 추가" dialog.
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  prompt: () => Promise<void>
}

const DISMISSED_KEY = 'magron-install-dismissed'

/** Closing the banner hides it for two weeks rather than forever. */
const DISMISS_DAYS = 14

/** iPadOS 13+ reports a Mac user agent, so touch support is the tell. */
function detectIos() {
  const ua = navigator.userAgent
  return (
    /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)
  )
}

/** True once the site is launched from the home screen instead of a browser tab. */
function detectStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari never implemented display-mode and uses this instead.
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function wasRecentlyDismissed() {
  const stored = window.localStorage.getItem(DISMISSED_KEY)
  if (!stored) return false

  const dismissedAt = Number(stored)
  if (!Number.isFinite(dismissedAt)) return false

  return Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000
}

/**
 * Drives the "홈 화면에 추가" banner.
 *
 * Two very different browsers to serve: Chromium fires `beforeinstallprompt` and
 * installs through `prompt()`, while iOS Safari has no API at all and can only
 * be told where the Share-sheet item is. `mode` says which of the two the caller
 * is looking at, or null when there is nothing to offer — already installed,
 * recently dismissed, or a browser that cannot install.
 */
export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIos, setIsIos] = useState(false)
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    if (detectStandalone() || wasRecentlyDismissed()) return

    setIsIos(detectIos())
    setIsDismissed(false)

    const onBeforeInstallPrompt = (event: Event) => {
      // Without this Chrome shows its own mini-infobar instead of our banner.
      event.preventDefault()
      setPromptEvent(event as BeforeInstallPromptEvent)
    }

    const onInstalled = () => {
      setPromptEvent(null)
      setIsDismissed(true)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = useCallback(async () => {
    if (!promptEvent) return

    await promptEvent.prompt()
    const { outcome } = await promptEvent.userChoice

    // The event is single-use: Chrome fires a fresh one if the user declines.
    setPromptEvent(null)
    if (outcome === 'dismissed') {
      window.localStorage.setItem(DISMISSED_KEY, String(Date.now()))
      setIsDismissed(true)
    }
  }, [promptEvent])

  const dismiss = useCallback(() => {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now()))
    setIsDismissed(true)
  }, [])

  const mode: 'prompt' | 'ios' | null = isDismissed
    ? null
    : promptEvent
      ? 'prompt'
      : isIos
        ? 'ios'
        : null

  return { mode, install, dismiss }
}
