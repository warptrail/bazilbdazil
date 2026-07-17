import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import clown640Avif from '../../assets/clown-640.avif'
import clown1280Avif from '../../assets/clown-1280.avif'
import clown640Webp from '../../assets/clown-640.webp'
import clown1280Webp from '../../assets/clown-1280.webp'
import bazilCosmicMask from '../../assets/bazil-cosmic-mask-768.webp'
import {
  BodyCopy,
  Container,
  Divider,
  DisplayHeading,
  Eyebrow,
  GhostButton,
  PrimaryButton,
  Section,
} from '../../styles/primitives'

const celestialStars = [
  [42, 92, 2, 'metal'],
  [112, 174, 3, 'signal'],
  [178, 68, 2, 'acid'],
  [246, 226, 2, 'rose'],
  [314, 124, 3, 'metal'],
  [378, 302, 2, 'signal'],
  [452, 82, 2, 'acid'],
  [516, 188, 3, 'rose'],
  [590, 54, 2, 'metal'],
  [664, 258, 2, 'signal'],
  [742, 112, 3, 'acid'],
  [818, 198, 2, 'rose'],
  [890, 72, 2, 'metal'],
  [954, 286, 3, 'signal'],
  [1038, 132, 2, 'acid'],
  [1112, 216, 3, 'rose'],
  [1194, 58, 2, 'metal'],
  [1270, 298, 2, 'signal'],
  [1346, 142, 3, 'acid'],
  [1430, 228, 2, 'rose'],
  [1518, 84, 2, 'metal'],
  [82, 494, 3, 'signal'],
  [164, 678, 2, 'acid'],
  [272, 562, 2, 'rose'],
  [354, 804, 3, 'metal'],
  [462, 474, 2, 'signal'],
  [544, 704, 3, 'acid'],
  [646, 596, 2, 'rose'],
  [736, 842, 2, 'metal'],
  [844, 524, 3, 'signal'],
  [948, 748, 2, 'acid'],
  [1044, 602, 2, 'rose'],
  [1156, 822, 3, 'metal'],
  [1240, 536, 2, 'signal'],
  [1362, 712, 3, 'acid'],
  [1478, 568, 2, 'rose'],
]

const constellationPoints = [
  [18, 206, 3],
  [92, 122, 3],
  [176, 168, 3],
  [250, 74, 3],
  [331, 124, 3],
  [405, 32, 3],
  [134, 42, 2],
  [246, 239, 2],
  [366, 218, 2],
]

