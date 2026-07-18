import styled, { css, keyframes } from 'styled-components'
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

const compassHoverOrbit = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
    filter: hue-rotate(var(--compass-hue));
  }

  42% {
    transform: rotate(156deg) scale(1.16);
    filter: hue-rotate(calc(var(--compass-hue) + 96deg));
  }

  72% {
    transform: rotate(274deg) scale(0.92);
    filter: hue-rotate(calc(var(--compass-hue) + 214deg));
  }

  100% {
    transform: rotate(360deg) scale(1);
    filter: hue-rotate(calc(var(--compass-hue) + 360deg));
  }
`

const compassClickSpin = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
    filter: hue-rotate(var(--compass-hue));
  }

  48% {
    transform: rotate(560deg) scale(1.42);
    filter: hue-rotate(calc(var(--compass-hue) + 240deg));
  }

  76% {
    transform: rotate(690deg) scale(0.86);
    filter: hue-rotate(calc(var(--compass-hue) + 440deg));
  }

  100% {
    transform: rotate(720deg) scale(1);
    filter: hue-rotate(calc(var(--compass-hue) + 720deg));
  }
`

const metaTarotShuffle = keyframes`
  0% {
    opacity: 1;
    transform: translateY(var(--meta-lift)) rotate(var(--meta-tilt));
    filter: hue-rotate(var(--meta-hue));
  }

  28% {
    opacity: 0.72;
    transform: translateY(-0.7rem) rotate(var(--meta-turn)) scale(1.18);
    filter: hue-rotate(calc(var(--meta-hue) + 118deg));
  }

  58% {
    opacity: 1;
    transform: translateY(0.18rem) rotate(var(--meta-counter-tilt)) scale(0.9);
    filter: hue-rotate(calc(var(--meta-hue) + 248deg));
  }

  82% {
    transform: translateY(-0.22rem) rotate(var(--meta-counter-tilt)) scale(1.06);
    filter: hue-rotate(calc(var(--meta-hue) + 324deg));
  }

  100% {
    opacity: 1;
    transform: translateY(var(--meta-lift)) rotate(var(--meta-tilt));
    filter: hue-rotate(calc(var(--meta-hue) + 360deg));
  }
`

const metaCharmOrbit = keyframes`
  0% {
    opacity: 0.2;
    transform: translate3d(-0.2rem, 0, 0) rotate(0deg) scale(0.72);
  }

  50% {
    opacity: 0.9;
    transform: translate3d(calc(100% + 0.4rem), -0.35rem, 0) rotate(180deg) scale(1.1);
  }

  100% {
    opacity: 0.2;
    transform: translate3d(calc(200% + 0.8rem), 0, 0) rotate(360deg) scale(0.72);
  }
`

const signoffSignal = keyframes`
  0%, 100% {
    opacity: 0.22;
    transform: translate3d(0.08em, 0.04em, 0);
    filter: hue-rotate(0deg);
  }

  36% {
    opacity: 0.46;
    transform: translate3d(-0.04em, -0.02em, 0);
    filter: hue-rotate(54deg);
  }

  68% {
    opacity: 0.16;
    transform: translate3d(0.03em, 0.07em, 0);
    filter: hue-rotate(112deg);
  }
`

const drawTarotCard = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 48%) rotate(5deg) scale(0.88);
  }

  68% {
    opacity: 1;
    transform: translate(-50%, -2%) rotate(-1deg) scale(1.02);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0) rotate(0deg) scale(1);
  }
`

export const FooterViewport = styled.div`
  display: flex;
  flex-direction: column;
  height: max(38rem, calc(100svh - ${({ theme }) => theme.layout.headerOffset}));
  min-height: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.canvas};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    height: max(
      42rem,
      calc(100svh - ${({ theme }) => theme.layout.compactHeaderOffset})
    );
  }
`

export const FooterShell = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
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

export const FooterSocialSky = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 4.5rem;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md} max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  border-block: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  background:
    linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.background.glassInk}, transparent),
    ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.effects.goldGlowSoft},
    0 0.8rem 2rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  list-style: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    width: min(18vw, 12rem);
    height: ${({ theme }) => theme.borders.width.thin};
    background: ${({ theme }) => theme.colors.gradients.goldLine};
    content: '';
    transform: translateY(-50%);
  }

  &::before { left: 0; }
  &::after { right: 0; transform: translateY(-50%) scaleX(-1); }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    display: grid;
    grid-template-columns: repeat(5, minmax(3rem, 3.25rem));
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    min-height: 4rem;
    padding-inline: ${({ theme }) => theme.spacing.lg};
  }
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
  flex: 1 1 auto;
  min-height: 0;
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
    min-height: 0;
  }
`

