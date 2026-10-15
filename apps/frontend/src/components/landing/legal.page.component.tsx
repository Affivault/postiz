import { FC, ReactNode } from 'react';
import {
  LandingFooter,
  LandingHeader,
} from '@gitroom/frontend/components/landing/landing.component';

export const LegalPageComponent: FC<{
  title: string;
  updated: string;
  children: ReactNode;
}> = ({ title, updated, children }) => (
  <>
    <LandingHeader />
    <main className="mx-auto max-w-[720px] px-[20px] pb-[96px] pt-[40px]">
      <h1 className="font-[family-name:var(--font-display)] text-[40px] font-extrabold leading-[1.1]">
        {title}
      </h1>
      <p className="mt-[8px] text-[14px] text-[#6B6185]">Last updated {updated}</p>
      <div className="mt-[32px] space-y-[16px] text-[16px] leading-[1.7] text-[#2E2545] [&_h2]:pt-[16px] [&_h2]:font-[family-name:var(--font-display)] [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-[#1E1530] [&_ul]:list-disc [&_ul]:space-y-[6px] [&_ul]:ps-[22px]">
        {children}
      </div>
    </main>
    <LandingFooter />
  </>
);
