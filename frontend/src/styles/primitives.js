import styled, { css, keyframes } from 'styled-components'

export const celestialDrift = keyframes`
  0% {
    transform: translate3d(-1.5%, -1%, 0) scale(1.04);
  }

  50% {
    transform: translate3d(1.5%, 1%, 0) scale(1.08);
  }

  100% {
    transform: translate3d(-1.5%, -1%, 0) scale(1.04);
  }
`

export const auroraPulse = keyframes`
  0%,
  100% {
    opacity: 0.42;
    transform: scale(1) rotate(-1deg);
  }

  50% {
    opacity: 0.72;
    transform: scale(1.045) rotate(1deg);
  }
`

export const glintSweep = keyframes`
  0% {
    transform: translate3d(-260%, 0, 0) skewX(-18deg);
  }

  100% {
    transform: translate3d(560%, 0, 0) skewX(-18deg);
  }
`

export const sigilSpin = keyframes`
  to {
    transform: rotate(1turn);
  }
`

export const starTwinkle = keyframes`
  0%,
  100% {
    opacity: 0.34;
    filter: brightness(0.82);
  }

  50% {
    opacity: 0.92;
    filter: brightness(1.34);
  }
`

export const labelText = css`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
  text-transform: uppercase;
`

export const focusVisible = css`
  &:focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.layout.focusOffset};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  @media (forced-colors: active) {
    &:focus-visible {
      outline-color: CanvasText;
      box-shadow: none;
    }
  }
`

export const spectralText = css`
  color: ${({ theme }) => theme.colors.text.primary};

  @supports ((background-clip: text) or (-webkit-background-clip: text)) {
    background: ${({ theme }) => theme.colors.gradients.spectralText};
    background-size: 180% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (forced-colors: active) {
    color: CanvasText;
    background: none;
    -webkit-text-fill-color: currentColor;
  }
`

export const etchedSurface = css`
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.etched};
  background: ${({ theme }) => theme.colors.gradients.etchedPanel};
  box-shadow: ${({ theme }) => theme.shadows.etched};
  backdrop-filter: blur(1rem) saturate(1.2);

  @supports not (backdrop-filter: blur(1rem)) {
    background: ${({ theme }) => theme.colors.background.surfaceEtched};
  }

  @media (forced-colors: active) {
    border-color: CanvasText;
    background: Canvas;
    box-shadow: none;
    backdrop-filter: none;
  }
`

export const PageShell = styled.div`
  position: relative;
  min-height: 100vh;
  isolation: isolate;
  overflow: clip;
  background: ${({ theme }) => theme.colors.gradients.page};

  &::before,
  &::after {
    content: '';
    position: fixed;
    inset: -8%;
    z-index: -1;
    pointer-events: none;
  }

  &::before {
    background-image: ${({ theme }) => theme.colors.gradients.starfieldDense};
    background-position:
      0 0,
      2.8rem 4.1rem,
      5.4rem 1.9rem;
    background-size:
      8.75rem 8.75rem,
      12.5rem 12.5rem,
      16rem 16rem;
    opacity: 0.52;
    animation: ${celestialDrift} ${({ theme }) => theme.motion.duration.drift}
      ${({ theme }) => theme.motion.easing.ambient} infinite;
  }

  &::after {
    background: ${({ theme }) => theme.colors.gradients.auroraVeil};
    mix-blend-mode: screen;
    opacity: 0.56;
    animation: ${auroraPulse} ${({ theme }) => theme.motion.duration.ambient}
      ${({ theme }) => theme.motion.easing.enter} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
      transform: none;
    }
  }

  @media (forced-colors: active) {
    background: Canvas;

    &::before,
    &::after {
      display: none;
    }
  }
`

export const Section = styled.section`
  position: relative;
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );
  scroll-margin-top: ${({ theme }) => theme.layout.scrollMargin};
`

export const Container = styled.div`
  width: min(${({ theme, $maxWidth }) => $maxWidth || theme.layout.contentWidth}, 100%);
  margin: 0 auto;
`

export const Eyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent.acid};
  ${labelText}
`

export const RitualLabel = styled.p`
  margin: 0;
  color: ${({ theme, $tone = 'signal' }) => theme.colors.accent[$tone]};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  ${labelText}
`

export const DisplayHeading = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme, $font = 'display' }) => theme.typography.fontFamily[$font]};
  font-size: ${({ theme, $size = 'display' }) => theme.typography.fontSize[$size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme, $lineHeight = 'display' }) => theme.typography.lineHeight[$lineHeight]};
  letter-spacing: ${({ theme, $tracking = 'tight' }) => theme.typography.letterSpacing[$tracking]};
  text-transform: ${({ $caps = true }) => ($caps ? 'uppercase' : 'none')};
`