export const FooterSignoff = styled(BodyCopy).attrs({
  $tone: 'bodyMuted',
  $size: 'body',
})`
  position: absolute;
  top: clamp(${({ theme }) => theme.spacing['4xl']}, 8vw, 6rem);
  left: max(${({ theme }) => theme.spacing.sectionX}, ${({ theme }) => theme.layout.safeArea.left});
  z-index: 3;
  isolation: isolate;
  max-width: 12ch;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.9rem, 4.6vw, 4.4rem);
  font-style: normal;
  line-height: 0.88;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  text-align: left;
  text-transform: uppercase;
  text-wrap: balance;
  filter: drop-shadow(0 0 1.25rem ${({ theme }) => theme.colors.effects.violetGlowSoft});

  @supports ((background-clip: text) or (-webkit-background-clip: text)) {
    background: ${({ theme }) => theme.colors.gradients.spectralText};
    background-size: 220% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &::before {
    position: absolute;
    bottom: calc(100% + ${({ theme }) => theme.spacing.md});
    left: 0;
    color: ${({ theme }) => theme.colors.accent.metalBright};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
    line-height: 1;
    text-shadow: 0 0 0.65rem ${({ theme }) => theme.colors.effects.goldGlow};
    -webkit-text-fill-color: currentColor;
    white-space: nowrap;
    content: '✦  A SIGNAL FROM THE THRESHOLD';
  }

  &::after {
    position: absolute;
    inset: 0;
    z-index: -1;
    color: ${({ theme }) => theme.colors.accent.magenta};
    text-shadow:
      0 0 0.45rem ${({ theme }) => theme.colors.effects.magentaGlow},
      0 0 1rem ${({ theme }) => theme.colors.effects.cyanGlow};
    -webkit-text-fill-color: currentColor;
    content: attr(data-text);
    animation: ${signoffSignal} ${({ theme }) => theme.motion.duration.twinkle}
      steps(4, end) infinite;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    top: ${({ theme }) => theme.spacing['5xl']};
    max-width: 9ch;
    font-size: clamp(1.7rem, 8vw, 3rem);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; }
  }

  @media (forced-colors: active) {
    color: CanvasText;
    background: none;
    filter: none;
    -webkit-text-fill-color: currentColor;

    &::after { display: none; }
  }
`

