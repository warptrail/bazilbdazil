import styled from 'styled-components'
import { ArcaneTransmutationWord } from './ArcaneTransmutationWord'

/**
 * Renders a title while assigning one named word to the arcane transmutation treatment.
 */
export function ArcaneTitle({ title, enchantedWord = 'Bacchanalia' }) {
  const words = title.trim().split(/\s+/)

  return (
    <TitleText aria-hidden="true">
      {words.map((word, index) => (
        <TitleWord key={`${word}-${index}`}>
          {word === enchantedWord ? <ArcaneTransmutationWord word={word} /> : word}{' '}
        </TitleWord>
      ))}
    </TitleText>
  )
}

const TitleText = styled.span`
  display: contents;
`

const TitleWord = styled.span`
  display: inline;

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    display: block;
    width: max-content;
    white-space: nowrap;
  }
`
