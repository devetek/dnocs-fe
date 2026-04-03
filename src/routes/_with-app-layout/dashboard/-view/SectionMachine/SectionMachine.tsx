import { CirclePlusIcon } from 'lucide-react';

import { useNavigate } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import { ApiServer } from '@/shared/api';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { MachineCard, SectionWrapper } from '../../-presentation';

export default function SectionMachine() {
  const t = useDevetekTranslations();

  const navigate = useNavigate();

  const [response, getServerFind] = ApiServer.Find.useGet({});

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
      <Card className="rounded-2xl overflow-hidden divide-y divide-border/50 p-0">
        {elCollectedMachines}

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3 h-auto rounded-none text-primary/50 hover:text-primary"
          onClick={handleClickAddResource}
        >
          <div className="w-9 h-9 rounded-xl border-2 border-dashed border-border flex items-center justify-center shrink-0">
            <CirclePlusIcon className="w-4 h-4" />
          </div>
          <span className="text-sm">{t('common.actions.addMore')}</span>
        </Button>
      </Card>
    );

    return (
      <SectionWrapper
        sectionTitle={t('common.terms.machines')}
        count={machines.length}
        viewAllTo="/servers"
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

