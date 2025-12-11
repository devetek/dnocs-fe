import { SettingsIcon } from 'lucide-react';
import { useMetaTags } from 'react-metatags-hook';

import { useDevetekTranslations } from '@/services/i18n';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { Breadcrumb } from '@/shared/presentation/molecules/Breadcrumb';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';
import { FailedState } from '@/widgets/failed-state';

import { useServiceDataModel } from '../../-model/service-data';

const [guarded, useServerDetail] = guardedSelects({
  fallbackError: () => <FailedState.WallCentered />,
})(couple(useServiceDataModel, (s) => s.serverDetail));

export default guarded(function Header() {
  const [serverId, serverHostName] = useServerDetail((s) => [
    s.id,
    s.host.name,
  ]);

  const t = useDevetekTranslations();

  const breadcrumb = (
    <Breadcrumb
      items={[
        {
          text: 'Resources',
        },
        {
          text: 'Servers',
          url: '/resources/servers',
        },
        {
          text: serverHostName,
          url: `/resources/servers/${serverId}`,
        },
      ]}
    />
  );

  const title = `Running Services: ${serverHostName}`;

  useMetaTags(
    {
      title: `${title} | dPanel`,
    },
    [title],
  );

  return (
    <PageHeader
      heroIcon={SettingsIcon}
      headnote={breadcrumb}
      title={t('page.runningServices.headerTitle')}
      description={t('page.runningServices.headerDesc')}
    />
  );
});
