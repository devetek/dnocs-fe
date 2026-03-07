import type { HTMLAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { CheckIcon, Loader2Icon } from 'lucide-react';

import { iife } from '@/shared/libs/browser/iife';
import { cn } from '@/shared/libs/tailwind/cn';

import type { ButtonActionProps, ButtonExtraProps, ButtonProps } from './types';

const cnBaseButton = cn(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all',
  'ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  'disabled:opacity-50 disabled:cursor-not-allowed',
);

const STYLES_SIZE = {
  default: 'h-10 px-4 py-2',
  xs: 'h-6 rounded-md px-2',
  sm: 'h-8 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

const STYLES_BTNCOLOR_BASE_FLAT = {
  primary: cn(
    'bg-primary text-primary-foreground not-disabled:hover:bg-primary/90',
  ),
  primaryDanger: cn(
    'bg-destructive text-destructive-foreground not-disabled:hover:bg-destructive/90',
  ),
  secondary: cn(
    'bg-secondary text-secondary-foreground not-disabled:hover:bg-accent not-disabled:hover:text-accent-foreground',
    'not-disabled:active:[filter:_brightness(0.9)]',
  ),
  secondaryDanger: cn(
    'border border-destructive bg-secondary text-destructive not-disabled:hover:text-destructive-foreground not-disabled:hover:bg-accent',
  ),
};

const STYLES_BTNCOLOR_BASE_OUTLINE = {
  primary: cn(
    'border border-primary text-primary not-disabled:hover:bg-primary/90 not-disabled:hover:text-primary-foreground',
  ),
  secondary: cn(
    'border text-secondary-foreground not-disabled:hover:bg-accent not-disabled:hover:text-accent-foreground',
  ),
  danger: cn(
    'border border-destructive text-destructive not-disabled:hover:text-destructive-foreground not-disabled:hover:bg-destructive/90',
  ),
};

const STYLES_BTNCOLOR_BASE_3D_SHARED = cn(
  'rounded-xl border shadow/5 not-disabled:hover:shadow-lg/7 not-disabled:active:shadow-sm',
);

const STYLES_BTNCOLOR_BASE_3D = {
  primary: cn(
    STYLES_BTNCOLOR_BASE_3D_SHARED,
    '[background:linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(0,0,0,0.5)),var(--color-primary)]',
    'not-disabled:hover:[background:linear-gradient(to_bottom,rgba(255,255,255,0.2),rgba(0,0,0,0.4)),var(--color-primary)]',
    'not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.1),rgba(0,0,0,0.5)),var(--color-primary)]',
    'dark:[background:linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(0,0,0,0.3)),var(--color-primary)]',
    'dark:not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.05),rgba(0,0,0,0.3)),var(--color-primary)]',
    'text-white dark:text-black',
  ),
  primaryDanger: cn(
    STYLES_BTNCOLOR_BASE_3D_SHARED,
    '[background:linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(0,0,0,0.3)),var(--color-red-500)]',
    'not-disabled:hover:[background:linear-gradient(to_bottom,rgba(255,255,255,0.2),rgba(0,0,0,0.2)),var(--color-red-500)]',
    'not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.1),rgba(0,0,0,0.2)),var(--color-red-500)]',
    'dark:[background:linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(0,0,0,0.3)),var(--color-red-500)]',
    'dark:not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.05),rgba(0,0,0,0.3)),var(--color-red-500)]',
    'text-white',
  ),
  secondary: cn(
    STYLES_BTNCOLOR_BASE_3D_SHARED,
    'bg-gradient-to-b',
    'from-card to-gray-100 dark:to-black/15',
    'not-disabled:hover:text-white not-disabled:hover:[background:linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(0,0,0,0.2)),var(--color-accent)]',
    'dark:not-disabled:hover:[background:linear-gradient(to_bottom,rgba(255,255,255,0.05),rgba(0,0,0,0.3)),var(--color-accent)]',
    'not-disabled:active:text-white not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.1),rgba(0,0,0,0.3)),var(--color-accent)]',
    'dark:not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.05),rgba(0,0,0,0.3)),var(--color-accent)]',
  ),
  secondaryDanger: cn(
    STYLES_BTNCOLOR_BASE_3D_SHARED,
    'bg-gradient-to-b',
    'from-card to-gray-100 dark:to-black/15',
    'not-disabled:hover:[background:linear-gradient(to_bottom,rgba(255,255,255,0.2),rgba(0,0,0,0.2)),var(--color-red-500)]',
    'not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.1),rgba(0,0,0,0.2)),var(--color-red-500)]',
    'dark:not-disabled:active:[background:linear-gradient(to_top,rgba(255,255,255,0.05),rgba(0,0,0,0.3)),var(--color-red-500)]',
    'border-destructive text-destructive not-disabled:hover:text-destructive-foreground',
  ),
};

const buttonVariants = iife(() => {
  return cva(cnBaseButton, {
    variants: {
      size: STYLES_SIZE,
      danger: {
        true: null,
        false: null,
      },
      buttonColor: {
        primary: null,
        secondary: null,
      },
      buttonStyle: {
        flat: null,
        outline: null,
        '3d': null,
      },
    },
    compoundVariants: [
      // #region Flat
      {
        buttonStyle: 'flat',
        buttonColor: 'primary',
        danger: false,
        className: STYLES_BTNCOLOR_BASE_FLAT.primary,
      },
      {
        buttonStyle: 'flat',
        buttonColor: 'primary',
        danger: true,
        className: STYLES_BTNCOLOR_BASE_FLAT.primaryDanger,
      },
      {
        buttonStyle: 'flat',
        buttonColor: 'secondary',
        danger: false,
        className: STYLES_BTNCOLOR_BASE_FLAT.secondary,
      },
      {
        buttonStyle: 'flat',
        buttonColor: 'secondary',
        danger: true,
        className: STYLES_BTNCOLOR_BASE_FLAT.secondaryDanger,
      },
      // #endregion Flat

      // #region 3d
      {
        buttonStyle: '3d',
        buttonColor: 'primary',
        danger: false,
        className: STYLES_BTNCOLOR_BASE_3D.primary,
      },
      {
        buttonStyle: '3d',
        buttonColor: 'primary',
        danger: true,
        className: STYLES_BTNCOLOR_BASE_3D.primaryDanger,
      },
      {
        buttonStyle: '3d',
        buttonColor: 'secondary',
        danger: false,
        className: STYLES_BTNCOLOR_BASE_3D.secondary,
      },
      {
        buttonStyle: '3d',
        buttonColor: 'secondary',
        danger: true,
        className: STYLES_BTNCOLOR_BASE_3D.secondaryDanger,
      },
      // #endregion 3d

      // #region outline
      {
        buttonStyle: 'outline',
        buttonColor: 'primary',
        danger: false,
        className: STYLES_BTNCOLOR_BASE_OUTLINE.primary,
      },
      {
        buttonStyle: 'outline',
        buttonColor: 'secondary',
        danger: false,
        className: STYLES_BTNCOLOR_BASE_OUTLINE.secondary,
      },
      {
        buttonStyle: 'outline',
        danger: true,
        className: STYLES_BTNCOLOR_BASE_OUTLINE.danger,
      },
      // #endregion 3d
    ],
    defaultVariants: {
      size: 'default',
      buttonColor: 'primary',
      buttonStyle: 'flat',
      danger: false,
    },
  });
});

const Comp = (props: ButtonExtraProps & HTMLAttributes<HTMLElement>) => {
  const { asChild = false, children, ...rest } = props;

  if (asChild) {
    return <Slot {...rest}>{children}</Slot>;
  }

  return (
    <Slot {...rest}>
      <button>{children}</button>
    </Slot>
  );
};

export function Button(props: ButtonProps<typeof buttonVariants>) {
  const {
    className,
    size,
    buttonColor,
    buttonStyle,
    danger,
    ref,
    bubbleUpClick,
    onClick,
    ...rest
  } = props;

  const handleClick: typeof onClick = (...params) => {
    if (!bubbleUpClick) {
      params[0].stopPropagation();
    }

    onClick?.(...params);
  };

  return (
    <Comp
      {...rest}
      onClick={handleClick}
      className={cn(
        buttonVariants({ buttonColor, buttonStyle, danger, size, className }),
      )}
      ref={ref}
    />
  );
}

Button.Action = function ButtonAction(
  props: ButtonActionProps<typeof buttonVariants>,
) {
  const { buttonState = 'initial', children, disabled, ...rest } = props;

  const content = iife(() => {
    switch (buttonState) {
      case 'loading':
        return <Loader2Icon className="animate-spin" />;

      case 'success':
        return <CheckIcon />;

      default:
        return children;
    }
  });

  return (
    <Button {...rest} disabled={disabled || buttonState !== 'initial'}>
      {content}
    </Button>
  );
};
