import { ActivitySquare } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import type {
  ServerStatsLayoutFrameProps as FrameProps,
  ServerStatsLayoutRowProps as RowProps,
} from './types';

function Frame(props: FrameProps) {
  const { children } = props;

  const t = useDevetekTranslations();

  return (
    <CardSectionTitled
      placement="aside"
      title={t('page.applicationDetail.usageStats.title')}
      icon={ActivitySquare}
    >
      <div className="flex flex-col gap-1 w-full">{children}</div>
    </CardSectionTitled>
  );
}
function Divider() {
  return <div className="w-full border-b border-dashed pb-0.5 mb-0.5" />;
}

function Row(props: RowProps) {
  const { children, label, icon: Icon } = props;

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <p className="text-sm text-primary flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {label}
      </p>

      {children}
    </div>
  );
}

export const ServerStatsLayout = {
  Frame,
  Divider,
  Row,
};
