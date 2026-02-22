import type { HTMLAttributes, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useIsomorphicEffect } from '@/shared/libs/react-hooks/useIsomorphicEffect';
import { cn } from '@/shared/libs/tailwind/cn';

export interface FreestandingAccordionProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: ReactNode;
  durationMs?: number;
}

export function FreestandingAccordion(props: FreestandingAccordionProps) {
  const { isOpen, children, durationMs = 300, className, ...rest } = props;

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [height, setHeight] = useState<number | string>(0);
  const refContent = useRef<HTMLDivElement>(null);

  // Handle the Mounting / Unmounting Logic
  useIsomorphicEffect(() => {
    let frame: ReturnType<typeof requestAnimationFrame>;
    let timeout: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setTimeout(() => setShouldRender(true), 0);

      // Small delay to ensure the DOM is painted before we measure height
      frame = requestAnimationFrame(() => setIsAnimating(true));
    } else {
      setTimeout(() => setIsAnimating(false), 0);
      // Wait for the CSS transition to finish before unmounting
      timeout = setTimeout(() => setShouldRender(false), durationMs);
    }

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [isOpen, durationMs]);

  // Handle Height Calculations
  useIsomorphicEffect(() => {
    if (!shouldRender || !refContent.current) return;

    const element = refContent.current;
    const updateHeight = () => {
      setHeight(isAnimating ? element.scrollHeight : 0);
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    updateHeight();

    return () => resizeObserver.disconnect();
  }, [isAnimating, shouldRender, children]);

  if (!shouldRender) return null;

  const cnWrapper = cn(
    'overflow-hidden transition-[height] ease-in-out',
    className,
  );
  const cnContent = cn(
    'opacity-0 transition-opacity ease-in-out',
    isAnimating && 'opacity-100',
  );

  return (
    <div
      {...rest}
      className={cnWrapper}
      data-open={isOpen}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        transitionDuration: `${durationMs}ms`,
        ...rest.style,
      }}
      aria-hidden={!isOpen}
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
