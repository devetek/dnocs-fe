import { CircleDashedIcon } from 'lucide-react';
import { useMetaTags } from 'react-metatags-hook';

import { useDevetekTranslations } from '@/services/i18n';

import { getBundleIcon, getSourceBadge } from '@/entities/application/ui/lib';
import { OS_SERVICE_STATE_METADATA } from '@/entities/os-service/ui/constants/state-metadata';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { cn } from '@/shared/libs/tailwind/cn';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { IconServer } from '@/shared/presentation/icons';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import FramedImageWithBadge from '@/shared/presentation/molecules/FramedImageWithBadge';
import {
  PageHeader,
  PageHeaderShimmer,
} from '@/shared/presentation/organisms/PageHeader';
import type { PageHeaderStatuses } from '@/shared/presentation/organisms/PageHeader/types';

import { useAppDataModel } from '../../-model/app-data';
import { useArtifactHistoryModel } from '../../-model/artifact-history';

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

const useServerAvailability = (): PageHeaderStatuses[number] | null => {
  const t = useDevetekTranslations('page.applicationDetail.header');

  const [deploymentTargets] = useAppDetail((s) => [s.deploymentTargets]);

  const [setSelectedServerId, selectedServerId] = useAppDataModel((s) => [
    s.setSelectedServerId,
    s.selectedServerId,
  ]);

  const [deploymentHistory, lastDeployment] = useArtifactHistoryModel((s) => [
    s.deploymentHistory,
    s.lastDeployment,
  ]);

  if (lastDeployment) {
    if (deploymentTargets.length > 1) {
      return {
        kind: 'dropdown',
        icon: IconServer,
        text: lastDeployment.serverSnapshot.hostName,
        dropdownItems: deploymentTargets.map((deployment) => {
          const { id: serverId, hostname: serverHostname } = deployment;

          return {
            label: <>{serverHostname}</>,
            isActive: lastDeployment.pointerIds.machine === serverId,
            onClick: () => {
              setSelectedServerId(serverId);
            },
          };
        }),
      };
    }

    if (deploymentTargets.length > 0) {
      return {
        kind: 'status',
        icon: IconServer,
        text: lastDeployment.serverSnapshot.hostName,
      };
    }
  }

  if (
    !selectedServerId &&
    !lastDeployment &&
    deploymentHistory.$status === 'initial'
  ) {
    return {
      kind: 'status',
      icon: (props) => (
        <IconServer {...props} className={cn(props.className, 'opacity-50')} />
      ),
      text: (
        <span className="text-primary/50 italic">{t('noDeployments')}</span>
      ),
    };
  }

  return {
    kind: 'status',
    icon: IconServer,
    text: <span className="block h-5 w-20 rounded bg-black/5 animate-pulse" />,
  };
};

const useServiceStatus = (): PageHeaderStatuses[number] => {
  const [selectedServerId] = useAppDataModel((s) => [s.selectedServerId]);
  const [lastDeployment, deploymentHistory] = useArtifactHistoryModel((s) => [
    s.lastDeployment,
    s.deploymentHistory,
  ]);

  const t = useDevetekTranslations();

  if (lastDeployment?.osService != null) {
    const { icon, i18n } =
      OS_SERVICE_STATE_METADATA[lastDeployment.osService.serviceState];

    return {
      kind: 'status',
      icon,
      text: `${t('common.terms.service')}: ${t(i18n.statusLabel)}`,
    };
  }

  if (
    (deploymentHistory.$status === 'loading' && !deploymentHistory.prevData) ||
    (deploymentHistory.$status === 'initial' && selectedServerId)
  ) {
    return {
      kind: 'status',
      icon: Spinner,
      text: (
        <span className="block h-5 w-30 rounded bg-black/5 animate-pulse" />
      ),
    };
  }

  return {
    kind: 'status',
    icon: CircleDashedIcon,
    text: `${t('common.terms.service')}: ${t('common.terms.unavailable')}`,
  };
};

const useHeaderStatus = (): PageHeaderStatuses => {
  const serverAvailability = useServerAvailability();
  const serviceStatus = useServiceStatus();

  const statuses: PageHeaderStatuses = [];

  if (serverAvailability) {
    statuses.push(serverAvailability);
  }

  if (statuses.length > 0) {
    statuses.push({ kind: 'separator' });
  }

  statuses.push(serviceStatus);

  return statuses;
};

export default guard(function Header() {
  const headerStatus = useHeaderStatus();

  return (
    <PageHeader
      headnote={<HeaderBreadcrumb />}
      title={<AppTitle />}
      heroIcon={HeroIcon}
      statuses={headerStatus}
    />
  );
});
