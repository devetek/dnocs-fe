import { ExternalLinkIcon, MailIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';
import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { REPORT_CONTACT_EMAIL } from '@/widgets/failed-state/config';

export default function ForgotPasswordModal() {
  const t = useDevetekTranslations();

  return (
    <ModalLayoutGeneral maxWidth="360px">
      <ModalLayoutGeneral.Title
        canClickClose
        title={t('dialog.forgotPassword.title')}
      />

      <ModalLayoutGeneral.Content className="flex flex-col">
        {t('dialog.forgotPassword.message')}

        <p className="mt-1 flex items-center gap-x-1">
          <MailIcon className="size-4" />

          <a
            className="cursor-pointer hover:underline inline-flex items-center gap-1"
            href={`mailto: ${REPORT_CONTACT_EMAIL}`}
          >
            {REPORT_CONTACT_EMAIL}

            <ExternalLinkIcon className="size-3" />
          </a>
        </p>
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}