export const SpectralHeading = styled(DisplayHeading)`
  ${spectralText}
  filter: drop-shadow(0 0 1.5rem ${({ theme }) => theme.colors.effects.violetGlowSoft});

  @media (prefers-reduced-motion: no-preference) {
    background-position: 0% 50%;
    transition: background-position ${({ theme }) => theme.motion.duration.reveal}
      ${({ theme }) => theme.motion.easing.enter};

    &:is(:hover, :focus-visible) {
      background-position: 100% 50%;
    }
  }

  @media (forced-colors: active) {
    filter: none;
  }
`

export const BodyCopy = styled.p`
  margin: 0;
  color: ${({ theme, $tone = 'bodyMuted' }) => theme.colors.text[$tone]};
  font-size: ${({ theme, $size = 'body' }) => theme.typography.fontSize[$size]};
  line-height: ${({ theme, $lineHeight = 'body' }) => theme.typography.lineHeight[$lineHeight]};
  letter-spacing: ${({ theme, $tracking = 'normal' }) =>
    $tracking === 'normal' ? 'normal' : theme.typography.letterSpacing[$tracking]};
  max-width: ${({ $maxWidth = 'none' }) => $maxWidth};
  text-transform: ${({ $caps = false }) => ($caps ? 'uppercase' : 'none')};
`

const buttonBase = css`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: ${({ theme }) => theme.layout.buttonMinHeight};
  padding: ${({ theme }) => theme.layout.buttonPaddingBlock}
    ${({ theme }) => theme.layout.buttonPaddingInline};
  cursor: pointer;
  ${labelText}
  ${focusVisible}
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    inset: -60% auto -60% -30%;
    z-index: -1;
    width: 34%;
    background: ${({ theme }) => theme.colors.gradients.buttonGlint};
    opacity: 0;
    pointer-events: none;
    transform: translate3d(-260%, 0, 0) skewX(-18deg);
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(${({ theme }) => theme.layout.hoverLift});
    }

    &:hover::after {
      opacity: 1;
      animation: ${glintSweep} ${({ theme }) => theme.motion.duration.glint}
        ${({ theme }) => theme.motion.easing.enter};
    }
  }

  &:focus-visible::after {
    opacity: 1;
    animation: ${glintSweep} ${({ theme }) => theme.motion.duration.glint}
      ${({ theme }) => theme.motion.easing.enter};
  }

  &:active {
    transform: translateY(${({ theme }) => theme.layout.activeDepth});
  }

  &[aria-disabled='true'],
  &:disabled {
    cursor: not-allowed;
    opacity: 0.54;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &:hover,
    &:active {
      transform: none;
    }

    &::after,
    &:hover::after,
    &:focus-visible::after {
      animation: none;
      opacity: 0;
    }
  }
`

export const PrimaryButton = styled.a`
  ${buttonBase}
  border: ${({ theme }) => theme.borders.width.medium} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.acidSoft};
  clip-path: polygon(0.55rem 0, calc(100% - 0.55rem) 0, 100% 0.55rem, 100% calc(100% - 0.55rem), calc(100% - 0.55rem) 100%, 0.55rem 100%, 0 calc(100% - 0.55rem), 0 0.55rem);
  color: ${({ theme }) => theme.colors.text.onAccent};
  background:
    radial-gradient(circle at 18% 0%, ${({ theme }) => theme.colors.effects.moonlight}, transparent 34%),
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.effects.glassHighlight} 0%,
      transparent 38%,
      ${({ theme }) => theme.colors.effects.glassShade} 160%
    ),
    ${({ theme }) => theme.colors.accent.acidSurface};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.effects.glassHighlight},
    inset 0 -1px 0 ${({ theme }) => theme.colors.effects.glassShade},
    inset 0 0 0 ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.colors.effects.inkVeil},
    inset 0 0 0 calc(${({ theme }) => theme.spacing.xs} + 1px) ${({ theme }) => theme.colors.effects.moonlightSoft},
    0 0.55rem 1.8rem ${({ theme }) => theme.colors.effects.acidGlowSoft};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.accent.metalPale};
      background:
        radial-gradient(circle at 18% 0%, ${({ theme }) => theme.colors.effects.moonlight}, transparent 34%),
        ${({ theme }) => theme.colors.accent.acid};
      box-shadow:
        inset 0 0 0 ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.colors.effects.inkVeil},
        inset 0 0 0 calc(${({ theme }) => theme.spacing.xs} + 1px) ${({ theme }) => theme.colors.effects.moonlightSoft},
        ${({ theme }) => theme.shadows.acidHover},
        ${({ theme }) => theme.shadows.metalHover};
    }
  }
`

