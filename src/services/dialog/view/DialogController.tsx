import type { JSX } from 'react';
import { useState } from 'react';

import { CircleAlertIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/presentation/atoms/Dialog';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useDialogEmit, useDialogSubscribe } from '../model/event';
import type { DialogActionFreeform, DialogPayload } from '../rules/types';

export default function DialogController(): JSX.Element {
  const [dialogPayload, setDialogPayload] = useState<DialogPayload>();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dialogEmit = useDialogEmit();

  const t = useDevetekTranslations();

  useDialogSubscribe('%%dialog/open', (payload) => {
    setDialogPayload(payload);
    setIsOpen(true);
  });

  useDialogSubscribe('%%dialog/close', () => {
    setIsOpen(false);
    setDialogPayload(undefined);
  });

  const renderActions = () => {
    if (dialogPayload == null) return null;

    const renderActionButton = (payload: DialogActionFreeform) => {
      const { label, isPrimary, onClick, persistAfterAction } = payload;

      const handleClick = async () => {
        setIsLoading(true);
        await onClick?.();
        setIsLoading(false);

        if (!persistAfterAction) {
          dialogEmit('%%dialog/close', null);
        }
      };

      return (
        <Button
          className="min-w-[108px]"
          key={label}
          variant={isPrimary ? 'default' : 'secondary'}
          onClick={handleClick}
        >
          {label}
        </Button>
      );
    };

    const { actions } = dialogPayload;

    if (Array.isArray(actions)) {
      return actions.map(renderActionButton);
    }

    switch (actions.variant) {
      case 'Ok':
        return renderActionButton({
          label: t('common.actions.ok'),
          isPrimary: true,
          onClick: actions.ok,
          persistAfterAction: actions.persistAfterOk,
        });

      case 'OkCancel':
        return [
          renderActionButton({
            label: t('common.actions.ok'),
            isPrimary: true,
            onClick: actions.ok,
            persistAfterAction: actions.persistAfterOk,
          }),
          renderActionButton({
            label: t('common.actions.cancel'),
            isPrimary: false,
            onClick: actions.cancel,
            persistAfterAction: actions.persistAfterCancel,
          }),
        ];

      case 'YesNo':
        return [
          renderActionButton({
            label: t('common.actions.yes'),
            isPrimary: true,
            onClick: actions.yes,
            persistAfterAction: actions.persistAfterYes,
          }),
          renderActionButton({
            label: t('common.actions.no'),
            isPrimary: false,
            onClick: actions.no,
            persistAfterAction: actions.persistAfterNo,
          }),
        ];

      default:
        return null;
    }
  };

  let heroIcon = <></>;

  switch (dialogPayload?.variant) {
    case 'warning':
      heroIcon = (
        <TriangleAlertIcon className="text-yellow-500" width={56} height={56} />
      );
      break;
    case 'error':
      heroIcon = (
        <CircleAlertIcon className="text-red-500" width={56} height={56} />
      );
      break;
    case 'info':
      heroIcon = <InfoIcon className="text-blue-500" width={56} height={56} />;
      break;
  }

  const cnModal = cn('bg-card', {
    'border-4': dialogPayload?.variant !== 'info',
    'border-yellow-500 border-dashed': dialogPayload?.variant === 'warning',
    'border-red-500': dialogPayload?.variant === 'error',
  });

  return (
    <Dialog open={isOpen}>
      {dialogPayload && (
        <DialogContent className={cnModal}>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-2xl">
              {heroIcon}
              {dialogPayload.title}
            </DialogTitle>
            <DialogDescription className="text-center">
              {dialogPayload.content}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 flex justify-center gap-2">
            {renderActions()}
          </div>

          {isLoading && (
            <div className="absolute left-0 top-0 w-full h-full bg-card/80 flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
