import { SettingsIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import type {
  ServiceActionsLayoutActionProps as ActionProps,
  ServiceActionsLayoutFrameProps as FrameProps,
} from './types';

function Frame(props: FrameProps) {
  const { children, freeform = false } = props;
  const t = useDevetekTranslations();

  return (
    <CardSectionTitled
      placement="aside"
      title={t('common.terms.actions')}
      icon={SettingsIcon}
    >
      {freeform ? (
        children
      ) : (
        <div className="w-full grid grid-cols-3 gap-2">{children}</div>
      )}
    </CardSectionTitled>
  );
}

function Action(props: ActionProps) {
  const { isDisabled, icon: Icon, label, onClick } = props;

  return (
    <Button disabled={isDisabled} variant="outline" onClick={onClick}>
      <Icon /> {label}
    </Button>
  );
}

export const ServiceActionsLayout = {
  Frame,
  Action,
};
