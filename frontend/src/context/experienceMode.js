import { createContext } from 'react'

export const EXPERIENCE_MODES = Object.freeze({
  TAROT: 'tarot',
  CLOWN: 'clown',
})

export const EXPERIENCE_MODE_STORAGE_KEY = 'bazil-experience-mode'
export const ExperienceModeContext = createContext(null)

const validModes = new Set(Object.values(EXPERIENCE_MODES))

export function isExperienceMode(value) {
  return validModes.has(value)
}

export function readUrlMode() {
  if (typeof window === 'undefined') return null

  const value = new URL(window.location.href).searchParams.get('mode')
  return isExperienceMode(value) ? value : null
}

export function readStoredMode() {
  if (typeof window === 'undefined') return null

  try {
    const value = window.localStorage.getItem(EXPERIENCE_MODE_STORAGE_KEY)
    return isExperienceMode(value) ? value : null
  } catch {
    return null
  }
}

export function resolveInitialMode() {
  return readUrlMode() ?? readStoredMode() ?? EXPERIENCE_MODES.TAROT
}

export function storeMode(mode) {
  try {
    window.localStorage.setItem(EXPERIENCE_MODE_STORAGE_KEY, mode)
  } catch {
    // The mode remains usable for this tab when storage is unavailable.
  }
}

export function replaceUrlMode(mode) {
  const url = new URL(window.location.href)
  url.searchParams.set('mode', mode)
  window.history.replaceState(window.history.state, '', url)
}
