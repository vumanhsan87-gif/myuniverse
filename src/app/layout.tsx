import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import FloatingNav from '@/components/FloatingNav';
import StarField from '@/components/StarField';

export const metadata: Metadata = {
  title: '刘宇微 | 致广大而尽精微',
  description: '个人介绍网站',
  keywords: ['刘宇微', '个人介绍'],
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="hide-scrollbar">
        <StarField />
        <Navbar />
        <FloatingNav />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
