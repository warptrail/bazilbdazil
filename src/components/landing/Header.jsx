import styled from 'styled-components'

export function Header({
  siteTitle,
  floatingLabel,
  navigationItems,
  loginLabel,
  ctaLabel,
}) {
  return (
    <HeaderBar>
      <BrandBlock href="/" aria-label={siteTitle}>
        <BrandName>{siteTitle}</BrandName>
        <BrandTag>{floatingLabel}</BrandTag>
      </BrandBlock>

      <NavigationArea>
        <NavigationLinks aria-label="Primary">
          {navigationItems.map((item) => (
            <NavigationLink key={item.label} href={item.href}>
              {item.label}
            </NavigationLink>
          ))}
        </NavigationLinks>

        <ActionRow>
          <LoginLink href="#about">{loginLabel}</LoginLink>
          <PrimaryAction href="#book">{ctaLabel}</PrimaryAction>
        </ActionRow>
      </NavigationArea>
    </HeaderBar>
  )
}

const HeaderBar = styled.header`
  display: grid;
  gap: 1.25rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(29, 20, 17, 0.06);

  @media (min-width: 768px) {
    padding: 1.5rem 2rem 1.25rem;
  }

  @media (min-width: 1080px) {
    grid-template-columns: minmax(220px, 1fr) auto;
    align-items: start;
    gap: 2rem;
    padding: 1.75rem 2.75rem 0.5rem;
  }

  @media (min-width: 1400px) {
    padding-inline: 3.5rem;
  }
`

const BrandBlock = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: fit-content;
`

const BrandName = styled.span`
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 0.92;
  letter-spacing: -0.06em;
  color: #1d1411;
`

const BrandTag = styled.span`
  padding: 0.45rem 0.8rem;
  border-radius: 0.25rem;
  background: #e8e1da;
  box-shadow: 0 6px 16px rgba(41, 29, 21, 0.12);
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(29, 20, 17, 0.7);
  transform: translate(5rem, -0.1rem);

  @media (min-width: 768px) {
    font-size: 0.88rem;
  }

  @media (min-width: 1080px) {
    transform: translate(6.8rem, -0.2rem);
  }
`

const NavigationArea = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 1080px) {
    justify-items: end;
  }
`

const NavigationLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;

  @media (min-width: 768px) {
    gap: 1rem 2rem;
  }

  @media (min-width: 1080px) {
    justify-content: flex-end;
  }
`

const NavigationLink = styled.a`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #211715;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1080px) {
    font-size: 1.05rem;
  }
`

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem 1.1rem;

  @media (min-width: 1080px) {
    justify-content: flex-end;
  }
`

const LoginLink = styled.a`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #211715;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1080px) {
    font-size: 1.05rem;
  }
`

const PrimaryAction = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.6rem;
  padding: 0.65rem 1.5rem;
  border: 1.5px solid #211715;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;

  &:hover {
    background: #211715;
    color: #fff7ef;
    transform: translateY(-1px);
  }

  @media (min-width: 768px) {
    min-height: 4rem;
    padding-inline: 1.85rem;
    font-size: 0.92rem;
  }

  @media (min-width: 1080px) {
    min-width: 12rem;
    font-size: 0.94rem;
  }
`
