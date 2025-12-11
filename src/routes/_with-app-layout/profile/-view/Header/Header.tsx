import { User2Icon } from 'lucide-react';
import { useMetaTags } from 'react-metatags-hook';

import { useAuthLoggedIn } from '@/services/auth';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

const BREADCRUMB = (
  <Breadcrumb
    items={[
      {
        text: 'Dashboard',
        url: '/dashboard',
      },
      {
        text: 'Profile',
        url: '/profile',
      },
    ]}
  />
);

export default function Header() {
  const { userProfile } = useAuthLoggedIn();
  const fullname = userProfile.fullname;
  const username = userProfile.username;
  const displayName = fullname || username;

  useMetaTags(
    {
      title: `Profile: ${displayName} | dPanel`,
    },
    [displayName],
  );

  return (
    <PageHeader
      heroIcon={User2Icon}
      headnote={BREADCRUMB}
      title={`Profile: ${displayName}`}
    />
  );
}
