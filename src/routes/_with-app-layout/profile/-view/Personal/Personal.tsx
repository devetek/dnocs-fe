import { CalendarIcon, MailIcon, SettingsIcon, UserIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';
import { useAuthEmit } from '@/services/auth/model/events';

import { useUserFormModal } from '@/features/user-form-modal';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/presentation/atoms/Avatar';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/presentation/atoms/Card';
import { Separator } from '@/shared/presentation/atoms/Separator';

export default function Personal() {
  const { userProfile } = useAuthLoggedIn();
  const authEmit = useAuthEmit();
  const username = userProfile.username;
  const fullname = userProfile.fullname;
  const email = userProfile.email;
  const avatarUrl = userProfile.avatarSrc ?? '';
  const createAt = getDistanceFromNow(userProfile.createAt ?? '');

  const [userForm] = useUserFormModal();

  return (
    <Card className="rounded-2xl flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription>
          Your account details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={avatarUrl || '/placeholder.svg'}
                alt={fullname}
              />
              <AvatarFallback>
                {username
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{fullname}</h3>
              <p className="text-sm text-gray-400">@{username}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                userForm({
                  action: 'update',
                  user: {
                    id: Number(userProfile.id),
                    fullname: userProfile.fullname,
                    email: userProfile.email,
                    username: userProfile.username,
                  },
                  onSubmitSuccess: () => {
                    authEmit('%%auth/refresh', null);
                  },
                });
              }}
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{email}</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">-</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <span className="text-sm">-</span>
            </div> */}
          </div>
          <div className="space-y-3">
            {/* <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{userInfo.location}</span>
            </div> */}
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Joined {createAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
