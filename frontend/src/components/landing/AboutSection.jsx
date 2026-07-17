import { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  BodyCopy,
  Card,
  Container,
  DisplayHeading,
  Divider,
  RitualLabel,
  Section,
} from '../../styles/primitives'

export function AboutSection({ content: about }) {
  const [lead, ...remainingIntro] = about.intro
  const [activeEnergy, setActiveEnergy] = useState(null)
  const activeMoment =
    activeEnergy === null ? null : energyMoments[activeEnergy % energyMoments.length]

  return (
    <AboutRoot id="about" aria-labelledby="about-heading">
      <ArchiveConstellation aria-hidden="true" focusable="false" viewBox="0 0 1200 620">
        <ConstellationPath d="M48 134 174 72l142 91 166-82 144 116 186-94 164 109 166-68" />
        <ConstellationPath d="m103 478 146-84 153 72 131-128 179 92 143-155 174 103 125-78" />
        <ConstellationNode cx="48" cy="134" r="4" />
        <ConstellationNode cx="174" cy="72" r="3" />
        <ConstellationNode cx="316" cy="163" r="5" />
        <ConstellationNode cx="482" cy="81" r="3" />
        <ConstellationNode cx="626" cy="197" r="4" />
        <ConstellationNode cx="812" cy="103" r="5" />
        <ConstellationNode cx="976" cy="212" r="3" />
        <ConstellationNode cx="1142" cy="144" r="4" />
        <ConstellationNode cx="103" cy="478" r="3" />
        <ConstellationNode cx="249" cy="394" r="5" />
        <ConstellationNode cx="402" cy="466" r="3" />
        <ConstellationNode cx="533" cy="338" r="4" />
        <ConstellationNode cx="712" cy="430" r="5" />
        <ConstellationNode cx="855" cy="275" r="3" />
        <ConstellationNode cx="1029" cy="378" r="4" />
        <ConstellationNode cx="1154" cy="300" r="3" />
      </ArchiveConstellation>
      <AboutContainer>
        <AboutLayout>
          <AboutNarrative>
            <NarrativeCorner aria-hidden="true">✦</NarrativeCorner>
            <RitualLabel $tone="metal">{about.eyebrow}</RitualLabel>
            <AboutHeading id="about-heading">{about.title}</AboutHeading>
            <AboutRule $tone="signal" />

            <AboutCopy>
              {lead ? <AboutLead>{lead}</AboutLead> : null}
              {remainingIntro.map((paragraph) => (
                <AboutParagraph key={paragraph}>{paragraph}</AboutParagraph>
              ))}
            </AboutCopy>

            {about.energy.terms.length > 0 ? (
              <EnergyIndex>
                <EnergyLabel>{about.energy.label}</EnergyLabel>
                <EnergyTerms aria-label={`${about.energy.label}: ${about.energy.terms.join(', ')}`}>
                  {about.energy.terms.map((term, index) => {
                    const moment = energyMoments[index % energyMoments.length]
                    const isActive = activeEnergy === index

                    return (
                      <EnergyTerm
                        key={term}
                        type="button"
                        $active={isActive}
                        $effect={moment.effect}
                        aria-pressed={isActive}
                        aria-label={`${term}: reveal a small surprise`}
                        onClick={() => setActiveEnergy(isActive ? null : index)}
                      >
                        <EnergyGlyph aria-hidden="true">{moment.glyph}</EnergyGlyph>
                        <EnergyTermLabel>{term}</EnergyTermLabel>
                      </EnergyTerm>
                    )
                  })}
                </EnergyTerms>
                <EnergyResponse aria-live="polite" aria-atomic="true">
                  {activeMoment ? (
                    <EnergyResponseMoment key={activeEnergy}>
                      <EnergyResponseGlyph aria-hidden="true">
                        {activeMoment.responseGlyph}
                      </EnergyResponseGlyph>
                      <EnergyResponseText>{activeMoment.message}</EnergyResponseText>
                    </EnergyResponseMoment>
                  ) : null}
                </EnergyResponse>
              </EnergyIndex>
            ) : null}
          </AboutNarrative>

          <PortraitFigure $variant="raised" $radius="xl">
            <PortraitGeometry aria-hidden="true" focusable="false" viewBox="0 0 400 520">
              <GeometryOrbit cx="200" cy="260" r="176" />
              <GeometryOrbit cx="200" cy="260" r="144" />
              <GeometryOrbit cx="200" cy="260" r="108" />
              <GeometryPolygon points="200,44 346,260 200,476 54,260" />
              <GeometryPolygon points="200,84 322,388 78,388" />
              <GeometryAxis d="M20 260h360M200 18v484" />
              <GeometryStar d="m200 229 8 23 24 8-24 8-8 23-8-23-24-8 24-8Z" />
            </PortraitGeometry>
            <PortraitPicture>
              <PortraitSource
                type="image/avif"
                srcSet={about.portrait.avifSrcSet}
                sizes={about.portrait.sizes}
              />
              <PortraitSource
                type="image/webp"
                srcSet={about.portrait.webpSrcSet}
                sizes={about.portrait.sizes}
              />
              <PortraitImage
                src={about.portrait.src}
                width={about.portrait.width}
                height={about.portrait.height}
                alt={about.portrait.alt}
                loading="lazy"
                decoding="async"
              />
            </PortraitPicture>
            <PortraitCaption $tone="signal">{about.portrait.caption}</PortraitCaption>
          </PortraitFigure>
        </AboutLayout>
      </AboutContainer>
    </AboutRoot>
  )
}

