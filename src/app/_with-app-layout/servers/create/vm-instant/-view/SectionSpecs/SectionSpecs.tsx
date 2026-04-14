import { HardDriveIcon } from 'lucide-react';
import { useController, useWatch } from 'react-hook-form';

import { ApiCloud } from '@/shared/api';
import type { OsTemplateItem } from '@/shared/api/cloud.project.ostemplates.$id';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { OPTS_CPU_CORE, OPTS_DISK_GB, OPTS_RAM_GB } from '../../-config';
import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { Sectioned } from '../../../-presentation/Sectioned';

const SubOsTemplateCbo = () => {
  const { form, formErrors } = useForm();
  const cloudProjectID = useWatch({ control: form.control, name: 'cloud.projectID' }) as number | undefined;

  const [response] = ApiCloud.Project.Ostemplates.$Id.useGet({
    cloudProjectId: String(cloudProjectID),
    options: { skip: !cloudProjectID },
  });

  const control = useController({
    control: form.control,
    name: 'spec.osTemplate',
  });

  if (response.$status === 'initial') {
    return (
      <div className="h-10 flex items-center">
        <em className="opacity-50">Please select a cloud project first.</em>
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
        <em className="text-red-500/70">Failed to get OS templates, please refresh the page.</em>
      </div>
    );
  }

  const items: Array<{ label: string; value: string }> = [];

  const templateList = Array.isArray(response) ? (response as unknown as OsTemplateItem[]) : [];

  for (const template of templateList) {
    if (!template.id) continue;

    items.push({
      label: template.name || template.id,
      value: template.id,
    });
  }

  return (
    <>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select an OS Template"
        onChange={control.field.onChange}
        value={control.field.value}
        items={items}
      />
      <ErrorInline message={formErrors.spec?.osTemplate?.message} />
    </>
  );
};

export default function SectionSpecs() {
  const { form, formErrors } = useForm();

  const ctrlSpecCPUCore = useController({
    control: form.control,
    name: 'spec.cpuCore',
  });

  const ctrlSpecRAMSizeGB = useController({
    control: form.control,
    name: 'spec.ramSizeGB',
  });

  const ctrlSpecDiskSizeGB = useController({
    control: form.control,
    name: 'spec.diskSizeGB',
  });

  return (
    <Sectioned
      withinCard
      sectionIcon={HardDriveIcon}
      sectionTitle="Specification"
      sectionDescription="Define your system's specifications, including CPU, memory, and storage."
    >
      <h6 className="text-sm font-bold">OS Template</h6>
      <SubOsTemplateCbo />

      <h6 className="mt-4 text-sm font-bold">CPU Core Count</h6>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a Core count"
        onChange={ctrlSpecCPUCore.field.onChange}
        value={ctrlSpecCPUCore.field.value}
        items={OPTS_CPU_CORE}
      />
      <ErrorInline message={formErrors.spec?.cpuCore?.message} />

      <h6 className="mt-4 text-sm font-bold">RAM Size (in GB)</h6>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a RAM Size"
        onChange={ctrlSpecRAMSizeGB.field.onChange}
        value={ctrlSpecRAMSizeGB.field.value}
        items={OPTS_RAM_GB}
      />
      <ErrorInline message={formErrors.spec?.ramSizeGB?.message} />

      <h6 className="mt-4 text-sm font-bold">Disk Size (in GB)</h6>
      <Combobox
        classNameButton="bg-white w-full"
        placeholder="Select a Disk Size"
        onChange={ctrlSpecDiskSizeGB.field.onChange}
        value={ctrlSpecDiskSizeGB.field.value}
        items={OPTS_DISK_GB}
      />
      <ErrorInline message={formErrors.spec?.diskSizeGB?.message} />
    </Sectioned>
  );
}
