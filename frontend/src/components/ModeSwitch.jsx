import styled, { css, keyframes } from 'styled-components'
import {
  EXPERIENCE_MODES,
  EXPERIENCE_TRANSITION_PHASES,
} from '../context/experienceMode'
import { useExperienceMode } from '../context/useExperienceMode'
import { focusVisible } from '../styles/primitives'

export function ModeSwitch({ compact = false, cornerMounted = false }) {
  const {
    isClownMode,
    isTransitioning,
    toggleMode,
    transitionPhase,
    transitionTarget,
  } = useExperienceMode()
  const isWarming =
    transitionTarget === EXPERIENCE_MODES.CLOWN &&
    transitionPhase === EXPERIENCE_TRANSITION_PHASES.WARMING
  const actionLabel = isTransitioning
    ? 'Clown mode is warming up'
    : isClownMode
      ? 'Return to tarot'
      : 'Release the clown'

  return (
    <SwitchButton
      type="button"
      aria-label={actionLabel}
      aria-pressed={isClownMode}
      aria-busy={isTransitioning || undefined}
      disabled={isTransitioning}
      onClick={toggleMode}
      $active={isClownMode}
      $compact={compact}
      $cornerMounted={cornerMounted}
      $warming={isWarming}
    >
      <SwitchMechanism aria-hidden="true" $compact={compact}>
        <SwitchOrbit
          $active={isClownMode}
          $cornerMounted={cornerMounted}
          $warming={isWarming}
        />
        <SwitchDot $active={isClownMode} $warming={isWarming} />
      </SwitchMechanism>
    </SwitchButton>
  )
}

const circuitFlash = keyframes`
  0%, 68%, 76%, 100% {
    opacity: 0.16;
    transform: scale(0.86);
  }

  70% {
    opacity: 0.58;
    transform: scale(1.04);
  }

  73% {
    opacity: 0.24;
    transform: scale(0.92);
  }
`

const switchWarmup = keyframes`
  0% { filter: hue-rotate(0deg) brightness(0.9); transform: scale(0.92); }
  58% { filter: hue-rotate(36deg) brightness(1.28); transform: scale(1.06); }
  100% { filter: hue-rotate(96deg) brightness(1.16); transform: scale(1); }
`

const dotWarning = keyframes`
  0%, 100% { opacity: 0.52; transform: scale(0.72); }
  35% { opacity: 1; transform: scale(1.28); }
  62% { opacity: 0.74; transform: scale(0.9); }
`

const SwitchButton = styled.button`
  position: relative;
  isolation: isolate;
  display: grid;
  width: 2.75rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: transparent;
  box-shadow: none;
  ${focusVisible}
  transition:
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    box-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.standard},
    filter ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.standard};

  ${({ $warming, theme }) =>
    $warming &&
    css`
      filter: drop-shadow(0 0 1rem ${theme.colors.effects.goldGlow});
      animation: ${switchWarmup} 1.4s ${theme.motion.easing.enter} both;
    `}

  &::before {
    content: '';
    position: absolute;
    inset: ${({ $compact }) => ($compact ? '0.55rem' : '0.3rem')};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme, $active, $cornerMounted }) =>
        $active
          ? theme.colors.border.violetStrong
          : $cornerMounted
            ? theme.colors.border.signal
            : theme.colors.border.filigree};
    border-radius: inherit;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.background.surfaceRaised},
      ${({ theme }) => theme.colors.background.canvas} 72%
    );
    box-shadow:
      0 0.4rem 1.2rem ${({ theme }) => theme.colors.effects.inkVeil},
      0 0 1rem ${({ theme, $active, $cornerMounted }) =>
        $active
          ? theme.colors.effects.violetGlowSoft
          : $cornerMounted
            ? theme.colors.effects.cyanGlow
            : theme.colors.effects.acidGlowSoft};
    opacity: 0.8;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0.4rem;
    border-radius: inherit;
    box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.cyanGlow};
    opacity: ${({ $cornerMounted }) => ($cornerMounted ? 0.16 : 0)};
    pointer-events: none;
    animation: ${({ $cornerMounted }) => ($cornerMounted ? circuitFlash : 'none')}
      ${({ theme }) => theme.motion.duration.twinkle} ${({ theme }) => theme.motion.easing.enter}
      infinite;
  }

  @media (hover: hover) {
    &:hover {
      filter: brightness(1.16);
      transform: translateY(${({ theme }) => theme.layout.hoverLift}) rotate(8deg);
    }
  }

  &:active {
    transform: translateY(${({ theme }) => theme.layout.activeDepth});
  }

  &:disabled {
    cursor: progress;
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &:hover,
    &:active {
      transform: none;
    }
  }

  @media (forced-colors: active) {
    background: Canvas;
    box-shadow: none;

    &::before {
      border-color: CanvasText;
    }

    &::after {
      display: none;
    }
  }
`

