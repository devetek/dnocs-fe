import type { ReactNode } from 'react';
import { useLayoutEffect, useState } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';

import { Spinner } from '../Spinner';

export interface SpinnerOverlayProps {
  wrapperAs?: 'div' | 'span';
  wrappedAs?: 'div' | 'span';
  classNameWrapper?: string;
  classNameWrapped?: string;
  children: ReactNode;
  loading: boolean;
}

export default function SpinnerOverlay(props: SpinnerOverlayProps) {
  const {
    classNameWrapper,
    classNameWrapped,
    children,
    loading,
    wrapperAs: WrapperAs = 'div',
    wrappedAs: WrappedAs = 'div',
  } = props;

  const [shouldRenderSpinner, setShouldRenderSpinner] = useState(loading);
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

  if (loading && !shouldRenderSpinner) {
    setShouldRenderSpinner(true);
  }

  if (!loading && isSpinnerVisible) {
    setIsSpinnerVisible(false);
  }

  useLayoutEffect(() => {
    if (loading) {
      const t = requestAnimationFrame(() => {
        setIsSpinnerVisible(true);
      });

      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setShouldRenderSpinner(false), 200);

    return () => clearTimeout(t);
  }, [loading]);

  const cnWrapper = cn('relative', classNameWrapper);
  const cnWrapped = cn(
    'relative transition-all',
    loading && 'opacity-30 select-none pointer-events-none',
    classNameWrapped,
  );

  const cnOverlay = cn(
    'absolute left-1/2 top-1/2 -translate-1/2 p-2',
    'rounded-full bg-card border shadow-2xl',
    'select-none pointer-events-none',
    'opacity-0 scale-50 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-all',
  );

  return (
    <WrapperAs className={cnWrapper}>
      <WrappedAs className={cnWrapped}>{children}</WrappedAs>

      {shouldRenderSpinner && (
        <div className={cnOverlay} data-visible={isSpinnerVisible}>
          <Spinner />
        </div>
      )}
    </WrapperAs>
  );
}
