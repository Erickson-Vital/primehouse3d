import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const mountRef = useRef()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
    camera.position.z = 4

    const objects = []

    const addWireframe = (geo, color, x, y, z, rotSpeed) => {
      const wire = new THREE.WireframeGeometry(geo)
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 })
      const mesh = new THREE.LineSegments(wire, mat)
      mesh.position.set(x, y, z)
      mesh.userData.rotSpeed = rotSpeed
      scene.add(mesh)
      objects.push(mesh)
      return mesh
    }

    addWireframe(new THREE.IcosahedronGeometry(1.2, 1), 0x00ff88, 0, 0, 0, { x: 0.003, y: 0.005, z: 0.001 })
    addWireframe(new THREE.OctahedronGeometry(0.6), 0x00aaff, 0, 0, 0, { x: -0.005, y: -0.003, z: 0.004 })
    addWireframe(new THREE.TorusGeometry(1.8, 0.04, 8, 60), 0x00ff88, 0, 0, 0, { x: 0.001, y: 0.004, z: 0.002 })

    const pointsGeo = new THREE.BufferGeometry()
    const positions = []
    for (let i = 0; i < 200; i++) {
      positions.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      )
    }
    pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const pointsMat = new THREE.PointsMaterial({ color: 0x00aaff, size: 0.03, transparent: true, opacity: 0.5 })
    scene.add(new THREE.Points(pointsGeo, pointsMat))

    let mouse = { x: 0, y: 0 }
    const onMouseMove = e => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMouseMove)

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      objects.forEach(obj => {
        obj.rotation.x += obj.userData.rotSpeed.x
        obj.rotation.y += obj.userData.rotSpeed.y
        obj.rotation.z += obj.userData.rotSpeed.z
      })
      scene.rotation.y += (mouse.x - scene.rotation.y) * 0.02
      scene.rotation.x += (mouse.y - scene.rotation.x) * 0.02
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
}
