import type { HTMLInputTypeAttribute, ReactNode } from 'react';

import { useController } from 'react-hook-form';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { capitalizeFirstLetter } from '@/shared/libs/browser/string';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

type FormKey<F> = Path<F> & HTMLInputTypeAttribute;

export interface LoginFieldProps<F extends FieldValues, K extends FormKey<F>> {
  form: UseFormReturn<F>;
  formName: K;
  appendSlot?: ReactNode;
}

export default function LoginField<F extends FieldValues, K extends FormKey<F>>(
  props: LoginFieldProps<F, K>,
) {
  const { form, formName, appendSlot } = props;

  const t = useDevetekTranslations();

  const { fieldState } = useController({
    name: formName,
    control: form.control,
  });

  const renderErrorMessage = () => {
    if (fieldState.error?.message) {
      return t(fieldState.error.message);
    }
  };

  return (
    <div className="w-full">
      <p className="pl-1 text-sm font-medium text-primary/70">
        {capitalizeFirstLetter(String(formName))}
        <span className="font-medium text-red-500">*</span>
      </p>

      <Input
        {...form.register(formName)}
        type={formName}
        className="w-full"
        variant="3d"
      />

      <ErrorInline message={renderErrorMessage()} />

      {appendSlot && <div className="mt-1">{appendSlot}</div>}
    </div>
  );
}

export interface ForgotPasswordCtaProps {
  onClick?: () => void;
}

LoginField.ForgotPasswordCta = function ForgotPasswordCta(
  props: ForgotPasswordCtaProps,
) {
  const { onClick } = props;

  const t = useDevetekTranslations();

  return (
    <p
      className="text-right text-xs font-medium text-primary/70"
      onClick={onClick}
    >
      <a className="w-max hover:underline cursor-pointer">
        {t('page.landing.asideLogin.forgotPasswordQM')}
      </a>
    </p>
  );
};
