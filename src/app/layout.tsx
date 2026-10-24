import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3D Portfolio',
  description: 'My 3D low-poly portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}