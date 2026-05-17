import {
  CogIcon,
  EllipsisVerticalIcon,
  // HammerIcon,
  // PlayIcon,
  VariableIcon,
} from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import CardSectionTitled, {
  type CardSectionTitledTypes,
} from '@/shared/presentation/molecules/CardSectionTitled';

export default function TechnicalMetadata() {
  const t = useDevetekTranslations();

  const toolbarActions: CardSectionTitledTypes.ToolbarAction = {
    icon: EllipsisVerticalIcon,
    label: t('common.actions.more'),
    onClick: () => {},
  };

  return (
    <CardSectionTitled
      classNameChildrenWrapper="p-3"
      title={t('page.applicationDetail.technicalMetadata.title')}
      isCollapsible
      icon={CogIcon}
      placement="aside"
      toolbarActions={toolbarActions}
    >
      <div className="flex flex-col w-full gap-y-4">
        {/*<div className="grid grid-cols-4 rounded-sm border">
          <div className="p-2 border-r flex flex-col gap-x-1">
            <p className="text-3xl font-semibold">1</p>
            <p className="text-2xs uppercase font-medium">Languages</p>
          </div>
          <div className="p-2 border-r flex flex-col gap-x-1">
            <p className="text-3xl font-semibold">99</p>
            <p className="text-2xs uppercase font-medium">Build Steps</p>
          </div>
          <div className="p-2 border-r">Hello</div>
          <div className="p-2">Hello</div>
        </div>*/}
        {/*<div className="flex flex-col w-full">
          <p className="text-xs font-bold text-primary uppercase pb-1.5 flex items-center gap-x-1">
            <PlayIcon className="size-3" /> Running Instance
          </p>

          <div className="w-full overflow-hidden overflow-y-auto bg-background inset-shadow-sm rounded-md p-3 flex flex-col gap-y-2">
            <p className="uppercase text-xs font-semibold">
              On&nbsp;
              <span className="px-1 py-0.5 rounded-xs bg-primary/90 text-white">
                dpanel-etl-mobile-2
              </span>
            </p>
          </div>
        </div>*/}

        <div className="flex flex-col w-full">
          <p className="text-xs font-bold text-primary uppercase pb-1.5 flex items-center gap-x-1">
            <VariableIcon className="size-3" />
            Environment Variables
          </p>

          <div className="w-full overflow-hidden overflow-y-auto bg-background inset-shadow-sm rounded-md p-3 flex flex-col gap-y-2">
            Hello
          </div>
        </div>
      </div>
    </CardSectionTitled>
  );
}
