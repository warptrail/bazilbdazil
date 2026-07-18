import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useArcanePulse } from '../hooks/useArcanePulse'

const glyphCycles = {
  a: ['A', 'α', 'Λ', '∆', '@', 'Å'],
  b: ['B', 'Β', 'Ƃ', 'ß', 'ʙ', '8'],
  c: ['C', 'ϲ', 'Ɔ', '¢', '☾', 'Ç'],
  h: ['H', 'Η', 'ħ', '♄', '╫', 'ʜ'],
  i: ['I', 'Ι', 'ɪ', '¦', '!', 'ⵊ'],
  l: ['L', 'Λ', 'ℒ', '⌞', '∟', 'し'],
  n: ['N', 'Ν', 'η', 'Ɲ', 'И', '∩'],
}

const glyphMerge = keyframes`
  0%, 100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scaleX(1) skewX(0deg);
  }

  24% {
    opacity: 0.46;
    transform: translate3d(var(--glyph-drift-x), -0.035em, 0) scaleX(0.82) skewX(-4deg);
  }

  52% {
    opacity: 0.96;
    transform: translate3d(calc(var(--glyph-drift-x) * -0.55), 0.018em, 0) scaleX(1.08) skewX(2deg);
  }

  78% {
    opacity: 0.68;
    transform: translate3d(calc(var(--glyph-drift-x) * 0.35), -0.012em, 0) scaleX(0.94) skewX(-1deg);
  }
`

const echoOrbit = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(0deg) scale(0.72);
  }

  28% {
    opacity: var(--echo-opacity);
    transform: translate(
        calc(-50% + var(--echo-x)),
        calc(-50% + var(--echo-y))
      )
      rotate(var(--echo-rotation)) scale(0.94);
  }

  62% {
    opacity: 0.16;
    transform: translate(
        calc(-50% - var(--echo-x)),
        calc(-50% + var(--echo-y))
      )
      rotate(0deg) scale(1.08);
  }
`

const getGlyphTone = (index, theme) => {
  if (index % 3 === 0) return theme.colors.accent.acidSoft
  if (index % 3 === 1) return theme.colors.accent.signal
  return theme.colors.accent.ultravioletStrong
}

const getGlyphVariant = (letter, index, phase, offset = 0) => {
  const variants = glyphCycles[letter.toLowerCase()] || [letter]
  return variants[(index + phase + offset) % variants.length]
}

/**
 * An in-flow display word that periodically substitutes selected letters with Greek glyphs.
 */
export function ArcaneTransmutationWord({ word }) {
  const [isHovered, setIsHovered] = useState(false)
  const [phase, setPhase] = useState(0)
  const { allowsMotion, isPulsing } = useArcanePulse({ intervalMs: 9000, durationMs: 5800 })
  const isActive = allowsMotion && (isHovered || isPulsing)

  useEffect(() => {
    if (!isActive) return undefined

    const phaseInterval = window.setInterval(
      () => setPhase((currentPhase) => (currentPhase + 1) % 24),
      720,
    )

    return () => window.clearInterval(phaseInterval)
  }, [isActive])

  return (
    <TransmutationWord
      data-testid="hero-arcane-word"
      data-state={isActive ? 'active' : 'idle'}
      data-phase={phase}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {[...word].map((letter, index) => {
        const clusterPosition = (index - phase + word.length) % word.length
        const isTransmuted =
          isActive && (clusterPosition < 5 || (index + phase) % 4 === 0)
        const displayedLetter = isTransmuted
          ? getGlyphVariant(letter, index, phase)
          : letter
        const firstEcho = getGlyphVariant(letter, index, phase, 2)
        const secondEcho = getGlyphVariant(letter, index, phase, 4)

        return (
          <ArcaneGlyph
            key={`${word}-${index}`}
            $active={isActive}
            $index={index}
            $phase={phase}
            $transmuted={isTransmuted}
          >
            <GlyphEcho aria-hidden="true" $active={isActive} $direction={-1} $index={index}>
              {firstEcho}
            </GlyphEcho>
            <GlyphCharacter $active={isActive} $index={index}>
              {displayedLetter}
            </GlyphCharacter>
            <GlyphEcho aria-hidden="true" $active={isActive} $direction={1} $index={index}>
              {secondEcho}
            </GlyphEcho>
          </ArcaneGlyph>
        )
      })}
    </TransmutationWord>
  )
}

const TransmutationWord = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.transition};
  display: inline-block;
  isolation: isolate;
  margin-block: -0.16em;
  padding-block: 0.16em;
  overflow: visible;
  white-space: nowrap;
`

const ArcaneGlyph = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.transition};
  display: inline-block;
  width: ${({ $active, $index, $phase }) => {
    if (!$active) return '0.49em'
    return `${(0.445 + (($index + $phase) % 5) * 0.021).toFixed(3)}em`
  }};
  margin-inline: ${({ $active, $index, $phase }) =>
    $active && ($index + $phase) % 6 === 0 ? '-0.035em' : '0'};
  color: ${({ theme }) => theme.colors.text.primary};
  -webkit-text-fill-color: currentColor;
  text-align: center;
  transform: translateX(
    ${({ $active, $index, $phase }) =>
      $active ? `${((($index + $phase) % 3) - 1) * 0.018}em` : '0'}
  );
  transition:
    width ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    margin ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    color ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    filter ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  ${({ $active, $index, $transmuted, theme }) => {
    if (!$active) return null
    const tone = getGlyphTone($index, theme)

    return css`
      color: ${tone};
      -webkit-text-fill-color: ${tone};
      filter: drop-shadow(0 0 ${$transmuted ? '0.42rem' : '0.18rem'} ${tone});
    `
  }}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
    width: 0.49em;
    margin-inline: 0;
    transform: none;
  }
`

const GlyphCharacter = styled.span`
  --glyph-drift-x: ${({ $index }) => `${(($index % 5) - 2) * 0.018}em`};

  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: block;
  opacity: 1;

  ${({ $active, $index, theme }) =>
    $active &&
    css`
      animation: ${glyphMerge} ${theme.motion.duration.twinkle}
        ${theme.motion.easing.ambient} infinite;
      animation-delay: ${-$index * 83}ms;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`

const GlyphEcho = styled.span`
  --echo-x: ${({ $direction, $index }) =>
    `${$direction * (0.16 + ($index % 4) * 0.045)}em`};
  --echo-y: ${({ $direction, $index }) =>
    `${$direction * -1 * (0.06 + ($index % 3) * 0.035)}em`};
  --echo-rotation: ${({ $direction, $index }) =>
    `${$direction * (4 + ($index % 5) * 2)}deg`};
  --echo-opacity: ${({ $index }) => 0.24 + ($index % 4) * 0.06};

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  color: ${({ theme, $index }) => getGlyphTone($index + 1, theme)};
  -webkit-text-fill-color: currentColor;
  font-size: 0.74em;
  line-height: 1;
  opacity: 0;
  mix-blend-mode: screen;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.72);

  ${({ $active, $index, theme }) =>
    $active &&
    css`
      animation: ${echoOrbit} ${theme.motion.duration.twinkle}
        ${theme.motion.easing.ambient} infinite;
      animation-delay: ${-$index * 119}ms;
    `}

  @media (prefers-reduced-motion: reduce) {
    display: none;
    animation: none;
  }
`
