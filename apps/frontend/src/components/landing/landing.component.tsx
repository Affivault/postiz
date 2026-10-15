import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';

export const SOURCE_CODE_URL = 'https://github.com/Affivault/postiz';

const networks = [
  { name: 'X', icon: 'x' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Facebook', icon: 'facebook' },
  { name: 'TikTok', icon: 'tiktok' },
  { name: 'YouTube', icon: 'youtube' },
  { name: 'Threads', icon: 'threads' },
  { name: 'Bluesky', icon: 'bluesky' },
  { name: 'Pinterest', icon: 'pinterest' },
  { name: 'Reddit', icon: 'reddit' },
  { name: 'Google Business', icon: 'gmb' },
  { name: 'Mastodon', icon: 'mastodon' },
  { name: 'Discord', icon: 'discord' },
  { name: 'Telegram', icon: 'telegram' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Dribbble', icon: 'dribbble' },
  { name: 'Medium', icon: 'medium' },
  { name: 'Dev.to', icon: 'devto' },
  { name: 'Hashnode', icon: 'hashnode' },
  { name: 'WordPress', icon: 'wordpress' },
  { name: 'Tumblr', icon: 'tumblr' },
  { name: 'Twitch', icon: 'twitch' },
  { name: 'Lemmy', icon: 'lemmy' },
  { name: 'Nostr', icon: 'nostr' },
];

type Plot = { icon: string; text: string; time: string; done?: boolean };
const week: { day: string; plots: Plot[] }[] = [
  {
    day: 'Mon',
    plots: [
      { icon: 'linkedin', text: 'Hiring update', time: '9:00', done: true },
      { icon: 'x', text: 'Launch thread', time: '14:30', done: true },
    ],
  },
  {
    day: 'Tue',
    plots: [{ icon: 'instagram', text: 'Studio photos', time: '11:00', done: true }],
  },
  {
    day: 'Wed',
    plots: [
      { icon: 'tiktok', text: 'Behind the scenes', time: '18:00' },
      { icon: 'threads', text: 'Quick poll', time: '20:15' },
    ],
  },
  {
    day: 'Thu',
    plots: [{ icon: 'youtube', text: 'Weekly recap', time: '16:00' }],
  },
  {
    day: 'Fri',
    plots: [
      { icon: 'facebook', text: 'Event reminder', time: '10:00' },
      { icon: 'bluesky', text: 'Link roundup', time: '15:45' },
    ],
  },
  { day: 'Sat', plots: [{ icon: 'pinterest', text: 'Mood board', time: '12:00' }] },
  { day: 'Sun', plots: [] },
];

const features = [
  {
    title: 'One calendar for every channel',
    text: 'See the day, week or month at a glance and drag a post to move it.',
  },
  {
    title: 'Adjust each post per network',
    text: 'Write once, then change the text, media or settings for each channel and preview how it will look.',
  },
  {
    title: 'Media library',
    text: 'Keep your images and videos in one place and reuse them across posts.',
  },
  {
    title: 'Work with your team',
    text: 'Invite teammates to your workspace and share preview links to collect feedback before a post goes out.',
  },
  {
    title: 'Analytics',
    text: 'Check how your channels and posts perform without opening each network.',
  },
  {
    title: 'API and webhooks',
    text: 'Create posts from your own tools and get notified when something is published.',
  },
];

const faqs = [
  {
    q: 'Is Acre Social really free?',
    a: 'Yes. There are no paid plans, no trial period and no card to enter. Every feature is available to every account.',
  },
  {
    q: 'Which networks can I post to?',
    a: `${networks
      .slice(0, 10)
      .map((n) => n.name)
      .join(', ')} and ${networks.length - 10} more.`,
  },
  {
    q: 'Can my team use it?',
    a: 'Yes. Invite teammates to your workspace so you can plan and review posts together.',
  },
  {
    q: 'Will Acre Social post anything without me?',
    a: 'No. A post is only published to the channels you picked, at the time you scheduled it.',
  },
  {
    q: 'Is the code open source?',
    a: 'Yes. Acre Social is built on the open-source Postiz project and released under the AGPL-3.0 license. The full source code is public.',
  },
];

const PrimaryButton: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="inline-flex items-center justify-center rounded-[14px] bg-[#612BD3] px-[22px] h-[52px] text-[16px] font-semibold text-white transition-colors hover:bg-[#4E1FB3] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#612BD3]"
  >
    {children}
  </Link>
);

const SecondaryButton: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="inline-flex items-center justify-center rounded-[14px] border border-[#CFC6E6] px-[22px] h-[52px] text-[16px] font-semibold text-[#1E1530] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#612BD3]"
  >
    {children}
  </Link>
);

