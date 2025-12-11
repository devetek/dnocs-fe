import type { ReactNode } from 'react';

import { GlobeIcon } from 'lucide-react';
import { useController } from 'react-hook-form';

import { ApiCloud } from '@/shared/api';
// import useGetCloudRegions from '@/shared/api/cloud/regions/get-cloud-regions';
// import useGetCloudVPCs from '@/shared/api/cloud/vpcs/get-cloud-vpcs';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { Sectioned } from '../../../-presentation/Sectioned';

const SubRegionCbo = () => {
  const { form, formErrors } = useForm();
  const cloudProjectID: number | undefined = form.watch('cloud.projectID');

  const [response] = ApiCloud.Regions.$Id.useGet({
    cloudProjectId: String(cloudProjectID),
  });

  const control = useController({
    control: form.control,
    name: 'regionSlug',
  });

  if (response.$status === 'initial') {
    return (
      <div className="h-10 flex items-center">
        <em className="opacity-50">Please select cloud project first.</em>
      </div>
    );
  }

  if (response.$status === 'loading') {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (response.$status === 'failed') {
    return (
      <div className="h-10 flex items-center">
        <em className="text-red-500/70">
          Failed to get regions, please refresh the page.
        </em>
      </div>
    );
  }

  const items: Array<{ label: ReactNode; value: string }> = [];

  for (const region of response) {
    if (!region.display_name || !region.slug) continue;

    items.push({
      label: (
        <span>
          <span>{region.display_name}</span>&nbsp;
          <span className="opacity-50">({region.slug})</span>
        </span>
      ),
      value: region.slug,
    });
  }

  return (
    <>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a Region"
        onChange={(value) => {
          form.resetField('vpcBulk');
          control.field.onChange(value);
        }}
        value={control.field.value}
        items={items}
      />

      <ErrorInline message={formErrors.regionSlug?.message} />
    </>
  );
};

const SubVPCCbo = () => {
  const { form, formErrors } = useForm();

  const cloudProjectID: number | undefined = form.watch('cloud.projectID');
  const regionSlug: string | undefined = form.watch('regionSlug');

  const [response] = ApiCloud.Vpcs.$Id.useGet({
    cloudProjectId: String(cloudProjectID),
    regionSlug,
  });

  const control = useController({
    control: form.control,
    name: 'vpcBulk',
    rules: {
      required: 'Please select a VPC!',
    },
  });

  if (response.$status === 'initial') {
    return (
      <div className="h-10 flex items-center">
        <em className="opacity-50">
          Please select cloud project and region first.
        </em>
      </div>
    );
  }

  if (response.$status === 'loading') {
    return (
      <div className="w-10 h-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (response.$status === 'failed') {
    return (
      <div className="h-10 flex items-center">
        <em className="text-red-500/70">
          Failed to get VPCs, please refresh the page.
        </em>
      </div>
    );
  }

  const items: Array<{ label: ReactNode; value: string }> = [];

  for (const vpc of response) {
    if (!vpc.name || !vpc.subnet || !vpc.uuid) continue;

    items.push({
      label: (
        <span>
          <span>{vpc.name}</span>&nbsp;
          <span className="opacity-50">({vpc.subnet})</span>
        </span>
      ),
      value: `${vpc.subnet} ${vpc.uuid}`,
    });
  }

  const cboValue = control.field.value
    ? `${control.field.value.subnet} ${control.field.value.uuid}`
    : undefined;

  return (
    <>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a VPC"
        onChange={(value) => {
          const [subnet, uuid] = value.split(' ');
          control.field.onChange({ subnet, uuid });
        }}
        value={cboValue}
        items={items}
      />

      <ErrorInline message={formErrors.vpcBulk?.message} />
    </>
  );
};

export default function SectionRegionVPC() {
  return (
    <Sectioned
      withinCard
      sectionIcon={GlobeIcon}
      sectionTitle="Region Information"
      sectionDescription="Choose where your virtual machine will run by selecting a region and relevant settings from your cloud provider."
    >
      <h6 className="text-sm font-bold">Region</h6>
      <SubRegionCbo />

      <h6 className="mt-4 text-sm font-bold">VPC</h6>
      <SubVPCCbo />
    </Sectioned>
  );
}
