import { useDevetekTranslations } from '@/services/i18n';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import {
  DomainDetailsModelProvider,
  useDomainDetailsModel,
} from '../models/domain-details';
import type { DomainDetailsSidepanelProps as SidepanelProps } from '../rules/types';
import useRecordDeleteUsecase from '../usecase/record-delete';

import Details from './Details';
import RecordsTable from './RecordsTable';

export default function DomainDetailSidepanelView(props: SidepanelProps) {
  return (
    <DomainDetailsModelProvider {...props}>
      <Controller />

      <Layout classNameFrame="w-[calc(100svw-16px)] max-w-[800px] overflow-hidden">
        <SidepanelTitle />

        <Layout.Content className="grid grid-rows-[minmax(0,auto)_minmax(0,1fr)] gap-y-6 pb-4">
          <Details />
          <RecordsTable />
        </Layout.Content>
      </Layout>
    </DomainDetailsModelProvider>
  );
}

function SidepanelTitle() {
  const t = useDevetekTranslations();

  const [domainId, details] = useDomainDetailsModel((s) => [
    s.domainId,
    s.details,
  ]);

  return (
    <Layout.Title
      title={t('sidepanel.domainDetails.title')}
      subtitle={
        details.$status === 'success'
          ? details.domain.hostname
          : `ID: ${domainId}`
      }
      subtitleLoading={
        details.$status === 'initial' || details.$status === 'loading'
      }
      hasCloseButton
    />
  );
}

function Controller() {
  useRecordDeleteUsecase();

  return null;
}
