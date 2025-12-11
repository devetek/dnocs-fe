import { useRef, useState } from 'react';

import { Settings2 } from 'lucide-react';

import useClickOutside from '@/shared/libs/react-hooks/useClickOutside';
import { Button } from '@/shared/presentation/atoms/Button/Button';

import type { UserPanelProps } from './types';

export default function UserPanel(props: UserPanelProps) {
  const { userData, onClickViewProfile, onClickLogout } = props;

  const [showOptions, setShowOptions] = useState(false);

  const refUserOptions = useRef<HTMLDivElement>(null);

  useClickOutside(refUserOptions, () => {
    setShowOptions(false);
  });

  const handleClickToggleOptions = () => {
    setShowOptions((value) => !value);
  };

  return (
    <div className="gap-2 flex flex-col">
      <div className="mb-1 px-2 gap-2 grid grid-cols-[auto_1fr_auto] grid-rows-1 items-center">
        <img
          className="rounded-full w-10"
          width={40}
          height={40}
          src={userData.avatarUrl}
          alt="Avatar"
        />

        <div className="flex flex-col overflow-hidden">
          <p className="text-primary font-bold break-words">
            {userData.username}
          </p>
          <p className="text-primary text-sm">{userData.userEmail}</p>
        </div>

        <div>
          <Button
            className="btn-square btn-ghost"
            size="sm"
            variant="ghost"
            onClick={handleClickToggleOptions}
          >
            <Settings2 className="size-4" />
          </Button>
        </div>
      </div>

      {showOptions && (
        <div ref={refUserOptions} className="gap-1 flex">
          <Button
            className="w-full flex-1 shadow-xs"
            size="sm"
            variant="secondary"
            onClick={onClickViewProfile}
          >
            View Profile
          </Button>
          <Button
            className="w-full flex-1 shadow-xs"
            size="sm"
            variant="secondary"
            onClick={onClickLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
