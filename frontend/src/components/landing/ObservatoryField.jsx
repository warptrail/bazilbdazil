import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { ModeSwitch } from '../ModeSwitch'

const STAR_FIELD = Array.from({ length: 46 }, (_, index) => ({
  id: index,
  x: (index * 37 + 11) % 100,
  y: (index * 61 + 7) % 100,
  size: 1 + ((index * 13) % 4) * 0.55,
  delay: -((index * 17) % 31) / 2,
  tone: index % 7 === 0 ? 'metal' : index % 5 === 0 ? 'signal' : 'acidSoft',
}))

const SEED_CIRCLES = [
  [200, 126],
  [264, 163],
  [264, 237],
  [200, 274],
  [136, 237],
  [136, 163],
  [200, 200],
]

export function ObservatoryField({ showModeControl = false }) {
  const [pointer, setPointer] = useState({ x: 50, y: 42 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const pointerRef = useRef(pointer)
  const scrollProgressRef = useRef(scrollProgress)
  const [motionEnabled, setMotionEnabled] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function handlePreferenceChange(event) {
      setMotionEnabled(!event.matches)
    }

    reducedMotion.addEventListener('change', handlePreferenceChange)

    return () => reducedMotion.removeEventListener('change', handlePreferenceChange)
  }, [])

  useEffect(() => {
    if (!motionEnabled) return undefined

    const finePointer = window.matchMedia('(pointer: fine)').matches
    let animationFrame = 0
    let nextPointer = pointerRef.current
    let nextProgress = scrollProgressRef.current

    function commitFrame() {
      animationFrame = 0

      if (
        nextPointer.x !== pointerRef.current.x ||
        nextPointer.y !== pointerRef.current.y
      ) {
        pointerRef.current = nextPointer
        setPointer(nextPointer)
      }

      if (nextProgress !== scrollProgressRef.current) {
        scrollProgressRef.current = nextProgress
        setScrollProgress(nextProgress)
      }
    }

    function scheduleFrame() {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(commitFrame)
    }

    function handlePointerMove(event) {
      nextPointer = {
        x: Math.round(((event.clientX / Math.max(window.innerWidth, 1)) * 100) / 10) * 10,
        y: Math.round(((event.clientY / Math.max(window.innerHeight, 1)) * 100) / 10) * 10,
      }
      scheduleFrame()
    }

    function handleScroll() {
      const available = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const rawProgress = Math.min(Math.max(window.scrollY / available, 0), 1)
      nextProgress = Math.round(rawProgress * 100) / 100
      scheduleFrame()
    }

    if (finePointer) window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      if (finePointer) window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [motionEnabled])

  return (
    <>
      <FieldRoot aria-hidden="true" $motionEnabled={motionEnabled}>
        <EtchedGrid />
        <SpectralFog $x={pointer.x} $y={pointer.y} />

        <StarPlane>
          {STAR_FIELD.map((star) => (
            <FieldStar
              key={star.id}
              $x={star.x}
              $y={star.y}
              $size={star.size}
              $delay={star.delay}
              $tone={star.tone}
            />
          ))}
        </StarPlane>

        <GeometryAnchor $x={pointer.x} $y={pointer.y}>
          <GeometrySpinner>
            <SacredGeometry viewBox="0 0 400 400" focusable="false">
              <GeometryOrbit cx="200" cy="200" r="184" />
              <GeometryOrbit cx="200" cy="200" r="146" />
              <GeometryPolygon points="200,20 356,110 356,290 200,380 44,290 44,110" />
              <GeometryPolygon points="200,54 326,127 326,273 200,346 74,273 74,127" />
              {SEED_CIRCLES.map(([cx, cy]) => (
                <SeedCircle key={`${cx}-${cy}`} cx={cx} cy={cy} r="74" />
              ))}
              <GeometryCross d="M200 16V384M16 200H384M70 70L330 330M330 70L70 330" />
              <CoreStar d="M200 144 216 184 256 200 216 216 200 256 184 216 144 200 184 184Z" />
            </SacredGeometry>
          </GeometrySpinner>
        </GeometryAnchor>

        <Comet $position="upper" />
        <Comet $position="lower" />

        <ProgressRail>
          <RailGlyph>✦</RailGlyph>
          <RailTrack>
            <RailFill $progress={scrollProgress} />
            <RailOrb $progress={scrollProgress} />
          </RailTrack>
          <RailGlyph>☾</RailGlyph>
        </ProgressRail>

        <PhaseRail>
          <Phase>●</Phase>
          <Phase>◐</Phase>
          <Phase>○</Phase>
          <Phase>◑</Phase>
          <Phase>●</Phase>
        </PhaseRail>
      </FieldRoot>

      <ObservatoryFrame aria-hidden="true">
        <FrameEdge $edge="top" />
        <FrameEdge $edge="right" />
        <FrameCorner $corner="northWest">✦</FrameCorner>
        <FrameCorner $corner="southWest">☾</FrameCorner>
        <FrameCorner $corner="southEast">✧</FrameCorner>
      </ObservatoryFrame>

      {showModeControl ? (
        <DamagedModeCorner>
          <CircuitWire aria-hidden="true" $axis="horizontal" />
          <CircuitWire aria-hidden="true" $axis="vertical" />
          <ModeSwitch compact cornerMounted />
        </DamagedModeCorner>
      ) : null}
    </>
  )
}

const twinkle = keyframes`
  0%, 100% { opacity: 0.18; transform: scale(0.72); }
  45% { opacity: 0.88; transform: scale(1.35); }
  52% { opacity: 0.44; transform: scale(0.92); }
`

const slowTurn = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const cometPass = keyframes`
  0%, 72% { opacity: 0; transform: translate3d(-18vw, 0, 0) rotate(-18deg); }
  76% { opacity: 0.8; }
  92% { opacity: 0; transform: translate3d(118vw, 18vh, 0) rotate(-18deg); }
  100% { opacity: 0; }
`

const cornerGlimmer = keyframes`
  0%, 100% { opacity: 0.58; filter: drop-shadow(0 0 0.2rem currentColor); }
  50% { opacity: 1; filter: drop-shadow(0 0 0.8rem currentColor); }
`

const wireFlicker = keyframes`
  0%, 62%, 70%, 100% { opacity: 0.28; filter: brightness(0.84); }
  64% { opacity: 0.88; filter: brightness(1.45); }
  67% { opacity: 0.4; filter: brightness(0.96); }
`

const currentRun = keyframes`
  0%, 58% { background-position: 100% 50%; opacity: 0.24; }
  66% { opacity: 0.86; }
  76%, 100% { background-position: -100% 50%; opacity: 0.3; }
`

const sparkRunHorizontal = keyframes`
  0%, 58% { opacity: 0; transform: translateX(0) scale(0.5); }
  64% { opacity: 0.92; }
  76%, 100% { opacity: 0; transform: translateX(-2.7rem) scale(1.25); }
`

const sparkRunVertical = keyframes`
  0%, 58% { opacity: 0; transform: translateY(0) scale(0.5); }
  64% { opacity: 0.92; }
  76%, 100% { opacity: 0; transform: translateY(2.7rem) scale(1.25); }
`

const FieldRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.base};
  overflow: hidden;
  opacity: ${({ $motionEnabled }) => ($motionEnabled ? 1 : 0.72)};
  pointer-events: none;
  contain: strict;

  @media (forced-colors: active) {
    display: none;
  }
