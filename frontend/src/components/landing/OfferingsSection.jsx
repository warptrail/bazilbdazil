import { useCallback, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  BodyCopy,
  Card,
  Container,
  DisplayHeading,
  Divider,
  NavLink,
  RitualLabel,
  Section,
} from '../../styles/primitives'

const GOLDEN_ANGLE = 137.508
const TAU = Math.PI * 2

const plasmaPaths = Array.from({ length: 7 }, (_, pathIndex) => {
  const points = Array.from({ length: 35 }, (_, pointIndex) => {
    const x = pointIndex * 40 - 80
    const y =
      380 +
      Math.sin(pointIndex * 0.48 + pathIndex * 0.82) * (30 + pathIndex * 9) +
      Math.sin(pointIndex * 0.19 - pathIndex * 0.66) * 24
    return `${pointIndex === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  })
  return points.join(' ')
})

const phyllotaxisNodes = Array.from({ length: 28 }, (_, index) => {
  const radius = 8.5 * Math.sqrt(index)
  const angle = (index * GOLDEN_ANGLE * Math.PI) / 180
  return {
    x: 300 + Math.cos(angle) * radius,
    y: 220 + Math.sin(angle) * radius,
    radius: index % 5 === 0 ? 3.2 : 1.7,
  }
})

const oracleRays = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * TAU
  return {
    x1: 300 + Math.cos(angle) * 86,
    y1: 220 + Math.sin(angle) * 86,
    x2: 300 + Math.cos(angle) * 142,
    y2: 220 + Math.sin(angle) * 142,
  }
})

export function OfferingsSection({ content: offerings }) {
  const [oracleMotion, setOracleMotion] = useState({ x: 0, y: 0, active: false })

  const moveOracle = useCallback((event) => {
    if (
      event.pointerType === 'touch' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    setOracleMotion({ x, y, active: true })
  }, [])

  const settleOracle = useCallback(() => {
    setOracleMotion({ x: 0, y: 0, active: false })
  }, [])

  return (
    <OfferingsRoot id="offerings" aria-labelledby="offerings-heading">
      <PlasmaField aria-hidden="true" focusable="false" viewBox="0 0 1200 760">
        {plasmaPaths.map((path, index) => (
          <PlasmaWave key={path} d={path} $index={index} />
        ))}
        <PlasmaCard x="414" y="158" width="372" height="444" rx="24" />
        <PlasmaCard x="454" y="198" width="292" height="364" rx="18" $inner />
        <PlasmaArc d="M222 590 Q600 98 978 590" />
        <PlasmaArc d="M166 512 Q600 742 1034 512" $reverse />
      </PlasmaField>

      <OfferingsContainer>
        <IntroChamber>
          <SectionIntro>
            <IntroStar aria-hidden="true">✦</IntroStar>
            <RitualLabel $tone="signal">{offerings.eyebrow}</RitualLabel>
            <SectionHeading id="offerings-heading">{offerings.title}</SectionHeading>
            <SectionDescription>{offerings.intro}</SectionDescription>
            <IntroEquation aria-hidden="true">φ · 137.5° · 78 paths</IntroEquation>
          </SectionIntro>

          <OracleStage
            aria-hidden="true"
            onPointerMove={moveOracle}
            onPointerLeave={settleOracle}
            $active={oracleMotion.active}
          >
            <OracleLegend>Move through the arcana</OracleLegend>
            <OracleCoordinate $edge="north">XXI</OracleCoordinate>
            <OracleCoordinate $edge="east">☉</OracleCoordinate>
            <OracleCoordinate $edge="south">I</OracleCoordinate>
            <OracleCoordinate $edge="west">☽</OracleCoordinate>
            <OracleSvg viewBox="0 0 600 440" focusable="false">
              <OracleRotor $x={oracleMotion.x} $y={oracleMotion.y}>
                <OracleOrbit cx="300" cy="220" rx="188" ry="112" />
                <OracleOrbit cx="300" cy="220" rx="128" ry="188" $signal />
                <OracleOrbit cx="300" cy="220" rx="94" ry="94" $dashed />
                {oracleRays.map((ray) => (
                  <OracleRay
                    key={`${ray.x1}-${ray.y1}`}
                    x1={ray.x1}
                    y1={ray.y1}
                    x2={ray.x2}
                    y2={ray.y2}
                  />
                ))}
                <OracleCard x="224" y="78" width="152" height="284" rx="10" />
                <OracleCard x="237" y="91" width="126" height="258" rx="7" $inner />
                <OracleTriangle points="300,122 354,302 246,302" />
                <OracleTriangle points="300,318 246,138 354,138" $reverse />
              </OracleRotor>
              <OracleCounterRotor $x={oracleMotion.x} $y={oracleMotion.y}>
                <OracleEye d="M238 220 Q300 158 362 220 Q300 282 238 220Z" />
                <OracleIris cx="300" cy="220" r="27" />
                <OraclePupil cx="300" cy="220" r="9" />
                {phyllotaxisNodes.map((node) => (
                  <OracleNode
                    key={`${node.x}-${node.y}`}
                    cx={node.x}
                    cy={node.y}
                    r={node.radius}
                  />
                ))}
              </OracleCounterRotor>
            </OracleSvg>
            <OraclePrompt>Tarot is pattern made visible</OraclePrompt>
          </OracleStage>
        </IntroChamber>

        <OfferingsGrid $emphasis={offerings.emphasis}>
          {offerings.items.map((offering, itemIndex) => (
            <OfferingCard
              key={offering.id}
              $variant="raised"
              $radius="xl"
              $direction={itemIndex % 2 === 0 ? 'forward' : 'reverse'}
              $presentation={offering.presentation}
            >
              <CardPlasma aria-hidden="true" focusable="false" viewBox="0 0 720 520">
                <CardWave d="M-40 310 C110 170 220 438 370 276 S630 116 770 264" />
                <CardWave d="M-30 362 C126 222 238 486 386 330 S622 182 760 310" $reverse />
                <CardFrame x="448" y="54" width="182" height="318" rx="12" />
                <CardFrame x="468" y="74" width="142" height="278" rx="8" $inner />
                <CardEye d="M486 212 Q539 158 592 212 Q539 266 486 212Z" />
                <CardCore cx="539" cy="212" r="13" />
              </CardPlasma>

              <OfferingContent>
                <OfferingMeta>
                  <OfferingIndex>{offering.index}</OfferingIndex>
                  <OfferingLabel $tone="metal">{offering.label}</OfferingLabel>
                </OfferingMeta>
                <OfferingTitle $presentation={offering.presentation}>
                  {offering.title}
                </OfferingTitle>
                <OfferingRule $tone="signal" />
                <OfferingStatement $presentation={offering.presentation}>
                  {offering.statement}
                </OfferingStatement>
                <OfferingBody $presentation={offering.presentation}>
                  {offering.paragraphs.map((paragraph) => (
                    <OfferingParagraph key={paragraph}>{paragraph}</OfferingParagraph>
                  ))}
                </OfferingBody>
              </OfferingContent>

              {offering.pathways?.length ? (
                <ReadingPathways aria-label={offering.pathwayLabel}>
                  <PathwaysHeader>
                    <PathwaysLabel>{offering.pathwayLabel}</PathwaysLabel>
                    <PathwaysFormula aria-hidden="true">I → II → III</PathwaysFormula>
                  </PathwaysHeader>
                  <PathwayGrid>
                    {offering.pathways.map((pathway, pathwayIndex) => (
                      <ReadingPathway key={pathway.title} $index={pathwayIndex}>
                        <PathwayHalo aria-hidden="true">
                          <PathwayOrbit />
                          <PathwayGlyph>{pathway.glyph}</PathwayGlyph>
                        </PathwayHalo>
                        <PathwayCopy>
                          <PathwayTitle>{pathway.title}</PathwayTitle>
                          <PathwayDescription>{pathway.description}</PathwayDescription>
                        </PathwayCopy>
                      </ReadingPathway>
                    ))}
                  </PathwayGrid>
                </ReadingPathways>
              ) : (
                <SatelliteDeck aria-hidden="true">
                  <SatelliteCard $depth="back">XVI</SatelliteCard>
                  <SatelliteCard $depth="middle">0</SatelliteCard>
                  <SatelliteCard $depth="front">☿</SatelliteCard>
                </SatelliteDeck>
              )}
            </OfferingCard>
          ))}
        </OfferingsGrid>

        <BookingPath href={offerings.bookingLink.href}>
          <BookingConstellation aria-hidden="true">
            <BookingOrbit />
            <BookingCore>✦</BookingCore>
          </BookingConstellation>
          <BookingCopy>
            <BookingOverline>Continue the spread</BookingOverline>
            <BookingLabel>{offerings.bookingLink.label}</BookingLabel>
          </BookingCopy>
          <BookingArrow aria-hidden="true">↘</BookingArrow>
        </BookingPath>
      </OfferingsContainer>
    </OfferingsRoot>
  )
}

const plasmaDrift = keyframes`
  to { stroke-dashoffset: -180; transform: translateX(3%); }
`

const plasmaBreathe = keyframes`
  0%, 100% { opacity: 0.12; transform: scaleY(0.82); }
  50% { opacity: 0.48; transform: scaleY(1.16); }
`

const orbitTurn = keyframes`
  to { transform: rotate(360deg); }
`

const reverseTurn = keyframes`
  to { transform: rotate(-360deg); }
`

const nodeBreath = keyframes`
  0%, 100% { opacity: 0.42; transform: scale(0.72); }
  50% { opacity: 1; transform: scale(1.32); }
`

const deckFloat = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(var(--card-turn)); }
  50% { transform: translate3d(0, -0.45rem, 0) rotate(var(--card-turn)); }
`

const OfferingsRoot = styled(Section)`
  isolation: isolate;
  overflow: clip;
  padding-block: ${({ theme }) => theme.layout.sectionBlock};
  border-block: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  background:
    ${({ theme }) => theme.colors.gradients.starfield},
    radial-gradient(ellipse at 26% 28%, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent 38%),
    radial-gradient(ellipse at 82% 48%, ${({ theme }) => theme.colors.effects.acidGlowSoft}, transparent 28%),
    ${({ theme }) => theme.colors.background.surfacePressed};

  &::before,
  &::after {
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    width: clamp(10rem, 20vw, 18rem);
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.violet};
    border-radius: ${({ theme }) => theme.radii.orbital};
    box-shadow: ${({ theme }) => theme.shadows.insetViolet};
    content: '';
    pointer-events: none;
  }

  &::before { top: -7rem; left: -6rem; }
  &::after { right: -8rem; bottom: 8%; }
`

const PlasmaField = styled.svg`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`

const PlasmaWave = styled.path`
  fill: none;
  stroke: ${({ theme, $index }) =>
    $index % 3 === 0
      ? theme.colors.border.strong
      : $index % 2 === 0
        ? theme.colors.border.signal
        : theme.colors.border.violetStrong};
  stroke-width: ${({ $index }) => 0.7 + $index * 0.18};
  stroke-dasharray: ${({ $index }) => `${12 + $index * 3} ${18 + $index * 5}`};
  opacity: ${({ $index }) => 0.08 + $index * 0.035};
  transform-box: fill-box;
  transform-origin: center;
  filter: drop-shadow(0 0 0.5rem ${({ theme }) => theme.colors.effects.violetGlow});
  animation:
    ${plasmaDrift} ${({ theme }) => theme.motion.duration.planetary} linear infinite,
    ${plasmaBreathe} ${({ theme }) => theme.motion.duration.ambient} ease-in-out infinite;
  animation-delay: ${({ $index }) => `${$index * -1.6}s`};

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const PlasmaCard = styled.rect`
  fill: none;
  stroke: ${({ theme, $inner }) =>
    $inner ? theme.colors.border.surfaceRaised : theme.colors.border.violet};
  stroke-width: 1;
  stroke-dasharray: ${({ $inner }) => ($inner ? '2 12' : '1 20')};
  opacity: ${({ $inner }) => ($inner ? 0.2 : 0.13)};
`

const PlasmaArc = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.filigree};
  stroke-width: 1;
  stroke-dasharray: 2 18;
  opacity: 0.24;
  animation: ${({ $reverse }) => ($reverse ? reverseTurn : orbitTurn)}
    ${({ theme }) => theme.motion.duration.celestialLong} linear infinite;
  transform-box: fill-box;
  transform-origin: center;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const OfferingsContainer = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: clamp(${({ theme }) => theme.spacing['4xl']}, 7vw, 6rem);
`

const IntroChamber = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['4xl']};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 0.82fr) minmax(22rem, 1.18fr);
  }
`

const SectionIntro = styled.div`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.proseWidth};
  padding-left: ${({ theme }) => theme.spacing['2xl']};

  &::before {
    position: absolute;
    inset-block: 0;
    left: 0;
    width: ${({ theme }) => theme.borders.width.thin};
    background: linear-gradient(to bottom, ${({ theme }) => theme.colors.accent.metal}, ${({ theme }) => theme.colors.accent.signal}, transparent);
    content: '';
  }
