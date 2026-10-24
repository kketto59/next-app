import { client } from '../lib/microcms';
import type { MicroCMSListResponse } from 'microcms-js-sdk';

export interface MicroCMSWork {
  id: string;
  title: string;
  category: string;
  modelUrl: string; // SupabaseのURLが入る
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Work {
  id: string;
  title: string;
  category: string;
  modelUrl: string;
  thumbnailUrl: string;
}

export async function getWorks(): Promise<Work[]> {
  const data = await client.get<MicroCMSListResponse<MicroCMSWork>>({
    endpoint: 'works',
    queries: {
      limit: 20,
      orders: '-createdAt',
    },
  });

  return data.contents.map((item: MicroCMSWork & { id: string }) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    modelUrl: item.modelUrl,
    thumbnailUrl: item.thumbnail.url,
  }));
}