import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import clownImage from '../../assets/clown.png'
import { BookingExperience } from '../booking/BookingExperience'
import { AboutDossier } from './AboutDossier'
import { Footer } from './Footer'
import {
  BodyCopy,
  Card,
  Container,
  Divider,
  DisplayHeading,
  GhostButton,
  GlowOrb,
  NavLink,
  OrbitalBackdrop,
  PageShell,
  PrimaryButton,
  Section,
} from '../../styles/primitives'

const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Offerings', href: '#offerings' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Journal', href: '#journal' },
]

const pathways = [
  {
    id: 'tarot',
    label: 'Tarot',
    title: 'Tarot Readings',
    description:
      'Intuitive, insightful, and deeply personal guidance to illuminate your path.',
    cta: 'Explore readings',
    theme: 'rose',
  },
  {
    id: 'drag',
    label: 'Drag',
    title: 'Drag Performances',
    description:
      'Theatrical. Transformative. Unapologetically real. Let’s make magic.',
    cta: 'View upcoming shows',
    theme: 'indigo',
  },
]

const socialItems = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/yourhandle',
    iconHref: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/instagram.svg',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@yourhandle',
    iconHref: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/tiktok.svg',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@yourhandle',
    iconHref: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/youtube.svg',
  },
  {
    label: 'Linktree',
    href: 'https://linktr.ee/yourhandle',
    iconHref: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/linktree.svg',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/yourhandle',
    iconHref: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/facebook.svg',
  },
]

