import styled, { keyframes } from 'styled-components'
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

export function OfferingsSection({ content: offerings }) {

  return (
    <OfferingsRoot id="offerings" aria-labelledby="offerings-heading">
      <OfferingsCosmos aria-hidden="true" focusable="false" viewBox="0 0 1200 760">
        <CosmosOrbit cx="600" cy="380" r="314" />
        <CosmosOrbit cx="600" cy="380" r="236" />
        <CosmosOrbit cx="600" cy="380" r="158" />
        <CosmosDiamond points="600,32 1122,380 600,728 78,380" />
        <CosmosAxis d="M48 380h1104M600 18v724" />
        <CosmosAxis d="m164 108 872 544M1036 108 164 652" />
        <CosmosNode cx="600" cy="66" r="6" />
        <CosmosNode cx="914" cy="380" r="5" />
        <CosmosNode cx="600" cy="694" r="6" />
        <CosmosNode cx="286" cy="380" r="5" />
      </OfferingsCosmos>
      <OfferingsContainer>
        <SectionIntro>
          <IntroStar aria-hidden="true">✦</IntroStar>
          <RitualLabel $tone="signal">{offerings.eyebrow}</RitualLabel>
          <SectionHeading id="offerings-heading">{offerings.title}</SectionHeading>
          <SectionDescription>{offerings.intro}</SectionDescription>
        </SectionIntro>

        <OfferingsGrid>
          {offerings.items.map((offering, itemIndex) => (
            <OfferingCard
              key={offering.id}
              $variant="raised"
              $radius="xl"
              $direction={itemIndex % 2 === 0 ? 'forward' : 'reverse'}
            >
              <OfferingSigil
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 160 160"
                $direction={itemIndex % 2 === 0 ? 'forward' : 'reverse'}
              >
                <SigilOrbit cx="80" cy="80" r="66" />
                <SigilOrbit cx="80" cy="80" r="48" />
                <SigilOrbit cx="80" cy="80" r="28" />
                <SigilPolygon points="80,10 141,115 19,115" />
                <SigilPolygon points="80,150 19,45 141,45" />
                <SigilAxis d="M8 80h144M80 8v144" />
                <SigilCore cx="80" cy="80" r="7" />
              </OfferingSigil>
              <OfferingMeta>
                <OfferingIndex>{offering.index}</OfferingIndex>
                <OfferingLabel $tone="metal">{offering.label}</OfferingLabel>
              </OfferingMeta>
              <OfferingTitle>{offering.title}</OfferingTitle>
              <OfferingRule $tone="signal" />
              <OfferingStatement>{offering.statement}</OfferingStatement>
              <OfferingBody>
                {offering.paragraphs.map((paragraph) => (
                  <OfferingParagraph key={paragraph}>{paragraph}</OfferingParagraph>
                ))}
              </OfferingBody>
            </OfferingCard>
          ))}
        </OfferingsGrid>

        <BookingPath href={offerings.bookingLink.href}>
          {offerings.bookingLink.label}
          <BookingGlyph aria-hidden="true">✦</BookingGlyph>
        </BookingPath>
      </OfferingsContainer>
    </OfferingsRoot>
  )
}

const OfferingsRoot = styled(Section)`
  isolation: isolate;
  overflow: clip;
  padding-block: ${({ theme }) => theme.layout.sectionBlock};
  border-block: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  background:
    ${({ theme }) => theme.colors.gradients.atmosphereTexture},
    radial-gradient(
      ellipse at 50% 46%,
      ${({ theme }) => theme.colors.effects.violetGlowSoft},
      transparent 42%
    ),
    radial-gradient(
      circle at 88% 16%,
      ${({ theme }) => theme.colors.effects.acidGlowSoft},
      transparent 18%
    ),
    ${({ theme }) => theme.colors.background.surfacePressed};

  &::before,
  &::after {
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    width: clamp(9rem, 18vw, 16rem);
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.violet};
    border-radius: ${({ theme }) => theme.radii.orbital};
    box-shadow:
      ${({ theme }) => theme.shadows.insetViolet},
      inset 0 0 0 ${({ theme }) => theme.spacing.lg}
        ${({ theme }) => theme.colors.background.glassViolet};
    content: '';
    pointer-events: none;
  }

  &::before {
    top: -5rem;
    left: -5rem;
  }

  &::after {
    right: -6rem;
    bottom: -6rem;
  }
`

const OfferingsContainer = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing['4xl']};
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
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.accent.metal},
      ${({ theme }) => theme.colors.accent.signal},
      transparent
    );
    content: '';
  }
`

const IntroStar = styled.span`
  position: absolute;
  top: -${({ theme }) => theme.spacing.md};
  left: -${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent.metal};
  text-shadow: 0 0 ${({ theme }) => theme.spacing['2xl']}
    ${({ theme }) => theme.colors.effects.starlight};
`

const SectionHeading = styled(DisplayHeading).attrs({
  as: 'h2',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})`
  text-wrap: balance;
  text-shadow: 0 0 ${({ theme }) => theme.spacing['5xl']}
    ${({ theme }) => theme.colors.effects.violetGlow};
