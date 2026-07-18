import { useId } from 'react'
import styled, { css } from 'styled-components'
import { CalBookingEmbed } from '../landing/CalBookingEmbed'
import {
  BodyCopy,
  CelestialDivider,
  Eyebrow,
  OrnatePanel,
  SigilBadge,
  SpectralHeading,
  focusVisible,
  labelText,
  sigilSpin,
} from '../../styles/primitives'

const calLink = import.meta.env.VITE_CAL_LINK || ''
const isDevelopment = import.meta.env.DEV
const calBookingHref = /^https?:\/\//i.test(calLink)
  ? calLink
  : `https://cal.com/${calLink.replace(/^\/+/, '')}`

export function BookingExperience({
  id,
  label = 'Booking',
  title = 'Choose a time for the work.',
  description = 'Review the available options in the calendar. Nothing is confirmed until you complete the booking.',
  compact = false,
  headingAs = 'h2',
}) {
  const generatedId = useId().replaceAll(':', '')
  const headingId = `${id || 'booking'}-title-${generatedId}`

  return (
    <BookingShell id={id} aria-labelledby={headingId} $compact={compact}>
      <BookingIntro $compact={compact}>
        <BookingHeadingRail>
          <BookingSigil aria-hidden="true">✦</BookingSigil>
          <BookingLabel>{label}</BookingLabel>
        </BookingHeadingRail>
        <BookingTitle as={headingAs} id={headingId}>
          {title}
        </BookingTitle>
        <BookingText>{description}</BookingText>
        <BookingDivider aria-hidden="true" />
        <BookingAstrolabe aria-hidden="true" $compact={compact}>
          <AstrolabeOrbit $orbit="outer" />
          <AstrolabeOrbit $orbit="middle" />
          <AstrolabeOrbit $orbit="inner" />
          <AstrolabeAxis />
          <AstrolabeCore>☾</AstrolabeCore>
        </BookingAstrolabe>
      </BookingIntro>

      <BookingCard $compact={compact}>
        {calLink ? (
          <>
            <BookingProviderAnchor
              href={calBookingHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Open this booking calendar on Cal.com in a new tab"
            >
              Open on Cal.com
            </BookingProviderAnchor>
            <CalBookingEmbed calLink={calLink} compact={compact} />
          </>
        ) : isDevelopment ? (
          <>
            <SetupPanel>
              <SetupLabel>Development setup</SetupLabel>
              <SetupTitle>Connect the booking calendar.</SetupTitle>
              <SetupText>
                Add the Cal.com event path to <InlineCode>.env</InlineCode>, then reload the app.
              </SetupText>
              <SetupCode>VITE_CAL_LINK=your-cal-username/60min</SetupCode>
            </SetupPanel>
            <BookingMeta>Calendar preview unavailable until configured</BookingMeta>
          </>
        ) : (
          <UnavailablePanel>
            <SetupTitle>Online scheduling is unavailable here.</SetupTitle>
            <SetupText>The booking calendar is not connected on this page.</SetupText>
          </UnavailablePanel>
        )}
      </BookingCard>
    </BookingShell>
  )
}

const BookingShell = styled.section`
  position: relative;
  isolation: isolate;
  display: grid;
  gap: ${({ theme }) => theme.spacing['4xl']};
  scroll-margin-top: ${({ theme }) => theme.layout.scrollMargin};

  ${({ $compact, theme }) =>
    $compact &&
    css`
      gap: clamp(${theme.spacing.lg}, 2.4vw, ${theme.spacing['3xl']});

    `}

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    grid-template-columns: ${({ $compact }) =>
      $compact ? 'minmax(15rem, 0.34fr) minmax(0, 1fr)' : 'minmax(18rem, 0.38fr) minmax(0, 1fr)'};
    align-items: start;
  }
`

const BookingIntro = styled.div`
  position: relative;
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ $compact, theme }) =>
    $compact &&
    css`
      gap: ${theme.spacing.sm};
    `}

  @media (max-width: 1199px) {
    width: min(100%, 38rem);
    margin-inline: auto;
    justify-items: center;
    text-align: center;
  }
`

const BookingHeadingRail = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const BookingSigil = styled(SigilBadge)`
  width: 2.35rem;
  color: ${({ theme }) => theme.colors.accent.acid};
`

const BookingLabel = styled(Eyebrow)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`

const BookingTitle = styled(SpectralHeading).attrs({
  $font: 'serif',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})`
  max-width: ${({ theme }) => theme.layout.proseWidth};
`

const BookingText = styled(BodyCopy).attrs({
  $maxWidth: '28rem',
  $size: 'body',
})`
  @media (max-width: 1199px) {
    margin-inline: auto;
  }
`

const BookingDivider = styled(CelestialDivider)`
  width: min(100%, 18rem);
  margin: ${({ theme }) => theme.spacing.lg} 0 0;

  @media (max-width: 1199px) {
    margin-inline: auto;
  }
`

const BookingAstrolabe = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: min(15rem, 60vw);
  aspect-ratio: 1;
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.orbital};
  background:
    ${({ theme }) => theme.colors.gradients.sacredHalo},
    radial-gradient(circle, ${({ theme }) => theme.colors.effects.violetGlowSoft}, transparent 66%);
  box-shadow: ${({ theme }) => theme.shadows.celestial};
  animation: ${sigilSpin} ${({ theme }) => theme.motion.duration.orbit}
    ${({ theme }) => theme.motion.easing.ambient} infinite;

  ${({ $compact, theme }) =>
    $compact &&
    css`
      width: min(11rem, 40vw);
      margin-top: ${theme.spacing.md};
    `}

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    width: min(11rem, 48vw);

    ${({ $compact }) =>
      $compact &&
      css`
        display: none;
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (forced-colors: active) {
    background: Canvas;
    box-shadow: none;
  }
`

const AstrolabeOrbit = styled.span`
  position: absolute;
  width: ${({ $orbit }) => ($orbit === 'outer' ? '88%' : $orbit === 'middle' ? '62%' : '36%')};
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $orbit }) =>
      $orbit === 'middle' ? theme.colors.border.spectral : theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.orbital};

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 0.4rem;
    aspect-ratio: 1;
    border-radius: inherit;
    background: ${({ theme, $orbit }) =>
      $orbit === 'inner' ? theme.colors.accent.acid : theme.colors.accent.metalBright};
    box-shadow: 0 0 0.8rem ${({ theme }) => theme.colors.effects.goldGlow};
  }

  &::before {
    top: 50%;
    left: -0.2rem;
  }

  &::after {
    top: 50%;
    right: -0.2rem;
  }
