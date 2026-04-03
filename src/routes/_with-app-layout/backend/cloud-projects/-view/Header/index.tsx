import { CloudIcon } from 'lucide-react';

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
      heroIcon={CloudIcon}
      headnote={<Headnote />}
      title="Cloud Accounts"
      description="Connect your cloud provider account to dNocs so you can create and manage resources — like virtual machines and networks — directly from here, without opening each provider's dashboard separately."
      footnote={
        <>
          Supported providers: <strong>IDCloudHost</strong>,{' '}
          <strong>Google Cloud Platform</strong>, and{' '}
          <strong>Proxmox VE</strong>. More providers coming soon.
          Visit our{' '}
          <a className="underline" href="//www.youtube.com/@dpanel_id">
            YouTube channel
          </a>{' '}
          for a step-by-step tutorial.
        </>
      }
    />
  );
}
