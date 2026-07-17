# AGENTS.md

This repository contains the tarot landing page application in `/Users/moonshade/Developer/tarot_webpage/tarot-webpage`.

## Visual Canon & Styling Contract

- All rendered DOM elements must originate from styled-components.
- Do not use inline styles.
- Do not use CSS modules.
- Do not use Tailwind.
- Do not introduce ad hoc hardcoded colors, spacing, radii, shadows, borders, or transitions when theme tokens already exist.
- Reuse shared primitives before creating new layout or styling patterns.
- Preserve the established visual language documented in [STYLE_CANON.md](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/STYLE_CANON.md).

The current canon is defined by:

- dark cosmic atmosphere
- editorial serif typography
- restrained neon accents
- acid green emphasis
- subtle orbital geometry
- high negative space
- minimal visual clutter

Primary implementation references:

- [STYLE_CANON.md](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/STYLE_CANON.md)
- [theme.js](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/src/styles/theme.js)
- [primitives.js](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/src/styles/primitives.js)

## Design Philosophy

- The hero carries most of the visual intensity. Down-page sections should support it, not compete with it.
- Glow is rare and intentional. Use it to create atmosphere or focal depth, not to decorate every component.
- Acid green is reserved for emphasis, active energy, CTA treatment, key dividers, and selected ritual marks.
- Purple glow is atmospheric, not informational. It should not replace clear hierarchy or state signaling.
- Components should feel ceremonial and editorial, not corporate SaaS.
- Layouts should prioritize calm spacing, legibility, and composure over density.

## Styled Component Composition Rules

- Prefer extending shared primitives from [primitives.js](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/src/styles/primitives.js) before creating new visual patterns.
- Avoid deeply nested styling and brittle selector chains.
- Colocate styled components with feature components where practical.
- Use semantic, intent-based names rather than purely visual names when the component has product meaning.
- Avoid one-off visual hacks that bypass the established theme.
- Prefer tokenized transitions, radii, shadows, borders, spacing, and typography values from [theme.js](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/src/styles/theme.js).

## Animation Rules

- Motion should be slow, ambient, and supportive of atmosphere.
- Respect `prefers-reduced-motion` for any meaningful motion or looping effect.
- Avoid excessive looping, pulsing, shimmer, or glow cycling.
- Animation should support hierarchy and mood, not distract from content or readability.

## AI Agent Expectations

- Do not redesign the established canon unless the user explicitly requests a redesign.
- Maintain consistency with [STYLE_CANON.md](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/STYLE_CANON.md).
- Use theme tokens first.
- Preserve the styled-components-only architecture for rendered DOM.
- Do not introduce competing visual languages, such as corporate dashboard styling, utility-class systems, or unrelated trend aesthetics.
- When adding UI, first check whether an existing primitive or token already expresses the needed pattern.

## Lightweight Enforcement Guidance

- Keep enforcement lightweight and local to existing tooling.
- Use ESLint to catch obvious architectural violations where practical.
- Current lint guidance should discourage inline `style` props and imports of CSS modules or Tailwind artifacts.
- Do not add heavy styling toolchain churn unless explicitly requested.