const energyMoments = [
  {
    effect: 'eclipse',
    glyph: '☽',
    responseGlyph: '◐',
    message: 'The mirror answers with another question.',
  },
  {
    effect: 'heckle',
    glyph: '✦',
    responseGlyph: '⁂',
    message: 'A tiny cosmic heckle echoes from the balcony.',
  },
  {
    effect: 'anchor',
    glyph: '♄',
    responseGlyph: '⌂',
    message: 'Take water. Text when you arrive.',
  },
  {
    effect: 'compass',
    glyph: '◇',
    responseGlyph: '⌁',
    message: 'The compass briefly points sideways.',
  },
  {
    effect: 'curtain',
    glyph: '♆',
    responseGlyph: '❦',
    message: 'The velvet curtain remembers your entrance.',
  },
  {
    effect: 'nuisance',
    glyph: '※',
    responseGlyph: '✶',
    message: 'One star has been politely rearranged.',
  },
  {
    effect: 'portal',
    glyph: '⊙',
    responseGlyph: '◎',
    message: 'The threshold opens exactly one inch.',
  },
  {
    effect: 'question',
    glyph: '☿',
    responseGlyph: '?',
    message: 'What changes when nobody names it?',
  },
]

const AboutRoot = styled(Section)`
  isolation: isolate;
  overflow: clip;
  padding-block: ${({ theme }) => theme.layout.sectionBlock};
  background:
    ${({ theme }) => theme.colors.gradients.atmosphereTexture},
    radial-gradient(
      circle at 84% 44%,
      ${({ theme }) => theme.colors.effects.violetGlowSoft},
      transparent 28%
    ),
    radial-gradient(
      circle at 7% 72%,
      ${({ theme }) => theme.colors.effects.acidGlowSoft},
      transparent 18%
    );

  &::before {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.xl};
    z-index: -1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surface};
    border-radius: ${({ theme }) => theme.radii['2xl']};
    content: '';
    pointer-events: none;
    mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
  }
`

const AboutContainer = styled(Container)``

const AboutLayout = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing['4xl']};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.08fr) minmax(17rem, 0.92fr);
    gap: ${({ theme }) => theme.spacing['5xl']};
  }
