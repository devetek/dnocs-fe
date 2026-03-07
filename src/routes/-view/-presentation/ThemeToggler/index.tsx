import { MoonIcon, SunIcon } from 'lucide-react';

import type { Theme } from '@/services/theme/config';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

interface ThemeTogglerProps {
  theme: Theme;
  onClick: () => void;
}

export default function ThemeToggler(props: ThemeTogglerProps) {
  const { theme, onClick } = props;

  return (
    <div className="w-max">
      <Button buttonColor="secondary" buttonStyle="flat" onClick={onClick}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </div>
  );
}
