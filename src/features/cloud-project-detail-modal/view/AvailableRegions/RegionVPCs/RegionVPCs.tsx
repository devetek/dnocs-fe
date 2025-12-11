import { useCpdContext } from '@/features/cloud-project-detail-modal/model';
import { VpcDetailCard } from '@/features/cloud-project-detail-modal/presentation/VpcDetailCard';

import { ApiCloud } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

export default function RegionVPCs(props: Props) {
  const { regionSlug } = props;
  const { cloudProjectId } = useCpdContext().props;

  const [response] = ApiCloud.Vpcs.$Id.useGet({
    cloudProjectId,
    regionSlug,
  });

  let content = (
    <div className="w-full h-10 flex items-center justify-center">
      <Spinner />
    </div>
  );

  if (response.$status === 'failed') {
    content = (
      <div className="h-10 flex items-center">
        <em className="text-red-500/70">
          Failed to get VPCs for this region, please try again later.
        </em>
      </div>
    );
  }

  if (response.$status === 'success') {
    if (response.length === 0) {
      content = (
        <div className="h-10 flex items-center">
          <em className="text-gray-500/70">No VPCs found.</em>
        </div>
      );
    } else {
      content = (
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-2">
          {response.map((vpc) => {
            return (
              <VpcDetailCard
                key={vpc.uuid}
                vpcName={vpc.name}
                vpcSubnet={vpc.subnet}
              />
            );
          })}
        </div>
      );
    }
  }

  return content;
}

interface Props {
  regionSlug: string;
}
