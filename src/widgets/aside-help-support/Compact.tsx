import { HelpCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { LINK__CHAT_TEAM, LINK__DOCUMENTATION } from './config/links';
import generateChunkLinks from './presentation/generateChunkLinks/generateChunkLinks';

interface Props {
  topic: string;
}

export default function CompactHelpAndSupport(props: Props) {
  const { topic } = props;

  const t = useDevetekTranslations('widget.helpAndSupportCompact');

  return (
    <div className="p-4 flex gap-1.5">
      <HelpCircleIcon className="shrink-0 w-6 h-6 text-primary" />

      <div className="flex flex-col">
        <h3 className="text-lg/6 font-medium text-primary">{t('title')}</h3>
        <p className="text-sm mt-1.5">
          {t.rich('desc', {
            topic: t(`topic.${topic}`),
            doc: generateChunkLinks(LINK__DOCUMENTATION),
            contact: generateChunkLinks(LINK__CHAT_TEAM),
          })}
        </p>
      </div>
    </div>
  );
}
