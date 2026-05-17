import { EllipsisVerticalIcon, LogsIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import CardSectionTitled, {
  type CardSectionTitledTypes,
} from '@/shared/presentation/molecules/CardSectionTitled';

export default function LogsRt() {
  const t = useDevetekTranslations();

  const toolbarActions: CardSectionTitledTypes.ToolbarAction = {
    icon: EllipsisVerticalIcon,
    label: t('common.actions.more'),
    onClick: () => {},
  };

  return (
    <CardSectionTitled
      title={t('page.applicationDetail.logsRt.title')}
      isCollapsible
      defaultCollapsed
      icon={LogsIcon}
      placement="aside"
      toolbarActions={toolbarActions}
    >
      <>Hello</>
    </CardSectionTitled>
  );
}
