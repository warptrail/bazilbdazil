import styled, { css, keyframes } from 'styled-components'

const chipGloss = keyframes`
  from { transform: translateX(-145%) skewX(-18deg); }
  to { transform: translateX(185%) skewX(-18deg); }
`

const eclipseAwaken = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  45% { transform: translateY(-2px) scale(1.035); }
`

const heckleKick = keyframes`
  0%, 100% { transform: rotate(0); }
  35% { transform: rotate(-2.5deg) translateY(-2px); }
  65% { transform: rotate(1.5deg) translateY(-1px); }
`

const anchorDrop = keyframes`
  0%, 100% { transform: translateY(0); }
  48% { transform: translateY(3px); }
  72% { transform: translateY(-1px); }
`

const compassTurn = keyframes`
  0%, 100% { transform: rotate(0); }
  52% { transform: rotate(3deg) scale(0.985); }
`

const curtainSway = keyframes`
  0%, 100% { transform: skewX(0); }
  40% { transform: skewX(-2deg) translateY(-1px); }
  70% { transform: skewX(1deg); }
`

const nuisanceGlitch = keyframes`
  0%, 100% { transform: translate(0); }
  32% { transform: translate(2px, -1px); }
  36% { transform: translate(-1px, 1px); }
  64% { transform: translate(1px, 0); }
`

const portalOpen = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scaleX(1.045) scaleY(0.97); }
`

const questionFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  45% { transform: translateY(-3px); }
`

const effectMotion = {
  eclipse: eclipseAwaken,
  heckle: heckleKick,
  anchor: anchorDrop,
  compass: compassTurn,
  curtain: curtainSway,
  nuisance: nuisanceGlitch,
  portal: portalOpen,
  question: questionFloat,
}

/**
 * A reusable, accessible toggle chip for short labels and optional decorative glyphs.
 * The component is theme-driven and keeps its active state controlled by its parent.
 */
export function RitualChip({
  label,
  glyph,
  isActive = false,
  effect = 'eclipse',
  actionLabel,
  onToggle,
}) {
  return (
    <ChipButton
      type="button"
      $active={isActive}
      $effect={effect}
      aria-pressed={isActive}
      aria-label={actionLabel || label}
      onClick={onToggle}
    >
      {glyph ? <ChipGlyph aria-hidden="true">{glyph}</ChipGlyph> : null}
      <ChipLabel>{label}</ChipLabel>
    </ChipButton>
  )
}

const ChipButton = styled.button`
  --chip-cut: ${({ theme }) => theme.radii.sm};
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  isolation: isolate;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ $active, theme }) =>
      $active ? theme.colors.border.filigreeBright : theme.colors.border.surfaceRaised};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.bodyStrong : theme.colors.text.bodyMuted};
  font: inherit;
  text-align: left;
  background:
    ${({ $active, theme }) => ($active ? theme.colors.gradients.spectralWash : 'none')},
    ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `${theme.shadows.surfacePressed}, ${theme.shadows.metalHover}`
      : theme.shadows.surfaceInset};
  clip-path: polygon(
    var(--chip-cut) 0,
    calc(100% - var(--chip-cut)) 0,
    100% var(--chip-cut),
    100% calc(100% - var(--chip-cut)),
    calc(100% - var(--chip-cut)) 100%,
    var(--chip-cut) 100%,
    0 calc(100% - var(--chip-cut)),
    0 var(--chip-cut)
  );
  cursor: pointer;
  appearance: none;
  transition:
    color ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    border-color ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    box-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  &::before {
    position: absolute;
    inset: -20% -45%;
    z-index: -1;
    background: ${({ theme }) => theme.colors.gradients.buttonGlint};
    content: '';
    pointer-events: none;
    transform: translateX(-145%) skewX(-18deg);
  }

  &::after {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.xs};
    z-index: -1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.etched};
    border-radius: ${({ theme }) => theme.radii.sm};
    content: '';
    pointer-events: none;
    clip-path: inherit;
  }

  ${({ $active, $effect, theme }) =>
    $active &&
    css`
      animation: ${effectMotion[$effect] || eclipseAwaken} ${theme.motion.duration.ritual}
        ${theme.motion.easing.enter} both;

      &::before {
        animation: ${chipGloss} ${theme.motion.duration.sweep} ${theme.motion.easing.enter}
          both;
      }
    `}

  &:focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.spacing.xs};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  &:active {
    transform: translateY(${({ theme }) => theme.layout.activeDepth}) scale(0.985);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.filigreeBright};
      color: ${({ theme }) => theme.colors.text.bodyStrong};
      box-shadow: ${({ theme }) => theme.shadows.metalHover};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});

      &::before {
        animation: ${chipGloss} ${({ theme }) => theme.motion.duration.sweep}
          ${({ theme }) => theme.motion.easing.enter} both;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &::before {
      animation: none;
    }

    &:hover {
      transform: none;
    }
  }
`

const ChipGlyph = styled.span`
  display: inline-grid;
  flex: 0 0 auto;
  width: ${({ theme }) => theme.spacing['2xl']};
  min-height: ${({ theme }) => theme.spacing['2xl']};
  place-items: center;
  border-right: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.etched};
  color: ${({ theme }) => theme.colors.accent.metalBright};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
`

const ChipLabel = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
`
