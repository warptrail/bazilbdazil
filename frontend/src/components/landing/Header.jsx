import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Container, NavLink, PrimaryButton } from '../../styles/primitives'

const navigationGlyphs = ['☉', '◇', '✦', '⌘']
const placeholderNavigation = [
  { label: 'Blog', glyph: '☾', placeholder: true },
  { label: 'Socials', glyph: '✧', placeholder: true },
  { label: 'Store', glyph: '♢', placeholder: true },
]
const HEADER_COLLAPSE_Y = 120
const HEADER_EXPAND_Y = 40

export function PracticeStrip() {
  return (
    <PracticeStripRoot aria-hidden="true">
      <PracticeStars aria-hidden="true" />
      <PracticeStripInner $maxWidth="100%">
        <PracticeOrnament aria-hidden="true">
          <PracticeLine />
          <PracticeDiamond>✦</PracticeDiamond>
          <PracticeLine />
        </PracticeOrnament>
        <PracticeOrnament aria-hidden="true" $reverse>
          <PracticeLine />
          <PracticeDiamond>✦</PracticeDiamond>
          <PracticeLine />
        </PracticeOrnament>
      </PracticeStripInner>
    </PracticeStripRoot>
  )
}

export function Header({ navigation }) {
  const primaryNavigation = navigation.filter((item) => item.href !== '#book')
  const headerNavigation = [
    ...primaryNavigation.map((item, index) => ({
      ...item,
      glyph: navigationGlyphs[index % navigationGlyphs.length],
    })),
    ...placeholderNavigation,
  ]
  const [activeHash, setActiveHash] = useState(() =>
    typeof window === 'undefined' ? '#home' : window.location.hash || '#home',
  )
  const [isScrolled, setIsScrolled] = useState(() =>
    typeof window === 'undefined' ? false : window.scrollY > HEADER_COLLAPSE_Y,
  )
  const [isSummoned, setIsSummoned] = useState(false)
  const isScrolledRef = useRef(isScrolled)
  const isCondensed = isScrolled && !isSummoned

  useEffect(() => {
    const updateActiveHash = () => setActiveHash(window.location.hash || '#home')

    window.addEventListener('hashchange', updateActiveHash)
    return () => window.removeEventListener('hashchange', updateActiveHash)
  }, [])

  useEffect(() => {
    let animationFrame = 0

    const commitScrollState = () => {
      animationFrame = 0
      const scrollY = Math.max(window.scrollY, 0)
      const nextIsScrolled = isScrolledRef.current
        ? scrollY > HEADER_EXPAND_Y
        : scrollY > HEADER_COLLAPSE_Y

      if (nextIsScrolled === isScrolledRef.current) return

      isScrolledRef.current = nextIsScrolled
      setIsScrolled(nextIsScrolled)

      if (nextIsScrolled) setIsSummoned(false)
    }

    const scheduleScrollState = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(commitScrollState)
    }

    commitScrollState()
    window.addEventListener('scroll', scheduleScrollState, { passive: true })
    window.addEventListener('resize', scheduleScrollState, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleScrollState)
      window.removeEventListener('resize', scheduleScrollState)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <HeaderFrame>
      <SiteHeader
        $condensed={isCondensed}
        onMouseEnter={() => {
          if (isScrolled) setIsSummoned(true)
        }}
        onMouseLeave={() => setIsSummoned(false)}
        onFocusCapture={() => setIsSummoned(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsSummoned(false)
        }}
      >
        <HeaderAura aria-hidden="true" />
        <HeaderInner $maxWidth="100%" $condensed={isCondensed}>
        <BrandLink href="#home" aria-label="Bazil Bacchanalia Dazil home">
          <BrandMark aria-hidden="true" $condensed={isCondensed}>
            <BrandOrbit />
            <BrandOrbit $inner />
            <BrandCore>✦</BrandCore>
          </BrandMark>
          <BrandLockup>
            <BrandText $condensed={isCondensed}>Bazil Bacchanalia Dazil</BrandText>
          </BrandLockup>
        </BrandLink>

        <Navigation aria-label="Primary navigation" $condensed={isCondensed}>
          {headerNavigation.map((item) => (
            <NavigationLink
              as={item.placeholder ? 'button' : undefined}
              key={item.href || item.label}
              href={item.href}
              type={item.placeholder ? 'button' : undefined}
              disabled={item.placeholder || undefined}
              aria-label={item.placeholder ? `${item.label} — coming soon` : undefined}
              $active={activeHash === item.href}
              $placeholder={item.placeholder}
              aria-current={activeHash === item.href ? 'location' : undefined}
            >
              <NavigationGlyph aria-hidden="true">
                {item.glyph}
              </NavigationGlyph>
              <NavigationLabel>{item.label}</NavigationLabel>
              {item.placeholder && <ComingSoon aria-hidden="true">Soon</ComingSoon>}
            </NavigationLink>
          ))}
        </Navigation>

        <HeaderActions>
          <HeaderBookLink
            href="#book"
            aria-label="Book a session"
            $active={activeHash === '#book'}
            $condensed={isCondensed}
            aria-current={activeHash === '#book' ? 'location' : undefined}
          >
            <BookSpark aria-hidden="true">✦</BookSpark>
            <HeaderBookLabel>Book</HeaderBookLabel>
          </HeaderBookLink>
        </HeaderActions>

        </HeaderInner>
      </SiteHeader>
    </HeaderFrame>
  )
}

