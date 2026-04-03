import { KeyRoundIcon } from 'lucide-react';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

const Headnote = () => {
  return (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          {
            text: 'Dashboard',
            url: '/dashboard',
          },
          {
            text: 'Backend',
          },
        ]}
      />
    </span>
  );
};

export default function Header() {
  return (
    <PageHeader
      heroIcon={KeyRoundIcon}
      headnote={<Headnote />}
      title="SSH Keys"
      description="Manage your SSH keys to securely access virtual machines. Add a key once and reuse it across any server without re-entering credentials every time."
    />
  );
}
