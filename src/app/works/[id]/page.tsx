import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorkById } from '@/lib/works';
import ModelViewer from '@/components/ModelViewer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#171717', padding: '32px 24px' }}>
      {/* 戻るリンク */}
      <div style={{ maxWidth: '960px', margin: '0 auto 20px auto' }}>
        <Link
          href="/"
          style={{
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#737373',
            textDecoration: 'none',
          }}
        >
          ← Back to Portfolio
        </Link>
      </div>

      <main style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* メイン3Dビューワー */}
        <div style={{ width: '100%', height: '500px', marginBottom: '32px' }}>
          <ModelViewer work={work} showOverlay={false} />
        </div>

        {/* テキスト情報 */}
        <section style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '32px', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', color: '#888' }}>
            {work.category}
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '8px 0 16px 0', letterSpacing: '-0.02em' }}>
            {work.title}
          </h1>

          {work.description ? (
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#404040', whiteSpace: 'pre-wrap', margin: 0 }}>
              {work.description}
            </p>
          ) : (
            <p style={{ fontSize: '13px', color: '#a3a3a3', fontStyle: 'italic', margin: 0 }}>
              説明文はありません。
            </p>
          )}
        </section>

        {/* microCMSに登録された画像リスト（枠線・角丸なしのストレート配置） */}
        {work.images && work.images.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '80px' }}>
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#888', letterSpacing: '0.05em' }}>
              STILLS & PROCESS ({work.images.length})
            </span>
            {work.images.map((imgUrl, index) => (
              <div key={index} style={{ width: '100%' }}>
                <img
                  src={imgUrl}
                  alt={`${work.title} image ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}