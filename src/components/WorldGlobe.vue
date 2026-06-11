<template>
  <div
    class="relative h-[420px] w-full overflow-hidden rounded-3xl border border-orange-500/20 bg-[#050505] md:h-[650px]"
  >
    <div
      ref="globeContainer"
      class="h-full w-full cursor-grab active:cursor-grabbing"
    ></div>

    <!-- Event card overlay -->
    <Transition name="event-card">
      <div
        v-if="activeEvent && activeEvent.visible"
        class="absolute right-5 top-5 z-30 w-[280px] rounded-3xl border border-orange-500/60 bg-black/80 p-5 text-white shadow-[0_0_35px_rgba(249,115,22,0.35)] backdrop-blur-xl md:right-8 md:top-8"
      >
        <div class="flex items-center gap-4">
          <div
            class="grid h-14 w-14 place-items-center rounded-2xl bg-orange-500/15 text-3xl"
          >
            {{ activeEvent.icon }}
          </div>

          <div>
            <h3 class="text-lg font-black leading-tight">
              {{ activeEvent.title }}
            </h3>
            <p class="mt-1 text-xs font-bold text-orange-400">
              {{ activeEvent.category }}
            </p>
          </div>
        </div>

        <div class="mt-5 space-y-3 text-sm text-gray-300">
          <p>📍 {{ activeEvent.location }}</p>
          <p>📅 {{ activeEvent.date }}</p>
          <p>🌍 {{ activeEvent.region }}</p>
        </div>

        <button
          class="mt-5 w-full rounded-xl bg-orange-500 py-3 text-sm font-black text-white transition hover:bg-orange-600"
        >
          View Event Details
        </button>

        <button
          class="mt-3 w-full rounded-xl border border-purple-500/40 py-3 text-sm font-black text-purple-300 transition hover:bg-purple-500/10"
        >
          Follow Event
        </button>
      </div>
    </Transition>

    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(120,35,190,0.14)_70%,rgba(0,0,0,0.55)_100%)]"
    ></div>

    <div
      class="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs text-gray-300"
    >
      Drag to rotate • Scroll to zoom • Hover orange spikes
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'
import ThreeGlobe from 'three-globe'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const globeContainer = ref(null)
const activeEvent = ref(null)

let scene
let camera
let renderer
let globe
let controls
let animationFrame
let raycaster
let mouse
let hoveredEventId = null

const worldEvents = [
  {
    id: 1,
    title: 'FIFA World Cup 2026',
    location: 'USA, Canada, Mexico',
    region: 'North America',
    date: 'Jun 11 – Jul 19',
    category: 'Football',
    lat: 39.8283,
    lng: -98.5795,
    icon: '🏆',
    color: '#ff7a00',
    visible: true,
  },
]

const orangeLights = [
  { lat: 6.5244, lng: 3.3792, size: 0.18 },
  { lat: 9.0765, lng: 7.3986, size: 0.16 },
  { lat: 51.5072, lng: -0.1276, size: 0.18 },
  { lat: 40.7128, lng: -74.006, size: 0.18 },
  { lat: 48.8566, lng: 2.3522, size: 0.16 },
  { lat: 25.2048, lng: 55.2708, size: 0.16 },
  { lat: 35.6762, lng: 139.6503, size: 0.16 },
  { lat: -23.5505, lng: -46.6333, size: 0.16 },
  { lat: -26.2041, lng: 28.0473, size: 0.16 },
]

const getEventVector = (event) => {
  const lat = THREE.MathUtils.degToRad(event.lat)
  const lng = THREE.MathUtils.degToRad(event.lng)

  return new THREE.Vector3(
    Math.cos(lat) * Math.sin(lng),
    Math.sin(lat),
    Math.cos(lat) * Math.cos(lng)
  )
}

const isEventOnFrontSide = (event) => {
  if (!camera || !globe) return false

  const eventVector = getEventVector(event)

  eventVector.applyEuler(globe.rotation)

  const cameraDirection = new THREE.Vector3()
  camera.getWorldDirection(cameraDirection)

  return eventVector.dot(cameraDirection) < -0.15
}

const updateEventVisibility = () => {
  worldEvents.forEach((event) => {
    event.visible = isEventOnFrontSide(event)
  })

  if (activeEvent.value) {
    const updatedEvent = worldEvents.find((event) => event.id === activeEvent.value.id)

    if (!updatedEvent?.visible) {
      activeEvent.value = null
      controls.autoRotate = true
    } else {
      activeEvent.value = {
        ...activeEvent.value,
        visible: updatedEvent.visible,
      }
    }
  }
}

