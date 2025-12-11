import { ModalLayoutGeneral as Layout } from '@/services/modal/ui/presentation';

import type { ItemStatusLogModalProps } from '../rules/types';

export default function ItemStatusLogModal(props: ItemStatusLogModalProps) {
  const { logTopicTitle, logTopicMessage, mainLogs, additionalLogs } = props;
  return (
    <Layout maxWidth="400px">
      <Layout.Title
        canClickClose
        title={`${logTopicTitle}'s Status Log`}
        description={logTopicMessage}
      />

      <Layout.Content>
        <div className="text-xs bg-black/5 rounded-lg p-2">
          <pre className="whitespace-pre-wrap">{mainLogs}</pre>
          {!!additionalLogs && (
            <pre className="whitespace-pre-wrap pt-2">{additionalLogs}</pre>
          )}
        </div>
      </Layout.Content>
    </Layout>
  );
}
