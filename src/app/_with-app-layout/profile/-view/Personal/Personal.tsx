import { CalendarIcon, MailIcon, PencilIcon, UserIcon } from 'lucide-react';

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
  const { username, fullname, email } = userProfile;
  const avatarUrl = userProfile.avatarSrc ?? '';
  const joinedAt = getDistanceFromNow(userProfile.createAt ?? '');

  const [userForm] = useUserFormModal();

  const handleEditProfile = () => {
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
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Personal Information
            </CardTitle>
            <CardDescription className="mt-1">
              Your account details and contact information
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleEditProfile}>
            <PencilIcon className="h-3.5 w-3.5" />
            Edit
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/20">
            <AvatarImage src={avatarUrl || '/placeholder.svg'} alt={fullname} />
            <AvatarFallback className="text-lg font-semibold">
              {username
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-base">{fullname || username}</p>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 text-sm">
            <MailIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Joined {joinedAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
