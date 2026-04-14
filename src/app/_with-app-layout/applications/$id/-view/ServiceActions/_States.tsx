import { useDevetekTranslations } from '@/services/i18n';

import Shimmer from '@/shared/presentation/atoms/Shimmer';

import { ServiceActionsLayout as Layout } from './_presentation/Layout';

function Loading() {
  return (
    <Layout.Frame>
      <Shimmer className="h-10 w-full" />
      <Shimmer className="h-10 w-full" />
      <Shimmer className="h-10 w-full" />
    </Layout.Frame>
  );
}

function Unavailable() {
  const t = useDevetekTranslations();

  return (
    <Layout.Frame freeform>
      <p className="text-sm italic text-primary/50">
        {t('page.applicationDetail.serviceActions.unavailablePlaceholder')}
      </p>
    </Layout.Frame>
  );
}

export const ServiceActionsStates = {
  Loading,
  Unavailable,
};