export function HeroSection({ content, isClownMode }) {
  const [logoMotion, setLogoMotion] = useState({ x: 0, y: 0, active: false })
  const [logoScrollBand, setLogoScrollBand] = useState(0)
  const heroRootRef = useRef(null)
  const logoMotionFrame = useRef(0)
  const logoScrollFrame = useRef(0)
  const lastLogoScrollBand = useRef(0)

  const handleLogoMotion = useCallback((event) => {
    if (
      isClownMode ||
      event.pointerType === 'touch' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

    cancelAnimationFrame(logoMotionFrame.current)
    logoMotionFrame.current = requestAnimationFrame(() => {
      setLogoMotion({ x, y, active: true })
    })
  }, [isClownMode])

  const resetLogoMotion = useCallback(() => {
    cancelAnimationFrame(logoMotionFrame.current)
    setLogoMotion({ x: 0, y: 0, active: false })
  }, [])

  useEffect(() => () => cancelAnimationFrame(logoMotionFrame.current), [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function commitLogoScroll() {
      logoScrollFrame.current = 0

      if (reducedMotion.matches || !heroRootRef.current) {
        if (lastLogoScrollBand.current !== 0) {
          lastLogoScrollBand.current = 0
          setLogoScrollBand(0)
        }
        return
      }

      const bounds = heroRootRef.current.getBoundingClientRect()
      const travel = Math.max(bounds.height - window.innerHeight * 0.35, 1)
      const progress = Math.min(
        Math.max((window.innerHeight * 0.15 - bounds.top) / travel, 0),
        1,
      )
      const nextBand = Math.round(progress * 8)

      if (nextBand !== lastLogoScrollBand.current) {
        lastLogoScrollBand.current = nextBand
        setLogoScrollBand(nextBand)
      }
    }

    function scheduleLogoScroll() {
      if (!logoScrollFrame.current) {
        logoScrollFrame.current = window.requestAnimationFrame(commitLogoScroll)
      }
    }

    window.addEventListener('scroll', scheduleLogoScroll, { passive: true })
    window.addEventListener('resize', scheduleLogoScroll, { passive: true })
    reducedMotion.addEventListener('change', scheduleLogoScroll)
    scheduleLogoScroll()

    return () => {
      window.removeEventListener('scroll', scheduleLogoScroll)
      window.removeEventListener('resize', scheduleLogoScroll)
      reducedMotion.removeEventListener('change', scheduleLogoScroll)
      cancelAnimationFrame(logoScrollFrame.current)
      logoScrollFrame.current = 0
    }
  }, [])

  return (
    <HeroSectionRoot ref={heroRootRef} id="home" aria-labelledby="hero-title">
      <DeepStarMap
        aria-hidden="true"
        viewBox="0 0 1560 920"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <StarRoute d="M42 92L178 68L314 124L452 82L590 54M818 198L954 286L1112 216L1270 298L1430 228M82 494L272 562L462 474L646 596L844 524L1044 602L1240 536L1478 568" />
        <StarRoute $secondary d="M112 174L246 226L378 302L516 188M664 258L742 112L890 72L1038 132L1194 58L1346 142M164 678L354 804L544 704L736 842L948 748L1156 822L1362 712" />
        {celestialStars.map(([cx, cy, radius, tone], index) => (
          <DeepStar
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={radius}
            $tone={tone}
            $delay={index}
          />
        ))}
      </DeepStarMap>

      <CelestialFrame aria-hidden="true">
        <FrameCorner $position="top-left" />
        <FrameCorner $position="top-right" />
        <FrameCorner $position="bottom-left" />
        <FrameCorner $position="bottom-right" />
        <FrameAxis $vertical />
        <FrameAxis />
      </CelestialFrame>

      <HeroContainer
        $maxWidth="100%"
        onPointerMove={handleLogoMotion}
        onPointerLeave={resetLogoMotion}
        onMouseLeave={resetLogoMotion}
      >
        <Constellation aria-hidden="true" viewBox="0 0 420 280" focusable="false">
          <ConstellationPath d="M18 206 92 122 176 168 250 74 331 124 405 32M92 122 134 42M176 168 246 239M331 124 366 218" />
          {constellationPoints.map(([cx, cy, radius]) => (
            <ConstellationPoint key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} />
          ))}
        </Constellation>

        <HeroCopy>
          <CopyCoordinates aria-hidden="true">
            <CoordinateMark>✦</CoordinateMark>
            <CoordinateLine />
            <CoordinateGlyph>☽ · ○ · ☼</CoordinateGlyph>
          </CopyCoordinates>
          <HeroEyebrow>{content.eyebrow}</HeroEyebrow>
          <HeroTitle id="hero-title">{content.title}</HeroTitle>
          <HeroPositioning>{content.positioning}</HeroPositioning>
          <HeroRule $width="9rem" />
          <HeroDescription>{content.description}</HeroDescription>

          <HeroActions>
            <HeroPrimaryAction href={content.primaryCta.href}>
              <ActionMark aria-hidden="true">✦</ActionMark>
              {content.primaryCta.label}
              <ActionOrbit aria-hidden="true" />
            </HeroPrimaryAction>
            <HeroSecondaryAction href={content.secondaryCta.href}>
              <SecondaryMark aria-hidden="true">◇</SecondaryMark>
              {content.secondaryCta.label}
            </HeroSecondaryAction>
          </HeroActions>

          <ReflectionDial aria-hidden="true">
            <ReflectionRing />
            <ReflectionRing $inner />
            <ReflectionNeedle />
            <ReflectionCenter>✦</ReflectionCenter>
          </ReflectionDial>
        </HeroCopy>

        <HeroArtwork aria-hidden={isClownMode ? undefined : 'true'}>
          <LiquidFilterSvg aria-hidden="true" focusable="false">
            <LiquidFilter id="hero-logo-liquid" x="-25%" y="-25%" width="150%" height="150%">
              <LiquidNoise
                type="fractalNoise"
                baseFrequency="0.008 0.014"
                numOctaves="2"
                seed="11"
                result="liquid-noise"
              />
              <LiquidDisplacement
                in="SourceGraphic"
                in2="liquid-noise"
                scale={logoMotion.active ? 8 + Math.abs(logoMotion.x) * 8 : 0}
                xChannelSelector="R"
                yChannelSelector="B"
              />
            </LiquidFilter>
          </LiquidFilterSvg>
          <ArtworkGlow aria-hidden="true" />
          <SacredInstrument aria-hidden="true" viewBox="0 0 680 680" focusable="false">
            <GeometryRing cx="340" cy="340" r="318" $tone="metal" $dash="1 15" />
            <GeometryRing cx="340" cy="340" r="298" $tone="orbital" />
            <GeometryRing cx="340" cy="340" r="266" $tone="violet" $dash="3 12" />
            <GeometryRing cx="340" cy="340" r="224" $tone="signal" />
            <GeometryRing cx="340" cy="340" r="188" $tone="strong" $dash="2 9" />
            <GeometryEllipse cx="340" cy="340" rx="314" ry="108" $tone="metal" />
            <GeometryEllipse cx="340" cy="340" rx="314" ry="108" $tone="signal" transform="rotate(60 340 340)" />
            <GeometryEllipse cx="340" cy="340" rx="314" ry="108" $tone="violet" transform="rotate(120 340 340)" />
            <GeometryLine x1="22" y1="340" x2="658" y2="340" $tone="orbital" />
            <GeometryLine x1="340" y1="22" x2="340" y2="658" $tone="orbital" />
            <GeometryLine x1="115" y1="115" x2="565" y2="565" $tone="violet" />
            <GeometryLine x1="565" y1="115" x2="115" y2="565" $tone="signal" />
            <GeometryPolygon points="340,54 588,483 92,483" $tone="metal" />
            <GeometryPolygon points="340,626 92,197 588,197" $tone="violet" />
            <GeometryPath d="M340 22 353 327 658 340 353 353 340 658 327 353 22 340 327 327Z" $tone="signal" />
            <GeometryPath d="M340 82 354 286 598 340 354 394 340 598 326 394 82 340 326 286Z" $tone="metal" />
            <InstrumentPoint cx="340" cy="22" r="5" $tone="acid" />
            <InstrumentPoint cx="658" cy="340" r="5" $tone="signal" />
            <InstrumentPoint cx="340" cy="658" r="5" $tone="rose" />
            <InstrumentPoint cx="22" cy="340" r="5" $tone="metal" />
            <InstrumentPoint cx="116" cy="116" r="4" $tone="signal" />
            <InstrumentPoint cx="564" cy="116" r="4" $tone="rose" />
            <InstrumentPoint cx="564" cy="564" r="4" $tone="acid" />
            <InstrumentPoint cx="116" cy="564" r="4" $tone="metal" />
          </SacredInstrument>

          <OrbitingHalo aria-hidden="true">
            <HaloSatellite $position="north">☼</HaloSatellite>
            <HaloSatellite $position="east">☽</HaloSatellite>
            <HaloSatellite $position="south">◇</HaloSatellite>
            <HaloSatellite $position="west">✦</HaloSatellite>
          </OrbitingHalo>

          {isClownMode ? (
            <PortraitFrame>
              <PortraitPicture>
                <PortraitSource
                  type="image/avif"
                  srcSet={`${clown640Avif} 640w, ${clown1280Avif} 1280w`}
                  sizes="(max-width: 760px) 88vw, 46vw"
                />
                <PortraitSource
                  type="image/webp"
                  srcSet={`${clown640Webp} 640w, ${clown1280Webp} 1280w`}
                  sizes="(max-width: 760px) 88vw, 46vw"
                />
                <PortraitImage
                  src={clown1280Webp}
                  width="1280"
                  height="1793"
                  alt="Bazil Bacchanalia Dazil performing in a colorful clown costume with a balloon sculpture."
                  fetchPriority="high"
                  decoding="async"
                />
              </PortraitPicture>
              <PortraitCrown aria-hidden="true">✦ ◇ ✦</PortraitCrown>
            </PortraitFrame>
          ) : (
            <TarotLogoFrame aria-hidden="true" $active={logoMotion.active}>
              <TarotLogoMark
                src={bazilCosmicMask}
                width="768"
                height="768"
                alt=""
                fetchPriority="high"
                decoding="async"
                data-scroll-band={logoScrollBand}
                $motionX={logoMotion.x}
                $motionY={logoMotion.y}
                $active={logoMotion.active}
              />
            </TarotLogoFrame>
          )}

          <ArtworkCoordinates aria-hidden="true">
            <CoordinateTick />
            <ArtworkCoordinateMark>☽ — ✦ — ☉</ArtworkCoordinateMark>
            <CoordinateTick $reverse />
          </ArtworkCoordinates>
        </HeroArtwork>
      </HeroContainer>
    </HeroSectionRoot>
  )
}

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

const stellarPulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.3);
  }
`

const spectralTravel = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
`

const modeReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.8rem) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const signalHover = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 1.2rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
  }

  50% {
    filter: drop-shadow(0 0 2rem ${({ theme }) => theme.colors.effects.acidGlowSoft});
  }
`

const toneColor = (theme, tone) => {
  if (theme.colors.accent[tone]) return theme.colors.accent[tone]
  return theme.colors.border[tone] || theme.colors.border.orbital
}

const HeroSectionRoot = styled(Section)`
  min-height: clamp(46rem, 92svh, 61rem);
  padding-inline: 0;
  overflow: hidden;
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.subtle};
  background:
    repeating-radial-gradient(circle at 72% 43%, transparent 0 3.6rem, ${({ theme }) => theme.colors.border.surface} 3.65rem, transparent 3.72rem),
    radial-gradient(circle at 72% 44%, ${({ theme }) => theme.colors.effects.violetGlow} 0%, transparent 31%),
    radial-gradient(circle at 68% 44%, ${({ theme }) => theme.colors.effects.acidGlowSoft} 0%, transparent 14%),
    radial-gradient(circle at 11% 18%, ${({ theme }) => theme.colors.effects.starlightSoft} 0%, transparent 12%),
    ${({ theme }) => theme.colors.gradients.hero};
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.4;
    background-image:
      linear-gradient(${({ theme }) => theme.colors.border.surface} 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.colors.border.surface} 1px, transparent 1px);
    background-size: 5rem 5rem;
    mask-image: radial-gradient(circle at 72% 45%, black, transparent 68%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    z-index: 3;
    height: 7rem;
    background:
      linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border.metal || theme.colors.border.strong}, transparent) top / 100% 1px no-repeat,
      linear-gradient(180deg, transparent, ${({ theme }) => theme.colors.background.canvas});
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-height: auto;
    background:
      radial-gradient(circle at 50% 72%, ${({ theme }) => theme.colors.effects.violetGlow} 0%, transparent 32%),
      radial-gradient(circle at 50% 74%, ${({ theme }) => theme.colors.effects.acidGlowSoft} 0%, transparent 17%),
      ${({ theme }) => theme.colors.gradients.hero};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    height: max(
      ${({ theme }) => theme.layout.heroMidMinHeight},
      calc(100svh - ${({ theme }) => theme.layout.expandedHeaderOffset})
    );
    min-height: 0;
    background:
      repeating-radial-gradient(circle at 50% 48%, transparent 0 3.2rem, ${({ theme }) => theme.colors.border.surface} 3.25rem, transparent 3.32rem),
      radial-gradient(circle at 50% 47%, ${({ theme }) => theme.colors.effects.violetGlow} 0%, transparent 36%),
      radial-gradient(circle at 50% 50%, ${({ theme }) => theme.colors.effects.acidGlowSoft} 0%, transparent 17%),
      ${({ theme }) => theme.colors.gradients.hero};
  }
