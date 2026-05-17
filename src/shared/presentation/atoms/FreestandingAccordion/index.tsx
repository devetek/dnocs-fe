import type { HTMLAttributes, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { f } from '@/shared/libs/browser/fn';
import { useIsomorphicEffect } from '@/shared/libs/react-hooks/useIsomorphicEffect';
import { cn } from '@/shared/libs/tailwind/cn';

export interface FreestandingAccordionProps
  extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: ReactNode;
  durationMs?: number;
}

export function FreestandingAccordion(props: FreestandingAccordionProps) {
  const { isOpen, children, durationMs = 300, className, ...rest } = props;

  const [enableAnimation, setEnableAnimation] = useState(false);

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState<boolean | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const refContent = useRef<HTMLDivElement>(null);

  if (height != null && !enableAnimation && isAnimating != null) {
    setEnableAnimation(true);
  }

  // Handle the Mounting / Unmounting Logic
  useIsomorphicEffect(() => {
    let frame: ReturnType<typeof requestAnimationFrame> | undefined;
    let timeout: ReturnType<typeof setTimeout>;

    if (isOpen) {
      requestAnimationFrame(() => {
        setShouldRender(true);

        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setTimeout(() => setIsAnimating(false), 0);
      // Wait for the CSS transition to finish before unmounting
      timeout = setTimeout(() => setShouldRender(false), durationMs);
    }

    return () => {
      clearTimeout(timeout);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [isOpen, durationMs]);

  // Handle Height Calculations
  useIsomorphicEffect(() => {
    if (!shouldRender || !refContent.current) return;

    const element = refContent.current;
    const updateHeight = () => {
      setHeight(element.scrollHeight);
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    updateHeight();

    return () => resizeObserver.disconnect();
  }, [isAnimating, shouldRender, children]);

  if (!shouldRender) return null;

  const cnWrapper = cn(
    'overflow-hidden',
    'transition-[height] ease-in-out',
    className,
  );
  const cnContent = cn(
    enableAnimation &&
      cn(
        'opacity-0 transition-opacity ease-in-out',
        isAnimating && 'opacity-100',
      ),
  );

  const finalHeight = f(() => {
    if (!enableAnimation || height == null) return undefined;

    if (!isAnimating) return '0px';

    return typeof height === 'number' ? `${height}px` : height;
  });

  return (
    <div
      {...rest}
      className={cnWrapper}
      style={{
        height: finalHeight,
        transitionDuration: `${durationMs}ms`,
        ...rest.style,
      }}
    >
      <div
        ref={refContent}
        className={cnContent}
        style={{
          transitionDuration: `${durationMs}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