`

const ObservatoryFrame = styled.div`
  position: fixed;
  inset: ${({ theme }) => theme.layout.frameInset};
  z-index: ${({ theme }) => theme.zIndex.overlay};
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-left: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow:
    inset 0 0 1.4rem ${({ theme }) => theme.colors.effects.goldGlowSoft},
    0 0 1.4rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: ${({ theme }) => theme.spacing.sm};
    background:
      linear-gradient(90deg, ${({ theme }) => theme.colors.border.etched} 0 18%, transparent 18% 82%, ${({ theme }) => theme.colors.border.etched} 82% calc(100% - 4rem), transparent calc(100% - 4rem)) top / 100% ${({ theme }) => theme.borders.width.thin} no-repeat,
      linear-gradient(90deg, ${({ theme }) => theme.colors.border.etched} 0 18%, transparent 18% 82%, ${({ theme }) => theme.colors.border.etched} 82% 100%) bottom / 100% ${({ theme }) => theme.borders.width.thin} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.border.etched}, ${({ theme }) => theme.colors.border.etched}) left / ${({ theme }) => theme.borders.width.thin} 100% no-repeat,
      linear-gradient(180deg, transparent 0 4rem, ${({ theme }) => theme.colors.border.etched} 4rem 100%) right / ${({ theme }) => theme.borders.width.thin} 100% no-repeat;
    pointer-events: none;
  }

  &::after {
    content: '✦  ·  ☾  ·  ✦';
    position: absolute;
    left: 50%;
    bottom: -0.5rem;
    padding-inline: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.accent.metalBright};
    background: ${({ theme }) => theme.colors.background.canvas};
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
    transform: translateX(-50%);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    inset: ${({ theme }) => theme.spacing.xs};
    opacity: 0.7;

    &::before,
    &::after {
      display: none;
    }
  }

  @media (forced-colors: active) {
    display: none;
  }
