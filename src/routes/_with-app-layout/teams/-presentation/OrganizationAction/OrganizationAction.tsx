import { CircleArrowRight, TrashIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';

export default function OrganizationAction(props: OrganizationActionProps) {
  const { onCLickDetail, onClickDelete } = props;

  return (
    <div className="p-2 sm:px-3 pt-0 flex gap-1">
      <Button
        className="text-green-500"
        size="sm"
        variant="secondary"
        onClick={onCLickDetail}
      >
        <CircleArrowRight className="w-4 h-4" />
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

export interface OrganizationActionProps {
  onCLickDetail?: () => void;
  onClickDelete?: () => void;
}
