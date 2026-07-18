import assert from 'node:assert/strict'
import {
  buildJourneyChapters,
  calculateJourneyGeometry,
  flattenJourneyMilestones,
  remapJourneyMilestone,
  resolveJourneySnapIndex,
} from '../src/utils/journeyMath.js'

const tarotChapters = buildJourneyChapters(false)
const clownChapters = buildJourneyChapters(true)
const tarotMilestones = flattenJourneyMilestones(tarotChapters)
const clownMilestones = flattenJourneyMilestones(clownChapters)

assert.equal(tarotMilestones.length, 13, 'tarot mode exposes 13 milestones')
assert.equal(clownMilestones.length, 17, 'clown mode exposes 17 milestones')
assert.deepEqual(
  clownChapters.map(({ id }) => id),
  ['home', 'about', 'offerings', 'approach', 'gallery', 'book', 'footer'],
  'gallery inserts without changing the stable chapter ids',
)

const desktop = calculateJourneyGeometry({
  viewportHeight: 846,
  viewportWidth: 1497,
  headerBottom: 112,
  headerGap: 12,
  atlasHeight: 46,
  atlasBottomGap: 8,
  runwayDocumentTop: 140,
  milestoneCount: tarotMilestones.length,
})
assert.equal(desktop.top, 124)
assert.equal(desktop.stageHeight, 668)
assert.equal(desktop.unit, 160, 'desktop milestone unit respects its lower clamp')
assert.equal(desktop.start, 16)
assert.equal(desktop.runwayHeight, 668 + 54 + 12 * 160)

const mobile = calculateJourneyGeometry({
  viewportHeight: 844,
  viewportWidth: 390,
  headerBottom: 96,
  headerGap: 12,
  atlasHeight: 44,
  atlasBottomGap: 8,
  runwayDocumentTop: 120,
  milestoneCount: tarotMilestones.length,
})
assert.equal(mobile.stageHeight, 684)
assert.equal(mobile.unit, 96, 'mobile milestone unit respects its lower clamp')

assert.equal(resolveJourneySnapIndex({
  rawPosition: 3.09,
  settledIndex: 3,
  milestoneCount: 13,
  direction: 1,
  accumulatedIntent: 8,
}), 3, 'sub-threshold movement returns to the current anchor')
assert.equal(resolveJourneySnapIndex({
  rawPosition: 3.11,
  settledIndex: 3,
  milestoneCount: 13,
  direction: 1,
  accumulatedIntent: 8,
}), 4, 'ten-percent displacement advances one milestone')
assert.equal(resolveJourneySnapIndex({
  rawPosition: 3.02,
  settledIndex: 3,
  milestoneCount: 13,
  direction: -1,
  accumulatedIntent: -18,
}), 2, 'directional intent advances even before displacement threshold')

assert.equal(remapJourneyMilestone({
  chapters: clownChapters,
  chapterId: 'offerings',
  momentIndex: 2,
}).id, 'offerings:pathways')
assert.equal(remapJourneyMilestone({
  chapters: tarotChapters,
  chapterId: 'gallery',
  momentIndex: 3,
}).chapterId, 'book', 'leaving clown gallery maps to booking')

console.log('Journey geometry and registry checks passed.')
