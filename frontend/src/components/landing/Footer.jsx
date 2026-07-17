import { Fragment } from 'react'

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
  FooterMapStar,
  FooterMetaLine,
  FooterNav,
  FooterOrnamentLine,
  FooterOrnamentMark,
  FooterShell,
  FooterSignoff,
  FooterStarRoute,
  FooterTopOrnament,
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
  VesicaCircle,
  ZodiacLayer,
  ZodiacRing,
  ZodiacSpoke,
} from './Footer.styles'

const footerGlyphs = ['☉', '◇', '✦', '⌘', '☽']
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

export function Footer({ navigation = [], signoff = 'See you between worlds.' }) {
  const footerLinks = navigation.filter((link) => link.href !== '#book')

  return (
    <Fragment>
    <FooterShell aria-label="Celestial navigation">
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

        <FooterNav aria-label="Footer navigation">
          {footerLinks.map((link, index) => (
            <FooterLink key={link.label} href={link.href}>
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

        <FooterSignoff>{signoff}</FooterSignoff>
      </FooterInner>

      <FooterBottomRail aria-hidden="true">
        <BottomRailLine />
        <BottomRailGlyphs>☉ · ◇ · ☽ · ✦ · ☼</BottomRailGlyphs>
        <BottomRailLine />
      </FooterBottomRail>
    </FooterShell>

    <SiteFooterShell>
      <SiteFooterInner>
        <FooterMetaLine>© {new Date().getFullYear()} Bazil Bacchanalia Dazil</FooterMetaLine>
        <SiteFooterHomeLink href="#home">Back to top</SiteFooterHomeLink>
      </SiteFooterInner>
    </SiteFooterShell>
    </Fragment>
  )
}
