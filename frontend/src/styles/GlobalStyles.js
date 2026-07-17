import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    color: ${({ theme }) => theme.colors.text.body};
    background: ${({ theme }) => theme.colors.background.base};
    color-scheme: dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    accent-color: ${({ theme }) => theme.colors.accent.acid};
    scrollbar-color: ${({ theme }) => theme.colors.accent.metalDim}
      ${({ theme }) => theme.colors.background.floor};
    scrollbar-width: thin;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.colors.background.base};
  }

  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.colors.gradients.page};
    background-attachment: fixed;
    color: ${({ theme }) => theme.colors.text.body};
    overflow-x: hidden;
    overscroll-behavior-x: none;
  }

  body::-webkit-scrollbar {
    width: 0.7rem;
  }

  body::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.floor};
  }

  body::-webkit-scrollbar-thumb {
    border: 0.2rem solid ${({ theme }) => theme.colors.background.floor};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.gradients.goldLine};
  }

  body::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent.metalBright};
  }

  ::selection {
    background: ${({ theme }) => theme.colors.effects.selection};
    color: ${({ theme }) => theme.colors.text.bodyStrong};
  }

  ::marker {
    color: ${({ theme }) => theme.colors.accent.metalBright};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :where(a, button, input, textarea, select, summary, [tabindex]):focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.layout.focusOffset};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button,
  input,
  textarea,
  select,
  summary {
    color: inherit;
  }

  button,
  summary {
    min-height: ${({ theme }) => theme.layout.controlMinHeight};
  }

  button,
  summary,
  select {
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
  }

  hr {
    height: ${({ theme }) => theme.borders.width.thin};
    margin: ${({ theme }) => theme.spacing['4xl']} 0;
    border: 0;
    background: ${({ theme }) => theme.colors.gradients.goldLine};
  }

  blockquote {
    margin-inline: 0;
    padding-inline-start: ${({ theme }) => theme.spacing['2xl']};
    border-inline-start: ${({ theme }) => theme.borders.width.thin}
      ${({ theme }) => theme.borders.style} ${({ theme }) => theme.colors.border.filigree};
  }

  #root {
    position: relative;
    min-height: 100vh;
    isolation: isolate;
  }

  @media (prefers-contrast: more) {
    :root {
      scrollbar-color: ${({ theme }) => theme.colors.accent.metalBright}
        ${({ theme }) => theme.colors.background.floor};
    }

    body {
      color: ${({ theme }) => theme.colors.text.bodyStrong};
    }
  }

  @media (forced-colors: active) {
    :root {
      color-scheme: light dark;
      scrollbar-color: auto;
    }

    body {
      background: Canvas;
      color: CanvasText;
    }

    :where(a, button, input, textarea, select, summary, [tabindex]):focus-visible {
      outline-color: CanvasText;
      box-shadow: none;
    }

    hr {
      background: CanvasText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: ${({ theme }) => theme.motion.duration.reduced} !important;
      animation-iteration-count: 1 !important;
      transition-duration: ${({ theme }) => theme.motion.duration.reduced} !important;
    }
  }
`