`

const DeepStarMap = styled.svg`
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  opacity: 0.74;
  pointer-events: none;
`

const StarRoute = styled.path`
  fill: none;
  stroke: ${({ theme, $secondary }) =>
    $secondary ? theme.colors.border.violet : theme.colors.border.signal};
  stroke-width: 0.8;
  stroke-dasharray: ${({ $secondary }) => ($secondary ? '2 12' : '3 9')};
  opacity: ${({ $secondary }) => ($secondary ? 0.48 : 0.66)};
`

const DeepStar = styled.circle`
  fill: ${({ theme, $tone }) => toneColor(theme, $tone)};
  filter: drop-shadow(0 0 0.4rem ${({ theme }) => theme.colors.effects.starlight});
  transform-box: fill-box;
  transform-origin: center;
  animation: ${stellarPulse} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;
  animation-delay: ${({ $delay }) => `${-0.37 * $delay}s`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.72;
  }
`

const CelestialFrame = styled.div`
  position: absolute;
  inset: ${({ theme }) => theme.spacing.lg};
  z-index: 2;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 4rem;
    height: 0.5rem;
    border-inline: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.metal};
    transform: translateX(-50%);
  }

  &::before {
    top: -0.25rem;
    border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.metal};
  }

  &::after {
    bottom: -0.25rem;
    border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.metal};
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    inset: ${({ theme }) => theme.spacing.sm};
  }
`

const FrameCorner = styled.span`
  position: absolute;
  width: 2.4rem;
  aspect-ratio: 1;
  border-color: ${({ theme }) => theme.colors.accent.metal};
  opacity: 0.82;
  ${({ $position, theme }) => {
    const border = `${theme.borders.width.thin} ${theme.borders.style} ${theme.colors.accent.metal}`
    if ($position === 'top-left') return css`top: -1px; left: -1px; border-top: ${border}; border-left: ${border};`
    if ($position === 'top-right') return css`top: -1px; right: -1px; border-top: ${border}; border-right: ${border};`
    if ($position === 'bottom-left') return css`bottom: -1px; left: -1px; border-bottom: ${border}; border-left: ${border};`
    return css`bottom: -1px; right: -1px; border-bottom: ${border}; border-right: ${border};`
  }}

  &::before,
  &::after {
    content: '';
    position: absolute;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.violetStrong};
    border-radius: ${({ theme }) => theme.radii.orbital};
  }

  &::before {
    inset: 0.4rem;
  }

  &::after {
    inset: 0.85rem;
    background: ${({ theme }) => theme.colors.accent.acid};
    box-shadow: 0 0 0.65rem ${({ theme }) => theme.colors.effects.acidGlow};
  }
`

const FrameAxis = styled.span`
  position: absolute;
  top: ${({ $vertical }) => ($vertical ? '50%' : 'auto')};
  bottom: ${({ $vertical }) => ($vertical ? 'auto' : '-0.24rem')};
  left: ${({ $vertical }) => ($vertical ? '-0.24rem' : '50%')};
  width: 0.46rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.signal};
  transform: translate(-50%, -50%) rotate(45deg);
  background: ${({ theme }) => theme.colors.background.canvas};
