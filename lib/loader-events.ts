export const LOADER_COMPLETE_EVENT = "origyn:loader-complete"

type LoaderWindow = Window & { __origynLoaderDone?: boolean }

export function markLoaderComplete() {
  if (typeof window === "undefined") return
  ;(window as LoaderWindow).__origynLoaderDone = true
  window.dispatchEvent(new CustomEvent(LOADER_COMPLETE_EVENT))
}

export function waitForLoaderComplete(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {}

  if ((window as LoaderWindow).__origynLoaderDone) {
    callback()
    return () => {}
  }

  window.addEventListener(LOADER_COMPLETE_EVENT, callback, { once: true })
  return () => window.removeEventListener(LOADER_COMPLETE_EVENT, callback)
}
