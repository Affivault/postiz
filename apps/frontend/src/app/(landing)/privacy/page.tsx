import { Metadata } from 'next';
import { LegalPageComponent } from '@gitroom/frontend/components/landing/legal.page.component';

export const metadata: Metadata = { title: 'Privacy Policy - Acre Social' };

export default function Privacy() {
  return (
    <LegalPageComponent title="Privacy Policy" updated="October 15, 2026">
      <p>
        This policy explains what information Acre Social collects when you
        use the service, and how it is used.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Account details: your email address, name and password (stored hashed).</li>
        <li>
          Connected channels: the access tokens and basic profile details the
          social networks return when you connect an account.
        </li>
        <li>Content you create: posts, comments, images and videos you upload.</li>
        <li>Usage and technical data such as IP address, browser and error logs.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To run the service: publish posts you schedule, at the time you choose.</li>
        <li>To show analytics for the channels you connect.</li>
        <li>To keep the service secure and fix problems.</li>
        <li>To send account emails such as password resets.</li>
      </ul>
      <p>
        We do not sell your data and we do not use your content for
        advertising.
      </p>
      <h2>Social network data</h2>
      <p>
        Data received from connected networks (for example Meta, Google,
        TikTok, LinkedIn or X) is used only to provide the features you use,
        and is handled according to each network's developer terms. You can
        disconnect a channel at any time, which removes its access tokens.
      </p>
      <h2>Sharing</h2>
      <p>
        Your data is shared only with the providers that host and run the
        service (hosting, database, file storage, email and error monitoring),
        and with social networks when you publish to them.
      </p>
      <h2>Retention and deletion</h2>
      <p>
        We keep your data while your account is active. You can delete posts
        and channels at any time, and ask us to delete your account and its
        data by contacting us.
      </p>
      <h2>Contact</h2>
      <p>Questions about this policy: contact the Acre Social team.</p>
    </LegalPageComponent>
  );
}