`

const IntroStar = styled.span`
  position: absolute;
  top: -${({ theme }) => theme.spacing.md};
  left: -${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent.metal};
  text-shadow: 0 0 ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.colors.effects.starlight};
`

const SectionHeading = styled(DisplayHeading).attrs({
  as: 'h2',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})`
  text-wrap: balance;
  text-shadow: 0 0 ${({ theme }) => theme.spacing['5xl']} ${({ theme }) => theme.colors.effects.violetGlow};
`

const SectionDescription = styled(BodyCopy).attrs({ $tone: 'bodySoft' })``

const IntroEquation = styled.span`
  color: ${({ theme }) => theme.colors.accent.metalDim};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
  text-transform: uppercase;
`

const OracleStage = styled.div`
  position: relative;
  min-height: clamp(20rem, 42vw, 30rem);
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surfaceRaised};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background:
    radial-gradient(circle at 50% 50%, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent 28%),
    ${({ theme }) => theme.colors.gradients.cosmicLens},
    ${({ theme }) => theme.colors.background.surfaceGlass};
  box-shadow: ${({ theme, $active }) =>
    $active ? theme.shadows.spectral : theme.shadows.glass};
  cursor: crosshair;
  transition: box-shadow ${({ theme }) => theme.transitions.ritual};

  &::before,
  &::after {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.md};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.etched};
    border-radius: ${({ theme }) => theme.radii.lg};
    content: '';
    pointer-events: none;
  }

  &::after {
    inset: 50% auto auto 50%;
    width: 72%;
    height: ${({ theme }) => theme.borders.width.thin};
    border: 0;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.border.filigreeBright}, transparent);
    transform: translate(-50%, -50%);
  }
