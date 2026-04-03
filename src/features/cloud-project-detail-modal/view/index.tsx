import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { CpdProvider } from '../model';
import type { CloudProjectDetailModalProps as Props } from '../model/types';

import { AvailableRegions } from './AvailableRegions';

export default function CloudProjectCreateModal(props: Props) {
  const { cloudProjectName } = props;

  return (
    <CpdProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title
          canClickClose
          title={`Cloud Account: ${cloudProjectName}`}
          description="Browse available regions and VPC networks for this connected account."
        />

        <ModalLayoutGeneral.Content>
          <AvailableRegions />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </CpdProvider>
  );
}
