import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { CalBookingEmbed } from './components/landing/CalBookingEmbed'
import { LandingPage } from './components/landing/LandingPage'
import { GlobalStyles } from './styles/GlobalStyles'

const calLink = import.meta.env.VITE_CAL_LINK || ''

function BookingPage() {
  return (
    <BookingPageShell>
      {calLink ? <CalBookingEmbed calLink={calLink} /> : <BookingSetupNotice>Set `VITE_CAL_LINK` to load booking.</BookingSetupNotice>}
    </BookingPageShell>
  )
}

function App() {
  return (
    <>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
      </Routes>
    </>
  )
}

const BookingPageShell = styled.div`
  min-height: 100vh;
  padding: 0;
  background: #04060a;
`

const BookingSetupNotice = styled.p`
  margin: 0;
  padding: 2rem;
  color: #f1edff;
  font-size: 0.95rem;
`

export default App
