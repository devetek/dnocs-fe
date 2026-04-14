import { useController } from 'react-hook-form';

import { cn } from '@/shared/libs/tailwind/cn';
import { Checkbox } from '@/shared/presentation/atoms/Checkbox';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';
import { TextArea } from '@/shared/presentation/atoms/TextArea';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import type {
  CboDatabaseTypeProps,
  DynFormInputProps,
  LabelProps,
} from './types';

const Label = (props: LabelProps) => {
  const { label, description, isRequired, isBold } = props;

  const cnWrapper = cn('text-sm', isBold && 'font-bold');

  return (
    <h6 className={cnWrapper}>
      {label}
      {isRequired ? <span className="text-red-500 font-bold">*</span> : ''}
      {description && (
        <span className="text-xs font-normal opacity-70"> {description}</span>
      )}
    </h6>
  );
};

const CboDatabaseType = (props: CboDatabaseTypeProps) => {
  const { placeholder, value, onChange } = props;

  return (
    <Combobox
      classNameButton="w-full"
      placeholder={placeholder}
      items={[
        {
          label: 'MariaDB',
          value: 'mariadb',
        },
      ]}
      onChange={onChange}
      value={value}
    />
  );
};

export default function DynFormInput(props: DynFormInputProps) {
  const {
    control,
    isRequired,
    fieldName,
    formType,
    formLabel,
    formDescription,
    formPlaceholder,
  } = props;

  const ctrl = useController({
    control,
    name: fieldName,
  });

  switch (formType) {
    case 'input_text':
      return (
        <>
          <Label
            label={formLabel}
            description={formDescription}
            isRequired={isRequired}
            isBold
          />
          <Input
            {...ctrl.field}
            className="my-0.5 w-full"
            placeholder={formPlaceholder || undefined}
          />
          <ErrorInline message={ctrl.fieldState.error?.message} />
        </>
      );

    case 'input_text_password':
      return (
        <>
          <Label
            label={formLabel}
            description={formDescription}
            isRequired={isRequired}
            isBold
          />
          <Input
            {...ctrl.field}
            className="my-0.5 w-full"
            placeholder={formPlaceholder || undefined}
            type="password"
          />
          <ErrorInline message={ctrl.fieldState.error?.message} />
        </>
      );

    case 'input_text_area':
      return (
        <>
          <Label
            label={formLabel}
            description={formDescription}
            isRequired={isRequired}
            isBold
          />
          <TextArea
            {...ctrl.field}
            className="my-0.5 w-full h-30"
            placeholder={formPlaceholder || undefined}
          />
          <ErrorInline message={ctrl.fieldState.error?.message} />
        </>
      );

    case 'cbo_database_type':
      return (
        <>
          <Label
            label={formLabel}
            description={formDescription}
            isRequired={isRequired}
            isBold
          />
          <CboDatabaseType
            placeholder={formPlaceholder || undefined}
            onChange={ctrl.field.onChange}
            value={ctrl.field.value}
          />
          <ErrorInline message={ctrl.fieldState.error?.message} />
        </>
      );

    case 'input_checkbox':
      return (
        <div className="flex items-center gap-1">
          <Checkbox
            {...ctrl.field}
            value={ctrl.field.value}
            onCheckedChange={ctrl.field.onChange}
          />
          <Label label={formLabel} isRequired={isRequired} />
        </div>
      );

    default:
      return null;
  }
}