`

const AboutNarrative = styled.div`
  position: relative;
  display: grid;
  align-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.proseWidth};
  padding: clamp(${({ theme }) => theme.spacing['2xl']}, 4vw, ${({ theme }) =>
      theme.spacing['4xl']});
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.background.surfaceRaised},
      ${({ theme }) => theme.colors.background.glassInk}
    ),
    ${({ theme }) => theme.colors.gradients.atmosphereTexture};
  box-shadow:
    ${({ theme }) => theme.shadows.surfaceRaised},
    inset ${({ theme }) => theme.spacing['4xl']} 0 ${({ theme }) => theme.spacing['5xl']}
      ${({ theme }) => theme.colors.effects.violetGlowSoft};

  &::before,
  &::after {
    position: absolute;
    width: ${({ theme }) => theme.spacing['4xl']};
    height: ${({ theme }) => theme.spacing['4xl']};
    border-color: ${({ theme }) => theme.colors.accent.metal};
    border-style: ${({ theme }) => theme.borders.style};
    content: '';
    pointer-events: none;
  }

  &::before {
    top: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    border-width: ${({ theme }) => theme.borders.width.thin} 0 0
      ${({ theme }) => theme.borders.width.thin};
  }

  &::after {
    right: ${({ theme }) => theme.spacing.md};
    bottom: ${({ theme }) => theme.spacing.md};
    border-width: 0 ${({ theme }) => theme.borders.width.thin}
      ${({ theme }) => theme.borders.width.thin} 0;
  }
`

const NarrativeCorner = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent.metal};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  text-shadow: 0 0 ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.colors.effects.starlight};
`

const AboutHeading = styled(DisplayHeading).attrs({
  as: 'h2',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})`
  text-wrap: balance;
  text-shadow: 0 0 ${({ theme }) => theme.spacing['5xl']}
    ${({ theme }) => theme.colors.effects.violetGlow};
`

const AboutRule = styled(Divider)`
  max-width: ${({ theme }) => theme.spacing['5xl']};
`

const AboutCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

const AboutLead = styled(BodyCopy).attrs({
  $tone: 'bodyStrong',
})`
  max-width: 31ch;
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

const AboutParagraph = styled(BodyCopy)`
  max-width: ${({ theme }) => theme.layout.proseWidth};
`

const EnergyIndex = styled.div`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
`

const EnergyLabel = styled(RitualLabel).attrs({
  $tone: 'metal',
})``

const chipGloss = keyframes`
  from { transform: translateX(-145%) skewX(-18deg); }
  to { transform: translateX(185%) skewX(-18deg); }
`

const eclipseAwaken = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  45% { transform: translateY(-2px) scale(1.035); }
`

const heckleKick = keyframes`
  0%, 100% { transform: rotate(0); }
  35% { transform: rotate(-2.5deg) translateY(-2px); }
  65% { transform: rotate(1.5deg) translateY(-1px); }
`

const anchorDrop = keyframes`
  0%, 100% { transform: translateY(0); }
  48% { transform: translateY(3px); }
  72% { transform: translateY(-1px); }
`

const compassTurn = keyframes`
  0%, 100% { transform: rotate(0); }
  52% { transform: rotate(3deg) scale(0.985); }
`

const curtainSway = keyframes`
  0%, 100% { transform: skewX(0); }
  40% { transform: skewX(-2deg) translateY(-1px); }
  70% { transform: skewX(1deg); }
`

const nuisanceGlitch = keyframes`
  0%, 100% { transform: translate(0); }
  32% { transform: translate(2px, -1px); }
  36% { transform: translate(-1px, 1px); }
  64% { transform: translate(1px, 0); }
`

const portalOpen = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scaleX(1.045) scaleY(0.97); }
`

const questionFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  45% { transform: translateY(-3px); }
`

const responseReveal = keyframes`
  from { opacity: 0; transform: translateY(0.35rem); }
  to { opacity: 1; transform: translateY(0); }
`

