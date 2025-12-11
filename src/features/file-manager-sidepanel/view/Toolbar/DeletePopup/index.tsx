import { useEffect, useRef, useState } from 'react';

import { FileWarningIcon } from 'lucide-react';

import { useBrowserModel } from '@/features/file-manager-sidepanel/model/browser';
import { useEmit } from '@/features/file-manager-sidepanel/model/events';

import { Button } from '@/shared/presentation/atoms/Button';
import { Dropdown } from '@/shared/presentation/atoms/Dropdown';

interface UploadPopupProps {
  refTarget: HTMLButtonElement | null;
}

export default function DeletePopup(props: UploadPopupProps) {
  const { refTarget } = props;

  const emit = useEmit();

  const [selectedItem] = useBrowserModel((s) => [s.selectedItem]);

  const [isDropdownUploadOpen, setIsDropdownUploadOpen] = useState(false);

  const refTargetCached = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!Object.is(refTargetCached.current, refTarget)) {
      refTargetCached.current = refTarget;
    }
  });

  useEffect(() => {
    const handleClick = () => {
      setIsDropdownUploadOpen(true);
    };

    refTarget?.addEventListener('click', handleClick);

    return () => {
      refTarget?.removeEventListener('click', handleClick);
    };
  }, [refTarget]);

  const handleClickYes = () => {
    setIsDropdownUploadOpen(false);
    emit('#file-manager-sidepanel/tool-selected-item-delete', null);
  };

  return (
    <Dropdown
      gapInPx={4}
      className="rounded-xl"
      refTarget={refTargetCached}
      alignment="right"
      position="bottom"
      isOpen={isDropdownUploadOpen}
      onClickOutside={() => setIsDropdownUploadOpen(false)}
    >
      <div className="p-4 w-[210px] flex flex-col items-center overflow-hidden">
        <FileWarningIcon className="text-primary size-10 mb-2" />

        <p className="font-medium text-primary text-sm text-center">
          Are you sure you want to delete the following {selectedItem?.kind}:
        </p>

        <div className="overflow-hidden px-2 py-1 my-2 max-w-full rounded bg-primary/5">
          <p className="w-full text-primary text-sm text-center overflow-hidden overflow-ellipsis">
            {selectedItem?.name}
          </p>
        </div>

        <Button
          className="w-full border-red-500"
          variant="outline"
          size="sm"
          onClick={handleClickYes}
        >
          Yes
        </Button>
      </div>
    </Dropdown>
  );
}
