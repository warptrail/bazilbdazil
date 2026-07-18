import clown640Avif from '../assets/clown-640.avif'
import clown1280Avif from '../assets/clown-1280.avif'
import clown640Webp from '../assets/clown-640.webp'
import clown1280Webp from '../assets/clown-1280.webp'
import clownAbout480Avif from '../assets/about-clown-oracle-v1-480.avif'
import clownAbout900Avif from '../assets/about-clown-oracle-v1-900.avif'
import clownAbout480Webp from '../assets/about-clown-oracle-v1-480.webp'
import clownAbout900Webp from '../assets/about-clown-oracle-v1-900.webp'
import galleryReading720Avif from '../assets/img-1-720.avif'
import galleryReading1440Avif from '../assets/img-1-1440.avif'
import galleryReading720Webp from '../assets/img-1-720.webp'
import galleryReading1440Webp from '../assets/img-1-1440.webp'
import galleryPerformance640Avif from '../assets/img-2-640.avif'
import galleryPerformance1280Avif from '../assets/img-2-1280.avif'
import galleryPerformance640Webp from '../assets/img-2-640.webp'
import galleryPerformance1280Webp from '../assets/img-2-1280.webp'

export const clownHeroSources = Object.freeze({
  avif: Object.freeze({ small: clown640Avif, large: clown1280Avif }),
  webp: Object.freeze({ small: clown640Webp, large: clown1280Webp }),
})

let clownExperiencePreload

function chooseSource(sources) {
  const renderedWidth = window.innerWidth * Math.max(window.devicePixelRatio, 1)
  return renderedWidth > 760 ? sources.large : sources.small
}

function loadAndDecode(primarySource, fallbackSource) {
  return new Promise((resolve) => {
    const image = new Image()
    const candidates = [primarySource, fallbackSource].filter(Boolean)
    let candidateIndex = 0

    image.decoding = 'async'
    image.fetchPriority = 'low'

    const finish = async () => {
      try {
        await image.decode()
      } catch {
        // A completed load is still cached when explicit decoding is unavailable.
      }

      resolve()
    }

    const tryNextCandidate = () => {
      const source = candidates[candidateIndex]
      candidateIndex += 1

      if (!source) {
        resolve()
        return
      }

      image.onload = finish
      image.onerror = tryNextCandidate
      image.src = source
    }

    tryNextCandidate()
  })
}

export function preloadClownExperience() {
  if (typeof window === 'undefined' || typeof Image === 'undefined') {
    return Promise.resolve()
  }

  if (!clownExperiencePreload) {
    const galleryReading = {
      avif: window.innerWidth > 760 ? galleryReading1440Avif : galleryReading720Avif,
      webp: window.innerWidth > 760 ? galleryReading1440Webp : galleryReading720Webp,
    }
    const galleryPerformance = {
      avif:
        window.innerWidth > 760
          ? galleryPerformance1280Avif
          : galleryPerformance640Avif,
      webp:
        window.innerWidth > 760
          ? galleryPerformance1280Webp
          : galleryPerformance640Webp,
    }
    const aboutPortrait = {
      avif: window.innerWidth > 760 ? clownAbout900Avif : clownAbout480Avif,
      webp: window.innerWidth > 760 ? clownAbout900Webp : clownAbout480Webp,
    }

    clownExperiencePreload = Promise.all([
      loadAndDecode(
        chooseSource(clownHeroSources.avif),
        chooseSource(clownHeroSources.webp),
      ),
      loadAndDecode(galleryReading.avif, galleryReading.webp),
      loadAndDecode(galleryPerformance.avif, galleryPerformance.webp),
      loadAndDecode(aboutPortrait.avif, aboutPortrait.webp),
    ]).then(() => undefined)
  }

  return clownExperiencePreload
}
