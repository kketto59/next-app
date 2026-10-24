'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress } from '@react-three/drei';
import { Model } from './Model';
import type { Work } from '@/lib/works';

function CanvasLoader() {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#737373', letterSpacing: '0.05em' }}>
        LOADING 3D DATA... {Math.round(progress)}%
      </span>
    </div>
  );
}

interface ModelViewerProps {
  work?: Work;
  showOverlay?: boolean; // 詳細ページでは右下オーバーレイを非表示にできるように設定
}

export default function ModelViewer({ work, showOverlay = true }: ModelViewerProps) {
  const [isInteracting, setIsInteracting] = useState(false);

  if (!work || !work.modelUrl) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          border: '1px solid #e5e5e5',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#a3a3a3' }}>
          3Dモデルが設定されていません
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '16px',
        border: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CanvasLoader />

      <Canvas
        camera={{ position: [0, 1.8, 4.5], fov: 45 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <Model key={work.modelUrl} url={work.modelUrl} isInteracting={isInteracting} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
            enableDamping
            dampingFactor={0.05}
            makeDefault
            minDistance={2}
            maxDistance={9}
            enablePan={false}
            // --- 水平回転（横軸）の設定 ---
            // minAzimuthAngle と maxAzimuthAngle を指定しない（または -Infinity / Infinity）ことで 360度どこまでも回転可能に
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
            
            // --- 上下（垂直）の制限 ---
            // 水平回転の快適さを損なわない範囲で上下の可動域を広げる（真上近くから真下近くまで）
            maxPolarAngle={Math.PI - 0.1} // ほぼ真下からの見上げまで許可
            minPolarAngle={0.1}           // ほぼ真上からの見下ろしまで許可
            
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
        />
      </Canvas>

      {/* 右下のタイトル・カテゴリ・詳細遷移ボタン */}
      {showOverlay && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '4px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          }}
        >
          <span style={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase', color: '#888' }}>
            {work.category}
          </span>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#171717', margin: 0 }}>
            {work.title}
          </h2>
          <Link
            href={`/works/${work.id}`}
            style={{
              marginTop: '6px',
              fontSize: '11px',
              fontFamily: 'monospace',
              color: '#171717',
              border: '1px solid #171717',
              borderRadius: '6px',
              padding: '4px 10px',
              textDecoration: 'none',
              backgroundColor: '#ffffff',
            }}
          >
            View Details →
          </Link>
        </div>
      )}
    </div>
  );
}