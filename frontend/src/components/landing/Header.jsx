import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { EXPERIENCE_TRANSITION_PHASES } from '../../context/experienceMode'
import { Container, NavLink, PrimaryButton } from '../../styles/primitives'
import { HeaderOracle } from './HeaderOracle'

const navigationGlyphs = ['☉', '◇', '✦', '⌘']
const placeholderNavigation = [
  { label: 'Blog', glyph: '☾', placeholder: true },
  { label: 'Socials', glyph: '✧', placeholder: true },
  { label: 'Store', glyph: '♢', placeholder: true },
]
const BOOK_OBJECT_SHAPE =
  'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)'

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

export function Header({ navigation, transitionPhase, journeyChapterId = 'home' }) {
  const primaryNavigation = navigation.filter((item) => item.href !== '#book')
  const headerNavigation = [
    ...primaryNavigation.map((item, index) => ({
      ...item,
      glyph: navigationGlyphs[index % navigationGlyphs.length],
    })),
    ...placeholderNavigation,
  ]
  const activeHash = `#${journeyChapterId}`
  const [isBrandBursting, setIsBrandBursting] = useState(false)
  const [isBookPurring, setIsBookPurring] = useState(false)
  const isCondensed = false
  const isClownReveal = transitionPhase === EXPERIENCE_TRANSITION_PHASES.REVEALING

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let startTimer = 0
    let stopTimer = 0
    let disposed = false

    const clearPurrTimers = () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(stopTimer)
    }

    const schedulePurr = () => {
      if (motionQuery.matches || disposed) return

      startTimer = window.setTimeout(
        () => {
          if (disposed) return
          setIsBookPurring(true)
          stopTimer = window.setTimeout(
            () => {
              if (disposed) return
              setIsBookPurring(false)
              schedulePurr()
            },
            720 + Math.random() * 420,
          )
        },
        2800 + Math.random() * 7600,
      )
    }

    const updateMotionPreference = () => {
      clearPurrTimers()
      setIsBookPurring(false)
      schedulePurr()
    }

    motionQuery.addEventListener('change', updateMotionPreference)
    schedulePurr()

    return () => {
      disposed = true
      clearPurrTimers()
      motionQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  return (
    <HeaderFrame>
      <SiteHeader
        data-site-header
        $condensed={isCondensed}
        $revealing={isClownReveal}
      >
        <HeaderAura aria-hidden="true" />
        <HeaderInner $maxWidth="100%" $condensed={isCondensed}>
          <HeaderOracle condensed={isCondensed} onBurstChange={setIsBrandBursting} />

          <Navigation
            aria-label="Primary navigation"
            $condensed={isCondensed}
            $brandBursting={isBrandBursting}
          >
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
              $purring={isBookPurring}
              aria-current={activeHash === '#book' ? 'location' : undefined}
            >
              <BookDepth aria-hidden="true" />
              <BookFace>
                <BookSpark aria-hidden="true">✦</BookSpark>
                <HeaderBookLabel>Book</HeaderBookLabel>
                <BookFacet aria-hidden="true" />
              </BookFace>
            </HeaderBookLink>
          </HeaderActions>
        </HeaderInner>
      </SiteHeader>
    </HeaderFrame>
  )
}

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

const bookPurr = keyframes`
  0%, 18%, 47%, 72%, 100% {
    transform: perspective(30rem) rotateX(-4deg) rotateY(-6deg) translate3d(0, 0, 0)
      scale(1);
  }

  4% {
    transform: perspective(30rem) rotateX(-2deg) rotateY(-8deg)
      translate3d(0.035rem, -0.025rem, 0) scale(1.008);
  }

  8% {
    transform: perspective(30rem) rotateX(-6deg) rotateY(-3deg)
      translate3d(-0.04rem, 0.018rem, 0) scale(0.997);
  }

  12% {
    transform: perspective(30rem) rotateX(-3deg) rotateY(-7deg)
      translate3d(0.022rem, -0.012rem, 0) scale(1.004);
  }

  52% {
    transform: perspective(30rem) rotateX(-7deg) rotateY(-1deg)
      translate3d(-0.03rem, -0.04rem, 0) scale(1.012);
  }

  57% {
    transform: perspective(30rem) rotateX(-1deg) rotateY(-9deg)
      translate3d(0.045rem, 0.02rem, 0) scale(1.002);
  }

  63% {
    transform: perspective(30rem) rotateX(-5deg) rotateY(-4deg)
      translate3d(-0.018rem, -0.01rem, 0) scale(1.007);
  }
`

