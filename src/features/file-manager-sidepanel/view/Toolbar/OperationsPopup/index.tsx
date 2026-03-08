import { useEffect, useRef, useState } from 'react';

import { useBrowserModel } from '@/features/file-manager-sidepanel/model/browser';
import { useEmit } from '@/features/file-manager-sidepanel/model/events';

import { iife } from '@/shared/libs/browser/fn';
import { Dropdown } from '@/shared/presentation/atoms/Dropdown';

import { OperationEmptyState, OperationRow } from './_Partials';

interface OperationsPopupProps {
  refTarget: HTMLButtonElement | null;
}

export default function OperationsPopup(props: OperationsPopupProps) {
  const { refTarget } = props;

  const emit = useEmit();

  const [isDropdownUploadOpen, setIsDropdownUploadOpen] = useState(false);

  const [fsOperationReports] = useBrowserModel((s) => [s.fsOperationReports]);
  const [fsOperationReportsCount, setFsOperationReportsCount] = useState(
    fsOperationReports.length,
  );

  if (fsOperationReportsCount !== fsOperationReports.length) {
    setFsOperationReportsCount(fsOperationReports.length);
    setIsDropdownUploadOpen(true);
  }

  const refTargetCached = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!Object.is(refTargetCached.current, refTarget)) {
      refTargetCached.current = refTarget;
    }
  });

  useEffect(() => {
    const handleClick = () => {
      setIsDropdownUploadOpen((prev) => !prev);
    };

    refTarget?.addEventListener('click', handleClick);

    return () => {
      refTarget?.removeEventListener('click', handleClick);
    };
  }, [emit, refTarget]);

  const elContent = iife(() => {
    if (fsOperationReports.length < 1) {
      return <OperationEmptyState />;
    }

    return fsOperationReports
      .toReversed()
      .map((opReport) => (
        <OperationRow key={opReport.id} operationReport={opReport} />
      ));
  });

  return (
    <Dropdown
      gapInPx={4}
      refTarget={refTargetCached}
      alignment="right"
      position="bottom"
      isOpen={isDropdownUploadOpen}
      className="rounded-2xl overflow-hidden"
      onClickOutside={() => setIsDropdownUploadOpen(false)}
    >
      <div className="p-3 w-80 overflow-hidden overflow-y-auto max-h-[300px]">
        <div className="w-full min-h-full flex flex-col overflow-hidden gap-y-3">
          {elContent}
        </div>
      </div>
    </Dropdown>
  );
}
