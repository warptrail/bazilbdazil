import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { themes } from '../styles/theme'
import { preloadClownExperience } from '../utils/preloadClownExperience'
import {
  EXPERIENCE_MODES,
  EXPERIENCE_MODE_STORAGE_KEY,
  EXPERIENCE_TRANSITION_PHASES,
  EXPERIENCE_TRANSITION_TIMING,
  ExperienceModeContext,
  isExperienceMode,
  readStoredMode,
  readUrlMode,
  replaceUrlMode,
  resolveInitialMode,
  storeMode,
} from './experienceMode'

const idleTransition = Object.freeze({
  phase: EXPERIENCE_TRANSITION_PHASES.IDLE,
  targetMode: null,
})

function wait(duration) {
  return new Promise((resolve) => window.setTimeout(resolve, duration))
}

function waitForPaint() {
  return new Promise((resolve) => {
    let settled = false
    const fallbackTimer = window.setTimeout(finish, 120)

    function finish() {
      if (settled) return

      settled = true
      window.clearTimeout(fallbackTimer)
      resolve()
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(finish)
    })
  })
}

export function ExperienceModeProvider({ children }) {
  const [mode, setModeState] = useState(resolveInitialMode)
  const [transition, setTransition] = useState(idleTransition)
  const modeRef = useRef(mode)
  const transitionRequestRef = useRef(0)

  const setMode = useCallback((nextMode) => {
    if (!isExperienceMode(nextMode)) return

    modeRef.current = nextMode
    setModeState(nextMode)
    storeMode(nextMode)
    replaceUrlMode(nextMode)
  }, [])

  const transitionToMode = useCallback(
    async (nextMode) => {
      if (!isExperienceMode(nextMode) || nextMode === modeRef.current) return

      const requestId = transitionRequestRef.current + 1
      transitionRequestRef.current = requestId

      if (nextMode !== EXPERIENCE_MODES.CLOWN) {
        setMode(nextMode)
        setTransition(idleTransition)
        return
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setTransition({
        phase: EXPERIENCE_TRANSITION_PHASES.WARMING,
        targetMode: nextMode,
      })

      const assetWarmup = Promise.race([
        preloadClownExperience(),
        wait(EXPERIENCE_TRANSITION_TIMING.assetTimeout),
      ])

      await Promise.all([
        assetWarmup,
        reducedMotion ? Promise.resolve() : wait(EXPERIENCE_TRANSITION_TIMING.warmup),
      ])

      if (transitionRequestRef.current !== requestId) return

      setTransition({
        phase: EXPERIENCE_TRANSITION_PHASES.REVEALING,
        targetMode: nextMode,
      })

      if (!reducedMotion) await waitForPaint()
      if (transitionRequestRef.current !== requestId) return

      setMode(nextMode)

      if (!reducedMotion) {
        await waitForPaint()
        await wait(EXPERIENCE_TRANSITION_TIMING.reveal)
      }
      if (transitionRequestRef.current === requestId) setTransition(idleTransition)
    },
    [setMode],
  )

  const toggleMode = useCallback(() => {
    const nextMode =
      modeRef.current === EXPERIENCE_MODES.CLOWN
        ? EXPERIENCE_MODES.TAROT
        : EXPERIENCE_MODES.CLOWN

    transitionToMode(nextMode)
  }, [transitionToMode])

  useEffect(() => {
    const urlMode = readUrlMode()

    if (urlMode) {
      storeMode(urlMode)
    }

    function handlePopState() {
      const nextMode = readUrlMode() ?? readStoredMode() ?? EXPERIENCE_MODES.TAROT
      transitionRequestRef.current += 1
      modeRef.current = nextMode
      setModeState(nextMode)
      setTransition(idleTransition)
      storeMode(nextMode)
    }

    function handleStorage(event) {
      if (event.key !== EXPERIENCE_MODE_STORAGE_KEY || !isExperienceMode(event.newValue)) return

      transitionRequestRef.current += 1
      modeRef.current = event.newValue
      setModeState(event.newValue)
      setTransition(idleTransition)
      replaceUrlMode(event.newValue)
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  useEffect(() => {
    let idleRequest = 0
    let preloadTimer = 0

    const startPreload = () => {
      preloadClownExperience()
    }

    if ('requestIdleCallback' in window) {
      idleRequest = window.requestIdleCallback(startPreload, { timeout: 1200 })
    } else {
      preloadTimer = window.setTimeout(startPreload, 240)
    }

    return () => {
      transitionRequestRef.current += 1
      if (idleRequest) window.cancelIdleCallback(idleRequest)
      if (preloadTimer) window.clearTimeout(preloadTimer)
    }
  }, [])

  const value = useMemo(
    () => ({
      mode,
      isClownMode: mode === EXPERIENCE_MODES.CLOWN,
      isTransitioning: transition.phase !== EXPERIENCE_TRANSITION_PHASES.IDLE,
      transitionPhase: transition.phase,
      transitionTarget: transition.targetMode,
      setMode,
      transitionToMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode, transition, transitionToMode],
  )

  return (
    <ExperienceModeContext.Provider value={value}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </ExperienceModeContext.Provider>
  )
}
