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
    let defaultUpstream = '';
    const {
      domain,
      description,
      engine,
      serverId,
      internalDomainMetadata,
      lbKind,
      features,
      l4rule,
      l7rules,
    } = values;

    const rules = iife(() => {
      if (lbKind === 'l7' && l7rules) {
        return l7rules.map((l7rule) => {
          const hasWildcard = /\/\*$/.test(l7rule.pathMatch);
          const pathMatch = iife(() => {
            if (l7rule.pathMatch === '/*') return '/';

            return hasWildcard
              ? l7rule.pathMatch.slice(0, -2)
              : l7rule.pathMatch;
          });
          if (pathMatch === '/') {
            defaultUpstream =
              `${l7rule.upstreamsIfProxyPass?.[0]?.address ?? 'localhost'}:${l7rule.upstreamsIfProxyPass?.[0]?.port ?? '80'}`;
          }

          return {
            wildcard: hasWildcard,
            pathMatch,
            type: 'proxy_pass',
            applicationId: l7rule.applicationIdIfProxyPassApp,
            upstreams: l7rule.upstreamsIfProxyPass?.map((u) => ({
              address: u.address,
              port: u.port.toString(),
            })),
          };
        });
      }

      if (lbKind === 'l4' && l4rule) {
        return [
          {
            type: 'proxy_pass',
            pathMatch: '/',
            upstreams: l4rule.upstreams.map((u) => ({
              address: u.address,
              port: u.port.toString(),
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
      internalDomainMetadata: internalDomainMetadata?.id
        ? internalDomainMetadata
        : undefined,
      lbKind,
      protocol: features.protocol ?? 'http',
      sslEnabled: features.sslEnabled,
      defaultUpstream,
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