const bookDepthPurr = keyframes`
  0%, 100% { transform: translate3d(0.32rem, 0.38rem, -0.5rem); }
  22% { transform: translate3d(0.38rem, 0.34rem, -0.58rem); }
  46% { transform: translate3d(0.27rem, 0.42rem, -0.44rem); }
  68% { transform: translate3d(0.35rem, 0.36rem, -0.54rem); }
`

const bookFacePurr = keyframes`
  0%, 100% { transform: translateZ(0.5rem) scale(1); }
  24% { transform: translate3d(0.018rem, -0.012rem, 0.58rem) scale(1.006); }
  49% { transform: translate3d(-0.022rem, 0.016rem, 0.46rem) scale(0.998); }
  73% { transform: translate3d(0.012rem, -0.008rem, 0.54rem) scale(1.004); }
`

const bookSparkPurr = keyframes`
  0%, 100% { opacity: 0.44; transform: rotate(0deg) scale(0.92); }
  32% { opacity: 1; transform: rotate(17deg) scale(1.18); }
  58% { opacity: 0.68; transform: rotate(-9deg) scale(0.98); }
  82% { opacity: 0.92; transform: rotate(7deg) scale(1.1); }
`

const headerBreach = keyframes`
  0% {
    filter: hue-rotate(0deg) saturate(0.82);
    transform: translate3d(0, 0, 0) scaleY(0.98);
  }

  28% {
    filter: hue-rotate(44deg) saturate(1.34);
    transform: translate3d(-1px, 1px, 0) scaleY(1.015);
  }

  62% {
    filter: hue-rotate(112deg) saturate(1.18);
    transform: translate3d(1px, 0, 0) scaleY(0.995);
  }

  100% {
    filter: none;
    transform: translate3d(0, 0, 0) scaleY(1);
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
    height: calc(
      ${({ theme }) => theme.layout.compactHeaderOffset} +
        ${({ theme }) => theme.spacing.md}
    );
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    height: calc(
      ${({ theme }) => theme.layout.headerOffset} + ${({ theme }) => theme.borders.width.thin}
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

  ${({ $revealing, theme }) =>
    $revealing &&
    css`
      animation: ${headerBreach} ${theme.motion.duration.reveal}
        ${theme.motion.easing.enter} both;
    `}

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

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
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
    gap: ${({ theme }) => theme.spacing.md};
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
    grid-template-areas:
      'brand actions'
      'nav actions';
    grid-template-columns: minmax(0, 1fr) minmax(7.5rem, auto);
    gap: ${({ theme }) => theme.spacing.sm}
      clamp(
        ${({ theme }) => theme.spacing.lg},
        2vw,
        ${({ theme }) => theme.spacing['5xl']}
      );
    min-height: ${({ theme }) => theme.layout.headerOffset};
    padding-block: ${({ theme }) => theme.spacing.sm};
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

const HeaderActions = styled.div`
  position: relative;
  grid-area: actions;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  perspective: 30rem;
  perspective-origin: center;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    padding-inline-end: calc(
      ${({ theme }) => theme.layout.controlMinHeight} +
        ${({ theme }) => theme.spacing.md}
    );
  }

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
    width ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) => theme.motion.easing.enter},
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
    width: 100%;
    max-width: 64rem;
    margin: 0;
    padding: clamp(
      ${({ theme }) => theme.spacing.xs},
      0.4vw,
      ${({ theme }) => theme.spacing.sm}
    );
    overflow: visible;
    border: 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.effects.moonlightSoft} 10%,
      ${({ theme }) => theme.colors.background.glassViolet} 50%,
      ${({ theme }) => theme.colors.effects.moonlightSoft} 90%,
      transparent
    );
    box-shadow: none;
    max-height: 5rem;

    &::before,
    &::after {
      content: '';
      position: absolute;
      right: clamp(${({ theme }) => theme.spacing.lg}, 5vw, ${({ theme }) => theme.spacing['5xl']});
      left: clamp(${({ theme }) => theme.spacing.lg}, 5vw, ${({ theme }) => theme.spacing['5xl']});
      height: ${({ theme }) => theme.borders.width.thin};
      background: linear-gradient(
        90deg,
        transparent,
        ${({ theme }) => theme.colors.border.filigree},
        ${({ theme }) => theme.colors.border.violetStrong},
        transparent
      );
      pointer-events: none;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }

    ${({ $brandBursting, theme }) =>
      $brandBursting &&
      css`
        width: calc(100% - clamp(15rem, 31vw, 20rem));
        margin-inline-start: clamp(15rem, 31vw, 20rem);
        opacity: 0.72;
        transform: translate3d(${theme.spacing.md}, ${theme.spacing.xs}, 0) scale(0.985);
      `}

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
      width ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) => theme.motion.easing.enter},
      margin ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) => theme.motion.easing.enter},
      opacity ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
      transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

    ${({ $brandBursting }) =>
      $brandBursting &&
      css`
        width: calc(100% - clamp(19rem, 24vw, 24rem));
        margin-inline-start: clamp(19rem, 24vw, 24rem);
      `}

    ${({ $condensed }) =>
      $condensed &&
      css`
        max-height: 0;
        padding: 0;
        overflow: hidden;
        border-width: 0;
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

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    min-height: 2.25rem;
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

const BookDepth = styled.span`
  position: absolute;
  inset: 0;
  z-index: 0;
  clip-path: ${BOOK_OBJECT_SHAPE};
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.background.surfacePressed},
    ${({ theme }) => theme.colors.accent.ultravioletStrong} 58%,
    ${({ theme }) => theme.colors.accent.rose}
  );
  box-shadow:
    0 0.8rem 1rem ${({ theme }) => theme.colors.effects.inkVeil},
    0 1rem 2rem ${({ theme }) => theme.colors.background.canvas};
  pointer-events: none;
  transform: translate3d(0.32rem, 0.38rem, -0.5rem);
  transition: transform ${({ theme }) => theme.motion.duration.luxury}
    ${({ theme }) => theme.motion.easing.magnetic};
