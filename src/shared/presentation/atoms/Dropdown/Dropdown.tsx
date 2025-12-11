import { useCallback, useLayoutEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import useClickOutside from '@/shared/libs/react-hooks/useClickOutside';
import { cn } from '@/shared/libs/tailwind/cn';

import type { DropdownProps, DropdownRect, TargetRect } from './types';

export default function Dropdown(props: DropdownProps) {
  const {
    refTarget,
    children,
    isOpen,
    gapInPx = 0,
    position = 'bottom',
    alignment = 'left',
    onClickOutside,
    className,
  } = props;

  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [ready, setReady] = useState(false);

  const [refDropdown, setRefDropdown] = useState<HTMLDivElement | null>(null);

  const [rectDropdown, setRectDropdown] = useState<DropdownRect>();
  const [rectTarget, setRectTarget] = useState<TargetRect>();

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  if (!isOpen && isVisible) {
    setIsVisible(false);
  }

  useLayoutEffect(() => {
    if (isOpen) {
      const timeout = window.setTimeout(() => {
        setIsVisible(true);
      }, 150);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    const timeout = window.setTimeout(() => {
      setIsMounted(false);
    }, 150);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isOpen]);

  useClickOutside({ current: refDropdown }, () => onClickOutside?.());

  useLayoutEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);

  useLayoutEffect(() => {
    const el = refTarget.current;
    if (!el) return;

    const { x, y, width, height } = el.getBoundingClientRect();
    requestAnimationFrame(() => {
      setRectTarget({ x, y, width, height });
    });
  }, [isOpen, refTarget]);

  useLayoutEffect(() => {
    if (!refDropdown) return;

    const { width, height, x, y } = refDropdown.getBoundingClientRect();

    requestAnimationFrame(() => {
      setRectDropdown({ width, height, x, y });
    });
  }, [isMounted, refDropdown]);

  const handleRefDropdown = useCallback((node: HTMLDivElement | null) => {
    setRefDropdown(node);
  }, []);

  let calculatedX = 0;
  let calculatedY = 0;

  if (rectTarget && rectDropdown) {
    switch (position) {
      case 'bottom':
        calculatedY =
          rectTarget.y + window.scrollY + rectTarget.height + gapInPx;
        break;

      case 'top':
        calculatedY =
          rectTarget.y + window.scrollY - rectDropdown.height - gapInPx;
        break;
    }

    switch (alignment) {
      case 'left':
        calculatedX = rectTarget.x + window.scrollX;
        break;

      case 'right':
        calculatedX =
          rectTarget.x + window.scrollX + rectTarget.width - rectDropdown.width;
        break;
    }
  }

  const cnDropdown = cn(
    'absolute z-50',
    'shadow-lg border bg-popover rounded-md',
    'transition-all duration-150 ease-out',
    !isVisible && 'opacity-0 scale-95',
    isVisible && 'opacity-100 scale-100',
    className,
  );

  return (
    ready &&
    isMounted &&
    createPortal(
      <div
        ref={handleRefDropdown}
        className={cnDropdown}
        style={{
          top: calculatedY,
          left: calculatedX,
        }}
      >
        {children}
      </div>,
      document.body,
    )
  );
}
