import { DOMAIN_PROVIDER_BRANDS } from '@/entities/domain/ui/constants/provider';

import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { buildResponseView } from '@/widgets/response-view-builder';

import { useDomainDetailsModel } from '../../models/domain-details';

export default buildResponseView({
  useResponse: () => useDomainDetailsModel((s) => s.details),
  fallbackError: () => null,
  fallbackLoading: () => <Spinner />,
  render: function Render(row) {
    const { domain, providerDetails } = row;

    const ProviderIcon = DOMAIN_PROVIDER_BRANDS[providerDetails.ident].icon;

    return (
      <div className="flex flex-col w-full gap-y-1">
        <h5 className="text-xs font-bold text-primary">DETAILS</h5>

        <div className="w-full bg-background inset-shadow-sm rounded-md p-3 flex flex-col">
          <div className="flex items-center gap-x-2">
            <ProviderIcon className="size-8 shrink-0" />
            <pre className="text-2xl text-primary">{domain.hostname}</pre>
          </div>
        </div>
      </div>
    );
  },
});
