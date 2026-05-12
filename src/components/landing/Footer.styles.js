import styled, { keyframes } from 'styled-components'
import { BodyCopy, Container, NavLink, PrimaryButton } from '../../styles/primitives'

const orbitalDrift = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(1.75deg) scale(1.01);
  }

  100% {
    transform: rotate(0deg) scale(1);
  }
`

const starPulse = keyframes`
  0%,
  100% {
    opacity: 0.72;
  }

  50% {
    opacity: 1;
  }
`

export const FooterShell = styled.footer`
  position: relative;
  border-top: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.subtle};
  background: ${({ theme }) => theme.colors.background.footer};
`

export const FooterInner = styled(Container)`
  display: grid;
  gap: ${({ theme }) => theme.spacing['3xl']};
  padding: clamp(2.6rem, 5vw, 4rem) ${({ theme }) => theme.spacing.sectionX};

  @media (min-width: 980px) {
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: end;
  }
`

export const FooterBrand = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: clamp(1.35rem, 1.9vw, 1.8rem);
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.brand};
  line-height: 0.98;
  text-transform: uppercase;
`

export const FooterSignoff = styled(BodyCopy).attrs({
  $tone: 'bodyMuted',
  $size: 'base',
})`
  max-width: 18rem;
  color: ${({ theme }) => theme.colors.text.bodyMuted};
`

export const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.1rem;
`

export const FooterLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text.bodyMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent.acid};
  }
`

export const FooterCTA = styled(PrimaryButton)`
  min-height: 2.8rem;
  padding: 0.65rem 1.1rem;
  justify-self: start;
  border-color: ${({ theme }) => theme.colors.border.soft};
  background: rgba(8, 13, 18, 0.34);
  box-shadow: 0 0 1.2rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
`

export const FooterMeta = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  align-content: start;

  @media (min-width: 980px) {
    &:last-child {
      justify-items: start;
    }
  }
`

export const FooterMetaLine = styled(BodyCopy).attrs({
  as: 'small',
  $tone: 'bodyMuted',
  $size: 'xs',
  $tracking: 'wide',
  $caps: true,
})`
  color: ${({ theme }) => theme.colors.text.bodyMuted};
`

export const FooterGlyph = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  min-height: 4rem;
`

export const AnimatedOrbitalSvg = styled.svg`
  width: min(12rem, 100%);
  overflow: visible;
  filter:
    drop-shadow(0 0 0.42rem ${({ theme }) => theme.colors.effects.acidGlowSoft})
    drop-shadow(0 0 0.7rem ${({ theme }) => theme.colors.effects.violetGlowSoft});
  transform-origin: center;
  animation: ${orbitalDrift} 14s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const OrbitalTrack = styled.path`
  stroke: ${({ theme }) => theme.colors.accent.acid};
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.78;
`

export const StarLine = styled.path`
  stroke: ${({ theme }) => theme.colors.accent.acidSoft};
  stroke-width: 1;
  stroke-linecap: round;
  opacity: 0.88;
`

export const CrescentArc = styled.path`
  stroke: ${({ theme }) => theme.colors.accent.acid};
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.84;
`

export const OrbitalStar = styled.circle`
  fill: ${({ theme }) => theme.colors.accent.acidSoft};
  animation: ${starPulse} 8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
