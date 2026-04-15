import { BuildingIcon, CalendarIcon, PencilIcon, RefreshCwIcon, UserIcon } from 'lucide-react';
import { useMetaTags } from 'react-metatags-hook';

import { useDevetekLocale, useDevetekTranslations } from '@/services/i18n';

import { getBundleIcon, getSourceBadge } from '@/entities/application/ui/lib';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { Button } from '@/shared/presentation/atoms/Button';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import FramedImageWithBadge from '@/shared/presentation/molecules/FramedImageWithBadge';
import {
  PageHeader,
  PageHeaderShimmer,
} from '@/shared/presentation/organisms/PageHeader';
import type { PageHeaderStatuses } from '@/shared/presentation/organisms/PageHeader/types';

import { useAppDataModel } from '../../-model/app-data';
import { useEmit } from '../../-model/events';

const FallbackLoading = () => (
  <PageHeaderShimmer hasHeadnote hasStatuses hasRightAppend />
);

const [guard, useAppDetail] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: FallbackLoading,
  fallbackError: FallbackLoading,
})(couple(useAppDataModel, (s) => s.appDetail));

const HeaderBreadcrumb = () => {
  const t = useDevetekTranslations();

  return (
    <Breadcrumb
      items={[
        {
          text: t('sidebar.dashboard'),
          url: '/dashboard',
        },
        {
          text: t('page.applications.headerTitle'),
          url: '/applications',
        },
      ]}
    />
  );
};

const AppTitle = () => {
  const [appName] = useAppDetail((s) => [s.identity.name]);

  useMetaTags(
    {
      title: `${appName} | dPanel`,
    },
    [appName],
  );

  return appName;
};

const HeroIcon = () => {
  const [appIdentity] = useAppDetail((s) => [s.identity]);

  return (
    <FramedImageWithBadge
      image={getBundleIcon(appIdentity.bundleType)}
      badge={getSourceBadge(appIdentity)}
      sizeUnit={14}
    />
  );
};

const useHeaderStatus = (): PageHeaderStatuses => {
  const [ownership] = useAppDetail((s) => [s.ownership]);

  const statuses: PageHeaderStatuses = [];

  if (ownership.owner) {
    statuses.push({
      kind: 'status',
      icon: UserIcon,
      text: ownership.owner,
    });
  }

  if (ownership.team) {
    statuses.push({
      kind: 'status',
      icon: BuildingIcon,
      text: ownership.team,
    });
  }

  return statuses;
};

const HeaderFootnote = () => {
  const locale = useDevetekLocale();
  const t = useDevetekTranslations();
  const [timestamp] = useAppDetail((s) => [s.timestamp]);

  return (
    <div className="flex items-center gap-x-3 flex-wrap">
      <span className="flex items-center gap-1">
        <CalendarIcon className="size-3" />
        {`${t('common.terms.createdAt')} ${getDistanceFromNow(timestamp.created, locale)}`}
      </span>
      <span className="flex items-center gap-1">
        <CalendarIcon className="size-3" />
        {`${t('common.terms.lastUpdated')} ${getDistanceFromNow(timestamp.updated, locale)}`}
      </span>
    </div>
  );
};

const RefreshButton = () => {
  const emit = useEmit();

  const handleRefresh = () => {
    emit('@applications::detail/app-detail-refresh', null);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleRefresh}>
      <RefreshCwIcon />
    </Button>
  );
};

const EditButton = () => {
  const emit = useEmit();
  const [appId, appName, appIdentity, appConfigDefs] = useAppDetail((s) => [
    s.id,
    s.identity.name,
    s.identity,
    s.configDefs,
  ]);
  const appData = useAppDataModel();

  const handleEdit = () => {
    if (appIdentity.source !== 'repository') return;

    emit('@applications::detail/application-edit', {
      applicationId: appId,
      applicationName: appName,
      repoName: appIdentity.repoName ?? '',
      repoOrganization: appIdentity.repoOrganization ?? '',
      rawAppDefinition: appData.rawAppDefinition,
      workdir: appData.rawWorkdir,
      port: appData.rawAppDefinition?.run.port,
      autoDeploy: {
        fromBranch: appConfigDefs.cicd.autoDeploy.enabled
          ? appConfigDefs.cicd.autoDeploy.fromBranch
          : undefined,
        isEnabled: appConfigDefs.cicd.autoDeploy.enabled,
      },
    });
  };

  if (appIdentity.source !== 'repository') return null;

  return (
    <Button variant="outline" size="sm" onClick={handleEdit}>
      <PencilIcon />
      Edit
    </Button>
  );
};

export default guard(function Header() {
  const headerStatus = useHeaderStatus();

  return (
    <PageHeader
      headnote={<HeaderBreadcrumb />}
      title={<AppTitle />}
      heroIcon={HeroIcon}
      statuses={headerStatus}
      footnote={<HeaderFootnote />}
      footnoteAs="div"
      rightAppend={
        <div className="flex items-center gap-2">
          <RefreshButton />
          <EditButton />
        </div>
      }
    />
  );
});
