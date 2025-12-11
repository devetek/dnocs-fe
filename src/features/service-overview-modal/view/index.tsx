import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { ApiService } from '@/shared/api';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type { ServiceOverviewModalProps as Props } from '../model/types';

const ServiceOverview = (props: Props) => {
  const { serverId, serviceName } = props;

  const [response] = ApiService.Origin.$ServerId.Detail.$ServiceName.useGet({
    serverId,
    serviceName,
  });

  if (response.$status !== 'success') {
    return <Spinner />;
  }

  const { detail } = response;

  return (
    <div className="bg-background p-2 rounded-lg">
      <pre className="overflow-auto text-xs">
        {detail.map((text, index) => {
          return <p key={index}>{text}</p>;
        })}
      </pre>
    </div>
  );
};

export default function ServiceOverviewModal(props: Props) {
  const { serviceName } = props;

  return (
    <ModalLayoutGeneral maxWidth="1024px">
      <ModalLayoutGeneral.Title
        canClickClose
        title="Service Overview"
        description={serviceName}
      />

      <ModalLayoutGeneral.Content className="flex flex-col gap-2">
        <ServiceOverview {...props} />
      </ModalLayoutGeneral.Content>
    </ModalLayoutGeneral>
  );
}
