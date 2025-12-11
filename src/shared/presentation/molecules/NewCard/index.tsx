import { CirclePlusIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

interface Props {
  title: string;
  onClick: () => void;
  className?: string;
}

export default function NewCard({ title, onClick, className }: Props) {
  const cardClassName = cn('h-full min-h-[186px] bg-card/65', className);
  return (
    <Card className={cardClassName}>
      <Button
        className="h-full w-full border-none"
        onClick={onClick}
        variant="ghost"
      >
        <div className="m-auto flex flex-col items-center">
          <CirclePlusIcon className="!w-12 !h-12" />

          <p className="mt-2 text-xl font-bold">{title}</p>
        </div>
      </Button>
    </Card>
  );
}
