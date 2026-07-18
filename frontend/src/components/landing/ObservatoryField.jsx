import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  EXPERIENCE_MODES,
  EXPERIENCE_TRANSITION_PHASES,
  EXPERIENCE_TRANSITION_TIMING,
} from '../../context/experienceMode'
import { useExperienceMode } from '../../context/useExperienceMode'
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

export function ObservatoryField({
  showModeControl = false,
  activeScene = 0,
  sceneCount = 6,
  dialDirection = 1,
  dialEngaged = false,
  onSceneRequest,
  journeyState,
  chapterStops = [],
}) {
  const { transitionPhase, transitionTarget } = useExperienceMode()
  const [pointer, setPointer] = useState({ x: 50, y: 42 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const pointerRef = useRef(pointer)
  const scrollProgressRef = useRef(scrollProgress)
  const [motionEnabled, setMotionEnabled] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const effectiveScrollProgress = journeyState?.globalProgress ?? scrollProgress
  const displayedStops = chapterStops.length > 0
    ? chapterStops
    : Array.from({ length: sceneCount }, (_, index) => ({
        id: String(index),
        index,
        position: index / Math.max(sceneCount - 1, 1),
      }))
  const isClownTransition = transitionTarget === EXPERIENCE_MODES.CLOWN
  const isWarming =
    isClownTransition && transitionPhase === EXPERIENCE_TRANSITION_PHASES.WARMING
  const isRevealing =
    isClownTransition && transitionPhase === EXPERIENCE_TRANSITION_PHASES.REVEALING

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function handlePreferenceChange(event) {
      setMotionEnabled(!event.matches)
    }

    reducedMotion.addEventListener('change', handlePreferenceChange)

    return () => reducedMotion.removeEventListener('change', handlePreferenceChange)
  }, [])

  useEffect(() => {
    if (journeyState) return undefined
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
  }, [journeyState, motionEnabled])

  return (
    <>
      <FieldRoot
        aria-hidden="true"
        $motionEnabled={motionEnabled}
        $revealing={isRevealing}
      >
        <FieldVisuals $scene={activeScene}>
          <EtchedGrid />
          <SpectralFog $x={pointer.x} $y={pointer.y} $scene={activeScene} />

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

          <GeometryAnchor $x={pointer.x} $y={pointer.y} $scene={activeScene}>
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
        </FieldVisuals>

        <PhaseRail>
          <Phase>●</Phase>
          <Phase>◐</Phase>
          <Phase>○</Phase>
          <Phase>◑</Phase>
          <Phase>●</Phase>
        </PhaseRail>
      </FieldRoot>

      <ProgressRail aria-label="Section orbit navigator" $engaged={dialEngaged}>
        <RailTitle>Orbit</RailTitle>
        <RailGlyph>✦</RailGlyph>
        <RailTrack>
          <RailFill $progress={effectiveScrollProgress} $scene={activeScene} $controlled={Boolean(journeyState)} />
          <RailDial
            aria-hidden="true"
            $direction={dialDirection}
            $engaged={dialEngaged}
            $progress={effectiveScrollProgress}
            $controlled={Boolean(journeyState)}
          />
          <RailOrb
            aria-hidden="true"
            $progress={effectiveScrollProgress}
            $engaged={dialEngaged}
            $controlled={Boolean(journeyState)}
          />
          {displayedStops.map((stop, index) => (
            <RailStop
              key={stop.id}
              type="button"
              aria-label={`Travel to orbit ${index + 1}`}
              aria-current={index === activeScene ? 'step' : undefined}
              $active={index === activeScene}
              $passed={index < activeScene}
              $position={stop.position}
              onClick={() => onSceneRequest?.(stop.index)}
            />
          ))}
        </RailTrack>
        <RailGlyph>☾</RailGlyph>
        <RailReadout>
          {String(activeScene + 1).padStart(2, '0')} / {String(sceneCount).padStart(2, '0')}
        </RailReadout>
      </ProgressRail>

      <ObservatoryFrame
        aria-hidden="true"
        $warming={isWarming}
        $revealing={isRevealing}
      >
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

const frameAwakening = keyframes`
  0% {
    filter: hue-rotate(0deg) brightness(0.86);
    transform: scale(0.992);
  }

  64% {
    filter: hue-rotate(38deg) brightness(1.24);
    transform: scale(1.004);
  }

  100% {
    filter: hue-rotate(104deg) brightness(1.12);
    transform: scale(1);
  }
`

const fieldBreach = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  18% { transform: translate3d(-1px, 1px, 0) scale(1.002); }
  42% { transform: translate3d(1px, -1px, 0) scale(1.006); }
  68% { transform: translate3d(-1px, 0, 0) scale(1.003); }
`

const fieldVoyage = keyframes`
  0% {
    filter: hue-rotate(0deg) saturate(0.94) brightness(0.92);
    transform: translate3d(0, -3.5vh, 0) scale(1.025);
  }

  48% {
    filter: hue-rotate(34deg) saturate(1.08) brightness(1);
    transform: translate3d(0, 0, 0) scale(1.055);
  }

  100% {
    filter: hue-rotate(72deg) saturate(1.16) brightness(1.04);
    transform: translate3d(0, 4vh, 0) scale(1.085);
  }
`

const gridVoyage = keyframes`
  from { transform: translate3d(0, -2.5vh, 0) scale(1.02); }
  to { transform: translate3d(0, 3vh, 0) scale(1.09); }
`

const starVoyage = keyframes`
  from { transform: translate3d(0, 2vh, 0) scale(1.08); }
  to { transform: translate3d(0, -4vh, 0) scale(1.16); }
`

const geometryVoyage = keyframes`
  from {
    translate: 0 -3vh;
    scale: 0.92;
  }

  to {
    translate: 0 4vh;
    scale: 1.12;
  }
`

const dialTurnForward = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg) scale(0.86); }
  to { transform: translate(-50%, -50%) rotate(180deg) scale(1.08); }
`

const dialTurnBackward = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg) scale(0.86); }
  to { transform: translate(-50%, -50%) rotate(-180deg) scale(1.08); }