`

const FrameEdge = styled.span`
  position: absolute;
  display: block;
  background: ${({ theme }) => theme.colors.border.filigree};
  pointer-events: none;

  ${({ $edge, theme }) =>
    $edge === 'top'
      ? css`
          top: 0;
          right: 4.6rem;
          left: 0;
          height: ${theme.borders.width.thin};
          border-radius: ${theme.radii.sm} 0 0;

          &::after {
            right: -0.78rem;
            width: 0.9rem;
            height: ${theme.borders.width.thin};
            transform: rotate(7deg);
          }
        `
      : css`
          top: 4.6rem;
          right: 0;
          bottom: 0;
          width: ${theme.borders.width.thin};

          &::after {
            top: -0.78rem;
            width: ${theme.borders.width.thin};
            height: 0.9rem;
            transform: rotate(-7deg);
          }
        `}

  &::after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.colors.accent.signal};
    box-shadow:
      0 0 0.35rem ${({ theme }) => theme.colors.effects.cyanGlow},
      0 0 0.75rem ${({ theme }) => theme.colors.effects.acidGlowSoft};
    animation: ${wireFlicker} ${({ theme }) => theme.motion.duration.twinkle}
      ${({ theme }) => theme.motion.easing.enter} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0.5;
    }
  }
`

const DamagedModeCorner = styled.div`
  position: fixed;
  top: calc(${({ theme }) => theme.layout.frameInset} - 1.375rem);
  right: calc(${({ theme }) => theme.layout.frameInset} - 1.375rem);
  z-index: ${({ theme }) => theme.zIndex.skipLink};
  width: ${({ theme }) => theme.layout.controlMinHeight};
  height: ${({ theme }) => theme.layout.controlMinHeight};
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    top: 0;
    right: 0;
  }
