import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const CAL_NAMESPACE = '15min'

const calendarScan = keyframes`
  0%, 68% { opacity: 0; transform: translateY(-2rem); }
  74% { opacity: 0.62; }
  92% { opacity: 0; transform: translateY(48rem); }
  100% { opacity: 0; }
`

export function CalBookingEmbed({ calLink }) {
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

  return (
    <EmbedShell>
      <StyledCal
        namespace={CAL_NAMESPACE}
        calLink={calLink}
        config={{
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
        }}
      />
    </EmbedShell>
  )
}

const EmbedShell = styled.div`
  position: relative;
  isolation: isolate;
  min-width: 0;
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    ${({ theme }) => theme.colors.gradients.starfield},
    ${({ theme }) => theme.colors.background.embed};
  box-shadow: ${({ theme }) => theme.shadows.glass};

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
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  border-radius: ${({ theme }) => theme.radii.lg};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    min-height: 48rem;
  }
`
