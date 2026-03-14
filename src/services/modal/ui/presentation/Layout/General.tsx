import type { ReactNode } from 'react';
import { useState } from 'react';

import { XIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

import { useModalEmit, useModalSubscribe } from '../../../model/event';

interface Props {
  className?: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function ModalLayoutGeneral(props: Props) {
  const { className, children, maxWidth = '512px' } = props;

  const cnWrapper = cn(
    'z-[50]',
    'fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
    'border bg-card shadow-lg sm:rounded-lg w-full flex flex-col gap-4',
    className,
  );

  return (
    <article className={cnWrapper} style={{ maxWidth }}>
      {children}
    </article>
  );
}

interface TitleProps {
  title: ReactNode;
  description?: ReactNode;
  canClickClose?: boolean;
}

ModalLayoutGeneral.Title = function Title(props: TitleProps) {
  const { title, description, canClickClose } = props;

  const [allowTrivialClose, setAllowTrivialClose] = useState(true);

  const emit = useModalEmit();

  useModalSubscribe('%%modal/allow-trivial-close', (value) => {
    setAllowTrivialClose(value);
  });

  return (
    <header className="grid grid-cols-[1fr_auto] grid-rows-1 p-6 pb-0">
      <section>
        <h1 className="text-lg font-bold">{title}</h1>
        <h6 className="text-sm opacity-70">{description}</h6>
      </section>

      <section>
        {canClickClose && allowTrivialClose && (
          <button
            className="cursor-pointer"
            onClick={() => emit('%%modal/close', null)}
          >
            <XIcon />
          </button>
        )}
      </section>
    </header>
  );
};

interface ContentProps {
  className?: string;

  classNameWrapper?: string;
  children: ReactNode;
}

ModalLayoutGeneral.Content = function Content(props: ContentProps) {
  const { className, classNameWrapper, children } = props;

  const cnRoot = cn('overflow-hidden sm:rounded-b-lg', classNameWrapper);
  const cnContent = cn('p-6 pt-0 max-h-[80svh] overflow-auto', className);

  return (
    <section className={cnRoot}>
      <section
        className={cnContent}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </section>
  );
};
