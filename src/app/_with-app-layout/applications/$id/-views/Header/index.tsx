import { withErgo } from '@/shared/libs/ergo';
import { PageHeader } from '@/shared/presentation/organisms/PageHeader';

import { useResourcesModel } from '../../-models/resources';
import { HeaderBreadcrumb } from './-Partials';
import { HEADER_STATES } from './-States';

export default withErgo(HEADER_STATES)(function Header() {
  const [appName] = useResourcesModel((s) => [s.appDetails.identity.name._]);

  return (
    <PageHeader
      headnote={<HeaderBreadcrumb />}
      title={appName()}
      // title={<AppTitle />}
      // heroIcon={HeroIcon}
      // statuses={headerStatus}
      // footnote={<HeaderFootnote />}
      // footnoteAs="div"
      // rightAppend={
      //   <div className="flex items-center gap-2">
      //     <RefreshButton />
      //     <EditButton />
      //   </div>
      // }
    />
  );
});
