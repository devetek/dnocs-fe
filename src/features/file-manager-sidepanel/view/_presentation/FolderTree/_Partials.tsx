import { useMemo } from 'react';

import {
  ChevronRightIcon,
  CircleAlertIcon,
  FileWarningIcon,
  FolderIcon,
  FolderOpenIcon,
} from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

import type {
  BasePathFailedProps,
  FolderRootRowProps as RootRowProps,
  FolderItemRowProps as RowProps,
} from './types';

export const FolderRootRow = (props: RootRowProps) => {
  const { basePath } = props;

  return (
    <div className="px-2 py-1 w-full min-w-max rounded-lg flex items-center gap-1 text-left text-primary/70 font-medium text-sm">
      <FolderOpenIcon className="size-4 shrink-0" />
      <p className="pl-0.5">{basePath}</p>
    </div>
  );
};

export const FolderItemRow = (props: RowProps) => {
  const { folderName, folderStatus, isSelected, isOpened, style, onClick } =
    props;

  const cnButton = cn(
    'px-2 py-1 w-full min-w-max rounded-lg flex items-center gap-1 text-left transition-all border hover:bg-card/50 select-none',
    !isSelected && 'border-border/0',
    isSelected && 'bg-card border-border/100 shadow',
  );

  const IconFolder = useMemo(() => {
    if (folderStatus === 'failed') return CircleAlertIcon;

    if (!isOpened) return FolderIcon;

    if (folderStatus === 'unloaded') return Spinner;

    return FolderOpenIcon;
  }, [folderStatus, isOpened]);

  return (
    <button className={cnButton} onClick={onClick} style={style}>
      <ChevronRightIcon
        className="size-4 shrink-0 transition-all data-[opened=true]:rotate-90"
        data-opened={isOpened}
      />
      <IconFolder className="size-4 shrink-0" />
      <p className="pl-0.5">{folderName}</p>
    </button>
  );
};

export const BasePathFailed = (props: BasePathFailedProps) => {
  const { error } = props;

  if (
    error.kind === 'general' &&
    error.error.message.includes('no such file or directory')
  ) {
    return (
      <div className="pt-4 w-full h-full flex flex-col items-center justify-center">
        <FileWarningIcon className="size-16 text-primary opacity-30" />

        <p className="mt-4 px-4 text-sm text-primary/70 text-center">
          Sorry, you haven&apos;t deployed to this server yet.
        </p>
      </div>
    );
  }

  return <FailedState.WallCentered />;
};
