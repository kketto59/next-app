'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function MiniModelMesh({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const spinGroupRef = useRef<THREE.Group>(null);

  // Center で中心補正されたオブジェクト全体を外側のグループで自転させる
  useFrame((_, delta) => {
    if (spinGroupRef.current) {
      spinGroupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    // 外側のグループを回転軸にする（その場できれいに自転）
    <group ref={spinGroupRef}>
      {/* Center を挟むことで、原点がズレているモデルも強制的に (0,0,0) に芯出しされる */}
      <Center>
        <primitive object={scene.clone()} />
      </Center>
    </group>
  );
}

export default function WorkThumbnail3D({ modelUrl }: { modelUrl: string }) {
  if (!modelUrl) return null;

  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 1.2, 3], fov: 50 }}
        dpr={1}
        gl={{ powerPreference: 'low-power' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} />

        <Suspense fallback={null}>
          <MiniModelMesh url={modelUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}