import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { BookingExperience } from '../booking/BookingExperience'
import { ClownTransition } from '../ClownTransition'
import { landingContentByMode } from '../../content/landingContent'
import {
  EXPERIENCE_MODES,
  EXPERIENCE_TRANSITION_PHASES,
} from '../../context/experienceMode'
import { useExperienceMode } from '../../context/useExperienceMode'
import { Container, PageShell, SkipLink } from '../../styles/primitives'
import { AboutSection } from './AboutSection'
import { ApproachSection } from './ApproachSection'
import { Footer, FooterAtlas } from './Footer'
import { GallerySection } from './GallerySection'
import { Header, PracticeStrip } from './Header'
import { HeroSection } from './HeroSection'
import { ObservatoryField } from './ObservatoryField'
import { OfferingsSection } from './OfferingsSection'
import {
  buildJourneyChapters,
  clampJourneyValue,
  flattenJourneyMilestones,
} from '../../utils/journeyMath'

const initialView = {
  activeIndex: 0,
  chapterId: 'home',
  chapterIndex: 0,
  momentIndex: 0,
  segmentProgress: 0,
  chapterProgress: 0,
  globalProgress: 0,
  direction: 1,
  phase: 'idle',
  isNativeScrollLocked: false,
}

function useLinearJourney(chapters, milestones) {
  const [view, setView] = useState(initialView)
  const viewRef = useRef(initialView)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const sections = [...document.querySelectorAll('[data-linear-chapter]')]
      if (sections.length === 0) return

      const focusLine = window.innerHeight * 0.42
      let sectionIndex = 0
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= focusLine) sectionIndex = index
      })

      const chapter = chapters[sectionIndex] || chapters[0]
      const section = sections[sectionIndex]
      const sectionRect = section?.getBoundingClientRect()
      const chapterSpan = Math.max(sectionRect?.height || 1, 1)
      const chapterProgress = clampJourneyValue((focusLine - (sectionRect?.top || 0)) / chapterSpan)
      const momentIndex = chapter.milestones.length > 1
        ? Math.min(
            chapter.milestones.length - 1,
            Math.round(chapterProgress * (chapter.milestones.length - 1)),
          )
        : 0
      const activeIndex = chapter.startIndex + momentIndex
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const globalProgress = clampJourneyValue(window.scrollY / maxScroll)
      const previous = viewRef.current
      const next = {
        ...previous,
        activeIndex,
        chapterId: chapter.id,
        chapterIndex: chapter.chapterIndex,
        momentIndex,
        chapterProgress,
        globalProgress,
        direction: window.scrollY >= (previous.scrollY || 0) ? 1 : -1,
        scrollY: window.scrollY,
      }

      if (
        previous.activeIndex === next.activeIndex &&
        previous.chapterId === next.chapterId &&
        Math.abs(previous.globalProgress - next.globalProgress) < 0.01 &&
        previous.direction === next.direction
      ) return

      viewRef.current = next
      setView(next)
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })

    const initialHash = window.location.hash.slice(1)
    if (initialHash) {
      window.requestAnimationFrame(() => {
        document
          .querySelector(`[data-linear-chapter="${initialHash}"]`)
          ?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    }

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [chapters, milestones.length])

  const goToChapter = useCallback((chapterId) => {
    const target = document.querySelector(`[data-linear-chapter="${chapterId}"]`)
    target?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [])

  return { view, goToChapter }
}

export function LandingPage() {
  const { mode, isClownMode, transitionPhase, transitionTarget } = useExperienceMode()
  const landingContent = landingContentByMode[mode]
  const chapters = useMemo(
    () => buildJourneyChapters(Boolean(landingContent.gallery)),
    [landingContent.gallery],
  )
  const milestones = useMemo(() => flattenJourneyMilestones(chapters), [chapters])
  const { view, goToChapter } = useLinearJourney(chapters, milestones)
  const isClownReveal =
    transitionTarget === EXPERIENCE_MODES.CLOWN &&
    transitionPhase === EXPERIENCE_TRANSITION_PHASES.REVEALING
  const chapterStops = useMemo(
    () => chapters.map((chapter, index) => ({
      id: chapter.id,
      index,
      position: chapter.startIndex / Math.max(milestones.length - 1, 1),
    })),
    [chapters, milestones.length],
  )

  const renderChapter = (chapterId) => {
    if (chapterId === 'home') {
      return (
        <HeroSection
          content={landingContent.hero}
          isClownMode={isClownMode}
          transitionPhase={transitionPhase}
        />
      )
    }
    if (chapterId === 'about') return <AboutSection content={landingContent.about} />
    if (chapterId === 'offerings') return <OfferingsSection content={landingContent.offerings} />
    if (chapterId === 'approach') return <ApproachSection content={landingContent.approach} />
    if (chapterId === 'gallery' && landingContent.gallery) {
      return <GallerySection content={landingContent.gallery} />
    }
    if (chapterId === 'book') {
      return (
        <BookingRegion>
          <BookingContainer>
            <BookingExperience
              id="book"
              label={landingContent.booking.label}
              title={landingContent.booking.title}
              description={landingContent.booking.description}
              compact
            />
          </BookingContainer>
        </BookingRegion>
      )
    }
    return <Footer navigation={landingContent.navigation} signoff={landingContent.footer.signoff} />
  }

  return (
    <LandingShell $revealing={isClownReveal}>
      <JourneyAtmosphere aria-hidden="true" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <ObservatoryField
        showModeControl
        activeScene={view.chapterIndex}
        sceneCount={chapters.length}
        dialDirection={view.direction}
        onSceneRequest={(index) => goToChapter(chapters[index]?.id)}
        journeyState={view}
        chapterStops={chapterStops}
      />
      <PracticeStrip text={landingContent.practiceStrip} />
      <Header
        navigation={landingContent.navigation}
        transitionPhase={transitionPhase}
        journeyChapterId={view.chapterId}
      />
      <FooterAtlas
        navigation={landingContent.navigation}
        journey={view}
        onJourneyRequest={goToChapter}
      />

      <LinearJourney id="main-content" tabIndex="-1">
        {chapters.map((chapter) => (
          <LinearChapter
            key={chapter.id}
            id={chapter.id === 'book' || chapter.id === 'footer' ? undefined : chapter.id}
            data-linear-chapter={chapter.id}
          >
            {renderChapter(chapter.id)}
          </LinearChapter>
        ))}
      </LinearJourney>

      <JourneyStatus role="status" aria-live="polite" aria-atomic="true">
        {chapters[view.chapterIndex]?.label}, moment {view.momentIndex + 1}
      </JourneyStatus>
      <ClownTransition phase={transitionPhase} targetMode={transitionTarget} />
    </LandingShell>
  )
}

const sceneRumble = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  24% { transform: translate3d(-1px, 0, 0); }
  52% { transform: translate3d(1px, 1px, 0); }
  78% { transform: translate3d(0, -1px, 0); }
`

const LandingShell = styled(PageShell)`
  isolation: isolate;
  background: ${({ theme }) => theme.colors.background.canvas};

  ${({ $revealing }) => $revealing && css`animation: ${sceneRumble} 130ms linear infinite;`}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const JourneyAtmosphere = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  pointer-events: none;
  opacity: 0.12;
  background:
    radial-gradient(circle at 38% 48%, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent 42%),
    radial-gradient(circle at 72% 54%, ${({ theme }) => theme.colors.effects.cyanGlow}, transparent 38%);
  mix-blend-mode: color;
`

const LinearJourney = styled.main`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: 100%;

  &:focus {
    outline: none;
  }
`

const LinearChapter = styled.section`
  position: relative;
  width: 100%;
  scroll-margin-top: calc(var(--journey-header-clearance, 6rem) + 1rem);
`

const BookingRegion = styled.div`
  position: relative;
  isolation: isolate;
  display: grid;
  align-items: start;
  min-block-size: max(
    32rem,
    calc(100svh - var(--journey-header-clearance) - var(--journey-header-gap))
  );
  padding-block: clamp(1.25rem, 3svh, 2.5rem);
  padding-inline: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-bottom: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.etched};
  background:
    ${({ theme }) => theme.colors.gradients.starfield},
    ${({ theme }) => theme.colors.gradients.spectralWash},
    ${({ theme }) => theme.colors.gradients.atmosphereTexture},
    ${({ theme }) => theme.colors.gradients.booking};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    min-block-size: max(
      36rem,
      calc(100svh - var(--journey-header-clearance) - var(--journey-header-gap))
    );
    padding-block: ${({ theme }) => theme.spacing.lg};
  }
`

const BookingContainer = styled(Container)``

const JourneyStatus = styled.span`
  position: fixed;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
`
