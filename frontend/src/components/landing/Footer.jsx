import { Fragment, useEffect, useMemo, useState } from 'react'

import discordIcon from '../../assets/vendor/social-icons/Discord_white.svg'
import facebookIcon from '../../assets/vendor/social-icons/Facebook_white.svg'
import githubIcon from '../../assets/vendor/social-icons/Github_white.svg'
import instagramIcon from '../../assets/vendor/social-icons/Instagram_white.svg'
import tiktokIcon from '../../assets/vendor/social-icons/TikTok_white.svg'
import twitchIcon from '../../assets/vendor/social-icons/Twitch_white.svg'
import twitterIcon from '../../assets/vendor/social-icons/Twitter_white.svg'
import youtubeIcon from '../../assets/vendor/social-icons/Youtube_white.svg'

import {
  BottomRailGlyphs,
  BottomRailLine,
  CelestialCore,
  CelestialCoreHalo,
  CelestialInstrument,
  CelestialInstrumentLabel,
  CelestialInstrumentNote,
  CelestialInstrumentStage,
  FooterBookLink,
  FooterBottomRail,
  FooterCelestialMap,
  FooterInner,
  FooterLink,
  FooterLinkGlyph,
  FooterLinkLabel,
  FooterBrandIcon,
  FooterFallbackSocialIcon,
  FooterIdentity,
  FooterMapStar,
  FooterMetaGlyph,
  FooterMetaLine,
  FooterNav,
  FooterOrnamentLine,
  FooterOrnamentMark,
  FooterPageAtlas,
  FooterSocialItem,
  FooterSocialIcon,
  FooterSocialSky,
  FooterSocialPlaceholder,
  FooterSourceCodeLink,
  FooterShell,
  FooterSignoff,
  FooterStarRoute,
  FooterTarotCard,
  FooterTarotCardClose,
  FooterTarotCardGlyph,
  FooterTarotCardIndex,
  FooterTarotCardLabel,
  FooterTarotCardText,
  FooterTarotCardTitle,
  FooterTopOrnament,
  FooterViewport,
  GoldenSpiral,
  InstrumentSvg,
  LunarNode,
  LunarOrbit,
  PlanetaryLayer,
  PlanetaryNode,
  PlanetaryOrbit,
  SacredPolygon,
  SiteFooterHomeLink,
  SiteFooterInner,
  SiteFooterShell,
  AtlasCompass,
  AtlasCompassGlyph,
  AtlasCurrentPosition,
  AtlasNode,
  AtlasNodeGlyph,
  AtlasNodes,
  AtlasProgress,
  AtlasTrack,
  VesicaCircle,
  ZodiacLayer,
  ZodiacRing,
  ZodiacSpoke,
} from './Footer.styles'

const footerGlyphs = ['☉', '◇', '✦', '⌘', '☽']
const atlasGlyphs = {
  '#home': '☼',
  '#about': '☉',
  '#offerings': '◇',
  '#approach': '✦',
  '#gallery': '☽',
  '#book': '⌘',
  '#footer': '◉',
}
const socialPlaceholders = [
  { label: 'Instagram', icon: instagramIcon, tone: 'rose' },
  { label: 'TikTok', icon: tiktokIcon, tone: 'signal' },
  { label: 'YouTube', icon: youtubeIcon, tone: 'metalBright' },
  { label: 'Bluesky', fallback: '⋈', tone: 'signal' },
  { label: 'Threads', fallback: '@', tone: 'ultravioletStrong' },
  { label: 'Facebook', icon: facebookIcon, tone: 'electricBlue' },
  { label: 'X / Twitter', icon: twitterIcon, tone: 'body' },
  { label: 'Twitch', icon: twitchIcon, tone: 'ultraviolet' },
  { label: 'Discord', icon: discordIcon, tone: 'cyan' },
]
const footerCardSummaries = {
  '#about': {
    index: 'II',
    glyph: '☉',
    label: 'The reader',
    title: 'A mirror with a pulse',
    summary:
      'Meet Bazil Bacchanalia Dazil: tarot reader, ritual host, performer, and companion for the beautiful uncertainty between worlds.',
  },
  '#offerings': {
    index: 'VII',
    glyph: '◇',
    label: 'The work',
    title: 'Tarot at the center',
    summary:
      'Reflective readings use image, symbol, pattern, and conversation. Performance remains in orbit as ritual glamour and joyful disruption.',
  },
  '#approach': {
    index: 'XII',
    glyph: '✦',
    label: 'The philosophy',
    title: 'Agency stays with you',
    summary:
      'The cards illuminate patterns and open better questions. They do not control the future; your choices remain entirely your own.',
  },
  '#gallery': {
    index: 'XVII',
    glyph: '☽',
    label: 'The archive',
    title: 'Scenes from the field',
    summary:
      'A living record of performance, ritual, cosmic clownery, and the strange luminous moments that surface between them.',
  },
}
const PHI = (1 + Math.sqrt(5)) / 2
const CELESTIAL_CENTER = 160

