import styled, { keyframes } from 'styled-components'
import {
  BodyCopy,
  Card,
  Container,
  DisplayHeading,
  Divider,
  OrbitalBackdrop,
  RitualLabel,
  Section,
} from '../../styles/primitives'

export function ApproachSection({ content: approach }) {

  return (
    <ApproachRoot id="approach" aria-labelledby="approach-heading">
      <ApproachContainer>
        <InstrumentStage $variant="quiet" $radius="xl" aria-hidden="true">
          <CelestialChart focusable="false" viewBox="0 0 500 500">
            <ChartOrbit cx="250" cy="250" r="220" />
            <ChartOrbit cx="250" cy="250" r="176" />
            <ChartOrbit cx="250" cy="250" r="132" />
            <ChartOrbit cx="250" cy="250" r="88" />
            <ChartPolygon points="250,24 446,363 54,363" />
            <ChartPolygon points="250,476 54,137 446,137" />
            <ChartAxis d="M22 250h456M250 22v456" />
            <ChartAxis d="m88 88 324 324M412 88 88 412" />
            <ChartNode cx="250" cy="30" r="5" />
            <ChartNode cx="470" cy="250" r="5" />
            <ChartNode cx="250" cy="470" r="5" />
            <ChartNode cx="30" cy="250" r="5" />
            <ChartNode cx="405" cy="95" r="4" />
            <ChartNode cx="405" cy="405" r="4" />
            <ChartNode cx="95" cy="405" r="4" />
            <ChartNode cx="95" cy="95" r="4" />
          </CelestialChart>
          <OuterOrbit />
          <MiddleOrbit />
          <InnerOrbit />
          <OrbitalNodes>
            <OrbitalNode />
            <OrbitalNode />
            <OrbitalNode />
            <OrbitalNode />
          </OrbitalNodes>
          <InstrumentCard $variant="pressed" $radius="md">
            <InstrumentHalo />
            <InstrumentGlyph>☾</InstrumentGlyph>
            <InstrumentName>The mirror</InstrumentName>
            <InstrumentNote>Listen · notice · choose</InstrumentNote>
          </InstrumentCard>
        </InstrumentStage>

        <ApproachNarrative>
          <RitualLabel $tone="metal">{approach.eyebrow}</RitualLabel>
          <ApproachHeading id="approach-heading">{approach.title}</ApproachHeading>
          <ApproachRule $tone="signal" />

          <ApproachCopy>
            {approach.paragraphs.map((paragraph) => (
              <ApproachParagraph key={paragraph}>{paragraph}</ApproachParagraph>
            ))}
          </ApproachCopy>

          <AgencyNote>{approach.agencyStatement}</AgencyNote>

          <PrincipleList aria-label="Practice principles">
            {approach.principles.map((principle) => (
              <Principle key={principle}>{principle}</Principle>
            ))}
          </PrincipleList>
        </ApproachNarrative>
      </ApproachContainer>
    </ApproachRoot>
  )
}

const ApproachRoot = styled(Section)`
  isolation: isolate;
  overflow: clip;
  padding-block: ${({ theme }) => theme.layout.sectionBlock};
  background:
    radial-gradient(
      circle at 22% 54%,
      ${({ theme }) => theme.colors.effects.violetGlowSoft},
      transparent 28%
    ),
    radial-gradient(
      circle at 80% 18%,
      ${({ theme }) => theme.colors.effects.acidGlowSoft},
      transparent 16%
    ),
    ${({ theme }) => theme.colors.gradients.atmosphereTexture};

  &::before {
    position: absolute;
    top: 50%;
    left: -10%;
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    width: 120%;
    height: ${({ theme }) => theme.borders.width.thin};
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.border.violetStrong},
      ${({ theme }) => theme.colors.border.signal},
      transparent
    );
    content: '';
    opacity: 0.5;
    pointer-events: none;
  }
`

const ApproachContainer = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing['4xl']};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    grid-template-columns: minmax(16rem, 0.82fr) minmax(0, 1.18fr);
    gap: ${({ theme }) => theme.spacing['5xl']};
  }
