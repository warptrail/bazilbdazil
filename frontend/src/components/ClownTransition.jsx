import styled, { css, keyframes } from 'styled-components'
import {
  EXPERIENCE_MODES,
  EXPERIENCE_TRANSITION_PHASES,
  EXPERIENCE_TRANSITION_TIMING,
} from '../context/experienceMode'

export function ClownTransition({ phase, targetMode }) {
  const isActive =
    targetMode === EXPERIENCE_MODES.CLOWN &&
    phase !== EXPERIENCE_TRANSITION_PHASES.IDLE

  if (!isActive) return null

  const isRevealing = phase === EXPERIENCE_TRANSITION_PHASES.REVEALING

  return (
    <TransitionLayer
      role="status"
      aria-live="polite"
      aria-atomic="true"
      $revealing={isRevealing}
    >
      <TransitionFrame aria-hidden="true" $revealing={isRevealing}>
        <BorderRail $edge="north" />
        <BorderRail $edge="east" />
        <BorderRail $edge="south" />
        <BorderRail $edge="west" />
        <CornerSeal $corner="northWest">✦</CornerSeal>
        <CornerSeal $corner="northEast">☉</CornerSeal>
        <CornerSeal $corner="southWest">☾</CornerSeal>
        <CornerSeal $corner="southEast">◇</CornerSeal>
      </TransitionFrame>

      <WarmupInstrument $revealing={isRevealing}>
        <WarmupOrbit aria-hidden="true">
          <WarmupRing />
          <WarmupRing $inner />
          <WarmupGlyph>※</WarmupGlyph>
        </WarmupOrbit>
        <WarmupCopy>
          <WarmupLabel>
            {isRevealing ? 'Protocol breach' : 'The frame is loosening'}
          </WarmupLabel>
          <WarmupTitle>
            {isRevealing
              ? 'Clown mode has entered the room.'
              : 'Preparing the other room.'}
          </WarmupTitle>
          <WarmupNote>
            {isRevealing
              ? 'Stand by for independent acts of transformation.'
              : 'Warming the stage, decoding the wardrobe, checking the exits.'}
          </WarmupNote>
        </WarmupCopy>
        <ChargeRail aria-hidden="true">
          <ChargeFill $revealing={isRevealing} />
        </ChargeRail>
      </WarmupInstrument>
    </TransitionLayer>
  )
}

const frameCharge = keyframes`
  0% {
    opacity: 0.34;
    filter: hue-rotate(0deg) brightness(0.78);
    transform: scale(0.986);
  }

  58% {
    opacity: 0.82;
    filter: hue-rotate(26deg) brightness(1.08);
    transform: scale(0.996);
  }

  84% {
    opacity: 1;
    filter: hue-rotate(72deg) brightness(1.28);
    transform: scale(1.004);
  }

  100% {
    opacity: 0.92;
    filter: hue-rotate(112deg) brightness(1.16);
    transform: scale(1);
  }
`

const breachFlash = keyframes`
  0% { opacity: 1; filter: brightness(1.45) saturate(1.25); }
  22% { opacity: 0.76; filter: brightness(2.1) saturate(1.8) hue-rotate(48deg); }
  100% { opacity: 0; filter: brightness(1.1) saturate(1.1) hue-rotate(126deg); }
`

const thresholdRumble = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  18% { transform: translate3d(-1px, 1px, 0) rotate(-0.12deg); }
  38% { transform: translate3d(1px, 0, 0) rotate(0.1deg); }
  58% { transform: translate3d(0, -1px, 0) rotate(-0.08deg); }
  78% { transform: translate3d(1px, 1px, 0) rotate(0.06deg); }
`

const orbitCharge = keyframes`
  0% { transform: rotate(0deg) scale(0.86); filter: hue-rotate(0deg); }
  74% { transform: rotate(248deg) scale(1.04); filter: hue-rotate(46deg); }
  100% { transform: rotate(360deg) scale(1); filter: hue-rotate(92deg); }
`

const chargeAdvance = keyframes`
  from { transform: scaleX(0.04); }
  to { transform: scaleX(1); }
`

const chargeAdvanceVertical = keyframes`
  from { transform: scaleY(0.04); }
  to { transform: scaleY(1); }
`

const TransitionLayer = styled.aside`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.transition};
  display: grid;
  place-items: center;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 46%, transparent 0 18%, ${({ theme }) => theme.colors.effects.violetGlowSoft} 54%, transparent 76%),
    ${({ theme }) => theme.colors.effects.inkVeil};
  backdrop-filter: blur(0.14rem) saturate(1.12);
  animation: ${({ $revealing }) =>
    $revealing
      ? css`${breachFlash} ${EXPERIENCE_TRANSITION_TIMING.reveal}ms ease-out forwards`
      : css`${thresholdRumble} 180ms linear infinite`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.94;
    backdrop-filter: none;
  }

  @media (forced-colors: active) {
    background: Canvas;
    color: CanvasText;
    backdrop-filter: none;
  }