const slowTurn = keyframes`
  to {
    transform: rotate(1turn);
  }
`

const starBreath = keyframes`
  0%, 100% {
    opacity: 0.28;
  }

  50% {
    opacity: 0.82;
  }
`

const crownShimmer = keyframes`
  0%, 18% {
    transform: translateX(-140%);
    opacity: 0;
  }

  34% {
    opacity: 0.72;
  }

  52%, 100% {
    transform: translateX(140%);
    opacity: 0;
  }
`

const ctaHueDrift = keyframes`
  0%, 100% {
    background-position: 0 0, 0% 50%;
  }

  50% {
    background-position: 0 0, 100% 50%;
  }
`

const PracticeStripRoot = styled.div`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  overflow: hidden;
  padding-top: ${({ theme }) => theme.layout.safeArea.top};
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.subtle};
  background:
    linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent),
    ${({ theme }) => theme.colors.background.header};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.effects.moonlightSoft};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    z-index: 1;
    width: 0.42rem;
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.metal};
    transform: translateY(-50%) rotate(45deg);
    box-shadow: 0 0 0.75rem ${({ theme }) => theme.colors.effects.starlightSoft};
  }

  &::before {
    left: ${({ theme }) => theme.spacing.md};
  }

  &::after {
    right: ${({ theme }) => theme.spacing.md};
  }
`

const PracticeStars = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.62;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 7% 32%, ${({ theme }) => theme.colors.accent.signal} 0 1px, transparent 1.5px),
    radial-gradient(circle at 19% 70%, ${({ theme }) => theme.colors.accent.metal} 0 1px, transparent 1.5px),
    radial-gradient(circle at 35% 22%, ${({ theme }) => theme.colors.accent.rose} 0 1px, transparent 1.5px),
    radial-gradient(circle at 68% 64%, ${({ theme }) => theme.colors.accent.signal} 0 1px, transparent 1.5px),
    radial-gradient(circle at 83% 24%, ${({ theme }) => theme.colors.accent.metal} 0 1px, transparent 1.5px),
    radial-gradient(circle at 94% 74%, ${({ theme }) => theme.colors.accent.rose} 0 1px, transparent 1.5px);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 32%;
    background: linear-gradient(
      110deg,
      transparent 20%,
      ${({ theme }) => theme.colors.effects.goldGlowSoft} 42%,
      ${({ theme }) => theme.colors.effects.moonlight} 50%,
      ${({ theme }) => theme.colors.effects.goldGlowSoft} 58%,
      transparent 80%
    );
    transform: translateX(-140%);
    animation: ${crownShimmer} ${({ theme }) => theme.motion.duration.ambient}
      ${({ theme }) => theme.motion.easing.enter} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      display: none;
    }
  }
