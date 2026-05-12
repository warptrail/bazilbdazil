import { useEffect, useMemo, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import aboutSource from '../../content/about.md?raw'
import {
  BodyCopy,
  Container,
  DisplayHeading,
  Divider,
  Eyebrow,
  GlowOrb,
  OrbitalBackdrop,
  Section,
  labelText,
} from '../../styles/primitives'

const dossierContent = parseAboutContent(aboutSource)

function parseAboutContent(source) {
  const lines = source.split('\n')
  const sections = []
  const floatingTerms = []

  const collapsed = {
    eyebrow: extractSingleValue(lines, '## Eyebrow'),
    heading: extractSingleValue(lines, '## Main Heading'),
    intro: extractParagraph(lines, '## Intro Fragment'),
  }

  const expandedMatches = [
    ...source.matchAll(
      /## SECTION \d+\n\n### Label\n\n([\s\S]*?)\n\n### Heading\n\n([\s\S]*?)\n\n### Body\n\n([\s\S]*?)(?=\n\n---|\n\n### Floating Terms|\n# |$)/g,
    ),
  ]

  for (const match of expandedMatches) {
    sections.push({
      label: collapseLines(match[1]),
      heading: collapseLines(match[2]),
      body: toParagraphs(match[3]),
    })
  }

  const termsBlock = source.match(/### Floating Terms\n\n([\s\S]*?)(?=\n\n---|\n# |$)/)
  if (termsBlock) {
    floatingTerms.push(...toLineList(termsBlock[1]))
  }

  return { collapsed, sections, floatingTerms }
}

function extractSingleValue(lines, heading) {
  const startIndex = lines.findIndex((line) => line.trim() === heading)
  if (startIndex === -1) return ''

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const value = lines[index].trim()
    if (value) return value
  }

  return ''
}

function extractParagraph(lines, heading) {
  const startIndex = lines.findIndex((line) => line.trim() === heading)
  if (startIndex === -1) return []
  const values = []

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const current = lines[index]
    if (current.startsWith('## ') || current.startsWith('# ') || current === '---') break

    if (!current.trim()) {
      if (values.length && values[values.length - 1] !== '') values.push('')
      continue
    }

    values.push(current.trim())
  }

  return toParagraphs(values.join('\n'))
}

function collapseLines(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
}

function toParagraphs(value) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\n/g, ' ').trim())
    .filter(Boolean)
}

