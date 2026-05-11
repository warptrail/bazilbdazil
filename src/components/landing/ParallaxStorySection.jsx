import styled from 'styled-components'

export function ParallaxStorySection({ steps }) {
  return (
    <StorySectionRoot id="ritual">
      <StoryStickyColumn>
        <StoryStickyPanel>
          <StoryLabel>Session Flow</StoryLabel>
          <StoryTitle>Scroll through the ritual before you book.</StoryTitle>
          <StoryText>
            The section below uses stacked sticky cards to create a gentle parallax feel without turning the page into a gimmick.
          </StoryText>
        </StoryStickyPanel>
      </StoryStickyColumn>

      <StoryStepsColumn>
        {steps.map((step) => (
          <StoryStepCard key={step.index}>
            <StoryStepIndex>{step.index}</StoryStepIndex>
            <StoryStepTitle>{step.title}</StoryStepTitle>
            <StoryStepText>{step.text}</StoryStepText>
          </StoryStepCard>
        ))}
      </StoryStepsColumn>
    </StorySectionRoot>
  )
}

const StorySectionRoot = styled.section`
  display: grid;
  gap: 1.5rem;
  padding: 2rem 1rem;
  border-top: 1px solid rgba(29, 20, 17, 0.08);
  background:
    linear-gradient(180deg, rgba(248, 241, 233, 0.62) 0%, rgba(255, 252, 247, 0.12) 100%);

  @media (min-width: 768px) {
    padding: 3rem 2rem 3.5rem;
  }

  @media (min-width: 1100px) {
    grid-template-columns: minmax(18rem, 0.78fr) minmax(0, 1.22fr);
    gap: 2.5rem;
    padding: 4rem 2.75rem 5rem;
  }

  @media (min-width: 1400px) {
    padding-inline: 3.5rem;
  }
`

const StoryStickyColumn = styled.div`
  @media (min-width: 1100px) {
    position: relative;
  }
`

const StoryStickyPanel = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1.35rem 1.2rem;
  border: 1px solid rgba(29, 20, 17, 0.12);
  border-radius: 1.4rem;
  background:
    linear-gradient(180deg, rgba(41, 29, 21, 0.95) 0%, rgba(74, 53, 46, 0.92) 100%);
  box-shadow: 0 18px 36px rgba(41, 29, 21, 0.14);

  @media (min-width: 1100px) {
    position: sticky;
    top: 7rem;
    padding: 1.8rem 1.7rem;
  }
`

const StoryLabel = styled.p`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 244, 232, 0.68);
`

const StoryTitle = styled.h2`
  margin: 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 0.98;
  font-weight: 400;
  letter-spacing: -0.05em;
  color: #fff8f2;
`

const StoryText = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.8;
  color: rgba(255, 244, 232, 0.8);
`

const StoryStepsColumn = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.2rem;
  }
`

const StoryStepCard = styled.article`
  position: sticky;
  top: 6.25rem;
  display: grid;
  gap: 0.8rem;
  min-height: 18rem;
  padding: 1.25rem;
  border: 1px solid rgba(29, 20, 17, 0.1);
  border-radius: 1.5rem;
  background:
    linear-gradient(180deg, rgba(255, 252, 248, 0.96) 0%, rgba(244, 234, 224, 0.98) 100%);
  box-shadow: 0 20px 40px rgba(41, 29, 21, 0.08);

  @media (min-width: 768px) {
    min-height: 20rem;
    padding: 1.6rem;
  }
`

const StoryStepIndex = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  color: rgba(45, 32, 27, 0.42);
`

const StoryStepTitle = styled.h3`
  margin: 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 0.95;
  font-weight: 400;
  letter-spacing: -0.05em;
  color: #211715;
`

const StoryStepText = styled.p`
  max-width: 27rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.82;
  color: rgba(45, 32, 27, 0.8);
`
