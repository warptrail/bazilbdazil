import styled, { keyframes } from 'styled-components'
import { BodyCopy, Container, NavLink } from '../../styles/primitives'

const orbitTurn = keyframes`
  to {
    transform: rotate(1turn);
  }
`

const reverseOrbitTurn = keyframes`
  to {
    transform: rotate(-1turn);
  }
`

const starBreathe = keyframes`
  0%, 100% {
    opacity: 0.35;
  }

  50% {
    opacity: 0.92;
  }
`

export const FooterShell = styled.section`
  position: relative;
  overflow: hidden;
  min-height: clamp(38rem, 68vw, 52rem);
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  background:
    repeating-radial-gradient(circle at 50% 54%, transparent 0 3.4rem, ${({ theme }) => theme.colors.border.surface} 3.45rem, transparent 3.52rem),
    radial-gradient(circle at 50% 46%, ${({ theme }) => theme.colors.effects.violetGlow} 0%, transparent 28%),
    radial-gradient(circle at 12% 84%, ${({ theme }) => theme.colors.effects.acidGlowSoft} 0%, transparent 20%),
    radial-gradient(circle at 86% 20%, ${({ theme }) => theme.colors.effects.starlightSoft} 0%, transparent 17%),
    ${({ theme }) => theme.colors.background.footer};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.effects.moonlightSoft},
    inset 0 3rem 5rem ${({ theme }) => theme.colors.background.canvas};

  &::before {
    content: '';
    position: absolute;
    inset: ${({ theme }) => theme.spacing.lg};
    z-index: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surface};
    clip-path: polygon(0 0, 2.5rem 0, 2.5rem 1px, calc(100% - 2.5rem) 1px, calc(100% - 2.5rem) 0, 100% 0, 100% 100%, calc(100% - 2.5rem) 100%, calc(100% - 2.5rem) calc(100% - 1px), 2.5rem calc(100% - 1px), 2.5rem 100%, 0 100%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.75;
    background-image:
      radial-gradient(circle at 7% 22%, ${({ theme }) => theme.colors.accent.metal} 0 1px, transparent 1.5px),
      radial-gradient(circle at 18% 68%, ${({ theme }) => theme.colors.accent.signal} 0 1px, transparent 1.5px),
      radial-gradient(circle at 32% 35%, ${({ theme }) => theme.colors.accent.rose} 0 1px, transparent 1.5px),
      radial-gradient(circle at 69% 72%, ${({ theme }) => theme.colors.accent.acid} 0 1px, transparent 1.5px),
      radial-gradient(circle at 82% 28%, ${({ theme }) => theme.colors.accent.signal} 0 1px, transparent 1.5px),
      radial-gradient(circle at 94% 74%, ${({ theme }) => theme.colors.accent.metal} 0 1px, transparent 1.5px);
    pointer-events: none;
  }
`

export const FooterCelestialMap = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: 0.54;
  pointer-events: none;
`

export const FooterStarRoute = styled.path`
  fill: none;
  stroke: ${({ theme, $tone = 'signal' }) =>
    $tone === 'metal' ? theme.colors.accent.metal : theme.colors.border[$tone]};
  stroke-width: 1;
  stroke-dasharray: ${({ $solid }) => ($solid ? 'none' : '2 10')};
  opacity: 0.68;
`

export const FooterMapStar = styled.circle`
  fill: ${({ theme, $tone = 'signal' }) =>
    theme.colors.accent[$tone] || theme.colors.accent.signal};
  filter: drop-shadow(0 0 0.35rem ${({ theme }) => theme.colors.effects.starlight});
  animation: ${starBreathe} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;
  animation-delay: ${({ $delay = 0 }) => `${-$delay}s`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.74;
  }
`

export const FooterTopOrnament = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: min(44rem, calc(100% - 4rem));
  margin-inline: auto;
  color: ${({ theme }) => theme.colors.accent.metal};
  transform: translateY(-50%);
`

export const FooterOrnamentLine = styled.span`
  flex: 1;
  height: ${({ theme }) => theme.borders.width.thin};
  background: ${({ theme, $reverse }) =>
    $reverse
      ? `linear-gradient(270deg, ${theme.colors.accent.metal}, ${theme.colors.accent.acid}, transparent)`
      : `linear-gradient(90deg, ${theme.colors.accent.metal}, ${theme.colors.accent.acid}, transparent)`};
  transform: ${({ $reverse }) => ($reverse ? 'scaleX(-1)' : 'none')};
`

export const FooterOrnamentMark = styled.span`
  display: grid;
  width: 2.5rem;
  aspect-ratio: 1;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.strong};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.acid};
  background: ${({ theme }) => theme.colors.background.surface};
  box-shadow:
    0 0 1rem ${({ theme }) => theme.colors.effects.acidGlowSoft},
    ${({ theme }) => theme.shadows.insetOrbital};
`

