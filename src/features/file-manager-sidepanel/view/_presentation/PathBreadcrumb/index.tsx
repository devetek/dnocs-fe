import { Fragment } from 'react';

import { ChevronRightIcon, CopyIcon } from 'lucide-react';

import { excludeNully } from '@/shared/libs/browser/typeguards';
import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

interface PathBreadcrumbProps {
  basePath: string;
  fullPath: string;
  selectedFileName?: string;
  onClickSegments?: (fullPath: string) => void;
  onClickCopy?: () => void;
}

export default function PathBreadcrumb(props: PathBreadcrumbProps) {
  const { basePath, fullPath, selectedFileName, onClickSegments, onClickCopy } =
    props;

  if (basePath === fullPath) return null;

  const relativePathParts = fullPath.replace(`${basePath}/`, '').split('/');

  const fullPathParts = [...relativePathParts, selectedFileName].filter(
    excludeNully,
  );

  return (
    <div className="grow shrink-0 h-full p-2 flex-nowrap flex items-center gap-0.5 min-h-7">
      {fullPathParts.map((relativePath, index) => {
        const handleClickSegment = () => {
          let constructedFullPath = basePath;

          for (let i = 0; i < index + 1; i++) {
            constructedFullPath += `/${relativePathParts[i]}`;
          }

          onClickSegments?.(constructedFullPath);
        };

        const cnButton = cn(
          'shrink-0 not-disabled:cursor-pointer bg-card px-2 py-0.5 transition-all text-primary text-sm',
          'not-disabled:hover:border-border/100 not-disabled:hover:shadow-md',
          'rounded-lg border border-border/0',
        );

        return (
          <Fragment key={index}>
            <button
              disabled={relativePath === selectedFileName}
              className={cnButton}
              onClick={handleClickSegment}
            >
              {relativePath}
            </button>

            {index !== fullPathParts.length - 1 && (
              <ChevronRightIcon className="shrink-0 size-3" />
            )}
          </Fragment>
        );
      })}

      <Tooltip
        passthrough
        message="Copy Full Path"
        className="pr-2"
        classNameTooltip="z-[100]"
      >
        <button
          className="p-1.5 rounded-full border hover:bg-background"
          onClick={onClickCopy}
        >
          <CopyIcon className="size-2.5" />
        </button>
      </Tooltip>
    </div>
  );
}
