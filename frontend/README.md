# Tarot Webpage

A React and Vite landing page for a tarot, ritual, and drag performance booking experience.

The site uses a dark cosmic editorial visual system, styled-components, React Router, and a Cal.com booking embed. It is intended to be hosted as a static frontend app.

## Features

- Editorial landing page with animated hero section
- Offerings, about, social, and booking sections
- Dedicated `/book` route for the booking experience
- Cal.com embed powered by `@calcom/embed-react`
- Opt-in Tarot and Clown experience modes with persistent, shareable URLs
- Styled-components-only styling architecture
- Shared theme tokens and primitives for consistent visual language
- ESLint rules that block inline style props, CSS modules, and Tailwind imports

## Tech Stack

- React 19
- Vite 8
- React Router
- styled-components
- Cal.com embed
- ESLint

## Project Structure

```text
tarot-webpage/
  public/
    favicon.svg
    icons.svg
  src/
    assets/
    components/
      booking/
      landing/
    styles/
      GlobalStyles.js
      primitives.js
      theme.js
    App.jsx
    main.jsx
  STYLE_CANON.md
  package.json
  vite.config.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the project root when enabling the booking embed:

```bash
VITE_CAL_LINK=your-cal-username/your-event
```

Example:

```bash
VITE_CAL_LINK=your-cal-username/60min
```

If `VITE_CAL_LINK` is not set, the booking section displays setup guidance instead of the live Cal.com widget.

## Routes

- `/` - landing page
- `/book` - dedicated booking page

Because this app uses client-side routing, configure static hosting rewrites so all routes serve `index.html`.

## Experience Modes

The site opens in Tarot Mode for a visitor with no saved preference. The header control can switch the full application into the alternate Midnight Carnival presentation without changing the service hierarchy or booking flow.

- `?mode=tarot` opens and saves Tarot Mode.
- `?mode=clown` opens and saves Clown Mode.
- A valid URL mode overrides the saved `bazil-experience-mode` preference.
- Switching modes preserves existing query parameters and anchor links.
- The selected mode also applies to the dedicated `/book` route; the Cal.com embed itself is unchanged.

Tarot Mode intentionally mounts no clown imagery or performance gallery. Clown Mode reveals the clown hero cutout, the full performance gallery, alternate atmospheric tokens, and a small set of humorous copy substitutions.

## Deployment

This app can be deployed anywhere that supports static Vite builds.

Typical static hosting settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Node package manager: `npm`

For Netlify, add a redirect rule so client-side routes work:

```text
/* /index.html 200
```

For Vercel, the Vite defaults usually work automatically. Set `VITE_CAL_LINK` in the project environment variables before deploying.

## Styling Contract

The visual system is documented in [`STYLE_CANON.md`](./STYLE_CANON.md).

Key rules:

- All rendered DOM styling should come from styled-components.
- Do not use inline styles.
- Do not use CSS modules.
- Do not use Tailwind.
- Prefer existing theme tokens from [`src/styles/theme.js`](./src/styles/theme.js).
- Prefer shared primitives from [`src/styles/primitives.js`](./src/styles/primitives.js).
- Keep the canon dark, cosmic, editorial, restrained, and atmospheric.
- Treat Clown Mode as an opt-in persona overlay; it must preserve hierarchy, legibility, and booking clarity.

## Notes Before Hosting

- Replace placeholder social links in `src/components/landing/LandingPage.jsx`.
- Set `VITE_CAL_LINK` in the hosting provider environment.
- Confirm the favicon and public social metadata are final.
- Run `npm run lint` and `npm run build` before publishing.