function toLineList(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function buildSlides() {
  const slides = [
    {
      kind: 'intro',
      variant: 'intro',
      label: dossierContent.collapsed.eyebrow || 'ORBITAL DOSSIER',
      heading: dossierContent.collapsed.heading || 'ABOUT BAZIL',
      body: dossierContent.collapsed.intro,
      annotation: 'ARCHIVE THRESHOLD',
      ghost: 'ORBITAL',
    },
  ]

  dossierContent.sections.slice(0, 3).forEach((section, index) => {
    slides.push({
      kind: 'narrative',
      variant: index === 0 ? 'signals' : index === 1 ? 'performance' : 'philosophy',
      label: section.label,
      heading: section.heading,
      body: section.body,
      annotation:
        index === 0
          ? 'PATTERN RECOGNITION'
          : index === 1
            ? 'STAGE TRANSMISSION'
            : 'RITUAL LOGIC',
      ghost: index === 0 ? 'CARDS' : index === 1 ? 'DRAG' : 'SIGNAL',
    })
  })

  if (dossierContent.floatingTerms.length) {
    slides.push({
      kind: 'energy',
      variant: 'energy',
      label: dossierContent.sections.at(-1)?.label || 'THE ENERGY',
      heading: dossierContent.sections.at(-1)?.heading || 'SOMEWHERE BETWEEN:',
      terms: dossierContent.floatingTerms,
      annotation: 'TEMPERAMENT MAP',
      ghost: 'BETWEEN',
    })
  }

  return slides
}

function wrapIndex(index, length) {
  if (!length) return 0
  return (index + length) % length
}

export function AboutDossier() {
  const slides = useMemo(() => buildSlides(), [])
  const [activeIndex, setActiveIndex] = useState(0)
  const viewportRef = useRef(null)
  const touchStartX = useRef(null)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    let frameId = 0

    const updateIndex = () => {
      frameId = 0
      const children = Array.from(viewport.children)
      if (!children.length) return

      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2
      let nextIndex = 0
      let nearest = Number.POSITIVE_INFINITY

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2
        const distance = Math.abs(childCenter - viewportCenter)
        if (distance < nearest) {
          nearest = distance
          nextIndex = index
        }
      })

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
    }

    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateIndex)
    }

    updateIndex()
    viewport.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      viewport.removeEventListener('scroll', onScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [slides.length])

  const scrollToIndex = (index) => {
    const viewport = viewportRef.current
    const nextIndex = wrapIndex(index, slides.length)
    const target = viewport?.children[nextIndex]
    if (!viewport || !target) return

    viewport.scrollTo({
      left: target.offsetLeft - 2,
      behavior: 'smooth',
    })
  }

  const showPrevious = () => {
    scrollToIndex(activeIndex - 1)
  }

  const showNext = () => {
    scrollToIndex(activeIndex + 1)
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    const startX = touchStartX.current
    const endX = event.changedTouches[0]?.clientX ?? null
    touchStartX.current = null

    if (startX === null || endX === null) return
    const deltaX = endX - startX
    if (Math.abs(deltaX) < 48) return
    if (deltaX < 0) showNext()
    if (deltaX > 0) showPrevious()
  }

  return (
    <AboutSection id="about">
      <AboutFrame $maxWidth="100%">
        <Atmosphere aria-hidden="true">
          <ArchiveGlow />
          <AcidGlow />
          <OrbitField />
          <ParticleField />
          <HazeBand />
        </Atmosphere>

        <HeaderRow>
          <HeaderIntro>
            <HeaderEyebrow>{dossierContent.collapsed.eyebrow}</HeaderEyebrow>
            <HeaderTitle>{dossierContent.collapsed.heading}</HeaderTitle>
          </HeaderIntro>

          <HeaderMeta>
            <HeaderCount>
              {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </HeaderCount>
            <HeaderNote>Scroll horizontally through the booklet.</HeaderNote>
          </HeaderMeta>
        </HeaderRow>

        <BookletViewport
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <BookletPage key={`${slide.variant}-${slide.heading}`} $variant={slide.variant}>
              <PageGhost aria-hidden="true" $variant={slide.variant}>
                {slide.ghost}
              </PageGhost>
              <PageOrbit $variant={slide.variant} />
              <PageAnchor $variant={slide.variant}>
                <AnchorPlate $variant={slide.variant} />
                <AnchorOrb $variant={slide.variant} />
              </PageAnchor>
              <PageFragment $variant={slide.variant} />

              <PageContent>
                <PageMeta>
                  <PageIndex>{String(index + 1).padStart(2, '0')}</PageIndex>
                  <PageLabel>{slide.label}</PageLabel>
                  <PageAnnotation>{slide.annotation}</PageAnnotation>
                </PageMeta>

                <PageMain $variant={slide.variant}>
                  <PageHeading as="h3" $variant={slide.variant}>
                    {slide.heading}
                  </PageHeading>
                  <PageRule />

                  {slide.kind === 'energy' ? (
                    <EnergyTerms>
                      {slide.terms.map((term, termIndex) => (
                        <EnergyTerm key={term} $index={termIndex}>
                          {term}
                        </EnergyTerm>
                      ))}
                    </EnergyTerms>
                  ) : (
                    <PageBody>
                      {slide.body.map((paragraph) => (
                        <PageParagraph key={paragraph}>{paragraph}</PageParagraph>
                      ))}
                    </PageBody>
                  )}
                </PageMain>
              </PageContent>
            </BookletPage>
          ))}
        </BookletViewport>

        <FooterRow>
          <ProgressRow>
            {slides.map((slide, index) => (
              <ProgressDot
                key={`${slide.heading}-${index}`}
                type="button"
                aria-label={`Show page ${index + 1}`}
                aria-pressed={index === activeIndex}
                $active={index === activeIndex}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </ProgressRow>

          <NavRow>
            <NavButton type="button" onClick={showPrevious} aria-label="Show previous page">
              ←
            </NavButton>
            <NavButton type="button" onClick={showNext} aria-label="Show next page">
              →
            </NavButton>
          </NavRow>
        </FooterRow>
      </AboutFrame>
    </AboutSection>
  )
}

const slowSpin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const drift = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -0.6rem, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`

const AboutSection = styled(Section)`
  padding-top: clamp(3rem, 6vw, 4.5rem);
  padding-bottom: clamp(3rem, 6vw, 4.5rem);
  overflow: clip;
`

const AboutFrame = styled(Container)`
  position: relative;
  padding: clamp(1rem, 2.4vw, 1.5rem);
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  background:
    radial-gradient(circle at 14% 20%, ${({ theme }) => theme.colors.effects.violetGlowSoft} 0%, transparent 24%),
    radial-gradient(circle at 82% 18%, ${({ theme }) => theme.colors.effects.acidGlowSoft} 0%, transparent 16%),
    linear-gradient(180deg, rgba(6, 8, 13, 0.88), rgba(6, 9, 14, 0.62));
`

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const ArchiveGlow = styled(GlowOrb).attrs({
  $background:
    'radial-gradient(circle at center, rgba(155, 95, 240, 0.18) 0%, rgba(155, 95, 240, 0.08) 24%, rgba(155, 95, 240, 0) 56%)',
  $filter: 'blur(44px)',
})`
  top: 0;
  left: 6%;
  width: min(20rem, 30vw);
  height: 12rem;
  opacity: 0.8;
`

const AcidGlow = styled(GlowOrb).attrs({
  $background:
    'radial-gradient(circle at center, rgba(141, 255, 69, 0.12) 0%, rgba(141, 255, 69, 0.04) 24%, rgba(141, 255, 69, 0) 48%)',
  $filter: 'blur(44px)',
})`
  right: 4%;
  bottom: 2rem;
  width: min(18rem, 26vw);
  height: 12rem;
  opacity: 0.68;
`

const OrbitField = styled(OrbitalBackdrop)`
  top: auto;
  right: 2rem;
  bottom: 1rem;
  width: min(12rem, 20vw);
  aspect-ratio: 1;
  opacity: 0.28;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(186, 145, 255, 0.14);
  }

  &::before {
    inset: 12%;
  }

  &::after {
    inset: 26%;
    border-color: rgba(141, 255, 69, 0.12);
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${slowSpin} 90s linear infinite;
  }
