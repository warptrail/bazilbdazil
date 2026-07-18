export const JOURNEY_SETTLE_DELAY = 120
export const JOURNEY_INTENT_THRESHOLD = 18
export const JOURNEY_DISPLACEMENT_THRESHOLD = 0.1
export const JOURNEY_SPRING_MAX_DURATION = 700

export const clampJourneyValue = (value, minimum = 0, maximum = 1) =>
  Math.min(Math.max(value, minimum), maximum)

export function buildJourneyChapters(hasGallery) {
  const chapters = [
    { id: 'home', label: 'Home', hue: 0, moments: ['hero'] },
    { id: 'about', label: 'About', hue: 18, moments: ['narrative', 'portrait'] },
    {
      id: 'offerings',
      label: 'Offerings',
      hue: 42,
      moments: ['oracle', 'primary', 'pathways', 'secondary'],
    },
    { id: 'approach', label: 'Approach', hue: -18, moments: ['instrument', 'principles'] },
  ]

  if (hasGallery) {
    chapters.push({
      id: 'gallery',
      label: 'Gallery',
      hue: 96,
      moments: ['primary', 'performance', 'archive-a', 'archive-b'],
    })
  }

  chapters.push(
    { id: 'book', label: 'Book', hue: 70, moments: ['introduction', 'calendar'] },
    { id: 'footer', label: 'End', hue: 28, moments: ['signoff', 'navigation'] },
  )

  let milestoneIndex = 0
  return chapters.map((chapter, chapterIndex) => {
    const startIndex = milestoneIndex
    const milestones = chapter.moments.map((moment, momentIndex) => ({
      id: `${chapter.id}:${moment}`,
      chapterId: chapter.id,
      chapterIndex,
      moment,
      momentIndex,
      index: milestoneIndex++,
    }))

    return {
      ...chapter,
      chapterIndex,
      href: `#${chapter.id}`,
      milestones,
      startIndex,
      endIndex: milestoneIndex - 1,
    }
  })
}

export function flattenJourneyMilestones(chapters) {
  return chapters.flatMap((chapter) => chapter.milestones)
}

export function calculateJourneyGeometry({
  viewportHeight,
  viewportWidth,
  headerBottom,
  headerGap,
  atlasHeight,
  atlasBottomGap,
  safeAreaBottom = 0,
  runwayDocumentTop,
  milestoneCount,
}) {
  const top = Math.max(headerBottom, 0) + Math.max(headerGap, 0)
  const bottom = Math.max(atlasHeight, 0) + Math.max(atlasBottomGap, 0) + Math.max(safeAreaBottom, 0)
  const stageHeight = Math.max(280, viewportHeight - top - bottom)
  const mobile = viewportWidth <= 760
  const unit = mobile
    ? clampJourneyValue(stageHeight * 0.14, 96, 144)
    : clampJourneyValue(stageHeight * 0.22, 160, 240)
  const distance = Math.max(milestoneCount - 1, 0) * unit
  const start = Math.max(0, runwayDocumentTop - top)
  const runwayHeight = stageHeight + bottom + distance

  return { top, bottom, stageHeight, unit, distance, start, runwayHeight }
}

export function resolveJourneySnapIndex({
  rawPosition,
  settledIndex,
  milestoneCount,
  direction,
  accumulatedIntent,
}) {
  const maximum = Math.max(milestoneCount - 1, 0)
  const displacement = rawPosition - settledIndex
  const hasDirectionalIntent = Math.abs(accumulatedIntent) >= JOURNEY_INTENT_THRESHOLD
  const crossedDisplacement = Math.abs(displacement) >= JOURNEY_DISPLACEMENT_THRESHOLD

  if ((hasDirectionalIntent || crossedDisplacement) && direction !== 0) {
    return clampJourneyValue(settledIndex + direction, 0, maximum)
  }

  return clampJourneyValue(Math.round(rawPosition), 0, maximum)
}

export function remapJourneyMilestone({ chapters, chapterId, momentIndex = 0 }) {
  const fallbackId = chapterId === 'gallery' ? 'book' : 'home'
  const chapter = chapters.find((candidate) => candidate.id === chapterId)
    ?? chapters.find((candidate) => candidate.id === fallbackId)
    ?? chapters[0]
  const nextMoment = clampJourneyValue(momentIndex, 0, chapter.milestones.length - 1)

  return chapter.milestones[nextMoment]
}