`

const crystalCharge = keyframes`
  0%, 100% {
    filter: brightness(1) saturate(1);
  }

  48% {
    filter: brightness(1.45) saturate(1.28);
  }
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

  ${({ $revealing }) =>
    $revealing &&
    css`
      animation: ${fieldBreach} 130ms linear infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (forced-colors: active) {
    display: none;
  }
`

const FieldVisuals = styled.div`
  position: absolute;
  inset: -6vh -4vw;
  filter: hue-rotate(${({ $scene }) => $scene * 11}deg)
    saturate(${({ $scene }) => 0.94 + $scene * 0.035})
    brightness(${({ $scene }) => 0.92 + $scene * 0.018});
  transition: filter ${({ theme }) => theme.motion.duration.reveal}
    ${({ theme }) => theme.motion.easing.enter};
  will-change: transform, filter;

  @supports (animation-timeline: scroll()) {
    animation: ${fieldVoyage} linear both;
    animation-timeline: scroll(root block);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    filter: none;
    transform: none;
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
  transform-origin: center;

  ${({ $warming, $revealing, theme }) =>
    ($warming || $revealing) &&
    css`
      border-color: ${theme.colors.border.filigreeBright};
      box-shadow:
        inset 0 0 2.2rem ${theme.colors.effects.goldGlowSoft},
        0 0 1.5rem ${theme.colors.effects.goldGlow},
        0 0 4rem ${theme.colors.effects.violetGlowSoft};
      animation: ${frameAwakening}
        ${$warming
          ? `${EXPERIENCE_TRANSITION_TIMING.warmup}ms`
          : `${EXPERIENCE_TRANSITION_TIMING.reveal}ms`}
        ${theme.motion.easing.enter} both;
    `}

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

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
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

  @supports (animation-timeline: scroll()) {
    animation: ${gridVoyage} linear both;
    animation-timeline: scroll(root block);
    will-change: transform;
  }
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
  opacity: ${({ $scene }) => 0.32 + $scene * 0.035};
  transform: translate(-50%, -50%) scale(${({ $scene }) => 0.9 + $scene * 0.035});
  transition: left 700ms ${({ theme }) => theme.motion.easing.enter}, top 700ms ${({ theme }) => theme.motion.easing.enter}, opacity ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) => theme.motion.easing.enter}, transform ${({ theme }) => theme.motion.duration.reveal} ${({ theme }) => theme.motion.easing.enter};

  @media (prefers-reduced-motion: reduce), (pointer: coarse) {
    left: 68%;
    top: 28%;
    transition: none;
  }
`

const StarPlane = styled.div`
  position: absolute;
  inset: 0;

  @supports (animation-timeline: scroll()) {
    animation: ${starVoyage} linear both;
    animation-timeline: scroll(root block);
    will-change: transform;
  }
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
    translate(-50%, -50%)
    rotate(${({ $scene }) => $scene * 9}deg)
    scale(${({ $scene }) => 0.9 + $scene * 0.025});
  transition: transform ${({ theme }) => theme.motion.duration.reveal} ${({ theme }) => theme.motion.easing.enter};

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

  @supports (animation-timeline: scroll()) {
    animation: ${geometryVoyage} linear both;
    animation-timeline: scroll(root block);
    will-change: translate, scale;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    translate: none;
    scale: none;
  }
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

const ProgressRail = styled.nav`
  position: fixed;
  top: 50%;
  right: max(${({ theme }) => theme.spacing.md}, ${({ theme }) => theme.layout.safeArea.right});
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  justify-items: center;
  width: 3rem;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $engaged }) => ($engaged ? theme.colors.border.filigreeBright : theme.colors.border.surfaceRaised)};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background.glassViolet},
    ${({ theme }) => theme.colors.background.glassInk}
  );
  box-shadow:
    ${({ theme }) => theme.shadows.glass},
    0 0 1.4rem ${({ theme }) => theme.colors.effects.violetGlowSoft},
    0 0 2.2rem ${({ theme, $engaged }) => ($engaged ? theme.colors.effects.acidGlow : theme.colors.effects.goldGlowSoft)};
  backdrop-filter: blur(1rem) saturate(1.25);
  opacity: ${({ $engaged }) => ($engaged ? 0.96 : 0.34)};
  transform: translateY(-50%) scale(${({ $engaged }) => ($engaged ? 1 : 0.96)});
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    opacity ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  &:hover,
  &:focus-within {
    opacity: 0.94;
    transform: translateY(-50%) scale(1);
    border-color: ${({ theme }) => theme.colors.border.filigreeBright};
    box-shadow:
      ${({ theme }) => theme.shadows.glass},
      0 0 1.6rem ${({ theme }) => theme.colors.effects.violetGlowSoft},
      0 0 2.4rem ${({ theme }) => theme.colors.effects.acidGlow};
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 0.72rem;
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.acidSoft};
    background: ${({ theme }) => theme.colors.background.canvas};
    box-shadow: 0 0 0.8rem ${({ theme }) => theme.colors.effects.acidGlow};
    transform: translateX(-50%) rotate(45deg);
  }

  &::before { top: -0.36rem; }
  &::after { bottom: -0.36rem; }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const RailTrack = styled.div`
  position: relative;
  width: ${({ theme }) => theme.borders.width.focus};
  height: 12rem;
  background: ${({ theme }) => theme.colors.border.surfaceRaised};
  box-shadow: 0 0 0.8rem ${({ theme }) => theme.colors.effects.goldGlowSoft};
`

const RailFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $controlled, $progress }) =>
    $controlled ? 'calc(var(--atlas-progress) * 100%)' : `${$progress * 100}%`};
  background: linear-gradient(
    ${({ theme }) => theme.colors.accent.metal},
    ${({ theme }) => theme.colors.accent.acid}
  );
  filter: hue-rotate(${({ $scene }) => $scene * 11}deg);
  transition: height ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) => theme.motion.easing.enter};
  box-shadow:
    0 0 0.55rem ${({ theme }) => theme.colors.effects.acidGlow},
    0 0 1.1rem ${({ theme }) => theme.colors.effects.cyanGlow};
`

const RailOrb = styled.span`
  position: absolute;
  top: ${({ $controlled, $progress }) =>
    $controlled ? 'calc(var(--atlas-progress) * 100%)' : `${$progress * 100}%`};
  left: 50%;
  z-index: 2;
  width: 0.72rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.acidSoft};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.accent.acidSoft};
  box-shadow:
    0 0 0.65rem ${({ theme }) => theme.colors.effects.acidGlow},
    0 0 1.4rem ${({ theme }) => theme.colors.effects.cyanGlow},
    0 0 2.4rem ${({ theme, $engaged }) => ($engaged ? theme.colors.effects.acidGlow : theme.colors.effects.violetGlowSoft)};
  transform: translate(-50%, -50%) rotate(45deg);
  transition: top ${({ theme }) => theme.transitions.fast};
  will-change: top;

  &::after {
    content: '';
    position: absolute;
    inset: 24%;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.background.canvas};
  }

  ${({ $engaged }) =>
    $engaged &&
    css`
      animation: ${crystalCharge} 720ms ease-in-out infinite;
    `}