export const FooterNav = styled.nav`
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: min(
    64rem,
    calc(
      100% - ${({ theme }) => theme.spacing.sectionX} -
        ${({ theme }) => theme.spacing.sectionX}
    )
  );
  margin-inline: auto;
  padding: ${({ theme }) => theme.spacing.xs};
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.background.glassInk} 12%,
    ${({ theme }) => theme.colors.background.glassInk} 88%,
    transparent
  );
  box-shadow: ${({ theme }) => theme.shadows.surfaceInset};
  backdrop-filter: blur(0.3rem);

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.compact}) {
    width: calc(100% - ${({ theme }) => theme.spacing.lg} - ${({ theme }) => theme.spacing.lg});
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
  width: 100%;
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  border-top: 0;
  border-right: 0;
  border-left: 0;
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: inherit;
  text-align: left;
  background: linear-gradient(90deg, transparent, transparent);
  cursor: pointer;

  ${({ $drawn, theme }) =>
    $drawn &&
    `
      color: ${theme.colors.accent.acidSoft};
      background: linear-gradient(90deg, ${theme.colors.effects.acidGlowSoft}, transparent);
      box-shadow: inset 0 -1px 0 ${theme.colors.border.strong};
    `}

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

export const FooterTarotCard = styled.article`
  position: absolute;
  bottom: clamp(5.8rem, 10vw, 7.4rem);
  left: 50%;
  z-index: 6;
  isolation: isolate;
  display: grid;
  align-content: start;
  justify-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: min(16.5rem, calc(100% - 3rem));
  height: min(23rem, calc(100% - 8.5rem));
  min-height: 17rem;
  padding: ${({ theme }) => theme.spacing['2xl']};
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.medium} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  background:
    radial-gradient(circle at 50% 35%, ${({ theme }) => theme.colors.effects.violetGlow}, transparent 34%),
    ${({ theme }) => theme.colors.gradients.etchedPanel};
  box-shadow:
    ${({ theme }) => theme.shadows.etched},
    0 0 3.4rem ${({ theme }) => theme.colors.effects.violetGlow},
    0 0 1.4rem ${({ theme }) => theme.colors.effects.goldGlowSoft};
  text-align: center;
  transform-origin: center bottom;
  animation: ${drawTarotCard} ${({ theme }) => theme.motion.duration.ritual}
    ${({ theme }) => theme.motion.easing.magnetic} both;

  @media (max-height: ${({ theme }) => theme.layout.viewportHeights.short}) {
    width: min(14.5rem, calc(100% - 3rem));
    min-height: 16rem;
    padding: ${({ theme }) => theme.spacing.lg};
  }

  &::before {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.sm};
    z-index: -1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.violetStrong};
    border-radius: ${({ theme }) => theme.radii.md};
    background:
      ${({ theme }) => theme.colors.gradients.sacredHalo},
      linear-gradient(145deg, ${({ theme }) => theme.colors.effects.moonlightSoft}, transparent 48%);
    content: '';
    opacity: 0.72;
  }

  &::after {
    position: absolute;
    top: 22%;
    left: 50%;
    z-index: -1;
    width: 9rem;
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.signal};
    border-radius: ${({ theme }) => theme.radii.orbital};
    box-shadow:
      inset 0 0 1.8rem ${({ theme }) => theme.colors.effects.violetGlowSoft},
      0 0 1.2rem ${({ theme }) => theme.colors.effects.cyanGlow};
    content: '';
    transform: translateX(-50%);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translateX(-50%);
  }
`

export const FooterTarotCardClose = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  z-index: 2;
  display: grid;
  width: 2rem;
  aspect-ratio: 1;
  padding: 0;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.ritual};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
      color: ${({ theme }) => theme.colors.accent.acid};
      transform: rotate(90deg);
    }
  }
`

export const FooterTarotCardIndex = styled.span`
  color: ${({ theme }) => theme.colors.accent.metalBright};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
`

export const FooterTarotCardGlyph = styled.span`
  position: relative;
  z-index: 1;
  display: grid;
  width: 5.2rem;
  aspect-ratio: 1;
  margin-block: ${({ theme }) => theme.spacing.lg};
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  background: radial-gradient(circle, ${({ theme }) => theme.colors.effects.acidGlow}, transparent 68%);
  box-shadow: 0 0 1.4rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.section};
  text-shadow: 0 0 0.7rem ${({ theme }) => theme.colors.effects.acidGlow};
`

export const FooterTarotCardLabel = styled.span`
  color: ${({ theme }) => theme.colors.accent.signal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
  text-transform: uppercase;
`

export const FooterTarotCardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.section};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  text-transform: uppercase;
  text-wrap: balance;
`

export const FooterTarotCardText = styled(BodyCopy).attrs({
  as: 'p',
  $tone: 'bodyMuted',
})`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

export const FooterMetaLine = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  background: transparent;
  box-shadow: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  isolation: isolate;
  transition:
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base},
    background ${({ theme }) => theme.transitions.ritual},
    box-shadow ${({ theme }) => theme.transitions.ritual};

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    z-index: -1;
    color: ${({ theme }) => theme.colors.accent.metalBright};
    opacity: 0;
    pointer-events: none;
    content: '✦';
  }

  &::before {
    right: calc(100% + ${({ theme }) => theme.spacing.xs});
  }

  &::after {
    left: calc(100% + ${({ theme }) => theme.spacing.xs});
    content: '☽';
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.border.violetStrong};
    background: radial-gradient(
      ellipse,
      ${({ theme }) => theme.colors.effects.violetGlowSoft},
      transparent 70%
    );
    box-shadow:
      inset 0 0 0 ${({ theme }) => theme.borders.width.thin}
        ${({ theme }) => theme.colors.effects.moonlightSoft},
      0 0 ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.colors.effects.violetGlowSoft};
  }

  &:hover::before,
  &:focus-visible::before,
  &:hover::after,
  &:focus-visible::after {
    animation: ${metaCharmOrbit} ${({ theme }) => theme.motion.duration.glint} linear infinite;
  }

  &:hover::after,
  &:focus-visible::after {
    animation-direction: reverse;
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.spacing.xs};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before,
    &::after {
      animation: none;
    }
  }

  @media (forced-colors: active) {
    color: ButtonText;
    border-color: ButtonText;
    background: ButtonFace;
    box-shadow: none;
  }
