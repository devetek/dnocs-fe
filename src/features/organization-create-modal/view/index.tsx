import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';
import { useDevetekTranslations } from '@/services/i18n';

import { DcProvider } from '../model';
import type { OrganizationCreateModalProps as Props } from '../model/types';

import { Name } from './Name';
import { SubmitButton } from './SubmitButton';

export default function DbUserGrantModal(props: Props) {
  const t = useDevetekTranslations();

  return (
    <DcProvider {...props}>
      <ModalLayoutGeneral>
        <ModalLayoutGeneral.Title canClickClose title={t('modal.createTeam.title')} />

        <ModalLayoutGeneral.Content className="flex flex-col gap-6">
          <Name />
          <SubmitButton />
        </ModalLayoutGeneral.Content>
      </ModalLayoutGeneral>
    </DcProvider>
  );
}
