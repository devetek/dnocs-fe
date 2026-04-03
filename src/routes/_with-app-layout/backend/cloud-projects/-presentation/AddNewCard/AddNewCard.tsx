import { LinkIcon } from 'lucide-react';

import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

interface Props {
  onClick: () => void;
}

export default function AddNewCard(props: Props) {
  const { onClick } = props;

  return (
    <Card className="h-full min-h-[148px] bg-card/65 border-dashed">
      <Button
        className="h-full w-full border-none"
        onClick={onClick}
        variant="ghost"
      >
        <div className="m-auto flex flex-col items-center gap-2">
          <LinkIcon className="w-9 h-9 text-primary/60" />

          <div className="flex flex-col items-center">
            <p className="text-base font-bold">Connect Cloud Account</p>
            <p className="text-xs text-primary/50 font-normal">
              Add API token or credentials
            </p>
          </div>
        </div>
      </Button>
    </Card>
  );
}