`

export const FooterMetaGlyph = styled.span`
  --meta-hue: ${({ $hue = 0 }) => `${$hue}deg`};
  --meta-lift: ${({ $lift = 0 }) => `${-$lift}rem`};
  --meta-tilt: ${({ $tilt = 0 }) => `${$tilt}deg`};
  --meta-counter-tilt: ${({ $tilt = 0 }) => `${-$tilt}deg`};
  --meta-turn: ${({ $turn = 0 }) => `${$turn}deg`};

  display: inline-block;
  color: ${({ theme, $engaged, $tone = 0 }) => {
    if (!$engaged) return theme.colors.text.bodyMuted

    const tones = [
      theme.colors.accent.metalPale,
      theme.colors.accent.acidSoft,
      theme.colors.accent.signal,
      theme.colors.accent.ultravioletStrong,
    ]

    return tones[$tone % tones.length]
  }};
  text-shadow: ${({ theme, $engaged }) =>
    $engaged
      ? `0 0 ${theme.spacing.sm} ${theme.colors.effects.goldGlowSoft}, 0 0 ${theme.spacing.md} ${theme.colors.effects.violetGlowSoft}`
      : 'none'};
  transform: translateY(var(--meta-lift)) rotate(var(--meta-tilt));
  transform-origin: center 75%;
  filter: hue-rotate(var(--meta-hue));
  user-select: text;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.base},
    text-shadow ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.ritual};
  animation: ${({ $sequence, $delay, theme }) =>
    $sequence > 0
      ? css`${metaTarotShuffle} ${theme.motion.duration.reveal} ${theme.motion.easing.enter} ${$delay}s both`
      : 'none'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  @media (forced-colors: active) {
    color: ButtonText;
    filter: none;
    text-shadow: none;
  }
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
  flex: 0 0 auto;
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  background: ${({ theme }) => theme.colors.background.canvas};
`

export const FooterPageAtlas = styled.nav`
  position: fixed;
  right: calc(${({ theme }) => theme.layout.frameInset} + ${({ theme }) => theme.spacing.sm});
  bottom: calc(${({ theme }) => theme.layout.frameInset} + ${({ theme }) => theme.spacing.sm});
  left: calc(${({ theme }) => theme.layout.frameInset} + ${({ theme }) => theme.spacing.sm});
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding-inline: ${({ theme }) => theme.spacing.md};
  border-right: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  border-left: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.signal};
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.background.glassInk} 18%,
    ${({ theme }) => theme.colors.background.glassInk} 82%,
    transparent
  );
  background-position: var(--atlas-drift) 50%;
  background-size: calc(100% + 6rem) 100%;
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.effects.goldGlowSoft},
    inset 0 -1px 0 ${({ theme }) => theme.colors.effects.cyanGlow},
    inset 0 0 0.85rem ${({ theme }) => theme.colors.effects.violetGlowSoft},
    0 -0.25rem 1rem ${({ theme }) => theme.colors.effects.violetGlowSoft},
    0 0 0.65rem ${({ theme }) => theme.colors.effects.acidGlowSoft};
  filter: hue-rotate(var(--atlas-hue));
  opacity: ${({ $moving }) => ($moving ? 0.96 : 0.2)};
  isolation: isolate;
  pointer-events: auto;
  will-change: opacity;
  transition:
    opacity ${({ theme, $moving }) =>
      $moving
        ? theme.transitions.fast
        : `${theme.motion.duration.reveal} ${theme.motion.easing.enter}`},
    filter ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-within {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -${({ theme }) => theme.spacing.sm};
    width: min(14vw, 9rem);
    height: ${({ theme }) => theme.borders.width.thin};
    background: ${({ theme }) => theme.colors.gradients.goldLine};
    opacity: 0.72;
    pointer-events: none;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
    transform: scaleX(-1);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    right: calc(${({ theme }) => theme.spacing.xs} + ${({ theme }) => theme.spacing.sm});
    bottom: calc(${({ theme }) => theme.spacing.xs} + ${({ theme }) => theme.spacing.sm});
    left: calc(${({ theme }) => theme.spacing.xs} + ${({ theme }) => theme.spacing.sm});
    min-height: ${({ theme }) => theme.layout.controlMinHeight};
    padding-inline: ${({ theme }) => theme.spacing.sm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (forced-colors: active) {
    opacity: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      CanvasText;
    background: Canvas;
    box-shadow: none;
  }
`

export const AtlasCompassGlyph = styled.span`
  --compass-hue: ${({ $hue = 0 }) => `${$hue}deg`};

  position: relative;
  z-index: 1;
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  transform-origin: center;
  filter: hue-rotate(var(--compass-hue));
  transition:
    color ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.base},
    text-shadow ${({ theme }) => theme.transitions.base};
  animation: ${({ $spinning, $engaged, theme }) => {
    if ($spinning) {
      return css`${compassClickSpin} ${theme.motion.duration.reveal} ${theme.motion.easing.enter} both`
    }

    if ($engaged) {
      return css`${compassHoverOrbit} ${theme.motion.duration.glint} linear infinite`
    }

    return 'none'
  }};
`

export const AtlasCompass = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  bottom: calc(100% + ${({ theme }) => theme.spacing.xs});
  display: grid;
  width: ${({ theme }) => theme.layout.controlMinHeight};
  height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: 0;
  place-items: center;
  appearance: none;
  color: ${({ theme }) => theme.colors.accent.metalPale};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    transparent;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.effects.goldGlowSoft},
    transparent 66%
  );
  box-shadow: none;
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  text-shadow: 0 0 0.7rem ${({ theme }) => theme.colors.effects.goldGlow};
  cursor: pointer;
  touch-action: manipulation;
  isolation: isolate;
  transition:
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base},
    background ${({ theme }) => theme.transitions.ritual},
    box-shadow ${({ theme }) => theme.transitions.ritual},
    transform ${({ theme }) => theme.transitions.ritual};
  transform:
    translateX(${({ $direction }) => ($direction === 'up' ? '-0.35rem' : 0)})
    perspective(5rem)
    rotateX(${({ $tiltY = 0 }) => `${-$tiltY}deg`})
    rotateY(${({ $tiltX = 0 }) => `${$tiltX}deg`})
    scale(${({ $engaged }) => ($engaged ? 1.08 : 1)});

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: ${({ theme }) => theme.radii.orbital};
    pointer-events: none;
    transition:
      opacity ${({ theme }) => theme.transitions.base},
      transform ${({ theme }) => theme.transitions.ritual};
  }

  &::before {
    inset: ${({ theme }) => theme.spacing.xs};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.violet};
    opacity: 0.48;
    transform: rotate(-18deg) scale(0.78);
  }

  &::after {
    inset: 0;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.effects.acidGlow},
      ${({ theme }) => theme.colors.effects.violetGlowSoft} 42%,
      transparent 72%
    );
    opacity: 0;
    transform: scale(0.54);
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.acidSoft};
    border-color: ${({ theme }) => theme.colors.border.filigreeBright};
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.effects.acidGlow},
      ${({ theme }) => theme.colors.effects.violetGlowSoft} 48%,
      transparent 72%
    );
    box-shadow:
      ${({ theme }) => theme.shadows.acidHover},
      0 0 1.6rem ${({ theme }) => theme.colors.effects.violetGlow};
    text-shadow:
      0 0 0.55rem ${({ theme }) => theme.colors.effects.acidGlow},
      0 0 1rem ${({ theme }) => theme.colors.effects.violetGlow};
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 0.92;
    transform: rotate(138deg) scale(1.04);
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 0.78;
    transform: scale(1.34);
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.spacing.xs};
  }

  &:active {
    transform:
      translateX(${({ $direction }) => ($direction === 'up' ? '-0.35rem' : 0)})
      perspective(5rem)
      rotateX(${({ $tiltY = 0 }) => `${-$tiltY}deg`})
      rotateY(${({ $tiltX = 0 }) => `${$tiltX}deg`})
      scale(0.94);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    right: ${({ theme }) => theme.spacing.sm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;

    ${AtlasCompassGlyph} {
      animation: none;
      transform: none;
    }
  }

  @media (forced-colors: active) {
    color: CanvasText;
    background: Canvas;
    text-shadow: none;
  }
`

export const AtlasTrack = styled.span`
  position: absolute;
  top: 50%;
  right: calc(
    ${({ theme }) => theme.spacing.md} + ${({ theme }) => theme.layout.controlMinHeight} / 2
  );
  left: calc(
    ${({ theme }) => theme.spacing.md} + ${({ theme }) => theme.layout.controlMinHeight} / 2
  );
  z-index: -1;
  height: 0.72rem;
  border-right: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.signal};
  border-left: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  background:
    repeating-linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.border.surfaceRaised} 0,
      ${({ theme }) => theme.colors.border.surfaceRaised} ${({ theme }) => theme.borders.width.thin},
      transparent ${({ theme }) => theme.borders.width.thin},
      transparent ${({ theme }) => theme.spacing.xl}
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.effects.goldGlowSoft},
      transparent 18% 82%,
      ${({ theme }) => theme.colors.effects.cyanGlow}
    );
  background-position: var(--atlas-drift) 50%, 0 0;
  transform: translateY(-50%);
  pointer-events: none;
  box-shadow:
    inset 0 0 0 ${({ theme }) => theme.borders.width.thin}
      ${({ theme }) => theme.colors.border.surface},
    0 0 0.55rem ${({ theme }) => theme.colors.effects.violetGlowSoft};

  &::before,
  &::after {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    height: ${({ theme }) => theme.borders.width.thin};
    background: ${({ theme }) => theme.colors.border.filigree};
  }

  &::before {
    top: 0;
    box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.effects.goldGlowSoft};
  }

  &::after {
    bottom: 0;
    opacity: 0.62;
    box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.effects.cyanGlow};
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    right: calc(
      ${({ theme }) => theme.spacing.sm} + ${({ theme }) => theme.layout.controlMinHeight} / 2
    );
    left: calc(
      ${({ theme }) => theme.spacing.sm} + ${({ theme }) => theme.layout.controlMinHeight} / 2
    );
  }
`

export const AtlasProgress = styled.span`
  position: absolute;
  inset: 0;
  transform: scaleX(1);
  transform-origin: left center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    height: ${({ theme }) => theme.borders.width.thin};
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accent.metalDim},
      ${({ theme }) => theme.colors.accent.metalBright},
      ${({ theme }) => theme.colors.accent.acid}
    );
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.effects.goldGlow};
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  @supports (animation-timeline: scroll()) {
    transform: scaleX(var(--atlas-progress));
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scaleX(1);
  }
`

export const AtlasCurrentPosition = styled.span`
  position: absolute;
  top: 50%;
  left: 100%;
  z-index: 3;
  width: 0.72rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.metalPale};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.accent.acidSoft};
  box-shadow:
    0 0 0 0.18rem ${({ theme }) => theme.colors.background.canvas},
    0 0 0.8rem ${({ theme }) => theme.colors.effects.acidGlow};
  transform: translate(-50%, -50%) rotate(var(--atlas-turn))
    scale(var(--atlas-energy));

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 18%;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.signal};
    transform: rotate(45deg);
  }

  &::after {
    inset: 34%;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.background.canvas};
  }

  @supports (animation-timeline: scroll()) {
    left: calc(var(--atlas-progress) * 100%);
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }

  @media (forced-colors: active) {
    border-color: CanvasText;
    background: Highlight;
    box-shadow: none;
  }
`

export const AtlasNodes = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
`

export const AtlasNode = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.layout.controlMinHeight};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: 0;
  color: ${({ theme, $active, $visited }) =>
    $active
      ? theme.colors.accent.acidSoft
      : $visited
        ? theme.colors.accent.metalPale
        : theme.colors.text.bodyMuted};
  opacity: ${({ $active, $visited }) => ($active ? 1 : $visited ? 0.74 : 0.4)};
  background: ${({ theme, $active }) =>
    $active
      ? `radial-gradient(circle, ${theme.colors.effects.acidGlow} 0%, transparent 66%)`
      : 'transparent'};
  box-shadow: ${({ theme, $active }) =>
    $active ? `0 0 1rem ${theme.colors.effects.acidGlowSoft}` : 'none'};
  transition:
    color ${({ theme }) => theme.transitions.base},
    opacity ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.ritual},
    box-shadow ${({ theme }) => theme.transitions.ritual};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: ${({ theme }) => theme.spacing.xs};
    height: ${({ theme }) => theme.borders.width.thin};
    background: ${({ theme, $visited }) =>
      $visited ? theme.colors.accent.metal : theme.colors.border.surfaceRaised};
    transform: translateY(-50%);
  }

  &::before {
    right: 100%;
  }

  &::after {
    left: 100%;
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.accent.acidSoft};
      box-shadow: ${({ theme }) => theme.shadows.metalHover};
      opacity: 1;
      transform: translateY(${({ theme }) => theme.layout.hoverLift}) scale(1.08);
    }
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    gap: 0;
    min-width: ${({ theme }) => theme.layout.controlMinHeight};
    padding-inline: ${({ theme }) => theme.spacing.xs};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (forced-colors: active) {
    color: LinkText;
    background: Canvas;
    box-shadow: none;

    &[aria-current='location'] {
      color: HighlightText;
      background: Highlight;
    }
  }
`

export const AtlasNodeGlyph = styled.span`
  position: relative;
  display: grid;
  width: 1.45rem;
  aspect-ratio: 1;
  place-items: center;
  color: currentColor;
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      currentColor;
    pointer-events: none;
  }

  &::before {
    inset: -0.12rem;
    opacity: 0.34;
    transform: rotate(45deg);
  }

  &::after {
    inset: 0.24rem;
    border-radius: ${({ theme }) => theme.radii.orbital};
    opacity: 0.54;
  }

  [aria-current='location'] & {
    text-shadow:
      0 0 0.55rem ${({ theme }) => theme.colors.effects.acidGlow},
      0 0 1rem ${({ theme }) => theme.colors.effects.cyanGlow};

    &::before {
      border-color: ${({ theme }) => theme.colors.accent.acidSoft};
      box-shadow:
        0 0 0.65rem ${({ theme }) => theme.colors.effects.acidGlow},
        inset 0 0 0.45rem ${({ theme }) => theme.colors.effects.cyanGlow};
      opacity: var(--atlas-pulse);
      transform: rotate(var(--atlas-turn)) scale(var(--atlas-energy));
    }
  }
`

export const SiteFooterInner = styled(Container)`
  display: grid;
  grid-template-areas:
    'identity source';
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.wideContentWidth};
  min-height: 7rem;
  padding-top: ${({ theme }) => theme.spacing.lg};
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );
  padding-bottom: calc(
    ${({ theme }) => theme.layout.controlMinHeight} + ${({ theme }) => theme.spacing['2xl']} +
      ${({ theme }) => theme.spacing['4xl']} + ${({ theme }) => theme.spacing.lg} +
      ${({ theme }) => theme.layout.safeArea.bottom}
  );
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    grid-template-areas:
      'identity'
      'source';
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

export const FooterIdentity = styled.div`
  grid-area: identity;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`

export const FooterSourceCodeLink = styled.a`
  grid-area: source;
  justify-self: end;
  position: relative;
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding-inline: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  clip-path: polygon(
    ${({ theme }) => theme.spacing.sm} 0,
    100% 0,
    100% calc(100% - ${({ theme }) => theme.spacing.sm}),
    calc(100% - ${({ theme }) => theme.spacing.sm}) 100%,
    0 100%,
    0 ${({ theme }) => theme.spacing.sm}
  );
  color: ${({ theme }) => theme.colors.text.bodySoft};
  background: linear-gradient(
    105deg,
    ${({ theme }) => theme.colors.effects.moonlightSoft},
    transparent 42%,
    ${({ theme }) => theme.colors.effects.violetGlowSoft}
  );
  box-shadow: ${({ theme }) => theme.shadows.surfaceInset};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.micro};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.bodyWide};
  line-height: 1;
  text-decoration: none;
  text-transform: lowercase;
  isolation: isolate;
  transition:
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.ritual},
    transform ${({ theme }) => theme.transitions.ritual};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${({ theme }) => theme.colors.gradients.buttonGlint};
    transform: translateX(-130%);
    transition: transform ${({ theme }) => theme.motion.duration.sweep}
      ${({ theme }) => theme.motion.easing.enter};
    pointer-events: none;
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.spectral};
      color: ${({ theme }) => theme.colors.accent.magenta};
      box-shadow: ${({ theme }) => theme.shadows.spectral};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});
    }

    &:hover::before {
      transform: translateX(130%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before {
      display: none;
    }
  }

  @media (forced-colors: active) {
    border-color: LinkText;
    color: LinkText;
    background: Canvas;
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    justify-self: start;
  }
`

export const FooterBrandIcon = styled.span`
  display: block;
  width: ${({ theme }) => theme.spacing['2xl']};
  height: ${({ theme }) => theme.spacing['2xl']};
  flex: 0 0 auto;
  background: currentColor;
  mask: url("${({ $icon }) => $icon}") center / contain no-repeat;
  -webkit-mask: url("${({ $icon }) => $icon}") center / contain no-repeat;
`

export const FooterSocialList = styled.ul`
  grid-area: social;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} 0 0;
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  list-style: none;
`

export const FooterSocialItem = styled.li`
  flex: 0 0 auto;
