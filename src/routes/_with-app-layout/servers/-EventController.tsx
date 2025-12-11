import { useEmit, useSubscribe } from './-model/events';
import useMachineDeleteUsecase from './-usecase/machine-delete';
import useMachineReinstallUsecase from './-usecase/machine-reinstall';
import useServerClaimToOrgUsecase from './-usecase/server-claim-to-org';
import useServerEditSidepanelUsecase from './-usecase/server-edit-sidepanel';
import useServerStatusInfoDialogUsecase from './-usecase/server-status-info-dialog';

export default function EventController() {
  const emit = useEmit();

  const handleDefaultSuccess = () => {
    emit('@resources::servers/servers-refresh', null);
  };

  const [handleServerClaimToOrg] = useServerClaimToOrgUsecase({
    onSuccess: handleDefaultSuccess,
  });

  useSubscribe(
    '@resources::servers/server-claim-to-org',
    handleServerClaimToOrg,
  );

  const [handleMachineReinstall] = useMachineReinstallUsecase({
    onSuccess: handleDefaultSuccess,
  });

  useSubscribe('@resources::servers/machine-reinstall', handleMachineReinstall);

  const [handleMachineDelete] = useMachineDeleteUsecase({
    onSuccess: handleDefaultSuccess,
  });

  useSubscribe('@resources::servers/machine-delete', handleMachineDelete);

  const [handleServerStatusInfoDialog] = useServerStatusInfoDialogUsecase();

  useSubscribe(
    '@resources::servers/server-status-info-dialog',
    handleServerStatusInfoDialog,
  );

  const [handleServerEditSidepanel] = useServerEditSidepanelUsecase({
    onSuccess: handleDefaultSuccess,
  });

  useSubscribe(
    '@resources::servers/server-edit-sidepanel',
    handleServerEditSidepanel,
  );

  return null;
}
