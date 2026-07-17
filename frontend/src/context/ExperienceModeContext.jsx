import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { themes } from '../styles/theme'
import {
  EXPERIENCE_MODES,
  EXPERIENCE_MODE_STORAGE_KEY,
  ExperienceModeContext,
  isExperienceMode,
  readStoredMode,
  readUrlMode,
  replaceUrlMode,
  resolveInitialMode,
  storeMode,
} from './experienceMode'

export function ExperienceModeProvider({ children }) {
  const [mode, setModeState] = useState(resolveInitialMode)

  const setMode = useCallback((nextMode) => {
    if (!isExperienceMode(nextMode)) return

    setModeState(nextMode)
    storeMode(nextMode)
    replaceUrlMode(nextMode)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(mode === EXPERIENCE_MODES.CLOWN ? EXPERIENCE_MODES.TAROT : EXPERIENCE_MODES.CLOWN)
  }, [mode, setMode])

  useEffect(() => {
    const urlMode = readUrlMode()

    if (urlMode) {
      storeMode(urlMode)
    }

    function handlePopState() {
      const nextMode = readUrlMode() ?? readStoredMode() ?? EXPERIENCE_MODES.TAROT
      setModeState(nextMode)
      storeMode(nextMode)
    }

    function handleStorage(event) {
      if (event.key !== EXPERIENCE_MODE_STORAGE_KEY || !isExperienceMode(event.newValue)) return

      setModeState(event.newValue)
      replaceUrlMode(event.newValue)
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const value = useMemo(
    () => ({
      mode,
      isClownMode: mode === EXPERIENCE_MODES.CLOWN,
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  )

  return (
    <ExperienceModeContext.Provider value={value}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </ExperienceModeContext.Provider>
  )
}