`

const PracticeStripInner = styled(Container)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  min-height: 0.75rem;
  padding-left: max(
    ${({ theme }) => theme.spacing['3xl']},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  padding-right: max(
    ${({ theme }) => theme.spacing['3xl']},
    ${({ theme }) => theme.layout.safeArea.right}
  );
`

const PracticeOrnament = styled.span`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: ${({ $reverse }) => ($reverse ? 'flex-start' : 'flex-end')};
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: none;
  transform: ${({ $reverse }) => ($reverse ? 'scaleX(-1)' : 'none')};
`

const PracticeLine = styled.span`
  width: min(34vw, 28rem);
  height: ${({ theme }) => theme.borders.width.thin};
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border.strong});
`

const PracticeDiamond = styled.span`
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  line-height: 1;
`

const HeaderFrame = styled.div`
  height: calc(
    ${({ theme }) => theme.layout.headerOffset} +
      ${({ theme }) => theme.layout.controlMinHeight} + ${({ theme }) => theme.spacing.lg} +
      ${({ theme }) => theme.borders.width.thin}
  );

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    height: ${({ theme }) => theme.layout.compactHeaderOffset};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    height: calc(
      ${({ theme }) => theme.layout.headerOffset} + 1.6rem +
        ${({ theme }) => theme.borders.width.thin}
    );
  }
`

const SiteHeader = styled.header`
  position: fixed;
  top: calc(0.75rem + ${({ theme }) => theme.layout.safeArea.top});
  right: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  overflow: hidden;
  overflow-anchor: none;
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  background:
    linear-gradient(90deg, ${({ theme }) => theme.colors.effects.goldGlowSoft}, transparent 18%, transparent 82%, ${({ theme }) => theme.colors.effects.cyanGlow}),
    radial-gradient(circle at 50% -55%, ${({ theme }) => theme.colors.effects.violetGlow} 0%, transparent 68%),
    ${({ theme }) => theme.colors.background.header};
  backdrop-filter: blur(1rem) saturate(135%);
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.effects.moonlightSoft},
    inset 0 -0.35rem 1.5rem ${({ theme }) => theme.colors.effects.inkVeil},
    0 1rem 3rem ${({ theme }) => theme.colors.background.canvas};
  transition:
    box-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    background-color ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 28%;
    height: ${({ theme }) => theme.borders.width.thin};
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent.metal}, transparent);
  }

  &::after {
    right: 0;
    background: linear-gradient(270deg, ${({ theme }) => theme.colors.accent.signal}, transparent);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    background:
      radial-gradient(circle at 18% 80%, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent 46%),
      radial-gradient(circle at 90% 20%, ${({ theme }) => theme.colors.effects.cyanGlow}, transparent 38%),
      ${({ theme }) => theme.colors.background.header};
    box-shadow:
      inset 0 1px 0 ${({ theme }) => theme.colors.effects.moonlightSoft},
      0 0.75rem 2.5rem ${({ theme }) => theme.colors.background.canvas};
  }
`

const HeaderAura = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.38;
  pointer-events: none;
  background-image:
    repeating-radial-gradient(circle at 16% 50%, transparent 0 0.65rem, ${({ theme }) => theme.colors.border.surface} 0.68rem, transparent 0.72rem),
    linear-gradient(90deg, transparent 49.9%, ${({ theme }) => theme.colors.border.violet} 50%, transparent 50.1%),
    repeating-linear-gradient(90deg, transparent 0 4.9rem, ${({ theme }) => theme.colors.border.surface} 5rem, transparent 5.05rem),
    radial-gradient(circle at 12% 45%, ${({ theme }) => theme.colors.accent.metal} 0 1px, transparent 1.5px),
    radial-gradient(circle at 88% 45%, ${({ theme }) => theme.colors.accent.signal} 0 1px, transparent 1.5px);
