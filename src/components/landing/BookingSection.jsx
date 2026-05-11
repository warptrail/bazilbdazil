import styled from 'styled-components'

export function BookingSection({ content }) {
  return (
    <BookingSectionRoot id="book">
      <BookingCopy>
        <BookingLabel>{content.label}</BookingLabel>
        <BookingTitle>{content.title}</BookingTitle>
        <BookingDescription>{content.description}</BookingDescription>
      </BookingCopy>

      <BookingPanel>
        <BookingPanelHeader>
          <BookingPanelEyebrow>Cal.com Embed</BookingPanelEyebrow>
          <BookingPanelHint>Replace the URL prop with your live scheduling page.</BookingPanelHint>
        </BookingPanelHeader>
        <CalEmbedFrame
          src={content.calEmbedUrl}
          title="Cal.com booking embed"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </BookingPanel>
    </BookingSectionRoot>
  )
}

const BookingSectionRoot = styled.section`
  display: grid;
  gap: 1.75rem;
  padding: 2rem 1rem 2.5rem;
  border-top: 1px solid rgba(29, 20, 17, 0.08);

  @media (min-width: 768px) {
    gap: 2.5rem;
    padding: 3rem 2rem 3.5rem;
  }

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    align-items: start;
    gap: 2.75rem;
    padding: 4rem 2.75rem 4.5rem;
  }

  @media (min-width: 1400px) {
    padding-inline: 3.5rem;
  }
`

const BookingCopy = styled.div`
  display: grid;
  gap: 0.95rem;
`

const BookingLabel = styled.p`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(45, 32, 27, 0.48);
`

const BookingTitle = styled.h2`
  max-width: 24rem;
  margin: 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 0.98;
  font-weight: 400;
  letter-spacing: -0.05em;
  color: #1f1512;
`

const BookingDescription = styled.p`
  max-width: 30rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(45, 32, 27, 0.78);
`

const BookingPanel = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(29, 20, 17, 0.1);
  border-radius: 1.45rem;
  background: rgba(255, 255, 255, 0.64);
  box-shadow: 0 16px 36px rgba(41, 29, 21, 0.08);

  @media (min-width: 768px) {
    padding: 1.25rem;
  }
`

const BookingPanelHeader = styled.div`
  display: grid;
  gap: 0.35rem;
`

const BookingPanelEyebrow = styled.p`
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(45, 32, 27, 0.55);
`

const BookingPanelHint = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(45, 32, 27, 0.72);
`

const CalEmbedFrame = styled.iframe`
  width: 100%;
  min-height: 42rem;
  border: 0;
  border-radius: 1rem;
  background: #ffffff;

  @media (min-width: 768px) {
    min-height: 48rem;
  }
`
