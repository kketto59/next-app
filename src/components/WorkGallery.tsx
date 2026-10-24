'use client';

import type { Work } from '@/lib/works';
import WorkThumbnail3D from './WorkThumbnail3D';

interface WorkGalleryProps {
  works: Work[];
  activeId: string;
  onSelectWork: (work: Work) => void;
}

export default function WorkGallery({ works, activeId, onSelectWork }: WorkGalleryProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        overflowX: 'auto',
        overflowY: 'hidden',
        height: '100%',
        padding: '4px',
      }}
    >
      {works.map((work) => {
        const isActive = work.id === activeId;
        return (
          <button
            key={work.id}
            onClick={() => onSelectWork(work)}
            type="button"
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '180px',
              height: '110px',
              borderRadius: '12px',
              border: isActive ? '2px solid #171717' : '1px solid #e5e5e5',
              backgroundColor: isActive ? '#f5f5f5' : '#ffffff',
              boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
              transform: isActive ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '8px',
              outline: 'none',
            }}
          >
            {/* 3Dミニプレビュー */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <WorkThumbnail3D modelUrl={work.modelUrl} />
            </div>

            {/* ラベル情報（前面に透過白背景で重ねる） */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                borderRadius: '6px',
                padding: '4px 6px',
                textAlign: 'left',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '9px',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  color: '#737373',
                }}
              >
                {work.category}
              </span>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#171717',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {work.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}