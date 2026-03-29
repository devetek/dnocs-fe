import { useMemo } from 'react';

import {
  CheckIcon,
  FolderPlusIcon,
  MessageCircleQuestionIcon,
  TrashIcon,
  TriangleAlertIcon,
  UploadIcon,
} from 'lucide-react';

import { useDevetekLocale } from '@/services/i18n';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { iife } from '@/shared/libs/browser/fn';
import { capitalizeFirstLetter } from '@/shared/libs/browser/string';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type { OperationRowProps } from './types';

// function OpIcon(props: OpIconProps) {
//   const { operationKind } = props;
// }

export function OperationEmptyState() {
  return (
    <div className="h-20 flex items-center justify-center">
      No operations yet.
    </div>
  );
}

export function OperationRow(props: OperationRowProps) {
  const locale = useDevetekLocale();

  const { operationReport } = props;
  const { id, timestamp, ...report } = operationReport;

  const OpIcon = useMemo(() => {
    switch (report.operationKind) {
      case 'upload':
        return UploadIcon;

      case 'folder_new':
        return FolderPlusIcon;

      case 'delete':
        return TrashIcon;

      default:
        return MessageCircleQuestionIcon;
    }
  }, [report.operationKind]);

  const StatusIcon = useMemo(() => {
    switch (report.status) {
      case 'done':
        return CheckIcon;

      case 'loading':
        return Spinner;

      case 'failed':
        return TriangleAlertIcon;

      default:
        return null;
    }
  }, [report.status]);

  const [kind, label] = iife(() => {
    switch (report.operationKind) {
      case 'upload':
        return ['File Upload', report.fileName];

      case 'folder_new':
        return ['New Folder', report.folderName];

      case 'delete': {
        const deleteKind = capitalizeFirstLetter(report.fsKind);

        return [`${deleteKind} Deletion`, report.itemName];
      }
    }
  });

  return (
    <div key={id} className="flex items-center gap-2.5 overflow-hidden">
      <div className="shrink-0 relative">
        <OpIcon className="relative shrink-0 size-6" />

        {StatusIcon && (
          <div className="absolute -right-1 -bottom-1 rounded-full bg-primary text-white dark:text-secondary size-3.75 p-0.5">
            <StatusIcon className="w-full h-full" />
          </div>
        )}
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="overflow-hidden text-ellipsis text-xs text-primary/70">
          {kind} • {getDistanceFromNow(timestamp, locale)}
        </p>
        <p className="overflow-hidden text-ellipsis text-sm text-primary font-bold">
          {label}
        </p>
      </div>
    </div>
  );
}
