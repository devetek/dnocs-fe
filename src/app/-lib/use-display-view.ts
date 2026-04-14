import { useLoaderData } from '@tanstack/react-router';

import { useBreakpointValues } from '@/shared/libs/react-hooks/useBreakpoint';

export default function useDisplayView() {
  const { requestHeaders } = useLoaderData({
    from: '__root__',
  });

  const [currentBreakpoint] = useBreakpointValues();

  const viewReady = currentBreakpoint != null;
  const fullView = currentBreakpoint === 'xl';

  const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(
    requestHeaders.userAgent || '',
  );

  return {
    viewReady,
    fullView,
    isBot,
  };
}
