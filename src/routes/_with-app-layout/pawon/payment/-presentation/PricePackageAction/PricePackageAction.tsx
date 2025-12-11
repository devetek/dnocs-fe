'use client';

import { TrashIcon, Wallet } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';

export default function PricePackageAction(props: PricePackageActionProps) {
  const { onClickPay, onClickDelete } = props;

  return (
    <div className="p-2 sm:px-3 pt-0 flex gap-1">
      <Button
        className="text-blue-500"
        size="sm"
        variant="secondary"
        onClick={onClickPay}
      >
        <Wallet className="w-4 h-4" />
      </Button>
      <Button
        className="text-red-500"
        size="sm"
        variant="secondary"
        onClick={onClickDelete}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}

export interface PricePackageActionProps {
  onClickPay?: () => void;
  onClickDelete?: () => void;
}