`

const AstrolabeAxis = styled.span`
  position: absolute;
  width: 92%;
  height: ${({ theme }) => theme.borders.width.thin};
  background: ${({ theme }) => theme.colors.gradients.goldLine};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    transform: rotate(90deg);
  }
`

const AstrolabeCore = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.atmosphere};
  display: grid;
  place-items: center;
  width: 2.8rem;
  aspect-ratio: 1;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigreeBright};
  border-radius: ${({ theme }) => theme.radii.orbital};
  color: ${({ theme }) => theme.colors.accent.metalPale};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: ${({ theme }) => theme.shadows.metalHover};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`

const BookingCard = styled(OrnatePanel).attrs({
  as: 'div',
  $radius: 'xl',
  $variant: 'raised',
  $interactive: true,
})`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md};

  ${({ $compact, theme }) =>
    $compact &&
    css`
      box-shadow:
        ${theme.shadows.surfaceInset},
        0 0 1.5rem ${theme.colors.effects.violetGlowSoft};
    `}

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`

const BookingProviderAnchor = styled.a`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
  display: inline-flex;
  align-self: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.filigree};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.accent.metalPale};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  box-shadow: ${({ theme }) => theme.shadows.filigree};
  white-space: nowrap;
  ${labelText}
  ${focusVisible}
  transition:
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.base};

  &::before {
    content: '✦';
    color: ${({ theme }) => theme.colors.accent.acid};
    filter: drop-shadow(0 0 0.45rem ${({ theme }) => theme.colors.effects.acidGlow});
  }

  &::after {
    content: '↗';
    color: ${({ theme }) => theme.colors.accent.signal};
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
      border-color: ${({ theme }) => theme.colors.border.filigreeBright};
      box-shadow: ${({ theme }) => theme.shadows.metalHover};
    }
  }

  @media (forced-colors: active) {
    border-color: LinkText;
    color: LinkText;
    background: Canvas;
    box-shadow: none;

    &::before,
    &::after {
      color: LinkText;
      filter: none;
    }
  }
`

const SetupPanel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.background.surface};
  box-shadow: ${({ theme }) => theme.shadows.surfaceInset};
`

const UnavailablePanel = styled(SetupPanel)`
  border-color: ${({ theme }) => theme.colors.border.violet};
`

const SetupLabel = styled(Eyebrow)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  color: ${({ theme }) => theme.colors.accent.signal};
`

const SetupTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
`

const SetupText = styled(BodyCopy).attrs({
  as: 'p',
  $size: 'body',
})``

const InlineCode = styled.code`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background.surfacePressed};
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`

const SetupCode = styled.pre`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.body};
`

const BookingMeta = styled(Eyebrow)`
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.bodySoft};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
`