const HERO_SUPPORT_FADE_START = 0.24
const HERO_SUPPORT_FADE_END = 0.34
const HERO_SUBTITLE_START = 0.08
const HERO_SUBTITLE_SCROLL_RANGE = 0.72

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function LandingPage() {
  const heroStageRef = useRef(null)
  const [heroProgress, setHeroProgress] = useState(0)

  useEffect(() => {
    let isActive = true
    let frameId = 0

    const updateHeroMotion = () => {
      const heroStage = heroStageRef.current

      if (!heroStage) {
        return
      }

      const viewportHeight = window.innerHeight || 1
      const scrollTop =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      const travel = Math.max(heroStage.offsetHeight - viewportHeight, 1)
      const progress = clamp((scrollTop - heroStage.offsetTop) / travel, 0, 1)
      const roundedProgress = Number(progress.toFixed(4))

      setHeroProgress((current) => {
        if (current === roundedProgress) {
          return current
        }

        return roundedProgress
      })
    }

    const syncHeroMotion = () => {
      updateHeroMotion()

      if (!isActive) {
        return
      }

      frameId = window.requestAnimationFrame(syncHeroMotion)
    }

    syncHeroMotion()

    return () => {
      isActive = false

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  const supportFadeProgress = clamp(
    (heroProgress - HERO_SUPPORT_FADE_START) /
      (HERO_SUPPORT_FADE_END - HERO_SUPPORT_FADE_START),
    0,
    1,
  )
  const subtitleProgress = clamp(
    (heroProgress - HERO_SUBTITLE_START) /
      (HERO_SUBTITLE_SCROLL_RANGE - HERO_SUBTITLE_START),
    0,
    1,
  )

  return (
    <LandingShell>
      <Frame>
        <HeroStage id="home" ref={heroStageRef}>
          <HeroViewport>
            <HeroHeader>
              <BrandRow>
                <TopMark aria-hidden="true">✶</TopMark>
                <Brand href="#home">Bazil Bacchanalia Dazil</Brand>
                <TopMark aria-hidden="true">✶</TopMark>
              </BrandRow>

              <Nav aria-label="Primary navigation">
                {navigationItems.map((item) =>
                  item.to ? (
                    <NavRouteLink key={item.label} to={item.to}>
                      {item.label}
                    </NavRouteLink>
                  ) : (
                    <NavAnchor key={item.label} href={item.href}>
                      {item.label}
                    </NavAnchor>
                  ),
                )}
              </Nav>

              <HeaderAction href="#book">Book A Session</HeaderAction>
            </HeroHeader>

            <HeroCanvas>
              <HeroCopy>
                <HeroTitle as="h1">
                  <HeroTitleLine>Tarot</HeroTitleLine>
                  <HeroTitleLine>For The</HeroTitleLine>
                  <AccentLine>Divine</AccentLine>
                  <AccentLine>Masculine.</AccentLine>
                </HeroTitle>

                <HeroRule $width="8.4rem" />

                <HeroSupportBlock $fadeProgress={supportFadeProgress}>
                    <HeroDescription $scrollProgress={subtitleProgress}>
                      Intuitive readings, ritual, and drag performance to help you navigate
                      the mysteries between worlds.
                    </HeroDescription>

                    <HeroActions>
                      <HeroPrimaryAction href="#book">
                        Book Your Session Now <ActionGlyph>✶</ActionGlyph>
                      </HeroPrimaryAction>
                      <HeroMetaLinks>
                        <MetaLink href="#offerings">Tarot Readings</MetaLink>
                        <MetaDivider aria-hidden="true">✶</MetaDivider>
                        <MetaLink href="#offerings">Drag Performances</MetaLink>
                      </HeroMetaLinks>
                    </HeroActions>
                </HeroSupportBlock>
              </HeroCopy>

              <HeroArtwork aria-hidden="true">
                <AuraRing />
                <HeroClownWrapper>
                  <HeroClownGlow />
                  <HeroClownImage src={clownImage} alt="" />
                </HeroClownWrapper>
                <NebulaGlow />
              </HeroArtwork>
            </HeroCanvas>

            <HeroScrollCue>Scroll to cross the threshold</HeroScrollCue>
          </HeroViewport>
        </HeroStage>

        <OfferingsSection id="offerings">
          <OfferingsGrid>
            {pathways.map((path) => (
              <OfferingCard key={path.id} $theme={path.theme}>
                <OfferingImage $variant={path.id} aria-hidden="true" />
                <OfferingOverlay />
                <OfferingInner>
                  <OfferingCrest aria-hidden="true">{path.theme === 'rose' ? '☾' : '✶'}</OfferingCrest>
                  <OfferingTitleBlock>
                    <OfferingTitleMain $theme={path.theme}>
                      {path.title.split(' ')[0]}
                    </OfferingTitleMain>
                    <OfferingTitleSub>{path.title.split(' ').slice(1).join(' ')}</OfferingTitleSub>
                  </OfferingTitleBlock>

                  <OfferingDescription>{path.description}</OfferingDescription>

                  <OfferingAction href="#book" $theme={path.theme}>
                    {path.cta} <ActionGlyph>✶</ActionGlyph>
                  </OfferingAction>
                </OfferingInner>
              </OfferingCard>
            ))}
          </OfferingsGrid>

        </OfferingsSection>

        <AboutDossier />

        <SocialBarSection id="gallery" aria-label="Social links">
          <SocialBar>
            {socialItems.map((item) => (
              <SocialIconLink
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
              >
                <SocialIcon src={item.iconHref} alt="" loading="lazy" />
              </SocialIconLink>
            ))}
          </SocialBar>
        </SocialBarSection>

        <CalSection id="book">
          <BookingExperience
            label="Booking Calendar"
            title="Reserve the session or appearance here."
            description="The Cal.com booking experience lives below the hero and offering panels. Homepage calls to action jump straight here once visitors cross through the opening banner."
          />
        </CalSection>

        <Footer />
      </Frame>
    </LandingShell>
  )
}

const LandingShell = styled(PageShell)``

const Frame = styled(Container)`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.frame};
`

const HeroStage = styled(Section)`
  min-height: calc(100dvh + 36rem);
`

const HeroViewport = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  align-content: start;
  min-height: 100dvh;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  background: ${({ theme }) => theme.colors.gradients.hero};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 22%, ${({ theme }) => theme.colors.effects.starlight} 0 0.08rem, transparent 0.09rem),
      radial-gradient(circle at 36% 18%, ${({ theme }) => theme.colors.effects.moonlightSoft} 0 0.06rem, transparent 0.07rem),
      radial-gradient(circle at 62% 27%, ${({ theme }) => theme.colors.effects.starlightSoft} 0 0.05rem, transparent 0.06rem),
      radial-gradient(circle at 82% 12%, ${({ theme }) => theme.colors.effects.moonlight} 0 0.07rem, transparent 0.08rem),
      radial-gradient(circle at 74% 42%, ${({ theme }) => theme.colors.effects.starlightSoft} 0 0.05rem, transparent 0.06rem),
      radial-gradient(circle at 46% 36%, ${({ theme }) => theme.colors.effects.moonlightSoft} 0 0.04rem, transparent 0.05rem);
    opacity: 0.8;
    pointer-events: none;
  }
`

const HeroHeader = styled.header`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  padding: 1.3rem 0 1rem;

  @media (min-width: 1180px) {
    grid-template-columns: auto 1fr auto;
    gap: ${({ theme }) => theme.spacing['4xl']};
    padding: 1.55rem 0 1.1rem;
  }
`

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const TopMark = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  font-size: 0.95rem;
`

const Brand = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: clamp(1.75rem, 2.3vw, 2.4rem);
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  line-height: 0.94;
  text-transform: uppercase;
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem 1.7rem;

  @media (min-width: 1180px) {
    justify-content: center;
  }
`

const NavAnchor = styled(NavLink)``

const NavRouteLink = styled(NavLink).attrs({
  as: Link,
})``

const HeaderAction = styled(PrimaryButton)`
  min-height: 3.2rem;
  padding: 0.8rem 1.45rem;
`

const HeroCanvas = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  display: grid;
  align-items: stretch;
  gap: 1.6rem;
  padding: 1rem 0 6rem;

  @media (min-width: 1100px) {
    grid-template-columns: minmax(18rem, 29rem) minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
    padding: 1rem 0 ${({ theme }) => theme.spacing.heroBottom};
  }
`

const HeroCopy = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: grid;
  align-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 26rem;
  padding-top: clamp(2rem, 10vh, 5.5rem);
`

const HeroTitle = styled(DisplayHeading)`
  span {
    display: block;
  }
`

const HeroTitleLine = styled.span`
  display: block;
`

const AccentLine = styled(HeroTitleLine)`
  color: ${({ theme }) => theme.colors.accent.acid};
`

const HeroRule = styled(Divider)`
  margin-top: 0.4rem;
`

const HeroDescription = styled(BodyCopy).attrs({
  $maxWidth: '18rem',
  $size: 'body',
  $lineHeight: 'body',
  $tracking: 'bodyWide',
  $caps: true,
})`
  color: rgba(228, 242, 235, 0.84);
  font-size: clamp(1rem, 1.25vw, 1.18rem);
  transform-origin: left center;
  will-change: transform, opacity;
  transition:
    transform 140ms linear,
    opacity 140ms linear;

  @media (min-width: 1100px) {
    opacity: ${({ $scrollProgress }) => 1 - $scrollProgress * 0.18};
    transform: ${({ $scrollProgress }) =>
      `translate3d(${($scrollProgress * 19).toFixed(3)}vw, ${(-$scrollProgress * 0.4).toFixed(3)}rem, 0) scale(${(1 - $scrollProgress * 0.15).toFixed(3)})`};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
    opacity: 1;
  }
`

const HeroSupportBlock = styled.div`
  display: grid;
  justify-items: start;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: clamp(12.5rem, 24vh, 15.5rem);
  opacity: ${({ $fadeProgress }) => 1 - $fadeProgress};
  transition: opacity ${({ theme }) => theme.transitions.base};

  @media (min-width: 1100px) {
    pointer-events: ${({ $fadeProgress }) => ($fadeProgress >= 1 ? 'none' : 'auto')};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const HeroActions = styled.div`
  display: grid;
  justify-items: start;
  gap: 0.9rem;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const HeroPrimaryAction = styled(GhostButton)`
  min-height: 3.55rem;
  padding: 0.85rem 1.45rem;
  letter-spacing: 0.08em;
`

const ActionGlyph = styled.em`
  font-style: normal;
  color: ${({ theme }) => theme.colors.accent.acidSoft};
`

const HeroMetaLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`

const MetaLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.accent.acid};
  font-size: 0.82rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.editorial};
