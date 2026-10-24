'use client';

import { useState } from 'react';
import ModelViewer from '@/components/ModelViewer';
import WorkGallery from '@/components/WorkGallery';
import type { Work } from '@/lib/works';

interface PortfolioContainerProps {
  initialWorks: Work[];
}

export default function PortfolioContainer({ initialWorks }: PortfolioContainerProps) {
  const [works] = useState<Work[]>(initialWorks);
  const [currentWork, setCurrentWork] = useState<Work | undefined>(initialWorks[0]);

  if (!works || works.length === 0 || !currentWork) {
    return (
      <main style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#888' }}>
        No works found. Please add content in microCMS.
      </main>
    );
  }

  return (
    <main
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        color: '#171717',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* 1. ヘッダー */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBottom: '12px',
          borderBottom: '1px solid #f0f0f0',
          flexShrink: 0,
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
            Portfolio
          </h1>
          <p style={{ fontSize: '13px', color: '#737373', margin: '4px 0 0 0' }}>
            {currentWork.title} — <span style={{ fontFamily: 'monospace' }}>{currentWork.category}</span>
          </p>
        </div>
      </header>

      {/* 2. メイン3Dビューワー（上下の残りの高さをすべて占有） */}
      <section style={{ flex: 1, minHeight: 0, position: 'relative', margin: '16px 0' }}>
         <ModelViewer work={currentWork} />
     </section>

      {/* 3. 下部ギャラリー（固定の高さで横スクロール） */}
      <section
        style={{
          height: '130px',
          flexShrink: 0,
          paddingTop: '12px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <WorkGallery
          works={works}
          activeId={currentWork.id}
          onSelectWork={setCurrentWork}
        />
      </section>
    </main>
  );
}