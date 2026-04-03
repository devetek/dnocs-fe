import { useNavigate } from '@tanstack/react-router';

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekTranslations } from '@/services/i18n';

import { ApiServer } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { AddCard, MachineCard, SectionWrapper } from '../../-presentation';

export default function SectionMachine() {
  const userId = useAuthLoggedIn().userProfile.id;
  const t = useDevetekTranslations();

  const navigate = useNavigate();

  const [response, getServerFind] = ApiServer.Find.useGet({
    userId,
    filter: 'shared-with-me',
  });

  let elMachineList = (
    <div className="h-20 flex items-center justify-center">
      <Spinner />
    </div>
  );

  if (response.$status === 'failed') {
    const handleClickRefresh = () => {
      getServerFind();
    };

    elMachineList = (
      <FailedState.WallCentered
        errorPayload={response.error.message}
        ctaText="Refresh"
        ctaOnClick={handleClickRefresh}
      />
    );
  }

  if (response.$status === 'success') {
    const machines = response.machines ?? [];
    const elCollectedMachines = machines
      .map((machine) => {
        const { id, address: publicIP, hostname: hostName } = machine;
        if (!id || !publicIP || !hostName) return null;

        const handleClickDetails = () => {
          navigate({
            to: `/servers/${id}`,
          });
        };

        return (
          <MachineCard
            key={id}
            serverName={hostName}
            serverHostAddress={publicIP}
            onClickDetails={handleClickDetails}
          />
        );
      })
      .filter(excludeNully);

    const handleClickAddResource = () => {
      navigate({
        to: '/servers/create',
      });
    };

    elMachineList = (
      <FlexGrid gridItemsMax={5}>
        <AddCard onClick={handleClickAddResource} />

        {elCollectedMachines}
      </FlexGrid>
    );

    return (
      <SectionWrapper
        sectionTitle={t('common.terms.machines')}
        count={machines.length}
      >
        {elMachineList}
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper sectionTitle={t('common.terms.machines')}>
      {elMachineList}
    </SectionWrapper>
  );
}
