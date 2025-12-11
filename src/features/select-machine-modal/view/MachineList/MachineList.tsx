import { useAuthLoggedIn } from '@/services/auth';
import { useModalEmit } from '@/services/modal/model/event';

import { ApiServer } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { MachineCard } from '../../presentation/MachineCard';
import type { SelectMachineModalProps as Props } from '../types';

export default function MachineList(props: Props) {
  const { onMachineSelected } = props;

  const emitModal = useModalEmit();

  const { userProfile } = useAuthLoggedIn();

  const [response] = ApiServer.Find.useGet({
    filter: 'shared-with-me',
    userId: userProfile.id,
  });

  if (response.$status === 'failed') {
    return <FailedState.WallCentered />;
  }

  if (response.$status !== 'success') {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-1 lg:gap-2 lg:flex-row lg:flex-wrap [&>button]:basis-[calc(50%_-_0.25rem)]">
      {(response.machines ?? []).map((machine) => {
        const { id, hostname, address } = machine;

        if (!id || !hostname || !address) return null;

        return (
          <MachineCard
            key={id}
            machineName={hostname}
            machinePublicIP={address}
            onClickSelect={() => {
              emitModal('%%modal/close', null);
              onMachineSelected(id);
            }}
          />
        );
      })}
    </div>
  );
}