`

const SectionDescription = styled(BodyCopy).attrs({
  $tone: 'bodySoft',
})``

const OfferingsGrid = styled.div`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const OfferingCard = styled(Card)`
  isolation: isolate;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.xl};
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing['4xl']};
  border-color: ${({ theme }) => theme.colors.border.violetStrong};
  background:
    linear-gradient(
      145deg,
      ${({ theme }) => theme.colors.background.surfaceRaised},
      ${({ theme }) => theme.colors.background.glassInk}
    ),
    ${({ theme }) => theme.colors.gradients.atmosphereTexture};
  transform-style: preserve-3d;
  transition:
    transform ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) =>
      theme.motion.easing.enter},
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &::before {
    position: absolute;
    inset: ${({ theme }) => theme.spacing.md};
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.surface};
    border-radius: ${({ theme }) => theme.radii.lg};
    background:
      linear-gradient(${({ theme }) => theme.colors.accent.metal}, ${({ theme }) =>
          theme.colors.accent.metal}) left top / ${({ theme }) => theme.spacing['4xl']}
        ${({ theme }) => theme.borders.width.thin} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.accent.metal}, ${({ theme }) =>
          theme.colors.accent.metal}) left top / ${({ theme }) => theme.borders.width.thin}
        ${({ theme }) => theme.spacing['4xl']} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.accent.signal}, ${({ theme }) =>
          theme.colors.accent.signal}) right bottom / ${({ theme }) => theme.spacing['4xl']}
        ${({ theme }) => theme.borders.width.thin} no-repeat,
      linear-gradient(${({ theme }) => theme.colors.accent.signal}, ${({ theme }) =>
          theme.colors.accent.signal}) right bottom / ${({ theme }) => theme.borders.width.thin}
        ${({ theme }) => theme.spacing['4xl']} no-repeat;
    content: '';
    pointer-events: none;
  }

  &::after {
    position: absolute;
    inset: -65%;
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    background: conic-gradient(
      from 180deg,
      transparent,
      ${({ theme }) => theme.colors.effects.moonlightSoft},
      transparent 18%
    );
    content: '';
    opacity: 0;
    pointer-events: none;
    transform: rotate(-35deg) translateX(-24%);
    transition:
      opacity ${({ theme }) => theme.transitions.base},
      transform ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) =>
        theme.motion.easing.enter};
  }

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
      box-shadow:
        ${({ theme }) => theme.shadows.surfaceRaised},
        0 0 ${({ theme }) => theme.spacing['5xl']}
          ${({ theme }) => theme.colors.effects.violetGlowSoft};
      transform: perspective(60rem) translateY(${({ theme }) => theme.layout.hoverLift})
        rotateY(${({ $direction }) => ($direction === 'forward' ? '-1.25deg' : '1.25deg')});
    }

    &:hover::after {
      opacity: 1;
      transform: rotate(-12deg) translateX(22%);
    }
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    padding: ${({ theme }) => theme.spacing['2xl']};
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &:hover {
      transform: none;
    }

    &::after {
      display: none;
      transition-duration: ${({ theme }) => theme.motion.duration.reduced};
    }
  }
`

const sigilTurn = keyframes`
  to { transform: rotate(360deg); }
`

const OfferingSigil = styled.svg`
  justify-self: end;
  width: clamp(5rem, 9vw, 7.5rem);
  margin-bottom: -${({ theme }) => theme.spacing['5xl']};
  color: ${({ theme }) => theme.colors.border.signal};
  opacity: 0.68;
  transform-origin: center;
  pointer-events: none;
  animation: ${sigilTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite
    ${({ $direction }) => ($direction === 'reverse' ? 'reverse' : 'normal')};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const SigilOrbit = styled.circle`
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 2 7;
  stroke-width: 1;
`

const SigilPolygon = styled.polygon`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.violetStrong};
  stroke-width: 1;
`

const SigilAxis = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.surfaceRaised};
  stroke-dasharray: 1 8;
  stroke-width: 1;
`

const SigilCore = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.metal};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 4;
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
  text-wrap: balance;
  text-shadow: 0 0 ${({ theme }) => theme.spacing['4xl']}
    ${({ theme }) => theme.colors.effects.violetGlowSoft};
`

const OfferingRule = styled(Divider)`
  max-width: ${({ theme }) => theme.spacing['5xl']};
`

const OfferingStatement = styled.p`
  max-width: 28ch;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.bodyStrong};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
`

const OfferingBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`

const OfferingParagraph = styled(BodyCopy).attrs({
  $tone: 'bodyMuted',
})``

const BookingPath = styled(NavLink)`
  position: relative;
  justify-self: start;
  gap: ${({ theme }) => theme.spacing.md};
  padding-inline: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.strong};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.effects.acidGlowSoft},
    transparent
  );

  &::before {
    width: ${({ theme }) => theme.spacing.sm};
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.accent.metal};
    content: '';
    transform: rotate(45deg);
  }
`

const BookingGlyph = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
`

const cosmosTurn = keyframes`
  to { transform: rotate(360deg); }
`

const OfferingsCosmos = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: min(82rem, 110vw);
  max-width: none;
  color: ${({ theme }) => theme.colors.border.violet};
  opacity: 0.4;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transform-origin: center;
  animation: ${cosmosTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CosmosOrbit = styled.circle`
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 2 14;
  stroke-width: 1;
`

const CosmosDiamond = styled.polygon`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.signal};
  stroke-width: 1;
`

const CosmosAxis = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.surface};
  stroke-dasharray: 1 10;
  stroke-width: 1;
`

const CosmosNode = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.metal};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 7;
`
