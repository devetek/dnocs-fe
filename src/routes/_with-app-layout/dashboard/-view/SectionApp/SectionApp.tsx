import { useAuthLoggedIn } from '@/services/auth/usecase';
import { useDevetekTranslations } from '@/services/i18n';

import { ApiApplication } from '@/shared/api';
import IconWordpress from '@/shared/assets/ico-wordpress.png';
import { excludeNully } from '@/shared/libs/browser/typeguards';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import mapAppCardStatus from '../../-lib/mapAppCardStatus';
import { AddCard, AppCard, SectionWrapper } from '../../-presentation';

export default function SectionApp() {
  const userId = useAuthLoggedIn().userProfile.id;
  const t = useDevetekTranslations();

  const [response, refresh] = ApiApplication.Find.useGet({
    userId,
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
      window.location.assign('/hosting/wordpress');
    };

    elAppList = (
      <FlexGrid gridItemsMax={5}>
        <AddCard onClick={handleClickAddApplication} />

        {...collectedMachineEls}
      </FlexGrid>
    );
  }

  return (
    <SectionWrapper sectionTitle={t('common.terms.applications').toUpperCase()}>
      {elAppList}
    </SectionWrapper>
  );
}