const effectMotion = {
  eclipse: eclipseAwaken,
  heckle: heckleKick,
  anchor: anchorDrop,
  compass: compassTurn,
  curtain: curtainSway,
  nuisance: nuisanceGlitch,
  portal: portalOpen,
  question: questionFloat,
}

const EnergyTerms = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`

const EnergyTerm = styled.button`
  --chip-cut: ${({ theme }) => theme.radii.sm};
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  isolation: isolate;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ $active, theme }) =>
      $active ? theme.colors.border.filigreeBright : theme.colors.border.surfaceRaised};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.bodyStrong : theme.colors.text.bodyMuted};
  font: inherit;
  text-align: left;
  background:
    ${({ $active, theme }) => ($active ? theme.colors.gradients.spectralWash : 'none')},
    ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: ${({ $active, theme }) =>
    $active ? `${theme.shadows.surfacePressed}, ${theme.shadows.metalHover}` : theme.shadows.surfaceInset};
  clip-path: polygon(
    var(--chip-cut) 0,
    calc(100% - var(--chip-cut)) 0,
    100% var(--chip-cut),
    100% calc(100% - var(--chip-cut)),
    calc(100% - var(--chip-cut)) 100%,
    var(--chip-cut) 100%,
    0 calc(100% - var(--chip-cut)),
    0 var(--chip-cut)
  );
  cursor: pointer;
  appearance: none;
  transition:
    color ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    border-color ${({ theme }) => theme.motion.duration.base} ${({ theme }) => theme.motion.easing.standard},
    transform ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter},
    box-shadow ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  &::before {
    position: absolute;
    inset: -20% -45%;
    z-index: -1;
    background: ${({ theme }) => theme.colors.gradients.buttonGlint};
    content: '';
    pointer-events: none;
    transform: translateX(-145%) skewX(-18deg);
  }

  &::after {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.xs};
    z-index: -1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.etched};
    border-radius: ${({ theme }) => theme.radii.sm};
    content: '';
    pointer-events: none;
    clip-path: inherit;
  }

  ${({ $active, $effect, theme }) =>
    $active &&
    css`
      animation: ${effectMotion[$effect] || eclipseAwaken} ${theme.motion.duration.ritual}
        ${theme.motion.easing.enter} both;

      &::before {
        animation: ${chipGloss} ${theme.motion.duration.sweep} ${theme.motion.easing.enter}
          both;
      }
    `}

  &:focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.spacing.xs};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  &:active {
    transform: translateY(${({ theme }) => theme.layout.activeDepth}) scale(0.985);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.filigreeBright};
      color: ${({ theme }) => theme.colors.text.bodyStrong};
      box-shadow: ${({ theme }) => theme.shadows.metalHover};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});

      &::before {
        animation: ${chipGloss} ${({ theme }) => theme.motion.duration.sweep}
          ${({ theme }) => theme.motion.easing.enter} both;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &::before {
      animation: none;
    }

    &:hover {
      transform: none;
    }
  }
`

const EnergyGlyph = styled.span`
  display: inline-grid;
  flex: 0 0 auto;
  width: ${({ theme }) => theme.spacing['2xl']};
  min-height: ${({ theme }) => theme.spacing['2xl']};
  place-items: center;
  border-right: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.etched};
  color: ${({ theme }) => theme.colors.accent.metalBright};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
`

const EnergyTermLabel = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
`

const EnergyResponse = styled.div`
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
`

const EnergyResponseMoment = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-left: ${({ theme }) => theme.borders.width.medium} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.acid};
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  background: ${({ theme }) => theme.colors.background.glassInk};
  animation: ${responseReveal} ${({ theme }) => theme.motion.duration.luxury}
    ${({ theme }) => theme.motion.easing.enter} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const EnergyResponseGlyph = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

