import styled, { keyframes } from 'styled-components'
import {
  BodyCopy,
  Card,
  Container,
  DisplayHeading,
  RitualLabel,
  Section,
} from '../../styles/primitives'

export function GallerySection({ content: gallery }) {

  return (
    <GalleryRoot id="gallery" aria-labelledby="gallery-heading">
      <GallerySky aria-hidden="true" focusable="false" viewBox="0 0 1200 720">
        <SkyPath d="m58 120 166 92 142-128 176 155 154-119 181 138 112-91 160 106" />
        <SkyPath d="m84 596 132-134 164 76 143-157 193 109 116-173 194 97 109-142" />
        <SkyArc d="M133 572A510 510 0 0 1 1072 178" />
        <SkyArc d="M234 645A430 430 0 0 1 1020 290" />
        <SkyNode cx="58" cy="120" r="4" />
        <SkyNode cx="224" cy="212" r="6" />
        <SkyNode cx="366" cy="84" r="4" />
        <SkyNode cx="542" cy="239" r="5" />
        <SkyNode cx="696" cy="120" r="4" />
        <SkyNode cx="877" cy="258" r="6" />
        <SkyNode cx="989" cy="167" r="4" />
        <SkyNode cx="1149" cy="273" r="5" />
      </GallerySky>
      <GalleryContainer>
        <GalleryIntro>
          <GalleryStar aria-hidden="true">✧</GalleryStar>
          <RitualLabel $tone="signal">{gallery.eyebrow}</RitualLabel>
          <GalleryHeading id="gallery-heading">{gallery.title}</GalleryHeading>
          <GalleryDescription>{gallery.description}</GalleryDescription>
        </GalleryIntro>

        <GalleryGrid $imageCount={gallery.images.length}>
          {gallery.images.map((image) => (
            <GalleryFigure
              key={image.id}
              $variant="quiet"
              $radius="xl"
              $orientation={image.orientation}
            >
              <GalleryGeometry aria-hidden="true" focusable="false" viewBox="0 0 240 240">
                <GalleryOrbit cx="120" cy="120" r="102" />
                <GalleryOrbit cx="120" cy="120" r="72" />
                <GalleryDiamond points="120,10 230,120 120,230 10,120" />
                <GalleryDiamond points="120,35 205,205 35,205" />
                <GalleryAxis d="M8 120h224M120 8v224" />
                <GalleryCore d="m120 95 7 18 18 7-18 7-7 18-7-18-18-7 18-7Z" />
              </GalleryGeometry>
              <GalleryPicture>
                <GallerySource
                  type="image/avif"
                  srcSet={image.avifSrcSet}
                  sizes={image.sizes}
                />
                <GallerySource
                  type="image/webp"
                  srcSet={image.webpSrcSet}
                  sizes={image.sizes}
                />
                <GalleryImage
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  $orientation={image.orientation}
                />
              </GalleryPicture>
              <GalleryCaption $tone="metal">{image.caption}</GalleryCaption>
            </GalleryFigure>
          ))}
        </GalleryGrid>
      </GalleryContainer>
    </GalleryRoot>
  )
}

const GalleryRoot = styled(Section)`
  isolation: isolate;
  overflow: clip;
  padding-block: ${({ theme }) => theme.layout.sectionBlock};
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  background:
    ${({ theme }) => theme.colors.gradients.atmosphereTexture},
    radial-gradient(
      ellipse at 22% 64%,
      ${({ theme }) => theme.colors.effects.violetGlowSoft},
      transparent 32%
    ),
    radial-gradient(
      circle at 82% 22%,
      ${({ theme }) => theme.colors.effects.acidGlowSoft},
      transparent 16%
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.background.surfacePressed},
      ${({ theme }) => theme.colors.background.canvas}
    );

  &::before,
  &::after {
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    width: clamp(9rem, 20vw, 18rem);
    aspect-ratio: 1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.violet};
    border-radius: ${({ theme }) => theme.radii.orbital};
    box-shadow: inset 0 0 0 ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.colors.background.glassViolet};
    content: '';
    pointer-events: none;
  }

  &::before {
    top: 8%;
    right: -8rem;
  }

  &::after {
    bottom: 4%;
    left: -7rem;
  }
`

