import { LoaderCircleIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

export const FieldLoading = () => {
  return <LoaderCircleIcon className="animate-spin" />;
};

export const ConfigFileInit = () => {
  const t = useDevetekTranslations('sidepanel.artifactNew.fieldConfig');

  return (
    <div className="bg-black/5 py-1 px-2 rounded-lg">
      <p className="text-sm italic opacity-70">{t('onInitial')}</p>
    </div>
  );
};

interface CreateFieldErrorParams {
  i18nKey: string;
  useTryAgain: () => () => void;
}

export const createFieldError = (params: CreateFieldErrorParams) => {
  const { i18nKey, useTryAgain } = params;

  return function FieldError() {
    const handleTryAgain = useTryAgain();

    const t = useDevetekTranslations();

    return (
      <div className="bg-red-500/5 py-1 px-2 rounded-lg">
        <p className="text-sm italic opacity-70">
          {t.rich(i18nKey, {
            a: (chunks) => (
              <a
                className="underline cursor-default hover:text-blue-500"
                onClick={handleTryAgain}
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    );
  };
};
