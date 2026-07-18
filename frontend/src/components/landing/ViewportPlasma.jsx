import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled, { useTheme } from 'styled-components'
import * as THREE from 'three'

const FALLOUT_PARTICLE_COUNT = 184
const FALLOUT_DURATION = 3800
const GRAVITY = 520

export function ViewportPlasma({ burstSequence, originRef }) {
  const canvasRef = useRef(null)
  const launchRef = useRef(() => {})
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

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -10, 10)
    camera.position.z = 1

    const purple = new THREE.Color(theme.colors.accent.ultravioletStrong)
    const green = new THREE.Color(theme.colors.accent.acid)
    const positions = new Float32Array(FALLOUT_PARTICLE_COUNT * 3)
    const velocities = new Float32Array(FALLOUT_PARTICLE_COUNT * 2)
    const colors = new Float32Array(FALLOUT_PARTICLE_COUNT * 3)
    const sizes = new Float32Array(FALLOUT_PARTICLE_COUNT)
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uOpacity: { value: 0 },
        uPixelRatio: { value: 1 },
      },
      vertexColors: true,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          gl_PointSize = aSize * uPixelRatio;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vColor;

        void main() {
          float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
          float core = 1.0 - smoothstep(0.08, 0.22, distanceFromCenter);
          float halo = 1.0 - smoothstep(0.12, 0.5, distanceFromCenter);
          float alpha = (core + halo * 0.58) * uOpacity;
          if (alpha <= 0.01) discard;
          gl_FragColor = vec4(vColor * (1.0 + core * 0.55), alpha);
        }
      `,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particles.visible = false
    scene.add(particles)

    const ringGeometry = new THREE.RingGeometry(0.996, 1, 96)
    const greenRingMaterial = new THREE.MeshBasicMaterial({
      color: green,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: false,
    })
    const purpleRingMaterial = greenRingMaterial.clone()
    purpleRingMaterial.color.copy(purple)
    const greenRing = new THREE.Mesh(ringGeometry, greenRingMaterial)
    const purpleRing = new THREE.Mesh(ringGeometry, purpleRingMaterial)
    scene.add(greenRing, purpleRing)

    let animationFrame = 0
    let viewportWidth = 1
    let viewportHeight = 1
    let startedAt = 0
    let lastFrameAt = 0

    const resize = () => {
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)

      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight, false)
      particleMaterial.uniforms.uPixelRatio.value = pixelRatio
      camera.left = 0
      camera.right = viewportWidth
      camera.top = viewportHeight
      camera.bottom = 0
      camera.updateProjectionMatrix()
    }

    const resetFallout = () => {
      const bounds = originRef.current?.getBoundingClientRect()
      const originX = bounds ? bounds.left + bounds.width / 2 : 0
      const originY = bounds ? viewportHeight - (bounds.top + bounds.height / 2) : viewportHeight

      greenRing.position.set(originX, originY, 0)
      purpleRing.position.set(originX, originY, 0)

      for (let index = 0; index < FALLOUT_PARTICLE_COUNT; index += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = 170 + Math.random() * 430
        const lift = -35 + Math.random() * 90
        const color = index % 3 === 0 ? purple : green

        positions[index * 3] = originX + (Math.random() - 0.5) * 8
        positions[index * 3 + 1] = originY + (Math.random() - 0.5) * 8
        positions[index * 3 + 2] = 0
        velocities[index * 2] = Math.cos(angle) * speed
        velocities[index * 2 + 1] = Math.sin(angle) * speed * 0.72 + lift
        colors[index * 3] = color.r
        colors[index * 3 + 1] = color.g
        colors[index * 3 + 2] = color.b
        sizes[index] = 3.4 + Math.random() * 7.6
      }

      particleGeometry.attributes.position.needsUpdate = true
      particleGeometry.attributes.color.needsUpdate = true
      particleGeometry.attributes.aSize.needsUpdate = true
    }

    const renderFallout = (time) => {
      const elapsed = time - startedAt
      const progress = Math.min(elapsed / FALLOUT_DURATION, 1)
      const delta = Math.min((time - lastFrameAt) / 1000, 0.04)
      const drag = Math.pow(0.985, delta * 60)
      lastFrameAt = time

      for (let index = 0; index < FALLOUT_PARTICLE_COUNT; index += 1) {
        velocities[index * 2] *= drag
        velocities[index * 2 + 1] -= GRAVITY * delta
        positions[index * 3] += velocities[index * 2] * delta
        positions[index * 3 + 1] += velocities[index * 2 + 1] * delta
      }

      const ringProgress = Math.min(elapsed / 1150, 1)
      const ringEnergy = Math.sin(ringProgress * Math.PI)
      const ringScale = 18 + ringProgress * Math.min(viewportWidth, viewportHeight) * 0.48
      greenRing.scale.setScalar(ringScale)
      purpleRing.scale.setScalar(ringScale * 0.82)
      purpleRing.rotation.z = ringProgress * -0.34
      greenRing.rotation.z = ringProgress * 0.22
      greenRingMaterial.opacity = ringEnergy * 0.24
      purpleRingMaterial.opacity = ringEnergy * 0.3
      particleMaterial.uniforms.uOpacity.value =
        Math.min(1, progress * 8) * Math.pow(1 - progress, 0.72)
      particleGeometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(renderFallout)
      } else {
        particles.visible = false
        greenRingMaterial.opacity = 0
        purpleRingMaterial.opacity = 0
        particleMaterial.uniforms.uOpacity.value = 0
        renderer.render(scene, camera)
      }
    }

    launchRef.current = () => {
      if (reduceMotion) return

      window.cancelAnimationFrame(animationFrame)
      resize()
      resetFallout()
      particles.visible = true
      startedAt = performance.now()
      lastFrameAt = startedAt
      animationFrame = window.requestAnimationFrame(renderFallout)
    }

    resize()
    renderer.render(scene, camera)
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      launchRef.current = () => {}
      particleGeometry.dispose()
      particleMaterial.dispose()
      ringGeometry.dispose()
      greenRingMaterial.dispose()
      purpleRingMaterial.dispose()
      renderer.dispose()
    }
  }, [originRef, theme])

  useEffect(() => {
    if (burstSequence > 0) launchRef.current()
  }, [burstSequence])

  if (typeof document === 'undefined') return null

  return createPortal(<PlasmaCanvas ref={canvasRef} aria-hidden="true" />, document.body)
}

const PlasmaCanvas = styled.canvas`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.transition};
  display: block;
  width: 100vw;
  height: 100dvh;
  pointer-events: none;
  touch-action: none;
  contain: strict;
`
