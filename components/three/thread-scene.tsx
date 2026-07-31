"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import {
  CatmullRomCurve3,
  TubeGeometry,
  Vector3,
  type Mesh,
} from "three"

type ThreadSceneProps = {
  scrollProgress?: number
}

export function ThreadScene({ scrollProgress = 0 }: ThreadSceneProps) {
  const meshRef = useRef<Mesh>(null)

  const geometry = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-4, -2.5, -0.5),
      new Vector3(-1.5, -0.5, 0.8),
      new Vector3(0.5, 1.2, -0.3),
      new Vector3(2.5, 2, 0.6),
      new Vector3(4.5, 3, 0),
    ])
    return new TubeGeometry(curve, 128, 0.018, 12, false)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.z = Math.sin(t * 0.25) * 0.08 + scrollProgress * 0.15
    meshRef.current.position.y = -scrollProgress * 1.2
    meshRef.current.position.z = scrollProgress * 0.8
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color="#c9a96e"
        transmission={0.55}
        roughness={0.25}
        metalness={0.1}
        transparent
        opacity={0.45}
        thickness={0.5}
      />
    </mesh>
  )
}
