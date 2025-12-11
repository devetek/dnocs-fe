import { useNavigate } from '@tanstack/react-router';

import { useDevetekTranslations } from '@/services/i18n';

import { BaseResponseError } from '@/shared/libs/api-client/lib/error';
import CoverIfError from '@/shared/presentation/atoms/CoverIfError';
import { FailedState } from '@/widgets/failed-state';
import { FallbackState } from '@/widgets/fallback-state';

import { useAppDataModel } from '../-model/app-data';
import { useEmit } from '../-model/events';

export default function ApplicationsDetailGuard({ children = <></> }) {
  const navigate = useNavigate();
  const emit = useEmit();

  const t = useDevetekTranslations();

  const [appDetail] = useAppDataModel((s) => [s.appDetail]);

  return (
    <CoverIfError
      response={appDetail}
      renderOnError={(payload) => {
        if (
          payload.kind === 'api' &&
          payload.error instanceof BaseResponseError &&
          payload.error.code === 401
        ) {
          return (
            <FallbackState.Unauthorized
              withCard
              ctaLabel={t('common.actions.backToDashboard')}
              ctaOnClick={() => {
                navigate({
                  replace: true,
                  to: '/dashboard',
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
              emit('@applications::detail/app-detail-refresh', null);
            }}
          />
        );
      }}
    >
      {children}
    </CoverIfError>
  );
}