`

const HeaderInner = styled(Container)`
  position: relative;
  display: grid;
  grid-template-areas:
    'brand actions'
    'nav nav';
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  align-items: center;
  min-height: ${({ theme }) => theme.layout.headerOffset};
  padding-block: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );
  transition:
    min-height ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    padding ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    gap ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: ${({ theme }) => theme.spacing.sm};
    bottom: ${({ theme }) => theme.spacing.sm};
    width: 0.5rem;
    border-block: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surfaceRaised};
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    gap: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    min-height: ${({ theme }) => theme.layout.compactHeaderOffset};
    padding: ${({ theme }) => theme.spacing.sm} max(
      ${({ theme }) => theme.spacing.md},
      ${({ theme }) => theme.layout.safeArea.right}
    );

    ${({ $condensed, theme }) =>
      $condensed &&
      css`
        gap: 0 ${theme.spacing.sm};
        min-height: 3.65rem;
        padding-block: ${theme.spacing.xs};
      `}
  }

  &::before {
    left: ${({ theme }) => theme.spacing.sm};
    border-left: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surfaceRaised};
  }

  &::after {
    right: ${({ theme }) => theme.spacing.sm};
    border-right: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surfaceRaised};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    grid-template-areas: 'brand nav actions';
    grid-template-columns: minmax(15rem, auto) minmax(0, 1fr) minmax(7.5rem, auto);
    gap: clamp(
      ${({ theme }) => theme.spacing.lg},
      2vw,
      ${({ theme }) => theme.spacing['5xl']}
    );
    min-height: calc(${({ theme }) => theme.layout.headerOffset} + 1.6rem);
    padding-block: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    ${({ $condensed, theme }) =>
      $condensed &&
      css`
        grid-template-areas:
          'brand actions'
          'nav nav';
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 0 ${theme.spacing.lg};
        min-height: 4.25rem;
        padding-block: ${theme.spacing.sm};
      `}
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    ${({ $condensed, theme }) =>
      $condensed &&
      css`
        gap: ${theme.spacing.xl};
        min-height: 4.25rem;
        padding-block: ${theme.spacing.sm};
      `}
  }
`

const BrandLink = styled.a`
  grid-area: brand;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: fit-content;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  color: ${({ theme }) => theme.colors.text.primary};
  transition:
    color ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.accent.acidSoft};
      filter: drop-shadow(0 0 0.65rem ${({ theme }) => theme.colors.effects.acidGlowSoft});
    }

    &:hover > span:first-child {
      transform: rotate(30deg) scale(1.06);
    }
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.layout.focusOffset};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    gap: ${({ theme }) => theme.spacing.sm};
    min-height: 2.5rem;
  }
`

const BrandMark = styled.span`
  position: relative;
  display: grid;
  flex: 0 0 auto;
  width: 3.25rem;
  aspect-ratio: 1;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.strong};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.acid};
  background:
    radial-gradient(circle, ${({ theme }) => theme.colors.effects.acidGlowSoft}, transparent 64%),
    ${({ theme }) => theme.colors.background.surface};
  box-shadow:
    ${({ theme }) => theme.shadows.insetOrbital},
    0 0 0 0.25rem ${({ theme }) => theme.colors.effects.inkVeil},
    0 0 0 0.3rem ${({ theme }) => theme.colors.border.filigree},
    0 0 1.4rem ${({ theme }) => theme.colors.effects.acidGlowSoft};
  transition: transform ${({ theme }) => theme.transitions.base};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    width: ${({ $condensed }) => ($condensed ? '1.85rem' : '2.25rem')};
    transition:
      width ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
      transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};
  }

  &::before {
    width: 130%;
    height: ${({ theme }) => theme.borders.width.thin};
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border.filigreeBright}, transparent);
  }

  &::after {
    width: ${({ theme }) => theme.borders.width.thin};
    height: 130%;
    background: linear-gradient(180deg, transparent, ${({ theme }) => theme.colors.border.signal}, transparent);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    width: ${({ $condensed }) => ($condensed ? '2.4rem' : '3.25rem')};
    transition:
      width ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
      transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};
  }
