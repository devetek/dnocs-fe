import { useRef, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import { Settings2Icon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth/usecase';

import useClickOutside from '@/shared/libs/react-hooks/useClickOutside';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';

interface UserPanelProps {
  collapsed?: boolean;
}

export default function UserPanel(props: UserPanelProps) {
  const { collapsed } = props;

  const [showOptions, setShowOptions] = useState(false);

  const { userProfile } = useAuthLoggedIn();
  const navigate = useNavigate();

  const userData = {
    avatarUrl: userProfile.avatarSrc ?? '',
    userEmail: userProfile.email,
    username: userProfile.username,
  };

  const refUserOptions = useRef<HTMLDivElement>(null);

  useClickOutside(refUserOptions, () => {
    setShowOptions(false);
  });

  const handleClickToggleOptions = () => {
    setShowOptions((value) => !value);
  };

  const handleClickViewProfile = () => {
    navigate({
      to: '/profile',
    });
  };

  const handleClickLogout = () => {
    window.location.assign('/auth/logout');
  };

  const elUserInfo = (
    <div className="flex flex-col overflow-hidden">
      <p className="text-sm text-primary font-bold break-words">
        {userData.username}
      </p>
      <p className="text-primary text-xs">{userData.userEmail}</p>
    </div>
  );

  const elSettings = (
    <Button
      className="btn-square btn-ghost"
      size="sm"
      variant="ghost"
      onClick={handleClickToggleOptions}
    >
      <Settings2Icon className="size-4" />
    </Button>
  );

  if (collapsed) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer flex flex-col items-center pb-4">
            <img
              className="rounded-full w-8"
              src={userData.avatarUrl}
              alt="Avatar"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-2 p-2 flex items-center justify-between">
          {elUserInfo}

          <div className="gap-1 flex flex-col">
            <Button
              className="w-full flex-1 shadow-xs"
              size="xs"
              variant="secondary"
              onClick={handleClickViewProfile}
            >
              View Profile
            </Button>
            <Button
              className="w-full flex-1 shadow-xs"
              size="xs"
              variant="secondary"
              onClick={handleClickLogout}
            >
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="pb-4 pt-2 w-full">
      <div className="border rounded-lg p-1">
        <div className="gap-2 grid grid-cols-[auto_1fr_auto] grid-rows-1 items-center">
          <img
            className="rounded-full w-8"
            src={userData.avatarUrl}
            alt="Avatar"
          />

          {elUserInfo}

          {elSettings}
        </div>

        {showOptions && (
          <div ref={refUserOptions} className="gap-1 flex pt-2">
            <Button
              className="w-full flex-1 shadow-xs"
              size="xs"
              variant="secondary"
              onClick={handleClickViewProfile}
            >
              View Profile
            </Button>
            <Button
              className="w-full flex-1 shadow-xs"
              size="xs"
              variant="secondary"
              onClick={handleClickLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