const EnergyResponseText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-style: italic;
`

const PortraitFigure = styled(Card).attrs({
  as: 'figure',
})`
  position: relative;
  display: grid;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md};
  overflow: visible;
  isolation: isolate;
  border-color: ${({ theme }) => theme.colors.border.violetStrong};
  background:
    linear-gradient(
      145deg,
      ${({ theme }) => theme.colors.background.surfaceRaised},
      ${({ theme }) => theme.colors.background.surfacePressed}
    ),
    ${({ theme }) => theme.colors.gradients.atmosphereTexture};
  box-shadow:
    ${({ theme }) => theme.shadows.portrait},
    ${({ theme }) => theme.shadows.surfaceRaised};

  &::before,
  &::after {
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.content};
    width: 24%;
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.strong};
    content: '';
    pointer-events: none;
  }

  &::before {
    top: -${({ theme }) => theme.spacing.md};
    left: -${({ theme }) => theme.spacing.md};
    border-right: 0;
    border-bottom: 0;
    border-radius: ${({ theme }) => theme.radii.xl} 0 0;
  }

  &::after {
    right: -${({ theme }) => theme.spacing.md};
    bottom: -${({ theme }) => theme.spacing.md};
    border-top: 0;
    border-left: 0;
    border-radius: 0 0 ${({ theme }) => theme.radii.xl};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
    }
  }
`

const PortraitPicture = styled.picture`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: block;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};

  &::after {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(115deg, transparent 38%, ${({ theme }) => theme.colors.effects.moonlightSoft}, transparent 62%),
      linear-gradient(to top, ${({ theme }) => theme.colors.background.footer}, transparent 32%);
    background-size: 240% 100%, 100% 100%;
    background-position: 120% 0, 0 0;
    content: '';
    pointer-events: none;
    transition: background-position ${({ theme }) => theme.motion.duration.ritual}
      ${({ theme }) => theme.motion.easing.enter};
  }

  @media (hover: hover) and (pointer: fine) {
    ${PortraitFigure}:hover &::after {
      background-position: -20% 0, 0 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition-duration: ${({ theme }) => theme.motion.duration.reduced};
    }
  }
`

const PortraitSource = styled('source')``

const PortraitImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: center 28%;
  border-radius: ${({ theme }) => theme.radii.lg};
  filter: saturate(0.92) contrast(1.04);
  transition:
    transform ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) =>
      theme.motion.easing.enter},
    filter ${({ theme }) => theme.transitions.base};

  @media (hover: hover) and (pointer: fine) {
    ${PortraitFigure}:hover & {
      filter: saturate(1.06) contrast(1.08);
      transform: scale(1.025);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    ${PortraitFigure}:hover & {
      transform: none;
    }
  }
`

const PortraitCaption = styled(RitualLabel).attrs({
  as: 'figcaption',
})`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.sm};
  text-align: center;
`

const archiveDrift = keyframes`
  from { transform: translate3d(-1.5%, 0, 0); }
  to { transform: translate3d(1.5%, -1%, 0); }
`

const geometryTurn = keyframes`
  to { transform: rotate(360deg); }
`

const ArchiveConstellation = styled.svg`
  position: absolute;
  inset: 8% -5%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: 110%;
  height: 84%;
  color: ${({ theme }) => theme.colors.border.signal};
  opacity: 0.48;
  pointer-events: none;
  animation: ${archiveDrift} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ConstellationPath = styled.path`
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 2 10;
  stroke-width: 1;
`

const ConstellationNode = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.metal};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 5;
`

const PortraitGeometry = styled.svg`
  position: absolute;
  inset: -12%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: 124%;
  height: 124%;
  color: ${({ theme }) => theme.colors.border.violetStrong};
  opacity: 0.72;
  pointer-events: none;
  transform-origin: center;
  animation: ${geometryTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const GeometryOrbit = styled.circle`
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 3 9;
  stroke-width: 1;
`

const GeometryPolygon = styled.polygon`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.signal};
  stroke-width: 1;
`

const GeometryAxis = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.surfaceRaised};
  stroke-dasharray: 1 12;
  stroke-width: 1;
`

const GeometryStar = styled.path`
  fill: ${({ theme }) => theme.colors.accent.metal};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 2;
`