`

const MetaDivider = styled.span`
  color: ${({ theme }) => theme.colors.accent.acid};
  font-size: 0.82rem;
`

const HeroArtwork = styled.div`
  position: relative;
  min-height: 28rem;
  overflow: hidden;

  @media (min-width: 1100px) {
    min-height: calc(100dvh - 11rem);
  }
`

const AuraRing = styled(OrbitalBackdrop)`
  top: 6%;
  right: 16%;
  inset: auto;
  width: min(54rem, 92%);
  aspect-ratio: 1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(141, 255, 69, 0.18);
  }

  &::before {
    inset: 8%;
  }

  &::after {
    inset: 18%;
    border-color: rgba(186, 145, 255, 0.14);
  }
`

const HeroClownWrapper = styled.div`
  position: absolute;
  right: max(0.4rem, env(safe-area-inset-right));
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.content};
  width: clamp(18rem, 34vw, 35rem);
  aspect-ratio: 3619 / 5067;
  isolation: isolate;
  filter: drop-shadow(${({ theme }) => theme.shadows.portrait});

  @media (max-width: 1099px) {
    width: min(28rem, 96%);
    max-height: clamp(20rem, 52vh, 30rem);
    opacity: 0.72;
  }

  @media (min-width: 1100px) {
    right: max(-0.6rem, env(safe-area-inset-right));
    width: clamp(24rem, 38vw, 40rem);
  }
