import type { FieldValues, UseFormProps } from 'react-hook-form';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

export function buildRHF<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(params: UseFormProps<TFieldValues, TContext, TTransformedValues>) {
  function Provider({ children }: { children: React.ReactNode }) {
    const form = useForm(params);

    return <FormProvider {...form}>{children}</FormProvider>;
  }

  function useRHF() {
    return useFormContext<TFieldValues, TContext, TTransformedValues>();
  }

  return [Provider, useRHF] as const;
}
