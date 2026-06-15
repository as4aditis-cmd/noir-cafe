import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

import { Cormorant_Garamond } from 'next/font/google';

import { LenisProvider } from '@/components/layout/LenisProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GrainOverlay } from '@/components/ui/GrainOverlay';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Noir — A Coffee Ritual',
  description:
    'Noir is a sanctuary for the discerning coffee lover. Single-origin espressos, hand-poured filters, and pastries that honour the craft.',
  keywords: ['specialty coffee', 'cafe', 'espresso', 'single origin', 'artisan'],
  authors: [{ name: 'Noir Cafe' }],
  openGraph: {
    title: 'Noir — A Coffee Ritual',
    description:
      'Where darkness meets warmth. Specialty coffee roasted with intention.',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F0D0A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cormorant.variable}
    >
      <body>
        <GrainOverlay />
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}