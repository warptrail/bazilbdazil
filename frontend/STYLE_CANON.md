# Style Canon

This landing page uses a restrained cosmic editorial system built around contrast, atmosphere, and negative space.

## Core Visual Rules

- Backgrounds stay in the near-black blue and violet range. Surfaces should feel nocturnal, not neutral.
- Primary text is pale lavender-white. Secondary copy can soften toward muted lavender or misted white.
- Acid green is a sparing accent for CTAs, emphasized words, active states, orbital marks, and ritual dividers.
- Ultraviolet glow is atmospheric only. Use it to create depth behind content, not as a competing action color.
- Borders stay thin, geometric, and understated. They frame panels and orbits without becoming the focal point.
- Glow should be restrained. Prefer one glow layer per composition instead of stacking effects everywhere.

## Typography

- Display typography is oversized, serif, high-contrast, and tightly tracked.
- Supporting serif headings can carry the same tone at smaller sizes.
- Navigation, buttons, labels, and footer text stay uppercase with wide letter spacing.
- Body copy remains clean and readable with generous line height and ample space around it.

## Layout

- Preserve large editorial hero proportions and generous negative space.
- Keep compositions asymmetrical but controlled, with content anchored against orbital linework and soft glow fields.
- Cards and booking surfaces should feel like part of the same celestial system through borders, glassy dark fills, and selective accent color.

## Implementation Notes

- Canonical tokens live in [src/styles/theme.js](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/src/styles/theme.js).
- Reusable primitives live in [src/styles/primitives.js](/Users/moonshade/Developer/tarot_webpage/tarot-webpage/src/styles/primitives.js).
- New landing-page components should compose those primitives before introducing new one-off values.

## Midnight Carnival Overlay

Clown Mode is an explicit, visitor-selected persona layered over the core cosmic editorial system. It changes atmosphere and selected nonessential language, not the page hierarchy, service meaning, navigation, or booking workflow.

- Tarot Mode is the first-visit default and contains no clown imagery.
- Clown Mode uses warm black, deep plum, ivory, controlled cyan, lacquer pink, and muted gold through the same semantic theme interface.
- Editorial serif typography, thin geometry, generous negative space, and restrained glow remain unchanged.
- Clown imagery belongs in the hero and performance gallery only while Clown Mode is active.
- Humor belongs in labels, captions, and atmospheric copy. Service descriptions, agency language, CTAs, and booking instructions remain clear and stable.
- Sparse pink and cyan constellation points may suggest confetti, but animated confetti, novelty fonts, rainbow surfaces, bouncing controls, and glow cycling are outside the canon.
- Mode transitions stay slow and theatrical and must respect `prefers-reduced-motion`.
