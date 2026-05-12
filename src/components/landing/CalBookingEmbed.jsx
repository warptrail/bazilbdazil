import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
import styled from 'styled-components'

const CAL_NAMESPACE = '15min'

export function CalBookingEmbed({ calLink }) {
  useEffect(() => {
    async function configureCalUi() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    }

    configureCalUi()
  }, [])

  return (
    <EmbedShell>
      <StyledCal
        namespace={CAL_NAMESPACE}
        calLink={calLink}
        config={{
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
        }}
      />
    </EmbedShell>
  )
}

const EmbedShell = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.background.embed};
  box-shadow: inset 0 0 0 1px rgba(141, 255, 69, 0.12);
`

const StyledCal = styled(Cal)`
  width: 100%;
  min-height: 42rem;
  overflow: scroll;

  @media (min-width: 768px) {
    min-height: 48rem;
  }
`