`

const BrandOrbit = styled.span`
  position: absolute;
  inset: ${({ $inner }) => ($inner ? '27%' : '12%')};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $inner }) =>
      $inner ? theme.colors.border.signal : theme.colors.border.violetStrong};
  border-radius: ${({ theme }) => theme.radii.orbital};
  transform: ${({ $inner }) => ($inner ? 'rotate(45deg)' : 'none')};
  animation: ${slowTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite
    ${({ $inner }) => ($inner ? 'reverse' : 'normal')};

  &::before {
    content: '';
    position: absolute;
    top: -0.16rem;
    left: 50%;
    width: 0.26rem;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme, $inner }) =>
      $inner ? theme.colors.accent.signal : theme.colors.accent.metal};
    box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.effects.starlight};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const BrandCore = styled.span`
  position: relative;
  z-index: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: 1;
`

const BrandLockup = styled.span`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`

const BrandText = styled.span`
  max-width: 15ch;
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: clamp(1.2rem, 4.8vw, 1.72rem);
  line-height: 0.9;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  text-transform: uppercase;
  text-shadow: 0 0 1.2rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  transition:
    font-size ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    letter-spacing ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    max-width: none;
    font-size: ${({ $condensed }) => ($condensed ? '0.7rem' : '0.78rem')};
    line-height: 1;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.editorial};
    white-space: nowrap;
  }

  @media (max-width: 360px) {
    max-width: 12ch;
    font-size: ${({ $condensed }) => ($condensed ? '0.66rem' : '0.72rem')};
    line-height: 0.92;
    white-space: normal;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    max-width: ${({ $condensed }) => ($condensed ? 'none' : 'none')};
    font-size: ${({ $condensed }) =>
      $condensed ? '1.02rem' : 'clamp(1.4rem, 1.8vw, 1.9rem)'};
    line-height: ${({ $condensed }) => ($condensed ? 1 : 0.9)};
    letter-spacing: ${({ theme, $condensed }) =>
      $condensed
        ? theme.typography.letterSpacing.editorial
        : theme.typography.letterSpacing.brand};
    white-space: ${({ $condensed }) => ($condensed ? 'nowrap' : 'normal')};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: 1199px) {
    ${({ $condensed, theme }) =>
      $condensed &&
      css`
        max-width: none;
        font-size: 1.02rem;
        line-height: 1;
        letter-spacing: ${theme.typography.letterSpacing.editorial};
        white-space: nowrap;
      `}
  }

`

const HeaderActions = styled.div`
  position: relative;
  grid-area: actions;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    gap: ${({ theme }) => theme.spacing.md};

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 100%;
      width: clamp(1.5rem, 4vw, 4.5rem);
      height: ${({ theme }) => theme.borders.width.thin};
      background: linear-gradient(90deg, ${({ theme }) => theme.colors.border.filigree}, transparent);
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
`