`

const OracleSvg = styled.svg`
  position: absolute;
  inset: 6% 4%;
  width: 92%;
  height: 88%;
  overflow: visible;
`

const OracleRotor = styled.g`
  transform-box: fill-box;
  transform-origin: center;
  transform: ${({ $x, $y }) =>
    `translate(${$x * 10}px, ${$y * 8}px) rotate(${$x * 7}deg) skewX(${$y * 2}deg)`};
  transition: transform ${({ theme }) => theme.transitions.ritual};
`

const OracleCounterRotor = styled.g`
  transform-box: fill-box;
  transform-origin: center;
  transform: ${({ $x, $y }) =>
    `translate(${$x * -8}px, ${$y * -6}px) rotate(${$y * -9}deg) scale(${1 + Math.abs($x) * 0.025})`};
  transition: transform ${({ theme }) => theme.transitions.ritual};
`

const OracleOrbit = styled.ellipse`
  fill: none;
  stroke: ${({ theme, $signal }) =>
    $signal ? theme.colors.border.signal : theme.colors.border.violetStrong};
  stroke-width: 1;
  stroke-dasharray: ${({ $dashed }) => ($dashed ? '2 12' : '1 8')};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${({ $signal }) => ($signal ? reverseTurn : orbitTurn)}
    ${({ theme }) => theme.motion.duration.orbit} linear infinite;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const OracleRay = styled.line`
  stroke: ${({ theme }) => theme.colors.border.surfaceRaised};
  stroke-width: 1;
`