const GalleryContainer = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing['4xl']};
`

const GalleryIntro = styled.div`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.proseWidth};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-left: ${({ theme }) => theme.borders.width.thin} ${({ theme }) =>
      theme.borders.style}
    ${({ theme }) => theme.colors.accent.metal};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.background.glassViolet},
    transparent
  );

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 42%;
    height: ${({ theme }) => theme.borders.width.thin};
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.accent.metal},
      transparent
    );
    content: '';
  }
`

const GalleryStar = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.accent.metal};
  font-size: ${({ theme }) => theme.typography.fontSize.section};
  text-shadow: 0 0 ${({ theme }) => theme.spacing['4xl']}
    ${({ theme }) => theme.colors.effects.starlight};
`

const GalleryHeading = styled(DisplayHeading).attrs({
  as: 'h2',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})`
  text-wrap: balance;
  text-shadow: 0 0 ${({ theme }) => theme.spacing['5xl']}
    ${({ theme }) => theme.colors.effects.violetGlow};
`

const GalleryDescription = styled(BodyCopy)``

const GalleryGrid = styled.div`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: end;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    grid-template-columns: ${({ $imageCount }) =>
      $imageCount > 1 ? 'minmax(0, 3fr) minmax(16rem, 2fr)' : 'minmax(0, 1fr)'};
    gap: ${({ theme }) => theme.spacing['4xl']};

    & > :nth-child(even) {
      margin-top: ${({ theme }) => theme.spacing['5xl']};
      margin-bottom: -${({ theme }) => theme.spacing['5xl']};
    }
  }
`

const GalleryFigure = styled(Card).attrs({
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
    ${({ theme }) => theme.shadows.surfaceRaised},
    0 0 ${({ theme }) => theme.spacing['5xl']}
      ${({ theme }) => theme.colors.effects.violetGlowSoft};
  transition:
    transform ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) =>
      theme.motion.easing.enter},
    border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &::before,
  &::after {
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.content};
    width: 18%;
    aspect-ratio: 1;
    border-color: ${({ theme }) => theme.colors.accent.metal};
    border-style: ${({ theme }) => theme.borders.style};
    content: '';
    pointer-events: none;
  }

  &::before {
    top: -${({ theme }) => theme.spacing.md};
    left: -${({ theme }) => theme.spacing.md};
    border-width: ${({ theme }) => theme.borders.width.thin} 0 0
      ${({ theme }) => theme.borders.width.thin};
    border-radius: ${({ theme }) => theme.radii.lg} 0 0;
  }

  &::after {
    right: -${({ theme }) => theme.spacing.md};
    bottom: -${({ theme }) => theme.spacing.md};
    border-width: 0 ${({ theme }) => theme.borders.width.thin}
      ${({ theme }) => theme.borders.width.thin} 0;
    border-radius: 0 0 ${({ theme }) => theme.radii.lg};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border.strong};
      box-shadow:
        ${({ theme }) => theme.shadows.surfaceRaised},
        0 0 ${({ theme }) => theme.spacing['5xl']}
          ${({ theme }) => theme.colors.effects.acidGlowSoft};
      transform: perspective(70rem) translateY(${({ theme }) => theme.layout.hoverLift})
        rotateX(1deg) rotateY(${({ $orientation }) =>
          $orientation === 'landscape' ? '-1deg' : '1deg'});
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    &:hover {
      transform: none;
    }
  }