`

const HeroClownGlow = styled(GlowOrb).attrs({
  $background:
    'radial-gradient(circle at 42% 28%, rgba(163, 91, 231, 0.46) 0%, rgba(163, 91, 231, 0.24) 26%, rgba(163, 91, 231, 0) 58%), radial-gradient(circle at 64% 54%, rgba(141, 255, 69, 0.28) 0%, rgba(141, 255, 69, 0.16) 24%, rgba(141, 255, 69, 0) 48%)',
})`
  left: 8%;
  right: 6%;
  bottom: 8%;
  top: 10%;
  width: auto;
  height: auto;
  opacity: 0.9;
`

const HeroClownImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 50% 100%;
  opacity: 0.94;
  filter: contrast(1.02);

  @media (max-width: 1099px) {
    object-position: 50% 100%;
    opacity: 0.58;
  }

  @media (min-width: 1100px) {
    object-position: 50% 100%;
  }
`

const NebulaGlow = styled(GlowOrb).attrs({
  $background:
    'radial-gradient(circle at 30% 36%, rgba(164, 96, 231, 0.44) 0%, rgba(164, 96, 231, 0.22) 18%, rgba(164, 96, 231, 0) 42%), radial-gradient(circle at 67% 62%, rgba(141, 255, 69, 0.34) 0%, rgba(141, 255, 69, 0.16) 18%, rgba(141, 255, 69, 0) 40%), radial-gradient(circle at 42% 72%, rgba(219, 204, 255, 0.18) 0%, rgba(219, 204, 255, 0) 24%)',
})`
  right: 8%;
  bottom: 10%;
  width: min(34rem, 68%);
  height: min(34rem, 54%);
`

const HeroScrollCue = styled.div`
  position: absolute;
  left: 50%;
  bottom: 1.4rem;
  z-index: ${({ theme }) => theme.zIndex.content};
  transform: translateX(-50%);
  color: rgba(141, 255, 69, 0.78);
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

const OfferingsSection = styled(Section)`
  z-index: ${({ theme }) => theme.zIndex.content};
  padding-bottom: 1.6rem;
  margin-top: -18rem;

  @media (min-width: 1100px) {
    margin-top: -28rem;
  }
`

const OfferingsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const OfferingCard = styled(Card).attrs(({ $theme }) => ({
  $surface: $theme === 'rose' ? 'panelPlum' : 'panelTeal',
}))`
  min-height: 27rem;
  border-color: ${({ theme }) => theme.colors.border.orbital};
  border-radius: 0;
