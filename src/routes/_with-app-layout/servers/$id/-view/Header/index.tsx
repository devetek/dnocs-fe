import { CloudIcon, GlobeIcon, HardHatIcon, ServerIcon, TerminalIcon } from 'lucide-react';
import { useMetaTags } from 'react-metatags-hook';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useServerDataModel } from '../../-model/server-data';

import { HeaderPartials as Partials } from './_Partials';
import { HeaderStates as UIStates } from './_States';

const [guard, useServerDetail] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Loading,
})(couple(useServerDataModel, (s) => s.detail));

export default guard(function Header() {
  const [hostName, hostAddress, agentVersion, cloudProvider, sshPort] = useServerDetail(
    (s) => [s.host.name, s.host.address, s.agent.version, s.cloud?.provider, s.ssh?.port],
  );

  useMetaTags(
    {
      title: `Server: ${hostName} | dPanel`,
    },
    [hostName],
  );

  return (
    <PageHeader
      heroIcon={ServerIcon}
      headnote={<Partials.Headnote />}
      title={hostName}
      statuses={[
        {
          kind: 'status',
          icon: GlobeIcon,
          text: hostAddress,
        },
        {
          kind: 'status',
          icon: TerminalIcon,
          text: sshPort ? `SSH :${sshPort}` : 'SSH -',
        },
        {
          kind: 'status',
          icon: HardHatIcon,
          text: `Agent ${agentVersion}`,
        },
        {
          kind: 'status',
          icon: CloudIcon,
          text: cloudProvider || '-',
        },
      ]}
    />
  );
});