export const GhostButton = styled.a`
  ${buttonBase}
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.violetStrong};
  color: ${({ theme }) => theme.colors.accent.ultravioletStrong};
  background: ${({ theme }) => theme.colors.gradients.glassPanel};
  clip-path: polygon(0.45rem 0, calc(100% - 0.45rem) 0, 100% 0.45rem, 100% calc(100% - 0.45rem), calc(100% - 0.45rem) 100%, 0.45rem 100%, 0 calc(100% - 0.45rem), 0 0.45rem);
  box-shadow:
    inset 0 0 0 ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.colors.effects.inkVeil},
    inset 0 0 0 calc(${({ theme }) => theme.spacing.xs} + 1px) ${({ theme }) => theme.colors.effects.moonlightSoft},
    ${({ theme }) => theme.shadows.glass};
  backdrop-filter: blur(0.8rem) saturate(1.18);

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.filigreeBright};
      color: ${({ theme }) => theme.colors.accent.metalPale};
      box-shadow: ${({ theme }) => theme.shadows.metalHover};
    }
  }

  @media (forced-colors: active) {
    background: Canvas;
    backdrop-filter: none;
  }
`

export const NavLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  color: ${({ theme }) => theme.colors.text.navigation};
  ${labelText}
  ${focusVisible}
  transition:
    color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0.25rem;
    left: 0;
    height: ${({ theme }) => theme.borders.width.thin};
    background: ${({ theme }) => theme.colors.gradients.goldLine};
    opacity: 0;
    transform: scaleX(0.2);
    transition:
      opacity ${({ theme }) => theme.transitions.base},
      transform ${({ theme }) => theme.transitions.ritual};
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.accent.acid};
    }

    &:hover::after {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  &:focus-visible::after {
    opacity: 1;
    transform: scaleX(1);
  }

  &:active {
    transform: translateY(${({ theme }) => theme.layout.activeDepth});
  }
`

const cardSurfaceKeys = {
  quiet: 'surface',
  raised: 'surfaceRaised',
  pressed: 'surfacePressed',
}

const cardBorderKeys = {
  quiet: 'surface',
  raised: 'surfaceRaised',
  pressed: 'surface',
}

const cardShadowKeys = {
  quiet: 'surfaceInset',
  raised: 'surfaceRaised',
  pressed: 'surfacePressed',
}

function resolveCardSurface(theme, surface, variant) {
  if (surface === 'booking') return theme.colors.gradients.booking
  if (surface && theme.colors.background[surface]) return theme.colors.background[surface]
  if (surface && theme.colors.gradients[surface]) return theme.colors.gradients[surface]

  return theme.colors.background[cardSurfaceKeys[variant] || cardSurfaceKeys.quiet]
}

export const Card = styled.article`
  position: relative;
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $borderTone, $variant = 'quiet' }) =>
      theme.colors.border[$borderTone || cardBorderKeys[$variant] || cardBorderKeys.quiet]};
  border-radius: ${({ theme, $radius = 'none' }) =>
    $radius === 'none' ? '0' : theme.radii[$radius]};
  background: ${({ theme, $surface, $variant = 'quiet' }) =>
    resolveCardSurface(theme, $surface, $variant)};
  box-shadow: ${({ theme, $shadow, $variant = 'quiet' }) => {
    if ($shadow === 'none') return 'none'
    if ($shadow) return theme.shadows[$shadow]

    return theme.shadows[cardShadowKeys[$variant] || cardShadowKeys.quiet]
  }};
`

export const OrnatePanel = styled(Card)`
  isolation: isolate;
  border-color: ${({ theme }) => theme.colors.border.filigree};
  background: ${({ theme }) => theme.colors.gradients.etchedPanel};
  box-shadow: ${({ theme }) => theme.shadows.etched};
  backdrop-filter: blur(1rem) saturate(1.18);
  transform-style: preserve-3d;
  transition:
    transform ${({ theme }) => theme.transitions.ritual},
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.ritual};

  &::before {
    content: '';
    position: absolute;
    inset: 0.45rem;
    z-index: -1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.etched};
    background:
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) left top / 1.25rem 1px no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) left top / 1px 1.25rem no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) right top / 1.25rem 1px no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) right top / 1px 1.25rem no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) left bottom / 1.25rem 1px no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) left bottom / 1px 1.25rem no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) right bottom / 1.25rem 1px no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.filigree}, ${({ theme }) => theme.colors.border.filigree}) right bottom / 1px 1.25rem no-repeat;
    opacity: 0.8;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    background: ${({ theme }) => theme.colors.gradients.spectralWash};
    opacity: 0.34;
    pointer-events: none;
    transition: opacity ${({ theme }) => theme.transitions.ritual};
  }

  @media (hover: hover) {
    ${({ $interactive, theme }) =>
      $interactive &&
      css`
        &:hover {
          border-color: ${theme.colors.border.filigreeBright};
          box-shadow: ${theme.shadows.spectral}, ${theme.shadows.etched};
          transform: translateY(-0.28rem) scale(1.008);
        }

        &:hover::after {
          opacity: 0.7;
        }
      `}
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.border.filigreeBright};
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &:hover {
      transform: none;
    }
  }

  @media (forced-colors: active) {
    border-color: CanvasText;
    background: Canvas;
    box-shadow: none;
    backdrop-filter: none;

    &::before,
    &::after {
      display: none;
    }
  }