`

const BookFace = styled.span`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  padding-inline: ${({ theme }) => theme.spacing.md};
  clip-path: ${BOOK_OBJECT_SHAPE};
  background:
    radial-gradient(
      circle at 22% 0%,
      ${({ theme }) => theme.colors.effects.moonlight},
      transparent 34%
    ),
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
    inset 0 1px 0 ${({ theme }) => theme.colors.effects.glassHighlight},
    inset 0 -0.28rem 0.62rem ${({ theme }) => theme.colors.effects.glassShade},
    inset 0 0 0 ${({ theme }) => theme.spacing.xs}
      ${({ theme }) => theme.colors.effects.moonlightSoft},
    0 0 1.7rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  backface-visibility: hidden;
  transform: translateZ(0.5rem);
  transition:
    transform ${({ theme }) => theme.motion.duration.luxury}
      ${({ theme }) => theme.motion.easing.magnetic},
    box-shadow ${({ theme }) => theme.motion.duration.luxury}
      ${({ theme }) => theme.motion.easing.standard};
  animation: ${ctaHueDrift} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    right: 0.5rem;
    left: 0.5rem;
    height: ${({ theme }) => theme.borders.width.thin};
    pointer-events: none;
  }

  &::before {
    top: 0.16rem;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.effects.glassHighlight},
      transparent
    );
  }

  &::after {
    bottom: 0.18rem;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.effects.glassShade},
      transparent
    );
  }
`

const BookFacet = styled.span`
  position: absolute;
  inset: -110% 62% -110% -42%;
  z-index: 0;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.effects.moonlight},
    transparent
  );
  pointer-events: none;
  transform: translateX(-110%) rotate(18deg);
  transition: transform ${({ theme }) => theme.motion.duration.ritual}
    ${({ theme }) => theme.motion.easing.enter};
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

