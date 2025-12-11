'use client';

import { EyeIcon, Package2Icon, Wallet2Icon } from 'lucide-react';
import { useMetaTags } from 'react-metatags-hook';

import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { usePackageDetailContext } from '../../-model/package-detail';

const BREADCRUMB = (
  <Breadcrumb
    items={[
      {
        text: 'Pamong',
      },
      {
        text: 'Package',
        url: '/pawon/package',
      },
    ]}
  />
);

export default function Header() {
  const { packageDetail } = usePackageDetailContext();
  const { name, price, currency, is_public } = packageDetail;

  useMetaTags(
    {
      title: `Package: ${name} | dPanel`,
    },
    [name],
  );

  return (
    <PageHeader
      heroIcon={Package2Icon}
      headnote={BREADCRUMB}
      title={`Package: ${name}`}
      statuses={[
        {
          kind: 'status',
          icon: Wallet2Icon,
          text: `${currency?.toUpperCase()} ${price}`,
        },
        {
          kind: 'status',
          icon: EyeIcon,
          text: `Access: ${is_public ? 'Public' : 'Private'}`,
        },
      ]}
    />
  );
}
