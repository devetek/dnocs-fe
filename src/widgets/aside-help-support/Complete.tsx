import { FileTextIcon, MailIcon, MessageSquareIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import {
  LINK__CHAT_TEAM,
  LINK__DOCUMENTATION,
  LINK__MAIL_US,
} from './config/links';
import HelpHeading from './presentation/HelpHeading';
import HelpItem from './presentation/HelpItem';

interface Props {
  topic: string;
}

export default function CompleteHelpAndSupport(props: Props) {
  const { topic } = props;

  const t = useDevetekTranslations();

  return (
    <div className="p-6 flex flex-col gap-4">
      <HelpHeading
        title={t('widget.helpAndSupportFull.title')}
        description={t('widget.helpAndSupportFull.desc', {
          topic: t(`widget.helpAndSupportFull.topic.${topic}`),
        })}
      />

      <HelpItem
        icon={FileTextIcon}
        title={t('widget.helpAndSupportFull.documentation.title')}
        description={t('widget.helpAndSupportFull.documentation.desc', {
          topic: t(`widget.helpAndSupportFull.topic.${topic}`),
        })}
        ctaText={t('widget.helpAndSupportFull.documentation.cta')}
        ctaLink={LINK__DOCUMENTATION}
      />
      <HelpItem
        icon={MessageSquareIcon}
        title={t('widget.helpAndSupportFull.chatTeam.title')}
        description={t('widget.helpAndSupportFull.chatTeam.desc')}
        ctaText={t('widget.helpAndSupportFull.chatTeam.cta')}
        ctaLink={LINK__CHAT_TEAM}
      />
      <HelpItem
        icon={MailIcon}
        title={t('widget.helpAndSupportFull.emailSupport.title')}
        description={t('widget.helpAndSupportFull.emailSupport.desc')}
        ctaText={t('widget.helpAndSupportFull.emailSupport.cta')}
        ctaLink={LINK__MAIL_US}
      />
    </div>
  );
}
