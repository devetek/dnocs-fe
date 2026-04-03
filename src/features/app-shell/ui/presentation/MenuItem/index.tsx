import { Link } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import type { LinkWrapperProps, MenuItemProps } from './types';

const LinkWrapper = (props: LinkWrapperProps) => {
  const { className, children, url, onClick } = props;

  return (
    <Link className={className} to={url.replace(/\/v2/, '') as any} onClick={onClick}>
      {children}
    </Link>
  );
};

export default function MenuItem(props: MenuItemProps) {
  const {
    icon: Icon,
    title,
    collapsed,
    url,
    chevron,
    active,
    onClickMenuItem,
  } = props;

  if (collapsed) {
    return (
      <LinkWrapper url={url}>
        <Tooltip
          className={cn(
            'cursor-pointer relative w-max p-2.5 group hover:bg-accent/20 rounded-lg flex items-center gap-2 transition-all',
            active && 'bg-primary/10',
          )}
          message={title}
          position="right"
          delayMs={0}
          gap={4}
        >
          <Icon className="size-4 text-primary group-hover:text-accent" />
        </Tooltip>
      </LinkWrapper>
    );
  }

  return (
    <div
      className="cursor-pointer group hover:bg-accent/20! data-[active=true]:bg-primary/10 rounded-lg flex items-center justify-between transition-all"
      data-active={active}
    >
      <LinkWrapper
        className="px-3 py-2.5 flex items-center gap-2 w-full"
        url={url}
        onClick={onClickMenuItem}
      >
        <Icon className="w-3.5 h-3.5 text-primary group-hover:text-accent" />

        <p className="font-medium text-sm text-primary group-hover:text-accent">
          {title}
        </p>
      </LinkWrapper>

      {chevron && (
        <button
          className="cursor-pointer border-l px-2 py-1.5"
          onClick={chevron.onClick}
        >
          <ChevronDown
            className={cn(
              'size-4 transition-transform',
              chevron.isOpened && 'rotate-180',
            )}
          />
        </button>
      )}
    </div>
  );
}
