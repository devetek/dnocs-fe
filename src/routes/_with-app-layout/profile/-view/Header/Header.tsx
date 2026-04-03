import { User2Icon } from 'lucide-react';
import { useMetaTags } from 'react-metatags-hook';

import { useAuthLoggedIn } from '@/services/auth';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

const Headnote = () => (
  <Breadcrumb
    items={[
      { text: 'Dashboard', url: '/dashboard' },
      { text: 'Profile', url: '/profile' },
    ]}
  />
);

export default function Header() {
  const { userProfile } = useAuthLoggedIn();
  const displayName = userProfile.fullname || userProfile.username;

  useMetaTags(
    { title: `Profile: ${displayName} | dPanel` },
    [displayName],
  );

  return (
    <PageHeader
      heroIcon={User2Icon}
      headnote={<Headnote />}
      title={`Profile: ${displayName}`}
      description="Manage your personal information, subscription, and billing history."
    />
  );
}
