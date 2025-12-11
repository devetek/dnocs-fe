import { TrashIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';

export default function PricePackageAction(props: PricePackageActionProps) {
  const { onClickDelete } = props;

  return (
    <div className="p-2 sm:px-3 pt-0 flex gap-1">
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
  onClickDelete?: () => void;
}
