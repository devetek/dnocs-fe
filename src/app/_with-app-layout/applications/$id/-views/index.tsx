import { PageLayout } from './-presentations';
import Announcements from './Announcements';
import CicdHistory from './CicdHistory';
import ConnectedResources from './ConnectedResources';
import Header from './Header';
import LogsRt from './LogsRt';
import QuickActions from './QuickActions';
import TechnicalMetadata from './TechnicalMetadata';

export default function ApplicationDetailsPageView() {
  return (
    <PageLayout>
      <Header />

      <PageLayout.Content>
        <PageLayout.Main>
          <Announcements />
          <CicdHistory />
        </PageLayout.Main>

        <PageLayout.Aside>
          <QuickActions />
          <LogsRt />
          <TechnicalMetadata />
          <ConnectedResources />
        </PageLayout.Aside>
      </PageLayout.Content>
    </PageLayout>
  );
}