export const FooterInner = styled(Container)`
  position: relative;
  z-index: 2;
  min-height: clamp(35rem, 64vw, 49rem);
  max-width: ${({ theme }) => theme.layout.wideContentWidth};
  padding-top: ${({ theme }) => theme.spacing['3xl']};
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );
  padding-bottom: calc(${({ theme }) => theme.spacing['5xl']} + ${({ theme }) => theme.layout.safeArea.bottom});
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-height: 42rem;
  }
`

export const FooterSignoff = styled(BodyCopy).attrs({
  $tone: 'bodyMuted',
  $size: 'body',
})`
  position: absolute;
  right: max(${({ theme }) => theme.spacing.sectionX}, ${({ theme }) => theme.layout.safeArea.right});
  bottom: max(${({ theme }) => theme.spacing.lg}, ${({ theme }) => theme.layout.safeArea.bottom});
  z-index: 3;
  max-width: 18rem;
  margin: 0;
  opacity: 0.56;
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-style: italic;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.bodyWide};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    right: auto;
    left: max(${({ theme }) => theme.spacing.sectionX}, ${({ theme }) => theme.layout.safeArea.left});
    text-align: left;
  }
`

export const FooterNav = styled.nav`
  position: absolute;
  right: max(${({ theme }) => theme.spacing.sectionX}, ${({ theme }) => theme.layout.safeArea.right});
  bottom: 4.5rem;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  width: min(42rem, calc(100% - 6rem));
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  background: ${({ theme }) => theme.colors.background.glassInk};
  box-shadow: ${({ theme }) => theme.shadows.surfaceInset};
  backdrop-filter: blur(0.55rem);

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    right: max(${({ theme }) => theme.spacing.sectionX}, ${({ theme }) => theme.layout.safeArea.right});
    bottom: 5.25rem;
    left: max(${({ theme }) => theme.spacing.sectionX}, ${({ theme }) => theme.layout.safeArea.left});
    width: auto;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.compact}) {
    grid-template-columns: 1fr;
  }

  @media (forced-colors: active) {
    background: Canvas;
    backdrop-filter: none;
  }
`

export const FooterLink = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding-inline: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: linear-gradient(90deg, transparent, transparent);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent);
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  @media (hover: hover) {
    &:hover,
    &:focus-visible {
      color: ${({ theme }) => theme.colors.accent.acid};
    }

    &:hover::before {
      opacity: 1;
    }

    &:hover > span:last-child {
      color: ${({ theme }) => theme.colors.accent.acid};
      transform: rotate(45deg);
    }
  }
`

export const FooterLinkLabel = styled.span`
  position: relative;
  z-index: 1;
`

export const FooterLinkGlyph = styled.span`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.accent.metal};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: 1;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.base};
`

export const FooterBookLink = styled(FooterLink)`
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  border-color: ${({ theme }) => theme.colors.border.strong};
  background: ${({ theme }) => theme.colors.effects.acidGlowSoft};
`

export const FooterMetaLine = styled(BodyCopy).attrs({
  as: 'small',
  $tone: 'bodyMuted',
  $size: 'xs',
  $tracking: 'wide',
  $caps: true,
})`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`

export const CelestialInstrument = styled.div`
  position: absolute;
  top: 46%;
  left: 50%;
  z-index: 1;
  display: grid;
  width: min(84rem, 96vw);
  aspect-ratio: 1;
  place-items: center;
  isolation: isolate;
  transform: translate(-50%, -50%);
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    inset: 6%;
    z-index: -1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background:
      ${({ theme }) => theme.colors.gradients.starfield},
      radial-gradient(circle, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent 62%);
    opacity: 0.78;
  }

  &::after {
    inset: 3%;
    z-index: -1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.gradients.sacredHalo};
    opacity: 0.2;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    top: 43%;
    width: max(43rem, 158vw);
  }