const OracleCard = styled.rect`
  fill: ${({ theme, $inner }) =>
    $inner ? theme.colors.background.glassInk : theme.colors.background.glassViolet};
  stroke: ${({ theme, $inner }) =>
    $inner ? theme.colors.border.etched : theme.colors.border.filigree};
  stroke-width: 1;
  filter: drop-shadow(0 0 1rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
`

const OracleTriangle = styled.polygon`
  fill: none;
  stroke: ${({ theme, $reverse }) =>
    $reverse ? theme.colors.border.signal : theme.colors.border.violetStrong};
  stroke-width: 1;
  stroke-dasharray: 3 9;
`

const OracleEye = styled.path`
  fill: ${({ theme }) => theme.colors.background.surfacePressed};
  stroke: ${({ theme }) => theme.colors.accent.metalBright};
  stroke-width: 1.5;
  filter: drop-shadow(0 0 0.8rem ${({ theme }) => theme.colors.effects.goldGlow});
`

const OracleIris = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.signal};
  stroke: ${({ theme }) => theme.colors.accent.acidSoft};
  stroke-width: 2;
  filter: drop-shadow(0 0 0.65rem ${({ theme }) => theme.colors.effects.cyanGlow});
`

const OraclePupil = styled.circle`
  fill: ${({ theme }) => theme.colors.background.canvas};
  stroke: ${({ theme }) => theme.colors.accent.metalPale};
  stroke-width: 1;
