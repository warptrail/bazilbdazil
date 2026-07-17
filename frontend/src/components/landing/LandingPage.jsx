import styled from 'styled-components'
import { BookingExperience } from '../booking/BookingExperience'
import { landingContentByMode } from '../../content/landingContent'
import { useExperienceMode } from '../../context/useExperienceMode'
import { Container, PageShell, SkipLink } from '../../styles/primitives'
import { AboutSection } from './AboutSection'
import { ApproachSection } from './ApproachSection'
import { Footer } from './Footer'
import { GallerySection } from './GallerySection'
import { Header, PracticeStrip } from './Header'
import { HeroSection } from './HeroSection'
import { ObservatoryField } from './ObservatoryField'
import { OfferingsSection } from './OfferingsSection'

export function LandingPage() {
  const { mode, isClownMode } = useExperienceMode()
  const landingContent = landingContentByMode[mode]

  return (
    <LandingShell>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <ObservatoryField showModeControl />
      <PracticeStrip text={landingContent.practiceStrip} />
      <Header navigation={landingContent.navigation} />

      <MainContent id="main-content" tabIndex="-1">
        <HeroSection content={landingContent.hero} isClownMode={isClownMode} />
        <AboutSection content={landingContent.about} />
        <OfferingsSection content={landingContent.offerings} />
        <ApproachSection content={landingContent.approach} />
        {landingContent.gallery ? <GallerySection content={landingContent.gallery} /> : null}

        <BookingRegion>
          <BookingContainer>
            <BookingExperience
              id="book"
              label={landingContent.booking.label}
              title={landingContent.booking.title}
              description={landingContent.booking.description}
            />
          </BookingContainer>
        </BookingRegion>
      </MainContent>

      <Footer
        navigation={landingContent.navigation}
        signoff={landingContent.footer.signoff}
      />
    </LandingShell>
  )
}

const LandingShell = styled(PageShell)`
  isolation: isolate;
  overflow: clip;
  background: ${({ theme }) => theme.colors.background.canvas};
`

const MainContent = styled.main`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};

  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const BookingRegion = styled.div`
  position: relative;
  isolation: isolate;
  padding-block: ${({ theme }) => theme.layout.sectionBlock};
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
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

  &::before,
  &::after {
    content: '✦  ·  ☾  ·  ✦';
    position: absolute;
    left: 50%;
    z-index: ${({ theme }) => theme.zIndex.atmosphere};
    padding-inline: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.accent.metalBright};
    background: ${({ theme }) => theme.colors.background.canvas};
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.ceremonial};
    transform: translateX(-50%);
  }

  &::before {
    top: -0.55rem;
  }

  &::after {
    bottom: -0.55rem;
  }

  @media (forced-colors: active) {
    background: Canvas;

    &::before,
    &::after {
      display: none;
    }
  }
`

const BookingContainer = styled(Container)``