const Navigation = styled.nav`
  grid-area: nav;
  display: flex;
  container-type: inline-size;
  gap: 0;
  align-items: stretch;
  justify-content: flex-start;
  margin-inline: calc(-1 * ${({ theme }) => theme.spacing.sectionX});
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  scrollbar-width: none;
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  opacity: 1;
  transform: translateY(0);
  transition:
    max-height ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    padding ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    margin ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    opacity ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    max-height: 2.65rem;
    margin-inline: 0;
    padding: ${({ theme }) => theme.spacing.xs} 0 0;
    border-top-color: ${({ theme }) => theme.colors.border.surfaceRaised};

    ${({ $condensed }) =>
      $condensed &&
      css`
        max-height: 0;
        padding-block: 0;
        overflow: hidden;
        border-color: transparent;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-0.25rem);
      `}
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    position: relative;
    justify-content: stretch;
    gap: 0;
    width: auto;
    margin: 0;
    padding: clamp(
      ${({ theme }) => theme.spacing.xs},
      0.4vw,
      ${({ theme }) => theme.spacing.sm}
    );
    overflow: visible;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surfaceRaised};
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.effects.moonlightSoft}, transparent 52%);
    box-shadow:
      inset 0 0 0 ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.colors.effects.inkVeil},
      ${({ theme }) => theme.shadows.filigree};
    max-height: 5rem;

    &::before,
    &::after {
      content: '✦';
      position: absolute;
      top: 50%;
      color: ${({ theme }) => theme.colors.accent.metal};
      font-size: 0.52rem;
      transform: translateY(-50%);
    }

    &::before {
      left: -0.28rem;
    }

    &::after {
      right: -0.28rem;
    }

    @media (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
      ${({ $condensed }) =>
        $condensed &&
        css`
          max-height: 0;
          margin: 0;
          padding-block: 0;
          overflow: hidden;
          border-width: 0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-0.45rem);
        `}
    }
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    transition:
      opacity ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
      transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

    ${({ $condensed }) =>
      $condensed &&
      css`
        opacity: 0;
        pointer-events: none;
        transform: translateY(-0.2rem) scale(0.985);
      `}
  }
`

