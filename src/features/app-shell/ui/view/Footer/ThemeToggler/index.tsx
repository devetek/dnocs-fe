import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/services/theme/model';

import { Button } from '@/shared/presentation/atoms/Button';

export default function ThemeToggler() {
  const [theme, { setTheme }] = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      className="relative"
      variant="ghost"
      size="sm"
      onClick={handleClick}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}

      <span className="absolute bottom-1.5 px-[1px] rounded-xs text-[6px] bg-red-500 text-white">
        BETA
      </span>
    </Button>
  );
}
