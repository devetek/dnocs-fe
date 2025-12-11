import { useState } from 'react';

import { ChevronUpIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import type { SubmoduleSectionProps } from './types';

export default function SubmoduleSection(props: SubmoduleSectionProps) {
  const { submoduleVersion, submoduleSummaries, inProgress, onClickDelete } =
    props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleClickChevron = () => {
    setIsCollapsed(!isCollapsed);
  };

  const cnChevron = cn('w-4 h-4 transition-all', isCollapsed && 'rotate-180');

  return (
    <div className="rounded-xl bg-background w-full flex flex-col">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-1">
          <Button
            className="px-1.5"
            size="xs"
            variant="ghost"
            onClick={handleClickChevron}
          >
            <ChevronUpIcon className={cnChevron} />
            <h6 className="cursor-default text-sm font-bold">
              Version {submoduleVersion}
            </h6>
          </Button>
          {inProgress && <Spinner className="w-4 h-4" />}
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Button
              className="text-red-500"
              size="xs"
              variant="ghost"
              onClick={onClickDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="p-2 flex flex-col gap-2 border-t">
          {submoduleSummaries.map((summary, index) => {
            const { label, value } = summary;

            return (
              <Card key={index} className="px-2 py-1">
                <h6 className="text-xs font-semibold italic text-primary/70">
                  {label}
                </h6>
                <code className="text-sm">{value}</code>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