const NavigationLink = styled(NavLink)`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  flex: 0 0 auto;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-inline: ${({ theme }) => theme.spacing.md};
  border-block: 0;
  border-inline: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $active }) =>
      $active ? theme.colors.border.filigree : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.navigation};
  background: ${({ theme, $active }) =>
    $active
      ? `linear-gradient(180deg, ${theme.colors.effects.goldGlowSoft}, ${theme.colors.effects.violetGlowSoft})`
      : 'transparent'};
  box-shadow: ${({ theme, $active }) =>
    $active
      ? `inset 0 0 1.5rem ${theme.colors.effects.violetGlowSoft}`
      : 'none'};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.editorial};
  white-space: nowrap;
  cursor: ${({ $placeholder }) => ($placeholder ? 'default' : 'pointer')};
  transition:
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    color ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    letter-spacing ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    box-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.standard},
    background-color ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.standard},
    border-color ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.standard};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      110deg,
      transparent 20%,
      ${({ theme }) => theme.colors.effects.goldGlowSoft} 46%,
      ${({ theme }) => theme.colors.effects.moonlight} 50%,
      ${({ theme }) => theme.colors.effects.goldGlowSoft} 54%,
      transparent 80%
    );
    transform: translateX(-130%);
    transition: transform ${({ theme }) => theme.motion.duration.sweep}
      ${({ theme }) => theme.motion.easing.enter};
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: 18%;
    bottom: 0;
    left: 18%;
    height: ${({ theme }) => theme.borders.width.thin};
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme, $active }) =>
        $active ? theme.colors.accent.acid : theme.colors.accent.metalBright},
      transparent
    );
    box-shadow: 0 0 0.7rem ${({ theme, $active }) =>
      $active ? theme.colors.effects.acidGlow : theme.colors.effects.goldGlowSoft};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform ${({ theme }) => theme.motion.duration.luxury}
      ${({ theme }) => theme.motion.easing.enter};
  }

  @media (hover: hover) {
    &:hover {
      border-inline-color: ${({ theme }) => theme.colors.border.filigree};
      color: ${({ theme }) => theme.colors.text.primary};
      letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
      background: linear-gradient(
        180deg,
        ${({ theme }) => theme.colors.effects.goldGlowSoft},
        ${({ theme }) => theme.colors.effects.violetGlowSoft}
      );
      box-shadow:
        inset 0 0 1.5rem ${({ theme }) => theme.colors.effects.violetGlowSoft},
        0 0.5rem 1.5rem ${({ theme }) => theme.colors.effects.inkVeil};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});
    }

    &:hover::before {
      transform: translateX(130%);
    }

    &:hover::after {
      transform: scaleX(1);
    }

    &:hover > span:first-child {
      color: ${({ theme }) => theme.colors.accent.metalPale};
      transform: translateY(-1px) rotate(8deg) scale(1.06);
      text-shadow: 0 0 0.65rem ${({ theme }) => theme.colors.effects.goldGlow};
    }
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      > span:first-child {
        color: ${theme.colors.accent.acidSoft};
        text-shadow: 0 0 0.65rem ${theme.colors.effects.acidGlowSoft};
      }
    `}

  ${({ $placeholder, theme }) =>
    $placeholder &&
    css`
      color: ${theme.colors.text.bodySoft};
      background: repeating-linear-gradient(
        135deg,
        transparent 0 0.45rem,
        ${theme.colors.effects.moonlightSoft} 0.5rem 0.53rem
      );
      opacity: 0.62;

      &::before,
      &::after {
        display: none;
      }

      &:hover {
        color: ${theme.colors.text.bodySoft};
        letter-spacing: ${theme.typography.letterSpacing.editorial};
        border-inline-color: transparent;
        background: repeating-linear-gradient(
          135deg,
          transparent 0 0.45rem,
          ${theme.colors.effects.moonlightSoft} 0.5rem 0.53rem
        );
        box-shadow: none;
        transform: none;
      }

      &:hover > span:first-child {
        color: ${theme.colors.accent.metal};
        text-shadow: none;
        transform: none;
      }
    `}

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-height: 2.25rem;
    padding-inline: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    flex: 1 1 0;
    justify-content: center;
    min-width: 0;
    gap: clamp(${({ theme }) => theme.spacing.xs}, 0.45vw, ${({ theme }) => theme.spacing.sm});
    padding-inline: clamp(
      ${({ theme }) => theme.spacing.xs},
      0.55vw,
      ${({ theme }) => theme.spacing.sm}
    );
    font-size: clamp(0.68rem, 0.95vw, ${({ theme }) => theme.typography.fontSize.sm});
    letter-spacing: clamp(0.04em, 0.1vw, ${({ theme }) => theme.typography.letterSpacing.editorial});

    & + & {
      border-left-color: ${({ theme }) => theme.colors.border.surface};
    }
  }

  @container (max-width: 42rem) {
    gap: ${({ theme }) => theme.spacing.xs};
    padding-inline: ${({ theme }) => theme.spacing.xs};
    font-size: 0.68rem;
    letter-spacing: 0.04em;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &::before {
      display: none;
    }

    &::after {
      transition-duration: ${({ theme }) => theme.motion.duration.reduced};
    }

    &:hover {
      transform: none;
    }
  }
`

const NavigationGlyph = styled.span`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.accent.metal};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: 1;
  transition:
    color ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    text-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.standard};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.compact}) {
    display: none;
  }

  @container (max-width: 42rem) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`

const NavigationLabel = styled.span`
  position: relative;
  z-index: 1;
  min-width: 0;
  line-height: 1;
`

const ComingSoon = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.accent.metalDim};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: 0.42rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    position: static;
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`

