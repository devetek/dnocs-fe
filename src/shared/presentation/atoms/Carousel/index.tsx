import { useEffect, useState } from 'react';

import {
  createScopeForSlot,
  extractSlotMultchildren,
} from '@/shared/libs/react-children';
import useHandler from '@/shared/libs/react-hooks/useHandler';
import { cn } from '@/shared/libs/tailwind/cn';

import type {
  CarouselItemProps as ItemProps,
  CarouselProps as Props,
} from './types';

const TRANSITION_DURATION = 250;

const slotted = createScopeForSlot('$atom/Carousel');

export default function Carousel(props: Props) {
  const {
    classNameWrapper,
    classNameItems,
    children,
    intervalMs = 5_000,
  } = props;

  const carouselItems = extractSlotMultchildren(children, Carousel.Item);

  // Core state
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1); // 1 for next, -1 for previous
  const [animate, setAnimate] = useState(false); // Triggers the CSS transition

  const goToSlide = useHandler((newIndex: number) => {
    // Prevent changing slides if currently animating or clicking the active dot
    if (newIndex === activeIndex || prevIndex !== null) return;

    let newDir: 1 | -1 = newIndex > activeIndex ? 1 : -1;
    // Handle wrap-around scenarios (e.g., jumping from last to first)
    if (activeIndex === carouselItems.length - 1 && newIndex === 0) newDir = 1;
    if (activeIndex === 0 && newIndex === carouselItems.length - 1) newDir = -1;

    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
    setDir(newDir);
    setAnimate(false); // Reset animation state to position the incoming item off-screen
  });

  // 1. Auto-play effect
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      goToSlide(activeIndex >= carouselItems.length - 1 ? 0 : activeIndex + 1);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, prevIndex, carouselItems.length, intervalMs, goToSlide]);

  // 2. Trigger animation effect
  useEffect(() => {
    if (prevIndex !== null && !animate) {
      // A double requestAnimationFrame ensures the browser paints the starting
      // off-screen position before applying the target position classes.
      const rAF = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
      return () => cancelAnimationFrame(rAF);
    }
  }, [prevIndex, animate]);

  // 3. Cleanup effect to unmount the previous item
  useEffect(() => {
    if (animate && prevIndex !== null) {
      const timer = setTimeout(() => {
        setPrevIndex(null); // This unmounts the outgoing component
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [animate, prevIndex]);

  const cnWrapper = cn(
    'grid grid-rows-[minmax(0,1fr)_minmax(0,auto)] grid-cols-1 gap-y-2',
    classNameWrapper,
  );

  const cnCarouselDots = cn('flex items-center justify-center gap-x-2');

  return (
    <div className={cnWrapper}>
      {/* Viewport wrapper */}
      <div className="relative overflow-hidden w-full h-full rounded-md">
        {carouselItems.map((item, index) => {
          // KEY LOGIC: Only mount the active item and the one currently animating out
          if (index !== activeIndex && index !== prevIndex) return null;

          const isPrev = index === prevIndex;
          const isActive = index === activeIndex;

          // Outgoing item is positioned absolutely to slide out underneath/over.
          // Incoming item is positioned relatively to dictate the container's height.
          const cnBase = cn(
            'w-full h-full transition-transform ease-[cubic-bezier(0.32,0.72,0,1)]',
            `duration-[500ms]`,
            isPrev ? 'absolute top-0 left-0 h-full' : 'relative',
          );

          let cnTransform = '';

          // Apply transform positioning based on direction and animation phase
          if (isPrev) {
            if (!animate) {
              cnTransform = 'translate-x-0';
            } else {
              cnTransform =
                dir !== 1 ? '-translate-x-full' : 'translate-x-full';
            }
          } else if (isActive) {
            if (prevIndex !== null && !animate) {
              cnTransform =
                dir !== 1 ? 'translate-x-full' : '-translate-x-full';
            } else {
              cnTransform = 'translate-x-0';
            }
          }

          return (
            <div
              key={index}
              className={cn(cnBase, cnTransform, classNameItems)}
              style={{
                transitionDuration: `${TRANSITION_DURATION}ms`,
              }}
              aria-hidden={!isActive}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className={cnCarouselDots}>
        {carouselItems.map((_1, index) => (
          <button
            key={index}
            className="size-3 rounded-full data-[active=false]:border data-[active=true]:bg-accent transition-[background]"
            data-active={index === activeIndex}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

Carousel.Item = slotted('CarouselItem', (props: ItemProps) => props.children);