const FieldPlanner: FC = () => {
  let order = 0;
  return (
    <figure className="rounded-[24px] bg-white p-[14px] sm:p-[18px] shadow-[0_30px_60px_-30px_rgba(46,22,104,0.35)] ring-1 ring-[#E4DEF3]">
      <div className="flex items-center justify-between px-[4px] pb-[12px]">
        <span className="font-[family-name:var(--font-display)] text-[18px] font-semibold">
          This week
        </span>
        <span className="text-[13px] text-[#6B6185]">9 posts, 8 channels</span>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-[6px]">
        {week.map((d, i) => (
          <div
            key={d.day}
            className={i > 3 ? 'hidden sm:block' : undefined}
          >
            <div className="pb-[6px] text-center text-[12px] font-semibold text-[#6B6185]">
              {d.day}
            </div>
            <div className="acre-furrows flex min-h-[210px] flex-col gap-[6px] rounded-[12px] bg-[#F7F5FC] p-[5px]">
              {d.plots.map((p) => {
                const delay = 250 + order++ * 140;
                return (
                  <div
                    key={p.text}
                    className={`acre-plant rounded-[9px] p-[7px] text-[11px] leading-[1.3] ${
                      p.done
                        ? 'bg-[#EDE6FF] text-[#3B2380]'
                        : 'bg-[#C9E265] text-[#26310A]'
                    }`}
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <div className="flex items-center gap-[5px]">
                      <img
                        src={`/icons/platforms/${p.icon}.png`}
                        alt=""
                        width={16}
                        height={16}
                        className="rounded-[4px]"
                      />
                      <span className="font-semibold">{p.time}</span>
                    </div>
                    <div className="mt-[4px]">{p.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="flex gap-[16px] px-[4px] pt-[12px] text-[12px] text-[#6B6185]">
        <span className="flex items-center gap-[6px]">
          <span className="h-[10px] w-[10px] rounded-[3px] bg-[#EDE6FF] ring-1 ring-[#CDBFF5]" />
          Published
        </span>
        <span className="flex items-center gap-[6px]">
          <span className="h-[10px] w-[10px] rounded-[3px] bg-[#C9E265]" />
          Scheduled
        </span>
      </figcaption>
    </figure>
  );
};

export const LandingHeader: FC = () => (
  <header className="mx-auto flex max-w-[1180px] items-center justify-between px-[20px] py-[20px]">
    <Link href="/" aria-label="Acre Social home" className="text-[#1E1530]">
      <LogoTextComponent />
    </Link>
    <nav className="flex items-center gap-[8px] sm:gap-[20px] text-[15px] font-semibold">
      <Link
        href="/auth/login"
        className="rounded-[10px] px-[10px] py-[8px] hover:text-[#612BD3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#612BD3]"
      >
        Log in
      </Link>
      <Link
        href="/auth"
        className="hidden sm:inline-flex rounded-[12px] bg-[#1E1530] px-[16px] py-[10px] text-white hover:bg-[#612BD3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#612BD3]"
      >
        Create free account
      </Link>
    </nav>
  </header>
);

export const LandingFooter: FC = () => (
  <footer className="border-t border-[#DCD6EC]">
    <div className="mx-auto flex max-w-[1180px] flex-col gap-[16px] px-[20px] py-[32px] text-[14px] text-[#6B6185] sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} Acre Social</span>
      <nav className="flex flex-wrap gap-[20px]">
        <Link href="/terms" className="hover:text-[#1E1530]">
          Terms
        </Link>
        <Link href="/privacy" className="hover:text-[#1E1530]">
          Privacy
        </Link>
        <a
          href={SOURCE_CODE_URL}
          className="hover:text-[#1E1530]"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </nav>
    </div>
  </footer>
);

export const LandingComponent: FC = () => {
  return (
    <>
      <LandingHeader />
      <main>
        <section className="mx-auto grid max-w-[1180px] items-center gap-[48px] px-[20px] pb-[80px] pt-[32px] lg:grid-cols-[1fr_1.15fr] lg:pt-[56px]">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-[44px] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[64px]">
              Plan a week of posts in one sitting.
            </h1>
            <p className="mt-[20px] max-w-[34em] text-[18px] leading-[1.6] text-[#4A4062]">
              Acre Social schedules and publishes your posts to X, LinkedIn,
              Instagram, TikTok, YouTube and {networks.length - 5} more
              networks from one calendar. It's free: no plans, no trial, no
              card.
            </p>
            <div className="mt-[32px] flex flex-wrap gap-[12px]">
              <PrimaryButton href="/auth">Create free account</PrimaryButton>
              <SecondaryButton href="/auth/login">Log in</SecondaryButton>
            </div>
          </div>
          <FieldPlanner />
        </section>

        <section
          aria-labelledby="networks"
          className="border-y border-[#DCD6EC] bg-white"
        >
          <div className="mx-auto max-w-[1180px] px-[20px] py-[56px]">
            <h2
              id="networks"
              className="font-[family-name:var(--font-display)] text-[28px] font-semibold sm:text-[34px]"
            >
              Post to {networks.length} networks from one place
            </h2>
            <ul className="mt-[28px] grid grid-cols-2 gap-x-[16px] gap-y-[14px] sm:grid-cols-4 lg:grid-cols-6">
              {networks.map((n) => (
                <li
                  key={n.name}
                  className="flex items-center gap-[10px] text-[15px] font-medium"
                >
                  <img
                    src={`/icons/platforms/${n.icon}.png`}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-[7px]"
                  />
                  {n.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="features"
          className="mx-auto grid max-w-[1180px] gap-[40px] px-[20px] py-[88px] lg:grid-cols-[1fr_2fr]"
        >
          <h2
            id="features"
            className="font-[family-name:var(--font-display)] text-[34px] font-semibold leading-[1.1] sm:text-[42px]"
          >
            Everything you need to run your channels
          </h2>
          <dl className="grid gap-x-[40px] sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="border-t border-[#DCD6EC] py-[22px]">
                <dt className="text-[18px] font-semibold">{f.title}</dt>
                <dd className="mt-[6px] text-[16px] leading-[1.6] text-[#4A4062]">
                  {f.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="how" className="bg-[#1E1530] text-white">
          <div className="mx-auto max-w-[1180px] px-[20px] py-[88px]">
            <h2
              id="how"
              className="font-[family-name:var(--font-display)] text-[34px] font-semibold sm:text-[42px]"
            >
              Up and running in minutes
            </h2>
            <ol className="mt-[40px] grid gap-[32px] md:grid-cols-3">
              {[
                ['Create your account', 'Sign up with your email. No card, no trial clock.'],
                ['Connect your channels', 'Link the social accounts you post to, one click each.'],
                ['Schedule your posts', 'Write once, pick the channels and times, and Acre Social publishes them for you.'],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-[16px]">
                  <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#C9E265] font-[family-name:var(--font-display)] text-[18px] font-extrabold text-[#26310A]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[19px] font-semibold">{title}</h3>
                    <p className="mt-[6px] leading-[1.6] text-[#CFC6E6]">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-labelledby="faq"
          className="mx-auto max-w-[820px] px-[20px] py-[88px]"
        >
          <h2
            id="faq"
            className="font-[family-name:var(--font-display)] text-[34px] font-semibold sm:text-[42px]"
          >
            Questions
          </h2>
          <div className="mt-[28px]">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group border-t border-[#DCD6EC] py-[18px] last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-[16px] text-[18px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#612BD3] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-[24px] leading-none text-[#612BD3] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-[10px] max-w-[60ch] leading-[1.6] text-[#4A4062]">
                  {f.a}
                  {f.q.includes('open source') && (
                    <>
                      {' '}
                      <a
                        href={SOURCE_CODE_URL}
                        className="font-semibold text-[#612BD3] underline"
                        rel="noopener noreferrer"
                      >
                        View the source code
                      </a>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-[20px] pb-[96px]">
          <div className="flex flex-col items-start gap-[24px] rounded-[28px] bg-[#C9E265] px-[28px] py-[44px] sm:px-[48px] md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-[16em] font-[family-name:var(--font-display)] text-[30px] font-extrabold leading-[1.1] text-[#26310A] sm:text-[38px]">
              Your next week of posts, planned before lunch.
            </h2>
            <PrimaryButton href="/auth">Create free account</PrimaryButton>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
};
