import { PreviewModelProvider } from '../model/preview';
import type { FilePreviewSidepanelProps as Props } from '../rules/types';

import Layout from './_presentation/Layout';
import Content from './Content';

export default function FilePreviewSidepanel(props: Props) {
  const { selectedFile, selectedFileFullPath, serverId } = props;

  return (
    <PreviewModelProvider
      selectedFile={selectedFile}
      selectedFileFullPath={selectedFileFullPath}
      serverId={serverId}
    >
      <Layout>
        <Layout.Header>
          <header className="w-full flex flex-col gap-x-2 overflow-hidden">
            <h3 className="text-lg font-bold">File Preview</h3>
            <h6 className="text-sm text-primary/70 overflow-hidden text-ellipsis">{`${selectedFileFullPath}/${selectedFile.name}`}</h6>
          </header>
        </Layout.Header>

        <Layout.Content>
          <Content />
        </Layout.Content>
      </Layout>
    </PreviewModelProvider>
  );
}
