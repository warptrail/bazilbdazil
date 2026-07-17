import { Link, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { ModeSwitch } from './components/ModeSwitch'
import { BookingExperience } from './components/booking/BookingExperience'
import { LandingPage } from './components/landing/LandingPage'
import { ObservatoryField } from './components/landing/ObservatoryField'
import { GlobalStyles } from './styles/GlobalStyles'
import { Container, PageShell, RitualLabel, SkipLink, focusVisible } from './styles/primitives'

function BookingPage() {
  return (
    <>
      <SkipLink href="#booking-main">Skip to booking</SkipLink>
      <BookingPageMain id="booking-main" tabIndex="-1">
        <ObservatoryField />
        <BookingPageContainer>
          <BookingPageHeader>
            <HomeLink to="/">
              <HomeGlyph aria-hidden="true">↢</HomeGlyph>
              Back to Bazil Bacchanalia Dazil
            </HomeLink>
            <BookingPageActions>
              <BookingContext>Tarot · ritual · drag performance</BookingContext>
              <ModeSwitch compact />
            </BookingPageActions>
          </BookingPageHeader>

          <BookingExperience
            id="booking-calendar"
            label="Booking"
            title="Choose a time for the work."
            description="Review the available options in the calendar. Nothing is confirmed until you complete the booking."
            headingAs="h1"
            compact
          />
        </BookingPageContainer>
      </BookingPageMain>
    </>
  )
}

function App() {
  return (
    <>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
      </Routes>
    </>
  )
}

const BookingPageMain = styled(PageShell).attrs({ as: 'main' })`
  isolation: isolate;
  background:
    ${({ theme }) => theme.colors.gradients.auroraVeil},
    ${({ theme }) => theme.colors.gradients.atmosphereTexture},
    ${({ theme }) => theme.colors.background.canvas};
`

const BookingPageContainer = styled(Container)`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing['4xl']};
  padding-top: calc(
    ${({ theme }) => theme.spacing.xl} + ${({ theme }) => theme.layout.safeArea.top}
  );
  padding-right: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.right}
  );
  padding-bottom: calc(
    ${({ theme }) => theme.layout.sectionBlockCompact} + ${({ theme }) => theme.layout.safeArea.bottom}
  );
  padding-left: max(
    ${({ theme }) => theme.spacing.sectionX},
    ${({ theme }) => theme.layout.safeArea.left}
  );
`

const BookingPageHeader = styled.header`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    ${({ theme }) => theme.colors.gradients.spectralWash},
    ${({ theme }) => theme.colors.gradients.glassPanel};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  backdrop-filter: blur(1rem) saturate(1.2);

  &::before {
    content: '';
    position: absolute;
    inset: ${({ theme }) => theme.spacing.sm};
    z-index: -1;
    border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.etched};
    pointer-events: none;
  }

  &::after {
    content: '☉';
    position: absolute;
    right: ${({ theme }) => theme.spacing.lg};
    bottom: -1.4rem;
    z-index: -1;
    color: ${({ theme }) => theme.colors.accent.metalBright};
    font-family: ${({ theme }) => theme.typography.fontFamily.serif};
    font-size: 5rem;
    opacity: 0.1;
    pointer-events: none;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    flex-direction: row;
    align-items: center;
  }

  @media (forced-colors: active) {
    border-color: CanvasText;
    background: Canvas;
    box-shadow: none;
    backdrop-filter: none;

    &::before,
    &::after {
      display: none;
    }
  }
`

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  color: ${({ theme }) => theme.colors.text.navigation};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  ${focusVisible}
  transition: color ${({ theme }) => theme.transitions.fast};

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.accent.acid};

      span {
        border-color: ${({ theme }) => theme.colors.border.strong};
        color: ${({ theme }) => theme.colors.accent.acid};
        transform: rotate(-14deg);
      }
    }
  }
`

const HomeGlyph = styled.span`
  display: grid;
  place-items: center;
  width: 2.25rem;
  aspect-ratio: 1;
  margin-right: ${({ theme }) => theme.spacing.md};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.metalBright};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  box-shadow: ${({ theme }) => theme.shadows.filigree};
  transition:
    transform ${({ theme }) => theme.transitions.ritual},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${({ theme }) => theme.motion.duration.reduced};
  }
`

const BookingContext = styled(RitualLabel)`
  color: ${({ theme }) => theme.colors.text.bodyMuted};
`

const BookingPageActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export default App
