import { Fragment } from 'react'
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
        <Fragment key={`${word}-${index}`}>
          {word === enchantedWord ? <ArcaneTransmutationWord word={word} /> : word}{' '}
        </Fragment>
      ))}
    </TitleText>
  )
}

const TitleText = styled.span`
  display: contents;
`
