import type { HTMLInputTypeAttribute } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { camelCaseToCapitalizedSentence } from '@/shared/libs/browser/string';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import type { SignUpForm } from '../../rules/login';

export interface LoginFieldProps {
  formName: keyof SignUpForm;
  inputType: HTMLInputTypeAttribute;
}

export default function InputField(props: LoginFieldProps) {
  const { formName, inputType } = props;

  const t = useDevetekTranslations();

  const form = useFormContext<SignUpForm>();

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
      <p className="mb-0.5 text-sm font-medium text-primary/70">
        {camelCaseToCapitalizedSentence(String(formName))}
        <span className="font-medium text-red-500">*</span>
      </p>

      <Input
        {...form.register(formName)}
        type={inputType || 'text'}
        className="w-full"
      />

      <ErrorInline message={renderErrorMessage()} />
    </div>
  );
}
