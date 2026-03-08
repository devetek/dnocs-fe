import { UserIcon } from 'lucide-react';

interface UserAvatarProps {
  imgSrc?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { imgSrc } = props;

  return (
    <div className="aspect-square size-24 rounded-full border overflow-hidden">
      {imgSrc ? (
        <img className="w-full h-full object-cover" src={imgSrc} />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <UserIcon className="size-12 text-primary/20" />
        </div>
      )}
    </div>
  );
}
