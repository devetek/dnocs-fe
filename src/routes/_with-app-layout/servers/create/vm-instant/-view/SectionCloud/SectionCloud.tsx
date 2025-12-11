import { CloudIcon } from 'lucide-react';
import { useController } from 'react-hook-form';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiCloud, ApiSecret } from '@/shared/api';
import LogoIDCloudHost from '@/shared/assets/ico-idcloudhost.svg';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { ToggleHero } from '../../-presentation/ToggleHero';
import { Sectioned } from '../../../-presentation/Sectioned';

const SubCloudProviderCbo = () => {
  return (
    <>
      <ToggleHero
        checked
        icon={({ className }) => (
          <img className={className} src={LogoIDCloudHost} alt="Logo" />
        )}
        title="IDCloudHost"
      />
    </>
  );
};

const SubCloudProjectCbo = () => {
  const userId = useAuthLoggedIn().userProfile.id;

  const { form, formErrors } = useForm();

  const [response] = ApiCloud.Project.Find.useGet({ userId });

  const control = useController({
    control: form.control,
    name: 'cloud.projectID',
  });

  if (response.$status === 'loading') {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (response.$status !== 'success') {
    return (
      <div className="h-10 flex items-center">
        <em className="text-red-500/70">
          Failed to get cloud projects, please refresh the page.
        </em>
      </div>
    );
  }

  const items: Array<{ label: string; value: number }> = [];

  for (const cloudProject of response.clouds) {
    if (!cloudProject.name || !cloudProject.id) continue;

    items.push({
      label: cloudProject.name,
      value: cloudProject.id,
    });
  }

  return (
    <>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a cloud project"
        onChange={(value) => {
          form.resetField('regionSlug');
          form.resetField('vpcBulk');
          control.field.onChange(value);
        }}
        value={control.field.value}
        items={items}
      />

      <ErrorInline message={formErrors.cloud?.projectID?.message} />
    </>
  );
};

const SubCloudSshCbo = () => {
  const userId = useAuthLoggedIn().userProfile.id;

  const { form, formErrors } = useForm();

  const [response] = ApiSecret.SshKey.Find.useGet({ userId });

  const control = useController({
    control: form.control,
    name: 'cloud.sshKeyID',
  });

  if (response.$status === 'loading') {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (response.$status !== 'success') {
    return (
      <div className="h-10 flex items-center">
        <em className="text-red-500/70">
          Failed to get SSH Keys, please refresh the page.
        </em>
      </div>
    );
  }

  const items: Array<{ label: string; value: number }> = [];

  for (const secret of response.secrets || []) {
    if (!secret.name || !secret.id) continue;

    items.push({
      label: secret.name,
      value: secret.id,
    });
  }

  return (
    <>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a SSH Key"
        onChange={control.field.onChange}
        value={control.field.value}
        items={items}
      />

      <ErrorInline message={formErrors.cloud?.sshKeyID?.message} />
    </>
  );
};

export default function SectionCloud() {
  return (
    <Sectioned
      withinCard
      sectionIcon={CloudIcon}
      sectionTitle="Cloud Information"
      sectionDescription="Set up your cloud environment by selecting a provider and linking the necessary resources."
    >
      <h6 className="text-sm font-bold">Provider</h6>
      <SubCloudProviderCbo />

      <h6 className="mt-4 text-sm font-bold">Project</h6>
      <SubCloudProjectCbo />

      <h6 className="mt-4 text-sm font-bold">SSH Key</h6>
      <SubCloudSshCbo />
    </Sectioned>
  );
}
