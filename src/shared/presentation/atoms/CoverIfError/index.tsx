import type { ReactNode } from 'react';

import type { Response } from '@/shared/libs/api-client/rules/types';

interface CoverIfErrorProps {
  children: ReactNode;
  response: Response<unknown>;
  renderOnError: (
    payload: Extract<Response<unknown>, { $status: 'failed' }>,
  ) => ReactNode;
}

export default function CoverIfError(props: CoverIfErrorProps) {
  const { children, renderOnError, response } = props;

  if (response.$status !== 'failed') {
    return children;
  }

  return (
    <div className="relative">
      <div className="opacity-20 pointer-events-none select-none">
        {children}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-16 sm:top-1/2 sm:-translate-y-1/2">
        {renderOnError(response)}
      </div>
    </div>
  );
}