const pointOnCircle = (radius, angleInDegrees) => {
  const angle = ((angleInDegrees - 90) * Math.PI) / 180

  return {
    x: CELESTIAL_CENTER + Math.cos(angle) * radius,
    y: CELESTIAL_CENTER + Math.sin(angle) * radius,
  }
}

const zodiacSpokes = Array.from({ length: 12 }, (_, index) => ({
  inner: pointOnCircle(118, index * 30),
  outer: pointOnCircle(index % 3 === 0 ? 148 : 141, index * 30),
}))

const zodiacPolygon = Array.from({ length: 12 }, (_, index) => {
  const point = pointOnCircle(132, index * 30)
  return `${point.x},${point.y}`
}).join(' ')

const classicalPlanets = [
  { radius: 34, angle: 8, tone: 'metal' },
  { radius: 51, angle: 61, tone: 'signal' },
  { radius: 69, angle: 118, tone: 'acid' },
  { radius: 87, angle: 174, tone: 'rose' },
  { radius: 104, angle: 226, tone: 'metal' },
  { radius: 121, angle: 281, tone: 'signal' },
  { radius: 139, angle: 337, tone: 'acid' },
].map((planet) => ({ ...planet, point: pointOnCircle(planet.radius, planet.angle) }))

const lunarStations = Array.from({ length: 8 }, (_, index) => ({
  point: pointOnCircle(111, index * 45 + 22.5),
  phase: index,
}))

const goldenSpiralPath = (direction = 1) => {
  const points = Array.from({ length: 150 }, (_, index) => {
    const theta = (index / 149) * Math.PI * 7.25
    const radius = 3.35 * PHI ** (theta / Math.PI)
    const angle = direction * theta - Math.PI / 2
    const x = CELESTIAL_CENTER + Math.cos(angle) * radius
    const y = CELESTIAL_CENTER + Math.sin(angle) * radius
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
  })

  return points.join(' ')
}

function PageCompassFidget({ direction }) {
  const [engaged, setEngaged] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [spinSequence, setSpinSequence] = useState(0)
  const [pointerVector, setPointerVector] = useState({
    hue: 0,
    tiltX: 0,
    tiltY: 0,
  })

  const followPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5

    setPointerVector({
      hue: Math.round((horizontal + vertical + 1) * 164),
      tiltX: Number((horizontal * 18).toFixed(2)),
      tiltY: Number((vertical * 18).toFixed(2)),
    })
  }

  const releasePointer = (event) => {
    setPointerVector({ hue: 0, tiltX: 0, tiltY: 0 })

    if (document.activeElement !== event.currentTarget) {
      setEngaged(false)
    }
  }

  const spinCompass = () => {
    setSpinning(true)
    setSpinSequence((sequence) => sequence + 1)
  }

  return (
    <AtlasCompass
      type="button"
      aria-label="Play with the page compass"
      title="Fidget with the page compass"
      $direction={direction}
      $engaged={engaged}
      $tiltX={pointerVector.tiltX}
      $tiltY={pointerVector.tiltY}
      onBlur={() => setEngaged(false)}
      onClick={spinCompass}
      onFocus={() => setEngaged(true)}
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={releasePointer}
      onPointerMove={followPointer}
    >
      <AtlasCompassGlyph
        key={spinSequence}
        aria-hidden="true"
        $engaged={engaged}
        $hue={pointerVector.hue}
        $spinning={spinning}
        onAnimationEnd={() => setSpinning(false)}
      >
        {direction === 'up' ? '⌃' : '⌄'}
      </AtlasCompassGlyph>
    </AtlasCompass>
  )
}

