import { PlusCircleIcon, UsersIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useEmit } from '../../-model/events';

const Headnote = () => {
  return (
    <span className="flex items-center justify-between">
      <Breadcrumb
        items={[
          {
            text: 'Dashboard',
            url: '/dashboard',
          },
        ]}
      />
    </span>
  );
};

export default function Header() {
  const emit = useEmit();

  return (
    <PageHeader
      heroIcon={UsersIcon}
      headnote={<Headnote />}
      title="Teams"
      description="Create a team to organize resources and applications"
      rightAppend={
        <Button
          buttonStyle="outline"
          buttonColor="secondary"
          onClick={() => emit('@teams/add-new', undefined)}
        >
          <PlusCircleIcon /> Add Team
        </Button>
      }
    />
  );
}
