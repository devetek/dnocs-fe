import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';

// import { BrowserModelProvider } from '../model/browser';
import { CommonModelProvider } from '../model/common';
// import { FilesystemModelProvider } from '../model/filesystem';
// import type { FileManagerSidepanelProps as Props } from '../rules/types';
// import useFilesystemHistoryUsecase from '../usecase/filesystem-history';
// import useFilesystemWatchUsecase from '../usecase/filesystem-watch';
// import useSidepanelMgmtUsecase from '../usecase/sidepanel-mgmt';
// import useToolsActionsUsecase from '../usecase/tools-actions';

import Layout from './_presentation/Layout';
// import Content from './Content';
import Header from './Header';
// import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

const Controller = () => {
  // useFilesystemHistoryUsecase();
  // useFilesystemWatchUsecase();
  // useSidepanelMgmtUsecase();
  // useToolsActionsUsecase();

  return null;
};

const View = () => {
  const modeExpanded = useBreakpoint('xl', true);

  return (
    <Layout mode={modeExpanded ? 'expanded' : 'collapsed'}>
      <Layout.Header>
        <Header />
      </Layout.Header>

      <Layout.Toolbar>
        <Toolbar />
      </Layout.Toolbar>
      {/* 

      <Layout.Sidebar>
        <Sidebar />
      </Layout.Sidebar>


      <Layout.Content>
        <Content />
      </Layout.Content> */}
    </Layout>
  );
};

export default function UserMachineSidepanel(props: any) {
  console.log('propspropsprops', props);

  return (
    <CommonModelProvider {...props}>
      <Controller />
      <View />
    </CommonModelProvider>
    // <CommonModelProvider {...props}>
    //   <FilesystemModelProvider>
    //     <BrowserModelProvider>
    //       <Controller />
    //       <View />
    //     </BrowserModelProvider>
    //   </FilesystemModelProvider>
    // </CommonModelProvider>
  );
}