function FooterCopyrightCharm() {
  const copyrightText = `© ${new Date().getFullYear()} Bazil Bacchanalia Dazil`
  const characters = Array.from(copyrightText)
  const [engaged, setEngaged] = useState(false)
  const [pointerIndex, setPointerIndex] = useState(null)
  const [shuffleSequence, setShuffleSequence] = useState(0)

  const followPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const progress = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))

    setPointerIndex(Math.min(characters.length - 1, Math.floor(progress * characters.length)))
  }

  const releasePointer = (event) => {
    setPointerIndex(null)

    if (document.activeElement !== event.currentTarget) {
      setEngaged(false)
    }
  }

  const focusCharm = () => {
    setEngaged(true)
    setPointerIndex(Math.floor(characters.length / 2))
  }

  return (
    <FooterMetaLine
      type="button"
      aria-label={`Shuffle the ${copyrightText} tarot inscription`}
      title="Shuffle the footer inscription"
      onBlur={() => {
        setEngaged(false)
        setPointerIndex(null)
      }}
      onClick={() => setShuffleSequence((sequence) => sequence + 1)}
      onFocus={focusCharm}
      onPointerEnter={() => setEngaged(true)}
      onPointerLeave={releasePointer}
      onPointerMove={followPointer}
    >
      {characters.map((character, index) => {
        const distance = pointerIndex === null ? Number.POSITIVE_INFINITY : Math.abs(index - pointerIndex)
        const lift = distance <= 4 ? Math.max(0, 0.44 - distance * 0.1) : 0
        const tilt = distance <= 4 ? Math.max(-14, Math.min(14, (index - pointerIndex) * 4)) : 0
        const direction = (index + shuffleSequence) % 2 === 0 ? 1 : -1
        const turn = direction * (110 + ((index * 31 + shuffleSequence * 17) % 5) * 24)
        const hue = (index * 23 + (pointerIndex ?? 0) * 11 + shuffleSequence * 37) % 360
        const delay = (((index * 5 + shuffleSequence * 3) % 9) * 0.018).toFixed(3)

        return (
          <FooterMetaGlyph
            key={`${shuffleSequence}-${index}-${character}`}
            aria-hidden="true"
            $delay={delay}
            $engaged={engaged}
            $hue={hue}
            $lift={lift}
            $sequence={shuffleSequence}
            $tilt={tilt}
            $tone={(index + shuffleSequence) % 4}
            $turn={turn}
          >
            {character === ' ' ? '\u00a0' : character}
          </FooterMetaGlyph>
        )
      })}
    </FooterMetaLine>
  )
}

export function FooterAtlas({ navigation = [], journey, onJourneyRequest }) {
  const atlasStops = useMemo(
    () => [
      { label: 'Home', href: '#home' },
      ...navigation,
      { label: 'End', href: '#footer' },
    ],
    [navigation],
  )
  const activeHref = `#${journey?.chapterId || 'home'}`
  const direction = journey?.direction < 0 ? 'up' : 'down'
  const atlasInMotion = journey?.phase && journey.phase !== 'idle'
  const activeAtlasIndex = atlasStops.findIndex(
    (stop) => stop.href === activeHref,
  )

  return (
    <FooterPageAtlas
      aria-label="Page position map"
      data-site-atlas
      data-motion-state={atlasInMotion ? 'active' : 'idle'}
      $direction={direction}
      $moving={atlasInMotion}
    >
      <PageCompassFidget direction={direction} />
      <AtlasTrack aria-hidden="true">
        <AtlasProgress />
        <AtlasCurrentPosition />
      </AtlasTrack>
      <AtlasNodes>
        {atlasStops.map((stop, index) => {
          const isActive = stop.href === activeHref

          return (
            <AtlasNode
              key={stop.href}
              href={stop.href}
              aria-label={`Go to ${stop.label}`}
              aria-current={isActive ? 'location' : undefined}
              $active={isActive}
              $visited={index <= activeAtlasIndex}
              onClick={(event) => {
                event.preventDefault()
                onJourneyRequest?.(stop.href.slice(1))
              }}
            >
              <AtlasNodeGlyph aria-hidden="true">
                {atlasGlyphs[stop.href] || '·'}
              </AtlasNodeGlyph>
            </AtlasNode>
          )
        })}
      </AtlasNodes>
    </FooterPageAtlas>
  )
}

