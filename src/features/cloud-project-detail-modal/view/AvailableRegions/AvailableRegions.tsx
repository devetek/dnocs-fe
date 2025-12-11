import { ApiCloud } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useCpdContext } from '../../model';
import { RegionAccordion } from '../../presentation/RegionAccordion';

import { RegionVPCs } from './RegionVPCs';

export default function AvailableRegions() {
  const { props } = useCpdContext();

  const [response] = ApiCloud.Regions.$Id.useGet({
    cloudProjectId: props.cloudProjectId,
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
          Failed to get cloud regions for this project, please try again later.
        </em>
      </div>
    );
  }

  if (response.$status === 'success') {
    content = (
      <>
        {response.map((region) => {
          return (
            <RegionAccordion
              key={region.slug}
              regionDisplayName={region.display_name}
              regionSlug={region.slug}
            >
              <RegionVPCs regionSlug={region.slug} />
            </RegionAccordion>
          );
        })}
      </>
    );
  }

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">Available Regions</p>

      {content}
    </section>
  );
}