const SwitchMechanism = styled.span`
  position: relative;
  z-index: 1;
  display: grid;
  width: ${({ $compact }) => ($compact ? '1rem' : '1.45rem')};
  aspect-ratio: 1;
  place-items: center;
`

const SwitchOrbit = styled.span`
  position: absolute;
  inset: 0;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $active, $cornerMounted }) =>
      $active
        ? theme.colors.accent.rose
        : $cornerMounted
          ? theme.colors.accent.signal
          : theme.colors.accent.metal};
  border-color: ${({ theme, $active, $cornerMounted }) =>
    $active
      ? `${theme.colors.accent.rose} transparent ${theme.colors.accent.signal}`
      : `${$cornerMounted ? theme.colors.accent.signal : theme.colors.accent.metal} transparent ${theme.colors.accent.acid}`};
  border-radius: ${({ theme }) => theme.radii.orbital};
  animation: ${keyframes`
    to { transform: rotate(1turn); }
  `} ${({ theme, $warming }) =>
      $warming ? theme.motion.duration.glint : theme.motion.duration.orbit} ${({ theme }) => theme.motion.easing.ambient}
    infinite ${({ $active }) => ($active ? 'reverse' : 'normal')};

  &::after {
    content: '';
    position: absolute;
    top: -0.12rem;
    left: 50%;
    width: 0.24rem;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme, $active, $cornerMounted }) =>
      $active
        ? theme.colors.accent.rose
        : $cornerMounted
          ? theme.colors.accent.acid
          : theme.colors.accent.metalPale};
    box-shadow: 0 0 0.45rem ${({ theme, $cornerMounted }) =>
      $cornerMounted ? theme.colors.effects.cyanGlow : theme.colors.effects.goldGlow};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const SwitchDot = styled.span`
  position: relative;
  width: 0.48rem;
  aspect-ratio: 1;
  flex: 0 0 auto;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent.rose : theme.colors.accent.acid};
  box-shadow: 0 0 0.55rem
    ${({ theme, $active }) =>
      $active ? theme.colors.effects.violetGlowSoft : theme.colors.effects.acidGlowSoft};
  animation: ${keyframes`
    0%, 100% { transform: scale(0.82); }
    50% { transform: scale(1.18); }
  `} ${({ theme }) => theme.motion.duration.twinkle} ${({ theme }) => theme.motion.easing.enter}
    infinite;

  ${({ $warming, theme }) =>
    $warming &&
    css`
      background: ${theme.colors.accent.metalPale};
      box-shadow:
        0 0 0.8rem ${theme.colors.effects.goldGlow},
        0 0 1.4rem ${theme.colors.effects.violetGlowSoft};
      animation: ${dotWarning} ${theme.motion.duration.glint} ${theme.motion.easing.enter}
        infinite;
    `}

  &::before {
    content: '';
    position: absolute;
    inset: -0.26rem;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.filigree};
    border-radius: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