export function Footer({ navigation = [], signoff = 'See you between worlds.' }) {
  const footerLinks = navigation.filter((link) => link.href !== '#book')
  const [drawnCard, setDrawnCard] = useState(null)

  useEffect(() => {
    if (!drawnCard) return undefined

    const dismissCard = (event) => {
      if (event.key === 'Escape') setDrawnCard(null)
    }

    window.addEventListener('keydown', dismissCard)
    return () => window.removeEventListener('keydown', dismissCard)
  }, [drawnCard])

  return (

    <FooterViewport>
    <FooterSocialSky aria-label="Social media links coming soon">
      {socialPlaceholders.map((social) => (
        <FooterSocialItem key={social.label}>
          <FooterSocialPlaceholder
            type="button"
            disabled
            aria-label={`${social.label} — coming soon`}
            title={`${social.label} — coming soon`}
            $tone={social.tone}
          >
            {social.icon ? (
              <FooterSocialIcon $icon={social.icon} aria-hidden="true" />
            ) : (
              <FooterFallbackSocialIcon aria-hidden="true">
                {social.fallback}
              </FooterFallbackSocialIcon>
            )}
          </FooterSocialPlaceholder>
        </FooterSocialItem>
      ))}
    </FooterSocialSky>

    <FooterShell id="footer" aria-label="Celestial navigation">
      <FooterCelestialMap
        aria-hidden="true"
        viewBox="0 0 1200 340"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <FooterStarRoute d="M36 84 172 132 288 62 414 148 560 82" />
        <FooterStarRoute $tone="violet" d="M640 96 764 48 882 126 1028 72 1164 138" />
        <FooterStarRoute $tone="metal" $solid d="M70 282 210 224 344 286M856 274 996 214 1142 268" />
        <FooterMapStar cx="36" cy="84" r="3" $tone="metal" $delay={1} />
        <FooterMapStar cx="172" cy="132" r="2" $tone="signal" $delay={3} />
        <FooterMapStar cx="288" cy="62" r="3" $tone="acid" $delay={5} />
        <FooterMapStar cx="414" cy="148" r="2" $tone="rose" $delay={7} />
        <FooterMapStar cx="560" cy="82" r="3" $tone="metal" $delay={9} />
        <FooterMapStar cx="640" cy="96" r="3" $tone="signal" $delay={2} />
        <FooterMapStar cx="764" cy="48" r="2" $tone="rose" $delay={4} />
        <FooterMapStar cx="882" cy="126" r="3" $tone="acid" $delay={6} />
        <FooterMapStar cx="1028" cy="72" r="2" $tone="signal" $delay={8} />
        <FooterMapStar cx="1164" cy="138" r="3" $tone="metal" $delay={10} />
        <FooterMapStar cx="210" cy="224" r="2" $tone="rose" $delay={5} />
        <FooterMapStar cx="996" cy="214" r="2" $tone="acid" $delay={7} />
      </FooterCelestialMap>

      <FooterTopOrnament aria-hidden="true">
        <FooterOrnamentLine />
        <FooterOrnamentMark>✦</FooterOrnamentMark>
        <FooterOrnamentLine $reverse />
      </FooterTopOrnament>

      <FooterInner>
        <CelestialInstrument aria-hidden="true">
          <CelestialInstrumentStage>
            <InstrumentSvg
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
            >
              <ZodiacLayer>
                <ZodiacRing cx="160" cy="160" r="148" />
                <ZodiacRing cx="160" cy="160" r="132" $inner />
                <SacredPolygon points={zodiacPolygon} />
                {zodiacSpokes.map(({ inner, outer }, index) => (
                  <ZodiacSpoke
                    key={`zodiac-${index}`}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    $cardinal={index % 3 === 0}
                  />
                ))}
              </ZodiacLayer>

              <GoldenSpiral d={goldenSpiralPath()} />
              <GoldenSpiral d={goldenSpiralPath(-1)} $reverse />

              <PlanetaryLayer>
                {classicalPlanets.map(({ radius, point, tone }, index) => (
                  <Fragment key={`planet-${radius}`}>
                    <PlanetaryOrbit cx="160" cy="160" r={radius} />
                    <PlanetaryNode
                      cx={point.x}
                      cy={point.y}
                      r={index === 2 ? 4.2 : 3.1}
                      $tone={tone}
                    />
                  </Fragment>
                ))}
              </PlanetaryLayer>

              <LunarOrbit cx="160" cy="160" r="111" />
              {lunarStations.map(({ point, phase }) => (
                <LunarNode
                  key={`lunar-${phase}`}
                  cx={point.x}
                  cy={point.y}
                  r={phase % 4 === 0 ? 3.3 : 2.1}
                  $phase={phase}
                />
              ))}

              <VesicaCircle cx="145" cy="160" r="38" />
              <VesicaCircle cx="175" cy="160" r="38" $reverse />
              <CelestialCoreHalo cx="160" cy="160" r="24" />
              <CelestialCore cx="160" cy="160" r="5" />
            </InstrumentSvg>
          </CelestialInstrumentStage>
          <CelestialInstrumentLabel>Celestial measure</CelestialInstrumentLabel>
          <CelestialInstrumentNote>12 houses · 7 wanderers · φ</CelestialInstrumentNote>
        </CelestialInstrument>

        <FooterSignoff data-text={signoff}>{signoff}</FooterSignoff>
        <SiteFooterHomeLink href="#home">Back to top</SiteFooterHomeLink>
      </FooterInner>

      {drawnCard ? (
        <FooterTarotCard
          key={drawnCard.href}
          id="footer-drawn-card"
          role="region"
          aria-live="polite"
          aria-label={`${drawnCard.label} summary`}
        >
          <FooterTarotCardClose
            type="button"
            onClick={() => setDrawnCard(null)}
            aria-label="Return tarot card to the footer deck"
          >
            ×
          </FooterTarotCardClose>
          <FooterTarotCardIndex>{drawnCard.index}</FooterTarotCardIndex>
          <FooterTarotCardGlyph aria-hidden="true">{drawnCard.glyph}</FooterTarotCardGlyph>
          <FooterTarotCardLabel>{drawnCard.label}</FooterTarotCardLabel>
          <FooterTarotCardTitle>{drawnCard.title}</FooterTarotCardTitle>
          <FooterTarotCardText>{drawnCard.summary}</FooterTarotCardText>
        </FooterTarotCard>
      ) : null}

      <FooterNav aria-label="Footer navigation">
        {footerLinks.map((link, index) => (
          <FooterLink
            as="button"
            type="button"
            key={link.label}
            onClick={() => {
              const summary = footerCardSummaries[link.href]
              if (!summary) return
              setDrawnCard((current) =>
                current?.href === link.href ? null : { ...summary, href: link.href },
              )
            }}
            aria-expanded={drawnCard?.href === link.href}
            aria-controls="footer-drawn-card"
            $drawn={drawnCard?.href === link.href}
          >
            <FooterLinkLabel>{link.label}</FooterLinkLabel>
            <FooterLinkGlyph aria-hidden="true">
              {footerGlyphs[index % footerGlyphs.length]}
            </FooterLinkGlyph>
          </FooterLink>
        ))}
        <FooterBookLink href="#book">
          <FooterLinkLabel>Book</FooterLinkLabel>
          <FooterLinkGlyph aria-hidden="true">✦</FooterLinkGlyph>
        </FooterBookLink>
      </FooterNav>

      <FooterBottomRail aria-hidden="true">
        <BottomRailLine />
        <BottomRailGlyphs>☉ · ◇ · ☽ · ✦ · ☼</BottomRailGlyphs>
        <BottomRailLine />
      </FooterBottomRail>
    </FooterShell>

    <SiteFooterShell>
      <SiteFooterInner>
        <FooterIdentity>
          <FooterCopyrightCharm />
        </FooterIdentity>

        <FooterSourceCodeLink
          href="https://github.com/warptrail/bazilbdazil"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FooterBrandIcon $icon={githubIcon} aria-hidden="true" />
          warptrail sourcecode
        </FooterSourceCodeLink>
      </SiteFooterInner>
    </SiteFooterShell>
    </FooterViewport>
  )
}
