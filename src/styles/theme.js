export const theme = {
  colors: {
    background: {
      canvas: '#04060a',
      base: '#05070b',
      deep: '#080512',
      floor: '#03070a',
      heroTop: 'rgba(7, 7, 15, 0.97)',
      heroBottom: 'rgba(4, 8, 12, 1)',
      panelPlum: '#190f28',
      panelTeal: '#09171a',
      glassViolet: 'rgba(14, 11, 25, 0.58)',
      glassInk: 'rgba(12, 25, 23, 0.34)',
      footer: 'rgba(3, 5, 8, 0.82)',
      bookingTop: 'rgba(18, 13, 29, 0.88)',
      bookingBottom: 'rgba(8, 13, 18, 0.92)',
      embed: 'rgba(8, 13, 18, 0.96)',
      code: '#0b1016',
    },
    text: {
      primary: '#f1edff',
      body: '#edf6f0',
      bodyStrong: '#f7fffb',
      bodyMuted: 'rgba(237, 246, 240, 0.74)',
      bodySoft: 'rgba(237, 246, 240, 0.68)',
      secondary: '#d5b6ff',
    },
    accent: {
      // Acid green is reserved for CTAs, emphasis words, active states, and small ritual marks.
      acid: '#8dff45',
      acidSoft: '#d6ffb8',
      acidSurface: '#52d91f',
      // Purple glow is atmospheric only. Use it for depth, not as a second CTA color.
      ultraviolet: '#ba91ff',
      ultravioletStrong: '#d8bcff',
      rose: '#c69bff',
      violetButton: '#8c58de',
    },
    border: {
      // Borders should stay thin and subtle. They frame space; they should not dominate it.
      subtle: 'rgba(141, 255, 69, 0.18)',
      soft: 'rgba(141, 255, 69, 0.2)',
      strong: 'rgba(141, 255, 69, 0.46)',
      orbital: 'rgba(141, 255, 69, 0.24)',
      violet: 'rgba(186, 145, 255, 0.28)',
      violetStrong: 'rgba(161, 120, 244, 0.52)',
    },
    effects: {
      selection: 'rgba(119, 87, 209, 0.38)',
      starlight: 'rgba(214, 255, 184, 0.34)',
      starlightSoft: 'rgba(214, 255, 184, 0.18)',
      moonlight: 'rgba(225, 214, 255, 0.28)',
      moonlightSoft: 'rgba(225, 214, 255, 0.12)',
      acidGlow: 'rgba(141, 255, 69, 0.24)',
      acidGlowSoft: 'rgba(141, 255, 69, 0.16)',
      violetGlow: 'rgba(163, 91, 231, 0.34)',
      violetGlowSoft: 'rgba(112, 61, 194, 0.28)',
    },
    gradients: {
      page:
        'radial-gradient(circle at top center, rgba(117, 74, 201, 0.22) 0%, rgba(117, 74, 201, 0) 28%), radial-gradient(circle at 78% 18%, rgba(141, 255, 69, 0.18) 0%, rgba(141, 255, 69, 0) 18%), linear-gradient(180deg, #05070b 0%, #090613 48%, #04070a 100%)',
      frame:
        'radial-gradient(circle at top center, rgba(112, 61, 194, 0.28) 0%, rgba(112, 61, 194, 0) 24%), radial-gradient(circle at 72% 20%, rgba(141, 255, 69, 0.18) 0%, rgba(141, 255, 69, 0) 18%), linear-gradient(180deg, #04060a 0%, #080512 46%, #03070a 100%)',
      hero:
        'radial-gradient(circle at 55% 34%, rgba(163, 91, 231, 0.34) 0%, rgba(163, 91, 231, 0) 18%), radial-gradient(circle at 73% 34%, rgba(141, 255, 69, 0.24) 0%, rgba(141, 255, 69, 0) 22%), radial-gradient(circle at 16% 18%, rgba(214, 255, 184, 0.08) 0%, rgba(214, 255, 184, 0) 10%), linear-gradient(180deg, rgba(7, 7, 15, 0.97), rgba(4, 8, 12, 1))',
      cardOverlay:
        'linear-gradient(180deg, rgba(7, 8, 14, 0.1) 8%, rgba(5, 8, 12, 0.76) 82%, rgba(3, 5, 8, 0.94) 100%)',
      booking:
        'linear-gradient(180deg, rgba(18, 13, 29, 0.88), rgba(8, 13, 18, 0.92))',
    },
  },
  typography: {
    fontFamily: {
      sans: "'Avenir Next', 'Segoe UI', sans-serif",
      serif: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
      display:
        "'Bodoni 72 Condensed', 'Didot', 'Baskerville', 'Iowan Old Style', Georgia, serif",
    },
    fontSize: {
      xs: '0.74rem',
      sm: '0.78rem',
      base: '0.92rem',
      body: '1rem',
      lg: '1.18rem',
      section: 'clamp(1.8rem, 2.6vw, 2.7rem)',
      display: 'clamp(4rem, 8.4vw, 8.3rem)',
    },
    letterSpacing: {
      tight: '-0.06em',
      brand: '-0.05em',
      label: '0.16em',
      wide: '0.14em',
      bodyWide: '0.07em',
      editorial: '0.1em',
    },
    lineHeight: {
      display: 0.84,
      heading: 1,
      body: 1.7,
      relaxed: 1.72,
    },
    fontWeight: {
      regular: 400,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.2rem',
    sm: '0.4rem',
    md: '0.8rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.8rem',
    '4xl': '2rem',
    '5xl': '2.4rem',
    sectionX: 'clamp(1.5rem, 3vw, 1.8rem)',
    heroBottom: '7rem',
  },
  radii: {
    sm: '0.35rem',
    md: '0.8rem',
    lg: '1rem',
    xl: '1.15rem',
    '2xl': '1.5rem',
    orbital: '50%',
    portrait: '18rem',
  },
  shadows: {
    // Avoid overusing glow. One atmospheric layer is usually enough for a composition.
    insetOrbital: 'inset 0 0 0 1px rgba(141, 255, 69, 0.06)',
    insetViolet: 'inset 0 0 0 1px rgba(41, 28, 69, 0.4)',
    acidHover: '0 0 0.9rem rgba(141, 255, 69, 0.22)',
    portrait: '0 0 4rem rgba(109, 72, 201, 0.2)',
    card: '0 14px 28px rgba(10, 13, 19, 0.28)',
  },
  borders: {
    width: {
      thin: '1px',
    },
    style: 'solid',
  },
  transitions: {
    fast: '160ms ease',
    base: '220ms ease',
  },
  zIndex: {
    base: 0,
    atmosphere: 1,
    content: 2,
    sticky: 3,
    overlay: 4,
  },
}
