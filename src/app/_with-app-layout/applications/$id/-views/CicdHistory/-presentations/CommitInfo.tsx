import type { ReactNode } from 'react';

import type { CicdDeploymentParts } from '@/entities/cicd-deployment/rules/schema';

interface Props {
  metadata: CicdDeploymentParts.DeploymentArtifact['commitMetadata'];
  suffix?: ReactNode;
}

export default function CommitInfo(props: Props) {
  const { metadata, suffix } = props;

  return (
    <div className="px-3 pt-2 flex flex-col grow">
      <h5 className="inline">
        <span className="text-sm md:text-lg font-bold">{metadata.title}</span>
        {suffix}
      </h5>
      <p className="text-xs md:text-sm wrap-break-word line-clamp-1">
        {metadata.description || (
          <em className="opacity-50">No description available</em>
        )}
      </p>
    </div>
  );
}