`

const HeroContainer = styled(Container)`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;
  min-height: inherit;
  padding-block: clamp(5rem, 10vw, 8rem) clamp(5rem, 9vw, 7rem);
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${({ theme }) => theme.colors.gradients.atmosphereTexture};
    opacity: 0.86;
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    grid-template-columns: minmax(21rem, 0.86fr) minmax(28rem, 1.14fr);
    gap: clamp(2rem, 5vw, 6rem);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    grid-template: minmax(0, 1fr) / minmax(0, 1fr);
    gap: 0;
    height: 100%;
    min-height: 0;
    padding-block: ${({ theme }) => theme.spacing.lg};
  }
`

const HeroCopy = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  isolation: isolate;
  width: 100%;
  min-width: 0;
  display: grid;
  justify-items: start;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 45rem;
  padding: clamp(1rem, 2.6vw, 2rem);
  border-left: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.violet};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.background.glassViolet}, transparent 78%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -0.25rem;
    width: 0.48rem;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.accent.metal};
    box-shadow: 0 0 0.8rem ${({ theme }) => theme.colors.effects.starlightSoft};
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    grid-area: 1 / 1;
    align-self: center;
    justify-self: center;
    justify-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    width: min(44rem, 76vw);
    max-width: none;
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['3xl']};
    border-left: 0;
    text-align: center;
    background: none;

    &::before,
    &::after {
      display: none;
    }
  }
`

const CopyCoordinates = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: min(18rem, 80%);
  color: ${({ theme }) => theme.colors.accent.metal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    width: min(17rem, 68%);
  }
`

const CoordinateMark = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  text-shadow: 0 0 0.6rem ${({ theme }) => theme.colors.effects.acidGlow};
`

const CoordinateLine = styled.span`
  flex: 1;
  height: ${({ theme }) => theme.borders.width.thin};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.border.strong}, transparent);
`

const CoordinateGlyph = styled.span`
  white-space: nowrap;
`

const HeroEyebrow = styled(Eyebrow)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  text-shadow: 0 0 0.9rem ${({ theme }) => theme.colors.effects.acidGlow};
`

const HeroTitle = styled(DisplayHeading)`
  min-width: 0;
  max-width: 10ch;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: clamp(3.6rem, 8vw, 8.5rem);
  text-wrap: balance;
  background: linear-gradient(
    102deg,
    ${({ theme }) => theme.colors.accent.metal} 0%,
    ${({ theme }) => theme.colors.text.primary} 18%,
    ${({ theme }) => theme.colors.accent.acidSoft} 38%,
    ${({ theme }) => theme.colors.accent.signal} 55%,
    ${({ theme }) => theme.colors.accent.ultravioletStrong} 76%,
    ${({ theme }) => theme.colors.accent.rose} 90%,
    ${({ theme }) => theme.colors.accent.metal} 100%
  );
  background-size: 220% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 1.25rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
  animation: ${spectralTravel} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    max-width: 100%;
    font-size: clamp(2.3rem, 10.8vw, 4.2rem);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    max-width: 10ch;
    font-size: clamp(3.2rem, 7.4vw, 5.6rem);
    line-height: 0.8;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background-position: 50% 50%;
  }

  @media (forced-colors: active) {
    color: CanvasText;
    background: none;
    -webkit-text-fill-color: currentColor;
    filter: none;
  }
`

const HeroPositioning = styled.p`
  max-width: 20ch;
  margin: 0;
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: clamp(1.55rem, 3.2vw, 2.8rem);
  line-height: 1.04;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  text-wrap: balance;
  text-shadow:
    0 0 1rem ${({ theme }) => theme.colors.effects.acidGlowSoft},
    0 0 2.5rem ${({ theme }) => theme.colors.effects.violetGlowSoft};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    max-width: 24ch;
    font-size: clamp(1.45rem, 2.8vw, 2.15rem);
  }
`

const HeroRule = styled(Divider)`
  position: relative;
  margin-block: ${({ theme }) => theme.spacing.sm};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent.metal}, ${({ theme }) => theme.colors.accent.acid}, transparent);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 0.3rem;
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.metal};
    transform: translateY(-50%) rotate(45deg);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    margin-block: ${({ theme }) => theme.spacing.xs};
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.accent.metal},
      ${({ theme }) => theme.colors.accent.acid},
      ${({ theme }) => theme.colors.accent.metal},
      transparent
    );
  }
`

const HeroDescription = styled(BodyCopy).attrs({
  $tone: 'bodyMuted',
  $maxWidth: '34rem',
})`
  font-size: clamp(1rem, 1.25vw, 1.12rem);
  text-shadow: 0 1px 1.2rem ${({ theme }) => theme.colors.background.canvas};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    max-width: 32rem;
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    line-height: 1.5;
  }
`

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 520px) {
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`

