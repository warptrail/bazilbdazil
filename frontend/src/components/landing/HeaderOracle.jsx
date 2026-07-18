import { useEffect, useRef, useState } from 'react'
import styled, { keyframes, useTheme } from 'styled-components'
import * as THREE from 'three'
import { ArcaneBurstWord } from '../ArcaneBurstWord'
import { ViewportPlasma } from './ViewportPlasma'

const BRAND_LABEL = 'Bazil B. Dazil — release an oracle flare and guide the eye'
const ORBIT_POINT_COUNT = 23
const PLASMA_PARTICLE_COUNT = 96

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value))
}

export function HeaderOracle({ condensed = false, onBurstChange }) {
  const canvasRef = useRef(null)
  const flareRequestRef = useRef(0)
  const [flareSequence, setFlareSequence] = useState(0)
  const [isWordBursting, setIsWordBursting] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 0.86

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30)
    camera.position.z = 3.35

    const root = new THREE.Group()
    const eye = new THREE.Group()
    const gaze = new THREE.Group()
    const ornaments = new THREE.Group()
    const flareGroup = new THREE.Group()
    scene.add(root)
    root.add(ornaments, eye, flareGroup)
    eye.add(gaze)

    const purple = new THREE.Color(theme.colors.accent.ultraviolet)
    const purpleBright = new THREE.Color(theme.colors.accent.ultravioletStrong)
    const green = new THREE.Color(theme.colors.accent.acid)
    const greenSoft = new THREE.Color(theme.colors.accent.acidSoft)
    const hueColor = new THREE.Color()

    const shellGeometry = new THREE.SphereGeometry(0.72, 48, 32)
    const shellMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPurple: { value: purple.clone() },
        uGreen: { value: green.clone() },
        uTime: { value: 0 },
        uFlare: { value: 0 },
        uHueMix: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vLocalPosition;

        void main() {
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -viewPosition.xyz;
          vLocalPosition = position;
          gl_Position = projectionMatrix * viewPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uPurple;
        uniform vec3 uGreen;
        uniform float uTime;
        uniform float uFlare;
        uniform float uHueMix;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vLocalPosition;

        void main() {
          vec3 normalDirection = normalize(vNormal);
          vec3 viewDirection = normalize(vViewPosition);
          vec3 lightDirection = normalize(vec3(-0.42, 0.72, 1.0));
          float facing = max(dot(normalDirection, lightDirection), 0.0);
          float fresnel = pow(1.0 - max(dot(normalDirection, viewDirection), 0.0), 2.35);
          vec3 reflectedLight = reflect(-lightDirection, normalDirection);
          float specular = pow(max(dot(reflectedLight, viewDirection), 0.0), 22.0);
          float etchedBand = 0.5 + 0.5 * sin(
            vLocalPosition.y * 24.0 + vLocalPosition.x * 8.0 + uTime * 0.6
          );
          vec3 shiftedPurple = mix(uPurple, uGreen, uHueMix);
          vec3 shiftedGreen = mix(uGreen, uPurple, uHueMix);
          vec3 color = shiftedPurple * (0.12 + facing * 0.32);
          color += shiftedGreen * fresnel * 0.64;
          color += shiftedPurple * etchedBand * 0.1;
          color += shiftedGreen * specular * (0.58 + uFlare * 0.7);
          color += mix(uPurple, uGreen, etchedBand) * uFlare * 0.42;
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      toneMapped: false,
    })
    const shell = new THREE.Mesh(shellGeometry, shellMaterial)
    shell.scale.set(1, 0.72, 0.82)
    eye.add(shell)

    const irisGeometry = new THREE.SphereGeometry(0.31, 40, 24)
    const irisMaterial = new THREE.MeshBasicMaterial({
      color: green.clone().multiplyScalar(0.58),
      toneMapped: false,
    })
    const iris = new THREE.Mesh(irisGeometry, irisMaterial)
    iris.scale.z = 0.3
    gaze.add(iris)

    const pupilGeometry = new THREE.SphereGeometry(0.145, 32, 20)
    const pupilMaterial = new THREE.MeshBasicMaterial({
      color: theme.colors.background.canvas,
      toneMapped: false,
    })
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial)
    pupil.position.z = 0.11
    pupil.scale.z = 0.38
    gaze.add(pupil)

    const glintGeometry = new THREE.SphereGeometry(0.032, 18, 12)
    const glintMaterial = new THREE.MeshBasicMaterial({ color: greenSoft })
    const glint = new THREE.Mesh(glintGeometry, glintMaterial)
    glint.position.set(-0.075, 0.095, 0.2)
    gaze.add(glint)
    gaze.position.z = 0.59

    const frameGeometry = new THREE.TorusGeometry(0.76, 0.045, 12, 84)
    const frameMaterial = new THREE.MeshBasicMaterial({
      color: purple.clone().multiplyScalar(0.72),
      toneMapped: false,
    })
    const frame = new THREE.Mesh(frameGeometry, frameMaterial)
    frame.scale.y = 0.72
    frame.position.z = 0.04
    eye.add(frame)

    const irisRingGeometry = new THREE.TorusGeometry(0.335, 0.022, 10, 64)
    const irisRingMaterial = new THREE.MeshBasicMaterial({
      color: green,
      transparent: true,
      opacity: 0.92,
    })
    const irisRing = new THREE.Mesh(irisRingGeometry, irisRingMaterial)
    irisRing.position.z = 0.64
    eye.add(irisRing)

    const coronaGeometry = new THREE.SphereGeometry(0.86, 24, 16)
    const coronaMaterial = new THREE.MeshBasicMaterial({
      color: purple,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const corona = new THREE.Mesh(coronaGeometry, coronaMaterial)
    corona.scale.y = 0.72
    ornaments.add(corona)

    const orbitGeometry = new THREE.TorusGeometry(0.94, 0.012, 6, 96)
    const outerOrbitMaterial = new THREE.MeshBasicMaterial({
      color: green,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    })
    const innerOrbitMaterial = outerOrbitMaterial.clone()
    innerOrbitMaterial.color.copy(purpleBright)
    innerOrbitMaterial.opacity = 0.52
    const outerOrbit = new THREE.Mesh(orbitGeometry, outerOrbitMaterial)
    const innerOrbit = new THREE.Mesh(orbitGeometry, innerOrbitMaterial)
    outerOrbit.rotation.set(1.08, 0.28, 0.42)
    innerOrbit.rotation.set(0.72, -0.62, -0.48)
    innerOrbit.scale.setScalar(0.83)
    ornaments.add(outerOrbit, innerOrbit)

    const pointPositions = new Float32Array(ORBIT_POINT_COUNT * 3)
    for (let index = 0; index < ORBIT_POINT_COUNT; index += 1) {
      const angle = index * 2.399963229728653
      const radius = 0.68 + index * 0.014
      pointPositions[index * 3] = Math.cos(angle) * radius
      pointPositions[index * 3 + 1] = Math.sin(angle) * radius * 0.7
      pointPositions[index * 3 + 2] = Math.sin(angle * 1.7) * 0.35
    }
    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3))
    const pointMaterial = new THREE.PointsMaterial({
      color: greenSoft,
      size: 0.045,
      transparent: true,
      opacity: 0.62,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const points = new THREE.Points(pointGeometry, pointMaterial)
    ornaments.add(points)

    const plasmaPositions = new Float32Array(PLASMA_PARTICLE_COUNT * 3)
    const plasmaVelocities = new Float32Array(PLASMA_PARTICLE_COUNT * 3)
    const plasmaColors = new Float32Array(PLASMA_PARTICLE_COUNT * 3)
    const resetPlasma = () => {
      for (let index = 0; index < PLASMA_PARTICLE_COUNT; index += 1) {
        const theta = Math.random() * Math.PI * 2
        const z = Math.random() * 2 - 1
        const radial = Math.sqrt(1 - z * z)
        const directionX = Math.cos(theta) * radial
        const directionY = Math.sin(theta) * radial
        const speed = 0.72 + Math.random() * 1.5
        const color = index % 3 === 0 ? purpleBright : green

        plasmaPositions[index * 3] = directionX * 0.18
        plasmaPositions[index * 3 + 1] = directionY * 0.14
        plasmaPositions[index * 3 + 2] = z * 0.18
        plasmaVelocities[index * 3] = directionX * speed
        plasmaVelocities[index * 3 + 1] = directionY * speed * 0.78
        plasmaVelocities[index * 3 + 2] = z * speed
        plasmaColors[index * 3] = color.r
        plasmaColors[index * 3 + 1] = color.g
        plasmaColors[index * 3 + 2] = color.b
      }
    }
    resetPlasma()
    const plasmaGeometry = new THREE.BufferGeometry()
    plasmaGeometry.setAttribute('position', new THREE.BufferAttribute(plasmaPositions, 3))
    plasmaGeometry.setAttribute('color', new THREE.BufferAttribute(plasmaColors, 3))
    const plasmaMaterial = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const plasma = new THREE.Points(plasmaGeometry, plasmaMaterial)
    plasma.visible = false
    flareGroup.add(plasma)

    const flareRingGeometry = new THREE.TorusGeometry(0.57, 0.025, 8, 72)
    const flareGreenMaterial = new THREE.MeshBasicMaterial({
      color: green,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const flarePurpleMaterial = flareGreenMaterial.clone()
    flarePurpleMaterial.color.copy(purpleBright)
    const flareRingGreen = new THREE.Mesh(flareRingGeometry, flareGreenMaterial)
    const flareRingPurple = new THREE.Mesh(flareRingGeometry, flarePurpleMaterial)
    flareRingGreen.rotation.set(0.9, 0.35, 0.2)
    flareRingPurple.rotation.set(0.45, -0.72, -0.4)
    flareGroup.add(flareRingGreen, flareRingPurple)

    const flareArcGeometry = new THREE.TorusGeometry(0.72, 0.042, 8, 64, Math.PI * 1.55)
    const flareArcMaterial = new THREE.MeshBasicMaterial({
      color: purpleBright,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const flareArc = new THREE.Mesh(flareArcGeometry, flareArcMaterial)
    flareArc.rotation.set(0.78, 0.24, -0.6)
    flareGroup.add(flareArc)

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      speed: 0,
      proximity: 0,
      pressed: 0,
      lastClientX: window.innerWidth / 2,
      lastClientY: window.innerHeight / 2,
      lastMoveAt: performance.now(),
      lastTouchAt: 0,
      lastInputType: 'idle',
      touchActive: false,
    }
    const orientation = {
      active: false,
      baseBeta: null,
      baseGamma: null,
      targetX: 0,
      targetY: 0,
    }
    const isTouchDevice =
      navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches
    const oracleButton = canvas.closest('button')
    let animationFrame = 0
    let lastFrameAt = performance.now()
    let nextBlinkAt = lastFrameAt + 2400 + Math.random() * 2800
    let blinkStartedAt = 0
    let isBlinking = false
    let flareStartedAt = -1
    let handledFlareRequest = flareRequestRef.current
    let orientationListenerAttached = false
    let orientationPermissionRequested = false

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (width <= 0 || height <= 0) return

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const updateFromClientPoint = (clientX, clientY, inputType) => {
      const bounds = canvas.getBoundingClientRect()
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      const isTouch = inputType === 'touch'
      const deltaX = clientX - pointer.lastClientX
      const deltaY = clientY - pointer.lastClientY
      const elapsed = Math.max(16, performance.now() - pointer.lastMoveAt)
      const distance = Math.hypot(clientX - centerX, clientY - centerY)
      const horizontalRange = isTouch
        ? Math.max(window.innerWidth * 0.55, bounds.width * 2)
        : Math.max(bounds.width / 2, 1)
      const verticalRange = isTouch
        ? Math.max(window.innerHeight * 0.55, bounds.height * 3)
        : Math.max(bounds.height * 1.5, 1)
      const influence = isTouch
        ? Math.hypot(window.innerWidth, window.innerHeight) * 0.8
        : Math.max(bounds.width, bounds.height) * 1.75

      pointer.targetX = clamp((clientX - centerX) / horizontalRange, -1, 1)
      pointer.targetY = clamp((centerY - clientY) / verticalRange, -1, 1)
      pointer.speed = clamp(Math.hypot(deltaX, deltaY) / elapsed / 1.6, 0, 1)
      pointer.proximity = 1 - clamp(distance / influence, 0, 1)
      pointer.lastClientX = clientX
      pointer.lastClientY = clientY
      pointer.lastMoveAt = performance.now()
      pointer.lastInputType = inputType
    }

    const updatePointer = (event) => {
      if (event.pointerType === 'touch') return
      updateFromClientPoint(event.clientX, event.clientY, 'pointer')
    }

    const updateTouch = (event) => {
      const touch = event.touches[0]
      if (!touch) return

      pointer.touchActive = true
      pointer.lastTouchAt = performance.now()
      pointer.pressed = event.type === 'touchstart' ? 1 : Math.max(pointer.pressed, 0.28)
      updateFromClientPoint(touch.clientX, touch.clientY, 'touch')
    }

    const endTouch = () => {
      pointer.touchActive = false
      pointer.lastTouchAt = performance.now()
      pointer.pressed = 0
    }

    const resetOrientationCalibration = () => {
      orientation.baseBeta = null
      orientation.baseGamma = null
    }

    const updateOrientation = (event) => {
      if (typeof event.beta !== 'number' || typeof event.gamma !== 'number') return

      if (orientation.baseBeta === null || orientation.baseGamma === null) {
        orientation.baseBeta = event.beta
        orientation.baseGamma = event.gamma
      }

      const betaDelta = event.beta - orientation.baseBeta
      const gammaDelta = event.gamma - orientation.baseGamma
      const screenAngle = window.screen.orientation?.angle ?? window.orientation ?? 0
      let tiltX = gammaDelta
      let tiltY = -betaDelta

      if (screenAngle === 90) {
        tiltX = betaDelta
        tiltY = gammaDelta
      } else if (screenAngle === -90 || screenAngle === 270) {
        tiltX = -betaDelta
        tiltY = -gammaDelta
      } else if (Math.abs(screenAngle) === 180) {
        tiltX = -gammaDelta
        tiltY = betaDelta
      }

      orientation.targetX = clamp(tiltX / 22, -1, 1)
      orientation.targetY = clamp(tiltY / 22, -1, 1)
      orientation.active = true
    }

    const attachOrientationListener = () => {
      if (orientationListenerAttached || reduceMotion) return
      window.addEventListener('deviceorientation', updateOrientation, { passive: true })
      orientationListenerAttached = true
    }

    const requestOrientationAccess = async (event) => {
      if (
        event.pointerType !== 'touch' ||
        reduceMotion ||
        !isTouchDevice ||
        orientationPermissionRequested ||
        typeof window.DeviceOrientationEvent === 'undefined'
      ) {
        return
      }

      orientationPermissionRequested = true
      const requestPermission = window.DeviceOrientationEvent.requestPermission

      if (typeof requestPermission !== 'function') {
        attachOrientationListener()
        return
      }

      try {
        const permission = await requestPermission.call(window.DeviceOrientationEvent)
        if (permission === 'granted') attachOrientationListener()
      } catch {
        // Touch tracking remains available when sensor access is denied or unavailable.
      }
    }

    const handlePointerDown = () => {
      pointer.pressed = 1
      isBlinking = true
      blinkStartedAt = performance.now()
    }

    const handlePointerUp = () => {
      pointer.pressed = 0
    }

    const render = (time) => {
      const delta = Math.min((time - lastFrameAt) / 1000, 0.05)
      lastFrameAt = time
      const ease = 1 - Math.pow(0.001, delta)

      if (!pointer.touchActive && orientation.active) {
        pointer.targetX = orientation.targetX
        pointer.targetY = orientation.targetY
        pointer.lastInputType = 'orientation'
      } else if (
        !pointer.touchActive &&
        pointer.lastInputType === 'touch' &&
        time - pointer.lastTouchAt > 800
      ) {
        const returnEase = 1 - Math.pow(0.08, delta)
        pointer.targetX += (0 - pointer.targetX) * returnEase
        pointer.targetY += (0 - pointer.targetY) * returnEase
      }

      pointer.x += (pointer.targetX - pointer.x) * ease
      pointer.y += (pointer.targetY - pointer.y) * ease
      pointer.speed *= 0.93
      pointer.pressed *= 0.9
      if (pointer.touchActive) pointer.pressed = Math.max(pointer.pressed, 0.18)

      if (handledFlareRequest !== flareRequestRef.current) {
        handledFlareRequest = flareRequestRef.current
        flareStartedAt = time
        resetPlasma()
        plasmaGeometry.attributes.position.needsUpdate = true
        plasma.visible = !reduceMotion
        pointer.pressed = 1
      }

      if (!reduceMotion && !isBlinking && time >= nextBlinkAt) {
        isBlinking = true
        blinkStartedAt = time
      }

      let blinkScale = 1
      if (isBlinking) {
        const blinkProgress = (time - blinkStartedAt) / 260
        blinkScale = 0.08 + 0.92 * Math.abs(Math.cos(Math.min(blinkProgress, 1) * Math.PI))
        if (blinkProgress >= 1) {
          isBlinking = false
          nextBlinkAt = time + 2600 + Math.random() * 4300
          blinkScale = 1
        }
      }

      const idleCuriosity = reduceMotion ? 0 : Math.sin(time * 0.00047) * 0.018
      gaze.position.x = pointer.x * 0.12
      gaze.position.y = pointer.y * 0.085 + idleCuriosity
      gaze.scale.y = blinkScale
      const pupilScale = 0.8 + pointer.proximity * 0.42 - pointer.speed * 0.24 + pointer.pressed * 0.22
      pupil.scale.set(clamp(pupilScale * 0.58, 0.42, 0.78), clamp(pupilScale, 0.66, 1.28), 1)
      glint.scale.setScalar(0.82 + pointer.proximity * 0.5)
      root.rotation.y = pointer.x * 0.28
      root.rotation.x = -pointer.y * 0.2

      if (!reduceMotion) {
        root.rotation.y += Math.sin(time * 0.00038) * 0.08
        root.rotation.x += Math.cos(time * 0.00031) * 0.035
        eye.rotation.z = Math.sin(time * 0.00052) * 0.055
        outerOrbit.rotation.z += delta * (0.18 + pointer.speed * 0.48)
        outerOrbit.rotation.x += delta * 0.045
        innerOrbit.rotation.z -= delta * (0.13 + pointer.speed * 0.32)
        innerOrbit.rotation.y -= delta * 0.04
        corona.rotation.y += delta * 0.08
        points.rotation.z += delta * 0.09
      }

      shellMaterial.uniforms.uTime.value = time * 0.001
      if (flareStartedAt >= 0) {
        const flareDuration = reduceMotion ? 520 : 1380
        const flareProgress = clamp((time - flareStartedAt) / flareDuration, 0, 1)
        const flareEnergy = Math.sin(flareProgress * Math.PI)
        const colorOscillation = (Math.sin(flareProgress * Math.PI * 7) + 1) / 2

        hueColor.lerpColors(purple, green, colorOscillation)
        shellMaterial.uniforms.uFlare.value = flareEnergy
        shellMaterial.uniforms.uHueMix.value = colorOscillation
        irisMaterial.color.lerpColors(green, purpleBright, colorOscillation)
        frameMaterial.color.lerpColors(purple, green, colorOscillation)
        coronaMaterial.color.copy(hueColor)
        coronaMaterial.opacity = 0.12 + flareEnergy * 0.48
        root.scale.setScalar(1 + flareEnergy * 0.13)

        if (!reduceMotion) {
          const positions = plasmaGeometry.attributes.position.array
          for (let index = 0; index < PLASMA_PARTICLE_COUNT * 3; index += 1) {
            positions[index] += plasmaVelocities[index] * delta * 1.28
          }
          plasmaGeometry.attributes.position.needsUpdate = true
          plasmaMaterial.opacity = Math.pow(1 - flareProgress, 1.45) * 0.98
          plasmaMaterial.size = 0.085 + flareEnergy * 0.075
          plasma.rotation.z += delta * 0.7

          const ringScale = 0.38 + flareProgress * 2.35
          flareRingGreen.scale.setScalar(ringScale)
          flareRingPurple.scale.setScalar(ringScale * 0.88)
          flareArc.scale.setScalar(0.42 + flareProgress * 2.05)
          flareGreenMaterial.opacity = flareEnergy * 0.9
          flarePurpleMaterial.opacity = flareEnergy * 0.78
          flareArcMaterial.opacity = flareEnergy * 0.86
          flareRingGreen.rotation.y += delta * 1.7
          flareRingPurple.rotation.x -= delta * 1.3
          flareArc.rotation.z += delta * 2.1
        }

        if (flareProgress >= 1) {
          flareStartedAt = -1
          plasma.visible = false
          flareGreenMaterial.opacity = 0
          flarePurpleMaterial.opacity = 0
          flareArcMaterial.opacity = 0
          shellMaterial.uniforms.uFlare.value = 0
          shellMaterial.uniforms.uHueMix.value = 0
          irisMaterial.color.copy(green).multiplyScalar(0.58)
          frameMaterial.color.copy(purple).multiplyScalar(0.72)
          coronaMaterial.color.copy(purple)
          coronaMaterial.opacity = 0.12
          root.scale.setScalar(1)
        }
      }

      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('touchstart', updateTouch, { passive: true })
    window.addEventListener('touchmove', updateTouch, { passive: true })
    window.addEventListener('touchend', endTouch, { passive: true })
    window.addEventListener('touchcancel', endTouch, { passive: true })
    canvas.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    oracleButton?.addEventListener('pointerdown', requestOrientationAccess)
    window.screen.orientation?.addEventListener('change', resetOrientationCalibration)

    if (
      isTouchDevice &&
      !reduceMotion &&
      typeof window.DeviceOrientationEvent !== 'undefined' &&
      typeof window.DeviceOrientationEvent.requestPermission !== 'function'
    ) {
      attachOrientationListener()
    }

    resize()
    animationFrame = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('touchstart', updateTouch)
      window.removeEventListener('touchmove', updateTouch)
      window.removeEventListener('touchend', endTouch)
      window.removeEventListener('touchcancel', endTouch)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      oracleButton?.removeEventListener('pointerdown', requestOrientationAccess)
      window.screen.orientation?.removeEventListener('change', resetOrientationCalibration)
      if (orientationListenerAttached) {
        window.removeEventListener('deviceorientation', updateOrientation)
      }
      shellGeometry.dispose()
      shellMaterial.dispose()
      irisGeometry.dispose()
      irisMaterial.dispose()
      pupilGeometry.dispose()
      pupilMaterial.dispose()
      glintGeometry.dispose()
      glintMaterial.dispose()
      frameGeometry.dispose()
      frameMaterial.dispose()
      irisRingGeometry.dispose()
      irisRingMaterial.dispose()
      coronaGeometry.dispose()
      coronaMaterial.dispose()
      orbitGeometry.dispose()
      outerOrbitMaterial.dispose()
      innerOrbitMaterial.dispose()
      pointGeometry.dispose()
      pointMaterial.dispose()
      plasmaGeometry.dispose()
      plasmaMaterial.dispose()
      flareRingGeometry.dispose()
      flareGreenMaterial.dispose()
      flarePurpleMaterial.dispose()
      flareArcGeometry.dispose()
      flareArcMaterial.dispose()
      renderer.dispose()
    }
  }, [theme])

  const releaseOracleFlare = () => {
    flareRequestRef.current += 1
    setFlareSequence((sequence) => sequence + 1)
  }

  const updateWordBurst = (isBursting) => {
    setIsWordBursting(isBursting)
    onBurstChange?.(isBursting)
  }

  return (
    <>
      <OracleButton
        type="button"
        aria-label={BRAND_LABEL}
        onClick={releaseOracleFlare}
        $bursting={isWordBursting}
        $condensed={condensed}
      >
        <OracleCanvas ref={canvasRef} aria-hidden="true" $condensed={condensed} />
        <OracleWordmark
          aria-hidden="true"
          $bursting={isWordBursting}
          $condensed={condensed}
        >
          <BrandName>Bazil</BrandName>
          <ArcaneBurstWord word="Bacchanalia" onActiveChange={updateWordBurst} />
          <BrandName>Dazil</BrandName>
        </OracleWordmark>
      </OracleButton>
      <ViewportPlasma burstSequence={flareSequence} originRef={canvasRef} />
    </>
  )
}

const oracleDrift = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(-0.08deg);
  }

  30% {
    transform: translate3d(var(--oracle-drift-x), var(--oracle-drift-y-negative), 0)
      rotate(0.16deg);
  }

  67% {
    transform: translate3d(var(--oracle-drift-x-negative), var(--oracle-drift-y), 0)
      rotate(-0.2deg);
  }
`

const OracleButton = styled.button`
  --oracle-drift-x: 0rem;
  --oracle-drift-x-negative: 0rem;
  --oracle-drift-y: 0rem;
  --oracle-drift-y-negative: 0rem;

  position: relative;
  z-index: ${({ theme }) => theme.zIndex.transition};
  grid-area: brand;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: clamp(14rem, 38vw, 23rem);
  max-width: 100%;
  min-width: 0;
  min-height: ${({ theme }) => theme.layout.controlMinHeight};
  padding: 0;
  overflow: visible;
  border: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  background: transparent;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-drag: none;
  transition:
    filter ${({ theme }) => theme.transitions.fast},
    width ${({ theme }) => theme.motion.duration.luxury} ${({ theme }) => theme.motion.easing.enter};

  @media (hover: hover) {
    &:hover {
      filter: drop-shadow(0 0 0.72rem ${({ theme }) => theme.colors.effects.acidGlowSoft});
    }
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.borders.width.focus} ${({ theme }) => theme.borders.style}
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.layout.focusOffset};
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    width: ${({ $condensed }) => ($condensed ? '10.25rem' : '12.25rem')};
    min-height: 2.5rem;
  }

  @media (max-width: 360px) {
    width: ${({ $condensed }) => ($condensed ? '8.8rem' : '10.25rem')};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    --oracle-drift-x: 0.42rem;
    --oracle-drift-x-negative: -0.23rem;
    --oracle-drift-y: 0.2rem;
    --oracle-drift-y-negative: -0.2rem;

    width: ${({ $bursting }) =>
      $bursting
        ? 'clamp(27rem, 48vw, 31rem)'
        : 'clamp(24rem, 42vw, 27.5rem)'};
    animation: ${oracleDrift} ${({ theme }) => theme.motion.duration.ambient}
      ${({ theme }) => theme.motion.easing.ambient} infinite;
    transform-origin: left center;
    will-change: transform;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    --oracle-drift-x: 0.64rem;
    --oracle-drift-x-negative: -0.35rem;
    --oracle-drift-y: 0.28rem;
    --oracle-drift-y-negative: -0.28rem;

    width: ${({ $bursting }) =>
      $bursting
        ? 'clamp(31rem, calc(16rem + 13vw), 35rem)'
        : 'clamp(27rem, calc(15rem + 11vw), 31.5rem)'};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
    will-change: auto;
  }
