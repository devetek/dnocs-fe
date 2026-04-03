import { useNavigate } from '@tanstack/react-router';
import { RefreshCwIcon } from 'lucide-react';

import Layout from '@/services/sidepanel/ui/presentation/Layout/General';
import { useSidepanelEmit } from '@/services/sidepanel/model/event';

import { AdapterOsServiceFromDto } from '@/entities/os-service/adapter';
import ServicesTable from '@/entities/os-service/ui/presentation/ServicesTable';
import usePushServiceActivityUsecase from '@/entities/os-service/usecase/push-activity';

import { useServiceOverviewModal } from '@/features/service-overview-modal';

import { ApiService } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { Button } from '@/shared/presentation/atoms/Button';

import type { ServerServicesSidepanelProps as Props } from '../rules/types';

export default function ServerServicesSidepanel(props: Props) {
  const { serverId, serverName } = props;

  const [openServiceOverviewModal] = useServiceOverviewModal();

  const navigate = useNavigate();
  const emit = useSidepanelEmit();

  const handleSeeMore = () => {
    emit('%%sidepanel/close', null);
    navigate({ to: '/servers/$id/running-services', params: { id: serverId } });
  };

  const [response, refresh] = ApiService.Origin.$ServerId.useGet({ serverId });

  const services = useAdapter(response, (raw) =>
    raw.services.map((service) =>
      AdapterOsServiceFromDto.toOsService(service).unwrap(),
    ),
  );

  const [handlePushServiceActivity] = usePushServiceActivityUsecase({
    onSuccess: () => refresh(),
  });

  const isLoading = services.$status === 'loading';

  return (
    <Layout classNameFrame="w-[calc(100svw_-_16px)] max-w-[740px]">
      <Layout.Title
        className="bg-background"
        title="Services"
        subtitle={serverName || `Server ID: ${serverId}`}
        hasCloseButton
      />

      <Layout.Content className="flex flex-col gap-y-3 pt-4 pb-4 border-t bg-muted/30 overflow-x-auto">
        <div className="flex items-center justify-end px-4">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={isLoading}
              onClick={() => refresh()}
            >
              <RefreshCwIcon
                className={['size-3.5', isLoading && 'animate-spin']
                  .filter(Boolean)
                  .join(' ')}
              />
              Refresh
            </Button>
            <Button size="sm" variant="outline" onClick={handleSeeMore}>
              See More
            </Button>
          </div>
        </div>
        {services.$status === 'initial' || services.$status === 'loading' ? (
          <ServicesTable.PlaceholderLoading />
        ) : services.$status === 'failed' ? (
          <p className="text-sm text-destructive px-4">
            Failed to load services: {services.error?.message ?? 'Unknown error'}
          </p>
        ) : services.length === 0 ? (
          <p className="text-sm text-muted-foreground px-4">
            No running services found.
          </p>
        ) : (
          <ServicesTable
            targetServerId={serverId}
            services={[...services]}
            onClickServiceDetail={(serviceName) => {
              openServiceOverviewModal({ serviceName, serverId });
            }}
            onClickActivity={handlePushServiceActivity}
          />
        )}
      </Layout.Content>
    </Layout>
  );
}
