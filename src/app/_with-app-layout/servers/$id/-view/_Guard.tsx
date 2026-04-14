import type { ReactNode } from 'react';

import { useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';

import { useDevetekTranslations } from '@/services/i18n';

import { BaseResponseError } from '@/shared/libs/api-client/lib/error';
import CoverIfError from '@/shared/presentation/atoms/CoverIfError';
import { FailedState } from '@/widgets/failed-state';
import { FallbackState } from '@/widgets/fallback-state';

import { useEmit } from '../-model/events';
import { useServerDataModel } from '../-model/server-data';

interface ServerDetailGuardProps {
  children: ReactNode;
}

export default function ServerDetailGuard(props: ServerDetailGuardProps) {
  const { children } = props;

  const navigate = useNavigate();
  const emit = useEmit();

  const t = useDevetekTranslations();

  const [detail] = useServerDataModel((s) => [s.detail]);

  return (
    <CoverIfError
      response={detail}
      renderOnError={(payload) => {
        const isUnauthorized =
          payload.kind === 'api' &&
          ((payload.error instanceof BaseResponseError &&
            payload.error.code === 401) ||
            (isAxiosError(payload.error) && payload.error.status === 401));

        if (isUnauthorized) {
          return (
            <FallbackState.Unauthorized
              withCard
              ctaLabel={t('common.actions.backToDashboard')}
              ctaOnClick={() => {
                navigate({
                  to: '/dashboard',
                  replace: true,
                });
              }}
            />
          );
        }

        return (
          <FailedState.WallCentered.Retryable
            withCard
            errorPayload={payload.error.message}
            onClickRetry={() => {
              emit('@servers::detail/server-detail-refresh', null);
            }}
          />
        );
      }}
    >
      {children}
    </CoverIfError>
  );
}
