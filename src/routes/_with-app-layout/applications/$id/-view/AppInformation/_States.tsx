import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { AppInformationLayout as Layout } from './_presentation';

function Loading() {
  return (
    <Layout.Frame>
      <div className="w-full h-22 flex items-center justify-center">
        <Spinner />
      </div>
    </Layout.Frame>
  );
}

export const AppInformationStates = {
  Loading,
};
