import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family:
      'Helvetica Neue',
      Helvetica,
      Arial,
      sans-serif;
    color: #1e1512;
    background: #f7f0e7;
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
    background:
      radial-gradient(circle at top left, #fffdf8 0%, #f7efe6 40%, #eee2d5 100%);
    color: #1e1512;
  }

  ::selection {
    background: rgba(93, 68, 54, 0.18);
    color: #1e1512;
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
