import { useEffect, useRef, useState } from 'react';

import { useEmit } from '@/features/file-manager-sidepanel/model/events';

import { Button } from '@/shared/presentation/atoms/Button';
import { Dropdown } from '@/shared/presentation/atoms/Dropdown';
import { InputWithValidation } from '@/shared/presentation/molecules/InputWithValidation';

interface NewFolderPopupProps {
  refTarget: HTMLButtonElement | null;
}

export default function NewFolderPopup(props: NewFolderPopupProps) {
  const { refTarget } = props;

  const emit = useEmit();

  const [isDropdownUploadOpen, setIsDropdownUploadOpen] = useState(false);
  const [folderName, setFolderName] = useState('');

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

  const handleClickCreate = () => {
    if (!folderName) return;

    emit('#file-manager-sidepanel/tool-current-path-folder-new', {
      folderName,
      permissionCode: '0664',
    });

    setFolderName('');
    setIsDropdownUploadOpen(false);
  };

  return (
    <Dropdown
      gapInPx={4}
      refTarget={refTargetCached}
      alignment="right"
      position="bottom"
      isOpen={isDropdownUploadOpen}
      onClickOutside={() => setIsDropdownUploadOpen(false)}
      className="rounded-2xl"
    >
      <div className="p-3 flex flex-col gap-y-1 w-60">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm font-bold text-primary">Folder Name:</p>

          <Button
            disabled={!folderName}
            size="xs"
            variant="link"
            onClick={handleClickCreate}
          >
            Create
          </Button>
        </div>
        <InputWithValidation
          placeholder="Fill in the folder's name"
          onAcceptedChange={setFolderName}
          validations={[
            /^[a-zA-Z0-9_-]+$/,
            (value) =>
              value.length > 100 ? 'Must be 100 characters or less' : true,
          ]}
        />
      </div>
    </Dropdown>
  );
}
