import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { focusVisible, labelText } from '../../styles/primitives'

const CAL_NAMESPACE = '15min'

const calendarScan = keyframes`
  0%, 68% { opacity: 0; transform: translateY(-2rem); }
  74% { opacity: 0.62; }
  92% { opacity: 0; transform: translateY(48rem); }
  100% { opacity: 0; }
`

export function CalBookingEmbed({ calLink, compact = false }) {
  const [isInteractive, setIsInteractive] = useState(false)
  const embedShellRef = useRef(null)
  const scrollGateRef = useRef(null)

  useEffect(() => {
    async function configureCalUi() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }

    configureCalUi()
  }, [])

  const activateCalendar = () => {
    setIsInteractive(true)
    window.dispatchEvent(new CustomEvent('orbit-native-scroll', {
      detail: { locked: true, chapterId: 'book' },
    }))
    window.requestAnimationFrame(() => {
      embedShellRef.current?.querySelector('iframe')?.focus()
    })
  }

  const releaseCalendar = () => {
    setIsInteractive(false)
    window.dispatchEvent(new CustomEvent('orbit-native-scroll', {
      detail: { locked: false, chapterId: 'book' },
    }))
    window.requestAnimationFrame(() => scrollGateRef.current?.focus({ preventScroll: true }))
  }

  return (
    <EmbedShell
      ref={embedShellRef}
      $interactive={isInteractive}
      $compact={compact}
      data-orbit-native-scroll={isInteractive ? 'true' : undefined}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') setIsInteractive(false)
      }}
    >
      <StyledCal
        namespace={CAL_NAMESPACE}
        calLink={calLink}
        $compact={compact}
        config={{
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
        }}
      />
      {isInteractive ? (
        <ReleaseScrollRail>
          <ReleaseScrollControl type="button" onClick={releaseCalendar}>
            Release page scroll
          </ReleaseScrollControl>
        </ReleaseScrollRail>
      ) : (
        <CalendarScrollGate
          ref={scrollGateRef}
          type="button"
          onClick={activateCalendar}
        >
          <GateLabel>Scroll normally · select to use the calendar</GateLabel>
        </CalendarScrollGate>
      )}
    </EmbedShell>
  )
}

const EmbedShell = styled.div`
  position: relative;
  isolation: isolate;
  min-width: 0;
  overflow: clip;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    ${({ theme }) => theme.colors.gradients.starfield},
    ${({ theme }) => theme.colors.background.embed};
  box-shadow: ${({ theme }) => theme.shadows.glass};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    ${({ $compact, $interactive }) =>
      $compact &&
      `
        block-size: clamp(24rem, calc(var(--journey-viewport-block) - 20rem), 32rem);
        overflow-y: ${$interactive ? 'auto' : 'clip'};
        overscroll-behavior: contain;
      `}
  }

  iframe {
    pointer-events: ${({ $interactive }) => ($interactive ? 'auto' : 'none')};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0 ${({ theme }) => theme.spacing.sm};
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    height: ${({ theme }) => theme.borders.width.thin};
    background: ${({ theme }) => theme.colors.gradients.goldLine};
    box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.cyanGlow};
    opacity: 0;
    pointer-events: none;
    animation: ${calendarScan} 12s ${({ theme }) => theme.motion.easing.enter} infinite;
  }

  &::after {
    content: '✦';
    position: absolute;
    top: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.md};
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    color: ${({ theme }) => theme.colors.accent.metalBright};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    filter: drop-shadow(0 0 0.6rem ${({ theme }) => theme.colors.effects.goldGlow});
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }

  @media (forced-colors: active) {
    border-color: CanvasText;
    background: Canvas;
    box-shadow: none;

    &::before,
    &::after {
      display: none;
    }
  }
`

const StyledCal = styled(Cal)`
  width: 100%;
  min-height: 42rem;
  overflow: visible;
  overscroll-behavior: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: ${({ theme }) => theme.radii.lg};

  ${({ $compact }) =>
    $compact &&
    `
      min-height: clamp(30rem, calc(var(--journey-viewport-block) - 7rem), 36rem);
    `}

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    min-height: ${({ $compact }) => ($compact
      ? 'clamp(30rem, calc(var(--journey-viewport-block) - 7rem), 36rem)'
      : '48rem')};
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-height: ${({ $compact }) => ($compact
      ? 'clamp(28rem, calc(var(--journey-viewport-block) - 15rem), 34rem)'
      : '42rem')};
  }
`

const CalendarScrollGate = styled.button`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: grid;
  align-items: start;
  justify-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  border: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: transparent;
  cursor: pointer;
  touch-action: pan-y;
  ${focusVisible}

  @media (forced-colors: active) {
    background: transparent;
  }
`

const GateLabel = styled.span`
  position: sticky;
  top: calc(${({ theme }) => theme.layout.headerOffset} + ${({ theme }) => theme.spacing.lg});
  display: block;
  width: max-content;
  max-width: 100%;
  margin-inline: auto;
  ${labelText}
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: ${({ theme }) => theme.shadows.surfaceInset};
`

const ReleaseScrollRail = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  padding: ${({ theme }) => theme.spacing.lg};
  pointer-events: none;
`

const ReleaseScrollControl = styled.button`
  position: sticky;
  top: calc(${({ theme }) => theme.layout.headerOffset} + ${({ theme }) => theme.spacing.lg});
  display: block;
  width: max-content;
  margin-left: auto;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: ${({ theme }) => theme.shadows.metalHover};
  pointer-events: auto;
  ${labelText}
  ${focusVisible}

  @media (forced-colors: active) {
    border-color: ButtonText;
    color: ButtonText;
    background: ButtonFace;
    box-shadow: none;
  }
`