const HeroPrimaryAction = styled(PrimaryButton)`
  position: relative;
  overflow: hidden;
  clip-path: polygon(0.65rem 0, calc(100% - 0.65rem) 0, 100% 0.65rem, 100% calc(100% - 0.65rem), calc(100% - 0.65rem) 100%, 0.65rem 100%, 0 calc(100% - 0.65rem), 0 0.65rem);
  box-shadow:
    0 0 1.5rem ${({ theme }) => theme.colors.effects.acidGlowSoft},
    inset 0 0 0 1px ${({ theme }) => theme.colors.effects.moonlightSoft};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    background: repeating-linear-gradient(120deg, transparent 0 0.55rem, ${({ theme }) => theme.colors.effects.moonlightSoft} 0.6rem 0.64rem);
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  @media (hover: hover) {
    &:hover::before {
      opacity: 1;
    }
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`

const HeroSecondaryAction = styled(GhostButton)`
  position: relative;
  border-color: ${({ theme }) => theme.colors.border.signal};
  background:
    linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent),
    ${({ theme }) => theme.colors.background.glassViolet};

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.accent.signal};
      color: ${({ theme }) => theme.colors.accent.signal};
      box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
    }
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`

const ActionMark = styled.span`
  position: relative;
  z-index: 1;
  color: currentColor;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: 1;
`

const ActionOrbit = styled.span`
  position: absolute;
  right: -0.55rem;
  width: 2rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.text.onAccent};
  border-radius: ${({ theme }) => theme.radii.orbital};
  opacity: 0.34;

  &::before {
    content: '';
    position: absolute;
    inset: 28%;
    border: inherit;
    border-radius: inherit;
  }
`

const SecondaryMark = styled.span`
  color: ${({ theme }) => theme.colors.accent.metal};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
`

const ReflectionDial = styled.div`
  position: absolute;
  right: -1.5rem;
  bottom: -4.2rem;
  display: grid;
  width: 6.5rem;
  aspect-ratio: 1;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.orbital};
  border-radius: ${({ theme }) => theme.radii.orbital};
  opacity: 0.62;
  animation: ${orbitTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    right: 3%;
    bottom: 1%;
    width: 5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ReflectionRing = styled.span`
  position: absolute;
  inset: ${({ $inner }) => ($inner ? '32%' : '14%')};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $inner }) =>
      $inner ? theme.colors.border.signal : theme.colors.border.violet};
  border-radius: ${({ theme }) => theme.radii.orbital};
`

const ReflectionNeedle = styled.span`
  position: absolute;
  width: 90%;
  height: ${({ theme }) => theme.borders.width.thin};
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent.metal}, transparent);
  transform: rotate(-28deg);
`

const ReflectionCenter = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  text-shadow: 0 0 0.65rem ${({ theme }) => theme.colors.effects.acidGlow};
`

const HeroArtwork = styled.figure`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  min-height: clamp(31rem, 70svh, 49rem);
  margin: 0;
  align-self: end;
  perspective: 70rem;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-height: clamp(29rem, 74svh, 42rem);
    margin-top: -1rem;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    grid-area: 1 / 1;
    align-self: center;
    justify-self: center;
    width: min(58rem, 88vw);
    height: min(100%, 48rem);
    min-height: 0;
    margin: 0;
    opacity: 0.78;
    mask-image: radial-gradient(circle at center, black 0 62%, transparent 88%);
  }
`

const LiquidFilterSvg = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
`

const LiquidFilter = styled.filter``

const LiquidNoise = styled.feTurbulence``

const LiquidDisplacement = styled.feDisplacementMap``

const ArtworkGlow = styled.div`
  position: absolute;
  inset: 10% 2% 2%;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background:
    radial-gradient(circle at 50% 40%, ${({ theme }) => theme.colors.effects.violetGlow} 0%, transparent 45%),
    radial-gradient(circle at 66% 72%, ${({ theme }) => theme.colors.effects.acidGlowSoft} 0%, transparent 34%),
    conic-gradient(from 90deg, transparent, ${({ theme }) => theme.colors.effects.starlightSoft}, transparent, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent);
  filter: blur(1.8rem);
  pointer-events: none;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    inset: 4%;
  }
