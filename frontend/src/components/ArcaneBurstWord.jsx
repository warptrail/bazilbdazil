import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useArcanePulse } from '../hooks/useArcanePulse'

const burstVectors = [
  ['-1.85em', '-0.62em', '-22deg'],
  ['-1.42em', '0.82em', '17deg'],
  ['-0.86em', '-0.88em', '-13deg'],
  ['-0.25em', '1.05em', '21deg'],
  ['0.48em', '-0.76em', '-17deg'],
  ['1.02em', '0.9em', '15deg'],
  ['1.48em', '-0.62em', '24deg'],
  ['1.92em', '0.72em', '-19deg'],
  ['2.2em', '-0.26em', '15deg'],
  ['2.42em', '0.92em', '-11deg'],
]

const letterGlimmer = keyframes`
  0%, 100% { filter: brightness(0.88); }
  50% { filter: brightness(1.5) drop-shadow(0 0 0.45rem currentColor); }
`

const snakeColorDrift = keyframes`
  0%, 100% { color: var(--burst-tone-start); }
  52% { color: var(--burst-tone-end); }
`

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

const createSnakeLayout = (letterCount) => {
  const direction = Math.random() > 0.5 ? 1 : -1
  const amplitude = 0.22 + Math.random() * 0.18
  const span = 3.75 + Math.random() * 0.95
  const phase = Math.random() * Math.PI * 2
  const waves = 0.9 + Math.random() * 0.85
  const slope = (Math.random() - 0.5) * 0.3

  return Array.from({ length: letterCount }, (_, index) => {
    const progress = letterCount > 1 ? index / (letterCount - 1) : 0
    const angle = phase + progress * Math.PI * waves
    const x = direction * (0.22 + progress * span)
    const y = clamp(
      0.7 + Math.sin(angle) * amplitude + (progress - 0.5) * slope,
      0.34,
      1.08,
    )
    const rotation = clamp(Math.cos(angle) * amplitude * 15 + direction * slope * 8, -18, 18)
    const tone = Math.floor(Math.random() * 5)
    const nextTone = (tone + 1 + Math.floor(Math.random() * 4)) % 5

    return {
      x: `${x.toFixed(2)}em`,
      y: `${y.toFixed(2)}em`,
      rotation: `${rotation.toFixed(1)}deg`,
      tone,
      nextTone,
    }
  })
}

const createHaloLayout = (letterCount) => {
  const direction = Math.random() > 0.5 ? 1 : -1
  const radiusX = 3.4 + Math.random() * 0.75
  const radiusY = 0.88 + Math.random() * 0.38
  const phase = Math.random() * Math.PI * 0.7 - Math.PI * 0.35

  return Array.from({ length: letterCount }, (_, index) => {
    const progress = letterCount > 1 ? index / (letterCount - 1) : 0
    const angle = phase + direction * (progress - 0.5) * Math.PI * 1.18
    const x = Math.cos(angle) * radiusX * direction
    const y = Math.sin(angle) * radiusY + 0.36
    const tone = (index + Math.floor(Math.random() * 4)) % 5

    return {
      x: `${x.toFixed(2)}em`,
      y: `${y.toFixed(2)}em`,
      rotation: `${clamp((angle * 180) / Math.PI + 90, -34, 34).toFixed(1)}deg`,
      tone,
      nextTone: (tone + 2) % 5,
    }
  })
}

const getBurstTone = (tone, theme) => {
  const tones = [
    theme.colors.accent.metalBright,
    theme.colors.accent.signal,
    theme.colors.accent.ultravioletStrong,
    theme.colors.accent.acidSoft,
    theme.colors.accent.rose,
  ]

  return tones[tone % tones.length]
}

/**
 * A compact word mark that keeps its first letter in-flow and scatters the remaining letters
 * during ambient or pointer-triggered reveals.
 */