`

const RailDial = styled.span`
  position: absolute;
  top: ${({ $controlled, $progress }) =>
    $controlled ? 'calc(var(--atlas-progress) * 100%)' : `${$progress * 100}%`};
  left: 50%;
  z-index: 1;
  width: 1.75rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} dashed
    ${({ theme }) => theme.colors.accent.metalBright};
  border-radius: ${({ theme }) => theme.radii.orbital};
  box-shadow:
    inset 0 0 0.7rem ${({ theme }) => theme.colors.effects.goldGlowSoft},
    0 0 1.2rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  transform: translate(-50%, -50%);
  transition: top ${({ theme }) => theme.transitions.fast};

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0.28rem;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.signal};
    transform: rotate(45deg);
  }

  &::after { transform: rotate(90deg); }

  ${({ $engaged, $direction }) =>
    $engaged &&
    css`
      animation: ${$direction > 0 ? dialTurnForward : dialTurnBackward} 860ms
        ${({ theme }) => theme.motion.easing.magnetic} both;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const RailStop = styled.button`
  position: absolute;
  top: ${({ $position }) => `${$position * 100}%`};
  left: 50%;
  z-index: 3;
  width: 1.35rem;
  min-height: 0;
  height: 1.35rem;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: transparent;
  transform: translate(-50%, -50%);

  &::before {
    content: '';
    position: absolute;
    inset: ${({ $active }) => ($active ? '0.3rem' : '0.46rem')};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme, $active, $passed }) => ($active ? theme.colors.accent.acidSoft : $passed ? theme.colors.accent.metalBright : theme.colors.border.surfaceRaised)};
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme, $active, $passed }) => ($active ? theme.colors.accent.acid : $passed ? theme.colors.accent.metal : theme.colors.background.canvas)};
    box-shadow: ${({ theme, $active }) => ($active ? `0 0 1rem ${theme.colors.effects.acidGlow}` : 'none')};
    transition: inset ${({ theme }) => theme.transitions.base},
      background ${({ theme }) => theme.transitions.base},
      border-color ${({ theme }) => theme.transitions.base},
      box-shadow ${({ theme }) => theme.transitions.base};
  }

  &:hover::before,
  &:focus-visible::before {
    inset: 0.28rem;
    border-color: ${({ theme }) => theme.colors.accent.acidSoft};
    box-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.acidGlow};
  }
`

const RailGlyph = styled.span`
  color: ${({ theme }) => theme.colors.accent.metalBright};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  filter: drop-shadow(0 0 0.45rem ${({ theme }) => theme.colors.effects.goldGlow});
`

const RailTitle = styled.span`
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.micro};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
  text-transform: uppercase;
  writing-mode: vertical-rl;
`

const RailReadout = styled.span`
  color: ${({ theme }) => theme.colors.accent.signal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.micro};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  white-space: nowrap;
  writing-mode: vertical-rl;
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
