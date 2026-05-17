import type { CSSProperties, JSX, ReactElement } from 'react';
import {
  Children,
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

import type {
  CarouselItemProps as ItemProps,
  CarouselProps as Props,
} from './-types';

export default function AnimatedSwitcherCarousel(props: Props) {
  const { activeIdent, duration = 300 } = props;

  const [currentChildHeight, setCurrentChildHeight] = useState<number>();

  const [prevChildNodeRef, setPrevChildNodeRef] = useState<HTMLDivElement>();
  const [currentChildNodeRef, setCurrentChildNodeRef] =
    useState<HTMLDivElement>();

  if (currentChildNodeRef != null && currentChildNodeRef !== prevChildNodeRef) {
    setPrevChildNodeRef(currentChildNodeRef);

    const newHeight = currentChildNodeRef.getBoundingClientRect().height;
    setCurrentChildHeight(newHeight);
  }

  const children = Children.toArray(props.children) as ReactElement[];

  const currentChildIndex = children.findIndex(
    (child) =>
      typeof child.props === 'object' &&
      child.props !== null &&
      'ident' in child.props &&
      child.props.ident === activeIdent,
  );

  const currentChild =
    currentChildIndex === -1 ? null : children[currentChildIndex];

  const refPrevChildIndex = useRef<number | undefined>(undefined);
  if (refPrevChildIndex.current === undefined) {
    refPrevChildIndex.current = currentChildIndex;
  }

  const [transitionMetadata, setTransitionMetadata] = useState<{
    direction: 'forward' | 'backward';
    prevChildIndex: number;
  }>();

  const refCurrentActiveIdent = useRef<string | undefined>(undefined);
  if (refCurrentActiveIdent.current === undefined) {
    refCurrentActiveIdent.current = activeIdent;
  }

  const refCurrentChildWrapper = useCallback((node: HTMLDivElement | null) => {
    if (node == null) return;
    setCurrentChildNodeRef(node);
  }, []);

  useLayoutEffect(() => {
    if (transitionMetadata != null || currentChildNodeRef == null) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry == null) return;

      const newObservedHeight = Math.floor(entry.contentRect.height);
      setCurrentChildHeight(newObservedHeight);
    });

    observer.observe(currentChildNodeRef);

    return () => {
      observer.unobserve(currentChildNodeRef);
    };
  }, [currentChildNodeRef, transitionMetadata]);

  useEffect(() => {
    if (
      activeIdent === refCurrentActiveIdent.current ||
      refPrevChildIndex.current == null
    )
      return;
    refCurrentActiveIdent.current = activeIdent;

    const prevChildIndex = refPrevChildIndex.current;

    setTransitionMetadata({
      direction: currentChildIndex > prevChildIndex ? 'forward' : 'backward',
      prevChildIndex,
    });

    const timer = setTimeout(() => {
      refPrevChildIndex.current = currentChildIndex;
      setTransitionMetadata(undefined);
    }, duration);

    return () => clearTimeout(timer);
  }, [activeIdent, currentChildIndex, duration]);

  const cnPrevChild = cn(
    'absolute w-full h-full',
    transitionMetadata != null && 'animate-out fade-out',
    transitionMetadata?.direction === 'forward'
      ? 'slide-out-to-left-20'
      : 'slide-out-to-right-20',
  );

  const cnCurrentChild = cn(
    'w-full',
    transitionMetadata != null && 'animate-in fade-in',
    transitionMetadata?.direction === 'forward'
      ? 'slide-in-from-right-20'
      : 'slide-in-from-left-20',
  );

  const styleShared: CSSProperties = {
    animationDuration: `${duration}ms`,
  };

  const styleCurrentChildWrapper: CSSProperties = {
    ...styleShared,
    height: currentChildHeight ? `${currentChildHeight}px` : 'auto',
    transition: `height ${duration}ms`,
    willChange: 'height',
  };

  return (
    <div className="relative w-full overflow-hidden">
      {transitionMetadata && (
        <div className={cnPrevChild} style={styleShared}>
          {children[transitionMetadata.prevChildIndex]}
        </div>
      )}
      <div
        key={activeIdent}
        className={cnCurrentChild}
        style={styleCurrentChildWrapper}
      >
        <div ref={refCurrentChildWrapper}>{currentChild}</div>
      </div>
    </div>
  );
}

AnimatedSwitcherCarousel.Item = function Item<
  As extends keyof JSX.IntrinsicElements,
>(props: ItemProps<As>) {
  const { as: Component, ident: _, children, ...rest } = props;

  return createElement(Component, rest, children);
};
