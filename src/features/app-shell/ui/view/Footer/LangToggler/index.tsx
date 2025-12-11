import { useRouter } from '@tanstack/react-router';
import { GlobeIcon } from 'lucide-react';

import { useDevetekLocale } from '@/services/i18n';
import { setLocale } from '@/services/i18n/usecase';

import { Button } from '@/shared/presentation/atoms/Button';

export default function LangToggler() {
  const locale = useDevetekLocale();
  const router = useRouter();

  const handleClickButton = () => {
    setLocale(locale === 'en' ? 'id' : 'en');
    router.invalidate();
  };

  return (
    <Button
      className="relative"
      variant="ghost"
      size="sm"
      onClick={handleClickButton}
    >
      <GlobeIcon />
      <span className="absolute top-0.5 right-1 px-0.5 rounded-xs text-[8px] bg-primary text-white dark:text-black">
        {locale.toUpperCase()}
      </span>
      <span className="absolute bottom-1.5 px-[1px] rounded-xs text-[6px] bg-red-500 text-white">
        BETA
      </span>
    </Button>
  );
}