export function ArcaneBurstWord({ word, compactSuffix = '.', onActiveChange }) {
  const [isHovered, setIsHovered] = useState(false)
  const [ambientPattern, setAmbientPattern] = useState({ type: 'scatter', letters: [] })
  const pulseCountRef = useRef(0)
  const wasPulsingRef = useRef(false)
  const { allowsMotion, isPulsing } = useArcanePulse({ intervalMs: 8200, durationMs: 3800 })
  const isActive = allowsMotion && (isHovered || isPulsing)
  const [initial = '', ...hiddenLetters] = [...word]
  const activePattern = isHovered ? 'scatter' : ambientPattern.type

  useEffect(() => {
    const isStartingPulse = isPulsing && !wasPulsingRef.current

    if (isStartingPulse) {
      pulseCountRef.current += 1
      const pattern = ['scatter', 'snake', 'halo'][(pulseCountRef.current - 1) % 3]
      setAmbientPattern(
        pattern === 'snake'
          ? { type: pattern, letters: createSnakeLayout(hiddenLetters.length) }
          : pattern === 'halo'
            ? { type: pattern, letters: createHaloLayout(hiddenLetters.length) }
            : { type: pattern, letters: [] },
      )
    }

    wasPulsingRef.current = isPulsing
  }, [hiddenLetters.length, isPulsing])

  useEffect(() => {
    onActiveChange?.(isActive)
  }, [isActive, onActiveChange])

  return (
    <BurstWord
      aria-hidden="true"
      data-testid="brand-arcane-word"
      data-state={isActive ? 'active' : 'idle'}
      data-pattern={isActive ? activePattern : 'idle'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CompactInitial>
        {initial}
        {compactSuffix}
      </CompactInitial>
      <BurstCloud>
        {hiddenLetters.map((letter, index) => {
          const layoutLetter = ambientPattern.letters[index]

          return (
            <BurstLetter
              key={`${letter}-${index}`}
              $active={isActive}
              $index={index}
              $pattern={activePattern}
              $layoutLetter={layoutLetter}
            >
              {letter}
            </BurstLetter>
          )
        })}
      </BurstCloud>
    </BurstWord>
  )
}

const BurstWord = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.transition};
  display: inline-block;
  isolation: isolate;
  margin-inline: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  cursor: default;
`

const CompactInitial = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  color: currentColor;
  text-shadow: 0 0 0.7rem ${({ theme }) => theme.colors.effects.acidGlowSoft};
`

const BurstCloud = styled.span`
  position: absolute;
  inset: 50% auto auto 50%;
  z-index: ${({ theme }) => theme.zIndex.transition};
  width: 0;
  height: 0;
  pointer-events: none;
  transform: translateY(0.3em);
  transform-origin: center;
  transition: transform ${({ theme }) => theme.motion.duration.ritual}
    ${({ theme }) => theme.motion.easing.enter};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    transform: translate(0.08em, 0.32em) scale(1.18);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    transform: translate(0.16em, 0.36em) scale(1.38);
  }

  @media (prefers-reduced-motion: reduce) {
    transform: translateY(0.3em);
    transition: none;
  }
`

const BurstLetter = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  --burst-tone-start: ${({ $index, $layoutLetter, theme }) =>
    getBurstTone($layoutLetter?.tone ?? $index, theme)};
  --burst-tone-end: ${({ $index, $layoutLetter, theme }) =>
    getBurstTone($layoutLetter?.nextTone ?? $index + 1, theme)};
  color: var(--burst-tone-start);
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: 0.72em;
  line-height: 1;
  opacity: 0;
  transform: translate(-50%, -50%) rotate(0) scale(0.3);
  transition:
    opacity ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.magnetic};
  transition-delay: ${({ $index, $pattern }) =>
    `${$index * ($pattern === 'scatter' ? 34 : 76)}ms`};

  ${({ $active, $index, $pattern, $layoutLetter, theme }) => {
    if (!$active) return null

    if (($pattern === 'snake' || $pattern === 'halo') && $layoutLetter) {
      return css`
        opacity: 1;
        transform: translate(
            calc(-50% + ${$layoutLetter.x}),
            calc(-50% + ${$layoutLetter.y})
          )
          rotate(${$layoutLetter.rotation}) scale(${$pattern === 'halo' ? 1.08 : 1});
        animation:
          ${letterGlimmer} ${theme.motion.duration.twinkle} ${theme.motion.easing.ambient}
            infinite alternate,
          ${snakeColorDrift} ${theme.motion.duration.twinkle}
            ${theme.motion.easing.ambient} infinite alternate;
      `
    }

    const [x, y, rotation] = burstVectors[$index % burstVectors.length]

    return css`
      opacity: 1;
      transform: translate(calc(-50% + ${x}), calc(-50% + ${y})) rotate(${rotation}) scale(1);
      animation: ${letterGlimmer} ${theme.motion.duration.twinkle}
        ${theme.motion.easing.ambient} infinite alternate;
    `
  }}

  @media (prefers-reduced-motion: reduce) {
    display: none;
    animation: none;
    transition: none;
  }
`
