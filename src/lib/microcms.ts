import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  throw new Error('microCMS の環境変数（MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY）が設定されていません。');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});