`

const OracleNode = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.acid};
  transform-box: fill-box;
  transform-origin: center;
  animation: ${nodeBreath} ${({ theme }) => theme.motion.duration.twinkle} ease-in-out infinite;

  &:nth-of-type(3n) { fill: ${({ theme }) => theme.colors.accent.metalBright}; }
  &:nth-of-type(4n) { fill: ${({ theme }) => theme.colors.accent.signal}; }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const OracleLegend = styled(RitualLabel)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.content};
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  transform: translateX(-50%);
  white-space: nowrap;
`

const OraclePrompt = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  bottom: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.content};
  color: ${({ theme }) => theme.colors.text.bodySoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-style: italic;
`

const OracleCoordinate = styled.span`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.content};
  color: ${({ theme }) => theme.colors.accent.metal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  ${({ $edge, theme }) => {
    if ($edge === 'north') return css`top: ${theme.spacing.lg}; right: ${theme.spacing.lg};`
    if ($edge === 'east') return css`top: 50%; right: ${theme.spacing.lg};`
    if ($edge === 'south') return css`bottom: ${theme.spacing.lg}; left: ${theme.spacing.lg};`
    return css`top: 50%; left: ${theme.spacing.lg};`
  }}
`

const OfferingsGrid = styled.div`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    grid-template-columns: ${({ $emphasis }) => {
      if ($emphasis === 'tarot') return 'minmax(0, 1.48fr) minmax(18rem, 0.52fr)'
      if ($emphasis === 'performance') return 'minmax(18rem, 0.58fr) minmax(0, 1.42fr)'
      return 'repeat(2, minmax(0, 1fr))'
    }};
    align-items: stretch;
  }
`

const OfferingCard = styled(Card)`
  isolation: isolate;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing['2xl']};
  min-height: 100%;
  padding: clamp(${({ theme }) => theme.spacing['2xl']}, 4vw, 3.5rem);
  overflow: hidden;
  border-color: ${({ theme }) => theme.colors.border.violetStrong};
  background: ${({ theme }) => theme.colors.gradients.glassPanel};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  transform-style: preserve-3d;
  transition:
    transform ${({ theme }) => theme.transitions.ritual},
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.ritual};

  ${({ $presentation, theme }) =>
    $presentation === 'aside' &&
    css`
      gap: ${theme.spacing.lg};
      padding: ${theme.spacing['2xl']};
      border-color: ${theme.colors.border.etched};
      background: ${theme.colors.gradients.etchedPanel};
    `}

  &::before {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.md};
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surface};
    border-radius: ${({ theme }) => theme.radii.lg};
    background:
      linear-gradient(${({ theme }) => theme.colors.accent.metal}, ${({ theme }) => theme.colors.accent.metal}) left top / ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.borders.width.thin} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.accent.metal}, ${({ theme }) => theme.colors.accent.metal}) left top / ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.spacing['4xl']} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.accent.signal}, ${({ theme }) => theme.colors.accent.signal}) right bottom / ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.borders.width.thin} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.accent.signal}, ${({ theme }) => theme.colors.accent.signal}) right bottom / ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.spacing['4xl']} no-repeat;
    content: '';
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
      box-shadow: ${({ theme }) => theme.shadows.spectral};
      transform: perspective(60rem) translateY(${({ theme }) => theme.layout.hoverLift}) rotateY(${({ $direction }) => ($direction === 'forward' ? '-0.75deg' : '0.75deg')});
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};
    &:hover { transform: none; }
  }
