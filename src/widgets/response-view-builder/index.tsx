import SpinnerOverlay from '@/shared/presentation/atoms/SpinnerOverlay';

import type { BuildResponseViewParams } from './types';

export function buildResponseView<Data>(params: BuildResponseViewParams<Data>) {
  const {
    useResponse,
    render: Render,
    fallbackError: FallbackError,
    fallbackLoading: FallbackLoading,
  } = params;

  return () => {
    const response = useResponse();

    if (
      response.$status === 'failed' ||
      (response.$status === 'loading' && response.prevError != null)
    ) {
      const errorPayload =
        response.$status === 'failed'
          ? response.error
          : response.prevError!.error;

      return <FallbackError error={errorPayload} />;
    }

    if (
      response.$status === 'success' ||
      (response.$status === 'loading' && response.prevData != null)
    ) {
      const data =
        response.$status === 'success' ? response : response.prevData!;

      const responseStatus =
        response.$status === 'success' ? 'success' : 'refetching';

      return (
        <SpinnerOverlay loading={responseStatus === 'refetching'}>
          <Render {...data} $status={responseStatus} />
        </SpinnerOverlay>
      );
    }

    return <FallbackLoading />;
  };
}