`

const OracleCanvas = styled.canvas`
  display: block;
  flex: 0 0 auto;
  width: 4.6rem;
  height: 4.6rem;
  pointer-events: auto;
  filter:
    drop-shadow(0 0 0.34rem ${({ theme }) => theme.colors.effects.violetGlow})
    drop-shadow(0 0 0.24rem ${({ theme }) => theme.colors.effects.acidGlow});

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    width: ${({ $condensed }) => ($condensed ? '2.2rem' : '2.7rem')};
    height: ${({ $condensed }) => ($condensed ? '2.2rem' : '2.7rem')};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    width: 5.15rem;
    height: 5.15rem;
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    width: clamp(5.55rem, calc(3.75rem + 1.5vw), 6.25rem);
    height: clamp(5.55rem, calc(3.75rem + 1.5vw), 6.25rem);
  }
`

const OracleWordmark = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.transition};
  display: inline-flex;
  align-items: center;
  column-gap: ${({ $bursting, theme }) => ($bursting ? theme.spacing.md : 0)};
  min-width: 0;
  overflow: visible;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: clamp(1rem, 2.35vw, 1.3rem);
  line-height: 1;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.editorial};
  text-transform: uppercase;
  text-shadow: 0 0 1rem ${({ theme }) => theme.colors.effects.violetGlowSoft};
  white-space: nowrap;
  transition:
    column-gap ${({ theme }) => theme.motion.duration.ritual}
      ${({ theme }) => theme.motion.easing.enter},
    font-size ${({ theme }) => theme.motion.duration.luxury}
      ${({ theme }) => theme.motion.easing.enter};

  @media (max-width: ${({ theme }) => theme.layout.breakpoints.narrow}) {
    font-size: ${({ $condensed }) => ($condensed ? '0.64rem' : '0.72rem')};
    letter-spacing: 0.07em;
  }

  @media (max-width: 360px) {
    font-size: ${({ $condensed }) => ($condensed ? '0.56rem' : '0.62rem')};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.desktop}) {
    font-size: clamp(1.35rem, 2.2vw, 1.5rem);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.wide}) {
    column-gap: ${({ $bursting, theme }) => ($bursting ? theme.spacing.lg : 0)};
    font-size: clamp(1.55rem, calc(1rem + 0.54vw), 1.78rem);
  }
`

const BrandName = styled.span`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
`