const handlePointerMove = (event) => {
  if (!renderer || !camera || !globeContainer.value || !raycaster || !mouse) return

  const rect = renderer.domElement.getBoundingClientRect()

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(globe.children, true)

  const eventHit = intersects.find((hit) => {
    return hit.object?.__data?.type === 'event'
  })

  if (eventHit) {
    const eventData = eventHit.object.__data

    if (eventData.visible) {
      hoveredEventId = eventData.id
      activeEvent.value = { ...eventData }
      controls.autoRotate = false
      globeContainer.value.style.cursor = 'pointer'
      return
    }
  }

  hoveredEventId = null
  globeContainer.value.style.cursor = 'grab'

  if (!activeEvent.value?.locked) {
    activeEvent.value = null
    controls.autoRotate = true
  }
}

const handlePointerClick = () => {
  if (!activeEvent.value) return

  activeEvent.value = {
    ...activeEvent.value,
    locked: true,
  }

  controls.autoRotate = false
}

const handlePointerLeave = () => {
  hoveredEventId = null

  if (globeContainer.value) {
    globeContainer.value.style.cursor = 'grab'
  }

  if (!activeEvent.value?.locked) {
    activeEvent.value = null
    controls.autoRotate = true
  }
}

const initGlobe = async () => {
  const width = globeContainer.value.clientWidth
  const height = globeContainer.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(0, 0, 245)

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x050505, 0)

  globeContainer.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enablePan = false
  controls.minDistance = 155
  controls.maxDistance = 390
  controls.rotateSpeed = 0.75
  controls.zoomSpeed = 0.7
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.35

  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  renderer.domElement.addEventListener('pointermove', handlePointerMove)
  renderer.domElement.addEventListener('click', handlePointerClick)
  renderer.domElement.addEventListener('pointerleave', handlePointerLeave)

  const countries = await fetch(
    'https://unpkg.com/world-atlas@2/countries-110m.json'
  ).then((res) => res.json())

  const topojson = await import('topojson-client')

  const countryFeatures = topojson.feature(
    countries,
    countries.objects.countries
  ).features

  const pointData = [
    ...orangeLights.map((light) => ({
      ...light,
      type: 'light',
      color: '#ff7a00',
    })),

    ...worldEvents.map((event) => ({
      ...event,
      type: 'event',
    })),
  ]

  globe = new ThreeGlobe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .showAtmosphere(true)
    .atmosphereColor('#7823BE')
    .atmosphereAltitude(0.13)

    .polygonsData(countryFeatures)
    .polygonAltitude(0.004)
    .polygonCapColor(() => 'rgba(15, 23, 42, 0.18)')
    .polygonSideColor(() => 'rgba(249, 115, 22, 0.08)')
    .polygonStrokeColor(() => 'rgba(249, 115, 22, 0.45)')

    .pointsData(pointData)
    .pointLat((d) => d.lat)
    .pointLng((d) => d.lng)
    .pointAltitude((d) => (d.type === 'event' ? 0.12 : 0.018))
    .pointRadius((d) => (d.type === 'event' ? 0.45 : d.size))
    .pointColor((d) => d.color || '#ff7a00')
    .pointsMerge(false)

    .ringsData(worldEvents)
    .ringLat((d) => d.lat)
    .ringLng((d) => d.lng)
    .ringColor(() => '#ff7a00')
    .ringMaxRadius(5)
    .ringPropagationSpeed(1.4)
    .ringRepeatPeriod(1200)

  globe.rotation.y = -0.65
  globe.scale.set(1.12, 1.12, 1.12)

  scene.add(globe)

  scene.add(new THREE.AmbientLight(0xffffff, 1.9))

  const orangeLight = new THREE.DirectionalLight(0xff7a00, 2.2)
  orangeLight.position.set(120, 80, 160)
  scene.add(orangeLight)

  const purpleLight = new THREE.PointLight(0x7823be, 1.8, 500)
  purpleLight.position.set(-140, -60, 140)
  scene.add(purpleLight)

  animate()
}

const animate = () => {
  controls.update()
  updateEventVisibility()
  renderer.render(scene, camera)
  animationFrame = requestAnimationFrame(animate)
}

const handleResize = () => {
  if (!globeContainer.value || !camera || !renderer) return

  const width = globeContainer.value.clientWidth
  const height = globeContainer.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initGlobe()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationFrame)

  renderer?.domElement?.removeEventListener('pointermove', handlePointerMove)
  renderer?.domElement?.removeEventListener('click', handlePointerClick)
  renderer?.domElement?.removeEventListener('pointerleave', handlePointerLeave)

  controls?.dispose()
  renderer?.dispose()
})
</script>

<style scoped>
.event-card-enter-active,
.event-card-leave-active {
  transition: all 0.25s ease;
}

.event-card-enter-from,
.event-card-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.96);
}
</style>