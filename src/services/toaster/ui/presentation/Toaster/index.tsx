import type { ReactNode } from 'react';

import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  InfoIcon,
  TriangleAlert,
  XIcon,
} from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

import type { ToasterVariant } from '../../../rules/types';

interface ToasterContainerProps {
  children: ReactNode;
}

export function ToasterContainer({ children }: ToasterContainerProps) {
  return createPortal(
    <div className="z-999 fixed pl-4 bottom-4 right-4 flex flex-col gap-2">
      {children}
    </div>,
    document.body,
  );
}

interface ToasterCardProps {
  title?: ReactNode;
  message: ReactNode;
  variant: ToasterVariant;
  onClickClose?: () => void;
}

export function ToasterCard(props: ToasterCardProps) {
  const { title, message, variant, onClickClose } = props;

  const cnCard = cn('py-2 px-3 shadow-xl flex items-center gap-2', {
    'border-2 border-red-500': variant === 'error',
    'border-2 border-dashed border-yellow-500': variant === 'warning',
  });

  let heroIcon = <InfoIcon />;

  switch (variant) {
    case 'error':
      heroIcon = <CircleAlertIcon className="text-red-500" />;
      break;

    case 'warning':
      heroIcon = <TriangleAlert className="text-yellow-500" />;
      break;

    case 'success':
      heroIcon = <CircleCheckBigIcon className="text-green-500" />;
      break;
  }

  return (
    <Card className={cnCard}>
      {heroIcon}

      <div className="flex flex-col">
        <h5 className="font-bold">{title}</h5>
        <p className="text-md">{message}</p>
      </div>

      <Button className="px-2" variant="ghost" size="sm" onClick={onClickClose}>
        <XIcon width={16} height={16} />
      </Button>
    </Card>
  );
}
