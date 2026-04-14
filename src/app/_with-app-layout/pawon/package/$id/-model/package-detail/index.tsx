import type { ReactNode } from 'react';
import { useMemo } from 'react';

import type { PackageDetail } from '@/entities/package-detail/model/schema';
import { PackageDetailSchema } from '@/entities/package-detail/model/schema';

import { ApiPricePackage } from '@/shared/api';
import { createStrictContext } from '@/shared/libs/react-factories/createStrictContext';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import { useBaseContext } from '../../-config/base-context';

const [PackageDetailContext, usePackageDetailContext] =
  createStrictContext<PackageDetailContextValue>(
    'PackageDetailPagePackageDetail',
  );

interface PackageDetailContextValue {
  packageDetail: PackageDetail;
}

export { usePackageDetailContext };

interface Props {
  children: ReactNode;
}

export default function PackageDetailController({ children }: Props) {
  const { id } = useBaseContext();

  const [response] = ApiPricePackage.Detail.$Id.useGet({
    id,
  });

  const packageDetail = useMemo(() => {
    if (response.$status !== 'success') return response;

    const {
      id: responseId,
      name,
      currency,
      price,
      is_public,
      created_at,
      updated_at,
    } = response;

    const parsedResponse = PackageDetailSchema.safeParse({
      id: responseId,
      name,
      currency,
      price,
      is_public,
      created_at,
      updated_at,
    });

    if (!parsedResponse.success) {
      return {
        $status: 'failed' as const,
        kind: 'general-error',
        error: parsedResponse.error,
      };
    }

    return {
      $status: 'success' as const,
      ...parsedResponse.data,
    };
  }, [response]);

  if (packageDetail.$status === 'failed') {
    return (
      <FailedState.WallCentered errorPayload={packageDetail.error.message} />
    );
  }

  if (packageDetail.$status !== 'success') {
    return (
      <div className="h-svh flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <PackageDetailContext.Provider value={{ packageDetail }}>
      {children}
    </PackageDetailContext.Provider>
  );
}
