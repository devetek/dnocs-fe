import { SchemaDomainParts } from '@/entities/domain/rules/schema';

import { useDevetekTranslations } from '@/services/i18n';
import { useSidepanelEmit } from '@/services/sidepanel/model/event';
import { useToaster } from '@/services/toaster';

import { ApiDomain } from '@/shared/api';

import { useDomainRegistrationModel } from '../-model/general';
import { useSubscribe } from '../-model/events';

export default function useFormSubmissionUsecase() {
  const { form, props } = useDomainRegistrationModel();
  const [openToaster] = useToaster();
  const sidepanelEmit = useSidepanelEmit();
  const t = useDevetekTranslations('sidepanel.domainRegistration.toaster');

  const handleSubmit = form.handleSubmit(async (values) => {
    const { domain, description, provider, apiToken, zoneId } = values;

    const resolvedZoneId =
      provider === SchemaDomainParts.ProviderIdent.digitalOcean
        ? domain
        : zoneId!;

    const response = await ApiDomain.Create.doPost({
      domain,
      description,
      provider,
      credential: {
        api_token: apiToken,
        zone_id: resolvedZoneId,
      },
    });

    if (response.$status === 'failed') {
      openToaster({
        variant: 'error',
        title: t('error'),
        message: response.error.message,
      });
      return;
    }

    openToaster({
      variant: 'success',
      message: t('success'),
    });

    props.onSuccess();
    sidepanelEmit('%%sidepanel/close', null);
  });

  useSubscribe('#domain-registration-sidepanel/form-submit', () =>
    handleSubmit(),
  );
}
