import { client } from './microcms';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

export interface MicroCMSWork {
  id: string;
  title: string;
  category: string;
  modelUrl: string;
  // 複数画像フィールドの場合の型定義
  thumbnail?: { url: string }[] | { url: string };
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Work {
  id: string;
  title: string;
  category: string;
  modelUrl: string;
  thumbnailUrl: string; // ギャラリー用の代表1枚
  images: string[];     // 詳細ページで並べる全画像リスト
  description: string;
}

// 取得した画像フィールドからURLリストを抽出するヘルパー関数
function extractImages(thumbnail: MicroCMSWork['thumbnail']): string[] {
  if (!thumbnail) return [];
  if (Array.isArray(thumbnail)) {
    return thumbnail.map((item) => item.url);
  }
  return thumbnail.url ? [thumbnail.url] : [];
}

export async function getWorks(): Promise<Work[]> {
  if (!client) return [];
  try {
    const data = await client.get<MicroCMSListResponse<MicroCMSWork>>({
      endpoint: 'works',
      queries: {
        limit: 20,
        orders: '-createdAt',
      },
    });

    return data.contents.map((item) => {
      const images = extractImages(item.thumbnail);
      return {
        id: item.id,
        title: item.title,
        category: item.category,
        modelUrl: item.modelUrl,
        thumbnailUrl: images[0] ?? '',
        images,
        description: item.description ?? '',
      };
    });
  } catch (error) {
    console.error('microCMS 取得エラー:', error);
    return [];
  }
}

export async function getWorkById(id: string): Promise<Work | null> {
  if (!client) return null;
  try {
    const item = await client.get<MicroCMSWork>({
      endpoint: 'works',
      contentId: id,
    });

    const images = extractImages(item.thumbnail);
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      modelUrl: item.modelUrl,
      thumbnailUrl: images[0] ?? '',
      images,
      description: item.description ?? '',
    };
  } catch (error) {
    console.error(`ID: ${id} 取得エラー:`, error);
    return null;
  }
}