`

const ParticleField = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.12;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 12% 30%, ${({ theme }) => theme.colors.effects.moonlight} 0 0.05rem, transparent 0.06rem),
      radial-gradient(circle at 26% 76%, ${({ theme }) => theme.colors.effects.starlight} 0 0.04rem, transparent 0.05rem),
      radial-gradient(circle at 48% 20%, ${({ theme }) => theme.colors.effects.starlightSoft} 0 0.03rem, transparent 0.05rem),
      radial-gradient(circle at 66% 54%, ${({ theme }) => theme.colors.effects.moonlightSoft} 0 0.04rem, transparent 0.05rem);
  }
`

const HazeBand = styled.div`
  position: absolute;
  left: -4%;
  right: -4%;
  bottom: 14%;
  height: 5rem;
  background: linear-gradient(90deg, transparent, rgba(186, 145, 255, 0.07), transparent);
  filter: blur(28px);
  opacity: 0.4;
`

const HeaderRow = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }
`

const HeaderIntro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

const HeaderEyebrow = styled(Eyebrow)`
  color: ${({ theme }) => theme.colors.accent.acidSoft};
`

const HeaderTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(2.1rem, 4.6vw, 3.8rem);
  line-height: 0.9;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  text-transform: uppercase;
`

const HeaderMeta = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const HeaderCount = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent.acid};
  ${labelText}
`

const HeaderNote = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.editorial};
  text-transform: uppercase;
`

const BookletViewport = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 100%;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 0.4rem;

  &::-webkit-scrollbar {
    display: none;
  }
`

const BookletPage = styled.article`
  position: relative;
  min-height: clamp(28rem, 52vh, 36rem);
  padding: clamp(1rem, 2vw, 1.3rem);
  overflow: hidden;
  scroll-snap-align: start;
  border: 1px solid ${({ theme }) => theme.colors.border.violet};
  background:
    linear-gradient(180deg, rgba(14, 10, 22, 0.88), rgba(8, 11, 16, 0.92)),
    ${({ theme }) => theme.colors.background.glassViolet};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: 720px) {
    min-height: min(50vh, 32rem);
  }

  @media (min-width: 1600px) {
    min-height: clamp(32rem, 50vh, 40rem);
    padding: clamp(1.25rem, 1.8vw, 1.8rem);
  }
`

const PageGhost = styled.span`
  position: absolute;
  top: ${({ $variant }) => ($variant === 'performance' ? '10%' : '4%')};
  right: ${({ $variant }) => ($variant === 'signals' ? '-2%' : '4%')};
  color: rgba(241, 237, 255, 0.05);
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(4rem, 12vw, 8rem);
  line-height: 0.8;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  text-transform: uppercase;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${drift} 12s ease-in-out infinite;
  }