`

const InstrumentStage = styled(Card).attrs({
  as: 'div',
})`
  position: relative;
  display: grid;
  min-height: 27rem;
  place-items: center;
  isolation: isolate;
  overflow: hidden;
  border-color: ${({ theme }) => theme.colors.border.violetStrong};
  background:
    radial-gradient(
      circle at center,
      ${({ theme }) => theme.colors.effects.violetGlowSoft},
      transparent 38%
    ),
    ${({ theme }) => theme.colors.gradients.atmosphereTexture},
    ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow:
    ${({ theme }) => theme.shadows.surfacePressed},
    0 0 ${({ theme }) => theme.spacing['5xl']}
      ${({ theme }) => theme.colors.effects.violetGlowSoft};

  &::before,
  &::after {
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    content: '';
    pointer-events: none;
  }

  &::before {
    inset: ${({ theme }) => theme.spacing.lg};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surface};
    border-radius: ${({ theme }) => theme.radii.lg};
    background:
      linear-gradient(${({ theme }) => theme.colors.accent.metal}, ${({ theme }) =>
          theme.colors.accent.metal}) left top / ${({ theme }) => theme.spacing['5xl']}
        ${({ theme }) => theme.borders.width.thin} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.accent.metal}, ${({ theme }) =>
          theme.colors.accent.metal}) right bottom / ${({ theme }) => theme.spacing['5xl']}
        ${({ theme }) => theme.borders.width.thin} no-repeat;
  }

  &::after {
    inset: 0;
    background: repeating-conic-gradient(
      from 0deg,
      transparent 0deg 14deg,
      ${({ theme }) => theme.colors.effects.moonlightSoft} 14deg 14.25deg
    );
    opacity: 0.28;
    mask-image: radial-gradient(circle, transparent 0 54%, black 55% 63%, transparent 64%);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
    }
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-height: 22rem;
  }
`

const OuterOrbit = styled(OrbitalBackdrop)`
  inset: 9%;
  opacity: 0.66;
  border-style: dashed;
`

const MiddleOrbit = styled(OrbitalBackdrop).attrs({
  $tone: 'violetStrong',
  $shadow: 'insetViolet',
})`
  inset: 18%;
  opacity: 0.62;
`

const InnerOrbit = styled(OrbitalBackdrop).attrs({
  $tone: 'signal',
  $shadow: 'surfaceInset',
})`
  inset: 28%;
  opacity: 0.58;
  border-style: dashed;
`

const chartTurn = keyframes`
  to { transform: rotate(360deg); }
`

const chartCounterTurn = keyframes`
  to { transform: rotate(-360deg); }
`

const CelestialChart = styled.svg`
  position: absolute;
  inset: 4%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: 92%;
  height: 92%;
  color: ${({ theme }) => theme.colors.border.signal};
  opacity: 0.58;
  pointer-events: none;
  transform-origin: center;
  animation: ${chartTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (hover: hover) and (pointer: fine) {
    ${InstrumentStage}:hover & {
      animation-direction: reverse;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ChartOrbit = styled.circle`
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 2 9;
  stroke-width: 1;
`

const ChartPolygon = styled.polygon`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.violetStrong};
  stroke-width: 1;
`

const ChartAxis = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.surfaceRaised};
  stroke-dasharray: 1 11;
  stroke-width: 1;
`

const ChartNode = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.metal};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 6;
`

const OrbitalNodes = styled.div`
  position: absolute;
  inset: 15%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  border-radius: ${({ theme }) => theme.radii.orbital};
  pointer-events: none;
  animation: ${chartCounterTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const OrbitalNode = styled.span`
  position: absolute;
  width: ${({ theme }) => theme.spacing.md};
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.signal};
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: 0 0 ${({ theme }) => theme.spacing.xl}
    ${({ theme }) => theme.colors.effects.starlight};

  &:nth-child(1) {
    top: 0;
    left: 50%;
  }

  &:nth-child(2) {
    top: 50%;
    right: 0;
  }

  &:nth-child(3) {
    bottom: 0;
    left: 50%;
  }

  &:nth-child(4) {
    top: 50%;
    left: 0;
  }
`

const InstrumentCard = styled(Card).attrs({
  as: 'div',
})`
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  align-content: center;
  justify-items: center;
  width: min(12rem, 58%);
  aspect-ratio: 2 / 3;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  border-color: ${({ theme }) => theme.colors.border.strong};
  background:
    linear-gradient(
      160deg,
      ${({ theme }) => theme.colors.background.surfaceRaised},
      ${({ theme }) => theme.colors.background.surfacePressed}
    ),
    ${({ theme }) => theme.colors.gradients.atmosphereTexture};
  box-shadow:
    ${({ theme }) => theme.shadows.surfacePressed},
    0 0 ${({ theme }) => theme.spacing['5xl']}
      ${({ theme }) => theme.colors.effects.violetGlow};
  transition:
    transform ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) =>
      theme.motion.easing.enter},
    box-shadow ${({ theme }) => theme.transitions.base};

  &::before,
  &::after {
    position: absolute;
    width: 34%;
    aspect-ratio: 1;
    border-color: ${({ theme }) => theme.colors.accent.metal};
    border-style: ${({ theme }) => theme.borders.style};
    content: '';
    pointer-events: none;
  }

  &::before {
    top: ${({ theme }) => theme.spacing.sm};
    left: ${({ theme }) => theme.spacing.sm};
    border-width: ${({ theme }) => theme.borders.width.thin} 0 0
      ${({ theme }) => theme.borders.width.thin};
  }

  &::after {
    right: ${({ theme }) => theme.spacing.sm};
    bottom: ${({ theme }) => theme.spacing.sm};
    border-width: 0 ${({ theme }) => theme.borders.width.thin}
      ${({ theme }) => theme.borders.width.thin} 0;
  }

  @media (hover: hover) and (pointer: fine) {
    ${InstrumentStage}:hover & {
      box-shadow:
        ${({ theme }) => theme.shadows.surfaceRaised},
        0 0 ${({ theme }) => theme.spacing['5xl']}
          ${({ theme }) => theme.colors.effects.acidGlow};
      transform: perspective(50rem) translateY(${({ theme }) => theme.layout.hoverLift})
        rotateX(2deg) rotateY(-2deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    ${InstrumentStage}:hover & {
      transform: none;
    }
  }
`

const InstrumentHalo = styled.span`
  position: absolute;
  top: 16%;
  left: 50%;
  width: 54%;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.signal};
  border-radius: ${({ theme }) => theme.radii.orbital};
  box-shadow:
    0 0 ${({ theme }) => theme.spacing['4xl']}
      ${({ theme }) => theme.colors.effects.starlightSoft},
    inset 0 0 ${({ theme }) => theme.spacing['2xl']}
      ${({ theme }) => theme.colors.effects.violetGlowSoft};
  transform: translateX(-50%);
`

const InstrumentGlyph = styled.span`
  position: relative;
  color: ${({ theme }) => theme.colors.accent.metal};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.section};
  text-shadow:
    0 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.colors.effects.starlight},
    0 0 ${({ theme }) => theme.spacing['5xl']}
      ${({ theme }) => theme.colors.effects.violetGlow};
