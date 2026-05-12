import styled, { css } from 'styled-components'

export const labelText = css`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.label};
  text-transform: uppercase;
`

export const PageShell = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.canvas};
`

export const Section = styled.section`
  position: relative;
  padding-inline: ${({ theme }) => theme.spacing.sectionX};
`

export const Container = styled.div`
  width: min(${({ $maxWidth = '100%' }) => $maxWidth}, 100%);
  margin: 0 auto;
`

export const Eyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent.acid};
  ${labelText}
`

export const DisplayHeading = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme, $font = 'display' }) => theme.typography.fontFamily[$font]};
  font-size: ${({ theme, $size = 'display' }) => theme.typography.fontSize[$size]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme, $lineHeight = 'display' }) => theme.typography.lineHeight[$lineHeight]};
  letter-spacing: ${({ theme, $tracking = 'tight' }) => theme.typography.letterSpacing[$tracking]};
  text-transform: ${({ $caps = true }) => ($caps ? 'uppercase' : 'none')};
`

export const BodyCopy = styled.p`
  margin: 0;
  color: ${({ theme, $tone = 'bodyMuted' }) => theme.colors.text[$tone]};
  font-size: ${({ theme, $size = 'body' }) => theme.typography.fontSize[$size]};
  line-height: ${({ theme, $lineHeight = 'body' }) => theme.typography.lineHeight[$lineHeight]};
  letter-spacing: ${({ theme, $tracking = 'normal' }) =>
    $tracking === 'normal' ? 'normal' : theme.typography.letterSpacing[$tracking]};
  max-width: ${({ $maxWidth = 'none' }) => $maxWidth};
  text-transform: ${({ $caps = false }) => ($caps ? 'uppercase' : 'none')};
`

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 3rem;
  padding: 0.76rem 1.4rem;
  ${labelText}
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`

export const PrimaryButton = styled.a`
  ${buttonBase}
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.strong};
  color: ${({ theme }) => theme.colors.accent.acidSoft};
  background: ${({ theme }) => theme.colors.background.glassInk};
`

export const GhostButton = styled.a`
  ${buttonBase}
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.violetStrong};
  color: ${({ theme }) => theme.colors.accent.ultravioletStrong};
  background: ${({ theme }) => theme.colors.background.glassViolet};
  box-shadow: ${({ theme }) => theme.shadows.insetViolet};
`

export const NavLink = styled.a`
  color: rgba(237, 246, 240, 0.88);
  ${labelText}
`

export const Card = styled.article`
  position: relative;
  overflow: hidden;
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme }) => theme.colors.border.soft};
  border-radius: ${({ theme, $radius = 'none' }) =>
    $radius === 'none' ? '0' : theme.radii[$radius]};
  background: ${({ theme, $surface = 'booking' }) =>
    $surface === 'booking'
      ? theme.colors.gradients.booking
      : theme.colors.background[$surface] || theme.colors.background.canvas};
  box-shadow: ${({ theme, $shadow = 'none' }) => ($shadow === 'none' ? 'none' : theme.shadows[$shadow])};
`

export const Divider = styled.div`
  width: ${({ $width = '100%' }) => $width};
  height: 1px;
  background: ${({ theme, $tone = 'subtle' }) => theme.colors.border[$tone]};
`

export const OrbitalBackdrop = styled.div`
  position: absolute;
  inset: ${({ $inset = '0' }) => $inset};
  border-radius: ${({ theme, $radius = 'orbital' }) => theme.radii[$radius]};
  border: ${({ theme }) => theme.borders.width.thin} ${({ theme }) => theme.borders.style}
    ${({ theme, $tone = 'orbital' }) => theme.colors.border[$tone]};
  box-shadow: ${({ theme, $shadow = 'insetOrbital' }) => theme.shadows[$shadow]};
  pointer-events: none;
`

export const GlowOrb = styled.div`
  position: absolute;
  border-radius: ${({ theme }) => theme.radii.orbital};
  background: ${({ $background }) => $background};
  filter: ${({ $filter = 'blur(30px)' }) => $filter};
  pointer-events: none;
`
