export const tarotTheme = {
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
      header: 'rgba(4, 6, 10, 0.9)',
      surface: 'rgba(10, 12, 19, 0.84)',
      surfaceRaised: 'rgba(18, 14, 29, 0.92)',
      surfacePressed: 'rgba(6, 10, 12, 0.96)',
      surfaceGlass: 'rgba(8, 10, 18, 0.7)',
      surfaceEtched: 'rgba(13, 10, 22, 0.94)',
      surfaceIridescent: 'rgba(17, 10, 27, 0.82)',
    },
    text: {
      primary: '#f1edff',
      body: '#edf6f0',
      bodyStrong: '#f7fffb',
      bodyMuted: 'rgba(237, 246, 240, 0.74)',
      bodySoft: 'rgba(237, 246, 240, 0.68)',
      secondary: '#d5b6ff',
      navigation: 'rgba(237, 246, 240, 0.88)',
      onAccent: '#071006',
    },
    accent: {
      // Acid green is reserved for CTAs, emphasis words, active states, and small ritual marks.
      acid: '#8dff45',
      acidSoft: '#d6ffb8',
      acidSurface: '#52d91f',
      // Metal and signal are subordinate details, never competing action colors.
      metal: '#b7a06d',
      metalBright: '#f4cc72',
      metalPale: '#ffe8ae',
      metalDim: '#79633b',
      signal: '#9ddce3',
      cyan: '#49dcff',
      magenta: '#fa68dc',
      electricBlue: '#6788ff',
      candle: '#ffcc7d',
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
      surface: 'rgba(225, 214, 255, 0.14)',
      surfaceRaised: 'rgba(225, 214, 255, 0.22)',
      signal: 'rgba(157, 220, 227, 0.32)',
      glass: 'rgba(220, 231, 255, 0.18)',
      etched: 'rgba(244, 204, 114, 0.24)',
      filigree: 'rgba(244, 204, 114, 0.42)',
      filigreeBright: 'rgba(255, 232, 174, 0.72)',
      spectral: 'rgba(198, 155, 255, 0.48)',
      focus: '#8dff45',
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
      goldGlow: 'rgba(244, 204, 114, 0.3)',
      goldGlowSoft: 'rgba(244, 204, 114, 0.12)',
      cyanGlow: 'rgba(73, 220, 255, 0.26)',
      magentaGlow: 'rgba(250, 104, 220, 0.24)',
      blueGlow: 'rgba(103, 136, 255, 0.2)',
      starBright: 'rgba(255, 244, 210, 0.92)',
      starMedium: 'rgba(198, 225, 255, 0.56)',
      starDim: 'rgba(214, 195, 255, 0.28)',
      glassHighlight: 'rgba(255, 255, 255, 0.1)',
      glassShade: 'rgba(0, 0, 0, 0.34)',
      inkVeil: 'rgba(2, 3, 9, 0.72)',
      focusRing: 'rgba(141, 255, 69, 0.24)',
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
      atmosphereTexture:
        'radial-gradient(circle at 18% 26%, rgba(225, 214, 255, 0.08) 0 1px, transparent 1.5px), radial-gradient(circle at 68% 14%, rgba(157, 220, 227, 0.07) 0 1px, transparent 1.5px), radial-gradient(circle at 84% 72%, rgba(214, 255, 184, 0.06) 0 1px, transparent 1.5px)',
      starfield:
        'radial-gradient(circle at 8% 14%, rgba(255, 244, 210, 0.88) 0 1px, transparent 1.7px), radial-gradient(circle at 23% 74%, rgba(73, 220, 255, 0.48) 0 1px, transparent 1.8px), radial-gradient(circle at 37% 31%, rgba(250, 104, 220, 0.38) 0 1px, transparent 1.7px), radial-gradient(circle at 54% 88%, rgba(255, 232, 174, 0.54) 0 1px, transparent 1.8px), radial-gradient(circle at 69% 19%, rgba(198, 155, 255, 0.52) 0 1px, transparent 1.8px), radial-gradient(circle at 83% 62%, rgba(73, 220, 255, 0.42) 0 1px, transparent 1.7px), radial-gradient(circle at 94% 34%, rgba(255, 244, 210, 0.72) 0 1px, transparent 1.8px)',
      starfieldDense:
        'radial-gradient(circle, rgba(255, 244, 210, 0.52) 0 0.75px, transparent 1px), radial-gradient(circle, rgba(73, 220, 255, 0.26) 0 0.75px, transparent 1px), radial-gradient(circle, rgba(198, 155, 255, 0.3) 0 0.7px, transparent 1px)',
      spectralText:
        'linear-gradient(102deg, #f4cc72 0%, #ffe8ae 17%, #8dff45 34%, #49dcff 54%, #aa8dff 73%, #fa68dc 91%, #f4cc72 100%)',
      spectralWash:
        'linear-gradient(124deg, rgba(244, 204, 114, 0.12), rgba(141, 255, 69, 0.06) 25%, rgba(73, 220, 255, 0.1) 48%, rgba(186, 145, 255, 0.15) 72%, rgba(250, 104, 220, 0.1))',
      auroraVeil:
        'radial-gradient(ellipse at 18% 16%, rgba(73, 220, 255, 0.18), transparent 34%), radial-gradient(ellipse at 82% 26%, rgba(250, 104, 220, 0.16), transparent 36%), radial-gradient(ellipse at 52% 88%, rgba(141, 255, 69, 0.11), transparent 38%)',
      cosmicLens:
        'conic-gradient(from 18deg at 50% 50%, rgba(244, 204, 114, 0.04), rgba(73, 220, 255, 0.12), rgba(186, 145, 255, 0.14), rgba(250, 104, 220, 0.1), rgba(244, 204, 114, 0.04))',
      sacredHalo:
        'repeating-conic-gradient(from 0deg, rgba(244, 204, 114, 0.18) 0deg 1deg, transparent 1deg 15deg)',
      glassPanel:
        'linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.012) 42%, rgba(73, 220, 255, 0.03) 68%, rgba(250, 104, 220, 0.05)), rgba(8, 10, 18, 0.72)',
      etchedPanel:
        'linear-gradient(135deg, rgba(244, 204, 114, 0.07), transparent 28%, rgba(186, 145, 255, 0.045) 72%, rgba(73, 220, 255, 0.04)), rgba(13, 10, 22, 0.94)',
      goldLine:
        'linear-gradient(90deg, transparent, rgba(121, 99, 59, 0.72) 10%, rgba(244, 204, 114, 0.94) 48%, rgba(255, 232, 174, 0.98) 52%, rgba(121, 99, 59, 0.72) 90%, transparent)',
      buttonGlint:
        'linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.44) 48%, rgba(255, 255, 255, 0.12) 54%, transparent 72%)',
    },
  },
  typography: {
    fontFamily: {
      sans: "'Avenir Next', 'Segoe UI', sans-serif",
      serif: "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif",
      display:
        "'Bodoni 72 Condensed', 'Didot', 'Baskerville', 'Iowan Old Style', Georgia, serif",
      mono: "'SFMono-Regular', 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
    },
    fontSize: {
      xs: '0.74rem',
      sm: '0.78rem',
      base: '0.92rem',
      body: '1rem',
      lg: '1.18rem',
      section: 'clamp(1.8rem, 2.6vw, 2.7rem)',
      constellation: 'clamp(2.5rem, 5vw, 5.4rem)',
      display: 'clamp(4rem, 8.4vw, 8.3rem)',
    },
    letterSpacing: {
      tight: '-0.06em',
      brand: '-0.05em',
      label: '0.16em',
      wide: '0.14em',
      bodyWide: '0.07em',
      editorial: '0.1em',
      ceremonial: '0.22em',
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
    pill: '999px',
  },
  shadows: {
    // Avoid overusing glow. One atmospheric layer is usually enough for a composition.
    insetOrbital: 'inset 0 0 0 1px rgba(141, 255, 69, 0.06)',
    insetViolet: 'inset 0 0 0 1px rgba(41, 28, 69, 0.4)',
    acidHover: '0 0 0.9rem rgba(141, 255, 69, 0.22)',
    portrait: '0 0 4rem rgba(109, 72, 201, 0.2)',
    card:
      'inset 0 1px 0 rgba(241, 237, 255, 0.06), 0 14px 28px rgba(10, 13, 19, 0.28)',
    surfaceInset: 'inset 0 1px 0 rgba(241, 237, 255, 0.05)',
    surfaceRaised:
      'inset 0 1px 0 rgba(241, 237, 255, 0.08), 0 18px 42px rgba(2, 4, 8, 0.3)',
    surfacePressed: 'inset 0 2px 12px rgba(2, 4, 8, 0.42)',
    focusRing: '0 0 0 0.24rem rgba(141, 255, 69, 0.24)',
    celestial:
      '0 0 0 1px rgba(244, 204, 114, 0.08), 0 0 2.25rem rgba(73, 220, 255, 0.08), 0 0 5rem rgba(186, 145, 255, 0.08)',
    glass:
      'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.3), 0 1.25rem 3.5rem rgba(0, 0, 0, 0.28)',
    etched:
      'inset 0 0 0 1px rgba(244, 204, 114, 0.07), inset 0 0 2rem rgba(186, 145, 255, 0.035), 0 1.6rem 4rem rgba(0, 0, 0, 0.34)',
    filigree:
      '0 0 0 1px rgba(244, 204, 114, 0.08), inset 0 0 0 1px rgba(255, 232, 174, 0.05), 0 0 1.5rem rgba(244, 204, 114, 0.08)',
    spectral:
      '0 0 1.5rem rgba(73, 220, 255, 0.1), 0 0 3rem rgba(186, 145, 255, 0.09), 0 0 4.5rem rgba(250, 104, 220, 0.07)',
    metalHover: '0 0 0 1px rgba(255, 232, 174, 0.18), 0 0 1.5rem rgba(244, 204, 114, 0.18)',
  },
  borders: {
    width: {
      thin: '1px',
      medium: '1.5px',
      focus: '2px',
    },
    style: 'solid',
  },
  transitions: {
    fast: '160ms ease',
    base: '220ms ease',
    ritual: '560ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
  motion: {
    duration: {
      reduced: '0.01ms',
      fast: '160ms',
      base: '220ms',
      luxury: '420ms',
      ritual: '560ms',
      reveal: '900ms',
      sweep: '700ms',
      glint: '1800ms',
      twinkle: '4800ms',
      drift: '28s',
      orbit: '42s',
      planetary: '58s',
      celestialLong: '84s',
      ambient: '20s',
    },
    easing: {
      standard: 'ease',
      enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
      ambient: 'linear',
      magnetic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },
  layout: {
    contentWidth: '76rem',
    wideContentWidth: '90rem',
    proseWidth: '42rem',
    frameInset: 'clamp(0.5rem, 1.4vw, 1.25rem)',
    headerOffset: '7.25rem',
    compactHeaderOffset: '9.5rem',
    expandedHeaderOffset: '12rem',
    heroMidMinHeight: '34rem',
    sectionBlock: 'clamp(4.75rem, 9vw, 8.5rem)',
    sectionBlockCompact: 'clamp(3.75rem, 7vw, 6rem)',
    scrollMargin: 'calc(12.5rem + env(safe-area-inset-top, 0px))',
    controlMinHeight: '2.75rem',
    buttonMinHeight: '3rem',
    buttonPaddingBlock: '0.75rem',
    buttonPaddingInline: '1.4rem',
    focusOffset: '0.2rem',
    hoverLift: '-0.125rem',
    activeDepth: '0.0625rem',
    safeArea: {
      top: 'env(safe-area-inset-top, 0px)',
      right: 'env(safe-area-inset-right, 0px)',
      bottom: 'env(safe-area-inset-bottom, 0px)',
      left: 'env(safe-area-inset-left, 0px)',
    },
    breakpoints: {
      compact: '420px',
      narrow: '760px',
      desktop: '761px',
      wideMax: '1199px',
      wide: '1200px',
    },
    viewportHeights: {
      short: '820px',
    },
  },
  zIndex: {
    base: 0,
    atmosphere: 1,
    content: 2,
    sticky: 3,
    overlay: 4,
    skipLink: 5,
  },
}

export const clownTheme = {
  ...tarotTheme,
  colors: {
    background: {
      ...tarotTheme.colors.background,
      canvas: '#08070a',
      base: '#0b090d',
      deep: '#160a18',
      floor: '#07080a',
      heroTop: 'rgba(13, 8, 16, 0.98)',
      heroBottom: 'rgba(6, 12, 14, 1)',
      panelPlum: '#210d20',
      panelTeal: '#07191c',
      glassViolet: 'rgba(30, 11, 29, 0.6)',
      glassInk: 'rgba(5, 24, 27, 0.42)',
      footer: 'rgba(8, 7, 10, 0.88)',
      bookingTop: 'rgba(25, 10, 24, 0.88)',
      bookingBottom: 'rgba(6, 18, 20, 0.94)',
      embed: 'rgba(8, 12, 14, 0.97)',
      code: '#0c1012',
      header: 'rgba(8, 7, 10, 0.92)',
      surface: 'rgba(22, 12, 22, 0.86)',
      surfaceRaised: 'rgba(34, 14, 31, 0.94)',
      surfacePressed: 'rgba(5, 17, 19, 0.96)',
    },
    text: {
      ...tarotTheme.colors.text,
      primary: '#fff7ee',
      body: '#f9f0e8',
      bodyStrong: '#fffaf4',
      bodyMuted: 'rgba(255, 247, 238, 0.76)',
      bodySoft: 'rgba(255, 247, 238, 0.68)',
      secondary: '#ffd2e0',
      navigation: 'rgba(255, 247, 238, 0.9)',
      onAccent: '#061013',
    },
    accent: {
      ...tarotTheme.colors.accent,
      acid: '#54dde7',
      acidSoft: '#cdf9fc',
      acidSurface: '#2ebec9',
      metal: '#d8b35c',
      metalBright: '#ffd36b',
      metalPale: '#ffedb8',
      metalDim: '#876b31',
      signal: '#ff91b1',
      cyan: '#54dde7',
      magenta: '#ff4f82',
      electricBlue: '#8d7dff',
      candle: '#ffd36b',
      ultraviolet: '#ff4f82',
      ultravioletStrong: '#ff91b1',
      rose: '#ff4f82',
      violetButton: '#b72d63',
    },
    border: {
      ...tarotTheme.colors.border,
      subtle: 'rgba(84, 221, 231, 0.18)',
      soft: 'rgba(84, 221, 231, 0.22)',
      strong: 'rgba(84, 221, 231, 0.5)',
      orbital: 'rgba(84, 221, 231, 0.26)',
      violet: 'rgba(255, 79, 130, 0.3)',
      violetStrong: 'rgba(255, 79, 130, 0.54)',
      surface: 'rgba(255, 247, 238, 0.15)',
      surfaceRaised: 'rgba(255, 247, 238, 0.24)',
      signal: 'rgba(255, 145, 177, 0.34)',
      glass: 'rgba(255, 247, 238, 0.18)',
      etched: 'rgba(216, 179, 92, 0.26)',
      filigree: 'rgba(216, 179, 92, 0.46)',
      filigreeBright: 'rgba(255, 211, 107, 0.76)',
      spectral: 'rgba(255, 79, 130, 0.5)',
      focus: '#54dde7',
    },
    effects: {
      ...tarotTheme.colors.effects,
      selection: 'rgba(255, 79, 130, 0.36)',
      starlight: 'rgba(84, 221, 231, 0.34)',
      starlightSoft: 'rgba(84, 221, 231, 0.18)',
      moonlight: 'rgba(255, 247, 238, 0.26)',
      moonlightSoft: 'rgba(255, 247, 238, 0.12)',
      acidGlow: 'rgba(84, 221, 231, 0.26)',
      acidGlowSoft: 'rgba(84, 221, 231, 0.16)',
      violetGlow: 'rgba(255, 79, 130, 0.3)',
      violetGlowSoft: 'rgba(255, 79, 130, 0.2)',
      goldGlow: 'rgba(216, 179, 92, 0.28)',
      goldGlowSoft: 'rgba(216, 179, 92, 0.12)',
      cyanGlow: 'rgba(84, 221, 231, 0.26)',
      magentaGlow: 'rgba(255, 79, 130, 0.26)',
      blueGlow: 'rgba(141, 125, 255, 0.2)',
      starBright: 'rgba(255, 237, 184, 0.92)',
      starMedium: 'rgba(84, 221, 231, 0.58)',
      starDim: 'rgba(255, 145, 177, 0.3)',
      focusRing: 'rgba(84, 221, 231, 0.24)',
    },
    gradients: {
      ...tarotTheme.colors.gradients,
      page:
        'radial-gradient(circle at top center, rgba(255, 79, 130, 0.18) 0%, rgba(255, 79, 130, 0) 28%), radial-gradient(circle at 78% 18%, rgba(84, 221, 231, 0.16) 0%, rgba(84, 221, 231, 0) 18%), linear-gradient(180deg, #0b090d 0%, #160a18 48%, #071013 100%)',
      frame:
        'radial-gradient(circle at top center, rgba(255, 79, 130, 0.22) 0%, rgba(255, 79, 130, 0) 24%), radial-gradient(circle at 72% 20%, rgba(84, 221, 231, 0.16) 0%, rgba(84, 221, 231, 0) 18%), linear-gradient(180deg, #08070a 0%, #160a18 46%, #071013 100%)',
      hero:
        'radial-gradient(circle at 54% 34%, rgba(255, 79, 130, 0.28) 0%, rgba(255, 79, 130, 0) 19%), radial-gradient(circle at 74% 34%, rgba(84, 221, 231, 0.24) 0%, rgba(84, 221, 231, 0) 23%), radial-gradient(circle at 18% 20%, rgba(216, 179, 92, 0.08) 0%, rgba(216, 179, 92, 0) 10%), linear-gradient(180deg, rgba(13, 8, 16, 0.98), rgba(6, 12, 14, 1))',
      cardOverlay:
        'linear-gradient(180deg, rgba(11, 8, 12, 0.08) 8%, rgba(8, 10, 12, 0.74) 82%, rgba(6, 7, 9, 0.94) 100%)',
      booking:
        'linear-gradient(180deg, rgba(25, 10, 24, 0.88), rgba(6, 18, 20, 0.94))',
      atmosphereTexture:
        'radial-gradient(circle at 18% 26%, rgba(255, 79, 130, 0.1) 0 1px, transparent 1.5px), radial-gradient(circle at 68% 14%, rgba(84, 221, 231, 0.1) 0 1px, transparent 1.5px), radial-gradient(circle at 84% 72%, rgba(216, 179, 92, 0.08) 0 1px, transparent 1.5px)',
      starfield:
        'radial-gradient(circle at 8% 14%, rgba(255, 237, 184, 0.88) 0 1px, transparent 1.7px), radial-gradient(circle at 23% 74%, rgba(84, 221, 231, 0.5) 0 1px, transparent 1.8px), radial-gradient(circle at 37% 31%, rgba(255, 79, 130, 0.44) 0 1px, transparent 1.7px), radial-gradient(circle at 54% 88%, rgba(216, 179, 92, 0.56) 0 1px, transparent 1.8px), radial-gradient(circle at 69% 19%, rgba(141, 125, 255, 0.5) 0 1px, transparent 1.8px), radial-gradient(circle at 83% 62%, rgba(84, 221, 231, 0.46) 0 1px, transparent 1.7px), radial-gradient(circle at 94% 34%, rgba(255, 237, 184, 0.72) 0 1px, transparent 1.8px)',
      starfieldDense:
        'radial-gradient(circle, rgba(255, 237, 184, 0.54) 0 0.75px, transparent 1px), radial-gradient(circle, rgba(84, 221, 231, 0.28) 0 0.75px, transparent 1px), radial-gradient(circle, rgba(255, 79, 130, 0.3) 0 0.7px, transparent 1px)',
      spectralText:
        'linear-gradient(102deg, #ffd36b 0%, #ffedb8 17%, #54dde7 37%, #8d7dff 58%, #ff4f82 79%, #ff91b1 91%, #ffd36b 100%)',
      spectralWash:
        'linear-gradient(124deg, rgba(216, 179, 92, 0.13), rgba(84, 221, 231, 0.09) 31%, rgba(141, 125, 255, 0.12) 58%, rgba(255, 79, 130, 0.14))',
      auroraVeil:
        'radial-gradient(ellipse at 18% 16%, rgba(84, 221, 231, 0.2), transparent 34%), radial-gradient(ellipse at 82% 26%, rgba(255, 79, 130, 0.2), transparent 36%), radial-gradient(ellipse at 52% 88%, rgba(216, 179, 92, 0.1), transparent 38%)',
      cosmicLens:
        'conic-gradient(from 18deg at 50% 50%, rgba(216, 179, 92, 0.05), rgba(84, 221, 231, 0.13), rgba(141, 125, 255, 0.14), rgba(255, 79, 130, 0.13), rgba(216, 179, 92, 0.05))',
      sacredHalo:
        'repeating-conic-gradient(from 0deg, rgba(216, 179, 92, 0.2) 0deg 1deg, transparent 1deg 15deg)',
      glassPanel:
        'linear-gradient(145deg, rgba(255, 247, 238, 0.08), rgba(255, 247, 238, 0.012) 42%, rgba(84, 221, 231, 0.04) 68%, rgba(255, 79, 130, 0.06)), rgba(15, 9, 18, 0.74)',
      etchedPanel:
        'linear-gradient(135deg, rgba(216, 179, 92, 0.08), transparent 28%, rgba(255, 79, 130, 0.055) 72%, rgba(84, 221, 231, 0.045)), rgba(25, 10, 24, 0.94)',
      goldLine:
        'linear-gradient(90deg, transparent, rgba(135, 107, 49, 0.74) 10%, rgba(216, 179, 92, 0.95) 48%, rgba(255, 237, 184, 0.98) 52%, rgba(135, 107, 49, 0.74) 90%, transparent)',
    },
  },
  shadows: {
    ...tarotTheme.shadows,
    insetOrbital: 'inset 0 0 0 1px rgba(84, 221, 231, 0.07)',
    insetViolet: 'inset 0 0 0 1px rgba(255, 79, 130, 0.18)',
    acidHover: '0 0 0.9rem rgba(84, 221, 231, 0.24)',
    portrait: '0 0 4rem rgba(255, 79, 130, 0.2)',
    focusRing: '0 0 0 0.24rem rgba(84, 221, 231, 0.24)',
    celestial:
      '0 0 0 1px rgba(216, 179, 92, 0.08), 0 0 2.25rem rgba(84, 221, 231, 0.09), 0 0 5rem rgba(255, 79, 130, 0.08)',
    spectral:
      '0 0 1.5rem rgba(84, 221, 231, 0.11), 0 0 3rem rgba(141, 125, 255, 0.09), 0 0 4.5rem rgba(255, 79, 130, 0.08)',
    metalHover: '0 0 0 1px rgba(255, 237, 184, 0.2), 0 0 1.5rem rgba(216, 179, 92, 0.2)',
  },
}

export const themes = Object.freeze({
  tarot: tarotTheme,
  clown: clownTheme,
})

export const theme = tarotTheme