`

const PageOrbit = styled.div`
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.border.orbital};
  border-radius: ${({ theme }) => theme.radii.orbital};
  opacity: 0.28;

  ${({ $variant }) =>
    $variant === 'intro'
      ? `
    right: -12%;
    bottom: -12%;
    width: min(14rem, 34vw);
    aspect-ratio: 1;
  `
      : $variant === 'signals'
        ? `
    left: -12%;
    top: 20%;
    width: min(11rem, 28vw);
    aspect-ratio: 1;
  `
        : $variant === 'performance'
          ? `
    right: 8%;
    top: -8%;
    width: min(13rem, 30vw);
    aspect-ratio: 1;
  `
          : `
    right: -8%;
    bottom: 10%;
    width: min(12rem, 28vw);
    aspect-ratio: 1;
  `}
`

const PageAnchor = styled.div`
  position: absolute;
  inset: auto;

  ${({ $variant }) =>
    $variant === 'intro'
      ? `
    right: -8%;
    bottom: 12%;
    width: min(10rem, 24vw);
    height: min(13rem, 32vw);
  `
      : $variant === 'signals'
        ? `
    left: 8%;
    top: 16%;
    width: min(7rem, 18vw);
    height: min(10rem, 24vw);
  `
        : $variant === 'performance'
          ? `
    right: 8%;
    top: 14%;
    width: min(9rem, 20vw);
    height: min(12rem, 28vw);
  `
          : $variant === 'energy'
            ? `
    right: 10%;
    bottom: 12%;
    width: min(9rem, 20vw);
    height: min(9rem, 20vw);
  `
            : `
    left: -4%;
    bottom: 14%;
    width: min(9rem, 20vw);
    height: min(9rem, 20vw);
  `}

  @media (max-width: 720px) {
    opacity: 0.5;
    transform: scale(0.78);
    transform-origin: center;
  }
`

const AnchorPlate = styled.div`
  position: absolute;
  inset: 0;
  border: 1px solid rgba(186, 145, 255, 0.16);
  border-radius: ${({ $variant, theme }) =>
    $variant === 'philosophy' || $variant === 'energy' ? theme.radii.orbital : theme.radii.lg};
  background:
    ${({ $variant }) =>
      $variant === 'energy'
        ? 'radial-gradient(circle at center, rgba(141, 255, 69, 0.16) 0%, rgba(141, 255, 69, 0.06) 28%, rgba(141, 255, 69, 0) 64%)'
        : 'linear-gradient(180deg, rgba(10, 11, 18, 0.1), rgba(8, 10, 16, 0.74)), radial-gradient(circle at 50% 22%, rgba(141, 255, 69, 0.2) 0%, rgba(141, 255, 69, 0) 16%), radial-gradient(circle at 52% 64%, rgba(186, 145, 255, 0.12) 0%, rgba(186, 145, 255, 0) 24%)'};
`

const AnchorOrb = styled.div`
  position: absolute;
  inset: 16%;
  border: 1px solid rgba(141, 255, 69, 0.12);
  border-radius: inherit;
`

const PageFragment = styled.div`
  position: absolute;
  opacity: 0.22;
  border-top: 1px solid rgba(186, 145, 255, 0.16);
  border-bottom: 1px solid rgba(141, 255, 69, 0.12);

  ${({ $variant }) =>
    $variant === 'performance'
      ? `
    left: -10%;
    bottom: 18%;
    width: min(12rem, 26vw);
    height: 4rem;
    transform: rotate(-14deg);
  `
      : `
    right: -8%;
    bottom: 10%;
    width: min(10rem, 22vw);
    height: 4rem;
    transform: rotate(12deg);
  `}

  @media (max-width: 720px) {
    display: none;
  }
`

const PageContent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  align-content: space-between;
  height: 100%;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 980px) {
    grid-template-columns: minmax(11rem, 15rem) minmax(0, 1fr);
    align-items: end;
    gap: clamp(1.5rem, 4vw, 4rem);
  }

  @media (min-width: 1600px) {
    grid-template-columns: minmax(13rem, 18rem) minmax(0, 1fr);
    gap: clamp(2rem, 3vw, 4.8rem);
  }

  @media (max-width: 720px) {
    align-content: start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const PageMeta = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (min-width: 980px) {
    align-self: start;
    padding-top: 0.35rem;
  }
`

const PageIndex = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent.acid};
  ${labelText}
`

const PageLabel = styled(Eyebrow)`
  color: ${({ theme }) => theme.colors.text.bodyMuted};
`

const PageAnnotation = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.editorial};
  text-transform: uppercase;
`