`

export const FooterSocialPlaceholder = styled.button`
  position: relative;
  display: grid;
  width: 3.25rem;
  min-height: 3.25rem;
  padding: 0;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  border-radius: 0;
  color: ${({ theme, $tone = 'signal' }) =>
    theme.colors.accent[$tone] || theme.colors.text.bodyMuted};
  background:
    radial-gradient(
      circle,
      ${({ theme }) => theme.colors.effects.moonlightSoft},
      transparent 62%
    ),
    ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow:
    ${({ theme }) => theme.shadows.surfaceInset},
    0 0 0.65rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.bodyWide};
  opacity: 0.56;
  cursor: not-allowed;

  &::after {
    content: '';
    position: absolute;
    top: ${({ theme }) => theme.spacing.xs};
    right: ${({ theme }) => theme.spacing.xs};
    width: ${({ theme }) => theme.spacing.xs};
    height: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.accent.metal};
    box-shadow: 0 0 0.35rem ${({ theme }) => theme.colors.effects.goldGlowSoft};
  }

  @media (forced-colors: active) {
    border-color: GrayText;
    color: GrayText;
    background: Canvas;
    opacity: 1;
  }
`

export const FooterSocialIcon = styled(FooterBrandIcon)`
  width: 1.5rem;
  height: 1.5rem;
  filter: drop-shadow(0 0 0.35rem currentColor);
