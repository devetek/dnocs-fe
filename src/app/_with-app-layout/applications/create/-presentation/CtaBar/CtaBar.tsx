import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';

interface CtaBarProps {
  isPreviousHidden?: boolean;
  isNextDisabled?: boolean;
  goToPrevious?: () => void;
  goToNext?: () => void;

  labelPrevious?: string;
  labelNext?: string;
}

export default function CtaBar(props: CtaBarProps) {
  const t = useDevetekTranslations();

  const {
    isPreviousHidden,
    isNextDisabled,
    goToPrevious,
    goToNext,
    labelPrevious = t('common.actions.previous'),
    labelNext = t('common.actions.next'),
  } = props;

  return (
    <div className="mt-4 mb-4 flex justify-between">
      {!isPreviousHidden ? (
        <Button variant="outline" onClick={goToPrevious}>
          {labelPrevious}
        </Button>
      ) : (
        <div />
      )}

      <Button disabled={isNextDisabled} onClick={goToNext}>
        {labelNext}
      </Button>
    </div>
  );
}
