import { CirclePlusIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { ApiApplication } from '@/shared/api';
import IconWordpress from '@/shared/assets/ico-wordpress.png';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import mapAppCardStatus from '../../-lib/mapAppCardStatus';
import { AppCard, SectionWrapper } from '../../-presentation';

export default function SectionApp() {
  const t = useDevetekTranslations();

  const [response, refresh] = ApiApplication.Find.useGet({
    page: 1,
  });

  let elAppList = (
    <div className="h-20 flex items-center justify-center">
      <Spinner />
    </div>
  );

  if (response.$status === 'failed') {
    const handleClickRefresh = () => {
      refresh();
    };

    elAppList = (
      <FailedState.WallCentered
        errorPayload={response.error.message}
        ctaText="Refresh"
        ctaOnClick={handleClickRefresh}
      />
    );
  }

  if (response.$status === 'success') {
    const collectedMachineEls = (response.applications ?? [])
      .map((app) => {
        const { id, name, domain: urlDomain, deploys } = app;
        if (!id || !name || !urlDomain) return null;

        const { machine } = deploys?.[0] ?? {};

        const { hostname } = machine ?? {};

        const { statusState, statusMessage } = mapAppCardStatus(app);

        const handleClickDetails = () => {
          window.location.assign(`/application/${id}`);
        };

        const handleClickAppURL = () => {
          window.location.assign(`//${urlDomain}`);
        };

        return (
          <AppCard
            key={id}
            appName={name}
            appURL={urlDomain}
            appIconURL={IconWordpress}
            machineName={hostname}
            statusState={statusState}
            statusMessage={statusMessage}
            onClickDetails={handleClickDetails}
            onClickAppURL={handleClickAppURL}
          />
        );
      })
      .filter(excludeNully);

    const handleClickAddApplication = () => {
      window.location.assign('/applications/create');
    };

    const appCount = collectedMachineEls.length;

    elAppList = (
      <Card className="rounded-2xl overflow-hidden divide-y divide-border/50 p-0">
        {collectedMachineEls}

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3 h-auto rounded-none text-primary/50 hover:text-primary"
          onClick={handleClickAddApplication}
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
        sectionTitle={t('common.terms.applications')}
        count={appCount}
        viewAllHref="/applications"
      >
        {elAppList}
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper sectionTitle={t('common.terms.applications')}>
      {elAppList}
    </SectionWrapper>
  );
}

