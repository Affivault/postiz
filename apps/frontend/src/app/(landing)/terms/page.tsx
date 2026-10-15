import { Metadata } from 'next';
import { LegalPageComponent } from '@gitroom/frontend/components/landing/legal.page.component';

export const metadata: Metadata = { title: 'Terms of Service - Acre Social' };

export default function Terms() {
  return (
    <LegalPageComponent title="Terms of Service" updated="October 15, 2026">
      <p>
        By creating an account or using Acre Social you agree to these terms.
      </p>
      <h2>The service</h2>
      <p>
        Acre Social lets you schedule and publish content to social networks.
        The service is provided free of charge and "as is", without
        warranties. Features may change, and we may suspend or end the
        service.
      </p>
      <h2>Your account</h2>
      <ul>
        <li>Keep your login details safe; you are responsible for activity on your account.</li>
        <li>You must follow the rules of every social network you connect.</li>
        <li>
          Do not use Acre Social for spam, illegal content, harassment, or to
          get around a network's limits.
        </li>
      </ul>
      <h2>Your content</h2>
      <p>
        You own the content you create. You give Acre Social permission to
        store and publish it only as needed to provide the service.
      </p>
      <h2>Ending your use</h2>
      <p>
        You can stop using Acre Social at any time. We may suspend accounts
        that break these terms.
      </p>
      <h2>Liability</h2>
      <p>
        To the extent allowed by law, Acre Social is not liable for lost
        content, missed posts, or actions taken by social networks on your
        accounts.
      </p>
      <h2>Open source</h2>
      <p>
        Acre Social is based on the open-source Postiz project and its source
        code is available under the AGPL-3.0 license.
      </p>
    </LegalPageComponent>
  );
}
