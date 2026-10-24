import { getWorks } from '@/lib/works';
import PortfolioContainer from '@/components/PortfolioContainer';

export default async function Page() {
  // --- 環境変数の読み込みテスト（確認後に削除してください） ---
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  const key = process.env.MICROCMS_API_KEY;

  console.log('=== ENV CHECK ===');
  console.log('DOMAIN 読み込み:', domain ? `OK (${domain})` : '✕ 未設定');
  console.log('API_KEY 読み込み:', key ? `OK (長さ: ${key.length}文字, 先頭: ${key.slice(0, 4)}***)` : '✕ 未設定');
  console.log('=================');
  // ----------------------------------------------------

  const works = await getWorks();
  return <PortfolioContainer initialWorks={works} />;
}