`

const GalleryPicture = styled.picture`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: block;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};

  &::before,
  &::after {
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.content};
    content: '';
    pointer-events: none;
  }

  &::before {
    inset: 0;
    background:
      linear-gradient(to top, ${({ theme }) => theme.colors.background.footer}, transparent 36%),
      radial-gradient(circle at 72% 18%, ${({ theme }) => theme.colors.effects.starlightSoft}, transparent 20%);
  }

  &::after {
    inset: -45%;
    background: linear-gradient(
      110deg,
      transparent 42%,
      ${({ theme }) => theme.colors.effects.moonlightSoft} 49%,
      ${({ theme }) => theme.colors.effects.starlightSoft} 50%,
      transparent 58%
    );
    opacity: 0;
    transform: translateX(-28%) rotate(8deg);
    transition:
      opacity ${({ theme }) => theme.transitions.base},
      transform ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) =>
        theme.motion.easing.enter};
  }

  @media (hover: hover) and (pointer: fine) {
    ${GalleryFigure}:hover &::after {
      opacity: 1;
      transform: translateX(28%) rotate(8deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      display: none;
      transition-duration: ${({ theme }) => theme.motion.duration.reduced};
    }
  }
`

const GallerySource = styled('source')``

const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: ${({ $orientation }) => ($orientation === 'landscape' ? '6 / 5' : '3 / 4')};
  object-fit: cover;
  object-position: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  filter: saturate(0.94) contrast(1.05);
  transition:
    transform ${({ theme }) => theme.motion.duration.ritual} ${({ theme }) =>
      theme.motion.easing.enter},
    filter ${({ theme }) => theme.transitions.base};

  @media (hover: hover) and (pointer: fine) {
    ${GalleryFigure}:hover & {
      filter: saturate(1.12) contrast(1.08);
      transform: scale(1.035);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};

    ${GalleryFigure}:hover & {
      transform: none;
    }
  }
`

const GalleryCaption = styled(RitualLabel).attrs({
  as: 'figcaption',
})`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.body};
  text-align: center;

  &::before,
  &::after {
    color: ${({ theme }) => theme.colors.accent.metal};
    content: '✦';
  }

  &::before {
    margin-right: ${({ theme }) => theme.spacing.md};
  }

  &::after {
    margin-left: ${({ theme }) => theme.spacing.md};
  }
`

const galleryDrift = keyframes`
  from { transform: translate3d(-1%, 0, 0); }
  to { transform: translate3d(1%, -1%, 0); }
`

const GallerySky = styled.svg`
  position: absolute;
  inset: 4% -4%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: 108%;
  height: 92%;
  color: ${({ theme }) => theme.colors.border.signal};
  opacity: 0.42;
  pointer-events: none;
  animation: ${galleryDrift} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const SkyPath = styled.path`
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 2 11;
  stroke-width: 1;
`

const SkyArc = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.violetStrong};
  stroke-dasharray: 2 14;
  stroke-width: 1;
`

const SkyNode = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.metal};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 7;
`

const galleryTurn = keyframes`
  to { transform: rotate(360deg); }
`

const GalleryGeometry = styled.svg`
  position: absolute;
  top: -8%;
  right: -8%;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  width: min(11rem, 34%);
  color: ${({ theme }) => theme.colors.border.signal};
  opacity: 0.72;
  pointer-events: none;
  transform-origin: center;
  animation: ${galleryTurn} ${({ theme }) => theme.motion.duration.ambient}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const GalleryOrbit = styled.circle`
  fill: ${({ theme }) => theme.colors.background.glassViolet};
  stroke: currentColor;
  stroke-dasharray: 2 8;
  stroke-width: 1;
`

const GalleryDiamond = styled.polygon`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.violetStrong};
  stroke-width: 1;
`

const GalleryAxis = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.surfaceRaised};
  stroke-dasharray: 1 9;
  stroke-width: 1;
`

const GalleryCore = styled.path`
  fill: ${({ theme }) => theme.colors.accent.metal};
  stroke: ${({ theme }) => theme.colors.effects.starlight};
  stroke-width: 2;
`