`

const OfferingImage = styled.div`
  position: absolute;
  inset: 0;
  background:
    ${({ $variant }) =>
      $variant === 'tarot'
        ? `
      radial-gradient(circle at 20% 76%, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0) 20%),
      radial-gradient(circle at 18% 28%, rgba(224, 205, 255, 0.12) 0%, rgba(224, 205, 255, 0) 16%),
      radial-gradient(circle at 72% 36%, rgba(175, 99, 240, 0.22) 0%, rgba(175, 99, 240, 0) 26%),
      linear-gradient(180deg, rgba(16, 9, 26, 0.36), rgba(9, 8, 13, 0.64)),
      linear-gradient(135deg, #2f1645, #120d1d)
    `
        : `
      radial-gradient(circle at 74% 26%, rgba(244, 255, 238, 0.12) 0%, rgba(244, 255, 238, 0) 15%),
      radial-gradient(circle at 70% 74%, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0) 21%),
      radial-gradient(circle at 36% 34%, rgba(141, 255, 69, 0.2) 0%, rgba(141, 255, 69, 0) 22%),
      linear-gradient(180deg, rgba(5, 15, 21, 0.24), rgba(5, 8, 13, 0.72)),
      linear-gradient(135deg, #102429, #05080d)
    `};
`

const OfferingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.gradients.cardOverlay};
`

const OfferingInner = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  display: grid;
  justify-items: start;
  align-content: center;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing['4xl']};
  text-align: left;
`

const OfferingCrest = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accent.acid};
  font-size: 3.2rem;
  line-height: 1;
`

const OfferingTitleBlock = styled.div`
  display: grid;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const OfferingTitleMain = styled.span`
  color: ${({ theme, $theme: cardTheme }) =>
    cardTheme === 'rose' ? theme.colors.accent.rose : theme.colors.accent.acid};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: clamp(3.2rem, 5.8vw, 5.6rem);
  line-height: 0.88;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  text-transform: uppercase;
`

const OfferingTitleSub = styled.span`
  color: ${({ theme }) => theme.colors.text.body};
  font-size: clamp(1.5rem, 2vw, 2rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

const OfferingDescription = styled(BodyCopy).attrs({
  $maxWidth: '18rem',
  $size: 'body',
  $lineHeight: 'relaxed',
})`
  margin-bottom: 1.8rem;
  color: rgba(237, 246, 240, 0.82);
`

const OfferingAction = styled(PrimaryButton)`
  border-color: transparent;
  background: ${({ theme, $theme: cardTheme }) =>
    cardTheme === 'rose' ? theme.colors.accent.violetButton : theme.colors.accent.acidSurface};
  color: ${({ theme }) => theme.colors.text.bodyStrong};
`

const SocialBarSection = styled(Section)`
  padding-bottom: 2rem;

  @media (min-width: 1100px) {
    padding-bottom: 2.2rem;
  }
`

const SocialBar = styled.div`
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 4.4rem));
  justify-content: center;
  gap: 1.25rem 1.45rem;

  @media (max-width: 760px) {
    grid-template-columns: repeat(6, minmax(0, 4.4rem));
  }

  @media (max-width: 760px) {
    & > a:nth-child(4) {
      grid-column: 2 / span 2;
    }

    & > a:nth-child(5) {
      grid-column: 4 / span 2;
    }
  }
`

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.4rem;
  grid-column: span 2;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-3px) scale(1.08);
    opacity: 1;
    filter: drop-shadow(${({ theme }) => theme.shadows.acidHover});
  }
`

const SocialIcon = styled.img`
  width: 2.8rem;
  height: 2.8rem;
  opacity: 0.92;
  filter: brightness(0) saturate(100%) invert(93%) sepia(11%) saturate(304%) hue-rotate(74deg)
    brightness(104%) contrast(95%);
`

const CalSection = styled(Section)`
  padding-top: 2rem;
  padding-bottom: 2.4rem;

  @media (min-width: 1100px) {
    padding-top: 2.2rem;
    padding-bottom: 2.6rem;
  }
`
