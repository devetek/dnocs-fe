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
  return [];
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
