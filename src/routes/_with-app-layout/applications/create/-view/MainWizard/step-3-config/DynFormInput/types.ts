import type { Control } from 'react-hook-form';

export interface DynFormInputProps {
  control: Control;
  isRequired: boolean;
  fieldName: string;
  formType: string;
  formLabel: string;
  formDescription?: string | null;
  formPlaceholder?: string | null;
}

export interface LabelProps {
  label: string;
  description?: string | null;
  isRequired: boolean;
  isBold?: boolean;
}

export interface CboDatabaseTypeProps {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}
