import aboutPortrait480Avif from '../assets/about-sea-witch-v2-480.avif'
import aboutPortrait900Avif from '../assets/about-sea-witch-v2-900.avif'
import aboutPortrait480Webp from '../assets/about-sea-witch-v2-480.webp'
import aboutPortrait900Webp from '../assets/about-sea-witch-v2-900.webp'
import clownAboutPortrait480Avif from '../assets/about-clown-oracle-v1-480.avif'
import clownAboutPortrait900Avif from '../assets/about-clown-oracle-v1-900.avif'
import clownAboutPortrait480Webp from '../assets/about-clown-oracle-v1-480.webp'
import clownAboutPortrait900Webp from '../assets/about-clown-oracle-v1-900.webp'
import galleryReading720Avif from '../assets/img-1-720.avif'
import galleryReading1440Avif from '../assets/img-1-1440.avif'
import galleryReading720Webp from '../assets/img-1-720.webp'
import galleryReading1440Webp from '../assets/img-1-1440.webp'
import galleryPerformance640Avif from '../assets/img-2-640.avif'
import galleryPerformance1280Avif from '../assets/img-2-1280.avif'
import galleryPerformance640Webp from '../assets/img-2-640.webp'
import galleryPerformance1280Webp from '../assets/img-2-1280.webp'
import aboutSource from '../../../content/about.md?raw'

function parseHeading(line) {
  const match = line.trim().match(/^(#{1,6})\s+(.+?)\s*$/)

  if (!match) return null

  return {
    level: match[1].length,
    text: match[2].trim(),
  }
}

function extractHeadingBlock(lines, headingName) {
  const startIndex = lines.findIndex((line) => {
    const heading = parseHeading(line)
    return heading?.text.toLowerCase() === headingName.toLowerCase()
  })

  if (startIndex === -1) return []

  const startHeading = parseHeading(lines[startIndex])
  const block = []

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const heading = parseHeading(lines[index])

    if (heading && heading.level <= startHeading.level) break
    if (lines[index].trim() === '---') break

    block.push(lines[index])
  }

  return block
}

function toParagraphs(lines) {
  return lines
    .join('\n')
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join(' '),
    )
    .filter(Boolean)
}

function toText(lines) {
  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
}

function toTerms(lines) {
  return lines.map((line) => line.trim()).filter(Boolean)
}

