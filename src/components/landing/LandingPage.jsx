import styled from 'styled-components'
import portraitImage from '../../assets/portrait-crop.jpg'
import { Header } from './Header'
import { AboutSection } from './AboutSection'
import { BookingSection } from './BookingSection'
import { HeroSection } from './HeroSection'
import { ParallaxStorySection } from './ParallaxStorySection'

const navigationItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'RITUAL', href: '#ritual' },
  { label: 'BOOK', href: '#book' },
]

const heroContent = {
  eyebrow: 'Tarot Readings',
  lead: 'Intuitive tarot readings for crossroads, creative reinvention, and honest clarity.',
  headlineTop: 'BAZIL',
  headlineMiddle: 'BACCHANALIA',
  headlineBottom: 'DAZIL',
  detail:
    'A single-page tarot salon shaped for presence, mystery, and direct booking without clutter.',
}

const aboutContent = {
  label: 'About',
  title: 'Readings that feel grounded, theatrical, and deeply personal.',
  paragraphs: [
    'This practice blends tarot, intuition, and conversation into sessions that help you name what is shifting beneath the surface.',
    'Whether you are navigating grief, love, creative work, or reinvention, the reading is built to leave you with language, momentum, and a sharper sense of what comes next.',
  ],
  notes: [
    '60-minute live readings',
    'Creative and spiritual crossroads',
    'Follow-up integration notes available',
  ],
}

const ritualSteps = [
  {
    index: '01',
    title: 'Arrive',
    text: 'We begin with your question, the emotional weather around it, and the real tension you want the cards to speak to.',
  },
  {
    index: '02',
    title: 'Interpret',
    text: 'The spread opens into symbol, pattern, timing, and contradiction so the reading becomes specific instead of vague reassurance.',
  },
  {
    index: '03',
    title: 'Integrate',
    text: 'We close by naming the clearest action, the core truth to hold onto, and the invitation the cards are leaving with you.',
  },
]

const bookingContent = {
  label: 'Book A Session',
  title: 'Reserve a reading directly from the page.',
  description:
    'The booking block below is ready for a Cal.com link. Swap the URL with your live schedule when you are ready.',
  calEmbedUrl: 'https://cal.com/embed',
}

export function LandingPage() {
  return (
    <PageShell>
      <AuraLeft />
      <AuraRight />
      <ContentFrame>
        <Header
          siteTitle="Bazil Dazil"
          floatingLabel="Tarot Salon"
          navigationItems={navigationItems}
          loginLabel="INQUIRE"
          ctaLabel="BOOK A READING"
        />

        <PageContent>
          <HeroSection
            id="home"
            imageAlt="Portrait of Bazil Dazil in layered jewelry and fur against a wooded background."
            imageSrc={portraitImage}
            content={heroContent}
          />

          <AboutSection content={aboutContent} />
          <ParallaxStorySection steps={ritualSteps} />
          <BookingSection content={bookingContent} />
        </PageContent>
      </ContentFrame>
    </PageShell>
  )
}

const PageShell = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  @media (min-width: 1280px) {
    padding: 2rem;
  }
`

const Aura = styled.div`
  position: fixed;
  z-index: 0;
  pointer-events: none;
  width: 22rem;
  height: 22rem;
  border-radius: 50%;
  filter: blur(24px);
  opacity: 0.42;
`

const AuraLeft = styled(Aura)`
  top: 12vh;
  left: -8rem;
  background: radial-gradient(circle, rgba(172, 108, 70, 0.22) 0%, rgba(172, 108, 70, 0) 72%);
`

const AuraRight = styled(Aura)`
  right: -6rem;
  bottom: 10vh;
  background: radial-gradient(circle, rgba(87, 88, 135, 0.18) 0%, rgba(87, 88, 135, 0) 72%);
`

const ContentFrame = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid rgba(29, 20, 17, 0.08);
  border-radius: 1.9rem;
  background:
    linear-gradient(180deg, rgba(255, 252, 247, 0.95) 0%, rgba(246, 239, 230, 0.98) 100%);
  box-shadow:
    0 28px 80px rgba(41, 29, 21, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);

  @media (min-width: 768px) {
    border-radius: 2.6rem;
  }
`

const PageContent = styled.main`
  display: grid;
`
