import { GlobeIcon, MoonIcon, SunIcon } from 'lucide-react';

import type { Theme } from '@/services/theme/config';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

interface ThemeTogglerProps {
  theme: Theme;
  onClick: () => void;
}

export function ThemeToggler(props: ThemeTogglerProps) {
  const { theme, onClick } = props;

  const Icon = theme === 'dark' ? MoonIcon : SunIcon;

  return (
    <div className="w-max">
      <Button
        size="icon"
        buttonColor="secondary"
        buttonStyle="outline"
        onClick={onClick}
      >
        {<Icon className="size-5!" />}
      </Button>
    </div>
  );
}

interface LocaleTogglerProps {
  locale: string;
  onClick: () => void;
}

export function LocaleToggler(props: LocaleTogglerProps) {
  const { locale, onClick } = props;

  return (
    <div className="w-max">
      <Button
        size="icon"
        className="relative"
        buttonColor="secondary"
        buttonStyle="outline"
        onClick={onClick}
      >
        <GlobeIcon className="size-5!" />
        <span className="absolute top-1 right-1 px-0.5 rounded-xs text-[8px] bg-primary text-white dark:text-black">
          {locale.toUpperCase()}
        </span>
      </Button>
    </div>
  );
}
