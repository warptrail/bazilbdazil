import styled from 'styled-components'

/**
 * A responsive layout and accessible group label for related RitualChip components.
 */
export function RitualChipList({ label, children }) {
  return (
    <ChipGrid role="group" aria-label={label}>
      {children}
    </ChipGrid>
  )
}

const ChipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`
