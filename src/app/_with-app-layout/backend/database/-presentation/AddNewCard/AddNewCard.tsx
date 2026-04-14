import { CirclePlusIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

interface Props {
  onClick: () => void;
}

export default function AddNewCard(props: Props) {
  const { onClick } = props;

  const t = useDevetekTranslations();

  return (
    <Card className="h-full min-h-[186px] bg-card/65">
      <Button
        className="h-full w-full border-none"
        onClick={onClick}
        variant="ghost"
      >
        <div className="m-auto flex flex-col items-center">
          <CirclePlusIcon className="w-[48px]! h-[48px]!" />

          <p className="mt-2 text-xl font-bold">
            {t('common.actions.addMore')}
          </p>
        </div>
      </Button>
    </Card>
  );
}
