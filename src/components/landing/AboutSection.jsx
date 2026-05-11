import styled from 'styled-components'

export function AboutSection({ content }) {
  return (
    <AboutSectionRoot id="about">
      <AboutIntro>
        <AboutLabel>{content.label}</AboutLabel>
        <AboutTitle>{content.title}</AboutTitle>
      </AboutIntro>

      <AboutBody>
        <AboutCopy>
          {content.paragraphs.map((paragraph) => (
            <AboutParagraph key={paragraph}>{paragraph}</AboutParagraph>
          ))}
        </AboutCopy>

        <AboutNotes>
          {content.notes.map((note) => (
            <AboutNote key={note}>{note}</AboutNote>
          ))}
        </AboutNotes>
      </AboutBody>
    </AboutSectionRoot>
  )
}

const AboutSectionRoot = styled.section`
  display: grid;
  gap: 1.75rem;
  padding: 2rem 1rem;
  border-top: 1px solid rgba(29, 20, 17, 0.08);

  @media (min-width: 768px) {
    gap: 2rem;
    padding: 3rem 2rem;
  }

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    gap: 2.5rem;
    padding: 4rem 2.75rem;
  }

  @media (min-width: 1400px) {
    padding-inline: 3.5rem;
  }
`

const AboutIntro = styled.div`
  display: grid;
  gap: 0.9rem;
`

const AboutLabel = styled.p`
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(45, 32, 27, 0.48);
`

const AboutTitle = styled.h2`
  max-width: 22rem;
  margin: 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 4.2vw, 3.6rem);
  line-height: 0.98;
  font-weight: 400;
  letter-spacing: -0.05em;
  color: #1f1512;
`

const AboutBody = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 18rem);
    align-items: start;
  }
`

const AboutCopy = styled.div`
  display: grid;
  gap: 1rem;
`

const AboutParagraph = styled.p`
  max-width: 34rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(45, 32, 27, 0.8);
`

const AboutNotes = styled.div`
  display: grid;
  gap: 0.9rem;
`

const AboutNote = styled.div`
  padding: 1rem 1.1rem;
  border: 1px solid rgba(29, 20, 17, 0.12);
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.94rem;
  line-height: 1.45;
  color: #231815;
`