`

const SacredInstrument = styled.svg`
  position: absolute;
  inset: 1% -1% auto auto;
  width: min(45rem, 103%);
  height: auto;
  overflow: visible;
  opacity: 0.9;
  filter: drop-shadow(0 0 1.4rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
  transform-origin: center;
  animation: ${orbitTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;
  transition:
    opacity ${({ theme }) => theme.transitions.base},
    filter ${({ theme }) => theme.transitions.base};

  ${HeroArtwork}:hover & {
    opacity: 1;
    filter:
      drop-shadow(0 0 1.2rem ${({ theme }) => theme.colors.effects.acidGlowSoft})
      drop-shadow(0 0 2.6rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    inset: 50% auto auto 50%;
    width: min(45rem, 103%);
    translate: -50% -50%;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    inset: 50% auto auto 50%;
    width: min(48rem, 92%);
    translate: -50% -50%;
  }
`

const geometryStroke = css`
  fill: none;
  stroke: ${({ theme, $tone = 'orbital' }) => toneColor(theme, $tone)};
  stroke-width: ${({ $width = 1 }) => $width};
  vector-effect: non-scaling-stroke;
`

const GeometryRing = styled.circle`
  ${geometryStroke}
  stroke-dasharray: ${({ $dash = 'none' }) => $dash};
`

const GeometryEllipse = styled.ellipse`
  ${geometryStroke}
  stroke-dasharray: 3 9;
`

const GeometryLine = styled.line`
  ${geometryStroke}
  opacity: 0.58;
`

const GeometryPolygon = styled.polygon`
  ${geometryStroke}
  opacity: 0.7;
`

const GeometryPath = styled.path`
  ${geometryStroke}
  opacity: 0.58;
`

const InstrumentPoint = styled.circle`
  fill: ${({ theme, $tone }) => toneColor(theme, $tone)};
  filter: drop-shadow(0 0 0.35rem ${({ theme }) => theme.colors.effects.starlight});
`

const OrbitingHalo = styled.div`
  position: absolute;
  inset: 8% 1% auto auto;
  width: min(39rem, 90%);
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.violet};
  border-radius: ${({ theme }) => theme.radii.orbital};
  animation: ${reverseOrbitTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.orbital};
    border-radius: ${({ theme }) => theme.radii.orbital};
  }

  &::before {
    inset: 8%;
    border-style: dashed;
  }

  &::after {
    inset: 22%;
    border-color: ${({ theme }) => theme.colors.border.signal};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    inset: 50% auto auto 50%;
    width: min(39rem, 90%);
    translate: -50% -50%;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    inset: 50% auto auto 50%;
    width: min(42rem, 82%);
    translate: -50% -50%;
  }
`

const HaloSatellite = styled.span`
  position: absolute;
  display: grid;
  width: 2rem;
  aspect-ratio: 1;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.metal};
  background: ${({ theme }) => theme.colors.background.surface};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  ${({ $position }) => {
    if ($position === 'north') return css`top: -1rem; left: calc(50% - 1rem);`
    if ($position === 'east') return css`right: -1rem; top: calc(50% - 1rem);`
    if ($position === 'south') return css`bottom: -1rem; left: calc(50% - 1rem);`
    return css`left: -1rem; top: calc(50% - 1rem);`
  }}
`

const TarotLogoFrame = styled.div`
  position: absolute;
  inset: 5% 2% 1%;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  place-items: center;
  pointer-events: none;
  animation:
    ${modeReveal} ${({ theme }) => theme.motion.duration.ritual}
      ${({ theme }) => theme.motion.easing.enter} both,
    ${signalHover} ${({ theme }) => theme.motion.duration.ambient}
      ${({ theme }) => theme.motion.easing.ambient} infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    transform: translate(-50%, -50%);
  }

  &::before {
    width: min(34rem, 86%);
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.effects.inkVeil} 0 38%,
      ${({ theme }) => theme.colors.effects.violetGlowSoft} 58%,
      transparent 74%
    );
    filter: blur(0.7rem);
  }

  &::after {
    width: min(30rem, 76%);
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.filigree};
    box-shadow:
      inset 0 0 2.5rem ${({ theme }) => theme.colors.effects.goldGlowSoft},
      0 0 3rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
    opacity: 0.58;
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    inset: 0 -2%;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    inset: 8%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (forced-colors: active) {
    &::before,
    &::after {
      display: none;
    }
  }
