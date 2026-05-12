import styled from 'styled-components'
import { CalBookingEmbed } from '../landing/CalBookingEmbed'
import { BodyCopy, Card, DisplayHeading, Eyebrow } from '../../styles/primitives'

const calLink = import.meta.env.VITE_CAL_LINK || ''

export function BookingExperience({
  label = 'Booking Calendar',
  title = 'Reserve the session or appearance here.',
  description = 'Choose the time that fits, and the Cal experience will handle the rest.',
  compact = false,
}) {
  return (
    <BookingShell $compact={compact}>
      <BookingIntro>
        <BookingLabel>{label}</BookingLabel>
        <BookingTitle>{title}</BookingTitle>
        <BookingText>{description}</BookingText>
      </BookingIntro>

      <BookingCard>
        {calLink ? (
          <>
            <CalBookingEmbed calLink={calLink} />
            <BookingMeta>Powered by Cal.com</BookingMeta>
          </>
        ) : (
          <>
            <SetupCard>
              <SetupTitle>Cal.com link not configured yet.</SetupTitle>
              <SetupText>
                Create your event in Cal.com, then add the event path to <InlineCode>.env</InlineCode>.
              </SetupText>
              <SetupCode>VITE_CAL_LINK=your-cal-username/60min</SetupCode>
              <SetupText>
                Reload the app and this booking experience will switch to the live widget.
              </SetupText>
            </SetupCard>
            <BookingMeta>Using @calcom/embed-react</BookingMeta>
          </>
        )}
      </BookingCard>
    </BookingShell>
  )
}

const BookingShell = styled.section`
  display: grid;
  gap: 1.2rem;

  @media (min-width: 980px) {
    grid-template-columns: ${({ $compact }) =>
      $compact ? 'minmax(15rem, 0.34fr) minmax(0, 1fr)' : 'minmax(18rem, 0.38fr) minmax(0, 1fr)'};
    align-items: start;
  }
`

const BookingIntro = styled.div`
  display: grid;
  gap: 0.8rem;
`

const BookingLabel = styled(Eyebrow)``

const BookingTitle = styled(DisplayHeading).attrs({
  as: 'h2',
  $font: 'serif',
  $size: 'section',
  $lineHeight: 'heading',
  $tracking: 'brand',
})``

const BookingText = styled(BodyCopy).attrs({
  $maxWidth: '24rem',
  $size: 'base',
})``

const BookingCard = styled(Card).attrs({
  as: 'div',
  $radius: 'xl',
  $surface: 'booking',
  $shadow: 'card',
})`
  min-width: 0;
  padding: 1.2rem;
`

const SetupCard = styled.div`
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  border: 1px dashed ${({ theme }) => theme.colors.border.violet};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(14, 13, 24, 0.84);
`

const SetupTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: 1.22rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: 1.08;
`

const SetupText = styled(BodyCopy).attrs({
  as: 'p',
  $size: 'base',
})`
  line-height: 1.65;
`

const InlineCode = styled.code`
  padding: 0.12rem 0.42rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: rgba(141, 255, 69, 0.12);
  color: ${({ theme }) => theme.colors.accent.acidSoft};
`

const SetupCode = styled.pre`
  margin: 0;
  padding: 0.85rem 0.95rem;
  overflow-x: auto;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background.code};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.86rem;
  line-height: 1.5;
`

const BookingMeta = styled(Eyebrow)`
  margin-top: 0.95rem;
  color: rgba(141, 255, 69, 0.72);
  font-size: 0.76rem;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`
