import { HardDriveIcon } from 'lucide-react';
import { useController } from 'react-hook-form';

import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { OPTS_CPU_CORE, OPTS_DISK_GB, OPTS_RAM_GB } from '../../-config';
import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { Sectioned } from '../../../-presentation/Sectioned';

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
      <h6 className="text-sm font-bold">CPU Core Count</h6>
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