`

export const CelestialInstrumentStage = styled.div`
  position: relative;
  display: grid;
  width: 94%;
  aspect-ratio: 1;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: radial-gradient(circle, ${({ theme }) => theme.colors.effects.moonlightSoft}, transparent 64%);

  &::before {
    content: '';
    position: absolute;
    inset: 14%;
    border: ${({ theme }) => theme.borders.width.thin} dashed
      ${({ theme }) => theme.colors.border.signal};
    border-radius: ${({ theme }) => theme.radii.orbital};
    animation: ${reverseOrbitTurn} ${({ theme }) => theme.motion.duration.orbit}
      ${({ theme }) => theme.motion.easing.ambient} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`

export const InstrumentSvg = styled.svg`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: visible;
  filter:
    drop-shadow(0 0 0.7rem ${({ theme }) => theme.colors.effects.goldGlowSoft})
    drop-shadow(0 0 1.7rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
`

export const ZodiacLayer = styled.g`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${orbitTurn} ${({ theme }) => theme.motion.duration.celestialLong}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const ZodiacRing = styled.circle`
  stroke: ${({ theme, $inner }) =>
    $inner ? theme.colors.border.violetStrong : theme.colors.accent.metal};
  stroke-width: 1;
  stroke-dasharray: ${({ $inner }) => ($inner ? '2 7' : '1 5')};
  opacity: ${({ $inner }) => ($inner ? 0.52 : 0.82)};
  vector-effect: non-scaling-stroke;
`

export const ZodiacSpoke = styled.line`
  stroke: ${({ theme, $cardinal }) =>
    $cardinal ? theme.colors.accent.metalBright : theme.colors.border.etched};
  stroke-width: ${({ $cardinal }) => ($cardinal ? 1.25 : 0.75)};
  opacity: ${({ $cardinal }) => ($cardinal ? 0.9 : 0.58)};
  vector-effect: non-scaling-stroke;
`

export const SacredPolygon = styled.polygon`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.signal};
  stroke-width: 0.8;
  opacity: 0.62;
  vector-effect: non-scaling-stroke;
`

export const GoldenSpiral = styled.path`
  fill: none;
  stroke: ${({ theme, $reverse }) =>
    $reverse ? theme.colors.accent.signal : theme.colors.accent.metalBright};
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: ${({ $reverse }) => ($reverse ? '2 8' : '3 5')};
  opacity: ${({ $reverse }) => ($reverse ? 0.46 : 0.72)};
  vector-effect: non-scaling-stroke;
`

export const PlanetaryLayer = styled.g`
  transform-box: fill-box;
  transform-origin: center;
  animation: ${reverseOrbitTurn} ${({ theme }) => theme.motion.duration.planetary}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const PlanetaryOrbit = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.surface};
  stroke-width: 0.75;
  opacity: 0.62;
  vector-effect: non-scaling-stroke;
`

export const PlanetaryNode = styled.circle`
  fill: ${({ theme, $tone = 'metal' }) => theme.colors.accent[$tone]};
  stroke: ${({ theme }) => theme.colors.background.canvas};
  stroke-width: 1.5;
  filter: drop-shadow(0 0 0.35rem ${({ theme }) => theme.colors.effects.starlight});
  vector-effect: non-scaling-stroke;
`

export const LunarOrbit = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.filigree};
  stroke-width: 1;
  stroke-dasharray: 1 10;
  opacity: 0.76;
  vector-effect: non-scaling-stroke;
`

export const LunarNode = styled.circle`
  fill: ${({ theme, $phase }) =>
    $phase < 4 ? theme.colors.accent.metalPale : theme.colors.background.canvas};
  stroke: ${({ theme }) => theme.colors.accent.metal};
  stroke-width: 1;
  opacity: ${({ $phase }) => 0.48 + ($phase % 4) * 0.14};
  vector-effect: non-scaling-stroke;
`

export const VesicaCircle = styled.circle`
  fill: ${({ theme }) => theme.colors.effects.moonlightSoft};
  stroke: ${({ theme, $reverse }) =>
    $reverse ? theme.colors.accent.rose : theme.colors.accent.signal};
  stroke-width: 1;
  opacity: 0.65;
  vector-effect: non-scaling-stroke;
`

export const CelestialCoreHalo = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.accent.acid};
  stroke-width: 1.25;
  stroke-dasharray: 3 4;
  filter: drop-shadow(0 0 0.45rem ${({ theme }) => theme.colors.effects.acidGlow});
  vector-effect: non-scaling-stroke;
`

export const CelestialCore = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.acidSoft};
  stroke: ${({ theme }) => theme.colors.accent.acid};
  stroke-width: 1;
  filter: drop-shadow(0 0 0.55rem ${({ theme }) => theme.colors.effects.acidGlow});
  vector-effect: non-scaling-stroke;
`

export const CelestialInstrumentLabel = styled.span`
  position: absolute;
  bottom: 14%;
  left: 50%;
  color: ${({ theme }) => theme.colors.accent.metalPale};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-style: italic;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.bodyWide};
  transform: translateX(-50%);
`

export const CelestialInstrumentNote = styled.span`
  position: absolute;
  bottom: 10.5%;
  left: 50%;
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  transform: translateX(-50%);
  white-space: nowrap;
`

export const SiteFooterShell = styled.footer`
  position: relative;
  z-index: 2;
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  background: ${({ theme }) => theme.colors.background.canvas};
`

export const SiteFooterInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.wideContentWidth};
  min-height: 4.5rem;
  padding-top: ${({ theme }) => theme.spacing.lg};
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );
  padding-bottom: max(
    ${({ theme }) => theme.spacing.lg},
    ${({ theme }) => theme.layout.safeArea.bottom}
  );
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.compact}) {
    align-items: flex-start;
    flex-direction: column;
  }
`

export const SiteFooterHomeLink = styled(NavLink)`
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`

export const FooterBottomRail = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 2.6rem;
  padding-inline: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  color: ${({ theme }) => theme.colors.accent.metal};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
`

export const BottomRailLine = styled.span`
  flex: 1;
  height: ${({ theme }) => theme.borders.width.thin};
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border.violetStrong}, transparent);
`

export const BottomRailGlyphs = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
  white-space: nowrap;
`
