import { useEffect, useMemo, useState } from 'react';

import { CircleAlertIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';
import { useModalEmit } from '@/services/modal/model/event';
import { ModalLayoutGeneral } from '@/services/modal/ui/presentation';

import { iife } from '@/shared/libs/browser/fn';
import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type {
  ActionRegistry,
  BuilderParams,
  Extra,
  Node,
} from '../-rules/types';

// prettier-ignore
export type DialogViewProps<A extends keyof ActionRegistry, X> = X & {
  manualResolveOn?: ActionRegistry[A] | Array<ActionRegistry[A]>;
  onClickAction: (action: ActionRegistry[A]) => Promise<void>;
}

// prettier-ignore
export default function createDialogView<A extends keyof ActionRegistry, X>(
  params: BuilderParams<A, X>
) {
  const { variant, action, title, content } = params;

  return function DialogView(props: DialogViewProps<A, X>) {
    const { onClickAction, manualResolveOn, ...rest } = props;

    const [loadingOfAction, setLoadingOfAction] = useState<ActionRegistry[A]>();

    const modalEmit = useModalEmit();

    const t = useDevetekTranslations();

    useEffect(() => {
      modalEmit('%%modal/allow-trivial-close', false);

      return () => {
        modalEmit('%%modal/allow-trivial-close', true);
      };
    }, [modalEmit]);

    const renderActions = () => {
      const renderActionButton = (actionUnit: ActionRegistry[A]) => {
        const handleClick = async () => {
          if (manualResolveOn == null) {
            onClickAction(actionUnit);
            modalEmit('%%modal/close', null);
            return;
          }

          try {
            setLoadingOfAction(actionUnit);
            await onClickAction(actionUnit);
            modalEmit('%%modal/close', null);
          } catch {
            setLoadingOfAction(undefined);
          }
        };

        const label = t(`common.actions.${String(actionUnit)}`);
        const isPrimary = ['yes', 'ok'].includes(actionUnit);

        return (
          <Button
            className="min-w-[108px]"
            key={label}
            buttonColor={isPrimary ? 'primary' : 'secondary'}
            onClick={handleClick}
          >
            {label}
          </Button>
        );
      };

      const actionList = iife(() => {
        switch (action) {
          case 'yesNo':
            return ['yes', 'no'] as Array<ActionRegistry[A]>;

          case 'okCancel':
            return ['ok', 'cancel'] as Array<ActionRegistry[A]>;

          case 'ok':
            return ['ok'] as Array<ActionRegistry[A]>;
        }
      });

      return actionList.map(renderActionButton);
    };

    const renderComponent = (Target: string | Node<X>) => {
      if (typeof Target !== 'string') {
        return <Target {...rest as Extra<X>} t={t} />;
      }

      if (!Target.startsWith('@')) {
        return Target;
      }

      const i18nKey = Target.split('@', 2)[1];

      if (i18nKey && t.has(i18nKey)) {
        return t(i18nKey);
      }

      return i18nKey;
    };

    const elHeroIcon = useMemo(() => {
      switch (variant) {
        case 'warning':
          return (
            <TriangleAlertIcon
              className="text-yellow-500"
              width={56}
              height={56}
            />
          );
        case 'error':
          return (
            <CircleAlertIcon className="text-red-500" width={56} height={56} />
          );
        case 'info':
          return <InfoIcon className="text-blue-500" width={56} height={56} />;
      }
    }, []);

    const cnModal = cn(
      'bg-card p-6 flex flex-col gap-y-3 items-center text-primary',
      {
        'border-4': variant !== 'info',
        'border-yellow-500 border-dashed': variant === 'warning',
        'border-red-500': variant === 'error',
      },
    );

    const cnModalHeadingTitle = cn('font-medium leading-none');

    return (
      <ModalLayoutGeneral className={cnModal}>
        <div className="flex flex-col gap-y-2 items-center text-2xl">
          {elHeroIcon}
          <h1 className={cnModalHeadingTitle}>{renderComponent(title)}</h1>
        </div>

        <div className="text-center text-primary/70">
          {renderComponent(content)}
        </div>

        <div className="mt-2 flex justify-center gap-2">{renderActions()}</div>

        {loadingOfAction && (
          <div className="absolute left-0 top-0 w-full h-full bg-card/80 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </ModalLayoutGeneral>
    );
  }
}
