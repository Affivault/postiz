export const dynamic = 'force-dynamic';
import { internalFetch } from '@gitroom/helpers/utils/internal.fetch';
import { Login } from '@gitroom/frontend/components/auth/login';
import { Metadata } from 'next';
import { isGeneralServerSide } from '@gitroom/helpers/utils/is.general.server.side';
export const metadata: Metadata = {
  title: `${isGeneralServerSide() ? 'Acre Social' : 'Gitroom'} Login`,
  description: '',
};
export default async function Auth() {
  const canRegister =
    process.env.DISABLE_REGISTRATION !== 'true' ||
    (await (await internalFetch('/auth/can-register')).json()).register;
  return <Login canRegister={canRegister} />;
}
