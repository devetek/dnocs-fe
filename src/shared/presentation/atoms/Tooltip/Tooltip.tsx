import { createElement, useLayoutEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { iife } from '@/shared/libs/browser/iife';
import { cn } from '@/shared/libs/tailwind/cn';

import type { AsElement, TargetRect, TooltipProps, TooltipRect } from './types';

export default function Tooltip<As extends AsElement = 'div'>(
  props: TooltipProps<As>,
) {
  const {
    className,
    as: AsElement = 'div',
    asProps,
    classNameTooltip,
    children,
    message,
    position = 'top',
    delayMs = 250,
    gap = 0,
    passthrough = false,
  } = props;

  const [componentReady, setComponentReady] = useState(false);
  const [display, setDisplay] = useState(false);

  const [tooltipRect, setTooltipRect] = useState<TooltipRect>();
  const [targetRect, setTargetRect] = useState<TargetRect>();

  const refTimeoutShowHide = useRef<number | null>(null);

  const refWrapper = useRef<HTMLDivElement>(null);
  const refTooltip = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = refWrapper.current;
    if (!el || !display) return;

    const { x, y, width, height } = el.getBoundingClientRect();
    setTargetRect({ x, y, width, height });
  }, [display]);

  useLayoutEffect(() => {
    const el = refTooltip.current;
    if (!el || !display) return;

    const { width, height } = el.getBoundingClientRect();

    setTooltipRect({ width, height });
  }, [display]);

  const genMouseEnterExitHandler = (isEnter: boolean) => {
    return () => {
      if (refTimeoutShowHide.current) {
        window.clearTimeout(refTimeoutShowHide.current);
        refTimeoutShowHide.current = null;
      }

      if (isEnter && !refTimeoutShowHide.current) {
        setComponentReady(true);
        refTimeoutShowHide.current = window.setTimeout(() => {
          setDisplay(true);
          refTimeoutShowHide.current = null;
        }, delayMs);
      }

      if (!isEnter && display) {
        refTimeoutShowHide.current = window.setTimeout(
          () => {
            setDisplay(false);
            setComponentReady(false);
          },
          passthrough ? 0 : delayMs,
        );
      }
    };
  };

  const [calculatedX, calculatedY] = iife(() => {
    if (!targetRect || !tooltipRect) return [0, 0];

    let tempCalcX = 0;
    let tempCalcY = 0;

    switch (position) {
      case 'top':
        tempCalcX = targetRect.x + targetRect.width / 2 - tooltipRect.width / 2;
        tempCalcY = targetRect.y - tooltipRect.height + window.scrollY - gap;
        break;

      case 'right':
        tempCalcX = targetRect.x + targetRect.width + gap;
        tempCalcY =
          targetRect.y + targetRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    if (tempCalcX < 0) {
      tempCalcX = 8;
    }

    if (tempCalcY < 0) {
      tempCalcY = 8;
    }

    return [tempCalcX, tempCalcY];
  });

  const cnTooltip = cn(
    'absolute bg-card border shadow text-primary px-1 rounded-md overflow-clip',
    display ? 'opacity-100' : 'opacity-0',
    'transition-opacity ease-in-out duration-300',
    passthrough && 'pointer-events-none select-none',
    classNameTooltip,
  );

  return (
    <>
      {createElement(
        AsElement,
        {
          ...(asProps ?? {}),
          className,
          ref: refWrapper,
          onMouseEnter: genMouseEnterExitHandler(true),
          onMouseLeave: genMouseEnterExitHandler(false),
        },
        children,
      )}

      {componentReady &&
        message &&
        createPortal(
          <div
            ref={refTooltip}
            className={cnTooltip}
            onMouseEnter={
              !passthrough ? genMouseEnterExitHandler(true) : undefined
            }
            onMouseLeave={genMouseEnterExitHandler(false)}
            style={{
              pointerEvents: !display ? 'none' : 'all',
              top: calculatedY,
              left: calculatedX,
            }}
          >
            {message}
          </div>,
          document.body,
        )}
    </>
  );
}
