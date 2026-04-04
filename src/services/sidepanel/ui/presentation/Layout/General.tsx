import { useState } from 'react';

import { ArrowLeftIcon, XIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import Drawer from '@/shared/presentation/atoms/Drawer';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

import { useSidepanelEmit, useSidepanelSubscribe } from '../../../model/event';

import type {
  SidepanelLayoutGeneralCloseButtonProps as CloseButtonProps,
  SidepanelLayoutGeneralContentProps as ContentProps,
  SidepanelLayoutGeneralCtaProps as CtaProps,
  SidepanelLayoutGeneralProps as Props,
  SidepanelLayoutGeneralTitleProps as TitleProps,
} from './types';

export default function SidepanelLayoutGeneral(props: Props) {
  const { children, className, classNameFrame, classNameFrameWrapper } = props;

  const cnContent = cn('h-full flex flex-col relative', className);

  return (
    <Drawer.Frame
      classNameWrapper={classNameFrameWrapper}
      classNameFrame={classNameFrame}
    >
      <div className={cnContent}>{children}</div>xz
    </Drawer.Frame>
  );
}

SidepanelLayoutGeneral.CloseButton = function CloseButton(
  props: CloseButtonProps,
) {
  const { icon = 'close', position = 'right' } = props;

  const emit = useSidepanelEmit();

  const handleClickClose = () => {
    emit('%%sidepanel/pop', null);
  };

  const Icon = icon === 'close' ? XIcon : ArrowLeftIcon;

  return (
    <div
      className="absolute top-4 data-[position=right]:right-4 data-[position=left]:left-4 flex items-center justify-center"
      data-position={position}
    >
      <button
        className="cursor-pointer size-8 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10"
        onClick={handleClickClose}
      >
        <Icon />
      </button>
    </div>
  );
};

SidepanelLayoutGeneral.Title = function Title(props: TitleProps) {
  const { className, title, subtitle, subtitleLoading, hasCloseButton } = props;

  const [allowTrivialClose, setAllowTrivialClose] = useState(true);

  const emit = useSidepanelEmit();

  const t = useDevetekTranslations();

  useSidepanelSubscribe(
    '%%sidepanel/allow-trivial-close',
    setAllowTrivialClose,
  );

  const handleClickClose = () => {
    emit('%%sidepanel/close', null);
  };

  const cnHeader = cn(
    'grid grid-cols-[1fr_auto] gap-4 p-4 pt-3 items-center',
    className,
  );

  const elSubtitle = subtitleLoading ? (
    <span className="flex items-center gap-x-1">
      <Spinner classNameWrapper="w-max size-4" />
      <em>{t('sidepanel._core.loadingDetails')}</em>
    </span>
  ) : (
    subtitle
  );

  return (
    <header className={cnHeader}>
      <section className="flex flex-col min-h-8">
        <h3 className="text-lg font-bold">{title}</h3>
        <h6 className="text-sm text-primary/70">{elSubtitle}</h6>
      </section>

      {hasCloseButton && allowTrivialClose && (
        <div className="flex items-center justify-center">
          <button
            className="cursor-pointer size-8 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10"
            onClick={handleClickClose}
          >
            <XIcon />
          </button>
        </div>
      )}
    </header>
  );
};

SidepanelLayoutGeneral.Content = function Content(props: ContentProps) {
  const { className, children } = props;

  const cnWrapper = cn('px-4 grow overflow-y-auto', className);

  return <div className={cnWrapper}>{children}</div>;
};

SidepanelLayoutGeneral.Cta = function Content(props: CtaProps) {
  const { className, children } = props;

  const cnWrapper = cn('p-4 pb-3 flex flex-col', className);

  return <div className={cnWrapper}>{children}</div>;
};
