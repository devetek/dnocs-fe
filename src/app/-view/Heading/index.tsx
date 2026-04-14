import { useRouter } from '@tanstack/react-router';
import { LogInIcon } from 'lucide-react';

import { useDevetekLocale } from '@/services/i18n';
import { setLocale } from '@/services/i18n/usecase';
import { useTheme } from '@/services/theme/model';

import useDisplayView from '@/app/-lib/use-display-view';
import { useModel } from '@/app/-models';
import { useEmit } from '@/app/-models/events';
import { Button } from '@/shared/presentation/atoms/ButtonV2';

import BrandLogo from '../-presentation/BrandLogo';
import { LocaleToggler, ThemeToggler } from '../-presentation/Togglers';

export default function Heading() {
  const router = useRouter();

  const emit = useEmit();

  const { isResponsiveFormVisible } = useModel();

  const { fullView, viewReady } = useDisplayView();

  const [theme, { setTheme }] = useTheme();

  const locale = useDevetekLocale();

  const handleClickLogin = () => {
    emit('@landing/responsive/login-form/open');
  };

  const handleClickThemeToggler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleClickLocaleToggler = () => {
    setLocale(locale === 'en' ? 'id' : 'en');
    router.invalidate();
  };

  return (
    <div className="h-max w-full flex items-center justify-between">
      <BrandLogo />

      <div className="flex items-center gap-x-2">
        {!fullView && viewReady && !isResponsiveFormVisible && (
          <Button
            buttonStyle="outline"
            buttonColor="secondary"
            onClick={handleClickLogin}
          >
            <LogInIcon />
            Login
          </Button>
        )}
        <ThemeToggler theme={theme} onClick={handleClickThemeToggler} />
        <LocaleToggler locale={locale} onClick={handleClickLocaleToggler} />
      </div>
    </div>
  );
}
