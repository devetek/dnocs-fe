import { SettingsIcon } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';

import LangToggler from './LangToggler';
import ThemeToggler from './ThemeToggler';

interface FooterProps {
  isCollapsed?: boolean;
}

export default function Footer(props: FooterProps) {
  const { isCollapsed } = props;

  const content = (
    <div className="flex items-center justify-between w-full">
      <p className="pl-2 text-primary text-sm">
        dPanel © {new Date().getFullYear()}
      </p>

      <div className="flex items-center">
        <LangToggler />
        <ThemeToggler />
      </div>
    </div>
  );

  if (isCollapsed) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="cursor-pointer relative w-max p-2.5 group hover:bg-accent/20 rounded-lg flex items-center gap-2 transition-all">
            <SettingsIcon className="size-4 group-hover:text-accent" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-2 ml-2">{content}</PopoverContent>
      </Popover>
    );
  }

  return content;
}