`

const InstrumentName = styled.span`
  position: relative;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.editorial};
  text-transform: uppercase;
`

const InstrumentNote = styled.span`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent.signal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.body};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
  text-transform: uppercase;
`

const ApproachNarrative = styled.div`
  order: -1;
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.proseWidth};
  padding: clamp(${({ theme }) => theme.spacing['2xl']}, 4vw, ${({ theme }) =>
      theme.spacing['4xl']});
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(
      130deg,
      ${({ theme }) => theme.colors.background.glassViolet},
      ${({ theme }) => theme.colors.background.glassInk}
    ),
    ${({ theme }) => theme.colors.gradients.atmosphereTexture};
  box-shadow: ${({ theme }) => theme.shadows.surfaceRaised};

  &::before {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.md};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surface};
    border-radius: ${({ theme }) => theme.radii.lg};
    content: '';
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    order: 0;
  }
`

const ApproachHeading = styled(DisplayHeading).attrs({
  as: 'h2',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})`
  position: relative;
  text-wrap: balance;
  text-shadow: 0 0 ${({ theme }) => theme.spacing['5xl']}
    ${({ theme }) => theme.colors.effects.violetGlow};
`

const ApproachRule = styled(Divider)`
  max-width: ${({ theme }) => theme.spacing['5xl']};
`

const ApproachCopy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ApproachParagraph = styled(BodyCopy)``

const AgencyNote = styled(BodyCopy).attrs({
  $tone: 'bodyStrong',
})`
  position: relative;
  padding: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.xl};
  border-left: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.accent.acid};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.effects.acidGlowSoft},
    transparent 72%
  );

  &::after {
    position: absolute;
    top: 50%;
    left: -${({ theme }) => theme.spacing.sm};
    width: ${({ theme }) => theme.spacing.md};
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: ${({ theme }) => theme.colors.accent.acid};
    box-shadow: ${({ theme }) => theme.shadows.acidHover};
    content: '';
    transform: translateY(-50%);
  }
`

const PrincipleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
`

const Principle = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding-inline: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.signal};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.signal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: ${({ theme }) => theme.shadows.surfaceInset};
  transition:
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &::before {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.accent.metal};
    content: '✦';
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
      color: ${({ theme }) => theme.colors.text.bodyStrong};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &:hover {
      transform: none;
    }
  }
`
