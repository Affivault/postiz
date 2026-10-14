import { parse } from 'tldts';

export function getCookieUrlFromDomain(domain: string) {
  // allowPrivateDomains keeps hosts like *.vercel.app on their own subdomain,
  // browsers reject cookies set on a public suffix such as .vercel.app
  const url = parse(domain, { allowPrivateDomains: true });
  return url.domain! ? '.' + url.domain! : url.hostname!;
}
