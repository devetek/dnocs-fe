import type { CSSProperties, ReactNode } from 'react';
import {
  Children,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@/shared/libs/tailwind/cn';

import type {
  DrawerSlotProps,
  DrawerFrameProps as FrameProps,
  DrawerProps as Props,
} from './types';

const childrenToArray = (children: ReactNode) =>
  Children.toArray(children).filter(isValidElement);

const DrawerSlot = (props: DrawerSlotProps) => {
  const {
    className,
    children,
    currentIndex,
    listLength,
    zIndex,
    position,
    isVisible,
  } = props;

  const [currentlyVisible, setCurrentlyVisible] = useState(false);

  if (!isVisible && currentlyVisible) {
    setCurrentlyVisible(false);
  }

  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(() => {
        setCurrentlyVisible(true);
      });
      return;
    }
  }, [isVisible]);

  let cssStyle: CSSProperties = {
    zIndex: zIndex + currentIndex + 1,
    transformOrigin: 'left',
  };

  const isLast = currentIndex === listLength - 1;

  if (!isLast) {
    const inversedIndex = listLength - currentIndex - 1;

    const opacityPercent =
      -5 * Math.pow(inversedIndex, 2) - 5 * inversedIndex + 100;
    const brightnessPercent =
      -3.5 * Math.pow(inversedIndex, 2) - 3.5 * inversedIndex + 100;
    const translateX = 20 - 16 * Math.pow(1.5, -inversedIndex);

    cssStyle = {
      ...cssStyle,
      userSelect: 'none',
      pointerEvents: 'none',
      opacity: opacityPercent / 100,
      filter: `brightness(${brightnessPercent}%)`,
      scale: 1 - (5 * inversedIndex) / 100,
      translate: `-${translateX}px 0`,
    };
  }

  const cnDrawer = cn(
    'fixed top-0 w-max h-full overflow-hidden',
    'transform transition-transform duration-200 ease-out translate-x-0',
    {
      'left-0 data-[visible=false]:-translate-x-full': position === 'left',
      'right-0 data-[visible=false]:translate-x-full': position === 'right',
    },
    className,
  );

  return (
    <div className={cnDrawer} style={cssStyle} data-visible={currentlyVisible}>
      {children}
    </div>
  );
};

export default function Drawer(props: Props) {
  const {
    classNameDrawer,
    classNameOverlay,
    children,
    position = 'left',
    zIndex = 10,

    onClickOverlay,
  } = props;

  const latestChildren = childrenToArray(children);
  const [deferredChildren, setDeferredChildren] = useState(
    () => latestChildren,
  );
  const refPrevChildrenLength = useRef<number | undefined>(undefined);

  const isOpen = deferredChildren.length > 0;

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const prevChildrenLength = refPrevChildrenLength.current;
    refPrevChildrenLength.current = latestChildren.length;

    if (
      prevChildrenLength == null ||
      prevChildrenLength === latestChildren.length
    )
      return;

    if (prevChildrenLength > latestChildren.length) {
      const timeout = window.setTimeout(() => {
        setDeferredChildren(latestChildren);
      }, 200);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    setTimeout(() => {
      setDeferredChildren(latestChildren);
    }, 0);
  }, [latestChildren]);

  useLayoutEffect(() => {
    if (shouldRender) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [shouldRender]);

  if (isOpen && !shouldRender) {
    setShouldRender(true);
  }

  if (!isOpen && isVisible) {
    setIsVisible(false);
  }

  useLayoutEffect(() => {
    if (isOpen) {
      // We're using setTimeout since in some cases, the setting of animation
      // lags so much it actually skips over and doesn't show any at all
      const t = setTimeout(() => {
        setIsVisible(true);
      }, 100);

      return () => clearTimeout(t);
    }

    // Start exit animation by hiding; unmount after duration.
    const t = setTimeout(() => setShouldRender(false), 200);

    return () => clearTimeout(t);
  }, [isOpen]);

  const cnOverlay = cn(
    'fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 transition-opacity duration-200',
    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
    classNameOverlay,
  );

  const childrenToMap =
    deferredChildren.length < latestChildren.length
      ? latestChildren
      : deferredChildren;

  const mappedChildren = childrenToMap.map((child, index) => {
    const { key } = child;

    const isLast = index === childrenToMap.length - 1;

    const currentlyVisible = () => {
      if (deferredChildren.length < latestChildren.length || !isLast) {
        return true;
      }

      return latestChildren.length === deferredChildren.length;
    };

    return (
      <DrawerSlot
        key={key}
        currentIndex={index}
        listLength={childrenToMap.length}
        zIndex={zIndex}
        className={classNameDrawer}
        position={position}
        isVisible={currentlyVisible()}
      >
        {child}
      </DrawerSlot>
    );
  });

  return (
    shouldRender &&
    createPortal(
      <>
        <div
          className={cnOverlay}
          onClick={onClickOverlay}
          style={{ zIndex }}
        />
        {mappedChildren}
      </>,
      document.body,
    )
  );
}

Drawer.Frame = function Frame(props: FrameProps) {
  const { classNameFrame, classNameWrapper, children } = props;

  const cnWrapper = cn('p-2 h-full', classNameWrapper);
  const cnFrame = cn(
    'bg-card border rounded-2xl shadow-xl overflow-hidden h-full w-[80vw] max-w-[320px]',
    classNameFrame,
  );

  return (
    <div className={cnWrapper}>
      <article className={cnFrame}>{children}</article>
    </div>
  );
};
