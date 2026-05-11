import styled from 'styled-components'

export function HeroSection({ id, content, imageSrc, imageAlt }) {
  return (
    <HeroSectionRoot id={id}>
      <HeroTextColumn>
        <HeroEyebrow>{content.eyebrow}</HeroEyebrow>
        <HeroLead>{content.lead}</HeroLead>
        <HeroHeadlineGroup aria-label={`${content.headlineTop} ${content.headlineMiddle} ${content.headlineBottom}`}>
          <HeroHeadlinePrimary>{content.headlineTop}</HeroHeadlinePrimary>
          <HeroHeadlineSecondary>{content.headlineMiddle}</HeroHeadlineSecondary>
          <HeroHeadlinePrimary>{content.headlineBottom}</HeroHeadlinePrimary>
        </HeroHeadlineGroup>
        <HeroDetail>{content.detail}</HeroDetail>
      </HeroTextColumn>

      <HeroImageColumn>
        <HeroImageFrame>
          <HeroImage src={imageSrc} alt={imageAlt} />
        </HeroImageFrame>
      </HeroImageColumn>
    </HeroSectionRoot>
  )
}

const HeroSectionRoot = styled.section`
  display: grid;
  gap: 2rem;
  padding: 1rem 1rem 2.25rem;

  @media (min-width: 768px) {
    gap: 3rem;
    padding: 0.5rem 2rem 3rem;
  }

  @media (min-width: 1100px) {
    align-items: center;
    grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
    gap: 1.25rem;
    padding: 1.5rem 2.75rem 4rem;
  }

  @media (min-width: 1400px) {
    gap: 2rem;
    padding-inline: 3.5rem;
  }
`

const HeroTextColumn = styled.div`
  display: grid;
  align-content: center;
  gap: 1rem;
`

const HeroEyebrow = styled.p`
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(45, 32, 27, 0.48);
`

const HeroLead = styled.p`
  max-width: 28rem;
  margin: 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(1.15rem, 2.5vw, 1.6rem);
  line-height: 1.28;
  color: #231815;
`

const HeroHeadlineGroup = styled.div`
  display: grid;
  gap: 0.15rem;
`

const HeroHeadlinePrimary = styled.h1`
  margin: 0;
  font-size: clamp(4.4rem, 13vw, 10.8rem);
  line-height: 0.84;
  font-weight: 400;
  letter-spacing: -0.085em;
  color: #111111;
`

const HeroHeadlineSecondary = styled.h2`
  margin: 0;
  font-size: clamp(1.85rem, 5vw, 4.55rem);
  line-height: 0.88;
  font-weight: 400;
  letter-spacing: -0.08em;
  color: #111111;
`

const HeroDetail = styled.p`
  max-width: 29rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(45, 32, 27, 0.72);
`

const HeroImageColumn = styled.div`
  display: grid;
  justify-items: center;

  @media (min-width: 1100px) {
    justify-items: end;
  }
`

const HeroImageFrame = styled.div`
  width: min(100%, 36rem);
  padding: 1rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.68) 100%);
  box-shadow: 0 20px 46px rgba(41, 29, 21, 0.08);

  @media (min-width: 768px) {
    width: min(100%, 43rem);
    padding: 1.35rem;
  }

  @media (min-width: 1100px) {
    width: min(100%, 52rem);
  }
`

const HeroImage = styled.img`
  width: 100%;
  aspect-ratio: 1010 / 1020;
  object-fit: cover;
  box-shadow: 0 18px 42px rgba(17, 17, 17, 0.08);
`
