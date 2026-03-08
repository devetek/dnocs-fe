import { useMemo, useState } from 'react';

import { LogInIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import IconBrandGoogle from '@/shared/presentation/icons/BrandGoogle';

export interface LoginButtonProps {
  className?: string;
  variant: 'traditional' | 'with-google';
  onClick?: () => Promise<void | 'infinite'>;
}

export default function LoginButton(props: LoginButtonProps) {
  const { className, variant, onClick } = props;

  const [buttonState, setButtonState] = useState<'loading' | 'success'>();

  const t = useDevetekTranslations();

  const renderedContent = useMemo(() => {
    if (variant === 'with-google') {
      return <IconBrandGoogle />;
    }

    return (
      <>
        <LogInIcon />
        {t('common.actions.login')}
      </>
    );
  }, [t, variant]);

  const handleClick = async () => {
    if (!onClick) return;

    try {
      setButtonState('loading');

      const result = await onClick();
      if (result === 'infinite') return;

      setButtonState('success');
    } catch {
      setButtonState(undefined);
    }
  };

  return (
    <Button.Action
      buttonStyle="3d"
      buttonColor={variant === 'traditional' ? 'primary' : 'secondary'}
      disabled={buttonState != null}
      buttonState={buttonState}
      className={cn('w-full', className)}
      onClick={handleClick}
    >
      {renderedContent}
    </Button.Action>
  );
}