`

const CircuitWire = styled.span`
  position: absolute;
  z-index: -1;
  display: block;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.accent.signal},
      ${({ theme }) => theme.colors.accent.acid},
      ${({ theme }) => theme.colors.accent.metalBright},
      transparent
    );
    background-size: 220% 100%;
    box-shadow: 0 0 0.45rem ${({ theme }) => theme.colors.effects.cyanGlow};
    animation: ${currentRun} ${({ theme }) => theme.motion.duration.twinkle}
      ${({ theme }) => theme.motion.easing.enter} infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0.2rem;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.accent.acidSoft};
    box-shadow:
      0 0 0.45rem ${({ theme }) => theme.colors.effects.acidGlow},
      0 0 0.8rem ${({ theme }) => theme.colors.effects.cyanGlow};
  }

  ${({ $axis, theme }) =>
    $axis === 'horizontal'
      ? css`
          top: calc(50% - 0.5rem);
          right: calc(50% + ${theme.spacing.sm});
          width: 4.15rem;
          height: 1rem;

          &::before {
            top: calc(50% - 0.5px);
            right: 0;
            width: 100%;
            height: ${theme.borders.width.thin};
            clip-path: polygon(0 0, 58% 0, 63% 100%, 70% 0, 80% 100%, 100% 100%, 100% 0);
          }

          &::after {
            top: calc(50% - 0.1rem);
            right: 0;
            animation: ${sparkRunHorizontal} ${theme.motion.duration.twinkle}
              ${theme.motion.easing.enter} infinite;
          }
        `
      : css`
          top: calc(50% + ${theme.spacing.sm});
          left: calc(50% - 0.5rem);
          width: 1rem;
          height: 4.15rem;

          &::before {
            top: 0;
            left: calc(50% - 0.5px);
            width: ${theme.borders.width.thin};
            height: 100%;
            background: linear-gradient(
              180deg,
              transparent,
              ${theme.colors.accent.signal},
              ${theme.colors.accent.acid},
              ${theme.colors.accent.metalBright},
              transparent
            );
            background-size: 100% 220%;
            clip-path: polygon(0 0, 100% 0, 100% 58%, 0 63%, 100% 70%, 0 80%, 0 100%, 100% 100%);
          }

          &::after {
            top: 0;
            left: calc(50% - 0.1rem);
            animation: ${sparkRunVertical} ${theme.motion.duration.twinkle}
              ${theme.motion.easing.enter} infinite;
          }
        `}

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }

    &::after {
      display: none;
    }
  }
`

const FrameCorner = styled.span`
  position: absolute;
  ${({ $corner }) => ($corner.includes('north') ? 'top' : 'bottom')}: -0.62rem;
  ${({ $corner }) => ($corner.includes('West') ? 'left' : 'right')}: -0.62rem;
  display: grid;
  place-items: center;
  width: 1.25rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.metalBright};
  background: ${({ theme }) => theme.colors.background.canvas};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  animation: ${cornerGlimmer} ${({ theme }) => theme.motion.duration.twinkle}
    ${({ theme }) => theme.motion.easing.enter} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const EtchedGrid = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(${({ theme }) => theme.colors.border.surface} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border.surface} 1px, transparent 1px),
    radial-gradient(circle at center, transparent 0 28%, ${({ theme }) => theme.colors.border.violet} 28.1% 28.25%, transparent 28.4% 100%);
  background-size: 5rem 5rem, 5rem 5rem, 100% 100%;
  opacity: 0.12;
  mask-image: radial-gradient(circle at center, black, transparent 82%);
`

const SpectralFog = styled.div`
  position: absolute;
  left: ${({ $x }) => `${$x}%`};
  top: ${({ $y }) => `${$y}%`};
  width: min(52rem, 80vw);
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background:
    radial-gradient(circle at 42% 44%, ${({ theme }) => theme.colors.effects.acidGlow} 0%, transparent 34%),
    radial-gradient(circle at 62% 58%, ${({ theme }) => theme.colors.effects.violetGlow} 0%, transparent 48%);
  filter: blur(4.5rem);
  opacity: 0.42;
  transform: translate(-50%, -50%);
  transition: left 700ms ${({ theme }) => theme.motion.easing.enter}, top 700ms ${({ theme }) => theme.motion.easing.enter};

  @media (prefers-reduced-motion: reduce), (pointer: coarse) {
    left: 68%;
    top: 28%;
    transition: none;
  }
`

const StarPlane = styled.div`
  position: absolute;
  inset: 0;
`

const FieldStar = styled.span`
  position: absolute;
  left: ${({ $x }) => `${$x}%`};
  top: ${({ $y }) => `${$y}%`};
  width: ${({ $size }) => `${$size}px`};
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: ${({ theme, $tone }) => theme.colors.accent[$tone]};
  box-shadow:
    0 0 0.35rem ${({ theme }) => theme.colors.effects.starlight},
    0 0 1rem ${({ theme }) => theme.colors.effects.moonlightSoft};
  animation: ${twinkle} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} ${({ $delay }) => `${$delay}s`} infinite;

  &:nth-child(3n) {
    animation-duration: 13s;
  }

  &:nth-child(4n) {
    animation-duration: 9s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.38;
  }
