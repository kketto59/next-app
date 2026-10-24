'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  isInteracting?: boolean;
}

function ModelMesh({ url, isInteracting }: { url: string; isInteracting?: boolean }) {
  const { scene } = useGLTF(url);
  const spinGroupRef = useRef<THREE.Group>(null);

  // 作品切り替え時に回転角を確実にゼロ（初期の正面位置）へリセット
  useEffect(() => {
    if (spinGroupRef.current) {
      spinGroupRef.current.rotation.y = 0;
    }
  }, [url]);

  // 自転アニメーション
  useFrame((_, delta) => {
    if (!isInteracting && spinGroupRef.current) {
      spinGroupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    // 外側のグループ：正面(0)を基準にして回転させる
    <group ref={spinGroupRef}>
      {/* Center でモデル自体の中心を原点 (0,0,0) に芯出し */}
     <Center>
        <primitive 
            object={scene} 
            rotation={[0, 0, 0]} 
            scale={1.3} // 1.0（等倍）を基準に調整（例: 1.2〜1.5 で大きく、0.8 で小さく）
        />
     </Center>
    </group>
  );
}

export function Model({ url, isInteracting }: ModelProps) {
  if (!url) return null;
  return <ModelMesh key={url} url={url} isInteracting={isInteracting} />;
}