`

export const FooterFallbackSocialIcon = styled.span`
  color: currentColor;
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: 1.5rem;
  line-height: 1;
  text-shadow: 0 0 0.45rem currentColor;
`

export const SiteFooterHomeLink = styled(NavLink)`
  position: absolute;
  right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );
  bottom: ${({ theme }) => theme.spacing['3xl']};
  top: auto;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 10.5rem;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.strong};
  border-radius: 0;
  clip-path: polygon(
    ${({ theme }) => theme.spacing.sm} 0,
    100% 0,
    100% calc(100% - ${({ theme }) => theme.spacing.sm}),
    calc(100% - ${({ theme }) => theme.spacing.sm}) 100%,
    0 100%,
    0 ${({ theme }) => theme.spacing.sm}
  );
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  background:
    linear-gradient(105deg, ${({ theme }) => theme.colors.effects.acidGlowSoft}, transparent 46%, ${({ theme }) => theme.colors.effects.violetGlowSoft}),
    ${({ theme }) => theme.colors.background.surfaceRaised};
  box-shadow:
    0 0 1rem ${({ theme }) => theme.colors.effects.acidGlowSoft},
    inset 0 0 0 ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.colors.effects.moonlightSoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  transition:
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.ritual},
    transform ${({ theme }) => theme.transitions.ritual};

  &::before {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.accent.metalBright};
    text-shadow: 0 0 0.55rem ${({ theme }) => theme.colors.effects.goldGlow};
    content: '✦';
  }

  &::after {
    color: ${({ theme }) => theme.colors.accent.signal};
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    content: '↟';
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.accent.acidSoft};
      border-color: ${({ theme }) => theme.colors.accent.acid};
      box-shadow: ${({ theme }) => theme.shadows.acidHover};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});
    }
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    bottom: ${({ theme }) => theme.spacing['3xl']};
    right: max(${({ theme }) => theme.spacing.lg}, ${({ theme }) => theme.layout.safeArea.right});
    min-width: 9rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