`

const CardPlasma = styled.svg`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: 100%;
  height: 100%;
  opacity: 0.56;
  pointer-events: none;
`

const CardWave = styled.path`
  fill: none;
  stroke: ${({ theme, $reverse }) =>
    $reverse ? theme.colors.border.signal : theme.colors.border.violetStrong};
  stroke-width: 1.2;
  stroke-dasharray: 5 15;
  filter: drop-shadow(0 0 0.6rem ${({ theme }) => theme.colors.effects.violetGlow});
  animation: ${plasmaDrift} ${({ theme }) => theme.motion.duration.orbit} linear infinite ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const CardFrame = styled.rect`
  fill: ${({ theme }) => theme.colors.background.glassViolet};
  stroke: ${({ theme, $inner }) =>
    $inner ? theme.colors.border.etched : theme.colors.border.violetStrong};
  stroke-width: 1;
  stroke-dasharray: ${({ $inner }) => ($inner ? '2 10' : 'none')};
`

const CardEye = styled.path`
  fill: ${({ theme }) => theme.colors.background.surfacePressed};
  stroke: ${({ theme }) => theme.colors.border.filigreeBright};
  stroke-width: 1;
`

const CardCore = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.acid};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 7;
  transform-box: fill-box;
  transform-origin: center;
  animation: ${nodeBreath} ${({ theme }) => theme.motion.duration.twinkle} ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const OfferingContent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 36rem;
`

const OfferingMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`

const OfferingIndex = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
`

const OfferingLabel = styled(RitualLabel)``

const OfferingTitle = styled(DisplayHeading).attrs({
  as: 'h3',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})`
  max-width: 15ch;
  font-size: ${({ $presentation, theme }) =>
    $presentation === 'aside' ? theme.typography.fontSize.lg : theme.typography.fontSize.section};
  text-wrap: balance;
  text-shadow: 0 0 ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.colors.effects.violetGlowSoft};
`

const OfferingRule = styled(Divider)`
  max-width: ${({ theme }) => theme.spacing['5xl']};
`

const OfferingStatement = styled.p`
  max-width: 30ch;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.bodyStrong};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ $presentation, theme }) =>
    $presentation === 'aside' ? theme.typography.fontSize.body : theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
`

const OfferingBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  ${({ $presentation }) => $presentation === 'aside' && css`max-width: 34ch;`}
`

const OfferingParagraph = styled(BodyCopy).attrs({ $tone: 'bodyMuted' })``

const ReadingPathways = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
`

const PathwaysHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
`

const PathwaysLabel = styled(RitualLabel).attrs({ as: 'p', $tone: 'metal' })`
  margin: 0;
`

const PathwaysFormula = styled.span`
  color: ${({ theme }) => theme.colors.accent.signal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`

const PathwayGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: 0;
  padding: 0;
  list-style: none;
`

const ReadingPathway = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: start;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  background: ${({ theme }) => theme.colors.background.glassInk};
  transition:
    transform ${({ theme }) => theme.transitions.ritual},
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.ritual};

  &::after {
    position: absolute;
    right: -20%;
    bottom: -55%;
    width: 70%;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.orbital};
    background: radial-gradient(circle, ${({ theme }) => theme.colors.effects.acidGlowSoft}, transparent 66%);
    content: '';
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.ritual};
  }

  @media (hover: hover) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
      box-shadow: ${({ theme }) => theme.shadows.metalHover};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});
    }

    &:hover::after { opacity: 1; }
  }
`