`

const TransitionFrame = styled.div`
  position: absolute;
  inset: ${({ theme }) => theme.layout.frameInset};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow:
    inset 0 0 2.5rem ${({ theme }) => theme.colors.effects.goldGlowSoft},
    0 0 1.2rem ${({ theme }) => theme.colors.effects.goldGlow},
    0 0 4rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  animation: ${frameCharge} ${EXPERIENCE_TRANSITION_TIMING.warmup}ms
    ${({ theme }) => theme.motion.easing.enter} both;

  ${({ $revealing }) =>
    $revealing &&
    css`
      animation-duration: ${EXPERIENCE_TRANSITION_TIMING.reveal}ms;
      animation-direction: reverse;
    `}

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: ${({ theme }) => theme.spacing.sm};
    border: inherit;
    border-color: ${({ theme }) => theme.colors.border.etched};
    border-radius: inherit;
  }

  &::after {
    inset: ${({ theme }) => theme.spacing.lg};
    border-color: ${({ theme }) => theme.colors.border.signal};
    opacity: 0.48;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const BorderRail = styled.span`
  position: absolute;
  display: block;
  background: ${({ theme }) => theme.colors.gradients.goldLine};
  box-shadow:
    0 0 0.8rem ${({ theme }) => theme.colors.effects.goldGlow},
    0 0 1.8rem ${({ theme }) => theme.colors.effects.violetGlowSoft};

  ${({ $edge }) =>
    $edge === 'north' || $edge === 'south'
      ? css`
          right: 2%;
          left: 2%;
          height: 2px;
          ${$edge === 'north' ? 'top' : 'bottom'}: 0;
          transform-origin: ${$edge === 'north' ? 'left' : 'right'} center;
          animation: ${chargeAdvance} ${EXPERIENCE_TRANSITION_TIMING.warmup}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        `
      : css`
          top: 2%;
          bottom: 2%;
          width: 2px;
          ${$edge === 'east' ? 'right' : 'left'}: 0;
          transform-origin: center ${$edge === 'east' ? 'top' : 'bottom'};
          animation: ${chargeAdvanceVertical} ${EXPERIENCE_TRANSITION_TIMING.warmup}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CornerSeal = styled.span`
  position: absolute;
  ${({ $corner }) => ($corner.includes('north') ? 'top' : 'bottom')}: -0.62rem;
  ${({ $corner }) => ($corner.includes('West') ? 'left' : 'right')}: -0.62rem;
  display: grid;
  width: 1.25rem;
  aspect-ratio: 1;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.metalPale};
  background: ${({ theme }) => theme.colors.background.canvas};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.goldGlow};
`

const WarmupInstrument = styled.div`
  position: relative;
  display: grid;
  width: min(32rem, calc(100vw - 3rem));
  gap: ${({ theme }) => theme.spacing.xl};
  justify-items: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
  transition:
    opacity ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  ${({ $revealing }) =>
    $revealing &&
    css`
      opacity: 0.72;
      transform: scale(1.045);
    `}
`

const WarmupOrbit = styled.div`
  position: relative;
  display: grid;
  width: 6.5rem;
  aspect-ratio: 1;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: radial-gradient(circle, ${({ theme }) => theme.colors.effects.goldGlowSoft}, transparent 66%);
  box-shadow:
    inset 0 0 1.8rem ${({ theme }) => theme.colors.effects.goldGlowSoft},
    0 0 2.4rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  animation: ${orbitCharge} ${EXPERIENCE_TRANSITION_TIMING.warmup}ms
    ${({ theme }) => theme.motion.easing.enter} both;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 142%;
    height: ${({ theme }) => theme.borders.width.thin};
    background: ${({ theme }) => theme.colors.gradients.goldLine};
  }

  &::after {
    transform: rotate(90deg);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const WarmupRing = styled.span`
  position: absolute;
  inset: ${({ $inner }) => ($inner ? '31%' : '14%')};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $inner }) =>
      $inner ? theme.colors.border.signal : theme.colors.border.violetStrong};
  border-radius: ${({ theme }) => theme.radii.orbital};
  border-style: ${({ $inner }) => ($inner ? 'solid' : 'dashed')};
`

const WarmupGlyph = styled.span`
  color: ${({ theme }) => theme.colors.accent.metalPale};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-shadow: 0 0 0.85rem ${({ theme }) => theme.colors.effects.goldGlow};
`

const WarmupCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

const WarmupLabel = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent.metalBright};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
  text-transform: uppercase;
`

const WarmupTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.9rem, 7vw, 3.4rem);
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  text-wrap: balance;
`

const WarmupNote = styled.p`
  max-width: 38ch;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.body};
  text-wrap: balance;
`

const ChargeRail = styled.div`
  width: min(18rem, 82%);
  height: ${({ theme }) => theme.borders.width.medium};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.border.surfaceRaised};
`

const ChargeFill = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left;
  background: ${({ theme }) => theme.colors.gradients.spectralText};
  box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.goldGlow};
  animation: ${chargeAdvance}
    ${({ $revealing }) =>
      $revealing
        ? `${EXPERIENCE_TRANSITION_TIMING.reveal}ms`
        : `${EXPERIENCE_TRANSITION_TIMING.warmup}ms`}
    ${({ theme }) => theme.motion.easing.enter} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