const HeaderBookLink = styled(PrimaryButton)`
  position: relative;
  min-width: 5.6rem;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  overflow: visible;
  padding: 0;
  clip-path: none;
  border: 0;
  color: ${({ theme }) => theme.colors.text.onAccent};
  background: none;
  box-shadow: none;
  transform: perspective(30rem) rotateX(-4deg) rotateY(-6deg) translateZ(0);
  transform-style: preserve-3d;
  transition:
    min-height ${({ theme }) => theme.motion.duration.luxury}
      ${({ theme }) => theme.motion.easing.enter},
    min-width ${({ theme }) => theme.motion.duration.luxury}
      ${({ theme }) => theme.motion.easing.enter},
    transform ${({ theme }) => theme.motion.duration.luxury}
      ${({ theme }) => theme.motion.easing.magnetic};

  &::after {
    display: none;
  }

  ${({ $purring, theme }) =>
    $purring &&
    css`
      animation: ${bookPurr} 980ms ${theme.motion.easing.ambient} both;

      ${BookDepth} {
        animation: ${bookDepthPurr} 780ms ${theme.motion.easing.ambient} both;
      }

      ${BookFace} {
        animation:
          ${ctaHueDrift} ${theme.motion.duration.ambient} ${theme.motion.easing.ambient}
            infinite,
          ${bookFacePurr} 860ms ${theme.motion.easing.ambient} both;
      }

      ${BookSpark} {
        animation:
          ${starBreath} ${theme.motion.duration.ambient} ${theme.motion.easing.ambient}
            infinite alternate,
          ${bookSparkPurr} 720ms ${theme.motion.easing.ambient} both;
      }
    `}

  ${({ $active, theme }) =>
    $active &&
    css`
      ${BookFace} {
        filter: brightness(1.08);
        box-shadow:
          inset 0 1px 0 ${theme.colors.effects.glassHighlight},
          inset 0 -0.28rem 0.62rem ${theme.colors.effects.glassShade},
          0 0 2rem ${theme.colors.effects.acidGlow};
      }
    `}

  @media (hover: hover) {
    &:hover {
      animation: none;
      border: 0;
      color: ${({ theme }) => theme.colors.text.onAccent};
      background: none;
      box-shadow: none;
      transform: perspective(30rem) rotateX(-9deg) rotateY(8deg)
        translate3d(0, ${({ theme }) => theme.layout.hoverLift}, 0) scale(1.025);
    }

    &:hover ${BookFace} {
      box-shadow:
        inset 0 1px 0 ${({ theme }) => theme.colors.effects.glassHighlight},
        inset 0 -0.28rem 0.62rem ${({ theme }) => theme.colors.effects.glassShade},
        0 0 2.1rem ${({ theme }) => theme.colors.effects.acidGlow};
    }

    &:hover ${BookFacet} {
      transform: translateX(270%) rotate(18deg);
    }
  }

  &:active {
    transform: perspective(30rem) rotateX(5deg) rotateY(-2deg)
      translate3d(0.16rem, 0.24rem, 0) scale(0.975);
  }

  &:active ${BookDepth} {
    transform: translate3d(0.1rem, 0.12rem, -0.18rem);
  }

  &:active ${BookFace} {
    transform: translateZ(0.12rem);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-width: ${({ $condensed }) => ($condensed ? '4.5rem' : '5rem')};
    min-height: ${({ $condensed }) => ($condensed ? '2.35rem' : '2.55rem')};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    min-width: ${({ $condensed }) => ($condensed ? '5.8rem' : '7.5rem')};
    min-height: ${({ theme, $condensed }) =>
      $condensed ? theme.layout.controlMinHeight : theme.layout.buttonMinHeight};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: 1199px) {
    ${({ $condensed, theme }) =>
      $condensed &&
      css`
        min-width: 5.8rem;
        min-height: ${theme.layout.controlMinHeight};
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &:hover,
    &:active {
      transform: none;
    }

    ${BookDepth},
    ${BookFace},
    ${BookSpark} {
      animation: none;
    }

    ${BookFace} {
      transform: none;
    }

    ${BookFacet} {
      display: none;
    }
  }

  @media (forced-colors: active) {
    ${BookDepth} {
      display: none;
    }

    ${BookFace} {
      clip-path: none;
      border: ${({ theme }) => theme.borders.width.thin}
        ${({ theme }) => theme.borders.style} ButtonText;
      background: ButtonFace;
      box-shadow: none;
      transform: none;
    }
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