const HeaderBookLink = styled(PrimaryButton)`
  position: relative;
  min-width: 5.6rem;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  overflow: hidden;
  padding-inline: ${({ theme }) => theme.spacing.md};
  clip-path: polygon(0.45rem 0, calc(100% - 0.45rem) 0, 100% 0.45rem, 100% calc(100% - 0.45rem), calc(100% - 0.45rem) 100%, 0.45rem 100%, 0 calc(100% - 0.45rem), 0 0.45rem);
  border: 0;
  color: ${({ theme }) => theme.colors.text.onAccent};
  background:
    radial-gradient(circle at 22% 0%, ${({ theme }) => theme.colors.effects.moonlight}, transparent 34%),
    linear-gradient(
      110deg,
      ${({ theme }) => theme.colors.accent.acidSurface},
      ${({ theme }) => theme.colors.accent.acid},
      ${({ theme }) => theme.colors.accent.signal},
      ${({ theme }) => theme.colors.accent.rose},
      ${({ theme }) => theme.colors.accent.acidSurface}
    );
  background-size: 100% 100%, 280% 100%;
  filter: ${({ $active }) => ($active ? 'brightness(1.08)' : 'none')};
  box-shadow:
    0 0.8rem 1.4rem ${({ theme }) => theme.colors.effects.inkVeil},
    0 1.1rem 2.4rem ${({ theme }) => theme.colors.background.canvas},
    0 0 1.6rem ${({ theme, $active }) =>
      $active ? theme.colors.effects.acidGlow : theme.colors.effects.violetGlowSoft};
  animation: ${ctaHueDrift} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;
  transition:
    min-height ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    min-width ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    padding ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    box-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.standard};

  &::before {
    content: '';
    position: absolute;
    inset: -100% 55% -100% -40%;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.effects.moonlight}, transparent);
    transform: translateX(-100%) rotate(18deg);
    transition: transform ${({ theme }) => theme.motion.duration.ritual}
      ${({ theme }) => theme.motion.easing.enter};
  }

  @media (hover: hover) {
    &:hover {
      border: 0;
      color: ${({ theme }) => theme.colors.text.onAccent};
      background:
        radial-gradient(circle at 22% 0%, ${({ theme }) => theme.colors.effects.moonlight}, transparent 34%),
        linear-gradient(
          110deg,
          ${({ theme }) => theme.colors.accent.acidSurface},
          ${({ theme }) => theme.colors.accent.acid},
          ${({ theme }) => theme.colors.accent.signal},
          ${({ theme }) => theme.colors.accent.rose},
          ${({ theme }) => theme.colors.accent.acidSurface}
        );
      background-size: 100% 100%, 280% 100%;
      box-shadow:
        0 0.9rem 1.5rem ${({ theme }) => theme.colors.effects.inkVeil},
        0 1.2rem 2.6rem ${({ theme }) => theme.colors.background.canvas},
        0 0 2rem ${({ theme }) => theme.colors.effects.acidGlow};
    }

    &:hover::before {
      transform: translateX(260%) rotate(18deg);
    }
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-width: ${({ $condensed }) => ($condensed ? '4.5rem' : '5rem')};
    min-height: ${({ $condensed }) => ($condensed ? '2.35rem' : '2.55rem')};
    padding-inline: ${({ theme }) => theme.spacing.md};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    min-width: ${({ $condensed }) => ($condensed ? '5.8rem' : '7.5rem')};
    min-height: ${({ theme, $condensed }) =>
      $condensed ? theme.layout.controlMinHeight : theme.layout.buttonMinHeight};
    padding-inline: ${({ theme, $condensed }) =>
      $condensed ? theme.spacing.lg : theme.spacing['2xl']};

  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: 1199px) {
    ${({ $condensed, theme }) =>
      $condensed &&
      css`
        min-width: 5.8rem;
        min-height: ${theme.layout.controlMinHeight};
        padding-inline: ${theme.spacing.lg};

      `}
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-position: 0 0, 0 50%;

    &::before {
      display: none;
    }
  }
`

const BookSpark = styled.span`
  position: relative;
  z-index: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  animation: ${starBreath} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const HeaderBookLabel = styled.span`
  position: relative;
  z-index: 1;
  line-height: 1;
  color: inherit;
  text-shadow: 0 1px 0 ${({ theme }) => theme.colors.effects.glassHighlight};

  @media (forced-colors: active) {
    color: ButtonText;
    text-shadow: none;
  }
`
