import { LoaderCircleIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';

import { useServerEditModel } from '../../model';
import { useEmit } from '../../model/events';

export default function Actions() {
  const { isSubmitting, hasChanges } = useServerEditModel();

  const emit = useEmit();

  const handleClickSubmit = () => {
    emit('#server-edit-sidepanel/form-submit', null);
  };

  const handleClickCancel = () => {
    emit('#server-edit-sidepanel/sidepanel-close', null);
  };

  const cnCancel = cn(hasChanges && 'border-yellow-500 border-dashed');

  return (
    <>
      <Button
        onClick={handleClickSubmit}
        disabled={isSubmitting || !hasChanges}
      >
        {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : 'Save'}
      </Button>
      <Button
        className={cnCancel}
        variant="outline"
        onClick={handleClickCancel}
      >
        Cancel
      </Button>
    </>
  );
}