function parseExpandedSections(lines) {
  const sectionStarts = []

  lines.forEach((line, index) => {
    const match = line.trim().match(/^#{1,2}\s+SECTION\s+(\d+)\s*$/i)

    if (match) {
      sectionStarts.push({ index, number: Number(match[1]) })
    }
  })

  return sectionStarts.map((section, sectionIndex) => {
    const nextSection = sectionStarts[sectionIndex + 1]
    const sectionLines = lines.slice(section.index + 1, nextSection?.index ?? lines.length)
    const labelLines = extractHeadingBlock(sectionLines, 'Label')
    const headingLines = extractHeadingBlock(sectionLines, 'Heading')
    const bodyLines = extractHeadingBlock(sectionLines, 'Body')
    const termLines = extractHeadingBlock(sectionLines, 'Floating Terms')

    return {
      number: section.number,
      label: toText(labelLines),
      heading: toText(headingLines),
      paragraphs: toParagraphs(bodyLines),
      terms: toTerms(termLines),
    }
  })
}

function parseAboutSource(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const sections = parseExpandedSections(lines)
  const sectionByNumber = Object.fromEntries(
    sections.map((section) => [section.number, section]),
  )

  return {
    eyebrow: toText(extractHeadingBlock(lines, 'Eyebrow')),
    title: toText(extractHeadingBlock(lines, 'Main Heading')),
    intro: toParagraphs(extractHeadingBlock(lines, 'Intro Fragment')),
    readings: sectionByNumber[1],
    performance: sectionByNumber[2],
    philosophy: sectionByNumber[3],
    energy: sectionByNumber[4],
  }
}

const parsedAbout = parseAboutSource(aboutSource)

const about = {
  eyebrow: parsedAbout.eyebrow || 'Orbital dossier',
  title: parsedAbout.title || 'About Bazil',
  intro:
    parsedAbout.intro.length > 0
      ? parsedAbout.intro
      : [
          'A reader of symbols. A theatrical menace. A cosmic companion for uncertain roads.',
          'Tarot, performance, ritual, and storytelling from somewhere just beyond ordinary life.',
        ],
  portrait: {
    src: aboutPortrait900Webp,
    avifSrcSet: `${aboutPortrait480Avif} 480w, ${aboutPortrait900Avif} 900w`,
    webpSrcSet: `${aboutPortrait480Webp} 480w, ${aboutPortrait900Webp} 900w`,
    sizes: '(max-width: 760px) calc(100vw - 3rem), 38vw',
    width: 1086,
    height: 1448,
    alt: 'An illustrated sea-witch spirit lays out tarot cards inside a submerged celestial observatory.',
    caption: 'Reader · performer · ritual host',
  },
  energy: {
    label: parsedAbout.energy?.heading || 'Somewhere between',
    terms: parsedAbout.energy?.terms || [],
  },
}

const offerings = {
  eyebrow: 'Ways into the work',
  title: 'Tarot and performance',
  intro:
    about.intro[1] ||
    'Tarot, performance, ritual, and storytelling from somewhere just beyond ordinary life.',
  items: [
    {
      id: 'tarot',
      index: '01',
      label: parsedAbout.readings?.label || 'The readings',
      title: 'Tarot Readings',
      statement:
        parsedAbout.readings?.heading || 'The cards are not here to control your future.',
      paragraphs: parsedAbout.readings?.paragraphs || [
        'They are mirrors. Signals. Pattern recognition tools.',
      ],
    },
    {
      id: 'drag',
      index: '02',
      label: parsedAbout.performance?.label || 'The performance',
      title: 'Drag Performances',
      statement:
        parsedAbout.performance?.heading ||
        'Drag as oracle. Drag as theater. Drag as transmission.',
      paragraphs: parsedAbout.performance?.paragraphs || [
        'Performance here is transformation: cabaret spectacle, cosmic clownery, ritual glamour, and joyful disruption.',
      ],
    },
  ],
  bookingLink: {
    label: 'View booking options',
    href: '#book',
  },
}

const tarotOfferings = {
  ...offerings,
  emphasis: 'tarot',
  title: 'Tarot readings, with performance in orbit',
  intro:
    'Tarot is the center of this chamber: a reflective conversation with images, symbols, patterns, and the question you bring.',
  items: [
    {
      ...offerings.items[0],
      presentation: 'primary',
      pathwayLabel: 'A reading may move through',
      pathways: [
        {
          glyph: '☉',
          title: 'Image and symbol',
          description: 'Notice what catches your attention before deciding what it means.',
        },
        {
          glyph: '◇',
          title: 'Pattern and context',
          description: 'Place the cards beside the question, surrounding positions, and recurring themes.',
        },
        {
          glyph: '✦',
          title: 'Reflection and agency',
          description: 'Carry forward perspective and better questions; the choices remain yours.',
        },
      ],
    },
    {
      ...offerings.items[1],
      label: 'Also in orbit',
      title: 'Drag performance',
      statement: 'The theatrical practice remains close by.',
      paragraphs: [
        'Cabaret spectacle, ritual glamour, and cosmic clownery surface more fully when the clown protocol is engaged.',
      ],
      presentation: 'aside',
    },
  ],
}

const clownOfferings = {
  ...offerings,
  emphasis: 'performance',
  items: [
    {
      ...offerings.items[0],
      presentation: 'supporting',
    },
    {
      ...offerings.items[1],
      presentation: 'primary',
    },
  ],
}

const approach = {
  eyebrow: parsedAbout.philosophy?.label || 'The philosophy',
  title:
    parsedAbout.philosophy?.heading ||
    'Not fortune telling. More like signal interpretation.',
  paragraphs: parsedAbout.philosophy?.paragraphs || [
    'The goal is not perfection. The goal is presence. Recognition. Connection.',
    'To illuminate patterns. To sit with uncertainty. To make meaning together.',
  ],
  agencyStatement:
    'The cards can open questions and offer perspective. They do not make the decision; what happens next remains yours.',
  principles: ['Presence', 'Recognition', 'Connection'],
}

const readingPerformanceImage = {
  id: 'reading-performance',
  slot: 'primary',
  src: galleryReading1440Webp,
  avifSrcSet: `${galleryReading720Avif} 720w, ${galleryReading1440Avif} 1440w`,
  webpSrcSet: `${galleryReading720Webp} 720w, ${galleryReading1440Webp} 1440w`,
  sizes: '(max-width: 760px) calc(100vw - 3rem), 58vw',
  width: 1440,
  height: 1196,
  orientation: 'landscape',
  alt: 'Bazil performs under violet light in graphic face paint, holding an open blue book lit from within.',
  caption: 'Reading from an illuminated book during a live performance.',
}

const clownPerformanceImage = {
  id: 'clown-performance',
  slot: 'tower',
  src: galleryPerformance1280Webp,
  avifSrcSet: `${galleryPerformance640Avif} 640w, ${galleryPerformance1280Avif} 1280w`,
  webpSrcSet: `${galleryPerformance640Webp} 640w, ${galleryPerformance1280Webp} 1280w`,
  sizes: '(max-width: 760px) calc(100vw - 3rem), 38vw',
  width: 1280,
  height: 1793,
  orientation: 'portrait',
  alt: 'Bazil performs in a colorful clown costume while shaping a long balloon onstage.',
  caption: 'Balloon evidence, presented without comment.',
}

const galleryPlaceholders = [
  {
    id: 'archive-slot-three',
    slot: 'portal',
    orientation: 'landscape',
    placeholder: true,
    glyph: 'Ⅲ',
    alt: 'Placeholder for a future performance photograph.',
    caption: 'Archive slot 03 · image pending',
  },
  {
    id: 'archive-slot-four',
    slot: 'relic',
    orientation: 'portrait',
    placeholder: true,
    glyph: 'Ⅳ',
    alt: 'Placeholder for a future performance photograph.',
    caption: 'Archive slot 04 · image pending',
  },
  {
    id: 'archive-slot-five',
    slot: 'corridor',
    orientation: 'landscape',
    placeholder: true,
    glyph: 'Ⅴ',
    alt: 'Placeholder for a future performance photograph.',
    caption: 'Archive slot 05 · image pending',
  },
  {
    id: 'archive-slot-six',
    slot: 'altar',
    orientation: 'landscape',
    placeholder: true,
    glyph: 'Ⅵ',
    alt: 'Placeholder for a future performance photograph.',
    caption: 'Archive slot 06 · image pending',
  },
  {
    id: 'archive-slot-seven',
    slot: 'threshold',
    orientation: 'landscape',
    placeholder: true,
    glyph: 'Ⅶ',
    alt: 'Placeholder for a future performance photograph.',
    caption: 'Archive slot 07 · image pending',
  },
]

const galleryBase = {
  eyebrow: 'Selected scenes',
  title: 'Performance in the field',
  description:
    parsedAbout.performance?.paragraphs?.[0] ||
    'Performance here is transformation: cabaret spectacle, cosmic clownery, ritual glamour, and joyful disruption.',
}

const sharedLandingContent = {
  practiceStrip: 'Tarot · ritual · drag performance',
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Offerings', href: '#offerings' },
    { label: 'Approach', href: '#approach' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Book', href: '#book' },
  ],
  hero: {
    eyebrow: 'Tarot · ritual · drag performance',
    title: 'Bazil Bacchanalia Dazil',
    positioning: 'Tarot for the Divine Masculine',
    description:
      'Intuitive readings, ritual, and drag performance to help you navigate the mysteries between worlds.',
    primaryCta: {
      label: 'View booking options',
      href: '#book',
    },
    secondaryCta: {
      label: 'Explore the offerings',
      href: '#offerings',
    },
  },
  about,
  offerings: tarotOfferings,
  approach,
  booking: {
    label: 'Booking calendar',
    title: 'Reserve a reading or appearance.',
    description:
      'Choose an available time below. The calendar will show the current options and confirmation details.',
  },
  footer: {
    signoff: 'See you between worlds.',
  },
}

const tarotLandingContent = {
  ...sharedLandingContent,
  navigation: sharedLandingContent.navigation.filter((item) => item.href !== '#gallery'),
  gallery: null,
}

const clownLandingContent = {
  ...sharedLandingContent,
  practiceStrip: 'Tarot · ritual · drag · responsible clownery',
  hero: {
    ...sharedLandingContent.hero,
    eyebrow: 'Clown protocol engaged',
    positioning: 'Tarot for the Divine Ridiculous',
    description:
      'Intuitive readings, ritual, and drag performance for navigating the mysteries between worlds—and the occasional balloon emergency.',
  },
  about: {
    ...about,
    portrait: {
      ...about.portrait,
      src: clownAboutPortrait900Webp,
      avifSrcSet: `${clownAboutPortrait480Avif} 480w, ${clownAboutPortrait900Avif} 900w`,
      webpSrcSet: `${clownAboutPortrait480Webp} 480w, ${clownAboutPortrait900Webp} 900w`,
      alt: 'An illustrated cosmic clown oracle arranges tarot cards inside a submerged celestial observatory.',
      caption: 'Reader · performer · cosmic nuisance',
    },
  },
  offerings: clownOfferings,
  gallery: {
    ...galleryBase,
    status: '2 recovered · 5 awaiting material',
    images: [readingPerformanceImage, clownPerformanceImage, ...galleryPlaceholders],
  },
  footer: {
    signoff: 'See you between worlds. Honk responsibly.',
  },
}

export const landingContentByMode = Object.freeze({
  tarot: tarotLandingContent,
  clown: clownLandingContent,
})

export const landingContent = tarotLandingContent
