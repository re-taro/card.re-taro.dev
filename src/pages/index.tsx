import { useRouter } from 'next/router'
import { Inter } from '@next/font/google'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Link from 'next/link'
import * as styles from '../styles/home.css'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const router = useRouter()
  const { embed } = router.query
  const [fullScreen, setFullScreen] = useState(false)
  useEffect(() => {
    const cardFrontImagePath = '/front.png'
    const cardBackImagePath = '/back.png'
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.getElementsByClassName(styles.canvas)[0],
    })
    const camera = new THREE.PerspectiveCamera(40)
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)
    const scene = new THREE.Scene()
    const stage = new THREE.Object3D()
    const background = new THREE.Object3D()
    const ambientLight = new THREE.AmbientLight(0xE8E8E8)
    const directionalLightFront = new THREE.DirectionalLight(0xFFFFFF, 0.65)
    const directionalLightBack = new THREE.DirectionalLight(0xE0E0E0, 0.6)
    directionalLightFront.position.set(1, 0.25, 1)
    directionalLightBack.position.set(-1, 0, -1)
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      const cardScaleFactor = window.innerWidth < 425 ? 0.8 : (window.innerWidth < 768 ? 1.2 : 1.6)
      stage.scale.set(cardScaleFactor, cardScaleFactor, cardScaleFactor)
    }
    resize()
    window.addEventListener('resize', resize)
    scene.add(stage)
    scene.add(background)
    scene.add(ambientLight)
    scene.add(directionalLightFront, directionalLightBack)
    const x = 0
    const y = 0
    const w = 1
    const h = 1
    const xr = 20 / 728
    const yr = 20 / 440
    const shape = new THREE.Shape()
      .moveTo(x, y + yr)
      .lineTo(x, y + h - yr)
      .quadraticCurveTo(x, y + h, x + xr, y + h)
      .lineTo(x + w - xr, y + h)
      .quadraticCurveTo(x + w, y + h, x + w, y + h - yr)
      .lineTo(x + w, y + yr)
      .quadraticCurveTo(x + w, y, x + w - xr, y)
      .lineTo(x + xr, y)
      .quadraticCurveTo(x, y, x, y + yr)
    const cardGeometry = new THREE.ShapeGeometry(shape, 8)
    const backgroundIcosphereMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6, 6),
      new THREE.MeshBasicMaterial({
        color: 0x2E3440,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      }),
    )
    const textureCardFront = new THREE.TextureLoader().load(cardFrontImagePath)
    const textureCardBack = new THREE.TextureLoader().load(cardBackImagePath)
    const cardFrontMesh = new THREE.Mesh(
      cardGeometry,
      new THREE.MeshStandardMaterial({
        map: textureCardFront,
        side: THREE.DoubleSide,
        roughness: 0.7,
        metalness: 0.5,
      }),
    )
    cardFrontMesh.scale.set(1.6545, 1, 1)
    cardFrontMesh.position.set(-1.6545 / 2, -0.5, 0.0082)
    const cardBackMesh = new THREE.Mesh(
      cardGeometry,
      new THREE.MeshStandardMaterial({
        map: textureCardBack,
        side: THREE.DoubleSide,
        roughness: 0.7,
        metalness: 0.5,
      }),
    )
    cardBackMesh.scale.set(1.6545, 1, 1)
    cardBackMesh.position.set(1.6545 / 2, -0.5, -0.0082)
    cardBackMesh.rotation.set(0, Math.PI, 0)
    const cardSideMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.016,
        bevelEnabled: false,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xE7E2D3,
        roughness: 0.8,
        metalness: 0.025,
      }),
    )
    cardSideMesh.scale.set(1.6545, 1, 1)
    cardSideMesh.position.set(-1.6545 / 2, -0.5, -0.008)
    stage.add(cardFrontMesh, cardBackMesh, cardSideMesh)
    stage.quaternion.setFromAxisAngle(new THREE.Vector3(-0.25, 1, 0).normalize(), 0.25 * Math.PI)
    background.add(backgroundIcosphereMesh)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.enableDamping = true
    controls.dampingFactor = 0.04
    controls.update()
    let cardYPos = -2
    const animate = (time: number) => {
      const rad = time / 5000 * Math.PI / 2
      cardYPos += (0.01 - cardYPos) * 0.04
      stage.position.set(0, cardYPos + Math.sin(rad * 4) * 0.01, 0)
      controls.update()
      renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
  }, [router.isReady])
  const requestFullScreen = () => {
    if (fullScreen)
      document.exitFullscreen()
    else
      document.body.requestFullscreen()
    setFullScreen(!fullScreen)
  }

  return (
    <main>
      <canvas className={styles.canvas} />
      {
        embed === 'true'
          ? (
            <button className={`${inter.className} ${styles.fullScreen}`} onClick={requestFullScreen}>
              {fullScreen ? 'exit <---' : 'view in fullscreen ->'}
            </button>
            )
          : (
            <Link href="/home" className={`${inter.className} ${styles.container}`}>
              <span className={styles.typograph}>{'<-'}</span>
              <span className={styles.typograph}>re-taro.dev</span>
            </Link>
            )
      }
    </main>
  )
}

export default Home