const PathwayHalo = styled.span`
  position: relative;
  display: grid;
  width: 2.75rem;
  aspect-ratio: 1;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
`

const PathwayOrbit = styled.span`
  position: absolute;
  inset: 0;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.signal};
  border-radius: ${({ theme }) => theme.radii.orbital};
  border-top-color: ${({ theme }) => theme.colors.accent.metalBright};
  animation: ${orbitTurn} ${({ theme }) => theme.motion.duration.ambient} linear infinite;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const PathwayGlyph = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

const PathwayCopy = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

const PathwayTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.bodyStrong};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`

const PathwayDescription = styled(BodyCopy).attrs({ as: 'p', $tone: 'bodyMuted' })`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const SatelliteDeck = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  min-height: 13rem;
  margin-top: auto;
  perspective: 30rem;
`

const SatelliteCard = styled.span`
  --card-turn: ${({ $depth }) =>
    $depth === 'back' ? '-12deg' : $depth === 'middle' ? '8deg' : '-1deg'};
  position: absolute;
  top: ${({ $depth }) => ($depth === 'front' ? '8%' : $depth === 'middle' ? '15%' : '22%')};
  left: ${({ $depth }) => ($depth === 'front' ? '36%' : $depth === 'middle' ? '25%' : '14%')};
  display: grid;
  width: 7.4rem;
  aspect-ratio: 0.62;
  place-items: center;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $depth }) =>
      $depth === 'front' ? theme.colors.border.strong : theme.colors.border.violetStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.accent.metalBright};
  background: ${({ theme }) => theme.colors.gradients.cosmicLens};
  box-shadow: ${({ theme }) => theme.shadows.celestial};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  transform: rotate(var(--card-turn));
  animation: ${deckFloat} ${({ theme }) => theme.motion.duration.ambient} ease-in-out infinite;
  animation-delay: ${({ $depth }) => ($depth === 'front' ? '-4s' : $depth === 'middle' ? '-9s' : '-13s')};

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const BookingPath = styled(NavLink)`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-self: stretch;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  min-height: 5.5rem;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.strong};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.effects.acidGlowSoft}, ${({ theme }) => theme.colors.background.glassViolet}, ${({ theme }) => theme.colors.effects.violetGlowSoft});
  box-shadow: ${({ theme }) => theme.shadows.celestial};
  transition:
    transform ${({ theme }) => theme.transitions.ritual},
    box-shadow ${({ theme }) => theme.transitions.ritual};

  &::after {
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.gradients.buttonGlint};
    content: '';
    opacity: 0;
    transform: translateX(-100%);
    transition:
      opacity ${({ theme }) => theme.transitions.base},
      transform ${({ theme }) => theme.transitions.ritual};
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.spectral};
      transform: translateY(${({ theme }) => theme.layout.hoverLift});
    }

    &:hover::after { opacity: 1; transform: translateX(100%); }
  }
`

const BookingConstellation = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  width: 3.25rem;
  aspect-ratio: 1;
  place-items: center;
`

const BookingOrbit = styled.span`
  position: absolute;
  inset: 0;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.orbital};
  border-right-color: ${({ theme }) => theme.colors.accent.acid};
  animation: ${orbitTurn} ${({ theme }) => theme.motion.duration.ambient} linear infinite;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const BookingCore = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  text-shadow: 0 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.colors.effects.acidGlow};
`

const BookingCopy = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

const BookingOverline = styled.span`
  color: ${({ theme }) => theme.colors.accent.metal};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
  text-transform: uppercase;
`

const BookingLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

const BookingArrow = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  color: ${({ theme }) => theme.colors.accent.signal};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.section};
  transition: transform ${({ theme }) => theme.transitions.ritual};

  ${BookingPath}:hover & { transform: translate(${({ theme }) => theme.spacing.sm}, ${({ theme }) => theme.spacing.sm}); }
`
