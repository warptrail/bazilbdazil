<div align="center">

<img src="./frontend/public/social/bazil-social-landscape.png" alt="Bazil Bacchanalia Dazil — tarot, ritual, drag performance, and cosmic signal interpretation" width="100%" />

<br />

# ✦ BAZIL BACCHANALIA DAZIL ✦

### `A TAROT OBSERVATORY // A DRAG TRANSMISSION // A SMALL REACT APP AT THE END OF THE WORLD`

**United States Cyber-Geological Survey — Folio № 0xXIII**<br />
*Revised after the Flood · Printed somewhere west of certainty*

[![React](https://img.shields.io/badge/React_19-05070b?style=for-the-badge&logo=react&logoColor=8dff45)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-190f28?style=for-the-badge&logo=vite&logoColor=d5b6ff)](https://vite.dev/)
[![styled-components](https://img.shields.io/badge/styled--components-09171a?style=for-the-badge&logo=styledcomponents&logoColor=fa68dc)](https://styled-components.com/)
[![Vercel](https://img.shields.io/badge/Vercel-04060a?style=for-the-badge&logo=vercel&logoColor=f1edff)](https://vercel.com/)

### [⌁ ENTER THE LIVE OBSERVATORY ⌁](https://www.bazilbdazil.com/)

`☉ SIGNAL DETECTED`　`✦ DIVINATION IN PROGRESS`　`♆ CHAOS WITH INTENTION`

</div>

---

> [!IMPORTANT]
> **This is a work of art first.** The software is load-bearing, yes, but so is a cathedral buttress, and nobody visits Chartres to admire the fasteners.

## ⛏ Preliminary notice concerning the specimen

In the autumn of 1947, while mapping a seam of violet shale beneath what the Department insisted was Nevada, I encountered a **sea witch** seated in a chrome bathysphere. The desert had not contained an ocean for several million years. She regarded this as the desert’s problem.

She laid three cards across my field map:

| Position | Card recovered | Departmental interpretation |
| :---: | --- | --- |
| **I · STRATUM** | **The Tower** | Your instruments are accurate. Your life is not. |
| **II · FAULT** | **The Fool** | Proceed, but quit pretending the road has been surveyed. |
| **III · DEPOSITION** | **The Star** | Build the signal. Leave enough darkness around it to breathe. |

Then the horizon split open like cheap stage scenery.

On the far side waited a cyberpunk future of wet neon, privatized weather, devotional algorithms, and vending machines that knew the exact hour of your death but demanded exact change. I carried my rock hammer into that electric country. The sea witch carried the deck. Somewhere along the road we found **Bazil Bacchanalia Dazil**—reader of symbols, theatrical menace, cosmic companion for uncertain roads—and this website accreted around the encounter.

The Department calls it a **static landing page**.

The Department has always had a cramped imagination.

---

## Ⅰ. Abstract — *or, what in hell is this?*

**Bazil Bacchanalia Dazil** is a digital threshold for tarot readings, ritual, storytelling, and drag performance. It is equal parts booking portal, orbital dossier, midnight theatre lobby, and luminous roadside marker for people moving through uncertain country.

The cards here do not command the future. They behave more like instruments held against the stone:

> **mirrors · signals · pattern-recognition tools**

A reading blends intuition, conversation, symbolism, humor, and emotional honesty. The performance practice brings cabaret spectacle, ritual glamour, cosmic clownery, and the occasional existential side quest. Neither practice promises perfection. Both ask for presence.

This repository contains the machine that carries that signal into the browser.

<details>
<summary><strong>⌁ FIELD NOTE 1A — The narrator’s official retraction</strong></summary>

I had previously classified tarot as a foliated superstition of negligible compressive strength. This conclusion was reached before the sea witch correctly identified my father’s watch, the recurring dream involving a black highway, and the precise location of a shame I had buried under thirty-six years of respectable terminology.

The classification has been amended.

</details>

---

## Ⅱ. Two observable strata

The application presents two visitor-selected experience modes. They occupy the same structure, the way quartz and menace may occupy the same vein.

### `☾ TAROT MODE // DEFAULT FORMATION`

Dark cosmic editorial design. Acid-green ritual marks. Ultraviolet atmosphere. Tarot remains at the center of the chamber. No clown imagery enters on first contact.

```text
/?mode=tarot
```

### `✺ CLOWN MODE // MIDNIGHT CARNIVAL INTRUSION`

An opt-in theatrical overlay: warmer blacks, deep plum, lacquer pink, controlled cyan, muted gold, and a little more sanctioned danger. The navigation, offerings, agency language, and booking path remain geologically stable.

```text
/?mode=clown
```

The chosen mode persists in `localStorage` under the unromantic but serviceable key:

```js
bazil-experience-mode
```

> [!NOTE]
> Clown mode is not a joke theme bolted onto the hull. It is a deliberate second persona. There will be no novelty fonts, bouncing controls, rainbow sludge, or confetti cannon fired into the accessibility tree.

---

## Ⅲ. Plate XIII — technical composition of the anomaly

The technology is intentionally modest. A portfolio should not arrive dragging twelve microservices, a venture-capital pitch, and a Kubernetes cluster it cannot explain.

| Layer | Instrument | Present duty |
| --- | --- | --- |
| **Interface** | [React 19](https://react.dev/) | Composes the observatory, booking chamber, modes, and ritual interactions. |
| **Excavation rig** | [Vite 8](https://vite.dev/) | Development server, asset pipeline, and optimized static build. |
| **Surface chemistry** | [styled-components 6](https://styled-components.com/) | Every rendered DOM element; theme tokens; responsive and mode-aware styling. |
| **Navigation** | [React Router 7](https://reactrouter.com/) | Client-side passage between `/` and `/book`. |
| **Orbital apparatus** | [Three.js](https://threejs.org/) | The interactive header oracle and its stranger celestial geometry. |
| **Appointment divination** | [Cal.com Embed](https://cal.com/) | Optional scheduling without a local backend. |
| **Structural assay** | [ESLint 10](https://eslint.org/) | JavaScript checks plus lightweight enforcement of the styling contract. |
| **Atmospheric deployment** | [Vercel](https://vercel.com/) | Static hosting, SPA rewrites, previews, and production release. |

There is **no application server**, **no database**, and **no secret-bearing backend** under this outcrop. Vite produces static files in `frontend/dist/`; Vercel serves them into the electrical night.

### The visual constitution

The interface obeys a deliberately narrow canon:

- dark cosmic atmosphere;
- editorial serif typography;
- restrained neon accents;
- acid green reserved for energy and emphasis;
- purple glow used as weather, never information;
- subtle orbital geometry;
- high negative space;
- minimal clutter;
- slow, ambient motion that respects `prefers-reduced-motion`.

All rendered DOM is styled with `styled-components`. Inline `style` props, CSS Modules, Tailwind, and the casual invention of seventeen nearly identical purples are prohibited by local law.

Read the full tablet: **[frontend/STYLE_CANON.md](./frontend/STYLE_CANON.md)**.

---

## Ⅳ. Field procedure for raising the observatory

### Required instruments

- **Node.js 20 LTS or newer** is the sensible starting formation.
- **npm**, because the lockfile has already made its choice.
- A modern browser that has not been cursed by a railway baron.

From the repository root:

```bash
git clone git@github.com:warptrail/bazilbdazil.git
cd bazilbdazil
npm --prefix frontend ci
npm --prefix frontend run dev
```

Open **[http://localhost:7610](http://localhost:7610)**.

Port `7610` is strict. If another process occupies it, Vite reports the collision rather than sneaking off to another number like a surveyor altering a boundary stone at midnight.

### Standard commands

| Rite | Command from repository root | Result |
| --- | --- | --- |
| **Raise the local signal** | `npm --prefix frontend run dev` | Starts Vite on `http://localhost:7610`. |
| **Inspect the strata** | `npm --prefix frontend run lint` | Runs ESLint and styling-contract checks. |
| **Compress the specimen** | `npm --prefix frontend run build` | Writes the production artifact to `frontend/dist/`. |
| **View the sealed specimen** | `npm --prefix frontend run preview` | Serves the existing production build locally. |

Or descend into the application directory and omit the prefix:

```bash
cd frontend
npm ci
npm run dev
```

<details>
<summary><strong>⚠ The port is occupied and the night is getting ugly</strong></summary>

Identify the listener:

```bash
lsof -nP -iTCP:7610 -sTCP:LISTEN
```

Then stop the **specific** reported process gently. Do not dynamite every Node process on the continent because one field camp left a lantern burning.

</details>

---

## Ⅴ. The Cal.com aperture

Booking is controlled by one client-side Vite variable:

```dotenv
VITE_CAL_LINK=your-cal-username/your-event-slug
```

For local use, place it in `frontend/.env.local`, then restart the development server.

> [!CAUTION]
> Every variable prefixed with `VITE_` is compiled into the browser bundle. It is public sediment. Never bury API keys, passwords, tokens, forbidden coordinates, or the sea witch’s true name there.

Without `VITE_CAL_LINK`, the rest of the site still functions. Development shows setup guidance; production reports that online scheduling is unavailable. No false doorway. No dead ritual.

---

## Ⅵ. Survey map

```text
bazilbdazil/
├── README.md                         ← you are standing here, more or less
├── AGENTS.md                         ← laws for machine collaborators
├── content/
│   └── about.md                      ← source dossier: readings, performance, philosophy
├── vercel.json                       ← root build + SPA rewrite instructions
└── frontend/
    ├── README.md                     ← exhaustive and relatively sober field handbook
    ├── STYLE_CANON.md                ← visual constitution
    ├── package.json                  ← dependencies and four npm rites
    ├── vite.config.js                ← React compiler + strict port 7610
    ├── public/                       ← icons, social images, robots, sitemap
    └── src/
        ├── App.jsx                   ← route formations: / and /book
        ├── assets/                   ← responsive portraits, masks, performance evidence
        ├── components/
        │   ├── booking/              ← reusable booking experience
        │   └── landing/              ← hero, observatory, offerings, gallery, footer
        ├── content/landingContent.js ← mode-aware language and image records
        ├── context/                  ← mode selection, URL state, persistence, themes
        ├── hooks/                    ← motion-aware arcane timing
        ├── styles/
        │   ├── theme.js              ← canonical tokens for both visible realities
        │   ├── primitives.js         ← reusable styled-components
        │   └── GlobalStyles.js       ← global atmosphere and accessibility rules
        └── utils/                    ← experience preloading apparatus
```

For the dry technical record—the one suitable for engineers, auditors, and relatives who distrust adjectives—consult **[frontend/README.md](./frontend/README.md)**.

---

## Ⅶ. Routes, faults & wormholes

| Coordinate | What emerges |
| --- | --- |
| `/` | Landing page: hero, dossier, offerings, approach, gallery, booking, and footer. |
| `/book` | Dedicated booking chamber with the same experience-mode control. |
| `/?mode=tarot` | A shareable entrance into the default tarot formation. |
| `/?mode=clown` | A shareable entrance into the Midnight Carnival intrusion. |

Because this is a browser-router single-page application, the host must rewrite unknown paths to `index.html`. The root `vercel.json` already contains the necessary instruction. Remove it and `/book` becomes a clean white 404—the digital equivalent of discovering that the bridge on the map was only a suggestion.

---

## Ⅷ. Deployment into the phosphorescent cloud

The recommended Vercel project uses the **repository root** as its Root Directory. The checked-in configuration performs the following sequence:

```text
npm --prefix frontend ci
            ↓
npm --prefix frontend run build
            ↓
frontend/dist
            ↓
THE PUBLIC INTERNET, GOD HELP US
```

Before release:

- [ ] `npm --prefix frontend run lint` passes.
- [ ] `npm --prefix frontend run build` passes.
- [ ] `/` and `/book` survive production preview.
- [ ] Tarot and Clown mode links preserve their selected realities.
- [ ] Keyboard focus remains visible.
- [ ] Reduced-motion visitors are not conscripted into the spectacle.
- [ ] `VITE_CAL_LINK` exists in the intended Vercel environments, if booking is live.
- [ ] No secret has been offered to a `VITE_` variable.
- [ ] The sea witch has been consulted or, at minimum, notified.

For the exact Vercel configuration and troubleshooting table, see the **[deployment notes in the frontend handbook](./frontend/README.md#vercel-deployment-notes)**.

---

## Ⅸ. Notes for future excavators

When altering this site, remember what the machinery serves.

1. **Preserve the signal.** Reuse theme tokens and primitives before minting new visual matter.
2. **Let the hero burn hottest.** Down-page sections support the opening image; they do not compete for its crown.
3. **Keep glow rare.** Atmosphere is powerful because most things are not glowing.
4. **Retain agency.** The cards offer perspective. The person makes the decision.
5. **Make motion hospitable.** Slow, ceremonial, and absent when the visitor asks it to be absent.
6. **Resist corporate uplift.** This is not a SaaS dashboard wearing a velvet cape.
7. **Leave negative space.** Emptiness is not unfinished. It is where the meaning changes clothes.

> “The goal is not perfection. The goal is presence. Recognition. Connection.”

That sentence was recovered from the project’s own orbital dossier, and unlike most departmental slogans, it appears to be true.

---

## Ⅹ. Memory core // recovered personal strata

This project remembers its maker indirectly, the way a landscape remembers weather: through pressure, selection, recurrence, and the peculiar objects left standing.

The repository says:

```text
reader of symbols
theatrical menace
cosmic companion for uncertain roads
oracle
comedian
older sibling
chaotic guide
velvet prophet
cosmic nuisance
ritual host
late-night philosopher
```

It remembers that mystery must stay readable. That playfulness need not dissolve sincerity. That transformation can be glamorous without becoming dishonest. That a booking button may still be a booking button even when surrounded by orbital geometry and a low ultraviolet weather system.

It remembers a person willing to make meaning in public—through code, cards, portraiture, performance, and the dangerous generosity of asking a stranger what they see.

> [!NOTE]
> **Provenance of memory:** this account draws only from the material visible in this repository and the conversation that produced this README. No private or off-record ChatGPT archive was opened, inferred, or rifled through. The sealed chambers remain sealed.

---

## Ⅺ. Final report of the 1947 expedition

By the time we reached the coast, the coast had been sold to a weather company. The sea witch stood beneath a sodium lamp shuffling a deck of translucent cards, each one crowded with futures that flickered and vanished before the eye could become greedy.

“Well?” she asked.

I had gone looking for stable ground. This was the professional sickness of the geologist: the suspicion that beneath every catastrophe there must be something ancient, load-bearing, and still. But the road had taught me otherwise. Stone flows. Mountains go to pieces. Deserts remember oceans. A self is not a monument but a fault line—pressure, rupture, heat, and the audacity to keep becoming.

So I put down the hammer.

Bazil drew one last card.

It showed a green star burning over a black observatory.

Under it, in the severe typeface of some future government, were the words:

<div align="center">

## `NOTHING IS RANDOM.`

### `BUT YOU STILL HAVE TO CHOOSE.`

✦　♆　☉　⌁　⟁　☾　✺

**[Book a reading](https://www.bazilbdazil.com/book)** · **[View source](https://github.com/warptrail/bazilbdazil)** · **[Read the field handbook](./frontend/README.md)**

</div>

---

<sub>
Archive marks: `USCGS–0xXIII–BBD` · specimen class: `COSMIC/EDITORIAL` · hazard class: `ACID GREEN` · last known bearing: somewhere just beyond ordinary life.
</sub>