`

const TarotLogoMark = styled.img`
  --logo-scroll-hue: 0deg;

  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: min(31rem, 82%);
  height: auto;
  object-fit: contain;
  filter:
    hue-rotate(var(--logo-scroll-hue))
    drop-shadow(0 0 0.8rem ${({ theme }) => theme.colors.effects.goldGlowSoft})
    drop-shadow(0 0 2.2rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
  transform: translateZ(0);
  transition:
    filter ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.motion.duration.ritual}
      ${({ theme }) => theme.motion.easing.enter};

  ${HeroArtwork}:hover & {
    filter:
      drop-shadow(0 0 1.2rem ${({ theme }) => theme.colors.effects.goldGlow})
      drop-shadow(0 0 3rem ${({ theme }) => theme.colors.effects.violetGlow});
    transform: translateZ(0) scale(1.025);
  }

  &[data-scroll-band='1'] { --logo-scroll-hue: 12deg; }
  &[data-scroll-band='2'] { --logo-scroll-hue: 24deg; }
  &[data-scroll-band='3'] { --logo-scroll-hue: 36deg; }
  &[data-scroll-band='4'] { --logo-scroll-hue: 48deg; }
  &[data-scroll-band='5'] { --logo-scroll-hue: 60deg; }
  &[data-scroll-band='6'] { --logo-scroll-hue: 72deg; }
  &[data-scroll-band='7'] { --logo-scroll-hue: 84deg; }
  &[data-scroll-band='8'] { --logo-scroll-hue: 96deg; }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    width: min(30rem, 90%);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    width: min(34rem, 72%);
    opacity: ${({ $active }) => ($active ? 0.48 : 0.32)};
    filter:
      url('#hero-logo-liquid')
      hue-rotate(calc(var(--logo-scroll-hue) + ${({ $motionX = 0 }) => `${$motionX * 32}deg`}))
      brightness(${({ $active }) => ($active ? 1.3 : 1.12)})
      saturate(${({ $motionY = 0 }) => 1.12 + Math.abs($motionY) * 0.34})
      drop-shadow(0 0 1.2rem ${({ theme }) => theme.colors.effects.goldGlow})
      drop-shadow(0 0 2.8rem ${({ theme }) => theme.colors.effects.violetGlow});
    mix-blend-mode: screen;
    transform: translate3d(
        ${({ $motionX = 0 }) => `${$motionX * 0.8}rem`},
        ${({ $motionY = 0 }) => `${$motionY * 0.55}rem`},
        0
      )
      scale(${({ $active, $motionX = 0 }) => ($active ? 1.035 + Math.abs($motionX) * 0.025 : 1)});
    translate: 0;
    transition:
      opacity ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
      filter ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
      transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};
    will-change: transform, filter, opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${HeroArtwork}:hover & {
      transform: none;
    }
  }

  @media (forced-colors: active) {
    filter: none;
  }
`

const PortraitFrame = styled.div`
  position: absolute;
  inset: 0;
  animation: ${modeReveal} ${({ theme }) => theme.motion.duration.ritual}
    ${({ theme }) => theme.motion.easing.enter} both;
  transition: transform ${({ theme }) => theme.motion.duration.ritual}
    ${({ theme }) => theme.motion.easing.enter};

  &::before {
    content: '';
    position: absolute;
    inset: 8% 13% 2% 17%;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.violetStrong};
    border-radius: 50% 50% 12rem 12rem;
    box-shadow:
      inset 0 0 3rem ${({ theme }) => theme.colors.effects.violetGlowSoft},
      0 0 2rem ${({ theme }) => theme.colors.effects.acidGlowSoft};
  }

  ${HeroArtwork}:hover & {
    transform: translateY(-0.4rem) rotateY(-1.5deg);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    ${HeroArtwork}:hover & {
      transform: none;
    }
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    inset: 2% 10%;
    opacity: 0.72;
  }
`

const PortraitPicture = styled.picture`
  position: absolute;
  inset: 0;
  display: block;
`

const PortraitSource = styled('source')``

const PortraitImage = styled.img`
  position: absolute;
  right: -1%;
  bottom: 0;
  width: min(39rem, 96%);
  height: 100%;
  object-fit: contain;
  object-position: 50% 100%;
  filter:
    drop-shadow(${({ theme }) => theme.shadows.portrait})
    saturate(1.08)
    contrast(1.04);

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    right: -8%;
    width: min(35rem, 108%);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    right: 50%;
    width: min(34rem, 78%);
    transform: translateX(50%);
  }
`

const PortraitCrown = styled.div`
  position: absolute;
  top: 7%;
  left: 50%;
  color: ${({ theme }) => theme.colors.accent.metal};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
  text-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.starlight};
  transform: translateX(-50%);
`

const ArtworkCoordinates = styled.div`
  position: absolute;
  right: 4%;
  bottom: 3%;
  left: 4%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent.metal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    right: 9%;
    bottom: 1%;
    left: 9%;
    opacity: 0.72;
  }
`

const CoordinateTick = styled.span`
  flex: 1;
  height: ${({ theme }) => theme.borders.width.thin};
  background: ${({ theme, $reverse }) =>
    $reverse
      ? `linear-gradient(270deg, ${theme.colors.accent.signal}, transparent)`
      : `linear-gradient(90deg, ${theme.colors.accent.metal}, transparent)`};
`

const ArtworkCoordinateMark = styled.span`
  white-space: nowrap;
`

const Constellation = styled.svg`
  position: absolute;
  top: clamp(1.5rem, 5vw, 4rem);
  right: -3rem;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: min(38rem, 58vw);
  height: auto;
  opacity: 0.4;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    top: 44%;
    right: -8rem;
    width: 34rem;
    opacity: 0.24;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) and (max-width: ${({ theme }) => theme.layout.breakpoints.wideMax}) {
    top: 50%;
    right: 50%;
    width: min(46rem, 72vw);
    opacity: 0.22;
    transform: translate(50%, -50%) rotate(-12deg);
  }
`

const ConstellationPath = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.signal};
  stroke-width: 1;
  stroke-dasharray: 3 8;
`

const ConstellationPoint = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.signal};
  filter: drop-shadow(0 0 0.25rem ${({ theme }) => theme.colors.effects.starlight});
`
