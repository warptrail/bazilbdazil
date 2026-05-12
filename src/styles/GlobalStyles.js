import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    color: ${({ theme }) => theme.colors.text.body};
    background: ${({ theme }) => theme.colors.background.base};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.colors.gradients.page};
    color: ${({ theme }) => theme.colors.text.body};
  }

  ::selection {
    background: ${({ theme }) => theme.colors.effects.selection};
    color: ${({ theme }) => theme.colors.text.bodyStrong};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  #root {
    min-height: 100vh;
  }
`
