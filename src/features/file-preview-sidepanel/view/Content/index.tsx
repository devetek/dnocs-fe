import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  googlecode,
  monokaiSublime,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useTheme } from '@/services/theme/model';

import { usePreviewModel } from '../../model/preview';

import { Failed, Loading, Unsupported } from './_Partials';

export default function Content() {
  const [theme] = useTheme();

  const [fileContent, matchedConfig] = usePreviewModel((s) => [
    s.fileContent,
    s.matchedConfig,
  ]);

  if (!matchedConfig && fileContent.$status === 'initial') {
    return <Unsupported />;
  }

  if (fileContent.$status === 'initial' || fileContent.$status === 'loading') {
    return <Loading />;
  }

  if (fileContent.$status === 'failed') {
    return <Failed />;
  }

  return (
    <div className="h-full overflow-y-auto [&>pre]:bg-card! [&>pre]:text-sm">
      <SyntaxHighlighter
        style={theme === 'dark' ? monokaiSublime : googlecode}
        showLineNumbers
        language={
          (matchedConfig?.kind === 'code' && matchedConfig.language) ||
          undefined
        }
      >
        {fileContent.content}
      </SyntaxHighlighter>
    </div>
  );
}