`

const GeometryAnchor = styled.div`
  position: absolute;
  top: 48%;
  left: 76%;
  width: min(34rem, 54vw);
  aspect-ratio: 1;
  opacity: 0.2;
  transform: translate3d(
      ${({ $x }) => `${($x - 50) * 0.22}px`},
      ${({ $y }) => `${($y - 50) * 0.22}px`},
      0
    )
    translate(-50%, -50%);
  transition: transform 900ms ${({ theme }) => theme.motion.easing.enter};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    left: 82%;
    width: 30rem;
    opacity: 0.14;
  }

  @media (prefers-reduced-motion: reduce), (pointer: coarse) {
    transform: translate(-50%, -50%);
    transition: none;
  }
`

const GeometrySpinner = styled.div`
  width: 100%;
  height: 100%;
  animation: ${slowTurn} 90s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const SacredGeometry = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 0 1rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
`

const GeometryOrbit = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.accent.metal};
  stroke-width: 0.8;
  stroke-dasharray: 2 7;
`

const GeometryPolygon = styled.polygon`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.signal};
  stroke-width: 0.7;
`

const SeedCircle = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.violetStrong};
  stroke-width: 0.75;
`

const GeometryCross = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.orbital};
  stroke-width: 0.6;
`

const CoreStar = styled.path`
  fill: ${({ theme }) => theme.colors.effects.acidGlowSoft};
  stroke: ${({ theme }) => theme.colors.accent.acid};
  stroke-width: 1;
`

const Comet = styled.div`
  position: absolute;
  top: ${({ $position }) => ($position === 'upper' ? '18%' : '68%')};
  left: -20vw;
  width: 10rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.accent.metal});
  box-shadow: 0 0 0.7rem ${({ theme }) => theme.colors.effects.starlight};
  opacity: 0;
  animation: ${cometPass} ${({ $position }) => ($position === 'upper' ? '24s' : '31s')} linear
    ${({ $position }) => ($position === 'upper' ? '-7s' : '-19s')} infinite;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 0.32rem;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.accent.acidSoft};
    box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.acidGlow};
    transform: translateY(-50%);
  }

  @media (prefers-reduced-motion: reduce), (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    display: none;
  }
`

const ProgressRail = styled.div`
  position: fixed;
  top: 50%;
  right: max(0.7rem, ${({ theme }) => theme.layout.safeArea.right});
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-items: center;
  transform: translateY(-50%);
  opacity: 0.72;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    display: none;
  }
`

const RailTrack = styled.div`
  position: relative;
  width: 1px;
  height: 9rem;
  background: ${({ theme }) => theme.colors.border.surfaceRaised};
`

const RailFill = styled.span`
  position: absolute;
  inset: 0 0 auto;
  height: ${({ $progress }) => `${$progress * 100}%`};
  background: linear-gradient(
    ${({ theme }) => theme.colors.accent.metal},
    ${({ theme }) => theme.colors.accent.acid}
  );
  box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.effects.acidGlow};
`

const RailOrb = styled.span`
  position: absolute;
  top: ${({ $progress }) => `${$progress * 100}%`};
  left: 50%;
  width: 0.48rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.acidSoft};
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: ${({ theme }) => theme.colors.background.canvas};
  box-shadow: 0 0 0.7rem ${({ theme }) => theme.colors.effects.acidGlow};
  transform: translate(-50%, -50%);
`

const RailGlyph = styled.span`
  color: ${({ theme }) => theme.colors.accent.metal};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`

const PhaseRail = styled.div`
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent.metal};
  opacity: 0.36;
  transform: translateX(-50%);

  &::before,
  &::after {
    content: '';
    align-self: center;
    width: clamp(2rem, 8vw, 8rem);
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border.signal});
  }

  &::after {
    transform: scaleX(-1);
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    display: none;
  }
`

const Phase = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`
