import { useDevetekTranslations } from '@/services/i18n';
import { useSidepanelEmit } from '@/services/sidepanel/model/event';
import { useToaster } from '@/services/toaster';

import { ApiLoadBalancer } from '@/shared/api';
import { iife } from '@/shared/libs/browser/fn';

import { useEmit, useSubscribe } from '../-model/events';
import { useLbCreationForm } from '../-model/form';

export default function useFormSubmissionUsecase() {
  const form = useLbCreationForm();
  const [openToaster] = useToaster();
  const sidepanelEmit = useSidepanelEmit();
  const emit = useEmit();
  const t = useDevetekTranslations('toaster.loadBalancerCreate');

  const handleSubmit = form.handleSubmit(async (values) => {
    const {
      domain,
      description,
      engine,
      serverId,
      lbKind,
      features,
      l4rule,
      l7rules,
    } = values;

    const rules = iife(() => {
      if (lbKind === 'l7' && l7rules) {
        return l7rules.map((l7rule) => {
          const hasWildcard = /\/\*$/.test(l7rule.pathMatch);
          const pathMatch = hasWildcard
            ? l7rule.pathMatch.slice(0, -2)
            : l7rule.pathMatch;

          return {
            wildcard: hasWildcard,
            pathMatch,
            type: 'proxy-pass',
            applicationId: l7rule.applicationIdIfProxyPassApp,
            upstreams: l7rule.upstreamsIfProxyPass?.map((u) => ({
              address: u.address,
              port: u.port,
            })),
          };
        });
      }

      if (lbKind === 'l4' && l4rule) {
        return [
          {
            type: 'proxy-pass',
            pathMatch: '/',
            upstreams: l4rule.upstreams.map((u) => ({
              address: u.address,
              port: u.port,
            })),
          },
        ];
      }

      return undefined;
    });

    const response = await ApiLoadBalancer.Create.doPost({
      domain,
      name: description,
      engine,
      serverId,
      lbKind,
      protocol: features.protocol ?? 'http',
      sslEnabled: features.sslEnabled,
      rules,
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

    emit('#load-balancer-creation-sidepanel/on-success');
    sidepanelEmit('%%sidepanel/close', null);
  });

  useSubscribe('#load-balancer-creation-sidepanel/form-submit', () =>
    handleSubmit(),
  );
}
