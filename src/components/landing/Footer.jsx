import {
  AnimatedOrbitalSvg,
  CrescentArc,
  FooterBrand,
  FooterCTA,
  FooterGlyph,
  FooterInner,
  FooterLink,
  FooterMeta,
  FooterMetaLine,
  FooterNav,
  FooterShell,
  FooterSignoff,
  OrbitalStar,
  OrbitalTrack,
  StarLine,
} from './Footer.styles'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Offerings', href: '#offerings' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <FooterShell id="contact">
      <FooterInner $maxWidth="100%">
        <FooterMeta>
          <FooterBrand href="#home" aria-label="Bazil Bacchanalia Dazil home">
            Bazil Bacchanalia Dazil
          </FooterBrand>
          <FooterSignoff>See you between worlds.</FooterSignoff>
        </FooterMeta>

        <FooterGlyph aria-hidden="true">
          <AnimatedOrbitalSvg
            viewBox="0 0 180 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
          >
            <OrbitalTrack
              d="M17 32C36.6 13.8 64.1 7.4 90 7.4C116 7.4 143.4 13.8 163 32C143.4 50.2 116 56.6 90 56.6C64.1 56.6 36.6 50.2 17 32Z"
            />
            <StarLine d="M90 18V46" />
            <StarLine d="M76 32H104" />
            <CrescentArc d="M123.5 16.5C116.6 18.3 111.6 24.6 111.6 32C111.6 39.4 116.6 45.7 123.5 47.5C119.8 49.3 115.5 50.3 111 50.3C100.8 50.3 92.5 42 92.5 31.8C92.5 21.6 100.8 13.3 111 13.3C115.5 13.3 119.8 14.7 123.5 16.5Z" />
            <OrbitalStar cx="48" cy="24" r="1.7" />
            <OrbitalStar cx="136" cy="40" r="1.7" />
          </AnimatedOrbitalSvg>
        </FooterGlyph>

        <FooterMeta>
          <FooterNav aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <FooterLink key={link.label} href={link.href} aria-label={link.label}>
                {link.label}
              </FooterLink>
            ))}
          </FooterNav>
          <FooterCTA href="#book" aria-label="Book a session">
            Book A Session
          </FooterCTA>
          <FooterMetaLine>© {new Date().getFullYear()} Bazil Bacchanalia Dazil</FooterMetaLine>
        </FooterMeta>
      </FooterInner>
    </FooterShell>
  )
}