`

export const StarfieldSurface = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    ${({ theme }) => theme.colors.gradients.starfield},
    ${({ theme }) => theme.colors.gradients.glassPanel};
  background-size:
    auto,
    auto;
  box-shadow: ${({ theme }) => theme.shadows.celestial};

  &::before {
    content: '';
    position: absolute;
    inset: -24%;
    z-index: -1;
    background: ${({ theme }) => theme.colors.gradients.cosmicLens};
    opacity: 0.48;
    pointer-events: none;
    animation: ${sigilSpin} ${({ theme }) => theme.motion.duration.orbit}
      ${({ theme }) => theme.motion.easing.ambient} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }

  @media (forced-colors: active) {
    background: Canvas;
    box-shadow: none;

    &::before {
      display: none;
    }
  }
`

export const SigilBadge = styled.span`
  display: inline-grid;
  place-items: center;
  width: ${({ $size = '2.75rem' }) => $size};
  aspect-ratio: 1;
  flex: 0 0 auto;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme, $tone = 'metalBright' }) => theme.colors.accent[$tone]};
  background:
    ${({ theme }) => theme.colors.gradients.sacredHalo},
    ${({ theme }) => theme.colors.background.surfaceGlass};
  box-shadow:
    inset 0 0 0 0.3rem ${({ theme }) => theme.colors.effects.inkVeil},
    ${({ theme }) => theme.shadows.filigree};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  line-height: 1;

  @media (forced-colors: active) {
    border-color: CanvasText;
    color: CanvasText;
    background: Canvas;
    box-shadow: none;
  }
`

export const CelestialDivider = styled.div`
  position: relative;
  width: min(100%, ${({ theme }) => theme.layout.proseWidth});
  height: 1.35rem;
  margin-inline: auto;
  color: ${({ theme }) => theme.colors.accent.metalBright};
  background:
    ${({ theme }) => theme.colors.gradients.goldLine} center / 100% 1px no-repeat,
    radial-gradient(circle, currentColor 0 0.18rem, transparent 0.2rem) center / 1rem 1rem no-repeat;
  filter: drop-shadow(0 0 0.7rem ${({ theme }) => theme.colors.effects.goldGlow});

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 0.42rem;
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      currentColor;
    transform: translateY(-50%) rotate(45deg);
  }

  &::before {
    left: 12%;
  }

  &::after {
    right: 12%;
  }

  @media (forced-colors: active) {
    color: CanvasText;
    background: linear-gradient(CanvasText, CanvasText) center / 100% 1px no-repeat;
    filter: none;
  }
`

export const Divider = styled.div`
  width: ${({ $width = '100%' }) => $width};
  height: ${({ theme }) => theme.borders.width.thin};
  background: ${({ theme, $tone = 'subtle' }) => theme.colors.border[$tone]};
`

export const OrbitalBackdrop = styled.div`
  position: absolute;
  inset: ${({ $inset = '0' }) => $inset};
  border-radius: ${({ theme, $radius = 'orbital' }) => theme.radii[$radius]};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $tone = 'orbital' }) => theme.colors.border[$tone]};
  box-shadow: ${({ theme, $shadow = 'insetOrbital' }) => theme.shadows[$shadow]};
  pointer-events: none;
`

export const GlowOrb = styled.div`
  position: absolute;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: ${({ $background }) => $background};
  filter: ${({ $filter = 'blur(30px)' }) => $filter};
  pointer-events: none;
`

export const SkipLink = styled.a`
  position: fixed;
  top: calc(
    ${({ theme }) => theme.layout.safeArea.top} + ${({ theme }) => theme.spacing.md}
  );
  left: max(${({ theme }) => theme.spacing.md}, ${({ theme }) => theme.layout.safeArea.left});
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.strong};
  color: ${({ theme }) => theme.colors.text.onAccent};
  background: ${({ theme }) => theme.colors.accent.acid};
  transform: translateY(calc(-100% - ${({ theme }) => theme.spacing['4xl']}));
  transition: transform ${({ theme }) => theme.transitions.fast};
  ${labelText}
  ${focusVisible}

  &:focus-visible {
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};
  }
`

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`
