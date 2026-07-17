# Bazil Bacchanalia Dazil — Tarot & Drag

> **A field handbook for the nocturnal crust.** Compiled in the manner of a geology professor of 1947 who has, through administrative error or perhaps prophecy, been appointed caretaker of a React website.

This is the static landing site for **Bazil Bacchanalia Dazil**: tarot readings, ritual, and drag performance. It is a React application built with Vite, styled entirely with `styled-components`, and fitted with an optional Cal.com booking calendar. The site is deployed as static files; it has no application server, database, or secret-bearing backend tucked beneath the moraine.

The live interface has two visitor-selected strata:

- **Tarot mode** is the default: dark cosmic editorial design, tarot content, and no clown imagery.
- **Clown mode** is an opt-in Midnight Carnival overlay. It changes atmosphere and selected presentation copy while retaining the same navigation, offerings, and booking flow.

[Observe a fine seismic-wave GIF before proceeding.](https://giphy.com/EarthScope_sci/seismic-waves) It will not repair a broken build, but it may improve one’s bearing.

## Table of contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Starting and stopping the local servers](#starting-and-stopping-the-local-servers)
- [Every npm script, examined under a hand lens](#every-npm-script-examined-under-a-hand-lens)
- [Environment and Cal.com booking](#environment-and-calcom-booking)
- [Project map](#project-map)
- [Routes and experience modes](#routes-and-experience-modes)
- [Styling, accessibility, and the visual canon](#styling-accessibility-and-the-visual-canon)
- [Vercel deployment notes](#vercel-deployment-notes)
- [Verification and troubleshooting](#verification-and-troubleshooting)

## Requirements

Before excavating, install the following instruments:

- **Node.js**: use a current LTS release. The project’s tooling is modern Vite 8 and React 19; Node 20 LTS or newer is the sensible starting point.
- **npm**: it is used here because the repository contains `frontend/package-lock.json`.
- **A Cal.com event path** only if the live booking calendar is wanted. The page remains runnable without one.
- **Vercel access** only if you intend to deploy or manage the hosted site.

Confirm that the first two instruments are present:

```bash
node --version
npm --version
```

## Quick start

From the **repository root** (`tarot_webpage`), install the frontend’s locked dependencies and start Vite:

```bash
npm --prefix frontend ci
npm --prefix frontend run dev
```

Then open [http://localhost:7610](http://localhost:7610). Vite is intentionally configured with `strictPort: true`, so it will use port **7610** or fail clearly instead of silently wandering to another port.

If you prefer to work from the `frontend` directory, the equivalent sequence is:

```bash
cd frontend
npm ci
npm run dev
```

`npm ci` is best for a fresh checkout and CI because it follows the lockfile exactly. `npm install` is acceptable when intentionally updating dependencies, but may change `package-lock.json`.

## Starting and stopping the local servers

There are two local servers to know. Each is a local convenience, not a production process.

| Purpose | Start from repository root | Address | Stop it |
| --- | --- | --- | --- |
| Development server with hot reload | `npm --prefix frontend run dev` | `http://localhost:7610` | Focus that terminal and press `Ctrl-C` once. |
| Production-build preview server | `npm --prefix frontend run preview` | Vite prints the address (normally `http://localhost:4173`) | Focus that terminal and press `Ctrl-C` once. |

The preview server must be preceded by a build:

```bash
npm --prefix frontend run build
npm --prefix frontend run preview
```

If a terminal has vanished into fog but port 7610 remains occupied, identify the listener before stopping it:

```bash
lsof -nP -iTCP:7610 -sTCP:LISTEN
```

Then stop the reported PID gently:

```bash
kill PID
```

Replace `PID` with the number from `lsof`. Do not use broad process-killing commands on the assumption that all local geology is yours to dynamite.

## Every npm script, examined under a hand lens

All scripts live in [`package.json`](./package.json).

| Command | What it does | When to use it |
| --- | --- | --- |
| `npm run dev` | Starts the Vite development server on port 7610 with hot module replacement. Source edits appear in the browser as you work. | Daily development. |
| `npm run build` | Runs `vite build` and emits an optimized static site to `frontend/dist/`. | Before deployment and before previewing production output. |
| `npm run lint` | Runs ESLint across the project. It catches ordinary JavaScript/React problems and locally enforces the styling contract: no inline `style` props, CSS modules, or Tailwind imports. | Before opening a pull request or deploying. |
| `npm run preview` | Serves the already-built contents of `dist/` locally via Vite. It does **not** rebuild first. | Final local inspection of the production artifact. |

From the repository root, prefix each with `npm --prefix frontend`, for example:

```bash
npm --prefix frontend run lint
npm --prefix frontend run build
```

There is deliberately no `start` script and no long-running Node backend to operate. In this formation, Vite is the temporary field camp; `dist/` is the finished rock specimen shipped to static hosting.

## Environment and Cal.com booking

The embedded calendar is controlled by one client-side Vite variable:

```dotenv
VITE_CAL_LINK=your-cal-username/your-event-slug
```

For local work, create `frontend/.env.local` with that line, then restart `npm run dev`. For example:

```dotenv
VITE_CAL_LINK=bazil-bacchanalia-dazil/60min
```

Vite reads `.env.local` automatically, and this file is ignored by the project’s `*.local` gitignore rule. An existing `.env` is also read by Vite, but `.env.local` is the safer place for machine-specific settings.

Important mineralogical caution: any variable beginning with `VITE_` is compiled into the browser bundle. It is public information, not a vault. Never put API keys, passwords, tokens, or other secrets in it.

When `VITE_CAL_LINK` is absent:

- in development, the booking area displays setup instructions and the example variable;
- in a production build, it reports that online scheduling is unavailable;
- the rest of the website remains functional.

The calendar component uses `@calcom/embed-react` with the `15min` namespace and a month-oriented layout. The value should be the Cal.com event path expected by Cal.com—not necessarily a full URL.

## Project map

```text
tarot_webpage/                         # Repository root; Vercel’s primary build config lives here
├── vercel.json                         # Installs, builds, publishes frontend/, and rewrites SPA routes
└── frontend/                           # This application and the GitHub-facing README
    ├── package.json                    # Scripts and JavaScript dependencies
    ├── package-lock.json               # Exact dependency record for npm ci
    ├── vite.config.js                  # React/Vite configuration; dev server fixed to :7610
    ├── vercel.json                     # SPA rewrite if Vercel is configured with frontend as its Root Directory
    ├── index.html                      # Vite document shell, favicon, metadata, and root element
    ├── public/                         # Files copied unchanged to the built site root
    ├── src/
    │   ├── main.jsx                    # React entry point: StrictMode, router, experience-mode provider
    │   ├── App.jsx                     # `/` and `/book` routes plus the booking-page shell
    │   ├── assets/                     # Responsive source images for the landing page
    │   ├── components/
    │   │   ├── landing/                # Header, hero, offerings, gallery, booking embed, footer, atmosphere
    │   │   └── booking/                # Reusable booking experience panel
    │   ├── content/landingContent.js   # Mode-specific copy, navigation, and content data
    │   ├── context/                    # Tarot/clown mode state, URL handling, and local-storage persistence
    │   └── styles/                     # Theme tokens, global styles, and shared styled-component primitives
    └── STYLE_CANON.md                  # The project’s visual and interaction constitution
```

The Vite build output, `frontend/dist/`, is generated material. It is ignored by Git and should be rebuilt rather than edited by hand.

## Routes and experience modes

The site is a browser-router single-page application (SPA): client-side JavaScript chooses the content after the static host has served the document.

| Path | Purpose |
| --- | --- |
| `/` | The landing page: hero, about, offerings, approach, optional gallery, embedded booking section, and footer. |
| `/book` | A dedicated booking page using the same booking experience and mode switch. |

Both routes must resolve to `index.html` on a static host. The Vercel configuration supplies that rewrite; a missing rewrite produces the familiar fossilized 404 when someone visits `/book` directly.

Mode behavior is intentionally shareable and persistent:

- `?mode=tarot` opens Tarot mode and saves that preference.
- `?mode=clown` opens Clown mode and saves that preference.
- A valid URL choice takes precedence over the previously saved browser preference.
- The preference is stored under `bazil-experience-mode` in `localStorage` when storage is available.
- Toggling the control preserves the current route, existing query parameters, and hash anchor while updating `mode` in the URL.

[For the department’s tectonic entertainment, behold this plate-subduction animation.](https://storymaps.arcgis.com/stories/e838e94011024acf925f912c3ba2b95d)

## Styling, accessibility, and the visual canon

This interface is not a generic dashboard dressed in a velvet cape. Its design rules are recorded in [`STYLE_CANON.md`](./STYLE_CANON.md), while the reusable visual matter is in [`src/styles/theme.js`](./src/styles/theme.js) and [`src/styles/primitives.js`](./src/styles/primitives.js).

Practical rules for contributors:

- Rendered DOM elements must originate from `styled-components`; do not add inline styles, CSS modules, or Tailwind.
- Reuse theme tokens and shared primitives before creating new colors, spacing, shadows, radii, borders, or transitions.
- Preserve the dark cosmic, editorial, restrained visual language. Acid green denotes emphasis; purple glow is atmospheric, not a substitute for hierarchy.
- Motion should be slow and supportive. Meaningful animation must respect `prefers-reduced-motion`.
- Keep the hero visually dominant and the subsequent sections calm and legible.
- Retain keyboard and accessibility affordances such as skip links, visible focus states, semantic headings, and forced-colors fallbacks.

Clown mode is an intentional, visitor-selected overlay—not a second ungoverned website. It may alter atmosphere and nonessential copy, but not the service hierarchy, navigation, booking path, or accessible use of the page.

## Vercel deployment notes

### The recommended repository-root configuration

This repository already has a root-level [`vercel.json`](../vercel.json). When the Vercel project’s **Root Directory** is the repository root, it is the configuration to use:

```json
{
  "installCommand": "npm --prefix frontend ci",
  "buildCommand": "npm --prefix frontend run build",
  "outputDirectory": "frontend/dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

In plain field terms, Vercel will:

1. install the exact frontend dependencies with `npm ci`;
2. run the production Vite build;
3. publish `frontend/dist` as static files; and
4. send every request—including `/book`—to `index.html`, allowing React Router to select the page.

In the Vercel dashboard, create or inspect the project and confirm:

| Setting | Recommended value |
| --- | --- |
| Root Directory | Repository root (leave it at the default) |
| Install Command | Read from root `vercel.json`: `npm --prefix frontend ci` |
| Build Command | Read from root `vercel.json`: `npm --prefix frontend run build` |
| Output Directory | Read from root `vercel.json`: `frontend/dist` |
| Framework Preset | Vite is appropriate; the explicit build settings are authoritative |
| Environment Variable | Add `VITE_CAL_LINK` for Production, Preview, and Development as desired |

For a command-line deployment from the repository root, use the Vercel CLI through `npx`:

```bash
npx vercel
```

Follow the prompts to link the project and create a preview deployment. When the strata look sound, deploy to production:

```bash
npx vercel --prod
```

Vercel may also be connected to the GitHub repository so that pushes produce deployments automatically. Preview deployments normally correspond to non-production branches or pull requests; production deployments normally follow the production branch configured in Vercel. The exact branch policy is a Vercel project setting, not a React setting.

### Why there are two `vercel.json` files

[`frontend/vercel.json`](./vercel.json) contains the same SPA rewrite but no install, build, or output settings. It is useful **only if** the Vercel project is deliberately configured with `frontend` as its Root Directory; in that arrangement Vercel’s conventional Vite defaults can build `dist/` from that directory.

Choose one root-directory model and keep it consistent. For this repository, the root-level model above is preferred because it explicitly tells Vercel where the app and its build output live. Do not configure a repository-root project with `frontend/dist` while also changing the Vercel Root Directory to `frontend`; that would make the output path incorrectly point at `frontend/frontend/dist`.

### Environment variables on Vercel

In **Project Settings → Environment Variables**, add:

```text
VITE_CAL_LINK=your-cal-username/your-event-slug
```

Set it for the deployment environments that should display a calendar. Redeploy after changing it: Vite substitutes `VITE_` variables while building, so an already-created static deployment cannot learn a new value by sedimentary patience alone.

## Verification and troubleshooting

Before sending a deployment into the atmosphere, run:

```bash
npm --prefix frontend run lint
npm --prefix frontend run build
npm --prefix frontend run preview
```

Then inspect both `http://localhost:4173/` (or the address Vite prints) and `http://localhost:4173/book`. Also test the appropriate sharing URL, for example `/?mode=clown`.

| Symptom | Likely cause | Useful response |
| --- | --- | --- |
| `Port 7610 is already in use` | Another process is listening there; `strictPort` prevents Vite from choosing a different port. | Use `lsof -nP -iTCP:7610 -sTCP:LISTEN`, then stop the identified process or use its existing server. |
| The booking calendar is replaced by setup guidance locally | `VITE_CAL_LINK` is missing or Vite has not been restarted since it changed. | Put the event path in `frontend/.env.local`, then stop and restart the dev server. |
| Production says booking is unavailable | The Vercel build did not receive `VITE_CAL_LINK`. | Add the variable in the correct Vercel environment and redeploy. |
| Direct navigation to `/book` is a 404 | The host does not rewrite SPA requests to `index.html`. | Preserve the Vercel rewrite or add the equivalent rule for the host. |
| `npm run preview` seems stale | Preview serves existing `dist/`; it does not build. | Run `npm run build` first, then start preview again. |
| Lint rejects a harmless-looking `style={{ ... }}` | Inline styles are intentionally prohibited by this project’s ESLint configuration. | Make a styled component and use theme tokens or a shared primitive. |

## A concise release checklist

- [ ] `npm --prefix frontend ci` completed from a clean checkout (or dependencies are otherwise current).
- [ ] `npm --prefix frontend run lint` passes.
- [ ] `npm --prefix frontend run build` passes.
- [ ] The preview looks correct at `/` and `/book`.
- [ ] Tarot and clown URLs behave as intended.
- [ ] `VITE_CAL_LINK` is present in the required Vercel environments, if booking is meant to be live.
- [ ] The Vercel project uses one consistent root-directory configuration.
- [ ] No secrets have been placed in a `VITE_` variable.

Finally, should morale begin to decline during deployment, [consult the EarthScope geological GIF collection](https://giphy.com/EarthScope_sci). The crust moves slowly; static sites, ideally, move a little faster.
