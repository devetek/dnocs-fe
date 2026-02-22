import { useDevetekTranslations } from '@/services/i18n';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import {
  LbDetailsModelProvider,
  useLbDetailsModel,
} from '../models/lb-details';
import type { LoadBalancerDetailsSidepanelProps as SidepanelProps } from '../rules/types';

import AccessActivity from './AccessActivity';
// import HighLevelInfo from './HighLevelInfo';
import RouteRules from './RouteRules';

const Controller = () => {
  return null;
};

const SidepanelTitle = () => {
  const t = useDevetekTranslations();

  const [details] = useLbDetailsModel((s) => [s.details]);

  return (
    <Layout.Title
      title={t('sidepanel.loadBalancerDetails.title')}
      subtitle={details.$status === 'success' ? details.domain.fqdn : undefined}
      subtitleLoading={
        details.$status === 'initial' || details.$status === 'loading'
      }
      hasCloseButton
    />
  );
};

export default function ApplicationEditSidepanel(props: SidepanelProps) {
  return (
    <LbDetailsModelProvider {...props}>
      <Controller />

      <Layout classNameFrame="w-[calc(100svw_-_16px)] max-w-[420px]">
        <SidepanelTitle />

        <Layout.Content className="grid grid-rows-[auto_1fr] gap-y-6 pb-4">
          {/* <HighLevelInfo /> */}
          <RouteRules />
          <AccessActivity />
        </Layout.Content>
      </Layout>
    </LbDetailsModelProvider>
  );
}
