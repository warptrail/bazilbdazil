import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Schedules a restrained ambient pulse and exposes an imperative trigger for pointer-led magic.
 * Motion preferences are observed at runtime so decorative transformations stop immediately.
 */
export function useArcanePulse({ intervalMs = 8400, durationMs = 1800 } = {}) {
  const [isPulsing, setIsPulsing] = useState(false)
  const [allowsMotion, setAllowsMotion] = useState(() =>
    typeof window === 'undefined'
      ? true
      : !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const pulseTimeoutRef = useRef(0)

  const triggerPulse = useCallback(() => {
    if (typeof window === 'undefined') return

    window.clearTimeout(pulseTimeoutRef.current)
    setIsPulsing(true)
    pulseTimeoutRef.current = window.setTimeout(() => setIsPulsing(false), durationMs)
  }, [durationMs])

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setAllowsMotion(!motionQuery.matches)

    motionQuery.addEventListener('change', updateMotionPreference)
    return () => motionQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!allowsMotion) return undefined

    const openingDelay = window.setTimeout(triggerPulse, Math.min(intervalMs * 0.42, 3200))
    const pulseInterval = window.setInterval(triggerPulse, intervalMs)

    return () => {
      window.clearTimeout(openingDelay)
      window.clearInterval(pulseInterval)
      window.clearTimeout(pulseTimeoutRef.current)
    }
  }, [allowsMotion, intervalMs, triggerPulse])

  return { allowsMotion, isPulsing, triggerPulse }
}
