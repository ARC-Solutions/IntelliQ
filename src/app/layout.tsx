import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'IntelliQ',
    template: '%s | IntelliQ',
  },
  description: 'Test your expertise across various subjects with IntelliQ',
  openGraph: {
    title: 'IntelliQ',
    description: 'Test your expertise across various subjects with IntelliQ',
    url: 'www.intelliq.arc-solutions.xyz/',
    siteName: 'IntelliQ',
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
