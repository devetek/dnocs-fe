'use client';

import { FilterIcon } from 'lucide-react';

import { useSelectMachineModal } from '@/features/select-machine-modal';

import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useFiltersContext } from '../../-model/filters';
import { useServerDetailContext } from '../../-model/server-detail';

import { SelectedMachine } from './_presentation/SelectedMachine';

const FilterSelectMachine = () => {
  const { serverID, setServerID } = useFiltersContext();
  const { serverDetail } = useServerDetailContext();

  const [openSelectMachineModal] = useSelectMachineModal();

  const handleClickSelectMachine = () => {
    openSelectMachineModal({
      onMachineSelected: setServerID,
    });
  };

  if (serverID == null) {
    return (
      <Button size="sm" onClick={handleClickSelectMachine}>
        Select Machine...
      </Button>
    );
  }

  if (serverDetail.$status !== 'success') {
    return <Spinner />;
  }

  const { id, host } = serverDetail;

  return (
    <SelectedMachine
      machineID={Number(id)}
      machineName={host.name}
      machinePublicAddress={host.address}
      onClickChange={handleClickSelectMachine}
    />
  );
};

export default function AsideFilters() {
  return (
    <Card className="rounded-2xl">
      <div className="border-b">
        <div className="px-3 py-2 flex items-center gap-2">
          <FilterIcon className="w-4 h-4" />

          <h2 className="text-lg font-bold text-primary">Filters</h2>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1">
        <FilterSelectMachine />
      </div>
    </Card>
  );
}