const PageMain = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  align-self: end;
  max-width: ${({ $variant }) => ($variant === 'performance' ? '18rem' : '22rem')};
  margin-left: ${({ $variant }) => ($variant === 'performance' ? 'auto' : '0')};
  text-align: ${({ $variant }) => ($variant === 'performance' ? 'right' : 'left')};

  @media (min-width: 980px) {
    align-self: stretch;
    align-content: end;
    max-width: ${({ $variant }) => ($variant === 'performance' ? '34rem' : '42rem')};
    width: 100%;
    margin-left: ${({ $variant }) => ($variant === 'performance' ? 'auto' : '0')};
    padding-left: ${({ $variant }) => ($variant === 'signals' ? '6vw' : '0')};
    padding-right: ${({ $variant }) => ($variant === 'performance' ? '6vw' : '0')};
  }

  @media (min-width: 1600px) {
    max-width: ${({ $variant }) => ($variant === 'performance' ? '38rem' : '46rem')};
    padding-left: ${({ $variant }) => ($variant === 'signals' ? '4vw' : '0')};
    padding-right: ${({ $variant }) => ($variant === 'performance' ? '4vw' : '0')};
  }

  @media (max-width: 720px) {
    align-self: end;
    max-width: 100%;
  }
`

const PageHeading = styled(DisplayHeading)`
  margin: 0;
  color: ${({ theme, $variant }) =>
    $variant === 'performance' ? theme.colors.accent.ultravioletStrong : theme.colors.text.primary};
  font-size: ${({ $variant }) =>
    $variant === 'intro' ? 'clamp(2.8rem, 7vw, 4.8rem)' : 'clamp(2.1rem, 5.2vw, 3.8rem)'};
  line-height: 0.86;

  @media (min-width: 980px) {
    max-width: ${({ $variant }) => ($variant === 'performance' ? '10ch' : '12ch')};
    font-size: ${({ $variant }) =>
      $variant === 'intro' ? 'clamp(3.4rem, 5vw, 5rem)' : 'clamp(2.5rem, 4vw, 4.2rem)'};
  }

  @media (min-width: 1600px) {
    max-width: ${({ $variant }) => ($variant === 'performance' ? '11ch' : '13ch')};
  }

  @media (max-width: 720px) {
    max-width: 9ch;
    font-size: ${({ $variant }) =>
      $variant === 'intro' ? 'clamp(2.4rem, 11vw, 3.4rem)' : 'clamp(1.9rem, 9vw, 2.8rem)'};
  }
`

const PageRule = styled(Divider)`
  width: 5.5rem;
`

const PageBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 1.4rem;
    max-width: 100%;
  }

  @media (max-width: 720px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const PageParagraph = styled(BodyCopy).attrs({
  $tone: 'bodySoft',
})`
  font-size: clamp(0.92rem, 1.1vw, 1rem);
  line-height: 1.65;

  @media (min-width: 980px) {
    max-width: 24rem;
  }
`

const EnergyTerms = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 0.8rem;

  @media (min-width: 980px) {
    max-width: 38rem;
  }

  @media (min-width: 1600px) {
    max-width: 44rem;
    gap: 0.85rem 0.95rem;
  }
`

const EnergyTerm = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 2.2rem;
  padding: 0.45rem 0.8rem;
  border: 1px solid rgba(141, 255, 69, 0.16);
  color: ${({ theme, $index }) =>
    $index % 3 === 1 ? theme.colors.accent.ultravioletStrong : theme.colors.text.bodyStrong};
  background: rgba(9, 11, 17, 0.42);
  font-family: ${({ theme, $index }) =>
    $index % 2 === 0 ? theme.typography.fontFamily.serif : theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  letter-spacing: ${({ theme, $index }) =>
    $index % 2 === 0 ? theme.typography.letterSpacing.tight : theme.typography.letterSpacing.wide};
  text-transform: ${({ $index }) => ($index % 2 === 0 ? 'none' : 'uppercase')};
`

const FooterRow = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 900px) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`

const ProgressRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`

const ProgressDot = styled.button`
  width: ${({ $active }) => ($active ? '2.2rem' : '0.8rem')};
  height: 0.8rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accent.acid : theme.colors.border.violet};
  cursor: pointer;
  transition:
    width ${({ theme }) => theme.transitions.base},
    background-color ${({ theme }) => theme.transitions.base},
    opacity ${({ theme }) => theme.transitions.base};

  &:hover {
    opacity: 0.9;
  }
`

const NavRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const NavButton = styled.button`
  min-width: 2.4rem;
  min-height: 2.4rem;
  padding: 0.3rem;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.bodyStrong};
  font-size: 1.35rem;
  line-height: 1;
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent.acidSoft};
    transform: translateY(-1px);
  }
`
