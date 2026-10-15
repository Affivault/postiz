import './landing.scss';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import clsx from 'clsx';

const display = Bricolage_Grotesque({
  weight: ['600', '800'],
  subsets: ['latin'],
  variable: '--font-display',
});
const body = Plus_Jakarta_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Acre Social - Free social media scheduler',
  description:
    'Plan and publish posts to X, LinkedIn, Instagram, TikTok, YouTube and 20+ more networks from one calendar. Free, with no paid plans.',
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={clsx(
          display.variable,
          body.variable,
          'bg-[#F3F1FA] text-[#1E1530] antialiased font-[family-name:var(--font-body)]'
        )}
      >
        {children}
      </body>
    </html>
  );
}
